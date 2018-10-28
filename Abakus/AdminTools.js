/*jslint browser: true, plusplus: true, vars: true */
/*global $, jQuery, Parse, CUP, CUPS, LS, console, spNext, initSTAT*/

var PC = false;
var FB = undefined;
var STAT = new Object();
var SPIELER = new Object(); // Spieler werden in whenSTATloaded ergänzt
var I = 0;

var time2Check = false;
var AnmeldungGestartet = false;
var iTURCODE = 0;

var iPfad = '../Icons/';
var rPfad = '../';
var mTischTurnier = '';

var myJBox = null;

// R E A D Y  ************************************************************************************
$(document).ready(function () {

    if (navigator.platform.match(/(Win|Mac|Linux)/i)) {
        PC = true;
    } else {
        PC = false;
    }

    if (window.chrome) {
        if (window.chrome.webstore) {
// OK
        } else {
            PC = false;
        }
    } else {
        PC = false;
    }

    LS = JSON.parse(localStorage.getItem('Abakus.LS'));
    if (LS.ME === '3244' || LS.ME === '4506' || LS.ME === '1014') { // Markus Mair, Sepp Lang, Franz Kienast
        $('#bTurnierkalender,#bSpielerAendern').removeClass('ui-disabled');
        if (PC) {
            $('#bSpielerExport').removeClass('ui-disabled');
        }
    } else if (LS.ME === '4731') { // Alex Sabkovski
        $('#bTurnierkalender').removeClass('ui-disabled');
    } else if (LS.ME === "3425" || LS.ME === "1000") {
        $('#dGOOD').show();
        $('.cHEIKEL').removeClass('ui-disabled');
    }

    if (LS.ME !== "3425" && LS.ME !== "1000") {
        document.oncontextmenu = function () {
            return false; // oncontextmenu
        };
    }
    document.onselectstart = function () {
        return false;
    };
});
window.onerror = function (msg, url, line, col, error) {
    console.log('msg: ' + msg + ', url: ' + url + ', line: ' + line + ' error: ' + error);
    if (url !== '' || line !== 0) {
        alert(msg + ' url=' + url + ' line=' + line + ', col=' + col + ', error=' + error + '.');
    }
    return false;
};
window.onbeforeunload = function (e) {
    $('.onExit').addClass('ui-disabled');
};