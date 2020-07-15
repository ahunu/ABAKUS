
/* global LS, CUPS, stCup, stStat, firebase, FB */

function akku0000rec(pI, I, iSTAT) {
    if (STAT.S[iSTAT].SPIELE[pI]) {
        STAT.S[0].SPIELE[pI] += STAT.S[iSTAT].SPIELE[pI];
        STAT.S[0].PUNKTE[pI] += STAT.S[iSTAT].PUNKTE[pI];
        if (CUPS.TURNIER[I] === 'Handy') {
            for (var ii = 0; ii <= 19; ii++) {
                STAT.S[0].ANZSPIELE[pI][ii] += STAT.S[iSTAT].ANZSPIELE[pI][ii];
                STAT.S[0].ANZGEWONNEN[pI][ii] += STAT.S[iSTAT].ANZGEWONNEN[pI][ii];
                STAT.S[0].PKTGEWONNEN[pI][ii] += STAT.S[iSTAT].PKTGEWONNEN[pI][ii];
            }
        }
    }
}

function loadSTAT(I, pTitel, pSkip, pCallback) {
    'use strict';
    console.log('loadSTAT(' + I + ', ' + pTitel + ', ' + pSkip + ', ' + (pCallback ? true : false) + ').');
    if (pTitel) {
        if (pSkip && !CUPS.TURNIER[I]) {
            STAT = JSON.parse(localStorage.getItem("Abakus.STAT" + ("000" + pSkip).substr(-3)));
            if (navigator.onLine) {
                if (STAT === null && (I >= 8 || CUPS.TURNIER[I])) {
                    showEinenMoment(I, pTitel);
                } else {
                    showEinenMoment(I, pTitel, false, pSkip);
                }
            } else {
                showEinenFehler('Keine Datenverbindung:', 'Verbindung herstellen.');
            }
        } else {
            if (navigator.onLine) {
                showEinenMoment(I, pTitel);
            } else {
                showEinenFehler('Keine Datenverbindung:', 'Verbindung herstellen.');
            }
        }
    }
    if (typeof stCup === 'number') { // nur in Statistik möglich
        if (I === 0) {
            I = stCup;
        }
    }
    if (typeof FB !== 'object') {
        firebase.initDB(I);
    }
    if (CUPS.TURNIER[I] && CUPS.TURNIER[I] !== 'Handy') {
        loadSTATnew(I, pCallback, pSkip);
    } else {
        loadSTATold(I, pCallback);
    }
}

