
/* global DS, LS, canvas, ctx, responsiveVoice, NEXT */

var PC = false;

var LS = new Object();
var DS = new Object();

var sI = 0;
var pI = 0;
var Seite = '';
var sBasis = 0;
var soloFaktor = 1;
var hWait = 500;

var aktSpiel = 0;
var aktSpielWert = 0;
var aktPunkte = 0;
var kontra = 1;

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
const pPagat = 18;
const pUhu = 19;
const pKakadu = 20;
const pQuapil = 21;
const pV = 22;
const pTrull = 23;
const p4Koenige = 24;
const pUltimo = 25;
const pValat = 26;
const pAbsolut = 27;
const pXY = 28;

var myJBox = null;
var myJTip = null;
var jbSelberrufer = null;

var eigGewonnen = []; // für Chart
var eigVerloren = [];
var prozGespielt = [];
var prozGewonnen = [];

var iDiversesSpiel = 18;

var stAnzSpalten = 1; // für statGauge

var SORT = null;

function Activate(button) {
    'use strict';
    if (LS.Timeout) {
        setTimeout(function () {
            $(button).removeClass('ui-btn-active').addClass('ui-btn-active');
        }, LS.Timeout);
    } else {
        setTimeout(function () {
            $(button).removeClass('ui-btn-active').addClass('ui-btn-active');
        }, 100);
    }
}

function Deactivate(button) {
    'use strict';
    if (LS.Timeout) {
        setTimeout(function () {
            $(button).removeClass('ui-btn-active');
        }, LS.Timeout);
    } else {
        setTimeout(function () {
            $(button).removeClass('ui-btn-active');
        }, 100);
    }
    if (myJTip) {
        myJTip.close();
    }
}

function QUERFORMAT() {
    if ($(window).innerWidth() > $(window).innerHeight()) {
        return true;
    } else {
        return false;
    }
}

function initGames() {

    if (LS.Tarif20T) {
        $('#P8,#F2').text(LS.Tarif20T);
    } else {
        $('.cTARIF20').remove();
    }
    if (LS.Tarif21T) {
        $('#P9,#F3').text(LS.Tarif21T);
        $('.cNoTARIF21').remove();
    } else {
        $('.cTARIF21').remove();
    }

    $('#d1').text(LS.Tarif[1]);

    if (LS.Regeln !== 'Ti.') {
        $('.cTIROL').remove();
    } else {
        $('.cNoTIROL').remove();
        $('#P6,#F1').text('4 Könige');
    }
    if (LS.I !== 37) {  // Eggenberger Runde
        $('#d1_2').text(LS.Tarif[1] * 2);
        $('.cEGGBE').remove();
    } else {
        $('#d1_2').text(3);
        $('.cNoEGGBE').remove();
    }
    if (LS.I === 23) {  // Cafe Rathaus
        $('#P8').text('Taro.');
        $('#F1').text('Trull');
    }

    $('#d8').text(LS.Tarif[8]);
    $('#d9').text(LS.Tarif[9]);
    $('#d9_1').text(LS.Tarif[9] + 1);
    $('#d10').text(LS.Tarif[10]);

    $('#d11').text(LS.Tarif[11]);
    $('#d11_1').text(LS.Tarif[11] + 1);
    $('#d12').text(LS.Tarif[12]);

    $('#d13').text(LS.Tarif[13]);
    $('#d14').text(LS.Tarif[14]);
    $('#d15').text(LS.Tarif[15]);
    $('#d15_4').text(LS.Tarif[15] + 4);
    $('#d16_2').text(LS.Tarif[16] - 2);
    $('#d16').text(LS.Tarif[16]);
    $('#d17_2').text(LS.Tarif[17] - 2);
    $('#d17_11').text(LS.Tarif[17] - 11);
    $('#d17').text(LS.Tarif[17]);

    if (!LS.Tarif[pPagat]) {
        $('#P1,#P1e').remove();
    }
    if (!LS.Tarif[pUhu]) {
        $('#P2,#P2e').remove();
    }
    if (!LS.Tarif[pKakadu]) {
        $('#P3,#P3e').remove();
    }
    if (!LS.Tarif[pQuapil]) {
        $('#P4,#P4e').remove();
    }
    if (!LS.Tarif[pTrull]) {
        $('#P5,#P5e').remove();
    }
    if (!LS.Tarif[p4Koenige]) {
        $('#P6,#P6e').remove();
    }
    if (!LS.Tarif[pUltimo]) {
        $('#P7,#P7e').remove();
    }
    if (!LS.Tarif[pAbsolut]) {
        $('#P8,#P8e').remove();
    }
    if (!LS.Tarif[pXY]) {
        $('#P9,#P9e').remove();
    }
    if (!LS.Tarif[p4Koenige]) {
        $('#F1,#F1e').remove();
    }
    if (!LS.Tarif[pAbsolut]) {
        $('#F2,#F2e').remove();
    }
    if (!LS.Tarif[pXY]) {
        $('#F3,#F3e').remove();
    }
    $('.cPS,.cFS,.cNS').removeClass('ui-corner-all');
}

function setGame(pName, pGame, pPlus) {
    if (pGame === 13) { // Trischaken
        pName += ' *';
        if (LS.Regeln === 'Ti.' && pI) {
            $('#tTrischaken').html('*\) Beim Trischaken müssen anstatt<br>des Spielers die Verlierer<br>ausgewählt werden.');
        } else {
            $('#tTrischaken').html('*\) Beim Trischaken muss anstatt<br>des Spielers der Verlierer<br>ausgewählt werden.<br>'
                    + 'Gibt es zwei punktegleiche Verlierer,<br>müssen beide markiert werden.');
        }
    } else {
        $('#tTrischaken').html('');
    }
    if (pGame) { // nicht bei Kontra
        aktSpiel = parseInt(pGame);
        aktSpielWert = LS.Tarif[aktSpiel];
        $('#nbSpiel').show();
        if (pPlus) {
            aktSpielWert += pPlus;
        }
        if (pGame === 2 && LS.I === 37) {
            aktSpielWert--; // in der Eggenberger Runde zählt der Solorufer 3 Punkte...
        }

        if (pGame === iTrischaker) {
            $('#Nx2,#Nx4').show();
        } else {
            $('#Nx2,#Nx4').hide();
        }
    }

    var hSpielWert = aktSpielWert * kontra;
    kontra = 1;
    var tValat = '';
    if (Seite === 'PS') {
        tValat = $('#PValate').text();
    }
    if (Seite === 'PS') {
        tValat = $('#PValate').text();
    }
    if (tValat) {
        if (tValat === 'x 4') {
            hSpielWert *= 4;
        } else if (tValat === 'x 8') {
            hSpielWert *= 8;
        } else if (tValat === 'x 16') {
            hSpielWert *= 16;
        } else if (tValat === 'x 32') {
            hSpielWert *= 32;
        } else if (tValat === 'x 64') {
            hSpielWert *= 64;
        }
    }
    if ($('#gWert').text().substr(0, 1) === '-' || aktSpiel === iTrischaker) {
        hSpielWert *= -1;
        if (aktSpiel === i6er) {
            hSpielWert *= 2;
        }
        $('#gWert').text(hSpielWert).removeClass('ui-disabled').css("color", "red").show();
    } else {
        $('#gWert').text(hSpielWert).removeClass('ui-disabled').css("color", "black").show();
    }

    if (aktSpiel === iSolorufer || aktSpiel === iSolo3er || aktSpiel === iFarbensolo) {
        SetPraemienSolo(true);
    } else {
        SetPraemienSolo(false);
    }

    $('#gName').addClass('ui-btn').css('font-weight', 'bold').css('color', 'white').buttonMarkup({theme: 'c'}).text(pName);

    $('#nbSpiele').hide();
    $('#nbWerte').show();

    $('#ss1,#ss2,#ss3,#ss4,#ss5,#ss6').removeClass('ui-disabled');

    if (pGame === i6er) { // nicht bei Kontra
        ResetSpieler(sI);
        sI = 0;
        $('#ss' + LS.Vorhand).click();
    }
    Summieren();
}

function showSpiele() {
    Deactivate('#gName');
    if (kontra === 1) {
        $('#nbSpiel,#gWert,#nbWerte').hide();
        $('#nbSpiele').show();
    } else {
        setGame();
        $('#gName').buttonMarkup({theme: 'b'});
        if (LS.Tarif21T && $("#PS").is(":visible")) {
            $('.cKontra').buttonMarkup({theme: 'a'}).text('Kont.');
        } else {
            $('.cKontra').buttonMarkup({theme: 'a'}).text('Kontra');
        }
    }
}

function setKontra(pKontra) {
    Deactivate('.cKontra');
    if (kontra === 8 || pKontra === 0) {
        kontra = 1;
        if (LS.Tarif21T && $("#PS").is(":visible")) {
            $('.cKontra').buttonMarkup({theme: 'a'}).text('Kont.');
        } else {
            $('.cKontra').buttonMarkup({theme: 'a'}).text('Kontra');
        }
    } else if (kontra === 1) {
        kontra = 2;
        if (LS.Tarif21T && $("#PS").is(":visible")) {
            $('.cKontra').buttonMarkup({theme: 'b'}).text('Kont.');
        } else {
            $('.cKontra').buttonMarkup({theme: 'b'}).text('Kontra');
        }
    } else if (kontra === 2) {
        kontra = 4;
        if (LS.Tarif21T && $("#PS").is(":visible")) {
            $('.cKontra').buttonMarkup({theme: 'b'}).text('Re');
        } else {
            $('.cKontra').buttonMarkup({theme: 'b'}).text('Retour');
        }
    } else if (kontra === 4) {
        kontra = 8;
        $('.cKontra').buttonMarkup({theme: 'b'}).text('Sub');
    }
}

