
/* global STAT, stStat, stCup, CUPS, stSaison, stFinale, SPIELER */

function downloadExcel() {
    'use strict';

    var fName = null;
    var blob = '';

    var hCup = '';
    if (stCup === 50)
        hCup = 'HRC';
    else if (stCup === 51)
        hCup = 'KTC';
    else if (stCup === 52)
        hCup = 'RTC';
    else if (stCup === 53)
        hCup = 'SWC';
    else if (stCup === 54)
        hCup = 'STC';
    else if (stCup === 55)
        hCup = 'TTC';
    else if (stCup === 56)
        hCup = 'WTC';

    if (stStat === 'Cupwertung') { // nicht verfügbar
        showEinenMoment(CUPS.NAME[stCup] + ':', 'Die Cupwertung ' + stSaison + '<br>wird herungergladen!');

        var i = 0;
        var ii = 0;

        var html = '';

        var tOF = [];
        if (stCup === 54) {
            tOF = [120, 109, 100, 93, 87, 82, 78, 73, 69, 64, 60, 57, 53, 50, 46, 43, 41, 38, 35, 33, 31, 29, 27, 25, 23, 22, 20, 19, 18, 17, 16, 15, 14, 13, 13, 12, 12, 11, 11, 11];
        } else {
            tOF = [120, 111, 104, 98, 95, 91, 88, 84, 81, 78, 75, 72, 69, 66, 63, 61, 58, 56, 53, 51, 49, 47, 45, 43, 41, 39, 37, 36, 34, 32, 31, 30, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 17, 16, 15, 15, 14, 14, 13, 13, 13, 12, 12, 12, 11, 11, 11, 11];
        }

        var hCUP = {};
        var hCupPunkte = 0;
        for (var turnier in STAT) {
            if (STAT[turnier]._SAISON === stSaison) {
                for (var spieler in STAT[turnier]) {
                    if (spieler[0] !== '_') {
                        if (hCUP[spieler]) {
                            tCUP = hCUP[spieler];
                            if (STAT[turnier][spieler][0] === 1) {
                                tCUP[1]++;
                            } else if (STAT[turnier][spieler][0] === 2) {
                                tCUP[2]++;
                            } else if (STAT[turnier][spieler][0] === 3) {
                                tCUP[3]++;
                            }
                            tCUP[4]++;
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
                            hCUP[spieler] = tCUP;
                        } else {
                            tCUP = [0, 0, 0, 0, 0, 0];
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
                            hCUP[spieler] = tCUP;
                        }
                    }
                }
            }
        }

        var SORT = [];
        var spieler = '';
        for (var spieler in hCUP) { // der Internet Explorer versteht kein  for (var CUPrec of hCUP)
            tCUP = hCUP[spieler];
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
                    tCUP[0] += hCupPunkte;
                }
            }

            hCUP[spieler] = tCUP;
            tCUP.push(spieler);
            if (isNaN(spieler)) {
                SORT.push((9000 - tCUP[0]) + spieler + ';' + spieler);
            } else {
                SORT.push((9000 - tCUP[0]) + (SPIELER[spieler] ? SPIELER[spieler][0] : '????') + ';' + spieler);
            }
        }

        SORT.sort();

        var html = "#;Nr.;Name;Ort;Cuppunkte;" + (stFinale ? "Finale;" : "") + "VR1;VR2;VR3;VR4;VR5;VR6;Teilnahmen;Siege;OeF;Gesamt;\n";

        var nSpieler = 0;
        var hPlatz = 0;
        var hLastKey = 0;
        for (var ii = 0; ii < SORT.length; ii++) {
            nSpieler++;
            var spieler = SORT[ii].substring((SORT[ii].lastIndexOf(';') + 1));
            tCUP = hCUP[spieler];


            if (hLastKey !== tCUP[0]) {
                hLastKey = tCUP[0];
                hPlatz = nSpieler;
            }

            if (hLastKey !== parseInt(CUPD[ii])) {
                hLastKey = parseInt(CUPD[ii]);
                hPlatz = nSpieler;
            }

            html += hPlatz + ';'
                    + (isNaN(spieler) ? '????' : spieler) + ';'
                    + getName(spieler) + ';'
                    + getSpielerOrt(spieler, true) + ';'
                    + tCUP[0] + ';'
                    + (stFinale ? getCupPunkte(stFinale, spieler) + ";" : "");

            for (var i = 0; i < 6; i++) {
                if (!isNaN(tCUP[5][i])) {
                    html += tCUP[5][i] + ';';
                } else {
                    html += ';';
                }
            }

            html += tCUP[4] + ';'
                    + (tCUP[1] ? tCUP[1] : '-') + ';'
                    + (tOF[ii] ? tOF[ii] : '-') + ';'
                    + (tOF[ii] ? (tCUP[1] ? tOF[ii] + tCUP[1] : tOF[ii]) : '-') + ';\n';
        }

        blob = html;

        fName = hCup + ' - Cupwertung ' + stSaison.replace(/\//g, '-') + ".csv";
    } else {
        showEinenMoment(STAT[stStat]._NAME + ':', 'Das Turnier wird heruntergeladen!');
        blob += (stCup) + ';' + stStat + ';_NAME;' + STAT[stStat]._NAME + '\n';
        blob += (stCup) + ';' + stStat + ';_VERANSTALTER;' + STAT[stStat]._VERANSTALTER + '\n';
        for (var spieler in STAT[stStat]) {
            if (spieler[0] !== '_') {
                if (CUPS.TYP === 'MT') {
                    blob += (stCup) + ';' + stStat + ';' + '"' + spieler + '";' + STAT[stStat][spieler][1] + ';' + STAT[stStat][spieler][2] + ';' + STAT[stStat][spieler][3] + ';' + STAT[stStat][spieler][4] + ';' + STAT[stStat][spieler][5] + ';' + STAT[stStat][spieler][6] + ';\n';
                } else {
                    blob += (stCup) + ';' + stStat + ';' + '"' + spieler + '";' + STAT[stStat][spieler][1] + ';' + STAT[stStat][spieler][2] + ';' + STAT[stStat][spieler][3] + ';' + STAT[stStat][spieler][4] + ';' + ';\n';
                }
            }
        }
        fName = hCup + ' ' + stStat + ' ' + STAT[stStat]._NAME + ".csv";
    }

    saveAs(new Blob([blob], {type: "text/plain;charset=utf-8"}), fName);

    hideEinenMoment();
}