//  STAT  Funktionen  **************************************************************************
function loadSTATnew(I, pCallback) {

    if (typeof stCup === 'number') { // nur in Statistik möglich
        if (I === 0) {
            I = stCup;
        }
    }
    firebase.database().ref('/00/' + ("000" + I).slice(-3)).once('value').then(function (data) {

        stSynchron = true;

        if (data.val()) {

            STAT = data.val();

            for (var turnier in STAT) { // Turnier aufbereiten
                if (turnier[0] === '2') {
                    for (var spieler in STAT[turnier]) {
                        if (spieler[0] !== '_') {
                            if (CUPS.TYP[I] === 'MT') {
                                STAT[turnier][spieler][5] = STAT[turnier][spieler][3]; // Mannschaft shiften
                            }
                            STAT[turnier][spieler][3] = STAT[turnier][spieler][2]; // Punkte je Runde auf 1, 2, 3 shiften
                            STAT[turnier][spieler][2] = STAT[turnier][spieler][1];
                            STAT[turnier][spieler][1] = STAT[turnier][spieler][0];
                            STAT[turnier][spieler][0] = 0;

                            STAT[turnier][spieler][4] = 0; // Gesamtpunkte errechnen
                            if (STAT[turnier][spieler][1] !== '-') {
                                STAT[turnier][spieler][4] += STAT[turnier][spieler][1];
                            }
                            if (STAT[turnier][spieler][2] !== '-') {
                                STAT[turnier][spieler][4] += STAT[turnier][spieler][2];
                            }
                            if (STAT[turnier][spieler][3] !== '-') {
                                STAT[turnier][spieler][4] += STAT[turnier][spieler][3];
                            }
                        }
                    }
                }
            }

            compSTAT();

        } else {
            STAT = {
                _ANZSAISONEN: 0,
                _ANZTURNIERE: 0,
                _ANZTEILNAHMEN: 0,
                _LASTTURNIER: null
            };
        }

        if (STAT._LASTTURNIER) {
            if (STAT[STAT._LASTTURNIER.substr(0, 10)]) {
                if (STAT[STAT._LASTTURNIER.substr(0, 10)]._AKTTURNIER) {
                    STAT._AKTTURNIER = STAT[STAT._LASTTURNIER.substr(0, 10)]._AKTTURNIER;
                    delete STAT[STAT._LASTTURNIER.substr(0, 10)]._AKTTURNIER;
                }
            }
        }

        try {
            localStorage.setItem("Abakus.STAT" + ("000" + I).substr(-3), JSON.stringify(STAT));
        } catch (err) {
            showEinenFehler('Speicherplatzproblem:', 'Inítialisieren und', 'Vorgang wiederholen.');
            return;
        }

        var hMEZULETZT = false;
        for (var turnier in STAT) {
            if (turnier[0] === '2') {
                if (STAT[turnier][LS.ME]) {
                    hMEZULETZT = new Date(turnier).valueOf();
                }
            }
        }

        if (hMEZULETZT) {
            if (CUPS.MEZULETZT[I] !== hMEZULETZT) {
                CUPS.MEZULETZT[I] = hMEZULETZT;
                try {
                    localStorage.setItem("Abakus.CUPS", JSON.stringify(CUPS));
                } catch (err) {
                    showEinenFehler('Speicherplatzproblem:', 'Inítialisieren und', 'Vorgang wiederholen.');
                    return;
                }
            }
        }

        if (typeof pCallback === "function") {
            pCallback();
        } else {
            whenSTATloaded();
        }

    }, function (error) {
        stSynchron = false;
        showEineDBWarnung(error, 'loadSTAT()', 'STAT once');
        return false;
    });
}

