
/* global CUPS, stCup, firebase, LS, stFilter */

//  STAT  Funktionen  **************************************************************************
function loadSTAT(I, pTitel, pWarning, pCallback) {

    if (pTitel) {
        showEinenMoment(I, pTitel);
    }
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
                _LASTTURNIER: null,
                _PUNKTEPOTENTIAL: [0]
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
            showEinenFehler('Speicherplatzproblem!', 'Inítialisieren oder<br>Verlauf löschen oder<br>neu starten und', 'Vorgang wiederholen.');
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
                    showEinenFehler('Speicherplatzproblem!', 'Inítialisieren oder<br>Verlauf löschen oder<br>neu starten und', 'Vorgang wiederholen.');
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