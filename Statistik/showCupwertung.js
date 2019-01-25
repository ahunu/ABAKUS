
/* global LS, stSaison, QUERFORMAT(), stFinale, getName, SPIELER, STAT, stCup, CUPS, stSaisonTab, stEndstand, jbSpieler, ADMIN */

function showCupwertung() {

    if (QUERFORMAT()) {
        if (lastBtn) {
            $(lastBtn).removeClass('ui-btn-active');
        }
        lastBtn = '#bCupwertung';
        $(lastBtn).addClass('ui-btn-active');
    }

    if (jbSpieler.isOpen) {
        jbSpieler.close();
    }
    if (ADMIN || (LS.ME === '2037' && stCup === 56)) { // Robert Sedlaczek
        if (LS.ME === '3425') {
            showIcons(['#iDownload', '#iPrint']);
        } else {
            showIcons(['#iPrint']);
        }
    }

    stStat = 'Cupwertung';
    stNamenLen = 0.3;
    writeCanvas('Cupwertung  ' + stSaison);
    $("#dCopyright").hide();
    if (stEndstand) {
        $('#tStand').html('Endstand:').attr('style', 'position: fixed; top: 44px; right: 5px; cursor: pointer;').show();
    } else {
        $('#tStand').html('Stand: ' + new Date().toLocaleDateString()).attr('style', 'position: fixed; top: 44px; right: 5px; cursor: pointer;').show();
    }

    var i = 0;
    var html = '';
    var tOF = [];
    if (stCup === 54) {
        tOF = [120, 109, 100, 93, 87, 82, 78, 73, 69, 64, 60, 57, 53, 50, 46, 43, 41, 38, 35, 33, 31, 29, 27, 25, 23, 22, 20, 19, 18, 17, 16, 15, 14, 13, 13, 12, 12, 11, 11, 11];
    } else {
        tOF = [120, 111, 104, 98, 95, 91, 88, 84, 81, 78, 75, 72, 69, 66, 63, 61, 58, 56, 53, 51, 49, 47, 45, 43, 41, 39, 37, 36, 34, 32, 31, 30, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 17, 16, 15, 15, 14, 14, 13, 13, 13, 12, 12, 12, 11, 11, 11, 11];
    }
    var CUP = {};
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

    var SORT = [];
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
            SORT.push((9000 - tCUP[0]) + spieler + ';' + spieler);
        } else {
            SORT.push((9000 - tCUP[0]) + (SPIELER[spieler] ? SPIELER[spieler][0] : '????') + ';' + spieler);
        }
    }

    SORT.sort();
    var html = (!QUERFORMAT() ? "<div id='dDummy'></div>" : "")
            + (stCup === 58 // Stadltarock
                    ? "&nbsp;<img src='../Icons/Fehler.png'  width='24' height='24'><span class=M>&nbsp;<b>Dies ist nicht die offizielle Cupwertung.</b><br></span>"
                    + "&nbsp;<img src='../Icons/Achtung.png'  width='24' height='24'><span class=M>&nbsp;<b>Die offizielle Liste (nach Tischpunkten) kannst du bei Alexandra Sabkovski erfragen.</b><br></span>"
                    : ''
                    )
            + (QUERFORMAT() ? "<div id='dFilter' class='noprint'><input class='N M' id='iFilter' placeholder='Nachname, Vorname," + (QUERFORMAT() ? " Ort," : "") + " ...'></div>" : "")
            + "<table id=mTable style='swidth: 100% !important;' data-role='table' data-mode='columntoggle' cellspacing='0' class='table ui-body-d ui-shadow ui-responsive table-stripe' data-column-btn-text=''><thead>"
            + "<tr id='L0P1' class='bGrau'>"
            + "<th class=TR>#&nbsp;&nbsp;</th>"
            + (LS.ShowSpielerNr && QUERFORMAT() ? "<th class=TC>Nr.&nbsp;</th>" : "")
            + "<th class=TL>&nbsp;&nbsp;Name</th>"
            + (QUERFORMAT() ? "<th class='TL noprint'>&nbsp;&nbsp;Ort</th>" : "")
            + "<th class=TR>Ges&nbsp;</th>"
            + (stFinale ? "<th class='TR'>Fin&nbsp;</th>" : "")
            + "<th class=C colspan='6'>Vorrundenpunkte</th>"
            + (QUERFORMAT() ? "<th class=TC>TN</th><th class=TC nowrap>1. 2. 3.</th>" + (stSaison === stSaisonTab[0] && stCup < 58 ? "<th class=TR>&Ouml;F&nbsp;</th>" : "") : "")
            + "</tr></thead><tbody id=tbody>"
            + (!QUERFORMAT() ? "<tr id='rFilter'><td colspan='" + (stFinale ? 9 : 8) + "'><input class='N S2' id='iFilter' placeholder='Nachname, Vorname, ...'></td>"
//                    + "<td class=TC><i onclick='$(\"#iFilter\").val(\"\").blur();$(\"#tbody\").find(\"tr\").show();' class='i zmdi-delete'></i></td></tr>" : "");
                    + "<td class=TC><i id='icFilter' onclick='$(this).addClass(\"ui-disabled\");$(\"#iFilter\").val(\"\").blur();$(\"#tbody\").find(\"tr\").show();' class='i zmdi-cancel ui-disabled'></i></td></tr>" : "");

    var nSpieler = 0;
    var hPlatz = 0;
    var hLastPoints = 0;
    var hClass = '';
    for (var ii = 0; ii < SORT.length; ii++) {
        nSpieler++;
        var spieler = SORT[ii].substring((SORT[ii].lastIndexOf(';') + 1));
        tCUP = CUP[spieler];
        if (window.location.href.toUpperCase().indexOf('OOV') < 0) {
            if (spieler === LS.ME) {
                hClass = 'bBeige';
            } else {
                hClass = '';
                if (istFreund(spieler)) {
                    hClass = ' bBeige2';
                }
                if (LS.tempVIPs) {
                    if (LS.tempVIPs.indexOf(spieler) > 0) {
                        hClass = ' bBeige2';
                    }
                }
            }
        }
        if (hLastPoints !== tCUP[0]) {
            hLastPoints = tCUP[0];
            hPlatz = nSpieler;
        }

        html += '<tr class="' + hClass + '">'
                + '<td class="TR">' + hPlatz + '.&nbsp;</td>';
        if (LS.ShowSpielerNr && QUERFORMAT()) {
            html += '<td class=TC>' + (isNaN(spieler) ? '????' : spieler) + '&nbsp;</td>';
        }
        html += '<td><span onclick="event.stopPropagation();popupSpieler(\'' + spieler + '\');" class="P ' + (spieler === LS.ME ? 'cSchwarz' : 'cBlau') + '">' + (getName(spieler).replace(' ', '&nbsp;')) + '</span></td>';
        if (QUERFORMAT()) {
            html += '<td class=noprint>' + getSpielerOrt(spieler, true) + '</td>';
        }
        html += '<th class="TR">' + tCUP[0] + '&nbsp;</th>';
        if (stFinale) {
            html += "<td class='TR'>" + getCupPunkte(stFinale, spieler) + "&nbsp;</td>";
        }
        for (var i = 0; i < 6; i++) {
            if (!isNaN(tCUP[5][i])) {
                html += '<td class="TR">' + tCUP[5][i] + '&nbsp;</td>';
            } else {
                html += '<td class="TR"></td>';
            }
        }

        if (QUERFORMAT()) {
            html += '<td class="TR">' + tCUP[4] + '&nbsp;</td>';
            if (tCUP[1] || tCUP[2] || tCUP[3]) {
                html += '<td class="TC" nowrap>' + tCUP[1] + '-' + tCUP[2] + '-' + tCUP[3] + '</td>';
            } else {
                html += '<td class="TC">-</td>';
            }
            if (stSaison === stSaisonTab[0] && stCup < 58) {
                if (ii < tOF.length) {
                    html += '<td class="R" nowrap>' + tOF[ii] + '&nbsp;</td>';
                } else {
                    html += '<td class="R">-&nbsp;&nbsp;</td>';
                }
            }
        }
        html += '</tr>';
    }

    html += "</tbody></table><br>";
    if (QUERFORMAT()) {
        html += "<table data-role=table class=S>"
                + "<tbody>"
                + "<tr><th colspan='2' class=TL>&nbsp;&nbsp;Legende:</th></tr>"
                + "<tr><td>&nbsp;&nbsp;TN:</td><td>Teilnahmen</td></tr>"
                + "<tr><td>&nbsp;&nbsp;1.2.3.:&nbsp;&nbsp;</td><td>Stockerlpl&auml;tze</td></tr>"
                + (stSaison === stSaisonTab[0] && stCup < 58 ? "<tr><td>&nbsp;&nbsp;&Ouml;F:</td><td>&Ouml;sterreichfinale Vorrundenpunkte</td></tr>" : "")
                + "<tr><td></td><td></td></tr>"
                + "</tbody></table><br>"

                + "<table data-role='table' data-mode='columntoggle' cellspacing='0' class='table XXS'>"
                + "<tbody><tr>"
                + "<td>&nbsp;&nbsp;&nbsp;&copy; 2015-" + new Date().getFullYear() + " by Leo Luger</td>"
                + "<td class=TC>" + (stCup === 56 ? "Siegfried Braun" : "") + "</td>"
                + (stCup === 54 ? "<td class=TR>tarock.firebaseapp.com?St.Tarockcup&nbsp;</td>" : "")
                + (stCup === 56 ? "<td class=TR>tarock.firebaseapp.com?Wr.Tarockcup&nbsp;</td>" : "")
                + (stCup === 58 ? "<td class=TR>tarock.firebaseapp.com?Stadltarock&nbsp;</td>" : "")
                + "</tr></tbody></table><br>";
    } else {
        html += "&nbsp;&nbsp;&nbsp;<span class='XXS'>&copy; 2015-" + new Date().getFullYear() + " by Leo Luger<br><br></span>";
    }

    if (QUERFORMAT()) {
        $('#dRumpf').html(html);
    } else {
        $('#dContent').html(html);
        $('#sideDetails').hide();
        $('#nbUebersicht,#nbArchiv,#bAktSaison').removeClass('ui-disabled').removeClass('ui-btn-active');
        var hx = $(window).innerHeight() - $('#sideContent').offset().top - $('#dFooter').height() - 1;
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