/* global STAT, stSort */

function statPosDivPCtur(pRunde) {
    'use strict';
    var sKey, CupPunkte, hCupPunkte, hEIG, GesPunkte;
    var lastPUNKTE = -1234, aktRANG = 0;
    var tRANG = '';
    var pos = '';
    var hPos = '';
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
    if (stSort === 'TZU') {
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

    var ret = "<div id='SP1Rumpf' class=M>";
    +getStatMeldungen()
            + "<table id=mTable data-role='table' data-mode='columntoggle' class='ui-body-d ui-shadow table-stripe ui-responsive' data-column-btn-text=''><thead>"
            + "<tr  id='L0P1' class='bGrau M'><th>&nbsp;Name</th><th class=TR>&nbsp;R1</th><th class=TR>&nbsp;R2</th><th class=TR>&nbsp;R3</th><th>&nbsp;&nbsp;&nbsp;</th>";
    +"</tr></thead><tbody>";

    SORT = [];
    for (var iTU = 0; iTU < STAT.TURDATEN.NR.length; iTU++) {
        SORT[SORT.length] = STAT.TURDATEN.NNAME[iTU] + ' ' + STAT.TURDATEN.VNAME[iTU] + ';' + iTU;
    }

    SORT.sort();  // muss sein

    stLaenge = SORT.length;
    var iH = 0;
    var hBackground = '';
    cI = [];
    aDET = [];
    for (var j = 0, eoa = SORT.length; j < eoa; j++) {
        var iTU = parseInt(SORT[j].substring((SORT[j].lastIndexOf(';') + 1)));
        ret += '<tr><td>&nbsp;<span class="B">' + STAT.TURDATEN.NNAME[iTU] + '&nbsp;</span>&nbsp;' + STAT.TURDATEN.VNAME[iTU] + '</td><td class="TR">' + STAT.TURDATEN.TISCH_R1[iTU] + '</td><td class="TR">' + STAT.TURDATEN.TISCH_R2[iTU] + '</td><td class="TR">' + STAT.TURDATEN.TISCH_R3[iTU] + '</td><td></td></tr>';
    }
    ret += "</tbody></table>";

    return ret + "</div>";
}
;