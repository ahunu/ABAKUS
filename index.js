
/* global getVersionsDatum, firebase, pSeite, pCUP, SPIELERext, stCup, stAnzSpalten, setFont, SORT */

var PC = false;
var DB = new Object();
var FB = undefined;
var AnmeldungGestartet = false;
var iTURCODE = 0;
var LS = new Object();
var CUPS = new Object();
var STAT = new Object();
var TERMINE = [];
var I = 0;
var hShowCup = 0;
var hShowCupText = false;
var iPfad = 'Icons/';
var rPfad = '';
var mTischTurnier = '';
var mHausruckAktiv = false;
var mRaiffeisenAktiv = false;
var mTirolAktiv = true;
var mSauwaldAktiv = true;
var hHeute = myDateString(new Date());
var anzVersuche = 0;
var myJBox = null;
var myJTip = null;
var daysOfWeek = ["So.,", "Mo.,", "Di.,", "Mi.,", "Do.,", "Fr.,", "Sa.,"];
var monthsOfYear = ["Jän.", "Feb.", "März", "April", "Mai", "Juni", "Juli", "Aug.", "Sep.", "Okt.", "Nov.", "Dez."];
var stLastZitat = [];
var meinStellvertreter = '3244';
var stFilter = '';

const iRufer = 1;
const iSolorufer = 2;
const iPagatrufer = 3;
const iUhurufer = 4;
const iKakadurufer = 5;
const iQuapilrufer = 6;
const iSelberrufer = 7;
const i6er = 8;
const i3er = 9;
const iSolo3er = 10;
const iFarben3er = 11;
const iFarbensolo = 12;
const iTrischaker = 13;
const iPiZwiccolo = 14;
const iBettler = 15;
const iPiZwiccoloOvert = 16;
const iBettlerOvert = 17;
const iPagat = 18;
const iUhu = 19;
const iKakadu = 20;
const iQuapil = 21;
const iV = 22;
const iTrull = 23;
const i4Koenige = 24;
const iUltimo = 25;
const iValat = 26;
const iAbsolut = 27;
const iXY = 28;

function IsInteger(value) {
    if ((parseFloat(value) === parseInt(value)) && !isNaN(value)) {
        return true;
    } else {
        return false;
    }
}

function zumTurnier() {
    if (CUPS.TURNIER[I] && CUPS.TURNIER[I] !== 'Handy' && QUERFORMAT() && (CUPS.BEREadmin[I].indexOf(LS.ME) >= 0 || I <= 3 || I === 55 && LS.ME === '3425')) {
        if (!window.chrome) {
            showEineMeldung('Achtung', 'HTML5 und Javascript werden von deinem<br>Browser nicht ausreichend unterstützt.'
                    + '<br>Verwende einen der folgenden Browser:'
                    + '<br><b>Google Chrome</b>, <b>Opera</b>, <b>Vivaldi</b>'
                    + '<br>oder einen anderen kompatiblen Browser.');
            return;
        }
        LS.ShowCups = I;
        localStorage.setItem('Abakus.LS', JSON.stringify(LS));
        fHref('_Turnier/TU_1_Anmeldung.html?init');
    }
}

function fStartStop(pCup, pPruefen) {
    'use strict';
    if (pCup) {
        I = pCup;
    }
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
                $('#tsSpieleLoeschen').html('Spiele löschen<br>und Turnier starten');
                if (LS.gespielt) {
                    $('#tsSpieleSpeichern').removeClass('ui-disabled');
                } else {
                    $('#tsSpieleSpeichern').addClass('ui-disabled');
                }
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
    showEinenMoment(LS.I, 'Runde ' + LS.TURRUNDE + ' wird beendet.');
//    hSTAT.ZULETZT  = new Date(new Date().getTime() - 60000 * new Date().getTimezoneOffset()).toISOString();
    hSTAT.ZULETZTupd = new Date().toISOString();
    hSTAT.TURRUNDE = LS.TURRUNDE + 1;

    firebase.database().ref('/00/' + ("000" + I).slice(-3))
            .update(hSTAT)
            .then(function () {
                $('#bRundeXbeenden').addClass('ui-disabled'); //.text("Turnier wurde gestartet");
                $('#dText').html("&nbsp;<img src='" + rPfad + "Icons/OK.png'  width='24' height='24'><span class='L B'>&nbsp;Runde " + LS.TURRUNDE + " wurde beendet.</span><br>");
                LS.Meldung = 'Runde ' + LS.TURRUNDE + ' wurde beendet.';
                LS.TURRUNDE++;
                LS.TURGESPIELT = 0;
                localStorage.setItem('Abakus.LS', JSON.stringify(LS));
                localStorage.removeItem('Abakus.STAT' + ('000' + I).substr(-3));
                hideEinenMoment();
                window.location.reload(false); // Da mit initSeite1 das Scroll in diesem Fall nicht funktioniert.
            })
            .catch(function (error) {
                showEineDBWarnung(error, 'RundeXbeenden()', 'STAT update');
            });
}

function TurnierBEENDEN(pI) {
    'use strict';
    if (typeof pI === 'undefined') { // beim 1. Aufrug (Callback)
        showEinenMoment(LS.I, 'Das Turnier wird beendet.');
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
                CUPS.MELDSTAT[I] = STAT.S[ii].VNAME + ' ' + STAT.S[ii].NNAME + ' gewinnt am ' + getDateString(LS.TURTIMESTAMP) + '.';
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
    hSTAT.ZULETZTupd = new Date().toISOString();
    hSTAT.ANMELDUNGEN = null;
    hSTAT.TURCODE = 0;
    hSTAT.TURADMIN = '';
    hSTAT.TURRUNDE = 0;
    hSTAT.TURTIMESTAMP = null;

    firebase.database().ref('/00/' + ("000" + I).slice(-3))
            .update(hSTAT)
            .then(function () {
                firebase.database().ref('/00/CUPS/' + ("000" + I).slice(-3))
                        .update({MELDSTAT: CUPS.MELDSTAT[I]})
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
                            LS.Meldung = 'Das Turnier wurde beendet.';
                            localStorage.setItem('Abakus.LS', JSON.stringify(LS));
                            localStorage.removeItem('Abakus.STAT' + ('000' + I).substr(-3));
                            hideEinenMoment();
                            window.location.reload(false); // Da mit initSeite1 das Scroll in diesem Fall nicht funktioniert.
                        })
                        .catch(function (error) {
                            showEineDBWarnung(error, 'TurnierBEENDENendEnd()', 'CUPS.MELDSTAT update');
                        });
            })
            .catch(function (error) {
                showEineDBWarnung(error, 'TurnierBEENDENendEnd()', 'STAT update');
            });
}

function fEinNeuerTisch(pCup) {
    'use strict';
    if (navigator.userAgent.match(/Android/i) && CUPS.ABVERSION > getVersion()) {
        showEinenFehler('Diese App ist veraltet!&nbsp;&nbsp;&nbsp;&nbsp;', "Suche im Play Store nach<br>'<b>Die Tarock-App</b>' und<br>aktualisiere diese App.");
        return;
    }
    if (pCup) {
        I = pCup;
    }
    if (LS.I && LS.I !== I) {
        if (CUPS.TURNIER[I] === 'Handy'
                && (CUPS.BEREadmin[I].indexOf(LS.ME) >= 0 || I <= 3)
                && mTischTurnier === 'Turnier') {
            fStartStop(I, false); // der Admin will das Turnier starten
            return; // very important
        }
    }

    var iWochentag = (new Date()).getDay();
    var iVortag = iWochentag - 1;
    if (iWochentag === 0) {
        iVortag = 6;
    } else {
        iVortag = iWochentag - 1;
    }

    if ((CUPS.TYP[I] === 'CUP' || CUPS.TYP[I] === 'ET' || CUPS.TYP[I] === 'MT') && !QUERFORMAT()) {
        if (I > 4) {
            var hOK = false;
            for (var termin in CUPS.TERMINE) {
                if (CUPS.TERMINE[termin].CUP === I && CUPS.TERMINE[termin].DATUM === hHeute) {
                    hOK = true;
                    break;
                }
            }
            if (!hOK) {
                showEineMeldung(I, 'Laut Turnierkalender findet<br>heute kein Turnier statt.');
                return;
            }
        }
    } else if (new Date(CUPS.NEXTTERMIN[I]).toDateString() === new Date().toDateString()) {
        if (new Date().getHours() >= CUPS.SPIELEAB[I] - 1) {
        } else {
            showEineMeldung(I, 'Es wird erst ab<br>' + CUPS.SPIELEAB[I] + ' Uhr gespielt.');
            return;
        }
    } else {
        if (CUPS.SPIELTAGE[I][iWochentag] === 'J'
                || CUPS.SPIELTAGE[I][iVortag] === 'J' && (new Date()).getHours() <= 6) {
            if (CUPS.TURNIER[I]) {
                var iWoche = parseInt((new Date().getDate() - 1) / 7);
                if (CUPS.WOCHEN[I][iWoche] !== 'J') {
                    var aWochentag = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
                    showEineMeldung(I, 'Diesen ' + aWochentag[iWochentag] + '<br>wird nicht gespielt.');
                    $(this).removeClass('ui-disabled');
                    return;
                }
            }
            if (CUPS.SPIELTAGE[I][iWochentag] === 'J' && (new Date()).getHours() >= CUPS.SPIELEAB[I] - 1
                    || CUPS.SPIELTAGE[I][iVortag] === 'J' && (new Date()).getHours() <= 6) {
            } else {
                showEineMeldung(I, 'Es wird erst ab<br>' + CUPS.SPIELEAB[I] + ' Uhr gespielt.');
                return;
            }
        } else {
            var aWochentag = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
            showEineMeldung(I, 'An einem ' + aWochentag[iWochentag] + '<br>wird nicht gespielt.');
            return;
        }
    }

    if (LS.I && LS.I !== I) {
        if (CUPS.TURNIER[LS.I]) {
            if (CUPS.TURNIER[LS.I] === 'Handy') {
                showEineMeldung(I, '&nbsp;Bitte&nbsp;zuerst&nbsp;das&nbsp;Turnier&nbsp;&nbsp;&nbsp;<br>'
                        + '&nbsp;<b>' + CUPS.NAME[LS.I] + '</b>&nbsp;beenden.');
                return;
            } else {
                var hNAME = '';
                for (var termin in CUPS.TERMINE) {
                    if (CUPS.TERMINE[termin].CUP === LS.I && CUPS.TERMINE[termin].DATUM === hHeute) {
                        hNAME = CUPS.TERMINE[termin].NAME;
                        break;
                    }
                }
                if (hNAME) {
                    showEineMeldung(I, '&nbsp;Bitte&nbsp;zuerst&nbsp;den&nbsp;Tisch&nbsp;des&nbsp;Turniers&nbsp;<br>'
                            + '&nbsp;<b>' + hNAME + '</b>&nbsp;speichern.');
                    return;
                }
            }
        }
    }

    if (LS.I === 0
            || LS.gespielt < 1 && (
                    LS.I === I
                    || !CUPS.TURNIER[I])) {

        if (!CUPS.TURNIER[I] && (CUPS.TYP[I] === 'PR' || I === 1) && localStorage.getItem("Abakus.STAT" + ("000" + I).substr(-3))) {
            LS.LoadCups = I * -1; // - = neuer Tisch
            localStorage.setItem('Abakus.LS', JSON.stringify(LS));
            fHref('Abakus/Anmeldung.html');
        } else {
            if (CUPS.TYP[I] === "CUP" || CUPS.TYP[I] === "ET" || CUPS.TYP[I] === "MT") {
                loadTURNIER(I, hHeute, 'Das Turnier wird geladen.', hHeute + ', neuer Tisch');
            } else {
                if (CUPS.TURNIER[I]) {
                    loadSTAT(I, 'Spieler werden geladen.');
                } else {
                    loadSTAT(I, 'Spieler werden aktualisiert.', I);
                }
            }
        }
    } else {
        $('#tTischWasNunName').html(CUPS.NAME[I] + '&nbsp&nbsp;');
        if (LS.I !== I) {
            $("#tsTitel").html(CUPS.NAME[LS.I] + ':').show();
            $('#tsText').html('<br>Es wurden ' + LS.gespielt + ' Spiele gespielt.');
        } else {
            $('#tsText').html('Es wurden ' + LS.gespielt + ' Spiele gespielt.');
        }
        if (mTischTurnier === 'Turnier') {
            $('#tTischWasNunTitel').html('Das Turnier starten:');
            $('#tsDieDen').html('die');
            $('#tsSpieleLoeschen').html('Spiele löschen<br>und Turnier starten');
        } else {
            $('#tTischWasNunTitel').html('Ein neuer Tisch:');
            $('#tsDieDen').html('die');
            $('#tsSpieleLoeschen').html('Spiele löschen<br>und neuen Tisch');
        }
        if (LS.gespielt) {
            $('#tsSpieleSpeichern').removeClass('ui-disabled');
        } else {
            $('#tsSpieleSpeichern').addClass('ui-disabled');
        }
        $("#pTISCHWASNUN").popup("open").show();
    }
}

function fTischLoeschen(pLoeschen) {
    if (pLoeschen) {
        $("#pTISCHWASNUN").popup("close");
        var hLog = CUPS.NAME[LS.I];
        hLog += '<br>Es wurden ' + LS.gespielt + ' Spiele gespielt.';
        if (LS.gespielt) {
            DS = JSON.parse(localStorage.getItem('Abakus.DS'));
            hLog += "<table data-role='table' id='tSpielerPunkte' data-mode='columntoggle' class='ui-body-d ui-shadow table-stripe ui-responsive' data-column-btn-text=''>"
                    + "<thead>"
                    + "<tr sclass='ui-bar-d'>"
                    + "<th>&nbsp;Spieler"
                    + "</th>"
                    + "<th class=TC>Punkte&nbsp;"
                    + "</th>"
                    + "</tr>";
            for (var i = 1; i <= 6; i++) {
                if (LS.Spieler[i]) {
                    hLog += '<tr><td>&nbsp;' + LS.NName[i] + ' ' + LS.VName[i] + LS.Sterne[i] + '</td><td class=TC>' + DS.Punkte[i][0] + '&nbsp;</td></tr>';
                } else if (LS.Spiele[i] !== 0) {
                    hLog += '<tr><td class="cRot B">&nbsp;???</td><td class=TR>' + DS.Punkte[i][0] + '&nbsp;</td></tr>';
                }
            }
            hLog += "<tbody>"
                    + "</tbody>"
                    + "</table>"
                    + 'Der Tisch wurde gelöscht.';
        } else {
            hLog += '<br>Der Tisch wurde gelöscht.';
        }
        writeLOG(hLog);
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
//        LS.TURRUNDE = 0; // Bei Spontanturnier nach Tisch löschen nicht erlaupt llll llll
        if ('TURTISCH' in LS) {
            delete LS.TURTISCH;
        }
        LS.Meldung = "Der Tisch wurde gelöscht!";
        if (CUPS.TURNIER[I] === 'Handy') {
            // Sonst kann der Admin das Turnier nicht beenden.
        } else {
            LS.I = 0;
        }
        localStorage.setItem('Abakus.LS', JSON.stringify(LS));
        setTimeout(function () {
            initSeite1();
        }, 200);
    } else {
        $('#tTischWasNunName').html(CUPS.NAME[LS.I] + '&nbsp&nbsp;');
        if (LS.I !== I) {
            $("#tsTitel").html(CUPS.NAME[LS.I] + ':').show();
            $('#tsText').html('<br>Es wurden ' + LS.gespielt + ' Spiele gespielt.');
        } else {
            $('#tsText').html('Es wurden ' + LS.gespielt + ' Spiele gespielt.');
        }
        $('#tTischWasNunTitel').html('Den Tisch löschen:');
        if (CUPS.TYP[I] === "CUP" || CUPS.TYP[I] === "ET" || CUPS.TYP[I] === "MT") {
            $('#tsSpieleSpeichern').addClass('ui-disabled');
        }
        $('#tsDieDen').html('den');
        $('#tsSpieleLoeschen').html('Tisch löschen');
        if (LS.gespielt) {
            $('#tsSpieleSpeichern').removeClass('ui-disabled');
        } else {
            $('#tsSpieleSpeichern').addClass('ui-disabled');
        }
        $("#pMEINTISCH").popup("close");
        $("#pTISCHWASNUN").popup("open").show();
    }
}

function getCupText() {
    var html = '';
    if (LS.Meldung) {
        html += '<div class="cRot B">' + LS.Meldung + '</div><br>';
        if (!QUERFORMAT()) {
            showEineNotiz(LS.Meldung);
        }
        LS.Meldung = '';
        localStorage.setItem('Abakus.LS', JSON.stringify(LS));
    }
    if (!(I === LS.I && LS.AnzSpieler) || QUERFORMAT()) {
        if (CUPS.TEXT1[I]) {
            html += CUPS.TEXT1[I];
        }
    }
    if (LS.I === I && LS.TURRUNDE > 0) {
        if (LS.TURRUNDE === 1) {
            if (LS.TURGESPIELT === 0) {
                html += "<br><img src='" + iPfad + "OK.png'  width='24' height='24'><span class=M>&nbsp;&nbsp;<b>Turnier wurde gestartet.</b></span>";
            } else {
                html += "<br><img src='" + iPfad + "Achtung.png'  width='24' height='24'><span class=M>&nbsp;&nbsp;<b>Runde 1 noch nicht beendet.</b></span>";
            }
        } else if (LS.TURGESPIELT === 0) {
            html += "<br><img src='" + iPfad + "OK.png'  width='24' height='24'><span class=M>&nbsp;&nbsp;<b>Runde " + LS.TURRUNDE + " wird gespielt.</b></span>";
        } else if (LS.TURSPIELER === LS.TURGESPIELT) {
            html += "<br><img src='" + iPfad + "Achtung.png'  width='24' height='24'><span class=M>&nbsp;&nbsp;<b>" + ((LS.TURRUNDE === 3) ? "Turnier" : "Runde " + LS.TURRUNDE) + " noch nicht beendet.</b></span>";
        } else {
            var hText;
            if (LS.TURSPIELER - LS.TURGESPIELT < 8) {
                hText = "Ein Tisch ausst&auml;ndig.";
            } else {
                hText = parseInt((LS.TURSPIELER - LS.TURGESPIELT) / 4) + " Tische ausst&auml;ndig.";
            }
            html += "<br><img src='" + iPfad + "Achtung.png'  width='24' height='24'><span class=M>&nbsp;&nbsp;<b>Runde " + LS.TURRUNDE + ":&nbsp;&nbsp;&nbsp;" + hText + "</b></span>";
        }
    }
    return html;
}

