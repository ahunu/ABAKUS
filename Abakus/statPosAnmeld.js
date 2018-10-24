
/* global STAT, LS, stSort, QUERFORMAT() */

function statPosAnmeld() {
    'use strict';
    var sKey, CupPunkte, hCupPunkte, hEIG, GesPunkte;
    var lastPUNKTE = -1234, aktRANG = 0;
    var tRANG = '';
    var pos = '';
    var hPos = '';
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

    setTimeout(function() {
        $('.nbButton').removeClass('ui-btn-active');
        if (QUERFORMAT()) {
            Activate('#aAnmeldung');
        }
    }, 200);

    var ret = "<div id='SP1Rumpf' class=M>"
        + getStatMeldungen(true)
        + (STAT.TEILNEHMER ? ''
                           : '<span class=S>&nbsp;&nbsp;Du hast noch nie in dieser Runde gespielt.'
                           + '<br>&nbsp;&nbsp;Falls du mitspielen willst, bitte einen Spieler'
                           + '<br>&nbsp;&nbsp;dein Kommen per Nachricht anzuk&uuml;ndigen.</span>'
          )
        + "<table id=mTable data-role='table' data-mode='columntoggle' class='table-stripe ui-shadow ui-responsive' data-column-btn-text=''><thead>"
        +   "<tr id='L0P1' class='bGrau M'>"
        +     "<th class=TR>#&nbsp;</th>"
        +     "<th class=TC>am</th>"
        +     "<th class=TC>um</th>"
        +     "<th>&nbsp;angemeldet</th>"
        + "</tr></thead><tbody>";

    var hClass = '';
    var hUM;
    var iAnmeldung = 0;
    var iii = -1;

    var SORT = [];
    for (var anmeldung in STAT.ANMELDUNGEN) {
        if (new Date().valueOf() <= STAT.ANMELDUNGEN[anmeldung].FUER) {
            iii++;
            SORT[iii] = STAT.ANMELDUNGEN[anmeldung];
            SORT[iii].NR = anmeldung;
        }
    }

    SORT.sort(function(a, b){
            return new Date(a.UM).getTime() > new Date(b.UM).getTime();
    });

    for (var anmeldung in SORT) {
        iAnmeldung++;
        hUM = new Date(SORT[anmeldung].UM);
        hClass = '';
        if (SORT[anmeldung].NR === LS.ME) {
            hClass = 'bBeige';
        }
        ret += '<tr class="'+hClass+'">'
            +  '<td class="TR">' + (iAnmeldung) + '&nbsp;</td>'
            +  '<td class="TC">' + hUM.getDate()+'.'+(hUM.getMonth()+1) + '.</td>'
            +  '<td class="TC">' + hUM.getHours()+':'+('0'+hUM.getMinutes()).slice(-2)+ '&nbsp;</td>'
            +  '<th>' + SORT[anmeldung].NAME + '</th>'
            +  '</tr>'


            +  (SORT.length < 8 && iAnmeldung === 6 && new Date(hUM).toLocaleDateString() === new Date(STAT.NEXTTERMIN).toLocaleDateString()
            ?  '<tr hidden></tr>'
            +  '<tr class="'+hClass+'">'
            +  '<td></td>'
            +  '<td colspan="3" class=cNachricht>Nur wenn sich mindesten 8 Spieler anmelden.</td>'
            +  '</tr>'
            :  '')


            +  (SORT.length === 7 && iAnmeldung === 7 && new Date(hUM).toLocaleDateString() === new Date(STAT.NEXTTERMIN).toLocaleDateString()
            ?  '<tr hidden></tr>'
            +  '<tr class="'+hClass+'">'
            +  '<td></td>'
            +  '<td colspan="3" class=cNachricht>Nur wenn sich noch ein 8. anmeldet.</td>'
            +  '</tr>'
            :  '')


            +  (SORT.length === 11 && iAnmeldung === 11 && new Date(hUM).toLocaleDateString() === new Date(STAT.NEXTTERMIN).toLocaleDateString()
            ?  '<tr hidden></tr>'
            +  '<tr class="'+hClass+'">'
            +  '<td></td>'
            +  '<td colspan="3" class=cNachricht>Nur wenn sich noch ein 12. anmeldet.</td>'
            +  '</tr>'
            :  '')


            +  (SORT[anmeldung].NACHRICHT
            ?  '<tr hidden></tr>'
            +  '<tr class="'+hClass+'">'
            +  '<td></td>'
            +  '<td colspan="3" class=cNachricht>'+SORT[anmeldung].NACHRICHT+'</td>'
            +  '</tr>'
            :  '');
    }
    ret += "</tbody></table>";
    return ret+"</div>";
};