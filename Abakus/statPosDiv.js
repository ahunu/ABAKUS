
/* global STAT, stStat, stTurCupGes, CUPS, stSort, getName, LS, stGelegenheitsspieler, stAktiv */

// Achtung in statShow /////////////////////////////////////////////////////
// Da in STAT.SPIELE und STAT.PUNKTE immer alle Spiele/Punkte enthalten sind,
// die Felder STAT.ANZSPIELE, STAT.ANZGEWONNEN und STAT.PKTGEWONNEN
// beim Turniertyp "Handy" die mit Typ "Manu." gespeicherten Spiele jedoch
// nicht berücksichtigt sind, kann es zu Ungenauigkeiten kommen.
//
// Lösung:
// Wird in einer Liste eine der drei Felder benötigt muß die Anzahl
// der gespielten Spiele wie folgt berechnet werden.
// Spiele := STAT.S[i].ANZSPIELE[stTurCupGes][0]+STAT.S[i].ANZSPIELE[stTurCupGes][19]
//
function c5mal(pChar) {
    if (pChar === ' ') {
        pChar = "&nbsp;";
    }
    return pChar + pChar + pChar + pChar + pChar;
}

function getText(pChar) {
    return c5mal(pChar) + c5mal(pChar) + c5mal(pChar) + c5mal(pChar) + '_' + c5mal(pChar) + '_' + c5mal(pChar) + '_' + c5mal(pChar) + c5mal(pChar) + c5mal(pChar) + c5mal(pChar) + c5mal(pChar) + c5mal(pChar) + '_' + c5mal(pChar) + '.' + c5mal(pChar) + '70';
}

