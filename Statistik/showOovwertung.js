
/* global LS, stSaison, QUERFORMAT(), stFinale, getName, SPIELER, STAT, stCup, CUPS, stEndstand, jbSpieler, ADMIN, iSaison, SP, spRangImCup, is1, SAISON, spTeilnahmen, spBestePlatz, spCuppunkte */

function showOovwertung() {


    function istOOV(pSpieler) {
        if ("3665,3477,3590,2553,3303,3228,3545,3345,3502,1096,3629,3226,3002,3753,1754,3757,3086,3327,3335,3731,3723,3743,3322".indexOf(pSpieler) >= 0) {
            return true;
        } else {
            return false;
        }
    }

    if (QUERFORMAT()) {
        if (lastBtn) {
            $(lastBtn).removeClass('ui-btn-active');
        }
        lastBtn = '#bOovwertung';
        $(lastBtn).addClass('ui-btn-active');
    }

    if (jbSpieler.isOpen) {
        jbSpieler.close();
    }

    stStat = 'Cupwertung';
    stNamenLen = 0.3;
    writeCanvas('OOV - Wertung  ' + stSaison);
    $("#dCopyright").hide();
    if (stEndstand) {
        $('#tStand').html('Endstand:').attr('style', 'position: fixed; top: 44px; right: 5px; cursor: pointer;').show();
    } else {
        $('#tStand').html('Stand: ' + new Date().toLocaleDateString()).attr('style', 'position: fixed; top: 44px; right: 5px; cursor: pointer;').show();
    }

    var i = 0;
    var html = '';

    var CUP = {};
    var hCupPunkte = 0;
    var nTurniere = 0;
    var nTeilnahmen = 0;
    for (var turnier in STAT) {
        if (turnier[0] === '2') {
            if (STAT[turnier]._SAISON === stSaison) {
                if (STAT[turnier]._NAME.toUpperCase().indexOf('OOV') > 0) {
                    nTurniere++;
                    for (var spieler in STAT[turnier]) {
                        if (spieler[0] !== '_') {
                            if (istOOV(spieler)) {
                                nTeilnahmen++;
                                if (CUP[spieler]) {
                                    if (turnier !== stFinale) {
                                        hCupPunkte = getCupPunkte(turnier, spieler);
                                        if (getCupPunkte(turnier, spieler) === '-') {
                                            CUP[spieler].push(hCupPunkte);
                                        } else {
                                            ii = CUP[spieler].length;
                                            for (var i = 0; i < CUP[spieler].length; i++) {
                                                if (CUP[spieler][i] === '-'
                                                        || CUP[spieler][i] <= hCupPunkte) {
                                                    ii = i;
                                                    break;
                                                }
                                            }
                                            CUP[spieler].splice(ii, 0, hCupPunkte);
                                        }
                                    }
                                } else {
                                    if (turnier !== stFinale) {
                                        CUP[spieler] = [getCupPunkte(turnier, spieler)];
                                    } else {
                                        CUP[spieler] = [];
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    var SORTnachPlatz = [];
    var spieler = '';
    for (var spieler in SP) { // der Internet Explorer versteht kein  for (var CUPrec of CUP)
        if (SP[spieler][iSaison]) {
            SORTnachPlatz.push((100 + SP[spieler][iSaison][spRangImCup]) + (SPIELER[spieler] ? SPIELER[spieler][0] : '????') + ';' + spieler);
        }
    }

    if (LS.ME !== "NOBODY") {
        if (CUP[LS.ME]) {
            if (LS.ME === '3425') {
                showIcons(['#iScrollToMe', '#iPrint', '#iDownload']);
            } else {
                showIcons(['#iScrollToMe', '#iPrint']);
            }
        } else {
            if (LS.ME === '3425') {
                showIcons(['#iPrint', '#iDownload']);
            } else {
                showIcons(['#iPrint']);
            }
        }
    }

    SORTnachPlatz.sort();
    var html = (!QUERFORMAT() ? "<div id='dDummy'></div>" : "")
//            + (QUERFORMAT() ? "<div id='dFilter' class='noprint'><input class='N M' id='iFilter' placeholder='Nachname, Vorname," + (QUERFORMAT() ? " Ort," : "") + " ...'></div>" : "")
            + "<table id=mTable style='swidth: 100% !important;' data-role='table' data-mode='columntoggle' cellspacing='0' class='table ui-body-d ui-shadow ui-responsive table-stripe' data-column-btn-text=''><thead>"
            + "<tr id='L0P1' class='bGrau'>"
            + "<th class=TR>#&nbsp;&nbsp;</th>"
            + (LS.ShowSpielerNr && QUERFORMAT() ? "<th class=TC>Nr.&nbsp;</th>" : "")
            + "<th class=TL>&nbsp;&nbsp;Name</th>"
            + (QUERFORMAT() ? "<th class='TL noprint'>&nbsp;&nbsp;Ort</th>" : "")
            + "<th class=TR>Ges&nbsp;</th>"
            + (stFinale ? "<th class='TR'>Fin&nbsp;</th>" : "")
            + "<th class=C colspan='6'>Vorrundenpunkte</th>"
            + "</tr></thead><tbody id=tbody>";
//            + (!QUERFORMAT() ? "<tr id='rFilter'><td colspan='" + (stFinale ? 9 : 8) + "'><input class='N S2' id='iFilter' placeholder='Nachname, Vorname, ...'></td>"
//                    + "<td class=TC><i id='icFilter' onclick='$(this).addClass(\"ui-disabled\");$(\"#iFilter\").val(\"\").blur();$(\"#tbody\").find(\"tr\").show();' class='i zmdi-plus-bold zmdi-hc-rotate-45 ui-disabled'></i></td></tr>" : "");

    var nSpieler = 0;
    var hPlatz = 0;
    var hLastKey = 0;
    var hClass = '';
    for (var ii = 0; ii < SORTnachPlatz.length; ii++) {
        var spieler = SORTnachPlatz[ii].substring((SORTnachPlatz[ii].lastIndexOf(';') + 1));
        if (istOOV(spieler)) {
            nSpieler++;

            if (spieler === LS.ME) {
                hClass = 'bBeige';
            } else {
                hClass = '';
            }

            if (hLastKey !== parseInt(SORTnachPlatz[ii])) {
                hLastKey = parseInt(SORTnachPlatz[ii]);
                hPlatz = nSpieler;
            }
            html += '<tr ' + (spieler === LS.ME ? 'id="tr' + LS.ME + '"' : '') + ' class="' + hClass + '">'
                    + '<td class="TR">' + hPlatz + '.&nbsp;</td>';
            if (LS.ShowSpielerNr && QUERFORMAT()) {
                html += '<td class=TC>' + (isNaN(spieler) ? '????' : spieler) + '&nbsp;</td>';
            }
            html += '<td><span onclick="event.stopPropagation();popupSpieler(\'' + spieler + '\');" class="P ' + (spieler === LS.ME ? 'cSchwarz' : 'cBlau') + '">' + (getName(spieler).replace(' ', '&nbsp;')) + '</span></td>';
            if (QUERFORMAT()) {
                html += '<td class=noprint>' + getSpielerOrt(spieler, true) + '</td>';
            }
            html += '<th class="TR">' + SP[spieler][iSaison][spCuppunkte] + '&nbsp;</th>';
            if (stFinale) {
                html += "<td class='TR'>" + getCupPunkte(stFinale, spieler) + "&nbsp;</td>";
            }
            for (var i = 0; i < 6; i++) {
                if (CUP[spieler] && CUP[spieler][i]) {
                    html += '<td class="TR">' + CUP[spieler][i] + '&nbsp;</td>';
                } else {
                    html += '<td class="TR"></td>';
                }
            }

            html += '</tr>';
        }
    }

    html += "</tbody></table><br>";
    if (QUERFORMAT()) {
        html += "<table data-role=table class=S>"
                + "<tbody>"
                + "<tr><th colspan='2' class=TL>&nbsp;&nbsp;Daten:</th><td>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp;&nbsp;&nbsp;&nbsp;</td></tr>"
                + "<tr><td class='R'>&nbsp;&nbsp;" + nTurniere + "</td><td>&nbsp;&nbsp;Turniere</td><td></td></tr>"
                + "<tr><td class='R'>&nbsp;&nbsp;" + nSpieler + "</td><td>&nbsp;&nbsp;Teilnehmer</td><td></td></tr>"
                + "<tr><td class='R'>&nbsp;&nbsp;" + nTeilnahmen + "</td><td>&nbsp;&nbsp;Teilnahmen</td></tr>"
                + "</tbody></table><br>"

                + "<table data-role='table' data-mode='columntoggle' cellspacing='0' class='table XXS'>"
                + "<tbody><tr>"
                + "<td>&nbsp;&nbsp;&nbsp;&copy; 2015-" + new Date().getFullYear() + " by Leo Luger</td>"
                + "<td class=TC>" + (stCup === 56 ? "Siegfried Braun" : "") + "</td>"
                + (stCup === 54 ? "<td class=TR>tarock.web.app?St.Tarockcup&nbsp;</td>" : "")
                + (stCup === 56 ? "<td class=TR>tarock.web.app?Wr.Tarockcup&nbsp;</td>" : "")
                + (stCup === 81 ? "<td class=TR>tarock.web.app?Schmankerl Tarock&nbsp;</td>" : "")
                + "</tr></tbody></table>";
        $('#dRumpf').html(html).css('margin-top', $('#qfHeader').height() + 'px');
    } else {
        html += "&nbsp;&nbsp;&nbsp;<span class='XXS'>&copy; 2015-" + new Date().getFullYear() + " by Leo Luger<br><br></span>";
        $('#dContent').html(html);
        $('#sideTurniereMT').hide();
        $('#nbUebersicht,#nbSaison,#nbArchiv').removeClass('ui-disabled').removeClass('ui-btn-active');
        var hx = $(window).innerHeight() - $('#sideContent').offset().top - 1;
        $('#sideContent').css('height', hx + 'px').scrollTop(0);
    }

    hideEinenMoment();
    if (stFinale) {
        setFont(3.7, true);
    } else {
        setFont(4.1, true);
    }

    if (QUERFORMAT()) {
        window.scrollTo(0, 0);
        if (window.navigator.userAgent.indexOf("MSIE ") === -1) {
            $('#mTable').stickyTableHeaders({cacheHeaderHeight: true, "fixedOffset": $('#qfHeader')});
        }
    }
}