function showCanvas(pShow) {
    'use strict';
    if (pShow === 'Tarife') {
        Deactivate("#nbHelp,#nbGR");
        Activate('#nbTarife');

        $('#bChart').hide();
        $('#dHelp').show().attr("style", "height:" + ($(window).innerHeight() - ($('#NB').height() * 2)) + "px;overflow:auto;overflow-x:hidden;");
        $("#tHelp tr").remove();
        $('#tHelp').append('<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>Spiele</td><td class="TC">Punkte</td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td></tr>');

        if (LS.Regeln === 'Ti.') {
            $('#tHelp').append('<tr><td></td><td class="N">Rufer</td><td class="TC N">1</td><td></td></tr>');
            $('#tHelp').append('<tr><td></td><td class="N">Trischaken</td><td class="TC N">2</td><td></td></tr>');
            $('#tHelp').append('<tr><td></td><td class="N">Piccolo</td><td class="TC N">2</td><td></td></tr>');
            $('#tHelp').append('<tr><td></td><td class="N">Solorufer</td><td class="TC N">2</td><td></td></tr>');
            $('#tHelp').append('<tr><td></td><td class="N">Besserrufer</td><td class="TC N">1</td><td></td></tr>');
            $('#tHelp').append('<tr><td></td><td class="N">Bettler</td><td class="TC N">4</td><td></td></tr>');
            $('#tHelp').append('<tr><td></td><td class="N">Sechserdreier</td><td class="TC N">4</td><td></td></tr>');
            $('#tHelp').append('<tr><td></td><td class="N">Farbendreier</td><td class="TC N">5</td><td></td></tr>');
            $('#tHelp').append('<tr><td></td><td class="N">Dreier</td><td class="TC N">5</td><td></td></tr>');
            $('#tHelp').append('<tr><td></td><td class="N">Piccolo semi-ouvert</td><td class="TC N">6</td><td></td></tr>');
            $('#tHelp').append('<tr><td></td><td class="N">Bettel semi-ouvert</td><td class="TC N">6</td><td></td></tr>');
            $('#tHelp').append('<tr><td></td><td class="N">Farbeneiner</td><td class="TC N">6</td><td></td></tr>');
            $('#tHelp').append('<tr><td></td><td class="N">Einer</td><td class="TC N">6</td><td></td></tr>');
            $('#tHelp').append('<tr><td></td><td class="N">Groß-/Solobesser</td><td class="TC N">1/2</td><td></td></tr>');
            $('#tHelp').append('<tr><td></td><td class="N">Triccolo ouvert</td><td class="TC N">8</td><td></td></tr>');
            $('#tHelp').append('<tr><td></td><td class="N">Zwiccolo ouvert</td><td class="TC N">8</td><td></td></tr>');
            $('#tHelp').append('<tr><td></td><td class="N">Piccolo ouvert</td><td class="TC N">8</td><td></td></tr>');
            $('#tHelp').append('<tr><td></td><td class="N">Bettel ouvert</td><td class="TC N">8</td><td></td></tr>');
            $('#tHelp').append('<tr><td></td><td class="N">Farbensolo</td><td class="TC N">10</td><td></td></tr>');
            $('#tHelp').append('<tr><td></td><td class="N">Farbendreier</td><td class="TC N">10</td><td></td></tr>');
            return;
        }

        SORT = [];
        sortTarifZeile('pa1', 'Rufer', iRufer);
        if (LS.I === 37) {                     // Eggenberger Runde
            sortTarifZeile('pa1', 'Solorufer', iRufer, iRufer, -1);
        } else {
            sortTarifZeile('pa1', 'Solorufer', iRufer, iRufer);
        }
        sortTarifZeile('zt1', 'Sechser', i6er);
        sortTarifZeile('zt1', 'Dreier', i3er);
        sortTarifZeile('zt1', 'Solodreier', iSolo3er);
        sortTarifZeile('zf1', 'Farbendreier', iFarben3er);
        sortTarifZeile('zf1', 'Farbensolo', iFarbensolo);
        sortTarifZeile('na1', 'Trischaken', iTrischaker);
        sortTarifZeile('ne2', 'Bettler', iBettler);
        sortTarifZeile('ne3', 'Bettler ouvert', iBettlerOvert);
        if (LS.Regeln === 'Wr.') {
            sortTarifZeile('pa1', 'Pagatrufer (I)', iRufer, pPagat, pPagat);
            sortTarifZeile('pa1', 'Uhurufer (II)', iRufer, pUhu, pUhu);
        } else {
            sortTarifZeile('pa1', 'Besserrufer', iRufer, pPagat, pPagat);
        }
        if (LS.Regeln === 'Ooe.' || LS.Regeln === 'Ti.' || LS.I === 23) { // Cafe Rathaus
            sortTarifZeile('ne1', 'Piccolo', iPiZwiccolo);
            if (LS.I === 23) {                     // Cafe Rathaus
                sortTarifZeile('zz1', 'Piccolo ouvert', iPiZwiccoloOvert);
            } else {
                sortTarifZeile('ne2', 'Piccolo ouvert', iPiZwiccoloOvert);
                if (LS.Regeln === 'Ti.') {
                    sortTarifZeile('ne1', 'Zwiccolo ouvert', iPiZwiccoloOvert);
                }
            }
        } else {
            sortTarifZeile('ne1', 'Pi./Zwiccolo', iPiZwiccolo);
            if (LS.I === 37) {                     // Eggenberger Runde
                sortTarifZeile('zz1', 'Piccolo ouvert', iPiZwiccoloOvert);
                sortTarifZeile('ne3', 'Bettelplauderer', iBettlerOvert, -11);
            } else {
                sortTarifZeile('ne1', 'Pi./Zwiccolo ouvert', iPiZwiccoloOvert);
            }
        }
        if (LS.Regeln === 'Wr.' && LS.I !== 23) { // Cafe Rathaus
            sortTarifZeile('pa1', 'Kakadurufer (III)', iRufer, pKakadu, pKakadu);
            sortTarifZeile('pa1', 'Quapilrufer (IIII)', iRufer, pQuapil, pQuapil);
        }
        SORT.sort();
        for (var ii = 0; ii < SORT.length; ii++) {
            $('#tHelp').append('<tr><td></td><td class="N">' + SORT[ii].substr(8) + '</td><td class="TR N">' + (SORT[ii].substr(8) === 'Besserrufer' ? LS.Tarif[iRufer] : parseInt(SORT[ii].substr(0, 4))) + '</td><td></td></tr>');
        }

    } else if (pShow === 'Hilfe') {
        Deactivate("#nbTarife,#nbGR");
        Activate('#nbHelp');

        $('#bChart').hide();
        $('#dHelp').show().attr("style", "height:" + ($(window).innerHeight() - ($('#NB').height() * 2)) + "px;overflow:auto;overflow-x:hidden;");
        $("#tHelp tr").remove();


        $('#tHelp').append('<tr><td></td><th colspan="3" class="S2">&nbsp;&nbsp;Symbole oben:</th></tr>');
        if (LS.AnzSpieler === 4) {
            printCanvas('f366', null, 'zurück, Tisch speichern,', '5. Spieler anmelden, etc.');
        } else if (LS.AnzSpieler === 5) {
            printCanvas('f366', null, 'zurück, Tisch speichern,', '6. Spieler anmelden, etc.');
        } else {
            printCanvas('f366', null, 'zurück, Tisch speichern,', 'et cetera');
        }
        printCanvas(null, null, 'Tarife');
        printCanvas(null, null, 'Punkte (nicht) ansagen');
        printCanvas('zmdi-settings', null, 'Einstellungen,', 'die Vorhand ändern, etc.');
        printCanvas('zmdi-help', null, 'diese Zeichenerklärung');
        printCanvas('iEraser', null, 'ein Spiel korrigieren,', 'das letzte Spiel löschen');


        $('#tHelp').append('<tr><td></td><th colspan="3" class="S2">&nbsp;&nbsp;Symbole Tischmitte:</th></tr>');
        printCanvas('2447', null, 'Geber'); // Anstatt des Sterns (002a)
        printCanvas('2587', null, 'Vorhand');
        if (LS.AnzSpieler > 1) {
            printCanvas('2587', '2587', 'Spieler setzt aus, pausiert');
        }
        printCanvas('Gewinn', null, 'Gewinn des Spielers');


        $('#tHelp').append('<tr><td></td><th colspan="3" class="S2">&nbsp;&nbsp;Symbole unten:</th></tr>');
        printCanvas('zmdi-equalizer', null, 'Statistik');
        printCanvas('zmdi-edit', null, 'ein Spiel manuell eingeben');
        printCanvas('zmdi-plus', null, 'ein Positivspiel eingeben');
        printCanvas('zmdi-invert-colors', null, 'ein Farbenspiel eingeben');
        printCanvas('zmdi-minus', null, 'ein Negativspiel eingeben');
        printCanvas('zmdi-gamepad', null, 'Tischgrafik');

    } else {
        Deactivate("#nbTarife,#nbHelp");
        changeDisp();
    }
}

function printCanvas(pUnicode, pUnicode2, pText, pText2) {
    'use strict';
    var html = '';
    if (pUnicode2) {
        if (pUnicode2 === '2587') { // Spieler setzt aus
            html = '<td class="TC"><span style="color: #bbb">&#x' + pUnicode + ';</span> <span style="color: #888"></span>&#x' + pUnicode2 + ';</span></td>';
        } else if (pUnicode2 === 'f14b') { // Doppelte Spiele
            html = '<td class="TC">&#x' + pUnicode + ';<span style="color: #d11">&#x' + pUnicode2 + ';</span></td>';
        }
    } else {
        if (pUnicode === '2587') { // Vorhand
            html = '<td class="TC"><span style="color: #efdf99">&#x' + pUnicode + ';</span></td>';
        } else if (pUnicode === 'f366') { // Mein Tisch
            html = '<td class="TC"><img src="../Icons/MeinTisch.png" alt="Mein Tisch" style="height: 30px; width: 30px;"></td>';
        } else if (pUnicode === 'iEraser') { // Radiergummi
            html = '<td class="TC"><img src="../Icons/icon-eraser.png" alt="Mein Tisch" style="height: 30px; width: 30px;"></td>';
        } else if (pUnicode === '2447') { // Geber
            html = '<td class="TC">&#x' + pUnicode + ';</td>';
        } else if (pUnicode === 'Gewinn') { // Gewinn des Spielers
            html = '<td class="TC">15</td>';
        } else if (pText === 'Tarife') { // Gewinn des Spielers
            if (LS.DoppelteRunden || LS.doppelt) {
                if (LS.doppelt) {
                    if (LS.doppelt < 10) {
                        pText = LS.doppelt + ' doppelte Spiele, Tarife';
                        html = '<td class="TC"><i class="i zmdi-collection-item-' + LS.doppelt + ' cRot"></i> <i class="i zmdi-collection-text"></i></td>';
                    } else {
                        pText = LS.doppelt + '9+ doppelte Spiele, Tarife';
                        html = '<td class="TC"><i class="i zmdi-collection-item-99 cRot"></i> <i class="i zmdi-collection-text"></i></td>';
                    }
                } else {
                    html = '<td class="TC"><i class="i zmdi-collection-text"></i></td>';
                }
            } else {
                html = '<td class="TC"><i class="i zmdi-collection-text"></td>';
            }
        } else if (pText === 'Punkte (nicht) ansagen') { // Gewinn des Spielers
            html = '<td class="TC"><i class="i zmdi-volume-up"> <i class="i zmdi-volume-off"></td>';
        } else {
            html = '<td class="TC"><i class="i ' + pUnicode + '"></td>';
        }
    }
    html += '<td colspan="2" class="N">' + pText + (pText2 ? '<br>' + pText2 : '') + '</td>';
    $('#tHelp').append('<tr><td></td>' + html + '</tr>');
}

