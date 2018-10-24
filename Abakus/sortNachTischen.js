
/* global SORT, STAT, LS */

function sortNachReihung(pI, pTischAnmelden) {
    'use strict';
    var i = 0;
    var hTisch = 0.75;
    var nTische = parseInt((SORT.length - 1) / 4);
    var n5erTische = (SORT.length - 1) % 4;
    var neuerTisch = 0;
    var alterTisch = 0;
    var meinTisch = 0;
    var sum = 0;

    if (pTischAnmelden) {
        LS.AnzSpieler = 0;
    }

    for (var ii = 1; ii < SORT.length; ii++) {
        i = parseInt(SORT[ii].substring((SORT[ii].lastIndexOf(';') + 1)));
        sum = 800000000000;
        if (STAT.S[i].PUNKTERx[0]) {
            sum -= STAT.S[i].PUNKTERx[0];
        }
        if (STAT.S[i].PUNKTERx[1]) {
            sum -= STAT.S[i].PUNKTERx[1];
        }
        SORT[ii] = sum + ',' + SORT[ii];
    }
    SORT.sort();

    for (var ii = 1; ii < SORT.length; ii++) {
        i = parseInt(SORT[ii].substring((SORT[ii].lastIndexOf(';') + 1)));

        hTisch = hTisch + 0.25;
        neuerTisch = parseInt(hTisch);
        if (alterTisch !== neuerTisch) {
            alterTisch = neuerTisch;
            if (neuerTisch > nTische - n5erTische) {
                hTisch = hTisch - 0.25;
            }
        }
        if (neuerTisch > nTische) { // 6er Tisch
            neuerTisch = nTische;
        }

        if (STAT.S[i].NR === LS.ME) {
            meinTisch = neuerTisch;
            if (pTischAnmelden) {
                blert(STAT.S[i].NR, STAT.S[i].VNAME, STAT.S[i].NNAME, STAT.S[i].ORT, STAT.S[i].STERNE);
                LS.AnzSpieler++;
                console.log(SORT[ii] + ' T:' + neuerTisch + '  ' + i + ' ' + STAT.S[i].NR + ' ' + STAT.S[i].VNAME + ' ' + STAT.S[i].NNAME);
            }
        }
        SORT[ii] = neuerTisch + ',' + SORT[ii];
    }
    SORT.sort();

    if (pTischAnmelden) {
        for (var ii = 1; ii < SORT.length; ii++) {
            if (parseInt(SORT[ii]) === meinTisch) {
                i = parseInt(SORT[ii].substring((SORT[ii].lastIndexOf(';') + 1)));
                if (STAT.S[i].NR !== LS.ME) { // wurde schon angemeldet
                    blert(STAT.S[i].NR, STAT.S[i].VNAME, STAT.S[i].NNAME, STAT.S[i].ORT, STAT.S[i].STERNE);
                    LS.AnzSpieler++;
                    console.log(SORT[ii] + ' T:' + neuerTisch + '  ' + i + ' ' + STAT.S[i].NR + ' ' + STAT.S[i].VNAME + ' ' + STAT.S[i].NNAME);
                }
            } else {
                console.log(SORT[ii] + ' T:' + neuerTisch);
            }
        }
    }
}

