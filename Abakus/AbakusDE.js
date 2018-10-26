
/* global H, LS, DS, xKorr, xStorno, xManu, xNeu, iSPIEL, iDiverse, iTrischaker, mFensterbrett */

function anaPunkte() {
    'use strict';

    hPunkte = [];
    hSpieler = [];
    hCount = [];
    iPartner = 0;
    for (var ii = 1; ii <= LS.AnzSpieler; ii++) {
        if (IsInteger(H.PUNKTE[ii])) {
            var iii = 0;
            for (iii = 0; iii < hPunkte.length; iii++) {
                if (H.PUNKTE[ii] === hPunkte[iii]) {
                    break;
                }
            }
            if (H.PUNKTE[ii] === hPunkte[iii]) {
                hCount[iii]++;
                hSpieler[iii] = ii;
            } else {
                hCount[hPunkte.length] = 1;
                hSpieler[hPunkte.length] = ii;
                hPunkte[hPunkte.length] = H.PUNKTE[ii];
            }
            if (H.PUNKTE[iSpieler] === H.PUNKTE[ii]) {
                if (iSpieler !== ii) {
                    iPartner = ii;  //
                }
            }
        }
    }
    if (hCount[0] === 3) {
        hSpieler = hSpieler[1];      // Spieler oder Renoceier
        hPunkte = H.PUNKTE[hSpieler] / 3;
    } else if (hCount[1] === 3) {
        hSpieler = hSpieler[0];      // Spieler oder Renoceier
        hPunkte = H.PUNKTE[hSpieler] / 3;
    } else {
        hPunkte = H.PUNKTE[iSpieler];
        hSpieler = iSpieler;
    }
}