function sortTarifZeile(pTyp, pSpiel, pTarif1, pTarif2, pTarif3) {
    'use strict';
    var hTarif = LS.Tarif[pTarif1];
    if (LS.I === 37 && pSpiel === iSolorufer) {
        hTarif = 3; // In der Eggenberger Runde zählt der Solorufer 3 Punkte
    }
    if (pTarif2) {
        if (pTarif2 < 0) {
            hTarif += pTarif2;
        } else {
            hTarif += LS.Tarif[pTarif2];
        }
    }
    if (pTarif3) {
        if (pTarif3 < 0) {
            hTarif += pTarif3;
        } else {
            hTarif += LS.Tarif[pTarif3];
        }
    }
    if (hTarif) {
        if (hTarif < 10) {
            SORT[SORT.length] = '  ' + hTarif + ';' + pTyp + ';' + pSpiel;
        } else {
            SORT[SORT.length] = ' ' + hTarif + ';' + pTyp + ';' + pSpiel;
        }
    }
}

function selberruferSpeichern() {
    pI = sI;
    jbSelberrufer.close();
    $('#bEnter').click();
}

function setEnter() {
    var tSpieler, tZwi, tPunkte, lHtml, tHtml;

    if (sI) {
        tSpieler = LS.Spieler[sI];
    } else {
        tSpieler = '?';
    }
    if (aktSpiel) {
        tPunkte = aktPunkte;
    } else {
        tPunkte = '?';
    }
    lHtml = tSpieler.length + (('' + aktPunkte).length);
    if (lHtml > 11) {
        tSpieler = tSpieler.substr(0, (10 - ('' + aktPunkte).length));
        tZwi = '.&nbsp;';
    } else {
        tZwi = '&nbsp;';
        for (var ii = 0; ii < 12 - lHtml; ii++) {
            tZwi += '&nbsp;';
        }
    }
    if (aktSpiel && aktPunkte < 0) {
        tHtml = tSpieler + tZwi + '<span style="color:red">' + tPunkte + '</span>';
    } else {
        tHtml = tSpieler + tZwi + tPunkte;
    }

    if (sI && aktSpiel) {
        $('#bEnter').html(tHtml).removeClass('ui-disabled');
    } else {
        $('#bEnter').html(tHtml).removeClass('ui-disabled').addClass('ui-disabled');
    }
}

function AnsagenAendern() {
    'use strict';
    LS.Ansagen = !LS.Ansagen;
    if (LS.Ansagen) {
        $('#iAudio').removeClass('zmdi-volume-off zmdi-volume-up');
        $('#iAudio').addClass('zmdi-volume-up');
        if (navigator.vendor.indexOf("Apple") < 0) {
            responsiveVoice.speak(LS.Ansage, 'Deutsch Female');
        } else if ('speechSynthesis' in window) {
            var hAnsage = new SpeechSynthesisUtterance(LS.Ansage);
            hAnsage.lang = "de-DE";
            window.speechSynthesis.speak(hAnsage);
        }
    } else {
        $('#iAudio').removeClass('zmdi-volume-off zmdi-volume-up');
        $('#iAudio').addClass('zmdi-volume-off');
    }
    localStorage.setItem('Abakus.LS', JSON.stringify(LS));
    Deactivate('#nbAudio');
}

function ResetSpieler(btn) {
    if (!isNaN(btn)) {
        btn = '#ss' + btn;
    }
    var iBtn = parseInt(btn.substring(btn.length - 1));
    if (btn !== '#ss0') {
        if (iBtn === LS.Vorhand) {
            $(btn).buttonMarkup({theme: 'f'});
        } else if (iBtn === LS.INA1 || iBtn === LS.INA2) {
            $(btn).buttonMarkup({theme: 'd'});
        } else {
            $(btn).buttonMarkup({theme: 'a'});
        }
    }
    if (pI !== 0 && false) { // llll
        sI = pI;
        pI = 0;
//        ResetSpieler(sI);
//        Set(sI);
        setEnter();
    }
}

function setFont() {
    'use strict';
    $('#nbMeinTisch,#nbTarife,#nbAudio,#nbOptions,#nbHelp,#nbKorr').removeClass('ui-corner-all');
    $('#nbLI,#nbED,#nbPS,#nbFS,#nbNS,#nbGR').removeClass('ui-corner-all');
    if (LS.ME === '3312') { // Christian Faltl
        $('.ui-btn').attr('style', 'padding: 0 0 !important;');
    }
}

function Set(btn) {
    if (!isNaN(btn)) {
        btn = '#ss' + btn;
    }
    $(btn).buttonMarkup({theme: 'c'});
}
function SetPartner(btn) {
    if (!isNaN(btn)) {
        btn = '#ss' + btn;
    }
    $(btn).buttonMarkup({theme: 'b'});
}

function ErgChange(btn) {
    Deactivate(btn);               //  !!! Ein Muss !!!
    if (kontra === 1) {
        if (btn === '#gWert' && aktSpiel === iTrischaker) {
            showEinenTip(btn, 'Beim Trischaken<br>zahlt der "Gewinner".');
            return;
        }
        var i1 = parseInt($(btn).text()) * -1;
        if (aktSpiel === i6er && btn === '#gWert') {
            if (i1 < 0) {
                i1 *= 2;
            } else {
                i1 /= 2;
            }
        }
        $(btn).text(i1);
        if (i1 > 0) {
            $(btn).css("color", "black");
        } else {
            $(btn).css("color", "orangered");
        }
        Summieren();
    } else {
        if (btn === '#gWert') {
            $('#gName').click();
        } else {
            $('#' + btn.id.substr(0, btn.id.length - 1)).click();
        }
    }
}

function Summieren() {
    if (Seite === 'PS') {
        aktPunkte = Text2Int('#gWert')
                + Text2Int('#P1e')
                + Text2Int('#P2e')
                + Text2Int('#P3e')
                + Text2Int('#P4e')
                + Text2Int('#P7e')
                + Text2Int('#P8e')
                + Text2Int('#P9e')
                + Text2Int('#PValate');
        if ($('#P5e').is(":visible")) {
            aktPunkte += Text2Int('#P5e');
        }
        if ($('#P6e').is(":visible")) {
            aktPunkte += Text2Int('#P6e');
        }
    } else if (Seite === 'FS') {
        aktPunkte = Text2Int('#gWert')
                + Text2Int('#F2e')
                + Text2Int('#F3e')
                + Text2Int('#FValate');
        if ($('#F1e').is(":visible")) {
            aktPunkte += Text2Int('#F1e');
        }
    } else if (Seite === 'NS') {
        aktPunkte = Text2Int('#gWert');
    }
    setEnter();
    if ($('#tLinks').text()) {
        $('#tRechts').text('Doppelt: ' + (aktPunkte * 2) + ' Punkte.');
    }
}

function showSeite(pSeite) {
    'use strict';
    Deactivate("#nbTarife,#nbHelp");

    if (pSeite === Seite
            && (pSeite === 'PS' || pSeite === 'FS' || pSeite === 'NS')) {
        return;
    }

    NEXT.Seite = pSeite;
    localStorage.setItem('Abakus.NEXT', JSON.stringify(NEXT));

    if (pSeite === 'LI' || pSeite === 'SZ') {
        $("#ss1,#ss2,#ss3,#ss4,#ss5,#ss6").removeClass('ui-disabled');
    } else {
        $("#ss1,#ss2,#ss3,#ss4,#ss5,#ss6").removeClass('ui-disabled').addClass('ui-disabled');
        if (LS.doppelt === 0) {
            $('#tLinks,#tRechts').text('');
        } else if (LS.doppelt === 1) {
            $('#tLinks').text('0*');
            $('#tRechts').text('Letztes doppelte Spiel.');
        } else if (LS.doppelt === 2) {
            $('#tLinks').text('1*');
            $('#tRechts').text('Noch ein doppeltes Spiel.');
        } else {
            $('#tLinks').text((LS.doppelt - 1) + '*');
            $('#tRechts').text('Noch ' + (LS.doppelt - 1) + ' doppelte Spiele.');
        }
        if (sI) {
            ResetSpieler(sI);
            sI = 0;
        }
    }

    Seite = pSeite;
    if (Seite === 'GR') {
        $('#SPIELER,#nbSpiel,#nbSpiele').hide();
    } else if (Seite === 'LI' || Seite === 'SZ') {
        Spieler_Init();
        $('#SPIELER,#nbSpiel,#nbSpiele').hide();
    } else {
        Spieler_Init();
        $('#SPIELER').show();
    }
    $('#LI,#PS,#FS,#NS,#GR').hide();
    $('#' + Seite).show();
    if (pI !== 0) {
        ResetSpieler(pI);
        pI = 0;
    }

    $('#nbLI,#nbED,#nbPS,#nbFS,#nbNS,#nbGR').removeClass('ui-btn-active');
    if (Seite === 'LI') {
        $('#SPIELEallg').hide();
        $('#nbLI').addClass('ui-btn-active');
        showUebersicht();
    } else if (Seite === 'SZ') {
        $('#LI').show();
        $('#SPIELEallg').hide();
        $('#nbLI').addClass('ui-btn-active');
        showSchreibzettel();
    } else if (Seite === 'GR') {
        $('#SPIELEallg').hide();
        $('#nbGR').addClass('ui-btn-active');
        $('#iTarif').removeClass('zmdi-collection-text cRot zmdi-collection-item-1 zmdi-collection-item-2 zmdi-collection-item-3 zmdi-collection-item-4 zmdi-collection-item-5 zmdi-collection-item-6 zmdi-collection-item-7 zmdi-collection-item-8 zmdi-collection-item-9 zmdi-collection-item-99');
        if (LS.doppelt <= 0) {
            $('#iTarif').addClass('zmdi-collection-text');
        } else {
            if (LS.doppelt <= 9) {
                $('#iTarif').addClass('zmdi-collection-item-' + LS.doppelt).addClass('cRot');
            } else {
                $('#iTarif').addClass('zmdi-collection-item-99').addClass('cRot');
            }
        }
        showGR();
    } else {
//        $('#gName').removeClass('ui-btn').css('font-weight', 'normal').css('color', 'black').html('&nbsp;&nbsp;Wähle ein Spiel');
        $('#gWert').text('?');
        $('#nbSpiele').show();
        $('#nbSpiel,#nbWerte').hide();
        kontra = 1;

        $('#SPIELEallg').show();
        setEnter();
        $('#bEnter').removeClass('ui-disabled').addClass('ui-disabled');
        if (Seite === 'PS') {
            $('#nbPS').addClass('ui-btn-active');
            PS_Init();
        } else if (Seite === 'FS') {
            $('#nbFS').addClass('ui-btn-active');
            FS_Init();
            if (LS.Tarif[iFarben3er] === 0) {
                setGame('Farbensolo', 12);
            }
        } else if (Seite === 'NS') {
            $('#nbNS').addClass('ui-btn-active');
            NS_Init();
        }
    }
}

