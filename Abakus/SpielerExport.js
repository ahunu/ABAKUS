
/* global firebase */

var FB = undefined;

var LS = new Object();
var CUPS = new Object();
var SPIELERext = new Object();

var kzAktiv = '?';

const spANGELEGTvon = 20;
const spGEAENDERTvon = 22;

const spANGELEGTam = 19;
const spGEAENDERTam = 21;

const tMonth = ['', 'Jan', 'Feb', 'Mrz', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];

var myJBox = null;

const dHeute = new Date();

function whenSPIELERloaded() {
    'use strict';
    setTimeout(function () {
        hideEinenMoment();
    });
}

function downloadSpieler(pAktiv) {
    'use strict';

    showEinenMoment('Spieler Download:', 'Downloadfile wird erstellt!');

    var fName = '';

    if (pAktiv) {
        if (pAktiv === '*') {
            fName = 'SPIELER (alle).csv';
        } else {
            fName = 'SPIELER (aktive).csv';
        }
    } else {
        fName = 'SPIELER (neue oder geänderte).csv';

        var iDATUM = $('#iDATUM').val();
        if (iDATUM === "") {
            showEinenFehler('Ab wann?', 'Ab wann soll downgeloaded werden?');
            return;
        }

        iDATUM = new Date(iDATUM);
        if (iDATUM > dHeute) {
            showEinenFehler('Ab wann?', 'Das Datum darf nicht in der Zukunft liegen!');
            return;
        }
    }

    var blob = 'Nr.;Zuname;Vorname;Titel vor;Titel nach;Zusatz;Straße;PLZ;Ort;Festnetz;Mobil;Geburtsdatum;E-Mail;Geschlecht;Startort;Verstorben;Verzogen;Titel v. ign.;Titel n. ign.;;Angelegt am;Angelegt von;Geaendert am;Geaendert von;\n';
    var nSpieler = 0;

    for (var spieler in SPIELERext) {
        if (pAktiv && pAktiv === '*'
                || pAktiv && SPIELERext[spieler][18] && SPIELERext[spieler][18].indexOf(kzAktiv) >= 0
                || !pAktiv && (SPIELERext[spieler][spANGELEGTam] && new Date(SPIELERext[spieler][spANGELEGTam]) >= iDATUM
                        || SPIELERext[spieler][spGEAENDERTam] && new Date(SPIELERext[spieler][spGEAENDERTam]) >= iDATUM)) {
            nSpieler++;
            blob += spieler + ';'
                    + SPIELERext[spieler][0] + ';'  // Familienname
                    + SPIELERext[spieler][1] + ';'  // Vorname
                    + SPIELERext[spieler][2] + ';'  // Titel1
                    + SPIELERext[spieler][3] + ';'  // Titel2
                    + SPIELERext[spieler][4] + ';'  // Zusatz
                    + SPIELERext[spieler][5] + ';'  // Strasse
                    + SPIELERext[spieler][6] + ';'  // Ort
                    + SPIELERext[spieler][7] + ';'  // PLZ
                    + SPIELERext[spieler][8] + ';'  // Telefon
                    + SPIELERext[spieler][9] + ';'  // Handy
                    + (getGEBDAT(SPIELERext[spieler][10])) + ';' // Geburtsdatum
                    + SPIELERext[spieler][11] + ';'  // eMail
                    + (SPIELERext[spieler][12] === 'w' ? 'weiblich' : 'männlich') + ';' // Geschlecht (männlich)
                    + SPIELERext[spieler][13] + ';'  // Startort
                    + (SPIELERext[spieler][14] ? 'WAHR' : 'FALSCH') + ';' // Verstorben
                    + (SPIELERext[spieler][15] ? 'WAHR' : 'FALSCH') + ';' // Verzogen
                    + (SPIELERext[spieler][16] ? 'WAHR' : 'FALSCH') + ';' // Titel1 ignorieren
                    + (SPIELERext[spieler][17] ? 'WAHR' : 'FALSCH') + ';' // Titel2 ingnorieren
//                  + ";"                                                 // aktiv
                    + (SPIELERext[spieler][18] ? SPIELERext[spieler][18] : '') + ';' // Angelegt am
                    + (SPIELERext[spieler][19] ? SPIELERext[spieler][19] : '') + ';' // Angelegt am
                    + (SPIELERext[spieler][20] ? SPIELERext[spieler][20] : '') + ';' // Angelegt von
                    + (SPIELERext[spieler][21] ? SPIELERext[spieler][21] : '') + ';' // Geaendert am
                    + (SPIELERext[spieler][22] ? SPIELERext[spieler][22] : '') + ';\n'; // Geaendert von
        }
    }

    $('#tMeldung').text('Es werden ' + nSpieler + ' Spieler exportiert.');

    saveAs(new Blob([blob], {type: "text/plain;charset=utf-8"}), fName);

    hideEinenMoment();

    $('#tMeldung').text('Es wurden ' + nSpieler + ' Spieler exportiert.');

}


