
/* global LS, stSaison, QUERFORMAT(), stFinale, getName, SPIELER, STAT, stCup, CUPS, stEndstand, jbSpieler, ADMIN, SAISON, hRet, SP */

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

const spRangImCup = 0;
const spCuppunkte = 1;
const spTeilnahmen = 2;
const spBestePlatz = 3;
const spPunkte = 4;
const sp0Cupsiege = 0;

function initSAISON() {
    iSaison = 0;
    stSaison = '';
    SP = {};
    SAISON = [];
    for (var turnier in STAT) {
        if (turnier[0] === '2') {
            if (STAT[turnier]._SAISON !== stSaison) {
                if (stSaison) {
                    bereSaison();
                }
                iSaison++;
                stSaison = STAT[turnier]._SAISON;
            }
        }
    }
    if (stSaison) {
        bereSaison();
    }
    aktSaison = iSaison;
    iSaison = 0;
}

function bereSaison() {

    SAISON[iSaison] = [stSaison, '', '', '', 0, 0, 0, 0, 0, 0];

    stFinale = false;
    stFinalTeilnehmer = 0;
    stEndstand = false;

    for (var turnier in STAT) {
        if (turnier[0] === '2') {
            if (STAT[turnier]._SAISON === stSaison) {
                if (stCup !== 56
                        || stCup === 56 && window.location.href.toUpperCase().indexOf('OOV') < 0 // OOV = Out Of Vienna
                        || stCup === 56 && window.location.href.toUpperCase().indexOf('OOV') > 0 && STAT[turnier]._NAME.toUpperCase().indexOf('OOV') > 0) {
                    SAISON[iSaison][isAnzTurniere]++;
                    if (STAT[turnier]._NAME.toUpperCase().indexOf('FINAL') >= 0) {
                        stFinale = turnier;
                        if (STAT._AKTTURNIER && STAT._AKTTURNIER._TURNIER === turnier) {
                            stEndstand = false;
                        } else {
                            stEndstand = true;
                        }
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
                if (stCup !== 56
                        || stCup === 56 && window.location.href.toUpperCase().indexOf('OOV') < 0 // OOV = Out Of Vienna
                        || stCup === 56 && window.location.href.toUpperCase().indexOf('OOV') > 0 && STAT[turnier]._NAME.toUpperCase().indexOf('OOV') > 0) {
                    for (var spieler in STAT[turnier]) {
                        if (spieler[0] !== '_') {


                            if (stCup !== 56
                                    || stCup === 56 && window.location.href.toUpperCase().indexOf('OOV') < 0 // OOV = Out Of Vienna
                                    || stCup === 56 && window.location.href.toUpperCase().indexOf('OOV') > 0 && istFreund(spieler)) {

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
                                    aSP[7] += STAT[turnier][spieler][4]; // Punkte

                                    if (turnier !== stFinale) {
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
                                    aSP = [0, 0, 0, 0, 0, []];
                                    if (STAT[turnier][spieler][0] === 1) {
                                        aSP[1]++;
                                    } else if (STAT[turnier][spieler][0] === 2) {
                                        aSP[2]++;
                                    } else if (STAT[turnier][spieler][0] === 3) {
                                        aSP[3]++;
                                    }
                                    aSP[4]++;

                                    if (turnier !== stFinale) {
                                        aSP[5] = [getCupPunkte(turnier, spieler)];
                                    }

                                    aSP[6] = STAT[turnier][spieler][0]; // Platzierung
                                    aSP[7] = STAT[turnier][spieler][4]; // Punkte

                                    CUP[spieler] = aSP;
                                }
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
            if (i < 6) {
                if (!isNaN(aSP[5][i])) {
                    aSP[0] += aSP[5][i];
                }
            } else {
                break;
            }
        }

        if (stFinale) {
            hCupPunkte = getCupPunkte(stFinale, spieler);
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

        if (!SP[spieler]) {
            SP[spieler] = [[]];
        }

        SP[spieler][iSaison] = [0, aSP[0], aSP[4], aSP[6], aSP[7]];
        if (aSP[6] < 4) {
            SP[spieler][iSaison][3] = aSP[1] + '-' + aSP[2] + '-' + aSP[3];
        }

        if (stFinale) {
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
        if (hPlatz === 1 && stFinale) {
            if (SP[spieler][0][sp0Cupsiege]) {
                SP[spieler][0][sp0Cupsiege] = SP[spieler][0][sp0Cupsiege] + 1;
            } else {
                SP[spieler][0][sp0Cupsiege] = 1;
            }
        }
    }
}