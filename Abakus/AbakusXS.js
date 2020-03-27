/* global LS, aktSpiel, responsiveVoice, iTrischaker */
/* global LS, aktSpiel, responsiveVoice, iTrischaker, negKontra */

function NSBuchen(pGame, pPunkte, pS) {

    if (isNaN(pPunkte)) {
        showEinenTip('#bEnter', 'Es wurde noch kein <b>Spiel</b> ausgew&auml;hlt.');
        return;
    }
    pPunkte = parseInt(pPunkte);
    if (isNaN(pS) || !pS) {
        showEinenTip('#bEnter', 'Es&nbsp;wurde&nbsp;noch&nbsp;kein<br><b>Spieler</b>&nbsp;ausgew&auml;hlt.');
        return;
    } else {

        H = new Object();
        H.PUNKTE = [];

        if (LS.doppelt > 0) {
            H.PUNKTE[1] = H.PUNKTE[2] = H.PUNKTE[3] = H.PUNKTE[4] = H.PUNKTE[5] = H.PUNKTE[6] = pPunkte * -2;
        } else {
            H.PUNKTE[1] = H.PUNKTE[2] = H.PUNKTE[3] = H.PUNKTE[4] = H.PUNKTE[5] = H.PUNKTE[6] = pPunkte * -1;
        }

        H.PAUSE = [];
        H.PAUSE[1] = H.PAUSE[2] = H.PAUSE[3] = H.PAUSE[4] = H.PAUSE[5] = H.PAUSE[6] = 0;

        LS.Ansage = "";
        var hPunkte, hFuerBei;
        if (H.PUNKTE[pS] === 1 || H.PUNKTE[pS] === -1) {
            hPunkte = 'einen Punkt';
        } else {
            hPunkte = Math.abs(H.PUNKTE[pS]) + ' Punkte';
        }
        if (H.PUNKTE[pS] > 0) {
            hPunkte += ' Abzug';
            hFuerBei = ' bei ';
        } else {
            hFuerBei = ' für ';
        }

        H.PUNKTE[LS.INA1] = 0;
        H.PAUSE[LS.INA1] = 1;
        negKontra[LS.INA1] = 0;
        H.PUNKTE[LS.INA2] = 0;
        H.PAUSE[LS.INA2] = 1;
        negKontra[LS.INA2] = 0;

        if (negKontra[1] + negKontra[2] + negKontra[3] + negKontra[4] + negKontra[5] + negKontra[6] === 4) {
            LS.Ansage = "Drei mal " + hPunkte + hFuerBei + LS.VName[pS] + "!";
            H.PUNKTE[pS] = H.PUNKTE[pS] * -3;
        } else {
            var nCount = 0;
            H.PUNKTE[pS] = 0;
            LS.Ansage = hFuerBei + LS.VName[pS] + " gibt es ";
            for (var i = 1; i < 6; i++) {
                if (i !== pS && negKontra[i] !== 0) {
                    nCount++;
                    H.PUNKTE[i] *= negKontra[i];
                    H.PUNKTE[pS] -= H.PUNKTE[i];
                    LS.Ansage += (H.PUNKTE[i] * -1);
                    if (nCount === 1) {
                        LS.Ansage += ', ';
                    } else if (nCount === 2) {
                        LS.Ansage += ' und ';
                    }
                }
            }
            if (H.PUNKTE[pS] > 0) {
                LS.Ansage += ' Punkte!';
            } else {
                LS.Ansage += ' Punkte Abzug!';
            }
        }

        if (LS.DoppelteRunden || LS.doppelt) {
            if (LS.doppelt === 1) {
                LS.Ansage += ' Es geht wieder einfach.';
            } else if (LS.doppelt === 2) {
                LS.Ansage += ' Letztes doppelte Spiel.';
            } else if (LS.doppelt > 2) {
                LS.Ansage += ' Noch ' + (LS.doppelt - 1) + ' doppelte Spiele.';
            }
        }

        if (LS.Ansagen) {
            if (navigator.vendor.indexOf("Apple") < 0) {
                responsiveVoice.speak(LS.Ansage, 'Deutsch Female');
            } else if ('speechSynthesis' in window) {
                var hAnsage = new SpeechSynthesisUtterance(LS.Ansage);
                hAnsage.lang = "de-DE";
                window.speechSynthesis.speak(hAnsage);
            }
        }

        DS = new Object();
        DS = JSON.parse(localStorage.getItem('Abakus.DS'));

        i = DS.Game.length;
        DS.Korr[i] = false;
        DS.Storno[i] = false;

        DS.Punkte[0][0] = DS.Punkte[0][0] + H.PUNKTE[pS];
        DS.Punkte[1][0] = DS.Punkte[1][0] + H.PUNKTE[1];
        DS.Punkte[2][0] = DS.Punkte[2][0] + H.PUNKTE[2];
        DS.Punkte[3][0] = DS.Punkte[3][0] + H.PUNKTE[3];
        DS.Punkte[4][0] = DS.Punkte[4][0] + H.PUNKTE[4];
        DS.Punkte[5][0] = DS.Punkte[5][0] + H.PUNKTE[5];
        DS.Punkte[6][0] = DS.Punkte[6][0] + H.PUNKTE[6];

        if (H.PUNKTE[1] + H.PUNKTE[2] + H.PUNKTE[3] + H.PUNKTE[4] + H.PUNKTE[5] + H.PUNKTE[6] !== 0) {
            showEinenTip('#bEnter', 'Quersumme ist ungleich 0.');
            return;
        }

        LS.Spiele[0]++;
        for (var ii = 1; ii <= 6; ii++) {
            if (H.PAUSE[ii] === 1 || ii > LS.AnzSpieler) {
                H.PUNKTE[ii] = '-';
            } else {
                LS.Spiele[ii]++;
            }
        }
        if (LS.gespielt === 0) {
            LS.Von = new Date();  // Timestamp erstes Spiel
        }
        LS.Bis = new Date();      // Timestamp letztes Spiel

        H.PUNKTE[LS.Pausierer1] = 'X';
        H.PUNKTE[LS.Pausierer2] = 'X';

        LS.Vorhand++;
        if (LS.Vorhand > LS.AnzSpieler) {
            LS.Vorhand = 1;
        }
        if (LS.Vorhand === LS.Pausierer1 || LS.Vorhand === LS.Pausierer2) {
            LS.Vorhand++;
            if (LS.Vorhand > LS.AnzSpieler) {
                LS.Vorhand = 1;
            }
            if (LS.Vorhand === LS.Pausierer1 || LS.Vorhand === LS.Pausierer2) {
                LS.Vorhand++;
                if (LS.Vorhand > LS.AnzSpieler) {
                    LS.Vorhand = 1;
                }
            }
        }
        LS.Geber = LS.Vorhand - 1;
        if (LS.Geber === 0) {
            LS.Geber = LS.AnzSpieler;
        }
        if (LS.Geber === LS.Pausierer1 || LS.Geber === LS.Pausierer2) {
            LS.Geber = LS.Geber - 1;
            if (LS.Geber === 0) {
                LS.Geber = LS.AnzSpieler;
            }
            if (LS.Geber === LS.Pausierer1 || LS.Geber === LS.Pausierer2) {
                LS.Geber = LS.Geber - 1;
                if (LS.Geber === 0) {
                    LS.Geber = LS.AnzSpieler;
                }
            }
        }

        LS.INA1 = 0;
        LS.INA2 = 0;
        if (LS.AnzSpieler === 4) {
            LS.INA1 = 5;
            LS.INA2 = 6;
        } else if (LS.AnzSpieler === 5) {
            if (LS.Pausierer1 > 0) {
                LS.INA1 = LS.Pausierer1;
            } else {
                LS.INA1 = LS.Geber;
            }
            LS.INA2 = 6;
        } else if (LS.AnzSpieler === 6) {
            if (LS.Pausierer1 === 0 && LS.Pausierer2 === 0) {
                LS.INA1 = LS.Geber;
                if (LS.Geber <= 3) {
                    LS.INA2 = LS.Geber + 3;
                } else {
                    LS.INA2 = LS.Geber - 3;
                }
            } else if (LS.Pausierer1 !== 0 && LS.Pausierer2 !== 0) {
                LS.INA1 = LS.Pausierer1;
                LS.INA2 = LS.Pausierer2;
            } else {
                LS.INA1 = LS.Pausierer1;
                LS.INA2 = LS.Geber;
            }
        }

        LS.gespielt++;
        if (LS.doppelt <= 0) {
            DS.Game[i] = pGame;
        } else {
            LS.doppelt = LS.doppelt - 1;
            DS.Game[i] = '*' + pGame;
        }
        LS.Spieler[0] = DS.Game[i];

        localStorage.setItem('Abakus.LS', JSON.stringify(LS));

        DS.GameI[i] = aktSpiel;
        DS.Spieler[i] = pS;
        DS.Partner[i] = 0;

        DS.Punkte[1][i] = H.PUNKTE[1];
        DS.Punkte[2][i] = H.PUNKTE[2];
        DS.Punkte[3][i] = H.PUNKTE[3];
        DS.Punkte[4][i] = H.PUNKTE[4];
        DS.Punkte[5][i] = H.PUNKTE[5];
        DS.Punkte[6][i] = H.PUNKTE[6];

        localStorage.setItem('Abakus.DS', JSON.stringify(DS));

        if (LS.SpieleJeRunde) {
            if (LS.gespielt >= LS.SpieleJeRunde) {
                $('.NBedit').addClass('ui-disabled');
            }
        }

        if (LS.Schreibzettel) {
            showSeite('SZ');
        } else {
            showSeite('GR');
        }
    }
}

