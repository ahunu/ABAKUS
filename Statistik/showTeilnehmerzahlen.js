
/* global LS, stSaison, QUERFORMAT(), stFinale, getName, SPIELER, STAT, stCup, CUPS, stSaisonTab, stEndstand, jbSpieler, ADMIN, SAISON, hRet */

function bereSaison(pTurniere) {

    SAISON[stSaison] = {
        anzTurniere: pTurniere,
        anzTeilnehmer: 0,
        anzTeilnahmen: 0
    };

    stFinale = false;
    stFinalTeilnehmer = 0;
    stEndstand = false;

    for (var turnier in STAT) {
        if (turnier[0] === '2') {
            if (STAT[turnier]._SAISON === stSaison) {
                if (stCup !== 56
                        || stCup === 56 && window.location.href.toUpperCase().indexOf('OOV') < 0 // OOV = Out Of Vienna
                        || stCup === 56 && window.location.href.toUpperCase().indexOf('OOV') > 0 && STAT[turnier]._NAME.toUpperCase().indexOf('OOV') > 0) {

                    if (STAT[turnier]._NAME.toUpperCase().indexOf('FINAL') >= 0) {
                        stFinale = turnier;
                        if (STAT._AKTTURNIER && STAT._AKTTURNIER._TURNIER === turnier) {
                            stEndstand = false;
                        } else {
                            stEndstand = true;
                        }
                    }
                }
            }
        }
    }

    if (stFinale) {
        for (var teilnehmer in STAT[stFinale]) {
            if (teilnehmer[0] !== '_') {
                stFinalTeilnehmer++;
            }
        }
    }

    CUP = {};
    var hCupPunkte = 0;
    for (var turnier in STAT) {
        if (turnier[0] === '2') {
            if (STAT[turnier]._SAISON === stSaison) {
                if (stCup !== 56
                        || stCup === 56 && window.location.href.toUpperCase().indexOf('OOV') < 0 // OOV = Out Of Vienna
                        || stCup === 56 && window.location.href.toUpperCase().indexOf('OOV') > 0 && STAT[turnier]._NAME.toUpperCase().indexOf('OOV') > 0) {
                    for (var spieler in STAT[turnier]) {
                        if (spieler[0] !== '_') {




                            if (stCup !== 56
                                    || stCup === 56 && window.location.href.toUpperCase().indexOf('OOV') < 0 // OOV = Out Of Vienna
                                    || stCup === 56 && window.location.href.toUpperCase().indexOf('OOV') > 0 && istFreund(spieler)) {

                                SAISON[stSaison].anzTeilnahmen++;

                                if (CUP[spieler]) {
                                    tCUP = CUP[spieler];
                                    if (STAT[turnier][spieler][0] === 1) {
                                        tCUP[1]++;
                                    } else if (STAT[turnier][spieler][0] === 2) {
                                        tCUP[2]++;
                                    } else if (STAT[turnier][spieler][0] === 3) {
                                        tCUP[3]++;
                                    }
                                    tCUP[4]++;
                                    if (turnier !== stFinale) {
                                        hCupPunkte = getCupPunkte(turnier, spieler);
                                        if (getCupPunkte(turnier, spieler) === '-') {
                                            tCUP[5].push(hCupPunkte);
                                        } else {
                                            ii = tCUP[5].length;
                                            for (var i = 0; i < tCUP[5].length; i++) {
                                                if (tCUP[5][i] === '-'
                                                        || tCUP[5][i] <= hCupPunkte) {
                                                    ii = i;
                                                    break;
                                                }
                                            }
                                            tCUP[5].splice(ii, 0, hCupPunkte);
                                        }
                                    }
                                    CUP[spieler] = tCUP;
                                } else {
                                    SAISON[stSaison].anzTeilnehmer++;
                                    tCUP = [0, 0, 0, 0, 0, 0];
                                    if (STAT[turnier][spieler][0] === 1) {
                                        tCUP[1]++;
                                    } else if (STAT[turnier][spieler][0] === 2) {
                                        tCUP[2]++;
                                    } else if (STAT[turnier][spieler][0] === 3) {
                                        tCUP[3]++;
                                    }
                                    tCUP[4]++;
                                    if (turnier !== stFinale) {
                                        tCUP[5] = [getCupPunkte(turnier, spieler)];
                                    }
                                    CUP[spieler] = tCUP;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    CUPD = [];
    var spieler = '';
    for (var spieler in CUP) { // der Internet Explorer versteht kein  for (var CUPrec of CUP)
        tCUP = CUP[spieler];
        for (var i in tCUP[5]) {
            if (i < 6) {
                if (!isNaN(tCUP[5][i])) {
                    tCUP[0] += tCUP[5][i];
                }
            } else {
                break;
            }
        }

        if (stFinale) {
            hCupPunkte = getCupPunkte(stFinale, spieler);
            if (!isNaN(hCupPunkte)) {
                tCUP[0] += parseInt(hCupPunkte);
            }
        }

        CUP[spieler] = tCUP;
        tCUP.push(spieler);
        if (isNaN(spieler)) {
            CUPD.push((9000 - tCUP[0]) + spieler + ';' + spieler);
        } else {
            CUPD.push((9000 - tCUP[0]) + (SPIELER[spieler] ? SPIELER[spieler][0] : '????') + ';' + spieler);
        }
    }

    CUPD.sort();

}

function showTeilnehmerzahlen() {

    var nGesTeilnehmer = 0;

    function getAbweichung() {
        var dSaison = parseInt((SAISON[stSaison].anzTeilnahmen / SAISON[stSaison].anzTurniere) + 0.5);
        var dGesamt = parseInt((STAT._ANZTEILNAHMEN / STAT._ANZTURNIERE) + 0.5);
        if (stCup === 56) { // WTC - Abweichung von Antons 75er Turnier 2019 ::: Teilnehmer - Durchschnitt = 124
//            dGesamt = parseInt(((STAT._ANZTEILNAHMEN - 124) / STAT._ANZTURNIERE) + 0.5);
//            if (stSaison === "2017/18") {
//                dSaison = parseInt(((SAISON[stSaison].anzTeilnahmen - 124) / SAISON[stSaison].anzTurniere) + 0.5);
//            }
//            dGesamt = parseInt(((STAT._ANZTEILNAHMEN - 192) / (STAT._ANZTURNIERE - 1)) + 0.5);
//            if (stSaison === "2017/18") {
//                dSaison = parseInt(((SAISON[stSaison].anzTeilnahmen - 192) / (SAISON[stSaison].anzTurniere - 1)) + 0.5);
//            }
        }
        if (dSaison === dGesamt) {
            return "&#177;0,0 %";
        } else {
            hRet = (dSaison - dGesamt) / (dGesamt / 1000);
            if (hRet >= 0.05) {
                hRet = parseInt(hRet + 0.05);
                return '+' + parseInt(hRet / 10) + ',' + parseInt(hRet % 10) + ' %';
            } else if (hRet <= -0.05) {
                hRet = parseInt(hRet - 0.05);
                return parseInt(hRet / 10) + ',' + Math.abs(parseInt(hRet % 10)) + ' %';
            } else {
                return "&#177;0,0 %";
            }
        }
    }

    function addPosition() {
        nGesTeilnehmer += SAISON[stSaison].anzTeilnehmer;
        html = "<tr>"
                + "<td class=TC>&nbsp;" + stSaison + "</td>"
                + "<td class=TC>" + SAISON[stSaison].anzTurniere + "</td>"
                + (QUERFORMAT() ? "<td class=TR>" + SAISON[stSaison].anzTeilnehmer + "&nbsp;&nbsp;&nbsp;</td>" : "")
                + "<td class=TR>" + SAISON[stSaison].anzTeilnahmen + "&nbsp;&nbsp;&nbsp;</td>"
                + "<td class=TR>" + parseInt((SAISON[stSaison].anzTeilnahmen / SAISON[stSaison].anzTurniere) + 0.5) + "&nbsp;&nbsp;&nbsp;&nbsp;</td>"
                + "<td class=TR>" + getAbweichung() + "&nbsp;&nbsp;</td>"
                + (QUERFORMAT() ? "<td></td>" : "")
                + "</tr>"
                + html;
    }

    if (QUERFORMAT()) {
        if (lastBtn) {
            $(lastBtn).removeClass('ui-btn-active');
        }
        lastBtn = '#bTeilnehmerzahlen';
        $(lastBtn).addClass('ui-btn-active');
    }

    if (jbSpieler.isOpen) {
        jbSpieler.close();
    }

    if (ADMIN || LS.ME === '3425' || (LS.ME === '2037' && stCup === 56)) { // Robert Sedlaczek
        showIcons(['#iPrint']);
    }

    stStat = 'Teilnehmerzahlen';
    stNamenLen = 99;
    writeCanvas(stStat);
    $("#dCopyright").hide();

    if (QUERFORMAT()) {
        $('#dRumpf').html('');
    } else {
        $('#dContent').html('');
        $('#sideDetails').hide();
        $('#nbUebersicht,#nbArchiv,#bAktSaison').removeClass('ui-disabled').removeClass('ui-btn-active');
        var hx = $(window).innerHeight() - $('#sideContent').offset().top - $('#dFooter').height() - 1;
        $('#sideContent').css('height', hx + 'px').scrollTop(0);
    }

    var html = "";

    stSaison = '';
    var nTurniere = 0;
    for (var turnier in STAT) {
        if (turnier[0] === '2') {
            if (STAT[turnier]._SAISON !== stSaison) {
                if (stSaison) {
                    bereSaison(nTurniere);
                    addPosition();
                }
                nTurniere = 0;
                stSaison = STAT[turnier]._SAISON;
            }
            nTurniere++;
        }
    }
    if (stSaison) {
        bereSaison(nTurniere);
        addPosition();
    }
    html = "<table id=mTable data-role='table' data-filter='true' data-input='#iFilter' data-mode='columntoggle' cellspacing='0' class='table ui-body-d ui-shadow ui-responsive table-stripe' data-column-btn-text=''><tbody>"
            + "<tr id='L0P1' class='bGrau'>"
            + "<th class=TL></th>"
            + "<th xclass=TR></th>"
            + "<th class=TR>Teil-&nbsp;&nbsp;&nbsp;</th>"
            + (QUERFORMAT() ? "<th class=TR>Teil-&nbsp;&nbsp;&nbsp;</th>" : "")
            + "<th class=TR>&#216; pro&nbsp;</th>"
            + "<th class=TR>Abwei.&nbsp;&nbsp;</th>"
            + (QUERFORMAT() ? "<td>&nbsp;&nbsp;&nbsp;&nbsp;</td>" : "")
            + "</tr>"
            + "<tr id='L0P1' class='bGrau'>"
            + "<th class=TL></th>"
            + "<th xclass=TR>" + (QUERFORMAT() ? "Turniere" : "Turn.") + "</th>"
            + (QUERFORMAT() ? "<th class=TR>nehmer</th>" : "")
            + "<th class=TR>nahmen</th>"
            + "<th class=TR>Turnier</th>"
            + "<th class=TR>vom &#216;&nbsp;&nbsp;</th>"
            + (QUERFORMAT() ? "<td></td>" : "")
            + "</tr>"
            + html;
    html += "<tr class='bGrau'>"
            + "<th class=TC>&nbsp;Gesamt</th>"
            + "<td class=TC>" + STAT._ANZTURNIERE + "</td>"
            + (QUERFORMAT() ? "<td></td>" : "")
            + "<td class=TR>" + STAT._ANZTEILNAHMEN + "&nbsp;&nbsp;&nbsp;</td>"
            + "<td class=TR>" + parseInt((STAT._ANZTEILNAHMEN / STAT._ANZTURNIERE) + 0.5) + "&nbsp;&nbsp;&nbsp;&nbsp;</td>"
            + "<td class=TR></td>"
            + (QUERFORMAT() ? "<td></td>" : "")
            + "</tr>";
    html += "<tr class='bGrau'>"
            + "<th class=TC>&nbsp;Im&nbsp;Schnitt</th>"
            + "<td class=TC>" + parseInt((STAT._ANZTURNIERE / STAT._ANZSAISONEN) + 0.5) + "</td>"
            + (QUERFORMAT() ? "<td class=TR>" + parseInt((nGesTeilnehmer / STAT._ANZSAISONEN) + 0.5) + "&nbsp;&nbsp;&nbsp;</td>" : "")
            + "<td class=TR>" + parseInt((STAT._ANZTEILNAHMEN / STAT._ANZSAISONEN) + 0.5) + "&nbsp;&nbsp;&nbsp;</td>"
            + "<td class=TR>" + parseInt((STAT._ANZTEILNAHMEN / STAT._ANZTURNIERE) + 0.5) + "&nbsp;&nbsp;&nbsp;&nbsp;</td>"
            + "<td class=TR></td>"
            + (QUERFORMAT() ? "<td></td>" : "")
            + "</tr>"
            + "</tbody></table>"
            + "<br>"
            + "<div style='font-size:1.2vw;font-weight: normal;text-align:center'>"
            + (QUERFORMAT() ? "&mdash;&mdash; &copy; 2015-2019 by Leo Luger &mdash;&mdash;" : "")
            + "</div>";

    if (QUERFORMAT()) {
        $('#dRumpf').html(html);
    } else {
        $('#dContent').html(html);
    }
    setFont(4.8, true);
}