function showDetails(pInit) {
    // 'use strict'; function cannot be declared in a nested block in strict mode
    if (pInit) {
        $('#SPIELER').show();
        if (LS.NR[2] === LS.ME) {
            sI = 2;
        } else {
            sI = 1;
        }
        $('#ss' + sI).buttonMarkup({theme: 'e'});
        $('#nbLI').removeClass('ui-btn-active');
        Deactivate('#nbLI');
    }

    Seite = 'LI2';
    var ANZspiele = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var PROZspiele = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var ANZgewonnen = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var PKTgewonnen = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var BTRGcol2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var PROZcol2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var ANZgespielt = [, 0, 0, 0, 0, 0, 0];

    var ii = i = 0;
    var hPunkte = 0;

    $('#LI').show();

    $(DS.Game).each(function (e) {
        if (e > 0 && !DS.Storno[e]) {

            i = DS.GameI[e];
            if (DS.Spieler[e] === 1) {
                hPunkte = DS.Punkte[1][e];
            } else if (DS.Spieler[e] === 2) {
                hPunkte = DS.Punkte[2][e];
            } else if (DS.Spieler[e] === 3) {
                hPunkte = DS.Punkte[3][e];
            } else if (DS.Spieler[e] === 4) {
                hPunkte = DS.Punkte[4][e];
            } else if (DS.Spieler[e] === 5) {
                hPunkte = DS.Punkte[5][e];
            } else if (DS.Spieler[e] === 6) {
                hPunkte = DS.Punkte[6][e];
            }

            if (typeof hPunkte === "number") {
                if (DS.Spieler[e] === sI) {
                    ANZspiele[i]++;
                    ANZspiele[19]++;
                    PKTgewonnen[i] += hPunkte;
                    PKTgewonnen[19] += hPunkte;
                    if (hPunkte >= 0) {
                        ANZgewonnen[i]++;
                        ANZgewonnen[19]++;
                    }
                    if (DS.GameI[e] < 7 && DS.Partner[e] === DS.Spieler[e]) { // DS.Partner[e] === 0 === Renonce
                        ANZspiele[7]++;
                        PKTgewonnen[7] += hPunkte;
                        if (hPunkte >= 0) {
                            ANZgewonnen[7]++;
                        }
                    }
                }
                ANZspiele[0]++;
                PKTgewonnen[0] = PKTgewonnen[0] + hPunkte;
                if (hPunkte >= 0) {
                    ANZgewonnen[0]++;
                }

                ii = 20 + DS.Spieler[e];
                ANZspiele[ii]++;
                PKTgewonnen[ii] = PKTgewonnen[ii] + hPunkte;
                if (hPunkte >= 0) {
                    ANZgewonnen[ii]++;
                }
            }

            if (sI !== 0 && DS.Spieler[e] !== sI) { // Als Partner oder Gegenspieler
                if (sI === 1) {
                    hPunkte = DS.Punkte[1][e];
                } else if (sI === 2) {
                    hPunkte = DS.Punkte[2][e];
                } else if (sI === 3) {
                    hPunkte = DS.Punkte[3][e];
                } else if (sI === 4) {
                    hPunkte = DS.Punkte[4][e];
                } else if (sI === 5) {
                    hPunkte = DS.Punkte[5][e];
                } else if (sI === 6) {
                    hPunkte = DS.Punkte[6][e];
                }

                if (typeof hPunkte === "number") {
                    ANZspiele[20]++;
                    PKTgewonnen[20] = PKTgewonnen[20] + hPunkte;
                    if (hPunkte >= 0) {
                        ANZgewonnen[20]++;
                    }
                }
            }
            for (var ii = 1; ii <= 6; ii++) {
                if (typeof DS.Punkte[ii][e] === "number") {
                    ANZgespielt[ii]++;
                }
            }
        }
    });

    for (var ii = 0; ii <= 18; ii++) {
        if (ANZspiele[ii] > 0) {
            PROZspiele[ii] = Math.round(ANZspiele[ii] / (ANZspiele[19] / 100)) + '%';
            if (ANZgewonnen[ii] !== 0) {
                PROZcol2[ii] = Math.round(ANZgewonnen[ii] / (ANZspiele[ii] / 100)) + '%';
            } else {
                PROZcol2[ii] = '0%';
            }
        } else {
            PROZspiele[ii] = '-';
            PROZcol2[ii] = '-';
        }
    }
    for (var ii = 19; ii <= 26; ii++) {
        if (ANZspiele[ii] > 0) {
            if (ii >= 21) {
                PROZspiele[ii] = Math.round(ANZspiele[ii] / (ANZgespielt[ii - 20] / 100)) + '%';
            } else {
                PROZspiele[ii] = Math.round(ANZspiele[ii] / (ANZgespielt[sI] / 100)) + '%';
            }
            if (ANZgewonnen[ii] !== 0) {
                PROZcol2[ii] = Math.round(ANZgewonnen[ii] / (ANZspiele[ii] / 100)) + '%';
            } else {
                PROZcol2[ii] = '0%';
            }
        } else {
            PROZspiele[ii] = '-';
            PROZcol2[ii] = '-';
        }
    }
    if (ANZspiele[0] > 0) {
        PROZspiele[0] = Math.round(ANZspiele[0] / (ANZspiele[0] / 100)) + '%';
        if (ANZgewonnen[0] !== 0) {
            PROZcol2[0] = Math.round(ANZgewonnen[0] / (ANZspiele[0] / 100)) + '%';
        } else {
            PROZcol2[0] = '0%';
        }
    } else {
        PROZspiele[0] = '-';
        PROZcol2[0] = '-';
    }
    for (var ii = 0; ii <= 26; ii++) {
        BTRGcol2[ii] = ANZgewonnen[ii];
    }
    if (PC & QUERFORMAT()) {
        var hHoehe = 150;
    } else {
        var hHoehe = $(window).innerWidth() / 3;
    }
    var html = "<div style='height:" + ($('#SPIELER').height() + 2) + "px'></div>"
            + "<div class=L>&nbsp;Details: <b>" + LS.VName[sI] + " " + LS.NName[sI] + "</b></div>"
            + "<div id='container-ges' style='width: 50%; height: " + (hHoehe * 1.1) + "px; float: left'></div>"
            + "<div id='container-gew' style='width: 50%; height: " + (hHoehe * 1.1) + "px; float: left'></div>"
            + "<div id='container-pyramid' style='width:100%; height: " + (hHoehe * 1.1) + "px; float: left'></div>"
            + "<div data-role=navbar>"
            + "<ul>"
            + "<li><a onclick='changeToGru(true);' id=bGruppiert class='S ui-btn-active'>gruppiert</a></li>"
            + "<li><a onclick='changeToGru(false);' id=bDetailiert class='S'>detailliert</a></li>"
            + "</ul>"
            + "</div>"
            + "<table data-role='table' id='tLI' data-mode='cxolumntoggle' class='M ui-body-d ui-shadow table-stripe ui-responsive' data-column-btn-text='' >"
            + "<thead><tr class='bGrau th-groups'>"
            + "<th>Spiele</th><th colspan='2' class=TC>gespielt</th><th colspan='2' class=TC>gewonnen</th>"
            + "</tr><tbody>";

    var anzSpPyr = [0, 0, 0, 0, 0];

    function sumGruppe(pInd) {
        'use strict';
        ANZspiele[27] = 0;
        ANZgewonnen[27] = 0;
        PKTgewonnen[27] = 0;
        for (var ii = 0; ii < pInd.length; ii++) {
            ANZspiele[27] += ANZspiele[pInd[ii]];
            ANZgewonnen[27] += ANZgewonnen[pInd[ii]];
            PKTgewonnen[27] += PKTgewonnen[pInd[ii]];
        }

        if (ANZspiele[27] > 0) {
            PROZspiele[27] = Math.round(ANZspiele[27] / (ANZspiele[0] / 100)) + '%';
            if (ANZgewonnen[27] !== 0) {
                PROZcol2[27] = Math.round(ANZgewonnen[27] / (ANZspiele[27] / 100)) + '%';
            } else {
                PROZcol2[27] = '0%';
            }
        } else {
            PROZspiele[27] = '-';
            PROZcol2[27] = '-';
        }
        BTRGcol2[27] = ANZgewonnen[27];
    }

//  if (stGruppiert) {

    sumGruppe([1, 2, 3, 4, 5, 6]);
    anzSpPyr[2] = ANZspiele[27];
    html += '<tr class="trGruppiert"><th>&nbsp;Rufersp.</th><td class=TR>' + ANZspiele[27] + '</td><td class=TR>' + PROZspiele[27] + '</td><td class=TR>' + BTRGcol2[27] + '</td><td class=TR>' + PROZcol2[27] + '</td></tr>';
    if (ANZspiele[7]) {
        PROZspiele[7] = Math.round(ANZspiele[7] / (ANZspiele[27] / 100)) + '%';
        PROZcol2[7] = Math.round(ANZgewonnen[7] / (ANZspiele[7] / 100)) + '%';
    } else {
        PROZspiele[7] = '-';
        PROZcol2  [7] = '-';
    }
    BTRGcol2[27] = ANZgewonnen[27];
    html += '<tr class="trGruppiert"><td>&nbsp;davon SR</td><td class=TR>' + ANZspiele[ 7] + '</td><td class=TR>' + PROZspiele[ 7] + '</td><td class=TR>' + BTRGcol2[7] + '</td><td class=TR>' + PROZcol2[7] + '</td></tr>';
    sumGruppe([8, 9, 10]);
    anzSpPyr[1] = ANZspiele[27];
    html += '<tr class="trGruppiert"><th>&nbsp;6,3,S3er</th><td class=TR>' + ANZspiele[27] + '</td><td class=TR>' + PROZspiele[27] + '</td><td class=TR>' + BTRGcol2[27] + '</td><td class=TR>' + PROZcol2[27] + '</td></tr>';
    sumGruppe([11, 12]);
    anzSpPyr[3] = ANZspiele[27];
    html += '<tr class="trGruppiert"><th>&nbsp;Farb.Sp.</th><td class=TR>' + ANZspiele[27] + '</td><td class=TR>' + PROZspiele[27] + '</td><td class=TR>' + BTRGcol2[27] + '</td><td class=TR>' + PROZcol2[27] + '</td></tr>';
    sumGruppe([13, 14, 15, 16, 17]);
    anzSpPyr[4] = ANZspiele[27];
    anzSpPyr[0] = anzSpPyr[1] + anzSpPyr[2] + anzSpPyr[3] + anzSpPyr[4];
    html += '<tr class="trGruppiert"><th>&nbsp;Neg.Sp. </th><td class=TR>' + ANZspiele[27] + '</td><td class=TR>' + PROZspiele[27] + '</td><td class=TR>' + BTRGcol2[27] + '</td><td class=TR>' + PROZcol2[27] + '</td></tr>';

//  } else {
    sumGruppe([1, 2, 3, 4, 5, 6]);
    anzSpPyr[2] = ANZspiele[27];
    sumGruppe([8, 9, 10]);
    anzSpPyr[1] = ANZspiele[27];
    sumGruppe([11, 12]);
    anzSpPyr[3] = ANZspiele[27];
    sumGruppe([13, 14, 15, 16, 17]);
    anzSpPyr[4] = ANZspiele[27];
    anzSpPyr[0] = anzSpPyr[1] + anzSpPyr[2] + anzSpPyr[3] + anzSpPyr[4];
    html = html + '<tr class="trDetailiert"><th>Rufer    </th><td class=TR>' + ANZspiele[1] + '</td><td class=TR>' + PROZspiele[1] + '</td><td class=TR>' + BTRGcol2[1] + '</td><td class=TR>' + PROZcol2[1] + '</td></tr>';
    html = html + '<tr class="trDetailiert"><th>So.Ruf.  </th><td class=TR>' + ANZspiele[2] + '</td><td class=TR>' + PROZspiele[2] + '</td><td class=TR>' + BTRGcol2[2] + '</td><td class=TR>' + PROZcol2[2] + '</td></tr>';
    html = html + '<tr class="trDetailiert"><th>I-Rufer  </th><td class=TR>' + ANZspiele[3] + '</td><td class=TR>' + PROZspiele[3] + '</td><td class=TR>' + BTRGcol2[3] + '</td><td class=TR>' + PROZcol2[3] + '</td></tr>';
    html = html + '<tr class="trDetailiert"><th>II-Rufer </th><td class=TR>' + ANZspiele[4] + '</td><td class=TR>' + PROZspiele[4] + '</td><td class=TR>' + BTRGcol2[4] + '</td><td class=TR>' + PROZcol2[4] + '</td></tr>';
    html = html + '<tr class="trDetailiert"><th>III-Ruf. </th><td class=TR>' + ANZspiele[5] + '</td><td class=TR>' + PROZspiele[5] + '</td><td class=TR>' + BTRGcol2[5] + '</td><td class=TR>' + PROZcol2[5] + '</td></tr>';
    html = html + '<tr class="trDetailiert"><th>IIII-Ruf.</th><td class=TR>' + ANZspiele[6] + '</td><td class=TR>' + PROZspiele[6] + '</td><td class=TR>' + BTRGcol2[6] + '</td><td class=TR>' + PROZcol2[6] + '</td></tr>';
    html = html + '<tr class="trDetailiert"><td>davon SR </td><td class=TR>' + ANZspiele[7] + '</td><td class=TR>' + PROZspiele[7] + '</td><td class=TR>' + BTRGcol2[7] + '</td><td class=TR>' + PROZcol2[7] + '</td></tr>';
    html = html + '<tr class="trDetailiert"><th>6er      </th><td class=TR>' + ANZspiele[8] + '</td><td class=TR>' + PROZspiele[8] + '</td><td class=TR>' + BTRGcol2[8] + '</td><td class=TR>' + PROZcol2[8] + '</td></tr>';
    html = html + '<tr class="trDetailiert"><th>3er      </th><td class=TR>' + ANZspiele[9] + '</td><td class=TR>' + PROZspiele[9] + '</td><td class=TR>' + BTRGcol2[9] + '</td><td class=TR>' + PROZcol2[9] + '</td></tr>';
    html = html + '<tr class="trDetailiert"><th>So.3er   </th><td class=TR>' + ANZspiele[10] + '</td><td class=TR>' + PROZspiele[10] + '</td><td class=TR>' + BTRGcol2[10] + '</td><td class=TR>' + PROZcol2[10] + '</td></tr>';
    if (LS.Tarif[iFarben3er] > 0) { // 4 = Farbendreier CUPS-Index
        html = html + '<tr class="trDetailiert" style="background-Color:#FFC"><th>Fa.3er   </th><td class=TR>' + ANZspiele[11] + '</td><td class=TR>' + PROZspiele[11] + '</td><td class=TR>' + BTRGcol2[11] + '</td><td class=TR>' + PROZcol2[11] + '</td></tr>';
    }
    html = html + '<tr class="trDetailiert" style="background-Color:#FFC"><th>Fa.Solo  </th><td class=TR>' + ANZspiele[12] + '</td><td class=TR>' + PROZspiele[12] + '</td><td class=TR>' + BTRGcol2[12] + '</td><td class=TR>' + PROZcol2[12] + '</td></tr>';
    html = html + '<tr class="trDetailiert"><th>Trisch.  </th><td class=TR>' + ANZspiele[13] + '</td><td class=TR>' + PROZspiele[13] + '</td><td class=TR>' + BTRGcol2[13] + '</td><td class=TR>' + PROZcol2[13] + '</td></tr>';
    html = html + '<tr class="trDetailiert"><th>Pi.Zwi.  </th><td class=TR>' + ANZspiele[14] + '</td><td class=TR>' + PROZspiele[14] + '</td><td class=TR>' + BTRGcol2[14] + '</td><td class=TR>' + PROZcol2[14] + '</td></tr>';
    html = html + '<tr class="trDetailiert"><th>Bettler  </th><td class=TR>' + ANZspiele[15] + '</td><td class=TR>' + PROZspiele[15] + '</td><td class=TR>' + BTRGcol2[15] + '</td><td class=TR>' + PROZcol2[15] + '</td></tr>';
    html = html + '<tr class="trDetailiert"><th>PiZw.Ov  </th><td class=TR>' + ANZspiele[16] + '</td><td class=TR>' + PROZspiele[16] + '</td><td class=TR>' + BTRGcol2[16] + '</td><td class=TR>' + PROZcol2[16] + '</td></tr>';
    html = html + '<tr class="trDetailiert"><th>Bet.Ov.  </th><td class=TR>' + ANZspiele[17] + '</td><td class=TR>' + PROZspiele[17] + '</td><td class=TR>' + BTRGcol2[17] + '</td><td class=TR>' + PROZcol2[17] + '</td></tr>';
    if (ANZspiele[18] > 0) {
        html = html + '<tr><th>Diverse  </th><td class=TR>' + ANZspiele[18] + '</td><td class=TR>' + PROZspiele[18] + '</td><td class=TR>' + BTRGcol2[18] + '</td><td class=TR>' + PROZcol2[18] + '</td></tr>';
    }
//  }
    if (sI > 0) {
        html = html + '<tr class=ui-bar-c><th>'
                + LS.VName[sI] + '</th><th class=TR>' + ANZspiele[19] + '</th><th class=TR>' + PROZspiele[19] + '</th><th class=TR>' + BTRGcol2[19] + '</th><th class=TR>' + PROZcol2[19] + '</th></tr>';
        html = html + '<tr class=ui-bar-c><th>'
                + '&nbsp&nbsp;passiv</th><th class=TR>' + ANZspiele[20] + '</th><th class=TR>' + PROZspiele[20] + '</th><th class=TR>' + BTRGcol2[20] + '</th><th class=TR>' + PROZcol2[20] + '</th></tr>';
    } else {
        html = html + '<tr class=ui-bar-b><th>'
                + 'Gesamt</th><th class=TR>' + ANZspiele[0] + '</th><th class=TR>' + PROZspiele[0] + '</th><th class=TR>' + BTRGcol2[0] + '</th><th class=TR>' + PROZcol2[0] + '</th></tr>';
    }
    for (var i2 = 1; i2 <= LS.AnzSpieler; i2++) {
        if (sI !== i2) {
            ii = i2 + 20;
            html = html + '<tr class=ui-bar-d><th>'
                    + LS.VName[i2] + '</th><th class=TR>' + ANZspiele[ii] + '</th><th class=TR>' + PROZspiele[ii] + '</th><th class=TR>' + BTRGcol2[ii] + '</th><th class=TR>' + PROZcol2[ii] + '</th></tr>';
        }
    }
    if (sI > 0) {
        html = html + '<tr class=ui-bar-b><th>'
                + 'Gesamt</th><th class=TR>' + ANZspiele[0] + '</th><th class=TR>' + PROZspiele[0] + '</th><th class=TR>' + BTRGcol2[0] + '</th><th class=TR>' + PROZcol2[0] + '</th></tr>';
    }

    $('#LIste').html(html + "</tbody></table>").trigger('create').show();

    showGauge(LS.Spiele[sI], eigGewonnen[sI], eigVerloren[sI], anzSpPyr, '');

    setFont();

    $('html, body').animate({scrollTop: ($('#LIste').offset().top - $('#SPIELER').height() - 12)});
}