function getTurnierButtons() {
    var html = '';
    if (CUPS.BEREadmin[I].indexOf(LS.ME) >= 0 || I <= 3) {
        if (CUPS.TURNIER[I] === 'Handy') {

            var iWochentag = (new Date()).getDay();
            var iVortag = iWochentag - 1;
            if (iWochentag === 0) {
                iVortag = 6;
            } else {
                iVortag = iWochentag - 1;
            }

            var cClass = '';
            if (LS.I === I && LS.TURADMIN === LS.ME) {
            } else {
                if (new Date(CUPS.NEXTTERMIN[I]).toDateString() !== new Date().toDateString()) {
                    if (CUPS.SPIELTAGE[I][iWochentag] === 'J'
                            || CUPS.SPIELTAGE[I][iVortag] === 'J' && (new Date()).getHours() <= 6) {
                        var iWoche = parseInt((new Date().getDate() - 1) / 7);
                        //                  if (I ===  8 && new Date().getDate() >= 15) {
                        if (CUPS.WOCHEN[I][iWoche] !== 'J') {
                            cClass = ' ui-disabled';  // nicht in dieser Woche
                        }
                        if (CUPS.SPIELTAGE[I][iWochentag] === 'J' && (new Date()).getHours() + 1 >= CUPS.SPIELEAB[I] // 1 Stunde Toleranz
                                || CUPS.SPIELTAGE[I][iVortag] === 'J' && (new Date()).getHours() <= 6) {
                        } else {
                            cClass = ' ui-disabled';
                            // Es wird erst ab "17" Uhr gespielt.
                        }
                    } else {
                        cClass = ' ui-disabled';
                        // An einen "Freitag" wird nicht gespielt.
                    }
                }
            }

            if (LS.I === 0 && !LS.TURRUNDE || (LS.I !== 0 && LS.I !== I)) {
                html += "<a onclick='fStartStop(0, true);' data-rel='popup' data-theme=e data-position-to='window' data-role='button' data-inline='true' data-mini='true' class='L" + cClass + "' data-transition='pop' id=bStartbutton>&nbsp;Turnier starten&nbsp;</a>";
            } else if (LS.I === I && (LS.TURADMIN === LS.ME || LS.I < 5)) {
                if (LS.TURRUNDE < CUPS.RUNDEN[I]) {
                    html += "<a onclick='fStartStop(0, true);' data-rel='popup' data-theme=e data-position-to='window' data-role='button' data-inline='true' data-mini='true' class='L" + cClass + "' data-transition='pop' id=bRundeXbeenden>&nbsp;Runde " + LS.TURRUNDE + " beenden&nbsp;</a>";
                } else {
                    html += "<a onclick='fStartStop(0, true);' data-rel='popup' data-theme=e data-position-to='window' data-role='button' data-inline='true' data-mini='true' class='L" + cClass + "' data-transition='pop' id=bTurnierBeenden>&nbsp;Turnier beenden&nbsp;</a>";
                }
            }
        }
    }
    if ((CUPS.TYP[I] !== 'CUP' && CUPS.BEREadmin[I].indexOf(LS.ME) >= 0)
            || LS.ME === '3425'
            || I <= 2) {
        html += "<a onclick='hrefParameterAendern(" + I + ");' data-role='button' data-inline='true' data-mini='true' >&nbsp;Parameter ändern&nbsp;</a>";
    }
    return html + '<br><br>';
}

function hrefParameterAendern(pCup) {
    'use strict';
    LS.ShowCups = pCup;
    localStorage.setItem('Abakus.LS', JSON.stringify(LS));
    fHref('Abakus/ParameterAendern.html');
}

function checkNeuerTisch() {
    'use strict';
    var hGefunden = false;
    if (I !== 3) {  // Ein PC-Turnier kann an jeden Tag stattfinden
        for (var termin in CUPS.TERMINE) {
            if (CUPS.TERMINE[termin].CUP === I && CUPS.TERMINE[termin].DATUM === hHeute) {
                hGefunden = true;
                break;
            }
        }
        if (!hGefunden) {
            showEineWarnung(I, 'Laut Turnierkalender findet<br>heute kein Turnier statt.');
            return false;
        }
    }
    if (!STAT._AKTTURNIER) {
        if (STAT[hHeute]) {
            showEineWarnung(I, 'Das Turnier wurde bereits beendet.');
            return false;
        } else {
            showEineWarnung(I, 'Das Turnier wurde noch nicht gestartet.', 'Hab etwas Geduld.');
            return false;
        }
    }
    if (STAT._AKTTURNIER._RUNDE > 3) {
        showEineWarnung(I, 'Das Turnier wurde bereits beendet.');
        return;
    }
    if (!STAT._AKTTURNIER[LS.ME]) {
        showEineWarnung(I, 'Du bist nich angemeldet.', 'Informiere den Veranstalter.');
        return false;
    }
    if (STAT._AKTTURNIER._RUNDE === 3 && STAT._AKTTURNIER[LS.ME][3] !== '-') {
        showEineWarnung(I, 'Du hast bereits alle Runden gespielt.');
        return false;
    }
    var nMinSeitRundeStart = parseInt((Date.now() - STAT._AKTTURNIER._RUNDESTART) / 60000);
    if (nMinSeitRundeStart < -35) {
        showEineWarnung(I, ' Die Uhr am Handy geht nach<br>oder die am Turnier-PC vor.', 'Korrigiere die Uhrzeit.');
        return false;
    }
    if (nMinSeitRundeStart > 240) {
        showEineWarnung(I, ' Die Uhr am Handy geht vor<br>oder die am Turnier-PC nach.', 'Korrigiere die Uhrzeit.');
        return false;
    }
    if (STAT._AKTTURNIER._RUNDE === 3 && nMinSeitRundeStart > 75) {
        showEineWarnung(I, 'Das Turnier wird bald beendet.');
        return;
    }

    LS.I = I;
    LS.CupName = CUPS.NAME[LS.I];
    LS.Regeln = CUPS.REGELN[LS.I];
    LS.Spieltyp = CUPS.TYP[LS.I];
    LS.SpieleJeRunde = CUPS.SPJERUNDE[LS.I];
    LS.DoppelteRunden = false;
    LS.Tarif = new Array(19);
    LS.Vorhand = 0;
    LS.Geber = 0;
    LS.INA1 = 0;
    LS.INA2 = 0;
    LS.AnzSpieler = 0;
    LS.Pausierer1 = 0;
    LS.Pausierer2 = 0;
    LS.gespielt = 0;
    LS.AnzGespeichert = 0;
    LS.doppelt = 0;
    LS.JeSeite = '';
    LS.NR = ['', '', '', '', '', '', ''];
    LS.Spieler = ['', '', '', '', '', '', ''];
    LS.VName = ['', '', '', '', '', '', ''];
    LS.NName = ['', '', '', '', '', '', ''];
    LS.Sterne = ['', '', '', '', '', '', ''];
    LS.Ort = ['', '', '', '', '', '', ''];
    LS.Spiele = [0, 0, 0, 0, 0, 0, 0];
    LS.Von = new Date();
    LS.Bis = new Date();
    LS.TURRUNDE = STAT._AKTTURNIER._RUNDE;
    LS.TURTISCH = 0;
    var hTurnier = STAT._AKTTURNIER._TURNIER;
    var SPIELERnr = JSON.parse(localStorage.getItem('Abakus.SPIELERnr'));
    if (nMinSeitRundeStart > 60) {
        LS.TURRUNDE++;
    }

    if (STAT[hTurnier][LS.ME]) {
        if (STAT[hTurnier][LS.ME][LS.TURRUNDE] !== '?'
                && STAT[hTurnier][LS.ME][LS.TURRUNDE] !== '-') {
            if (LS.TURRUNDE === 3) {
                showEineWarnung(I, 'Du hast Runde ' + LS.TURRUNDE + ' bereits gespielt.');
                return;
            } else {
                LS.TURRUNDE++;
            }
        }
    }

    if (STAT._AKTTURNIER[LS.ME][LS.TURRUNDE + 6] === 0
            || STAT._AKTTURNIER[LS.ME][LS.TURRUNDE + 6] === '-') {
        showEineWarnung(I, 'Du bist nicht angemeldet.', 'Informiere den Veranstalter.');
        return;
    }

    if (STAT._AKTTURNIER[LS.ME][LS.TURRUNDE + 6] === '?') {
        showEineWarnung(I, 'Die Runde ' + LS.TURRUNDE + ' wurde<br>noch nicht freigegeben.',
                'Warte auf das OK<br>der Turnierleitung.');
        return;
    }

    LS.TURTISCH = STAT._AKTTURNIER[LS.ME][LS.TURRUNDE + 6];
    var SORT = [];
    for (var spieler in STAT._AKTTURNIER) {
        if (spieler[0] !== '_') {
            SORT[SORT.length] = STAT._AKTTURNIER[spieler][0] + ';' + spieler;
        }
    }
    SORT.sort();
    var nAngemeldet = 0;
    for (var i = 0; i < SORT.length; i++) {
        spieler = SORT[i].substr(SORT[i].lastIndexOf(';') + 1);
        if (spieler === LS.ME || nAngemeldet) { // Mich und Spieler nach mir anmelden
            nAngemeldet++;
            if (STAT._AKTTURNIER[spieler][LS.TURRUNDE + 6] === LS.TURTISCH) {
                if (STAT._AKTTURNIER[spieler][LS.TURRUNDE] !== '-') {
                    showEineWarnung(I, spieler + ' hat Runde ' + LS.TURRUNDE + ' bereits gespielt.');
                    return;
                }
                if (spieler.length === 4) {
                    blert(spieler, SPIELERnr[spieler][1], SPIELERnr[spieler][0], STAT._AKTTURNIER[spieler][6], '');
                } else {
                    blert(spieler, null, null, null, '');
                }
            }
        }
    }

    for (var i = 0; i < SORT.length; i++) {
        spieler = SORT[i].substr(SORT[i].lastIndexOf(';') + 1);
        if (spieler !== LS.ME) { // Die Spieler vor mir anmelden
            if (STAT._AKTTURNIER[spieler][LS.TURRUNDE + 6] === LS.TURTISCH) {
                if (STAT._AKTTURNIER[spieler][LS.TURRUNDE] !== '-') {
                    showEineWarnung(I, spieler + ' hat Runde ' + LS.TURRUNDE + ' bereits gespielt.');
                    return;
                }
                if (spieler.length === 4) {
                    blert(spieler, SPIELERnr[spieler][1], SPIELERnr[spieler][0], STAT._AKTTURNIER[spieler][6], '');
                } else {
                    blert(spieler, null, null, null, '');
                }
            }
        } else {
            break;
        }
    }


    LS.Vorhand = (Date.now() % (LS.AnzSpieler) + 1);
// onOK aus Anmeldung.js

    LS.VName[1] = LS.VName[1].trim();
    LS.VName[2] = LS.VName[2].trim();
    LS.VName[3] = LS.VName[3].trim();
    LS.VName[4] = LS.VName[4].trim();
    LS.VName[5] = LS.VName[5].trim();
    LS.VName[6] = LS.VName[6].trim();
    LS.Spieler[1] = LS.VName[1];
    LS.Spieler[2] = LS.VName[2];
    LS.Spieler[3] = LS.VName[3];
    LS.Spieler[4] = LS.VName[4];
    LS.Spieler[5] = LS.VName[5];
    LS.Spieler[6] = LS.VName[6];
    if ((LS.VName[1].substr(0, 3) === LS.VName[2].substr(0, 3))
            || (LS.VName[1].substr(0, 3) === LS.VName[3].substr(0, 3))
            || (LS.VName[1].substr(0, 3) === LS.VName[4].substr(0, 3))
            || (LS.VName[1].substr(0, 3) === LS.VName[5].substr(0, 3))
            || (LS.VName[1].substr(0, 3) === LS.VName[6].substr(0, 3))) {
        if (LS.VName[1].substr(0, 3) === LS.VName[2].substr(0, 3)) {
            LS.Spieler[2] = LS.NName[2].substr(0, 1) + '.' + LS.VName[2];
        }
        if (LS.VName[1].substr(0, 3) === LS.VName[3].substr(0, 3)) {
            LS.Spieler[3] = LS.NName[3].substr(0, 1) + '.' + LS.VName[3];
        }
        if (LS.VName[1].substr(0, 3) === LS.VName[4].substr(0, 3)) {
            LS.Spieler[4] = LS.NName[4].substr(0, 1) + '.' + LS.VName[4];
        }
        if (LS.VName[1].substr(0, 3) === LS.VName[5].substr(0, 3)) {
            LS.Spieler[5] = LS.NName[5].substr(0, 1) + '.' + LS.VName[5];
        }
        if (LS.VName[1].substr(0, 3) === LS.VName[6].substr(0, 3)) {
            LS.Spieler[6] = LS.NName[6].substr(0, 1) + '.' + LS.VName[6];
        }
        LS.Spieler[1] = LS.NName[1].substr(0, 1) + '.' + LS.VName[1];
    }

    if ((LS.VName[2].substr(0, 3) === LS.VName[3].substr(0, 3))
            || (LS.VName[2].substr(0, 3) === LS.VName[4].substr(0, 3))
            || (LS.VName[2].substr(0, 3) === LS.VName[5].substr(0, 3))
            || (LS.VName[2].substr(0, 3) === LS.VName[6].substr(0, 3))) {
        if (LS.VName[2].substr(0, 3) === LS.VName[3].substr(0, 3)) {
            LS.Spieler[3] = LS.NName[3].substr(0, 1) + '.' + LS.VName[3];
        }
        if (LS.VName[2].substr(0, 3) === LS.VName[4].substr(0, 3)) {
            LS.Spieler[4] = LS.NName[4].substr(0, 1) + '.' + LS.VName[4];
        }
        if (LS.VName[2].substr(0, 3) === LS.VName[5].substr(0, 3)) {
            LS.Spieler[5] = LS.NName[5].substr(0, 1) + '.' + LS.VName[5];
        }
        if (LS.VName[2].substr(0, 3) === LS.VName[6].substr(0, 3)) {
            LS.Spieler[6] = LS.NName[6].substr(0, 1) + '.' + LS.VName[6];
        }
        LS.Spieler[2] = LS.NName[2].substr(0, 1) + '.' + LS.VName[2];
    }

    if ((LS.VName[3].substr(0, 3) === LS.VName[4].substr(0, 3))
            || (LS.VName[3].substr(0, 3) === LS.VName[5].substr(0, 3))
            || (LS.VName[3].substr(0, 3) === LS.VName[6].substr(0, 3))) {
        if (LS.VName[3].substr(0, 3) === LS.VName[4].substr(0, 3)) {
            LS.Spieler[4] = LS.NName[4].substr(0, 1) + '.' + LS.VName[4];
        }
        if (LS.VName[3].substr(0, 3) === LS.VName[5].substr(0, 3)) {
            LS.Spieler[5] = LS.NName[5].substr(0, 1) + '.' + LS.VName[5];
        }
        if (LS.VName[3].substr(0, 3) === LS.VName[6].substr(0, 3)) {
            LS.Spieler[6] = LS.NName[6].substr(0, 1) + '.' + LS.VName[6];
        }
        LS.Spieler[3] = LS.NName[3].substr(0, 1) + '.' + LS.VName[3];
    }

    if ((LS.VName[4].substr(0, 3) === LS.VName[5].substr(0, 3))
            || (LS.VName[4].substr(0, 3) === LS.VName[6].substr(0, 3))) {
        if (LS.VName[4].substr(0, 3) === LS.VName[5].substr(0, 3)) {
            LS.Spieler[5] = LS.NName[5].substr(0, 1) + '.' + LS.VName[5];
        }
        if (LS.VName[4].substr(0, 3) === LS.VName[6].substr(0, 3)) {
            LS.Spieler[6] = LS.NName[6].substr(0, 1) + '.' + LS.VName[6];
        }
        LS.Spieler[4] = LS.NName[4].substr(0, 1) + '.' + LS.VName[4];
    }

    if (LS.VName[6]) {
        if ((LS.VName[5].substr(0, 3) === LS.VName[6].substr(0, 3))) {
            LS.Spieler[5] = LS.NName[5].substr(0, 1) + '.' + LS.VName[5];
            LS.Spieler[6] = LS.NName[6].substr(0, 1) + '.' + LS.VName[6];
        }
    }

    if (LS.Spieler[2].substr(3, 1) === '.') {
        LS.Spieler[2] = LS.VName[2].substr(0, 1) + '.' + LS.NName[2];
    }
    if (LS.Spieler[3].substr(3, 1) === '.') {
        LS.Spieler[3] = LS.VName[3].substr(0, 1) + '.' + LS.NName[3];
    }
    if (LS.Spieler[4].substr(3, 1) === '.') {
        LS.Spieler[4] = LS.VName[4].substr(0, 1) + '.' + LS.NName[4];
    }
    if (LS.Spieler[5].substr(3, 1) === '.') {
        LS.Spieler[5] = LS.VName[5].substr(0, 1) + '.' + LS.NName[5];
    }
    if (LS.Spieler[6].substr(3, 1) === '.') {
        LS.Spieler[6] = LS.VName[6].substr(0, 1) + '.' + LS.NName[6];
    }

    LS.Spieler[1] = LS.Spieler[1] + LS.Sterne[1];
    LS.Spieler[2] = LS.Spieler[2] + LS.Sterne[2];
    LS.Spieler[3] = LS.Spieler[3] + LS.Sterne[3];
    LS.Spieler[4] = LS.Spieler[4] + LS.Sterne[4];
    LS.Spieler[5] = LS.Spieler[5] + LS.Sterne[5];
    LS.Spieler[6] = LS.Spieler[6] + LS.Sterne[6];

    if (LS.Spieler[5] === '') {
        LS.JeSeite = '1';
        if (LS.AnzSpieler !== 4) {
            LS.AnzSpieler = 4;
            LS.Pausierer1 = 5;
            LS.Pausierer2 = 6;
        }
    } else if (LS.Spieler[6] === '') {
        if (LS.AnzSpieler !== 5) {
            LS.AnzSpieler = 5;
            LS.Pausierer1 = 0;
            LS.Pausierer2 = 6;
        }
    } else {
        if (LS.AnzSpieler !== 6) {
            LS.AnzSpieler = 6;
            LS.Pausierer1 = 0;
            LS.Pausierer2 = 0;
        }
    }

    LS.SpieleJeRunde = CUPS.SPJERUNDE[LS.I];
//    if (LS.I === 54 || LS.I === 77) { // Steiermark:   Falls es Fünfertische gibt, spielen 4rer-Tische weniger
//        if (STAT._AKTTURNIER._TEILNEHMER % 4) {   // Fünfertische
//            LS.SpieleJeRunde = parseInt((CUPS.SPJERUNDE[LS.I] / 5) * LS.AnzSpieler);
//        }
//    } else {           // Rest - 5er-Tische spielen mehr
//        if (LS.SpieleJeRunde && LS.AnzSpieler > 4) {
//            LS.SpieleJeRunde = parseInt((CUPS.SPJERUNDE[LS.I] / 4) * LS.AnzSpieler);
//        }
//    }
    if (LS.AnzSpieler > 4) {
        LS.SpieleJeRunde = parseInt((CUPS.SPJERUNDE[LS.I] / 4) * LS.AnzSpieler);
    }

    SetGeberPausierer();
    setTarif();
    localStorage.setItem('Abakus.LS', JSON.stringify(LS));
    var DS = new Object();
    DS.GameI = [0];
    DS.Game = [''];
    DS.Spieler = [''];
    DS.Partner = [''];
    DS.Punkte = [[0], [0], [0], [0], [0], [0], [0]];
    DS.Korr = [false];
    DS.Storno = [false];
    localStorage.setItem('Abakus.DS', JSON.stringify(DS));
    var NEXT = new Object();
    NEXT.Seite = 'GR';
    localStorage.setItem('Abakus.NEXT', JSON.stringify(NEXT));
    fHref('Abakus/Abakus' + LS.AnzSpieler + LS.JeSeite + '.html');
}

function blert(pNR, pVNAME, pNNAME, pORT, pSTERNE) {
    if (pNR.length !== 4) {
        var hNR = pNR;
        pNNAME = pNR.substr(0, pNR.indexOf('ˆ'));
        hNR = pNR.substr(pNR.indexOf('ˆ') + 1);
        pVNAME = hNR.substr(0, hNR.indexOf('ˆ'));
        pORT = hNR.substr(hNR.lastIndexOf('ˆ') + 1);
    }
    LS.AnzSpieler++;
    LS.NR    [LS.AnzSpieler] = pNR;
    LS.VName [LS.AnzSpieler] = pVNAME.trim();
    LS.NName [LS.AnzSpieler] = pNNAME.trim();
    if (typeof pORT === "string") {
        LS.Ort   [LS.AnzSpieler] = pORT.trim();
    } else {
        LS.Ort   [LS.AnzSpieler] = pORT;
    }
    LS.Sterne[LS.AnzSpieler] = pSTERNE;
}

function SetGeberPausierer() {

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
            LS.Geber = 0;
        } else {
            LS.INA1 = LS.Pausierer1;
            LS.INA2 = LS.Geber;
            LS.Geber = 0;
        }
    }
}

