
/* global LS, stSaison, QUERFORMAT(), getName, SPIELER, STAT, stCup, CUPS, stEndstand, jbSpieler, ADMIN, iSaison, SP, spRangImCup, is1, SAISON, spTeilnahmen, spBestePlatz, spCuppunkte, stFilter, PC, getSpielerName */

function showHeinewertung() {

    if (iSaison === 1) {
        var nWertungen = stAktTurniere;
    } else {
        var nWertungen = SAISON[iSaison][isAnzTurniere];
    }

    if (nWertungen > 10) {
        nWertungen = parseInt(nWertungen / 2);
    } else {
        nWertungen = parseInt((nWertungen + 1) / 2);
    }

    var nShowWertungen = nWertungen;
    if (nShowWertungen > 7) {
        nShowWertungen = 7;
    }

    if (QUERFORMAT()) {
        if (lastBtn) {
            $(lastBtn).removeClass('ui-btn-active');
        }
        lastBtn = '#bHeinewertung';
        $(lastBtn).addClass('ui-btn-active');
    }

    if (jbSpieler.isOpen) {
        jbSpieler.close();
    }

    stStat = 'Heinewertung';
    stNamenLen = 0.3;
    writeCanvas('Heinewertung  ' + stSaison);

    $("#dCopyright").hide();
    if (stEndstand) {
        $('#tStand').html('Endstand:').attr('style', 'position: fixed; top: 44px; right: 5px; cursor: pointer;').show();
    } else {
        $('#tStand').html('Stand: ' + new Date().toLocaleDateString()).attr('style', 'position: fixed; top: 44px; right: 5px; cursor: pointer;').show();
    }

    var i = 0;
    var html = '';
    var tOF = [];
    if (stCup === 53) {
        tOF = [0, 120, 112, 106, 101, 98, 96, 93, 90, 88, 85, 83, 80, 78, 76, 73, 71, 69, 67, 65, 63, 61, 59, 57, 55, 53, 52, 50, 48, 47, 45, 44, 42, 41, 40, 38, 37, 36, 35, 33, 32, 31, 30, 29, 28, 27, 26, 25, 24, 24, 23, 22, 21, 21, 20, 19, 19, 18, 18, 17, 17, 16, 16, 15, 15, 14, 14, 14, 13, 13, 13, 13, 12, 12, 12, 12, 11, 11, 11, 11, 11];
    } else if (stCup === 54 || stCup === 55) {
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
                if (!stFilter || STAT[turnier]._NAME.toUpperCase().indexOf(stFilter) >= 0) {
                    nTurniere++;
                    for (var spieler in STAT[turnier]) {
                        if (spieler[0] !== '_') {
                            nTeilnahmen++;
                            if (CUP[spieler]) {
                                hCupPunkte = getHeinePunkte(turnier, spieler);
                                if (getHeinePunkte(turnier, spieler) === '-') {
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
                            } else {
                                CUP[spieler] = [getHeinePunkte(turnier, spieler)];
                            }
                        }
                    }
                }
            }
        }
    }

    var SORTnachPlatz = [];

    for (var spieler in SP) { // der Internet Explorer versteht kein  for (var CUPrec of CUP)
        var hCuppunkte = 0;
        if (CUP[spieler]) {
            for (i = 0; i < nWertungen && i < CUP[spieler].length; i++) {
                if (IsInteger(CUP[spieler][i])) {
                    hCuppunkte += CUP[spieler][i];
                }
            }
        }
        if (SP[spieler][iSaison]) {
            SORTnachPlatz.push((9000 - hCuppunkte) + (SPIELER[spieler] ? SPIELER[spieler][0] : '????') + ';' + spieler);
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
    var html = (QUERFORMAT() ? "<div id='dFilter' class='noprint'><input class='N M' id='iFilter' placeholder='Nachname, Vorname," + (QUERFORMAT() ? " Ort," : "") + " ...'></div>" : "")
            + "<table id=mTable style='swidth: 100% !important;' data-role='table' data-mode='columntoggle' cellspacing='0' class='table ui-body-d ui-shadow ui-responsive table-stripe' data-column-btn-text=''><thead>"
            + "<tr id='L0P1' class='bGrau'>"
            + "<th class=TR>#&nbsp;&nbsp;</th>"
            + (LS.ShowSpielerNr && QUERFORMAT() ? "<th class=TC>Nr.&nbsp;</th>" : "")
            + "<th class=TL>&nbsp;&nbsp;Name</th>"
            + (QUERFORMAT() ? "<th class='TL noprint'>&nbsp;&nbsp;Ort</th>" : "")
            + "<th class=TR>Ges&nbsp;</th>"
            + "<th class=C colspan='7'>Vorrundenpunkte</th>"
            + (QUERFORMAT() ? "<th class=TC>TN</th><th class=TC nowrap>1. 2. 3.</th>" + (iSaison === 1 && stCup >= 50 && stCup <= 60 ? "<th class=TR>&Ouml;F&nbsp;</th>" : "") : "")
            + "</tr></thead><tbody id=tbody>"
            + (!QUERFORMAT() ? "<tr id='rFilter'><td colspan='8'><input class='N S2' id='iFilter' placeholder='Nachname, Vorname, ...'></td>"
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

        if (hLastKey !== parseInt(SORTnachPlatz[ii])) {
            hLastKey = parseInt(SORTnachPlatz[ii]);
            hPlatz = nSpieler;
        }
        html += '<tr ' + (spieler === LS.ME ? 'id="tr' + LS.ME + '"' : '') + ' class="' + hClass + '">'
                + '<td class="TR">' + hPlatz + '.&nbsp;</td>';
        if (LS.ShowSpielerNr && QUERFORMAT()) {
            html += '<td class=TC>' + (isNaN(spieler) ? '????' : spieler) + '&nbsp;</td>';
        }
        html += '<td><span id="sp' + spieler + '" onclick="event.stopPropagation();popupSpieler(\'' + spieler + '\');" class="P ' + (spieler === LS.ME ? 'cSchwarz' : 'cBlau') + '">' + (getName(spieler).replace(' ', '&nbsp;')) + '</span></td>';
        if (QUERFORMAT()) {
            html += '<td class=noprint>' + getSpielerOrt(spieler, true) + '</td>';
        }

        var hCuppunkte = 0;
        if (CUP[spieler]) {
            for (i = 0; i < nWertungen && i < CUP[spieler].length; i++) {
                if (IsInteger(CUP[spieler][i])) {
                    hCuppunkte += CUP[spieler][i];
                }
            }
        }
        html += '<th class="TR">' + hCuppunkte + '&nbsp;</th>';

        if (CUP[spieler]) {
            if (CUP[spieler].length <= 7) {
                for (i = 0; i < nShowWertungen && i < CUP[spieler].length; i++) {
                    html += '<td class="TR">' + CUP[spieler][i] + '&nbsp;</td>';
                }
                for (i = CUP[spieler].length; i < nShowWertungen; i++) {
                    html += '<td class="TR"></td>';
                }
            } else {
                html += '<td class="TR">' + CUP[spieler][0] + '&nbsp;</td>';
                html += '<td class="TR">' + CUP[spieler][1] + '&nbsp;</td>';
                html += '<td class="TR">' + CUP[spieler][2] + '&nbsp;</td>';
                html += '<td class="TR">' + CUP[spieler][3] + '&nbsp;</td>';
                html += '<td class="TR">...&nbsp;</td>';
                if (CUP[spieler].length > nWertungen - 2) {
                    html += '<td class="TR">' + CUP[spieler][nWertungen - 2] + '&nbsp;</td>';
                } else {
                    html += '<td class="TR"></td>';
                }
                if (CUP[spieler].length > nWertungen - 1) {
                    html += '<td class="TR">' + CUP[spieler][nWertungen - 1] + '&nbsp;</td>';
                } else {
                    html += '<td class="TR"></td>';
                }
//                for (i = 0; i < nWertungen && i < 5; i++) {
//                    html += '<td class="TR">' + CUP[spieler][i] + '&nbsp;</td>';
//                }
//                html += '<td class="TR">...&nbsp;</td>';
//                if (CUP[spieler][5] === '-') {
//                    html += '<td class="TR">-&nbsp;</td>';
//                } else {
//                    for (i = (nWertungen < CUP[spieler].length ? nWertungen : CUP[spieler].length) - 1; i > 0; i--) {
//                        if (CUP[spieler][i] !== '-') {
//                            html += '<td class="TR">' + CUP[spieler][i] + '&nbsp;</td>';
//                            break;
//                        }
//                    }
//                }
            }
        }

        if (QUERFORMAT()) {
            html += '<td class="TR">' + SP[spieler][iSaison][spTeilnahmen] + '&nbsp;</td>';
            html += '<td class="TC" nowrap>' + SP[spieler][iSaison][spBestePlatz] + '</td>';
            if (iSaison === 1 && stCup >= 50 && stCup <= 60) {
                if (hPlatz < tOF.length) {
                    html += '<td class="R" nowrap>' + tOF[hPlatz] + '&nbsp;</td>';
                } else {
                    html += '<td class="R">-&nbsp;&nbsp;</td>';
                }
            }
        }
        html += '</tr>';
    }

    html += "</tbody></table><br>"
            + '<div class="S J" style="margin-left: 1vw; margin-right: 1vw">'
//            + '<b>Heinepunkte anstatt Fixpunkte:</b><br>'
//            + 'Um statistischen Verzerrungen wegen unterschiedlich großer Teilnehmerzahlen und unterschiedlich hoher Turniersiege vorzubeugen,&nbsp; '
//            + 'werden bei der Heinewertung anstatt der vom Rang abhängigen Fixpunkte die von den tatsächlich erzielten Punkten errechneten Heinepunkte verwendet.&nbsp; '
//            + '<br><br>'
            + '<b>Berechnung der Heinepunkte:</b><br>'
            + 'Bis 100 Punkten werden die tatsächlich erreichten Punkte voll angerechnet.&nbsp; '
            + 'Ab 100 Punkten zählt nur jeder zweite Punkt.&nbsp; Es werden maximal 200 Heinepunkte vergeben.&nbsp; Minuspunkte werden nicht gewertet.&nbsp; '
            + 'Von ' + (iSaison === 1 ? stAktTurniere : nTurniere) + ' Turnieren ' + (iSaison === 1 ? 'werden' : 'wurden') + ' die ' + nWertungen + ' besten Ergebnisse (50%) gewertet. '
            + '<br><br></div>';

    if (QUERFORMAT()) {
        html += "<table data-role=table class=S>"
                + "<tbody>"
                + "<tr><th colspan='2' class=TL>&nbsp;&nbsp;Daten:</th><td>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp;&nbsp;&nbsp;&nbsp;</td><th colspan='2' class=TL>&nbsp;&nbsp;Legende:</th></tr>"
                + "<tr><td class='R'>&nbsp;&nbsp;" + nTurniere + "</td><td>&nbsp;&nbsp;Turniere</td><td></td><td>&nbsp;&nbsp;TN:</td><td>Teilnahmen</td></tr>"
                + "<tr><td class='R'>&nbsp;&nbsp;" + nSpieler + "</td><td>&nbsp;&nbsp;Teilnehmer</td><td></td><td>&nbsp;&nbsp;1.2.3.:&nbsp;&nbsp;</td><td>Stockerlplätze / beste Platzierung</td></tr>"
                + "<tr><td class='R'>&nbsp;&nbsp;" + nTeilnahmen + "</td><td>&nbsp;&nbsp;Teilnahmen</td><td></td>" + (iSaison === 1 && stCup >= 50 && stCup <= 60 ? "<td>&nbsp;&nbsp;ÖF:</td><td>Österreichfinale Vorrundenpunkte</td>" : "") + "</tr>"
                + "</tbody></table><br>"

                + "<table data-role='table' data-mode='columntoggle' cellspacing='0' class='table XXS'>"
                + "<tbody><tr>"
                + "<td>&nbsp;&nbsp;&nbsp;&copy; 2015-" + new Date().getFullYear() + " by Leo Luger</td>"
                + "<td class=TC>" + (stCup === 56 ? "" : "") + "</td>"
                + (stCup === 54 ? "<td class=TR>tarock.web.app?St.Tarockcup&nbsp;</td>" : "")
                + (stCup === 56 ? "<td class=TR>tarock.web.app?Wr.Tarockcup&nbsp;</td>" : "")
                + (stCup === 15 ? "<td class=TR>tarock.web.app?Stadl Tarock&nbsp;</td>" : "")
                + "</tr></tbody></table>";
        $('#dRumpf').html(html).css('margin-top', $('#qfHeader').height() + 'px');
    } else {
        html += "&nbsp;&nbsp;&nbsp;<span class='XXS'>&copy; 2015-" + new Date().getFullYear() + " by Leo Luger<br><br></span>";
        $('#dContent').html(html);
        $('#sideTurniere').hide();
        $('#nbUebersicht,#nbSaison,#nbArchiv').removeClass('ui-disabled').removeClass('ui-btn-active');
        var hx = $(window).innerHeight() - $('#sideContent').offset().top - 1;
        $('#sideContent').css('height', hx + 'px').scrollTop(0);
    }

    hideEinenMoment();
    setFont(3.7, true);

    if (QUERFORMAT()) {
        window.scrollTo(0, 0);
        if (window.navigator.userAgent.indexOf("MSIE ") === -1) {
            $('#mTable').stickyTableHeaders({cacheHeaderHeight: true, "fixedOffset": $('#qfHeader')});
        }
    }

    if (QUERFORMAT() && PC) {
        $(".cBlau,.cSchwarz").on("mouseenter", function () {
            $("#sideTurniere,#sideContent").hide();
            var hID = $(this).attr('id');
            html = '<div data-role="navbar">'
                    + '<ul>'
                    + '<li><a href="#" class="ui-btn-active">'
                    + ((isNaN(hID.substr(2)) || !PC) ? '' : '<span class="N">' + hID.substr(2) + '</span>&nbsp;&nbsp;') + getSpielerName(hID.substr(2)).replace(' ', '&nbsp;') + (iSaison === 1 ? '' : '&nbsp;&nbsp;-&nbsp;&nbsp;' + stSaison + ' ') + (!isNaN(hID.substr(2)) && isVERSTORBEN(SPIELER[hID.substr(2)][4]) ? '&nbsp;&#134;' : '') + (QUERFORMAT() && stStat !== "Platzierungen" ? '' : '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + getSpielerOrt(hID.substr(2), true))
                    + '</a></li>'
                    + '</ul>'
                    + '</div>';
            $("#sideSpieler").html(html + getSpieler(hID.substr(2))).trigger('create').show();
        });
        $('.cBlau,.cSchwarz').on("mouseleave", function () {
            $("#sideSpieler").hide();
            $("#sideTurniere,#sideContent").show();
        });
    }
}

function showWarumHeinewertung() {

    if (QUERFORMAT()) {
        if (lastBtn) {
            $(lastBtn).removeClass('ui-btn-active');
        }
        lastBtn = '#bWarumHeinewertung';
        $(lastBtn).addClass('ui-btn-active');
    }

    if (jbSpieler.isOpen) {
        jbSpieler.close();
    }

    stStat = 'Heinewertung';
    $("#dCopyright").hide();

    var html = (QUERFORMAT()
            ? '<div class=M style="text-align:justify;margin:6vw;"><br><br>'
            : '<div class=M style="text-align:justify;margin:3vw;">'
            )

            + '<p>Wir alle kennen es nur zu gut. Endlich hat man gute Blätter und macht mit 200 Punkten einen dritten Platz. Beim nächsten Mal gewinnt dann ein anderer mit 150 Punkten das Turnier.'

            + '<p>Da für einen Turniersieg mitunter stark unterschiedlich viele Punkte erforderlich sind, erhöht das Fixpunktesystem den im Königrufen ohnehin schon sehr hohen Glücksfaktor.'

            + '<p>Bei einem Turnier mit 300 Teilnehmern spielt jeder in drei Runden jeweils gegen drei unterschiedlich starke Gegner. Genauso wie bei einem Turnier mit 60 oder weniger Teilnehmern.'

            + '<p>Die Hürde, eine bestimmte Punktezahl zu erreichen, ist also für jeden gleich hoch. Die Chance möglichst viele Fixpunkte zu erreichen schwindet aber mit der Anzahl der Teilnehmer.'

            + '<p>Da im Sport Fairness alles ist, wurde mit den Heinepunkten ein Punktesystem entwickelt, dass die tatsächlich erreichten Punkte als Ausgangswert verwendet.'

            + '<p>Bis 100 Punkten werden die tatsächlich erreichten Punkte voll angerechnet. Ab 100 Punkten zählt jeder zweite Punkt. Es werden maximal 200 Heinepunkte vergeben. Minuspunkte werden nicht gewertet. Bei 25 Turnieren werden die 12 besten Ergebnisse gewertet. Das sind 50 Prozent der veranstalteten Truniere.'

//            + '<p>Aufgrund von Überlegungen im Sauwaldcup, im Steirischen, im Tiroler und im Wiener Tarockcup wird mit der Heinewertung eine faire Alternative zur Fixpunktewertung angeboten.'

//            + '<p>Da von jeden Cup immer mehr Turniere veranstaltet werden, sollen für die Heinewertung in einer späteren Ausbaustufe mehr als die üblichen sechs besten Ergebnisse verwendet werden.'

            + '</div>';

    if (QUERFORMAT()) {
        writeCanvas('Warum gibt es eine Heinewertung?');
        $('#dRumpf').html(html).css('margin-top', $('#qfHeader').height() + 'px');
    } else {
        writeCanvas('Warum Heinewertung?');
        $('#dContent').html(html);
        $('#sideTurniere').hide();
        $('#nbUebersicht,#nbSaison,#nbArchiv').removeClass('ui-disabled').removeClass('ui-btn-active');
        var hx = $(window).innerHeight() - $('#sideContent').offset().top - 1;
        $('#sideContent').css('height', hx + 'px').scrollTop(0);
    }
}