
/* global getVersionsDatum, firebase, pSeite, pCUP, SPIELERext */

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
var daysOfWeek = ["So,", "Mo,", "Di,", "Mi,", "Do,", "Fr,", "Sa,"];
var monthsOfYear = ["Jän.", "Feb.", "März", "April", "Mai", "Juni", "Juli", "Aug.", "Sep.", "Okt.", "Nov.", "Dez."];
var stLastZitat = [];
var mTischNeuLoeschen = '';
var mHref = false;
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
function historyBack() {
    if (LS.ShowCups) {
        LS.ShowCups = 0;
        localStorage.setItem('Abakus.LS', JSON.stringify(LS));
    }
    history.back();
}

function fHref(pHref) {
    $('body').addClass('ui-disabled');
    mHref = true;
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
            (CUPS.MEZULETZT[I] + (100 * 86400000) < Date.now() && CUPS.NAME[I].substr(0, 4) === 'Bei ')
            || (CUPS.MEZULETZT[I] + (365 * 86400000) < Date.now()))) {
        if (pCup) {
            LS.ShowCups = pCup;
        }
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

    if (LS.ShowCups < 0) {
        I = LS.ShowCups * -1;
        LS.ShowCups = 0;
        localStorage.setItem('Abakus.LS', JSON.stringify(LS));
    } else {
        I = LS.ShowCups;
    }

    showCUPS();
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
        } else if (pCup === 80) {
            if (QUERFORMAT()) {
                hTitel2 = 'Eine Veranstaltung des Wiener Tarockcup';
            } else {
                hTitel2 = 'Ein außergewöhnlicher Event';
            }
        } else if (pCup === 82) {
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
        if (CUPS.TYP[pCup] === 'CUP' && pCup > 4) {
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
                hTitel = '1. Wiener Tarockmarathon';
                document.title = '1. Wr. Marathon';
                hTitel2 = 'Eine Veranstaltung des Wiener Tarockcup';
            } else if (pCup === 81) {
                document.title = 'SST - ' + CUPS.NAME[pCup].replace('  ', ' ').replace('/', '-');
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
    $('#bAL,#bCT,#bLC,#bMT,#bFC,#PR,#bTR,#bAR').collapsible({collapsed: true});
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
    $("#pMEINTISCH").popup("open").show();
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
                    $(LS.LastBtn).addClass('cHRC');
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
                    || LS.LastBtn.substr(4, 2) === '51'
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

function toggleShow(pToggle) {
    if ($(pToggle).is(":visible")) {
        $(pToggle).toggle('show');
    } else {
        $('.TGL').hide();
        $(pToggle).toggle('show');
    }
}

function showCup(i, pBtn, pTermin) {
    'use strict';
    if (!QUERFORMAT()) {
        if (LS.LastBtn) {
            if ($('#tgl' + LS.LastBtn.substr(1)).is(":visible")) {
                $('#tgl' + LS.LastBtn.substr(1)).toggle('show');
                resetLastBtn();
                var hBtn = '';
                if (pTermin === -1) {
                    hBtn = '#' + pBtn + i + 'T';
                } else if (pTermin && pTermin !== -1) {
                    hBtn = '#' + pBtn + i + 'T' + pTermin;
                } else if (pBtn) {
                    hBtn = '#' + pBtn + i;
                }
                if (hBtn === LS.LastBtn) {
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
        if (pTermin === -1) {
            LS.LastBtn = '#' + pBtn + i + 'T';
        } else if (pTermin && pTermin !== -1) {
            LS.LastBtn = '#' + pBtn + i + 'T' + pTermin;
        } else if (pBtn) {
            LS.LastBtn = '#' + pBtn + i;
        }
    }
    if (LS.LastBtn) {
        if (pTermin === -1) {
            $(LS.LastBtn).addClass('ui-btn-active').removeClass('cAktiv').removeClass('fGruen').removeClass('cDIV');
        } else if (pTermin) {
            $(LS.LastBtn).addClass('ui-btn-active').removeClass('cRTC').removeClass('cHRC').removeClass('cSWC').removeClass('cSTC').removeClass('cTTC').removeClass('cWTC').removeClass('cTOF').removeClass('cDIV').removeClass('fGruen');
        } else {
            if (i === 49 || i === 51 || i === 52) {
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
    if (CUPS.TYP[I] === 'CUP') {
        hVorschub = '<br>';
    }
    hVorschub = '<br><br>';
    var hH = parseInt($(window).innerHeight() - $('#qfHeader').height() - 1);
    if (CUPS.TURNIER[I] || CUPS.ANMELDERF[I]) {
        $('#dRumpf').html('<div id="ddRumpf" style="width:100%; margin-left: auto; margin-right: auto; overflow-y: auto; height:' + hH + 'px; background-image: url(\'Icons/Background.png\'); background-size: 50%; background-position: center center; background-repeat: no-repeat; ">'
                + '<div style="margin-left: 10%;">'
                + '<br>'
                + '<div class="ui-grid-a"><div class="ui-block-a M" style="width:47%">'

                + (I === 49
                        ? hVorschub + '<div class="M" style="width:92%;text-align:justify;">Seit 2008 findet jedes Jahr im April das Tarock-Österreich-Finale im Königrufen statt. Die besten Tarockspieler aus ganz Österreich treffen sich im Casino Linz zu einem Tarockevent der Extraklasse.</div>'
                        : ''
                        )

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

                + (I !== 49 && I !== 50 && I !== 51 && I !== 52 && I !== 53 && I !== 55 || I === 51 && mHausruckAktiv || I === 52 && mRaiffeisenAktiv || I === 53 && mSauwaldAktiv || I === 55 && mTirolAktiv || I === 77
                        ? hVorschub + '<span id=bZurStatistik class="cBlau P XL" onclick="hrefStatistik()" ><b>Zur Statistik</b></span>'
                        + ((CUPS.TYP[I] !== 'PR' || CUPS.MEZULETZT[I] + (365 * 86400000) > Date.now()) ? '<br>Cupwertung, Platzierungen, etc.<br>' : '<br>Nur für Mitspieler...<br>')

                        + (CUPS.TURNIER[I] && CUPS.TURNIER[I] !== 'Handy' && (CUPS.BEREadmin[I].indexOf(LS.ME) >= 0 || CUPS.BEREadmin[I].indexOf('*') >= 0 || I <= 3)
                                ? hVorschub + '<span class="cBlau P XL" onclick="zumTurnier()" ><b>Zum Turnier</b></span><br>Vivat Valat!<br>'
                                : ''
                                )
                        + ((!CUPS.TURNIER[I] || CUPS.TURNIER[I] === 'Handy') && (CUPS.BEREadmin[I].indexOf(LS.ME) >= 0 || CUPS.BEREschreiben[I].indexOf(LS.ME) >= 0 || ((CUPS.BEREadmin[I].indexOf('*') >= 0 || CUPS.BEREschreiben[I].indexOf('*') >= 0) && LS.ME !== "NOBODY") || I <= 7)
                                ? hVorschub + '<span class="cBlau P XL" onclick="fEinNeuerTisch()" ><b>Ein neuer Tisch</b></span><br>Vivat Valat!<br>'
                                : ''
                                )
                        + (CUPS.ANMELDERF[I]
                                ? hVorschub + '<span class="cBlau P XL" onclick="hrefStatistik(false, \'?Anmeldungen\')"><b>Zur Anmeldung</b></span><br>An- und abmelden<br>'
                                : ''
                                )
                        + (((I === 51 && LS.ME === '1014') || (I === 53 && LS.ME === '4506') || (I === 55 && LS.ME === '3244') || (I === 77 && LS.ME === '3425') || (I === 125 && LS.ME === '3425')) && PC
                                ? hVorschub + '<span class="cBlau P L" onclick="window.location.href = \'Abakus/TurnierImport.html\'" ><b>Turnier einspielen</b></span><br>'
                                : ''
                                )
                        : ''
                        )

                + (CUPS.BEREadmin[I].indexOf(LS.ME) >= 0
                        || LS.ME === '3425'
                        || I <= 2
                        || ((CUPS.TYP[I] === 'CUP' || CUPS.TYP[I] === 'MT') && (CUPS.BEREschreiben[I].indexOf(LS.ME) >= 0 || LS.ME === meinStellvertreter))
                        ? hVorschub + '<span class="cBlau P L" onclick="hrefParameterAendern()" ><b>Parameter ändern</b></span><br>'
                        : ''
                        )

                + '</div><div class="ui-block-b M" style="width:50%;text-align:justify;">'

                + hVorschub + (I === 56 ? '<img src="Icons/LogoWTC.png" align="left" style="fload:left;width:120px;height:160px;margin-left:-60px;margin-right:10px">' : '') + getCupText()

                + '</div></div>'
                + hVorschub + html
                + (CUPS.TURNIER[I] && CUPS.TURNIER[I] !== 'Handy' && (isNaN(pTermin) || pTermin === false)
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
                        ? hVorschub
                        + (LS.I === I
                                ? '<span class="cBlau P XL" onclick="fZuMeinemTisch()"><b>Zu meinem Tisch</b></span><br>Es wurden ' + LS.gespielt + ' Spiele gespielt.<br>'
                                : '<span class="cBlau P XL" onclick="fEinNeuerTisch()"><b>Ein neuer Tisch</b></span><br>Vivat Valat!<br>'
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

    $('#bAdminTools,#bFindSpieler').hide();
    if (LS.ME === '3425'
            || CUPS.BEREadmin[51].indexOf(LS.ME) >= 0 || CUPS.BEREschreiben[51].indexOf(LS.ME) >= 0
            || CUPS.BEREadmin[52].indexOf(LS.ME) >= 0 || CUPS.BEREschreiben[52].indexOf(LS.ME) >= 0
            || CUPS.BEREadmin[53].indexOf(LS.ME) >= 0 || CUPS.BEREschreiben[53].indexOf(LS.ME) >= 0
            || CUPS.BEREadmin[54].indexOf(LS.ME) >= 0 || CUPS.BEREschreiben[54].indexOf(LS.ME) >= 0
            || CUPS.BEREadmin[55].indexOf(LS.ME) >= 0 || CUPS.BEREschreiben[55].indexOf(LS.ME) >= 0
            || CUPS.BEREadmin[56].indexOf(LS.ME) >= 0 || CUPS.BEREschreiben[56].indexOf(LS.ME) >= 0
            ) {
        $('#bAdminTools,#bFindSpieler').show();
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

function showCUPS() {
    var sync = new Date(CUPS.DATE);
    var heute = new Date();
    var nTage = parseInt((heute - sync) / 86400000);
    if (LS.Version !== getVersion()) {
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
    } else if (LS.LoadCups > 0 || nTage > 2 || isNaN(nTage)) {
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

function getCupToggleDiv(pPrefix, pCup, pTermin) {

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
        hReturn += '<div style="margin: 5px 6px 0 5px">'
                + TERMINE[pTermin].TEXT.replace(/;/g, '<br>').replace(/ß/g, '&szlig;')
                + '</div>';
    }

    if (pCup !== 49 && pCup !== 51 && pCup !== 52) {


        if (LS.ME === 'NOBODY' || pCup === 5 || pCup === 6 || pCup === 7) {
// ein neuer Tisch          ZUR STATISTIK
            hReturn += '<div class="ui-grid-a">'
                    + '<div class="ui-block-a">'
                    + (LS.I !== pCup
                            ? '<div class="ui-btn S ' + (pCup === 5 || pCup === 6 || pCup === 7 ? '' : ' ui-disabled') + '" onClick="fEinNeuerTisch();">'
                            + '<img src=\'Icons/MeinTisch.png\' height="64" width="64"/><br>Ein neuer Tisch'
                            : '<div class="ui-btn S ' + (pCup === 5 || pCup === 6 || pCup === 7 ? '' : ' ui-disabled') + '" onClick="fZuMeinemTisch();">'
                            + '<img src=\'Icons/MeinTisch.png\' height="64" width="64"/><br>Zu meinem Tisch'
                            )
                    + '</div></div>'
                    + '<div class="ui-block-b">'
                    + '<div class="ui-btn S" onClick="hrefStatistik(' + pCup + ');">'
                    + '<img src=\'Icons/Statistik.png\' height="64" width="64"/><br>Zur Statistik'
                    + '</div></div>'
                    + '</div>';
        } else if (CUPS.TYP[pCup] === 'CUP' || CUPS.TYP[pCup] === 'MT') { // Cups
            var hHeuteTurnier = false;
            if (LS.ME.length === 4 && pCup !== 53 && pCup !== 55) {
                for (var termin in CUPS.TERMINE) {
                    if (CUPS.TERMINE[termin].CUP === pCup && CUPS.TERMINE[termin].DATUM === hHeute) {
                        hHeuteTurnier = true;
                        break;
                    }
                }
            }
// EIN NEUER TISCH          ZUR STATISTIK
            hReturn += '<div class="ui-grid-a">'
                    + '<div class="ui-block-a">'
                    + (LS.I !== pCup
                            ? '<div class="ui-btn S ' + (hHeuteTurnier ? '' : ' ui-disabled') + '" onClick="fEinNeuerTisch();">'
                            + '<img src=\'Icons/MeinTisch.png\' height="64" width="64"/><br>Ein neuer Tisch'
                            : '<div class="ui-btn S ' + (hHeuteTurnier ? '' : ' ui-disabled') + '" onClick="fZuMeinemTisch();">'
                            + '<img src=\'Icons/MeinTisch.png\' height="64" width="64"/><br>Zu meinem Tisch'
                            )
                    + '</div></div>'
                    + '<div class="ui-block-b">'
                    + '<div class="ui-btn S" onClick="hrefStatistik(' + pCup + ');">'
                    + '<img src=\'Icons/Statistik.png\' height="64" width="64"/><br>Zur Statistik'
                    + '</div></div>'
                    + '</div>';
        } else if (CUPS.TURNIER[pCup]) { // Spontanturniere
//          Zur Anmeldung         Ein neuer Tisch          Statistik
//          Turnier starten       Parameter

            var hHeuteTurnier = false;
            if (LS.I === pCup) {
                var hHeuteTurnier = true;
            } else {
                if (LS.ME.length === 4 && pCup !== 53 && pCup !== 55) {
                    for (var termin in TERMINE) {
                        if (TERMINE[termin].CUP === pCup && TERMINE[termin].DATUM === hHeute) {
                            hHeuteTurnier = true;
                            break;
                        }
                    }
                }
            }
            hReturn += '<div class="ui-grid-b">'
                    + '<div class="ui-block-a">'
                    + '<div class="ui-btn S" onClick="hrefStatistik(' + pCup + ', \'?Anmeldungen\');">'
                    + '<img src=\'Icons/Anmeldung.png\' height="64" width="64"/><br>Anmeldung'
                    + '</div></div>'
                    + '<div class="ui-block-b">'
                    + (LS.I !== pCup || LS.AnzSpieler === 0
                            ? '<div class="ui-btn S ' + (hHeuteTurnier && (CUPS.BEREadmin[pCup].indexOf(LS.ME) >= 0 || CUPS.BEREschreiben[pCup].indexOf(LS.ME) >= 0 || pCup < 8) ? '' : ' ui-disabled') + '" onClick="fEinNeuerTisch();">'
                            + '<img src=\'Icons/MeinTisch.png\' height="64" width="64"/><br>Neuer Tisch'
                            : '<div class="ui-btn S ' + (hHeuteTurnier && (CUPS.BEREadmin[pCup].indexOf(LS.ME) >= 0 || CUPS.BEREschreiben[pCup].indexOf(LS.ME) >= 0 || pCup < 8) ? '' : ' ui-disabled') + '" onClick="fZuMeinemTisch();">'
                            + '<img src=\'Icons/MeinTisch.png\' height="64" width="64"/><br>Zum Tisch'
                            )
                    + '</div></div>'
                    + '<div class="ui-block-c">'
                    + '<div class="ui-btn S" onClick="hrefStatistik(' + pCup + ');">'
                    + '<img src=\'Icons/Statistik.png\' height="64" width="64"/><br>Statistik'
                    + '</div></div>'
                    + '</div>';
            if (CUPS.BEREadmin[pCup].indexOf(LS.ME) >= 0 || pCup < 8) {

//                html += "<a onclick='iStartStop(true);' data-rel='popup' data-theme=e data-position-to='window' data-role='button' data-inline='true' data-mini='true' class='L" + cClass + "' data-transition='pop' id=bStartbutton>&nbsp;Turnier starten&nbsp;</a>";

                if (LS.I === 0 && !LS.TURRUNDE || (LS.I !== 0 && LS.I !== I)) {
                    var hStartStopText = "Turnier starten";
                } else if (LS.I === I && (LS.TURADMIN === LS.ME || LS.I < 5)) {
                    if (LS.TURRUNDE < CUPS.RUNDEN[I]) {
                        var hStartStopText = "Runde " + LS.TURRUNDE + " beenden";
                    } else {
                        var hStartStopText = "Turnier beenden";
                    }
                }
                hReturn += '<div class="ui-grid-a">'
                        + '<div class="ui-block-a">'
                        + '<div class="ui-btn S' + (hHeuteTurnier && (!LS.TURADMIN || LS.TURADMIN === LS.ME) ? '' : ' ui-disabled') + '" onClick="iStartStop(true);" style="margin-top:0">'
                        + '<img src=\'Icons/Turnier.png\' height="64" width="64"/><br>' + hStartStopText
                        + '</div></div>'
                        + '<div class="ui-block-b">'
                        + '<div class="ui-btn S" onClick="hrefParameterAendern();" style="margin-top:0">'
                        + '<img src=\'Icons/Optionen.png\' height="64" width="64"/><br>Parameter ändern'
                        + '</div></div>'
                        + '</div>';
            }


        } else if (CUPS.ANMELDERF[pCup]) {
            //          Zur Anmeldung         Ein neuer Tisch          Statistik
//          Turnier starten       Parameter
            var hHeuteTurnier = false;
            if (LS.ME.length === 4 && pCup !== 53 && pCup !== 55) {
                for (var termin in CUPS.TERMINE) {
                    if (CUPS.TERMINE[termin].CUP === pCup && CUPS.TERMINE[termin].DATUM === hHeute) {
                        hHeuteTurnier = true;
                        break;
                    }
                }
            }
            if (hHeuteTurnier) {
                if (CUPS.BEREadmin[pCup].indexOf(LS.ME) >= 0) {
                    //      Zur Anmeldung             Zum Tisch
                    hReturn += '<div class="ui-grid-a">'
                            + '<div class="ui-block-a">'
                            + '<div class="ui-btn S" onClick="hrefStatistik(' + pCup + ', \'?Anmeldungen\');">'
                            + '<img src=\'Icons/Anmeldung.png\' height="64" width="64"/><br>Zur Anmeldung'
                            + '</div></div>'
                            + '<div class="ui-block-b">'
                            + (LS.I !== pCup
                                    ? '<div class="ui-btn S ' + (CUPS.BEREadmin[pCup].indexOf(LS.ME) >= 0 || CUPS.BEREschreiben[pCup].indexOf(LS.ME) >= 0 ? '' : ' ui-disabled') + '" onClick="fEinNeuerTisch();">'
                                    + '<img src=\'Icons/MeinTisch.png\' height="64" width="64"/><br>Ein neuer Tisch'
                                    : '<div class="ui-btn S ' + (CUPS.BEREadmin[pCup].indexOf(LS.ME) >= 0 || CUPS.BEREschreiben[pCup].indexOf(LS.ME) >= 0 ? '' : ' ui-disabled') + '" onClick="fZuMeinemTisch();">'
                                    + '<img src=\'Icons/MeinTisch.png\' height="64" width="64"/><br>Zu meinem Tisch'
                                    )
                            + '</div></div>'
                            + '</div>';
                    //      Zur Statistik            Zum Parameter
                    hReturn += '<div class="ui-grid-a">'
                            + '<div class="ui-block-a">'
                            + '<div class="ui-btn S" onClick="hrefStatistik(' + pCup + ');" style="margin-top:0">'
                            + '<img src=\'Icons/Statistik.png\' height="64" width="64"/><br>Zur Statistik'
                            + '</div></div>'
                            + '<div class="ui-block-b">'
                            + '<div class="ui-btn S" onClick="hrefParameterAendern();" style="margin-top:0">'
                            + '<img src=\'Icons/Optionen.png\' height="64" width="64"/><br>Parameter'
                            + '</div></div>'
                            + '</div>';
                } else {
                    //      Zur Anmeldung             Zum Tisch          Zur Statistik
                    hReturn += '<div class="ui-grid-b">'
                            + '<div class="ui-block-a">'
                            + '<div class="ui-btn S" onClick="hrefStatistik(' + pCup + ', \'?Anmeldungen\');">'
                            + '<img src=\'Icons/Anmeldung.png\' height="64" width="64"/><br>Zur Anmeldung'
                            + '</div></div>'
                            + '<div class="ui-block-b">'
                            + (LS.I !== pCup
                                    ? '<div class="ui-btn S ' + (CUPS.BEREadmin[pCup].indexOf(LS.ME) >= 0 || CUPS.BEREschreiben[pCup].indexOf(LS.ME) >= 0 ? '' : ' ui-disabled') + '" onClick="fEinNeuerTisch();">'
                                    + '<img src=\'Icons/MeinTisch.png\' height="64" width="64"/><br>Ein neuer Tisch'
                                    : '<div class="ui-btn S ' + (CUPS.BEREadmin[pCup].indexOf(LS.ME) >= 0 || CUPS.BEREschreiben[pCup].indexOf(LS.ME) >= 0 ? '' : ' ui-disabled') + '" onClick="fZuMeinemTisch();">'
                                    + '<img src=\'Icons/MeinTisch.png\' height="64" width="64"/><br>Zu meinem Tisch'
                                    )
                            + '</div></div>'
                            + '<div class="ui-block-c">'
                            + '<div class="ui-btn S" onClick="hrefStatistik(' + pCup + ');">'
                            + '<img src=\'Icons/Statistik.png\' height="64" width="64"/><br>Zur Statistik'
                            + '</div></div>'
                            + '</div>';
                }
            } else {
                if (CUPS.BEREadmin[pCup].indexOf(LS.ME) >= 0) {
                    //      Zur Anmeldung             Zur Statistik         Parameter
                    hReturn += '<div class="ui-grid-b">'
                            + '<div class="ui-block-a">'
                            + '<div class="ui-btn S" onClick="hrefStatistik(' + pCup + ', \'?Anmeldungen\');">'
                            + '<img src=\'Icons/Anmeldung.png\' height="64" width="64"/><br>Zur Anmeldung'
                            + '</div></div>'
                            + '<div class="ui-block-b">'
                            + '<div class="ui-btn S" onClick="hrefStatistik(' + pCup + ');">'
                            + '<img src=\'Icons/Statistik.png\' height="64" width="64"/><br>Zur Statistik'
                            + '</div></div>'
                            + '<div class="ui-block-c">'
                            + '<div class="ui-btn S" onClick="hrefParameterAendern();">'
                            + '<img src=\'Icons/Optionen.png\' height="64" width="64"/><br>Parameter'
                            + '</div></div>'
                            + '</div>';
                } else {
                    //      Zur Anmeldung             Zur Statistik
                    hReturn += '<div class="ui-grid-a">'
                            + '<div class="ui-block-a">'
                            + '<div class="ui-btn S" onClick="hrefStatistik(' + pCup + ', \'?Anmeldungen\');">'
                            + '<img src=\'Icons/Anmeldung.png\' height="64" width="64"/><br>Zur Anmeldung'
                            + '</div></div>'
                            + '<div class="ui-block-b">'
                            + '<div class="ui-btn S" onClick="hrefStatistik(' + pCup + ');">'
                            + '<img src=\'Icons/Statistik.png\' height="64" width="64"/><br>Zur Statistik'
                            + '</div></div>'
                            + '</div>';
                }
            }


        } else {
            if (CUPS.BEREadmin[pCup].indexOf(LS.ME) >= 0) {
                // Zum Tisch          Zur Statistik          Parameter
                hReturn += '<div class="ui-grid-b">'
                        + '<div class="ui-block-a">'
                        + (LS.I !== pCup
                                ? '<div class="ui-btn S ' + (CUPS.BEREadmin[pCup].indexOf(LS.ME) >= 0 || CUPS.BEREschreiben[pCup].indexOf(LS.ME) >= 0 ? '' : ' ui-disabled') + '" onClick="fEinNeuerTisch();">'
                                + '<img src=\'Icons/MeinTisch.png\' height="64" width="64"/><br>Ein neuer Tisch'
                                : '<div class="ui-btn S ' + (CUPS.BEREadmin[pCup].indexOf(LS.ME) >= 0 || CUPS.BEREschreiben[pCup].indexOf(LS.ME) >= 0 ? '' : ' ui-disabled') + '" onClick="fZuMeinemTisch();">'
                                + '<img src=\'Icons/MeinTisch.png\' height="64" width="64"/><br>Zu meinem Tisch'
                                )
                        + '</div></div>'
                        + '<div class="ui-block-b">'
                        + '<div class="ui-btn S" onClick="hrefStatistik(' + pCup + ');">'
                        + '<img src=\'Icons/Statistik.png\' height="64" width="64"/><br>Zur Statistik'
                        + '</div></div>'
                        + '<div class="ui-block-c">'
                        + '<div class="ui-btn S" onClick="hrefParameterAendern();">'
                        + '<img src=\'Icons/Optionen.png\' height="64" width="64"/><br>Parameter'
                        + '</div></div>'
                        + '</div>';
            } else {
                // Zum Tisch          Zur Statistik
                hReturn += '<div class="ui-grid-a">'
                        + '<div class="ui-block-a">'
                        + (LS.I !== pCup
                                ? '<div class="ui-btn S ' + (CUPS.BEREadmin[pCup].indexOf(LS.ME) >= 0 || CUPS.BEREschreiben[pCup].indexOf(LS.ME) >= 0 ? '' : ' ui-disabled') + '" onClick="fEinNeuerTisch();">'
                                + '<img src=\'Icons/MeinTisch.png\' height="64" width="64"/><br>Ein neuer Tisch'
                                : '<div class="ui-btn S ' + (CUPS.BEREadmin[pCup].indexOf(LS.ME) >= 0 || CUPS.BEREschreiben[pCup].indexOf(LS.ME) >= 0 ? '' : ' ui-disabled') + '" onClick="fZuMeinemTisch();">'
                                + '<img src=\'Icons/MeinTisch.png\' height="64" width="64"/><br>Zu meinem Tisch'
                                )
                        + '</div></div>'
                        + '<div class="ui-block-b">'
                        + '<div class="ui-btn S" onClick="hrefStatistik(' + pCup + ');">'
                        + '<img src=\'Icons/Statistik.png\' height="64" width="64"/><br>Zur Statistik'
                        + '</div></div>'
                        + '</div>';
            }
        }
    }
    if (!pTermin && CUPS.TEXT1[pCup]) {
        hReturn += '<div class="M J" style="margin-left:6px;margin-right:6px;">' + CUPS.TEXT1[pCup] + '</div>';
    }
    hReturn += '</div>';
    return hReturn;
}

function whenCUPSloaded() {

    initExtraButtons();
    if (LS.I) { // ????
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
    var nMeineRundenCups = 0;
    var htmlAKT = '<div id="bAT" data-role="collapsible" data-theme="d" data-corners="false" data-iconpos="right" class="K"><h2>&nbsp;Aktuelle Termine:</h2><ul data-role="listview">';
    var htmlALLE = '<div id="bAL" data-role="collapsible" data-theme="d" data-corners="false" data-iconpos="right" class="K"><h2>&nbsp;Alle Termine:</h2><ul data-role="listview">';
    var htmlMR = '<div id="bMR" data-role="collapsible" data-theme="d" data-corners="false" data-iconpos="right" class=" "><h2>&nbsp;Meine Cups/Runden:</h2><ul data-role="listview">';
    var htmlCT = '<div id="bCT" data-role="collapsible" data-theme="d" data-corners="false" data-iconpos="right" class="K"' + (LS.Quickstart ? ' data-collapsed="false"' : '') + '><h2>&nbsp;Cups:</h2><ul data-role="listview">';
    var htmlLC = '<div id="bLC" data-role="collapsible" data-theme="d" data-corners="false" data-iconpos="right" class="K"><h2>&nbsp;Lokale Cups:</h2><ul data-role="listview">';
    var htmlMT = '<div id="bMT" data-role="collapsible" data-theme="d" data-corners="false" data-iconpos="right" class="K"><h2>&nbsp;Mannschaftsturniere:</h2><ul data-role="listview">';
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
        if (CUPS.NAME[TERMINE[termin].CUP].substr(0, 4).toUpperCase() !== "xxxTEST") { // llll
            if (TERMINE[termin].DATUM >= hHeute && !TERMINE[termin].NAME
                    || TERMINE[termin].DATUM >= hHeute && TERMINE[termin].NAME && (TERMINE[termin].NAME.substr(0, 4).toUpperCase() !== "TEST" || LS.ME === "3425")) {
                if (TERMINE[termin].CUP === 8 || TERMINE[termin].CUP === 10) {
                    hTemp = '';
                }
                if (CUPS.TYP[TERMINE[termin].CUP] === 'CUP' || CUPS.TYP[TERMINE[termin].CUP] === 'MT') {
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
                        hCupName = 'Tirolcup';
                        hCupFarbe = ' cTTC';
                    } else if (TERMINE[termin].CUP === 56) {
                        hCupName = 'Wr. Tarockcup';
                        hCupFarbe = ' cWTC';
                    } else if (TERMINE[termin].CUP === 80) {
                        hCupName = '1. Wr. Marathon';
                        hCupFarbe = ' cDIV';
                    } else if (TERMINE[termin].CUP === 81) {
                        hCupName = 'Schmankerl Tarock';
                        hCupFarbe = ' cDIV';
                    } else {
                        hCupName = CUPS.NAME[TERMINE[termin].CUP];
                        hCupFarbe = ' cDIV';
                    }

                    hBtnName = 'bAL' + TERMINE[termin].CUP + 'T' + TERMINE[termin].I;
                    htmlALLE += '<li data-icon=false><a id="' + hBtnName + '" class="K' + hCupFarbe + '" onClick="showCup(' + TERMINE[termin].CUP + ",\'bAL\'," + TERMINE[termin].I + ')">&nbsp;&nbsp;<span class="L N">' + getDateString(TERMINE[termin].DATUM) + '&nbsp;&nbsp;' + (TERMINE[termin].BEGINN ? TERMINE[termin].BEGINN : '') + '&nbsp;&nbsp;&nbsp;</span><span class="S N">' + hCupName + '&nbsp;<br></span>&nbsp;&nbsp;' + TERMINE[termin].NAME + '</a></li>'
                            + getCupToggleDiv('bAL', TERMINE[termin].CUP, termin);
                    if (TERMINE[termin].DATUM <= hAktuellBis) {
                        for (var iMC in LS.MeineCups) {
                            if (TERMINE[termin].CUP === 49 || TERMINE[termin].CUP === LS.MeineCups[iMC]) {
                                nAktTermine++;
                                htmlAKT += hTemp.replace(/bAL/g, 'bAK');
                                break;
                            }
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
                    htmlAKT += hTemp.replace(/bAL/g, 'bAT');
                }
            }
        }
    }

    var SORT = [];
    for (i = 0; i < CUPS.NAME.length; i++) {
        if (CUPS.NAME[i]) {
//            if (i === 49) { // Österreichfinale
//                SORT[SORT.length] = '0' + CUPS.NAME[i] + '  ;' + i;
//            } else if (i === 50) { // Hausruckcup
//                SORT[SORT.length] = '1' + CUPS.NAME[i] + '  ;' + i;
//            } else if (i === 51) { // Ktn. Tarockcup
//                SORT[SORT.length] = '2' + CUPS.NAME[i] + '  ;' + i;
//            } else if (i === 52) { // Raiffeisencup
//                SORT[SORT.length] = '3' + CUPS.NAME[i] + '  ;' + i;
//            } else if (i === 53) { // Sauwaldcup
//                SORT[SORT.length] = '4' + CUPS.NAME[i] + '  ;' + i;
//            } else if (i === 54) { // Steirischer Tarockcup
//                SORT[SORT.length] = '5' + CUPS.NAME[i] + '  ;' + i;
//            } else if (i === 55) { // Tiroler Tarockcup
//                SORT[SORT.length] = '6' + CUPS.NAME[i] + '  ;' + i;
//            } else if (i === 56) { // Wiener Tarockcup
//                SORT[SORT.length] = '7' + CUPS.NAME[i] + '  ;' + i;
//            } else {
//                SORT[SORT.length] = CUPS.NAME[i] + '  ;' + i;
//            }
            if (i >= 49 && i <= 59) {
                SORT[SORT.length] = i + CUPS.NAME[i] + '  ;' + i;
            } else {
                SORT[SORT.length] = CUPS.NAME[i] + '  ;' + i;
            }
        }
    }

    SORT.sort();

    for (var i = 51; i <= 56; i++) { // Meine Runden/Cups --- Bei Xxxxxx
        var hShow = false;
        if (CUPS.BEREadmin[i].indexOf(LS.ME) >= 0
                || CUPS.BEREschreiben[i].indexOf(LS.ME) >= 0) {
            hShow = true;
        }
        for (var ii = 0; ii < LS.MeineCups.length; ii++) {
            if (LS.MeineCups[ii] === i) {
                hShow = true;
            }
        }
        if (CUPS.MEZULETZT[i]) {
            if (CUPS.MEZULETZT[i] + (90 * 86400000) > Date.now()) { // Nur wenn in den letzten 90 Tagen gespielt
                hShow = true;
            }
        }
        if (hShow) {
            nMeineRundenCups++;
            htmlMR += '<li data-icon=false><a id="bMR' + i + '" class="' + getClass(i) + '" onClick="showCup(' + i + ',\'bMR\')">&nbsp;' + getCupName(i) + '</a></li>'
                    + getCupToggleDiv('bMR', i, false);
        }
    }
    for (var s = 0; s < SORT.length; s++) { // Meine Runden/Cups --- Bei Xxxxxx
        i = parseInt(SORT[s].substring((SORT[s].lastIndexOf(';') + 1)));
        if (i >= 50 && i <= 59) {
        } else if (CUPS.NAME[i].substr(0, 4) === "Test" || i < 5 || CUPS.TYP[i] === 'MT') {
        } else if (i >= 8 && CUPS.BEREadmin[i].indexOf(LS.ME) >= 0) {
            nMeineRundenCups++;
            htmlMR += '<li data-icon=false><a id="bMR' + i + '" class="' + getClass(i) + '" onClick="showCup(' + i + ',\'bMR\')">&nbsp;' + getCupName(i) + '</a></li>'
                    + getCupToggleDiv('bMR', i, false);
        }
    }
    for (var s = 0; s < SORT.length; s++) { // mit Schreibberechtigung >>>>>>>>>> später eventuell entfernen
        i = parseInt(SORT[s].substring((SORT[s].lastIndexOf(';') + 1)));
        if (i >= 50 && i <= 59) {
        } else if (CUPS.NAME[i].substr(0, 4) === "Test" || i < 5 || CUPS.TYP[i] === 'MT') {
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
        } else if (CUPS.NAME[i].substr(0, 4) === "Test" || i < 5 || CUPS.TYP[i] === 'MT') {
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
        if (QUERFORMAT() || !CUPS.TEXT1[i] || CUPS.TYP[i] === 'PR') {
            html = '<li data-icon=false><a id="bXX' + i + '" class="' + getClass(i) + (i === 49 || i === 51 && !mHausruckAktiv || i === 52 && !mRaiffeisenAktiv || i === 53 && !mSauwaldAktiv || i === 55 && !mTirolAktiv ? ' cDIV' : '') + '" onClick="showCup(' + i + ',\'bXX\')">&nbsp;' + getCupName(i) + '</a></li>';
        } else {
            if (!QUERFORMAT() && (i === 49 || i === 51 && !mHausruckAktiv || i === 52 && !mRaiffeisenAktiv || i === 53 && !mSauwaldAktiv || i === 55 && !mTirolAktiv)) {
                html = '<li data-icon=false><a id="bXX' + i + '" class="cDIV' + getClass(i) + '" onClick="toggleShow(\'#hToggle2' + i + '\');">&nbsp;' + getCupName(i) + '</a></li>'
                        + '<div id="hToggle2' + i + '" class="TGL M" style="margin:8px;text-align:justify;" hidden>'
                        + (CUPS.TEXT1[i] ? CUPS.TEXT1[i] : '')
                        + (i === 49
                                ? '<div class=S2><br>'
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
                                + '<div class="ui-block-b" style="width:80%"><b>Huemer Manfred</b><br>Bad Leonfelden</div></div></div>'
                                : '')
                        + '</div>';
            } else if (i === 53 && mSauwaldAktiv) {
                html = '<li><a id="bXX' + i + '" class="' + getClass(i) + '" onClick="hrefStatistik(' + TERMINE[termin].CUP + ')">&nbsp;' + getCupName(i) + '</a>'
                        + '<a onclick="toggleShow(\'#hToggle2' + i + '\');">Info</a></li>'
                        + '<div id="hToggle2' + i + '" class="TGL M" style="margin:8px;text-align:justify;" hidden>'
                        + (CUPS.TEXT1[i] ? CUPS.TEXT1[i] + '<br>' : '')
                        + '</div>';
            } else {
                html = '<li><a id="bXX' + i + '" class="' + (i === 51 && !mHausruckAktiv || i === 52 && !mRaiffeisenAktiv || i === 53 && !mSauwaldAktiv || i === 55 && !mTirolAktiv ? 'cDIV ' : '') + getClass(i) + '" onClick="showCup(' + i + ',\'bXX\')">#####&nbsp;' + getCupName(i) + '</a>'
                        + '<a onclick="toggleShow(\'#hToggle2' + i + '\');">Info</a></li>'
                        + '<div id="hToggle2' + i + '" class="TGL M" style="margin:8px;text-align:justify;" hidden>'
                        + (CUPS.TEXT1[i] ? CUPS.TEXT1[i] + '<br>' : '')
                        + '</div>';
            }
        }
        html = '<li data-icon=false><a id="bXX' + i + '" class="' + getClass(i) + '" onClick="showCup(' + i + ',\'bXX\')">&nbsp;' + getCupName(i) + '</a></li>'
                + getCupToggleDiv('bXX', i, false);
        if (CUPS.NAME[i].substr(0, 4) === "Test" || CUPS.TYP[i] === 'TR' || i <= 4) { // 4te TestRunde / TestCup
            htmlTR = htmlTR + html;
        } else if (CUPS.TYP[i] === 'CUP' && (i >= 49 && i <= 57)) {
            htmlCT = htmlCT + html;
        } else if (CUPS.TYP[i] === 'CUP' || CUPS.TYP[i] === 'TC') {
            htmlLC = htmlLC + html;
        } else if (CUPS.TYP[i] === 'MT') {
            htmlMT = htmlMT + html;
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
    htmlCT += "<li data-icon='false'><a id='bCTDetailstatistik' class='ui-btn' onclick='showText(\"CTDetailstatistik\")'>&nbsp;<span class=\"N M3\">Detailstatistik</span></a></li>";
    $('#dRundenCups').html(htmlCT.replace(/bXX/g, 'bCT') + '</ul></div>' + htmlLC.replace(/bXX/g, 'bLC') + '</ul></div>' + htmlMT.replace(/bXX/g, 'bMT') + '</ul></div>' + htmlFC.replace(/bXX/g, 'bFC') + '</ul></div>' + htmlPR.replace(/bXX/g, 'bPR') + '</ul></div>' + htmlTR.replace(/bXX/g, 'bTR') + '</ul></div>' + htmlAR.replace(/bXX/g, 'bAR') + '</ul></div>').trigger('create').show();
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
                $(LS.LastBtn).addClass('ui-btn-active').removeClass('cRTC').removeClass('cHRC').removeClass('cSWC').removeClass('cSTC').removeClass('cTTC').removeClass('cWTC').removeClass('cTOF').removeClass('cDIV').removeClass('fGruen').removeClass('cAktiv');
            }
            if ($('#pContent').position().top + $(LS.LastBtn).offset().top > $(window).innerHeight() / 4) {
                $('#pContent').scrollTop(parseInt($(LS.LastBtn).offset().top - $(window).innerHeight() / 4));
                if (navigator.userAgent.toUpperCase().indexOf('FIREFOX') >= 0) { // Firefox schafft den Scroll nur jedes zweite mal.
                    if ($('#pContent').position().top + $(LS.LastBtn).offset().top > $(window).innerHeight() / 4) {
                        $('#pContent').scrollTop(parseInt($(LS.LastBtn).offset().top - $(window).innerHeight() / 4));
                    }
                }
            }
        }
    } else {
        $('#bAK').collapsible({collapsed: false});
        $('#bMR').collapsible({collapsed: false});
    }
    $('#dFooter').show();

    delete TERMINE;
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
        LS.MeineCups = [];
        LS.Schreibzettel = false;
        LS.I = 0;
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
    if (LS.Version < 967) {
        LS.VIP = false;
    }
    if (LS.Version < 991) {
        LS.LastDate = new Date().getTime();
    }
    if (!LS.MeineCups) {
        LS.MeineCups = [];
    }
    if (new Date().getTime() > LS.LastDate + 60000 * 60 * 12) { // + 6 Stunden Differenz
        if (LS.MeineCups.length === 1 && LS.MeineCups[0]) {
            LS.ShowCups = LS.MeineCups[0]; // Auf Standardcup wegen Lesezeichen zurücksetzen
        }
        LS.LastBtn = '';
    }

    if (window.location.href.toUpperCase().indexOf('?VIPS') > 0) {
        LS.tempVIPs = window.location.href.substr(window.location.href.toUpperCase().indexOf('?VIPS'));
    }

    if (LS.ME !== "3425" && LS.ME !== "1000") {
        document.oncontextmenu = function () {
//            return false; // oncontextmenu
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

    if (/iPad|iPhone/.test(navigator.userAgent)) {
        window.onpageshow = function (event) {
            if (window.performance.navigation.type === 2) {
                LS = JSON.parse(localStorage.getItem('Abakus.LS'));
                CUPS = JSON.parse(localStorage.getItem('Abakus.CUPS'));
                if (LS.ME !== 'NOBODY') { // nach Registrierung aktualisieren
                    if (LS.ME.length === 4) {
                        $('#tSpieler').html('Registriert für Spieler ' + LS.ME + '<br>' + LS.MEname + '.');
                    } else {
                        $('#tSpieler').html('Registriert für Spieler<br>' + LS.MEname + '.');
                    }
                }
                initSeite1();
                if (LS.I === 0) {
                    $('#bZuMeinemTisch').hide();
                }
                $('body').removeClass('ui-disabled');
            }
        };
    }

});