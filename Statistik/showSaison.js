
/* global STAT, QUERFORMAT(), CUPS, stCup, jbSpieler, sortNumber, LS, SAISON, isSaison, isVorlaeufig, is1, is1CupPunkte, is3, is2, is2CupPunkte, is3CupPunkte */

function showSaison(pSaison, pStockerl, pAnekdoten, pFix) {

    if (QUERFORMAT()) {
        if (lastBtn) {
            $(lastBtn).removeClass('ui-btn-active');
        }
    }

    if (jbSpieler.isOpen) {
        jbSpieler.close();
    }
    if (stCup === 53) {
        if (stFilter) {
            if (stFilter === 'BBTC') {
                $('#nbBBTC').addClass('ui-btn-active');
            } else {
                $('#nbSKUES').addClass('ui-btn-active');
            }
        } else {
            $('#nbNoFilter').addClass('ui-btn-active');
        }
    }

    showIcons([]);

    if (!pSaison && CUPS.TYP[stCup] === 'CUP') {
        stSaison = SAISON[iSaison][isSaison];
    }

    if (pSaison && iSaison !== pSaison && CUPS.TYP[stCup] === 'CUP') {
        iSaison = pSaison;
        stSaison = SAISON[iSaison][isSaison];
        compCUPPUNKTE();
    }

    if (!pFix) {
        $('#nbUebersicht,#nbArchiv').removeClass('ui-btn-active');
        $('#nbSaison').addClass('ui-btn-active');
        $('#tArchiv').text(stSaison);
    }

    stStat = '';
    writeCanvas('Vivat Valat!');

    var i = 0;
    var htmlTE = "";
    var nTurniere = 0;
    var nAnekdoten = 0;
    var hDataTheme = '';
    var hSpieler = '';
    stFinale = false;
    stFinalTeilnehmer = 0;
    stEndstand = false;

    for (var turnier in STAT) {
        if (turnier[0] === '2') {
            if (STAT[turnier]._SAISON === stSaison) {
                if (!stFilter || STAT[turnier]._NAME.toUpperCase().indexOf(stFilter) >= 0) {
                    if (STAT[turnier]._ANEKDOTE || !pAnekdoten) {
                        if (STAT[turnier]._ANEKDOTE) {
                            nAnekdoten++;
                        }
                        nTurniere++;
                        if (nTurniere % 2 === 0) {
                            cBG = '';
                        } else {
                            cBG = 'background-color: #f0f0f0';
                        }
                        if (STAT[turnier]._NAME.toUpperCase().indexOf('FINAL') >= 0) {
                            if (STAT._AKTTURNIER && STAT._AKTTURNIER._TURNIER === turnier) {
                                stEndstand = false;
                            } else {
                                stEndstand = true;
                            }
                            if (CUPS.TURNIER[stCup] % 1) {
                                stFinale = turnier;
                            }
                        }
//                        if (QUERFORMAT() && (pStockerl || pAnekdoten)) {
//                            if (STAT[turnier]._VERANSTALTER === '0000') {
//                                hSpieler = 'Präsidium';
//                            } else if (STAT[turnier]._VERANSTALTER === '9999') {
//                                hSpieler = 'alle Veranstalter';
//                            } else if (STAT[turnier]._VERANSTALTER.length !== 4) {
//                                hSpieler = STAT[turnier]._VERANSTALTER;
//                            } else {
//                                hSpieler = '<span onclick="event.stopPropagation();popupSpieler(\'' + STAT[turnier]._VERANSTALTER + '\');" class="P cBlau">' + getSpielerName(STAT[turnier]._VERANSTALTER) + '</span>';
//                            }
//                            htmlTE = '<tr>'
//                                    + '<td class=noprint>&nbsp;&nbsp;</td>'
//                                    + '<td class="cBlau P B L" id="b' + turnier + '" onclick="showTurnier(\'' + turnier + '\');"><span style="white-space:nowrap">' + STAT[turnier]._NAME + '</span></td>'
//                                    + '<td class="M" nowrap>' + turnier + '&nbsp;</td>'
//                                    + '<td class="M" nowrap>'
//                                    + (STAT[turnier]._STOCKERL
//                                            ? '1. <span onclick="event.stopPropagation();popupSpieler(\'' + STAT[turnier]._STOCKERL[1] + '\');" class="P cBlau">' + getSpielerName(STAT[turnier]._STOCKERL[1]) + '</span>, ' + STAT[turnier][STAT[turnier]._STOCKERL[1]][4] + ' Punkte'
//                                            : ''
//                                            )
//                                    + '</td></tr>'
//                                    + (STAT[turnier]._STOCKERL && pStockerl
//                                            ? '<tr hidden></tr>'
//                                            + '<tr><td class=noprint></td><td class="M">Veranstalter: ' + hSpieler + '</td><td></td><td class=M nowrap><div style="margin-top:-3px">2. <span onclick="event.stopPropagation();popupSpieler(\'' + STAT[turnier]._STOCKERL[2] + '\');" class="P cBlau">' + getSpielerName(STAT[turnier]._STOCKERL[2]) + '</span>, ' + STAT[turnier][STAT[turnier]._STOCKERL[2]][4] + ' Punkte</div></td></tr>'
//                                            + '<tr hidden></tr>'
//                                            + '<tr><td colspan=1 class=noprint></td><td colspan=2></td><td class=M nowrap>3. <span onclick="event.stopPropagation();popupSpieler(\'' + STAT[turnier]._STOCKERL[3] + '\');" class="P cBlau">' + getSpielerName(STAT[turnier]._STOCKERL[3]) + '</span>, ' + STAT[turnier][STAT[turnier]._STOCKERL[3]][4] + ' Punkte</td></tr>'
//                                            : ''
//                                            )
//                                    + (STAT._AKTTURNIER && STAT._AKTTURNIER._TURNIER === turnier && STAT._AKTTURNIER._RUNDE <= 3
//                                            ? '<tr hidden></tr>'
//                                            + '<tr><td class=noprint></td><td colspan=3><span style="margin: 0 0 0 40px;" class="M2">Runde <b>' + STAT._AKTTURNIER._RUNDE + '</b> wird gespielt.</span></td></tr>'
//                                            : ''
//                                            )
//                                    + (STAT[turnier]._ANEKDOTE && pAnekdoten
//                                            ? '<tr hidden></tr>'
//                                            + '<tr id="a' + nTurniere + '" class="M"><td colspan="4" class=M><div style="text-align:justify;margin: 0 5px 0 44px;">' + STAT[turnier]._ANEKDOTE + '</div></td></tr>'
//                                            : ''
//                                            )
//                                    + htmlTE;
//                        } else {
                        if (STAT._AKTTURNIER && STAT._AKTTURNIER._TURNIER === turnier) {
                            hDataTheme = ' data-theme="f" ';
                            if (STAT._AKTTURNIER._RUNDE <= 3) {
                                var hIchSitzeAuf = '';
                                if (STAT._AKTTURNIER[LS.ME]) {
                                    hIchSitzeAuf = '<span class="M N"><br>&nbsp;&nbsp;Ich sitze auf <b>' + STAT._AKTTURNIER[LS.ME][7] + '</b>, <b>' + STAT._AKTTURNIER[LS.ME][8] + '</b> und <b>' + STAT._AKTTURNIER[LS.ME][9] + '</b>.</span>';
                                }
                                htmlTE = '<li data-theme="f" data-icon=false><a class="Sbtn K" id="bTischliste" onclick="showTischliste();">&nbsp;<span class="L">Tischliste' + hIchSitzeAuf + '</span></a></li>'
                                        + htmlTE;
                            }
                        } else {
                            hDataTheme = '';
                        }
                        htmlTE = '<li ' + hDataTheme + ' data-icon="false"><a class="K" id="b' + turnier + '" onclick="showTurnier(\'' + turnier + '\');">&nbsp;<span class="L">' + STAT[turnier]._NAME + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="M N"><br>&nbsp;' + (new Date(turnier).toLocaleDateString()) + ', ' + getVeranstalter(STAT[turnier]._VERANSTALTER) + '</span></a>'
                                + (STAT[turnier]._ANEKDOTE ? '<a onclick="$(\'#tAnek' + nAnekdoten + '\').toggle(\'show\');">Anekdote</a>' : '')
                                + '</li>'
                                + (STAT[turnier]._ANEKDOTE ? '<div id=tAnek' + nAnekdoten + ' class="M" style="text-align:justify;margin:.2em .6em"  onclick="$(\'#tAnek' + nAnekdoten + '\').hide();" hidden>' + STAT[turnier]._ANEKDOTE + '</div>' : '')
                                + htmlTE;
//                        }
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

    $('#sideTurniereMT').html(
            '<li data-role="list-divider"><div class="ui-grid-a">'
            + '<div class="ui-block-a" style="width:90%">&nbsp;&nbsp;&nbsp;&nbsp;' + stSaison + ' - die Listen:</div>'
            + '<div class="ui-block-b" style="width:10%">'

            + '<i onclick="event.stopPropagation(); showLi(\'.cDieListen\',false);" title="Die Listen der Saison ausblenden." id=iPlus class="i zmdi-play zmdi-hc-rotate-90 noprint"></i>'
            + '<i onclick="event.stopPropagation(); showLi(\'.cDieListen\',true);" title="Die Listen der Saison einblenden." id=iMinus class="i zmdi-play zmdi-hc-rotate-270 noprint"></i>'

            + '<li class="cDieListen" data-icon=false><a id=bCupwertung onclick="showCupwertung();">&nbsp;Cupwertung</a></li>'
            + ((LS.ME === "3425" || LS.ME === "-56" || LS.ME === "2037") && stCup === 56 && pSaison === 1 ? '<li class="cDieListen" data-icon=false><a id=bOovwertung onclick="showOovwertung();">&nbsp;OOV-Wertung</a></li>' : '')

            + '<li class="cDieListen" data-icon="false"><a id=bPlatzierungen onclick="showPlatzierungen();">&nbsp;Platzierungen</a></li>'
            + (QUERFORMAT() && LS.ME === '3425'
                    ? '<li class="cDieListen" data-icon="false"><a id=bChronik onclick="showChronik()">&nbsp;Chronik</a></li>'
                    + '<li class="cDieListen" data-icon="false"><a id=bChronik onclick="showChronik(\'2019-07-06\')">&nbsp;Ein Turnier</a></li>'
                    : '')
            + '<li data-role="list-divider">&nbsp;&nbsp;&nbsp;&nbsp;' + stSaison + ' - die Turniere:</li>'
            ).listview('refresh').show();
    $('#dContent').html(htmlTE + '<br>').listview('refresh');
    if (QUERFORMAT()) {
        showLogo();
    }

    hideEinenMoment();
    window.scrollTo(0, 0);
    $("#sideContent,#dCopyright").show();
    setFont();
    showLi('.cDieListen', true);

    if (LS.Meldung) {
        $('#sideTurniereMT').prepend("&nbsp;<img src='../Icons/OK.png' width='24' height='24'><span class=M>&nbsp;<b>" + LS.Meldung + "</b><br></span>");
        LS.Meldung = '';
        localStorage.setItem('Abakus.LS', JSON.stringify(LS));
    }

}

function showLi(pListe, pShow) {
    var elmnt = document.getElementById("sideContent");
    elmnt.scrollTop = 0;
    if (pShow) {
        $(pListe).show();
        $('#iPlus').show();
        $('#iMinus').hide();
    } else {
        $(pListe).hide();
        $('#iPlus').hide();
        $('#iMinus').show();
    }
    var hx = $(window).innerHeight() - $('#sideContent').offset().top - 1;
    $('#sideContent').css('height', hx + 'px').scrollTop(0);
}

function compCUPPUNKTE() {

    CUPPUNKTE = new Object();
    var hPunkte = 0;
    for (var turnier in STAT) {
        if (turnier[0] !== '_') {
            if (!stFilter || STAT[turnier]._NAME.toUpperCase().indexOf(stFilter) >= 0) {
                if (STAT[turnier]._SAISON === stSaison) {
                    if (STAT[turnier]._NAME.toUpperCase().indexOf('FINAL') < 0) {
                        for (var spieler in STAT[turnier]) {
                            if (spieler[0] !== '_') {
                                hPunkte = getCupPunkte(turnier, spieler);
                                if (hPunkte > 0) {
                                } else {
                                    hPunkte = 0;
                                }
                                if (!CUPPUNKTE[spieler]) {
                                    CUPPUNKTE[spieler] = [0, hPunkte]; // Ges., Cuppunkte
                                } else {
                                    CUPPUNKTE[spieler][CUPPUNKTE[spieler].length] = hPunkte;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    var sCUPPUNKTE = 0;
    for (var spieler in CUPPUNKTE) {
        sCUPPUNKTE = 0;
        CUPPUNKTE[spieler].sort(sortNumber);
        for (var i = CUPPUNKTE[spieler].length - 1; i >= 0 && i > CUPPUNKTE[spieler].length - 7; i--) {
            if (CUPPUNKTE[spieler][i] > 0) {
                sCUPPUNKTE += CUPPUNKTE[spieler][i];
            }
        }
        CUPPUNKTE[spieler] = sCUPPUNKTE;
    }

    for (var turnier in STAT) {
        if (turnier[0] !== '_') {
            if (!stFilter || STAT[turnier]._NAME.toUpperCase().indexOf(stFilter) >= 0) {
                if (STAT[turnier]._SAISON === stSaison) {
                    if (STAT[turnier]._NAME.toUpperCase().indexOf('FINAL') >= 0) {
                        for (var spieler in STAT[turnier]) {
                            if (spieler[0] !== '_') {
                                hPunkte = getCupPunkte(turnier, spieler);
                                if (hPunkte > 0) {
                                } else {
                                    hPunkte = 0;
                                }
                                if (!CUPPUNKTE[spieler]) {
                                    CUPPUNKTE[spieler] = hPunkte;
                                } else {
                                    CUPPUNKTE[spieler] += hPunkte;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

}