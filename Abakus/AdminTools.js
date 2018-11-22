/*jslint browser: true, plusplus: true, vars: true */
/*global $, jQuery, Parse, CUP, CUPS, LS, console, spNext, initSTAT*/

var PC = false;
var LS = new Object();
var CUPS = new Object();

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
    CUPS = JSON.parse(localStorage.getItem('Abakus.CUPS'));

    if (LS.ME !== '3244' && LS.ME !== '4731' && LS.ME !== '2553' && LS.ME !== '3590') { // Markus Mair, Alex Sabkovski, Arno Peter, Hans Hafner
        $('.cHEIKEL').removeClass('ui-disabled');
    } else if (LS.ME === '3244' || LS.ME === '4506' || LS.ME === '1014') { // Markus Mair, Sepp Lang, Franz Kienast
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

    var hDate = new Date(CUPS.TIMESTAMP);
    $('#tSystemfreigabe').html('Das System ist für den Zeitraum<br>'
            + 'vom ' + hDate.toLocaleDateString() + ' bis 31.12.' + hDate.getFullYear() + ' freigegeben.');

    if (LS.ME !== "3425" && LS.ME !== "1000") {
        document.oncontextmenu = function () {
            return false; // oncontextmenu
        };
    }
    document.onselectstart = function () {
        return false;
    };
});
window.onbeforeunload = function (e) {
    $('.onExit').addClass('ui-disabled');
};