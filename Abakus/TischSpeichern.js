
/* global firebase, FBlog */

var PC = false;
var LS = new Object();
var DS = new Object();
var CUPS = new Object();
var STAT = new Object();

var FB = undefined;

var aANZSPIELE = [[], [], [], [], [], [], []];
var aANZGEWONNEN = [[], [], [], [], [], [], []];
var aPKTGEWONNEN = [[], [], [], [], [], [], []];
var hTISCHP = [, 0, 0, 0, 0, 0, 0];
var hCUPP = [, 0, 0, 0, 0, 0, 0];
var hMAXSPIELE = 0;

var sBasis = 0;
var nLog = 0;

var myJBox = null;

var iJahr = 0;

function Summieren(I) {
    'use strict';
    log('Summieren', I);

    var i = 0;

    for (var ii = 0; ii <= 19; ii++) {
        aANZSPIELE[I][ii] = 0;
        aANZGEWONNEN[I][ii] = 0;
        aPKTGEWONNEN[I][ii] = 0;
    }

    if (DS.Game[1] !== 'Diverse') {
        $(DS.Game).each(function (e) {
            if (e > 0 && !DS.Storno[e]) {
                i = DS.GameI[e];
                if (I === 0 || DS.Spieler[e] === I) {
                    if (typeof DS.Punkte[DS.Spieler[e]][e] === "number") {
                        aANZSPIELE[I][0]++;
                        aANZSPIELE[I][i]++;
                        aPKTGEWONNEN[I][0] += DS.Punkte[DS.Spieler[e]][e];
                        aPKTGEWONNEN[I][i] += DS.Punkte[DS.Spieler[e]][e];
                        if (DS.Punkte[DS.Spieler[e]][e] >= 0) {
                            aANZGEWONNEN[I][0]++;
                            aANZGEWONNEN[I][i]++;
                        }
                        if (i < 7 && DS.Partner[e] === DS.Spieler[e]) { // DS.Partner[e] === 0 === Renonce
                            aANZSPIELE[I][7]++;
                            aPKTGEWONNEN[I][7] += DS.Punkte[DS.Spieler[e]][e];
                            if (DS.Punkte[DS.Spieler[e]][e] >= 0) {
                                aANZGEWONNEN[I][7]++;
                            }
                        }
                    }
                } else {     // Als Partner oder Gegenspieler
                    if (typeof DS.Punkte[I][e] === "number") {
                        aANZSPIELE[I][19]++;
                        aPKTGEWONNEN[I][19] += DS.Punkte[I][e];
                        if (DS.Punkte[I][e] >= 0) {
                            aANZGEWONNEN[I][19]++;
                        }
                    }
                }
            }
        });
    }
}

function SpeichernNT() {
    'use strict';

    $('#bSpeichern').addClass('ui-disabled');

    log('Speichern 1', 0);
    LS = new Object();
    LS = JSON.parse(localStorage.getItem('Abakus.LS'));
    var DS = new Object();
    DS = JSON.parse(localStorage.getItem('Abakus.DS'));

    for (var iSpieler in LS.NR) {
        if (LS.NR[iSpieler] && !STAT._AKTTURNIER[LS.NR[iSpieler]]) {
            showEineMeldung(LS.I,
                    'Da <b>' + LS.VName[iSpieler] + ' ' + LS.NName[iSpieler] + '</b> inzwischen vom Turnier abgemeldet wurde kann dieser Tisch nicht gespeichert werden.<br>'
                    + '&Uuml;bertrage die Summen auf einen Schreibzettel<br>'
                    + 'und &uuml;bergebe diesen der Turnierleitung.');
            return;
        }
    }

    var STATupd = {};
    for (var iSpieler in LS.NR) {
        if (LS.NR[iSpieler]) {
            if (LS.TURRUNDE === 1) {
                STATupd['_R1_' + LS.NR[iSpieler]] = DS.Punkte[iSpieler][0];
            } else if (LS.TURRUNDE === 2) {
                STATupd['_R2_' + LS.NR[iSpieler]] = DS.Punkte[iSpieler][0];
            } else if (LS.TURRUNDE === 3) {
                STATupd['_R3_' + LS.NR[iSpieler]] = DS.Punkte[iSpieler][0];
            }
        }
    }

    firebase.database().ref('/00/' + ("000" + LS.I).slice(-3) + '/' + STAT._AKTTURNIER._TURNIER + '/_AKTTURNIER')
            .update(STATupd)
            .then(function () {
                var hLASTTURNIER = STAT._AKTTURNIER._TURNIER + ', ' + Date.now();
                firebase.database().ref('/00/' + ("000" + LS.I).slice(-3))
                        .update({
                            _LASTTURNIER: hLASTTURNIER
                        })
                        .then(function () {
                            console.log('****** Alles Bestens.');
                            localStorage.setItem('Abakus.STAT' + ("000" + LS.I).slice(-3), JSON.stringify(STAT));
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
                            LS.ShowCups = LS.I;
                            LS.I = 0;
                            LS.Meldung = ('Der Tisch wurde gespeichert!');
                            localStorage.setItem('Abakus.LS', JSON.stringify(LS));
                            loadTURNIER(LS.ShowCups, STAT._AKTTURNIER._TURNIER, null, hLASTTURNIER, showStatistikNT);
                        })
                        .catch(function (error) {
                            showEinenDBFehler(error, 'SpeichernNT()', 'update /00/' + ("000" + LS.I).slice(-3));
                        });
            })
            .catch(function (error) {
                showEinenDBFehler(error, 'SpeichernNT()', 'update /00/' + ("000" + LS.I).slice(-3) + '/' + STAT._AKTTURNIER._TURNIER);
            });
}

