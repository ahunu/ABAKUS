
/* global LS, CUPS, I, firebase, STAT, rPfad, FB */

function zumTurnier() {
    if (CUPS.TURNIER[I] && CUPS.TURNIER[I] !== 'Handy' && QUERFORMAT() && (CUPS.BEREadmin[I].indexOf(LS.ME) >= 0 || I <= 3 || I === 55 && LS.ME === '3425')) {
        if (!window.chrome) {
            showEineMeldung('Achtung', 'HTML5 und Javascript werden von deinem<br>Browser nicht ausreichend unterstützt.'
                    + '<br>Verwende einen der folgenden Browser:'
                    + '<br><b>Google Chrome</b>, <b>Opera</b>, <b>Vivaldi</b>, <b>Slimjet</b>'
                    + '<br>oder einen anderen kompatiblen Browser.');
            return;
        }
        LS.ShowCups = I;
        localStorage.setItem('Abakus.LS', JSON.stringify(LS));
        fHref('_Turnier/TU_1_Anmeldung.html?init');
    }
}

function fStartStop(pPruefen) {
    'use strict';
    mTischTurnier = 'Turnier';
    if (LS.I) {
        if (LS.I === I) {
            if (LS.TURADMIN !== LS.ME) {
                showEineMeldung((CUPS.NAME[I] + ':'),
                        'Nur&nbsp;derjenige,&nbsp;der&nbsp;das&nbsp;&nbsp;&nbsp;&nbsp;<br>'
                        + 'Turnier&nbsp;gestartet&nbsp;hat<br>'
                        + 'kann&nbsp;es&nbsp;administrieren.');
                return;
            }
            if (LS.gespielt) {
                showEineMeldung((CUPS.NAME[I] + ':'),
                        'Der letzte Tisch wurde<br>'
                        + 'noch nicht gespeichert.');
                return;
            }
            if (LS.TURRUNDE <= CUPS.RUNDEN[I]) {
                if (!LS.TURGESPIELT) {
                    showEineMeldung((CUPS.NAME[I] + ':'),
                            'Runde ' + LS.TURRUNDE + ' ist noch<br>'
                            + 'ausständig.');
                    return;
                }
            }
        } else {
            if (CUPS.TURNIER[LS.I]) {
                showEineMeldung((CUPS.NAME[I] + ':'),
                        '&nbsp;Bitte&nbsp;zuerst&nbsp;das&nbsp;Turnier&nbsp;&nbsp;&nbsp;<br>'
                        + '&nbsp;<b>' + CUPS.NAME[LS.I] + '</b>&nbsp;beenden.');
                return;
            } else if (pPruefen && LS.gespielt) {
                $('#tTischWasNunTitel').html('Das Turnier starten:');
                if (LS.I !== I) {
                    $("#tsTitel").html(CUPS.NAME[LS.I] + ':').show();
                    $('#tsText').html('<br>Es wurden ' + LS.gespielt + ' Spiele gespielt.');
                } else {
                    $('#tsText').html('Es wurden ' + LS.gespielt + ' Spiele gespielt.');
                }
                $('#tsSpieleLoeschen').html('Spiele l&ouml;schen<br>und Turnier starten');
                $("#pTISCHWASNUN").popup("open").show();
                return;
            }
        }
    }

    if (LS.I !== I) {
        LS.AnzGespeichert = 0;
        LS.AnzSpieler = 0;
        LS.gespielt = 0;
        LS.Spieler = ['', '', '', '', '', '', ''];
        LS.NR = ['', '', '', '', '', '', ''];
        LS.VName = ['', '', '', '', '', '', ''];
        LS.NName = ['', '', '', '', '', '', ''];
        LS.Sterne = ['', '', '', '', '', '', ''];
        LS.Ort = ['', '', '', '', '', '', ''];
        LS.Spiele = [0, 0, 0, 0, 0, 0, 0];
        LS.I = 0;
    }

    $("#ssTitel").html('&nbsp;' + CUPS.NAME[I] + '&nbsp&nbsp;');
    if (LS.I === 0) {
        if (new Date(CUPS.NEXTTERMIN[I]).toDateString() !== new Date().toDateString()) {
            var iWochentag = (new Date).getDay();
            if (CUPS.SPIELTAGE[I][iWochentag] === 'J' && (new Date).getHours() >= CUPS.SPIELEAB[I] - 1) {
                if (CUPS.TURNIER[I]) {
                    var iWoche = parseInt((new Date().getDate() - 1) / 7);
                    if (CUPS.WOCHEN[I][iWoche] !== 'J') {
                        var aWochentag = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
                        showEineMeldung(I, 'Diesen ' + aWochentag[iWochentag] + '<br>wird nicht gespielt.');
                        return;
                    }
                }

                if (CUPS.SPIELTAGE[I][iWochentag] !== 'J') {
                    var aWochentag = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
                    showEineMeldung(I, 'Diesen ' + aWochentag[iWochentag] + '<br>wird nicht gespielt.');
                    return;
                }
            } else {
                if (CUPS.SPIELTAGE[I][iWochentag] === 'J') {
                    showEineMeldung(I, 'Es wird erst ab<br>' + CUPS.SPIELEAB[I] + ' Uhr gespielt.');
                } else {
                    var aWochentag = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
                    showEineMeldung(I, 'An einem ' + aWochentag[iWochentag] + '<br>wird nicht gespielt.');
                }
                return;
            }
        }
        $("#ssText").text('Turnier starten ?');
    } else if (LS.TURRUNDE === CUPS.RUNDEN[I]) {
        $("#ssText").text('Turnier beenden ?');
    } else if (LS.TURRUNDE === 1) {
        $("#ssText").text('Runde 1 beenden ?');
    } else if (LS.TURRUNDE === 2) {
        $("#ssText").text('Runde 2 beenden ?');
    }

    $("#ssMELD").hide();
    $('#bSSja,#bSSnein').removeClass('ui-btn-active');

    setTimeout(function () { // warten auf close von pTISCHWASNUN
        $("#pSTARTSTOP").popup("open").show();
        $("#iTURCODE").val('').focus();
        if (!FB) {
            firebase.initDB(I, 'rw');
        }
    }, 200);
}