function setTarif() {
    'use strict';
    LS.Tarif = new Array(19);
    if (CUPS.TARIF[LS.I].length >= 18) {
        LS.Tarif[iRufer          ] = CUPS.TARIF[LS.I][1 ]; // Rufer
        LS.Tarif[iSolorufer      ] = CUPS.TARIF[LS.I][1 ] * 2; // Solorufer
        LS.Tarif[iPagatrufer     ] = CUPS.TARIF[LS.I][1 ]; // Pagat
        LS.Tarif[iUhurufer       ] = CUPS.TARIF[LS.I][1 ]; // Uhu
        LS.Tarif[iKakadurufer    ] = CUPS.TARIF[LS.I][1 ]; // Kakadu
        LS.Tarif[iQuapilrufer    ] = CUPS.TARIF[LS.I][1 ]; // Quapil
        LS.Tarif[i6er            ] = CUPS.TARIF[LS.I][2 ]; // 6er
        LS.Tarif[i3er            ] = CUPS.TARIF[LS.I][3 ]; // 3er
        LS.Tarif[iSolo3er        ] = CUPS.TARIF[LS.I][3 ] * 2; // Solo3er
        LS.Tarif[iFarben3er      ] = CUPS.TARIF[LS.I][4 ]; // Farben-3er
        LS.Tarif[iFarbensolo     ] = CUPS.TARIF[LS.I][5 ]; // Farbensolo
        LS.Tarif[iTrischaker     ] = CUPS.TARIF[LS.I][6 ]; // Trischaken
        LS.Tarif[iPiZwiccolo     ] = CUPS.TARIF[LS.I][7 ]; // Pi/Zwiccolo
        LS.Tarif[iBettler        ] = CUPS.TARIF[LS.I][8 ]; // Bettler
        LS.Tarif[iPiZwiccoloOvert] = CUPS.TARIF[LS.I][9 ]; // Pi/Zwiccolo overt
        LS.Tarif[iBettlerOvert   ] = CUPS.TARIF[LS.I][10]; // Bettler overt
        LS.Tarif[iPagat          ] = CUPS.TARIF[LS.I][11]; // Pagat
        LS.Tarif[iUhu            ] = CUPS.TARIF[LS.I][12]; // Uhu
        LS.Tarif[iKakadu         ] = CUPS.TARIF[LS.I][13]; // Kakadu
        LS.Tarif[iQuapil         ] = CUPS.TARIF[LS.I][14]; // Quapil
        LS.Tarif[iV              ] = CUPS.TARIF[LS.I][15]; // V
        LS.Tarif[iTrull          ] = CUPS.TARIF[LS.I][16]; // Trull
        LS.Tarif[i4Koenige       ] = CUPS.TARIF[LS.I][17]; // Vier Könige
        LS.Tarif[iUltimo         ] = CUPS.TARIF[LS.I][18]; // König ultimo
        LS.Tarif[iValat          ] = CUPS.TARIF[LS.I][19]; // Valat
        if (CUPS.TARIF[LS.I][20]) {
            LS.Tarif[iAbsolut    ] = CUPS.TARIF[LS.I][20]; // Prämie 20
            LS.Tarif20T = CUPS.TARIF20T[LS.I];
        } else {
            LS.Tarif[iAbsolut    ] = 0;
            LS.Tarif20T = '';
        }
        if (CUPS.TARIF[LS.I][21]) {
            LS.Tarif[iXY         ] = CUPS.TARIF[LS.I][21]; // Prämie 21
            LS.Tarif21T = CUPS.TARIF21T[LS.I];
        } else {
            LS.Tarif[iXY         ] = 0;
            LS.Tarif21T = '';
        }
    } else if (CUPS.REGELN[LS.I] === 'Wr.') {
        LS.Tarif[iRufer          ] = 1; // Rufer
        LS.Tarif[iSolorufer      ] = 2; // Solorufer
        LS.Tarif[iPagatrufer     ] = 1; // Pagat
        LS.Tarif[iUhurufer       ] = 1; // Uhu
        LS.Tarif[iKakadurufer    ] = 1; // Kakadu
        LS.Tarif[iQuapilrufer    ] = 1; // Quapil
        LS.Tarif[i6er            ] = 4; // 6er
        LS.Tarif[i3er            ] = 5; // 3er
        LS.Tarif[iSolo3er        ] = 10; // Solo3er
        LS.Tarif[iFarben3er      ] = 5; // Farben-3er
        LS.Tarif[iFarbensolo     ] = 10; // Farbensolo
        LS.Tarif[iTrischaker     ] = 2; // Trischaken
        LS.Tarif[iPiZwiccolo     ] = 2; // Pi/Zwiccolo
        LS.Tarif[iBettler        ] = 4; // Bettler
        LS.Tarif[iPiZwiccoloOvert] = 6; // Pi/Zwiccolo overt
        LS.Tarif[iBettlerOvert   ] = 8; // Bettler overt
        LS.Tarif[iPagat          ] = 1; // Pagat
        LS.Tarif[iUhu            ] = 2; // Uhu
        LS.Tarif[iKakadu         ] = 3; // Kakadu
        LS.Tarif[iQuapil         ] = 4; // Quapil
        LS.Tarif[iV              ] = 0; // V
        LS.Tarif[iTrull          ] = 1; // Trull
        LS.Tarif[i4Koenige       ] = 1; // Vier Könige
        LS.Tarif[iUltimo         ] = 1; // König ultimo
        LS.Tarif[iValat          ] = 0; // Valat
        LS.Tarif[iAbsolut        ] = 0; // Absolut
        LS.Tarif[iXY             ] = 0; // Prämie XY
        LS.Tarif20T = '';
        LS.Tarif21T = '';
    } else if (CUPS.REGELN[LS.I] === 'Ooe.') {
        LS.Tarif[iRufer          ] = 1; // Rufer
        LS.Tarif[iSolorufer      ] = 2; // Solorufer
        LS.Tarif[iPagatrufer     ] = 1; // Pagat
        LS.Tarif[iUhurufer       ] = 1; // Uhu
        LS.Tarif[iKakadurufer    ] = 1; // Kakadu
        LS.Tarif[iQuapilrufer    ] = 1; // Quapil
        LS.Tarif[i6er            ] = 4; // 6er
        LS.Tarif[i3er            ] = 4; // 3er
        LS.Tarif[iSolo3er        ] = 8; // Solo3er
        LS.Tarif[iFarben3er      ] = 0; // Farben-3er
        LS.Tarif[iFarbensolo     ] = 5; // Farbensolo
        LS.Tarif[iTrischaker     ] = 1; // Trischaken
        LS.Tarif[iPiZwiccolo     ] = 2; // Pi/Zwiccolo
        LS.Tarif[iBettler        ] = 2; // Bettler
        LS.Tarif[iPiZwiccoloOvert] = 6; // Pi/Zwiccolo overt
        LS.Tarif[iBettlerOvert   ] = 7; // Bettler overt
        LS.Tarif[iPagat          ] = 1; // Pagat
        LS.Tarif[iUhu            ] = 2; // Uhu
        LS.Tarif[iKakadu         ] = 3; // Kakadu
        LS.Tarif[iQuapil         ] = 4; // Quapil
        LS.Tarif[iV              ] = 0; // V
        LS.Tarif[iTrull          ] = 1; // Trull
        LS.Tarif[i4Koenige       ] = 1; // Vier Könige
        LS.Tarif[iUltimo         ] = 1; // König ultimo
        LS.Tarif[iValat          ] = 0; // Valat
        LS.Tarif[iAbsolut        ] = 0; // Absolut
        LS.Tarif[iXY             ] = 0; // Prämie XY
        LS.Tarif20T = '';
        LS.Tarif21T = '';
    } else {
        LS.Tarif[iRufer          ] = 1; // Rufer
        LS.Tarif[iSolorufer      ] = 2; // Solorufer
        LS.Tarif[iPagatrufer     ] = 1; // Pagat
        LS.Tarif[iUhurufer       ] = 1; // Uhu
        LS.Tarif[iKakadurufer    ] = 1; // Kakadu
        LS.Tarif[iQuapilrufer    ] = 1; // Quapil
        LS.Tarif[i6er            ] = 4; // 6er
        LS.Tarif[i3er            ] = 5; // 3er
        LS.Tarif[iSolo3er        ] = 10; // Solo3er
        LS.Tarif[iFarben3er      ] = 5; // Farben-3er
        LS.Tarif[iFarbensolo     ] = 10; // Farbensolo
        LS.Tarif[iTrischaker     ] = 2; // Trischaken
        LS.Tarif[iPiZwiccolo     ] = 2; // Pi/Zwiccolo
        LS.Tarif[iBettler        ] = 4; // Bettler
        LS.Tarif[iPiZwiccoloOvert] = 8; // Pi/Zwiccolo overt
        LS.Tarif[iBettlerOvert   ] = 8; // Bettler overt
        LS.Tarif[iPagat          ] = 1; // Pagat
        LS.Tarif[iUhu            ] = 2; // Uhu
        LS.Tarif[iKakadu         ] = 3; // Kakadu
        LS.Tarif[iQuapil         ] = 4; // Quapil
        LS.Tarif[iV              ] = 0; // V
        LS.Tarif[iTrull          ] = 1; // Trull
        LS.Tarif[i4Koenige       ] = 1; // Vier Könige
        LS.Tarif[iUltimo         ] = 1; // König ultimo
        LS.Tarif[iValat          ] = 10; // Valat
        LS.Tarif[iAbsolut        ] = 1; // Absolut
        LS.Tarif[iXY             ] = 1; // Prämie XY
        LS.Tarif20T = 'Sack';
        LS.Tarif21T = 'XY';
    }
}

function whenSTATloaded() {
    'use strict';
    if (CUPS.TURNIER[I] && CUPS.TURNIER[I] !== 'Handy') {
        checkNeuerTisch();
        return;
    }

    var hJetzt = new Date().getTime();
    if (STAT && new Date(STAT.ZULETZTupd).getTime() > hJetzt + 60000 * 15) {  // + 15 Minuten Toleranz
        showEineWarnung('F1: Datum oder Uhrzeit falsch.', 'Bitte korrigieren.');
        return false;
    }

    if (new Date(getVersionsDatum()).getTime() > hJetzt + 60000 * 15) {  // + 15 Minuten Toleranz
        showEineWarnung('F2: Datum oder Uhrzeit falsch.', 'Bitte korrigieren.');
        return false;
    }

    if (CUPS.TURNIER[I]) {

        if (PC && CUPS.TURNIER[I] !== 'Handy') {
        } else {
            if (STAT.TURRUNDE === 0) {
                showEineWarnung(I, "Turnier noch nicht gestartet!", "Informiere den Veranstalter.");
                return false;
            }
        }

        if (CUPS.TURNIER[I] === 'Handy') {

            if (new Date(STAT.TURTIMESTAMP).getTime() > hJetzt + 60000 * 15) { // + 15 Minuten Toleranz
                if (LS.ME !== '3425') {
                    showEineWarnung('F3: Datum oder Uhrzeit falsch.', 'Bitte korrigieren.');
                    return false;
                }
            }

            if (new Date(STAT.TURTIMESTAMP).toDateString() !== new Date().toDateString()) {
                if (CUPS.BEREadmin[I].indexOf(LS.ME) >= 0 || CUPS.BEREadmin[I].indexOf('*') >= 0) {
                    if (new Date(STAT.TURTIMESTAMP).getTime() + 60000 * 60 * 24 > hJetzt) { // 24 Stunden Toleranz
                        showEineWarnung('F4: Datum oder Uhrzeit falsch.',
                                'Korrekturen müssen innerhalb von 24 Stunden nach Turnierstart durchgeführt werden.');
                    }
                } else {
                    showEineWarnung('F3: Datum ungültig:', 'Nur an dem Tag, an dem<br>'
                            + 'das Turnier gestartet wurde,<br>'
                            + 'dem ' + new Date(STAT.TURTIMESTAMP).toLocaleDateString() + ', kann ein<br>'
                            + 'Tisch eingegeben werden.');
                    return false;
                }
            }

            if (I > 3) {
                if (CUPS.BEREadmin[I].indexOf(LS.ME) >= 0 || STAT.TURGESPIELT === 0) {
// Administrator muß händische Tische nacherfassen
                } else {
                    showEineWarnung(I, "Runde " + STAT.TURRUNDE + " läuft noch!", "Etwas Geduld bitte!");
                    return false;
                }
            }

        }
    }

    hideEinenMoment(); // iOS ist hier leider ein bisserl langsam.
    LS.Von = new Date();
    LS.Bis = new Date();
    LS.LoadCups = I * -1; // - = neuer Tisch
    localStorage.setItem('Abakus.LS', JSON.stringify(LS));
    fHref('Abakus/Anmeldung.html');
}

function Weiterspielen() {
    'use strict';
    LS.ShowCups = LS.I;
    if (CUPS.TYP[LS.I] !== 'CUP' && CUPS.TYP[LS.I] !== 'ET' && CUPS.TYP[LS.I] !== 'MT') {
        LS.SpieleJeRunde = CUPS.SPJERUNDE[LS.I];
        if (LS.SpieleJeRunde && LS.AnzSpieler > 4) {
            LS.SpieleJeRunde = parseInt((CUPS.SPJERUNDE[LS.I] / 4) * LS.AnzSpieler);
        }
    }
    localStorage.setItem('Abakus.LS', JSON.stringify(LS));
    var NEXT = new Object();
    NEXT.Seite = 'GR';
    localStorage.setItem('Abakus.NEXT', JSON.stringify(NEXT));
    fHref('Abakus/Abakus' + LS.AnzSpieler + LS.JeSeite + '.html');
}

function getINT(pStr) {
    var Str = $.trim(pStr);
    var Int = parseInt(Str);
    if (Str === "")
        return false;
    if (isNaN(Str))
        return false;
    if (isNaN(Int))
        return false;
    if (Str.indexOf('-') >= 0 & Int > 0) {
        return (Int * -1);
    }
    if (Str.toString() === Int.toString()) {
        return Int;
    } else {
        return false;
    }
}

function checkVersion() {
    'use strict';
    var sDate = new Date(CUPS.TIMESTAMP);
    var hDate = new Date();
    if (new Date('2016-01-11T18:02:22.210Z').getHours() !== 19) {
        $('#bSpeichern').addClass('ui-disabled');
        $('#hSpeichern').html('<span class="cRot">'
                + 'Die Zeitzone ist ungleich Wien.<br>'
                + '<b>Speichern ist nicht möglich.</b></span>').show();
    } else if (sDate.getFullYear() > hDate.getFullYear() || sDate.getTime() > hDate.getTime() + 60000 * 60) {  // + 60 Minuten Toleranz
        $('#bSpeichern').addClass('ui-disabled');
        $('#hSpeichern').html('<span class=cRot>'
                + 'Das Systemdatum ist nicht aktuell.<br>'
                + '<b>Speichern ist nicht möglich.</b></span>').show();
    } else if (sDate.getFullYear() < hDate.getFullYear()) {
        $('#bSpeichern').addClass('ui-disabled');
        $('#hSpeichern').html('<span class=cRot>'
                + 'Das System wurde für ' + hDate.getFullYear() + '<br>'
                + 'noch nicht freigegeben.<br>'
                + 'Informiere einen Administrator.<br>'
                + '<b>Speichern ist nicht möglich.</b></span>').show();
    }
}

function historyBack() {
    if (LS.ShowCups) {
        LS.ShowCups = 0;
        localStorage.setItem('Abakus.LS', JSON.stringify(LS));
    }
    history.back();
}

function fHref(pHref) {
    if (window.chrome) {
        $('body').addClass('ui-disabled');
    }
    window.location.href = pHref;
}

function QUERFORMAT() {
    if ($(window).innerWidth() > $(window).innerHeight()) {
        return true;
    } else {
        return false;
    }
}

function toggleLegende() {
    if ($('#dLegende').is(":visible")) {
        $('#dLegende').hide();
    } else {
        $('#dLegende').show();
        $("#p").scrollTop(0);
    }
}

function hrefStatistik(pCup, pParameter) {
    if (pCup) {
        I = pCup;
    }
    if (!pParameter) {
        pParameter = '';
    }
    if (CUPS.BEREadmin[I].indexOf(LS.ME) >= 0
            || CUPS.BEREschreiben[I].indexOf(LS.ME) >= 0
            || CUPS.TYP[I] !== 'PR'
            || CUPS.TYP[I] === 'PR' && CUPS.MEZULETZT[I] && (
            (CUPS.MEZULETZT[I] + (100 * 86400000) > Date.now() && CUPS.NAME[I].substr(0, 4) === 'Bei ')
            || (CUPS.MEZULETZT[I] + (365 * 86400000) > Date.now()))) {
        if (pCup) {
            LS.ShowCups = pCup;
        }
        localStorage.setItem('Abakus.LS', JSON.stringify(LS));
        if (CUPS.TURNIER[I] && CUPS.TURNIER[I] !== 'Handy') {
            fHref("Statistik/Statistik.html" + pParameter);
        } else {
            fHref("Abakus/Statistik.html" + pParameter);
        }
    } else {
        loadSTAT(I, 'Statistik wird geladen.', false, hrefStatistikPR);
    }
}

function hrefStatistikPR() {

    function meldKeineBerechtigung(pSeit) {
        if (pSeit) {
            if (QUERFORMAT()) {
                $('#bZurStatistik').html('Du hast seit mindestens<br>' + pSeit + ' Tagen nicht gespielt.<br><b>Berechtigung abgelaufen!</b>')
                        .prop('onclick', '')
                        .removeClass('cBlau')
                        .removeClass('P')
                        .addClass('cRot');
            } else {
                showEineMeldung(I, 'Du hast seit mindestens<br>' + pSeit + ' Tagen nicht gespielt.', '<b>Berechtigung abgelaufen!</b>');
            }
        } else {
            if (QUERFORMAT()) {
                $('#bZurStatistik').html('Du hast in dieser Runde<br>noch nie gespielt.<br><b>Berechtigung fehlt!</b>')
                        .prop('onclick', '')
                        .removeClass('cBlau')
                        .removeClass('P')
                        .addClass('cRot');
            } else {
                showEineMeldung(I, 'Du hast in dieser Runde<br>noch nie gespielt.', '<b>Berechtigung fehlt!</b>');
            }
        }
    }

    hideEinenMoment();
    if (CUPS.BEREadmin[I].indexOf(LS.ME) >= 0 || CUPS.BEREschreiben[I].indexOf(LS.ME) >= 0) {
        localStorage.setItem('Abakus.LS', JSON.stringify(LS));
        fHref("Abakus/Statistik.html");
    } else {
        if (CUPS.MEZULETZT[I] === 0) {
            meldKeineBerechtigung(0);
        } else if (CUPS.MEZULETZT[I] + (100 * 86400000) < Date.now() && CUPS.NAME[I].substr(0, 4) === 'Bei ') {
            meldKeineBerechtigung(100);
        } else if (CUPS.MEZULETZT[I] + (365 * 86400000) < Date.now()) {
            meldKeineBerechtigung(365);
        } else {
            localStorage.setItem('Abakus.LS', JSON.stringify(LS));
            fHref("Abakus/Statistik.html");
        }
    }
}

function initSeite1() {

    if (LS.ShowCups < 0) {
        I = LS.ShowCups * -1;
        LS.ShowCups = 0;
        localStorage.setItem('Abakus.LS', JSON.stringify(LS));
    } else {
        I = LS.ShowCups;
    }

    var sync = new Date(CUPS.DATE);
    var heute = new Date();
    var nStunden = (heute - sync) / 3600000;
    if (LS.Version !== getVersion()) {
        if (LS.LastBtn && !$(LS.LastBtn).length) {
            LS.LastBtn = '';
        }
        if (LS.Version < 989) { // später
            LS.FotoStyle = 0;
            LS.FotoAnimieren = false;
            if (LS.Font) {
                delete LS.Font;
            }
        }
        if (LS.Version < 990) {
            if (LS.ME.length === 4 && !LS.VIP) {
                loadSPIELER(); // VIP-Status holen
            }
        }
        localStorage.setItem('Abakus.LOG', JSON.stringify(''));
        if (LS.Version === 0) {
            writeLOG('ABAKUS: Version ' + getVersionsDatum().toLocaleDateString() + ' (' + getVersion() + ') wurde installiert.');
        } else {
            writeLOG('ABAKUS: Update auf Version ' + getVersionsDatum().toLocaleDateString() + ' (' + getVersion() + ').');
        }
        initCUPSdelAllSTAT();
    } else if (LS.LoadCups > 0 || nStunden > 6 || isNaN(nStunden)) {
        loadCUPS(false, false, true);
    } else {
        whenCUPSloaded();
    }
}

