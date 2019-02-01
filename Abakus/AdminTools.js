/*jslint browser: true, plusplus: true, vars: true */
/*global $, jQuery, Parse, CUP, CUPS, LS, console, spNext, initSTAT*/

var PC = false;
var LS = new Object();
var CUPS = new Object();

var myJBox = null;

// R E A D Y  ************************************************************************************
$(document).ready(function () {

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

    LS = JSON.parse(localStorage.getItem('Abakus.LS'));
    CUPS = JSON.parse(localStorage.getItem('Abakus.CUPS'));

    if (LS.ME === "3425" || LS.ME === "1000"
            || LS.ME === '3484' || LS.ME === '3590'     // Brigitta Hainz, Hans Hafner
            || LS.ME === '3244' || LS.ME === '4506' || LS.ME === '1014' || LS.ME === '0124') { // Markus Mair, Sepp Lang, Franz Kienast, Harl Haas jun.
        $('#bTurnierkalender,#bSpielerAendern').removeClass('ui-disabled');
        if (PC) {
            $('#bSpielerExport').removeClass('ui-disabled');
        }
    } else if (LS.ME === '4731') { // Alex Sabkovski
        $('#bTurnierkalender').removeClass('ui-disabled');
    }

    if (LS.ME === "3425" || LS.ME === "1000" || LS.ME === "3484") { // Brigitta Hainz
        $('#dStatistikImport').removeClass('ui-disabled').show();
    }

    if (LS.ME === "3425" || LS.ME === "1000") {
        $('#dSpielerImport').removeClass('ui-disabled').show();
    }

    var hDate = new Date(CUPS.TIMESTAMP);
    $('#tSystemfreigabe').html('Von ' + hDate.toLocaleDateString() + ' bis 31.12.' + hDate.getFullYear() + ' freigegeben.');

    if (LS.ME !== "3425" && LS.ME !== "1000") {
        document.oncontextmenu = function () {
            return false; // oncontextmenu
        };
    }
    document.onselectstart = function () {
        return false;
    };
});