//  STAT  Funktionen  **************************************************************************
function loadSTATold(I, pCallback) {
    'use strict';
    var hMEZULETZT = 0;
    var hMEANGEMELDET = 0;
    var hZuletztGespielt = 0;

    firebase.database().ref('/00/' + ("000" + I).slice(-3)).once('value').then(function (data) {

        if (typeof stCup === 'number') { // Aufruf aus Statistik
            stSynchron = true;
        }

        STAT = new Object();
        STAT.S = [];
        STAT.MAXSPIELE = [0, 0, 0, 0];
        STAT.NEXTTERMIN = 0;
        if (CUPS.TURNIER[I]) {
            STAT.TURCODE = 0;
            STAT.TURRUNDE = 0;
            STAT.TURSPIELER = 0;
            STAT.TURGESPIELT = 0;
        }

        var iSTAT = 0;

        if (data.val() === null) {
            STAT.ZULETZT = new Date();
            STAT.ZULETZTupd = new Date().toISOString();
        } else {
            STAT.S[0] = new Object;
            STAT.S[0].NR = "0000";
            STAT.S[0].VNAME = "(VNAME)";
            STAT.S[0].NNAME = "(NNAME)";
            STAT.S[0].STERNE = "(STERNE)";
            STAT.S[0].ORT = "(ORT)";
            STAT.S[0].SPIELE = [0, 0, 0, 0];
            STAT.S[0].PUNKTE = [0, 0, 0, 0];
            if (CUPS.TURNIER[I] === 'Handy') {
                STAT.S[0].ANZSPIELE = [[], [], [], []];
                STAT.S[0].ANZGEWONNEN = [[], [], [], []];
                STAT.S[0].PKTGEWONNEN = [[], [], [], []];
                for (var ii = 0; ii <= 3; ii++) {
                    for (var iii = 0; iii <= 19; iii++) {
                        STAT.S[0].ANZSPIELE[ii][iii] = 0;
                        STAT.S[0].ANZGEWONNEN[ii][iii] = 0;
                        STAT.S[0].PKTGEWONNEN[ii][iii] = 0;
                    }
                }
            }
            if (CUPS.TURNIER[I]) {
                STAT.S[0].STOCKERL = ['', '', '', ''];
            }
            data.forEach(function (dataItem) {
                if (dataItem.key === 'ZULETZT') {
                    STAT.ZULETZT = new Date(new Date(dataItem.val()).getTime() + 60000 * new Date(dataItem.val()).getTimezoneOffset());
                } else if (dataItem.key === 'ZULETZTupd') {
                    STAT.ZULETZTupd = dataItem.val();
                } else if (dataItem.key === 'ANMELDUNGEN') {
                    STAT.ANMELDUNGEN = dataItem.val();
                } else if (dataItem.key === 'ANMELDname') {
                } else if (dataItem.key === 'ANMELDfuer') {
                } else if (dataItem.key === 'ANMELDtext') {
                } else if (dataItem.key === 'ANMELDum') {
                } else if (dataItem.key === 'NEXTTERMIN') {
                    if (dataItem.val() > Date.now()) {
                        STAT.NEXTTERMIN = dataItem.val();
                    }
                } else if (dataItem.key === 'TURCODE') {
                    STAT.TURCODE = dataItem.val();
                } else if (dataItem.key === 'TURADMIN') {
                    STAT.TURADMIN = dataItem.val();
                } else if (dataItem.key === 'TURRUNDE') {
                    STAT.TURRUNDE = dataItem.val();
                } else if (dataItem.key === 'TURTIMESTAMP') {
                    STAT.TURTIMESTAMP = new Date(dataItem.val());
                } else if (dataItem.key === 'TURDATEN') {
                    STAT.TURDATEN = dataItem.val();
                } else if (dataItem.key === 'TURSPIELER') {
                    // wird temporär erstellt
                } else if (dataItem.key === 'TURGESPIELT') {
                    // wird temporär erstellt
                } else if (dataItem.key === 'MAXSPIELE') {
                    // wird temporär erstellt
                }
            });

            if (typeof STAT.ZULETZTupd === 'undefined') {
                STAT.ZULETZTupd = new Date().toISOString();
            }

            data.forEach(function (dataItem) {
                if (dataItem.key === 'ZULETZT') {
                } else if (dataItem.key === 'ZULETZTupd') {
                } else if (dataItem.key === 'ANMELDUNGEN') {
                } else if (dataItem.key === 'ANMELDname') {
                } else if (dataItem.key === 'ANMELDfuer') {
                } else if (dataItem.key === 'ANMELDtext') {
                } else if (dataItem.key === 'ANMELDum') {
                } else if (dataItem.key === 'NEXTTERMIN') {
                } else if (dataItem.key === 'TURCODE') {
                } else if (dataItem.key === 'TURADMIN') {
                } else if (dataItem.key === 'TURRUNDE') {
                } else if (dataItem.key === 'TURTIMESTAMP') {
                } else if (dataItem.key === 'TURDATEN') {
                } else if (dataItem.key === 'TURSPIELER') {
                } else if (dataItem.key === 'TURGESPIELT') {
//                } else if (dataItem.key === 'MAXSPIELE') {
                } else if (dataItem.key === 'S') { // falls unsauber kopiert
                    STAT.S = dataItem.val();
                } else {
                    iSTAT = STAT.S.length;
                    STAT.S[iSTAT] = dataItem.val();
                    if (typeof STAT.S[iSTAT].NR === 'undefined') {
                        showEinenFehler(I, 'Datenbankfehler:', 'dataItem.key ' + dataItem.key + ' unbekannt.');
                        return;
                    }

                    // ?????????????????????????????????????
                    STAT.S[iSTAT].TIMESTAMP = new Date(new Date(STAT.S[iSTAT].TIMESTAMP).getTime() + 60000 * new Date(STAT.S[iSTAT].TIMESTAMP).getTimezoneOffset());
                    // ?????????????????????????????????????

                    if (hZuletztGespielt < new Date(STAT.S[iSTAT].TIMESTAMP).valueOf()) {
                        hZuletztGespielt = new Date(STAT.S[iSTAT].TIMESTAMP).valueOf();
                    }
                    if (STAT.S[iSTAT].NR === LS.ME) {
                        STAT.TEILNEHMER = true;
                        hMEZULETZT = new Date(STAT.S[iSTAT].TIMESTAMP).valueOf();
                    }

                    if (typeof STAT.S[iSTAT].STERNE === 'undefined') {
                        STAT.S[iSTAT].STERNE = '';
                    }

                    if (CUPS.TURNIER[I]) {
                        if (typeof STAT.S[iSTAT].PUNKTERx === 'undefined') {
                            STAT.S[iSTAT].PUNKTERx = [];
                        }
                        if (typeof STAT.S[iSTAT].SCHREIBER === 'undefined') {
                            STAT.S[iSTAT].SCHREIBER = [];
                        }
                        if (typeof STAT.S[iSTAT].CUPPUNKTE === 'undefined') {
                            STAT.S[iSTAT].CUPPUNKTE = [, [], []];
                        }
                        if (typeof STAT.S[iSTAT].STOCKERL === 'undefined') {
                            STAT.S[iSTAT].STOCKERL = ['-', '-', '-', '-'];
                        }
                        for (var iii = 0; iii < STAT.S[iSTAT].SPIELE.length; iii++) {
                            if (STAT.S[iSTAT].SPIELE[iii] && !STAT.S[iSTAT].STOCKERL[iii]) {
                                STAT.S[iSTAT].STOCKERL[iii] = '-';
                            }
                        }

                        if (STAT.S[iSTAT].CUPPUNKTE) {
                            if (!STAT.S[iSTAT].CUPPUNKTE[1]) {
                                STAT.S[iSTAT].CUPPUNKTE[1] = [];
                            }
                            if (!STAT.S[iSTAT].CUPPUNKTE[2]) {
                                STAT.S[iSTAT].CUPPUNKTE[2] = [];
                            }
                        } else {
                            STAT.S[iSTAT].CUPPUNKTE = [, [], []];
                        }
                        if (STAT.S[iSTAT].PUNKTERx.length > 0) {
                            STAT.TURSPIELER++;
                            if (STAT.TURRUNDE) {
                                if (STAT.TURRUNDE === 1 && STAT.S[iSTAT].SCHREIBER[0]
                                        || STAT.TURRUNDE === 2 && STAT.S[iSTAT].SCHREIBER[1]
                                        || STAT.TURRUNDE === 3 && STAT.S[iSTAT].SCHREIBER[2]) {
                                    STAT.TURGESPIELT++;
                                }
                            }
                        }
                    }

                    if (new Date(STAT.S[iSTAT].TIMESTAMP).getFullYear() !== (new Date().getFullYear())) {
                        if (new Date(STAT.S[iSTAT].TIMESTAMP).getFullYear() === (new Date().getFullYear() - 1)) {
                            // 0 = Gesamt, 1 = laufendes Jahr, 2 = Vorjahr, 3 = Turnier
                            STAT.S[iSTAT].PUNKTE[2] = STAT.S[iSTAT].PUNKTE[1];
                            STAT.S[iSTAT].SPIELE[2] = STAT.S[iSTAT].SPIELE[1];
                            if (CUPS.TURNIER[I]) {
                                if (CUPS.TURNIER[I] === 'Handy') {
                                    STAT.S[iSTAT].ANZSPIELE[2] = STAT.S[iSTAT].ANZSPIELE[1];
                                    STAT.S[iSTAT].ANZGEWONNEN[2] = STAT.S[iSTAT].ANZGEWONNEN[1];
                                    STAT.S[iSTAT].PKTGEWONNEN[2] = STAT.S[iSTAT].PKTGEWONNEN[1];
                                }
                                STAT.S[iSTAT].STOCKERL[2] = STAT.S[iSTAT].STOCKERL[1];
                                STAT.S[iSTAT].CUPPUNKTE[2] = STAT.S[iSTAT].CUPPUNKTE[1];
                            }
                        } else {
                            // 0 = Gesamt, 1 = laufendes Jahr, 2 = Vorjahr, 3 = Turnier
                            STAT.S[iSTAT].PUNKTE[2] = 0;
                            STAT.S[iSTAT].SPIELE[2] = 0;
                            if (CUPS.TURNIER[I]) {
                                if (CUPS.TURNIER[I] === 'Handy') {
                                    STAT.S[iSTAT].ANZSPIELE[2] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                                    STAT.S[iSTAT].ANZGEWONNEN[2] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                                    STAT.S[iSTAT].PKTGEWONNEN[2] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                                }
                                STAT.S[iSTAT].STOCKERL[2] = '';
                                STAT.S[iSTAT].CUPPUNKTE[2] = [];
                            }
                        }
                        STAT.S[iSTAT].PUNKTE[1] = 0;
                        STAT.S[iSTAT].SPIELE[1] = 0;
                        if (CUPS.TURNIER[I]) {
                            if (CUPS.TURNIER[I] === 'Handy') {
                                STAT.S[iSTAT].ANZSPIELE[1] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                                STAT.S[iSTAT].ANZGEWONNEN[1] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                                STAT.S[iSTAT].PKTGEWONNEN[1] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                            }
                            STAT.S[iSTAT].STOCKERL[1] = '';
                            STAT.S[iSTAT].CUPPUNKTE[1] = [];
                        }
                    }

                    if (new Date(STAT.S[iSTAT].TIMESTAMP).getFullYear() !== new Date(STAT.ZULETZT).getFullYear()
                            || new Date(STAT.S[iSTAT].TIMESTAMP).getMonth() !== new Date(STAT.ZULETZT).getMonth()
                            || new Date(STAT.S[iSTAT].TIMESTAMP).getDate() !== new Date(STAT.ZULETZT).getDate()) {
                        STAT.S[iSTAT].PUNKTE[3] = 0;
                        STAT.S[iSTAT].SPIELE[3] = 0;
                        if (CUPS.TURNIER[I]) {
                            if (CUPS.TURNIER[I] === 'Handy') {
                                STAT.S[iSTAT].ANZSPIELE[3] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                                STAT.S[iSTAT].ANZGEWONNEN[3] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                                STAT.S[iSTAT].PKTGEWONNEN[3] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                            }
                            STAT.S[iSTAT].STOCKERL[3] = '';
                            STAT.S[iSTAT].CUPPUNKTE[3] = [];
                        }
                    }

                    if (CUPS.TURNIER[I]) {
                        if (STAT.S[iSTAT].PUNKTERx.length === 0) {
                            STAT.S[iSTAT].PUNKTE   [3] = 0;
                            STAT.S[iSTAT].SPIELE   [3] = 0;
                            STAT.S[iSTAT].STOCKERL [3] = '-';
                            if (CUPS.TURNIER[I] === 'Handy') {
                                STAT.S[iSTAT].ANZSPIELE   [3] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                                STAT.S[iSTAT].ANZGEWONNEN [3] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                                STAT.S[iSTAT].PKTGEWONNEN [3] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                            }
                        }
                    }

                    for (var i = 0; i <= 3; i++) {
                        akku0000rec(i, I, iSTAT);
                    }

//                  for (var iii = 0; iii < STAT.S[iSTAT].SPIELE.length; iii++) {
                    for (var iii = 0; iii < 4; iii++) {
                        if (STAT.S[iSTAT].SPIELE[iii]) {
                            if (!STAT.MAXSPIELE[iii] || STAT.MAXSPIELE[iii] < STAT.S[iSTAT].SPIELE[iii] || !STAT.MAXSPIELE[iii]) {
                                STAT.MAXSPIELE[iii] = STAT.S[iSTAT].SPIELE[iii];
                            }
                        }
                    }
                }
            });
        }

        if (CUPS.ANMELDERF[I]) {
            if (typeof STAT.ANMELDUNGEN === 'undefined') {
                STAT.ANMELDUNGEN = {};
            } else {
                for (var anmeldung in STAT.ANMELDUNGEN) {
                    console.log(STAT.ANMELDUNGEN[anmeldung].UM, STAT.ANMELDUNGEN[anmeldung].NAME, STAT.ANMELDUNGEN[anmeldung].ANGEMELDET);
                    if (STAT.ANMELDUNGEN[anmeldung].FUER < Date.now()
                            || new Date(STAT.ANMELDUNGEN[anmeldung].FUER).toDateString() === new Date(hZuletztGespielt).toDateString()) {
                        delete STAT.ANMELDUNGEN[anmeldung];
                    }
                }
            }
        }

        var hGeaendert = false;
        if (CUPS.NEXTTERMIN[I] !== STAT.NEXTTERMIN) {
            CUPS.NEXTTERMIN[I] = STAT.NEXTTERMIN;
            hGeaendert = true;
        }

        if (LS.ME !== "NOBODY") {
            if (CUPS.ANMELDERF[I]) {
                if (STAT.ANMELDUNGEN[LS.ME]) {
                    if (new Date().valueOf() < STAT.ANMELDUNGEN[LS.ME].FUER) {
                        hMEANGEMELDET = STAT.ANMELDUNGEN[LS.ME].FUER.valueOf();
                    }
                }
            }
            if (CUPS.MEANGEMELDET[I] !== hMEANGEMELDET) {
                CUPS.MEANGEMELDET[I] = hMEANGEMELDET;
                hGeaendert = true;
            }
            if (CUPS.MEZULETZT[I] !== hMEZULETZT) {
                CUPS.MEZULETZT[I] = hMEZULETZT;
                hGeaendert = true;
            }
        }

        if (hGeaendert) {
            try {
                localStorage.setItem('Abakus.CUPS', JSON.stringify(CUPS));
            } catch (err) {
                showEinenFehler('Speicherplatzproblem:', 'Inítialisieren und', 'Vorgang wiederholen.');
                return;
            }
        }

        try {
            localStorage.setItem("Abakus.STAT" + ("000" + I).substr(-3), JSON.stringify(STAT));
        } catch (err) {
            showEinenFehler('Speicherplatzproblem:', 'Inítialisieren und', 'Vorgang wiederholen.');
            return;
        }

        if (CUPS.TURNIER[I]) {
            if (LS.I === I) {
                if (STAT.TURRUNDE === 0) {
                    LS.I = 0;
                    LS.TURCODE = 0;
                    LS.TURADMIN = '';
                    LS.TURRUNDE = 0;
                    LS.TURSPIELER = 0;
                    LS.TURGESPIELT = 0;
                    delete LS.TURTIMESTAMP;
                } else {
                    LS.TURADMIN = STAT.TURADMIN;
                    LS.TURTIMESTAMP = STAT.TURTIMESTAMP;
                    LS.TURRUNDE = STAT.TURRUNDE;
                    LS.TURSPIELER = STAT.TURSPIELER;
                    LS.TURGESPIELT = STAT.TURGESPIELT;
                    if (LS.TURRUNDE === 3 && STAT.TURSPIELER === STAT.TURGESPIELT) {
                        if (STAT.TURADMIN !== LS.ME) {
                            LS.I = 0; // der Administrator muß das Turnier noch beenden
                        }
                    }
                }
                try {
                    localStorage.setItem('Abakus.LS', JSON.stringify(LS));
                } catch (err) {
                    showEinenFehler('Speicherplatzproblem:', 'Inítialisieren und', 'Vorgang wiederholen.');
                    return;
                }
            }
        }

        if (typeof pCallback === "function") {
            console.log('loadSTAT ===> ' + pCallback.name);
            pCallback();
            pCallback = null;
        } else {
            whenSTATloaded();
        }

    }, function (error) {
        if (typeof stCup === 'number') { // Aufruf aus Statistik
            stSynchron = false;
            if (stStat === 10) { // Anmeldung
                $('#bAnAbmelden,#bNachricht').addClass('ui-disabled');
            }
            showEineDBWarnung(error, 'loadSTAT()', 'STAT once');
            return false;
        } else {
            showEinenDBFehler(error, 'loadSTAT()', 'STAT once');
            return false;
        }
    });
}