function changeToGru(pGruppiert) {
    Deactivate(this);
    if (pGruppiert) {
        $('#bGruppiert').buttonMarkup({theme: 'c'});
        $('#bDetailiert').buttonMarkup({theme: 'a'}).removeClass('ui-btn-active');
        $('.trGruppiert').show();
        $('.trDetailiert').hide();
    } else {
        $('#bGruppiert').buttonMarkup({theme: 'a'}).removeClass('ui-btn-active');
        $('#bDetailiert').buttonMarkup({theme: 'c'});
        $('.trGruppiert').hide();
        $('.trDetailiert').show();
    }
}

function IsInteger(value) {
    if ((parseFloat(value) === parseInt(value)) && !isNaN(value)) {
        return true;
    } else {
        return false;
    }
}

function getVNkurz1(ii) {
    if (LS.Spieler[ii].length <= 4) {
        return LS.VName[ii];
    } else {
        return LS.VName[ii].substr(0, 4);
    }
}

function getVNkurz2(ii) {
    if (LS.Spieler[ii].length <= 4) {
        return '';
    } else {
        return LS.VName[ii].substr(4, 4);
    }
}

function showSchreibzettel() {

    Seite = 'LI0';
    Deactivate('#nbLI');
    var html = "<div class=L>&nbsp;<b>Schreibzettel:</b></div>"
            + "<table data-role='table' id='tLI' data-mode='columntoggle' class='L ui-body-d ui-shadow ui-responsive' data-column-btn-text='' >"
            + "<thead>"
            + "<tr class='bGrau'>"
            + "<th class=TR>#</th>";
    for (var ii = 1; ii <= LS.AnzSpieler; ii++) {
        html = html + "<th class=TR>" + getVNkurz1(ii) + "</th>";
    }
    html = html + "</tr>"
            + "<tr class='bGrau'>"
            + "<th class=TR></th>";
    for (var ii = 1; ii <= LS.AnzSpieler; ii++) {
        html = html + "<th class=TR>" + getVNkurz2(ii) + "</th>";
    }
    html = html + "</tr><tbody>";
    var sum1 = 0;
    var sum2 = 0;
    var sum3 = 0;
    var sum4 = 0;
    var sum5 = 0;
    var sum6 = 0;
    var hSum1 = 0;
    var hSum2 = 0;
    var hSum3 = 0;
    var hSum4 = 0;
    var hSum5 = 0;
    var hSum6 = 0;
    var nSpiel = 0;
    var hSpiel = 0;
    var hLink = '';

    $(DS.Game).each(function (e) {
        if (e > 0) {
            if ((nSpiel > 1) && (nSpiel % LS.AnzSpieler === 0)) {
                html += '<tr style="background-color:#cfe0f0">'
                        + '<th class=TR>&sum;</th>'
                        + '<th class=TR>' + hSum1 + '</th>'
                        + '<th class=TR>' + hSum2 + '</th>'
                        + '<th class=TR>' + hSum3 + '</th>'
                        + '<th class=TR>' + hSum4 + '</th>';
                if (LS.AnzSpieler >= 5) {
                    html += '<th class=TR>' + hSum5 + '</th>';
                }
                if (LS.AnzSpieler >= 6) {
                    html += '<th class=TR>' + hSum6 + '</th>';
                }
                html + '</tr>';
            }
            if (!DS.Storno[e]) {
                if (IsInteger(DS.Punkte[1][e])) {
                    sum1 = sum1 + DS.Punkte[1][e];
                }
                if (IsInteger(DS.Punkte[2][e])) {
                    sum2 = sum2 + DS.Punkte[2][e];
                }
                if (IsInteger(DS.Punkte[3][e])) {
                    sum3 = sum3 + DS.Punkte[3][e];
                }
                if (IsInteger(DS.Punkte[4][e])) {
                    sum4 = sum4 + DS.Punkte[4][e];
                }
                if (IsInteger(DS.Punkte[5][e])) {
                    sum5 = sum5 + DS.Punkte[5][e];
                }
                if (IsInteger(DS.Punkte[6][e])) {
                    sum6 = sum6 + DS.Punkte[6][e];
                }
                hSum1 = sum1;
                hSum2 = sum2;
                hSum3 = sum3;
                hSum4 = sum4;
                hSum5 = sum5;
                hSum6 = sum6;
            }
            dSpiele = '';
            hLink = ' class=Link onclick="window.location.replace(' + "'Edit" + LS.AnzSpieler + LS.JeSeite + '.html?' + e + "');" + '"';
            if (DS.Storno[e]) {
                hLink = '';
                hSpiel = 'S:';
            } else {
                nSpiel++;
                hSpiel = nSpiel;
            }

            if (DS.Storno[e]) {
                hStyle = 'background-color:#ebb;text-decoration: line-through;';
            } else if (DS.Korr[e]) {
                hStyle = 'background-color:peachpuff;';
            } else {
                hStyle = 'background-color:#eee;';
            }

            html = html + '<tr style="' + hStyle + '"><td class=TR><span' + hLink + '>' + hSpiel + '</span></td>'
                    + '<td class=TR>' + (DS.Spieler[e] === 1 ? '<b>' : '') + DS.Punkte[1][e] + (DS.Spieler[e] === 1 ? '</b>' : '') + '</td>'
                    + '<td class=TR>' + (DS.Spieler[e] === 2 ? '<b>' : '') + DS.Punkte[2][e] + (DS.Spieler[e] === 2 ? '</b>' : '') + '</td>'
                    + '<td class=TR>' + (DS.Spieler[e] === 3 ? '<b>' : '') + DS.Punkte[3][e] + (DS.Spieler[e] === 3 ? '</b>' : '') + '</td>'
                    + '<td class=TR>' + (DS.Spieler[e] === 4 ? '<b>' : '') + DS.Punkte[4][e] + (DS.Spieler[e] === 4 ? '</b>' : '') + '</td>';
            if (LS.AnzSpieler >= 5) {
                html = html + '<td class=TR>' + (DS.Spieler[e] === 5 ? '<b>' : '') + DS.Punkte[5][e] + (DS.Spieler[e] === 5 ? '</b>' : '') + '</td>';
            }
            if (LS.AnzSpieler >= 6) {
                html = html + '<td class=TR>' + (DS.Spieler[e] === 6 ? '<b>' : '') + DS.Punkte[6][e] + (DS.Spieler[e] === 6 ? '</b>' : '') + '</td>';
            }
            html = html + '</tr>';
        }
    });
    hStyle = 'background-color:#cfe0f0;';
    html = html + '<tr style="' + hStyle + '"><th class=TR>&sum;</th>'
            + '<th class=TR>' + hSum1 + '</th>'
            + '<th class=TR>' + hSum2 + '</th>'
            + '<th class=TR>' + hSum3 + '</th>'
            + '<th class=TR>' + hSum4 + '</th>';
    if (LS.AnzSpieler >= 5) {
        html = html + '<th class=TR>' + hSum5 + '</th>';
    }
    if (LS.AnzSpieler >= 6) {
        html = html + '<th class=TR>' + hSum6 + '</th>';
    }
    html = html + '</tr>';
    $('#LIste').html(html + "</tbody></table>").trigger('create').show();

    setFont();

    $(".TR").attr('style', 'padding:.03em 0em;text-align:right;');

    $("#tLI").stickyTableHeaders();
    $(document).scrollTop($(document).height());
}

