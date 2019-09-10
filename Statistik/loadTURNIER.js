
/* global CUPS, firebase, LS, FB */

//  STAT  Funktionen  **************************************************************************
function loadTURNIER(I, pTurnier, pTitel, pLastturnier, pCallback) {

    if (pTitel) {
        showEinenMoment(I, pTitel);
    }

    if (pTurnier === pLastturnier.substr(0, 10)) {
        STAT = JSON.parse(localStorage.getItem('Abakus.STAT' + (("000" + I).slice(-3))));
    }
    if (!STAT) {
        loadSTAT(I, pTitel, false, pCallback);
        return;
    }

    if (typeof FB !== 'object') {
        firebase.initDB(I);
    }

    firebase.database().ref('/00/' + ("000" + I).slice(-3) + '/' + pTurnier).once('value').then(function (data) {

        stSynchron = true;

        var hSaison = '';
        var anzSaisonen = 0;
        var anzTurniere = 0;
        var anzTeilnahmen = 0;

        var mNewTurnier = false;

        if (data.val()) {
            STAT[pTurnier] = data.val();
            for (var turnier in STAT) {
                if (turnier[0] === '2') {

                    anzTurniere++;
                    if (hSaison !== STAT[turnier]._SAISON) {
                        hSaison = STAT[turnier]._SAISON;
                        anzSaisonen++;
                    }

                    var spieler = '';
                    if (STAT[turnier]._AKTTURNIER) { // Handyeingaben in STAT übertragen
                        for (var iSpieler in STAT[turnier]._AKTTURNIER) {
                            if (iSpieler.substr(0, 4) === '_R' + STAT[turnier]._AKTTURNIER._RUNDE + '_') {
                                spieler = iSpieler.substr(4);
                                if (!STAT[turnier][spieler]) {
                                    STAT[turnier][spieler] = ['-', '-', '-'];
                                }
                                STAT[turnier][spieler][STAT[turnier]._AKTTURNIER._RUNDE - 1] = STAT[turnier]._AKTTURNIER[iSpieler];
                            }
                        }
                    }

                    for (var spieler in STAT[turnier]) {

                        if (spieler[0] !== '_') {

                            anzTeilnahmen++;

                            if (turnier === pTurnier) { // nur das aktuelle Turnier shiften
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

                    var SORT = [];
                    for (var spieler in STAT[turnier]) {
                        if (spieler[0] !== '_') {
                            SORT.push(['' + (5000 - STAT[turnier][spieler][4])
                                        + (5000 - Math.max(STAT[turnier][spieler][1], STAT[turnier][spieler][2], STAT[turnier][spieler][3]))
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

        } else {
            loadSTAT(I, pTitel, false, pCallback);
            return;
        }

        if (STAT[pTurnier]._AKTTURNIER) {
            if (pTurnier === pLastturnier.substr(0, 10)) {
                STAT._AKTTURNIER = STAT[pTurnier]._AKTTURNIER;
                if (STAT._AKTTURNIER._RUNDE === 1) {
                    mNewTurnier = true; // nach dem Speichern der Anmeldungen
                    for (var iItem in STAT._AKTTURNIER) {
                        if (iItem.substr(0, 4) === '_R1_') {
                            mNewTurnier = false; // fals bereits Tische eingegeben
                            break;
                        }
                    }
                }
            }
            delete STAT[pTurnier]._AKTTURNIER;
        } else {
            if (pTurnier === pLastturnier.substr(0, 10)) {
                delete STAT._AKTTURNIER;
            }
        }
        if (STAT[pTurnier]._PRETURNIER) {
            if (!STAT[STAT[pTurnier]._PRETURNIER]) {
                loadTURNIER(I, STAT[pTurnier]._PRETURNIER, pTitel, pLastturnier, pCallback);
                return;
            }
        }

        if (STAT._LASTTURNIER) {
            if (STAT[STAT._LASTTURNIER.substr(0, 10)]) {
                if (STAT[STAT._LASTTURNIER.substr(0, 10)]._AKTTURNIER) {
                    STAT._AKTTURNIER = STAT[STAT._LASTTURNIER.substr(0, 10)]._AKTTURNIER;
                    delete STAT[STAT._LASTTURNIER.substr(0, 10)]._AKTTURNIER;
                }
            }
        }

        STAT._LASTTURNIER = pLastturnier;

        STAT._ANZSAISONEN = anzSaisonen;
        STAT._ANZTURNIERE = anzTurniere;
        STAT._ANZTEILNAHMEN = anzTeilnahmen;

        localStorage.setItem("Abakus.STAT" + ("000" + I).substr(-3), JSON.stringify(STAT));

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
                localStorage.setItem("Abakus.CUPS", JSON.stringify(CUPS));
            }
        }

        if (typeof pCallback === "function") {
            pCallback();
        } else {
            whenSTATloaded(mNewTurnier);
        }

    }, function (error) {
        stSynchron = false;
        showEineDBWarnung(error, 'loadTURNIER()', 'TURNIER once');
        return false;
    });
}