function SpeichernOT() {
    'use strict';

    $('#bSpeichern').addClass('ui-disabled');

    log('Speichern 1', 0);
    LS = new Object();
    LS = JSON.parse(localStorage.getItem('Abakus.LS'));

    CUPS = new Object();
    CUPS = JSON.parse(localStorage.getItem('Abakus.CUPS'));

    log('Speichern 2', 0);
    if ((LS.NR[5] === "" && LS.Spiele[5] > 0)
            || (LS.NR[6] === "" && LS.Spiele[6] > 0)) {
        if (LS.NR[5] === "" && LS.Spiele[5] > 0) {
            showEineWarnung('Spieler 5 anmelden!', 'Spieler 5 hat ' + LS.Spiele[5] + ' Spiele gespielt.');
        } else {
            showEineWarnung('Spieler 6 anmelden!', 'Spieler 6 hat ' + LS.Spiele[6] + ' Spiele gespielt.');
        }
        return;
    }

    log('Speichern 3', 0);
    for (var ii = 0; ii <= 6; ii++) {
        Summieren(ii);
        if (hMAXSPIELE < LS.Spiele[ii]) {
            hMAXSPIELE = LS.Spiele[ii];
        }
    }

    log('Speichern 4', 0);
    for (var i = 1; i <= LS.AnzSpieler; i++) {
        if (LS.Spiele[i] === 0) {
            hCUPP[i] = 0;
        } else {
            hCUPP[i] = DS.Punkte[i][0] * 60 / LS.Spiele[i];
            if (LS.Spiele[i] < Math.round(hMAXSPIELE * CUPS.VOLLAB[LS.I][3] / 100)) {
                hCUPP[i] = hCUPP[i] * (LS.Spiele[i] / (hMAXSPIELE * CUPS.VOLLAB[LS.I][3] / 100));
            }
        }
    }

    if (CUPS.TURNIER[LS.I]) {
        var anzMehr = 0;
        var anzGleich = 0;

        for (var i = 1; i <= LS.AnzSpieler; i++) {
            anzMehr = 0;
            anzGleich = 0;
            for (var ii = 1; ii <= LS.AnzSpieler; ii++) {
                if (hCUPP[i] < hCUPP[ii]) {
                    anzMehr++;
                }
                if (hCUPP[i] === hCUPP[ii]) {
                    anzGleich++;
                }
            }
            hTISCHP[i] = 11 - (anzGleich * 1) - (anzMehr * 2);
            if (LS.AnzSpieler > 4) {
                hTISCHP[i] = hTISCHP[i] + 1;
            }
            if (hTISCHP[i] < 2) {
                hTISCHP[i] = 2;
            }
        }
    }

    log('Speichern 5 - FB.STAT laden:', 0);

    whenSTATloaded();
}

