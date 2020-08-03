
/* global STAT, LS, stSort, QUERFORMAT() */

function statPosAnmeld() {
    'use strict';
    if (stCup === -1) {
        stCup = STAT.I;
    }
    setTimeout(function () {
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
                    + '<br>&nbsp;&nbsp;dein Kommen per Nachricht anzukündigen.</span>'
                    )
            + "<table id=mTable data-role='table' data-mode='columntoggle' class='table-stripe ui-shadow ui-responsive" + (stSynchron ? "" : " ui-disabled") + "' data-column-btn-text=''><thead>"
            + "<tr id='L0P1' class='bGrau M'>"
            + "<th class=TR>#&nbsp;</th>"
            + "<th class=TC>am</th>"
            + "<th class=TC>um</th>"
            + "<th>&nbsp;angemeldet</th>"
            + "</tr></thead><tbody>";
    var hClass = '';
    var hUM;
    var iii = -1;
    var SORT = [];
    for (var anmeldung in STAT.ANMELDUNGEN) {
        if (new Date().valueOf() <= STAT.ANMELDUNGEN[anmeldung].FUER) {
            iii++;
            SORT[iii] = STAT.ANMELDUNGEN[anmeldung];
            SORT[iii].NR = anmeldung;
        }
    }

    SORT.sort(function (a, b) {
        return new Date(a.UM).valueOf() - new Date(b.UM).valueOf();
    });

    var iAnmeldung = 0;
    for (var anmeldung in SORT) {
        if (SORT[anmeldung].ANGEMELDET && (SORT[anmeldung].ANGEMELDET === true || SORT[anmeldung].ANGEMELDET === 'J')) {
            iAnmeldung++;
        }
        hUM = new Date(SORT[anmeldung].UM);
        hClass = '';
        if (SORT[anmeldung].NR === LS.ME) {
            hClass = 'bBeige';
        }

        if (SORT[anmeldung].ANGEMELDET) {
            if (SORT[anmeldung].ANGEMELDET === true || SORT[anmeldung].ANGEMELDET === 'J') {
                ret += '<tr class="' + hClass + '">'
                        + '<td class="TR">' + (iAnmeldung) + '&nbsp;</td>'
                        + '<td class="TC">' + hUM.getDate() + '.' + (hUM.getMonth() + 1) + '.</td>'
                        + '<td class="TC">' + hUM.getHours() + ':' + ('0' + hUM.getMinutes()).slice(-2) + '&nbsp;</td>'
                        + '<th>' + SORT[anmeldung].NAME.replace(' ', '&nbsp;') + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>'
                        + '</tr>';
            } else if (LS.ME === '3425') {
                ret += '<tr class="' + hClass + '"><td></td><td colspan="3"><b>' + SORT[anmeldung].NR + '</b> ' + SORT[anmeldung].ANGEMELDET + '</td></tr>';
            }
        }

        if (SORT[anmeldung].NACHRICHT) {
            if (!SORT[anmeldung].ANGEMELDET || (SORT[anmeldung].ANGEMELDET !== true && SORT[anmeldung].ANGEMELDET !== 'J')) {
                ret += '<tr class="' + hClass + '"><td></td><td colspan="3">' + SORT[anmeldung].NAME.replace(' ', '&nbsp;') + '&nbsp;schreibt:</td></tr>';
            }
            ret += (SORT[anmeldung].NACHRICHT
                    ? '<tr hidden></tr>'
                    + '<tr class="' + hClass + '">'
                    + '<td></td>'
                    + '<td colspan="3" class=cNachricht>' + SORT[anmeldung].NACHRICHT + '</td>'
                    + '</tr>'
                    : '');
        }
    }

    ret += "</tbody></table>";
    return ret + "</div>";
}