function showChronik(pInit) {
    'use strict';
    if (pInit) {
        $('#SPIELER').show();
        if (LS.NR[2] === LS.ME) {
            sI = 2;
        } else {
            sI = 1;
        }
        $('#ss' + sI).buttonMarkup({theme: 'c'});
        $('#nbLI').removeClass('ui-btn-active');
        Deactivate('#nbLI');
    }
    Seite = 'LI1';
    var html = "<div style='height:" + ($('#SPIELER').height() + 2) + "px'></div>"
            + "<div class=L>&nbsp;Chronik: <b>" + LS.VName[sI] + " " + LS.NName[sI] + "</b></div>"
            + "<div data-role='navbar'><ul>"
            + "<li><a onclick='" + '$(".fremdSpiel").show();' + "' class=ui-btn-active>alle</a></li>"
            + "<li><a onclick='" + '$(".fremdSpiel").hide();' + "'>" + LS.VName[sI] + "'s</a></li>"
            + "</ul></div>"
            + "<table data-role='table' id='tLI' data-mode='columntoggle' class='L ui-body-d ui-shadow ui-responsive' data-column-btn-text='' >"
            + "<thead><tr class='bGrau'>"
            + "<th data-priority='2'>#</th><th>Spieler</th><th>Spiel</th><th class=TR>•••</th><th class=TR>&Sum;</th>"
            + "</tr><tbody>";
    var sPunkte = 0;
    var sPunkteP = 0;
    var hPunkte = 0;
    var sName = '';
    var pName = '';
    var hGame = '';
    var nRunde = 0;
    var nSpiel = 0;
    var nSpiele = 0;
    var dSpiele = '';
    var nPausi = 0;
    var hI = 0;
    var hLink = '';
    var hStyle = '';

    $(DS.Game).each(function (e) {
        if (e > 0) {
            hGame = DS.Game[e];
            if (!DS.Storno[e]) {
                if (sI === 0) {
                    hI = DS.Spieler[e];
                } else {
                    hI = sI;
                }

                if ($.isNumeric(DS.Punkte[hI][e]) && sI > 0) {
                    sPunkte = sPunkte + DS.Punkte[hI][e];
                }
                hPunkte = DS.Punkte[hI][e];

                if (sI === 0) {
                    sPunkte = '';
                }
            }
            dSpiele = '';
            sPunkteP = sPunkte;
            hLink = ' class=Link onclick="window.location.replace(' + "'Edit" + LS.AnzSpieler + LS.JeSeite + '.html?' + e + "');" + '"';
            if (DS.Storno[e]) {
                sPunkteP = '';
                hStyle = 'background-color:#ebb;text-decoration: line-through;';
                hLink = '';
            } else {
                if (nSpiel + nPausi >= LS.AnzSpieler) {
                    nRunde++;
                    nSpiel = 0;
                    nPausi = 0;
                }
                nSpiel++;
                nSpiele++;
                dSpiele = nSpiele;
                if (DS.Punkte[1][e] === 'X' || DS.Punkte[2][e] === 'X' || DS.Punkte[3][e] === 'X' || DS.Punkte[4][e] === 'X' || DS.Punkte[5][e] === 'X' || DS.Punkte[6][e] === 'X') {
                    nPausi++;
                }
                if (DS.Korr[e]) {
                    hStyle = 'background-color:peachpuff;';
                } else if (DS.Game[e][0] === '*') {
                    hStyle = 'background-color:khaki;';
                    hGame = DS.Game[e].substring(1);
                } else if ((nRunde % 2) === 1) {
                    hStyle = 'background-color:#cfe0f0;';
                } else {
                    hStyle = 'background-color:#eee;';
                }
            }

            if (DS.Partner[e] === 0) {
                if (LS.Spieler[DS.Spieler[e]].length <= 7) {
                    sName = LS.Spieler[DS.Spieler[e]];
                } else {
                    sName = LS.Spieler[DS.Spieler[e]].substr(0, 6) + ".";
                }
                if (DS.Spieler[e] === sI) {
                    sName = '<strong>' + sName + '</strong>';
                    html += '<tr style="' + hStyle + '">';
                } else {
                    html += '<tr style="' + hStyle + '" class=fremdSpiel>';
                }
            } else {
                sName = LS.Spieler[DS.Spieler[e]].substr(0, 3);
                if (DS.Spieler[e] === sI) {
                    sName = '<strong>' + sName + '</strong>';
                    html += '<tr style="' + hStyle + '">';
                } else {
                    html += '<tr style="' + hStyle + '" class=fremdSpiel>';
                }
                pName = LS.Spieler[DS.Partner[e]].substr(0, 3);
                if (DS.Partner[e] === sI) {
                    pName = '<strong>' + pName + '</strong>';
                }
                sName = sName + '/' + pName;
            }
            html += '<td>' + dSpiele + '</td><td>' + sName + '</td><td><span' + hLink + '>' + hGame + '</span></td><td class=TR>' + hPunkte + '</td><th class=TR>' + sPunkteP + '</th></tr>';
        }
    });
    $('#LIste').html(html + "</tbody></table>").trigger('create').show();
    if (sI > 0) {
        if (sPunkte >= 0) {
            $('#LIste').append('<center><div id="ZwiSu" class=L style="color:#333;background-color:#bbb">' + LS.VName[sI] + '&nbsp;&nbsp;' + LS.NName[sI] + ':&nbsp;&nbsp;&nbsp;&nbsp;<span style="text-shadow: black 0px 0px 0px;font-weight:bold;color:#111">' + sPunkte + '</span></div></center>');
        } else {
            $('#LIste').append('<center><div id="ZwiSu" class=L style="color:#333;background-color:#bbb">' + LS.VName[sI] + '&nbsp;&nbsp;' + LS.NName[sI] + ':&nbsp;&nbsp;&nbsp;&nbsp;<span style="text-shadow: black 0px 0px 0px;font-weight:bold;color:#dc143c">' + sPunkte + '</span></div></center>');
        }
    }
    setFont();
    $(".TR").attr('style', 'padding:.2em;text-align:right;');
    $('html, body').animate({scrollTop: ($('#LIste').offset().top - $('#SPIELER').height() - 5)});
}

