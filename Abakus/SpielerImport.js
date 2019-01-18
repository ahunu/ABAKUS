
/* global firebase */
var FB = undefined;
var LS = new Object();
var xSPIELERext = {};

var SPIELERext = {"1000": ["Schiefer", "Alfred", "", "", "", "Rambach 32", "4591", "Molln", "07584/2063", "", "1944-06-17", "", "m", "Molln", false, false, false, false],
    "1001": ["Steiner", "Eduard", "", "", "", "Haushoferstraße 16", "4591", "Molln", "07584/2052", "", "1964-04-18", "", "m", "Molln", false, false, false, false],
    "1021": ["Riedl", "Franz", "", "", "", "Forsterreith 9", "4890", "Pfaffing", "07682/5064", "", "1957-01-11", "", "m", "Frankenmarkt", false, false, false, false],
    "1022": ["Tritscha", "Ingeborg", "", "", "", "Schopperstraße 23", "5020", "Salzburg", "0662/647914", "", "1938-01-26", "", "w", "Salzburg", false, true, false, false]};

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
const spGESCHLECHT = 12;
const spSTARTORT = 13;
const spVERSTORBEN = 14;
const spVERZOGEN = 15;
const spTITEL1IGN = 16;
const spTITEL2IGN = 17;
const spAKTIV = 18;
const spANGELEGTam = 19;
const spANGELEGTvon = 20;
const spGEAENDERTam = 21;
const spGEAENDERTvon = 22;

var nSpieler = 0;
var iCup = 0;
const tTitel = ['Nr.',
    'Zuname',
    'Vorname',
    'Titel vor',
    'Titel nach',
    'Zusatz',
    'Straße',
    'PLZ',
    'Ort',
    'Festnetz',
    'Mobil',
    'Geburtsdatum',
    'E-Mail',
    'Geschlecht',
    'Startort',
    'Verstorben',
    'Verzogen',
    'Titel v. ign.',
    'Titel n. ign.',
    'Letzte Aktualisierung'];
var myJBox = null;

