
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

        if (data.val()) {

            STAT[pTurnier] = data.val();

            for (var spieler in STAT[pTurnier]) {
                if (spieler[0] !== '_') {
                    if (CUPS.TYP[I] === 'MT') {
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

            compSTAT();

        } else {
            loadSTAT(I, pTitel, false, pCallback);
            return;
        }

        var mNewTurnier = false;

        if (STAT[pTurnier]._AKTTURNIER) {
            if (pTurnier === pLastturnier.substr(0, 10)) {
                STAT._AKTTURNIER = STAT[pTurnier]._AKTTURNIER;
                mNewTurnier = true; // nach dem Speichern der Anmeldungen
                for (var iItem in STAT._AKTTURNIER) {
                    if (iItem[0] !== '_') {
                        mNewTurnier = pTurnier; // fals bereits Tische eingegeben
                        break;
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