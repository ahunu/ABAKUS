
/* global LS, stSaison, QUERFORMAT(), stFinale, getName, SPIELER, STAT, stCup, CUPS, stEndstand, jbSpieler, ADMIN, SAISON, CUP, is2, SP, spTeilnahmen, spCuppunkte, spBestePlatz, is3, is1, isSaison, getSpielerName, sp0BestePlatz, sp0Cup3ter, sp0Cup2ter, sp0Cupsiege, spPunkte, spRangImCup */

function addTNPosition(pSpieler) {

//    const spRangImCup = 0;
//    const spCuppunkte = 1;
//    const spTeilnahmen = 2;
//    const spBestePlatz = 3;
//    const spPunkte = 4;
//    const sp0Cupsiege = 1;
//    const sp0Cup2ter = 2;
//    const sp0Cup3ter = 3;

    var hBG = '';
    if (pSpieler === LS.ME) {
        hBG = 'bBeige';
    } else if (anz % 2) {
        hBG = 'bSehrHell';
    }

    var nSaisonTN = 0;
    var nTurnierTN = 0;
    var nPunkte = 0;
    var hBestePlatz = 9999;
    var hSumPlatz = 0;
    var n1te = 0;
    var n2te = 0;
    var n3te = 0;

    var hPos = '';
    for (var i = 1; i < SP[pSpieler].length; i++) {
        if (SP[pSpieler][i]) {
            nSaisonTN++;
            nTurnierTN += SP[pSpieler][i][spTeilnahmen];
            hSumPlatz += SP[pSpieler][i][spSumPlatz];
            nPunkte += SP[pSpieler][i][spPunkte];
            if (isNaN(SP[pSpieler][i][spBestePlatz])) {
                n1te += parseInt(SP[pSpieler][i][spBestePlatz]);
                n2te += parseInt(SP[pSpieler][i][spBestePlatz].substr(SP[pSpieler][i][spBestePlatz].indexOf('-') + 1));
                n3te += parseInt(SP[pSpieler][i][spBestePlatz].substr(SP[pSpieler][i][spBestePlatz].lastIndexOf('-') + 1));
            } else if (hBestePlatz > SP[pSpieler][i][spBestePlatz]) {
                hBestePlatz = SP[pSpieler][i][spBestePlatz];
            }
            hPos += '<tr ' + (LS.ME === pSpieler ? '' : 'hidden') + ' class="C ' + hBG + ' trDet trDet' + pSpieler + '" onclick="$(\'.trDet' + pSpieler + '\').hide();">'
                    + '<td>&nbsp;</td>'
                    + '<td class=TR><span onclick="event.stopPropagation();popupSpieler(\'' + pSpieler + '\',\'' + SAISON[i][isSaison] + '\');" class="P cBlau">' + SAISON[i][isSaison] + '</span></td>'
                    + '<td class=TC>' + SP[pSpieler][i][spRangImCup] + '</td>'
                    + '<td class=TC>' + SP[pSpieler][i][spBestePlatz] + '</td>'
                    + '<td class=TC>' + parseInt(SP[pSpieler][i][spSumPlatz] / SP[pSpieler][i][spTeilnahmen]) + '</td>'
                    + '<td class="TR QUER">' + SP[pSpieler][i][spTeilnahmen] + '</td>'
                    + (window.location.href[0] === 'f' ? '<td class="TR QUER">' + SP[pSpieler][i][spPunkte] + '</td>' : '')
                    + '<td>&nbsp;</td>'
                    + '</tr>';
        }
    }

    if (pSpieler === LS.ME
            || nTurnierTN >= 20
            || n1te || n2te || n3te
            || SP[pSpieler][1]
            || SP[pSpieler][2] && SP[pSpieler][2][spTeilnahmen] >= 5
            ) {

        anz++;


        html = '<tr id="tr' + pSpieler + '" class="' + hBG + '" onclick="$(\'.trDet' + pSpieler + '\').toggle();">'
                + '<th>&nbsp;</th>'
                + (SP[pSpieler][1]
                        ? '<td><span onclick="event.stopPropagation();popupSpieler(\'' + pSpieler + '\');" class="P cBlau">' + (getName(pSpieler).replace(' ', '&nbsp;')) + '</span></td>'
                        : '<td>' + (getName(pSpieler).replace(' ', '&nbsp;')) + '</td>'
                        );
        if (SP[pSpieler][0][sp0Cupsiege] || SP[pSpieler][0][sp0Cup2ter] || SP[pSpieler][0][sp0Cup3ter]) {
            html += '<td class=TC>' + (SP[pSpieler][0][sp0Cupsiege] ? SP[pSpieler][0][sp0Cupsiege] : '0') + '-'
                    + (SP[pSpieler][0][sp0Cup2ter] ? SP[pSpieler][0][sp0Cup2ter] : '0') + '-'
                    + (SP[pSpieler][0][sp0Cup3ter] ? SP[pSpieler][0][sp0Cup3ter] : '0') + '</td>';
        } else {
            if (SP[pSpieler][0][sp0BestePlatz] === 999) {
                html += '<td class=TC>-</td>';
            } else {
                html += '<td class=TC>' + SP[pSpieler][0][sp0BestePlatz] + '</td>';
            }
        }
        html += '<td class=C>' + (n1te || n2te || n3te ? n1te + '-' + n2te + '-' + n3te : hBestePlatz) + '</td>'
                + '<td class=TC>' + parseInt(hSumPlatz / nTurnierTN) + '</td>'
                + '<td class="TR QUER">' + nTurnierTN + '</td>'
                + '<td class="TR QUER">' + nPunkte + '</td>'
                + '<td>&nbsp;</td>'
                + '</tr>';

        return html + hPos;
    } else {
        return '';
    }
}