function whenSTATloaded() {
    'use strict';
    if (LS.gespielt !== 0 || LS.AnzGespeichert !== 0) {
        log('Speichern 6 - FB.STAT geladen:', 0);
        $('#emText').append('<br><br>');
        wrtSPIELER(1);
    } else {
        setTimeout(function () {
            window.location.replace('Statistik.html');
        });
    }
}

function log(pText, I) {
    'use strict';
    nLog++;
    console.log(LS.Spieler[I] + '(' + I + '): ' + pText + '.<br>');
}

function wrtSPIELER(I) {
//    'use strict';    wegen inline Funktionen nicht möglich (fehlverhalten auf Android)
    if (I > LS.AnzSpieler) {
        wrtROOT();
        return false;
    }

    log('>>> wrtSPIELER', I);

    if (CUPS.TURNIER[LS.I]) {
        var spTIMESTAMP = new Date(LS.TURTIMESTAMP);
        spTIMESTAMP.setHours(LS.AktRunde);
        spTIMESTAMP.setMinutes(I);
        spTIMESTAMP.setSeconds(0);
        spTIMESTAMP.setMilliseconds(0);
    } else {
        var spTIMESTAMP = new Date(new Date(LS.Von).getTime() - 60000 * new Date(LS.Von).getTimezoneOffset()).toISOString();
    }

    if (I <= LS.AnzGespeichert) {
        $('#emText').append(LS.VName[I] + ' ' + LS.NName[I].substring(0, 1) + LS.Sterne[I] + ' bereits gespeichert.' + '<br>');
        localStorage.setItem('Abakus.LS', JSON.stringify(LS));
        wrtSPIELER(I + 1);
        return false;
    }
    if (LS.Spiele[I] === 0) {
        $('#emText').append(LS.VName[I] + ' ' + LS.NName[I].substring(0, 1) + LS.Sterne[I] + ' hat nicht gespielt.' + '<br>');
        LS.AnzGespeichert = I;
        localStorage.setItem('Abakus.LS', JSON.stringify(LS));
        wrtSPIELER(I + 1);
        return false;
    }

    var ii = -1;
    for (var st = 0; st < STAT.S.length; st++) {
        if (LS.NR[I] === STAT.S[st].NR) {
            ii = st;
            break;
        }
    }

//    if (ii >= 0) {
//        if (new Date(STAT.S[ii].TIMESTAMP).valueOf() === new Date(spTIMESTAMP).valueOf()) {  // bereits gespeichert
//            $('#emText').append(LS.VName[I] + ' ' + LS.NName[I].substring(0, 1) + LS.Sterne[I] + ' bereits gespeichert. (f345)' + '<br>');
//            log('STATadd bereits gespeichert. (Fehler 345).', I);
//            LS.AnzGespeichert = I;
//            localStorage.setItem('Abakus.LS', JSON.stringify(LS));
//            wrtSPIELER(I + 1);
//            return;
//        }
//    }

    function initSTAT(pI) {
        'use strict';
        STAT.S[ii].PUNKTE[pI] = 0;
        STAT.S[ii].SPIELE[pI] = 0;
        if (CUPS.TURNIER[LS.I] !== 'PC') {
            STAT.S[ii].ANZSPIELE[pI] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            STAT.S[ii].ANZGEWONNEN[pI] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            STAT.S[ii].PKTGEWONNEN[pI] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        }
        if (CUPS.TURNIER[LS.I]) {
            STAT.S[ii].STOCKERL[pI] = '-';
            if (pI === 1 || pI === 2) {
                STAT.S[ii].CUPPUNKTE[pI] = [];
            }
        }
    }
    function addDetails(a, b) {
        'use strict';
        var ret = new Array(20);
        for (var ii = 0; ii <= 19; ii++) {
            ret[ii] = a[ii] + b[ii];
        }
        return ret;
    }

    if (ii >= 0) {
        if (!CUPS.TURNIER[LS.I]) {
            STAT.S[ii].TIMESTAMP = new Date(STAT.S[ii].TIMESTAMP);
            if (STAT.S[ii].TIMESTAMP.toDateString() !== new Date().toDateString()) {
                initSTAT(3); // laufende Runde
            }
        }
    } else {
        ii = STAT.S.length;
        STAT.S[ii] = new Object();
        STAT.S[ii].NR = LS.NR[I];
        STAT.S[ii].NNAME = LS.NName[I];
        STAT.S[ii].ORT = LS.Ort[I];
        STAT.S[ii].STERNE = LS.Sterne[I];
        STAT.S[ii].VNAME = LS.VName[I];
        STAT.S[ii].PUNKTE = [0, 0, 0, 0];
        STAT.S[ii].SPIELE = [0, 0, 0, 0];
        if (CUPS.TURNIER[LS.I] !== 'PC') {
            STAT.S[ii].ANZSPIELE = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
            STAT.S[ii].ANZGEWONNEN = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
            STAT.S[ii].PKTGEWONNEN = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
        }
        if (CUPS.TURNIER[LS.I]) {
            STAT.S[ii].CUPPUNKTE = [0, 0, 0, 0];
            STAT.S[ii].PUNKTERx = [];
            STAT.S[ii].SCHREIBER = [];
            STAT.S[ii].STOCKERL = ['-', '-', '-', '-'];
        }
        initSTAT(0); // Gesamt
        initSTAT(1); // laufendes Jahr
        initSTAT(2); // Vorjahr
        initSTAT(3); // laufendes Turnier/Runde
    }

    function incSTAT(pI) {
        'use strict';
        STAT.S[ii].PUNKTE[pI] += DS.Punkte[I][0];
        STAT.S[ii].SPIELE[pI] += LS.Spiele[I];
        if (pI === 1) {
            if (STAT.S[ii].SPIELE[iJahr]) {
                STAT.S[ii].PUNKTE[iJahr] += DS.Punkte[I][0];
                STAT.S[ii].SPIELE[iJahr] += LS.Spiele[I];
            } else {
                STAT.S[ii].PUNKTE[iJahr] = DS.Punkte[I][0];
                STAT.S[ii].SPIELE[iJahr] = LS.Spiele[I];
            }
        }
        if (CUPS.TURNIER[LS.I] !== 'PC') {
            STAT.S[ii].ANZSPIELE[pI] = addDetails(STAT.S[ii].ANZSPIELE[pI], aANZSPIELE[I]);
            STAT.S[ii].ANZGEWONNEN[pI] = addDetails(STAT.S[ii].ANZGEWONNEN[pI], aANZGEWONNEN[I]);
            STAT.S[ii].PKTGEWONNEN[pI] = addDetails(STAT.S[ii].PKTGEWONNEN[pI], aPKTGEWONNEN[I]);
        }
    }

    incSTAT(3); // laufendes Turnier/Runde
    incSTAT(1); // laufendes Jahr
    incSTAT(0); // Gesamt

    if (CUPS.TURNIER[LS.I]) {
        var iRUNDE = LS.AktRunde - 1;
        if (CUPS.TURNIER[LS.I] === 'Handy') {
            STAT.S[ii].PUNKTERx[iRUNDE] = DS.Punkte[I][0];
            if (DS.Game[1] === 'Diverse') { // DS.xxx bei PC-Turnier nicht verfügbar
                STAT.S[ii].SCHREIBER[iRUNDE] = 'm' + new Date().getMilliseconds();
            } else {
                if (LS.NR[I] === LS.ME) {
                    STAT.S[ii].SCHREIBER[iRUNDE] = LS.ME + ',*';
                } else {
                    STAT.S[ii].SCHREIBER[iRUNDE] = LS.ME;
                }
            }
        } else if (CUPS.TURNIER[LS.I] === 'PC') {
            STAT.S[ii].PUNKTERx[iRUNDE] = DS.Punkte[I][0];
            STAT.S[ii].SCHREIBER[iRUNDE] = LS.ME;
        }
        if (STAT.S[ii].STOCKERL[0] === '-'
                && STAT.S[ii].STOCKERL[1] === '-'
                && STAT.S[ii].STOCKERL[2] === '-'
                && STAT.S[ii].STOCKERL[3] === '-') {
            STAT.S[ii].STOCKERL = null;
        }
    }

    if (!STAT.S[ii].STERNE) {
        STAT.S[ii].STERNE = null;
    }

    STAT.S[ii].TIMESTAMP = new Date(spTIMESTAMP).valueOf();

    console.log('>>> ' + '/00/' + ("000" + LS.I).slice(-3) + '/' + STAT.S[ii].NR);

    firebase.database().ref('/00/' + ("000" + LS.I).slice(-3) + '/' + STAT.S[ii].NR)
            .set(STAT.S[ii])  // ACHTUNG !!! .set(...) ist gefählich wie sonst nichts
//.update(STAT.S[ii])
            .then(function () {
                console.log('****** ' + LS.VName[I] + ' ' + LS.NName[I].substring(0, 1) + LS.Sterne[I] + ' gespeichert.');
                $('#emText').append('<strong>' + LS.VName[I] + ' ' + LS.NName[I].substring(0, 1) + LS.Sterne[I] + '.</strong> gespeichert.' + '<br>');
                LS.AnzGespeichert = I;
                localStorage.setItem('Abakus.LS', JSON.stringify(LS));
                wrtSPIELER(I + 1);
            })
            .catch(function (error) {
                console.log('Synchronization failed');
                console.log('?????? Fehler beim Speichern von ' + LS.VName[I] + ' ' + LS.NName[I].substring(0, 1) + LS.Sterne[I] + '.');
                showEinenDBFehler(error);
                $('#bSpeichern').removeClass('ui-disabled');
            });
}

