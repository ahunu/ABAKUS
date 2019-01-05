
/* global firebase, CUPS, LS, FB */

function loadCUPS(pTitel, pText, pForce) {

    if (pTitel) {
        showEinenMoment(pTitel, pText, pForce);
    } else {
        showEinenMoment('Cup-&Uuml;bersicht', 'Daten&nbsp;werden&nbsp;geladen.', pForce);
    }

    var cMEANGEMELDET = CUPS.MEANGEMELDET;
    var cMEZULETZT = CUPS.MEZULETZT;
    var SPIELERnr = {};
    var SPIELERalpha = [];

    if (typeof FB !== 'object') {
        firebase.initDB(0);
    }

    firebase.database().ref('/00/CUPS').once('value').then(function (data) {
        var i = 0;
        CUPS = new Object();
        CUPS.ANMELDERF = [];
        CUPS.BEREadmin = [];
        CUPS.BEREschreiben = [];
        CUPS.BERElesen = [];
        CUPS.DISPAB = [];
        CUPS.DOPPELTERUNDEN = [];
        CUPS.NAME = [];
        CUPS.NAME2LEN = [];
        CUPS.NEXTTERMIN = [];
        CUPS.MEANGEMELDET = cMEANGEMELDET;
        CUPS.MEZULETZT = cMEZULETZT;
        CUPS.REGELN = [];
        CUPS.SPIELEAB = [];
        CUPS.SPIELTAGE = [];
        CUPS.WOCHEN = [];
        CUPS.SPJERUNDE = [];
        CUPS.SWNAME = [];
        CUPS.TARIF = [];
        CUPS.TARIF20T = [];
        CUPS.TARIF21T = [];
        CUPS.TEXT1 = [];
        CUPS.TYP = [];
        CUPS.VOLLAB = [];
        CUPS.TURNIER = [];

        CUPS.REGELN[0] = 'Wr.';
        CUPS.DOPPELTERUNDEN[0] = false;

        data.forEach(function (cup) {

            if (cup.key === 'TERMINE') {
                CUPS.TERMINE = cup.val();
            } else if (cup.key === 'SPIELER') { // ab 2018 nicht mehr erforderlich

            } else if (cup.key === 'SPIELERnr') {
                SPIELERnr = cup.val();
            } else if (cup.key === 'TIMESTAMP') {
                CUPS.TIMESTAMP = cup.val();
            } else {
                i = cup.key;
                if (i[0] === '0') {  // Android interpretiert in älteren Versionen
                    i = i.substr(1); // 00n als Oktalzahl
                }                    // 0n als Hexadezimalzahl
                if (i[0] === '0') {  // Aus diesen Grund müssen führende Nullen
                    i = i.substr(1); // entfernd werden.
                }
                i = parseInt(i);
                var cupval = cup.val();
                if (i > 0) {
                    CUPS.ANMELDERF     [i] = cupval.ANMELDERF;
                    CUPS.BEREadmin     [i] = cupval.BEREadmin;
                    CUPS.BEREschreiben [i] = cupval.BEREschreiben;
                    CUPS.BERElesen     [i] = cupval.BERElesen;
                    CUPS.DISPAB        [i] = cupval.DISPAB;
                    if (cupval.DOPPELTERUNDEN) {
                        CUPS.DOPPELTERUNDEN[i] = true;
                    } else {
                        CUPS.DOPPELTERUNDEN[i] = false;
                    }
                    CUPS.NAME          [i] = cupval.NAME;
                    CUPS.NAME2LEN      [i] = cupval.NAME2LEN;
                    if (typeof cupval.NEXTTERMIN === "undefined") {
                        CUPS.NEXTTERMIN[i] = 0;
                    } else {
                        CUPS.NEXTTERMIN[i] = cupval.NEXTTERMIN;
                    }
                    CUPS.REGELN        [i] = cupval.REGELN;
                    CUPS.SPIELEAB      [i] = cupval.SPIELEAB;
                    CUPS.SPIELTAGE     [i] = cupval.SPIELTAGE;
                    if (typeof cupval.WOCHEN === "undefined") {
                        CUPS.WOCHEN    [i] = 'JJJJJ';
                    } else {
                        CUPS.WOCHEN    [i] = cupval.WOCHEN;
                    }
                    CUPS.SPJERUNDE     [i] = cupval.SPJERUNDE;
                    CUPS.SWNAME        [i] = cupval.SWNAME;
                    if (typeof cupval.TARIF === "undefined") {
                        CUPS.TARIF     [i] = [];
                    } else {
                        CUPS.TARIF     [i] = cupval.TARIF;
                    }
                    if (typeof cupval.TARIF20T === "undefined") {
                        CUPS.TARIF20T  [i] = null;
                    } else {
                        CUPS.TARIF20T  [i] = cupval.TARIF20T;
                    }
                    if (typeof cupval.TARIF21T === "undefined") {
                        CUPS.TARIF21T  [i] = null;
                    } else {
                        CUPS.TARIF21T  [i] = cupval.TARIF21T;
                    }
                    CUPS.TEXT1         [i] = '';
                    if (cupval.TEXT3) {
                        CUPS.TEXT1     [i] = '<br>' + cupval.TEXT3;
                    }
                    if (cupval.TEXT2) {
                        CUPS.TEXT1     [i] = '<br>' + cupval.TEXT2 + CUPS.TEXT1[i];
                    }
                    if (cupval.TEXT1) {
                        CUPS.TEXT1     [i] = cupval.TEXT1 + CUPS.TEXT1[i];
                    }
                    CUPS.TYP           [i] = cupval.TYP;
                    CUPS.VOLLAB        [i] = cupval.VOLLAB;
                    if (cupval.TURNIER) {
                        CUPS.TURNIER   [i] = cupval.TURNIER;
                    }
                }
            }
        });
        if (LS.LoadCups) {
            LS.LoadCups = 0;
            localStorage.setItem('Abakus.LS', JSON.stringify(LS));
        }
        localStorage.setItem('Abakus.SPIELERnr', JSON.stringify(SPIELERnr));

        SPIELERalpha = [];
        for (var spieler in SPIELERnr) {
            if (SPIELERnr[spieler][4] !== true) { // Bereits verstorbene Spieler werden in SPIELERalpha nicht aufgenommen.
                SPIELERalpha[SPIELERalpha.length] = [spieler, SPIELERnr[spieler][0], SPIELERnr[spieler][1], SPIELERnr[spieler][2], SPIELERnr[spieler][5]]; // 5=Aktiv
            }
        }
        function Comparator(a, b) {
            if (a[1] < b[1] || a[1] === b[1] && a[2] < b[2])
                return -1;
            if (a[1] > b[1] || a[1] === b[1] && a[2] > b[2])
                return 1;
            return 0;
        }
        SPIELERalpha.sort(Comparator);
        localStorage.setItem('Abakus.SPIELERalpha', JSON.stringify(SPIELERalpha));

        CUPS.DATE = new Date();
        localStorage.setItem('Abakus.CUPS', JSON.stringify(CUPS));
        whenCUPSloaded();
    }, function (error) {
        showEineDBWarnung(error, 'loadCUPS()', 'CUPS once');
        return false;
    });
}