function writeCanvas(pCup) {
    var hTitel = '';
    var hTitel2 = '???';
    if (!isNaN(pCup)) {
        if (CUPS.TYP[pCup] === "CUP" || CUPS.TYP[pCup] === "TC") {
            hTitel2 = 'Lokaler Cup';
        } else if (CUPS.TYP[pCup] === "ET") {
            hTitel2 = 'Einzelturnier';
        } else if (CUPS.TYP[pCup] === "MT") {
            hTitel2 = 'Mannschaftsturnier';
        } else if (CUPS.TYP[pCup] === "FC") {
            hTitel2 = 'Wirtshausrunde';
        } else if (CUPS.TYP[pCup] === "PR") {
            hTitel2 = 'Private Runde';
        } else if (CUPS.TYP[pCup] === "PR") {
            hTitel2 = 'Private Runde';
        } else if (CUPS.TYP[pCup] === "AR") {
            hTitel2 = 'Allgemeine Runde';
        }
        if (pCup === 1) {
            hTitel2 = 'Test- und Übungsrunde';
        } else if (pCup === 2) {
            hTitel2 = 'Test- und Übungsturnier';
        } else if (pCup === 3) {
            hTitel2 = 'Test- und Übungsturnier';
        } else if (pCup === 4) {
            hTitel2 = 'Testcup /-Runde';
        } else if (pCup === 8) {
            hTitel2 = 'Turnierserie zum einfachen Tarif';
        } else if (pCup === 9) {
            hTitel2 = 'Turnierserie zum doppelten Tarif';
        } else if (pCup === 10) {
            hTitel2 = 'Turnierserie zum dreifachen Tarif';
        } else if (pCup === 11) {
            hTitel2 = 'Sküs of the year';
        } else if (pCup === 16) {
            hTitel2 = 'Mit dem Rad entlang der Donau gemütlich nach Wien';
        } else if (pCup === 80) {
            if (QUERFORMAT()) {
                hTitel2 = 'Eine Veranstaltung des Wiener Tarockcup';
            } else {
                hTitel2 = 'Ein außergewöhnlicher Event';
            }
        } else if (pCup === 17) {
            hTitel2 = '<b>U</b>rlaubs-<b>T</b>arock-<b>C</b>up';
        }
    }

    hTitel = CUPS.NAME[pCup];
    if (isNaN(pCup)) {
        hTitel = pCup;
        $(".hfHeaderIcon,#qfHeaderIcon").attr("src", "Icons/Farben.png");
    } else if (pCup === 0) {
        hTitel = 'Vivat Valat!';
        $(".hfHeaderIcon,#qfHeaderIcon").attr("src", "Icons/Farben.png");
    } else if (pCup === 'Links') {
        hTitel = 'Tarocklinks';
        $(".hfHeaderIcon,#qfHeaderIcon").attr("src", "Icons/Farben.png");
    } else if (pCup === 'TippsUndTricks') {
        hTitel = 'Tipps & Tricks';
        $(".hfHeaderIcon,#qfHeaderIcon").attr("src", "Icons/Idee.gif");
    } else if (pCup === 'Ettikette') {
        hTitel = 'Tarocketikette';
        $(".hfHeaderIcon,#qfHeaderIcon").attr("src", "Icons/Vorrang.png");
    } else if (pCup === 'Anekdoten') {
        hTitel = 'Anekdoten';
        $(".hfHeaderIcon,#qfHeaderIcon").attr("src", "Icons/Anekdoten.png");
    } else if (pCup === 'Geschichte') {
        $(".hfHeaderIcon,#qfHeaderIcon").attr("src", "Icons/DieGeschichte.png");
    } else {
        hTitel = CUPS.NAME[pCup];
        if ((CUPS.TYP[pCup] === 'CUP' || CUPS.TYP[pCup] === 'ET') && pCup > 4) {
            $(".hfHeaderIcon,#qfHeaderIcon").attr("src", "Icons/i" + pCup + ".png");
        } else if (pCup === 11 || pCup === 25) {
            $(".hfHeaderIcon,#qfHeaderIcon").attr("src", "Icons/i55.png");
        } else {
            $(".hfHeaderIcon,#qfHeaderIcon").attr("src", "Icons/Farben.png");
        }
        if (QUERFORMAT()) {
            if (pCup === 49) {
                hTitel = 'Tarock-Österreich-Finale';
                document.title = 'Österreichfinale';
                hTitel2 = 'Internet:&nbsp;&nbsp;<span class="cBlau P" onclick="window.open(\'https://tarockoesterreich.jimdo.com\')" >tarockoesterreich.jimdo.com</span>';
            } else if (pCup === 50) {
                hTitel = 'Hausruckviertler Tarockcup';
                document.title = 'HRC - ' + CUPS.NAME[pCup].replace('  ', ' ').replace('/', '-');
                hTitel2 = 'Internet:&nbsp;&nbsp;<span class="cBlau P" onclick="window.open(\'https://hausruckcup1.jimdo.com\')" >hausruckcup1.jimdo.com</span>';
            } else if (pCup === 51) {
                hTitel = 'Kärntner Tarockcup';
                document.title = 'KTC - ' + CUPS.NAME[pCup].replace('  ', ' ').replace('/', '-');
                hTitel2 = '';
            } else if (pCup === 52) {
                hTitel = 'Raiffeisen Tarockcup Austria';
                document.title = 'RTC - ' + CUPS.NAME[pCup].replace('  ', ' ').replace('/', '-');
                hTitel2 = 'Internet:&nbsp;&nbsp;<span class="cBlau P" onclick="window.open(\'http://www.tarockcup.at\')" >www.tarockcup.at</span>';
            } else if (pCup === 53) {
                document.title = 'SWC - ' + CUPS.NAME[pCup].replace('  ', ' ').replace('/', '-');
                hTitel2 = 'Internet:&nbsp;&nbsp;<span class="cBlau P" onclick="window.open(\'https://tarockrunde-sauwald.jimdo.com\')" >tarockrunde-sauwald.jimdo.com</span>';
            } else if (pCup === 54) {
                document.title = 'STC - ' + CUPS.NAME[pCup].replace('  ', ' ').replace('/', '-');
                hTitel2 = 'Internet:&nbsp;&nbsp;<span class="cBlau P" onclick="window.open(\'https://steirercup.webnode.at\')" >https://steirercup.webnode.at</span>';
            } else if (pCup === 55) {
                document.title = 'TTC - ' + CUPS.NAME[pCup].replace('  ', ' ').replace('/', '-');
                hTitel = 'Tiroler Tarockcup';
                hTitel2 = 'Internet:&nbsp;&nbsp;<span class="cBlau P" onclick="window.open(\'http://www.tarock.tirol\')" >www.tarock.tirol</span>';
            } else if (pCup === 56) {
                document.title = 'WTC - ' + CUPS.NAME[pCup].replace('  ', ' ').replace('/', '-');
                hTitel = 'Wiener Tarockcup';
                hTitel2 = 'Internet:&nbsp;&nbsp;<span>www.tarock.wien</span>';
            } else if (pCup === 80) {
                hTitel = 'Wiener Tarockmarathon';
                document.title = 'Wr. Marathon';
                hTitel2 = 'Eine Veranstaltung des Wiener Tarockcup';
            } else if (pCup === 15) {
                document.title = 'STA - ' + CUPS.NAME[pCup].replace('  ', ' ').replace('/', '-');
            } else {
                document.title = CUPS.NAME[pCup].replace('  ', ' ').replace('/', '-');
            }
        }
        hTitel = hTitel.replace(/ |_/g, '&nbsp;');
    }
    $('.hfHeaderZeile1,#qfHeaderZeile1').html(hTitel);
    $('.hfHeaderZeile2,#qfHeaderZeile2').html(hTitel2);
    if (I === LS.I && I !== 0) {
        $(".hfHeaderIcon").attr("src", "Icons/MeinTisch.png");
        $('.hfHeaderZeile2').html('Mein Tisch');
    }
    if (hTitel.length > 25) {
        $('#qfHeaderZeile1').attr("style", "font-size:4.5vw;white-space:nowrap;font-family:'Arial Narrow',Arial;font-style:italic;");
    } else {
        $('#qfHeaderZeile1').attr("style", "font-size:4.5vw;white-space:nowrap;font-family:Arial;font-style:italic;");
    }
    $('.hfHeaderIcon').css('height', $('#hMix').height() - 8).show();
    $('#qfHeaderIcon').show();
}

function myDateString(pDate) {
    var hDate = new Date(pDate);
    return hDate.getFullYear() + '-' + ('00' + (hDate.getMonth() + 1)).substr(-2) + '-' + ('00' + (hDate.getDate())).substr(-2);
}

function getDateString(pDate) {
    if (typeof pDate === 'string' && pDate[4] === '-') {
        var hJar = parseInt(pDate);
        if (pDate[5] === '0') {
            var hMon = parseInt(pDate.substr(6, 1)) - 1;
        } else {
            var hMon = parseInt(pDate.substr(5, 2)) - 1;
        }
        if (pDate[8] === '0') {
            var hTag = parseInt(pDate.substr(9, 1));
        } else {
            var hTag = parseInt(pDate.substr(8, 2));
        }
        var hDate = new Date(hJar, hMon, hTag);
    } else {
        var hDate = new Date(pDate);
    }
    if (new Date().getFullYear() === hDate.getFullYear()) {
        return daysOfWeek[hDate.getDay()] + ' ' + hDate.getDate() + ". " + monthsOfYear[hDate.getMonth()];
    } else {
        return daysOfWeek[hDate.getDay()] + ' ' + hDate.getDate() + ". " + monthsOfYear[hDate.getMonth()] + " <span style='text-decoration: overline;zoom: .9; -moz-transform:scale(.9)'>" + (hDate.getFullYear() - 2000) + "</span>";
    }
}

function initCUPSdelAllSTAT(pMeldung) {
    'use strict';
    $('#pContent').scrollTop(0);
    var DS = JSON.parse(localStorage.getItem('Abakus.DS'));
    var TU = JSON.parse(localStorage.getItem('Abakus.TU'));
    var LOG = JSON.parse(localStorage.getItem('Abakus.LOG'));
    var CUPS = JSON.parse(localStorage.getItem('Abakus.CUPS'));
    var TURNIER = JSON.parse(localStorage.getItem('Abakus.TURNIER'));
    var SPIELERnr = JSON.parse(localStorage.getItem('Abakus.SPIELERnr'));
    var SPIELERalpha = JSON.parse(localStorage.getItem('Abakus.SPIELERalpha'));
    localStorage.clear();
    LS.Version = getVersion();
    try {
        localStorage.setItem('Abakus.LS', JSON.stringify(LS));
    } catch (err) {
        LS.Meldung = 'F' + err + ': LS konnte nicht geladen werden.';
    }
    try {
        localStorage.setItem('Abakus.CUPS', JSON.stringify(CUPS));
    } catch (err) {
        LS.Meldung = 'F' + err + ': CUPS konnte nicht geladen werden.';
    }
    if (DS !== null) {
        try {
            localStorage.setItem('Abakus.DS', JSON.stringify(DS));
        } catch (err) {
            LS.Meldung = 'F' + err + ': DS konnte nicht geladen werden.';
        }
    }
    if (TU !== null) {
        try {
            localStorage.setItem('Abakus.TU', JSON.stringify(TU));
        } catch (err) {
            LS.Meldung = 'F' + err + ': TU konnte nicht geladen werden.';
        }
    }
    if (LOG !== null) {
        try {
            localStorage.setItem('Abakus.LOG', JSON.stringify(LOG));
        } catch (err) {
            LS.Meldung = 'F' + err + ': LOG konnte nicht geladen werden.';
        }
    }
    if (TURNIER !== null) {
        try {
            localStorage.setItem('Abakus.TURNIER', JSON.stringify(TURNIER));
        } catch (err) {
            LS.Meldung = 'F' + err + ': TURNIER konnte nicht geladen werden.';
        }
    }
    if (SPIELERnr !== null) {
        try {
            localStorage.setItem('Abakus.SPIELERnr', JSON.stringify(SPIELERnr));
        } catch (err) {
            LS.Meldung = 'F' + err + ': SPIELERnr konnte nicht geladen werden.';
        }
    }
    if (SPIELERalpha !== null) {
        try {
            localStorage.setItem('Abakus.SPIELERalpha', JSON.stringify(SPIELERalpha));
        } catch (err) {
            LS.Meldung = 'F' + err + ': SPIELERalpha konnte nicht geladen werden.';
        }
    }
    loadCUPS();
    if (pMeldung) {
        $('#dMeldung').html("<img src='Icons/OK.png' width='24' height='24'><span class=cSchwarz>&nbsp;&nbsp;Die App wurde initialisiert.</span><br>").show();
    }
    $('#bAK,#bMR').collapsible({collapsed: false});
    $('#bAL,#bCT,#bLC,#bET,#bFC,#PR,#bTR,#bAR').collapsible({collapsed: true});
}

function showLOG() {
    'use strict';
    if ($('#tLOG').is(':visible')) {
        $('#tLOG').hide();
    } else {
        var LOG = JSON.parse(localStorage.getItem('Abakus.LOG'));
        $('#tLOG').html(LOG).show();
    }
}

function fZuMeinemTisch() {
    'use strict';

    $("#tMeinTischName").html(CUPS.NAME[LS.I] + '&nbsp&nbsp;');
    $('#bWeiter,#bSpieler,#bSpeichern').removeClass('ui-disabled'); // Wegen iOS entfernen

    var DS = JSON.parse(localStorage.getItem('Abakus.DS'));
    if (CUPS.TURNIER[LS.I] && CUPS.TURNIER[LS.I] !== 'Handy') {
        $('#bSpieler').addClass('ui-disabled');
        if (LS.SpieleJeRunde > LS.gespielt) {
            $('#bSpeichern').addClass('ui-disabled');
        }
        if (LS.gespielt !== 0) {
            $('#bNeuerTisch').addClass('ui-disabled');
        }
    }
    if (LS.AnzSpieler && !LS.AnzGespeichert) {
        $('#bTischLoeschen').removeClass('ui-disabled');
    } else {
        $('#bTischLoeschen').addClass('ui-disabled');
    }
    if (!LS.Spieler           // nicht nach dem allerersten Aufruf
            || LS.gespielt === -1    // nach dem allererster Aufruf
            || LS.AnzSpieler < 4) {
        $('#bWeiter').addClass('ui-disabled');
        $('#bSpieler').addClass('ui-disabled');
        $('#bSpeichern').addClass('ui-disabled');
        $('#pSpiele').hide();
    } else {
        DS = JSON.parse(localStorage.getItem('Abakus.DS'));
        var html = '';
        for (var i = 1; i <= 6; i++) {
            if (LS.Spieler[i]) {
                html = html + '<tr><td>&nbsp;' + LS.NName[i] + ' ' + LS.VName[i] + LS.Sterne[i] + '</td><td class=TC>' + DS.Punkte[i][0] + '&nbsp;</td></tr>';
            } else if (LS.Spiele[i] !== 0) {
                html = html + '<tr><td class="cRot B">&nbsp;???</td><td class=TR>' + DS.Punkte[i][0] + '&nbsp;</td></tr>';
            }
        }
        if (html) {
            $("#tSpielerPunkte tbody tr").empty();
            $("#tSpielerPunkte > tbody").append(html);
        }

        if (LS.AnzGespeichert === 0) {
            $('#tGespielt').text('Es wurden ' + LS.gespielt + ' Spiele gespielt.');
        } else if (LS.AnzGespeichert === LS.AnzSpieler) {
            $('#bWeiter').addClass('ui-disabled');
            $('#bSpieler').addClass('ui-disabled');
            $('#pSpiele').hide();
        } else {
            if (LS.AnzGespeichert > 0) {
                $('#tGespielt').html('<b> ' + (LS.AnzSpieler - LS.AnzGespeichert) + ' Spieler m&uuml;ssen noch ' + (LS.gespielt > 0 ? 'gespeichert' : 'storniert') + ' werden.</b>').addClass('cRot');
            } else {
                $('#tGespielt').html('<b> Der Tisch wurde nicht vollst&auml;ndig ' + (LS.gespielt > 0 ? 'gespeichert' : 'storniert') + '.</b>').addClass('cRot');
            }
        }

        if ((LS.AnzGespeichert > 0 && LS.AnzGespeichert !== LS.AnzSpieler)
                || (LS.Spieler[0] === 'Diverse')) {
            $('#bWeiter').addClass('ui-disabled');
            $('#bSpieler').addClass('ui-disabled');
        }
        if (LS.AnzGespeichert === LS.AnzSpieler
                || LS.gespielt === 0
                ) {
            $('#bSpeichern').addClass('ui-disabled');
        }
        if (LS.AnzGespeichert > 0 && LS.AnzGespeichert !== LS.AnzSpieler) {  // Speichern wurde nicht zu Ende gebracht
            $('#bWeiter,#bSpieler,#bSpeichern').removeClass('ui-disabled');
            $('#bWeiter,#bSpieler').addClass('ui-disabled');
        }
    }
    checkVersion();
    if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
        setTimeout(function () {
            $("#pMEINTISCH").popup("open").show();
        }, 200);
    } else {
        $("#pMEINTISCH").popup("open").show();
    }
}

function resetLastBtn() {
    if (LS.LastBtn) {
        $(LS.LastBtn).removeClass('ui-btn-active');
        if (LS.LastBtn[4] === '5' || LS.LastBtn.substr(4, 2) === '49') {
            if (LS.LastBtn.length > 6) {
                if (LS.LastBtn.substr(4, 3) === '49T') {
                    $(LS.LastBtn).addClass('cTOF');
                } else if (LS.LastBtn.substr(4, 3) === '50T') {
                    $(LS.LastBtn).addClass('cHRC');
                } else if (LS.LastBtn.substr(4, 3) === '51T') {
                    $(LS.LastBtn).addClass('cKTC');
                } else if (LS.LastBtn.substr(4, 3) === '52T') {
                    $(LS.LastBtn).addClass('cRTC');
                } else if (LS.LastBtn.substr(4, 3) === '53T') {
                    $(LS.LastBtn).addClass('cSWC');
                } else if (LS.LastBtn.substr(4, 3) === '54T') {
                    $(LS.LastBtn).addClass('cSTC');
                } else if (LS.LastBtn.substr(4, 3) === '55T') {
                    $(LS.LastBtn).addClass('cTTC');
                } else if (LS.LastBtn.substr(4, 3) === '56T') {
                    $(LS.LastBtn).addClass('cWTC');
                } else {
                    $(LS.LastBtn).addClass('cDIV');
                }
            } else if (LS.LastBtn.substr(4, 2) === '49'
                    || LS.LastBtn.substr(4, 2) === '50'
                    || LS.LastBtn.substr(4, 2) === '52') {
                $(LS.LastBtn).addClass('cDIV');
            }
        } else {
            if (LS.LastBtn[LS.LastBtn.length - 1] === 'T') {
                $(LS.LastBtn).addClass('cDIV');
            } else {
                var hCup = parseInt(LS.LastBtn.substr(4));
                if (hCup) {
                    var hClass = getClass(hCup);
                    if (hClass) {
                        $(LS.LastBtn).addClass(hClass);
                    }
                }
            }
        }
    }
}

function getMELDAKT(pCup) {
    if (CUPS.MELDAKT[pCup]) {
        if (CUPS.MELDAKT[pCup] === LS.GelesenAKT[pCup]) {
            return CUPS.MELDAKT[pCup];
        } else {
            return '<span style="color:crimson">' + CUPS.MELDAKT[pCup] + '</span>';
        }
    } else {
        return 'Die neuesten Infos';
    }
}

