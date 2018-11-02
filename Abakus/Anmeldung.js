
var PC = false;

var LS = new Object();
var DS = new Object();
var STAT = new Object();
var CUPS = new Object();
var SPIELER = new Object();

var SORT = []; // Sort Stammspieler

var DB = new Object();
var iC, canvas, ctx;
var sBasis = 0;
var neuerTisch = false;

var tStatus = '?';

var myJBox = null;
var myJTip = null;

var spPFX = '??';
var spID = '';
var spKEY = '';
var spDrag = 0;
var spDrop = 0;

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

const spNR = 0;
const spNNAME = 1;
const spVNAME = 2;
const spORT = 3;

function showEinenTip(pTarget, pText) {
    $(pTarget).focus();
    myJTip.setContent('<span class=L style="color:white; padding:0; margin:0">' + pText + '</span>');
    myJTip.open({
        target: pTarget
    });
}

function SPIELERerweitern() {
    if (STAT === null) {
        $('#bStammspieler').addClass('ui-disabled');
        return;
    } else if (STAT.S.length === 0) {
        $('#bStammspieler').addClass('ui-disabled');
        return;
    }

    var nSpielerNeu = 0;
    var SPIELERnr = JSON.parse(localStorage.getItem('Abakus.SPIELERnr'));
//Wenn SPIELERnr nicht vorhanden ist, müssen die Spieler geladen werden.!!!!!

    for (var j = 0; j < STAT.S.length; j++) {
        if (!SPIELERnr[STAT.S[j].NR]) {
            nSpielerNeu++;
            SPIELER[SPIELER.length] = new Array(STAT.S[j].NR, STAT.S[j].NNAME, STAT.S[j].VNAME, STAT.S[j].ORT);
        }
    }

    if (nSpielerNeu) {
        function Comparator(a, b) {
            if (a[1] < b[1] || a[1] === b[1] && a[2] < b[2])
                return -1;
            if (a[1] > b[1] || a[1] === b[1] && a[2] > b[2])
                return 1;
            return 0;
        }
        SPIELER.sort(Comparator);
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

function dropSpieler() {
    $('#dRumpf').addClass("ui-disabled");
    $.mobile.loading("show");
    setTimeout(function () {
        if (LS.NR[spDrop]) {
            $('#GS' + LS.NR[spDrop] + ',#TS' + LS.NR[spDrop]).css('color', '');
        }
        var iEntfernen = 0;
        if (spKEY === LS.NR[1]) {
            iEntfernen = 1;
        } else if (spKEY === LS.NR[2]) {
            iEntfernen = 2;
        } else if (spKEY === LS.NR[3]) {
            iEntfernen = 3;
        } else if (spKEY === LS.NR[4]) {
            iEntfernen = 4;
        } else if (spKEY === LS.NR[5]) {
            iEntfernen = 5;
        } else if (spKEY === LS.NR[6]) {
            iEntfernen = 6;
        }
        if (iEntfernen) {
            $("#SP" + iEntfernen).html('?').attr('style', 'color:#000000;padding:0;');
            LS.NR     [iEntfernen] = '';
            LS.VName  [iEntfernen] = '';
            LS.NName  [iEntfernen] = '';
            LS.Sterne [iEntfernen] = '';
            LS.Spieler[iEntfernen] = '';
            LS.Ort    [iEntfernen] = '';
        }
        if (spPFX === 'GS') { // Turnierspieler
            LS.NR     [spDrop] = SPIELER[spDrag][spNR];
            LS.VName  [spDrop] = SPIELER[spDrag][spVNAME];
            LS.NName  [spDrop] = SPIELER[spDrag][spNNAME];
            LS.Sterne [spDrop] = '';
            LS.Spieler[spDrop] = SPIELER[spDrag][spVNAME] + ' ' + SPIELER[spDrag][spNNAME][0] + '.';
            LS.Ort    [spDrop] = SPIELER[spDrag][spORT];
            B_Clear();
        } else {              // Stammspieler
            var hSpieler = STAT.S[spDrag].VNAME + ' ' + STAT.S[spDrag].NNAME[0] + '.';
            if (LS.Spieler[1] === hSpieler && LS.NR[1] !== STAT.S[spDrag].NR
                    || LS.Spieler[2] === hSpieler && LS.NR[2] !== STAT.S[spDrag].NR
                    || LS.Spieler[3] === hSpieler && LS.NR[3] !== STAT.S[spDrag].NR
                    || LS.Spieler[4] === hSpieler && LS.NR[4] !== STAT.S[spDrag].NR
                    || LS.Spieler[5] === hSpieler && LS.NR[5] !== STAT.S[spDrag].NR
                    || LS.Spieler[6] === hSpieler && LS.NR[6] !== STAT.S[spDrag].NR) {
                hSpieler = STAT.S[spDrag].VNAME + ' ' + STAT.S[spDrag].NNAME.substr(0, 2) + '.';
            }
            LS.NR     [spDrop] = STAT.S[spDrag].NR;
            LS.VName  [spDrop] = STAT.S[spDrag].VNAME;
            LS.NName  [spDrop] = STAT.S[spDrag].NNAME;
            LS.Sterne [spDrop] = STAT.S[spDrag].STERNE;
            LS.Spieler[spDrop] = STAT.S[spDrag].VNAME + ' ' + STAT.S[spDrag].NNAME[0] + '.';
            LS.Spieler[spDrop] = hSpieler;
            LS.Ort    [spDrop] = STAT.S[spDrag].ORT;
        }
        $("#SP" + spDrop).html(LS.Spieler[spDrop]).attr('style', 'color:#dd1111;padding:0;white-space:nowrap');
        $('#GS' + LS.NR[spDrop] + ',#TS' + LS.NR[spDrop]).css('color', '#dd1111');
        if (LS.NR[1]
                && LS.NR[2]
                && LS.NR[3]
                && LS.NR[4]
                && (LS.NR[5] || LS.AnzSpieler < 5)
                && (LS.NR[6] || LS.AnzSpieler < 6)) {
            $('#bOK').removeClass('ui-disabled');
        } else {
            $('#bOK').removeClass('ui-disabled').addClass('ui-disabled');
        }
        if ($('#SpielerSuchen').is(':visible')) {
            scrollToRumpf2();
        }
        if (spID) {
            $('#' + spID).removeClass('ui-btn-f');
            showStatuszeile(true);
            spID = '';
        }
        hideLoading();
    });
}

function setRunde(pRunde) {
    LS.AktRunde = pRunde;
    if (STAT.TURRUNDE !== LS.AktRunde) {
        $('#dNachtrag').text('Runde ' + pRunde + ': Tisch korrigieren oder nachtragen').show();
    } else {
        $('#dNachtrag').hide();
    }
}

function setTisch(pTisch) {
    if (spID) {
        $('#' + spID).removeClass('ui-btn-f');
        showStatuszeile(true);
        spID = '';
    }

    $('#b4er,#b5er,#b6er').removeClass('ui-btn-active');
    $('#b' + pTisch + 'er').addClass('ui-btn-active');
    $('#nbSelAll,#nbSelRed').removeClass('ui-disabled');
    if (pTisch === 4) {
        if (LS.AnzSpieler === 4 && parseInt(LS.JeSeite) === 1) {
            LS.JeSeite = '2';
        } else {
            LS.JeSeite = '1';
        }
        if (LS.NR[5]) {
            $(".SP5").html('?').attr('style', 'color:#000000;padding:0;');
            $('#GS' + LS.NR[5] + ',#TS' + LS.NR[5]).css('color', '').removeClass('cRot');
            LS.NR     [5] = '';
            LS.VName  [5] = '';
            LS.NName  [5] = '';
            LS.Sterne [5] = '';
            LS.Spieler[5] = '';
            LS.Ort    [5] = '';
        }
        if (LS.NR[6]) {
            $(".SP6").html('?').attr('style', 'color:#000000;padding:0;');
            $('#GS' + LS.NR[6] + ',#TS' + LS.NR[6]).css('color', '').removeClass('cRot');
            LS.NR     [6] = '';
            LS.VName  [6] = '';
            LS.NName  [6] = '';
            LS.Sterne [6] = '';
            LS.Spieler[6] = '';
            LS.Ort    [6] = '';
        }
    } else if (pTisch === 5) {
        LS.JeSeite = '';
        if (LS.NR[6]) {
            $(".SP6").html('?').attr('style', 'color:#000000;padding:0;');
            $('#GS' + LS.NR[6] + ',#TS' + LS.NR[6]).css('color', '').removeClass('cRot');
            LS.NR     [6] = '';
            LS.VName  [6] = '';
            LS.NName  [6] = '';
            LS.Sterne [6] = '';
            LS.Spieler[6] = '';
            LS.Ort    [6] = '';
        }
    } else {
        LS.JeSeite = '';
    }

    if (pTisch === 4) {
        if (parseInt(LS.JeSeite) === 1) {
            $('#header').html(
                    '<div id=SP3 onclick="event.stopPropagation();onclickSpieler(3);" class="ui-bar ui-bar-a LL3 C" style="padding:0;">?</div>'
                    + '<div class="ui-grid-a">'
                    + '<div class="ui-block-a">'
                    + '<div id=SP4 onclick="event.stopPropagation();onclickSpieler(4);" class="ui-bar ui-bar-a LL3 C" style="padding:0;">?</div>'
                    + '</div>'
                    + '<div class="ui-block-b">'
                    + '<div id=SP2 onclick="event.stopPropagation();onclickSpieler(2);" class="ui-bar ui-bar-a LL3 C" style="padding:0;">?</div>'
                    + '</div>'
                    + '</div>'
                    + '<div id=SP1 onclick="event.stopPropagation();onclickSpieler(1);" class="ui-bar ui-bar-a LL3 C" style="padding:0;">?</div>');
        } else {
            $('#header').html(
                    '<div class="ui-grid-a">'
                    + '<div class="ui-block-a">'
                    + '<div id=SP4 onclick="event.stopPropagation();onclickSpieler(4);" class="ui-bar ui-bar-a LL3 C" style="padding:0;">?</div>'
                    + '<div id=SP1 onclick="event.stopPropagation();onclickSpieler(1);" class="ui-bar ui-bar-a LL3 C" style="padding:0;">?</div>'
                    + '</div>'
                    + '<div class="ui-block-b">'
                    + '<div id=SP3 onclick="event.stopPropagation();onclickSpieler(3);" class="ui-bar ui-bar-a LL3 C" style="padding:0;">?</div>'
                    + '<div id=SP2 onclick="event.stopPropagation();onclickSpieler(2);" class="ui-bar ui-bar-a LL3 C" style="padding:0;">?</div>'
                    + '</div>'
                    + '</div>');
        }
    } else if (pTisch === 5) {
        $('#header').html(
                '<div class="ui-grid-a">'
                + '<div class="ui-block-a">'
                + '<div id=SP4 onclick="event.stopPropagation();onclickSpieler(4);" class="ui-bar ui-bar-a LL3 C SPx56" style="padding:0;">?</div>'
                + '<div id=SP5 onclick="event.stopPropagation();onclickSpieler(5);" class="ui-bar ui-bar-a LL3 C SPx56" style="padding:0;">?</div>'
                + '</div>'
                + '<div class="ui-block-b">'
                + '<div id=SP3 onclick="event.stopPropagation();onclickSpieler(3);" class="ui-bar ui-bar-a LL3 C SPx56" style="padding:0;">?</div>'
                + '<div id=SP2 onclick="event.stopPropagation();onclickSpieler(2);" class="ui-bar ui-bar-a LL3 C SPx56" style="padding:0;">?</div>'
                + '</div>'
                + '</div>'
                + '<div id=SP1 onclick="event.stopPropagation();onclickSpieler(1);" class="ui-bar ui-bar-a LL3 C SPx56" style="padding:0;">?</div>');
    } else if (pTisch === 6) {
        $('#header').html(
                '<div id=SP4 onclick="event.stopPropagation();onclickSpieler(4);" class="ui-bar ui-bar-a LL2 C SPx56" style="padding:0;">?</div>'
                + '<div class="ui-grid-a">'
                + '<div class="ui-block-a">'
                + '<div id=SP5 onclick="event.stopPropagation();onclickSpieler(5);" class="ui-bar ui-bar-a LL2 C SPx56" style="padding:0;">?</div>'
                + '<div id=SP6 onclick="event.stopPropagation();onclickSpieler(6);" class="ui-bar ui-bar-a LL2 C SPx56" style="padding:0;">?</div>'
                + '</div>'
                + '<div class="ui-block-b">'
                + '<div id=SP3 onclick="event.stopPropagation();onclickSpieler(3);" class="ui-bar ui-bar-a LL2 C SPx56" style="padding:0;">?</div>'
                + '<div id=SP2 onclick="event.stopPropagation();onclickSpieler(2);" class="ui-bar ui-bar-a LL2 C SPx56" style="padding:0;">?</div>'
                + '</div>'
                + '</div>'
                + '<div id=SP1 onclick="event.stopPropagation();onclickSpieler(1);" class="ui-bar ui-bar-a LL2 C SPx56" style="padding:0;">?</div>');
    }

    LS.AnzSpieler = pTisch;
    if (LS.AnzSpieler > LS.Vorhand) {
        LS.Vorhand = 0;
    }

    if (LS.I <= 7 && !LS.NR[2]) {
        LS.NR[1] = 'Spieler_A';
        LS.NR[2] = 'Spieler_B';
        LS.NR[3] = 'Spieler_C';
        LS.NR[4] = 'Spieler_D';
        LS.VName = ['', 'A', 'B', 'C', 'D', '', ''];
        LS.NName = ['', 'Spieler', 'Spieler', 'Spieler', 'Spieler', '', ''];
        LS.Sterne = ['', '', '', '', '', '', ''];
        LS.Spieler = ['', 'Spieler A', 'Spieler B', 'Spieler C', 'Spieler D', '', ''];
        LS.Ort = ['', '', '', '', '', '', ''];
        if (LS.ME.length === 4) {
            var lSPIELER = SPIELER.length;
            for (var i = 0; i < lSPIELER; i++) {
                if (SPIELER[i][spNR] === LS.ME) {
                    LS.NR[1] = '';
                    blert(SPIELER[i][spNR], SPIELER[i][spVNAME], SPIELER[i][spNNAME], SPIELER[i][spORT] + '&nbsp;', '');
                    break;
                }
            }
        }
    }
    if (LS.I <= 7 && !LS.NR[5] && LS.AnzSpieler >= 5) {
        LS.NR[5] = 'Spieler_E';
        LS.VName[5] = 'E';
        LS.NName[5] = 'Spieler';
        LS.Spieler[5] = 'Spieler E';
    }
    if (LS.I <= 7 && !LS.NR[6] && LS.AnzSpieler >= 6) {
        LS.NR[6] = 'Spieler_F';
        LS.VName[6] = 'F';
        LS.NName[6] = 'Spieler';
        LS.Spieler[6] = 'Spieler F';
    }

    if (LS.NR[1]
            && LS.NR[2]
            && LS.NR[3]
            && LS.NR[4]
            && (LS.NR[5] || LS.AnzSpieler < 5)
            && (LS.NR[6] || LS.AnzSpieler < 6)) {
        $('#bOK').removeClass('ui-disabled');
    } else {
        $('#bOK').removeClass('ui-disabled').addClass('ui-disabled');
    }

    for (ii = 1; ii <= LS.AnzSpieler; ii++) {
        if (LS.NR[ii]) {
            if (LS.VName[ii].length === 1) {
                $('#SP' + ii).html(LS.VName[ii]).css('color', '#dd1111');
            } else {
                $('#SP' + ii).html(LS.VName[ii].replace(/ /g, '&nbsp;') + '&nbsp;' + LS.NName[ii][0] + '.').css('color', '#dd1111');
            }
        }
    }

    showStatuszeile(true);
    if (LS.Vorhand) {
        $('#SP' + LS.Vorhand).removeClass('ui-bar-a').addClass('ui-bar-f');
    }
}

function onOK() {
    'use strict';

    if (!LS.NR[4]) {
        showStatuszeile(false, '&nbsp;Bitte mindestens vier Spieler eingeben!');
        return;
    }

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

    if (LS.NR[1] === LS.NR[2]
            || LS.NR[1] === LS.NR[3]
            || LS.NR[1] === LS.NR[4]
            || LS.NR[1] === LS.NR[5]
            || LS.NR[1] === LS.NR[6]) {
        showStatuszeile(false, LS.VName[1] + ' ' + LS.NName[1] + LS.Sterne[1] + ' wurde mehrfach genannt.');
        return;
    }
    if (LS.NR[2] === LS.NR[3]
            || LS.NR[2] === LS.NR[4]
            || LS.NR[2] === LS.NR[5]
            || LS.NR[2] === LS.NR[6]) {
        showStatuszeile(false, LS.VName[2] + ' ' + LS.NName[2] + LS.Sterne[2] + ' wurde mehrfach genannt.');
        return;
    }
    if (LS.NR[3] === LS.NR[4]
            || LS.NR[3] === LS.NR[5]
            || LS.NR[3] === LS.NR[6]) {
        showStatuszeile(false, LS.VName[3] + ' ' + LS.NName[3] + LS.Sterne[3] + ' wurde mehrfach genannt.');
        return;
    }
    if (LS.NR[4] === LS.NR[5]
            || LS.NR[4] === LS.NR[6]) {
        showStatuszeile(false, LS.VName[4] + ' ' + LS.NName[4] + LS.Sterne[4] + ' wurde mehrfach genannt.');
        return;
    }
    if (LS.NR[6]) {
        if (LS.NR[5] === LS.NR[6]) {
            showStatuszeile(false, LS.VName[5] + ' ' + LS.NName[5] + LS.Sterne[5] + ' wurde mehrfach genannt.');
            return;
        }
    }
    if (LS.Vorhand <= 0 || LS.Vorhand > LS.AnzSpieler) {
        showEinenTip('#SP1', 'Wer hat die Vorhand?');
        return;
    }

    $('.onExit').addClass('ui-disabled');

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

    LS.SpieleJeRunde = CUPS.SPJERUNDE[LS.I];
    if (LS.Spieler[5] === '') {
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
    if (LS.SpieleJeRunde && LS.AnzSpieler > 4) {
        LS.SpieleJeRunde = (CUPS.SPJERUNDE[LS.I] / 4) * LS.AnzSpieler;
    }

    SetGeberPausierer();
    setTarif();

    localStorage.setItem('Abakus.LS', JSON.stringify(LS));
    localStorage.setItem('Abakus.DS', JSON.stringify(DS));

    if (!CUPS.TURNIER[LS.I] || CUPS.TYP[LS.I] === 'CUP' || CUPS.TYP[LS.I] === 'MT') {
        var NEXT = new Object();
        NEXT.Seite = 'GR';
        localStorage.setItem('Abakus.NEXT', JSON.stringify(NEXT));
        window.location.replace('Abakus' + LS.AnzSpieler + LS.JeSeite + '.html');
    } else if (STAT.TURRUNDE === LS.AktRunde && (STAT.TURGESPIELT === 0 || CUPS.TURNIER[LS.I] === 'PC')) {
        var NEXT = new Object();
        NEXT.Seite = 'GR';
        localStorage.setItem('Abakus.NEXT', JSON.stringify(NEXT));
        window.location.replace('Abakus' + LS.AnzSpieler + LS.JeSeite + '.html');
    } else {
        if (LS.AnzSpieler === 4) {
            LS.INA1 = 5;
            LS.INA2 = 6;
            LS.JeSeite = '1';
        } else if (LS.AnzSpieler === 5) {
            LS.INA1 = 6;
            LS.INA2 = 0;
            LS.JeSeite = '';
        } else {
            LS.INA1 = 0;
            LS.INA2 = 0;
            LS.JeSeite = '';
        }
        localStorage.setItem('Abakus.LS', JSON.stringify(LS));

        window.location.replace('Edit' + LS.AnzSpieler + LS.JeSeite + '.html?DE');
    }

}

function onclickSpieler(pSpieler) {

    myJTip.close();

    if (spID) {
        spDrop = pSpieler;
        dropSpieler();
        return;
    }

    if (LS.Vorhand) {
        $('#SP' + LS.Vorhand).removeClass('ui-bar-f').addClass('ui-bar-a');
    }
    LS.Vorhand = pSpieler;
    $('#SP' + LS.Vorhand).removeClass('ui-bar-a').addClass('ui-bar-f');

    if (LS.Vorhand === LS.Pausierer1) {
        LS.Pausierer1 = 0;
    }
    if (LS.Vorhand === LS.Pausierer2) {
        LS.Pausierer2 = 0;
    }
    if (LS.Vorhand === LS.INA1) {
        LS.INA1 = 0;
    }
    if (LS.Vorhand === LS.INA2) {
        LS.INA2 = 0;
    }
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

function showStatuszeile(pOK, pText) {
    if (pOK) {
        if (pText) {
            tStatus = pText;
        }
        $('#tStatuszeile').html('&nbsp;' + tStatus);
    } else {
        $('#tStatuszeile').html('&nbsp;<span class="cRot B">' + pText + '</span>');
    }
}

function scrollToRumpf2() {
    $('#dLegende').hide();
    $('html, body').animate({
        scrollTop: ($('#dRumpf2').offset().top - $("#header").height() + 12)
    }, 600);
    if (spID) {
        $('#' + spID).removeClass('ui-btn-f');
        showStatuszeile(true);
        spID = '';
    }
}

function scrollToFMeldung() {
    $('#dLegende').hide();
    $('html, body').animate({
        scrollTop: ($('#fMeldung').offset().top - $("#header").height() - 8)
    }, 600);
    if (spID) {
        $('#' + spID).removeClass('ui-btn-f');
        showStatuszeile(true);
        spID = '';
    }
}

function scrollToINR() {
    $('#dLegende').hide();
    $('html, body').animate({
        scrollTop: ($('#I_NR').offset().top - $("#header").height() - 8)
    }, 600);
    if (spID) {
        $('#' + spID).removeClass('ui-btn-f');
        showStatuszeile(true);
        spID = '';
    }
}

function writeCanvas(pTitel) {
    $('#dCanvas').html("<canvas id='canHead' width='700' height='110'></canvas>").trigger('create');
    var canvas = document.getElementById("canHead");
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = 'italic bold 24pt sans-serif';
    context.fillText(CUPS.NAME[LS.I], 92, 30);
    context.font = '22pt sans-serif';
    context.fillText(pTitel, 92, 60);
    context.font = '20pt sans-serif';
    context.fillText('Gute Bl' + eval('"\\u00e4"') + 'tter!', 92, 108);
}

function showEineNotiz(pText) {
    if (myJBox) {
        myJBox.close().destroy(); // Die alten Input-Felder im Dom müssen gelöscht werden.
        $('#jBox-overlay').remove();
    }
    myJBox = new jBox('Notice', {
        content: pText,
        color: 'red',
        position: {x: 'left:22', y: 222},
        stack: false,
        onCloseComplete: function () {
            if (myJBox) {         // Nur wenn es um diese Notiz geht !!!
                if (myJBox.type === "Notice") {
                    myJBox.close({ignoreDelay: true}).destroy();
                    $('#jBox-overlay').remove();
                    myJBox = null;
                }
            }
        }
    });
}

function onSubmitCode() {
    'use strict';
    var ptCode = getINT($('#ptCode').val());
    if (ptCode === false) {
        $('#ptMeld').show().html('Der Code ist ung&uuml;ltig!');
        $('#ptCode').focus();
    } else if (ptCode < 1 || ptCode > 9999 || ptCode !== LS.TURCODE) {
        $('#ptMeld').show().html('Der Code ist ung&uuml;ltig!');
        $('#ptCode').focus();
    } else {
        $.mobile.activePage.focus();
        $('#fCode').hide();
        if (CUPS.TURNIER[LS.I] === "PC") {
            showStatuszeile(true, '<b>Tische für PC-Turniere werden in funcTisch angemeldet.</b>');
            // pcTurnierAnmelden();
        } else {
            $('#dRumpf').show();
            listStammspieler();
            if (LS.AnzSpieler >= 4) {
                setTisch(LS.AnzSpieler);
            } else {
                writeCanvas('Ein neuer Tisch');
                showEinenTip('#b5er', '4er, 5er oder 6er-Tisch?');
            }
            if (CUPS.TURNIER[LS.I]) {
                $('#nbSelAll').show();
            } else {
                $('#nbSelRed').show();
            }
        }
    }
    return false;
}

function listStammspieler() {
    'use strict';

    var nachTischen = false;
    if (CUPS.TURNIER[LS.I] && STAT.TURRUNDE >= 2) {
        nachTischen = true;
        $('#bTische').removeClass('ui-disabled');
    }

    var h = 0;
    var i = 0;
    var tClass = '';
    var tischAnmelden = false;
    if (STAT) { // für Offline-Betrieb
        while (i < STAT.S.length) {
            if (STAT.S[i].NR !== '0000') {
                SORT[SORT.length] = STAT.S[i].NNAME + ' ' + STAT.S[i].VNAME + ';' + i;
            }
            i++;
        }
    }

    SORT.sort();

    if (SORT.length) {
        for (var j = 0, eoa = SORT.length; j < eoa; j++) {
            var i = parseInt(SORT[j].substring((SORT[j].lastIndexOf(';') + 1)));
            tClass = 'alle';
            if (neuerTisch) {
                if (STAT.S[i].NR === LS.ME) {
                    if (nachTischen) {
                        if (STAT.TURRUNDE > 1 && STAT.TURGESPIELT === 0) {
                            tischAnmelden = true;
                        } else {
                            tischAnmelden = false;
                        }
                    } else {
                        if (!STAT.TURGESPIELT) {
                            tClass += ' cRot';
                            blert(STAT.S[i].NR, STAT.S[i].VNAME, STAT.S[i].NNAME, STAT.S[i].ORT, STAT.S[i].STERNE);
                        }
                    }
                }
            } else
            if (STAT.S[i].NR === LS.NR[1]
                    || STAT.S[i].NR === LS.NR[2]
                    || STAT.S[i].NR === LS.NR[3]
                    || STAT.S[i].NR === LS.NR[4]
                    || STAT.S[i].NR === LS.NR[5]
                    || STAT.S[i].NR === LS.NR[6]) {
                tClass += ' cRot';
            }
            if (CUPS.TURNIER[LS.I] && STAT.S[i].SCHREIBER.length >= STAT.TURRUNDE) {
                tClass += ' ui-btn ui-state-disabled';
            }

            var monDiff = (new Date() - new Date(STAT.S[i].TIMESTAMP)) / (30 * 24 * 3600 * 1000);
            if (new Date(STAT.ZULETZT).toLocaleDateString() === new Date(STAT.S[i].TIMESTAMP).toLocaleDateString()
                    || !CUPS.TURNIER[LS.I] && monDiff <= 1) {
                tClass += ' zuletzt le6Mon';
            } else if (monDiff <= 6) {
                tClass += ' le6Mon';
            }

            //  if (CUPS.SWNAME[LS.I] === 'NV') {
            $("#lvStammSP").append("<li data-icon='false'><a class='STAMMSP " + tClass + "' id='TS" + STAT.S[i].NR + "'>&nbsp&nbsp;" + STAT.S[i].NNAME + " " + STAT.S[i].VNAME + STAT.S[i].STERNE + "</a></li>");
            if (nachTischen && STAT.S[i].SCHREIBER.length >= STAT.TURRUNDE) {
                tClass = "class='ui-btn ui-state-disabled'";
            }
        }
    } else {
        if (neuerTisch) {
            var lSPIELER = SPIELER.length;
            for (var i = 0; i < lSPIELER; i++) {
                if (SPIELER[i][spNR] === LS.ME) {
                    blert(SPIELER[i][spNR], SPIELER[i][spVNAME], SPIELER[i][spNNAME], SPIELER[i][spORT] + '&nbsp;', '');
                    break;
                }
            }
        }
    }

    if (nachTischen) {
        i = 0;
        SORT = ['0000,Root;' + i];
        while (i < STAT.S.length) {
            if (STAT.S[i].NR !== "0000" && STAT.S[i].SPIELE[3] > 0) {  // nur wenn bereits mitgespielt
                SORT[SORT.length] = STAT.S[i].SCHREIBER[0] + ',' + STAT.S[i].NNAME + ' ' + STAT.S[i].VNAME + ';' + i;
            }
            i++;
        }

        SORT.sort();  // muss sein

//        LS.AnzSpieler = SORT.length - 1;
        if (LS.AnzSpieler === 4) {
            LS.JeSeite = '1';
        } else {
            LS.JeSeite = '';
        }
        if (STAT.TURRUNDE >= 3) {
            sortNachReihung(LS.I, tischAnmelden);
        } else {
            sortNachTischen(LS.I, tischAnmelden, STAT.TURRUNDE);
        }

        if (tischAnmelden) {
            setTisch(LS.AnzSpieler);
            onOK();
        }

        var hTisch = 0;
        var iTisch = 0;
        for (var j = 1, eoa = SORT.length; j < eoa; j++) {
            var i = parseInt(SORT[j].substring((SORT[j].lastIndexOf(';') + 1)));
            hTisch = parseInt(SORT[j]);
            if (iTisch !== hTisch) {
                iTisch = hTisch;
                if (tischAnmelden || STAT.S[i].SCHREIBER.length >= STAT.TURRUNDE) {
                    tClass = "class='ui-disabled'";
                } else {
                    tClass = '';
                }
                $("#lvTische").append("<li data-icon='false'><a " + tClass + " id='Tisch" + iTisch + "' onclick='blertTisch(" + iTisch + ")'>&nbsp;&nbsp;" + iTisch + ".&nbsp&nbsp;Tisch:</a></li>");
            }
            if (STAT.S[i].NR === LS.ME) {
                tClass = " style='font-weight: bold;'";
            } else {
                tClass = '';
            }
            if (CUPS.SWNAME[LS.I] === 'NV') {
                $("#lvTische").append("<li><span" + tClass + ">&nbsp&nbsp&nbsp;" + STAT.S[i].NNAME + " " + STAT.S[i].VNAME + STAT.S[i].STERNE + "</span></li>");
            } else {
                $("#lvTische").append("<li><span" + tClass + ">&nbsp&nbsp&nbsp;" + STAT.S[i].VNAME + " " + STAT.S[i].NNAME + STAT.S[i].STERNE + "</span></li>");
            }
        }

    }

    $("#lvStammSP,#lvTische").listview().listview("refresh");
    setTimeout(function () {
        $('.alle').hide();
        $('.zuletzt').show();
    });

    if (neuerTisch) {
        if (nachTischen) { // Spieler anmelden
            if (STAT.TURRUNDE === 1 && STAT.TURGESPIELT === 0 && CUPS.BEREadmin[LS.I].indexOf(LS.ME) < 0) {
                $('#bTische').addClass('ui-disabled');
            }
        } else {
            if (SORT.length >= 4) {
                //              $('#Stammspieler').collapsible('expand');
            } else {
                //    llll          $('#Stammspieler').addClass('ui-disabled');
                //              $('#SpielerSuchen').collapsible('expand');
                //              scrollToRumpf2();
                if (LS.ME.length > 4 && LS.ME !== 'NOBODY') {
                    $('#I_VNAME').val(LS.ME.substr(0, LS.ME.indexOf(' ')));
                    $('#I_NNAME').val(LS.ME.substr(LS.ME.indexOf(' ') + 1));
                    $('#B_Finden').click();
                }
            }
        }
    }

    $(".STAMMSP").click(function () {
        if (spID) {
            $('#' + spID).removeClass('ui-btn-f');
        }
        spPFX = 'TS';
        spID = $(this)[0].id; // TS3425
        spKEY = spID.substr(2);
        $('#' + spID).addClass('ui-btn-f');
        for (var ii = 0; ii < STAT.S.length; ii++) {
            if (STAT.S[ii].NR === spKEY) {
                spDrag = ii;
                break;
            }
        }
        showEinenTip('#SP1', 'Wo sitzt ' + STAT.S[spDrag].VNAME + STAT.S[spDrag].STERNE + '?');
    });

}

function pcTurnierAnmelden() {
    'use strict';
    var iTisch = 0;
    var hRUNDE = STAT._AKTTURNIER._RUNDE;

    var SPIELERnr = JSON.parse(localStorage.getItem('Abakus.SPIELERnr'));

    for (var spieler in STAT._AKTTURNIER) { // Tisch feststellen
        if (spieler === LS.ME) {
            if (STAT._AKTTURNIER[spieler][hRUNDE] !== '-') {
                if (hRUNDE < 3) {
                    hRUNDE++;
                }
                if (STAT._AKTTURNIER[spieler][hRUNDE] !== '-') {
                    showStatuszeile(false, 'Du hast Runde ' + hRUNDE + ' bereits gespielt.');
                    return;
                }
            }
            iTisch = STAT._AKTTURNIER[spieler][hRUNDE + 6];
            blert(spieler, SPIELERnr[spieler][1], SPIELERnr[spieler][0], SPIELERnr[spieler][2], '');
            break;
        }
    }

    if (iTisch === 0 || iTisch === '-') {
        showStatuszeile(false, 'Du bist nicht angemeldet!<br>&nbsp;Informiere den Veranstalter.');
        return;
    }

    for (var spieler in STAT._AKTTURNIER) { // Mitspieler anmelden
        if (spieler[0] !== '_') {
            if (spieler !== LS.ME) {
                if (STAT._AKTTURNIER[spieler][hRUNDE + 6] === iTisch) {
                    if (STAT._AKTTURNIER[spieler][hRUNDE] !== '-') {
                        showStatuszeile(false, spieler + ' hat Runde ' + hRUNDE + ' bereits gespielt.');
                        return;
                    }
                    blert(spieler, SPIELERnr[spieler][1], SPIELERnr[spieler][0], SPIELERnr[spieler][2], '');
                }
            }
        }
    }

    showStatuszeile(true, 'Runde: <b>' + hRUNDE + '</b>&nbsp;&nbsp;&nbsp;Tisch: <b>' + iTisch + '</b>');

    if (LS.NR[6]) {
        LS.AnzSpieler = 6;
        LS.JeSeite = '';
    } else if (LS.NR[5]) {
        LS.AnzSpieler = 5;
        LS.JeSeite = '';
    } else {
        LS.AnzSpieler = 4;
        LS.JeSeite = '1';
    }
    setTisch(LS.AnzSpieler);

    LS.Vorhand = (Date.now() % (LS.AnzSpieler) + 1);

    onOK();
}

function getINT(pStr, pBlankOK) {
    'use strict';
    var Str = $.trim(pStr);
    var Int = parseInt(Str);
    if (Str === "") {
        if (pBlankOK) {
            return 0;
        } else {
            return false;
        }
    }
    if (isNaN(Str))
        return false;
    if (isNaN(Int))
        return false;
    if (Str.indexOf('-') >= 0 & Int > 0) {
        return (Int * -1);
    }
    return Int;
}

function B_Clear() {
    'use strict';
    scrollToINR();
    $('input[id=I_NR]').val('').css("color", "");
    $('input[id=I_NNAME]').val('').css("color", "");
    $('input[id=I_VNAME]').val('').css("color", "");
    $('input[id=I_ORT]').val('').css("color", "");
    $('#B_NeuerSpieler').addClass('ui-disabled');
    $('#D_NeuerSpieler').hide();
    $("#lvGefunden").empty();
    $(".GEFSP").off("draggable");
    $('#fMeldung').text('Wen willst du finden?');
}

function hideLoading() {
    setTimeout(function () {
        $('#dRumpf').removeClass("ui-disabled");
        $.mobile.loading("hide");
    });
}

function onSubmitFinden(pNeu) {
    'use strict';
    $.mobile.activePage.focus();

    var hNNAME, hVNAME, hORT;

    $('input[id=I_NR]').css("color", "");
    $('input[id=I_NNAME]').css("color", "");
    $('input[id=I_VNAME]').css("color", "");
    $('input[id=I_ORT]').css("color", "");

    var fNR = getINT($("#I_NR").val(), true);
    if (!fNR && fNR !== 0 || fNR > 9999) {
        $('input[id=I_NR]').css("color", "red").focus();
        showEinenTip('#I_NR', 'Bitte eine g&uuml;ltige Spielernummer eingeben.');
        return false;
    } else {
        $('input[id=I_NR]').css("color", "black");
        fNR = "0000" + fNR;
        fNR = fNR.substring((fNR.length - 4));
    }

    $('#dRumpf').addClass("ui-disabled");
    $.mobile.loading("show");

    setTimeout(function () {

        hNNAME = $.trim($('input[id=I_NNAME]').val());
        hNNAME = hNNAME.substr(0, 1).toUpperCase() + hNNAME.substr(1);
        $('input[id=I_NNAME]').val(hNNAME);
        var fNNAME = hNNAME.toUpperCase();

        hVNAME = $.trim($('input[id=I_VNAME]').val());
        hVNAME = hVNAME.substr(0, 1).toUpperCase() + hVNAME.substr(1);
        $('input[id=I_VNAME]').val(hVNAME);
        var fVNAME = hVNAME.toUpperCase();

        hORT = $.trim($('input[id=I_ORT]').val());
        hORT = hORT.substr(0, 1).toUpperCase() + hORT.substr(1);
        $('input[id=I_ORT]').val(hORT);
        var fORT = hORT.toUpperCase();

        $("#lvGefunden").empty();

        var lVNAME = fVNAME.length;
        var lNNAME = fNNAME.length;
        var lORT = fORT.length;

        var nGefunden = 0;
        var hClass = '';

        var lSPIELER = SPIELER.length;
        if (fNR !== "0000" || lVNAME >= 1 || lNNAME >= 1 || lORT >= 1) {

            if (fNR !== "0000") {
                for (var i = 0; i < lSPIELER; i++) {
                    if (fNR === SPIELER[i][spNR]) {
                        if (SPIELER[i][spNR] === LS.NR[1]
                                || SPIELER[i][spNR] === LS.NR[2]
                                || SPIELER[i][spNR] === LS.NR[3]
                                || SPIELER[i][spNR] === LS.NR[4]
                                || SPIELER[i][spNR] === LS.NR[5]
                                || SPIELER[i][spNR] === LS.NR[6]) {
                            hClass = ' cRot';
                        } else {
                            hClass = '';
                        }

                        if (CUPS.TURNIER[LS.I]) {
                            for (var iii = 1; iii < STAT.S.length; iii++) {
                                if (STAT.S[iii].NR === fNR) {
                                    if (STAT.S[iii].SCHREIBER.length >= STAT.TURRUNDE) {
                                        hClass += ' ui-state-disabled';
                                    }
                                    break;
                                }
                            }
                        }
                        $("#lvGefunden").append("<li data-icon='false'><a class='GEFSP" + hClass + "' id='GS" + SPIELER[i][spNR] + "'><span>" + SPIELER[i][spNNAME] + " " + SPIELER[i][spVNAME] + "</span><span class='N'><br>" + SPIELER[i][spORT] + "</span></a></li>");
                        nGefunden++;
                    }
                }
            }

            if (lVNAME >= 1 || lNNAME >= 1 || lORT >= 1) {
                for (var i = 0; i < lSPIELER; i++) {
                    if (SPIELER[i][spNR] === LS.NR[1]
                            || SPIELER[i][spNR] === LS.NR[2]
                            || SPIELER[i][spNR] === LS.NR[3]
                            || SPIELER[i][spNR] === LS.NR[4]
                            || SPIELER[i][spNR] === LS.NR[5]
                            || SPIELER[i][spNR] === LS.NR[6]) {
                        hClass = 'cRot';
                    } else {
                        hClass = '';
                    }
                    if (CUPS.TURNIER[LS.I]) {
                        for (var iii = 1; iii < STAT.S.length; iii++) {
                            if (STAT.S[iii].NR === SPIELER[i][spNR]) {
                                if (STAT.S[iii].SCHREIBER.length >= STAT.TURRUNDE) {
                                    hClass += ' ui-state-disabled';
                                }
                                break;
                            }
                        }
                    }
                    if (pNeu) {
                        if ((lVNAME === 0 || (SPIELER[i][spVNAME].substr(0, lVNAME).toUpperCase() === fVNAME) || (SPIELER[i][spNNAME].substr(0, lVNAME).toUpperCase() === fVNAME))
                                && (lNNAME === 0 || (SPIELER[i][spNNAME].substr(0, lNNAME).toUpperCase() === fNNAME) || (SPIELER[i][spVNAME].substr(0, lNNAME).toUpperCase() === fNNAME))
                                && (lORT === 0 || (SPIELER[i][spORT].substr(0, lORT).toUpperCase() === fORT))) {
                            $("#lvGefunden").append("<li data-icon='false'><a class='GEFSP " + hClass + "' id='GS" + SPIELER[i][spNR] + "'><span>" + SPIELER[i][spNNAME] + " " + SPIELER[i][spVNAME] + "</span><span class='N'><br>" + SPIELER[i][spORT].substr(0, SPIELER[i][spORT].indexOf(',')) + "</span></a></li>");
                            nGefunden++;
                        }
                    } else {
                        if ((lVNAME === 0 || SPIELER[i][spVNAME].substr(0, lVNAME).toUpperCase() === fVNAME)
                                && (lNNAME === 0 || SPIELER[i][spNNAME].substr(0, lNNAME).toUpperCase() === fNNAME)
                                && (lORT === 0 || SPIELER[i][spORT].substr(0, lORT).toUpperCase() === fORT)) {
                            $("#lvGefunden").append("<li data-icon='false'><a class='GEFSP " + hClass + "' id='GS" + SPIELER[i][spNR] + "'><span>" + SPIELER[i][spNNAME] + " " + SPIELER[i][spVNAME] + "</span><span class='N'><br>" + SPIELER[i][spORT].substr(0, SPIELER[i][spORT].indexOf(',')) + "</span></a></li>");
                            nGefunden++;
                        }
                    }
                }
            }

            $('#lvGefunden').listview().listview('refresh');

            $('.nAngemeldet').css('font-size', '24px').css('line-height', '0px');

            $(".GEFSP").click(function () {
                if (spID) {
                    $('#' + spID).removeClass('ui-btn-f');
                }
                spPFX = 'GS';
                spID = $(this)[0].id; // SS3425
                spKEY = spID.substr(2);
                $('#' + spID).addClass('ui-btn-f');
                for (var ii = 0; ii < SPIELER.length; ii++) {
                    if (SPIELER[ii][spNR] === spKEY) {
                        spDrag = ii;
                        break;
                    }
                }
                showEinenTip('#SP1', 'Wo sitzt ' + SPIELER[spDrag][spVNAME] + '?');
            });

            if (nGefunden === 0) {
                $('#fMeldung').html('<b>0 gefunden.</b>');
            } else {
                if (pNeu) {
                    $('#fMeldung').html('<span style="color:red">' + nGefunden + ' gefunden.</span>');
                    hideLoading();
                    return false;
                } else {
                    $('#fMeldung').text(nGefunden + ' gefunden.');
                }
            }
        } else {
            $('#fMeldung').html('Wen willst du finden?');
        }


        if (!nGefunden) {
            scrollToINR();
        } else {
            scrollToFMeldung();
        }

        if (pNeu) {

            showStatuszeile(false, 'Neuen Spieler erstellen:');

            if (hVNAME.length < 3) {
                showEinenTip('#I_VNAME', 'Bitte einen vollst&auml;ndigen <b>Vornamen</b> eingeben.');
                $('input[id=I_VNAME]').css("color", "red").focus();
                hideLoading();
                return false;
            }
            if (!/^[a-zA-Z\-. ÄäÖöÜü]*$/.test(hVNAME)) {
                showEinenTip('#I_VNAME', 'Im <b>Vornamen</b> sind Sonderzeichen und Ziffern nicht erlaubt.');
                $('input[id=I_VNAME]').css("color", "red").focus();
                hideLoading();
                return false;
            }

            if (hNNAME.length < 3) {
                showEinenTip('#I_NNAME', 'Bitte einen vollst&auml;ndigen <b>Nachnamen</b> eingeben.');
                $('input[id=I_NNAME]').css("color", "red").focus();
                hideLoading();
                return false;
            }
            if (!/^[a-zA-Z\-. ÄäÖöÜü]*$/.test(hNNAME)) {
                showEinenTip('#I_NNAME', 'Im <b>Nachnamen</b> sind Sonderzeichen und Ziffern nicht erlaubt.');
                $('input[id=I_NNAME]').css("color", "red").focus();
                hideLoading();
                return false;
            }

            if (hORT.length < 4) {
                showEinenTip('#I_ORT', 'Bitte einen vollst&auml;ndigen <b>Ort</b> eingeben.');
                $('input[id=I_ORT]').css("color", "red").focus();
                hideLoading();
                return false;
            }
            if (!/^[a-zA-Z\-. ÄäÖöÜü,]*$/.test(hORT)) { // Beistrich als Trenner zwischen Ort und Strasse erlaubt.
                showEinenTip('#I_ORT', 'Im <b>Ort</b> sind Sonderzeichen und Ziffern nicht erlaubt.');
                $('input[id=I_ORT]').css("color", "red").focus();
                hideLoading();
                return false;
            }

            if (fNR !== "0000") {
                showEinenTip('#I_NR', 'Die Vergabe einer Spielernummer ist nich m&ouml;glich.');
                $('input[id=I_NR]').css("color", "red").focus();
                hideLoading();
                return false;
            }

            SPIELER[0][spNR] = hNNAME + '_' + hVNAME + '_' + hORT.substr(0, hORT.indexOf(','));
            SPIELER[0][spNR] = SPIELER[0][spNR].replace(/Ä/g, 'Ae').replace(/Ü/g, 'Ue').replace(/Ö/g, 'Oe').replace(/\.|\-/g, ' ');
            SPIELER[0][spNR] = SPIELER[0][spNR].replace(/ä/g, 'ae').replace(/ü/g, 'ue').replace(/ö/g, 'oe').replace(/  /g, ' ').replace(/ /g, 'ˆ');

            SPIELER[0][spNNAME] = hNNAME;
            SPIELER[0][spVNAME] = hVNAME;
            SPIELER[0][spORT] = hORT;
            $("#lvGefunden").append("<li data-icon='false'><a class='GEFSP " + hClass + "' id='GS" + SPIELER[0][spNR] + "'><span>" + SPIELER[0][spNNAME] + " " + SPIELER[0][spVNAME] + "</span><span class='N'><br>" + SPIELER[0][spORT] + "</span></a></li>");

            $('#lvGefunden').listview().listview('refresh');

            $(".GEFSP").click(function () {
                if (spID) {
                    $('#' + spID).removeClass('ui-btn-f');
                }
                spPFX = 'GS';
                spID = $(this)[0].id; // SS3425
                spKEY = spID.substr(2);
                $('#' + spID).addClass('ui-btn-f');
                spDrag = 0;
                showEinenTip('#SP1', 'Wo sitzt ' + SPIELER[spDrag][spVNAME] + '?');
            });

            $('#D_NeuerSpieler').hide();
            showStatuszeile(false, '<b>Spieler/in wurde erstellt!</b>');

        } else {
            if (nGefunden === 0) {
                $('#B_NeuerSpieler').removeClass('ui-disabled');
                $('#D_NeuerSpieler').show();
            } else {
                $('#B_NeuerSpieler').addClass('ui-disabled');
                $('#D_NeuerSpieler').hide();
            }
        }
        hideLoading();
    });
    return false;
}

function blert(pNR, pVNAME, pNNAME, pORT, pSTERNE, pDUMMY, pCLICK) {
    'use strict';

    if (CUPS.TURNIER[LS.I] === 'PC') {
        if (pCLICK) {
            showEineNotiz('An- abmelden ist bei PC-Turnieren nicht m&ouml;glich.');
            return;
        }
    }

    var i = 0;
    do {
        i++;
    } while (LS.NR[i]);

    if (pNR === LS.NR[1]
            || pNR === LS.NR[2]
            || pNR === LS.NR[3]
            || pNR === LS.NR[4]
            || pNR === LS.NR[5]
            || pNR === LS.NR[6]) {
        showEineNotiz('<b>' + pVNAME + '</b> wurde bereits angemeldet.<hr>Nur&nbsp;der&nbsp;zuletzt&nbsp;angemeldete kann&nbsp;abgemeldet&nbsp;werden.');
        return false;
    }
    if (i > 6) {
        i = 6;
        $('#TS' + LS.NR[i]).removeClass('cRot');
    }
    LS.NR    [i] = pNR;
    LS.VName [i] = pVNAME.trim();
    LS.NName [i] = pNNAME.trim();
    LS.Sterne[i] = pSTERNE;
    LS.Ort   [i] = pORT.trim();
    $('#TS' + LS.NR[i]).addClass('cRot');

    $("#SP" + i).html(LS.VName[i].replace(/ /g, '&nbsp;') + '&nbsp;' + LS.NName[i][0] + '.' + LS.Sterne[i]).attr('style', 'color:#dd1111;padding:0;white-space:nowrap');

    if (pCLICK && $("#lvGefunden").is(":visible")) {
        $('input[id=I_NR]').val('').css("color", "");
        $('input[id=I_NNAME]').val('').css("color", "");
        $('input[id=I_VNAME]').val('').css("color", "");
        $('input[id=I_ORT]').val('').css("color", "");
        $('#B_NeuerSpieler').addClass('ui-disabled');
        $('#D_NeuerSpieler').hide();
        $("#lvGefunden").empty();
        $('#fMeldung').html('Wen willst du finden?');
    }
}

function blertTisch(pTisch) {
    'use strict';
    LS.AnzSpieler = 0;
    var i = 1;
    do {
        $('#TS' + LS.NR[i]).removeClass('cRot');
        LS.NR    [i] = '';
        LS.VName [i] = '';
        LS.NName [i] = '';
        LS.Sterne[i] = '';
        LS.Ort   [i] = '';
        i++;
    } while (LS.NR[i]);

    var hTisch = 0;
    for (var j = 0, eoa = SORT.length; j < eoa; j++) {
        hTisch = parseInt(SORT[j]);
        if (hTisch === pTisch) {
            i = parseInt(SORT[j].substring((SORT[j].lastIndexOf(';') + 1)));
            if (STAT.S[i].NR === LS.ME) { // Den Schreiber zuerst anmelden
                blert(STAT.S[i].NR, STAT.S[i].VNAME, STAT.S[i].NNAME, STAT.S[i].ORT, STAT.S[i].STERNE);
                LS.AnzSpieler++;
            }
        }
    }
    for (var j = 0, eoa = SORT.length; j < eoa; j++) {
        hTisch = parseInt(SORT[j]);
        if (hTisch === pTisch) {
            i = parseInt(SORT[j].substring((SORT[j].lastIndexOf(';') + 1)));
            if (STAT.S[i].NR !== LS.ME) { // Den Schreiber nicht mehr anmelden
                blert(STAT.S[i].NR, STAT.S[i].VNAME, STAT.S[i].NNAME, STAT.S[i].ORT, STAT.S[i].STERNE);
                LS.AnzSpieler++;
            }
        }
    }
    setTisch(LS.AnzSpieler);
}

$(document).ready(function () {
// 'use strict';

    LS = JSON.parse(localStorage.getItem('Abakus.LS'));
    CUPS = JSON.parse(localStorage.getItem('Abakus.CUPS'));
    SPIELER = JSON.parse(localStorage.getItem('Abakus.SPIELERalpha'));

    if (LS.ME !== "3425" && LS.ME !== "NOBODY") {
        document.oncontextmenu = function () {
            return false; // oncontextmenu
        };
    }
    document.onselectstart = function () {
        return false;
    };

    if (navigator.platform.match(/(Win|Mac|Linux)/i)) {
        PC = true;
    } else {
        PC = false;
    }

    myJTip = new jBox('Tooltip', {
        theme: 'TooltipError',
        delayClose: 20,
        closeOnClick: true,
        closeOnEsc: true,
        position: {
            x: 'center',
            y: 'bottom'
        }
    });

    if (LS.ME === '3425') {
        showStatuszeile(true, 'ZmA!');
    } else {
        showStatuszeile(true, 'Gute Karten!');
    }

    if (LS.LoadCups >= 0) { // < 0 ist Kennung für neuen Tisch

        neuerTisch = false;

        STAT = JSON.parse(localStorage.getItem("Abakus.STAT" + ("000" + LS.I).substr(-3)));
        if (CUPS.TYP[LS.I] !== 'CUP' && CUPS.TYP[LS.I] !== 'MT') {
            SPIELERerweitern();
        }

        DS = JSON.parse(localStorage.getItem('Abakus.DS'));
        if (CUPS.TURNIER[LS.I]) {
            showStatuszeile(true, '<b>' + CUPS.NAME[LS.I] + ':</b>&nbsp;&nbsp;&nbsp;Runde: <b>' + STAT.TURRUNDE + '</b>');
        }

        LS.Spieltyp = CUPS.TYP[LS.I];
        LS.SpieleJeRunde = CUPS.SPJERUNDE[LS.I];
        if (LS.SpieleJeRunde && LS.AnzSpieler > 4) {
            LS.SpieleJeRunde = (CUPS.SPJERUNDE[LS.I] / 4) * LS.AnzSpieler;
        }

        for (var ii = 0; ii <= LS.AnzSpieler; ii++) {
            $("#SP" + ii).html(LS.VName[ii].replace(/ /g, '&nbsp;') + '&nbsp' + LS.NName[ii][0] + '.' + LS.Sterne[ii]).attr('style', 'color:#dd1111;padding:0;white-space:nowrap;');
        }

        listStammspieler();
        if (LS.AnzSpieler === 4) {
            if (LS.JeSeite !== '2') {
                LS.JeSeite = '2';
            } else {
                LS.JeSeite = '1';
            }
        }
        setTisch(LS.AnzSpieler);

    } else {

        neuerTisch = true;

        STAT = JSON.parse(localStorage.getItem("Abakus.STAT" + ("000" + (LS.LoadCups * -1)).substr(-3)));

        var LS_ME = LS.ME;
        var LS_MEname = LS.MEname;
        var LS_Schreibzettel = LS.Schreibzettel;
        var LS_AnzSpalten = LS.AnzSpalten;
        var LS_Ansagen = LS.Ansagen;
        var LS_I = LS.LoadCups * -1; // - ist Kennung für neuen Tisch
        var LS_SchriftG = LS.SchriftG;
        var LS_Padding = LS.Padding;
        var LS_Freunde = LS.Freunde;
        var LS_Font = LS.Font;
        var LS_Version = LS.Version;
        var LS_tempVIPs = LS.tempVIPs;

        LS.LoadCups = 0;

        LS = new Object();
        LS.ME = LS_ME;
        LS.MEname = LS_MEname;
        LS.Schreibzettel = LS_Schreibzettel;
        LS.AnzSpalten = LS_AnzSpalten;
        LS.Ansagen = LS_Ansagen;
        LS.I = LS_I;
        LS.ShowCups = LS_I;
        LS.SchriftG = LS_SchriftG;
        LS.Padding = LS_Padding;
        LS.Freunde = LS_Freunde;
        LS.Font = LS_Font;
        LS.Version = LS_Version;
        LS.tempVIPs = LS_tempVIPs;

        if (CUPS.TYP[LS.I] !== 'CUP' && CUPS.TYP[LS.I] !== 'MT') {
            SPIELERerweitern();
        }

        if (CUPS.TURNIER[LS.I]) {
            if (CUPS.TYP[LS.I] === 'CUP') {
                LS.TURCODE = 111;
                LS.TURADMIN = '3425';
                LS.TURRUNDE = STAT._AKTTURNIER._RUNDE;
                LS.TURSPIELER = 999;
                LS.TURGESPIELT = 999;
                LS.AktRunde = STAT._AKTTURNIER._RUNDE; // Bei einen Storno die zu stornierende Runde
            } else {
                LS.TURCODE = STAT.TURCODE;
                LS.TURADMIN = STAT.TURADMIN;
                LS.TURRUNDE = STAT.TURRUNDE;
                LS.TURSPIELER = STAT.TURSPIELER;
                LS.TURGESPIELT = STAT.TURGESPIELT;
                LS.AktRunde = STAT.TURRUNDE; // Bei einen Storno die zu stornierende Runde
            }
        }
        LS.CupName = CUPS.NAME[LS.I];
        LS.Regeln = CUPS.REGELN[LS.I];
        LS.Spieltyp = CUPS.TYP[LS.I];
        LS.SpieleJeRunde = CUPS.SPJERUNDE[LS.I];
        if (CUPS.DOPPELTERUNDEN[LS.I]) {
            LS.DoppelteRunden = true;
        } else {
            LS.DoppelteRunden = false;
        }
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
        LS.Meldung = '';
        LS.Ansage = 'Vivat Valatt!';
        LS.LoadCups = 0;

        DS = new Object();
        DS.GameI = [0];
        DS.Game = [''];
        DS.Spieler = [''];
        DS.Partner = [''];
        DS.Punkte = [[0], [0], [0], [0], [0], [0], [0]];
        DS.Korr = [false];
        DS.Storno = [false];

        $('#bOK').addClass('ui-disabled');
        if (CUPS.TURNIER[LS.I]) {
            showStatuszeile(true, '<b>' + CUPS.NAME[LS.I] + ':</b>&nbsp;&nbsp;&nbsp;Runde: <b>' + STAT.TURRUNDE + '</b>');
        }

        if (CUPS.TURNIER[LS.I]) {
            if (LS.TURADMIN === LS.ME || true) {
                if (CUPS.TURNIER[LS.I] === "PC") {
                    $('#dRumpf').hide();
                    showStatuszeile(true, '<b>Tische f&uuml;r PC-Turniere werden in funcTisch angemeldet.</b>');
                    // pcTurnierAnmelden();
                } else {
                    listStammspieler();
                    $('#nbSelAll').show();
                    if (LS.AnzSpieler) {
                        setTisch(LS.AnzSpieler);
                    } else {
                        writeCanvas('Ein neuer Tisch');
                    }
                }
            } else {
                $('#dRumpf').hide();
                writeCanvas('Runde ' + LS.TURRUNDE + ':');
                $('#fCode').show();
                $('#nbSelAll,#nbSelRed').hide();
                $('#ptCode').focus();
            }
        } else {
            $('#nbSelRed').show();
            writeCanvas('Neuer Tisch');
            listStammspieler();
        }

        if (CUPS.TURNIER[LS.I]) {
            if (LS.TURADMIN === LS.ME) {
                $('#dRunden').show();
                if (STAT.TURRUNDE === 1) {
                    $('#bRunde1').addClass('ui-btn-active');
                    $('#bRunde2,#bRunde3').addClass('ui-disabled');
                } else if (STAT.TURRUNDE === 2) {
                    $('#bRunde2').addClass('ui-btn-active');
                    $('#bRunde3').addClass('ui-disabled');
                } else if (STAT.TURRUNDE === 3) {
                    $('#bRunde3').addClass('ui-btn-active');
                }
            }
        }
    }

    tStatus = CUPS.NAME[LS.I] + ':';

    if (CUPS.TURNIER[LS.I]) {
        $('#nbSelAll').show();
    } else {
        $('#nbSelRed').show();
    }

    $('#dHeaderEquivalent').height($("#header").height() - $('#dRumpf').offset().top + 12);
    if (neuerTisch) {
        if (LS.AnzSpieler === 0) {
            showEinenTip('#b5er', '4er, 5er oder 6er-Tisch?');
        } else {
            showEinenTip('#dCanvas', '&nbsp;Wer hat die Vorhand?&nbsp;');
        }
    }

    $("#I_NR,#I_VNAME,#I_NNAME,#I_ORT").focusin(function () {
        if (!PC) { // PhoneGap cli 6.3.0 schiebt den Footer vor die virtuelle Tastatur
            $('#Footer').hide();
        }
    });

    $("#I_NR,#I_VNAME,#I_NNAME,#I_ORT").focusout(function () {
        if (!PC) {
            setTimeout(function () {
                if (!$('#I_NR').is(':focus')
                        && !$('#I_VNAME').is(':focus')
                        && !$('#I_NNAME').is(':focus')
                        && !$('#I_ORT').is(':focus')) {
                    $('#Footer').show();
                }
            });
        }
    });

    window.onerror = function (pMsg, pUrl, pLine, pCol, pError) {
        if (!navigator.platform.match(/(Win|Mac)/i)
                && typeof pMsg === 'object'        // '[object Event]'
                && typeof pUrl === 'undefined'
                && typeof pLine === 'undefined'
                && typeof pCol === 'undefined'
                && typeof pError === 'undefined') {  // Timeserver am Handy nicht verfügbar.
            return false;                     // Fehler wird ingnoriert.
        }
        var msg = 'JS:';
        if (pMsg) {
            msg += ', msg: ' + pMsg;
        }
        if (pUrl) {
            msg += ', url: ' + pUrl;
        }
        if (pLine) {
            msg += ', line: ' + pLine;
        }
        if (pCol) {
            msg += ', col: ' + pCol;
        }
        if (pError) {
            msg += ', error: ' + pError;
        }
        msg += '.';
        msg[3] = ' ';
        console.log(msg);

        if (pUrl !== '' || pLine !== 0) {
            alert(msg);
        }
        return false;
    };
    $("#I_NR,#I_NNAME,#I_VNAME,#I_ORT").focusin(function () {
        scrollToINR();
    });
});

window.onbeforeunload = function (e) {
    $('.onExit').addClass('ui-disabled');
};