function getGEBDAT(pGEBDAT) {
    return pGEBDAT; // Da EXCEL "20-Sep-55" in CSV-Dateien als 20. Sep 55 interpretiert wird, keine Konvertierung.
    if (pGEBDAT) {
        return '' + pGEBDAT.substr(8, 2) + '-' + tMonth[parseInt(pGEBDAT.substr(5, 2))] + '-' + pGEBDAT.substr(2, 2);
    } else {
        return '';
    }
}

$(document).bind('pageinit', function () {
    'use strict';

    LS = JSON.parse(localStorage.getItem('Abakus.LS'));

    if (LS.ME !== "3425" && LS.ME !== "1000") {
        document.oncontextmenu = function () {
            return false; // oncontextmenu
        };
    }

    if (LS.ME === "3425" || LS.ME === "1014" || LS.ME === "0124") { // Franz Kienast, Karl Haas jun.
        $('#bDownloadAlleSpieler,#bDownloadFuerKarlHaas').removeClass('ui-disabled');
    }

    CUPS = JSON.parse(localStorage.getItem('Abakus.CUPS'));
    if (LS.ME === '3425') { // Leo Luger
        kzAktiv = 'W';
    } else if (LS.ME === "-51" || CUPS.BEREadmin[51].indexOf(LS.ME) >= 0) { // Franz Kienast
        kzAktiv = 'H';
    } else if (LS.ME === "-52" || CUPS.BEREadmin[52].indexOf(LS.ME) >= 0) { // Karl Haas
        kzAktiv = 'R';
    } else if (LS.ME === "-53" || CUPS.BEREadmin[53].indexOf(LS.ME) >= 0) { // Sepp Lang
        kzAktiv = 'S';
    } else if (LS.ME === "-54" || CUPS.BEREadmin[54].indexOf(LS.ME) >= 0) { // Hans Hafner
        kzAktiv = 'G';
    } else if (LS.ME === "-55" || CUPS.BEREadmin[55].indexOf(LS.ME) >= 0) { // Markus Mair
        kzAktiv = 'T';
    } else if (LS.ME === "-56" || CUPS.BEREadmin[56].indexOf(LS.ME) >= 0) { // Erwin Haider
        kzAktiv = 'W';
    }

    document.onselectstart = function () {
        return false;
    };

    if (dHeute.getMonth() > 3) {
        $('#iDATUM').val(dHeute.getFullYear() + '-03-01');
    } else {
        $('#iDATUM').val((dHeute.getFullYear() - 1) + '-03-01');
    }
    firebase.initDB(0);

    if (true) {
        loadSPIELER();
    } else {
        SPIELERext = JSON.parse(localStorage.getItem('Abakus.SPIELERext'));
        whenSPIELERloaded();
    }

    if (/iPad|iPhone/.test(navigator.userAgent)) {
        window.onbeforeunload = function (event) {
            $('body').addClass('ui-disabled');
        };
    }

});