function wrtROOT() {
    'use strict';
    var hSTAT = new Object();
    hSTAT.ZULETZTupd = firebase.database.ServerValue.TIMESTAMP;

    if (CUPS.TURNIER[LS.I]) {
        hSTAT.ZULETZT = new Date(LS.TURTIMESTAMP).toISOString();
    } else {
        hSTAT.ZULETZT = new Date(new Date(LS.Von).getTime() - 60000 * new Date(LS.Von).getTimezoneOffset()).toISOString();
    }
    if (CUPS.TURNIER[LS.I] === 'Handy') {
        if (STAT.TURRUNDE === 2) {
            var hRUNDE3 = true;
            for (var iSTAT = 1; iSTAT < STAT.S.length; iSTAT++) {
                if (STAT.S[iSTAT].SPIELE[3] > 0) {
                    if (!STAT.S[iSTAT].SCHREIBER[1]) {
                        hRUNDE3 = false;
                        break;
                    }
                }
            }
            if (hRUNDE3) {
                hSTAT.TURRUNDE = 3;
            }
        }
    }

    firebase.database().ref('/00/' + ("000" + LS.I).slice(-3))
            .update(hSTAT)
            .then(function () {
                console.log('****** Alles Bestens.');
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
                LS.ShowCups = LS.I;
                if (!CUPS.TURNIER[LS.I]) {
                    LS.I = 0;
                }
                LS.Meldung = ('Der Tisch wurde gespeichert!');
                localStorage.setItem('Abakus.LS', JSON.stringify(LS));
                loadSTAT(LS.ShowCups, null, null, showStatistikOT);
            })
            .catch(function (error) {
                console.log('?????? Fehler bei wrtROOT();');
                showEinenDBFehler(error);
                $('#bSpeichern').removeClass('ui-disabled');
            });
    return;
}


