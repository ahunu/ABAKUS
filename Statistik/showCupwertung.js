
/* global LS, stSaison, QUERFORMAT(), stFinale, getName, SPIELER, STAT, stCup, CUPS, stEndstand, jbSpieler, ADMIN, iSaison, SP, spRangImCup, is1, SAISON, spTeilnahmen, spBestePlatz, spCuppunkte */

function showCupwertung() {


//    if (LS.ME === '3425') {
//        if (QUERFORMAT()) {
//            $('#dRumpf').html('<object data="https://photos.app.goo.gl/AWuYWXxWMw6AZEiQ8" width="400" height="300" type="text/html">Alternative Conten');
//        } else {
//            $('#dContent').load('https://photos.app.goo.gl/AWuYWXxWMw6AZEiQ8');
//            $('#sideDetails').hide();
//            $('#nbUebersicht,#nbSaison,#nbArchiv').removeClass('ui-disabled').removeClass('ui-btn-active');
//            var hx = $(window).innerHeight() - $('#sideContent').offset().top - 1;
//            $('#sideContent').css('height', hx + 'px').scrollTop(0);
//        }
//        return;
//    }

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
        tOF = [0, 120, 109, 100, 93, 87, 82, 78, 73, 69, 64, 60, 57, 53, 50, 46, 43, 41, 38, 35, 33, 31, 29, 27, 25, 23, 22, 20, 19, 18, 17, 16, 15, 14, 13, 13, 12, 12, 11, 11, 11];
    } else {
        tOF = [0, 120, 111, 104, 98, 95, 91, 88, 84, 81, 78, 75, 72, 69, 66, 63, 61, 58, 56, 53, 51, 49, 47, 45, 43, 41, 39, 37, 36, 34, 32, 31, 30, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 17, 16, 15, 15, 14, 14, 13, 13, 13, 12, 12, 12, 11, 11, 11, 11];
    }
    var CUP = {};
    var hCupPunkte = 0;
    var nTurniere = 0;
    var nTeilnahmen = 0;
    for (var turnier in STAT) {
        if (turnier[0] === '2') {
            if (STAT[turnier]._SAISON === stSaison) {
                if (stCup !== 56
                        || stCup === 56 && window.location.href.toUpperCase().indexOf('OOV') < 0 // OOV = Out Of Vienna
                        || stCup === 56 && window.location.href.toUpperCase().indexOf('OOV') > 0 && STAT[turnier]._NAME.toUpperCase().indexOf('OOV') > 0) {
                    nTurniere++;
                    for (var spieler in STAT[turnier]) {
                        if (spieler[0] !== '_') {

                            if (stCup !== 56
                                    || stCup === 56 && window.location.href.toUpperCase().indexOf('OOV') < 0 // OOV = Out Of Vienna
                                    || stCup === 56 && window.location.href.toUpperCase().indexOf('OOV') > 0 && istFreund(spieler)) {

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
    var hKey = 0;
    for (var spieler in SP) { // der Internet Explorer versteht kein  for (var CUPrec of CUP)
        if (SP[spieler][iSaison]) {
            SORTnachPlatz.push((100 + SP[spieler][iSaison][spRangImCup]) + (SPIELER[spieler] ? SPIELER[spieler][0] : '????') + ';' + spieler);
        }
    }

    if (LS.ME.length === 4) {
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
            + (stCup === 81 // Schmankerl Tarock
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
            + (QUERFORMAT() ? "<th class=TC>TN</th><th class=TC nowrap>1. 2. 3.</th>" + (iSaison === 1 && stCup < 60 ? "<th class=TR>&Ouml;F&nbsp;</th>" : "") : "")
            + "</tr></thead><tbody id=tbody>"
            + (!QUERFORMAT() ? "<tr id='rFilter'><td colspan='" + (stFinale ? 9 : 8) + "'><input class='N S2' id='iFilter' placeholder='Nachname, Vorname, ...'></td>"
//                    + "<td class=TC><i onclick='$(\"#iFilter\").val(\"\").blur();$(\"#tbody\").find(\"tr\").show();' class='i zmdi-delete'></i></td></tr>" : "");
                    + "<td class=TC><i id='icFilter' onclick='$(this).addClass(\"ui-disabled\");$(\"#iFilter\").val(\"\").blur();$(\"#tbody\").find(\"tr\").show();' class='i zmdi-plus-bold zmdi-hc-rotate-45 ui-disabled'></i></td></tr>" : "");

    var nSpieler = 0;
    var hPlatz = 0;
    var hLastKey = 0;
    var hClass = '';
    for (var ii = 0; ii < SORTnachPlatz.length; ii++) {
        nSpieler++;
        var spieler = SORTnachPlatz[ii].substring((SORTnachPlatz[ii].lastIndexOf(';') + 1));

        if (spieler === LS.ME) {
            hClass = 'bBeige';
        } else if (window.location.href.toUpperCase().indexOf('OOV') < 0) {
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
            if (CUP[spieler][i]) {
                html += '<td class="TR">' + CUP[spieler][i] + '&nbsp;</td>';
            } else {
                html += '<td class="TR"></td>';
            }
        }

        if (QUERFORMAT()) {

            html += '<td class="TR">' + SP[spieler][iSaison][spTeilnahmen] + '&nbsp;</td>';
            html += '<td class="TC" nowrap>' + SP[spieler][iSaison][spBestePlatz] + '</td>';

            if (iSaison === 1 && stCup < 60) {
                if (hPlatz < tOF.length) {
                    html += '<td class="R" nowrap>' + tOF[hPlatz] + '&nbsp;</td>';
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
                + "<tr><th colspan='2' class=TL>&nbsp;&nbsp;Daten:</th><td>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp;&nbsp;&nbsp;&nbsp;</td><th colspan='2' class=TL>&nbsp;&nbsp;Legende:</th></tr>"
                + "<tr><td class='R'>&nbsp;&nbsp;" + nTurniere + "</td><td>&nbsp;&nbsp;Turniere</td><td></td><td>&nbsp;&nbsp;TN:</td><td>Teilnahmen</td></tr>"
                + "<tr><td class='R'>&nbsp;&nbsp;" + nSpieler + "</td><td>&nbsp;&nbsp;Teilnehmer</td><td></td><td>&nbsp;&nbsp;1.2.3.:&nbsp;&nbsp;</td><td>Stockerlplätze / beste Platzierung</td></tr>"
                + "<tr><td class='R'>&nbsp;&nbsp;" + nTeilnahmen + "</td><td>&nbsp;&nbsp;Teilnahmen</td><td></td>" + (iSaison === 1 && stCup < 60 ? "<td>&nbsp;&nbsp;ÖF:</td><td>Österreichfinale Vorrundenpunkte</td>" : "") + "</tr>"
                + "</tbody></table><br>"

                + "<table data-role='table' data-mode='columntoggle' cellspacing='0' class='table XXS'>"
                + "<tbody><tr>"
                + "<td>&nbsp;&nbsp;&nbsp;&copy; 2015-" + new Date().getFullYear() + " by Leo Luger</td>"
                + "<td class=TC>" + (stCup === 56 ? "Siegfried Braun" : "") + "</td>"
                + (stCup === 54 ? "<td class=TR>tarock.firebaseapp.com?St.Tarockcup&nbsp;</td>" : "")
                + (stCup === 56 ? "<td class=TR>tarock.firebaseapp.com?Wr.Tarockcup&nbsp;</td>" : "")
                + (stCup === 81 ? "<td class=TR>tarock.firebaseapp.com?Schmankerl Tarock&nbsp;</td>" : "")
                + "</tr></tbody></table>";
    } else {
        html += "&nbsp;&nbsp;&nbsp;<span class='XXS'>&copy; 2015-" + new Date().getFullYear() + " by Leo Luger<br><br></span>";
    }

    if (QUERFORMAT()) {
        $('#dRumpf').html(html);
    } else {
        $('#dContent').html(html);
        $('#sideDetails').hide();
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