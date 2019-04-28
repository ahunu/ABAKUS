
/* global firebase, spAktiv */

var FB = undefined;
var LS = new Object();
var CUPS = new Object();

var SPIELERext = null;
var SPIELERnrUpdate = {};
var SPIELERextUpdate = {};
var myJBox = null;
var hThisSession = new Date().toJSON();
var sSpieler = false;
var dZuletzt = '';
var SORT = [];
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
var iVERZOGEN = false;
var iTITEL1IGN = false;
var iTITEL2IGN = false;
var iAKTIV = null;
var iANGELEGTam = null;
var iANGELEGTvon = null;
var iGEAENDERTam = null;
var iGEAENDERTvon = null;
var kzAktiv = '';
var I = 0;
var iNR = 0;
var hNeu = false;
var nGeaendert = 0;
var hMeldung = '';

function whenSPIELERloaded() {
    setTimeout(function () {
        hideEinenMoment();
        dZuletzt = new Date();
        dZuletzt.setHours(1); // 1 wegen der Sommerzeit
        dZuletzt = dZuletzt.valueOf();
        dZuletzt -= 86400000 * (13);
        //  1 Tag    86 400 000 ms
        dZuletzt = new Date(dZuletzt).toJSON().substr(0, 10);
        $('#main').removeClass('ui-disabled');
        if (LS.ME === '3425') {
            localStorage.setItem('Abakus.SPIELERext', JSON.stringify(SPIELERext));
        }
    });
}

function B_Clear() {
    'use strict';
    $('input[id=F_NR]').val('').css("color", "");
    $('input[id=F_NNAME]').val('').css("color", "");
    $('input[id=F_VNAME]').val('').css("color", "");
    $('input[id=F_ORT]').val('').css("color", "");
    if (hMeldung) {
        $("#fMeldung").html(hMeldung + '<b>Die Neuanlage(n) / &Auml;nderung(en) wurden noch nicht gespeichert.</b>').css("color", "#dd1111");
    } else {
        $("#fMeldung").html('').css("color", "#dd1111");
    }
    $("#lvGefunden").empty();
}

