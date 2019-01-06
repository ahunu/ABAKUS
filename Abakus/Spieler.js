
var FB = undefined;
var LS = new Object();
var SPIELER = new Object();

var SPIELERext = null;

var myJBox = null;

var hThisSession = new Date().toLocaleString();

var spNR = 0;
var spNNAME = 1;
var spVNAME = 2;
var spORT = 3;

var I = 0;
var iNR = 0;
var hNeu = false;

var SORT = []; // Sort Stammspieler

nGeaendert = 0;
hMeldung = '';


const spANGELEGTam = 19;
const spANGELEGTvon = 20;
const spGEAENDERTam = 21;
const spGEAENDERTvon = 22;
var hAlt = hNeu = '';

function whenSPIELERloaded() {

//    localStorage.setItem('Abakus.SPIELERext', JSON.stringify(SPIELERext));

    SPIELERext = JSON.parse(localStorage.getItem('Abakus.SPIELERext'));

    for (var spieler in SPIELERext) {

        if (SPIELERext[spieler][spGEAENDERTvon] === "Stammspieler") {
            SPIELERext[spieler][spGEAENDERTam] = null;
            SPIELERext[spieler][spGEAENDERTvon] = null;
        }

        hAlt = hNeu = SPIELERext[spieler][spANGELEGTam];
        if (hNeu) {
            var hNeu = '' + hNeu.trim();
//                        if (hNeu.indexOf('.') === 2) {
            if (hNeu[1] === '0' && hNeu[2] !== '.') {
                hNeu = hNeu.substr(2);
            }
            hNeu = hNeu.replace(/\./g, ' ');

            hTag = parseInt(hNeu);
            if (isNaN(hTag)) {
                hNeu = hNeu.substr(1);
                hTag = parseInt(hNeu);
            }
            if (hTag <= 9) {
                hTag = '0' + hTag;
            }

            var i = hNeu.indexOf(' ');
            hNeu = hNeu.substr(i);

            var hMon = parseInt(hNeu);
            if (isNaN(hMon)) {
                hNeu = hNeu.substr(1);
                hMon = parseInt(hNeu);
            }
            if (isNaN(hMon)) {
                hNeu = hNeu.substr(1);
                hMon = parseInt(hNeu);
            }
            if (hMon <= 9) {
                hMon = '0' + hMon;
            }

            var i = hAlt.indexOf('.201');
            hNeu = hAlt.substr(i);

            hNeu = hAlt.substr(hAlt.lastIndexOf('.') + 1, 7);

            var hJahr = parseInt(hNeu);

            if (isNaN(hJahr)) {
                hNeu = hNeu.substr(1);
                hJahr = parseInt(hNeu);
            }
            if (isNaN(hJahr)) {
                hNeu = hNeu.substr(1);
                hJahr = parseInt(hNeu);
            }

            var i = hAlt.indexOf(' ') + 1;
            if (hAlt[i] >= '0' && hAlt[i] <= '9') {
                hStd = hAlt.substr(i, 5);
            } else {
                hStd = hAlt.substr(i, 9);
            }

            hStd = parseInt(hAlt.substr(i));
            if (isNaN(hStd)) {
                hStd = parseInt(hAlt.substr(i + 1));
            }
            if (hStd <= 9) {
                hStd = '0' + hStd;
            }

            var i = hAlt.indexOf(':') + 1;
            if (hAlt[i] >= '0' && hAlt[i] <= '9') {
                hMin = hAlt.substr(i, 5);
            } else {
                hMin = hAlt.substr(i, 9);
            }

            hMin = parseInt(hAlt.substr(i));
            if (isNaN(hMin)) {
                hMin = parseInt(hAlt.substr(i + 1));
            }
            if (hMin <= 9) {
                hMin = '0' + hMin;
            }

            var xTSTAMP = hJahr + '-' + hMon + '-' + hTag + ' ' + hMin + ':' + hStd;

            SPIELERext[spieler][spANGELEGTam] = xTSTAMP;
        }

                hAlt = hNeu = SPIELERext[spieler][spGEAENDERTam];
        if (hNeu) {
            var hNeu = '' + hNeu.trim();
//                        if (hNeu.indexOf('.') === 2) {
            if (hNeu[1] === '0' && hNeu[2] !== '.') {
                hNeu = hNeu.substr(2);
            }
            hNeu = hNeu.replace(/\./g, ' ');

            hTag = parseInt(hNeu);
            if (isNaN(hTag)) {
                hNeu = hNeu.substr(1);
                hTag = parseInt(hNeu);
            }
            if (hTag <= 9) {
                hTag = '0' + hTag;
            }

            var i = hNeu.indexOf(' ');
            hNeu = hNeu.substr(i);

            var hMon = parseInt(hNeu);
            if (isNaN(hMon)) {
                hNeu = hNeu.substr(1);
                hMon = parseInt(hNeu);
            }
            if (isNaN(hMon)) {
                hNeu = hNeu.substr(1);
                hMon = parseInt(hNeu);
            }
            if (hMon <= 9) {
                hMon = '0' + hMon;
            }

            var i = hAlt.indexOf('.201');
            hNeu = hAlt.substr(i);

            hNeu = hAlt.substr(hAlt.lastIndexOf('.') + 1, 7);

            var hJahr = parseInt(hNeu);

            if (isNaN(hJahr)) {
                hNeu = hNeu.substr(1);
                hJahr = parseInt(hNeu);
            }
            if (isNaN(hJahr)) {
                hNeu = hNeu.substr(1);
                hJahr = parseInt(hNeu);
            }

            var i = hAlt.indexOf(' ') + 1;
            if (hAlt[i] >= '0' && hAlt[i] <= '9') {
                hStd = hAlt.substr(i, 5);
            } else {
                hStd = hAlt.substr(i, 9);
            }

            hStd = parseInt(hAlt.substr(i));
            if (isNaN(hStd)) {
                hStd = parseInt(hAlt.substr(i + 1));
            }
            if (hStd <= 9) {
                hStd = '0' + hStd;
            }

            var i = hAlt.indexOf(':') + 1;
            if (hAlt[i] >= '0' && hAlt[i] <= '9') {
                hMin = hAlt.substr(i, 5);
            } else {
                hMin = hAlt.substr(i, 9);
            }

            hMin = parseInt(hAlt.substr(i));
            if (isNaN(hMin)) {
                hMin = parseInt(hAlt.substr(i + 1));
            }
            if (hMin <= 9) {
                hMin = '0' + hMin;
            }

            var xTSTAMP = hJahr + '-' + hMon + '-' + hTag + ' ' + hMin + ':' + hStd;

            SPIELERext[spieler][spGEAENDERTam] = xTSTAMP;
        }
    }
}

