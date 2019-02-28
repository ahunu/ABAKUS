
/* global firebase, DATA, cCUP, sCUP3 */

var FB = undefined;
var LS = new Object();
var SPIELER = new Object();
var nTurniere = 0;
var sCup3 = '';
var tDATUM = [];
var DATA = {};
var myJBox = null;

var hDatMin = '9999';
var hDatMax = '0000';
var iFrom = 0;

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

function handleCUPORTE(files) {
    // Check for the various File API support.
    if (window.FileReader) {
        var reader = new FileReader();
        // Handle errors load
        reader.onload = readCUPORTE;
        reader.onerror = errorHandler;
        // Read file into memory as UTF-8
        reader.readAsText(files[0], 'utf-8');
    } else {
        alert('FileReader are not supported in this browser.');
    }
}

function readCUPORTE(event) {
    var csv = event.target.result;
    var aCSV = csv.split(/\r\n|\n/);
    var hDatum = '';
    if (aCSV.length > 60) {
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
    if (zeile[0] === "Ortnummer" || zeile[1] === "Spielort") {
        iFrom = 1;
    } else {
        zeile = aCSV[1].splitCSV(';'); // Headerzeile lesen
        if (zeile[0] === "Ortnummer" || zeile[1] === "Spielort") {
            iFrom = 2;
        } else {
            $('#tMeldung').html('<b class=cRot>Dies ist keine CUPORTE-Datei.</b>')
                    .show();
            return;
        }
    }

    for (i = iFrom; i < aCSV.length; i++) {
        zeile = aCSV[i].splitCSV(';');
        if (zeile[1]) { // Turnier
            nTurniere++;
            hDatum = zeile[3].substr(-4);
            if (hDatMin > hDatum)
                hDatMin = hDatum;
            if (hDatMax < hDatum)
                hDatMax = hDatum;
            if (zeile[3].indexOf('Ja') > 0) {
                hDatum += '-01-';
            } else if (zeile[3].indexOf('Feb') > 0) {
                hDatum += '-02-';
            } else if (zeile[3].indexOf('rz') > 0) {
                hDatum += '-03-';
            } else if (zeile[3].indexOf('Apri') > 0) {
                hDatum += '-04-';
            } else if (zeile[3].indexOf('Mai') > 0) {
                hDatum += '-05-';
            } else if (zeile[3].indexOf('Jun') > 0) {
                hDatum += '-06-';
            } else if (zeile[3].indexOf('Jul') > 0) {
                hDatum += '-07-';
            } else if (zeile[3].indexOf('Aug') > 0) {
                hDatum += '-08-';
            } else if (zeile[3].indexOf('Sep') > 0) {
                hDatum += '-09-';
            } else if (zeile[3].indexOf('Okt') > 0) {
                hDatum += '-10-';
            } else if (zeile[3].indexOf('Nov') > 0) {
                hDatum += '-11-';
            } else if (zeile[3].indexOf('Dez') > 0) {
                hDatum += '-12-';
            } else {
                hDatum += '-??-';
            }
            hDatum += ('00' + parseInt(zeile[3].substr(zeile[3].indexOf(',') + 2))).substr(-2);
            I = parseInt(zeile[0]);
            tDATUM[I] = hDatum;
            $("table#tSpieler tbody")
                    .append('<tr><th class=TR>' + zeile[0] + '&nbsp;&nbsp;&nbsp;</th><td>' + hDatum + '</td><td><input  id=iN' + I + ' data-role="none" style="width:20em" value="' + zeile[1] + '"></td><td><input type="number"  id=iV' + I + ' onchange="changeV(' + I + ');" data-role="none" style="width:4em" value="' + zeile[7] + '">&nbsp;&nbsp;<span id="tV' + I + '" class="cRot"></span></td><td id=tdTN' + I + ' class=TR>' + I + '&nbsp;</td></tr>')
                    .closest("table#tSpieler")
                    .table("refresh")
                    .trigger("create");
        }
    }

    $("#stBody th,td").attr('style', 'padding:.03em;');
    $(".TR").attr('style', 'padding:.03em;text-align:right;');
    $('#tMeldung').html('Es wurden<b> ' + nTurniere + ' </b>Turniere eingelesen.')
            .show();
    $('#fCUPORTE').addClass('ui-disabled');
    $('#fCUPWERTUNG').removeClass('ui-disabled');
}

function changeV(pI) {
    var iVERANSTALTER = parseInt($('#iV' + pI).val());
    if (!iVERANSTALTER || iVERANSTALTER < -2 || iVERANSTALTER > 9999) {
        $('#tV' + pI).html(iVERANSTALTER + ' ist kein g&uuml;tige Spielernummmer.').addClass('cRot');
        return;
    }
    iVERANSTALTER = "0000" + iVERANSTALTER;
    iVERANSTALTER = iVERANSTALTER.substring((iVERANSTALTER.length - 4));
    if (iVERANSTALTER === '00-1') {
        iVERANSTALTER === '-1';
        $('#tV' + pI).html('Präsidium').removeClass('cRot');
    } else if (iVERANSTALTER === '00-2') {
        iVERANSTALTER === '-2';
        $('#tV' + pI).html('alle Veranstalter').removeClass('cRot');
    } else if (SPIELER[iVERANSTALTER]) {
        $('#tV' + pI).text(SPIELER[iVERANSTALTER][0] + ' ' + SPIELER[iVERANSTALTER][1]).removeClass('cRot');
    } else {
        $('#tV' + pI).text('Spieler ' + iVERANSTALTER + ' existiert nicht.').addClass('cRot');
    }
}

function handleCUPWERTUNG(files) {
// Check for the various File API support.
    if (window.FileReader) {
        var reader = new FileReader();
        // Handle errors load
        reader.onload = readCUPWERTUNG;
        reader.onerror = errorHandler;
        // Read file into memory as UTF-8
        reader.readAsText(files[0], 'utf-8');
    } else {
        alert('FileReader are not supported in this browser.');
    }
}

function readCUPWERTUNG(event) {
    var csv = event.target.result;
    var aCSV = csv.split(/\r\n|\n/);
    var hDatum = '';
    if (aCSV.length > 10000) {
        $('#tMeldung').html('Dateien im Format CSV(MS-Dos) und CSV(Macintosh)<br>'
                + 'können nicht verarbeitet werden.<br>'
                + '<b>Speichere die Datei im Fomat CSV(Trennzeichen-getrennt)<br>'
                + 'und wiederhole den Vorgang.</b>')
                .show();
        return;
    }

    var zeile = [];

    zeile = aCSV[0].splitCSV(';'); // Headerzeile lesen
    if (zeile[0] === "Ort" || zeile[1] === "Platz") {
        iFrom = 1;
    } else {
        zeile = aCSV[1].splitCSV(';'); // Headerzeile lesen
        if (zeile[0] === "Ort" || zeile[1] === "Platz") {
            iFrom = 2;
        } else {
            $('#tMeldung').html('<b class=cRot>Dies ist keine CUPWERTUNGs-Datei.</b>')
                    .show();
            return;
        }
    }

    for (i = iFrom; i < aCSV.length; i++) {
        zeile = aCSV[i].splitCSV(';');
        if (zeile[1]) { // Turnier
            I = parseInt(zeile[0]);
            $('#tdTN' + I).html(zeile[1] + '&nbsp;&nbsp;&nbsp;');
            if (!DATA[tDATUM[I]]) {
                DATA[tDATUM[I]] = {};
            }
            DATA[tDATUM[I]][('0000' + zeile[2]).substr(-4)] = [parseInt(zeile[3]), parseInt(zeile[4]), parseInt(zeile[5])];
// für Alex  DATA[tDATUM[I]][(zeile[2].replace(/ /g, 'ˆ'))] = [parseInt(zeile[3]), parseInt(zeile[4]), parseInt(zeile[5])]; // Alex
        }
    }

    $('#fCUPWERTUNG').addClass('ui-disabled');
    $('#bPruefen').removeClass('ui-disabled');
}

function errorHandler(evt) {
    if (evt.target.error.name === "NotReadableError") {
        alert("Canno't read file !");
    }
}

function Speichern(pSpeichern) {

    var nFehler = 0;
    for (i = 1; i < tDATUM.length; i++) {
        if (tDATUM[i]) {
            var iVERANSTALTER = $('#iV' + i).val();
            if (iVERANSTALTER === '') {
                $('#tV' + i).html('Hier fehlt noch der Veranstalter.').addClass('cRot');
                nFehler++;
            } else {
                iVERANSTALTER = parseInt(iVERANSTALTER);
                if (!iVERANSTALTER || iVERANSTALTER < -2 || iVERANSTALTER > 9999) {
                    $('#tV' + i).html(iVERANSTALTER + ' ist keine gütige Spielernummmer.').addClass('cRot');
                    nFehler++;
                } else {
                    iVERANSTALTER = "0000" + iVERANSTALTER;
                    iVERANSTALTER = iVERANSTALTER.substring((iVERANSTALTER.length - 4));
                    if (iVERANSTALTER === '00-1') {
                        iVERANSTALTER === '-1';
                        $('#tV' + i).html('Präsidium').removeClass('cRot');
                    } else if (iVERANSTALTER === '00-2') {
                        iVERANSTALTER === '-2';
                        $('#tV' + i).html('alle Veranstalter').removeClass('cRot');
                    } else if (SPIELER[iVERANSTALTER]) {
                        $('#tV' + i).text(SPIELER[iVERANSTALTER][0] + ' ' + SPIELER[iVERANSTALTER][1]).removeClass('cRot');
                    } else {
                        $('#tV' + i).text('Spieler ' + iVERANSTALTER + ' existiert nicht.').addClass('cRot');
                        nFehler++;
                    }
                }
            }
        }
    }

    if (nFehler) {
        $('#tMeldung').html('<b class=cRot>Es wurden ' + nFehler + ' Fehler gefunden.</b>');
        $('#bSpeichern').addClass('ui-disabled');
        return;
    } else {
        $('#tMeldung').html('<b>Alles Bestens, die Daten k&ouml;nnen gespeichert werden.</b>');
        $('#bSpeichern').removeClass('ui-disabled');
    }

    if (!pSpeichern || nFehler) {
        return;
    }

    for (i = 1; i < tDATUM.length; i++) {
        if (tDATUM[i]) {
            var iVERANSTALTER = $('#iV' + i).val();
            iVERANSTALTER = "0000" + parseInt(iVERANSTALTER);
            iVERANSTALTER = iVERANSTALTER.substring((iVERANSTALTER.length - 4));
            if (iVERANSTALTER === "00-1") {
                iVERANSTALTER = "Präsidium";
            } else if (iVERANSTALTER === "00-2") {
                iVERANSTALTER = "Alle Veranstalter";
            }
            DATA[tDATUM[i]]._VERANSTALTER = iVERANSTALTER;
            DATA[tDATUM[i]]._SAISON = hDatMin + '/' + hDatMax.substr(2, 2);
            DATA[tDATUM[i]]._NAME = $('#iN' + i).val();
        }
    }

    showEinenMoment('Vorjahre einspielen:', nTurniere + ' Turniere werden eingespielt.');

    if (LS.ME === "3425") {
        sCUP3 = '056'; // WTC
    }


    firebase.database().ref('/00/' + sCUP3)
            .update(DATA)
            .then(function () {
                hideEinenMoment();
                LS.Meldung = (nTurniere + ' Turniere wurden eingespielt!');
                localStorage.setItem('Abakus.LS', JSON.stringify(LS));
                window.history.back();
            })
            .catch(function (error) {
                showEineDBWarnung(error, 'Speichern():');
            });
}

$(document).bind('pageinit', function () {
    'use strict';
    LS = JSON.parse(localStorage.getItem('Abakus.LS'));
    SPIELER = JSON.parse(localStorage.getItem('Abakus.SPIELERnr'));
    if (LS.ME !== "3425" && LS.ME !== "1000") {
        document.oncontextmenu = function () {
            return false; // oncontextmenu
        };
    }
    document.onselectstart = function () {
        return false;
    };
    firebase.initDB(0, 'admin');
    if (/iPad|iPhone/.test(navigator.userAgent)) {
        window.onbeforeunload = function (event) {
            $('body').addClass('ui-disabled');
        };
    }
});