function ifAktiv(pSpieler) {
    if (SPIELERext[pSpieler][spAKTIV]) {
        if (SPIELERext[pSpieler][spAKTIV].indexOf(kzAktiv) >= 0) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

function getOrtStrasse(pOrt, pStrasse) {

    pOrt = pOrt.trim();
    pStrasse = pStrasse.trim();
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

function showSPIELER(i) {
    'use strict';
    $('#aeTitel').text('Spieler mit ähnlichen Namen:');
    $('#bBestaetigen').hide();
    $("body").addClass('noScroll');
    hNeu = false;
    if (!isNaN(i)) {
        i = ('000' + i).substr(-4);
    }
    iNR = i;
    $('#tUEBERSCHRIFT').html('Spieler ' + i + ' &auml;ndern:');
    $('#iNNAME,#iVNAME,#iSTRASSE,#iPLZ,#iORT,#iEMAIL,#iGESCHLECHT').removeClass('cRot bBeige');
    $('#iNR').val(i).addClass('ui-disabled');
    $('#iTITEL1').val(SPIELERext[i][spTITEL1]);
    $('#iTITEL2').val(SPIELERext[i][spTITEL2]);
    $('#iZUSATZ').val(SPIELERext[i][spZUSATZ]);
    $('#iVNAME').val(SPIELERext[i][spVNAME]);
    $('#iNNAME').val(SPIELERext[i][spNNAME]);
    $('#iSTRASSE').val(SPIELERext[i][spSTRASSE]);
    $('#iPLZ').val(SPIELERext[i][spPLZ]);
    $('#iORT').val(SPIELERext[i][spORT]);
    $('#iSTARTORT').val(SPIELERext[i][spSTARTORT]);
    $('#iTELEFON').val(SPIELERext[i][spTELEFON]);
    $('#iFESTNETZ').val(SPIELERext[i][spFESTNETZ]);
    $('#iEMAIL').val(SPIELERext[i][spEMAIL]);
    $('#iGEBDAT').val(SPIELERext[i][spGEBDAT]);
    $('#iGESCHLECHT').val(SPIELERext[i][spGESCHLECHT]);
    $("#iVERSTORBEN").prop("checked", (SPIELERext[i][spVERSTORBEN] === true)).checkboxradio("refresh");
    $("#iVERZOGEN").prop("checked", (SPIELERext[i][spVERZOGEN] === true)).checkboxradio("refresh");
    iTITEL1IGN = SPIELERext[i][spTITEL1IGN];
    iTITEL2IGN = SPIELERext[i][spTITEL2IGN];
    iAKTIV = SPIELERext[i][spAKTIV];
    if (iAKTIV) {
        if (iAKTIV.indexOf(kzAktiv) >= 0) {
            $("#iAKTIV").prop("checked", true).checkboxradio("refresh");
        } else {
            $("#iAKTIV").prop("checked", false).checkboxradio("refresh");
        }
    } else {
        iAKTIV = '';
        $("#iAKTIV").prop("checked", false).checkboxradio("refresh");
    }
    iANGELEGTam = SPIELERext[i][spANGELEGTam];
    if (!iANGELEGTam) {
        iANGELEGTam = '';
    }
    iANGELEGTvon = SPIELERext[i][spANGELEGTvon];
    if (!iANGELEGTvon) {
        iANGELEGTvon = '';
    }
    iGEAENDERTam = SPIELERext[i][spGEAENDERTam];
    iGEAENDERTvon = SPIELERext[i][spGEAENDERTvon];
    var hFText = '';
    if (SPIELERext[i][spANGELEGTvon]) {
        hFText = (SPIELERext[i][spANGELEGTam] === hThisSession ? 'Zuvor' : 'Am ' + SPIELERext[i][spANGELEGTam].substr(0, 10))
                + ' von ' + (SPIELERext[i][spANGELEGTvon] === LS.MEname ? 'mir' : SPIELERext[i][spANGELEGTvon])
                + ' angelegt.&nbsp;&nbsp;&nbsp;&nbsp;';
    }

    if (SPIELERext[i][spGEAENDERTvon]) {
        hFText += ((iGEAENDERTam === hThisSession || iGEAENDERTvon.indexOf(' Statusaenderung') >= 0) ? 'Zuvor' : 'Am ' + SPIELERext[i][spGEAENDERTam].substr(0, 10))
                + ' von ' + ((iGEAENDERTvon === LS.MEname || iGEAENDERTvon.indexOf(' Statusaenderung') >= 0) ? 'mir' : SPIELERext[i][spGEAENDERTvon])
                + ' geändert.';
    }

    $('#fTEXT').html(hFText);


    aehnlicheSpielerFinden(SPIELERext[i][spNNAME], SPIELERext[i][spVNAME], SPIELERext[i][spORT], i);
    $("#bOK").addClass('ui-disabled');
    $('#pSpieler').popup("open");
}

function bBestaetigen(pStep) {
    if (pStep === 1) {
        $('#bBestaetigen1').hide();
        $('#aeText').html('<br><br><br><br><div style="text-align:center;color:#0000bb"><b>Vorsicht</b> ist die Mutter<br>der Porzellankiste<b>!</b></div>');
        $('#bPruefen').removeClass('ui-disabled');
    }
    if (pStep === 2) {
        $('#aeTitel').text('Spieler mit ähnlichen Namen:');
        $("#bOK").removeClass('ui-disabled');
        $('#aeText').append('<br><br><div style="color: black"><b>Niemals darf ein Spieler ein zweites mal angelegt werden.</b><div>');
        $('#bBestaetigen2').hide();
    }
}

function showNeuenSPIELER(pNeu) {
    'use strict';
    hNeu = true;
    $('#aeTitel').text('Kein Spieler darf ein zweites Mal angelegt werden.');
    $("body").addClass('noScroll');
    $('#aeText').html("Sollte es in dieser Datenbank Spieler mit ähnlichen Namen geben, werden diese hier angezeigt. "
            + "Überprüfe auch andere in Frage kommende Orte und Schreibweisen. "
            + "Frage den Spieler bitte auch, ob er nicht schon eine Spielernummer von einem anderen Cup hat.").show();
    $('#bBestaetigen1').show();
    $('#bBestaetigen2').hide();
    $('#bPruefen').addClass('ui-disabled');
    $('#pWarnung').popup('close');
    if (pNeu) {
        var hNummernkreis = 9001;
        if (LS.ME === "-54" || LS.ME === '3590') { // STC: Hans Hafner
            hNummernkreis = 6001;
        } else if (LS.ME === "-56" || LS.ME === '3757' || LS.ME === '3425') { // WTC: Erwin Haider
            hNummernkreis = 3761;
        } else if (LS.ME === "-55" || LS.ME === '3244') { // WTC: Markus Mair
            hNummernkreis = 4001;
        } else if (LS.ME === "-53" || LS.ME === '4506') { // WTC: Sepp Lang
            hNummernkreis = 5750;
        }
        for (var ii = hNummernkreis; ii < 9999; ii++) {
            var iii = '' + ('000' + ii).substr(-4); // Interessanterweise ist das ''+ für die deployed Version erforderlich
            if (!SPIELERext[iii]) {
                iNR = iii;
                break;
            }
        }
        $('#iNR').val(iNR).addClass('ui-disabled');
    } else {
        iNR = '';
        $('#iNR').val(iNR).removeClass('ui-disabled');
    }

    $('#tUEBERSCHRIFT').text('Einen Spieler anlegen:');
    $('#iNNAME,#iVNAME,#iSTRASSE,#iPLZ,#iORT,#iEMAIL,#iGESCHLECHT').removeClass('cRot bBeige');
    $('#iTITEL1').val('');
    $('#iTITEL2').val('');
    $('#iZUSATZ').val('');
    $('#iVNAME').val('');
    $('#iNNAME').val('');
    $('#iSTRASSE').val('');
    $('#iPLZ').val('');
    $('#iORT').val('');
    $('#iSTARTORT').val('');
    $('#iTELEFON').val('');
    $('#iFESTNETZ').val('');
    $('#iEMAIL').val('');
    $('#iGEBDAT').val('');
    $('#iGESCHLECHT').val('');
    if (kzAktiv) {
        $("#iAKTIV").prop("checked", true).checkboxradio("refresh");
    } else {
        $("#iAKTIV").prop("checked", false).checkboxradio("refresh");
    }
    $("#iVERSTORBEN").prop("checked", false).checkboxradio("refresh");
    $("#iVERZOGEN").prop("checked", false).checkboxradio("refresh");
    $('#fTEXT').html('');
    iAKTIV = kzAktiv;
    iTITEL1IGN = false;
    iTITEL2IGN = false;
    $('#pSpieler').popup("open");
}

function onOK(pSpeichern) {
    'use strict';
    $('#iNR,#iTITEL1,#iTITEL2,#iZUSATZ,#iNNAME,#iVNAME,#iSTRASSE,#iPLZ,#iORT,#iEMAIL,#iGESCHLECHT').removeClass('cRot bBeige');
    if (hNeu) {
        iNR = $("#iNR").val().trim();
        iNR = ('0000' + iNR).substr(-4);
        $("#iNR").val(iNR);
    }

    var iTITEL1 = $("#iTITEL1").val().trim();
    if (iTITEL1 > 'ZZZZZ') {
        iTITEL1 = iTITEL1.substr(0, 1).toUpperCase() + iTITEL1.substr(1);
        $("#iTITEL1").val(iTITEL1);
    }
    var iTITEL2 = $("#iTITEL2").val().trim();
    if (iTITEL2 > 'ZZZZZ') {
        iTITEL2 = iTITEL2.substr(0, 1).toUpperCase() + iTITEL1.substr(1);
        $("#iTITEL2").val(iTITEL2);
    }
    var iZUSATZ = $("#iZUSATZ").val().trim();
    var iNNAME = $("#iNNAME").val().trim();
    if (iNNAME > 'ZZZZZ') {
        iNNAME = iNNAME.substr(0, 1).toUpperCase() + iNNAME.substr(1);
        $("#iNNAME").val(iNNAME);
    }

    var iVNAME = $("#iVNAME").val().trim();
    if (iVNAME > 'ZZZZZ') {
        iVNAME = iVNAME.substr(0, 1).toUpperCase() + iVNAME.substr(1);
        $("#iVNAME").val(iVNAME);
    }

    var iSTRASSE = $("#iSTRASSE").val().trim();
    if (iSTRASSE > 'ZZZZZ') {
        iSTRASSE = iSTRASSE.substr(0, 1).toUpperCase() + iSTRASSE.substr(1);
        $("#iSTRASSE").val(iSTRASSE);
    }

    var iPLZ = $("#iPLZ").val().trim();
    var iORT = $("#iORT").val().trim();
    if (iORT > 'ZZZZZ') {
        iORT = iORT.substr(0, 1).toUpperCase() + iORT.substr(1);
        $("#iORT").val(iORT);
    }

    var iSTARTORT = $("#iSTARTORT").val().trim();
    if (iSTARTORT > 'ZZZZZ') {
        iSTARTORT = iSTARTORT.substr(0, 1).toUpperCase() + iSTARTORT.substr(1);
        $("#iSTARTORT").val(iSTARTORT);
    }

    var iTELEFON = $("#iTELEFON").val().trim();
    var iFESTNETZ = $("#iFESTNETZ").val().trim();
    var iEMAIL = $("#iEMAIL").val().trim();
    var iGEBDAT = $("#iGEBDAT").val().trim();
    var iGESCHLECHT = $("#iGESCHLECHT").val().trim();
    var iVERSTORBEN = $("#iVERSTORBEN").prop("checked");
    var iVERZOGEN = $("#iVERZOGEN").prop("checked");
    var iAKTIV = '?';
    if (hNeu) {
        if ($("#iAKTIV").prop("checked")) {
            iAKTIV = kzAktiv;
        } else {
            iAKTIV = '';
        }
    } else {
        if (SPIELERext[iNR][spAKTIV]) {
            iAKTIV = SPIELERext[iNR][spAKTIV];
        } else {
            iAKTIV = '';
        }
        if ($("#iAKTIV").prop("checked")) {
            if (iAKTIV) {
                if (iAKTIV.indexOf(kzAktiv) < 0) {
                    iAKTIV += kzAktiv;
                }
            } else {
                iAKTIV += kzAktiv;
            }
        } else {
            iAKTIV = iAKTIV.replace(kzAktiv, '');
        }
    }

    if (iNR === '0000') {
        $('#iNR').addClass('cRot bBeige').focus().val('');
        $("#fTEXT").html('Bitte eine Spielernummer eingeben.');
        return;
    }
    if (isNaN(iNR)) {
        $('#iNR').addClass('cRot bBeige').focus();
        $("#fTEXT").html('Die Spielernummer ist nicht numerisch.');
        return;
    }
    if (hNeu) {
        if (SPIELERext[iNR]) {
            $('#iNR').addClass('cRot bBeige').focus();
            $("#fTEXT").html('Die Nummer ' + iNR + ' wurde bereits an ' + SPIELERext[iNR][spNNAME] + ' ' + SPIELERext[iNR][spVNAME] + ' vergeben.');
            return;
        }
    }

    if (iNNAME.length < 3) {
        $('#iNNAME').addClass('cRot bBeige').focus();
        $("#fTEXT").html('Bitte einen vollst&auml;ndigen Nachnamen eingeben.');
        return;
    }
    if (iVNAME.length < 3) {
        $('#iVNAME').addClass('cRot bBeige').focus();
        $("#fTEXT").html('Bitte einen vollst&auml;ndigen Vornamen eingeben.');
        return;
    }
//    if (iSTRASSE.length < 5) {
//        $('#iSTRASSE').addClass('cRot bBeige').focus();
//        $("#fTEXT").html('Bitte die Strasse und Nummer vollst&auml;ndigen eingeben.');
//        return;
//    }
//    if (iSTRASSE.indexOf(' 1') < 3
//            && iSTRASSE.indexOf(' 2') < 3
//            && iSTRASSE.indexOf(' 3') < 3
//            && iSTRASSE.indexOf(' 4') < 3
//            && iSTRASSE.indexOf(' 5') < 3
//            && iSTRASSE.indexOf(' 6') < 3
//            && iSTRASSE.indexOf(' 7') < 3
//            && iSTRASSE.indexOf(' 8') < 3
//            && iSTRASSE.indexOf(' 9') < 3) {
//        $('#iSTRASSE').addClass('cRot bBeige').focus();
//        $("#fTEXT").html('Bitte die Strasse und Nummer sss vollst&auml;ndigen eingeben.');
//        return;
//    }
//
//    if (iPLZ.length < 4) {
//        $('#iPLZ').addClass('cRot bBeige').focus();
//        $("#fTEXT").html('Bitte die Postleitzahl vollst&auml;ndigen eingeben.');
//        return;
//    }
    if (iORT.length < 3) {
        $('#iORT').addClass('cRot bBeige').focus();
        $("#fTEXT").html('Bitte einen vollst&auml;ndigen Ort eingeben.');
        return;
    }
    if (iEMAIL) {
        var val = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!val.test(iEMAIL)) {
            $('#iEMAIL').addClass('cRot bBeige').focus();
            $("#fTEXT").html('Das ist keine g&uumltige Email-Adresse.');
            return;
        }
    }
    if (iGESCHLECHT !== 'm' && iGESCHLECHT !== 'w') {
        $('#iGESCHLECHT').addClass('cRot bBeige').focus();
        $("#fTEXT").html('Bitte einen g&uuml;ltiges Geschlecht eingeben.');
        return;
    }

    if (hNeu) {
        aehnlicheSpielerFinden(iNNAME, iVNAME, iORT, '????');
    } else {
        aehnlicheSpielerFinden(iNNAME, iVNAME, iORT, iNR);
    }

    if (!pSpeichern) {
        $("#fTEXT").html('Die Daten sind OK.');
        $("#bOK").removeClass('ui-disabled');
        return;
    }

    if (SPIELERext[iNR]) {
        if (iNNAME !== SPIELERext[iNR][spNNAME]
                || iVNAME !== SPIELERext[iNR][spVNAME]
                || iTITEL1 !== SPIELERext[iNR][spTITEL1]
                || iTITEL2 !== SPIELERext[iNR][spTITEL2]
                || iZUSATZ !== SPIELERext[iNR][spZUSATZ]
                || iSTRASSE !== SPIELERext[iNR][spSTRASSE]
                || iPLZ !== SPIELERext[iNR][spPLZ]
                || iORT !== SPIELERext[iNR][spORT]
                || iFESTNETZ !== SPIELERext[iNR][spFESTNETZ]
                || iTELEFON !== SPIELERext[iNR][spTELEFON]
                || iGEBDAT !== SPIELERext[iNR][spGEBDAT]
                || iEMAIL !== SPIELERext[iNR][spEMAIL]
                || iGESCHLECHT !== SPIELERext[iNR][spGESCHLECHT]
                || iSTARTORT !== SPIELERext[iNR][spSTARTORT]
                || iVERSTORBEN !== SPIELERext[iNR][spVERSTORBEN]
                || iVERZOGEN !== SPIELERext[iNR][spVERZOGEN]
                || iTITEL1IGN !== SPIELERext[iNR][spTITEL1IGN]
                || iTITEL2IGN !== SPIELERext[iNR][spTITEL2IGN]) {
            iGEAENDERTam = hThisSession;
            iGEAENDERTvon = LS.MEname;
            hMeldung += iNR + ' <b> ' + iNNAME + ' ' + iVNAME + (iVERSTORBEN ? "&nbsp;&#134;" : "") + '</b> aus ' + iORT + ' wurde ge&auml;ndert.<br>';
            nGeaendert++;
        } else {
            if (iAKTIV === SPIELERext[iNR][spAKTIV]) {
                hMeldung += iNR + ' <b> ' + iNNAME + ' ' + iVNAME + (iVERSTORBEN ? "&nbsp;&#134;" : "") + '</b> aus ' + iORT + ' wurde nicht ge&auml;ndert.<br>';
            } else if (iAKTIV && iAKTIV.indexOf(kzAktiv) >= 0) {
                if (SPIELERext[iNR][spANGELEGTam] !== hThisSession && SPIELERext[iNR][spGEAENDERTam] !== hThisSession) {
                    if (SPIELERext[iNR][spGEAENDERTvon]) {
                        iGEAENDERTvon = SPIELERext[iNR][spGEAENDERTvon] + ' Statusaenderung';
                    } else {
                        iGEAENDERTvon = ' Statusaenderung';
                    }
                }
                hMeldung += iNR + ' <b> ' + iNNAME + ' ' + iVNAME + (iVERSTORBEN ? "&nbsp;&#134;" : "") + '</b> aus ' + iORT + ' wurde aktiviert.<br>';
                nGeaendert++;
            } else {
                if (SPIELERext[iNR][spANGELEGTam] !== hThisSession && SPIELERext[iNR][spGEAENDERTam] !== hThisSession) {
                    if (SPIELERext[iNR][spGEAENDERTvon]) {
                        iGEAENDERTvon = SPIELERext[iNR][spGEAENDERTvon] + ' Statusaenderung';
                    } else {
                        iGEAENDERTvon = ' Statusaenderung';
                    }
                }
                hMeldung += iNR + ' <b> ' + iNNAME + ' ' + iVNAME + (iVERSTORBEN ? "&nbsp;&#134;" : "") + '</b> aus ' + iORT + ' wurde deaktiviert.<br>';
                nGeaendert++;
            }
        }
    } else {
        iANGELEGTam = hThisSession;
        iANGELEGTvon = LS.MEname;
        iGEAENDERTam = null;
        iGEAENDERTvon = null;
        hMeldung += iNR + ' <b> ' + iNNAME + ' ' + iVNAME + '</b> aus ' + iORT + ' wurde neu angelegt.<br>';
        nGeaendert++;
    }
    if (nGeaendert) {
        $('#bSpeichern,#bNichtGespeichert').removeClass('ui-disabled');
        $("#fMeldung").html(hMeldung + '<b>Die Neuanlage(n) / &Auml;nderung(en) wurden noch nicht gespeichert.</b>').css("color", "#dd1111");
    } else {
        $("#fMeldung").html(hMeldung).css("color", "#dd1111");
    }
    SPIELERext[iNR] = [
        iNNAME,
        iVNAME,
        iTITEL1,
        iTITEL2,
        iZUSATZ,
        iSTRASSE,
        iPLZ,
        iORT,
        iFESTNETZ,
        iTELEFON,
        iGEBDAT,
        iEMAIL,
        iGESCHLECHT,
        iSTARTORT,
        iVERSTORBEN,
        iVERZOGEN,
        iTITEL1IGN,
        iTITEL2IGN,
        iAKTIV,
        iANGELEGTam,
        iANGELEGTvon,
        iGEAENDERTam,
        iGEAENDERTvon
    ];
    $("body").removeClass('noScroll');
    $('#pSpieler').popup("close");
    $("html, body").scrollTop(0);
    return false;
}

function onFinden(pUPDATEart) {
    'use strict';
    $('#main').addClass('ui-disabled');
    $.mobile.activePage.focus();
    var hNNAME, hVNAME, hORT;
    $('input[id=F_NR]').css("color", "");
    $('input[id=F_NNAME]').css("color", "");
    $('input[id=F_VNAME]').css("color", "");
    $('input[id=F_STRASSE]').css("color", "");
    $('input[id=F_PLZ]').css("color", "");
    $('input[id=F_ORT]').css("color", "");
    $('#fMeldung').css("color", "#dd1111");
    var fNR = $("#F_NR").val();
    if (fNR === '') {
        fNR = 0;
        $('#F_NR').val("");
    }
    if (isNaN(fNR)) {
        if (fNR !== "") {
            $('input[id=F_NR]').css("color", "#dd1111");
            $('#fMeldung').html(' Bitte eine g&uuml;ltige Spielernummer eingeben.');
            return false;
        }
    } else {
//      != darf nicht geändert werden.
        if (fNR != parseInt(fNR)) { // != darf nicht geändert werden
//      != darf nicht geändert werden.
            $('input[id=F_NR]').css("color", "#dd1111");
            $('#fMeldung').html(' Bitte eine g&uuml;ltige Spielernummer eingeben.');
            return false;
        }
        $('input[id=F_NR]').css("color", "black");
        fNR = "0000" + fNR;
        fNR = fNR.substring((fNR.length - 4));
    }

    $('#dRumpf').addClass("ui-disabled");
//    setTimeout(function () {
    hNNAME = $.trim($('input[id=F_NNAME]').val());
//    if (hNNAME.toUpperCase().substr(0, 3) === 'SCH') {
//        if (hNNAME.length > 5) {
//            hNNAME = hNNAME.substr(0, 5);
//        }
//    } else {
//        if (hNNAME.length > 3) {
//            hNNAME = hNNAME.substr(0, 3);
//        }
//    }
    hNNAME = hNNAME.substr(0, 1).toUpperCase() + hNNAME.substr(1);
    $('input[id=F_NNAME]').val(hNNAME);
    var fNNAME = hNNAME.toUpperCase();
    hVNAME = $.trim($('input[id=F_VNAME]').val());
//    if (hVNAME.length > 3) {
//        hVNAME = hVNAME.substr(0, 3);
//    }
    hVNAME = hVNAME.substr(0, 1).toUpperCase() + hVNAME.substr(1);
    $('input[id=F_VNAME]').val(hVNAME);
    var fVNAME = hVNAME.toUpperCase();
    hORT = $.trim($('input[id=F_ORT]').val());
//    if (hORT.length > 3) {
//        hORT = hORT.substr(0, 3);
//    }
    hORT = hORT.substr(0, 1).toUpperCase() + hORT.substr(1);
    $('input[id=F_ORT]').val(hORT);
    var fORT = hORT.toUpperCase();
    $("#lvGefunden").empty();
    SORT = [];
    var lVNAME = fVNAME.length;
    var lNNAME = fNNAME.length;
    var lORT = fORT.length;

    if (pUPDATEart) {
        for (var spieler in SPIELERext) {
            if (pUPDATEart === 'Aktive Spieler' && ifAktiv(spieler)) {
                SORT.push(spieler);
            } else if (pUPDATEart === 'Noch nicht gespeichert') {
                if (SPIELERext[spieler][spANGELEGTam] === hThisSession
                        || SPIELERext[spieler][spGEAENDERTam] === hThisSession
                        || SPIELERext[spieler][spGEAENDERTvon] && SPIELERext[spieler][spGEAENDERTvon].indexOf(' Statusaenderung') >= 0) {
                    SORT.push(spieler);
                }
            } else if (pUPDATEart === 'Zuletzt geändert / angelegt *') {
                if (SPIELERext[spieler][spANGELEGTam] >= dZuletzt
                        || SPIELERext[spieler][spGEAENDERTam] >= dZuletzt
                        || SPIELERext[spieler][spGEAENDERTvon] && SPIELERext[spieler][spGEAENDERTvon].indexOf(' Statusaenderung') >= 0) {
                    if (ifAktiv(spieler)
                            || SPIELERext[spieler][spANGELEGTam] >= dZuletzt && SPIELERext[spieler][spANGELEGTvon] === LS.MEname
                            || SPIELERext[spieler][spGEAENDERTam] >= dZuletzt && SPIELERext[spieler][spGEAENDERTvon] === LS.MEname
                            || SPIELERext[spieler][spGEAENDERTvon] && SPIELERext[spieler][spGEAENDERTvon].indexOf(' Statusaenderung') >= 0) {
                        SORT.push(spieler);
                    }
                }
            } else if (pUPDATEart === 'RTC' && SPIELERext[spieler][spPLZ].length === 4
                    && (SPIELERext[spieler][spPLZ].substr(0, 2) === '40' && SPIELERext[spieler][spPLZ] <= '4059'
                            || SPIELERext[spieler][spPLZ].substr(0, 2) === '41' || SPIELERext[spieler][spPLZ].substr(0, 2) === '42'
                            || SPIELERext[spieler][spPLZ].substr(0, 2) === '43')) {
                SORT.push(spieler);
            } else if (pUPDATEart === 'HRC' && SPIELERext[spieler][spPLZ].length === 4
                    && (SPIELERext[spieler][spPLZ].substr(0, 2) === '40' && SPIELERext[spieler][spPLZ] <= '4079'
                            || SPIELERext[spieler][spPLZ].substr(0, 2) === '44' || SPIELERext[spieler][spPLZ].substr(0, 2) === '45'
                            || SPIELERext[spieler][spPLZ].substr(0, 2) === '46' || SPIELERext[spieler][spPLZ].substr(0, 2) === '48'
                            || SPIELERext[spieler][spPLZ].substr(0, 1) === '5')) {
                SORT.push(spieler);
            } else if (pUPDATEart === 'SWC' && SPIELERext[spieler][spPLZ].length === 4
                    && (SPIELERext[spieler][spPLZ].substr(0, 2) === '40' && SPIELERext[spieler][spPLZ] >= '4070'
                            || SPIELERext[spieler][spPLZ].substr(0, 2) === '47' || SPIELERext[spieler][spPLZ].substr(0, 2) === '49')) {
                SORT.push(spieler);
            } else if (pUPDATEart === 'WTC' && SPIELERext[spieler][spPLZ].length === 4
                    && (SPIELERext[spieler][spPLZ].substr(0, 1) === '1' || SPIELERext[spieler][spPLZ].substr(0, 1) === '2'
                            || SPIELERext[spieler][spPLZ].substr(0, 1) === '3' || SPIELERext[spieler][spPLZ].substr(0, 2) === '7'
                            || SPIELERext[spieler][spPLZ].substr(0, 1) === '9')) {
                SORT.push(spieler);
            } else if (pUPDATEart === 'STC' && SPIELERext[spieler][spPLZ].length === 4
                    && (SPIELERext[spieler][spPLZ].substr(0, 1) === '7' || SPIELERext[spieler][spPLZ].substr(0, 1) === '8')) {
                SORT.push(spieler);
            } else if (pUPDATEart === 'TTC' && SPIELERext[spieler][spPLZ].length === 4
                    && (SPIELERext[spieler][spPLZ].substr(0, 1) === '6' || SPIELERext[spieler][spPLZ].substr(0, 2) === '99')) {
                SORT.push(spieler);
            } else if (pUPDATEart === 'Rest' && (SPIELERext[spieler][spPLZ].length !== 4 || isNaN(SPIELERext[spieler][spPLZ]))) {
                SORT.push(spieler);
            }
        }
    } else if (fNR !== "0000") {
        for (var spieler in SPIELERext) {
            if (fNR === spieler) {
                SORT.push(spieler);
                break;
            }
        }
    } else if (lVNAME >= 1 || lNNAME >= 1 || lORT >= 1) {
        for (var spieler in SPIELERext) {
            if ((lVNAME === 0 || SPIELERext[spieler][spVNAME].substr(0, lVNAME).toUpperCase() === fVNAME)
                    && (lNNAME === 0 || SPIELERext[spieler][spNNAME].substr(0, lNNAME).toUpperCase() === fNNAME)
                    && (lORT === 0 || SPIELERext[spieler][spORT].substr(0, lORT).toUpperCase() === fORT)) {
                SORT.push(spieler);
            }
        }
    } else if (lVNAME >= 1 || lNNAME >= 1 || lORT >= 1) {
        $('#fMeldung').text(' Welche/n Spieler willst du finden?');
        return false;
    }

    SORT.sort();
    spielerAnzeigen();
    if (!pUPDATEart) {
        pUPDATEart = "Gefunden";
    }
    $('#fMeldung').html('&nbsp;<b>' + pUPDATEart + ':</b>&nbsp;&nbsp; ' + SORT.length + ' Spieler').css("color", "black");
    return false;
}

function spielerAnzeigen() {

    $('#main').addClass('ui-disabled');
    $("#lvGefunden").empty();
    var SORT2 = [];
    var cFarbe = '';
    for (iSpieler in SORT) {
        SORT2.push((sSpieler ? SORT[iSpieler] : SPIELERext[SORT[iSpieler]][spNNAME] + ' ' + SPIELERext[SORT[iSpieler]][spVNAME]).replace(/Ä/g, 'A').replace(/Ü/g, 'U').replace(/Ö/g, 'O').replace(/ä/g, 'a').replace(/ü/g, 'u').replace(/ö/g, 'o') + ';' + SORT[iSpieler]);
    }
    SORT2.sort();
    for (var iSpieler in SORT2) {
        spieler = SORT2[iSpieler].substr(-4);
        if (SPIELERext[spieler][spGEAENDERTam] && SPIELERext[spieler][spGEAENDERTam] >= dZuletzt
                || SPIELERext[spieler][spANGELEGTam] && SPIELERext[spieler][spANGELEGTam] >= dZuletzt) {
            if (ifAktiv(spieler)) {
                cFarbe = 'cRot';
            } else {
                cFarbe = 'cHellrot';
            }
        } else {
            if (ifAktiv(spieler)) {
                cFarbe = '';
            } else {
                cFarbe = 'cGrau';
            }
        }
        $("#lvGefunden").append("<li data-icon='false'><a id='GS" + spieler + "' onclick='showSPIELER(\"" + spieler + "\")'><span class='N " + cFarbe + "'>" + spieler + " </span><span class='" + cFarbe + "'> " + SPIELERext[spieler][spNNAME] + " " + SPIELERext[spieler][spVNAME] + (SPIELERext[spieler][spZUSATZ] ? " " + SPIELERext[spieler][spZUSATZ] : "") + (SPIELERext[spieler][spVERSTORBEN] ? "&nbsp;&nbsp;&#134;" : "") + "</span><span class='N " + cFarbe + "'><br>" + SPIELERext[spieler][spORT] + ", " + SPIELERext[spieler][spSTRASSE] + "</span></a></li>");
    }

    $('#lvGefunden').listview().listview('refresh');
    $('.nAngemeldet').css('font-size', '24px').css('line-height', '0px');

    $('html, body').animate({
        scrollTop: ($('#fMeldung').offset().top - $("#dHeader").height() - 8)
    }, 600);
    $('#main').removeClass('ui-disabled');
}

function aehnlicheSpielerFinden(pNNAME, pVNAME, pORT, pSPIELER) {
    'use strict';
    $('#aeTitel').text('Spieler mit ähnlichen Namen:');
    $("#lvAehnlich").empty();
    var nGleich = 0;
    pNNAME = pNNAME.toUpperCase();
    var fNNAME = pNNAME.toUpperCase();
    if (fNNAME.substr(0, 3) === 'SCH') {
        if (fNNAME.length > 5) {
            fNNAME = fNNAME.substr(0, 5);
        }
    } else {
        if (fNNAME.length > 3) {
            fNNAME = fNNAME.substr(0, 3);
        }
    }

    pVNAME = pVNAME.toUpperCase();
    var fVNAME = pVNAME.toUpperCase();
    if (fVNAME.length > 3) {
        fVNAME = fVNAME.substr(0, 3);
    }

    var fORT = pORT.toUpperCase();
    if (fORT.length > 3) {
        fORT = fORT.substr(0, 3);
    }

    SORT = [];
    var lVNAME = fVNAME.length;
    var lNNAME = fNNAME.length;
    var lORT = fORT.length;
    for (var spieler in SPIELERext) {
        if ((!pVNAME || SPIELERext[spieler][spVNAME].toUpperCase() === pVNAME)
                && (!pNNAME || SPIELERext[spieler][spNNAME].toUpperCase() === pNNAME)) {
            if (!pSPIELER || pSPIELER !== spieler) {
                nGleich++;
                SORT.push((SPIELERext[spieler][spNNAME] + ' ' + SPIELERext[spieler][spVNAME]).replace(/Ä/g, 'A').replace(/Ü/g, 'U').replace(/Ö/g, 'O').replace(/ä/g, 'a').replace(/ü/g, 'u').replace(/ö/g, 'o') + ';' + spieler);
            }
        } else if ((lVNAME === 0 || SPIELERext[spieler][spVNAME].substr(0, lVNAME).toUpperCase() === fVNAME)
                && (lNNAME === 0 || SPIELERext[spieler][spNNAME].substr(0, lNNAME).toUpperCase() === fNNAME)
                && (lORT === 0 || SPIELERext[spieler][spORT].substr(0, lORT).toUpperCase() === fORT)) {
            if (!pSPIELER || pSPIELER !== spieler) {
                SORT.push((SPIELERext[spieler][spNNAME] + ' ' + SPIELERext[spieler][spVNAME]).replace(/Ä/g, 'A').replace(/Ü/g, 'U').replace(/Ö/g, 'O').replace(/ä/g, 'a').replace(/ü/g, 'u').replace(/ö/g, 'o') + ';' + spieler);
            }
        }
    }

    SORT.sort();
    var cFarbe = '';
    for (var iSpieler in SORT) {
        spieler = SORT[iSpieler].substr(-4);
        if (SPIELERext[spieler][spGEAENDERTam] && SPIELERext[spieler][spGEAENDERTam] >= dZuletzt
                || SPIELERext[spieler][spANGELEGTam] && SPIELERext[spieler][spANGELEGTam] >= dZuletzt) {
            if (ifAktiv(spieler)) {
                cFarbe = 'cRot';
            } else {
                cFarbe = 'cHellrot';
            }
        } else {
            if (ifAktiv(spieler)) {
                cFarbe = '';
            } else {
                cFarbe = 'cGrau';
            }
        }

        $("#lvAehnlich").append("<li data-icon='false'><a id='GS" + spieler + "' onclick='showSPIELER(\"" + spieler + "\")'><span class='N " + cFarbe + "'>" + spieler + " </span><span class='" + cFarbe + "'> " + SPIELERext[spieler][spNNAME] + " " + SPIELERext[spieler][spVNAME] + (SPIELERext[spieler][spZUSATZ] ? ' ' + SPIELERext[spieler][spZUSATZ] : '') + (SPIELERext[spieler][spVERSTORBEN] ? "&nbsp;&nbsp;&#134;" : "") + "</span><span class='N " + cFarbe + "'><br>" + SPIELERext[spieler][spORT] + ", " + SPIELERext[spieler][spSTRASSE] + "</span></a></li>");
    }

    $('#lvAehnlich').listview().listview('refresh');
    if (fORT) {
        fORT = fORT[0] + fORT[1].toLowerCase() + fORT[2].toLowerCase();
    }

    if (SORT.length) {
        var hText = '';
        if (nGleich) {
            hText = "Es wurde " + (nGleich === 1 ? "ein" : nGleich) + " Spieler mit gleichen Namen gefunden.";
        }
        if (SORT.length - nGleich) {
            if (nGleich) {
                hText += '<br>Weiters wurde' + (SORT.length - nGleich === 1 ? 'n' : '') + ' in <b>' + fORT + '*</b> ' + (SORT.length - nGleich === 1 ? "ein" : SORT.length - nGleich) + ' Spieler mit ähnlichen Namen gefunden.';
            } else if (SORT.length === 1) {
                $('#aeText').html('<br>In <b>' + fORT + '*</b> wurde ein Spieler mit ähnlichen Namen gefunden.');
            } else {
                $('#aeText').html('<br>In <b>' + fORT + '*</b> wurden Spieler mit ähnlichen Namen gefunden.');
            }
        }
        if (hNeu) {
            hText += '<div style="color:crimson"><b>Ist der neue Spieler mit ' + (SORT.length === 1 ? 'diesem' : 'einem dieser') + ' Spieler ident, darf der Spieler nicht angelegt werden.</b><div>';
        }
        $('#aeText').html(hText);
        $('#bBestaetigen1').hide();
        if (hNeu) {
            $('#bBestaetigen2').show();
        } else {
            $('#bBestaetigen2').hide();
        }
    } else {
        $('#aeText').html('<br>In <b>' + fORT + '</b>* gibt es keine anderen Spieler mit diesem Namen.'
                + (hNeu ? '<br><br><b>Bitte überprüfe auch andere in Frage kommende Orte und Schreibweisen, bevor du den Spieler anlegst.</b>' : ''));
        $('#bBestaetigen1').hide();
        $('#bBestaetigen2').hide();
    }

    $("#iNNAME,#iVNAME,#iORT").click(function () {
        if (hNeu) {
            $("#bOK").addClass('ui-disabled');
        }
    });
}

function onSpeichern() {
    'use strict';
    SPIELERnrUpdate = {
//         #################################################################################################################
//        '9999': null // So werden Spieler gelöscht! #####################################################################
//         #################################################################################################################
    };
    SPIELERextUpdate = {
//         Da Arrays nicht physisch kopiert werden, ########################################################################
//        '9999': null // So werden Spieler gelöscht! #####################################################################
//         muß SPIELERextUpdate hier expliziet initialisiert werden. #######################################################
    };
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

    var html = '';
    for (var spieler in SPIELERext) {
        if (SPIELERext[spieler][spGEAENDERTvon]) {
            if (SPIELERext[spieler][spGEAENDERTam] === hThisSession) {
                SPIELERext[spieler][spGEAENDERTam] = new Date().toJSON().substr(0, 10);
                html += spieler + ' <b>' + SPIELERext[spieler][spNNAME] + ' ' + SPIELERext[spieler][spVNAME] + '</b> aus ' + SPIELERext[spieler][spORT] + ' wird ge&auml;ndert.<br>';
                SPIELERnrUpdate[spieler] = getSPIELERnr(spieler);
                SPIELERextUpdate[spieler] = SPIELERext[spieler];
            } else if (SPIELERext[spieler][spGEAENDERTvon].indexOf(' Statusaenderung') >= 0) {
                if (SPIELERext[spieler][spGEAENDERTvon] === ' Statusaenderung') {
                    if (SPIELERext[spieler][spANGELEGTam]) {
                        SPIELERext[spieler] = SPIELERext[spieler].slice(0, spGEAENDERTam);
                    } else {
                        SPIELERext[spieler] = SPIELERext[spieler].slice(0, spANGELEGTam);
                    }
                } else {
                    SPIELERext[spieler][spGEAENDERTvon] = SPIELERext[spieler][spGEAENDERTvon].substr(0, SPIELERext[spieler][spGEAENDERTvon].indexOf(' Statusaenderung'));
                }
                html += spieler + ' <b>' + SPIELERext[spieler][spNNAME] + ' ' + SPIELERext[spieler][spVNAME] + '</b> aus ' + SPIELERext[spieler][spORT] + ' wird ' + (SPIELERext[iNR][spAKTIV].indexOf(kzAktiv) >= 0 ? '' : 'de') + 'aktiviert.<br>';
                SPIELERnrUpdate[spieler] = getSPIELERnr(spieler);
                SPIELERextUpdate[spieler] = SPIELERext[spieler];
            }
        } else if (SPIELERext[spieler][spANGELEGTvon]) {
            if (SPIELERext[spieler][spANGELEGTam] === hThisSession) {
                SPIELERext[spieler][spANGELEGTam] = new Date().toJSON().substr(0, 10);
                html += spieler + ' <b>' + SPIELERext[spieler][spNNAME] + ' ' + SPIELERext[spieler][spVNAME] + '</b> aus ' + SPIELERext[spieler][spORT] + ' wird angelegt.<br>';
                SPIELERnrUpdate[spieler] = getSPIELERnr(spieler);
                SPIELERextUpdate[spieler] = SPIELERext[spieler];
            }
        }
    }

    showEinenMoment('Spieler speichern:', html);
    firebase.database().ref('/00/Spieler/SPIELERext')
            .update(SPIELERextUpdate)
            .then(function () {
                firebase.database().ref('/00/CUPS/SPIELERnr')
                        .update(SPIELERnrUpdate)
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
                            }
                            function Comparator(a, b) {
                                var aNN = a[1].replace(/Ä/g, 'A').replace(/Ü/g, 'U').replace(/Ö/g, 'O').replace(/ä/g, 'a').replace(/ü/g, 'u').replace(/ö/g, 'o');
                                var aVN = a[2].replace(/Ä/g, 'A').replace(/Ü/g, 'U').replace(/Ö/g, 'O').replace(/ä/g, 'a').replace(/ü/g, 'u').replace(/ö/g, 'o');
                                var bNN = b[1].replace(/Ä/g, 'A').replace(/Ü/g, 'U').replace(/Ö/g, 'O').replace(/ä/g, 'a').replace(/ü/g, 'u').replace(/ö/g, 'o');
                                var bVN = b[2].replace(/Ä/g, 'A').replace(/Ü/g, 'U').replace(/Ö/g, 'O').replace(/ä/g, 'a').replace(/ü/g, 'u').replace(/ö/g, 'o');
                                if (aNN < bNN || aNN === bNN && aVN < bVN)
                                    return -1;
                                if (aNN > bNN || aNN === bNN && aVN > bVN)
                                    return 1;
                                return 0;
                            }
                            SPIELERalpha.sort(Comparator);
                            hideEinenMoment();
                            LS.Meldung = ('Spieler wurden angelegt/ge&auml;ndert!');
                            localStorage.setItem('Abakus.LS', JSON.stringify(LS));
                            localStorage.setItem('Abakus.SPIELERnr', JSON.stringify(SPIELERnr));
                            localStorage.setItem('Abakus.SPIELERalpha', JSON.stringify(SPIELERalpha));
                            window.history.back();
                        })
                        .catch(function (error) {
                            showEineDBWarnung(error, 'Update /00/CUPS/SPIELERnr:');
                        });
            })
            .catch(function (error) {
                showEineDBWarnung(error, 'Update /00/Spieler/SPIELERext:');
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

    firebase.initDB(0, 'admin');

    if (LS.ME === '3425') {
        SPIELERext = JSON.parse(localStorage.getItem('Abakus.SPIELERext'));
    }
//    if (SPIELERext) {
//        whenSPIELERloaded();
//    } else {
    loadSPIELER();
//    }

    $("input:radio[name=iSort][value=1]").prop('checked', true).checkboxradio("refresh");
    $("input[name='iSort']").on("change", function () {
        spielerAnzeigen();
    });

    $("#iNTage").change(function () {
        var iNTage = $("#iNTage").val();
        if (iNTage === '' || isNaN(iNTage)) {
            $('#iNTage').val(14);
        }
        if (iNTage < 1) {
            $('#iNTage').val(1);
        }
        dZuletzt = new Date();
        dZuletzt.setHours(1); // 1 wegen der Sommerzeit
        dZuletzt = dZuletzt.valueOf();
        dZuletzt -= 86400000 * (iNTage - 1);
        //  1 Tag    86 400 000 ms
        dZuletzt = new Date(dZuletzt).toJSON().substr(0, 10);
    });

    if (/iPad|iPhone/.test(navigator.userAgent)) {
        window.onbeforeunload = function (event) {
            $('body').addClass('ui-disabled');
        };
    }

});