
/* global firebase, CUPS, LS, FB */

function loadCUPS(pTitel, pText, pForce) {

    if (pTitel) {
        showEinenMoment(pTitel, pText, pForce);
    } else {
        showEinenMoment('Cup-Übersicht', 'Daten&nbsp;werden&nbsp;geladen.', pForce);
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
        CUPS.DISPAB = [];
        CUPS.DOPPELTERUNDEN = [];
        CUPS.MEANGEMELDET = cMEANGEMELDET;
        CUPS.MELDAKT = [];
        CUPS.MELDSTAT = [];
        CUPS.MEZULETZT = cMEZULETZT;
        CUPS.NAME = [];
        CUPS.NAME2LEN = [];
        CUPS.NEXTTERMIN = [];
        CUPS.REGELN = [];
        CUPS.RUNDEN = [];
        CUPS.SPIELEAB = [];
        CUPS.SPIELTAGE = [];
        CUPS.SPJERUNDE = [];
        CUPS.SWNAME = [];
        CUPS.TARIF = [];
        CUPS.TARIF20T = [];
        CUPS.TARIF21T = [];
        CUPS.TEXT1 = [];
        CUPS.TURNIER = [];
        CUPS.TYP = [];
        CUPS.VOLLAB = [];
        CUPS.WOCHEN = [];

        CUPS.REGELN[0] = 'Wr.';
        CUPS.DOPPELTERUNDEN[0] = false;

        AKTUELLES = [];

        data.forEach(function (cup) {

            if (cup.key === 'ABVERSION') {
                CUPS.ABVERSION = cup.val();
            } else if (cup.key === 'TERMINE') {
                CUPS.TERMINE = cup.val();
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
                    CUPS.DISPAB        [i] = cupval.DISPAB;
                    if (cupval.DOPPELTERUNDEN) {
                        CUPS.DOPPELTERUNDEN[i] = true;
                    } else {
                        CUPS.DOPPELTERUNDEN[i] = false;
                    }
                    if (cupval.AKTUELLES) {
                        CUPS.MELDAKT   [i] = cupval.AKTUELLES[0];
                        AKTUELLES      [i] = cupval.AKTUELLES[1];
                    }
                    if (cupval.MELDSTAT) {
                        CUPS.MELDSTAT  [i] = cupval.MELDSTAT;
                    }
                    CUPS.NAME          [i] = cupval.NAME;
                    CUPS.NAME2LEN      [i] = cupval.NAME2LEN;
                    if (typeof cupval.NEXTTERMIN === "undefined") {
                        CUPS.NEXTTERMIN[i] = 0;
                    } else {
                        CUPS.NEXTTERMIN[i] = cupval.NEXTTERMIN;
                    }
                    CUPS.REGELN        [i] = cupval.REGELN;
                    if (typeof cupval.RUNDEN === "undefined") {
                        CUPS.RUNDEN    [i] = null;
                    } else {
                        CUPS.RUNDEN    [i] = cupval.RUNDEN;
                    }
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


        try {
            localStorage.setItem('Abakus.AKTUELLES', JSON.stringify(AKTUELLES));
        } catch (err) {
            showEinenFehler('Speicherplatzproblem!', 'Inítialisieren oder<br>Verlauf löschen oder<br>neu starten und', 'Vorgang wiederholen.');
            return;
        }
        try {
            localStorage.setItem('Abakus.SPIELERnr', JSON.stringify(SPIELERnr));
        } catch (err) {
            showEinenFehler('Speicherplatzproblem!', 'Inítialisieren oder<br>Verlauf löschen oder<br>neu starten und', 'Vorgang wiederholen.');
            return;
        }

        function isVIP(pSchalter) {
            return ((pSchalter & 8) !== 0);
        }
        function isVERSTORBEN(pSchalter) {
            return ((pSchalter & 2) !== 0);
        }

        var hVIP = false;
        SPIELERalpha = [];
        for (var spieler in SPIELERnr) {
            if (spieler === LS.ME) {
                hVIP = isVIP(SPIELERnr[spieler][4]);
            }
            if (!isVERSTORBEN(SPIELERnr[spieler][4])) { // Bereits verstorbene Spieler werden in SPIELERalpha nicht aufgenommen.
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
        try {
            localStorage.setItem('Abakus.SPIELERalpha', JSON.stringify(SPIELERalpha));
        } catch (err) {
            showEinenFehler('Speicherplatzproblem!', 'Inítialisieren oder<br>Verlauf löschen oder<br>neu starten und', 'Vorgang wiederholen.');
            return;
        }

        var mSchreiber = false;
        for (var iCup in CUPS.BEREadmin) {
            if (CUPS.BEREadmin[iCup].indexOf(LS.ME) >= 0) {
                mSchreiber = true;
                break;
            }
        }
        if (!mSchreiber) {
            for (var iCup in CUPS.BEREschreiben) {
                if (CUPS.BEREschreiben[iCup].indexOf(LS.ME) >= 0) {
                    mSchreiber = true;
                    break;
                }
            }
        }

        if (LS.VIP !== hVIP
                || LS.LoadCups
                || LS.Schreiber !== mSchreiber) {
            LS.VIP = hVIP;
            LS.LoadCups = 0;
            if (mSchreiber) {
                LS.Schreiber = true;
            } else {
                delete LS.Schreiber;
            }
            try {
                localStorage.setItem('Abakus.LS', JSON.stringify(LS));
            } catch (err) {
                showEinenFehler('Speicherplatzproblem!', 'Inítialisieren oder<br>Verlauf löschen oder<br>neu starten und', 'Vorgang wiederholen.');
                return;
            }

        }

        CUPS.DATE = new Date();

        try {
            localStorage.setItem('Abakus.CUPS', JSON.stringify(CUPS));
        } catch (err) {
            showEinenFehler('Speicherplatzproblem!', 'Inítialisieren oder<br>Verlauf löschen oder<br>neu starten und', 'Vorgang wiederholen.');
            return;
        }


        whenCUPSloaded();
    }, function (error) {
        showEineDBWarnung(error, 'loadCUPS()', 'CUPS once');
        return false;
    });
}