function showStatistikNT() {
    'use strict';
    hideEinenMoment();
    setTimeout(function () {
        window.location.replace('../Statistik/Statistik.html');
    });
}

function showStatistikOT() {
    'use strict';
    setTimeout(function () {
        window.location.replace('Statistik.html');
    });
}

function checkVersion() {
    'use strict';
    var sDate = new Date(CUPS.TIMESTAMP);
    var hDate = new Date();
    if (new Date('2016-01-11T18:02:22.210Z').getHours() !== 19) {
        $('#bSpeichern').addClass('ui-disabled');
        $('#hSpeichern').html('<br><span class="cRot">'
                + '&nbsp&nbsp;Die Zeitzone ist ungleich Wien.<br>'
                + '&nbsp&nbsp;<b>Speichern ist nicht möglich.</b></span>').show();
    } else if (sDate.getFullYear() > hDate.getFullYear() || sDate.getTime() > hDate.getTime() + 60000 * 60) {  // + 60 Minuten Toleranz
        $('#bSpeichern').addClass('ui-disabled');
        $('#hSpeichern').html('<br><span class=cRot>'
                + '&nbsp&nbsp;Das Systemdatum ist nicht aktuell.<br>'
                + '&nbsp&nbsp;<b>Speichern ist nicht möglich.</b></span>').show();
    } else if (sDate.getFullYear() < hDate.getFullYear()) {
        $('#bSpeichern').addClass('ui-disabled');
        $('#hSpeichern').html('<br><span class=cRot>'
                + '&nbsp&nbsp;Das System wurde für ' + hDate.getFullYear() + '<br>'
                + '&nbsp&nbsp;noch nicht freigegeben.<br>'
                + '&nbsp&nbsp;Informiere einen Administrator.<br>'
                + '&nbsp&nbsp;<b>Speichern ist nicht möglich.</b></span>').show();
    }
}