function sortNachTischen(pI, pTischAnmelden, pRunde) {

    var i = 0;
    var iTisch = 0;
    var iTischManuell = 0;
    var iSpieler = 0;
    var nTische = parseInt((SORT.length - 1) / 4);
    var nTischeManuell = 0;
    var neuerTisch = 0;
    var tNR = 'null,';
    var meinTisch = 0;
    var mTisch = [1];

    if (pTischAnmelden) {
        LS.AnzSpieler = 0;
    }

    var tMeinTisch = LS.ME + ',*';
    var hRunde = pRunde;
    if (!hRunde) {
        hRunde = parseInt(STAT.TURRUNDE);
    }

    for (var ii = 1; ii < SORT.length; ii++) {
        if (SORT[ii].substr(0, (tNR).length) !== (tNR)) { // neuer Tisch
            iTisch++;
            if (iTisch > nTische) {
                iTisch = iTisch - nTische;
            }
            tNR = SORT[ii].substring(0, SORT[ii].indexOf(',') + 1);
            if (tNR[0] === 'm') {
                nTischeManuell++;
                mTisch[nTischeManuell] = iTisch;
            }
        }
        if (SORT[ii].substr(0, tMeinTisch.length) === tMeinTisch) {
            meinTisch = iTisch;
            if (pTischAnmelden) {
                i = parseInt(SORT[ii].substring((SORT[ii].indexOf(';') + 1)));
                if (STAT.S[i].NR === LS.ME) { // mich als ersten anmelden
                    blert(STAT.S[i].NR, STAT.S[i].VNAME, STAT.S[i].NNAME, STAT.S[i].ORT, STAT.S[i].STERNE);
                    LS.AnzSpieler++;
                }
            }
        }
    }

    var tVorrueckung;
    if (hRunde === 1) {
        tVorrueckung = [0, 0, 0, 0, 0, 0];
    } else if (hRunde === 2 || hRunde === 3) {
        if (nTische === 1) {
            tVorrueckung = [0, 0, 0, 0, 0, 0];
        } else if (nTische === 2) {
            if (hRunde === 2) {
                tVorrueckung = [0, 0, 1, 1, 0, 1];
            } else {
                tVorrueckung = [0, 1, 0, 1, 1, 0];
            }
        } else if (nTische === 3) {
            if (hRunde === 2) {
                tVorrueckung = [0, 1, 2, 0, 1, 2];
            } else {
                tVorrueckung = [0, 1, 1, 2, 0, 2];
            }
        } else if (nTische === 4) {
            if (hRunde === 2) {
                tVorrueckung = [0, 1, 2, 3, 0, 1];
            } else {
                tVorrueckung = [0, 2, 3, 1, 1, 0];
            }
        } else if (nTische === 5) {
            if (hRunde === 2) {
                tVorrueckung = [0, 1, 2, 3, 4, 0];
            } else {
                tVorrueckung = [0, 4, 3, 2, 1, 1];
            }
        } else {
            if (hRunde === 2) {
                tVorrueckung = [0, 1, 2, 3, 4, 5];
            } else {
                tVorrueckung = [0, 5, 4, 2, 3, 1];
            }
        }
    } else {
        tVorrueckung = [0, 11 * (hRunde), 12 * (hRunde), 13 * (hRunde), 14 * (hRunde), 15 * (hRunde)];
    }

    tNR = 'null,';
    iTisch = 0;
    for (var ii = 1; ii < SORT.length; ii++) {
        if (SORT[ii].substr(0, (tNR).length) !== (tNR)) { // neuer Tisch
            iTisch++;
            iSpieler = 0;
            tNR = SORT[ii].substring(0, SORT[ii].indexOf(',') + 1);
            console.log('Tisch: ' + iTisch);
            if (tNR[0] === 'm') {
                iTischManuell++;
            }
        } else {
            iSpieler++;
        }
        neuerTisch = ((iTisch + tVorrueckung[iSpieler] - 1) % nTische) + 1;

        console.log(SORT[ii] + ' T:' + iTisch + ' S:' + iSpieler + ' N:' + neuerTisch);

        if (nTische === 3 && 3 === 4) {          //, 2-, 3+ , 4-
            if (hRunde === 3 && nTischeManuell) {
                if (neuerTisch === 1 && iSpieler !== 0 && iSpieler <= nTischeManuell && iSpieler <= 3) {
                    neuerTisch = 0; // Platz machen f�r iSpieler 0 von Manuellen Tisch
                    neuerTisch = mTisch[iSpieler];
                } else if (tNR[0] === 'm' && iSpieler === 0 && iSpieler <= nTischeManuell && iTischManuell <= 3) {
                    neuerTisch = 1; // Platz tauschen
                }
            }
        }
        if (pTischAnmelden) {
            if (neuerTisch === meinTisch) {
                i = parseInt(SORT[ii].substring((SORT[ii].lastIndexOf(';') + 1)));
                if (STAT.S[i].NR !== LS.ME) { // wurde schon angemeldet
                    blert(STAT.S[i].NR, STAT.S[i].VNAME, STAT.S[i].NNAME, STAT.S[i].ORT, STAT.S[i].STERNE);
                    LS.AnzSpieler++;
                }
                console.log(SORT[ii] + ' T:' + iTisch + ' S:' + iSpieler + ' N:' + neuerTisch + '  ' + i + ' ' + STAT.S[i].NR + ' ' + STAT.S[i].VNAME + ' ' + STAT.S[i].NNAME);
            } else {
                console.log(SORT[ii] + ' T:' + iTisch + ' S:' + iSpieler + ' N:' + neuerTisch);
            }
        }
        SORT[ii] = neuerTisch + SORT[ii].substring(SORT[ii].indexOf(','));
    }
    SORT.sort();
}