function XSBuchen(pGame, pPunkte, pS, pP, pSakt) {

    if (isNaN(pPunkte)) {
        showEinenTip('#bEnter', 'Es wurde noch kein <b>Spiel</b> ausgew&auml;hlt.');
        return;
    }
    pPunkte = parseInt(pPunkte);
    if (isNaN(pS) || !pS) {
        if (aktSpiel === iTrischaker) {
            showEinenTip('#bEnter', 'Wer hat das Trischacken<br>"<b>gewonnen</b>" ?');
        } else {
            showEinenTip('#bEnter', 'Es&nbsp;wurde&nbsp;noch&nbsp;kein<br><b>Spieler</b>&nbsp;ausgew&auml;hlt.');
        }
        return;
    } else {

        H = new Object();
        H.PUNKTE = [];

        if (LS.doppelt > 0) {
            H.PUNKTE[1] = H.PUNKTE[2] = H.PUNKTE[3] = H.PUNKTE[4] = H.PUNKTE[5] = H.PUNKTE[6] = pPunkte * -2;
        } else {
            H.PUNKTE[1] = H.PUNKTE[2] = H.PUNKTE[3] = H.PUNKTE[4] = H.PUNKTE[5] = H.PUNKTE[6] = pPunkte * -1;
        }

        H.PAUSE = [];
        H.PAUSE[1] = H.PAUSE[2] = H.PAUSE[3] = H.PAUSE[4] = H.PAUSE[5] = H.PAUSE[6] = 0;

        LS.Ansage = "";
        var hPunkte, hFuerBei;
        if (H.PUNKTE[pS] === 1 || H.PUNKTE[pS] === -1) {
            hPunkte = 'einen Punkt';
        } else {
            hPunkte = Math.abs(H.PUNKTE[pS]) + ' Punkte';
        }
        if (H.PUNKTE[pS] > 0) {
            hPunkte += ' Abzug';
            hFuerBei = ' bei ';
        } else {
            hFuerBei = ' für ';
        }
        if (pP === 0 || pP === pS) { // -1 Ohne Partner oder pP = pS Selberrufer
            LS.Ansage = "Drei mal " + hPunkte + hFuerBei + LS.VName[pS] + "!";
            H.PUNKTE[pS] = H.PUNKTE[pS] * -3;
        } else {
            LS.Ansage = hFuerBei + LS.VName[pS] + " und " + LS.VName[pP] + " gibt es jeweils " + hPunkte + '!';
            H.PUNKTE[pS] = H.PUNKTE[pS] * -1;
            H.PUNKTE[pP] = H.PUNKTE[pP] * -1;
        }
        if (LS.DoppelteRunden || LS.doppelt) {
            if (pGame === "Trisch.") {
                if (LS.doppelt > 0) {
                    LS.Ansage += ' Es folgen ' + (LS.AnzSpieler + LS.doppelt - 1) + ' doppelte Spiele.';
                } else {
                    LS.Ansage += ' Ab jetzt folgen ' + LS.AnzSpieler + ' doppelte Spiele.';
                }
            } else if (pPunkte === 0) {
                if (LS.doppelt > 0) {
                    if (LS.I === 23) { // Cafe Rathaus
                        LS.Ansage += ' Es folgen ' + (LS.doppelt) + ' doppelte Spiele.';
                    } else {
                        LS.Ansage += ' Es folgen ' + (LS.doppelt + LS.AnzSpieler - 1) + ' doppelte Spiele.';
                    }
                } else {
                    if (LS.I === 23) { // Cafe Rathaus
                        LS.Ansage += ' Es folgt ein doppeltes Spiel.';
                    } else {
                        LS.Ansage += ' Ab jetzt folgen ' + LS.AnzSpieler + ' doppelte Spiele.';
                    }
                }
            } else if (LS.doppelt === 1) {
                LS.Ansage += ' Es geht wieder einfach.';
            } else if (LS.doppelt === 2) {
                LS.Ansage += ' Letztes doppelte Spiel.';
            } else if (LS.doppelt > 2) {
                LS.Ansage += ' Noch ' + (LS.doppelt - 1) + ' doppelte Spiele.';
            }
        }

        if (LS.Ansagen) {
            if (navigator.vendor.indexOf("Apple") < 0) {
                responsiveVoice.speak(LS.Ansage, 'Deutsch Female');
            } else if ('speechSynthesis' in window) {
                var hAnsage = new SpeechSynthesisUtterance(LS.Ansage);
                hAnsage.lang = "de-DE";
                window.speechSynthesis.speak(hAnsage);
            }
        }

        H.PUNKTE[LS.INA1] = 0;
        H.PAUSE[LS.INA1] = 1;
        H.PUNKTE[LS.INA2] = 0;
        H.PAUSE[LS.INA2] = 1;

        DS = new Object();
        DS = JSON.parse(localStorage.getItem('Abakus.DS'));

        i = DS.Game.length;
        DS.Korr[i] = false;
        DS.Storno[i] = false;

        DS.Punkte[0][0] = DS.Punkte[0][0] + H.PUNKTE[pS];
        DS.Punkte[1][0] = DS.Punkte[1][0] + H.PUNKTE[1];
        DS.Punkte[2][0] = DS.Punkte[2][0] + H.PUNKTE[2];
        DS.Punkte[3][0] = DS.Punkte[3][0] + H.PUNKTE[3];
        DS.Punkte[4][0] = DS.Punkte[4][0] + H.PUNKTE[4];
        DS.Punkte[5][0] = DS.Punkte[5][0] + H.PUNKTE[5];
        DS.Punkte[6][0] = DS.Punkte[6][0] + H.PUNKTE[6];

        if (H.PUNKTE[1] + H.PUNKTE[2] + H.PUNKTE[3] + H.PUNKTE[4] + H.PUNKTE[5] + H.PUNKTE[6] !== 0) {
            showEinenTip('#bEnter', 'Quersumme ist ungleich 0.');
            return;
        }

        LS.Spiele[0]++;
        for (var ii = 1; ii <= 6; ii++) {
            if (H.PAUSE[ii] === 1 || ii > LS.AnzSpieler) {
                H.PUNKTE[ii] = '-';
            } else {
                LS.Spiele[ii]++;
            }
        }
        if (LS.gespielt === 0) {
            LS.Von = new Date();  // Timestamp erstes Spiel
        }
        LS.Bis = new Date();      // Timestamp letztes Spiel

        H.PUNKTE[LS.Pausierer1] = 'X';
        H.PUNKTE[LS.Pausierer2] = 'X';

        LS.Vorhand++;
        if (LS.Vorhand > LS.AnzSpieler) {
            LS.Vorhand = 1;
        }
        if (LS.Vorhand === LS.Pausierer1 || LS.Vorhand === LS.Pausierer2) {
            LS.Vorhand++;
            if (LS.Vorhand > LS.AnzSpieler) {
                LS.Vorhand = 1;
            }
            if (LS.Vorhand === LS.Pausierer1 || LS.Vorhand === LS.Pausierer2) {
                LS.Vorhand++;
                if (LS.Vorhand > LS.AnzSpieler) {
                    LS.Vorhand = 1;
                }
            }
        }
        LS.Geber = LS.Vorhand - 1;
        if (LS.Geber === 0) {
            LS.Geber = LS.AnzSpieler;
        }
        if (LS.Geber === LS.Pausierer1 || LS.Geber === LS.Pausierer2) {
            LS.Geber = LS.Geber - 1;
            if (LS.Geber === 0) {
                LS.Geber = LS.AnzSpieler;
            }
            if (LS.Geber === LS.Pausierer1 || LS.Geber === LS.Pausierer2) {
                LS.Geber = LS.Geber - 1;
                if (LS.Geber === 0) {
                    LS.Geber = LS.AnzSpieler;
                }
            }
        }

        LS.INA1 = 0;
        LS.INA2 = 0;
        if (LS.AnzSpieler === 4) {
            LS.INA1 = 5;
            LS.INA2 = 6;
        } else if (LS.AnzSpieler === 5) {
            if (LS.Pausierer1 > 0) {
                LS.INA1 = LS.Pausierer1;
            } else {
                LS.INA1 = LS.Geber;
            }
            LS.INA2 = 6;
        } else if (LS.AnzSpieler === 6) {
            if (LS.Pausierer1 === 0 && LS.Pausierer2 === 0) {
                LS.INA1 = LS.Geber;
                if (LS.Geber <= 3) {
                    LS.INA2 = LS.Geber + 3;
                } else {
                    LS.INA2 = LS.Geber - 3;
                }
            } else if (LS.Pausierer1 !== 0 && LS.Pausierer2 !== 0) {
                LS.INA1 = LS.Pausierer1;
                LS.INA2 = LS.Pausierer2;
            } else {
                LS.INA1 = LS.Pausierer1;
                LS.INA2 = LS.Geber;
            }
        }

        LS.gespielt++;
        if (LS.doppelt <= 0) {
            DS.Game[i] = pGame;
        } else {
            LS.doppelt = LS.doppelt - 1;
            DS.Game[i] = '*' + pGame;
        }
        LS.Spieler[0] = DS.Game[i];

        if (LS.DoppelteRunden) {
            if (pGame === "Trisch.") {
                LS.doppelt += LS.AnzSpieler;
                if (LS.Pausierer1 && LS.Pausierer1 <= LS.AnzSpieler) {
                    LS.doppelt--;
                }
                if (LS.Pausierer2 && LS.Pausierer2 <= LS.AnzSpieler) {
                    LS.doppelt--;
                }
            } else if (pPunkte === 0) {
                if (LS.I === 115) { // Zum Stiegenwirt, 13 Uhr - keine doppelte Runde
                } else if (LS.I === 23) { // Cafe Rathaus - ein doppeltes Spiel
                    LS.doppelt++;
                } else {
                    LS.doppelt += LS.AnzSpieler;
                    if (LS.Pausierer1 && LS.Pausierer1 <= LS.AnzSpieler) {
                        LS.doppelt--;
                    }
                    if (LS.Pausierer2 && LS.Pausierer2 <= LS.AnzSpieler) {
                        LS.doppelt--;
                    }
                }
            }
        }

        localStorage.setItem('Abakus.LS', JSON.stringify(LS));

        DS.GameI[i] = aktSpiel;
        if (pSakt) {
            DS.Spieler[i] = pSakt;
        } else {
            DS.Spieler[i] = pS;
        }
        if (DS.GameI[i] < 7) {
            if (pP) {
                DS.Partner[i] = pP;
            } else {
                DS.Partner[i] = pS;
            }
        } else {
            DS.Partner[i] = 0;
        }

        DS.Punkte[1][i] = H.PUNKTE[1];
        DS.Punkte[2][i] = H.PUNKTE[2];
        DS.Punkte[3][i] = H.PUNKTE[3];
        DS.Punkte[4][i] = H.PUNKTE[4];
        DS.Punkte[5][i] = H.PUNKTE[5];
        DS.Punkte[6][i] = H.PUNKTE[6];

        localStorage.setItem('Abakus.DS', JSON.stringify(DS));

        if (LS.SpieleJeRunde) {
            if (LS.gespielt >= LS.SpieleJeRunde) {
                $('.NBedit').addClass('ui-disabled');
            }
        }

        if (LS.Schreibzettel) {
            showSeite('SZ');
        } else {
            showSeite('GR');
        }
    }
}