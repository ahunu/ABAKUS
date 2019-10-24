/* global stSort, STAT, getName, CUPS, stTurCupGes, QUERFORMAT(), LS, stGelegenheitsspieler, stStat, stVollAb */

function statPosCupD60(pRunde) {
    'use strict';
    var sKey, CupPunkte, d60TP;
    var lastPUNKTE = -1234, aktRANG = 0;
    var tRANG = '';
    var pos = '';
    var nGelegenheitsspieler = 0;
    var nAbzuege = 0;
    var hTisch = 0;

    if (stCup === -1) {
        stCup = STAT.I;
    }

    var sNAM = '';
    var sCUP = '';
    var sD60 = '';
    var sGES = '';
    var sANZ = '';
    var sSTO = '';
    if (stSort === 'NAM') {
        sNAM = ' B';
    } else if (stSort === 'CUP' || -1) {
        if (stCup !== 11) {
            sCUP = ' B';
        } else {
            sGES = ' B';
        }
    } else if (stSort === 'D60') {
        sD60 = ' B';
    } else if (stSort === 'GES') {
        sGES = ' B';
    } else if (stSort === 'ANZ') {
        sANZ = ' B';
    } else if (stSort === 'STO') {
        if (stTurCupGes !== 3) {
            sSTO = 'B';
        } else {
            sCUP = 'B';
        }
    }

    var cSTO = '';
    if (stSort === 'STO') {
        cSTO = "'";
    } else {
        cSTO = " QUER' hidden";
    }

    var cNoSTO = '';
    if (stSort !== 'STO') {
        cNoSTO = "'";
    } else {
        cNoSTO = " QUER' hidden";
    }

    var ret = "<div id='SP1Rumpf' xclass=M>"
            + getStatMeldungen()
            + "<table id=mTable data-role='table' data-mode='columntoggle' class='ui-body-d ui-shadow table-stripe ui-responsive' data-column-btn-text=''><thead>"
            + "<tr id='L0P1' class='bGrau M'>"
            + (stSort !== 'NAM' && stSort !== 'STO'
                    ? "<td colspan=2>&nbsp;" + (CUPS.TURNIER[stCup] === 'Handy' || stTurCupGes !== 3 ? "Voll ab " + stVollAb + "%" : "") + "</td>"
                    : "<td>&nbsp;" + (CUPS.TURNIER[stCup] === 'Handy' || stTurCupGes !== 3 ? "Voll ab " + stVollAb + "%" : "") + "</td>"
                    )
            + ((stCup !== 11)
                    ? "<th class=TR>D60</th>"
                    : ""
                    )
            + "<th colspan=2 class=TC>&nbsp;&nbsp;Punkte</th>"
            + (((stTurCupGes !== 3 || CUPS.TURNIER[stCup] === 'Handy') && (QUERFORMAT() || stSort !== 'STO')) ? "<th class='TR" + cNoSTO + ">Anz.</th>" : "")
            + ((stTurCupGes !== 3 && CUPS.TURNIER[stCup] && (QUERFORMAT() || stSort === 'STO')) ? "<th class='TC" + cSTO + ">Stockerl</th>" : "")
            + ((CUPS.BEREadmin[stCup].indexOf(LS.ME) >= 0 && stSort === 'STO' && stTurCupGes === 3) ? "<th class=TR>&euro;</th>" : "")
            + "</tr>"
            + "<tr class='bGrau M'>"
            + (stSort !== 'NAM' && stSort !== 'STO'
                    ? "<th class=TR>&nbsp;#&nbsp;</th>"
                    : ""
                    )
            + "<th>&nbsp;Name</th>"
            + ((stCup !== 11)
                    ? "<th class=TR>gew</th>"
                    : ""
                    )
            + "<th class=TR>&nbsp;&nbsp;D60</th>"
            + "<th class=TR>&nbsp;&nbsp;Ges</th>"
            + (((stTurCupGes !== 3 || CUPS.TURNIER[stCup] === 'Handy') && (QUERFORMAT() || stSort !== 'STO')) ? "<th class='TR" + cNoSTO + ">Spiel</th>" : "")
            + ((stTurCupGes !== 3 && CUPS.TURNIER[stCup] && (QUERFORMAT() || stSort === 'STO')) ? "<th class='TC" + cSTO + ">pl&auml;tze</th>" : "")
            + ((CUPS.BEREadmin[stCup].indexOf(LS.ME) >= 0 && stSort === 'STO' && stTurCupGes === 3) ? "<th></th>" : "")
            + "</tr>"
            + "</thead><tbody>";

    SORT = [];
    for (var i = 0, eoa = STAT.S.length; i < eoa; i++) {

        if (STAT.S[i].NR === '1887') {
            console.log(STAT.S[i].NR + ' ' + getName(i, 99) + '; Spiele: ' + STAT.S[i].SPIELE[stTurCupGes] + '; Spiele: ' + new Date(STAT.S[i].TIMESTAMP));
        } else if (STAT.S[i].NR === '3244') {
            console.log(STAT.S[i].NR + ' ' + getName(i, 99) + '; Spiele: ' + STAT.S[i].SPIELE[stTurCupGes] + '; Spiele: ' + new Date(STAT.S[i].TIMESTAMP));
        } else if (STAT.S[i].NR === '4242') {
            console.log(STAT.S[i].NR + ' ' + getName(i, 99) + '; Spiele: ' + STAT.S[i].SPIELE[stTurCupGes] + '; Spiele: ' + new Date(STAT.S[i].TIMESTAMP));
        } else if (STAT.S[i].NR === '4082') {
            console.log(STAT.S[i].NR + ' ' + getName(i, 99) + '; Spiele: ' + STAT.S[i].SPIELE[stTurCupGes] + '; Spiele: ' + new Date(STAT.S[i].TIMESTAMP));
        } else if (STAT.S[i].NR === '4249') {
            console.log(STAT.S[i].NR + ' ' + getName(i, 99) + '; Spiele: ' + STAT.S[i].SPIELE[stTurCupGes] + '; Spiele: ' + new Date(STAT.S[i].TIMESTAMP));
        }

        if (STAT.S[i].SPIELE[stTurCupGes] > 0) {
            if (STAT.S[i].SPIELE[stTurCupGes] >= (STAT.MAXSPIELE[stTurCupGes] * CUPS.DISPAB[stCup][stTurCupGes] / 100)
                    || stGelegenheitsspieler
                    || STAT.S[i].NR === '0000') {
                if (stSort === 'CUP' || (stStat === -1 && stCup !== 11)) {
                    sKey = Math.round(getCupPunkte(i));
                } else if (stSort === 'D60') {
                    sKey = STAT.S[i].PUNKTE[stTurCupGes] * 60 / STAT.S[i].SPIELE[stTurCupGes];
                } else if (stSort === 'GES') {
                    sKey = STAT.S[i].PUNKTE[stTurCupGes];
                } else if (stSort === 'ANZ') {
                    sKey = STAT.S[i].SPIELE[stTurCupGes];
                } else if (stSort === 'STO') {
                    if (STAT.S[i].STOCKERL[stTurCupGes] <= '-' && stTurCupGes !== 3) {
                        continue;
                    }
                    if (stTurCupGes !== 3 && STAT.S[i].STOCKERL[stTurCupGes]) {
                        sKey = getCupPunkte(i);
                        sKey = sKey + getSkeyStockerl(STAT.S[i].STOCKERL[stTurCupGes]);
                    } else {
                        sKey = getCupPunkte(i);
                    }
                }

                if (STAT.S[i].NR === '0000') {
                    sKey = '00000000000;' + i;
                } else if (stSort === 'NAM') {
                    sKey = getName(i, 99) + ';' + i;
                } else if (stSort.indexOf('TIS') === 0) {
                    sKey = STAT.S[i].SCHREIBER[0] + ',' + STAT.S[i].NNAME + ' ' + STAT.S[i].VNAME + ';' + i;
                } else {
                    sKey = (50000000000 - parseInt(sKey * 100)) + ',' + getName(i, 99) + ';' + i;
                }

                if (stSort.indexOf('TIS') === 0) {
                    if (STAT.S[i].SCHREIBER.length + pRunde <= parseInt(STAT.TURRUNDE)) {
                        continue;
                    }
                }

                SORT[SORT.length] = sKey;
            } else {
                nGelegenheitsspieler++;
            }
        }
    }

    SORT.sort();  // muss sein

    if (stSort.indexOf('TIS') === 0) {
        if (pRunde < CUPS.RUNDEN[stCup]) {
            sortNachTischen(false);
        } else {
            sortNachReihung(false);
        }
    }

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
            d60TP = Math.round(STAT.S[i].PUNKTE[stTurCupGes] * 60 / STAT.S[i].SPIELE[stTurCupGes]);
            if (STAT.S[i].PUNKTE[stTurCupGes] >= 0 || stTurCupGes === 3) {
                CupPunkte = Math.round(getCupPunkte(i));
                if (CupPunkte < d60TP) {
                    nAbzuege++;
                }
            } else {
                CupPunkte = '';
            }
            if (stSort !== 'NAM') {
                if (stSort === 'CUP' || stSort === 'STO' || stSort === 'D60' || stSort === 'GES') {
                    aktRANG++;
                    if (((stSort === 'CUP' || (stStat === -1 && stCup !== 11)) && CupPunkte !== "" && CupPunkte !== lastPUNKTE)
                            || ((stSort === 'CUP' || (stStat === -1 && stCup !== 11)) && CupPunkte === "" && d60TP !== lastPUNKTE)
                            || (stSort === 'STO' && CupPunkte !== lastPUNKTE)
                            || (stSort === 'D60' && d60TP !== lastPUNKTE)
                            || (stSort === 'GES' && STAT.S[i].PUNKTE[stTurCupGes] !== lastPUNKTE)) {
                        if (stSort === 'CUP' || (stStat === -1 && stCup !== 11)) {
                            if (CupPunkte !== "") {
                                lastPUNKTE = CupPunkte;
                            } else {
                                lastPUNKTE = d60TP;
                            }
                        } else if (stSort === 'STO') {
                            lastPUNKTE = CupPunkte;
                        } else if (stSort === 'D60') {
                            lastPUNKTE = d60TP;
                        } else if (stSort === 'GES') {
                            lastPUNKTE = STAT.S[i].PUNKTE[stTurCupGes];
                        }
                        ;
                        tRANG = aktRANG + '.';
                    }
                }
            }

            if (STAT.S[i].NR === LS.ME) {
                stIndME = j;
            }

            pos = '';
            if (stSort.indexOf('TIS') === 0) {
                if (hTisch !== parseInt(SORT[j])) {
                    hTisch = parseInt(SORT[j]);
                    pos = '<tr class=tr><td>&nbsp;<span class="B">' + hTisch + '. Tisch</span></td><td></td><td></td><td></td><td></td><td></td></tr>';
                }
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
            if (stTurCupGes <= 3 && stAktiv) {
                pos = pos + '<tr id=L0P' + j + ' class="L0' + hBackground + '">' + (stSort !== 'NAM' && stSort !== 'STO' ? '<td class=TR>' + tRANG + '</td>' : '') + '<td>&nbsp;<span id=Z0P' + j + ' class="' + (STAT.S[i].NR === LS.ME ? '' : 'Z0 P cBlau ') + sNAM + '" onclick="showDetailStat(' + j + ')">' + (getName(i).replace(' ', '&nbsp;')) + '</span></td>'
                        + (stCup !== 11 ? '<td class="TR ' + sCUP + '">' + (STAT.S[i].PUNKTE[stTurCupGes] >= 0 ? CupPunkte : '') + '</td>' : '') + '<td class="TR ' + sD60 + '" nowrap>' + d60TP + '</td><td class="TR ' + sGES + '" nowrap>' + STAT.S[i].PUNKTE[stTurCupGes] + '</td>';
            } else { // Archiv
                pos = pos + '<tr id=L0P' + j + ' class="L0' + hBackground + '">' + (stSort !== 'NAM' && stSort !== 'STO' ? '<td class=TR>' + tRANG + '</td>' : '') + '<td>&nbsp;<span id=Z0P' + j + ' class="' + (STAT.S[i].NR === LS.ME ? '' : 'Z0 ') + sNAM + '">' + (getName(i).replace(' ', '&nbsp;')) + '</span></td>'
                        + (stCup !== 11 ? '<td class="TR ' + sCUP + '">' + (STAT.S[i].PUNKTE[stTurCupGes] >= 0 ? CupPunkte : '') + '</td>' : '') + '<td class="TR ' + sD60 + '" nowrap>' + d60TP + '</td><td class="TR ' + sGES + '" nowrap>' + STAT.S[i].PUNKTE[stTurCupGes] + '</td>';
            }
            if (stTurCupGes !== 3 || CUPS.TURNIER[stCup] === 'Handy') {
                if (stSort !== 'STO') {
                    pos = pos + '<td class="TR ' + sANZ + '">&nbsp;' + STAT.S[i].SPIELE[stTurCupGes] + '</td>';
                } else if (QUERFORMAT()) {
                    pos = pos + '<td class="TR QUER ' + sANZ + '" hidden>&nbsp;' + STAT.S[i].SPIELE[stTurCupGes] + '</td>';
                }
            }
            if (CUPS.TURNIER[stCup] && stTurCupGes !== 3) {
                if (stSort === 'STO') {
                    pos = pos + '<td class="TC ' + sSTO + '">' + STAT.S[i].STOCKERL[stTurCupGes] + '</td>';
                } else if (QUERFORMAT()) {
                    pos = pos + '<td class="TC QUER ' + sSTO + '" hidden>' + STAT.S[i].STOCKERL[stTurCupGes] + '</td>';
                }
            }

            if (stTurCupGes === 3 && stSort === 'STO') { // Stockerlliste des Turniers
                if (tRANG === '1.' || tRANG === '2.' || tRANG === '3.') {
                    if (CUPS.BEREadmin[stCup].indexOf(LS.ME) >= 0) {
                        ret = ret + pos + '<td class="TR"> ' + ((parseInt((SORT.length - 1) / 2)) * (4 - j)) + '</td></tr>';
                    } else {
                        ret = ret + pos + '<td class="TR"> ' + tRANG + '</td></tr>';
                    }
                }
            } else {
                ret = ret + pos + '</tr>';
            }
        }
    }

    ret = ret + "</tbody></table>";
    if (stTurCupGes === 3 && stSort === 'STO' && tRANG !== '1.' && tRANG !== '2.' && tRANG !== '3.') { // Stockerlliste des Turniers
    } else {
        ret = ret + (nGelegenheitsspieler ? '<div class=M>&nbsp;' + nGelegenheitsspieler + ' Gelegenheitsspieler wurden nicht gelistet.</div>' : '');
    }
    if (stStat !== 11) {
        ret = ret + (nAbzuege && ((stTurCupGes !== 3 || CUPS.TURNIER[stCup] === 'Handy') || stVollAb === 0)
                ? "<div class=M>"
                + "&nbsp;Maximal gespielt: " + STAT.MAXSPIELE[stTurCupGes] + " Spiele.<br>"
                + "&nbsp;" + stVollAb + " % davon sind " + (Math.round(STAT.MAXSPIELE[stTurCupGes] * stVollAb) / 100) + " Spiele.<br>"
                + "&nbsp;Somit keine Abz&uuml;ge ab " + Math.round((STAT.MAXSPIELE[stTurCupGes] * stVollAb / 100) + 0.5) + " Spiele.</div></div>"
                : "</div>"
                );
    }
    return ret;
}