// I N I T  ************************************************************************************
$(document).ready(function () {

    LS = JSON.parse(localStorage.getItem('Abakus.LS'));
    DS = JSON.parse(localStorage.getItem('Abakus.DS'));
    CUPS = JSON.parse(localStorage.getItem('Abakus.CUPS'));

    if (LS.ME !== "3425" && LS.ME !== "1000") {
        document.oncontextmenu = function () {
            return false; // oncontextmenu
        };
    }

    $('#hTitel1').text(CUPS.NAME[LS.I]).css("width", "22vw");

    LS.Von = new Date(LS.Von);
    LS.Bis = new Date(LS.Bis);

    iJahr = LS.Von.getFullYear() - 2010;

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

// ABAKUS initialisieren ***********************************************************************

    var html = '';
    for (var i = 1; i <= 6; i++) {
        if (LS.Spieler[i] === 'ok') {
            html = html + '<tr><td>' + LS.NName[i] + ' ' + LS.VName[i] + LS.Sterne[i] + '</td><td class=TR>gespeichert&nbsp;</td></tr>';
        } else if (LS.Spieler[i]) {
            html = html + '<tr><td>' + LS.NName[i] + ' ' + LS.VName[i] + LS.Sterne[i] + '</td><td class=TR>' + DS.Punkte[i][0] + '&nbsp;</td></tr>';
        } else if (LS.Spiele[i] !== 0) {
            html = html + '<tr><td class="cRot B">???</td><td class=TR>' + DS.Punkte[i][0] + '&nbsp;</td></tr>';
        }
    }

    $("#tSpielerPunkte > tbody").append(html);
    $("#tSpielerPunkte").table("refresh");

    if (LS.AnzGespeichert === 0) {
        $('#tGespielt').text('Es wurden ' + Math.abs(LS.gespielt) + ' Spiele gespielt.');
    } else {
        if (LS.AnzGespeichert === LS.AnzSpieler) {
            $('#tGespielt').html('<b> Das Speichern muss noch abgeschlossen werden.</b>').addClass('cRot');
        } else if (LS.AnzGespeichert > 0) {
            $('#tGespielt').html('<b> ' + (LS.AnzSpieler - LS.AnzGespeichert) + ' Spieler m&uuml;ssen noch ' + (LS.gespielt > 0 ? 'gespeichert' : 'storniert') + ' werden.</b>').addClass('cRot');
        } else {
            $('#tGespielt').html('<b> Der Tisch wurde nicht vollst&auml;ndig ' + (LS.gespielt > 0 ? 'gespeichert' : 'storniert') + '.</b>').addClass('cRot');
        }
    }

    $("#bSpeichern").click(function () {
        firebase.initDB(LS.I, 'rw');
        var hLog = CUPS.NAME[LS.I];
        if (LS.TURRUNDE && LS.TURTISCH) {
            hLog += '<br>Runde: ' + LS.TURRUNDE + '&nbsp;&nbsp;Tisch: ' + LS.TURTISCH + '.';
        }
        hLog += '<br>Es wurden ' + LS.gespielt + ' Spiele gespielt.';
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
                + 'Der Tisch wird/wurde gespeichert.';
        writeLOG(hLog);
        if (CUPS.TYP[LS.I] === 'CUP' || CUPS.TYP[LS.I] === 'MT') {
            loadSTAT(LS.I, 'Der Tisch wird gespeichert:', null, SpeichernNT);
        } else {
            loadSTAT(LS.I, 'Der Tisch wird gespeichert:', null, SpeichernOT);
        }
    });

    checkVersion();

    if (/iPad|iPhone/.test(navigator.userAgent)) {
        window.onbeforeunload = function (event) {
            $('body').addClass('ui-disabled');
        };
    }
});