function SetVorhand(pPlus) {

    LS.Vorhand = LS.Vorhand + pPlus;
    if (LS.Vorhand > LS.AnzSpieler) {
        LS.Vorhand = 1;
    }
    if (LS.Vorhand === 0) {
        LS.Vorhand = LS.AnzSpieler;
    }
    if (LS.Vorhand === LS.Pausierer1 || LS.Vorhand === LS.Pausierer2) {
        LS.Vorhand = LS.Vorhand + pPlus;
        if (LS.Vorhand > LS.AnzSpieler) {
            LS.Vorhand = 1;
        }
        if (LS.Vorhand === 0) {
            LS.Vorhand = LS.AnzSpieler;
        }
        if (LS.Vorhand === LS.Pausierer1 || LS.Vorhand === LS.Pausierer2) {
            LS.Vorhand = LS.Vorhand + pPlus;
            if (LS.Vorhand > LS.AnzSpieler) {
                LS.Vorhand = 1;
            }
            if (LS.Vorhand === 0) {
                LS.Vorhand = LS.AnzSpieler;
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
}
;

function DEBuchen() {
    'use strict';

    if (xStorno) {
        iSpieler = DS.Spieler[DS.Game.length - 1];
    }

    if (xNeu && !xManu && !xKorr) {
        if (iSPIEL > 0) {
            H.PUNKTE[LS.INA1] = 0;
            H.PUNKTE[LS.INA2] = 0;
        }
    }

    if (LS.AnzSpieler === 4) {
        H.PUNKTE[5] = 0;
        H.PUNKTE[6] = 0;
    } else if (LS.AnzSpieler === 5) {
        H.PUNKTE[6] = 0;
    }

    $('#Spiel,#OK,#DE1,#DE2,#DE3,#DE4,#DE5,#DE6').addClass('ui-disabled');

    $('#OK').focus();
    if (xNeu) {
        if (LS.doppelt >= 1) {
            H.PUNKTE[1] = H.PUNKTE[1] * 2;
            H.PUNKTE[2] = H.PUNKTE[2] * 2;
            H.PUNKTE[3] = H.PUNKTE[3] * 2;
            H.PUNKTE[4] = H.PUNKTE[4] * 2;
            H.PUNKTE[5] = H.PUNKTE[5] * 2;
            H.PUNKTE[6] = H.PUNKTE[6] * 2;
        }
        if (LS.gespielt === 0) {
            LS.Von = new Date();  // Timestamp erstes Spiel
        }
        LS.Bis = new Date();      // Timestamp letztes Spiel
    }

    if (xKorr || xStorno) { // bei Korrektur und Storno
        LS.Spiele[0]--;
        for (var ii = 1; ii <= LS.AnzSpieler; ii++) {
            if (IsInteger(DS.Punkte[ii][I])) {
                DS.Punkte[ii][0] = DS.Punkte[ii][0] - DS.Punkte[ii][I];
                LS.Spiele[ii]--;
            }
        }
    }

    if (!xManu && !xStorno) {
        LS.Spiele[0]++;
        for (var ii = 1; ii <= LS.AnzSpieler; ii++) {
            if ((xNeu && ii !== LS.INA1 && ii !== LS.INA2)
                    || (xKorr && H.PUNKTE[ii] !== '')) {
                LS.Spiele[ii]++;
            } else {
                H.PUNKTE[ii] = '-';
            }
        }
    }

    if (xManu) {
        LS.Von = new Date(LS.Bis); // Bei manueller Erfassung ist VON = BIS
        if (LS.AnzSpieler === 5) {
            LS.gespielt = parseInt(LS.gespielt / 5 * 4);
        } else if (LS.AnzSpieler === 6) {
            LS.gespielt = parseInt(LS.gespielt / 6 * 4);
        }
        for (var ii = 1; ii <= LS.AnzSpieler; ii++) {
            DS.Punkte[ii][0] = H.PUNKTE[ii];
            LS.Spiele[ii] = LS.gespielt;
            if (H.PUNKTE[ii] > 0) {
                DS.Punkte[0][0] = DS.Punkte[0][0] + (parseInt(H.PUNKTE[ii] * 0.66));
            }
        }
        LS.Spiele[0] = LS.gespielt;
    }

    if (xNeu && !xManu) {
        H.PUNKTE[LS.INA1] = '-';
        H.PUNKTE[LS.INA2] = '-';
        H.PUNKTE[LS.Pausierer1] = 'X';
        H.PUNKTE[LS.Pausierer2] = 'X';
    }
    if (xKorr) {
        for (var ii = 1; ii <= LS.AnzSpieler; ii++) {
            if ($('#DE' + ii).val().trim() === '') {
                H.PUNKTE[ii] = '-';
            }
        }
    }

    if (xStorno) {
        LS.gespielt--;
        if (DS.Game[I][0] === '*') {
            LS.doppelt++;
        }
        SetVorhand(-1);
        DS.Storno[I] = true;
    } else if (xManu) {
        I = 1;
        DS.Game[I] = 'Diverse';
        DS.GameI[I] = iDiverse;
    } else {
        if (xKorr) {
            DS.Korr[I] = true;
            DS.Storno[I] = false;
            DS.Game[I] = $('#tSPIEL').text();
        } else {  // xNeu
            DS.Korr[I] = false;
            DS.Storno[I] = false;
            DS.Game[I] = $('#tSPIEL').text();
            if (LS.doppelt >= 1) {
                DS.Game[I] = '*' + DS.Game[I];
            }
            LS.gespielt++;
            SetVorhand(1);
        }
    }

    if (!xStorno) {
        if (!xManu) { // bei Korrektur und Storno
            if (IsInteger(H.PUNKTE[1])) {
                DS.Punkte[1][0] = DS.Punkte[1][0] + H.PUNKTE[1];
            }
            if (IsInteger(H.PUNKTE[2])) {
                DS.Punkte[2][0] = DS.Punkte[2][0] + H.PUNKTE[2];
            }
            if (IsInteger(H.PUNKTE[3])) {
                DS.Punkte[3][0] = DS.Punkte[3][0] + H.PUNKTE[3];
            }
            if (IsInteger(H.PUNKTE[4])) {
                DS.Punkte[4][0] = DS.Punkte[4][0] + H.PUNKTE[4];
            }
            if (IsInteger(H.PUNKTE[5])) {
                DS.Punkte[5][0] = DS.Punkte[5][0] + H.PUNKTE[5];
            }
            if (IsInteger(H.PUNKTE[6])) {
                DS.Punkte[6][0] = DS.Punkte[6][0] + H.PUNKTE[6];
            }
        } else {
            DS.Punkte[1][0] = H.PUNKTE[1];
            DS.Punkte[2][0] = H.PUNKTE[2];
            DS.Punkte[3][0] = H.PUNKTE[3];
            DS.Punkte[4][0] = H.PUNKTE[4];
            DS.Punkte[5][0] = H.PUNKTE[5];
            DS.Punkte[6][0] = H.PUNKTE[6];
        }
    }

    LS.Spieler[0] = DS.Game[I];

    if (xManu) {
        LS.Meldung = 'Es wurde eine ganze Runde eingegeben.';
    }
    if (xNeu || xKorr || xStorno) {
        LS.Ansage = '';
        if (xStorno) {
            LS.Ansage = 'Das letzte Spiel wurde storniert.';
        } else {
            if (xKorr) {
                var nSpiele = 0;
                for (var ii = 1; ii <= I; ii++) {
                    if (!DS.Storno[ii]) {
                        nSpiele++;
                    }
                }
                LS.Ansage = 'Das ';
                if (nSpiele === 1) {
                    LS.Ansage += "erste";
                } else if (nSpiele === 3) {
                    LS.Ansage += "dritte";
                } else if (nSpiele <= 19) {
                    LS.Ansage += nSpiele + "teee";
                } else {
                    LS.Ansage += nSpiele + "stee";
                }
                LS.Ansage += " Spiel wurde korrigiert! ";
            }

            if (LS.DoppelteRunden && LS.doppelt && xNeu) {
                hPunkte = hPunkte * 2;
            }

            if (hCount[0] === 2 && hCount[1] === 2) {
                LS.Ansage += "Jeweils ";
            }
            if (hCount[0] === 3 || hCount[1] === 3) {
                LS.Ansage += "Drei mal ";
            }
            if (hPunkte === 1 || hPunkte === -1) {
                LS.Ansage += "einen Punkt ";
            } else {
                LS.Ansage += Math.abs(hPunkte) + " Punktee ";
            }
            if (hPunkte < 0) {
                LS.Ansage += "minus bei " + LS.VName[hSpieler];
            } else {
                LS.Ansage += 'f' + eval('"\\u00FC"') + 'r ' + LS.VName[hSpieler];  // für
            }
            if (hCount[0] === 2 && hCount[1] === 2) {
                LS.Ansage += " und " + LS.VName[iPartner] + ".";
            } else {
                LS.Ansage += ".";
            }
            if (iSPIEL < 7) {
                if (hCount[0] !== 2 || hCount[1] !== 2) {
                    if ($("#cbSelberrufer").is(':checked')) {
                        iPartner = iSpieler;  // Selberrufer
                    } else {
                        iPartner = 0;         // Renoncie
                    }
                }
            } else {
                iPartner = 0;
            }
            if (LS.DoppelteRunden && LS.doppelt && xNeu) {
                if (iSPIEL === iTrischaker && xNeu) {
                    if (LS.doppelt > 0) {
                        LS.Ansage += ' Es folgen ' + (LS.AnzSpieler + LS.doppelt - 1) + ' doppelte Spiele.';
                    } else {
                        LS.Ansage += ' Ab jetzt folgen ' + LS.AnzSpieler + ' doppelte Spiele.';
                    }
                } else if (mFensterbrett && xNeu) {
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
        }
    }

    if (xNeu && LS.doppelt >= 1) {
        LS.doppelt--;
    }
    if (LS.DoppelteRunden && xNeu) {
        if (iSPIEL === iTrischaker) {
            LS.doppelt += LS.AnzSpieler;
        } else if (mFensterbrett) {
            if (LS.I !== 23) { // Cafe Rathaus
                LS.doppelt += LS.AnzSpieler;
            } else {
                LS.doppelt++;
            }
        }
    }

    localStorage.setItem('Abakus.LS', JSON.stringify(LS));

    if (xStorno) {
        DS.GameI[I] = DS.GameI[I] * -1;
    } else {
        DS.GameI[I] = iSPIEL;
        DS.Spieler[I] = iSpieler;
        DS.Partner[I] = iPartner;
        if (xManu) {
            DS.Game[I] = 'Diverse';
            DS.GameI[I] = iDiverse;
            DS.Spieler[I] = 0;
        }
        DS.Punkte[1][I] = H.PUNKTE[1];
        DS.Punkte[2][I] = H.PUNKTE[2];
        DS.Punkte[3][I] = H.PUNKTE[3];
        DS.Punkte[4][I] = H.PUNKTE[4];
        DS.Punkte[5][I] = H.PUNKTE[5];
        DS.Punkte[6][I] = H.PUNKTE[6];
    }

    localStorage.setItem('Abakus.DS', JSON.stringify(DS));

    if (xManu) {
//        history.back();
        window.location.replace('TischSpeichern.html');
    } else {
        var NEXT = new Object();
        NEXT.AnsageVorlesen = true;
        if (LS.Schreibzettel) {
            NEXT.Seite = 'LI';
        } else {
            NEXT.Seite = 'GR';
        }
        localStorage.setItem('Abakus.NEXT', JSON.stringify(NEXT));
        window.location.replace('Abakus' + LS.AnzSpieler + LS.JeSeite + '.html');
    }
}