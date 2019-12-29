
/* global STAT, stStat, stCup, CUPS, stSaison, stFinale, SPIELER */

function downloadExcel() {
    'use strict';

    var hSort = 0;
    var hTurnier = STAT.ZULETZT.toDateString();

    showEinenMoment(CUPS.NAME[stCup] + ':', 'Turnier ' + hTurnier + '<br>wird herungergladen!');

    var blob = "Nr.;Name;R1;R2;R3;\n";

    var SORT = [];

    for (var i in STAT.S) {
        if (hTurnier === new Date(STAT.S[i].TIMESTAMP).toDateString()) {
            hSort = 5000;
            if (STAT.S[i].PUNKTERx[0]) {
                hSort -= STAT.S[i].PUNKTERx[0];
            }
            if (STAT.S[i].PUNKTERx[1]) {
                hSort -= STAT.S[i].PUNKTERx[0];
            }
            if (STAT.S[i].PUNKTERx[2]) {
                hSort -= STAT.S[i].PUNKTERx[2];
            }

            SORT.push(hSort + ';'
                    + STAT.S[i].NR + ';'
                    + STAT.S[i].NNAME + ' ' + STAT.S[i].VNAME + ';'
                    + (STAT.S[i].PUNKTERx[0] ? STAT.S[i].PUNKTERx[0] : '-') + ';'
                    + (STAT.S[i].PUNKTERx[1] ? STAT.S[i].PUNKTERx[1] : '-') + ';'
                    + (STAT.S[i].PUNKTERx[2] ? STAT.S[i].PUNKTERx[2] : '-') + ';\n');
        }
    }

    SORT.sort();

    for (var ii = 0; ii < SORT.length; ii++) {
        blob += SORT[ii].substring(5);
    }

    var fName = 'Skoty Trophy ' + STAT.ZULETZT.getFullYear() + '-' + (STAT.ZULETZT.getMonth()+1) + '-' + STAT.ZULETZT.getDate() + ".csv";

    saveAs(new Blob([blob], {type: "text/plain;charset=utf-8"}), fName);

    hideEinenMoment();
}