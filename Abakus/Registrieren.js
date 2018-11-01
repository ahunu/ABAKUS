
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
    if ((iCNRn < 0 || iCNRn > 9999) && iCNRn !== -4 && iCNRn !== -54 && iCNRn !== -56) { // St. bzw. Wr. Tarockcup
        showEinenTip("#iCNR", '(Cup)Spielernummer ungültig.');
        return;
    }

    if (LS.ME !== 'NOBODY' && LS.ME !== '3425') {
        if (iCNRn === 3425 // Leo Luger
                || iCNRn === 124 // Karl Haas
                || iCNRn === 1014 // Franz Kienast
                || iCNRn === 3322 // Sigi Braun
                || iCNRn === 3484 // Brigitta Hainz
                || iCNRn === 3244 // Markus Mair
                || iCNRn === 4506 // Sepp Lang
                || iCNRn === 6027 // Dieter Matuschek
                || iCNRn === 6013 // Horst Hrastnik
                || iCNRn === 3244 // Markus Mair
                || iCNRn === 4506 // Sepp Lang
                || iCNRn === 4731 // Alex Sabkovski
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
        LS.Angemeldet = [];
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
    if (xMEFpo) {
        $("#iCNR,#iVNN").addClass('ui-disabled');
        $('#iPIN').attr('type', 'number').val(i);
        $('#bRegistrieren').prop('disabled', true);
        $('#dRegistrieren').hide();
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
            history.back();
        }
    } else {
        LS.MEname = $("#iVNN").val();
        if (iCNRn) {
            if (iCNRn > 0) {
                LS.ME = '0000' + iCNRn;
                LS.ME = LS.ME.substr(LS.ME.length - 4);
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
        localStorage.clear();
        localStorage.setItem('Abakus.LS', JSON.stringify(LS));
        localStorage.setItem('Abakus.CUPS', JSON.stringify(CUPS));
        localStorage.setItem('Abakus.SPIELERnr', JSON.stringify(SPIELERnr));
        localStorage.setItem('Abakus.SPIELERalpha', JSON.stringify(SPIELERalpha));
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

        writeLOG('Als ' + LS.ME + ' ' + LS.MEname + ' registriert.');
        history.back();
    }
    return false;
}

function writeLOG(pLog, pError) {
    'use strict';
    var LOG = JSON.parse(localStorage.getItem('Abakus.LOG'));
    if (!LOG) {
        LOG = '';
    }
    if (pError) {
        console.error(pLog);
        $('#tLOG').append('<span><b>' + pLog + '</br></span><br>');
    } else {
        console.log(pLog);
        $('#tLOG').append('<span>' + pLog + '</span><br>');
    }
    if (pError) {
        LOG += new Date().toLocaleString() + ', ERROR:<br>';
    } else {
        LOG += new Date().toLocaleString() + ':<br>';
    }
    LOG += pLog + '<br>';
    localStorage.setItem('Abakus.LOG', JSON.stringify(LOG));
}

$(document).bind('pageinit', function () {

    document.oncontextmenu = function () {
        return false; // oncontextmenu
    };
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
        } else if (iCNR === "-51") {
            hName = "Raiffeisencup";
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
        } else if (iCNR === "-58") {
            hName = "Stadltarock";
        } else if (iCNR === "-59") {
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
            $('#iVNN').val('').removeClass('ui-disabled');
        }
    });

    loadSPIELER();
    window.onerror = function (msg, url, line, col, error) {
        console.log('msg: ' + msg + ', url: ' + url + ', line: ' + line);
        if (url !== '' || line !== 0) {
            alert(msg + ' url=' + url + ' line=' + line + ', col=' + col + ', error=' + error + '.');
        }
        return false;
    };
});
window.onbeforeunload = function (e) {
    $('.onExit').addClass('ui-disabled');
};