
/* global CUPS, LS, PC */

function getNextTermin(pCup) {

    var hHeute = new Date();
    hHeute.setHours(22); // 22 wegen der Sommenrzeit
    hHeute.setMinutes(59);
    hHeute.setSeconds(59);
    hHeute.setMilliseconds(999);
    hHeute = hHeute.valueOf();

//  1 sekunde     1 000 ms
//  1 Minute     60 000 ms
//  1 Stunde  3 600 000 ms
//  1 Tag    86 400 000 ms
//  1 Woche 604 800 000 ms

    var hZuletzt = new Date(0); // Keine Anmeldung wenn Turnier schon eröffnet
    if (typeof CUPS.MEZULETZT[pCup] === 'number') {
        hZuletzt = new Date(CUPS.MEZULETZT[pCup]);
    }
    hZuletzt.setHours(22); // 22 wegen der Sommenrzeit
    hZuletzt.setMinutes(59);
    hZuletzt.setSeconds(59);
    hZuletzt.setMilliseconds(999);
    hZuletzt = hZuletzt.valueOf();

    if (CUPS.NEXTTERMIN[pCup] >= hHeute
            && CUPS.NEXTTERMIN[pCup] > hZuletzt) {
        return CUPS.NEXTTERMIN[pCup];
    }

    var nextTermin = hHeute;
    var iWoche = 0;
    var iWochentag = 0;

    for (var ii = 1; ii < 999999; ii++) {
        datNextTermin = new Date(nextTermin);
        iWoche = parseInt((datNextTermin.getDate() - 1) / 7);
        iWochentag = datNextTermin.getDay();
        if ((CUPS.WOCHEN[pCup] === '-----' || CUPS.WOCHEN[pCup][iWoche] === 'J')
                && (CUPS.SPIELTAGE[pCup] === '-------' || CUPS.SPIELTAGE[pCup][iWochentag] === 'J')) {
            break;
        }
        nextTermin += 86400000;
    }
    return nextTermin;
}

function getCupName(pI) {
    var hCupName;
    if (QUERFORMAT() || CUPS.TYP[pI] !== 'MT') {
        hCupName = CUPS.NAME[pI];
    } else {
        hCupName = CUPS.NAME[pI].replace('Mannschaftsturniere', 'MT.');
    }
    if (LS.ME === '3425' && QUERFORMAT()) {
        hCupName = hCupName + ' <span class="S N">(' + pI + ')</span>';
    }
    return hCupName;
}