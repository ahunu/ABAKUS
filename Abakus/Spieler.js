
var FB = undefined;
var LS = new Object();
var SPIELERext = new Object();

var myJBox = null;

var hThisSession = new Date().toLocaleString();

var I = 0;
var iNR = 0;
var hNeu = false;

var SORT = []; // Sort Stammspieler

nGeaendert = 0;
hMeldung = '';

const spNNAME = 0;
const spVNAME = 1;
const spTITEL1 = 2;
const spTITEL2 = 3;
const spZUSATZ = 4;
const spSTRASSE = 5;
const spPLZ = 6;
const spORT = 7;
const spFESTNETZ = 8;
const spTELEFON = 9;
const spGEBDAT = 10;
const spEMAIL = 11;
const spSCHALTER = 12;
const spSTARTORT = 13;
const spAKTIV = 14;
const spANGELEGTam = 15;
const spANGELEGTvon = 16;
const spGEAENDERTam = 17;
const spGEAENDERTvon = 18;

var hAlt = hNeu = '';

function whenSPIELERloaded() {
    return;
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
        if (SPIELERext[fNR]) {
            html += "&nbsp;&nbsp;" + fNR + "&nbsp;&nbsp;<b>" + SPIELERext[fNR][spNNAME] + " " + SPIELERext[fNR][spVNAME] + "</b><br>"
                    + "&nbsp;&nbsp;" + getOrt(SPIELERext[fNR][spORT]) + "<br><hr>";
            nGefunden++;
        }
    } else if (lVNAME >= 1 || lNNAME >= 1 || lORT >= 1) {
        for (var spieler in SPIELERext) {
            if ((lVNAME === 0 || SPIELERext[spieler][spVNAME].substr(0, lVNAME).toUpperCase() === fVNAME)
                    && (lNNAME === 0 || SPIELERext[spieler][spNNAME].substr(0, lNNAME).toUpperCase() === fNNAME)
                    && (lORT === 0 || SPIELERext[spieler][spORT].substr(0, lORT).toUpperCase() === fORT)) {
                html += "&nbsp;&nbsp;" + spieler + "&nbsp;&nbsp;<b>" + SPIELERext[spieler][spNNAME] + " " + SPIELERext[spieler][spVNAME] + "</b><br>"
                        + "&nbsp;&nbsp;" + getOrt(SPIELERext[spieler][spORT]) + "<br><hr>";
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

    if (LS.ME !== "3425") {
        document.oncontextmenu = function () {
            return false; // oncontextmenu
        };
    }
    document.onselectstart = function () {
        return false;
    };

    SPIELERext = JSON.parse(localStorage.getItem('Abakus.SPIELERextalpha'));

    loadSPIELER();
//    whenSPIELERextloaded();

    if ($(window).innerWidth() < $(window).innerHeight()) {
        $('#ui-block-a').width("1%");
        $('#ui-block-b').width("98%");
    }

});