function onStartStop() {
    'use strict';
    iTURCODE = getINT($('#iTURCODE').val());
    if (iTURCODE === false) {
        $('#iTURCODE').focus();
        $('#ssMELD').show().html('Der Code ist ung&uuml;ltig!');
        return false;
    }
    if (iTURCODE < 1 || iTURCODE > 9999) {
        $('#iTURCODE').focus();
        $('#ssMELD').show().html('Der Code ist ung&uuml;ltig!');
        return false;
    }
    if (LS.I === 0) {
        $('#iTURCODE').filter(':input:focus').blur();
        $("#pSTARTSTOP").popup("close");
        loadSTAT(I, 'Turnier&nbsp;wird&nbsp;gestartet.', false, TurnierSTARTEN, 0);
    } else {
        if (LS.I === I) {
            if (LS.TURCODE !== iTURCODE) {
                $('#iTURCODE').focus();
                $('#ssMELD').show().html('Der Code ist ung&uuml;ltig!');
                return false;
            }
            $('#iTURCODE').filter(':input:focus').blur();
            $("#pSTARTSTOP").popup("close");
            if (LS.TURRUNDE < CUPS.RUNDEN[LS.I]) {
                showEinenMoment(CUPS.NAME[LS.I], 'Runde&nbsp;' + LS.TURRUNDE + '&nbsp;wird&nbsp;beendet.');
                RundeXbeenden(LS.TURCODE);
            } else {
                loadSTAT(I, 'Turnier&nbsp;wird&nbsp;beendet.', false, TurnierBEENDEN);
            }
        } else {
            showEinenMoment(CUPS.NAME[LS.I], 'Turnier&nbsp;noch&nbsp;nicht&nbsp;beendet.');
        }
    }
    return false;
}

