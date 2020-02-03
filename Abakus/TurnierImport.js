
/* global firebase, DATA, cCUP */

var FB = undefined;
var LS = new Object();
var CUPS = new Object();
var STAT = new Object();
var SPIELERnr = new Object();
var iCUP = 0;
var loadInProgress = false;

var hHeute = myDateString(new Date());

var stFilter = '';

var tDATUM = [];
var DATA = {};
var myJBox = null;
var myJTip = null;

var hDatMin = '9999';
var hDatMax = '0000';
var iFrom = 0;


function whenSTATloaded() {

    function myDateString(pDate) {
        var hDate = new Date(pDate);
        return hDate.getFullYear() + '-' + ('00' + (hDate.getMonth() + 1)).substr(-2) + '-' + ('00' + (hDate.getDate())).substr(-2);
    }
    var hHeute = myDateString(new Date());

    for (var iTurnier in CUPS.TERMINE) {
        if (CUPS.TERMINE[iTurnier].CUP === iCUP && CUPS.TERMINE[iTurnier].DATUM === hHeute) {
            $('#iDATUM').val(CUPS.TERMINE[iTurnier].DATUM);
            $('#iNAME').val(CUPS.TERMINE[iTurnier].NAME);
            $('#iVERANSTALTER').val(CUPS.TERMINE[iTurnier].VERANSTALTER);
        }
    }
    hideEinenMoment();
}

function myDateString(pDate) {
    var hDate = new Date(pDate);
    return hDate.getFullYear() + '-' + ('00' + (hDate.getMonth() + 1)).substr(-2) + '-' + ('00' + (hDate.getDate())).substr(-2);
}

