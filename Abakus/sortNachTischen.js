
/* global SORT, STAT, LS */


function sortNachTischen(pTischAnmelden) {

    var i = 0;
    var nTische = parseInt((SORT.length - 1) / 4);
    var neuerTisch = 0;
    var meinTisch = 0;

    if (pTischAnmelden) {
        LS.AnzSpieler = 0;
    }

    for (var ii = 1; ii < SORT.length; ii++) {

        neuerTisch = (ii % nTische) + 1;

        i = parseInt(SORT[ii].substring((SORT[ii].indexOf(';') + 1)));
        if (STAT.S[i].NR === LS.ME) {
            meinTisch = neuerTisch;
            if (pTischAnmelden) { // mich als ersten anmelden
                blert(STAT.S[i].NR, STAT.S[i].VNAME, STAT.S[i].NNAME, STAT.S[i].ORT, STAT.S[i].STERNE);
                LS.AnzSpieler++;
            }
        }
    }

    for (var ii = 1; ii < SORT.length; ii++) {

        neuerTisch = (ii % nTische) + 1;

        if (pTischAnmelden) {
            if (neuerTisch === meinTisch) {
                i = parseInt(SORT[ii].substring((SORT[ii].lastIndexOf(';') + 1)));
                if (STAT.S[i].NR !== LS.ME) { // wurde schon angemeldet
                    blert(STAT.S[i].NR, STAT.S[i].VNAME, STAT.S[i].NNAME, STAT.S[i].ORT, STAT.S[i].STERNE);
                    LS.AnzSpieler++;
                }
            }
        }
        SORT[ii] = neuerTisch + SORT[ii].substring(SORT[ii].indexOf(','));
    }
    SORT.sort();
}

function sortNachReihung(pTischAnmelden) {
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
                }
            }
        }
    }
}