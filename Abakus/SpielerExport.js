
/* global firebase */

var FB = undefined;
var LS = new Object();

var SPIELERext = new Object();
var cCUP = '?';

const spANGELEGTvon = 20;
const spGEAENDERTvon = 22;

const tMonth = ['', 'Jan', 'Feb', 'Mrz', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];

var myJBox = null;

function whenSPIELERloaded() {
    'use strict';
    setTimeout(function () {
        hideEinenMoment();
    });
}

function downloadSpieler(pAktiv) {
    'use strict';

    showEinenMoment('Spieler Download:', 'Downloadfile wird erstellt!');

    var fName = 'SPIELER.csv';
    var blob = 'Nr.;Zuname;Vorname;Titel vor;Titel nach;Zusatz;Straße;PLZ;Ort;Festnetz;Mobil;Geburtsdatum;E-Mail;Geschlecht;Startort;Verstorben;Verzogen;Titel v. ign.;Titel n. ign.;;Angelegt am;Angelegt von;Geaendert am;Geaendert von;\n';
    var nSpieler = 0;

    for (var spieler in SPIELERext) {
//      if (pAktiv || typeof SPIELERext[spieler][spANGELEGTvon] === "string" || typeof SPIELERext[spieler][spGEAENDERTvon] === "string") {
        if (pAktiv && (LS.ME === "x3425" || SPIELERext[spieler][18] && SPIELERext[spieler][18].indexOf(cCUP) >= 0)
                || !pAktiv && (SPIELERext[spieler][spANGELEGTvon] || SPIELERext[spieler][spGEAENDERTvon])) {
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
        console.log('' + pGEBDAT.substr(8, 2) + '-' + tMonth[parseInt(pGEBDAT.substr(5, 2))] + '-' + pGEBDAT.substr(2, 2));
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
    } else {
        $('#bDownloadFuerKarlHaas').removeClass('ui-disabled');
    }
    document.onselectstart = function () {
        return false;
    };

    firebase.initDB(0, 'admin');

    if (true) {
        loadSPIELER();
    } else {
        SPIELERext = JSON.parse(localStorage.getItem('Abakus.SPIELERext'));
        whenSPIELERloaded();
    }

    window.onerror = function (msg, url, line, col, error) {
        'use strict';
        console.log(msg + ' url=' + url + ' line=' + line + ', col=' + col + ', error=' + error + '.');
        alert(msg + ' url=' + url + ' line=' + line + ', col=' + col + ', error=' + error + '.');
        return false;
    };

});

window.onbeforeunload = function (e) {
    $('#main').addClass('ui-disabled');
};