function getMeldSTAT(pCup) {
    if (CUPS.TYP[pCup] === 'AR') {
        return 'Tageswertung, Jahreswertung, etc.';
    } else if (CUPS.TYP[pCup] === 'PR' && CUPS.MEZULETZT[I] + (365 * 86400000) < Date.now()) {
        return 'Nur für Mitspieler...';
    }
    if (CUPS.MELDSTAT[pCup]) {
        if (CUPS.MELDSTAT[pCup] === LS.GelesenSTAT[pCup]) {
            return CUPS.MELDSTAT[pCup];
        } else {
            return '<span style="color:crimson">' + CUPS.MELDSTAT[pCup] + '</span>';
        }
    } else {
        return 'Cupwertung, Platzierungen, etc.';
    }
}

function showCup(i, pBtn, pTermin) {
    'use strict';

    if (LS.ShowFunktion) {
        hrefStatistik(i);
    }

    var newBtn = '#' + pBtn + i;
    if (!QUERFORMAT()) {
        if (LS.LastBtn) {
            if (pBtn) {
                var lastBtn = LS.LastBtn;
                if (typeof pTermin !== "undefined") {
                    if (pTermin === -1) {
                        newBtn = '#' + pBtn + i + 'T';
                    } else {
                        newBtn = '#' + pBtn + i + 'T' + pTermin;
                    }
                }
                var lastTop = parseInt($(lastBtn).offset().top);
                var newTop = parseInt($(newBtn).offset().top);
                var viewTop = parseInt($('#pContent').scrollTop());
                var tglHeight = parseInt($('#tgl' + LS.LastBtn.substr(1)).height());
//              console.log('Tops: View: ', viewTop, ' Last: ', lastTop, (lastTop < newTop ? ' <<< ' : '>>>'), ' New: ', newTop, 'Toggle: ',tglHeight);
                if (lastTop < newTop && lastTop < 60) {
                    $('#pContent').scrollTop(viewTop + newTop - tglHeight - 100); // 100 === Header
                }
            }
            if ($('#tgl' + LS.LastBtn.substr(1)).is(":visible")) {
                $('#tgl' + LS.LastBtn.substr(1)).toggle('show');
                resetLastBtn();
                if (LS.LastBtn === newBtn) {
                    LS.LastBtn = '';
                    return;
                }
            }
        }
    }
    LS.ShowCups = I = i;
    if (LS.Meldung) {
        var hMeldung = LS.Meldung;
    }
    if (pBtn) {
        resetLastBtn();
        if (typeof pTermin !== "undefined") {
            if (pTermin === -1) {
                newBtn = '#' + pBtn + i + 'T';
            } else {
                newBtn = '#' + pBtn + i + 'T' + pTermin;
            }
        }
        LS.LastBtn = newBtn;
    }
    if (LS.LastBtn) {
        var resetTermin = LS.LastBtn.lastIndexOf('T');
        if (resetTermin > 3) {
            if (resetTermin + 1 === LS.LastBtn.length) {
                resetTermin = -1;
            } else {
                resetTermin = 1;
            }
        } else {
            resetTermin = 0;
        }
        if (pTermin === -1 || resetTermin === -1) {
            $(LS.LastBtn).addClass('ui-btn-active').removeClass('cAktiv').removeClass('fGruen').removeClass('cDIV');
        } else if (pTermin || resetTermin) {
            $(LS.LastBtn).addClass('ui-btn-active').removeClass('cHRC').removeClass('cKTC').removeClass('cRTC').removeClass('cSWC').removeClass('cSTC').removeClass('cTTC').removeClass('cWTC').removeClass('cTOF').removeClass('cDIV').removeClass('fGruen');
        } else {
            if (i === 49 || i === 50 || i === 52) {
                $(LS.LastBtn).removeClass('cDIV');
            }
            $(LS.LastBtn).addClass('ui-btn-active').removeClass('cAktiv').removeClass('fGruen');
        }
        $('#tgl' + LS.LastBtn.substr(1)).toggle('show');
    }

    writeCanvas(I);
// QUERFORMAT !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    var hVorschub = '<br><br>';
    var html = '';
    var htmlNaechstTermin = '';
    if (CUPS.ANMELDERF.length > I && CUPS.ANMELDERF[I]) {
        html = '<span class=XL>Nächste' + (CUPS.TURNIER[I] ? 's Turnier' : ' Runde') + ':<b>&nbsp;&nbsp;&nbsp;';
        if (myDateString(getNextTermin(I)) === hHeute) {
            html += '<span class=cGruen>Heute';
            if (CUPS.SPIELEAB[I]) {
                html += ', ' + CUPS.SPIELEAB[I] + ' Uhr';
            }
            html += '</span>';
        } else {
            html += getDateString(getNextTermin(I));
        }
        html += '</b></span><br>';
        if (typeof CUPS.MEANGEMELDET[I] === 'number') {
            if (CUPS.MEANGEMELDET[I] > Date.now()) {
                html += '<span class="M cGruen B">Ich bin angemeldet.</span><br>';
            } else {
                html += '<span class="M cRot B">Ich bin nicht angemeldet.</span><br>';
            }
        }
        htmlNaechstTermin = '<br><br>' + html.replace(/XL/g, 'M3');
        html += '<br>';
        hVorschub = '<br>';
    } else if (pTermin !== false && !isNaN(pTermin)) {
        if (pTermin >= 0 && CUPS.TERMINE[pTermin].CUP === I) {
            html = '<div class="ui-grid-a">'
                    + '<div class="ui-block-a L" style="width:22%;margin:4px 0;">'
                    + getDateString(CUPS.TERMINE[pTermin].DATUM)
                    + '</div>'
                    + '<div class="ui-block-b M" style="width:78%">'
                    + '<span class=XL><b>' + CUPS.TERMINE[pTermin].NAME + '</b></span><br>'
                    + getTerminText(pTermin)
                    + '</div>'
                    + '</div><br>';
            hVorschub = '<br>';
        }
    }
    if (CUPS.TYP[I] === 'CUP') {
        hVorschub = '<br>';
    }
    hVorschub = '<br><br>';
    var hH = parseInt($(window).innerHeight() - $('#qfHeader').height() - 1);
    if (CUPS.TURNIER[I] || CUPS.ANMELDERF[I]) {
        $('#dRumpf').html('<div id="ddRumpf" style="width:100%; margin-left: auto; margin-right: auto; overflow-y: auto; height:' + hH + 'px; background-image: url(\'Icons/Background.png\'); background-size: 50%; background-position: center center; background-repeat: no-repeat; ">'
                + '<div style="margin-left: 10%;">'
                + '<br>'
                + '<div class="ui-grid-a"><div class="ui-block-a S2" style="width:47%">'

                + (I === 49
                        ? hVorschub + '<div class="M" style="width:92%;text-align:justify;">Seit 2008 findet jedes Jahr im April das Tarock-Österreich-Finale im Königrufen statt. Die besten Tarockspieler aus ganz Österreich treffen sich im Casino Linz zu einem Tarockevent der Extraklasse.</div>'
                        : ''
                        )

                + (I === 50 && !mHausruckAktiv
                        ? hVorschub + 'Organisationsteam:&nbsp;&nbsp;<b>Bert Greisinger,<br> Franz Emeder, Franz Kienast</b><br><br>'
                        + 'E-Mail:&nbsp;&nbsp;<span class="cBlau P M2" onclick="window.location.href=\'mailto:f.kienast@eduhi.at\';" >f.kienast@eduhi.at</span><br>'
                        + 'Tarockhandy:&nbsp;&nbsp;0660 5275150<br>'
                        : ''
                        )

                + (I === 52 && !mRaiffeisenAktiv
                        ? hVorschub + 'Organisation:&nbsp;&nbsp;<b><span class=M2>Karl Haas jun.</span></b><br><br>'
                        + 'E-Mail:&nbsp;&nbsp;<span class="cBlau P M2" onclick="window.location.href=\'mailto:office@tarockcup.at\';" >office@tarockcup.at</span><br>'
                        : ''
                        )

                + (I === 53 && !mSauwaldAktiv
                        ? hVorschub + 'Organisation:&nbsp;&nbsp;<b><span class=M2>Sepp Lang</span></b><br><br>'
                        + 'E-Mail:&nbsp;&nbsp;<span class="cBlau P M2" onclick="window.location.href=\'mailto:sepp47@gmx.at\';" >sepp47@gmx.at</span><br>'
                        : ''
                        )

                + (I === 55 && !mTirolAktiv
                        ? hVorschub + 'Organisation:&nbsp;&nbsp;<b><span class=M2>Markus Mair</span></b><br><br>'
                        + 'E-Mail:&nbsp;&nbsp;<span class="cBlau P M2" onclick="window.location.href=\'mailto:treff.tarock@chello.at\';" >treff.tarock@chello.at</span><br>'
                        : ''
                        )

                + (I === 16
                        ? hVorschub + '<div class="J M" style="margin-right:5%">An lauen Septembertagen mit Freunden der Donau entlang radeln, in diversen Gastgärten mit der Seele baumeln und wer will zwischendurch oder am Abend ein Spielchen wagen. Was will das Spielerherz mehr?</div>'
                        : ''
                        )

//                + (I === 16
//                        ? hVorschub + '<span class="cBlau P XL" onClick="hrefStatistik(' + I + ', \'?Tourplan\');"><b>Tourplan</b></span><br>Alle Details, Kosten, etc.<br>'
//                        : ''
//                        )

                + ((I === 16 || I === 49 || I === 50 || I === 52)
                        && (CUPS.MELDAKT[I] || CUPS.BEREadmin[I].indexOf(LS.ME) >= 0)
                        ? hVorschub + '<span class="cBlau P XL" onClick="hrefStatistik(' + I + ', \'?Aktuelles\');"><b>Aktuelles</b></span><br>' + getMELDAKT(I) + '<br>'
                        : ''
                        )

                + (I !== 16 && I !== 49 && I !== 50 && I !== 52 && I !== 53 && I !== 55 || I === 50 && mHausruckAktiv || I === 52 && mRaiffeisenAktiv || I === 53 && mSauwaldAktiv || I === 55 && mTirolAktiv || I === 77
                        ? hVorschub + '<span id=bZurStatistik class="cBlau P XL" onclick="hrefStatistik(' + I + ')" ><b>Zur Statistik</b></span>'
                        + ((CUPS.TYP[I] !== 'PR' || CUPS.MEZULETZT[I] + (365 * 86400000) > Date.now()) ? '<br>' + getMeldSTAT(I) + '<br>' : '<br>Nur für Mitspieler...<br>')

                        + (CUPS.TURNIER[I]
                                && (CUPS.MELDAKT[I] || CUPS.BEREadmin[I].indexOf(LS.ME) >= 0) && CUPS.TURNIER[I] !== "Handy"
                                ? hVorschub + '<span class="cBlau P XL" onClick="hrefStatistik(' + I + ', \'?Aktuelles\');"><b>Aktuelles</b></span><br>' + getMELDAKT(I) + '<br>'
                                : ''
                                )

                        + (CUPS.TURNIER[I] && CUPS.TURNIER[I] !== 'Handy' && (CUPS.BEREadmin[I].indexOf(LS.ME) >= 0 || CUPS.BEREadmin[I].indexOf('*') >= 0 || I <= 3)
                                ? hVorschub + '<span class="cBlau P XL" onclick="zumTurnier()" ><b>Zum Turnier</b></span><br>Vivat Valat!<br>'
                                : ''
                                )
                        + (((!CUPS.TURNIER[I] || CUPS.TURNIER[I] === 'Handy') && (CUPS.BEREadmin[I].indexOf(LS.ME) >= 0 || CUPS.BEREschreiben[I].indexOf(LS.ME) >= 0 || ((CUPS.BEREadmin[I].indexOf('*') >= 0 || CUPS.BEREschreiben[I].indexOf('*') >= 0) && LS.ME !== "NOBODY") || I <= 7) && I !== 80)
                                ? hVorschub + '<span class="cBlau P XL" onclick="fEinNeuerTisch(' + I + ')" ><b>Ein neuer Tisch</b></span><br>Vivat Valat!<br>'
                                : ''
                                )
                        + (CUPS.ANMELDERF[I]
                                ? hVorschub + '<span class="cBlau P XL" onclick="hrefStatistik(' + I + ', \'?Anmeldungen\')"><b>Zur Anmeldung</b></span><br>An- und abmelden<br>'
                                : ''
                                )
                        : ''
                        )

                + (CUPS.BEREadmin[I].indexOf(LS.ME) >= 0
                        || LS.ME === '3425'
                        || I <= 2
                        || ((CUPS.TYP[I] === 'CUP' || CUPS.TYP[I] === 'ET' || CUPS.TYP[I] === 'MT') && (CUPS.BEREschreiben[I].indexOf(LS.ME) >= 0 || LS.ME === meinStellvertreter))
                        ? hVorschub + '<span class="cBlau P L" onclick="hrefParameterAendern(' + I + ')" ><b>Parameter ändern</b></span><br>'
                        : ''
                        )

                + (((I === 3 && LS.ME === '3425') || (I === 53 && LS.ME === '4506') || (I === 54 && (LS.ME === '3590' || LS.ME === '6058')) || (I === 55 && LS.ME === '3244') || (I === 77 && LS.ME === '3425') || (I === 125 && LS.ME === '3425')) && PC
                        ? hVorschub + '<span class="cBlau P L" onclick="window.location.href = \'Abakus/TurnierImport.html\'" ><b>Turnier einspielen</b></span><br>'
                        : ''
                        )

                + '</div><div class="ui-block-b M" style="width:50%;text-align:justify;">'

                + hVorschub + (I === 56 ? '<img src="Icons/LogoWTC.png" align="left" style="fload:left;width:120px;height:160px;smargin-left:-60px;margin-right:10px">' : '') + getCupText()

                + '</div></div>'


                + ((I === 50 || I === 52) && CUPS.MELDSTAT[I]
                        ? hVorschub + '<b><span class=S3>' + CUPS.MELDSTAT[I] + '</span></b><br>'
                        : ''
                        )

                + hVorschub + html
                + (I === 80 || CUPS.TURNIER[I] && CUPS.TURNIER[I] !== 'Handy' && (isNaN(pTermin) || pTermin === false)
                        ? getTurnierkalender()
                        : ''
                        )
                + '</div></div>');
    } else {
        $('#dRumpf').html('<div style="width:100%; margin-left: auto; margin-right: auto; overflow-y: auto; height:' + hH + 'px; background-image: url(\'Icons/Background.png\'); background-size: 50%; background-position: center center; background-repeat: no-repeat; ">'
                + '<div style="margin-left: 30%;" class=M>'
                + '<br><br>'
                + html
                + '<span id=bZurStatistik class="cBlau P XL" onclick="hrefStatistik(' + I + ')" ><b>Zur Statistik</b></span>'
                + ((CUPS.TYP[I] !== 'PR' || CUPS.MEZULETZT[I] + (365 * 86400000) > Date.now()) ? '<br>' + getMeldSTAT(I) + '<br>' : '<br>Nur für Mitspieler...<br>')
                + (CUPS.BEREadmin[I].indexOf(LS.ME) >= 0 || CUPS.BEREschreiben[I].indexOf(LS.ME) >= 0 || ((CUPS.BEREadmin[I].indexOf('*') >= 0 || CUPS.BEREschreiben[I].indexOf('*') >= 0) && LS.ME !== "NOBODY") || I <= 7
                        ? hVorschub
                        + (LS.I === I
                                ? '<span class="cBlau P XL" onclick="fZuMeinemTisch()"><b>Zu meinem Tisch</b></span><br>Es wurden ' + LS.gespielt + ' Spiele gespielt.<br>'
                                : '<span class="cBlau P XL" onclick="fEinNeuerTisch(' + I + ')"><b>Ein neuer Tisch</b></span><br>Vivat Valat!<br>'
                                )
                        : ''
                        )
                + ((CUPS.TYP[I] !== 'CUP' && CUPS.BEREadmin[I].indexOf(LS.ME) >= 0) || LS.ME === '3425' || I <= 2
                        ? hVorschub + '<span class="cBlau P L" onclick="hrefParameterAendern(' + I + ')" ><b>Parameter ändern</b></span><br>'
                        : ''
                        )
                + hVorschub + getCupText()
                + '</div></div>');
    }
    $('#dCopyright').each(function () { // sonst funktioniert important nicht
        this.style.setProperty('display', 'none', 'important');
    });
// HOCHFORMAT !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    if (hMeldung) {
        $('#hfText').html('<div class="B cRot">' + hMeldung + '</div>' + CUPS.TEXT1[i] + htmlNaechstTermin);
    } else {
        $('#hfText').html(CUPS.TEXT1[i] + htmlNaechstTermin);
    }
}

function listVersion() {
    'use strict';
    var vDate = getVersionsDatum();
    var hVersion = vDate.getFullYear() + '.' + (vDate.getMonth() + 1) + '.' + vDate.getDate();
    $('#tVersion,#tVersion2').text(hVersion);
    if (LS.Meldung) {
        writeLOG('ABAKUS: ' + LS.Meldung);
    }
    var sDate = new Date(CUPS.TIMESTAMP);
    var hDate = new Date();
    if (new Date('2016-01-11T18:02:22.210Z').getHours() !== 19) {
        $('#dMeldung').append("<img src='Icons/Fehler.png' width='24' height='24'>&nbsp;&nbsp;Diese App bietet<br>"
                + 'nur in der Zeitzone Wien<br>'
                + 'die volle Funktionalität.<br>'
                + 'Korrigiere die Zeitzone.<br>').show();
    }
    if (sDate.getFullYear() > hDate.getFullYear() || sDate.getTime() > hDate.getTime() + 60000 * 60) {  // + 60 Minuten Toleranz
        $('#dMeldung').append("<img src='Icons/Fehler.png' width='24' height='24'>&nbsp;&nbsp;Das Datum ist nicht aktuell.<br>"
                + 'Korrigiere das Systemdatum.<br>').show();
    }
    if (sDate.getFullYear() < hDate.getFullYear()) {
        $('#dMeldung').append("<img src='Icons/Fehler.png' width='24' height='24'>&nbsp;&nbsp;Das System wurde für " + hDate.getFullYear() + '<br>'
                + 'noch nicht freigegeben.<br>'
                + 'Sollte das Problem nach dem drücken von [Initialisiern] weiter bestehen, '
                + 'informiere einen Administrator.<br>').show();
    }
}

function toggleTechDetails() {
    if ($('#dTechDetails').is(":hidden")) {
        $('#dTechDetails').html('<b>Technische Details:</b><br>'
                + 'performance.navigation.type: ' + performance.navigation.type + '<br>'
                + 'navigator.vendor: ' + navigator.vendor + '<br>'
                + (("standalone" in window.navigator && window.navigator.standalone)
                        ? 'navigators.standalone: true<br>'
                        : '')
                + 'navigator.userAgent: ' + navigator.userAgent + '<br>'
                + 'navigator.platform: ' + navigator.platform + '<br>'
                + (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream ? 'iOS navigation.type: ' + window.performance.navigation.type + '<br>' : '')
                + 'pixelDepth: ' + screen.pixelDepth + '<br>'
                + '<span id="p451">portrait, min-width: 451px<br></span>'
                + '<span id="p361">portrait: 361-450px<br></span>'
                + '<span id="p360">portrait, max-width: 360px<br></span>'
                + 'querformat: ' + QUERFORMAT() + '<br>'
                + 'screensize: ' + screen.width + ' x ' + screen.height + '<br>'
                + 'innersize: ' + $(window).innerWidth() + ' x ' + $(window).innerHeight() + '<br>'
                + 'history.length: ' + history.length + '<br>'
                + 'document.domain: ' + document.domain + '<br>'
                + 'screen: ' + JSON.stringify(screen) + '<br>'
                + 'location.hash: ' + location.hash + '<br>').show();
        $('#pContent').scrollTop(9999999);
    } else {
        $('#dTechDetails').hide();
    }
}

