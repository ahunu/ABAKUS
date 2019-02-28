
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


    if (pCup === 44) {
        pCup = 44;
    }

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
    if (hHeute === hZuletzt) {
        if (new Date().getHours() >= 20) { // nach 20 Uhr immer nächsten Termin suchen
            nextTermin += 86400000;
        } else if (CUPS.SPIELEAB[pCup] > 12 && new Date().getHours() > CUPS.SPIELEAB[pCup]) { // ab einer Stunde nach Spielbeginn nächster Termin
            nextTermin += 86400000;
        }
    }

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

function optFont(pI) {
    'use strict';
    if (QUERFORMAT() && PC) {
        if (PC) {
            LS.Font = [17.5, 19.5, 22, 25, 31]; // PC
        } else {
            LS.Font = [13, 14.5, 16, 18, 22]; // Tablet
        }
        if (LS.FontPro && LS.FontPro !== 100) {
            LS.Font[0] = LS.Font[0] / 100 * LS.FontPro;
            LS.Font[1] = LS.Font[1] / 100 * LS.FontPro;
            LS.Font[2] = LS.Font[2] / 100 * LS.FontPro;
            LS.Font[3] = LS.Font[3] / 100 * LS.FontPro;
            LS.Font[4] = LS.Font[4] / 100 * LS.FontPro;
        }
        localStorage.setItem('Abakus.LS', JSON.stringify(LS));
        initSeite1();
        return;
    } else {  // Bei hoher Auflösung Font fix vergeben
        if ($(window).innerWidth() > 1720) {  // 768 x 856 = ASUS ZenPad 3 8.0 Zoll  (relativ breites Format) J. Toppelreiter
            LS.Font = [18, 20.5, 25, 29, 35];
            if (LS.FontPro && LS.FontPro !== 100) {
                LS.Font[0] = LS.Font[0] / 100 * LS.FontPro;
                LS.Font[1] = LS.Font[1] / 100 * LS.FontPro;
                LS.Font[2] = LS.Font[2] / 100 * LS.FontPro;
                LS.Font[3] = LS.Font[3] / 100 * LS.FontPro;
                LS.Font[4] = LS.Font[4] / 100 * LS.FontPro;
            }
            localStorage.setItem('Abakus.LS', JSON.stringify(LS));
            initSeite1();
            return;
        }
    }

    var pWidth = $(window).innerWidth();
    var pHeight = $(window).innerHeight();
    if (QUERFORMAT()) {
        pWidth /= 2.5;
    } else {
        if (pHeight / pWidth < 1.72) {
            pWidth = parseInt((pHeight + (pWidth * 1.72)) / 2 / 1.72);
        }
    }

//    if (pI === 1 && QUERFORMAT() && navigator.userAgent.toUpperCase().indexOf('ANDROID') < 0) {
//        pWidth = $(window).innerWidth() * 0.3;
//    }

    if (pI === 1) {
        $('#pOptFont').show();
        LS.Font = [14.5, 15.5, 18, 22, 28];
        $('#fText1').text('.http://Statistik.pardeapp.com/8888888888.');
    } else if (pI === 2) {
        $('#fText1').text('.Hier kannst du mal was ausprobieren.##');
    } else if (pI === 3) {
        $('#fText1').html('.<b> weiterspielen / neuer Tisch </b>.##');
    } else if (pI === 4) {
        LS.Font[0] = LS.Font[1] - 1;
        $('#fText1').text('.Das Cafe Heine Turnier.');
    }

    LS.Font[pI] = (parseInt(LS.Font[pI] * 2) / 2);
    $('#fText1').css('font-size', LS.Font[pI] + 'px');
    window.scrollTo(0, 0);
    setTimeout(function () {
        if (($('#fText1').width()) < pWidth) {
            optFontPlus(pI, 8, pWidth);
        } else if (($('#fText1').width()) > pWidth) {
            optFontPlus(pI, -8, pWidth);
        } else if (pI < 4) {
            optFont(++pI);
        } else {
            if (LS.FontPro && LS.FontPro !== 100) {
                LS.Font[0] = LS.Font[0] / 100 * LS.FontPro;
                LS.Font[1] = LS.Font[1] / 100 * LS.FontPro;
                LS.Font[2] = LS.Font[2] / 100 * LS.FontPro;
                LS.Font[3] = LS.Font[3] / 100 * LS.FontPro;
                LS.Font[4] = LS.Font[4] / 100 * LS.FontPro;
            }
            localStorage.setItem('Abakus.LS', JSON.stringify(LS));
            $('#pOptFont').hide();
            initSeite1();
        }
    });
}

function optFontPlus(pI, pPlus, pWidth) {
    'use strict';
    LS.Font[pI] += pPlus;
    $('#fText1').css('font-size', LS.Font[pI] + 'px');
    setTimeout(function () {
        window.scrollTo(0, 0);
        if ((pPlus > 0 && ($('#fText1').width() < pWidth) && LS.Font[pI] < 111)
                || (pPlus < 0 && ($('#fText1').width() > pWidth) && LS.Font[pI] > 5)) {
            optFontPlus(pI, pPlus, pWidth);
        } else {
            if (pPlus > 0.5 || pPlus < -0.5) {
                optFontPlus(pI, pPlus * -0.5, pWidth);
            } else if (pI < 4) {
                optFont(++pI);
            } else {
                if (LS.FontPro && LS.FontPro !== 100) {
                    LS.Font[0] = LS.Font[0] / 100 * LS.FontPro;
                    LS.Font[1] = LS.Font[1] / 100 * LS.FontPro;
                    LS.Font[2] = LS.Font[2] / 100 * LS.FontPro;
                    LS.Font[3] = LS.Font[3] / 100 * LS.FontPro;
                    LS.Font[4] = LS.Font[4] / 100 * LS.FontPro;
                }
                localStorage.setItem('Abakus.LS', JSON.stringify(LS));
                $('#pOptFont').hide();
                initSeite1();
            }
        }
    });
}