function statPosDiv() {
    'use strict';
    var sKey, CupPunkte, hEIG, d60Ges;
    var nGelegenheitsspieler = 0;
    var nHaendisch = 0;
    var nAbzuege = 0;
    var hProzGew = 0;

    if (stCup === -1) {
        stCup = STAT.I;
    }

    var ret = "<div id='SP1Rumpf' xclass=M>"
            + getStatMeldungen()
            + "<div id='SP1Rumpf'><table id=mTable data-role='table' data-mode='columntoggle' class='ui-body-d ui-shadow table-stripe ui-responsive' data-column-btn-text=''><thead>";

    if (stStat <= 2) {
        ret = ret
                + "<tr id='L0P1' class='bGrau M'>"
                + "<th>&nbsp;Voll ab " + CUPS.VOLLAB[stCup][stTurCupGes] + "%</th>"
                + "<th colspan=3 class=TC>Punkte</th>"
                + "<th class=TR>Anz.</th>"
                + "</tr>"
                + "<tr class='bGrau M'>"
                + "<th>&nbsp;Spieler</th>"
                + "<th class=TR>Cup</th>"
                + "<th class=TR>&nbsp;&nbsp;D60</th>"
                + "<th class=TR>&nbsp;&nbsp;Ges.</th>"
                + "<th class=TR>Spiel</th>"
                + "</tr>";
    } else if (stStat === 7) {
        ret = ret
                + "<tr id='L0P1' class='bGrau M'>"
                + "<th></th>"
                + "<th colspan=5 class=TC>&nbsp;&nbsp;&nbsp;Spiele insgesamt</th>"
                + "</tr>"
                + "<tr class='bGrau M'>"
                + "<th>&nbsp;Spieler</th>"
                + "<th class=TR>Spiele</th>"
                + "<th colspan=2 class=TR>&nbsp&nbsp;3er&nbsp&nbsp;<b>%</b></th>"
                + "<th colspan=2 class=TR>&nbsp&nbsp;gew.&nbsp;%</th>"
                + "</tr>";
    } else {
        ret = ret
                + "<tr id='L0P1' class='bGrau M'>"
                + "<th></th>"
                + "<th colspan=5 class=TC>&nbsp;&nbsp;&nbsp;Spiele insgesamt</th>"
                + "</tr>"
                + "<tr class='bGrau M'>"
                + "<th>&nbsp;Spieler</th>"
                + "<th class=TR>gesp.</th>"
                + "<th colspan=2 class=TC>gewonnen</th>"
                + "<th colspan=2 class=TC>&nbsp;&nbsp;eigene&nbsp;&nbsp;</th>"
                + "</tr>";
    }
    ret = ret + "</thead><tbody>";

    SORT = [];
    for (var i = 0, eoa = STAT.S.length; i < eoa; i++) {
        if (STAT.S[i].SPIELE[stTurCupGes] > 0) {
            if (STAT.S[i].SPIELE[stTurCupGes] >= (STAT.MAXSPIELE[stTurCupGes] * CUPS.DISPAB[stCup][stTurCupGes] / 100)
                    || stGelegenheitsspieler
                    || STAT.S[i].NR === '0000') {
                if (stSort === 'CUP' || stStat === 2) {
                    sKey = getCupPunkte(i);
                    if (parseInt(sKey) === 0) {
                        sKey = STAT.S[i].PUNKTE[stTurCupGes] * 60 / STAT.S[i].SPIELE[stTurCupGes];
                    } else {
                        sKey = sKey * 1000;
                    }
                } else if (stSort === 'D60') {
                    sKey = STAT.S[i].PUNKTE[stTurCupGes] * 60 / STAT.S[i].SPIELE[stTurCupGes];
                } else if (stSort === 'GES') {
                    sKey = STAT.S[i].PUNKTE[stTurCupGes];
                } else if (stSort === 'ANZ') {
                    sKey = STAT.S[i].SPIELE[stTurCupGes];
                } else if (stSort === 'GEW+' || stSort === 'GEW-') {
                    sKey = (STAT.S[i].ANZGEWONNEN[stTurCupGes][0] + STAT.S[i].ANZGEWONNEN[stTurCupGes][19]) / ((STAT.S[i].ANZSPIELE[stTurCupGes][0] + STAT.S[i].ANZSPIELE[stTurCupGes][19]) / 100);
                    if (stSort === 'GEW+') {
                        sKey = sKey * -1;
                    }
                } else if (stSort === 'EIG+' || stSort === 'EIG-') {
                    sKey = (STAT.S[i].ANZSPIELE[stTurCupGes][0] / ((STAT.S[i].ANZSPIELE[stTurCupGes][0] + STAT.S[i].ANZSPIELE[stTurCupGes][19]) / 100));
                    if (stSort === 'EIG+') {
                        sKey = sKey * -1;
                    }
                } else if (stSort === '3er') {
                    sKey = (STAT.S[i].ANZSPIELE[stTurCupGes][9]) / ((STAT.S[i].ANZSPIELE[stTurCupGes][0] + STAT.S[i].ANZSPIELE[stTurCupGes][19]) / 100);
                }

                if (STAT.S[i].NR === '0000') {
                    sKey = '00000000000;' + i;
                } else if (stSort === 'NAM') {
                    getName(i);
                    sKey = getName(i, 99) + ';' + i;
                } else {
                    sKey = (50000000000 - parseInt(sKey * 100)) + ';' + i;
                }

                SORT[SORT.length] = sKey;
            } else {
                nGelegenheitsspieler++;
            }
        }
    }
    ;

    SORT.sort();
    stLaenge = SORT.length;

    var iH = 0;
    var hBackground = '';
    cI = [];
    aDET = [];
    for (var j = 0, eoa = SORT.length; j < eoa; j++) {
        var i = parseInt(SORT[j].substring((SORT[j].lastIndexOf(';') + 1)));
        aDET[aDET.length] = i;

        if (STAT.S[i].NR !== '0000') {
            iH++;
            if (iH === 1) {
                cI[1] = i;
            } else if (iH === 2) {
                cI[2] = i;
            } else if (iH === 3) {
                cI[3] = i;
            }
//            getName(i);
            d60Ges = Math.round(STAT.S[i].PUNKTE[stTurCupGes] * 60 / STAT.S[i].SPIELE[stTurCupGes]);
            if (STAT.S[i].PUNKTE[stTurCupGes] >= 0) {
                CupPunkte = Math.round(getCupPunkte(i));
                if (CupPunkte < d60Ges) {
                    nAbzuege++;
                }
            } else {
                CupPunkte = '';
            }

            if (STAT.S[i].NR === LS.ME) {
                stIndME = j;
            }

            if (STAT.S[i].ANZSPIELE[stTurCupGes][0]) {
                hEIG = Math.round(STAT.S[i].ANZGEWONNEN[stTurCupGes][0] / (STAT.S[i].ANZSPIELE[stTurCupGes][0] / 100)) + ' %5';
            } else {
                hEIG = '-5';
            }

            var sNAM = '';
            var sCUP = '';
            var sD60 = '';
            var sGES = '';
            var sANZ = '';
            var sEIG = '';
            var sGEW = '';
            if (stSort === 'NAM') {
                sNAM = ' B';
            } else if (stSort === 'CUP' || stStat === 2) {
                sCUP = ' B';
            } else if (stSort === 'D60') {
                sD60 = ' B';
            } else if (stSort === 'GES') {
                sGES = ' B';
            } else if (stSort === 'ANZ') {
                sANZ = ' B';
            } else if (stSort === 'GEW+' || stSort === 'GEW-') {
                sGEW = ' B';
            } else if (stSort === 'EIG+' || stSort === 'EIG-') {
                sEIG = ' B';
            }

            if (STAT.S[i].NR === LS.ME) {
                hBackground = ' bBeige';
            } else {
                hBackground = '';
                for (var ii = 0; ii < LS.Freunde.length; ii++) {
                    if (STAT.S[i].NR === LS.Freunde[ii]) {
                        hBackground = ' cFreund bBeige2';
                    }
                }
                if (LS.tempVIPs) {
                    if (LS.tempVIPs.indexOf(STAT.S[i].NR) > 0) {
                        hBackground = ' cFreund bBeige2';
                    }
                }
            }
            if (stAktiv) {
                ret += '<tr id=L0P' + j + ' class="L0' + hBackground + '"><td>&nbsp;<span id=Z0P' + j + ' class="' + (STAT.S[i].NR === LS.ME ? '' : 'Z0 P cBlau ') + sNAM + '" onclick="showDetailStat(' + j + ')">' + (getName(i).replace(' ', '&nbsp;')) + '</span></td>';
            } else {
                ret += '<tr id=L0P' + j + ' class="L0' + hBackground + '"><td>&nbsp;<span id=Z0P' + j + ' class="' + (STAT.S[i].NR === LS.ME ? '' : 'Z0') + sNAM + '">' + (getName(i).replace(' ', '&nbsp;')) + '</span></td>';
            }
            if (stStat <= 2) {
                ret += '<td class="TR ' + sCUP + '">' + CupPunkte + '</td><td class="TR ' + sD60 + '" nowrap>' + d60Ges + '</td><td class="TR ' + sGES + '">' + STAT.S[i].PUNKTE[stTurCupGes] + '</td><td class="TR ' + sANZ + '">' + STAT.S[i].SPIELE[stTurCupGes] + '</td></tr>';
            } else if (stStat === 7) {
                if (STAT.S[i].ANZSPIELE[stTurCupGes][0] + STAT.S[i].ANZSPIELE[stTurCupGes][19] !== 0) {
                    if ((STAT.S[i].ANZSPIELE[stTurCupGes][9])) {
                        hProzGew = Math.round(STAT.S[i].ANZGEWONNEN[stTurCupGes][9] / ((STAT.S[i].ANZSPIELE[stTurCupGes][9]) / 100));
                    } else {
                        hProzGew = '-';
                    }
                    ret += '<td class="TR">' + (STAT.S[i].ANZSPIELE[stTurCupGes][0] + STAT.S[i].ANZSPIELE[stTurCupGes][19]) + '&nbsp&nbsp;</td><td class="TR">' + (STAT.S[i].ANZSPIELE[stTurCupGes][9]) + '&nbsp&nbsp;</td><td class="TR B">' + Math.round((STAT.S[i].ANZSPIELE[stTurCupGes][9]) / ((STAT.S[i].ANZSPIELE[stTurCupGes][0] + STAT.S[i].ANZSPIELE[stTurCupGes][19]) / 100)) + '</td><td class="TR">' + STAT.S[i].ANZGEWONNEN[stTurCupGes][9] + '</td><td class="TR">' + hProzGew + '</td></tr>';
                } else {
                    ret += '<td class="TR">' + (STAT.S[i].ANZSPIELE[stTurCupGes][0] + STAT.S[i].ANZSPIELE[stTurCupGes][19]) + '&nbsp&nbsp;</td><td class="TR">' + '&nbsp&nbsp;</td><td class="TR">' + '</td><td class="TR">' + '</td><td class="TR">' + '</td></tr>';
                }
                if (STAT.S[i].SPIELE[stTurCupGes] !== STAT.S[i].ANZSPIELE[stTurCupGes][0] + STAT.S[i].ANZSPIELE[stTurCupGes][19]) {
                    nHaendisch++;
                }
            } else {
                if (STAT.S[i].ANZSPIELE[stTurCupGes][0] + STAT.S[i].ANZSPIELE[stTurCupGes][19] !== 0) {
                    ret += '<td class="TR">' + (STAT.S[i].ANZSPIELE[stTurCupGes][0] + STAT.S[i].ANZSPIELE[stTurCupGes][19]) + '</td><td class="TR">' + (STAT.S[i].ANZGEWONNEN[stTurCupGes][0] + STAT.S[i].ANZGEWONNEN[stTurCupGes][19]) + '</td><td class="TR' + sGEW + '" nowrap>&nbsp;' + Math.round((STAT.S[i].ANZGEWONNEN[stTurCupGes][0] + STAT.S[i].ANZGEWONNEN[stTurCupGes][19]) / ((STAT.S[i].ANZSPIELE[stTurCupGes][0] + STAT.S[i].ANZSPIELE[stTurCupGes][19]) / 100)) + ' %</td><td class="TR">' + STAT.S[i].ANZSPIELE[stTurCupGes][0] + '</td><td class="TR' + sEIG + '" nowrap>&nbsp;' + Math.round(STAT.S[i].ANZSPIELE[stTurCupGes][0] / ((STAT.S[i].ANZSPIELE[stTurCupGes][0] + STAT.S[i].ANZSPIELE[stTurCupGes][19]) / 100)) + ' %</td></tr>';
                } else {
                    ret += '<td class="TR">' + (STAT.S[i].ANZSPIELE[stTurCupGes][0] + STAT.S[i].ANZSPIELE[stTurCupGes][19]) + '</td><td class="TR">' + (STAT.S[i].ANZGEWONNEN[stTurCupGes][0] + STAT.S[i].ANZGEWONNEN[stTurCupGes][19]) + '</td><td class="TR' + sGEW + '">' + '-' + ' %</td><td class="TR">' + STAT.S[i].ANZSPIELE[stTurCupGes][0] + '</td><td class="TR' + sEIG + '">' + '-' + ' %</td></tr>';
                }
                if (STAT.S[i].SPIELE[stTurCupGes] !== STAT.S[i].ANZSPIELE[stTurCupGes][0] + STAT.S[i].ANZSPIELE[stTurCupGes][19]) {
                    nHaendisch++;
                }
            }
        }
    }
    ;
    ret += "</tbody></table>"
            + (nHaendisch ? '<div class=M>&nbsp;H&auml;ndisch mitgeschriebene Spiele sind nicht ber&uuml;cksichtigt.</div>' : '')
            + (nGelegenheitsspieler ? '<div class=M>&nbsp;' + nGelegenheitsspieler + ' Gelegenheitsspieler wurden nicht gelistet.</div>' : '')
            + (nAbzuege && stStat <= 2 && CUPS.VOLLAB[stCup][stTurCupGes]
                    ? "<div class=M>"
                    + "&nbsp;Maximal gespielt: " + STAT.MAXSPIELE[stTurCupGes] + " Spiele.<br>"
                    + "&nbsp;" + CUPS.VOLLAB[stCup][stTurCupGes] + " % davon sind " + (Math.round(STAT.MAXSPIELE[stTurCupGes] * CUPS.VOLLAB[stCup][stTurCupGes]) / 100) + " Spiele.<br>"
                    + "&nbsp;Somit keine Abz&uuml;ge ab " + Math.round((STAT.MAXSPIELE[stTurCupGes] * CUPS.VOLLAB[stCup][stTurCupGes] / 100) + 0.5) + " Spiele.</div></div>"
                    : "</div>"
                    );
    return ret;
}
;