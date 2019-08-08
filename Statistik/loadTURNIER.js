
/* global CUPS, firebase, LS, FB */

//  STAT  Funktionen  **************************************************************************
function loadTURNIER(pCup, pTurnier, pTitel, pLastturnier, pCallback) {

    if (pTitel) {
        showEinenMoment(pCup, pTitel);
    }

    if (pTurnier === pLastturnier.substr(0, 10)) {
        STAT = JSON.parse(localStorage.getItem('Abakus.STAT' + (("000" + pCup).slice(-3))));
    }
    if (!STAT) {
        loadSTAT(pCup, pTitel, false, pCallback);
        return;
    }

    if (typeof FB !== 'object') {
        firebase.initDB(pCup);
    }

    firebase.database().ref('/00/' + ("000" + pCup).slice(-3) + '/' + pTurnier).once('value').then(function (data) {

        stSynchron = true;

        var mNewTurnier = false;

        if (data.val()) {
            STAT[pTurnier] = data.val();
            var spieler = '';
            if (STAT[pTurnier]._AKTTURNIER) { // Handyeingaben in STAT übertragen
                for (var iSpieler in STAT[pTurnier]._AKTTURNIER) {
                    if (iSpieler.substr(0, 4) === '_R' + STAT[pTurnier]._AKTTURNIER._RUNDE + '_') {
                        spieler = iSpieler.substr(4);
                        if (!STAT[pTurnier][spieler]) {
                            STAT[pTurnier][spieler] = ['-', '-', '-'];
                        }
                        STAT[pTurnier][spieler][STAT[pTurnier]._AKTTURNIER._RUNDE - 1] = STAT[pTurnier]._AKTTURNIER[iSpieler];
                    }
                }
            }

            for (var spieler in STAT[pTurnier]) {
                if (spieler[0] !== '_') {

                    if (CUPS.TYP[pCup] === 'MT') {
                        STAT[pTurnier][spieler][5] = STAT[pTurnier][spieler][3]; // Mannschaft shiften
                    }
                    STAT[pTurnier][spieler][3] = STAT[pTurnier][spieler][2]; // Punkte je Runde auf 1, 2, 3 shiften
                    STAT[pTurnier][spieler][2] = STAT[pTurnier][spieler][1];
                    STAT[pTurnier][spieler][1] = STAT[pTurnier][spieler][0];
                    STAT[pTurnier][spieler][0] = 0;

                    STAT[pTurnier][spieler][4] = 0; // Gesamtpunkte errechnen
                    if (STAT[pTurnier][spieler][1] !== '-') {
                        STAT[pTurnier][spieler][4] += STAT[pTurnier][spieler][1];
                    }
                    if (STAT[pTurnier][spieler][2] !== '-') {
                        STAT[pTurnier][spieler][4] += STAT[pTurnier][spieler][2];
                    }
                    if (STAT[pTurnier][spieler][3] !== '-') {
                        STAT[pTurnier][spieler][4] += STAT[pTurnier][spieler][3];
                    }
                }
            }

            var SORT = [];
            for (var spieler in STAT[pTurnier]) {
                if (spieler[0] !== '_') {
                    SORT.push(['' + (5000 - STAT[pTurnier][spieler][4])
                                + (5000 - Math.max(STAT[pTurnier][spieler][1], STAT[pTurnier][spieler][2], STAT[pTurnier][spieler][3]))
                                , spieler]);
                }
            }

            SORT.sort();

            for (var i = 0; i < SORT.length; i++) { // Rang eintragen
                STAT[pTurnier][SORT[i][1]][0] = i + 1;
            }
            if (SORT.length) {
                STAT[pTurnier]._STOCKERL = [, SORT[0][1], SORT[1][1], SORT[2][1]];
            }

            if (STAT[pTurnier]._AKTTURNIER) {
                if (pTurnier === pLastturnier.substr(0, 10)) {
                    STAT._AKTTURNIER = STAT[pTurnier]._AKTTURNIER;
                }
                delete STAT[pTurnier]._AKTTURNIER;
            } else {
                if (pTurnier === pLastturnier.substr(0, 10)) {
                    delete STAT._AKTTURNIER;
                }
            }

            if (STAT[pTurnier]._PRETURNIER) {
                if (!STAT[STAT[pTurnier]._PRETURNIER]) {
                    loadTURNIER(pCup, STAT[pTurnier]._PRETURNIER, pTitel, pLastturnier, pCallback);
                    return;
                }
            }

            if (STAT._LASTTURNIER.substr(0, 10) !== pLastturnier.substr(0, 10)) {
                mNewTurnier = true;
            }

            STAT._LASTTURNIER = pLastturnier;

            localStorage.setItem("Abakus.STAT" + ("000" + pCup).substr(-3), JSON.stringify(STAT));

            var hMEZULETZT = false;
            for (var turnier in STAT) {
                if (turnier[0] === '2') {
                    if (STAT[turnier][LS.ME]) {
                        hMEZULETZT = new Date(turnier).valueOf();
                    }
                }
            }

            if (hMEZULETZT) {
                if (CUPS.MEZULETZT[pCup] !== hMEZULETZT) {
                    CUPS.MEZULETZT[pCup] = hMEZULETZT;
                    localStorage.setItem("Abakus.CUPS", JSON.stringify(CUPS));
                }
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