
/* global LS, stSaison, QUERFORMAT(), stFinale, getName, SPIELER, STAT, stCup, CUPS, stEndstand, jbSpieler, ADMIN, SAISON, hRet */

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


function initSAISON() {
    iSaison = 0;
    stSaison = '';
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

    if (iSaison === 10) {
        i = i;
    }

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

    CUP = {};
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
                                    tCUP = CUP[spieler];
                                    if (STAT[turnier][spieler][0] === 1) {
                                        tCUP[1]++;
                                    } else if (STAT[turnier][spieler][0] === 2) {
                                        tCUP[2]++;
                                    } else if (STAT[turnier][spieler][0] === 3) {
                                        tCUP[3]++;
                                    }

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
                                    SAISON[iSaison][isAnzTeilnehmer]++;
                                    tCUP = [0, 0, 0, 0, 0, []];
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

    CUPD = [];
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

        if (tCUP[0] > SAISON[iSaison][is3CupPunkte]) {
            if (tCUP[0] > SAISON[iSaison][is2CupPunkte]) {
                if (tCUP[0] > SAISON[iSaison][is1CupPunkte]) {
                    SAISON[iSaison][is3] = SAISON[iSaison][is2];
                    SAISON[iSaison][is3CupPunkte] = SAISON[iSaison][is2CupPunkte];
                    SAISON[iSaison][is2] = SAISON[iSaison][is1];
                    SAISON[iSaison][is2CupPunkte] = SAISON[iSaison][is1CupPunkte];
                    SAISON[iSaison][is1] = spieler;
                    SAISON[iSaison][is1CupPunkte] = tCUP[0];
                } else {
                    SAISON[iSaison][is3] = SAISON[iSaison][is2];
                    SAISON[iSaison][is3CupPunkte] = SAISON[iSaison][is2CupPunkte];
                    SAISON[iSaison][is2] = spieler;
                    SAISON[iSaison][is2CupPunkte] = tCUP[0];
                }
            } else {
                SAISON[iSaison][is3] = spieler;
                SAISON[iSaison][is3CupPunkte] = tCUP[0];
            }
        }

        CUP[spieler] = tCUP;
        tCUP.push(spieler);
        if (isNaN(spieler)) {
            CUPD.push((9000 - tCUP[0]) + spieler + ';' + spieler);
        } else {
            CUPD.push((9000 - tCUP[0]) + (SPIELER[spieler] ? SPIELER[spieler][0] : '????') + ';' + spieler);
        }
    }

    CUPD.sort();

}