function getTIME(pDAT) {
    'use strict';
    var std, min, p;
    p = new Date(pDAT);
    if (p) {
        std = p.getHours();
        min = p.getMinutes();
        if (std < 10) {
            std = '0' + std;
        }
        if (min < 10) {
            min = '0' + min;
        }
        return std + ':' + min;
    } else {
        return '00:00';
    }
}

function windowLocationReplace() {
    'use strict';
    setTimeout(function () {
        window.location.replace('Abakus/Exit.html');
    }, 20);
}

function initExtraButtons() {
    'use strict';
    if (LS.ME === '3425' || LS.ME === '3244' || LS.ME === 'NOBODY') {
        $('#bRegistrieren').show();
    } else {
        $('#bRegistrieren').hide();
    }

    $('#bAdminTools,#bFindSpieler,#bRAMOS').hide();
    if (LS.ME === '3425'
            || CUPS.BEREadmin[50].indexOf(LS.ME) >= 0 || CUPS.BEREschreiben[50].indexOf(LS.ME) >= 0
            || CUPS.BEREadmin[51].indexOf(LS.ME) >= 0 || CUPS.BEREschreiben[51].indexOf(LS.ME) >= 0
            || CUPS.BEREadmin[52].indexOf(LS.ME) >= 0 || CUPS.BEREschreiben[52].indexOf(LS.ME) >= 0
            || CUPS.BEREadmin[53].indexOf(LS.ME) >= 0 || CUPS.BEREschreiben[53].indexOf(LS.ME) >= 0
            || CUPS.BEREadmin[54].indexOf(LS.ME) >= 0 || CUPS.BEREschreiben[54].indexOf(LS.ME) >= 0
            || CUPS.BEREadmin[55].indexOf(LS.ME) >= 0 || CUPS.BEREschreiben[55].indexOf(LS.ME) >= 0
            || CUPS.BEREadmin[56].indexOf(LS.ME) >= 0 || CUPS.BEREschreiben[56].indexOf(LS.ME) >= 0
            ) {
        $('#bAdminTools,#bFindSpieler').show();
    }
    if (LS.ME === '3425' || LS.ME === 'x3759') { // Karl Zeinhofer
        $('#bRAMOS').show();
    }

    if (LS.ME === '4731' || LS.ME === '0197' || LS.ME === '2553') { // Alex Sabkovski, Manfred Huemer, Arno Peter --- Turnierkalender
        $('#bAdminTools').show();
    }

    if (!QUERFORMAT()) {
        $('#bLinks,#bAdminTools').hide();
    }
}

function whenSPIELERloaded() {
    LS.VIP = isVIP(SPIELERext[LS.ME][12]); // VIP-Status eintragen
    localStorage.setItem('Abakus.LS', JSON.stringify(LS));
}

function getClass(i) {

    if (i === LS.I) {
        return 'cAktiv';
    }
    if (CUPS.TYP[i] === 'PR' && LS.ME === 'NOBODY') {
        return 'ui-disabled'; // Muss sein, sonst können alle privaten Runden angesehen werden
    }

    var cReturn = '';
    if (CUPS.TYP[i] === 'WR'
            || CUPS.TYP[i] === 'FC'
            || CUPS.TYP[i] === 'TC'
            || CUPS.TYP[i] === 'PR' && (CUPS.MEZULETZT[i] + (365 * 86400000) > Date.now())) { // 365 Tage
        if (CUPS.SPIELTAGE[i][(new Date()).getDay()] === 'J') {
            cReturn = 'fGruen';
            if (CUPS.TURNIER[i] && (CUPS.WOCHEN[i][parseInt((new Date().getDate() - 1) / 7)] !== 'J')) {
                cReturn = '';
            }
        }
        if (CUPS.NEXTTERMIN[i]) {
            if (CUPS.NEXTTERMIN[i] > new Date().valueOf()) {
                cReturn = '';
            }
            if (new Date(CUPS.NEXTTERMIN[i]).toDateString() === new Date().toDateString()) {
                cReturn = 'fGruen';
            }
        }
    }
    return cReturn;
}

function getClassMeinTermin(i) {

    if (i === LS.I) {
        return 'cAktiv';
    }
    var cReturn = 'cDIV';
    if (CUPS.TYP[i] === 'WR'
            || CUPS.TYP[i] === 'FC'
            || CUPS.TYP[i] === 'TC'
            || CUPS.TYP[i] === 'PR' && (CUPS.MEZULETZT[i] + (365 * 86400000) > Date.now())) { // 365 Tage
        if (CUPS.SPIELTAGE[i][(new Date()).getDay()] === 'J') {
            cReturn = 'fGruen';
            if (CUPS.TURNIER[i] && (CUPS.WOCHEN[i][parseInt((new Date().getDate() - 1) / 7)] !== 'J')) {
                cReturn = 'cDIV';
            }
        }
        if (CUPS.NEXTTERMIN[i]) {
            if (CUPS.NEXTTERMIN[i] > new Date().valueOf()) {
                cReturn = 'cDIV';
            }
            if (new Date(CUPS.NEXTTERMIN[i]).toDateString() === new Date().toDateString()) {
                cReturn = 'fGruen';
            }
        }
    }
    return cReturn;
}

function getCupToggleDiv(pPrefix, pCup, pTermin) {

    if (pCup === 51) {
        pCup = 51;
    }
    var hBtnName = pPrefix + pCup;
    if (pTermin) {
        if (pTermin === -1) {
            hBtnName = pPrefix + pCup + 'T';
        } else {
            hBtnName = pPrefix + pCup + 'T' + TERMINE[pTermin].I;
        }
    }
    var hReturn = '<div id="tgl' + hBtnName + '" class="S TGL" style="margin-left:4px;margin-right:4px;" hidden>';
    if (pTermin && pTermin !== -1) {
        hReturn += '<div style="margin: 6px 6px 0 6px">'
                + TERMINE[pTermin].TEXT.replace(/;/g, '<br>').replace(/ß/g, '&szlig;')
                + '</div>';
    }
    var nextTurnier = 0;
    var nextTerminI = false;
    var heuteTurnier = false;
    if (CUPS.TURNIER[pCup] || CUPS.ANMELDERF[pCup]) {
        for (var termin in CUPS.TERMINE) {
            if (CUPS.TERMINE[termin].CUP === pCup) {
                if (CUPS.TERMINE[termin].DATUM >= hHeute) {
                    if (CUPS.TERMINE[termin].DATUM === hHeute) {
                        heuteTurnier = true;
                        if ((CUPS.TERMINE[termin].BEGINN && CUPS.TERMINE[termin].BEGINN > new Date().getHours())
                                || ((pCup === 54 || pCup === 56) && new Date().getHours() < 16)
                                || ((pCup !== 54 && pCup !== 56) && new Date().getHours() < 20)) {
                            nextTurnier = CUPS.TERMINE[termin].DATUM;
                            nextTerminI = termin;
                            break;
                        }
                    } else {
                        nextTurnier = CUPS.TERMINE[termin].DATUM;
                        nextTerminI = termin;
                        break;
                    }
                }
            }
        }
        if ((CUPS.TYP[pCup] === 'CUP' || CUPS.TYP[pCup] === 'ET' || CUPS.TYP[pCup] === 'MT') && nextTurnier) {
            var ueNextTurnier = 0;
            var ueNextTerminI = false;
            for (var termin in CUPS.TERMINE) {
                if (CUPS.TERMINE[termin].CUP === pCup && termin !== nextTerminI) {
                    if (CUPS.TERMINE[termin].DATUM >= hHeute) {
                        if (CUPS.TERMINE[termin].DATUM === hHeute) {
                            heuteTurnier = true;
                            if ((CUPS.TERMINE[termin].BEGINN && CUPS.TERMINE[termin].BEGINN > new Date().getHours())
                                    || ((pCup === 54 || pCup === 56) && new Date().getHours() < 16)
                                    || ((pCup !== 54 && pCup !== 56) && new Date().getHours() < 20)) {
                                ueNextTurnier = CUPS.TERMINE[termin].DATUM;
                                ueNextTerminI = termin;
                                break;
                            }
                        } else {
                            ueNextTurnier = CUPS.TERMINE[termin].DATUM;
                            ueNextTerminI = termin;
                            break;
                        }
                    }
                }
            }
        }
    }

    if (CUPS.TYP[pCup] === 'CUP' || CUPS.TYP[pCup] === 'ET' || CUPS.TYP[pCup] === 'MT') { // Cups ///////////////////////////////////////////////////////////
// Ein neuer Tisch / Zu meinem Tisch
// Zur Statistik
        if (pCup !== 49 && pCup !== 50 && pCup !== 52) {
            hReturn += (heuteTurnier && pCup !== 53 && pCup !== 55 && LS.ME.length === 4 && LS.Schreiber || pCup < 8
                    ? (LS.I !== pCup || LS.AnzSpieler === 0
                            ? '<div class="ui-btn M2 TL" style="margin:10px 6px 0 6px" onClick="fEinNeuerTisch(' + pCup + ');">'
                            + '<img src=\'Icons/MeinTisch.png\' height="48" width="48" style="float:left;margin: 3px 2vw 0 2vw">Ein neuer Tisch<div class="S N">Einen neuen Tisch eröffnen</div>'
                            : '<div class="ui-btn M2 TL" style="margin:10px 6px 0 6px"onClick="fZuMeinemTisch();">'
                            + '<img src=\'Icons/MeinTisch.png\' height="48" width="48" style="float:left;margin: 3px 2vw 0 2vw"><span style="color: #dd1111">Zu meinem Tisch</span><div class="S N">Weiterspielen, speichern, etc.</div>'
                            )
                    + '</div>'
                    : '')
                    + '<div class="ui-btn M2 TL" style="margin:10px 6px 0 6px" onClick="hrefStatistik(' + pCup + ');">'
                    + '<img src=\'Icons/Statistik.png\' height="48" width="48" style="float:left;margin: 3px 2vw 0 2vw">Zur Statistik<div class="S N">' + getMeldSTAT(pCup) + '</div>'
                    + '</div>';
        }
        if (nextTurnier >= hHeute) {
            if (pTermin !== false
                    && ueNextTurnier
                    && TERMINE[pTermin].CUP === pCup
                    && TERMINE[pTermin].DATUM === CUPS.TERMINE[nextTerminI].DATUM
                    ) {
                hReturn += '<div class="ui-btn M2 TL" style="margin:10px 6px 0 6px" onClick="$(\'#tglXX' + hBtnName + '\').toggle();">'
                        + '<img src=\'Icons/Kalender.png\' height="48" width="48" style="float:left;margin: 3px 2vw 0 2vw">Übernächstes Turnier<div class="S N">' + (ueNextTurnier === hHeute ? 'Heute' : getDateString(ueNextTurnier)) + '&nbsp;&nbsp;' + CUPS.TERMINE[ueNextTerminI].NAME + '</div></div>'
                        + '<div id="tglXX' + hBtnName + '" style="margin-left:4px;margin-right:4px;" hidden>'
                        + (CUPS.TERMINE[ueNextTerminI].BEGINN ? 'Ende der Anmeldung: ' + CUPS.TERMINE[ueNextTerminI].BEGINN + '.<br>' : '')
                        + CUPS.TERMINE[ueNextTerminI].TEXT
                        + '</div>';
            } else {
                hReturn += '<div class="ui-btn M2 TL" style="margin:10px 6px 0 6px" onClick="$(\'#tglXX' + hBtnName + '\').toggle();">'
                        + '<img src=\'Icons/Kalender.png\' height="48" width="48" style="float:left;margin: 3px 2vw 0 2vw">Nächstes Turnier<div class="S N">' + (nextTurnier === hHeute ? 'Heute' : getDateString(nextTurnier)) + '&nbsp;&nbsp;' + CUPS.TERMINE[nextTerminI].NAME + '</div></div>'
                        + '<div id="tglXX' + hBtnName + '" style="margin-left:4px;margin-right:4px;" hidden>'
                        + (CUPS.TERMINE[nextTerminI].BEGINN ? 'Ende der Anmeldung: ' + CUPS.TERMINE[nextTerminI].BEGINN + '.<br>' : '')
                        + CUPS.TERMINE[nextTerminI].TEXT
                        + '</div>';
            }
        }
        if (CUPS.MELDAKT[pCup]) {
            hReturn += '<div class="ui-btn M2 TL" style="margin:10px 6px 0 6px" onClick="hrefStatistik(' + pCup + ', \'?Aktuelles\');">'
                    + '<img src=\'Icons/News.png\' height="48" width="48" style="float:left;margin: 3px 2vw 0 2vw">Aktuelles<div class="S N">' + getMELDAKT(pCup) + '</div>'
                    + '</div>';
        }


    } else if (CUPS.TURNIER[pCup]) { // Spontanturniere /////////////////////////////////////////////////////////////////////////////////
// Zur Anmeldung
// Turnier starten / Runde x beenden / Turnier beenden
// Ein neuer Tisch / Zu meinem Tisch
// Zur Statistik
// Parameter ändern
        var hMeld = '';
        if ((LS.ME === '3013' || LS.ME === '2624' || LS.ME === '3425') && pCup === 9 && hHeute < "2020-03-03") {
            for (var termin in TERMINE) {  //  llll llll
                if (TERMINE[termin].CUP === pCup) {
                    hMeld += TERMINE[termin].DATUM + ':<br>';
                }
            }
        }

        var hHeuteTurnier = false;
        if (LS.I === pCup) {
            hHeuteTurnier = true;
        } else {
            if (LS.ME.length === 4 && pCup !== 53 && pCup !== 55) {
                for (var termin in TERMINE) {  //  llll llll
                    if (TERMINE[termin].CUP === pCup && TERMINE[termin].DATUM === hHeute) {
                        hHeuteTurnier = true;
                        hMeld += TERMINE[termin].DATUM + ': !!!!!!!!!<br>';
                        break;
                    }
                }
            }
        }
        if (hHeuteTurnier && CUPS.BEREadmin[pCup].indexOf(LS.ME) >= 0 || pCup < 8) {
            var hStartStopText = '';
            if (!LS.TURADMIN || LS.TURADMIN === LS.ME || pCup < 8) {
                var hStartStopClass = '';
            } else {
                var hStartStopClass = ' ui-disabled';
            }
            if (LS.I !== pCup || !LS.TURRUNDE) {
                hStartStopText = 'Turnier starten<div class="S N">Turnier starten und beenden</div>';
            } else if (LS.I === pCup) {
                if (LS.TURRUNDE < CUPS.RUNDEN[pCup]) {
                    if (LS.TURGESPIELT && LS.AnzSpieler === 0 && LS.TURRUNDE === 1) {
                        hStartStopText = '<span style="color: #dd1111">Runde ' + LS.TURRUNDE + ' beenden</span>';
                    } else {
                        hStartStopText = 'Runde ' + LS.TURRUNDE + ' beenden';
                    }
                } else if (LS.TURGESPIELT && LS.AnzSpieler === 0) {
                    hStartStopText = '<span style="color: #dd1111">Turnier beenden</span>';
                } else {
                    hStartStopText = 'Turnier beenden';
                }
                if (!LS.TURADMIN || LS.TURADMIN === LS.ME || pCup < 8) {
                    hStartStopText += '<div class="S N">Turnier starten und beenden</div>';
                } else {
                    hStartStopText += '<div class="S N">Administrator: <b>' + LS.TURADMIN + '</b></div>';
                }
            }
            hReturn += '<div class="ui-btn M2 TL' + hStartStopClass + '" style="margin:10px 6px 0 6px" onClick="fStartStop(' + pCup + ', true);">'
                    + '<img src=\'Icons/Turnier.png\' height="48" width="48" style="float:left;margin: 3px 2vw 0 2vw">' + hStartStopText
                    + '</div>';
        }

        if (LS.ME !== 'NOBODY'
                && (CUPS.BEREadmin[pCup].indexOf(LS.ME) >= 0
                        || CUPS.BEREschreiben[pCup].indexOf(LS.ME) >= 0
                        || pCup < 8)) {
            if (hHeuteTurnier || pCup < 8) {
                if (LS.I !== pCup || LS.AnzSpieler === 0) {
                    hReturn += '<div class="ui-btn M2 TL" style="margin:10px 6px 0 6px" onClick="fEinNeuerTisch(' + pCup + ');">'
                            + '<img src=\'Icons/MeinTisch.png\' height="48" width="48" style="float:left;margin: 3px 2vw 0 2vw">Ein neuer Tisch<div class="S N">Einen neuen Tisch eröffnen</div>'
                            + '</div>';
                } else {
                    hReturn += '<div class="ui-btn M2 TL" style="margin:10px 6px 0 6px"onClick="fZuMeinemTisch();">'
                            + '<img src=\'Icons/MeinTisch.png\' height="48" width="48" style="float:left;margin: 3px 2vw 0 2vw"><span style="color: #dd1111">Zu meinem Tisch</span><div class="S N">Weiterspielen, speichern, etc.</div>'
                            + '</div>';
                }
            } else {
                if ((LS.ME === '3013' || LS.ME === '2624' || LS.ME === '3425') && pCup === 9 && hHeute < "2020-03-03") {
                    hMeld += LS.ME + ': Turnier: ' + hHeuteTurnier + ',  Admin: ' + CUPS.BEREadmin[pCup].indexOf(LS.ME) + ',  Schreiben: ' + CUPS.BEREschreiben[pCup].indexOf(LS.ME);
                    writeLOG(hMeld);
                }
            }
        } else {
            if ((LS.ME === '3013' || LS.ME === '2624' || LS.ME === '3425') && pCup === 9 && hHeute < "2020-03-03") {
                hMeld = LS.ME + ': Turnier: ' + hHeuteTurnier + ',  Admin: ' + CUPS.BEREadmin[pCup].indexOf(LS.ME) + ',  Schreiben: ' + CUPS.BEREschreiben[pCup].indexOf(LS.ME);
                writeLOG(hMeld);
            }
        }

        hReturn += '<div class="ui-btn M2 TL" style="margin:10px 6px 0 6px" onClick="hrefStatistik(' + pCup + ');">'
                + '<img src=\'Icons/Statistik.png\' height="48" width="48" style="float:left;margin: 3px 2vw 0 2vw">Zur Statistik<div class="S N">' + getMeldSTAT(pCup) + '</div>'
                + '</div>';

        if (CUPS.ANMELDERF[pCup] && LS.ME !== 'NOBODY') {
            hReturn += '<div class="ui-btn M2 TL" style="margin:10px 6px 0 6px" onClick="hrefStatistik(' + pCup + ', \'?Anmeldungen\');">'
                    + '<img src=\'Icons/Anmeldung.png\' height="48" width="48" style="float:left;margin: 3px 2vw 0 2vw">Zur Anmeldung<div class="S N">Nächstes Turnier:&nbsp;&nbsp;' + getDateString(CUPS.NEXTTERMIN[pCup]) + '</div>'
                    + '</div>';
        }

        if (CUPS.BEREadmin[pCup].indexOf(LS.ME) >= 0 || pCup < 8) {
            hReturn += '<div class="ui-btn M2 TL" style="margin:10px 6px 0 6px" onClick="hrefParameterAendern(' + pCup + ');">'
                    + '<img src=\'Icons/Optionen.png\' height="48" width="48" style="float:left;margin: 3px 2vw 0 2vw">Parameter ändern<div class="S N">Beschreibung und Berechtigungen ändern</div>'
                    + '</div>';
        }

    } else { //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        var iWochentag = (new Date()).getDay();
        var iVortag = iWochentag - 1;
        if (iWochentag === 0) {
            iVortag = 6;
        } else {
            iVortag = iWochentag - 1;
        }
        if (pCup === 4) {
            pCup = 4;
        }
        if (CUPS.BEREadmin[pCup].indexOf(LS.ME) >= 0
                || CUPS.BEREschreiben[pCup].indexOf(LS.ME) >= 0
                || pCup < 8) {
            if (LS.I === pCup
                    || CUPS.SPIELTAGE[pCup][iWochentag] === 'J'
                    || CUPS.SPIELTAGE[pCup][iVortag] === 'J' && (new Date()).getHours() <= 4) {
                if (LS.I !== pCup || LS.AnzSpieler === 0) {
                    hReturn += '<div class="ui-btn M2 TL" style="margin:10px 6px 0 6px" onClick="fEinNeuerTisch(' + pCup + ');">'
                            + '<img src=\'Icons/MeinTisch.png\' height="48" width="48" style="float:left;margin: 3px 2vw 0 2vw">Ein neuer Tisch<div class="S N">Einen neuen Tisch eröffnen</div>'
                            + '</div>';
                } else {
                    hReturn += '<div class="ui-btn M2 TL" style="margin:10px 6px 0 6px"onClick="fZuMeinemTisch();">'
                            + '<img src=\'Icons/MeinTisch.png\' height="48" width="48" style="float:left;margin: 3px 2vw 0 2vw"><span style="color: #dd1111">Zu meinem Tisch</span><div class="S N">Weiterspielen, speichern, etc.</div>'
                            + '</div>';
                }
            }
        }
        hReturn += '<div class="ui-btn M2 TL" style="margin:10px 6px 0 6px" onClick="hrefStatistik(' + pCup + ');">'
                + '<img src=\'Icons/Statistik.png\' height="48" width="48" style="float:left;margin: 3px 2vw 0 2vw">Zur Statistik<div class="S N">' + getMeldSTAT(pCup) + '</div>'
                + '</div>';
        if (CUPS.ANMELDERF[pCup]) {
            hReturn += '<div class="ui-btn M2 TL" style="margin:10px 6px 0 6px" onClick="hrefStatistik(' + pCup + ', \'?Anmeldungen\');">'
                    + '<img src=\'Icons/Anmeldung.png\' height="48" width="48" style="float:left;margin: 3px 2vw 0 2vw">Zur Anmeldung<div class="S N">Nächste Runde:&nbsp;&nbsp;' + getDateString(CUPS.NEXTTERMIN[pCup]) + '</div>'
                    + '</div>';
        }
        if (CUPS.BEREadmin[pCup].indexOf(LS.ME) >= 0 || pCup < 5) {
            hReturn += '<div class="ui-btn M2 TL" style="margin:10px 6px 0 6px" onClick="hrefParameterAendern(' + pCup + ');">'
                    + '<img src=\'Icons/Optionen.png\' height="48" width="48" style="float:left;margin: 3px 2vw 0 2vw">Parameter ändern<div class="S N">Tarife, Spieltage, etc. ändern</div>'
                    + '</div>';
        }
    }

    if (!pTermin && CUPS.TEXT1[pCup]) {
        if (pCup !== 49) {
            hReturn += '<div class="M J S2" style="margin:6px;">' + CUPS.TEXT1[pCup] + '</div>';
        } else {
            hReturn += '<div class="M J S2" style="margin:6px;">'
                    + '<div class="ui-grid-a">'
                    + '<div class="ui-block-a" style="width:20%"></div>'
                    + '<div class="ui-block-b M" style="width:80%">Die Tarockmeister:</div></div>'
                    + '<div class="ui-grid-a">'
                    + '<div class="ui-block-a C M3" style="width:20%">2019</div>'
                    + '<div class="ui-block-b" style="width:80%"><b>Huemer Manfred</b><br>Bad Leonfelden</div></div>'
                    + '<div class="ui-grid-a">'
                    + '<div class="ui-block-a C M3" style="width:20%">2018</div>'
                    + '<div class="ui-block-b" style="width:80%"><b>Wimmer Anton</b><br>Puchkirchen</div></div>'
                    + '<div class="ui-grid-a">'
                    + '<div class="ui-block-a C M3" style="width:20%">2017</div>'
                    + '<div class="ui-block-b" style="width:80%"><b>Christian Rieseneder</b><br>Wien</div></div>'
                    + '<div class="ui-grid-a">'
                    + '<div class="ui-block-a C M3" style="width:20%">2016</div>'
                    + '<div class="ui-block-b" style="width:80%"><b>Mülleder Josef</b><br>Bad Leonfelden</div></div>'
                    + '<div class="ui-grid-a">'
                    + '<div class="ui-block-a C M3" style="width:20%">2015</div>'
                    + '<div class="ui-block-b" style="width:80%"><b>Zauner Hubert</b><br>Bad Ischl</div></div>'
                    + '<div class="ui-grid-a">'
                    + '<div class="ui-block-a C M3" style="width:20%">2014</div>'
                    + '<div class="ui-block-b" style="width:80%"><b>Stürmer Rudi</b><br>Bad Leonfelden</div></div>'
                    + '<div class="ui-grid-a">'
                    + '<div class="ui-block-a C M3" style="width:20%">2013</div>'
                    + '<div class="ui-block-b" style="width:80%"><b>Ebner Florian</b><br>Linz</div></div>'
                    + '<div class="ui-grid-a">'
                    + '<div class="ui-block-a C M3" style="width:20%">2012</div>'
                    + '<div class="ui-block-b" style="width:80%"><b>Böckl Josef</b><br>Neukirchen/V.</div></div>'
                    + '<div class="ui-grid-a">'
                    + '<div class="ui-block-a C M3" style="width:20%">2011</div>'
                    + '<div class="ui-block-b" style="width:80%"><b>Leimhofer Markus</b><br>Neustadl</div></div>'
                    + '<div class="ui-grid-a">'
                    + '<div class="ui-block-a C M3" style="width:20%">2010</div>'
                    + '<div class="ui-block-b" style="width:80%"><b>Manzenreiter Hermann</b><br>Bad Leonfelden</div></div>'
                    + '<div class="ui-grid-a">'
                    + '<div class="ui-block-a C M3" style="width:20%">2009</div>'
                    + '<div class="ui-block-b" style="width:80%"><b>Doppler Manfred</b><br>Ampflwang</div></div>'
                    + '<div class="ui-grid-a">'
                    + '<div class="ui-block-a C M3" style="width:20%">2008</div>'
                    + '<div class="ui-block-b" style="width:80%"><b>Huemer Manfred</b><br>Bad Leonfelden</div></div>'
                    + '</div>';
        }

    } else {
        hReturn += '<div style="margin-top:10px;"></div>';
    }
    hReturn += '</div>';
    return hReturn;
}

