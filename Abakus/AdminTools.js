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

    if (LS.ME === '3425'                              // Ich
            || CUPS.BEREadmin[51].indexOf(LS.ME) >= 0 // Administratoren
            || CUPS.BEREadmin[52].indexOf(LS.ME) >= 0
            || CUPS.BEREadmin[53].indexOf(LS.ME) >= 0
            || CUPS.BEREadmin[54].indexOf(LS.ME) >= 0
            || CUPS.BEREadmin[55].indexOf(LS.ME) >= 0
            || CUPS.BEREadmin[56].indexOf(LS.ME) >= 0) {
        $('#bTurnierkalender,#bSpielerverwaltung').removeClass('ui-disabled');
        if (PC) {
            $('#bSpielerExport').removeClass('ui-disabled');
        }
    }
    if (LS.ME === '4731'                                  // Alex Sabkovski
            || CUPS.BEREschreiben[51].indexOf(LS.ME) >= 0 // Administrator-Stellvertreter
            || CUPS.BEREschreiben[52].indexOf(LS.ME) >= 0
            || CUPS.BEREschreiben[53].indexOf(LS.ME) >= 0
            || CUPS.BEREschreiben[54].indexOf(LS.ME) >= 0
            || CUPS.BEREschreiben[55].indexOf(LS.ME) >= 0
            || CUPS.BEREschreiben[56].indexOf(LS.ME) >= 0) {
        $('#bTurnierkalender').removeClass('ui-disabled');
    }

    if (LS.ME === "3425" || LS.ME === "1000") {
        $('#dStatistikImport').removeClass('ui-disabled').show();
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