
/* global LS, QUERFORMAT(), CUPS, stCup, CUPPUNKTE, getName, STAT, stSaison, jbSpieler, ADMIN */

function showPlatzierungen(pSort) {

    var mMitgespielt = false;

    if (QUERFORMAT()) {
        if (lastBtn) {
            $(lastBtn).removeClass('ui-btn-active');
        }
        lastBtn = '#bPlatzierungen';
        $(lastBtn).addClass('ui-btn-active');
        stNamenLen = 0.32;
    } else {
        stNamenLen = 0.50;
    }

    showEinenMoment(stCup, 'Die Liste der Platzierungen<br>wird erstellt.');

    setTimeout(function () {

        if (!pSort) {
            pSort = 'Stockerl';
        }
        if (jbSpieler.isOpen) {
            jbSpieler.close();
        }
        $("#dCopyright").hide();

        stStat = 'Platzierungen';

        if (CUPS.TYP[stCup] === 'MT') {
            writeCanvas('Einzelplatzierungen');
        } else {
            writeCanvas('Platzierungen ' + stSaison);
        }

        var html = '';
        var iTurnier = 6; // Turniere++ ab 7

        var DATA = {};
        var TEILNEHMER = {};
        var hClass = '';

        for (var turnier in STAT) {
            if (turnier[0] !== '_') {
                if (STAT[turnier]._SAISON === stSaison || CUPS.TYP[stCup] === 'MT') {
                    if (!stFilter || STAT[turnier]._NAME.toUpperCase().indexOf(stFilter) >= 0) {
                        html = '<th class="rotate W"><div><span>' + STAT[turnier]._NAME + '</span></div></th>' + html;
                        iTurnier++;
                        TEILNEHMER[iTurnier] = 0;
                        for (var spieler in STAT[turnier]) {
                            if (spieler[0] !== '_') {
                                if (!DATA[spieler]) {
                                    DATA[spieler] = [, 0, 0, 0, 0, 9999]; // 1. 2. 3. Plätze, Teilnahmen und beste Platzierung
                                }
                                DATA[spieler][iTurnier] = STAT[turnier][spieler][0];
                                if (STAT[turnier][spieler][0] === 1) {
                                    DATA[spieler][1]++;
                                } else if (STAT[turnier][spieler][0] === 2) {
                                    DATA[spieler][2]++;
                                } else if (STAT[turnier][spieler][0] === 3) {
                                    DATA[spieler][3]++;
                                }
                                DATA[spieler][4]++;
                                if (DATA[spieler][5] > STAT[turnier][spieler][0]) {
                                    DATA[spieler][5] = STAT[turnier][spieler][0];
                                }
                                TEILNEHMER[iTurnier]++;
                                if (spieler === LS.ME) {
                                    mMitgespielt = true;
                                }
                            }
                        }
                    }
                }
            }
        }


        var SORT = [];
        var sKey = '';
        for (var spieler in DATA) {
            if (pSort === 'Name') {
                SORT.push([getName(spieler) + ';' + spieler, DATA[spieler]]);
            } else if (pSort === 'Stockerl') {
                if (DATA[spieler][1] || DATA[spieler][2] || DATA[spieler][3]) {
                    sKey = (DATA[spieler][1] ? 888 - DATA[spieler][1] : '888') + '-' + (DATA[spieler][2] ? 888 - DATA[spieler][2] : '888') + '-' + (DATA[spieler][3] ? 888 - DATA[spieler][3] : '888');
                } else {
                    sKey = 'XX' + (1000 + DATA[spieler][5]);
                }
                SORT.push([sKey + getName(spieler) + ';' + spieler, DATA[spieler]]);
            } else if (pSort === 'Cuppunkte') {
                SORT.push([(9999 - CUPPUNKTE[spieler]) + getName(spieler) + ';' + spieler, DATA[spieler]]);
            } else if (pSort === 'Teilnahmen') {
                SORT.push([(100 - DATA[spieler][4]) + getName(spieler) + ';' + spieler, DATA[spieler]]);
            }
        }
        SORT.sort();

        if (QUERFORMAT()) {
            var htmlRumpf = ''
//                + "<div id='dFilter' class='noprint' style='width:20%'><input class='N M' id='iFilter' placeholder='Nachname, Vorname," + (QUERFORMAT() ? " Ort," : "") + " ...'></div>"
                    + '<tbody id=tbody>'
                    + '<tr class="bHell">'
                    + '<th></th>'
                    + '<td></td>'
                    + (CUPS.TYP[stCup] !== 'MT' ? '<td></td>' : '');
            TEILNEHMER[0] = 0;
            for (var I = iTurnier; I >= 7; I--) {
                htmlRumpf += '<th>' + TEILNEHMER[I] + '</th>';
                TEILNEHMER[0] += TEILNEHMER[I];
            }
            htmlRumpf += '<th>' + TEILNEHMER[0] + '</th>'
                    + '</tr>';
        } else {
            var htmlRumpf = '<tbody id=tbody>'
                    + "<tr id='rFilter'><td colspan='4'><input class='N M' id='iFilter' placeholder='Nachname, Vorname, ...'></td>"
                    + "<td class=TC><i id='icFilter' onclick='$(this).addClass(\"ui-disabled\");$(\"#iFilter\").val(\"\").blur();$(\"#tbody\").find(\"tr\").show();' class='i zmdi-plus-bold zmdi-hc-rotate-45 ui-disabled'></i></td></tr>";
        }

        var spieler = '';
        for (var iSpieler in SORT) {
            DATA = SORT[iSpieler];
            spieler = SORT[iSpieler][0].substr(SORT[iSpieler][0].indexOf(';') + 1);
            DATA = SORT[iSpieler][1];

            if (spieler === LS.ME) {
                hClass = 'bBeige';
            } else {
                hClass = '';
                for (var iFreund in LS.Freunde) {
                    if (LS.Freunde[iFreund] === spieler) {
                        hClass = 'bBeige2';
                    }
                }
            }
            if (iSpieler % 2 === 0 && !hClass) {
                hClass = 'bSehrHell';
            }

            htmlRumpf += '<tr ' + (spieler === LS.ME ? 'id="tr' + LS.ME + '"' : '') + ' class="' + hClass + '">'
                    + '<td class="' + hClass + (QUERFORMAT() ? ' fixedColQuer' : '') + ' left" style="width:100%;">&nbsp;<span onclick="event.stopPropagation();popupSpieler(\'' + spieler + '\');" class="P W ' + (spieler === LS.ME ? 'cSchwarz' : 'cBlau') + '">' + (getName(spieler).replace(' ', '&nbsp;')) + '</span></td>';

            if (DATA[1] || DATA[2] || DATA[3]) {
                htmlRumpf += '<td class=W>' + (DATA[1] ? DATA[1] : '0') + '-' + (DATA[2] ? DATA[2] : '0') + '-' + (DATA[3] ? DATA[3] : '0') + '</td>';
            } else {
                htmlRumpf += '<td class=W>' + DATA[5] + '</td>';
            }
            if (!QUERFORMAT()) {
                htmlRumpf += '<td>&nbsp;&nbsp;</td>'; // Dummyspalte
            }
            if (CUPS.TYP[stCup] !== 'MT') {
                htmlRumpf += '<td class="W R">' + CUPPUNKTE[spieler] + '&nbsp;&nbsp;&nbsp;&nbsp;</td>';
            }
            if (QUERFORMAT()) {
                for (var I = iTurnier; I >= 7; I--) {
                    if (DATA[I]) {
                        if (DATA[I] <= 3) {
                            htmlRumpf += '<th>' + DATA[I] + '</th>';
                        } else {
                            htmlRumpf += '<td>' + DATA[I] + '</td>';
                        }
                    } else {
                        htmlRumpf += '<td></td>';
                    }
                }
                htmlRumpf += '<td>' + DATA[4] + '</td>';
            } else {
                htmlRumpf += '<td class=TR>' + DATA[4] + '&nbsp;&nbsp;</td>';
            }
            htmlRumpf += '</tr>';
        }

        htmlRumpf += '<tbody>';

        if (QUERFORMAT()) {
            var hx = $(window).innerHeight() - $('#qfHeader').height();
            html = '<div class="parent" style="margin-top: -0px; height: ' + hx + 'px;"><table id=mTable data-role="table" data-mode="columntoggle" cellspacing="0" class="table C ui-body-d ui-shadow ui-responsive data-column-btn-text=\'\'">'
                    + '<thead>'
                    + '<tr id=L0P1 class=bHell>'
                    + '<th class="rotate bottom C PT cBlau' + (pSort === 'Name' ? ' U' : '') + '" onclick="showPlatzierungen(\'Name\')">Teilnehmer</th>'
                    + '<th class="rotate bottom C PT cBlau' + (pSort === 'Stockerl' ? ' U' : '') + '" onclick="showPlatzierungen(\'Stockerl\')">1.&nbsp;2.&nbsp;3.<br>beste<br>Platz.</th>'
                    + (CUPS.TYP[stCup] !== 'MT' ? '<th class="rotate bottom C PT cBlau' + (pSort === 'Cuppunkte' ? ' U' : '') + '" onclick="showPlatzierungen(\'Cuppunkte\')">Cup-<br>punkte</th>' : '')
                    + html
                    + '<th class="rotate bottom C PT cBlau' + (pSort === 'Teilnahmen' ? ' U' : '') + '" onclick="showPlatzierungen(\'Teilnahmen\')">Teil-<br>nahmen</th>'
                    + '</tr>'
                    + '</thead>'
                    + htmlRumpf
                    + '</table>'
                    + '</div>';
            $('#dRumpf').html(html).css('margin-top', $('#qfHeader').height() + 'px');
            setFont();
            $("#mTable").tableHeadFixer({"left": 1});
            $("#mTable tr:even").css('background-color', '#efefef');
        } else {
            html = '<table id=mTable data-role="table" data-mode="columntoggle" cellspacing="0" class="table C ui-body-d ui-shadow ui-responsive data-column-btn-text=\'\'">'
                    + '<thead>'
                    + '<tr ' + (QUERFORMAT() ? "id=L0P1" : "") + ' class=bHell>'
                    + '<th><br>Teilnehmer</th>'
                    + '<th>beste<br>Platz.</th>'
                    + '<th>&nbsp;&nbsp;</th>' // Dummyspalte
                    + (CUPS.TYP[stCup] !== 'MT' ? '<th>Cup-<br>punkte&nbsp;&nbsp;</th>' : '')
                    + '<th><br>TN&nbsp;&nbsp;</th>'
                    + '</tr>'
                    + '</thead>'
                    + htmlRumpf
                    + '</table>';
            $('#dContent').html(html + '<br>').show();
            $('#sideTurniereMT').hide();
            $('#nbUebersicht,#nbSaison,#nbArchiv').removeClass('ui-disabled').removeClass('ui-btn-active');
            var hx = $(window).innerHeight() - $('#sideContent').offset().top - 1;
            $('#sideContent').css('height', hx + 'px').scrollTop(0);
            setFont(3.8, true);
        }

        hideEinenMoment();

        window.scrollTo(0, 0);

        if (LS.ME !== "NOBODY" && mMitgespielt) {
            showIcons(['#iScrollToMe']);
        }

    }, 200);

}