String.prototype.splitCSV = function (sep) {
    for (var foo = this.split(sep = sep || ";"), x = foo.length - 1, tl; x >= 0; x--) {
        if (foo[x].replace(/"\s+$/, '"').charAt(foo[x].length - 1) === '"') {
            if ((tl = foo[x].replace(/^\s+"/, '"')).length > 1 && tl.charAt(0) === '"') {
                foo[x] = foo[x].replace(/^\s*"|"\s*$/g, '').replace(/""/g, '"');
            } else if (x) {
                foo.splice(x - 1, 2, [foo[x - 1], foo[x]].join(sep));
            } else
                foo = foo.shift().split(sep).concat(foo);
        } else
            foo[x].replace(/""/g, '"');
    }
    return foo;
};

function checkSpieler(pNR, pNNAME, pVNAME, pORT, p1) {

    nSpieler++;
    if (i % 20 === 1) {
        $("table#tSpieler tbody")
                .append('<tr><th class=TR>S:' + pNR + '&nbsp;&nbsp;&nbsp;</th><td>' + pNNAME + ' ' + pVNAME + '</td><td>' + pORT + '</td><td></td></tr>')
                .closest("table#tSpieler")
                .table("refresh")
                .trigger("create");
    }

    SPIELERext[("000" + parseInt(pNR)).slice(-4)] = [// Spielernummer
        pNNAME, // Familienname
        pVNAME, // Vorname
        '', // Titel
        '', // Strasse
        pORT, // Ort
        '', // PLZ
        '', // Telefon
        '', // Handy
        '', // Geburtsdatum
        '', // E-Mail
        'm', // Geschlecht (männlich)
        '', // Standort
        false // Verstorben
    ];
}


function getGEBDAT(pGEBDAT) {
    if (pGEBDAT > '00' && pGEBDAT < '32') {
        var hGEBDAT = "19" + pGEBDAT.substr(7, 2);
        switch (pGEBDAT.substr(3, 3)) {
            case 'Jan' :
                hGEBDAT += '-01-';
                break;
            case 'Feb' :
                hGEBDAT += '-02-';
                break;
            case 'Mrz' :
                hGEBDAT += '-03-';
                break;
            case 'Apr' :
                hGEBDAT += '-04-';
                break;
            case 'Mai' :
                hGEBDAT += '-05-';
                break;
            case 'Jun' :
                hGEBDAT += '-06-';
                break;
            case 'Jul' :
                hGEBDAT += '-07-';
                break;
            case 'Aug' :
                hGEBDAT += '-08-';
                break;
            case 'Sep' :
                hGEBDAT += '-09-';
                break;
            case 'Okt' :
                hGEBDAT += '-10-';
                break;
            case 'Nov' :
                hGEBDAT += '-11-';
                break;
            case 'Dez' :
                hGEBDAT += '-12-';
                break;
            default:
                hGEBDAT += '??' + pGEBDAT.substr(3, 3) + '??';
        }
        return hGEBDAT += pGEBDAT.substr(0, 2);
    } else {
        return '';
    }
}

function handleFiles(files) {
// Check for the various File API support.
    if (window.FileReader) {
// FileReader are supported.
        getAsText(files[0]);
    } else {
        alert('FileReader are not supported in this browser.');
    }
}

function getAsText(fileToRead) {
    var reader = new FileReader();
    // Handle errors load
    reader.onload = loadHandler;
    reader.onerror = errorHandler;
    // Read file into memory as UTF-8
    reader.readAsText(fileToRead, 'ISO-8859-4');
}

function loadHandler(event) {
    var csv = event.target.result;
    processData(csv);
}


function getOrtStrasse(pOrt, pStrasse) {

    if (pStrasse) {
        if (pStrasse.indexOf(' 0') > 0) {
            pStrasse = pStrasse.substr(0, pStrasse.indexOf(' 0'));
        }
        if (pStrasse.indexOf(' 1') > 0) {
            pStrasse = pStrasse.substr(0, pStrasse.indexOf(' 1'));
        }
        if (pStrasse.indexOf(' 2') > 0) {
            pStrasse = pStrasse.substr(0, pStrasse.indexOf(' 2'));
        }
        if (pStrasse.indexOf(' 3') > 0) {
            pStrasse = pStrasse.substr(0, pStrasse.indexOf(' 3'));
        }
        if (pStrasse.indexOf(' 4') > 0) {
            pStrasse = pStrasse.substr(0, pStrasse.indexOf(' 4'));
        }
        if (pStrasse.indexOf(' 5') > 0) {
            pStrasse = pStrasse.substr(0, pStrasse.indexOf(' 5'));
        }
        if (pStrasse.indexOf(' 6') > 0) {
            pStrasse = pStrasse.substr(0, pStrasse.indexOf(' 6'));
        }
        if (pStrasse.indexOf(' 7') > 0) {
            pStrasse = pStrasse.substr(0, pStrasse.indexOf(' 7'));
        }
        if (pStrasse.indexOf(' 8') > 0) {
            pStrasse = pStrasse.substr(0, pStrasse.indexOf(' 8'));
        }
        if (pStrasse.indexOf(' 9') > 0) {
            pStrasse = pStrasse.substr(0, pStrasse.indexOf(' 9'));
        }
        return pOrt + ', ' + pStrasse;
    } else {
        return pOrt;
    }
}

function processData(csv) {
    var aCSV = csv.split(/\r\n|\n/);
    if (aCSV.length < 4000) {
        $('#tMeldung').html('Dateien im Format CSV(MS-Dos) und CSV(Macintosh)<br>'
                + 'können nicht verarbeitet werden.<br>'
                + '<b>Speichere die Datei im Fomat CSV(Trennzeichen-getrennt)<br>'
                + 'und wiederhole den Vorgang.</b>')
                .show();
        return;
    }

    var zeile = [];
    $("#tSpieler").show();
    zeile = aCSV[0].splitCSV(';'); // Headerzeile lesen

    if (zeile[20]) {
        $('#tMeldung').html('<b class=cRot>Diese Spielerdatei wurde auf mehr als 19 Spalten erweitert.'
                + '<br>Darauf ist dieses Programm nicht vorbereitet.</b>')
                .show();
        return;
    }
    for (i = 0; i < 20; i++) {     // Headerzeile prüfen
        if (zeile[i] !== tTitel[i]) {
            $('#tMeldung').html('<b class=cRot>Diese Datei ist leider inkompatibel.'
                    + '<br>In Spalte ' + (i + 1) + ' wird das Feld "' + tTitel[i] + '" erwartet.</b>')
                    .show();
            return;
        }
    }

    for (i = 1; i < aCSV.length; i++) {
        zeile = aCSV[i].splitCSV(';');
        if (zeile[0] && zeile[1] !== '.leer.') { // Nachname
            nSpieler++;
            if (i % 500 === 1) {
                $("table#tSpieler tbody")
                        .append('<tr><th class=TR>' + zeile[0] + '&nbsp;&nbsp;&nbsp;</th><td>' + zeile[1] + ' ' + zeile[2] + '</td><td>' + zeile[6] + ' ' + zeile[5] + '</td><td>' + zeile[4] + '</td></tr>')
                        .closest("table#tSpieler")
                        .table("refresh")
                        .trigger("create");
            }

            SPIELERext[("000" + parseInt(zeile[0])).slice(-4)] = [// Spielernummer
                zeile[1], // Familienname
                zeile[2], // Vorname
                zeile[3], // Titel1
                zeile[4], // Titel2
                zeile[5], // Zusatz
                zeile[6], // Strasse
                zeile[7], // Ort
                zeile[8], // PLZ
                zeile[9], // Telefon
                zeile[10], // Handy
                getGEBDAT(zeile[11]), // Geburtsdatum
                zeile[12], // E-Mail
                (zeile[13] === 'weiblich' ? 'w' : 'm'), // Geschlecht (männlich)
                zeile[14], // Startort
                (zeile[15] === 'WAHR' ? true : false), // Verstorben
                (zeile[16] === 'WAHR' ? true : false), // Verzogen
                (zeile[17] === 'WAHR' ? true : false), // Titel1 ignorieren
                (zeile[18] === 'WAHR' ? true : false) // Titel2 ingnorieren
            ];
        }
    }

    $("#stBody th,td").attr('style', 'padding:.03em;');
    $(".TR").attr('style', 'padding:.03em;text-align:right;');
    $("table#tSpieler tbody")
            .append('<tr><th></td><th>. . .</th><td></td><td></td></tr>')
            .closest("table#tSpieler")
            .table("refresh")
            .trigger("create");
    $('#tMeldung').html('Es wurden<b> ' + nSpieler + ' </b>Spieler eingelesen.')
            .show();
    $('#bFileCSV').addClass('ui-disabled');
    $('#bSpeichern').removeClass('ui-disabled');
}

function errorHandler(evt) {
    if (evt.target.error.name === "NotReadableError") {
        alert("Canno't read file !");
    }
}

function Speichern() {

    function getSPIELERnr(pSpieler) {
        return [
            SPIELERext[pSpieler][spNNAME],
            SPIELERext[pSpieler][spVNAME],
            getOrtStrasse(SPIELERext[pSpieler][spORT], SPIELERext[pSpieler][spSTRASSE]),
            SPIELERext[pSpieler][spSTARTORT],
            SPIELERext[pSpieler][spVERSTORBEN],
            SPIELERext[pSpieler][spAKTIV] ? SPIELERext[pSpieler][spAKTIV] : ''
        ];
    }

    showEinenMoment('ABAKUS:', nSpieler + ' Spieler werden gespeichert.');
    firebase.database().ref('/00')
            .update({
                Spieler: {
                    SPIELERext: SPIELERext,
                    IMPORTam: new Date().toLocaleString(),
                    IMPORTvon: LS.ME
                }
            })
            .then(function () {
                var SPIELERnr = {};
                var SPIELERalpha = [];
                for (var spieler in SPIELERext) {
                    SPIELERnr[spieler] = getSPIELERnr(spieler);
                    if (!SPIELERext[spieler][spVERSTORBEN]) {
                        SPIELERalpha[SPIELERalpha.length] = [
                            spieler, // Spielernummer
                            SPIELERext[spieler][spNNAME],
                            SPIELERext[spieler][spVNAME],
                            getOrtStrasse(SPIELERext[spieler][spORT], SPIELERext[spieler][spSTRASSE]), // Ort + Strasse
                            SPIELERext[spieler][spAKTIV] ? SPIELERext[spieler][spAKTIV] : ''
                        ];
                    }
                    function Comparator(a, b) {
                        if (a[1] < b[1] || a[1] === b[1] && a[2] < b[2])
                            return -1;
                        if (a[1] > b[1] || a[1] === b[1] && a[2] > b[2])
                            return 1;
                        return 0;
                    }
                    SPIELERalpha.sort(Comparator);
                }
                firebase.database().ref('/00/CUPS')
                        .update({
                            SPIELERnr: SPIELERnr
                        })
                        .then(function () {
                            hideEinenMoment();
                            LS.Meldung = (nSpieler + ' Spieler wurden eingespielt!');
                            localStorage.setItem('Abakus.LS', JSON.stringify(LS));
                            localStorage.setItem('Abakus.SPIELERnr', JSON.stringify(SPIELERnr));
                            localStorage.setItem('Abakus.SPIELERalpha', JSON.stringify(SPIELERalpha));
                            window.history.back();
                        })
                        .catch(function (error) {
                            showEineDBWarnung(error, 'Update CUPS/SPIELER:');
                        });
            })
            .catch(function (error) {
                showEineDBWarnung(error, 'Update SPIELER:');
            });
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
    firebase.initDB(0, 'admin');
    if (LS.ME === "3425") {
        iCup = 51;
    }
    if (/iPad|iPhone/.test(navigator.userAgent)) {
        window.onbeforeunload = function (event) {
            $('body').addClass('ui-disabled');
        };
    }
});