function whenCUPSloaded() {

    initExtraButtons();
    if (LS.I && LS.AnzSpieler) { // ????
        if (LS.gespielt > 0) {
            $('#tCupName').html(CUPS.NAME[LS.I] + '<br>' + (LS.gespielt === 1 ? 'Ein Spiel' : LS.gespielt + ' Spiele') + ' gespielt');
        } else if (LS.TURRUNDE) {
            $('#tCupName').html(CUPS.NAME[LS.I] + '<br>' + LS.TURRUNDE + '. Runde');
        } else {
            $('#tCupName').html(CUPS.NAME[LS.I] + '<br>' + LS.AnzSpieler + ' Spieler warten');
        }
        $('#tZuMeinemTisch,#tCupName').addClass('cRot');
        $('#bZuMeinemTisch').show();
    } else {
        $('#bZuMeinemTisch').hide();
    }

    if (LS.ME[0] === '-') { // User für Turnier-PC
        LS.ShowCups = parseInt(LS.ME) * -1;
        localStorage.setItem('Abakus.LS', JSON.stringify(LS));
        showEinenMoment(CUPS.NAME[LS.ShowCups] + ':', "Die Turnierverwaltung wird gestartet.");
        setTimeout(function () {
            window.location.replace('_Turnier/TU_1_Anmeldung.html?init');
        }, 20);
    }

    TERMINE = [];
    for (var termin in CUPS.TERMINE) {
        if (CUPS.TERMINE[termin].DATUM >= hHeute && CUPS.TERMINE[termin].CUP > -4) { // llll
            TERMINE[TERMINE.length] = CUPS.TERMINE[termin];
            TERMINE[TERMINE.length - 1].I = termin;
        }
    }

    for (var iii = 1; iii < CUPS.ANMELDERF.length; iii++) { // llll
        if (CUPS.ANMELDERF[iii]) {
            if (CUPS.MEZULETZT[iii] + (200 * 86400000) > Date.now() // 200 Tage
                    || CUPS.BEREadmin[iii].indexOf(LS.ME) >= 0
                    || CUPS.BEREschreiben[iii].indexOf(LS.ME) >= 0) {
                if (!CUPS.NEXTTERMIN[iii]) {
                    CUPS.NEXTTERMIN[iii] = 0;
                }
                if (CUPS.NEXTTERMIN[iii] < Date.now()) {
                    CUPS.NEXTTERMIN[iii] = getNextTermin(iii);
                }
                TERMINE[TERMINE.length] = {
                    DATUM: myDateString(CUPS.NEXTTERMIN[iii]),
                    CUP: iii
                };
            }
        }
    }

    TERMINE.sort(function (a, b) {
        return (a.DATUM > b.DATUM) ? 1 : ((b.DATUM > a.DATUM) ? -1 : 0);
    });
    if (window.location.search) { // Quickstart
        LS = new Object();
        LS = JSON.parse(localStorage.getItem('Abakus.LS'));
        if (LS) { // nicht beim allerersten Aufruf
            CUPS = new Object();
            CUPS = JSON.parse(localStorage.getItem('Abakus.CUPS'));
            if (CUPS) {
                var hCupName = window.location.search.replace(/\%20|_| /g, '').substr(1).toUpperCase();
                var newCup = 0;
                if (hCupName === 'WR.TAROCKCUP') {
                    newCup = 56;
                } else if (hCupName === 'ST.TAROCKCUP') {
                    newCup = 54;
                } else if (hCupName === 'WR.MARATHON') {
                    newCup = 80;
                } else if (hCupName === 'CAFEHEINECUP') {
                    newCup = 8;
                } else {
                    for (var ii = CUPS.NAME.length; ii > 0; ii--) {
                        if (CUPS.NAME[ii]) {
                            if (CUPS.NAME[ii].toUpperCase().replace(/\%20|_| /g, '').indexOf(hCupName) >= 0) {
                                newCup = ii;
                                break;
                            }
                        }
                    }
                }
                if (newCup) {
                    if (newCup <= 4) {
                        LS.LastBtn = '#bTR' + newCup;
                    } else if (newCup <= 7) {
                        LS.LastBtn = '#bAR' + newCup;
                    } else if (CUPS.TYP[newCup] === 'CUP' && newCup >= 50 && newCup <= 59) {
                        LS.LastBtn = '#bCT' + newCup;
                    } else if (CUPS.TYP[newCup] === 'CUP' || CUPS.TURNIER[newCup]) {
                        LS.LastBtn = '#bLC' + newCup;
                    } else if (CUPS.TYP[newCup] === 'ET' || CUPS.TYP[newCup] === 'MT') {
                        LS.LastBtn = '#bET' + newCup;
                    } else if (CUPS.TYP[newCup] === 'PR') {
                        LS.LastBtn = '#bPR' + newCup;
                    } else {
                        LS.LastBtn = '#bFC' + newCup;
                    }
                    LS.ShowCups = newCup;
                    LS.Quickstart = true;
                    if (hCupName.indexOf('/REGELN') > 0) {
                        LS.ShowFunktion = '?Reglen';
                    } else if (LS.VIC[0] === 0) {
                        LS.VIC[0] = newCup;
                    }
                    localStorage.setItem('Abakus.LS', JSON.stringify(LS));
                    window.location.replace(window.location.origin + window.location.pathname);
                }
            }
        }
    }

    var i = 0;
    var nAktTermine = 0;
    var nMeineRundenCups = 0;
    var htmlAKT = '<div id="bAK" data-role="collapsible" data-theme="d" data-corners="false" data-iconpos="right" class="K"><h2>&nbsp;Aktuelle Termine:</h2><ul data-role="listview">';
    var htmlALLE = '<div id="bAL" data-role="collapsible" data-theme="d" data-corners="false" data-iconpos="right" class="K"><h2>&nbsp;Alle Termine:</h2><ul data-role="listview">';
    var htmlMR = '<div id="bMR" data-role="collapsible" data-theme="d" data-corners="false" data-iconpos="right" class=" "><h2>&nbsp;Meine Cups/Runden:</h2><ul data-role="listview">';
    var htmlCT = '<div id="bCT" data-role="collapsible" data-theme="d" data-corners="false" data-iconpos="right" class="K"' + (LS.Quickstart ? ' data-collapsed="false"' : '') + '><h2>&nbsp;Cups:</h2><ul data-role="listview">';
    var htmlLC = '<div id="bLC" data-role="collapsible" data-theme="d" data-corners="false" data-iconpos="right" class="K"><h2>&nbsp;Lokale Cups:</h2><ul data-role="listview">';
    var htmlET = '<div id="bET" data-role="collapsible" data-theme="d" data-corners="false" data-iconpos="right" class="K"><h2>&nbsp;Einzelne Turniere:</h2><ul data-role="listview">';
    var htmlFC = '<div id="bFC" data-role="collapsible" data-theme="d" data-corners="false" data-iconpos="right" class="K"><h2>&nbsp;Wirtshausrunden:</h2><ul data-role="listview">';
    var htmlPR = '<div id="bPR" data-role="collapsible" data-theme="d" data-corners="false" data-iconpos="right" class="K"><h2>&nbsp;Private Runden:</h2><ul data-role="listview">';
    var htmlTR = '<div id="bTR" data-role="collapsible" data-theme="d" data-corners="false" data-iconpos="right" class="K"><h2>&nbsp;Testrunden -turniere:</h2><ul data-role="listview">';
    var htmlAR = '<div id="bAR" data-role="collapsible" data-theme="d" data-corners="false" data-iconpos="right" class="K"><h2>&nbsp;Allgemeine Runden:</h2><ul data-role="listview">';
    if (LS.Quickstart) {
        delete LS.Quickstart;
        localStorage.setItem('Abakus.LS', JSON.stringify(LS));
    }
    var hTemp = '';
    var hBtnName = 'b??';
    var hAktuellBis = myDateString(Date.now() + (86400000 * LS.AktTage));
    for (var termin in TERMINE) {
        if (CUPS.NAME[TERMINE[termin].CUP].substr(0, 4).toUpperCase() !== "TEST" && TERMINE[termin].CUP >= 8) {
            if (TERMINE[termin].DATUM >= hHeute && !TERMINE[termin].NAME
                    || TERMINE[termin].DATUM >= hHeute && TERMINE[termin].NAME && (TERMINE[termin].NAME.substr(0, 4).toUpperCase() !== "TEST" || LS.ME === "3425")) {
                if (TERMINE[termin].CUP === 80 || CUPS.TYP[TERMINE[termin].CUP] === 'CUP' || CUPS.TYP[TERMINE[termin].CUP] === 'ET' || CUPS.TYP[TERMINE[termin].CUP] === 'MT') {
                    var hCupName = '';
                    var hCupFarbe = '';
                    if (CUPS.TYP[TERMINE[termin].CUP] === 'MT') {
                        hCupName = 'Wr. Tarockcup';
                    } else if (TERMINE[termin].CUP === 49) {
                        hCupName = 'Österreichfinale';
                        hCupFarbe = ' cTOF';
                    } else if (TERMINE[termin].CUP === 50) {
                        hCupName = 'Hausruckcup';
                        hCupFarbe = ' cHRC';
                    } else if (TERMINE[termin].CUP === 51) {
                        hCupName = 'Ktn. Tarockcup';
                        hCupFarbe = ' cKTC';
                    } else if (TERMINE[termin].CUP === 52) {
                        hCupName = 'Raiffeisencup';
                        hCupFarbe = ' cRTC';
                    } else if (TERMINE[termin].CUP === 53) {
                        hCupName = 'Sauwaldcup';
                        hCupFarbe = ' cSWC';
                    } else if (TERMINE[termin].CUP === 54) {
                        hCupName = 'St. Tarockcup';
                        hCupFarbe = ' cSTC';
                    } else if (TERMINE[termin].CUP === 55) {
                        hCupName = 'Tirolcup';
                        hCupFarbe = ' cTTC';
                    } else if (TERMINE[termin].CUP === 56) {
                        hCupName = 'Wr. Tarockcup';
                        hCupFarbe = ' cWTC';
                    } else if (TERMINE[termin].CUP === 80) {
                        hCupName = 'Wr. Marathon';
                        hCupFarbe = ' cDIV';
                    } else if (TERMINE[termin].CUP === 15) {
                        hCupName = 'Stadl Tarock';
                        hCupFarbe = ' cDIV';
                    } else {
                        hCupName = CUPS.NAME[TERMINE[termin].CUP];
                        hCupFarbe = ' cDIV';
                    }
                    hBtnName = 'bAL' + TERMINE[termin].CUP + 'T' + TERMINE[termin].I;
                    hTemp = '<li data-icon=false><a id="' + hBtnName + '" class="K' + hCupFarbe + '" onClick="showCup(' + TERMINE[termin].CUP + ",\'bAL\'," + TERMINE[termin].I + ')">&nbsp;&nbsp;<span class="L N">' + getDateString(TERMINE[termin].DATUM) + '&nbsp;&nbsp;' + (TERMINE[termin].BEGINN ? TERMINE[termin].BEGINN : '') + '&nbsp;&nbsp;&nbsp;</span><span class="S N">' + hCupName + '&nbsp;<br></span>&nbsp;&nbsp;' + TERMINE[termin].NAME + '</a></li>'
                            + getCupToggleDiv('bAL', TERMINE[termin].CUP, termin);
                    htmlALLE += hTemp;
                    if (TERMINE[termin].DATUM <= hAktuellBis) {
                        if (TERMINE[termin].CUP === 49 || LS.VIC[TERMINE[termin].CUP] || TERMINE[termin].CUP === 80 && LS.VIC[56]) {
                            nAktTermine++;
                            htmlAKT += hTemp.replace(/bAL/g, 'bAK');
                        }
                    }
                } else {

                    hTemp = getMeinTerminBarZeile(TERMINE[termin].CUP)
                            + getCupToggleDiv('bAL', TERMINE[termin].CUP, -1);

                    function getMeinTerminBarZeile(pCup) {
                        if (typeof CUPS.MEANGEMELDET[pCup] === 'number') {
                            if (CUPS.MEANGEMELDET[pCup] > Date.now()) {
                                return '<li data-icon=false><a id=bAL' + pCup + 'T class="K ' + getClassMeinTermin(pCup) + '" onClick="showCup(' + pCup + ',\'bAL\',-1)">&nbsp;&nbsp;<span class="L N">' + getDateString(CUPS.NEXTTERMIN[pCup]) + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="S cGruen">angemeldet<br></span>&nbsp;&nbsp;' + getCupName(pCup) + '</a></li>';
                            } else {
                                return '<li data-icon=false><a id=bAL' + pCup + 'T class="K ' + getClassMeinTermin(pCup) + '" onClick="showCup(' + pCup + ',\'bAL\',-1)">&nbsp;&nbsp;<span class="L N">' + getDateString(CUPS.NEXTTERMIN[pCup]) + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="S cRot">nicht angemeldet<br></span>&nbsp;&nbsp;' + getCupName(pCup) + '</a></li>';
                            }
                        }
                        return '<li data-icon=false><a id=bAL' + pCup + 'T class="K ' + getClassMeinTermin(pCup) + '" onClick="showCup(' + pCup + ',\'bAL\',-1,)">&nbsp;&nbsp;<span class="L N">' + getDateString(CUPS.NEXTTERMIN[pCup]) + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="S">???<br></span>&nbsp;&nbsp;' + getCupName(pCup) + '</a></li>';
                    }

                    htmlALLE += hTemp;
                    nAktTermine++;
                    htmlAKT += hTemp.replace(/bAL/g, 'bAK');
                }
            }
        }
    }

    var SORT = [];
    for (i = 0; i < CUPS.NAME.length; i++) {
        if (CUPS.NAME[i]) {
            if (i === 18 && (LS.ME !== '3425' && LS.ME !== '0197')) {           // Wr. Städtische ausblenden
            } else {
                if (i >= 49 && i <= 59) {
                    SORT[SORT.length] = i + CUPS.NAME[i] + '  ;' + i;
                } else {
                    SORT[SORT.length] = CUPS.NAME[i] + '  ;' + i;
                }
            }
        }
    }

    SORT.sort();

    var xText = '';

    for (var i = 50; i <= 56; i++) { // Meine Runden/Cups --- Bei Xxxxxx
        var hShow = false;
        xText = '';
        if (CUPS.BEREadmin[i].indexOf(LS.ME) >= 0
                || CUPS.BEREschreiben[i].indexOf(LS.ME) >= 0) {
            hShow = true;
        }
        if (LS.VIC[i]) {
            hShow = true;
            if (CUPS.TYP[i] === 'CUP' && i !== 49) { // Nicht für Österreichfinale
                if (CUPS.MELDSTAT[i] && (!LS.GelesenSTAT[i] || LS.GelesenSTAT[i] !== CUPS.MELDSTAT[i]) && i !== 50 && i !== 52) {
                    xText = '<div><i class="i zmdi-info-outline noprint" style="color:crimson"></i>&nbsp;</div>';
                }
                if (CUPS.MELDAKT[i] && (!LS.GelesenAKT[i] || LS.GelesenAKT[i] !== CUPS.MELDAKT[i])) {
                    xText = '<div><i class="i zmdi-info-outline noprint" style="color:crimson"></i>&nbsp;</div>';
                }
            }
        }
        if (CUPS.MEZULETZT[i]) {
            if (CUPS.MEZULETZT[i] + (90 * 86400000) > Date.now()) { // Nur wenn in den letzten 90 Tagen gespielt
                hShow = true;
            }
        }
        if (hShow) {
            nMeineRundenCups++;
            htmlMR += '<li data-icon=false><a id="bMR' + i + '" class="' + getClass(i) + '" onClick="showCup(' + i + ',\'bMR\')"><div style="display:flex; justify-content: space-between"><div>&nbsp;' + getCupName(i) + '</div>' + xText + '</div></a></li>'
                    + getCupToggleDiv('bMR', i, false);
        }
    }
    for (var s = 0; s < SORT.length; s++) { // Meine Runden/Cups --- Bei Xxxxxx
        i = parseInt(SORT[s].substring((SORT[s].lastIndexOf(';') + 1)));
        if (i >= 50 && i <= 59) {
        } else if (CUPS.NAME[i].substr(0, 4) === "Test" || i < 5 || CUPS.TYP[i] === 'ET' || CUPS.TYP[i] === 'MT') {
        } else if (i >= 8 && CUPS.BEREadmin[i].indexOf(LS.ME) >= 0) {
            nMeineRundenCups++;
            htmlMR += '<li data-icon=false><a id="bMR' + i + '" class="' + getClass(i) + '" onClick="showCup(' + i + ',\'bMR\')">&nbsp;' + getCupName(i) + '</a></li>'
                    + getCupToggleDiv('bMR', i, false);
        }
    }
    for (var s = 0; s < SORT.length; s++) { // mit Schreibberechtigung >>>>>>>>>> später eventuell entfernen
        i = parseInt(SORT[s].substring((SORT[s].lastIndexOf(';') + 1)));
        if (i >= 50 && i <= 59) {
        } else if (CUPS.NAME[i].substr(0, 4) === "Test" || i < 5 || CUPS.TYP[i] === 'ET' || CUPS.TYP[i] === 'MT') {
        } else if (i >= 8 && CUPS.BEREadmin[i].indexOf(LS.ME) >= 0) {
        } else if (i >= 8 && CUPS.BEREschreiben[i].indexOf(LS.ME) >= 0) {
            nMeineRundenCups++;
            htmlMR += '<li data-icon=false><a id="bMR' + i + '" class="' + getClass(i) + '" onClick="showCup(' + i + ',\'bMR\')">&nbsp;' + getCupName(i) + '</a></li>'
                    + getCupToggleDiv('bMR', i, false);
        }
    }
    for (var s = 0; s < SORT.length; s++) { // Meine Runden/Cups --- Bei Xxxxxx
        i = parseInt(SORT[s].substring((SORT[s].lastIndexOf(';') + 1)));
        if (i >= 50 && i <= 59) {
        } else if (CUPS.NAME[i].substr(0, 4) === "Test" || i < 5 || CUPS.TYP[i] === 'ET' || CUPS.TYP[i] === 'MT') {
        } else if (i >= 8 && CUPS.BEREadmin[i].indexOf(LS.ME) >= 0) {
        } else if (i >= 8 && CUPS.BEREschreiben[i].indexOf(LS.ME) >= 0) {
        } else {
            if (CUPS.MEZULETZT[i]) {
                if (i < 8 && nMeineRundenCups > 0
                        && CUPS.MEZULETZT[i] + (14 * 86400000) > Date.now() // Nur wenn in den letzten 14 Tagen gespielt
                        || CUPS.TYP[i] === 'PR' && CUPS.NAME[i].substr(0, 4) === 'Bei '
                        && CUPS.MEZULETZT[i] + (100 * 86400000) > Date.now() // Nur wenn in den letzten 100 Tagen gespielt
                        || CUPS.TYP[i] === 'PR' && CUPS.NAME[i].substr(0, 4) !== 'Bei '
                        && CUPS.MEZULETZT[i] + (200 * 86400000) > Date.now() // Nur wenn in den letzten 200 Tagen gespielt
                        || CUPS.TYP[i] !== 'PR'
                        && CUPS.MEZULETZT[i] + (300 * 86400000) > Date.now() // Nur wenn in den letzten 300 Tagen gespielt
                        || i < 8 && nMeineRundenCups === 0
                        && CUPS.MEZULETZT[i] + (300 * 86400000) > Date.now()) { // Nur wenn in den letzten 300 Tagen gespielt
                    nMeineRundenCups++;
                    htmlMR += '<li data-icon=false><a id="bMR' + i + '" class="' + getClass(i) + '" onClick="showCup(' + i + ',\'bMR\')">&nbsp;' + getCupName(i) + '</a></li>'
                            + getCupToggleDiv('bMR', i, false);
                }
            }
        }
    }

    for (var s = 0; s < SORT.length; s++) {
        i = parseInt(SORT[s].substring((SORT[s].lastIndexOf(';') + 1)));
        var xText = '';
        if (LS.VIC[i]) {
            if (CUPS.TYP[i] === 'CUP' && i !== 49) { // Nicht für Österreichfinale
                if (CUPS.MELDSTAT[i] && (!LS.GelesenSTAT[i] || LS.GelesenSTAT[i] !== CUPS.MELDSTAT[i]) && i !== 50 && i !== 52) {
                    xText = '<div><i class="i zmdi-info-outline noprint" style="color:crimson"></i>&nbsp;</div>';
                }
                if (CUPS.MELDAKT[i] && (!LS.GelesenAKT[i] || LS.GelesenAKT[i] !== CUPS.MELDAKT[i])) {
                    xText = '<div><i class="i zmdi-info-outline noprint" style="color:crimson"></i>&nbsp;</div>';
                }
            }
        }
        html = '<li data-icon=false><a id="bXX' + i + '" class="' + getClass(i) + '" onClick="showCup(' + i + ',\'bXX\')"><div style="display:flex; justify-content: space-between"><div>&nbsp;' + getCupName(i) + '</div>' + xText + '</div></a></li>'
                + getCupToggleDiv('bXX', i, false);
        if (CUPS.NAME[i].substr(0, 4) === "Test" || CUPS.TYP[i] === 'TR' || i <= 4) { // 4te TestRunde / TestCup
            htmlTR = htmlTR + html;
        } else if (CUPS.TYP[i] === 'CUP' && (i >= 49 && i <= 57)) {
            htmlCT = htmlCT + html;
        } else if (CUPS.TYP[i] === 'CUP' || CUPS.TYP[i] === 'TC') {
            htmlLC = htmlLC + html;
        } else if (CUPS.TYP[i] === 'ET' || CUPS.TYP[i] === 'MT') {
            htmlET = htmlET + html;
        } else if (CUPS.TYP[i] === 'FC') {
            htmlFC = htmlFC + html;
        } else if (CUPS.TYP[i] === 'PR') {
            htmlPR = htmlPR + html;
        } else if (CUPS.TYP[i] === 'AR') {
            htmlAR = htmlAR + html;
        }
    }

    $('#dTermine').html((nAktTermine ? htmlAKT + '</ul></div>' : '')
            + htmlALLE + '</ul></div>').trigger('create');
    if (nMeineRundenCups) {
        $('#dMeineRundenCups').html(htmlMR + '</ul></div>').trigger('create');
    }
//    htmlCT += "<li data-icon='false'><a id='bCTHeinepunkte' class='ui-btn' onclick='showText(\"CTHeinepunkte\")'>&nbsp;<span class=\"N M3\">Warum Heinepunkte?</span></a></li>";
    $('#dRundenCups').html(htmlCT.replace(/bXX/g, 'bCT') + '</ul></div>' + htmlLC.replace(/bXX/g, 'bLC') + '</ul></div>' + htmlET.replace(/bXX/g, 'bET') + '</ul></div>' + htmlFC.replace(/bXX/g, 'bFC') + '</ul></div>' + htmlPR.replace(/bXX/g, 'bPR') + '</ul></div>' + (LS.ME !== 'NOBODY' ? htmlTR.replace(/bXX/g, 'bTR') + '</ul></div>' : '') + htmlAR.replace(/bXX/g, 'bAR') + '</ul></div>').trigger('create').show();
    if (LS.Meldung) {
        $('#dMeldung').append("&nbsp;<img src='Icons/Achtung.png'  width='24' height='24'>&nbsp;<b>" + LS.Meldung + "</b>");
    }
    hideEinenMoment();
    if (navigator.userAgent.match(/Android/i) && CUPS.ABVERSION > getVersion()) {
        showEinenFehler('Diese App ist veraltet!&nbsp;&nbsp;&nbsp;&nbsp;', "Suche im Play Store nach<br>'<b>Die Tarock-App</b>' und<br>aktualisiere diese App.");
    }

    window.scrollTo(0, 0);
    if (QUERFORMAT()) {
        if (LS.LastBtn) {
            $('#bInitialisieren').removeClass('ui-btn-active');
        }
    }
    if (LS.LastBtn) {
        $(LS.LastBtn.substr(0, 4)).collapsible({collapsed: false});
        if ($(LS.LastBtn).length) {
            if (QUERFORMAT()) {
                $(LS.LastBtn).addClass('ui-btn-active').removeClass('cHRC').removeClass('cKTC').removeClass('cRTC').removeClass('cSWC').removeClass('cSTC').removeClass('cTTC').removeClass('cWTC').removeClass('cTOF').removeClass('cDIV').removeClass('fGruen').removeClass('cAktiv');
            }
            if ($('#pContent').position().top + $(LS.LastBtn).offset().top > $(window).innerHeight() / 4) {
                $('#pContent').scrollTop(parseInt($(LS.LastBtn).offset().top - $(window).innerHeight() / 4));
            }
        }
    } else {
        $('#bAK').collapsible({collapsed: false});
        $('#bMR').collapsible({collapsed: false});
    }
    $('#dFooter').show();

    delete TERMINE;

    if (I) {
        showCup(I);
    } else if (QUERFORMAT()) {
        showLogo();
    }
    if (LS.showMeinenTisch) {
        delete LS.showMeinenTisch;
        localStorage.setItem('Abakus.LS', JSON.stringify(LS));
        fZuMeinemTisch();
    }
}