function TurnierSTARTEN(pI) {
    'use strict';
    if (typeof pI === 'undefined') { // beim 1. Aufrug (Callback)
        pI = 1;
    }
    for (; pI < STAT.S.length; pI++) {
        if (STAT.S[pI].SPIELE[3] > 0) {
            break;
        }
    }

    if (pI >= STAT.S.length) {
        TurnierSTARTENend();
        return;
    }

    STAT.S[pI].PUNKTE      [3] = 0;
    STAT.S[pI].SPIELE      [3] = 0;
    STAT.S[pI].ANZSPIELE   [3] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    STAT.S[pI].ANZGEWONNEN [3] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    STAT.S[pI].PKTGEWONNEN [3] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    STAT.S[pI].STOCKERL    [3] = '-';
    STAT.S[pI].PUNKTERx = [];
    STAT.S[pI].SCHREIBER = [];

    var hSTAT = new Object();
    hSTAT.PUNKTE = STAT.S[pI].PUNKTE;
    hSTAT.SPIELE = STAT.S[pI].SPIELE;
    hSTAT.ANZSPIELE = STAT.S[pI].ANZSPIELE;
    hSTAT.ANZGEWONNEN = STAT.S[pI].ANZGEWONNEN;
    hSTAT.PKTGEWONNEN = STAT.S[pI].PKTGEWONNEN;
    if (STAT.S[pI].STOCKERL[0] !== "-") {
        hSTAT.STOCKERL = STAT.S[pI].STOCKERL;
    }
    hSTAT.PUNKTERx = null;
    hSTAT.SCHREIBER = null;

    firebase.database().ref('/00/' + ("000" + I).slice(-3) + '/' + STAT.S[pI].NR)
            .update({
                PUNKTERx: null,
                SCHREIBER: null
            })
            .then(function () {
                TurnierSTARTEN(pI + 1);
            })
            .catch(function (error) {
                showEineDBWarnung(error, 'TurnierSTARTEN()', 'update ' + '/00/' + ("000" + I).slice(-3) + '/' + STAT.S[pI].NR);
            });
}

function TurnierSTARTENend() {
    'use strict';
    var hSTAT = new Object();
    hSTAT.ZULETZTupd = new Date().toISOString();
    if (STAT.ZULETZT) {
        hSTAT.ZULETZT = new Date(new Date(STAT.ZULETZT).getTime() - 60000 * new Date(STAT.ZULETZT).getTimezoneOffset() + 1).toISOString();
    } else {
        hSTAT.ZULETZT = new Date().toISOString();
    }
    hSTAT.TURCODE = iTURCODE;
    hSTAT.TURADMIN = LS.ME;
    hSTAT.TURRUNDE = 1;
    hSTAT.TURTIMESTAMP = firebase.database.ServerValue.TIMESTAMP;

    firebase.database().ref('/00/' + ("000" + I).slice(-3))
            .update(hSTAT)
            .then(function () {
                $('#bStartbutton').addClass('ui-disabled'); //.text("Turnier wurde gestartet");
                $('#dText').html("&nbsp;<img src='" + rPfad + "Icons/OK.png'  width='24' height='24'><span class='L B'>&nbsp;Das Turnier wurde gestartet.</span><br>");
                LS.I = I;
                LS.TURCODE = iTURCODE;
                LS.TURADMIN = LS.ME;
                LS.TURTIMESTAMP = new Date();
                LS.TURRUNDE = 1;
                LS.TURSPIELER = 0;
                LS.TURGESPIELT = 0;
                LS.AnzGespeichert = 0;
                LS.AnzSpieler = 0;
                LS.ShowCups = I;
                localStorage.setItem('Abakus.LS', JSON.stringify(LS));
                // Vorerst muss STAT nicht neu geladen werden
                STAT.TURCODE = iTURCODE;
                STAT.TURADMIN = LS.ME;
                STAT.TURRUNDE = 1;
                STAT.TURTIMESTAMP = new Date();
                localStorage.setItem("Abakus.STAT" + ("000" + I).substr(-3), JSON.stringify(STAT));
                whenSTATloaded(); // neuer Tisch
            })
            .catch(function (error) {
                showEineDBWarnung(error, 'TurnierSTARTENend()', 'STAT update');
            });
}