function showTeilnehmer(pSort) {

    var anz = 0;

    if (pSort) {
        showEinenMoment(CUPS.NAME[stCup], 'Statistik&nbsp;wird&nbsp;sortiert.');
        if (pSort === 'NAME') {

        } else if (pSort === 'NAME') {

        } else if (pSort === 'CUP') {

        } else if (pSort === 'TURNIER') {

        } else if (pSort === 'PLATZ') {

        } else if (pSort === 'TN') {

        } else if (pSort === 'PUNKTE') {

        }
    } else {
        pSort = 'CUP';
        showEinenMoment(CUPS.NAME[stCup], 'Statistik&nbsp;wird&nbsp;erstellt.');
    }

    setTimeout(function () {

        var html = '';
        if (QUERFORMAT()) {
            if (lastBtn) {
                $(lastBtn).removeClass('ui-btn-active');
            }
            lastBtn = '#bTeilnehmer';
            $(lastBtn).addClass('ui-btn-active');
        }

        if (jbSpieler.isOpen) {
            jbSpieler.close();
        }

        if (LS.ME.length === 4) {
            showIcons(['#iScrollToMe', '#iHideDetails', '#iShowDetails', '#iPrint']);
        }

        stStat = 'Teilnehmer';
        stNamenLen = 99;
        writeCanvas(stStat);
        $("#dCopyright").hide();
        if (QUERFORMAT()) {
            $('#dRumpf').html('');
        } else {
            $('#dContent').html('');
            $('#sideTurniereMT').hide();
            $('#nbUebersicht,#nbSaison,#nbArchiv').removeClass('ui-disabled').removeClass('ui-btn-active');
            var hx = $(window).innerHeight() - $('#sideContent').offset().top - 1;
            $('#sideContent').css('height', hx + 'px').scrollTop(0);
        }





        var hTN = 0;
        var sKey = '';
        var SORT = [];
        for (var spieler in SP) {
            sKey = '';
            if (pSort === 'NAME') {
                sKey = '';
            } else if (pSort === 'NAME') {

            } else if (pSort === 'CUP') {
                sKey = 9999 - SP[spieler][0][sp0BestePlatz];
                if (SP[spieler][0][sp0BestePlatz] < 4) {
                    sKey = 'a' + (SP[spieler][0][sp0Cupsiege] ? SP[spieler][0][sp0Cupsiege] : '0') + '-'
                            + (SP[spieler][0][sp0Cup2ter] ? SP[spieler][0][sp0Cup2ter] : '0') + '-'
                            + (SP[spieler][0][sp0Cup3ter] ? SP[spieler][0][sp0Cup3ter] : '0');
                } else {
                    sKey = 9000 - SP[spieler][0][sp0BestePlatz];
                }
            } else if (pSort === 'TURNIER') {
                sKey = 9999;
                for (var i = SP[spieler].length - 1; i > 0; i--) {
                    if (SP[spieler][i]) {
                        if (isNaN(SP[spieler][i][spBestePlatz])) {
                            sKey = "Stockerl";
                            break;
                        } else {
                            if (sKey > SP[spieler][i][spBestePlatz]) {
                                sKey = SP[spieler][i][spBestePlatz];
                            }
                        }
                    }
                }
                if (sKey === "Stockerl") {
                    sKey = 90000000;
                    for (var i = SP[spieler].length - 1; i > 0; i--) {
                        if (SP[spieler][i]) {
                            if (isNaN(SP[spieler][i][spBestePlatz])) {
                                sKey -= (parseInt(SP[spieler][i][spBestePlatz]) * 1000000
                                        + parseInt(SP[spieler][i][spBestePlatz].substr(SP[spieler][i][spBestePlatz].indexOf('-') + 1)) * 10000
                                        + parseInt(SP[spieler][i][spBestePlatz].substr(SP[spieler][i][spBestePlatz].lastIndexOf('-') + 1)) * 100);
                            }
                        }
                    }
                } else {
                    sKey = 90000000 + sKey;
                }
            } else if (pSort === 'PLATZ') {
                sKey = 0;
                hTN = 0;
                for (var i = SP[spieler].length - 1; i > 0; i--) {
                    if (SP[spieler][i]) {
                        sKey -= SP[spieler][i][spSumPlatz];
                        hTN += SP[spieler][i][spTeilnahmen];
                    }
                }
                sKey = 1000 - parseInt(sKey / hTN);
            } else if (pSort === 'TN') {
                sKey = 9999;
                for (var i = SP[spieler].length - 1; i > 0; i--) {
                    if (SP[spieler][i]) {
                        sKey -= SP[spieler][i][spTeilnahmen];
                    }
                }
            } else if (pSort === 'PUNKTE') {
                sKey = 50000;
                for (var i = SP[spieler].length - 1; i > 0; i--) {
                    if (SP[spieler][i]) {
                        sKey -= SP[spieler][i][spPunkte];
                    }
                }
            }
            SORT.push(sKey + getSpielerName(spieler) + ';' + spieler);
        }
        SORT.sort();

        var spieler = '';
        if (pSort === 'CUP') {
            for (var iSpieler = SORT.length - 1; iSpieler > 0; iSpieler--) {
                spieler = SORT[iSpieler].substr(SORT[iSpieler].indexOf(';') + 1);
                html += addTNPosition(spieler);
            }
        } else {
            for (var iSpieler = 0; iSpieler < SORT.length; iSpieler++) {
                spieler = SORT[iSpieler].substr(SORT[iSpieler].indexOf(';') + 1);
                html += addTNPosition(spieler);
            }
        }

        if (html) {
            html = "<table id=mTable data-role='table' data-filter='true' data-input='#iFilter' data-mode='columntoggle' cellspacing='0' class='table ui-body-d ui-shadow ui-responsive ssssstable-stripe' data-column-btn-text=''><thead>"
                    + "<tr id='L0P1' class='bGrau'>"
                    + "<th></th>"
                    + "<th id=CUP class='C P cBlau" + (pSort === 'NAME' ? ' U' : '') + "' onclick='showTeilnehmer(\"NAME\")'>Name</th>"
                    + "<th id=CUP class='C P cBlau" + (pSort === 'CUP' ? ' U' : '') + "' onclick='showTeilnehmer(\"CUP\")'>Cup<br>1.2.3.</th>"
                    + "<th id=TURNIER class='C P cBlau" + (pSort === 'TURNIER' ? ' U' : '') + "' onclick='showTeilnehmer(\"TURNIER\")'>Turnier<br>1.2.3.</th>"
                    + "<th id=PLATZ class='TC P cBlau" + (pSort === 'PLATZ' ? ' U' : '') + "' onclick='showTeilnehmer(\"PLATZ\")'>&Oslash;<br>Platz</th>"
                    + "<th id=TN class='TR P cBlau QUER" + (pSort === 'TN' ? ' U' : '') + "' onclick='showTeilnehmer(\"TN\")'>TN</th>"
                    + (window.location.href[0] === 'f' ? "<th id=PUNKTE class='TR P cBlau QUER" + (pSort === 'PUNKTE' ? ' U' : '') + "' onclick='showTeilnehmer(\"PUNKTE\")'>Punkte</th>" : '')
                    + "<th></th>"
                    + "</tr>"
                    + "</thead><tbody>"
                    + html
                    + "</tbody></table>";
            if (QUERFORMAT()) {
                html += "<br><table data-role=table>"
                        + "<tbody>"
                        + "<tr class=XS><td>&nbsp;&nbsp;&nbsp;&nbsp;</td></td><th>Legende:</th><td></td></tr>"
                        + "<tr class=XS><td></td><td><b>1.2.3.</b></td><td>Stockerlplätze / beste Platzierung</td></tr>"
                        + "<tr class=XS><td></td><td><b>&Oslash; Platz</b></td><td>Durchschnittliche Platzierung</td></tr>"
                        + "<tr class=XS><td></td><td><b>TN</b></td><td>Teilnahmen</td></tr>"
                        + "<tr><td></td><td colspan=2>&nbsp;</th></tr>"
                        + "<tr><td></td><td colspan=2>Mit einen Klick auf eine Spaltenüberschrift kannst du die Sortierung ändern.</th></tr>"
                        + "<tr><td></td><td colspan=2>Durch das Anklicken einer Zeile kannst du die Saisonergebnisse ein- oder ausblenden.</th></tr>"
                        + "<tr><td></td><td colspan=2>&nbsp;</th></tr>"
                        + "<tr><td></td><td colspan=2>Es sind alle jene Spieler gelistet welche</th></tr>"
                        + "<tr><td></td><td colspan=2>in der aktuellen Saison schon teilgenommen,</th></tr>"
                        + "<tr><td></td><td colspan=2>in der letzten Saison mindestens fünfmal teilgenommen,</th></tr>"
                        + "<tr><td></td><td colspan=2>insgesamt mindestens 20 mal teilgenommen</th></tr>"
                        + "<tr><td></td><td colspan=2>oder mindestens einen Stockerlplatz erreicht haben.</th></tr>"
                        + "</tbody></table><br>";
                $('#dRumpf').html(html).show();
            } else {
                html += "<br><table data-role=table>"
                        + "<tbody>"
                        + "<tr class=S><td>&nbsp;&nbsp;&nbsp;&nbsp;</td></td><th>Legende:</th><td></td></tr>"
                        + "<tr class=S><td></td><td><b>1.2.3.</b></td><td>Stockerlplätze / beste Platzierung</td></tr>"
                        + "<tr class=S><td></td><td><b>&Oslash; Platz</b></td><td>Durchschnittliche Platzierung</td></tr>"
                        + "<tr class=S><td></td><td><b>TN</b></td><td>Teilnahmen</td></tr>";
                        + "</tbody></table><br><br>";
                $('#dContent').html(html).show();
            }
            hideEinenMoment();
            setFont(4.8, true);
            if (QUERFORMAT()) {
                window.scrollTo(0, 0);
                if (window.navigator.userAgent.indexOf("MSIE ") === -1) {
                    $('#mTable').stickyTableHeaders({cacheHeaderHeight: true, "fixedOffset": $('#qfHeader')});
                }
            }
        }
    }, 200);
}