$(document).ready(function () {
    'use strict';

    $('#pFehler').hide();
    if (navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)
            ) {
        PC = false;
    } else {
        PC = true;
    }

    try {
        localStorage.Abakus = 'OK';
    } catch (e) {
// Auf Safari nicht im "Private Modus"
        alert('ACHTUNG: Diese Webseite kann im "Private Modus" nicht aufgerufen werden. Deaktivieren den "Private Modus".');
    }

    if (localStorage.getItem("Abakus.LS") === null) {  // allererster Aufruf
        LS = new Object();
        LS.ME = "NOBODY";
        LS.MEname = 'Nicht registriert';
        LS.Schreibzettel = false;
        LS.I = 0;
        LS.GelesenAKT = [];
        LS.GelesenSTAT = [];
        LS.gespielt = 0; // -1
        LS.Regeln = "Wr.";
        LS.Meldung = '';
        LS.Ansage = '';
        LS.AktTage = 30;
        LS.ShowCups = 0;
        LS.LastBtn = '';
        LS.LastDate = new Date().getTime();
        LS.LoadCups = 0;
        LS.Padding = 2;
        LS.Freunde = [];
        LS.Sterne = ['', '', '', '', '', '', ''];
        LS.Ansagen = true;
        LS.TURCODE = 0;
        LS.TURADMIN = '';
        LS.TURRUNDE = 0;
        LS.TURSPIELER = 0;
        LS.TURGESPIELT = 0;
        LS.Version = 0;
        LS.AnzGespeichert = 0;
        LS.Timeout = 0;
        LS.VIC = [];
        LS.VIP = false;
        LS.FotoAnimieren = false;
        LS.FotoStyle = 0;
        if (QUERFORMAT()) {
            LS.ShowSpielerNr = true;
            LS.AnzSpalten = 2;
        } else {
            LS.AnzSpalten = 1;
        }
        localStorage.setItem('Abakus.LS', JSON.stringify(LS));
    } else {
        LS = JSON.parse(localStorage.getItem('Abakus.LS'));
    }

    if (LS.Version < 932) {
        LS.LastBtn = '';
    }
    if (!LS.GelesenAKT) {
        LS.GelesenAKT = [];
    }
    if (!LS.GelesenSTAT) {
        LS.GelesenSTAT = [];
    }
    if (LS.Version < 967) {
        LS.VIP = false;
    }
    if (LS.Version < 991) {
        LS.LastDate = new Date().getTime();
    }
    if (!LS.MeineCups) {
        LS.MeineCups = [];
    }
    if (!LS.VIC) {
        LS.VIC = [];
        if (LS.MeineCups[1]) {
            LS.VIC[LS.MeineCups[1]] = true;
        }
        if (LS.MeineCups[2]) {
            LS.VIC[LS.MeineCups[2]] = true;
        }
        if (LS.MeineCups[3]) {
            LS.VIC[LS.MeineCups[3]] = true;
        }
        if (LS.MeineCups[4]) {
            LS.VIC[LS.MeineCups[4]] = true;
        }
        if (LS.MeineCups[5]) {
            LS.VIC[LS.MeineCups[5]] = true;
        }
        if (LS.MeineCups[6]) {
            LS.VIC[LS.MeineCups[6]] = true;
        }
        delete LS.MeineCups;
    }

    if (LS.VIC.length === 0) {
        $('#tEinstellungen').html('&nbsp;&nbsp;Du hast deine dir wichtigen<br>&nbsp;&nbsp;Cups noch nicht ausgewählt.&nbsp;');
    } else if (!LS.VIC[0]) {
        $('#tEinstellungen').html('&nbsp;&nbsp;Du hast den dir wichtigsten<br>&nbsp;&nbsp;Cups noch nicht ausgewählt.&nbsp;');
    }

    if (new Date().getTime() > LS.LastDate + 60000 * 60 * 12) { // + 6 Stunden Differenz
        if (IsInteger(LS.VIC[0])) {
            LS.ShowCups = LS.VIC[0]; // Auf Standardcup wegen Lesezeichen zurücksetzen
        }
        LS.LastBtn = '';
    }

    if (window.location.href.toUpperCase().indexOf('?VIPS') > 0) {
        LS.tempVIPs = window.location.href.substr(window.location.href.toUpperCase().indexOf('?VIPS'));
    }

    if (LS.ME !== "3425" && LS.ME !== "1000") {
        document.oncontextmenu = function () {
            return false; // oncontextmenu
        };
    }
    document.onselectstart = function () {
        return false;
    };

    CUPS = JSON.parse(localStorage.getItem('Abakus.CUPS'));
    if (CUPS === null) {
        CUPS = new Object();
        CUPS.NAME = [];
        CUPS.MEANGEMELDET = [];
        CUPS.MEZULETZT = [];
    }

    if (LS.Ansage) {  // verhindert einen mehrfachen Aufruf von Seite2
        LS.Ansage = '';
    }

    LS.LastDate = new Date().getTime();

    localStorage.setItem('Abakus.LS', JSON.stringify(LS));

    initSeite1();

    listVersion();
    $('#tJJJJ,#tJJJJ2').text(new Date().getFullYear());
    if (LS.ME === 'NOBODY') {
        $('#tSpieler').html('Noch nicht registriert.');
    } else {
        $('#tSpieler').html('Registriert für ' + (LS.VIP ? 'den VIP' : 'Spieler') + '<br>' + LS.MEname + '.');
    }

    setTimeout(function () {
        if (!navigator.onLine) {
            $('#dOffline').show();
        } else {
            $('#dOffline').hide();
        }
    }, 10);
    setInterval(function () {
        if (!navigator.onLine) {
            $('#dOffline').show();
        } else {
            $('#dOffline').hide();
        }
    }, 32000);
    $('#pContent').each(function () { // sonst funktioniert important nicht
        this.style.setProperty('height', ($(window).innerHeight() - $('#pContent').offset().top - 1) + 'px', 'important');
    });
    $('#ddRumpf').each(function () { // sonst funktioniert important nicht
        this.style.setProperty('height', ($(window).innerHeight() - $('#ddRumpf').offset().top - 1) + 'px', 'important');
    });

    if ($('#hMenu').is(":visible")) {
        $('.iMain').css('height', $('#hMenu').height() - 4);
    } else if ($('#hMix').is(":visible")) {
        $('.hfHeaderIcon').css('height', $('#hMix').height() - 8);
    }

    if (QUERFORMAT()) {
        myJTip = new jBox('Tooltip', {
            theme: 'TooltipError',
            delayClose: 20,
            closeOnClick: true,
            closeOnEsc: true
        });
    }

    window.onresize = function (e) {
        if ($('#hMenu').is(":visible")) {
            $('.iMain').css('height', $('#hMenu').height() - 4);
        } else if ($('#hMix').is(":visible")) {
            $('.hfHeaderIcon').css('height', $('#hMix').height() - 8);
        }
        $('#pContent').each(function () { // sonst funktioniert important nicht
            this.style.setProperty('height', ($(window).innerHeight() - $('#pContent').offset().top - 1) + 'px', 'important');
        });
        $('#ddRumpf').each(function () { // sonst funktioniert important nicht
            this.style.setProperty('height', ($(window).innerHeight() - $('#ddRumpf').offset().top - 1) + 'px', 'important');
        });
    };

}
);

// if (/iPad|iPhone|iPod|xFirefox/.test(navigator.userAgent) && !window.MSStream) {
if (window.navigator.userAgent.indexOf("Chrome") === -1) {
    window.onpageshow = function (event) {
        if (window.performance.navigation.type === 2) {
            LS = JSON.parse(localStorage.getItem('Abakus.LS'));
            CUPS = JSON.parse(localStorage.getItem('Abakus.CUPS'));
            if (LS.ME === 'NOBODY') {
                $('#tSpieler').html('Noch nicht registriert.');
            } else {
                $('#tSpieler').html('Registriert für ' + (LS.VIP ? 'den VIP' : 'Spieler') + '<br>' + LS.MEname + '.');
            }
            if (LS.VIC.length === 0) {
                $('#tEinstellungen').html('&nbsp;&nbsp;Du hast deine dir wichtigen<br>&nbsp;&nbsp;Cups noch nicht ausgewählt.&nbsp;');
            } else if (!LS.VIC[0]) {
                $('#tEinstellungen').html('&nbsp;&nbsp;Du hast den dir wichtigsten<br>&nbsp;&nbsp;Cups noch nicht ausgewählt.&nbsp;');
            } else {
                $('#tEinstellungen').remove();
            }
            initSeite1();
            $('body').removeClass('ui-disabled');
        }
    };
}