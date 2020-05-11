
/* global LS, stSaison, QUERFORMAT(), stFinale, getName, SPIELER, STAT, stCup, CUPS, stEndstand, jbSpieler, ADMIN, SAISON, CUP, is2, SP, spTeilnahmen, spCuppunkte, spBestePlatz, is3, is1, isSaison, getSpielerName, sp0BestePlatz, sp0Cup3ter, sp0Cup2ter, sp0Cupsiege, spPunkte, spRangImCup, spSumPlatz, isAnzTurniere */

function showQuer(pSort) {

    if (pSort) {
        showEinenMoment(CUPS.NAME[stCup], 'Statistik&nbsp;wird&nbsp;sortiert.');
    } else {
        pSort = 'N123';
        showEinenMoment(CUPS.NAME[stCup], 'Statistik&nbsp;wird&nbsp;erstellt.');
    }

    var html = '';
    if (QUERFORMAT()) {
        if (lastBtn) {
            $(lastBtn).removeClass('ui-btn-active');
        }
        lastBtn = '#bQuer';
        $(lastBtn).addClass('ui-btn-active');
    }

    if (jbSpieler.isOpen) {
        jbSpieler.close();
    }

    if (LS.ME !== "NOBODY") {
        if (LS.ME === '3425') {
            showIcons(['#iScrollToMe', '#iHideDetails', '#iShowDetails', '#iPrint']);
        } else {
            showIcons(['#iScrollToMe']);
        }
    }

    stStat = 'Quer';
    stNamenLen = 99;
    writeCanvas('Gesamtübersicht');
    $("#dCopyright").hide();
    if (QUERFORMAT()) {
        $('#dRumpf').html('');
    } else {
        $('#dContent').html('');
        $('#sideTurniere').hide();
        $('#nbUebersicht,#nbSaison,#nbArchiv').removeClass('ui-disabled').removeClass('ui-btn-active');
        var hx = $(window).innerHeight() - $('#sideContent').offset().top - 1;
        $('#sideContent').css('height', hx + 'px').scrollTop(0);
    }

    html = 'xx';


    var SORT = {};

    var iSaison = 0;
    var hSaison = '';

    const siNR = 5;

    for (var turnier in STAT) {
        if (turnier[0] === '2') {

            if (hSaison !== STAT[turnier]._SAISON) {
                hSaison = STAT[turnier]._SAISON;
                iSaison = 1;
                while (SAISON[iSaison][0] !== hSaison) {
                    iSaison++;
                }
            }

            for (var spieler in STAT[turnier]) {
                if (spieler[0] !== '_') {

                    if (!SORT[spieler]) {
                        SORT[spieler] = [[0, 0, 0, 0, 999, '3425']];
                    }
                    SORT[spieler][0][0]++;
                    if (STAT[turnier][spieler][0] === 1) {
                        SORT[spieler][0][1]++;
                    } else if (STAT[turnier][spieler][0] === 2) {
                        SORT[spieler][0][2]++;
                    } else if (STAT[turnier][spieler][0] === 3) {
                        SORT[spieler][0][3]++;
                    }
                    if (SORT[spieler][0][4] > STAT[turnier][spieler][0]) {
                        SORT[spieler][0][4] = STAT[turnier][spieler][0];  // Beste Platzierung
                    }
                    SORT[spieler][0][siNR] = spieler;


                    if (!SORT[spieler][iSaison]) {
                        SORT[spieler][iSaison] = [0, 0, 0, 0, 999, hSaison];
                    }
                    SORT[spieler][iSaison][0]++;
                    if (STAT[turnier][spieler][0] === 1) {
                        SORT[spieler][iSaison][1]++;
                    } else if (STAT[turnier][spieler][0] === 2) {
                        SORT[spieler][iSaison][2]++;
                    } else if (STAT[turnier][spieler][0] === 3) {
                        SORT[spieler][iSaison][3]++;
                    }
                    if (SORT[spieler][iSaison][4] > STAT[turnier][spieler][0]) {
                        SORT[spieler][iSaison][4] = STAT[turnier][spieler][0];  // Beste Platzierung
                    }
                }
            }
        }
    }

    var DATA = [];
    for (var spieler in SORT) {
        if (SORT[spieler][0][1] || SORT[spieler][0][2] || SORT[spieler][0][3]
                || SORT[spieler][0][0] >= 20
                || SORT[spieler][1] && SORT[spieler][1][0] >= 5) {
            DATA.push(SORT[spieler]);
        }
    }

    var SORT = [];
    for (var iDATA in DATA) {
        sKey = '';
        if (pSort === 'N123') {
            sKey = 999999
                    - DATA[iDATA][0][1] * 2500
                    - DATA[iDATA][0][2] * 50
                    - DATA[iDATA][0][3];
        } else if (pSort === 'TN') {
            sKey = 10000 - DATA[iDATA][0][0];
        }
        sKey += getName(DATA[iDATA][0][siNR]) + ';' + iDATA;
        SORT.push(sKey);
    }

    SORT.sort();

    if (SAISON.length === 0) {
        hideEinenMoment();
    } else {
        html = "<table id=mTable data-role='table' data-filter='true' data-input='#iFilter' data-mode='columntoggle' cellspacing='0' class='table ui-body-d ui-shadow ui-responsive' data-column-btn-text='' style='white-space:nowrap'><thead>"
                + "<tr id='L0P1' class='bGrau'>"
                + "<th></th>"
                + "<th rowspan='2' class='C PT cBlau" + (pSort === 'NAME' ? ' U' : '') + "' onclick='showQuer(\"NAME\")'>Name</th>"
                + "<th colspan='2' class='C'>Gesamt</th><td>&nbsp;&nbsp;&nbsp;</td>";
        for (var iSaison = 1; iSaison < SAISON.length; iSaison++) {
            if (SAISON[iSaison][isAnzTurniere]) {
                html += "<th colspan='2' class=TC>&nbsp;" + SAISON[iSaison][isSaison] + "</td><td>&nbsp;&nbsp;&nbsp;</th>";
            }
        }
        html += "</tr>";

        html += "<tr id='L0P1' class='bGrau'>"
                + "<th></th>"
                + "<th sid=GESAMT class='C PT cBlau" + (pSort === 'N123' ? ' U' : '') + "' onclick='showQuer(\"N123\")'>1-2-3</th>"
                + "<th sid=GESAMT class='C PT cBlau" + (pSort === 'TN' ? ' U' : '') + "' onclick='showQuer(\"TN\")'>TN</th><td></td>";
        for (var iSaison = 1; iSaison < SAISON.length; iSaison++) {
            if (SAISON[iSaison][isAnzTurniere]) {
                html += "<td class='TC S'>1-2-3</td><td class='TC S'>TN</td><td></td>";
            }
        }
        html += "</tr>";

        html += "</thead><tbody>";

        var nSpieler = 0;
        var cBG = '';

        for (var sKey in SORT) {

            iSpieler = parseInt(SORT[sKey].substr(SORT[sKey].lastIndexOf(';') + 1));
            var hNR = DATA[iSpieler][0][siNR];

            nSpieler++;
            if (hNR === LS.ME) {
                cBG = 'bBeige';
            } else if (nSpieler % 2) {
                cBG = 'bSehrHell';
            } else {
                cBG = '';
            }

            html += '<tr id="tr' + hNR + '" class="' + cBG + '" onclick="$(\'.trDet' + iSpieler + '\').toggle();">'
                    + '<th>&nbsp;</th>'
                    + (SP[hNR][1]
                            ? (pSort === 'NAME' ? '<th' : '<td') + ' class=TL><span id="sp' + hNR + '" class="P cBlau">' + (getName(hNR).replace(' ', '&nbsp;')) + '</span></td>'
                            : (pSort === 'NAME' ? '<th' : '<td') + ' class=TL>' + (getName(hNR).replace(' ', '&nbsp;')) + '</td>'
                            )
                    + (pSort === 'N123' ? '<th' : '<td') + ' class=C>' + (DATA[iSpieler][0][1] || DATA[iSpieler][0][2] || DATA[iSpieler][0][3] ? DATA[iSpieler][0][1] + '-' + DATA[iSpieler][0][2] + '-' + DATA[iSpieler][0][3] : DATA[iSpieler][0][4]) + '</td>'
                    + (pSort === 'TN' ? '<th' : '<td') + ' class=TR>' + DATA[iSpieler][0][0] + '</td><td></td>';

            for (var iSaison = 1; iSaison < SAISON.length; iSaison++) {
                if (DATA[iSpieler][iSaison]) {
                    html += '<td' + ' class=C>' + (DATA[iSpieler][iSaison][1] || DATA[iSpieler][iSaison][2] || DATA[iSpieler][iSaison][3] ? DATA[iSpieler][iSaison][1] + '-' + DATA[iSpieler][iSaison][2] + '-' + DATA[iSpieler][iSaison][3] : DATA[iSpieler][iSaison][4]) + '</td>'
                            + '<td class=C>' + DATA[iSpieler][iSaison][0] + '</td><td></td>';
                } else {
                    html += '<td colspan="3"></td>';
                }
            }

            html += '</tr>';
        }

        html += "</tbody></table>"
                + "<br><table data-role=table>"
                + "<tbody>"
                + "<tr class=S><td>&nbsp;&nbsp;&nbsp;&nbsp;</td></td><th>Legende:</th><td></td></tr>"
                + "<tr class=S><td></td><td><b>1.2.3.</b></td><td>Stockerlplätze / beste Platzierung</td></tr>"
                + "<tr class=S><td></td><td><b>&Oslash; Platz</b></td><td>Durchschnittliche Platzierung</td></tr>"
                + "<tr class=S><td></td><td><b>TN</b></td><td>Teilnahmen</td></tr>"
                + "<tr><td colspan=3>&nbsp;</td></tr>"
                + "<tr class=S><td></td><td colspan=2 style='text-align:justify'>Wie auch im Schiweltcup üblich zählen für die Ewige Bestenliste nur die Siege. Lediglich bei Gleichstand sind zweite und dritte Plätze relevant. Nach den Besten (Turniersiegern) erfolgt die Reihunng nach der besten jemals erreichten Platzierung.</th><td>&nbsp;&nbsp;&nbsp;&nbsp;</td></tr>"
                + "<tr><td colspan=3>&nbsp;</td></tr>"
                + "<tr class=XS><td></td><td colspan=2 style='text-align:justify'>Mit einen Klick auf eine Spaltenüberschrift kannst du die Sortierung ändern." + (CUPS.TYP[stCup] === 'CUP' ? " Durch das Anklicken einer Zeile kannst du die Saisonergebnisse ein- oder ausblenden." : "") + "</td></tr>"
                + "<tr><td colspan=3>&nbsp;</td></tr>"
                + "<tr class=XS><td></td><td colspan=2 style='text-align:justify'>Es sind alle jene Spieler gelistet welche in der aktuellen Saison schon teilgenommen, in der letzten Saison mindestens fünfmal teilgenommen, insgesamt mindestens 20 mal teilgenommen oder mindestens einen Stockerlplatz erreicht haben.</td></tr>";
        if (QUERFORMAT()) {
            $('#dRumpf').html(html + "</tbody></table><br>").css('margin-top', $('#qfHeader').height() + 'px');
        } else {
            $('#dContent').html(html + "</tbody></table><br><br>").show();
        }
        hideEinenMoment();
        setFont(4.8, true);
        if (QUERFORMAT()) {
            window.scrollTo(0, 0);
            if (window.navigator.userAgent.indexOf("MSIE ") === -1) {
                $('#mTable').stickyTableHeaders({cacheHeaderHeight: true, "fixedOffset": $('#qfHeader')});
            }
        }
        if (QUERFORMAT() && PC) {
            $(".cBlau,.cSchwarz").on("mouseenter", function () {
                var hID = $(this).attr('id');
                if (hID) {
                    $("#sideContent").hide();
                    html = '<div data-role="navbar">'
                            + '<ul>'
                            + '<li><a href="#" class="ui-btn-active">'
                            + ((isNaN(hID.substr(2)) || !PC) ? '' : '<span class="N">' + hID.substr(2) + '</span>&nbsp;&nbsp;') + getSpielerName(hID.substr(2)).replace(' ', '&nbsp;') + (iSaison === 1 ? '' : '&nbsp;&nbsp;-&nbsp;&nbsp;' + stSaison + ' ') + (!isNaN(hID.substr(2)) && isVERSTORBEN(SPIELER[hID.substr(2)][4]) ? '&nbsp;&#134;' : '') + (QUERFORMAT() && stStat !== "Platzierungen" ? '' : '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + getSpielerOrt(hID.substr(2), true))
                            + '</a></li>'
                            + '</ul>'
                            + '</div>';
                    $("#sideSpieler").html(html + getSpieler(hID.substr(2))).trigger('create').show();
                }
            });
            $('.cBlau,.cSchwarz').on("mouseleave", function () {
                $("#sideSpieler").hide();
                $("#sideContent").show();
            });
        }
    }

}