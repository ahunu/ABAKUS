
/* global STAT, QUERFORMAT(), CUPS, stCup, jbSpieler, sortNumber, LS, SAISON, isSaison, is1, is1CupPunkte, is3, is2, is2CupPunkte, is3CupPunkte, stFilter, isFinale, lastBtn, stFotoStyle */

function showSaison(pSaison, pFotos, pRefreshTurnier) {

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

    if (QUERFORMAT()) {
        showIcons([]);
    } else {
        if (!pFotos) {
            showIcons(['#iLandscape']);
        } else {
            showIcons(['#iPortrait']);
        }
    }

    if (CUPS.TYP[stCup] === 'CUP') {
        if (!pSaison) {
//            if (isNaN(iSaison) || iSaison < 1 || iSaison >= SAISON.length) {
            if (iSaison === 0) {
                iSaison = 1;
            }
            stSaison = SAISON[iSaison][isSaison];
        }
        if (pSaison && iSaison !== pSaison) {
            iSaison = pSaison;
            stSaison = SAISON[iSaison][isSaison];
            compCUPPUNKTE();
        }
    } else {
        iSaison = 1;
        stSaison = '&nbsp;';
    }

// 19 erfasst
// 25 nicht genehmigt
// 29 genehmigt
// 30 in arbeit
// 35 abgebrochen
// 39 erledidigt
// 40

    html = '<li data-role="list-divider"><div class="ui-grid-a">'
            + '<li data-role="list-divider">&nbsp;&nbsp;&nbsp;&nbsp;Statuslisten ' + stSaison + ':</li>'
            + '<li class="cDieListen" data-icon=false><a id=bHeinewertung onclick="showRAMOS(19);">&nbsp;Erfasst</a></li>'
            + '<li class="cDieListen" data-icon=false><a id=bHeinewertung onclick="showRAMOS(25);">&nbsp;Nicht genehmigt</a></li>'
            + '<li class="cDieListen" data-icon=false><a id=bHeinewertung onclick="showRAMOS(29);">&nbsp;Genehmigt</a></li>'
            + '<li class="cDieListen" data-icon=false><a id=bHeinewertung onclick="showRAMOS(30);">&nbsp;In Arbeit</a></li>'
            + '<li class="cDieListen" data-icon=false><a id=bHeinewertung onclick="showRAMOS(35);">&nbsp;Abgebrochen</a></li>'
            + '<li class="cDieListen" data-icon=false><a id=bHeinewertung onclick="showRAMOS(39);">&nbsp;Erledigt</a></li>'
            + '<li class="cDieListen" data-icon=false><a id=bHeinewertung onclick="showRAMOS(45);">&nbsp;Beanstandet</a></li>'
            + '<li class="cDieListen" data-icon=false><a id=bHeinewertung onclick="showRAMOS(49);">&nbsp;Geprüft</a></li>'

            + '<li data-role="list-divider">&nbsp;&nbsp;&nbsp;&nbsp;Diverse Listen ' + stSaison + ':</li>'
            + '<li class="cDieListen" data-icon=false><a id=bHeinewertung onclick="showRAMOS();">&nbsp;Risikoliste</a></li>'
            + '<li class="cDieListen" data-icon=false><a id=bHeinewertung onclick="showRAMOS();">&nbsp;Hochrisikoliste</a></li>'
            + '<li class="cDieListen" data-icon=false><a id=bHeinewertung onclick="showRAMOS();">&nbsp;Revisionsliste</a></li>';

    $('#sideTurniere').html(html).listview('refresh').show();

    $('#nbUebersicht,#nbArchiv').removeClass('ui-btn-active');
    $('#nbSaison').addClass('ui-btn-active');
    $('#tArchiv').text(stSaison);
    stStat = '';
    writeCanvas('Vivat Valat!');
    html = '';

    stFinale = false;
    stFinalTeilnehmer = 0;
    stEndstand = false;

    $('#dContent').html(html + '<br>').listview('refresh');
    if (QUERFORMAT()) {
        showLogo();
    }

    hideEinenMoment();
    window.scrollTo(0, 0);
    $("#sideContent,#dCopyright").show();
    setFont();
    showLi('.cDieListen', true);
    if (LS.Meldung) {
        $('#sideTurniere').prepend("&nbsp;<img src='../Icons/OK.png' width='24' height='24'><span class=M>&nbsp;<b>" + LS.Meldung + "</b><br></span>");
        LS.Meldung = '';
        localStorage.setItem('Abakus.LS', JSON.stringify(LS));
    }
    if (LS.ME === '3425') {
//        showRegeln();
//stCup = 0;
//        showPresseschau();
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
                if (STAT[turnier]._SAISON === stSaison || CUPS.TYP[stCup] !== 'CUP') {
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
                if (STAT[turnier]._SAISON === stSaison || CUPS.TYP[stCup] !== 'CUP') {
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