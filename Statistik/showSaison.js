
/* global STAT, QUERFORMAT(), CUPS, stCup, jbSpieler, sortNumber, LS, CUPSIEGER, stSaisonTab, stShowList */

function showSaison(pSaison, pStockerl, pAnekdoten) {

    if (QUERFORMAT()) {
        if (lastBtn) {
            $(lastBtn).removeClass('ui-btn-active');
        }
        if (pStockerl) {
            lastBtn = '#bStockerlliste';
            $(lastBtn).addClass('ui-btn-active');
        } else if (pAnekdoten) {
            lastBtn = '#bAnekdoten';
            $(lastBtn).addClass('ui-btn-active');
        }
    }

    if (jbSpieler.isOpen) {
        jbSpieler.close();
    }

    if (pSaison === '#tArchiv') {
        pSaison = $('#tArchiv').text();
    }

    if (pStockerl || pAnekdoten) {
        showIcons(['#iPrint']);
    } else {
        showIcons([]);
    }

    if (typeof pSaison !== 'string') {
        if (stSaison === -1) {
            pSaison = 0;
        } else {
            pSaison = stSaison;
        }
    }
    if (stSaison !== pSaison) {
        stSaison = pSaison;
        compCUPPUNKTE();
    }

    $('#nbUebersicht').removeClass('ui-btn-active');
    $('#nbArchiv').addClass('ui-btn-active');
    $('#tArchiv').text(stSaison);
    if (pSaison === stSaisonTab[0]) {
        $('#bAktSaison').addClass('ui-disabled');
    } else {
        $('#bAktSaison').removeClass('ui-disabled');
    }

    if (pStockerl) {
        stStat = 'Stockerlliste';
        writeCanvas('Stockerlliste ' + stSaison);
    } else if (pAnekdoten) {
        stStat = 'Anekdoten';
        writeCanvas('Anekdoten ' + stSaison);
    } else {
        stStat = '';
        writeCanvas('Vivat Valat!');
    }

    var i = 0;
    var htmlTE = "";
    var nTurniere = 0;
    var nAnekdoten = 0;
    var hDataTheme = '';
    var hSpieler = '';
    stFinale = false;
    stEndstand = false;
    for (var turnier in STAT) {
        if (turnier[0] === '2') {
            if (STAT[turnier]._SAISON === stSaison) {
                if (STAT[turnier]._ANEKDOTE || !pAnekdoten) {
                    if (STAT[turnier]._ANEKDOTE) {
                        nAnekdoten++;
                    }
                    if (stCup !== 56
                            || stCup === 56 && window.location.href.toUpperCase().indexOf('OOV') < 0 // OOV = Out Of Vienna
                            || stCup === 56 && window.location.href.toUpperCase().indexOf('OOV') > 0 && STAT[turnier]._NAME.toUpperCase().indexOf('OOV') > 0) {
                        nTurniere++;
                        if (nTurniere % 2 === 0) {
                            cBG = '';
                        } else {
                            cBG = 'background-color: #f0f0f0';
                        }
                        if (STAT[turnier]._NAME.toUpperCase().indexOf('FINAL') >= 0) {
                            stFinale = turnier;
                            if (STAT._AKTTURNIER && STAT._AKTTURNIER._TURNIER === turnier) {
                                stEndstand = false;
                            } else {
                                stEndstand = true;
                            }
                        }
                        if (QUERFORMAT() && (pStockerl || pAnekdoten)) {
                            if (STAT[turnier]._VERANSTALTER === '0000') {
                                hSpieler = 'Präsidium';
                            } else if (STAT[turnier]._VERANSTALTER === '9999') {
                                hSpieler = 'alle Veranstalter';
                            } else if (STAT[turnier]._VERANSTALTER.length !== 4) {
                                hSpieler = STAT[turnier]._VERANSTALTER;
                            } else {
                                hSpieler = '<span onclick="event.stopPropagation();popupSpieler(\'' + STAT[turnier]._VERANSTALTER + '\');" class="P cBlau">' + getSpielerName(STAT[turnier]._VERANSTALTER) + '</span>';
                            }
                            htmlTE = '<tr>'
                                    + '<td class=noprint>&nbsp;&nbsp;</td>'
                                    + '<td class="cBlau P B L" id="b' + turnier + '" onclick="showTurnier(\'' + turnier + '\');"><span style="white-space:nowrap">' + STAT[turnier]._NAME + '</span></td>'
                                    + '<td class="M" nowrap>' + turnier + '&nbsp;</td>'
                                    + '<td class="M" nowrap>'
                                    + (STAT[turnier]._STOCKERL
                                            ? '1. <span onclick="event.stopPropagation();popupSpieler(\'' + STAT[turnier]._STOCKERL[1] + '\');" class="P cBlau">' + getSpielerName(STAT[turnier]._STOCKERL[1]) + '</span>, ' + STAT[turnier][STAT[turnier]._STOCKERL[1]][4] + ' Punkte'
                                            : ''
                                            )
                                    + '</td></tr>'
                                    + (STAT[turnier]._STOCKERL && pStockerl
                                            ? '<tr hidden></tr>'
                                            + '<tr><td class=noprint></td><td class="M">Veranstalter: ' + hSpieler + '</td><td></td><td class=M nowrap><div style="margin-top:-3px">2. <span onclick="event.stopPropagation();popupSpieler(\'' + STAT[turnier]._STOCKERL[2] + '\');" class="P cBlau">' + getSpielerName(STAT[turnier]._STOCKERL[2]) + '</span>, ' + STAT[turnier][STAT[turnier]._STOCKERL[2]][4] + ' Punkte</div></td></tr>'
                                            + '<tr hidden></tr>'
                                            + '<tr><td colspan=1 class=noprint></td><td colspan=2></td><td class=M nowrap>3. <span onclick="event.stopPropagation();popupSpieler(\'' + STAT[turnier]._STOCKERL[3] + '\');" class="P cBlau">' + getSpielerName(STAT[turnier]._STOCKERL[3]) + '</span>, ' + STAT[turnier][STAT[turnier]._STOCKERL[3]][4] + ' Punkte</td></tr>'
                                            : ''
                                            )
                                    + (STAT._AKTTURNIER && STAT._AKTTURNIER._TURNIER === turnier && STAT._AKTTURNIER._RUNDE <= 3
                                            ? '<tr hidden></tr>'
                                            + '<tr><td class=noprint></td><td colspan=3><span style="margin: 0 0 0 40px;" class="M2">Runde <b>' + STAT._AKTTURNIER._RUNDE + '</b> wird gespielt.</span></td></tr>'
                                            : ''
                                            )
                                    + (STAT[turnier]._ANEKDOTE && pAnekdoten
                                            ? '<tr hidden></tr>'
                                            + '<tr id="a' + nTurniere + '" class="M"><td colspan="4" class=M><div style="text-align:justify;margin: 0 5px 0 44px;">' + STAT[turnier]._ANEKDOTE + '</div></td></tr>'
                                            : ''
                                            )
                                    + htmlTE;
                        } else {
                            if (STAT._AKTTURNIER && STAT._AKTTURNIER._TURNIER === turnier) {
                                hDataTheme = ' data-theme="f" ';
                                if (STAT._AKTTURNIER._RUNDE <= 3) {
                                    htmlTE = '<li data-theme="f" data-icon=false><a class="Sbtn K" id="bTischliste" onclick="showTischliste();">&nbsp;<span class="L">Tischliste</span></a></li>'
                                            + htmlTE;
                                }
                            } else {
                                hDataTheme = '';
                            }
                            htmlTE = '<li ' + hDataTheme + ' data-icon=info><a class="K" id="b' + turnier + '" onclick="showTurnier(\'' + turnier + '\');">&nbsp;<span class="L">' + STAT[turnier]._NAME + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="M N"><br>&nbsp;' + (new Date(turnier).toLocaleDateString()) + ', ' + getVeranstalter(STAT[turnier]._VERANSTALTER) + '</span></a>'
                                    + '<a onclick="$(\'#hToggle' + nTurniere + '\').toggle(\'show\');">Stockerpl&auml;tze</a></li>'
                                    + (STAT[turnier]._ANEKDOTE && pAnekdoten
                                            ? '<div id="hToggle' + nTurniere + '" class="N S2 sui-content"  style="text-align:justify;margin: 0 5px 0 8px;">'
                                            + STAT[turnier]._ANEKDOTE + '</div>'
                                            : ''
                                            )
                                    + (STAT[turnier]._STOCKERL && pStockerl
                                            ? '<li data-icon=false id="hToggle' + nTurniere + '" class="M"><a><span class="N S2" style="margin:0;padding:0">'
                                            + '&nbsp;&nbsp;1. <b><span onclick="event.stopPropagation();popupSpieler(\'' + STAT[turnier]._STOCKERL[1] + '\');" class="P cBlau">' + getSpielerName(STAT[turnier]._STOCKERL[1]) + '</span></b>, ' + STAT[turnier][STAT[turnier]._STOCKERL[1]][4] + ' Punkte<br>'
                                            + '&nbsp;&nbsp;2. <span onclick="event.stopPropagation();popupSpieler(\'' + STAT[turnier]._STOCKERL[2] + '\');" class="P cBlau">' + getSpielerName(STAT[turnier]._STOCKERL[2]) + '</span>, ' + STAT[turnier][STAT[turnier]._STOCKERL[2]][4] + ' Punkte<br>'
                                            + '&nbsp;&nbsp;3. <span onclick="event.stopPropagation();popupSpieler(\'' + STAT[turnier]._STOCKERL[3] + '\');" class="P cBlau">' + getSpielerName(STAT[turnier]._STOCKERL[3]) + '</span>, ' + STAT[turnier][STAT[turnier]._STOCKERL[3]][4] + ' Punkte<br>'
                                            + '</span></a></li>'
                                            : ''
                                            )
                                    + htmlTE;
                        }
                    }
                }
            }
        }
    }

    if (nAnekdoten) {
        $('#bAnekdoten').removeClass('ui-disabled');
    } else {
        $('#bAnekdoten').addClass('ui-disabled');
    }

    if (QUERFORMAT() && (pStockerl || pAnekdoten)) {
        htmlTE = '<tr>'
                + '<td class=noprint>&nbsp;&nbsp;</td>'
                + '<td class="cBlau P L" onclick="showCupwertung();"><b>Cupwertung</b>&nbsp;&nbsp;' + stSaison + '</td>'
                + '<td class="M"></td>'
                + '<td class="M" ><span style="white-space:nowrap">1. <span onclick="event.stopPropagation();popupSpieler(\'' + CUPSIEGER[1] + '\');" class="P B cBlau">' + getSpielerName(CUPSIEGER[1]) + '</span>, ' + CUPPUNKTE[CUPSIEGER[1]] + ' Cuppunkte</span></td></tr>'
                + '<tr hidden><td class="M">adfasdf</td></tr>'
                + '<tr><td class=noprint></td><td></td><td></td><td class="M"><div style="margin-top:-5px;white-space:nowrap">2. <span onclick="event.stopPropagation();popupSpieler(\'' + CUPSIEGER[2] + '\');" class="P B cBlau">' + getSpielerName(CUPSIEGER[2]) + '</span>, ' + CUPPUNKTE[CUPSIEGER[2]] + ' Cuppunkte<br>3. <span onclick="event.stopPropagation();popupSpieler(\'' + CUPSIEGER[3] + '\');" class="P B cBlau">' + getSpielerName(CUPSIEGER[3]) + '</span>, ' + CUPPUNKTE[CUPSIEGER[3]] + ' Cuppunkte</div></td></td></tr>'
                + '<tr><td></td><th class="L K" colspan="3">Die ' + (pAnekdoten ? 'Anekdoten' : 'Turniere') + ' der Saison&nbsp;&nbsp;' + stSaison + ':</th></tr>'
                + htmlTE;
        htmlTE = "<table data-role='table' data-mode='columntoggle' cellspacing='0' class='ui-body-d ui-shadow ui-responsive table-stripe' data-column-btn-text=''><tbody>"
                + htmlTE
                + "</tbody></table>";
        if (QUERFORMAT()) {
            $('#dRumpf').html(htmlTE).trigger('create').show();
        } else {
            $('#sideDetails').hide();
            $('#dContent').html(htmlTE).trigger('create').show();
            var hx = $(window).innerHeight() - $('#dContent').offset().top - $('#dFooter').height();
            $('#sideContent').css('height', hx + 'px');
            $('#nbUebersicht,#nbArchiv,#bAktSaison').removeClass('ui-disabled').removeClass('ui-btn-active');
        }
        $('#a' + nTurniere).show();
    } else {
        $('#sideDetails').html(
                '<li data-role="list-divider" onclick="toggleListen();">&nbsp;&nbsp;&nbsp;&nbsp;'
                + '<i onclick="event.stopPropagation(); toggleListen();" title="Die Listen der Saison ausblenden." id=iPlus class="i zmdi-plus noprint"  style="position: absolute; top: -10px; right: 12px; font-size: 44px; cursor: pointer;"></i>'
                + '<i onclick="event.stopPropagation(); toggleListen();" title="Die Listen der Saison einblenden." id=iMinus class="i zmdi-minus noprint"  style="position: absolute; top: -10px; right: 12px; font-size: 44px; cursor: pointer;"></i>'

                + pSaison + ' - die Listen:</li>'

                + '<li class="cListe" data-icon=false><a id=bCupwertung onclick="showCupwertung();">&nbsp;Cupwertung</a></li>'
                + (window.location.href.toUpperCase().indexOf('OOV') < 0
                        ? (QUERFORMAT()
                                ? '<li class="cListe" data-icon="false"><a id=bPlatzierungen onclick="showPlatzierungen();">&nbsp;Platzierungen</a></li>'
                                : '')
                        + '<li class="cListe" data-icon="false"><a id=bStockerlliste onclick="showSaison(\'' + pSaison + '\', true)">&nbsp;Stockerlliste</a></li>'
                        + '<li class="cListe" data-icon="false"><a id=bAnekdoten ' + (nAnekdoten ? '' : 'class="ui-disabled "') + 'onclick="showSaison(\'' + pSaison + '\', false, true)">&nbsp;Anekdoten</a></li>'
                        : '')
                + (stSaisonTab[0] === pSaison
                        ? '<li class="cListe" data-icon="false"><a id=bTurnierkalender2 onclick="showTermine()">&nbsp;Turnierkalender</a></li>'
                        : ''
                        )
                + '<li data-role="list-divider">&nbsp;&nbsp;&nbsp;&nbsp;' + pSaison + ' - die Turniere:</li>'
                ).listview('refresh').show();
        if (pStockerl) {
            $('#dContent').html(htmlTE).listview('refresh');
            $('#sideDetails').hide();
            $('#nbUebersicht,#nbArchiv,#bAktSaison').removeClass('ui-disabled').removeClass('ui-btn-active');
            var hx = $(window).innerHeight() - $('#dContent').offset().top - $('#dFooter').height();
            $('#sideContent').css('height', hx + 'px');
        } else {
            $('#dContent').html(htmlTE).listview('refresh');
        }
        if (QUERFORMAT()) {
            showLogo();
        }
    }
    hideEinenMoment();
    window.scrollTo(0, 0);
    if (pStockerl || pAnekdoten) {
        $("#dCopyright").hide();
        setFont();
        if (stEndstand) {
            $('#tStand').html('Endstand:').attr('style', 'position: fixed; top: 44px; right: 5px; cursor: pointer;').show();
        } else {
            $('#tStand').html('Stand: ' + new Date().toLocaleDateString()).attr('style', 'position: fixed; top: 44px; right: 5px; cursor: pointer;').show();
        }
    } else {
        $("#sideContent,#dCopyright").show();
        setFont();
        setTimeout(function () {
            var hx = $(window).innerHeight() - $('#dContent').offset().top - $('#dFooter').height() - 1;
            $('#sideContent').css('height', hx + 'px');
        }, 100);
        stShowList = !stShowList;
        toggleListen();
    }
}

