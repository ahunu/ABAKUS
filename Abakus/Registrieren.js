
var FB = undefined;
var LS = new Object();
var SPIELERext = new Object();
const spNR = 0;
const spNNAME = 1;
const spVNAME = 2;
const spORT = 3;

var myJBox = null;
var myJTip = null;
var nVersuche = 0;
var xMEFpo = false;

function whenSPIELERloaded() {
    hideEinenMoment();
    $('#dRegistrieren').removeClass('ui-disabled');
}

function isVIP(pSchalter) {
    return ((pSchalter & 8) !== 0);
}

function onRegistrieren() {
    'use strict';
    $.mobile.activePage.focus();
    myJTip.close();
    var abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var iCNRn = parseInt($("#iCNR").val());
    var iVNN = $("#iVNN").val();
    if (!iCNRn) {
        iCNRn = 0;
    }
    var iPIN = parseInt($("#iPIN").val());
    if (!iPIN) {
        iPIN = 0;
    }
    if (iCNRn < 0 && LS.ME !== '3425' && LS.ME !== 'NOBODY') {
        showEinenTip("#iCNR", '(Cup)Spielernummer ungültig.');
        return;
    }
    if ((iCNRn < 0 || iCNRn > 9999) && iCNRn !== -4 && iCNRn !== -52 && iCNRn !== -54 && iCNRn !== -55 && iCNRn !== -56) { // Raiffeisencup(Spieler einpflegen), St. bzw. Wr. Tarockcup
        showEinenTip("#iCNR", '(Cup)Spielernummer ungültig.');
        return;
    }

    if (LS.ME !== 'NOBODY' && LS.ME !== '3425') {
        if (iCNRn === 3425 // Leo Luger
                || iCNRn === 124 // Karl Haas
                || iCNRn === 1014 // Franz Kienast
                || iCNRn === 3322 // Sigi Braun
                || iCNRn === 3757 // Erwin Haider
                || iCNRn === 3244 // Markus Mair
                || iCNRn === 4506 // Sepp Lang
                || iCNRn === 3590 // Hans Hafner
                || iCNRn === 6058 // Veronika Schober
                || iCNRn === 4506 // Sepp Lang
                || iCNRn === 4731 // Alex Sabkovski
                || iCNRn === 197  // Manfred Huemer
                || iCNRn === 2553 // Arno Peter
                ) {
            showEinenTip("#iCNR", 'Der PIN eines Admins kann nicht berechnet werden.');
            return;
        }
    }

    var iCNR = '0000' + iCNRn;
    iCNR = iCNR.substr(iCNR.length - 4);
    if (LS.ME === '3425' && iCNRn[0] === '-') {
        if (SPIELERext[iCNR]) {
            if (LS.ME !== 'NOBODY' && LS.ME !== '3425') {
                if (SPIELERext[iCNR][6].length !== 4) {
                    showEinenTip("#iCNR", 'Spieler ' + iCNR + ' ist kein Tiroler.');
                    return;
                }
                if (SPIELERext[iCNR][6].substr(0, 1) !== '6' && SPIELERext[iCNR][6].substr(0, 2) !== '99') {
                    showEinenTip("#iCNR", 'Spieler ' + iCNR + ' ist kein Tiroler.');
                    return;
                }
            }
        } else {
            $('#iVNN').val('').removeClass('ui-disabled');
            showEinenTip("#iCNR", 'Spieler ' + iCNR + ' existiert nicht.');
            return;
        }
    }

    if (iCNRn === 0) {
        if (iVNN.length === 0) {
            showEinenTip('#iVNN', 'Wenn du keine Spielernummer hast,<br>kannst du dich alternativ mit<br>deinem Namen registrieren.');
            return;
        }
        if (iVNN.indexOf(' ') < 0
                || iVNN.indexOf(',') < 0
                || iVNN.indexOf(' ') > iVNN.indexOf(',')) {
            showEinenTip('#iVNN', 'Du musst "Familienname Vorname, Ort" eingeben.');
            return;
        }
    }

    if (LS.ME !== 'NOBODY' && !xMEFpo) { // Anmeldung erweitern
        LS.VIP = isVIP(SPIELERext[iCNR][12]);
        LS.MEname = $("#iVNN").val();
        localStorage.setItem('Abakus.LS', JSON.stringify(LS));
        history.back();
    }

    var i = 1734;
    if (iCNRn) {
        i = i + iCNRn;
    } else {
        for (var ind in iVNN) {
            i = i + abc.indexOf(iVNN[ind]);
        }
    }
    i = (i * 17) % 10000;
    if (i <= 1001) {
        i = i + 1041;
    }

    LS.XXL = false;
    if (!LS.XXL) { // (Neue) Admins ohne 6-stelligen Code abmelden.
        var nt = [
            [1014, 4170, 2611, 6036], // Franz Kienast 4170267136
            [2553, 0, 1946, 1271], // Arno Peter 195871
            [124, 0, 1234, 52], // Karl Haas
            [4506, 0, 7440, 1081], // Sepp Lang 745081
            [3590, 0, 1922, 6489], // Hans Hafner 198689
            [3244, 0, 7812, 1078], // Markus Mair 782278
            [3757, 0, 5601, 1011], // Erwin Haider 561111
            [3425, 30, 9608, 2296], // Leo Luger 30963096
            [3753, 0, 2332, 6601] // Gregor Zamberger 239801
        ];
        for (var ii = 0; ii < nt.length; ii++) {
            if (nt[ii][0] === iCNRn) {
                if (LS.ME !== 'NOBODY' && LS.ME !== '3425') {
                    showEinenTip("#iCNR", 'Der PIN eines Admins kann nicht berechnet werden.');
                    return;
                }
                i = nt[ii][1] * 1000000 + nt[ii][2] * 100 + nt[ii][3];
                LS.XXL = true;
                break;
            }
        }
    }

    if (xMEFpo) {
        $("#iCNR,#iVNN").addClass('ui-disabled');
        $('#iPIN').attr('type', 'number').val(i);
        if (LS.ME[3] === '5' && LS.ME[0] === '3' && LS.ME[1] === '4' && LS.ME[2] === '2') {
            $('#bRegistrieren').prop('value', 'registrieren').button('refresh');
            xMEFpo = false;
            LS.ME = 'NOBODY';
        } else {
            $('#bRegistrieren').prop('disabled', true);
            $('#dRegistrieren').hide();
        }
    } else if (i !== iPIN) {
        $("#iPIN").focus();
        LS.ME = 'NOBODY';
        if (iPIN) {
            showEinenTip('#iPIN', 'PIN ung&uuml;ltig, bitte unter<br>Tel. 0650 651 652 2 erfragen.');
        } else {
            showEinenTip('#iPIN', 'Du kannst den PIN-Code unter<br>Tel. 0650 651 652 2 erfragen.');
        }
        nVersuche++;
        if (nVersuche >= 3) {
            LS.Meldung = "Die Registrierung wurde nach drei Fehlversuchen abgebrochen.";
            localStorage.setItem('Abakus.LS', JSON.stringify(LS));
            $('#bRegistrieren').prop('disabled', true);
            history.back();
        }
    } else {
        LS.VIP = false;
        LS.MEname = $("#iVNN").val();
        if (iCNRn) {
            if (iCNRn > 0) {
                LS.ME = '0000' + iCNRn;
                LS.ME = LS.ME.substr(LS.ME.length - 4);
                LS.VIP = isVIP(SPIELERext[iCNR][12]);
            } else {
                LS.ME = '' + iCNRn;
            }
        } else if (iVNN.length >= 7) {
            LS.MEname = LS.MEname.substr(0, LS.MEname.indexOf(','));
            LS.ME = $("#iVNN").val();
            LS.ME = LS.ME.replace(/ /, '_').replace(/,/, '_').replace(/_ /, '_');
            LS.ME = LS.ME.replace(/Ä/g, 'Ae').replace(/Ü/g, 'Ue').replace(/Ö/g, 'Oe').replace(/\.|\-/g, ' ');
            LS.ME = LS.ME.replace(/ä/g, 'ae').replace(/ü/g, 'ue').replace(/ö/g, 'oe').replace(/  /g, ' ').replace(/ /g, 'ˆ');
        } else {
            LS.ME = 'NOBODY';
            LS.MEname = 'Nicht registriert';
        }

        var DS = JSON.parse(localStorage.getItem('Abakus.DS'));
        var TU = JSON.parse(localStorage.getItem('Abakus.TU'));
        var LOG = JSON.parse(localStorage.getItem('Abakus.LOG'));
        var CUPS = JSON.parse(localStorage.getItem('Abakus.CUPS'));
        var TURNIER = JSON.parse(localStorage.getItem('Abakus.TURNIER'));
        var SPIELERnr = JSON.parse(localStorage.getItem('Abakus.SPIELERnr'));
        var SPIELERalpha = JSON.parse(localStorage.getItem('Abakus.SPIELERalpha'));
        var AKTUELLES = JSON.parse(localStorage.getItem('Abakus.AKTUELLES'));
        localStorage.clear();
        localStorage.setItem('Abakus.LS', JSON.stringify(LS));
        localStorage.setItem('Abakus.CUPS', JSON.stringify(CUPS));
        localStorage.setItem('Abakus.SPIELERnr', JSON.stringify(SPIELERnr));
        localStorage.setItem('Abakus.SPIELERalpha', JSON.stringify(SPIELERalpha));
        localStorage.setItem('Abakus.AKTUELLES', JSON.stringify(AKTUELLES));
        if (DS !== null) {
            localStorage.setItem('Abakus.DS', JSON.stringify(DS));
        }
        if (TU !== null) {
            localStorage.setItem('Abakus.TU', JSON.stringify(TU));
        }
        if (LOG !== null) {
            localStorage.setItem('Abakus.LOG', JSON.stringify(LOG));
        }
        if (TURNIER !== null) {
            localStorage.setItem('Abakus.TURNIER', JSON.stringify(TURNIER));
        }
        $('#bRegistrieren').prop('disabled', true);
        writeLOG('Als ' + LS.ME + ' ' + LS.MEname + ' registriert.');
        history.back();
    }
    return false;
}

