
/* global stSort, STAT, stGelegenheitsspieler, CUPS, stTurCupGes, QUERFORMAT(), getName, PC, LS, stStat, stAktSpalten, D60Punkte, stAktiv */

function statPosCup(pRunde) {
    'use strict';
    var sKey, CupPunkte, hCupPunkte, D60Punkte, GesPunkte;
    var lastPUNKTE = -1234, aktRANG = 0;
    var tRANG = '';
    var pos = '';
    var hPos = '';
    var nGelegenheitsspieler = 0;
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
    } else if (stSort === 'CUP') {
        sCUP = ' B';
    } else if (stSort === 'D60') {
        sD60 = ' B';
    } else if (stSort === 'GES') {
        sGES = ' B';
    } else if (stSort === 'ANZ') {
        sANZ = ' B';
    } else if (stSort[0] === 'T') {
        sGES = ' B';
    } else if (stSort === 'STO') {
        sSTO = ' B';
    }

    var ret = "<div id='SP1Rumpf' class=M>"
            + getStatMeldungen()
            + "<table id=mTable data-role='table' data-mode='columntoggle' class='ui-body-d ui-shadow table-stripe ui-responsive' data-column-btn-text=''><thead>"
            + "<tr id='L0P1' class='bGrau M'>"
            + (stSort !== 'NAM' && stSort !== 'STO'
                    ? "<th class=TR>&nbsp;#&nbsp;</th>"
                    : ""
                    )
            + "<th>&nbsp;Name</th>";
    if (QUERFORMAT()) {
        ret += "<th>&nbsp;Ort</th>";
    }

    if (stTurCupGes === 3) {
        ret += "<th class='TR QUER' hidden>Cup</th>";
        ret += "<th class=TR>Ges</th>";
        ret += "<th class=TR>R1</th><th class=TR>R2</th><th class=TR>R3&nbsp;</th>";
        if (stSort === 'STO') {
            if (CUPS.BEREadmin[stCup].indexOf(LS.ME) >= 0) {
                ret += "<th class=TR>&euro;&nbsp;</th>";
            } else {
                ret += "<th class=TR nowrap>1. 2. 3.&nbsp;</th>";
            }
        }
    } else {
        ret += "<th class=TR>" + (QUERFORMAT() ? "Gesamt" : "Ges&nbsp;") + "</th>";
        if (stStat !== 2) {
            ret += "<th class=TR></th><th colspan=5>Cuppunkte</th>";
        } else if (QUERFORMAT()) {
            ret += "<th class='TR QUER' hidden></th><th class='QUER' hidden colspan=5>Cuppunkte</th>";
        }
        if (stAktSpalten <= 2) {
            if (stStat === 2) {
                ret += "<th class=TC nowrap>1. 2. 3.</th>"
                        + "<th class=TR>Tur&nbsp;</th>";
            } else if (QUERFORMAT()) {
                ret += "<th class='TC QUER' hidden nowrap>1. 2. 3.</th>"
                        + "<th class='TR QUER' hidden >Tur&nbsp;</th>";
            }
        }
    }

    ret += "</tr></thead><tbody>";

    SORT = [];
    for (var i = 0, eoa = STAT.S.length; i < eoa; i++) {
        if (STAT.S[i].SPIELE[stTurCupGes] > 0) {
            if (STAT.S[i].SPIELE[stTurCupGes] >= (STAT.MAXSPIELE[stTurCupGes] * CUPS.DISPAB[stCup][stTurCupGes] / 100)
                    || stGelegenheitsspieler
                    || STAT.S[i].NR === '0000') {
                if (STAT.S[i].NR === '0000'
                        || stSort.indexOf('TIS') !== 0
                        || STAT.TURRUNDE === 2 && STAT.S[i].SCHREIBER[0]
                        || STAT.TURRUNDE === 3 && STAT.S[i].SCHREIBER[1]) {  // nur wenn TIS oder in der letzten Runde mitgespielt
                    if (STAT.S[i].NR === '0000') {
                        sKey = '00000000000;' + i;
                    } else if (stSort === 'NAM') {
                        sKey = getName(i, 99) + ';' + i;
                    } else if (stSort.indexOf('TIS') === 0) {
                        sKey = STAT.S[i].SCHREIBER[0] + ',' + STAT.S[i].NNAME + ' ' + STAT.S[i].VNAME + ';' + i;
                    } else if (stSort === 'D60') {
                        sKey = (STAT.S[i].PUNKTE[stTurCupGes] * 60 / STAT.S[i].SPIELE[stTurCupGes] + ',' + getName(i, 99) + ';' + i).replace(/Ä/g, 'Ae').replace(/Ü/g, 'Ue').replace(/Ö/g, 'Oe').replace(/ä/g, 'ae').replace(/ü/g, 'ue').replace(/ö/g, 'oe');
                    } else if (stSort === 'GES') {
                        if (stTurCupGes === 3) {
                            sKey = (50000000000 - parseInt(STAT.S[i].PUNKTE[stTurCupGes] * 100)) + ',' + getName(i, 99) + ';' + i;
                        } else {
                            CupPunkte = 900000;
                            for (var ii = 0; ii < STAT.S[i].CUPPUNKTE[stTurCupGes].length; ii++) {
                                if (STAT.S[i].CUPPUNKTE[stTurCupGes][ii] >= 0 && ii < 6) {
                                    hCupPunkte = STAT.S[i].CUPPUNKTE[stTurCupGes][ii];
                                    if (hCupPunkte > 0) {
                                        if (hCupPunkte >= 300) {
                                            hCupPunkte = 200;
                                        } else if (hCupPunkte > 100) {
                                            hCupPunkte = 100 + parseInt((hCupPunkte - 100) / 2);
                                        }
                                        CupPunkte -= hCupPunkte;  // - wegen der Sortierung
                                    }
                                }
                            }
                            sKey = CupPunkte + ',' + getName(i, 99) + ';' + i;
                        }
                    } else if (stSort === 'STO') {
                        if (stTurCupGes === 3) {
                            sKey = (50000000000 - STAT.S[i].PUNKTE[3]) + ',' + getName(i, 99) + ';' + i;
                        } else {
                            if (STAT.S[i].STOCKERL[stTurCupGes] === '-') {
                                continue;
                            }
                            CupPunkte = 900000;
                            for (var ii = 0; ii < STAT.S[i].CUPPUNKTE[stTurCupGes].length; ii++) {
                                if (STAT.S[i].CUPPUNKTE[stTurCupGes][ii] >= 0 && ii < 6) {
                                    hCupPunkte = STAT.S[i].CUPPUNKTE[stTurCupGes][ii];
                                    if (hCupPunkte > 0) {
                                        if (hCupPunkte >= 300) {
                                            hCupPunkte = 200;
                                        } else if (hCupPunkte > 100) {
                                            hCupPunkte = 100 + parseInt((hCupPunkte - 100) / 2);
                                        }
                                        CupPunkte -= hCupPunkte;  // - wegen der Sortierung
                                    }
                                }
                            }
                            sKey = getSkeyStockerl(STAT.S[i].STOCKERL[stTurCupGes]) + ',' + CupPunkte + ',' + getName(i, 99) + ';' + i;
                        }
                    } else {
                        sKey = (50000000000 - parseInt(STAT.S[i].PUNKTE[stTurCupGes] * 100)) + ',' + getName(i, 99) + ';' + i;
                    }
                    SORT[SORT.length] = sKey;
                }
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
            if (STAT.S[i].PUNKTE[stTurCupGes] >= 0 || stTurCupGes === 3) {
                CupPunkte = Math.round(getCupPunkte(i));
            } else {
                CupPunkte = '-';
            }
            D60Punkte = CupPunkte;   // SOS D60Punkte bitte korrekt befüllen
            if (stTurCupGes === 3) {
                GesPunkte = STAT.S[i].PUNKTE[stTurCupGes];
                CupPunkte = GesPunkte;
                if (CupPunkte > 0) {
                    if (CupPunkte >= 300) {
                        CupPunkte = 200;
                    } else if (CupPunkte > 100) {
                        CupPunkte = 100 + parseInt((CupPunkte - 100) / 2);
                    }
                } else {
                    CupPunkte = '-';
                }
            }

            if ((QUERFORMAT() || stTurCupGes === 3 || true) && stSort !== 'NAM') {
                if (stSort === 'CUP' || stSort === 'STO' || stSort === 'D60' || stSort === 'GES') {
                    aktRANG++;
                    if ((stSort === 'CUP' && CupPunkte !== '-' && CupPunkte >= 0)
                            || (stSort === 'STO')
                            || (stSort === 'D60' && D60Punkte >= 0)
                            || (stSort === 'GES')) {
                        if ((stSort === 'CUP' && CupPunkte !== lastPUNKTE)
                                || (stSort === 'STO' && GesPunkte !== lastPUNKTE)
                                || (stSort === 'D60' && D60Punkte !== lastPUNKTE)
                                || (stSort === 'GES' && STAT.S[i].PUNKTE[stTurCupGes] !== lastPUNKTE)) {
                            if (stSort === 'CUP') {
                                lastPUNKTE = CupPunkte;
                            } else if (stSort === 'STO') {
                                lastPUNKTE = GesPunkte;
                            } else if (stSort === 'D60') {
                                lastPUNKTE = D60Punkte;
                            } else if (stSort === 'GES') {
                                lastPUNKTE = STAT.S[i].PUNKTE[stTurCupGes];
                            }
                            tRANG = aktRANG + '.';
                        }
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
                    pos = '<tr><td class=TR>&nbsp;<span class="B">' + hTisch + '.&nbsp;</span></td><td><span class="B">&nbsp;Tisch</span></td><td></td><td></td><td></td><td></td><td class=QUER hidden></td></tr>';
                }
            }
            if (STAT.S[i].NR === LS.ME) {
                hBackground = ' bBeige';
            } else {
                hBackground = '';
                for (var ii = 0; ii < LS.Freunde.length; ii++) {
                    if (STAT.S[i].NR === LS.Freunde[ii]) {
                        hBackground = ' bBeige2';
                    }
                }
                if (LS.tempVIPs) {
                    if (LS.tempVIPs.indexOf(STAT.S[i].NR) > 0) {
                        hBackground = ' bBeige';
                    }
                }
            }
            if (stTurCupGes <= 3 && stAktiv) {
                pos += '<tr id=L0P' + j + ' class="L0' + hBackground + '">' + (stSort !== 'NAM' && stSort !== 'STO' ? '<td class=TR nowrap>' + tRANG + '</td>' : '') + '<td>&nbsp;<span id=Z0P' + j + ' class="' + (STAT.S[i].NR === LS.ME ? '' : 'Z0 P cBlau ') + sNAM + '" onclick="showDetailStat(' + j + ')">' + (getName(i).replace(' ', '&nbsp;')) + '</span></td>';
            } else { // Archiv
                pos += '<tr id=L0P' + j + ' class="L0' + hBackground + '">' + (stSort !== 'NAM' && stSort !== 'STO' ? '<td class=TR nowrap>' + tRANG + '</td>' : '') + '<td>&nbsp;<span id=Z0P' + j + ' class="' + (STAT.S[i].NR === LS.ME ? '' : 'Z0 ') + sNAM + '">' + (getName(i).replace(' ', '&nbsp;')) + '</span></td>';
            }

            if (QUERFORMAT()) {
                if (STAT.S[i].ORT.indexOf(',') > 0) {
                    pos += "<td nowrap>" + STAT.S[i].ORT.substr(0, STAT.S[i].ORT.indexOf(',')) + "</td>";
                } else {
                    pos += "<td nowrap>" + STAT.S[i].ORT + "</td>";
                }
            }

            if (stTurCupGes === 3) {
                pos += '<td class="TR QUER ' + sCUP + '" hidden>' + CupPunkte + '</td>';
                pos += '<td class="TR ' + sGES + '" nowrap>' + GesPunkte + '</td>';
                if (typeof STAT.S[i].PUNKTERx === 'object') {
                    pos += '<td class="TR" nowrap>&nbsp;' + (typeof STAT.S[i].PUNKTERx[0] === 'number' ? STAT.S[i].PUNKTERx[0] : '---') + '</td><td class="TR" nowrap>&nbsp;' + (typeof STAT.S[i].PUNKTERx[1] === 'number' ? STAT.S[i].PUNKTERx[1] : (STAT.TURRUNDE === 1 ? '' : '---')) + '</td><td class="TR" nowrap>&nbsp;' + (typeof STAT.S[i].PUNKTERx[2] === 'number' ? STAT.S[i].PUNKTERx[2] : (STAT.TURRUNDE === 1 || STAT.TURRUNDE === 2 ? '' : '---')) + '&nbsp;</td>';
                } else {
                    pos += '<td class="TR">?</td><td class="TR">?</td><td class="TR">?&nbsp;</td>';
                }
                if (stSort === 'STO') {
                    if (CUPS.BEREadmin[stCup].indexOf(LS.ME) >= 0) {
                        if (tRANG === '1.' || tRANG === '2.' || tRANG === '3.') {
                            pos += '<td class="TR B"> ' + ((parseInt((SORT.length - 1) / 2)) * (4 - j) * (stCup === 8 ? 1 : 2)) + '&nbsp;</td>';
                        }
                    } else if (tRANG === '1.') {
                        pos += '<td class="TR B"> 1-0-0&nbsp;</td>';
                    } else if (tRANG === '2.') {
                        pos += '<td class="TR B"> 0-1-0&nbsp;</td>';
                    } else if (tRANG === '3.') {
                        pos += '<td class="TR B"> 0-0-1&nbsp;</td>';
                    }
                    if (tRANG === '1.' || tRANG === '2.' || tRANG === '3.') {
                        ret += pos + '</tr>';
                    }
                } else {
                    ret += pos + '</tr>';
                }
            } else {
                CupPunkte = 0;
                hPos = '';
                for (var ii = 0; ii < 6; ii++) {
                    if (typeof STAT.S[i].CUPPUNKTE[stTurCupGes][ii] === 'number') {
                        if (STAT.S[i].CUPPUNKTE[stTurCupGes][ii] > 0) {
                            hCupPunkte = STAT.S[i].CUPPUNKTE[stTurCupGes][ii];
                            if (hCupPunkte >= 300) {
                                hCupPunkte = 200;
                            } else if (hCupPunkte > 100) {
                                hCupPunkte = 100 + parseInt((hCupPunkte - 100) / 2);
                            }
                            hPos += '<td class="TR">' + hCupPunkte + '&nbsp;</td>';
                            CupPunkte += hCupPunkte;
                        } else {
                            hPos += '<td class="TR">-&nbsp;</td>';
                        }
                    } else {
                        hPos += '<td>&nbsp;&nbsp;&nbsp;&nbsp;</td>';
                    }
                }

                pos += '<td class="TR ' + sGES + '">' + CupPunkte + '&nbsp&nbsp;</td>';
                if (QUERFORMAT() || stStat !== 2) {
                    pos += hPos;
                }
                if (stAktSpalten <= 2) {
                    if (stStat === 2) {
                        pos += '<td class="TC ' + sSTO + '">' + STAT.S[i].STOCKERL[stTurCupGes] + '</td>';
                        pos += '<td class="TR">' + STAT.S[i].CUPPUNKTE[stTurCupGes].length + '&nbsp;</td>';
                    } else if (QUERFORMAT()) {
                        pos += '<td class="TC QUER ' + sSTO + '" hidden>' + STAT.S[i].STOCKERL[stTurCupGes] + '</td>';
                        pos += '<td class="TR QUER" hidden>' + STAT.S[i].CUPPUNKTE[stTurCupGes].length + '&nbsp;</td>';
                    }
                }
                ret += pos + '</tr>';
            }
        }
    }
    ret += "</tbody></table>";
    if (stTurCupGes === 3 && stSort === 'STO' && tRANG !== '1.' && tRANG !== '2.' && tRANG !== '3.') { // Stockerlliste des Turniers
    } else {
        ret = ret + (nGelegenheitsspieler ? '<div class=M>&nbsp;' + nGelegenheitsspieler + ' Gelegenheitsspieler wurden nicht gelistet.</div>' : '');
    }
    return ret + "</div>";
}