function fPruefenSpeichern(pSpeichern) {
    'use strict';

    $('#bSpeichern').addClass('ui-disabled');

    $("#iDATUM,#iCUP,#iNAME,#iVERANSTALTER,#iLOKAL,#iORT").filter(':input:focus').blur();
    $('input[id=iVERANSTALTER]').css("color", "black");

    var iNAME = $('#iNAME').val().trim();
    pos = iNAME.indexOf('\t');
    if (pos > 0) {
        iNAME = iNAME.substr(0, pos);
    }
    if (iNAME.length < 4) {
        showEinenTip('#iNAME', 'Bitte den vollständigen Turniername eingeben.');
        return;
    }
    if (iNAME.length > 24) {
        showEinenTip('#iNAME', 'Der Turniername darf nur 24 Zeichen lang sein.');
        return;
    }

    if (!/^[a-zA-Z0-9\u00C0-\u00ff\-\'\`\´\.\&\/\;\,\(\)\ ]*$/.test(iNAME)) {
        showEinenTip('#iNAME', 'Der <b>Turniername</b> enthält ein ungültiges Sonderzeichen.');
        $('input[id=iNAME]').css("color", "red").focus();
        return;
    }

    var iDATUM = $('#iDATUM').val();
    if ($('#iDATUM').val() === "") {
        showEinenTip('#iDATUM', 'Wann hat das Turnier stattgefunden?');
        return;
    }

    iDATUM = new Date(iDATUM);
    if (myDateString(iDATUM) > hHeute) {
        showEinenTip('#iDATUM', 'Das Turnier kann nicht in der Zukunft liegen!');
        return;
    }

    var iSAISON = iDATUM.getFullYear();
    if (iCUP === 53) {
        if (iDATUM.getMonth() === 11) {
            if (iDATUM.getDate() >= 24) {
                iSAISON++;
            }
        }
        iSAISON = '' + iSAISON;
    } else {
//      if (iDATUM.getMonth() > 3 || (iDATUM.getMonth() === 3 && iDATUM.getDate() > 15)) {
        if (iDATUM.getMonth() >= 3) {
            iSAISON = '' + iSAISON + '/' + (iSAISON - 1999);
        } else {
            iSAISON = '' + (iSAISON - 1) + '/' + (iSAISON - 2000);
        }
    }
//  $('#dSaison').html(iDATUM.getMonth() + 'Saison:<b> ' + iSAISON + '</b>');

    iDATUM = myDateString(iDATUM);

    var iVERANSTALTER = parseInt($('#iVERANSTALTER').val());
    if (Number.isNaN(iVERANSTALTER)) {
        iVERANSTALTER = LS.ME;
        if (SPIELERnr[iVERANSTALTER]) {
            $('#iVERANSTALTER').val(iVERANSTALTER);
            $('#tVERANSTALTER').text(SPIELERnr[iVERANSTALTER][0] + ' ' + SPIELERnr[iVERANSTALTER][1]);
        } else {
            showEinenTip('#iVERANSTALTER', 'Spieler ' + iVERANSTALTER + ' existiert nicht, 0 = Präsidium');
            $('input[id=iVERANSTALTER]').css("color", "red").focus();
            return;
        }
    } else if (iVERANSTALTER === -1) {
        iVERANSTALTER = 'Präsidium';
        $('#tVERANSTALTER').html('Präsidium');
    } else if (iVERANSTALTER === -2) {
        iVERANSTALTER = 'Alle Veranstalter';
        $('#tVERANSTALTER').text('Alle Veranstalter');
    } else if (iVERANSTALTER === -3) {
        iVERANSTALTER = 'Alle Cups';
        $('#tVERANSTALTER').text('Alle Cups');
    } else if (iVERANSTALTER < 1) {
        showEinenTip('#iVERANSTALTER', iVERANSTALTER + ' ist keine gültige Spielernummer');
        $('input[id=iVERANSTALTER]').css("color", "red").focus();
        return;
    } else {
        iVERANSTALTER = "0000" + iVERANSTALTER;
        iVERANSTALTER = iVERANSTALTER.substring((iVERANSTALTER.length - 4));
        if (SPIELERnr[iVERANSTALTER]) {
            $('#tVERANSTALTER').text(SPIELERnr[iVERANSTALTER][0] + ' ' + SPIELERnr[iVERANSTALTER][1]);
        } else {
            showEinenTip('#iVERANSTALTER', 'Spieler ' + iVERANSTALTER + ' existiert nicht, 0 = Präsidium');
            $('input[id=iVERANSTALTER]').css("color", "red").focus();
            return;
        }
    }

    var iDATEN = $('#iDATEN').val().split('\n');
    if (iDATEN === "") {
        showEinenTip('#iDATEN', 'Die Turnierdaten bitte hier einfügen.');
        return;
    }

    var hLASTTURNIER = iDATUM;
    var hPRETURNIER = null;
    for (var turnier in STAT) {
        if (turnier[0] === '2') {
            if (hLASTTURNIER < turnier) {
                hLASTTURNIER = turnier;
            }
        }
    }
    if (hLASTTURNIER < iDATUM) {
        hPRETURNIER = hLASTTURNIER;
        hLASTTURNIER = iDATUM;
    }
    hLASTTURNIER = hLASTTURNIER + ', ' + Date.now();

    DATA = {_LASTTURNIER: hLASTTURNIER};
    DATA[iDATUM] = {_NAME: iNAME,
        _PRETURNIER: hPRETURNIER,
        _SAISON: iSAISON,
        _VERANSTALTER: iVERANSTALTER};

    var oDATEN = '';
    var iSPIELER = 0;
    var nSPIELER = 0;
    var iLine = '';
    var oLine = '';
    var r1 = 0;
    var r2 = 0;
    var r3 = 0;
    var pos = 0;
    var hGewinner = '';
    for (var i = 0; i < iDATEN.length; i++) {
        iLine = iDATEN[i];
        if (i === 0 && iCUP === 53) {
            if (iNAME === '') {
                $('#iNAME').val(iLine);
            }
        } else {
            iSPIELER = parseInt(iLine);
            if (iSPIELER) {
                nSPIELER++;
                iSPIELER = ('0000' + iSPIELER).slice(-4);
                pos = iLine.lastIndexOf('\t');
                r3 = parseInt(iLine.substr(pos));
                if (isNaN(r3)) {
                    r3 = '-';
                }
                pos = iLine.substr(0, pos - 1).lastIndexOf('\t');
                r2 = parseInt(iLine.substr(pos));
                if (isNaN(r2)) {
                    r2 = '-';
                }
                pos = iLine.substr(0, pos - 1).lastIndexOf('\t');
                r1 = parseInt(iLine.substr(pos));
                if (isNaN(r1)) {
                    r1 = '-';
                }

                if (!SPIELERnr[iSPIELER]) {
                    showEinenFehler(iCUP, 'Spieler ' + iSPIELER + ' existiert nicht.', 'Bitte zuerst den Spieler anlegen.');
                    return;
                }

                oLine = iSPIELER + ' ' + SPIELERnr[iSPIELER][0] + ' ' + SPIELERnr[iSPIELER][1];
                oDATEN += oLine + ', ' + r1 + ', ' + r2 + ', ' + r3 + '\n';
                DATA[iDATUM][iSPIELER] = [r1, r2, r3];
                if (nSPIELER === 1) {
                    hGewinner = SPIELERnr[iSPIELER][1] + ' ' + SPIELERnr[iSPIELER][0];
                }
            }
        }
    }
    if (nSPIELER === 0) {
        showEinenTip('#iDATEN', 'Bitte die Turnierdaten<br>aus der Zwischenablage<br>hier einfügen.');
        return;
    }

    $('#oDATEN').html(oDATEN);

    $('#bSpeichern').removeClass('ui-disabled');


    var iSCHLAGZEILE = null;

    if (new Date - new Date(iDATUM) <= 3600000 * 48) { // 48 Stunden
        iSCHLAGZEILE = $('#iSCHLAGZEILE').val();
        if (!iSCHLAGZEILE) {
            if (iNAME.toUpperCase().indexOf('FINAL') >= 0) {
                $('#iSCHLAGZEILE').val('Vorname Nachname ist Tarockmeister ' + iSAISON).removeClass('ui-disabled');
                showEinenTip('#iSCHLAGZEILE', 'Bitte Vorname und Nachname ersetzen.');
            } else {
                $('#iSCHLAGZEILE').val(hGewinner + ' gewinnt ' + iNAME).removeClass('ui-disabled');
                showEinenTip('#iSCHLAGZEILE', 'Ist die Schlagzeile korrekt?');
            }
            return;
        }
    }

    if (!pSpeichern) {
        return;
    }

    showEinenMoment('Turnier einspielen:', iNAME + ' wird eingespielt.');

    firebase.database().ref('/00/' + ("000" + iCUP).slice(-3))
            .update(DATA)
            .then(function () {
                if (iSCHLAGZEILE) {
                    firebase.database().ref('/00/CUPS/' + ("000" + iCUP).slice(-3))
                            .update({MELDSTAT: iSCHLAGZEILE})
                            .then(function () {
                                hideEinenMoment();
                                LS.Meldung = ('Es wurde ein Turnier eingespielt!');
                                localStorage.setItem('Abakus.LS', JSON.stringify(LS));
                                CUPS.MELDSTAT[iCUP] = iSCHLAGZEILE;
                                localStorage.setItem('Abakus.CUPS', JSON.stringify(CUPS));
                                window.history.back();
                            })
                            .catch(function (error) {
                                showEineDBWarnung(error, 'Speichern():');
                            });
                } else {
                    hideEinenMoment();
                    LS.Meldung = ('Es wurde ein Turnier eingespielt!');
                    localStorage.setItem('Abakus.LS', JSON.stringify(LS));
                    window.history.back();
                }
            })
            .catch(function (error) {
                showEineDBWarnung(error, 'Speichern():');
            });

}

$(document).bind('pageinit', function () {
    'use strict';
    LS = JSON.parse(localStorage.getItem('Abakus.LS'));
    CUPS = JSON.parse(localStorage.getItem('Abakus.CUPS'));
    SPIELERnr = JSON.parse(localStorage.getItem('Abakus.SPIELERnr'));

    if (LS.ME === "1014") {
        iCUP = 51; // HRC
    }

    if (LS.ME === "4506") {
        iCUP = 53; // SWC
    }

    if (LS.ME === "3244") {
        iCUP = 55; // TTC
    }

    if (LS.ME === "3425") {
        iCUP = 125; // Test
    }

    $('#hTitel1').text(CUPS.NAME[iCUP]);

    if (LS.ME !== "3425" && LS.ME !== "3244") {
        document.oncontextmenu = function () {
            return false; // oncontextmenu
        };
    }
    document.onselectstart = function () {
        return false;
    };

    if (typeof FB !== 'object') {
        firebase.initDB(0);
    }

    STAT = JSON.parse(localStorage.getItem("Abakus.STAT" + ("000" + iCUP).substr(-3)));
//    if (STAT === null) {
    loadInProgress = true;
    loadSTAT(iCUP, 'Statistik wird geladen.');
//    } else {
//        whenSTATloaded();
//    }

    myJTip = new jBox('Tooltip', {
        theme: 'TooltipError',
        delayClose: 20,
        closeOnClick: true,
        closeOnEsc: true
    });
}
);