$(document).bind('pageinit', function () {

    document.onselectstart = function () {
        return false;
    };
    LS = new Object();
    LS = JSON.parse(localStorage.getItem('Abakus.LS'));
    if (LS.ME[3] === '5' && LS.ME[0] === '3' && LS.ME[1] === '4' && LS.ME[2] === '2'
            || LS.ME[3] === '4' && LS.ME[0] === '3' && LS.ME[1] === '2' && LS.ME[2] === '4') {
        xMEFpo = true;
        $('#bRegistrieren').prop('value', 'PIN berechnen').button('refresh');
        $('#bOhneRegistrierung').prop('value', 'zurück').button('refresh');
    } else {
        if (LS.ME !== 'NOBODY') {
            history.back();
        }
    }
    if (LS.ME !== "3425") {
        document.oncontextmenu = function () {
            return false; // oncontextmenu
        };
    }
    myJTip = new jBox('Tooltip', {
        theme: 'TooltipError',
        delayClose: 20,
        closeOnClick: true,
        closeOnEsc: true
    });

    $("#iCNR").blur(function () {
        var iCNR = $('#iCNR').val().trim();
        var hName = '';
        if (iCNR === "-4") {
            hName = "Testturnier";
        } else if (iCNR === "-50") {
            hName = "Hausruckcup";
        } else if (iCNR === "-51") {
            hName = "Ktn. Tarockcup";
        } else if (iCNR === "-52") {
            hName = "Raiffeisencup";
        } else if (iCNR === "-53") {
            hName = "Sauwaldcup";
        } else if (iCNR === "-54") {
            hName = "St. Tarockcup";
        } else if (iCNR === "-55") {
            hName = "Tiroler Tarockcup";
        } else if (iCNR === "-56") {
            hName = "Wr. Tarockcup";
        } else if (iCNR === "-56") {
            hName = "Tarockcup";
        } else if (iCNR === "-15") {
            hName = "Stadl Tarock";
        } else if (iCNR === "-17") {
            hName = "UTC Klopeinersee";
        } else {
            iCNR = '0000' + iCNR;
            iCNR = iCNR.substr(iCNR.length - 4);
            if (SPIELERext[iCNR]) {
                hName = SPIELERext[iCNR][0] + ' ' + SPIELERext[iCNR][1];
            } else {
                $('#iVNN').val('').removeClass('ui-disabled');
            }
        }
        if (hName) {
            $('#iVNN').val(hName).addClass('ui-disabled');
            $('#iPIN').focus();
        } else {
            $('#iVNN').removeClass('ui-disabled').attr("placeholder", "Vorname Nachname, Ort");
        }
    });

    loadSPIELER();

});