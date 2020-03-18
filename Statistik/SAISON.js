
/* global LS, stSaison, QUERFORMAT(), stFinale, getName, SPIELER, STAT, stCup, CUPS, stEndstand, jbSpieler, ADMIN, SAISON, hRet, SP, stStat */

const isSaison = 0;
const is1 = 1;
const is2 = 2;
const is3 = 3;
const is1CupPunkte = 4;
const is2CupPunkte = 5;
const is3CupPunkte = 6;
const isAnzTurniere = 7;
const isAnzTeilnehmer = 8;
const isAnzTeilnahmen = 9;
const isFinale = 10;

const spRangImCup = 0;
const spCuppunkte = 1;
const spTeilnahmen = 2;
const spBestePlatz = 3;
const spSumPlatz = 4;
const spPunkte = 5;
const sp0Cupsiege = 1;
const sp0Cup2ter = 2;
const sp0Cup3ter = 3;
const sp0BestePlatz = 0;

function initSAISON(pFilter, pShowSaison) {
    if (pShowSaison) {
        pShowSaison = iSaison;
    }
    iSaison = 0;
    stSaison = '';
    SP = {};
    SAISON = [];

    if (stCup === 53) {
        $('#nbNoFilter,#nbBBTC,#nbSKUES').removeClass('ui-btn-active');
        if (pFilter) {
            stFilter = pFilter;
            if (pFilter === 'BBTC') {
                $('#nbBBTC').addClass('ui-btn-active');
            } else {
                $('#nbSKUES').addClass('ui-btn-active');
            }
        } else {
            stFilter = '';
            $('#nbNoFilter').addClass('ui-btn-active');
        }
        var hTitel = 'Sauwald Tarockcup';
        $(".hfHeaderIcon,#qfHeaderIcon").attr("src", "../Icons/i53" + (stFilter.replace(/Ü/g, 'UE')) + ".png");
        if (stFilter) {
            if (stFilter === 'BBTC') {
                hTitel = 'Baumgartner Bier Tarockcup';
            } else {
                hTitel = 'Sauwald Sküs';
            }
        }
        $('.hfHeaderZeile1,#qfHeaderZeile1').html(hTitel.replace(/ |_/g, '&nbsp;'));
        compSTAT();
    }

    var SORT = [];
    for (var turnier in STAT) {
        if (turnier[0] === '2') {
            SORT.push(turnier);
        }
    }

    for (var i = SORT.length - 1; i >= 0; i--) { // die letzen zuerst
        if (STAT[SORT[i]]._SAISON !== stSaison) {
            iSaison++;
            stSaison = STAT[SORT[i]]._SAISON;
            bereSaison();
        }
    }


    if (SAISON[1]) {
        stAktTurniere = SAISON[1][isAnzTurniere];

        if (!SAISON[1][isFinale]) {
            for (var termin in CUPS.TERMINE) {
                if (CUPS.TERMINE[termin].DATUM >= stHeute && CUPS.TERMINE[termin].CUP === stCup) {
                    if (stCup >= 50 && stCup <= 59 && stCup !== 53) {
                        if (CUPS.TERMINE[termin].DATUM <= '20' + SAISON[1][isSaison].substr(5, 2) + '-03-31') {
                            stAktTurniere++;
                        }
                    } else if (stCup === 53) {
                        if (CUPS.TERMINE[termin].DATUM <= SAISON[1][isSaison] + '-12-24') {
                            stAktTurniere++;
                        }
                    } else {
                        if (CUPS.TERMINE[termin].DATUM <= SAISON[1][isSaison] + '-12-31') {
                            stAktTurniere++;
                        }
                    }
                }
            }
        }
    }

    if (iSaison === 0) {
        $('#nbSaison,#nbArchiv').addClass('ui-disabled');
    } else {
        iSaison = 0;
    }

    if (pShowSaison) {
        var hStat = stStat;
        iSaison = pShowSaison;
        stSaison = SAISON[iSaison][isSaison];
        if (QUERFORMAT()) {
            showSaison(pShowSaison);
        }
        if (hStat === 'Heinewertung') {
            showHeinewertung();
        } else if (hStat === 'Fixpunktewertung') {
            showFixpunktewertung();
        } else if (hStat === 'Platzierungen') {
            showPlatzierungen();
        } else if (hStat === 'Chronik') {
            showChronik();
        } else if (hStat === 'Cupsieger') {
            showCupsieger();
        } else if (hStat === 'Teilnehmerzahlen') {
            showTeilnehmerzahlen();
        } else if (hStat === 'Bestenliste') {
            showBestenliste();
        } else if (hStat === 'Termine') {
            showTermine();
        } else if (!QUERFORMAT()) {
            showSaison(pShowSaison);
        }
    } else {
        if (SAISON.length) {
            iSaison = 0;
        }
    }
}