function RundeXbeenden() {
    'use strict';
    var hSTAT = new Object();
//    hSTAT.ZULETZT  = new Date(new Date().getTime() - 60000 * new Date().getTimezoneOffset()).toISOString();
    hSTAT.ZULETZTupd = new Date().toISOString();
    hSTAT.TURRUNDE = LS.TURRUNDE + 1;

    firebase.database().ref('/00/' + ("000" + I).slice(-3))
            .update(hSTAT)
            .then(function () {
                $('#bRundeXbeenden').addClass('ui-disabled'); //.text("Turnier wurde gestartet");
                $('#dText').html("&nbsp;<img src='" + rPfad + "Icons/OK.png'  width='24' height='24'><span class='L B'>&nbsp;Runde " + LS.TURRUNDE + " wurde beendet.</span><br>");
                LS.TURRUNDE++;
                LS.TURGESPIELT = 0;
                localStorage.setItem('Abakus.LS', JSON.stringify(LS));
                localStorage.removeItem('Abakus.STAT' + ('000' + I).substr(-3));
                hideEinenMoment();
            })
            .catch(function (error) {
                showEineDBWarnung(error, 'RundeXbeenden()', 'STAT update');
            });
}

function TurnierBEENDEN(pI) {
    'use strict';
    if (typeof pI === 'undefined') { // beim 1. Aufrug (Callback)
        pI = 1;
    }
    if (STAT.MAXSPIELE[3] === 0) {  // es wurde kein Spiel gespielt
        TurnierBEENDENendEnd();
        return;
    }

    for (; pI < STAT.S.length; pI++) {
        if (STAT.S[pI].NR !== '0000' && STAT.S[pI].SPIELE[3] > 0) {
            break;
        }
    }

    if (pI >= STAT.S.length) {
        TurnierBEENDENend();
        return;
    }

    var hPunkte1ter = -9999;
    var hPunkte2ter = -9999;
    var hPunkte3ter = -9999;
    var hPunkteAkt = -9999;
    var hPunkteZwi = 0;
//  var aCupPunkte  = [];

    for (var ii = 1; ii < STAT.S.length; ii++) { // Punkte der Stockerplätze errechnen

        if (STAT.S[ii].SPIELE[3] > 0) {

            hPunkteAkt = STAT.S[ii].PUNKTE[3];

            if (hPunkteAkt > hPunkte3ter) {
                hPunkte3ter = hPunkteAkt;
            }
            if (hPunkte3ter > hPunkte2ter) {
                hPunkteZwi = hPunkte2ter;
                hPunkte2ter = hPunkte3ter;
                hPunkte3ter = hPunkteZwi;
            }
            if (hPunkte2ter > hPunkte1ter) {
                hPunkteZwi = hPunkte1ter;
                hPunkte1ter = hPunkte2ter;
                hPunkte2ter = hPunkteZwi;
            }
        }
    }

    function akkSTOCKERL(pString, pPlatz) {
        'use strict';
        var nPlaetze = [0, 0, 0, 0];
        if (pString.length < 5) {
            pString = '0-0-0';
        }

        nPlaetze[1] = parseInt(pString.substr(0, (pString.indexOf('-'))));

        pString = pString.substr(pString.indexOf('-') + 1);
        nPlaetze[2] = parseInt(pString.substr(0, (pString.indexOf('-'))));

        pString = pString.substr(pString.indexOf('-') + 1);
        nPlaetze[3] = parseInt(pString);

        nPlaetze[pPlatz]++;

        return nPlaetze[1].toString() + '-' + nPlaetze[2].toString() + '-' + nPlaetze[3].toString();
    }

    hPunkteAkt = STAT.S[pI].PUNKTE[3];

    var hSTAT = new Object();
    var iJahr = new Date(LS.Von).getFullYear() - 2010;

    if (hPunkteAkt === hPunkte1ter) {
        STAT.S[pI].STOCKERL[0] = akkSTOCKERL(STAT.S[pI].STOCKERL[0], 1);
        STAT.S[pI].STOCKERL[1] = akkSTOCKERL(STAT.S[pI].STOCKERL[1], 1);
        STAT.S[pI].STOCKERL[3] = '1-0-0';
        hSTAT.STOCKERL = STAT.S[pI].STOCKERL;
    } else if (hPunkteAkt === hPunkte2ter) {
        STAT.S[pI].STOCKERL[0] = akkSTOCKERL(STAT.S[pI].STOCKERL[0], 2);
        STAT.S[pI].STOCKERL[1] = akkSTOCKERL(STAT.S[pI].STOCKERL[1], 2);
        STAT.S[pI].STOCKERL[3] = '0-1-0';
        hSTAT.STOCKERL = STAT.S[pI].STOCKERL;
    } else if (hPunkteAkt === hPunkte3ter) {
        STAT.S[pI].STOCKERL[0] = akkSTOCKERL(STAT.S[pI].STOCKERL[0], 3);
        STAT.S[pI].STOCKERL[1] = akkSTOCKERL(STAT.S[pI].STOCKERL[1], 3);
        STAT.S[pI].STOCKERL[3] = '0-0-1';
        hSTAT.STOCKERL = STAT.S[pI].STOCKERL;
    }
    STAT.S[pI].STOCKERL[iJahr] = STAT.S[pI].STOCKERL[1];

    if (typeof STAT.S[pI].CUPPUNKTE[1] !== "object") {
        STAT.S[pI].CUPPUNKTE[1] = [];
    }
    if (STAT.S[pI].CUPPUNKTE[1].length === 0) {
        STAT.S[pI].CUPPUNKTE[1][0] = hPunkteAkt;
    } else {
        if (STAT.S[pI].CUPPUNKTE[1][STAT.S[pI].CUPPUNKTE[1].length - 1] >= hPunkteAkt) {
            STAT.S[pI].CUPPUNKTE[1][STAT.S[pI].CUPPUNKTE[1].length] = hPunkteAkt;
        } else {
            for (var ii = STAT.S[pI].CUPPUNKTE[1].length; ii > 0; ii--) {
                if (STAT.S[pI].CUPPUNKTE[1][ii - 1] < hPunkteAkt) {
                    STAT.S[pI].CUPPUNKTE[1][ii] = STAT.S[pI].CUPPUNKTE[1][ii - 1];
                    STAT.S[pI].CUPPUNKTE[1][ii - 1] = hPunkteAkt;
                } else {
                    break;
                }
            }
        }
    }
    STAT.S[pI].CUPPUNKTE[iJahr] = STAT.S[pI].CUPPUNKTE[1];

    hSTAT.CUPPUNKTE = STAT.S[pI].CUPPUNKTE;

    firebase.database().ref('/00/' + ("000" + I).slice(-3) + '/' + STAT.S[pI].NR)
            .update(hSTAT)
            .then(function () {
                TurnierBEENDEN(pI + 1);
            })
            .catch(function (error) {
                showEineDBWarnung(error, 'TurnierBEENDEN()', 'STAT update');
            });
}