function Text2Int(btn) {
    var s1 = $(btn).text();
    if (isNaN(s1)) {
        return 0;
    }
    if (s1 === '' || s1 === ' ' || isNaN(s1)) {
        return 0;
    } else {
        return parseInt(s1);
    }
}

function BtnSet(btn, v1) {
    if (v1) {
        if (aktSpiel === iTrischaker) {
            $(btn).css("color", "red").text(v1).show();
        } else {
            if ($(btn).text().substr(0, 1) === '-') {
                $(btn).css("color", "red").text('-' + v1).show();
            } else {
                $(btn).css("color", "black").text(v1).show();
            }
        }
    } else {
        $(btn).text('').hide();
    }
}

function BtnSet2(btn, v1, v2) {
    Deactivate(btn);               //  !!! Ein Muss !!!
    if ($(btn).hasClass('ui-btn-c')) {
        $(btn).buttonMarkup({theme: 'a'});
        if (v2) {
            $(btn + 'e').text(v2).show();
        } else {
            $(btn + 'e').text('').hide();
        }
    } else {
        $(btn).buttonMarkup({theme: 'c'});
        if (v1) {
            $(btn + 'e').text(v1).show();
        } else {
            $(btn + 'e').text('').hide();
        }
    }
    Summieren();
}

function BtnSet3(btn, pWert) {
    Deactivate(btn);               //  !!! Ein Muss !!!
    btnE = btn + 'e';

    if (kontra === 1 && ($(btn).hasClass('ui-btn-e') || $(btn).hasClass('ui-btn-b'))) {
        $(btn).buttonMarkup({theme: 'a'});
        $(btnE).text(0).hide();
    } else {
        if (kontra !== 1) {
            pWert = pWert * 2 * kontra;
            $(btn).buttonMarkup({theme: 'b'});
            kontra = 1;
            if (LS.Tarif21T && $("#PS").is(":visible")) {
                $('.cKontra').buttonMarkup({theme: 'a'}).text('Kont.');
            } else {
                $('.cKontra').buttonMarkup({theme: 'a'}).text('Kontra');
            }
        } else if ($(btn).hasClass('ui-btn-c')) {
            $(btn).buttonMarkup({theme: 'e'});
            pWert = pWert * 2;
        } else {
            $(btn).buttonMarkup({theme: 'c'});
        }
        if ($(btnE).text().substr(0, 1) === '-') {
            $(btnE).css("color", "red").text('-' + pWert).show();
        } else {
            $(btnE).css("color", "black").text(pWert).show();
        }
    }
    Summieren();
}

function BtnSetValat(btn) {
    Deactivate(btn);               //  !!! Ein Muss !!!
    btnE = btn + 'e';
    var hPunkte = aktSpielWert;
    if ($('#gWert').text().substr(0, 1) === '-') {
        if (aktSpiel === i6er) {
            hPunkte *= -2;
        } else {
            hPunkte *= -1;
        }
    }
    if (kontra === 1 && ($(btn).hasClass('ui-btn-e') || $(btn).hasClass('ui-btn-b'))) {
        $(btn).buttonMarkup({theme: 'a'});
        $(btnE).text(0).hide();
    } else {
        if (kontra === 1) {
            if ($(btn).hasClass('ui-btn-c')) {
                hPunkte *= 8;
                $(btn).buttonMarkup({theme: 'e'});
                $(btnE).text('x 8').show();
            } else {
                hPunkte *= 4;
                $(btn).buttonMarkup({theme: 'c'});
                $(btnE).text('x 4').show();
            }
        } else {
            if (kontra === 2) {
                hPunkte *= 16;
                $(btnE).text('x 16').show();
            } else if (kontra === 4) {
                hPunkte *= 32;
                $(btnE).text('x 32').show();
            } else if (kontra === 8) {
                hPunkte = hPunkte * 64;
                $(btnE).text('x 64').show();
            }
            kontra = 1;
            $(btn).buttonMarkup({theme: 'b'});
            if (LS.Tarif21T && $("#PS").is(":visible")) {
                $('.cKontra').buttonMarkup({theme: 'a'}).text('Kont.');
            } else {
                $('.cKontra').buttonMarkup({theme: 'a'}).text('Kontra');
            }
        }
    }

    $('#gWert').text(hPunkte);

    Summieren();
}

function Spieler_Init() {
    $("#ss1,#ss2,#ss3,#ss4,#ss5,#ss6").buttonMarkup({theme: 'a'});
    if (LS.Spieler[5]) {
        if (LS.Pausierer1 === 0) {
            $('#ss' + LS.INA1).buttonMarkup({theme: 'd'});
        } else {
            $('#ss' + LS.Pausierer1).buttonMarkup({theme: 'd'});
        }
    }
    if (LS.Spieler[6]) {
        if (LS.Pausierer2 === 0) {
            $('#ss' + LS.INA2).buttonMarkup({theme: 'd'});
        } else {
            $('#ss' + LS.Pausierer2).buttonMarkup({theme: 'd'});
        }
    }
    $('#ss' + LS.Vorhand).buttonMarkup({theme: 'f'});
}

window.onbeforeunload = function (event) {
    $('body').addClass('ui-disabled');
};