function bereSaison() {

    SAISON[iSaison] = [stSaison, '', '', '', 0, 0, 0, 0, 0, 0, false];

    stFinale = false;
    stFinalTeilnehmer = 0;
    stEndstand = false;

    if (CUPS.TURNIER[stCup] % 1) {
        var hPlusFinale = true;
    } else {
        var hPlusFinale = false;
    }

    for (var turnier in STAT) {
        if (turnier[0] === '2') {
            if (STAT[turnier]._SAISON === stSaison) {
                if (!stFilter || STAT[turnier]._NAME.toUpperCase().indexOf(stFilter) >= 0) {
                    SAISON[iSaison][isAnzTurniere]++;
                    if (STAT[turnier]._NAME.toUpperCase().indexOf('FINAL') >= 0) {
                        SAISON[iSaison][isFinale] = turnier;
                        if (STAT._AKTTURNIER && STAT._AKTTURNIER._TURNIER !== turnier) {
                            stEndstand = false;
                        } else {
                            stEndstand = true;
                        }
//                        if (CUPS.TURNIER[stCup] % 1) {
                        stFinale = turnier;
//                        }
                    } else if (iSaison > 1) {
                        SAISON[iSaison][isFinale] = turnier;
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

    var CUP = {};
    var hCupPunkte = 0;
    for (var turnier in STAT) {
        if (turnier[0] === '2') {
            if (STAT[turnier]._SAISON === stSaison) {
                if (!stFilter || STAT[turnier]._NAME.toUpperCase().indexOf(stFilter) >= 0) {
                    for (var spieler in STAT[turnier]) {
                        if (spieler[0] !== '_') {

                            SAISON[iSaison][isAnzTeilnahmen]++;

                            if (CUP[spieler]) {
                                aSP = CUP[spieler];
                                if (STAT[turnier][spieler][0] === 1) {
                                    aSP[1]++;
                                } else if (STAT[turnier][spieler][0] === 2) {
                                    aSP[2]++;
                                } else if (STAT[turnier][spieler][0] === 3) {
                                    aSP[3]++;
                                }
                                aSP[4]++;

                                if (aSP[6] > STAT[turnier][spieler][0]) {
                                    aSP[6] = STAT[turnier][spieler][0];  // Beste Platzierung
                                }
                                aSP[7] += STAT[turnier][spieler][0]; // Durch. Platzierung
                                aSP[8] += STAT[turnier][spieler][4]; // Punkte

                                if (turnier !== stFinale || !hPlusFinale) {
                                    hCupPunkte = getCupPunkte(turnier, spieler);
                                    if (getCupPunkte(turnier, spieler) === '-') {
                                        aSP[5].push(hCupPunkte);
                                    } else {
                                        ii = aSP[5].length;
                                        for (var i = 0; i < aSP[5].length; i++) {
                                            if (aSP[5][i] === '-'
                                                    || aSP[5][i] <= hCupPunkte) {
                                                ii = i;
                                                break;
                                            }
                                        }
                                        aSP[5].splice(ii, 0, hCupPunkte);
                                    }
                                }
                                CUP[spieler] = aSP;
                            } else {
                                SAISON[iSaison][isAnzTeilnehmer]++;
                                aSP = [0, 0, 0, 0, 1, [], STAT[turnier][spieler][0], STAT[turnier][spieler][0], STAT[turnier][spieler][4]];
                                if (STAT[turnier][spieler][0] === 1) {
                                    aSP[1]++;
                                } else if (STAT[turnier][spieler][0] === 2) {
                                    aSP[2]++;
                                } else if (STAT[turnier][spieler][0] === 3) {
                                    aSP[3]++;
                                }

                                if (turnier !== stFinale || !hPlusFinale) {
                                    aSP[5] = [getCupPunkte(turnier, spieler)];
                                }

                                CUP[spieler] = aSP;
                            }
                        }
                    }
                }
            }
        }
    }

    var CUPD = [];
    var spieler = '';
    for (var spieler in CUP) { // der Internet Explorer versteht kein  for (var CUPrec of CUP)

        aSP = CUP[spieler];
        for (var i in aSP[5]) {
            if (i < parseInt(CUPS.TURNIER[stCup])) {
                if (!isNaN(aSP[5][i])) {
                    aSP[0] += aSP[5][i];
                }
            } else {
                break;
            }
        }

        if (stFinale || iSaison > 1) {
            if (hPlusFinale) {
                if (stFinale) {
                    hCupPunkte = getCupPunkte(stFinale, spieler);
                } else {
                    hCupPunkte = '-';
                }
                if (!isNaN(hCupPunkte)) {
                    aSP[0] += parseInt(hCupPunkte);
                }
            }
            if (aSP[0] > SAISON[iSaison][is3CupPunkte]) {
                if (aSP[0] > SAISON[iSaison][is2CupPunkte]) {
                    if (aSP[0] > SAISON[iSaison][is1CupPunkte]) {
                        SAISON[iSaison][is3] = SAISON[iSaison][is2];
                        SAISON[iSaison][is3CupPunkte] = SAISON[iSaison][is2CupPunkte];
                        SAISON[iSaison][is2] = SAISON[iSaison][is1];
                        SAISON[iSaison][is2CupPunkte] = SAISON[iSaison][is1CupPunkte];
                        SAISON[iSaison][is1] = spieler;
                        SAISON[iSaison][is1CupPunkte] = aSP[0];
                    } else {
                        SAISON[iSaison][is3] = SAISON[iSaison][is2];
                        SAISON[iSaison][is3CupPunkte] = SAISON[iSaison][is2CupPunkte];
                        SAISON[iSaison][is2] = spieler;
                        SAISON[iSaison][is2CupPunkte] = aSP[0];
                    }
                } else {
                    SAISON[iSaison][is3] = spieler;
                    SAISON[iSaison][is3CupPunkte] = aSP[0];
                }
            }
        }

        if (!SP[spieler]) {
            SP[spieler] = [[999]];
        }

        SP[spieler][iSaison] = [0, aSP[0], aSP[4], aSP[6], aSP[7], aSP[8]];
        if (aSP[6] < 4) {
            SP[spieler][iSaison][3] = aSP[1] + '-' + aSP[2] + '-' + aSP[3];
        }

        if (stFinale && hPlusFinale) {
            CUPD.push((9000 - aSP[0]) + 'FP:' + (5000 - getCupPunkte(stFinale, spieler)) + (SPIELER[spieler] ? SPIELER[spieler][0] : '????') + ';' + spieler);
        } else {
            CUPD.push((9000 - aSP[0]) + 'FP:0000' + (SPIELER[spieler] ? SPIELER[spieler][0] : '????') + ';' + spieler);
        }
    }

    CUPD.sort();

    var hPlatz = 0;
    var hLastKey = '';
    for (var ii = 0; ii < CUPD.length; ii++) {
        var spieler = CUPD[ii].substring((CUPD[ii].lastIndexOf(';') + 1));
        if (hLastKey !== CUPD[ii].substr(0, 11)) {
            hLastKey = CUPD[ii].substr(0, 11);
            hPlatz = ii + 1;
        }
        SP[spieler][iSaison][0] = hPlatz;

        if (stFinale || iSaison > 1) {
            if (SP[spieler][0][sp0BestePlatz] > hPlatz) {
                SP[spieler][0][sp0BestePlatz] = hPlatz;
            }
            if (hPlatz === 1) {
                if (SP[spieler][0][sp0Cupsiege]) {
                    SP[spieler][0][sp0Cupsiege] = SP[spieler][0][sp0Cupsiege] + 1;
                } else {
                    SP[spieler][0][sp0Cupsiege] = 1;
                }
            } else if (hPlatz === 2) {
                if (SP[spieler][0][sp0Cup2ter]) {
                    SP[spieler][0][sp0Cup2ter] = SP[spieler][0][sp0Cup2ter] + 1;
                } else {
                    SP[spieler][0][sp0Cup2ter] = 1;
                }
            } else if (hPlatz === 3) {
                if (SP[spieler][0][sp0Cup3ter]) {
                    SP[spieler][0][sp0Cup3ter] = SP[spieler][0][sp0Cup3ter] + 1;
                } else {
                    SP[spieler][0][sp0Cup3ter] = 1;
                }
            }
        }
    }
}