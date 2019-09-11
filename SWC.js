
/* global getVersionsDatum, firebase, pSeite, pCUP */

var PC = false;
var DB = new Object();
var FB = undefined;
var AnmeldungGestartet = false;
var iTURCODE = 0;
var LS = new Object();
var CUPS = new Object();
var STAT = new Object();
var I = 0;
var hShowCup = 0;
var hShowCupText = false;
var iPfad = 'Icons/';
var rPfad = '';
var mTischTurnier = '';
var mHausruckAktiv = false;
var mRaiffeisenAktiv = false;
var mTirolAktiv = false;
var mSauwaldAktiv = false;
var anzVersuche = 0;
var myJBox = null;
var daysOfWeek = ["So,", "Mo,", "Di,", "Mi,", "Do,", "Fr,", "Sa,"];
var monthsOfYear = ["J&auml;n.", "Feb.", "M&auml;rz", "April", "Mai", "Juni", "Juli", "Aug.", "Sep.", "Okt.", "Nov.", "Dez."];
var stLastZitat = [];
var mTischNeuLoeschen = '';
var mHref = false;
var meinStellvertreter = '3244';
var mHash = false;


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
                + 'pixelDepth: ' + screen.pixelDepth + '<br>'
                + '<span id="p451">portrait, min-width: 451px<br></span>'
                + '<span id="p361">portrait: 361-450px<br></span>'
                + '<span id="p360">portrait, max-width: 360px<br></span>'
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

function whenCUPSloaded() {
    hideEinenMoment();
    if (CUPS.ABVERSION > getVersion()) {
        showEinenFehler('Diese App ist veraltet!&nbsp;&nbsp;&nbsp;&nbsp;', "Suche im Play Store nach<br>'<b>Die Tarock-App</b>' und<br>aktualisiere diese App.");
    } else {
        LS.ShowCups = 56;
        LS.Quickstart = true;
        localStorage.setItem('Abakus.LS', JSON.stringify(LS));
        window.location.replace("Statistik/Statistik.html");
    }
}

$(document).ready(function () {


    if (localStorage.getItem("Abakus.LS") === null) {  // allererster Aufruf
        LS = new Object();
        LS.ME = "NOBODY";
        LS.MEname = 'Nicht registriert';
        LS.MeineCups = [56];
        LS.Schreibzettel = false;
        LS.I = 0;
        LS.gespielt = 0; // -1
        LS.Regeln = "Wr.";
        LS.Meldung = '';
        LS.Ansage = '';
        LS.AktTage = 30;
        LS.ShowCups = 0;
        LS.LastBtn = '';
        LS.LastDate = hHeute;
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
        LS.VIP = false;
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

    CUPS = JSON.parse(localStorage.getItem('Abakus.CUPS'));
    if (CUPS === null) {
        CUPS = new Object();
        CUPS.NAME = [];
        CUPS.MEANGEMELDET = [];
        CUPS.MEZULETZT = [];
    }

    listVersion();
    $('#tJJJJ,#tJJJJ2').text(new Date().getFullYear());
    if (LS.ME === 'NOBODY') {
        $('#tSpieler').html('Noch nicht registriert.');
    } else {
        $('#tSpieler').html('Registriert für ' + (LS.VIP ? 'den VIP' : 'Spieler') + '<br>' + LS.MEname + '.');
    }

    var sync = new Date(CUPS.DATE);
    var heute = new Date();
    var nTage = parseInt((heute - sync) / 86400000);
    if (LS.Version !== getVersion()) {
        initCUPSdelAllSTAT();
    } else if (LS.LoadCups > 0 || nTage > 6 || isNaN(nTage)) {
        loadCUPS(false, false, true);
    } else {
        whenCUPSloaded();
    }

});