function TurnierBEENDENend() {  // Monatssicherung
    'use strict';
    function getCUPname(pI) {
        'use strict';
        var ret = ("000" + pI).substr(-3) + ' ' + CUPS.NAME[pI];
        return ret.replace(/\.|\#|\$|\[|\]/g, "");
    }

//    STAT.ZULETZT  = new Date(new Date().getTime() - 60000 * new Date().getTimezoneOffset()).toISOString();
    STAT.ZULETZTupd = new Date().toISOString();
    STAT.ANMELDUNGEN = null;
    STAT.TURRUNDE = 0;
    STAT.TURCODE = 0;
    STAT.TURTIMESTAMP = null;

    var hSTAT = new Object();
    hSTAT.ZULETZT = STAT.ZULETZT;
    hSTAT.ZULETZTupd = STAT.ZULETZTupd;
    hSTAT.ANMELDUNGEN = STAT.ANMELDUNGEN;
    hSTAT.TURRUNDE = STAT.TURRUNDE;
    hSTAT.TURCODE = STAT.TURCODE;
    hSTAT.TURTIMESTAMP = STAT.TURTIMESTAMP;

    for (var ii = 1; ii < STAT.S.length; ii++) { // 0000 nicht kopieren
        if (STAT.S[ii]) {
            hSTAT[STAT.S[ii].NR] = STAT.S[ii];
            hSTAT[STAT.S[ii].NR].TIMESTAMP = new Date(new Date(STAT.S[ii].TIMESTAMP).getTime() - 60000 * new Date(STAT.S[ii].TIMESTAMP).getTimezoneOffset()).toISOString();
        }
    }
    firebase.database().ref('/' + ('00' + (((new Date()).getMonth()) + 1)).slice(-2) + '/' + getCUPname(I))
            .set(hSTAT, function (error) {   // ACHTUNG !!! .set(...) ist gefählich wie sonst nichts
                if (error) {
                    showEineDBWarnung(error, 'TurnierBEENDENend()', 'STAT set');
                } else {
                    TurnierBEENDENendEnd();
                }
            });
}

function TurnierBEENDENendEnd() {
    'use strict';
    var hSTAT = new Object();
//    hSTAT.ZULETZT   = new Date(new Date().getTime() - 60000 * new Date().getTimezoneOffset()).toISOString();
    hSTAT.ZULETZTupd = new Date().toISOString();
    hSTAT.ANMELDUNGEN = null;
    hSTAT.TURCODE = 0;
    hSTAT.TURADMIN = '';
    hSTAT.TURRUNDE = 0;
    hSTAT.TURTIMESTAMP = null;

    firebase.database().ref('/00/' + ("000" + I).slice(-3))
            .update(hSTAT)
            .then(function () {
                $('#bTurnierBeenden').addClass('ui-disabled'); //.text("Turnier wurde gestartet");
                if (STAT.MAXSPIELE[3] > 0) {  // es wurde kein Spiel gespielt
                    $('#dText').html("&nbsp;<img src='" + rPfad + "Icons/OK.png'  width='24' height='24'><span class='L B'>&nbsp;Das Turnier wurde beendet.</span><br>");
                } else {
                    $('#dText').html("&nbsp;<img src='" + rPfad + "Icons/Achtung.png'  width='24' height='24'><span class='L B'>&nbsp;Es wurde kein Spiel gespielt.</span><br>"
                            + "&nbsp;<img src='" + rPfad + "Icons/OK.png'  width='24' height='24'><span class='L B'>&nbsp;Das Turnier wurde beendet.</span><br>");
                }
                LS.I = 0;
                LS.TURCODE = 0;
                LS.TURADMIN = '';
                LS.TURRUNDE = 0;
                LS.TURSPIELER = 0;
                LS.TURGESPIELT = 0;
                LS.ShowCups = I;
                localStorage.setItem('Abakus.LS', JSON.stringify(LS));
                localStorage.removeItem('Abakus.STAT' + ('000' + I).substr(-3));
                $('#bZuMeinemTisch').hide();
                hideEinenMoment();
            })
            .catch(function (error) {
                showEineDBWarnung(error, 'TurnierBEENDENendEnd()', 'STAT update');
            });
}