function B_Clear() {
    'use strict';
    $('input[id=F_NR]').val('').css("color", "");
    $('input[id=F_NNAME]').val('').css("color", "");
    $('input[id=F_VNAME]').val('').css("color", "");
    $('input[id=F_ORT]').val('').css("color", "");
    if (hMeldung) {
        $("#fMeldung").html(hMeldung + '<b>Noch nicht gespeichert.</b>').css("color", "red");
    } else {
        $("#fMeldung").html('').css("color", "red");
    }
    $("#dListe").html("");
}

function onFinden() {
    'use strict';
    $.mobile.activePage.focus();

    var hNNAME, hVNAME, hORT;
    var nGefunden = 0;
    var cFarbe = '';
    var html = '<hr>';

    $('input[id=F_NR]').css("color", "");
    $('input[id=F_NNAME]').css("color", "");
    $('input[id=F_VNAME]').css("color", "");
    $('input[id=F_ORT]').css("color", "");
    $('#fMeldung').css("color", "red");

    var fNR = $("#F_NR").val();
    if (fNR === '') {
        fNR = 0;
        $('#F_NR').val("");
    }
    if (isNaN(fNR)) {
        if (fNR !== "") {
            $('input[id=F_NR]').css("color", "red");
            $('#fMeldung').html(' Bitte eine g&uuml;ltige Spielernummer eingeben.');
            return false;
        }
    } else {
        if (fNR != parseInt(fNR)) {
            $('input[id=F_NR]').css("color", "red");
            $('#fMeldung').html(' Bitte eine g&uuml;ltige Spielernummer eingeben.');
            return false;
        }
        $('input[id=F_NR]').css("color", "black");
        fNR = "0000" + fNR;
        fNR = fNR.substring((fNR.length - 4));
    }

    hNNAME = $.trim($('input[id=F_NNAME]').val());
//    if (hNNAME.length > 3) {
//        hNNAME = hNNAME.substr(0, 3);
//    }
    hNNAME = hNNAME.substr(0, 1).toUpperCase() + hNNAME.substr(1);
    $('input[id=F_NNAME]').val(hNNAME);
    var fNNAME = hNNAME.toUpperCase();

    hVNAME = $.trim($('input[id=F_VNAME]').val());
//    if (hVNAME.length > 3) {
//        hVNAME = hVNAME.substr(0, 3);
//    }
    hVNAME = hVNAME.substr(0, 1).toUpperCase() + hVNAME.substr(1);
    $('input[id=F_VNAME]').val(hVNAME);
    var fVNAME = hVNAME.toUpperCase();

    hORT = $.trim($('input[id=F_ORT]').val());
//    if (hORT.length > 3) {
//        hORT = hORT.substr(0, 3);
//    }
    hORT = hORT.substr(0, 1).toUpperCase() + hORT.substr(1);
    $('input[id=F_ORT]').val(hORT);
    var fORT = hORT.toUpperCase();

    $("#dListe").html('');

    var lVNAME = fVNAME.length;
    var lNNAME = fNNAME.length;
    var lORT = fORT.length;

    var nGefunden = 0;


    function getOrt(pOrt) {
        if (pOrt && pOrt.indexOf(',') > 0) {
            return pOrt.substr(0, pOrt.indexOf(','));
        } else {
            return pOrt;
        }
    }

    if (fNR !== "0000") {
        for (var spieler in SPIELER) {
            if (fNR === SPIELER[spieler][spNR]) {
                html += "&nbsp;&nbsp;" + SPIELER[spieler][spNR] + "&nbsp;&nbsp;<b>" + SPIELER[spieler][spNNAME] + " " + SPIELER[spieler][spVNAME] + "</b><br>"
                        + "&nbsp;&nbsp;" + getOrt(SPIELER[spieler][spORT]) + "<br><hr>";
                nGefunden++;
                break;
            }
        }
    } else if (lVNAME >= 1 || lNNAME >= 1 || lORT >= 1) {
        for (var spieler in SPIELER) {
            if ((lVNAME === 0 || SPIELER[spieler][spVNAME].substr(0, lVNAME).toUpperCase() === fVNAME)
                    && (lNNAME === 0 || SPIELER[spieler][spNNAME].substr(0, lNNAME).toUpperCase() === fNNAME)
                    && (lORT === 0 || SPIELER[spieler][spORT].substr(0, lORT).toUpperCase() === fORT)) {
                html += "&nbsp;&nbsp;" + SPIELER[spieler][spNR] + "&nbsp;&nbsp;<b>" + SPIELER[spieler][spNNAME] + " " + SPIELER[spieler][spVNAME] + "</b><br>"
                        + "&nbsp;&nbsp;" + getOrt(SPIELER[spieler][spORT]) + "<br><hr>";
                nGefunden++;
            }
        }
    } else if (lVNAME >= 1 || lNNAME >= 1 || lORT >= 1) {
        $('#fMeldung').text(' Welche/n Spieler willst du finden?');
        return false;
    }

    if (nGefunden) {
        $('#dListe').html(html);
    }

    if (nGefunden === 0) {
        $('#fMeldung').html(' Es gibt keinen Spieler mit diesen Kriterien.');
    } else {
        $('#fMeldung').html('&nbsp;' + nGefunden + ' Spieler gefunden.').css("color", "black");
    }

    $('html, body').animate({
        scrollTop: ($('#fMeldung').offset().top - $("#dHeader").height() - 8)
    }, 600);

    return false;
}

$(document).bind('pageinit', function () {
    'use strict';

    LS = JSON.parse(localStorage.getItem('Abakus.LS'));

    if (LS.ME !== "3425" && LS.ME !== "1000") {
        document.oncontextmenu = function () {
            return false; // oncontextmenu
        };
    }
    document.onselectstart = function () {
        return false;
    };

    SPIELER = JSON.parse(localStorage.getItem('Abakus.SPIELERalpha'));

//    loadSPIELER();
    whenSPIELERloaded();

    if ($(window).innerWidth() < $(window).innerHeight()) {
        $('#ui-block-a').width("1%");
        $('#ui-block-b').width("98%");
    }

});