function compSTAT() {

    var hSaison = '';
    var hSaisonTeilnahmen = 0;
    STAT._ANZSAISONEN = 0;
    STAT._ANZTURNIERE = 0;
    STAT._ANZTEILNAHMEN = 0;
    STAT._PUNKTEPOTENTIAL = [0];

    for (var turnier in STAT) {
        if (turnier[0] === '2') {
            if (!stFilter || STAT[turnier]._NAME.toUpperCase().indexOf(stFilter) >= 0) {

                STAT._ANZTURNIERE++;
                if (hSaison !== STAT[turnier]._SAISON) {
                    hSaison = STAT[turnier]._SAISON;
                    if (STAT._ANZSAISONEN) {
                        STAT._PUNKTEPOTENTIAL[STAT._ANZSAISONEN] = parseInt((STAT._PUNKTEPOTENTIAL[STAT._ANZSAISONEN] * 100) / hSaisonTeilnahmen) / 50;
                    }
                    STAT._ANZSAISONEN++;
                    STAT._PUNKTEPOTENTIAL[STAT._ANZSAISONEN] = 0;
                    hSaisonTeilnahmen = 0;
                }

                var spieler = '';
                if (STAT[turnier]._AKTTURNIER) { // Handyeingaben in STAT übertragen
                    for (var iSpieler in STAT[turnier]._AKTTURNIER) {
                        if (iSpieler.substr(0, 4) === '_R' + STAT[turnier]._AKTTURNIER._RUNDE + '_') {
                            spieler = iSpieler.substr(4);
                            if (!STAT[turnier][spieler]) {
                                STAT[turnier][spieler] = [0, '-', '-', '-'];
                            }
                            STAT[turnier][spieler][STAT[turnier]._AKTTURNIER._RUNDE] = STAT[turnier]._AKTTURNIER[iSpieler];

                            STAT[turnier][spieler][4] = 0; // Gesamtpunkte errechnen
                            if (STAT[turnier][spieler][1] !== '-') {
                                STAT[turnier][spieler][4] += STAT[turnier][spieler][1];
                            }
                            if (STAT[turnier][spieler][2] !== '-') {
                                STAT[turnier][spieler][4] += STAT[turnier][spieler][2];
                            }
                            if (STAT[turnier][spieler][3] !== '-') {
                                STAT[turnier][spieler][4] += STAT[turnier][spieler][3];
                            }
                        }
                    }
                }

                STAT[turnier]._TEILNEHMER = 0;
                for (var spieler in STAT[turnier]) {
                    if (spieler[0] !== '_') {
                        hSaisonTeilnahmen++;
                        STAT._ANZTEILNAHMEN++;
                        STAT[turnier]._TEILNEHMER++;
                        if (STAT[turnier][spieler][4] > 0) {
                            STAT._PUNKTEPOTENTIAL[0] += STAT[turnier][spieler][4];
                            STAT._PUNKTEPOTENTIAL[STAT._ANZSAISONEN] += STAT[turnier][spieler][4];
                        }
                    }
                }

                var SORT = [];
                for (var spieler in STAT[turnier]) {
                    if (spieler[0] !== '_') {
                        SORT.push(['' + (2000 - STAT[turnier][spieler][4])
                                    + (2000 - Math.max(STAT[turnier][spieler][1], STAT[turnier][spieler][2], STAT[turnier][spieler][3]))
                                    + (2000 + Math.min(STAT[turnier][spieler][1], STAT[turnier][spieler][2], STAT[turnier][spieler][3]))
                                    , spieler]);
                    }
                }

                SORT.sort();

                for (var i = 0; i < SORT.length; i++) { // Rang eintragen
                    STAT[turnier][SORT[i][1]][0] = i + 1;
                }
                if (SORT.length) {
                    STAT[turnier]._STOCKERL = [, SORT[0][1], SORT[1][1], SORT[2][1]];
                }
            }
        }
    }

    STAT._PUNKTEPOTENTIAL[STAT._ANZSAISONEN] = parseInt((STAT._PUNKTEPOTENTIAL[STAT._ANZSAISONEN] * 100) / hSaisonTeilnahmen) / 50;
    STAT._PUNKTEPOTENTIAL[0] = parseInt((STAT._PUNKTEPOTENTIAL[0] * 100) / STAT._ANZTEILNAHMEN) / 50;

}