function toggleListen() {
    var elmnt = document.getElementById("sideContent");
    elmnt.scrollTop = 0;
    stShowList = !stShowList;
    if (stShowList) {
        $('.cListe').show();
        $('#iPlus').show();
        $('#iMinus').hide();
    } else {
        $('.cListe').hide();
        $('#iPlus').hide();
        $('#iMinus').show();
    }
    var hx = $(window).innerHeight() - $('#dContent').offset().top - $('#dFooter').height();
    $('#sideContent').css('height', hx + 'px');
}

function compCUPPUNKTE() {

    CUPPUNKTE = new Object();
    var hPunkte = 0;
    for (var turnier in STAT) {
        if (turnier[0] !== '_') {
            if (stCup !== 56
                    || stCup === 56 && window.location.href.toUpperCase().indexOf('OOV') < 0 // OOV = Out Of Vienna
                    || stCup === 56 && window.location.href.toUpperCase().indexOf('OOV') > 0 && STAT[turnier]._NAME.toUpperCase().indexOf('OOV') > 0) {
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
            if (stCup !== 56
                    || stCup === 56 && window.location.href.toUpperCase().indexOf('OOV') < 0 // OOV = Out Of Vienna
                    || stCup === 56 && window.location.href.toUpperCase().indexOf('OOV') > 0 && STAT[turnier]._NAME.toUpperCase().indexOf('OOV') > 0) {
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

    CUPSIEGER = [, 0, 0, 0];
    var _Punkte = [, 0, 0, 0];
    for (var spieler in CUPPUNKTE) {
        sCUPPUNKTE = 0;
        if (CUPPUNKTE[spieler] >= _Punkte[1]) {
            CUPSIEGER[3] = CUPSIEGER[2];
            CUPSIEGER[2] = CUPSIEGER[1];
            CUPSIEGER[1] = spieler;
            _Punkte[3] = _Punkte[2];
            _Punkte[2] = _Punkte[1];
            _Punkte[1] = CUPPUNKTE[spieler];
        } else if (CUPPUNKTE[spieler] >= _Punkte[2]) {
            CUPSIEGER[3] = CUPSIEGER[2];
            CUPSIEGER[2] = spieler;
            _Punkte[3] = _Punkte[2];
            _Punkte[2] = CUPPUNKTE[spieler];
        } else if (CUPPUNKTE[spieler] >= _Punkte[3]) {
            CUPSIEGER[3] = spieler;
            _Punkte[3] = CUPPUNKTE[spieler];
        }
    }
}