window.onload = function () {
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

    LS = new Object();
    LS = JSON.parse(localStorage.getItem('Abakus.LS'));
    DS = new Object();
    DS = JSON.parse(localStorage.getItem('Abakus.DS'));
    NEXT = new Object();
    NEXT = JSON.parse(localStorage.getItem('Abakus.NEXT'));

    if (LS.ME !== "3425" && LS.ME !== "1000") {
        document.oncontextmenu = function () {
            return false; // oncontextmenu
        };
    }
    document.onselectstart = function () {
        return false;
    };

    LS.showMeinenTisch = true;
    localStorage.setItem('Abakus.LS', JSON.stringify(LS));

    if (LS.Ansagen) {
        $('#iAudio').addClass('zmdi-volume-up');
    } else {
        $('#iAudio').addClass('zmdi-volume-off');
    }

    stAnzSpalten = LS.AnzSpalten;
    if (LS.SpieleJeRunde) {
        if (LS.gespielt >= LS.SpieleJeRunde) {
            $('.NBedit').addClass('ui-disabled');
        }
    }

    if (!LS.I) { // Spontaner Tisch
        $('#nbOptions').addClass('ui-disabled');
    }

    initGames();
// #Positivspiele

    $('#ss1').text(LS.Spieler[1]);
    $('#ss2').text(LS.Spieler[2]);
    $('#ss3').text(LS.Spieler[3]);
    $('#ss4').text(LS.Spieler[4]);
    if (LS.Spieler[5]) {
        $('#ss5').text(LS.Spieler[5]);
    }
    if (LS.Spieler[6]) {
        $('#ss6').text(LS.Spieler[6]);
    }
    setFont();

    if (NEXT.Seite === 'GR' && PC) {
        setTimeout(function () {
            showSeite(NEXT.Seite);
        });
    } else {
        showSeite(NEXT.Seite);
    }
    Activate("#nb" + Seite);

    $("#ss1,#ss2,#ss3,#ss4,#ss5,#ss6").click(function () {       // LL
        Deactivate(this);               //  !!! Ein Muss !!!
        if (kontra !== 1) {
            kontra = 1;
            if (LS.Tarif21T && $("#PS").is(":visible")) {
                $('.cKontra').buttonMarkup({theme: 'a'}).text('Kont.');
            } else {
                $('.cKontra').buttonMarkup({theme: 'a'}).text('Kontra');
            }
        }
        var hI = parseInt($(this).attr('id').substr(2, 1));

        if (Seite.substr(0, 2) === 'LI') {
            if (sI !== hI) {
                ResetSpieler(sI);
            }
            if (sI === 0 || (sI === hI && Seite === 'LI2') || (sI !== hI && Seite === 'LI1')) {
                sI = hI;
                Seite = 'LI1';
                $(this).buttonMarkup({theme: 'c'});
                showChronik();
            } else {
                sI = hI;
                Seite = 'LI2';
                $(this).buttonMarkup({theme: 'e'}); // b
                showDetails();
            }
        } else {
            if ((hI === LS.INA1 || hI === LS.INA2) && Seite.substr(0, 2) !== 'LI') {
                showEinenTip('#ss' + hI, '<b>' + LS.VName[hI] + '</b>&nbsp;' + LS.NName[hI] + '<br>hat&nbsp;nicht&nbsp;gespielt.');
                return false;
            } else if (hI === sI) {
                ResetSpieler(sI);
                if (aktSpiel === iTrischaker) {
                    sI = pI;
                    pI = 0;
                    if (sI) {
                        Set(sI);
                    }
                } else {
                    sI = 0;
                }
                setEnter();
            } else if (hI === pI) {
                ResetSpieler(pI);
                pI = 0;
            } else if (sI === 0 || aktSpiel === 0 || (aktSpiel >= i6er && aktSpiel !== iTrischaker)) { // llll
//            } else if (sI === 0 || aktSpiel === 0 || (aktSpiel >= i6er && (aktSpiel !== iTrischaker || LS.Regeln !== 'Ti.'))) { // llll
//            } else if (sI === 0 || aktSpiel === 0 || (aktSpiel >= i6er && aktSpiel !== iTrischaker)) {
                if (sI) {
                    ResetSpieler(sI);
                }
                sI = hI;
                Set(sI);
                setEnter();
            } else {
                if (aktSpiel !== iTrischaker) {
                    ResetSpieler(pI);
                    pI = hI;
                    SetPartner(pI);
                } else {
                    ResetSpieler(pI);
                    pI = hI;
                    Set(pI);
                }
            }
        }
    });

    $("#bEnter").click(function () {
        Deactivate(this);               //  !!! Ein Muss !!!
        if (Seite === 'PS') {
            pruefenPS();
        } else if (Seite === 'FS') {
            pruefenFS();
        } else if (Seite === 'NS') {
            pruefenNS();
        }
    });

// Click Positivspiele
// Click Positivspiele
// Click Positivspiele

    $("#P1").click(function () {
        BtnSet3('#P1', LS.Tarif[pPagat] * soloFaktor);
    });
    $("#P2").click(function () {
        BtnSet3('#P2', LS.Tarif[pUhu] * soloFaktor);
    });
    $("#P3").click(function () {
        BtnSet3('#P3', LS.Tarif[pKakadu] * soloFaktor);
    });
    $("#P4").click(function () {
        BtnSet3('#P4', LS.Tarif[pQuapil] * soloFaktor);
    });
    $("#P5").click(function () {
        BtnSet3('#P5', LS.Tarif[pTrull] * soloFaktor);
        if ($('#PValate').text() === 'x 4') { // bei stillen Valat werden nur angesagte Trull / Könige gerechnet
            if ($('#P5').hasClass('ui-btn-e')) {
                $('#P5e').show();
            } else {
                $('#P5e').hide();
            }
        }
    });
    $("#P6").click(function () {
        BtnSet3('#P6', LS.Tarif[p4Koenige] * soloFaktor);
        if ($('#PValate').text() === 'x 4') { // bei stillen Valat werden nur angesagte Trull / Könige gerechnet
            if ($('#P6').hasClass('ui-btn-e')) {
                $('#P6e').show();
            } else {
                $('#P6e').hide();
            }
        }
    });
    $("#P7").click(function () {
        BtnSet3('#P7', LS.Tarif[pUltimo] * soloFaktor);
    });
    $("#P8").click(function () {
        BtnSet3('#P8', LS.Tarif[pAbsolut] * soloFaktor);
    });
    $("#P9").click(function () {
        BtnSet3('#P9', LS.Tarif[pXY] * soloFaktor);
    });

    $("#PValat").click(function () {
        if (LS.Tarif[pValat]) {
            BtnSet3('#PValat', LS.Tarif[pValat] * soloFaktor);
        } else {
            BtnSetValat('#PValat');

            var s1 = $('#PValate').text();

            if (s1 === 'x 4') {
                if ($('#P5').hasClass('ui-btn-c')) {
                    $('#P5e').hide();
                } else if ($('#P5').hasClass('ui-btn-e')) {
                    $('#P5e').show();
                }

                if ($('#P6').hasClass('ui-btn-c')) {
                    $('#P6e').hide();
                } else if ($('#P6').hasClass('ui-btn-e')) {
                    $('#P6e').show();
                }
            } else if (s1 === 'x 8') {
                $('#P5,#P6').addClass('ui-disabled');
                $('#P5e,#P6e').hide();
            } else if (s1 === '' || s1 === '0') {
                if ($('#P5').hasClass('ui-btn-c')) {
                    BtnSet('#P5e', LS.Tarif[pTrull]);
                    $('#P5e').show();
                } else if ($('#P5').hasClass('ui-btn-e')) {
                    BtnSet('#P5e', LS.Tarif[pTrull] * 2);
                    $('#P5e').show();
                }

                if ($('#P6').hasClass('ui-btn-c')) {
                    BtnSet('#P6e', LS.Tarif[p4Koenige]);
                    $('#P6e').show();
                } else if ($('#P6').hasClass('ui-btn-e')) {
                    BtnSet('#P6e', LS.Tarif[p4Koenige] * 2);
                    $('#P6e').show();
                }
                $('#P5,#P6').removeClass('ui-disabled');
            }
            Summieren();
        }
    });

    $("#gWert").click(function () {
        ErgChange('#gWert');
    });

    $("#P1e,#P2e,#P3e,#P4e,#P5e,#P6e,#P7e,#P8e,#P9e").click(function () {
        ErgChange(this);
    });

    $("#PValate,#FValate").click(function () {
        if (LS.Tarif[pValat]) {
            ErgChange(this);
        } else {
            ErgChange('#gWert');
        }
    });

// Click Farbspiele
// Click Farbspiele
// Click Farbspiele

    $("#F1").click(function () {
        BtnSet3('#F1', LS.Tarif[p4Koenige] * soloFaktor);
        if ($('#FValate').text() === 'x 4') { // bei stillen Valat werden nur angesagte Trull / Könige gerechnet
            if ($('#F1').hasClass('ui-btn-e')) {
                $('#F1e').show();
            } else {
                $('#F1e').hide();
            }
        }
    });
    $("#F2").click(function () {
        BtnSet3('#F2', LS.Tarif[pAbsolut] * soloFaktor);
    });
    $("#F3").click(function () {
        BtnSet3('#F3', LS.Tarif[pXY] * soloFaktor);
    });

    $("#FValat").click(function () {  // Valat
        if (LS.Tarif[pValat]) {
            BtnSet3('#FValat', LS.Tarif[pValat] * soloFaktor);
        } else {
            BtnSetValat('#FValat');

            var s1 = $('#FValate').text();

            if (s1 === 'x 4') {
                if ($('#F1').hasClass('ui-btn-c')) {
                    $('#F1e').hide();
                } else if ($('#F1').hasClass('ui-btn-e')) {
                    $('#F1e').show();
                }
            } else if (s1 === 'x 8') {
                $('#F1').addClass('ui-disabled');
                $('#F1e').hide();
            } else if (s1 === '' || s1 === '0') {
                if ($('#F1').hasClass('ui-btn-c')) {
                    BtnSet('#F1e', LS.Tarif[pTrull]);
                    $('#F1e').show();
                } else if ($('#F1').hasClass('ui-btn-e')) {
                    BtnSet('#F1e', LS.Tarif[pTrull] * 2);
                    $('#F1e').show();
                }
                $('#F1').removeClass('ui-disabled');
            }
            Summieren();
        }
    });

    $("#F1e,#F2e,#F3e").click(function () {
        ErgChange(this);
    });

// Click Negativspiele
// Click Negativspiele
// Click Negativspiele

    $("#Nx2").click(function () {
        Deactivate(this);
        if ($(this).hasClass('ui-btn-c')) {
            $(this).buttonMarkup({theme: 'a'});
            $('#gWert').text(aktSpielWert * -1);
        } else {
            $(this).buttonMarkup({theme: 'c'});
            $("#Nx4").buttonMarkup({theme: 'a'});
            $('#gWert').text(aktSpielWert * -2);
        }
        Summieren();
    });
    $("#Nx4").click(function () {
        Deactivate(this);
        if ($(this).hasClass('ui-btn-c')) {
            $(this).buttonMarkup({theme: 'a'});
            $('#gWert').text(aktSpielWert * -1);
        } else {
            $(this).buttonMarkup({theme: 'c'});
            $("#Nx2").buttonMarkup({theme: 'a'});
            $('#gWert').text(aktSpielWert * -4);
        }
        Summieren();
    });

    if (window.location.href.toUpperCase().indexOf('FIREBASEAPP.COM') < 0) {
        $(":mobile-pagecontainer").pagecontainer("load", "Edit" + LS.AnzSpieler + LS.JeSeite + ".html");
    }

    myJTip = new jBox('Tooltip', {
        theme: 'TooltipError',
        delayClose: 20,
        closeOnClick: true,
        closeOnEsc: true
    });

    jbSelberrufer = new jBox('Modal', {
        title: '<div class=L3 style="background-color:#27a;border:8px solid #27a;color: white;">&nbsp;Selberrufer!</div>',
        content: '<div class=L3 style="text-align:left">&nbsp;Speichern?</div>'
                + '<div class="ui-grid-a">'
                + '<div class="ui-block-a" style="padding:8px">'
                + '<button class="L3 ui-corner-all" onClick="jbSelberrufer.close();" style="width:100%;white-space:nowrap;" data-theme="a">&nbsp;nein&nbsp;</button>'
                + '</div>'
                + '<div class="ui-block-b" style="padding:8px;">'
                + '<button class="L3 ui-corner-all" onClick="selberruferSpeichern();" style="width:100%;background-color:#efcc44;font-weight:bold;white-space:nowrap;" data-theme="e">&nbsp;&nbsp;&nbsp;ja&nbsp;&nbsp;&nbsp;</button>'
                + '</div>'
                + '</div>',
        closeButton: false
    });
};

if (/iPad|iPhone/.test(navigator.userAgent)) {
    window.onpageshow = function (event) {
        if (window.performance.navigation.type === 2) {
            var hJeSeite = LS.JeSeite;
            LS = JSON.parse(localStorage.getItem('Abakus.LS'));
            if (LS.AnzSpieler === 4 && LS.JeSeite !== hJeSeite) {
                window.location.replace('Abakus4' + LS.JeSeite + '.html?');
                return;
            } else {
                $('body').removeClass('ui-disabled');
                $('#nbOptions').removeClass('ui-btn-active');
                NEXT = JSON.parse(localStorage.getItem('Abakus.NEXT'));
                showSeite(NEXT.Seite);
            }
        }
    };
}