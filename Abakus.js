
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
var hHeute = myDateString(new Date());
var anzVersuche = 0;
var myJBox = null;
var daysOfWeek = ["So,", "Mo,", "Di,", "Mi,", "Do,", "Fr,", "Sa,"];
var monthsOfYear = ["J&auml;n.", "Feb.", "M&auml;rz", "April", "Mai", "Juni", "Juli", "Aug.", "Sep.", "Okt.", "Nov.", "Dez."];
var stLastZitat = 0;
var lastBtn = '';
var mTischNeuLoeschen = '';
var mHref = false;

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

function goRoot() {
    $('#hMix,#pCup,#pTisch').hide();
    $('#hMenu,#pMenu').show();
    I = 0;
    LS.ShowCups = 0;
    history.back();
}

function fHref(pHref) {
    $('body').addClass('ui-disabled');
    mHref = true;
//    if (window.location.hash) {
//        history.back();
//    }
//    window.location.href = pHref;
    if (window.location.hash) {
        window.location.replace(pHref);
    } else {
        window.location.href = pHref;
    }
}

function QUERFORMAT() {
    if ($(window).innerWidth() > $(window).innerHeight()) {
        return true;
    } else {
        return false;
    }
}

function hrefStatistik(pParameter) {
    if (!pParameter) {
        pParameter = '';
    }
    if (CUPS.BEREadmin[I].indexOf(LS.ME) >= 0
            || CUPS.BEREschreiben[I].indexOf(LS.ME) >= 0
            || CUPS.TYP[I] !== 'PR'
            || CUPS.TYP[I] === 'PR' && CUPS.MEZULETZT[I] && (
            (CUPS.MEZULETZT[I] + (100 * 86400000) < Date.now() && CUPS.NAME[I].substr(0, 4) === 'Bei ')
            || (CUPS.MEZULETZT[I] + (365 * 86400000) < Date.now()))) {
        localStorage.setItem('Abakus.LS', JSON.stringify(LS));
        if (CUPS.TURNIER[I] && CUPS.TURNIER[I] !== 'Handy') {
            fHref("Statistik/Statistik.html");
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
    I = LS.ShowCups;
    showCUPS();
    if (QUERFORMAT()) {
        if (LS.ShowCups) {
            showCup(I, false, false, '?');
        } else {
            showLogo(true);
        }
        $('#pMenu').show();
        $('#hMix').hide();
    } else { // ?????????????????????? llll
        if (I === 0) {
            $('#hMix,#pCup,#pTisch').hide();
            $('#hMenu,#pMenu').show();
        } else {
            if (I === LS.I) {
                initSeite2();
            }
            showCup(I);
        }
    }
}

function writeCanvas(pCup) {
    var hTitel = '';
    var hTitel2 = '???';
    if (!isNaN(pCup)) {
        if (CUPS.TYP[pCup] === "CUP" || CUPS.TYP[pCup] === "TC") {
            hTitel2 = 'Lokaler Cup';
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
        } else if (pCup === 50) {
            if (QUERFORMAT) {
                hTitel2 = 'Eine Veranstaltung des Wiener Tarockcup';
            } else {
                hTitel2 = 'Ein außergewöhnlicher Event';
            }
        } else if (pCup === 59) {
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
        if (pCup >= 50 && pCup <= 59) {
            $(".hfHeaderIcon,#qfHeaderIcon").attr("src", "Icons/i" + pCup + ".png");
        } else {
            $(".hfHeaderIcon,#qfHeaderIcon").attr("src", "Icons/Farben.png");
        }
        if (QUERFORMAT()) {
            if (pCup === 50) {
                hTitel = '1. Wiener Tarockmarathon';
                document.title = '1. Wr. Marathon';
                hTitel2 = 'Eine Veranstaltung des Wiener Tarockcup';
            } else if (pCup === 51) {
                hTitel = 'Hausruckviertler Tarockcup';
                document.title = 'HRC - ' + CUPS.NAME[pCup].replace('  ', ' ').replace('/', '-');
                hTitel2 = 'Internet:&nbsp;&nbsp;<span class="cBlau P" onclick="window.open(\'https://hausruckcup1.jimdo.com\')" >hausruckcup1.jimdo.com</span>';
            } else if (pCup === 52) {
                hTitel = 'Raiffeisen Tarockcup Austria';
                document.title = 'RTC - ' + CUPS.NAME[pCup].replace('  ', ' ').replace('/', '-');
                hTitel2 = 'Internet:&nbsp;&nbsp;<span class="cBlau P" onclick="window.open(\'http://www.tarockcup.at\')" >www.tarockcup.at</span>';
            } else if (pCup === 53) {
                document.title = 'SWC - ' + CUPS.NAME[pCup].replace('  ', ' ').replace('/', '-');
                hTitel2 = 'Internet:&nbsp;&nbsp;<span class="cBlau P" onclick="window.open(\'https://tarockrunde-sauwald.jimdo.com\')" >tarockrunde-sauwald.jimdo.com</span>';
            } else if (pCup === 54) {
                document.title = 'STC - ' + CUPS.NAME[pCup].replace('  ', ' ').replace('/', '-');
                hTitel2 = 'Internet:&nbsp;&nbsp;<span class="cBlau P" onclick="window.open(\'https://tarockcup.weebly.com\')" >https://tarockcup.weebly.com</span>';
            } else if (pCup === 55) {
                document.title = 'TTC - ' + CUPS.NAME[pCup].replace('  ', ' ').replace('/', '-');
                hTitel = 'Tiroler Tarockcup';
                hTitel2 = 'Internet:&nbsp;&nbsp;<span class="cBlau P" onclick="window.open(\'http://www.tarock.tirol\')" >www.tarock.tirol</span>';
            } else if (pCup === 56) {
                document.title = 'WTC - ' + CUPS.NAME[pCup].replace('  ', ' ').replace('/', '-');
                hTitel = 'Wiener Tarockcup';
                hTitel2 = 'Internet:&nbsp;&nbsp;<span class="cBlau P" onclick="window.open(\'http://wienertarockcup.at\')" >www.WienerTarockcup.at</span>';
            } else if (pCup === 58) {
                document.title = 'SST - ' + CUPS.NAME[pCup].replace('  ', ' ').replace('/', '-');
            } else {
                document.title = CUPS.NAME[pCup].replace('  ', ' ').replace('/', '-');
            }
        }
        if (pCup === 56 && window.location.href.toUpperCase().indexOf('OOV') > 0) {
            hTitel = 'Wr. Tarockcup - out of Vienna';
        } else {
            hTitel = hTitel.replace(/ |_/g, '&nbsp;');
        }
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
    $('#qfHeaderIcon').show();
}

function myDateString(pDate) {
    var hDate = new Date(pDate);
    return hDate.getFullYear() + '-' + ('00' + (hDate.getMonth() + 1)).substr(-2) + '-' + ('00' + (hDate.getDate())).substr(-2);
}

function toggleShow(pToggle) {
    if ($(pToggle).is(":visible")) {
        $(pToggle).toggle('show');
    } else {
        $('.TGL').hide();
        $(pToggle).toggle('show');
    }
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
    if (QUERFORMAT()) {
        if (lastBtn) {
            resetLastBtn();
            $('#bInitialisieren').addClass('ui-btn-active'); // nicht beim ersten Mal
        }
    }
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

function initSeite2() {
    'use strict';
    $('#bWeiter,#bSpieler,#bSpeichern').removeClass('ui-disabled'); // Wegen iOS entfernen

    var DS = JSON.parse(localStorage.getItem('Abakus.DS'));
    if (CUPS.TURNIER[I] && CUPS.TURNIER[I] === 'PC') {
        $('#bSpieler').addClass('ui-disabled');
        if (CUPS.SPJERUNDE[I] > LS.gespielt) {
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
            || LS.AnzSpieler < 4
            || CUPS.TURNIER[I] === 'PC' && QUERFORMAT() && (CUPS.BEREadmin[I].indexOf(LS.ME) >= 0 || I <= 3)) { // Am PC zum Turnier
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
        ;
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
}

function checkShowCup(i) {
    'use strict';
    setTimeout(function () {
        if (hShowCupText) {
            hShowCupText = false;
        } else {
            showCup(i, false, false, '#bMR');
        }
    });
}

function resetLastBtn() {
    if (lastBtn) {
        $(lastBtn).removeClass('ui-btn-active');
        if (lastBtn.indexOf('T') > 1) {
            if (lastBtn.length > 8) {
                if (lastBtn.substr(0, 8) === '#bCUP51T') {
                    $(lastBtn).addClass('cHRC');
                } else if (lastBtn.substr(0, 8) === '#bCUP52T') {
                    $(lastBtn).addClass('cRTC');
                } else if (lastBtn.substr(0, 8) === '#bCUP53T') {
                    $(lastBtn).addClass('cSWC');
                } else if (lastBtn.substr(0, 8) === '#bCUP54T') {
                    $(lastBtn).addClass('cSTC');
                } else if (lastBtn.substr(0, 8) === '#bCUP55T') {
                    $(lastBtn).addClass('cTTC');
                } else if (lastBtn.substr(0, 8) === '#bCUP56T') {
                    $(lastBtn).addClass('cWTC');
                } else {
                    $(lastBtn).addClass('cDIV');
                }
            }
        } else if (lastBtn === '#bCUP51'
                || lastBtn === '#bCUP52'
                || lastBtn === '#bCUP53'
                || lastBtn === '#bCUP55') {
            $(lastBtn).addClass('cDIV');
        } else {
            var hCup = 0;
            if (lastBtn.substr(0, 5) === '#bCUP') {
                hCup = parseInt(lastBtn.substr(5)); // #bCUP
            } else if (lastBtn.substr(0, 4) === '#bMR') {
                hCup = parseInt(lastBtn.substr(4)); // #bMR
            }
            if (hCup) {
                var hClass = getClass(hCup);
                if (hClass) {
                    $(lastBtn).addClass(hClass);
                }
            }
        }
    }
}

function showCup(i, pTermin, pAnmeldungen, pMR) {
    'use strict';
    LS.ShowCups = I = i;
    if (LS.Meldung) {
        var hMeldung = LS.Meldung;
    }
    if (QUERFORMAT()) {
        resetLastBtn();
        if (pMR && pMR === '#bMR') {
            lastBtn = '#bMR' + i;
            $(lastBtn).addClass('ui-btn-active').removeClass('fGruen').removeClass('cAktiv');
        } else if (pTermin || pTermin === 0) {
            lastBtn = '#bCUP' + i + 'T' + pTermin;
            $(lastBtn).addClass('ui-btn-active').removeClass('cRTC').removeClass('cHRC').removeClass('cSWC').removeClass('cSTC').removeClass('cTTC').removeClass('cWTC').removeClass('cDIV').removeClass('fGruen');
        } else {
            if (pMR && pMR === '?' && $('#bMR' + i).length) {
                lastBtn = '#bMR' + i;
            } else {
                lastBtn = '#bCUP' + i;
                if (i === 51 || i === 52 || i === 53 || i === 55) {
                    $(lastBtn).removeClass('cDIV');
                }
            }
            $(lastBtn).addClass('ui-btn-active').removeClass('cAktiv').removeClass('fGruen');
        }
    } else {
        if (pAnmeldungen === '?Anmeldungen') {
            hrefStatistik(pAnmeldungen);
            return;
        }
        if (!(CUPS.BEREadmin[I].indexOf(LS.ME) >= 0 || CUPS.BEREschreiben[I].indexOf(LS.ME) >= 0 || ((CUPS.BEREadmin[I].indexOf('*') >= 0 || CUPS.BEREschreiben[I].indexOf('*') >= 0) && LS.ME !== "NOBODY") || I <= 7)) {
            hrefStatistik();
            return;
        }
    }

    writeCanvas(I);
// QUERFORMAT !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    var hVorschub = '<br><br>';
    var html = '';
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
        html += '<br>';
        hVorschub = '<br>';
    } else if (pTermin !== false && !isNaN(pTermin)) {
        if (CUPS.TERMINE[pTermin].CUP === I) {
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
    if (I >= 50 && I <= 59) {
        hVorschub = '<br>';
    }
    hVorschub = '<br><br>';
    var hH = parseInt($(window).innerHeight() - $('#qfHeader').height() - 1);
    if (CUPS.TURNIER[I] || CUPS.ANMELDERF[I]) {
        $('#dRumpf').html('<div id="ddRumpf" style="width:100%; margin-left: auto; margin-right: auto; overflow-y: auto; height:' + hH + 'px; background-image: url(\'Icons/Background.png\'); background-size: 50%; background-position: center center; background-repeat: no-repeat; ">'
                + '<div style="margin-left: 10%;">'
                + '<br>'
                + '<div class="ui-grid-a"><div class="ui-block-a M" style="width:47%">'

                + (I === 51 && !mHausruckAktiv
                        ? hVorschub + 'Organisation:&nbsp;&nbsp;<b><span class=M2>Franz Kienast</span></b><br><br>'
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

                + (I === 51 && !mHausruckAktiv && (LS.ME === '1014' || LS.ME === '3425')
                        || I === 52 && !mRaiffeisenAktiv && (LS.ME === '0124' || LS.ME === '3425')
                        || I === 53 && !mSauwaldAktiv && (LS.ME === '4506' || LS.ME === '3425')
                        || I === 55 && !mTirolAktiv && (LS.ME === '3244' || LS.ME === '3425')
                        ? hVorschub + '<span class="cBlau P L" onclick="hrefParameterAendern()" ><b>Parameter ändern</b></span><br>'
                        : ''
                        )

                + (I !== 51 && I !== 52 && I !== 53 && I !== 55 || I === 51 && mHausruckAktiv || I === 52 && mRaiffeisenAktiv || I === 53 && mSauwaldAktiv || I === 55 && mTirolAktiv
                        ? hVorschub + '<span id=bZurStatistik class="cBlau P XL" onclick="hrefStatistik()" ><b>Zur Statistik</b></span>'
                        + ((CUPS.TYP[I] !== 'PR' || CUPS.MEZULETZT[I] + (365 * 86400000) > Date.now()) ? '<br>Cupwertung, Platzierungen, etc.<br>' : '<br>Nur für Mitspieler...<br>')

                        + (CUPS.TURNIER[I] && CUPS.TURNIER[I] === 'PC' && CUPS.BEREadmin[I].indexOf(LS.ME) >= 0 || CUPS.BEREadmin[I].indexOf('*') >= 0 || I <= 3
                                ? hVorschub + '<span class="cBlau P XL" onclick="TischNeu(true)" ><b>Zum Turnier</b></span><br>Vivat Valat!<br>'
                                : ''
                                )
                        + ((!CUPS.TURNIER[I] || CUPS.TURNIER[I] !== 'PC') && (CUPS.BEREadmin[I].indexOf(LS.ME) >= 0 || CUPS.BEREschreiben[I].indexOf(LS.ME) >= 0 || ((CUPS.BEREadmin[I].indexOf('*') >= 0 || CUPS.BEREschreiben[I].indexOf('*') >= 0) && LS.ME !== "NOBODY") || I <= 7)
                                ? hVorschub + '<span class="cBlau P XL" onclick="TischNeu(true)" ><b>Ein neuer Tisch</b></span><br>Vivat Valat!<br>'
                                : ''
                                )
                        + (CUPS.ANMELDERF[I]
                                ? hVorschub + '<span class="cBlau P XL" onclick="hrefStatistik(\'?Anmeldungen\')"><b>Zur Anmeldung</b></span><br>An- und abmelden<br>'
                                : ''
                                )
                        + ((CUPS.TYP[I] !== 'CUP' && (CUPS.BEREadmin[I].indexOf(LS.ME) >= 0 || CUPS.BEREadmin[I].indexOf('*') >= 0)) || LS.ME === '3425' || I <= 2
                                ? hVorschub + '<span class="cBlau P L" onclick="hrefParameterAendern()" ><b>Parameter ändern</b></span><br>'
                                : ''
                                )
                        : ''
                        )

                + (I === 51 && LS.ME === "3425"
                        ? hVorschub + '<span id=bZurStatistik class="cBlau P XL" onclick="hrefStatistik()" ><b>Zur Statistik</b></span>'
                        + ((CUPS.TYP[I] !== 'PR' || CUPS.MEZULETZT[I] + (365 * 86400000) > Date.now()) ? '<br>Cupwertung, Platzierungen, etc.<br>' : '<br>Nur für Mitspieler...<br>')

                        + (CUPS.TURNIER[I] && CUPS.TURNIER[I] === 'PC' && CUPS.BEREadmin[I].indexOf(LS.ME) >= 0 || CUPS.BEREadmin[I].indexOf('*') >= 0 || I <= 3
                                ? hVorschub + '<span class="cBlau P XL" onclick="TischNeu(true)" ><b>Zum Turnier</b></span><br>Vivat Valat!<br>'
                                : ''
                                )
                        + ((!CUPS.TURNIER[I] || CUPS.TURNIER[I] !== 'PC') && (CUPS.BEREadmin[I].indexOf(LS.ME) >= 0 || CUPS.BEREschreiben[I].indexOf(LS.ME) >= 0 || ((CUPS.BEREadmin[I].indexOf('*') >= 0 || CUPS.BEREschreiben[I].indexOf('*') >= 0) && LS.ME !== "NOBODY") || I <= 7)
                                ? hVorschub + '<span class="cBlau P XL" onclick="TischNeu(true)" ><b>Ein neuer Tisch</b></span><br>Vivat Valat!<br>'
                                : ''
                                )
                        + (CUPS.ANMELDERF[I]
                                ? hVorschub + '<span class="cBlau P XL" onclick="hrefStatistik(\'?Anmeldungen\')"><b>Zur Anmeldung</b></span><br>An- und abmelden<br>'
                                : ''
                                )
                        + ((CUPS.TYP[I] !== 'CUP' && (CUPS.BEREadmin[I].indexOf(LS.ME) >= 0 || CUPS.BEREadmin[I].indexOf('*') >= 0)) || LS.ME === '3425' || I <= 2
                                ? hVorschub + '<span class="cBlau P L" onclick="hrefParameterAendern()" ><b>Parameter ändern</b></span><br>'
                                : ''
                                )
                        : ''
                        )

                + '</div><div class="ui-block-b M" style="width:50%;text-align:justify;">'
                + hVorschub + getCupText()
                + '</div></div>'
                + hVorschub + html
                + (CUPS.TURNIER[I] && CUPS.TURNIER[I] === 'PC' && (isNaN(pTermin) || pTermin === false)
                        ? '<br>' + getTurnierkalender()
                        : ''
                        )
                + '</div></div>');
    } else {
        $('#dRumpf').html('<div style="width:100%; margin-left: auto; margin-right: auto; overflow-y: auto; height:' + hH + 'px; background-image: url(\'Icons/Background.png\'); background-size: 50%; background-position: center center; background-repeat: no-repeat; ">'
                + '<div style="margin-left: 30%;" class=M>'
                + '<br><br>'
                + html
                + '<span id=bZurStatistik class="cBlau P XL" onclick="hrefStatistik()" ><b>Zur Statistik</b></span>'
                + ((CUPS.TYP[I] !== 'PR' || CUPS.MEZULETZT[I] + (365 * 86400000) > Date.now()) ? '<br>Cupwertung, Platzierungen, etc.<br>' : '<br>Nur für Mitspieler...<br>')
                + (CUPS.BEREadmin[I].indexOf(LS.ME) >= 0 || CUPS.BEREschreiben[I].indexOf(LS.ME) >= 0 || ((CUPS.BEREadmin[I].indexOf('*') >= 0 || CUPS.BEREschreiben[I].indexOf('*') >= 0) && LS.ME !== "NOBODY") || I <= 7
                        ? hVorschub + '<span class="cBlau P XL" onclick="TischNeu(true)" >'
                        + (CUPS.TURNIER[I] === 'PC' && QUERFORMAT() && (CUPS.BEREadmin[I].indexOf(LS.ME) >= 0 || I <= 3)
                                ? '<b>Zum Turnier</b></span><br>Vivat Valat!<br>'
                                : (LS.I === I
                                        ? '<b>Zu meinem Tisch</b></span><br>Es wurden ' + LS.gespielt + ' Spiele gespielt.<br>'
                                        : '<b>Ein neuer Tisch</b></span><br>Vivat Valat!<br>'
                                        )
                                )
                        : ''
                        )
                + ((CUPS.TYP[I] !== 'CUP' && CUPS.BEREadmin[I].indexOf(LS.ME) >= 0) || LS.ME === '3425' || I <= 2
                        ? hVorschub + '<span class="cBlau P L" onclick="hrefParameterAendern()" ><b>Parameter ändern</b></span><br>'
                        : ''
                        )
                + hVorschub + getCupText()
                + '</div></div>');
    }
    $('#dCopyright').each(function () { // sonst funktioniert important nicht
        this.style.setProperty('display', 'none', 'important');
    });
// HOCHFORMAT !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    if (I && I === LS.I) {
        initSeite2();
        $('#tischButtons').html(getCupButtons()).trigger('create').show();
        if (!QUERFORMAT()) {
            $('#hMenu,#pMenu,#pCup').hide();
            $('#hMix,#pTisch').show();
        }
    } else {
        if (hMeldung) {
            $('#hfText').html('<div class="B cRot">' + hMeldung + '</div>' + CUPS.TEXT1[i]);
        } else {
            $('#hfText').html(CUPS.TEXT1[i]);
        }
        $('#cupButtons').html(getCupButtons()).trigger('create').show();
        if (!QUERFORMAT()) {
            $('#hMenu,#pMenu,#pTisch').hide();
            $('#hMix,#pCup').show();
        }
    }
    setTimeout(function () {
        if (!window.location.hash) {
            if (!QUERFORMAT || !window.location.search)
                window.location.href = "#" + Date.now();
        }
    }, 600);
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
                + 'innersize: ' + $(window).innerWidth() + ' x ' + $(window).innerHeight() + '<br>'
                + 'history.length: ' + history.length + '<br>'
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
    if (LS.ME === '3425' // Leo Luger
            || LS.ME === '0124' // Karl Haas
            || LS.ME === '1014' // Franz Kienast
            || LS.ME === '3322' // Sigi Braun
            || LS.ME === '3484' // Brigitta Hainz
            || LS.ME === '3244' // Markus Mair
            || LS.ME === '4506' // Sepp Lang
            ) {
        $('#bFindSpieler').show();
    } else {
        $('#bFindSpieler').hide();
    }
    if (LS.ME === '3425' // Leo Luger
            || LS.ME === '1014' // Franz Kienast
            || LS.ME === '0124' // Karl Haas jun.
            || LS.ME === '6027' // Dieter Matuschek
            || LS.ME === '6013' // Horst Hrastnik
            || LS.ME === '3484' // Brigitta Hainz
            || LS.ME === '3244' // Markus Mair
            || LS.ME === '4506' // Sepp Lang
            || LS.ME === '4731' // Alex Sabkovski --- Turnierkalender
            ) {
        $('#bAdminTools').show();
    } else {
        $('#bAdminTools').hide();
    }
    if (!QUERFORMAT()) {
        $('#bLinks,#bAdminTools').hide();
    }
}

function showCUPS() {
    var sync = new Date(CUPS.DATE);
    var heute = new Date();
    var nTage = parseInt((heute - sync) / 86400000);
    if (LS.Version !== getVersion()) {
        localStorage.setItem('Abakus.LOG', JSON.stringify(''));
        if (LS.Version === 0) {
            writeLOG('ABAKUS: Version ' + getVersionsDatum().toLocaleDateString() + ' (' + getVersion() + ') wurde installiert.');
        } else {
            writeLOG('ABAKUS: Update auf Version ' + getVersionsDatum().toLocaleDateString() + ' (' + getVersion() + ').');
        }
        initCUPSdelAllSTAT();
    } else if (LS.LoadCups > 0 || nTage > 2) {
        loadCUPS(false, false, true);
    } else {
        whenCUPSloaded();
    }
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

function getMeinTerminBarZeile(pCup) {
    if (typeof CUPS.MEANGEMELDET[pCup] === 'number') {
        if (CUPS.MEANGEMELDET[pCup] > Date.now()) {
            return '<a id=bCUP' + pCup + 'T-1 class="K ' + getClassMeinTermin(pCup) + '" onClick="showCup(' + pCup + ',-1,\'?Anmeldungen\')">&nbsp;&nbsp;<span class="L N">' + getDateString(CUPS.NEXTTERMIN[pCup]) + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="S cGruen">angemeldet<br></span>&nbsp;&nbsp;' + getCupName(pCup) + '</a>';
        } else {
            return '<a id=bCUP' + pCup + 'T-1 class="K ' + getClassMeinTermin(pCup) + '" onClick="showCup(' + pCup + ',-1,\'?Anmeldungen\')">&nbsp;&nbsp;<span class="L N">' + getDateString(CUPS.NEXTTERMIN[pCup]) + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="S cRot">nicht angemeldet<br></span>&nbsp;&nbsp;' + getCupName(pCup) + '</a>';
        }
    }
    return '<a id=bCUP' + pCup + 'T-1 class="K ' + getClassMeinTermin(pCup) + '" onClick="showCup(' + pCup + ',-1,\'?Anmeldungen\')">&nbsp;&nbsp;<span class="L N">' + getDateString(CUPS.NEXTTERMIN[pCup]) + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="S">???<br></span>&nbsp;&nbsp;' + getCupName(pCup) + '</a>';
}

function whenCUPSloaded() {

    if (LS.I && (CUPS.TYP[LS.I] !== 'CUP' && CUPS.TYP[LS.I] !== 'MT')) {
        if (LS.gespielt > 0) {
            $('#tCupName').html(CUPS.NAME[LS.I] + '<br>' + (LS.gespielt === 1 ? 'Ein Spiel' : LS.gespielt + ' Spiele') + ' gespielt');
        } else if (LS.TURRUNDE) {
            $('#tCupName').html(CUPS.NAME[LS.I] + '<br>' + LS.TURRUNDE + '. Runde');
        } else {
            $('#tCupName').html(CUPS.NAME[LS.I] + '<br>' + LS.AnzSpieler + ' Spieler warten');
        }
        $('#tZuMeinemTisch,#tCupName').addClass('cRot');
        $('#bZuMeinemTisch').show();
    }

    if (LS.ME[0] === '-') { // User für Turnier-PC
        LS.ShowCups = parseInt(LS.ME) * -1;
        localStorage.setItem('Abakus.LS', JSON.stringify(LS));
        showEinenMoment(CUPS.NAME[parseInt(LS.ME) * -1] + ':', "Die Turnierverwaltung wird gestartet.");
        setTimeout(function () {
            window.location.replace('_Turnier/TU_1_Anmeldung.html?init');
        }, 20);
    }

    var TERMINE = [];
    for (var termin in CUPS.TERMINE) {
        if (CUPS.TERMINE[termin].DATUM >= hHeute && CUPS.TERMINE[termin].CUP > 4) {
            TERMINE[TERMINE.length] = CUPS.TERMINE[termin];
            TERMINE[TERMINE.length - 1].I = termin;
        }
    }

    for (var iii = 5; iii < CUPS.ANMELDERF.length; iii++) {
        if (CUPS.ANMELDERF[iii]) {
            if (CUPS.MEZULETZT[iii] + (200 * 86400000) > Date.now() // 200 Tage
                    || CUPS.BEREadmin[iii].indexOf(LS.ME) >= 0
                    || CUPS.BEREschreiben[iii].indexOf(LS.ME) >= 0) {
                CUPS.NEXTTERMIN[iii] = getNextTermin(iii);
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
                    newCup = 50;
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
                    LS.ShowCups = newCup;
                    LS.Quickstart = true;
                    localStorage.setItem('Abakus.LS', JSON.stringify(LS));
                    window.location.replace(window.location.origin + window.location.pathname);
                }
            }
        }
    }

    var i = 0;
    var nAktTermine = 0;
    var nPersTermine = 0;
    var nMeineRundenCups = 0;
    var htmlPT = '<div data-role="collapsible" data-theme="d" data-collapsed="false"><h2>&nbsp;Meine Termine:</h2><ul data-role="listview" data-split-icon="info">';
    var htmlAT = '<div data-role="collapsible" data-theme="d"><h2>&nbsp;Aktuelle Termine:</h2><ul data-role="listview" data-split-icon="info">';
    var htmlWT = '<div data-role="collapsible" data-theme="d"><h2>&nbsp;Weitere Termine:</h2><ul data-role="listview" data-split-icon="info">';
    var htmlMR = '<div data-role="collapsible" data-theme="d" data-collapsed="false" data-iconpos="right" data-corners="false"><h2>&nbsp;Meine Cups/Runden:</h2><ul data-role="listview" data-split-icon="info">';
    var htmlCT = '<div data-role="collapsibleset" data-iconpos="right" data-corners="false">'
            + '<div data-role="collapsible" data-theme="d"' + (LS.Quickstart ? ' data-collapsed="false"' : '') + '><h2>&nbsp;Cups:</h2><ul data-role="listview" data-split-icon="info">';
    var htmlLC = '<div data-role="collapsible" data-theme="d"><h2>&nbsp;Lokale Cups:</h2><ul data-role="listview" data-split-icon="info">';
    var htmlMT = '<div data-role="collapsible" data-theme="d"><h2>&nbsp;Mannschaftsturniere:</h2><ul data-role="listview" data-split-icon="info">';
    var htmlFC = '<div data-role="collapsible" data-theme="d"><h2>&nbsp;Wirtshausrunden:</h2><ul data-role="listview" data-split-icon="info">';
    var htmlPR = '<div data-role="collapsible" data-theme="d"><h2>&nbsp;Private Runden:</h2><ul data-role="listview" data-split-icon="info">';
    var htmlTR = '<div data-role="collapsible" data-theme="d"><h2>&nbsp;Testrunden -turniere:</h2><ul data-role="listview" data-split-icon="info">';
    var htmlAR = '<div data-role="collapsible" data-theme="d"><h2>&nbsp;Allgemeine Runden:</h2><ul data-role="listview" data-split-icon="info">';

    if (LS.Quickstart) {
        delete LS.Quickstart;
        localStorage.setItem('Abakus.LS', JSON.stringify(LS));
    }
    var hTemp = '';
    var hAktuellBis = myDateString(Date.now() + (86400000 * 31));
    for (var termin in TERMINE) {
        if (TERMINE[termin].DATUM >= hHeute && !TERMINE[termin].NAME
                || TERMINE[termin].DATUM >= hHeute && TERMINE[termin].NAME && (TERMINE[termin].NAME.toUpperCase() !== "TEST" || LS.ME === "3425")) {
            nAktTermine++;
            if (TERMINE[termin].CUP === 8 || TERMINE[termin].CUP === 10) {
                hTemp = '';
            }
            if (CUPS.TYP[TERMINE[termin].CUP] === 'CUP' || CUPS.TYP[TERMINE[termin].CUP] === 'MT') {
                var hCupName = '';
                var hCupFarbe = '';
                if (CUPS.TYP[TERMINE[termin].CUP] === 'MT') {
                    hCupName = 'Wr. Tarockcup';
                } else if (TERMINE[termin].CUP === 50) {
                    hCupName = '1. Wr. Marathon';
                    hCupFarbe = ' cDIV';
                } else if (TERMINE[termin].CUP === 51) {
                    hCupName = 'Hausruckcup';
                    hCupFarbe = ' cHRC';
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
                    hCupName = 'Tir. Tarockcup';
                    hCupFarbe = ' cTTC';
                } else if (TERMINE[termin].CUP === 56) {
                    hCupName = 'Wr. Tarockcup';
                    hCupFarbe = ' cWTC';
                } else if (TERMINE[termin].CUP === 58) {
                    hCupName = 'Stadltarock';
                    hCupFarbe = ' cDIV';
                } else {
                    hCupName = CUPS.NAME[TERMINE[termin].CUP];
                    hCupFarbe = ' cDIV';
                }
                if (QUERFORMAT()) {
                    hTemp = '<li data-icon=false><a id="bCUP' + TERMINE[termin].CUP + 'T' + TERMINE[termin].I + '" class="K' + hCupFarbe + '" onClick="showCup(' + TERMINE[termin].CUP + "," + TERMINE[termin].I + ')">&nbsp;&nbsp;<span class="L N">' + getDateString(TERMINE[termin].DATUM) + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="S N">' + hCupName + '&nbsp;<br></span>&nbsp;&nbsp;' + TERMINE[termin].NAME + '</a></li>';
                } else {
                    hTemp = '<li data-icon=info><a class="K' + hCupFarbe + '" onClick="toggleShow(\'#hToggleTEe' + termin + '\')">&nbsp;&nbsp;<span class="L N">' + getDateString(TERMINE[termin].DATUM) + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="S N">' + hCupName + '&nbsp;<br></span>&nbsp;&nbsp;' + TERMINE[termin].NAME + '</a></li>'
                            + '<div id="hToggleTEe' + termin + '" class="S TGL" style=margin-left:10px; hidden>'
                            + TERMINE[termin].TEXT.replace(/;/g, '<br>').replace(/ß/g, '&szlig;')
                            + '</div>';
                }
                if (TERMINE[termin].DATUM <= hAktuellBis) {
                    htmlAT += hTemp;
                } else {
                    htmlWT += hTemp.replace(/hToggleTE/g, 'hToggleWT');
                }
            } else {
                var iii = TERMINE[termin].CUP;
                nPersTermine++;
                if (QUERFORMAT()) {
                    hTemp = '<li data-icon=false>' + getMeinTerminBarZeile(iii) + '</li>';
                } else {
                    if (CUPS.TYP[iii] === 'PR'
                            || !CUPS.TEXT1[iii]) {
                        hTemp = '<li data-icon=false>' + getMeinTerminBarZeile(iii) + '</li>';
                    } else {
                        hTemp = '<li data-icon=false>' + getMeinTerminBarZeile(iii) + '<a onclick="toggleShow(\'#hToggleTE' + iii + '\');">Hilfe</a></li>'
                                + '<div id="hToggleTE' + iii + '" class="M TGL" style=margin-left:10px; hidden>'
                                + (CUPS.TEXT1[iii] ? CUPS.TEXT1[iii] + '<br>' : '')
                                + '</div>';
                    }
                }
                htmlAT += hTemp;
                htmlPT += hTemp.replace(/-1/g, '-2');
            }
        }
    }

    var SORT = [];
    for (i = 0; i < CUPS.NAME.length; i++) {
        if (CUPS.NAME[i]) {
//            if (i === 56) { // Wiener Tarockcup
//                SORT[SORT.length] = '1' + CUPS.NAME[i] + '  ;' + i;
//            } else if (i === 54) { // Steirischer Tarockcup
//                SORT[SORT.length] = '2' + CUPS.NAME[i] + '  ;' + i;
//            } else if (i === 51) { // Hausruckcup
//                SORT[SORT.length] = '3' + CUPS.NAME[i] + '  ;' + i;
//            } else if (i === 53) { // Sauwaldcup
//                SORT[SORT.length] = '4' + CUPS.NAME[i] + '  ;' + i;
//            } else if (i === 55) { // Tiroler Tarockcup
//                SORT[SORT.length] = '5' + CUPS.NAME[i] + '  ;' + i;
//            } else {
//                SORT[SORT.length] = CUPS.NAME[i] + '  ;' + i;
//            }
//            if (i > 50 && i < 58) { // Sort nach Cupname
//                SORT[SORT.length] = i + CUPS.NAME[i] + '  ;' + i;
//            } else {
            SORT[SORT.length] = CUPS.NAME[i] + '  ;' + i;
//            }
        }
    }

    SORT.sort();
    for (var s = 0; s < SORT.length; s++) { // Meine Runden/Cups --- Bei Xxxxxx
        i = parseInt(SORT[s].substring((SORT[s].lastIndexOf(';') + 1)));
        if (i < 5 || CUPS.TYP[i] === 'MT') {
        } else if (i >= 8 && CUPS.BEREadmin[i].indexOf(LS.ME) >= 0) {
            nMeineRundenCups++;
            if (QUERFORMAT() || !CUPS.TEXT1[i]) {
                htmlMR += '<li data-icon=false><a id="bMR' + i + '" class="' + getClass(i) + '" onClick="showCup(' + i + ',false,false,\'#bMR\')">&nbsp;' + getCupName(i) + '</a></li>';
            } else {
                if (i === 51 && !mHausruckAktiv
                        || i === 52 && !mRaiffeisenAktiv
                        || i === 53 && !mSauwaldAktiv
                        || i === 55 && !mTirolAktiv) {
                    htmlMR += '<li data-icon=false><a id="bMR' + i + '" class="' + getClass(i) + '" onClick="toggleShow(\'#hToggle9' + i + '\');">&nbsp;' + getCupName(i) + '</a></li>'
                            + '<div id="hToggle9' + i + '" class="TGL M" style="margin:8px;text-align:justify;" hidden>'
                            + (CUPS.TEXT1[i] ? CUPS.TEXT1[i] : '')
                            + '</div>';
                } else {
                    htmlMR += '<li><a  id="bMR' + i + '" class="' + getClass(i) + '" onClick="showCup(' + i + ',false,false,\'#bMR\')">&nbsp;' + getCupName(i) + '</a>'
                            + '<a onclick="toggleShow(\'#hToggle1' + i + '\');">Hilfe</a></li>'
                            + '<div id="hToggle1' + i + '" class="TGL M" style=margin-left:10px; hidden>'
                            + (CUPS.TEXT1[i] ? CUPS.TEXT1[i] + '<br>' : '')
                            + '</div>';
                }
            }
        }
    }
    for (var s = 0; s < SORT.length; s++) { // mit Schreibberechtigung >>>>>>>>>> später eventuell entfernen
        i = parseInt(SORT[s].substring((SORT[s].lastIndexOf(';') + 1)));
        if (i < 5 || CUPS.TYP[i] === 'MT') {
        } else if (i >= 8 && CUPS.BEREadmin[i].indexOf(LS.ME) >= 0) {
        } else if (i >= 8 && CUPS.BEREschreiben[i].indexOf(LS.ME) >= 0) {
            nMeineRundenCups++;
            if (QUERFORMAT() || !CUPS.TEXT1[i]) {
                htmlMR += '<li data-icon=false><a id="bMR' + i + '" class="' + getClass(i) + '" onClick="showCup(' + i + ',false,false,\'#bMR\')">&nbsp;' + getCupName(i) + '</a></li>';
            } else {
                htmlMR += '<li><a id="bMR' + i + '" class="' + getClass(i) + '" onClick="showCup(' + i + ',false,false,\'#bMR\')">&nbsp;' + getCupName(i) + '</a>'
                        + '<a onclick="toggleShow(\'#hToggle1' + i + '\');">Hilfe</a></li>'
                        + '<div id="hToggle1' + i + '" class="TGL M" style=margin-left:10px; hidden>'
                        + (CUPS.TEXT1[i] ? CUPS.TEXT1[i] + '<br>' : '')
                        + '</div>';
            }
        }
    }
    for (var s = 0; s < SORT.length; s++) { // Meine Runden/Cups --- Bei Xxxxxx
        i = parseInt(SORT[s].substring((SORT[s].lastIndexOf(';') + 1)));
        if (i < 5 || CUPS.TYP[i] === 'MT') {
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
                    if (QUERFORMAT() || !CUPS.TEXT1[i]) {
                        htmlMR += '<li data-icon=false><a id="bMR' + i + '" class="' + getClass(i) + '" onClick="showCup(' + i + ',false,false,\'#bMR\')">&nbsp;' + getCupName(i) + '</a></li>';
                    } else {
                        htmlMR += '<li><a id="bMR' + i + '" class="' + getClass(i) + '" onClick="showCup(' + i + ',false,false,\'#bMR\')">&nbsp;' + getCupName(i) + '</a>'
                                + '<a onclick="toggleShow(\'#hToggle1' + i + '\');">Hilfe</a></li>'
                                + '<div id="hToggle1' + i + '" class="TGL M" style=margin-left:10px; hidden>'
                                + (CUPS.TEXT1[i] ? CUPS.TEXT1[i] + '<br>' : '')
                                + '</div>';
                    }
                }
            }
        }
    }

    for (var s = 0; s < SORT.length; s++) {
        i = parseInt(SORT[s].substring((SORT[s].lastIndexOf(';') + 1)));
        if (QUERFORMAT() || !CUPS.TEXT1[i] || CUPS.TYP[i] === 'PR') {
            html = '<li data-icon=false><a id="bCUP' + i + '" class="' + getClass(i) + (i === 51 && !mHausruckAktiv || i === 52 && !mRaiffeisenAktiv || i === 53 && !mSauwaldAktiv || i === 55 && !mTirolAktiv ? ' cDIV' : '') + '" onClick="showCup(' + i + ')">&nbsp;' + getCupName(i) + '</a></li>';
        } else {
            if (!QUERFORMAT() && (i === 51 && !mHausruckAktiv || i === 52 && !mRaiffeisenAktiv || i === 53 && !mSauwaldAktiv || i === 55 && !mTirolAktiv)) {
                html = '<li data-icon=false><a id="bCUP' + i + '" class="cDIV' + getClass(i) + '" onClick="toggleShow(\'#hToggle2' + i + '\');">&nbsp;' + getCupName(i) + '</a></li>'
                        + '<div id="hToggle2' + i + '" class="TGL M" style="margin:8px;text-align:justify;" hidden>'
                        + (CUPS.TEXT1[i] ? CUPS.TEXT1[i] : '')
                        + '</div>';
            } else {
                html = '<li><a id="bCUP' + i + '" class="' + (i === 51 && !mHausruckAktiv || i === 52 && !mRaiffeisenAktiv || i === 53 && !mSauwaldAktiv || i === 55 && !mTirolAktiv ? 'cDIV ' : '') + getClass(i) + '" onClick="showCup(' + i + ')">&nbsp;' + getCupName(i) + '</a>'
                        + '<a onclick="toggleShow(\'#hToggle2' + i + '\');">Hilfe</a></li>'
                        + '<div id="hToggle2' + i + '" class="TGL M" style="margin:8px;text-align:justify;" hidden>'
                        + (CUPS.TEXT1[i] ? CUPS.TEXT1[i] + '<br>' : '')
                        + '</div>';
            }
        }
        if (CUPS.TYP[i] === 'TR' || i <= 4) { // 4te TestRunde / TestCup
            if (i < 4 || LS.ME === '3425') {
                htmlTR = htmlTR + html;
            }
        } else if (CUPS.TYP[i] === 'CUP' && (i >= 51 && i <= 57)) {
            htmlCT = htmlCT + html;
        } else if (CUPS.TYP[i] === 'CUP' || CUPS.TYP[i] === 'TC') {
            htmlLC = htmlLC + html;
        } else if (CUPS.TYP[i] === 'MT') {
            htmlMT = htmlMT + html;
        } else if (CUPS.TYP[i] === 'FC') {
            htmlFC = htmlFC + html;
        } else if (CUPS.TYP[i] === 'PR') {
            htmlPR = htmlPR + html;
        } else if (CUPS.TYP[i] === 'AR' || CUPS.TYP[i] === 'ET') {
            htmlAR = htmlAR + html;
        }
    }

    if (nAktTermine) {
        $('#dTermine').html('<div data-role="collapsibleset" data-iconpos="right" data-corners="false">'
                + (nPersTermine ? htmlPT + '</ul></div>' : '')
                + htmlAT + '</ul></div>'
                + htmlWT + '</ul></div></div>').trigger('create');
    }
    if (nMeineRundenCups) {
        $('#dMeineRundenCups').html(htmlMR + '</ul></div>').trigger('create');
    }
    $('#dRundenCups').html(htmlCT + '</ul></div>' + htmlLC + '</ul></div>' + htmlMT + '</ul></div>' + htmlFC + '</ul></div>' + htmlPR + '</ul></div>' + htmlTR + '</ul></div>' + htmlAR + '</ul></div></div>').trigger('create').show();
    if (LS.Meldung) {
        $('#dMeldung').append("&nbsp;<img src='Icons/Achtung.png'  width='24' height='24'>&nbsp;<b>" + LS.Meldung + "</b>");
    }
    hideEinenMoment();
    window.scrollTo(0, 0);
    if (QUERFORMAT()) {
        if (lastBtn) {
            $('#bInitialisieren').removeClass('ui-btn-active');
            $(lastBtn).addClass('ui-btn-active');
        }
    }
    $('#dFooter').show();
}


// I N I T  ************************************************************************************
function fINIT() {
    'use strict';
    if (typeof localStorage !== 'object') {
        return;
    }
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

//    try { // hier steigt das Galaxy Nexus aus
//        'XX'.startsWith('XX');
//    } catch (e) {
//        alert('Dein Handy/Tablet ist fuer "Die Tarock-App" zu alt oder zu schwach. Verwende "Die Tarock-App lite".');
//    }

    if (localStorage.getItem("Abakus.LS") === null) {  // allererster Aufruf
        LS = new Object();
        LS.ME = "NOBODY";
        LS.MEname = 'Nicht registriert';
        LS.Schreibzettel = false;
        LS.I = 0;
        LS.gespielt = 0; // -1
        LS.Regeln = "Wr.";
        LS.Meldung = '';
        LS.Ansage = '';
        LS.ShowCups = 0;
        LS.LoadCups = 0;
        LS.SchriftG = 1;
        LS.Padding = 2;
        LS.Freunde = [];
        LS.Sterne = ['', '', '', '', '', '', ''];
        LS.Font = [-1, -1, -1, -1, -1];
        LS.Ansagen = true;
        LS.TURCODE = 0;
        LS.TURADMIN = '';
        LS.TURRUNDE = 0;
        LS.TURSPIELER = 0;
        LS.TURGESPIELT = 0;
        LS.Version = 0;
        LS.AnzGespeichert = 0;
        LS.Timeout = 0;
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

    initExtraButtons();
    if (window.location.href.toUpperCase().indexOf('?VIPS') > 0) {
        LS.tempVIPs = window.location.href.substr(window.location.href.toUpperCase().indexOf('?VIPS'));
        localStorage.setItem('Abakus.LS', JSON.stringify(LS));
    }

    if (LS.ME !== "3425" && LS.ME !== "1000") {
        document.oncontextmenu = function () {
            return false; // oncontextmenu
        };
    }
    document.onselectstart = function () {
        return false;
    };

    if (localStorage.getItem("Abakus.CUPS") === null) {
        CUPS = new Object();
        CUPS.NAME = [];
        CUPS.MEANGEMELDET = [];
        CUPS.MEZULETZT = [];
        localStorage.setItem('Abakus.CUPS', JSON.stringify(CUPS));
    } else {
        CUPS = JSON.parse(localStorage.getItem('Abakus.CUPS'));
        if (typeof CUPS.MEZULETZT !== 'object') {
            CUPS.MEANGEMELDET = [];
            CUPS.MEZULETZT = [];
            localStorage.setItem('Abakus.CUPS', JSON.stringify(CUPS));
        }
        if (typeof CUPS.MEZULETZTVOR === 'object') {
            for (var iii = 0; iii < CUPS.NAME.length; iii++) {
                if (CUPS.MEZULETZTVOR[iii]) {
                    CUPS.MEZULETZT[iii] = new Date().valueOf();
                } else {
                    CUPS.MEZULETZT[iii] = 0;
                }
            }
            CUPS.MEZULETZTVOR = null;
            delete CUPS.MEZULETZTVOR;
            localStorage.setItem('Abakus.CUPS', JSON.stringify(CUPS));
        }
    }

    if (LS.Ansage) {  // verhindert einen mehrfachen Aufruf von Seite2
        LS.Ansage = '';
        localStorage.setItem('Abakus.LS', JSON.stringify(LS));
    }
    if (LS.Version !== getVersion() || PC) {
        optFont(1);
    } else {
        initSeite1();
    }

    listVersion();
    $('#tJJJJ,#tJJJJ2').text(new Date().getFullYear());
    if (LS.ME === 'NOBODY') {
        $('#tSpieler').html('Noch nicht registriert.');
    } else if (LS.ME.length === 4) {
        $('#tSpieler').html('Registriert für Spieler ' + LS.ME + '<br>' + LS.MEname + '.');
    } else {
        $('#tSpieler').html('Registriert für Spieler<br>' + LS.MEname + '.');
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

    window.onresize = function (e) {
        $('#pContent').each(function () { // sonst funktioniert important nicht
            this.style.setProperty('height', ($(window).innerHeight() - $('#pContent').offset().top - 1) + 'px', 'important');
        });
        $('#ddRumpf').each(function () { // sonst funktioniert important nicht
            this.style.setProperty('height', ($(window).innerHeight() - $('#ddRumpf').offset().top - 1) + 'px', 'important');
        });
    };
}
//  Funktionen  **************************************************************************

if (navigator.userAgent.toUpperCase().indexOf('FIREFOX') >= 0) {
    window.onunload = function () {};
    window.onload = function () {
        fINIT();
    };
}

$(document).ready(function () {

    if (navigator.userAgent.toUpperCase().indexOf('FIREFOX') < 0) {
        fINIT();
    }

    window.onhashchange = function () {
        if (!QUERFORMAT()) {
            if (mHref) {
                mHref = false;
            } else {
                if (!window.location.hash) {
                    $('#hMix,#pCup,#pTisch').hide();
                    $('#hMenu,#pMenu').show();
                    I = 0;
                    LS.ShowCups = 0;
                }
            }
        }
    };

    if (/iPad|iPhone/.test(navigator.userAgent)) {
        window.onpageshow = function (event) {
            if (window.performance.navigation.type === 2) {
                LS = JSON.parse(localStorage.getItem('Abakus.LS'));
                CUPS = JSON.parse(localStorage.getItem('Abakus.CUPS'));
                initSeite1();
                if (LS.I === 0) {
                    $('#bZuMeinemTisch').hide();
                }
                $('body').removeClass('ui-disabled');
            }
        };
    }

});