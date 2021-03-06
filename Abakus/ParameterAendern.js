
/* global CUPS, LS, firebase, pell */

var FB = undefined;
var STAT = new Object();
var oNEXTTERMIN = 0;
var I = 0;
var mCupLoeschen = -1;
var iNeu;
var iName;
var iAdmin;
var hRundeTurnier = 'Runde';
var editor = null;
var myJBox = null;
var myJTip = null;

function myJBoxClose() {
    myJBox.close();
}

function iABWTARIFEonClick() {
    if ($("#iABWTARIFE").prop("checked")) {
        if ($("#iR_WR").prop("checked")) {
            $('#dZusSpiele').show();
            $("#iTARIF1").val(1); // Rufer
            $("#iTARIF2").val(4); // 6er
            $("#iTARIF3").val(5); // 3er
            $("#iTARIF4").val(5); // Farben-3er
            $("#iTARIF5").val(10); // Farbensolo
            $("#iTARIF6").val(2); // Trischaken
            $("#iTARIF7").val(2); // Pi/Zwiccolo
            $("#iTARIF8").val(4); // Bettler
            $("#iTARIF9").val(6); // Pi/Zwiccolo overt
            $("#iTARIF10").val(8); // Bettler overt
            $("#iTARIF19").val(10); // Valat 0 = * 4 / * 8
            $("#iTARIF20").val(0); // Absolut
            $("#iTARIF21").val(0); // XY
            $("#iTARIF20T").val(''); // Absolut
            $("#iTARIF21T").val(''); // XY
        } else if ($("#iR_OOE").prop("checked")) {
            $('#dZusSpiele').show();
            $("#iTARIF1").val(1); // Rufer
            $("#iTARIF2").val(4); // 6er
            $("#iTARIF3").val(4); // 3er
            $("#iTARIF4").val(0); // Farben-3er
            $("#iTARIF5").val(5); // Farbensolo
            $("#iTARIF6").val(1); // Trischaken
            $("#iTARIF7").val(2); // Pi/Zwiccolo
            $("#iTARIF8").val(2); // Bettler
            $("#iTARIF9").val(6); // Pi/Zwiccolo overt
            $("#iTARIF10").val(7); // Bettler overt
            $("#iTARIF19").val(0); // Valat 0 = * 4 / * 8
            $("#iTARIF20").val(0); // Absolut
            $("#iTARIF21").val(0); // XY
            $("#iTARIF20T").val(''); // Absolut
            $("#iTARIF21T").val(''); // XY
        } else {
            $('#dZusSpiele').hide();
            $("#iTARIF1").val(1); // Rufer
            $("#iTARIF2").val(4); // 6er
            $("#iTARIF3").val(5); // 3er
            $("#iTARIF4").val(5); // Farben-3er
            $("#iTARIF5").val(10); // Farbensolo
            $("#iTARIF6").val(2); // Trischaken
            $("#iTARIF7").val(2); // Pi/Zwiccolo
            $("#iTARIF8").val(4); // Bettler
            $("#iTARIF9").val(8); // Pi/Zwiccolo overt
            $("#iTARIF10").val(8); // Bettler overt
            $("#iTARIF19").val(10); // Valat + 10 / + 20
            $("#iTARIF20").val(1); // Absolut
            $("#iTARIF21").val(1); // XY
            $("#iTARIF20T").val('Sack'); // Absolut
            $("#iTARIF21T").val('XY'); // XY
        }
        $("#iTARIF11").val(1); // Pagat
        $("#iTARIF12").val(2); // Uhu
        $("#iTARIF13").val(3); // Kakadu
        $("#iTARIF14").val(4); // Quapil
        $("#iTARIF15").val(0); // V  // Reserviert für Selberrufer
        $("#iTARIF16").val(1); // Trull
        $("#iTARIF17").val(1); // Vier Könige
        $("#iTARIF18").val(1); // König ultimo
        $('#dABWTARIFE').show();
    } else {
        $('#dABWTARIFE').hide();
    }
}

function iANMELDERFonClick() {

    if ($("#iANMELDERF").prop("checked")) {
        $('#dANMELDERF').show();
    } else {
        $('#dANMELDERF').hide();
    }
}

function iSEMIOUVERTonClick() {

    if ($("#iSEMIOUVERT").prop("checked")) {
        $('#tSemiouvert').text(' Semiouvert:');
        $('#tOuvert').text(' Ouvert:');
    } else {
        $('#tSemiouvert').text(' Pi/Zwi. ouvert:');
        $('#tOuvert').text(' Bettler ouvert:');
    }
}

function rundeKopieren() {
    'use strict';
    if (myJBox) {
        myJBox.close().destroy();
        $('#jBox-overlay').remove();
    }
    myJBox = new jBox('Modal', {
        title: '<div class=M style="background-color:#27a;border:8px solid #27a;color: white;">&nbsp;' + hRundeTurnier + ' kopieren nach:</div>',
        content: '<div class=M>'
            + '<div class="ui-grid-b">'
            + '<div class="ui-block-a" style="width:22%;"> Index:</div>'
            + '<div class="ui-block-b" style="width:15%;text-align:center;"><input id="iKIndex" type="number" min=1 max=999 data-role="none" style="background:silver;text-align:center;font-weight:bold;"></div>'
            + '<div class="ui-block-c cRot" style="width:63%;margin-top:.8em;text-align:center" id=kFText></div>'
            + '</div>'
            + '<div class="ui-grid-a">'
            + '<div class="ui-block-a" style="width:22%;"> Name:</div>'
            + '<div class="ui-block-b" style="width:78%;text-align:left;"><input id="iKName" type="text" style="background:silver;font-weight:bold;"></div>'
            + '</div>'
            + '<div class="ui-grid-b">'
            + '<div class="ui-block-a" style="width:22%;"> Admin:</div>'
            + '<div class="ui-block-b" style="width:27%;text-align:left;"><input id="iAdmin" type="text" style="background:silver;font-weight:bold;"></div>'
            + '</div>'
            + '<div class="ui-grid-a">'
            + '<div class="ui-block-a"><button onClick="myJBoxClose();" data-theme="a">zur&uuml;ck</button></div>'
            + '<div class="ui-block-b"><button onClick="copyCUPS();" data-theme="e">kopieren</button></div>'
            + '</div>'
            + '</div>',
        position: { x: 'center', y: 111 }
    }).open();
}

function copyCUPS() {
    'use strict';
    iNeu = parseInt($("#iKIndex").val());
    iAdmin = $("#iAdmin").val();
    if (isNaN(iNeu) || iNeu <= 0) {
        $("#kFText").html('<b>Index ung&uumlltig.</b>');
        return;
    }
    if (iNeu === 3) {
        iName = "Tarockcup (Test)";
        $("#iKName").val(iName);
    } else if (iNeu === 4) {
        if (CUPS.TURNIER[I] === 'Handy') {
            iName = "Spontanturnier - Test";
        } else if (CUPS.TURNIER[I] !== 'Handy') {
            iName = "PC-Turnier - Test";
        } else {
            iName = "Private Runde - Test";
        }
        iName = CUPS.NAME[I] + ' (Test)';
        $("#iKName").val(iName);
    } else {
        if (CUPS.NAME[iNeu]) {
            $("#kFText").html('<b>' + CUPS.NAME[iNeu] + '</b> existiert bereits!');
            return;
        }
        iName = $("#iKName").val().trim();
        if (iName.length < 5) {
            $("#kFText").text('Name zu kurz.');
            return;
        }
    }
    if (iAdmin.length > 4) {
        $("#kFText").text('Ungültiger Admin.');
        return;
    }

    showEinenMoment(iName + ':', hRundeTurnier + ' wird erstellt.');
    CUPS.ANMELDERF[iNeu] = CUPS.ANMELDERF[I];
    CUPS.BEREadmin[iNeu] = iAdmin;
    CUPS.BEREschreiben[iNeu] = CUPS.BEREschreiben[I];
    CUPS.DISPAB[iNeu] = CUPS.DISPAB[I];
    CUPS.DOPPELTERUNDEN[iNeu] = CUPS.DOPPELTERUNDEN[I];
    CUPS.EINER[iNeu] = CUPS.EINER[I];
    CUPS.SEMIOUVERT[iNeu] = CUPS.SEMIOUVERT[I];
    CUPS.NAME[iNeu] = iName;
    CUPS.NAME2LEN[iNeu] = CUPS.NAME2LEN[I];
    CUPS.NEXTTERMIN[iNeu] = CUPS.NEXTTERMIN[I];
    CUPS.REGELN[iNeu] = CUPS.REGELN[I];
    CUPS.RUNDEN[iNeu] = CUPS.RUNDEN[I];
    CUPS.SPIELEAB[iNeu] = parseInt($("#iSPIELEAB").val()); // die Korrektur übernehmen
    if (isNaN(CUPS.SPIELEAB[iNeu])) {
        CUPS.SPIELEAB[I] = 0;
    }

    CUPS.SPIELTAGE[iNeu] = CUPS.SPIELTAGE[I];
    CUPS.WOCHEN[iNeu] = CUPS.WOCHEN[I];
    CUPS.SPJERUNDE[iNeu] = CUPS.SPJERUNDE[I];
    CUPS.SWNAME[iNeu] = CUPS.SWNAME[I];
    CUPS.TARIF[iNeu] = CUPS.TARIF[I];
    CUPS.TEXT1[iNeu] = CUPS.TEXT1[I];
    CUPS.TYP[iNeu] = CUPS.TYP[I];
    CUPS.VOLLAB[iNeu] = CUPS.VOLLAB[I];
    if (CUPS.TURNIER[I]) {
        CUPS.TURNIER[iNeu] = CUPS.TURNIER[I];
    } else {
        CUPS.TURNIER[iNeu] = null;
    }
    if (iNeu === 4) {
        CUPS.TEXT1[iNeu] = iName + '<br>ist eine Kopie von<br><b>' + CUPS.NAME[I] + '</b>.';
        LS.TURCODE = 0;
        LS.TURADMIN = '';
        LS.TURTIMESTAMP = null;
        LS.TURRUNDE = 0;
        LS.TURSPIELER = 0;
        LS.TURGESPIELT = 0;
    }

    var hCUPS = new Object();
    hCUPS.ANMELDERF = CUPS.ANMELDERF[I];
    hCUPS.BEREadmin = iAdmin;
    hCUPS.BEREschreiben = CUPS.BEREschreiben[I];
    hCUPS.DISPAB = CUPS.DISPAB[I];
    hCUPS.DOPPELTERUNDEN = CUPS.DOPPELTERUNDEN[I];
    hCUPS.EINER = CUPS.EINER[I];
    hCUPS.SEMIOUVERT = CUPS.SEMIOUVERT[I];
    hCUPS.NAME = iName;
    hCUPS.NAME2LEN = CUPS.NAME2LEN[I];
    hCUPS.NEXTTERMIN = CUPS.NEXTTERMIN[I];
    hCUPS.REGELN = CUPS.REGELN[I];
    hCUPS.RUNDEN = CUPS.RUNDEN[I];
    hCUPS.SPIELEAB = CUPS.SPIELEAB[I];
    hCUPS.SPIELTAGE = CUPS.SPIELTAGE[I];
    hCUPS.WOCHEN = CUPS.WOCHEN[I];
    hCUPS.SPJERUNDE = CUPS.SPJERUNDE[I];
    hCUPS.SWNAME = CUPS.SWNAME[I];
    hCUPS.TARIF = CUPS.TARIF[I];
    hCUPS.TARIF20T = CUPS.TARIF20T[I];
    hCUPS.TARIF21T = CUPS.TARIF21T[I];
    hCUPS.TEXT1 = CUPS.TEXT1[I];
    hCUPS.TYP = CUPS.TYP[I];
    hCUPS.VOLLAB = CUPS.VOLLAB[I];
    if (CUPS.TURNIER[I]) {
        hCUPS.TURNIER = CUPS.TURNIER[I];
    }
    if (iNeu === 4) {
        hCUPS.TEXT1 = iName + '<br>ist eine Kopie von<br><b>' + CUPS.NAME[I] + '</b>.';
    }

    firebase.database().ref('/00/CUPS/' + ('000' + iNeu).substr(-3))
        .set(hCUPS)  // ACHTUNG !!! .set(...) ist gefählich wie sonst nichts
        .then(function () {
            if (iNeu === 4) {
                //                    loadSTAT(I, '', false, copySTAT);
                firebase.database().ref('/00/' + ('000' + iNeu).substr(-3)).once('value')
                    .then(function (snapshot) {
                        firebase.database().ref('/00/004')
                            .set(snapshot.val())  // ACHTUNG !!! .set(...) ist gefählich wie sonst nichts
                            .then(function () {
                                copyEND();
                            })
                            .catch(function (error) {
                                showEineDBWarnung(error, 'copyCUPS()', 'Set /00/004.');
                            });
                    }, function (error) {
                        showEineDBWarnung(error, 'copyCUPS()', 'Get /00/' + ('000' + iNeu).substr(-3) + '.');
                        return false;
                    });
            } else {
                copyEND();
            }
        })
        .catch(function (error) {
            showEinenFehler('Internet Verbindungsfehler.', 'Später noch mal probieren.');
            console.error("onSubmitCup: Nix is OK !");
        });
}

function copySTAT() {
    'use strict';
    var hSTAT = new Object();
    if (CUPS.TYP[I] === 'CUP' || CUPS.TYP[I] === 'TC') {
        hSTAT = STAT;
    } else {
        hSTAT.ZULETZT = new Date(new Date(STAT.ZULETZT).getTime() - 60000 * new Date().getTimezoneOffset()).toISOString();
        hSTAT.ZULETZTupd = STAT.ZULETZTupd;
        if (CUPS.TURNIER[I]) {
            hSTAT.TURCODE = 0;
            hSTAT.TURRUNDE = 0;
        }
        if (STAT.NEXTTERMIN) {
            hSTAT.NEXTTERMIN = STAT.NEXTTERMIN;
        }
        for (var ii = 1; ii < STAT.S.length; ii++) { // 0000 nicht kopieren
            if (STAT.S[ii]) {
                hSTAT[STAT.S[ii].NR] = STAT.S[ii];
                hSTAT[STAT.S[ii].NR].TIMESTAMP = new Date(new Date(STAT.S[ii].TIMESTAMP).getTime() - 60000 * new Date().getTimezoneOffset()).toISOString();
            }
        }
    }

    firebase.database().ref('/00/' + ('000' + iNeu).substr(-3))
        .set(hSTAT)  // ACHTUNG !!! .set(...) ist gefählich wie sonst nichts
        .then(function () {
            copyEND();
        })
        .catch(function (error) {
            showEineDBWarnung(error, 'copySTAT()', 'STAT set');
        });
}

function copyEND() {
    'use strict';
    localStorage.setItem('Abakus.CUPS', JSON.stringify(CUPS));
    LS.ShowCups = iNeu;
    LS.Meldung = hRundeTurnier + ' wurde erstellt.';
    localStorage.setItem('Abakus.LS', JSON.stringify(LS));
    hideEinenMoment();
    setTimeout(function () {
        window.history.back();
    });
}

function onSubmit() {
    'use strict';
    var hBEREadmin = $("#iBEREadmin").val().trim();
    var hBEREschreiben = $("#iBEREschreiben").val().trim();
    if (hBEREadmin.indexOf(LS.ME) >= 0 && hBEREschreiben.indexOf(LS.ME) >= 0) {
        showEinenTip("#iBEREschreiben", 'Du kannst nicht gleichzeitig<br>Admin und Stellvertreter sein.');
        return;
    }

    if (hBEREadmin.indexOf(LS.ME) >= 0 && CUPS.BEREschreiben[I].indexOf(LS.ME) >= 0) {
        showEinenTip("#iBEREadmin", 'Ein Stellvertreter kann sich nicht<br>selbst Adminrechte vergeben.');
        return;
    }

    if ($("#iBEREadmin").val().trim().length < 4 && hBEREadmin !== '*') {
        showEinenTip("#iBEREadmin", 'Es muss mindestens ein Administrator angegeben werden.');
        return;
    }

    if (CUPS.TURNIER[I] && CUPS.TURNIER[I] === "Handy") {
        if (!$("#iANMELDERF").is(':checked')) {
            showEinenTip("#iANMELDERF", 'Spontanturniere sind nur mit Anmeldung möglich!');
            return;
        }
    }

    if (mCupLoeschen === 1) {
        if (CUPS.NAME[I] !== $("#iCupLoeschen").val()) {
            if ($('#tLoeschen').html() === 'Die Statistik welcher Runde, welches Cups soll gelöscht werden?') {
                $('#tLoeschen').html('Welche Statistik willst du l&ouml;schen?');
            } else {
                $('#tLoeschen').html('Die Statistik welcher Runde, welches Cups soll gelöscht werden?');
            }
            $("#iCupLoeschen").focus();
            $('html, body').scrollTop($(document).height());
            return false;
        }
        showEinenMoment(CUPS.NAME[I], 'Statistik&nbsp;wird&nbsp;gelöscht.');
    } else {
        showEinenMoment(CUPS.NAME[I], 'Daten&nbsp;werden&nbsp;gespeichert.');
    }

    if (CUPS.TYP[I] === 'CUP' || CUPS.TYP[I] === 'ET' || CUPS.TYP[I] === 'MT'
        || (LS.ME === '3425' || LS.ME === '3244') && CUPS.BEREadmin[I].indexOf(LS.ME) > 0) {
        $("#iBEREadmin").removeClass('ui-disabled');
        CUPS.BEREadmin[I] = $("#iBEREadmin").val().trim();
        if (CUPS.BEREadmin[I] === '') {
            CUPS.BEREadmin[I] = '-';
        }
    }
    CUPS.BEREschreiben[I] = $("#iBEREschreiben").val().trim();
    if (CUPS.BEREschreiben[I] === '') {
        CUPS.BEREschreiben[I] = '-';
    }

    CUPS.TEXT1[I] = repairPell(editor.content.innerHTML);
    if (!CUPS.TEXT1[I]) {
        CUPS.TEXT1[I] = null;
    }

    if (CUPS.TURNIER[I]) {
        CUPS.MELDSTAT[I] = $("#iSCHLAGZEILE").val();
        if (!CUPS.MELDSTAT[I]) {
            CUPS.MELDSTAT[I] = null;
        }
    }

    CUPS.REGELN[I] = $("input:radio[name=iREGELN]:checked").val();
    CUPS.SPIELEAB[I] = parseInt($("#iSPIELEAB").val());
    if (isNaN(CUPS.SPIELEAB[I])) {
        CUPS.SPIELEAB[I] = 0;
    }
    CUPS.SWNAME[I] = ['V', 'VN', 'NV'][$("input:radio[name=iSWNAME]:checked").val()];
    CUPS.NAME2LEN[I] = parseInt($("#iNAME2LEN").val());
    if (isNaN(CUPS.NAME2LEN[I])) {
        CUPS.NAME2LEN[I] = 0;
    }

    if ($("#iNEXTTERMIN").val()) {
        var hNextTermin = new Date($("#iNEXTTERMIN").val());
        hNextTermin.setHours(22); // 22 wegen der Sommerzeit
        hNextTermin.setMinutes(59);
        hNextTermin.setSeconds(59);
        hNextTermin.setMilliseconds(999);
        CUPS.NEXTTERMIN[I] = hNextTermin.valueOf();
    } else {
        CUPS.NEXTTERMIN[I] = 0;
    }

    if ($("#iDOPRUNDEN").is(':checked')) {
        CUPS.DOPPELTERUNDEN[I] = true;
    } else {
        CUPS.DOPPELTERUNDEN[I] = false;
    }
    if (CUPS.REGELN[I] === 'Ti.') {
        CUPS.EINER[I] = false;
        CUPS.SEMIOUVERT[I] = false;
    } else {
        if ($("#iEINER").is(':checked')) {
            CUPS.EINER[I] = true;
        } else {
            CUPS.EINER[I] = false;
        }
        if ($("#iSEMIOUVERT").is(':checked')) {
            CUPS.SEMIOUVERT[I] = true;
        } else {
            CUPS.SEMIOUVERT[I] = false;
        }
    }
    CUPS.ANMELDERF[I] = $("#iANMELDERF").is(':checked');
    if ($("#dABWTARIFE").is(":visible")) {
        for (var ii = 1; ii <= 21; ii++) {
            CUPS.TARIF[I][ii] = parseInt($("#iTARIF" + ii).val());
            if (isNaN(CUPS.TARIF[I][ii])) {
                CUPS.TARIF[I][ii] = 0;
            }
        }
        CUPS.TARIF20T[I] = $("#iTARIF20T").val();
        CUPS.TARIF21T[I] = $("#iTARIF21T").val();
    } else {
        CUPS.TARIF[I] = [];
        if (CUPS.REGELN[I] === 'Ti.') {
            CUPS.TARIF20T[I] = 'Sack';
            CUPS.TARIF21T[I] = 'XY';
        } else {
            CUPS.TARIF20T[I] = '';
            CUPS.TARIF21T[I] = '';
        }
    }

    CUPS.DISPAB[I][0] = parseInt($("#iDISPAB0").val());
    if (isNaN(CUPS.DISPAB[I][0])) {
        CUPS.DISPAB[I][0] = 0;
    }
    CUPS.DISPAB[I][1] = parseInt($("#iDISPAB1").val());
    if (isNaN(CUPS.DISPAB[I][1])) {
        CUPS.DISPAB[I][1] = 0;
    }
    CUPS.DISPAB[I][2] = CUPS.DISPAB[I][1];
    CUPS.DISPAB[I][3] = parseInt($("#iDISPAB3").val());
    if (isNaN(CUPS.DISPAB[I][3])) {
        CUPS.DISPAB[I][3] = 0;
    }
    CUPS.VOLLAB[I][0] = parseInt($("#iVOLLAB0").val());
    if (isNaN(CUPS.VOLLAB[I][0])) {
        CUPS.VOLLAB[I][0] = 0;
    }
    CUPS.VOLLAB[I][1] = parseInt($("#iVOLLAB1").val());
    if (isNaN(CUPS.VOLLAB[I][1])) {
        CUPS.VOLLAB[I][1] = 0;
    }
    CUPS.VOLLAB[I][2] = CUPS.VOLLAB[I][1];
    CUPS.VOLLAB[I][3] = parseInt($("#iVOLLAB3").val());
    if (isNaN(CUPS.VOLLAB[I][3])) {
        CUPS.VOLLAB[I][3] = 0;
    }

    if (CUPS.TURNIER[I] && CUPS.TURNIER[I] === "Handy") {
        CUPS.RUNDEN[I] = parseInt($("#iRUNDEN").val());
        if (isNaN(CUPS.RUNDEN[I])) {
            CUPS.RUNDEN[I] = 0;
        }
    } else {
        CUPS.RUNDEN[I] = null;
    }

    CUPS.SPJERUNDE[I] = parseInt($("#iSPJERUNDE").val());
    if (isNaN(CUPS.SPJERUNDE[I])) {
        CUPS.SPJERUNDE[I] = 0;
    }

    var hCUPS = new Object();
    hCUPS.ANMELDERF = CUPS.ANMELDERF[I];
    hCUPS.BEREadmin = CUPS.BEREadmin[I];
    hCUPS.BEREschreiben = CUPS.BEREschreiben[I];
    hCUPS.DISPAB = CUPS.DISPAB[I];
    hCUPS.NAME = CUPS.NAME[I];
    hCUPS.NAME2LEN = CUPS.NAME2LEN[I];
    hCUPS.NEXTTERMIN = CUPS.NEXTTERMIN[I];
    hCUPS.REGELN = CUPS.REGELN[I];
    hCUPS.RUNDEN = CUPS.RUNDEN[I];
    hCUPS.SPIELEAB = CUPS.SPIELEAB[I];
    hCUPS.SPIELTAGE = CUPS.SPIELTAGE[I];
    hCUPS.WOCHEN = CUPS.WOCHEN[I];
    hCUPS.SPJERUNDE = CUPS.SPJERUNDE[I];
    hCUPS.SWNAME = CUPS.SWNAME[I];
    hCUPS.DOPPELTERUNDEN = CUPS.DOPPELTERUNDEN[I];
    hCUPS.EINER = CUPS.EINER[I];
    hCUPS.SEMIOUVERT = CUPS.SEMIOUVERT[I];
    hCUPS.TARIF = CUPS.TARIF[I];
    hCUPS.TARIF20T = CUPS.TARIF20T[I];
    hCUPS.TARIF21T = CUPS.TARIF21T[I];
    hCUPS.TEXT1 = CUPS.TEXT1[I];
    hCUPS.TYP = CUPS.TYP[I];
    hCUPS.VOLLAB = CUPS.VOLLAB[I];
    if (CUPS.TURNIER[I]) {
        hCUPS.TURNIER = CUPS.TURNIER[I];
        hCUPS.MELDSTAT = CUPS.MELDSTAT[I];
    }

    firebase.database().ref('/00/CUPS/' + ("000" + I).substr(-3))
        .update(hCUPS)  // ACHTUNG !!! .set(...) ist gefählich wie sonst nichts
        .then(function () {
            firebase.database().ref('/00/CUPS')
                .update({ TIMESTAMP: firebase.database.ServerValue.TIMESTAMP })
                .then(function () {
                    localStorage.setItem('Abakus.CUPS', JSON.stringify(CUPS));
                    if (LS.I === I) {
                        LS.CupName = CUPS.NAME[LS.I];
                        LS.Regeln = CUPS.REGELN[LS.I];
                        LS.Spieltyp = CUPS.TYP[LS.I];
                        LS.SpieleJeRunde = CUPS.SPJERUNDE[LS.I];
                        if (CUPS.DOPPELTERUNDEN[LS.I]) {
                            LS.DoppelteRunden = true;
                        } else {
                            LS.DoppelteRunden = false;
                        }
                        if (CUPS.EINER[LS.I]) {
                            LS.Einer = true;
                        } else {
                            LS.Einer = false;
                        }
                        if (CUPS.SEMIOUVERT[LS.I]) {
                            LS.Semiouvert = true;
                        } else {
                            LS.Semiouvert = false;
                        }
                    }
                    LS.ShowCups = I;
                    LS.Meldung = 'Die Parameter wurden geändert!';
                    localStorage.setItem('Abakus.LS', JSON.stringify(LS));
                    if (mCupLoeschen === 1) {
                        statistikLoeschen();
                    } else {
                        if (CUPS.NEXTTERMIN[I] !== oNEXTTERMIN) {
                            updNEXTTERMIN();
                        } else {
                            setTimeout(function () {
                                window.history.go(-1);
                            });
                        }
                    }
                })
                .catch(function (error) {
                    showEinenDBFehler(error);
                });
        })
        .catch(function (error) {
            showEinenFehler('Internet Verbindungsfehler.', 'Später noch mal probieren.');
            console.error("onSubmitCup: Nix is OK !");
        });
    return false;
}

function statistikLoeschen() {
    'use strict';
    //  showEinenFehler('Statistik wird gelöscht.', 'Einen Moment bitte.')
    $('#tLoeschen').html('Die Statistik wird gelöscht!');
    var hCUPname = (("000" + I).substr(-3) + ' ' + CUPS.NAME[I]).replace(/\./g, "").replace(/\#/g, "").replace(/\$/g, "").replace(/\[/g, "").replace(/\]/g, "");
    firebase.database().ref('/00/' + hCUPname)
        .set(null)  // ACHTUNG !!! .set(...) ist gefählich wie sonst nichts
        .then(function () {
            firebase.database().ref('/00/' + ("000" + I).substr(-3))
                .set(null)  // ACHTUNG !!! .set(...) ist gefählich wie sonst nichts
                .then(function () {
                    if (localStorage.getItem("Abakus.STAT" + ("000" + I).substr(-3)) !== null) {
                        localStorage.removeItem("Abakus.STAT" + ("000" + I).substr(-3));
                    }
                    LS.ShowCups = I;
                    LS.Meldung = 'Die Statistik wurde gelöscht!';
                    $('#tLoeschen').html(LS.Meldung);
                    localStorage.setItem('Abakus.LS', JSON.stringify(LS));
                    if (CUPS.NEXTTERMIN[I] !== oNEXTTERMIN) {
                        updNEXTTERMIN();
                    } else {
                        setTimeout(function () {
                            window.history.go(-1);
                        });
                    }
                })
                .catch(function (error) {
                    showEinenDBFehler(error);
                });
        })
        .catch(function (error) {
            showEinenDBFehler(error);
        });
}

function updNEXTTERMIN() {
    'use strict';
    firebase.database().ref('/00/' + ("000" + I).substr(-3))
        .update({
            NEXTTERMIN: CUPS.NEXTTERMIN[I],
            ZULETZTupd: new Date().toISOString()
        })
        .then(function () {
            if (localStorage.getItem("Abakus.STAT" + ("000" + I).substr(-3)) !== null) {
                localStorage.removeItem("Abakus.STAT" + ("000" + I).substr(-3));
            }
            setTimeout(function () {
                window.history.go(-1);
            });
        })
        .catch(function (error) {
            showEinenDBFehler(error);
        });
}

$(document).bind('pageinit', function () {

    LS = new Object();
    LS = JSON.parse(localStorage.getItem('Abakus.LS'));
    if (LS.ME !== "3425") {
        document.oncontextmenu = function () {
            return false; // oncontextmenu
        };
    }

    I = LS.ShowCups;
    CUPS = new Object();
    CUPS = JSON.parse(localStorage.getItem('Abakus.CUPS'));
    firebase.initDB(0, 'rw');
    if (CUPS.TYP[I] === 'CUP') {
        $('#dRunden').hide();
    }
    if (CUPS.TYP[I] === 'CUP' || CUPS.TYP[I] === 'ET' || CUPS.TYP[I] === 'MT') {
        $('#dRundenBerechtigungen').remove();
        if (CUPS.BEREadmin[I].indexOf(LS.ME) < 0 && CUPS.BEREschreiben[I].indexOf(LS.ME) < 0 && LS.ME !== '3425') {
            $("#editor,#iBEREadmin,#iBEREschreiben,#bSpeichern").addClass('ui-disabled');
        }
    } else {
        $('#dCupBerechtigungen').remove();
        if ((LS.ME === '3425' || LS.ME === '3244') && CUPS.BEREadmin[I].indexOf(LS.ME) > 0) {
            $("#iBEREadmin").removeClass('ui-disabled');
        }
    }
    if (CUPS.TURNIER[I]) {
        if (CUPS.TURNIER[I] !== "Handy") {
            $('.cHandyTurnier').remove();
        }
        if (CUPS.MELDSTAT[I]) {
            $("#iSCHLAGZEILE").val(CUPS.MELDSTAT[I]);
        }
    } else {
        $('#dSchlagzeile').remove();
        $('.cHandyTurnier').remove();
    }

    $("#tNAME2").text(CUPS.NAME[I]);
    $("#iBEREadmin").val(CUPS.BEREadmin[I]);
    $("#iBEREschreiben").val(CUPS.BEREschreiben[I]);

    if (/iPad|iPhone/.test(navigator.userAgent) && !window.MSStream) {
        $("#editor").addClass('ui-disabled'); // Wenn auf iOS editierbar dann JS-Fehler!!!
        editor = window.pell.init({
            element: document.getElementById('editor'),
            actions: [],
            defaultParagraphSeparator: ''
        });
    } else {
        editor = window.pell.init({
            element: document.getElementById('editor'),
            actions: ['bold', 'italic', 'underline', 'superscript', 'subscript', 'olist', 'ulist', 'line', 'link', 'undo', 'redo'],
            defaultParagraphSeparator: ''
        });
        $('.pell-actionbar').attr('style', 'background-color:#ddd;border:1px solid;');
    }
    if (CUPS.TEXT1[I]) {
        setTimeout(function () {
            editor.content.innerHTML = CUPS.TEXT1[I];
        }, 0);
    }
    if (CUPS.REGELN[I] === 'Ti.') {
        $("#dZusSpiele").hide();
    }
    $("input:radio[name=iREGELN][value='Wr.']").prop('checked', (CUPS.REGELN[I] === 'Wr.')).checkboxradio("refresh");
    $("input:radio[name=iREGELN][value='Ooe.']").prop('checked', (CUPS.REGELN[I] === 'Ooe.')).checkboxradio("refresh");
    $("input:radio[name=iREGELN][value='Ti.']").prop('checked', (CUPS.REGELN[I] === 'Ti.')).checkboxradio("refresh");
    if (CUPS.TURNIER[I]) {
        CUPS.DOPPELTERUNDEN[I] = false;
        $("#iDOPRUNDEN").attr("disabled", true);
    }
    if (CUPS.DOPPELTERUNDEN[I]) {
        $("#iDOPRUNDEN").prop("checked", true).checkboxradio("refresh");
    } else {
        $("#iDOPRUNDEN").prop("checked", false).checkboxradio("refresh");
    }
    if (CUPS.EINER[I]) {
        $("#iEINER").prop("checked", true).checkboxradio("refresh");
    } else {
        $("#iEINER").prop("checked", false).checkboxradio("refresh");
    }
    if (CUPS.SEMIOUVERT[I]) {
        $("#iSEMIOUVERT").prop("checked", true).checkboxradio("refresh");
    } else {
        $("#iSEMIOUVERT").prop("checked", false).checkboxradio("refresh");
    }
    if (CUPS.ANMELDERF[I]) {
        $("#iANMELDERF").prop("checked", true).checkboxradio("refresh");
        $("#dANMELDERF").show();
    } else {
        $("#iANMELDERF").prop("checked", false).checkboxradio("refresh");
        $("#dANMELDERF").hide();
    }
    if (I === 80) {
        $("#iANMELDERF").attr("disabled", true);
        $("#dANMELDERF").show();
    }

    if (CUPS.TARIF[I][1]) {
        $("#iABWTARIFE").prop("checked", true).checkboxradio("refresh");
        $("#dABWTARIFE").show();
        for (var ii = 1; ii <= 21; ii++) {
            $("#iTARIF" + ii).val(CUPS.TARIF[I][ii]);
        }
    } else {
        $("#iABWTARIFE").prop("checked", false).checkboxradio("refresh");
        $("#dABWTARIFE").hide();
    }
    if (CUPS.TARIF20T[I]) {
        $("#iTARIF20T").val(CUPS.TARIF20T[I]);
    } else {
        $("#iTARIF20T").val('');
    }
    if (CUPS.TARIF21T[I]) {
        $("#iTARIF21T").val(CUPS.TARIF21T[I]);
    } else {
        $("#iTARIF21T").val('');
    }

    if (CUPS.TURNIER[I] === 'Handy') {
        hRundeTurnier = "Spontanturnier";
        $('#fsWoche').show();
    } else if (CUPS.TURNIER[I] !== 'Handy') {
        hRundeTurnier = "PC-Turnier";
        $('#fsWoche').show();
    } else {
        hRundeTurnier = "Runde";
    }

    if (LS.ME === '3425') {
        $('#dKopieren').show();
    }

    $("#iSO").prop("checked", false).checkboxradio("refresh");
    $("#iMO").prop("checked", false).checkboxradio("refresh");
    $("#iDI").prop("checked", false).checkboxradio("refresh");
    $("#iMI").prop("checked", false).checkboxradio("refresh");
    $("#iDO").prop("checked", false).checkboxradio("refresh");
    $("#iFR").prop("checked", false).checkboxradio("refresh");
    $("#iSA").prop("checked", false).checkboxradio("refresh");
    $("#iANMELDERF").prop("checked", false).checkboxradio("refresh");
    $('#iSO').bind("click", function (event, ui) {
        CUPS.SPIELTAGE[I] = CUPS.SPIELTAGE[I].substr(0, 0) + (CUPS.SPIELTAGE[I][0] === 'J' ? '-' : 'J') + CUPS.SPIELTAGE[I].substr(1, 6);
    });
    $('#iMO').bind("click", function (event, ui) {
        CUPS.SPIELTAGE[I] = CUPS.SPIELTAGE[I].substr(0, 1) + (CUPS.SPIELTAGE[I][1] === 'J' ? '-' : 'J') + CUPS.SPIELTAGE[I].substr(2, 5);
    });
    $('#iDI').bind("click", function (event, ui) {
        CUPS.SPIELTAGE[I] = CUPS.SPIELTAGE[I].substr(0, 2) + (CUPS.SPIELTAGE[I][2] === 'J' ? '-' : 'J') + CUPS.SPIELTAGE[I].substr(3, 4);
    });
    $('#iMI').bind("click", function (event, ui) {
        CUPS.SPIELTAGE[I] = CUPS.SPIELTAGE[I].substr(0, 3) + (CUPS.SPIELTAGE[I][3] === 'J' ? '-' : 'J') + CUPS.SPIELTAGE[I].substr(4, 3);
    });
    $('#iDO').bind("click", function (event, ui) {
        CUPS.SPIELTAGE[I] = CUPS.SPIELTAGE[I].substr(0, 4) + (CUPS.SPIELTAGE[I][4] === 'J' ? '-' : 'J') + CUPS.SPIELTAGE[I].substr(5, 2);
    });
    $('#iFR').bind("click", function (event, ui) {
        CUPS.SPIELTAGE[I] = CUPS.SPIELTAGE[I].substr(0, 5) + (CUPS.SPIELTAGE[I][5] === 'J' ? '-' : 'J') + CUPS.SPIELTAGE[I].substr(6, 1);
    });
    $('#iSA').bind("click", function (event, ui) {
        CUPS.SPIELTAGE[I] = CUPS.SPIELTAGE[I].substr(0, 6) + (CUPS.SPIELTAGE[I][6] === 'J' ? '-' : 'J') + CUPS.SPIELTAGE[I].substr(7, 0);
    });
    $('#iW1').bind("click", function (event, ui) {
        CUPS.WOCHEN[I] = CUPS.WOCHEN[I].substr(0, 0) + (CUPS.WOCHEN[I][0] === 'J' ? '-' : 'J') + CUPS.WOCHEN[I].substr(1, 4);
    });
    $('#iW2').bind("click", function (event, ui) {
        CUPS.WOCHEN[I] = CUPS.WOCHEN[I].substr(0, 1) + (CUPS.WOCHEN[I][1] === 'J' ? '-' : 'J') + CUPS.WOCHEN[I].substr(2, 3);
    });
    $('#iW3').bind("click", function (event, ui) {
        CUPS.WOCHEN[I] = CUPS.WOCHEN[I].substr(0, 2) + (CUPS.WOCHEN[I][2] === 'J' ? '-' : 'J') + CUPS.WOCHEN[I].substr(3, 2);
    });
    $('#iW4').bind("click", function (event, ui) {
        CUPS.WOCHEN[I] = CUPS.WOCHEN[I].substr(0, 3) + (CUPS.WOCHEN[I][3] === 'J' ? '-' : 'J') + CUPS.WOCHEN[I].substr(4, 1);
    });
    $('#iW5').bind("click", function (event, ui) {
        CUPS.WOCHEN[I] = CUPS.WOCHEN[I].substr(0, 4) + (CUPS.WOCHEN[I][4] === 'J' ? '-' : 'J') + CUPS.WOCHEN[I].substr(5, 0);
    });
    $('#iANMELDERF').bind("click", function (event, ui) {
        CUPS.ANMELDERF[I] = !CUPS.ANMELDERF[I];
    });
    $('#cbCupLoeschen').bind("click", function (event, ui) {

        if (LS.I === I && CUPS.TURNIER[LS.I]) {
            $("#cbCupLoeschen").prop("checked", false).checkboxradio("refresh");
            showEinenMoment(CUPS.NAME[I], '???');
            showEinenFehler('Es l&auml;uft ein Turnier.', 'L&ouml;schen nicht m&ouml;glich.');
            return false;
        }

        mCupLoeschen = mCupLoeschen * -1;
        if (mCupLoeschen === 1) {
            $('#bLoeschen').show();
            $('#tLoeschen').html('Die Statistik welcher Runde, welches Cups soll gelöscht werden?');
            $("#iCupLoeschen").focus();
            $('html, body').scrollTop($(document).height());
        } else {
            $("#iCupLoeschen").val('');
            $("#iCupLoeschen").filter(':input:focus').blur();
            $("#iCupLoeschen").val('');
            $('#bLoeschen').hide();
        }
    });
    if (CUPS.SPIELTAGE[I][0] === 'J') {
        $("#iSO").prop("checked", true).checkboxradio("refresh");
    }
    if (CUPS.SPIELTAGE[I][1] === 'J') {
        $("#iMO").prop("checked", true).checkboxradio("refresh");
    }
    if (CUPS.SPIELTAGE[I][2] === 'J') {
        $("#iDI").prop("checked", true).checkboxradio("refresh");
    }
    if (CUPS.SPIELTAGE[I][3] === 'J') {
        $("#iMI").prop("checked", true).checkboxradio("refresh");
    }
    if (CUPS.SPIELTAGE[I][4] === 'J') {
        $("#iDO").prop("checked", true).checkboxradio("refresh");
    }
    if (CUPS.SPIELTAGE[I][5] === 'J') {
        $("#iFR").prop("checked", true).checkboxradio("refresh");
    }
    if (CUPS.SPIELTAGE[I][6] === 'J') {
        $("#iSA").prop("checked", true).checkboxradio("refresh");
    }

    if (CUPS.WOCHEN[I][0] === 'J') {
        $("#iW1").prop("checked", true).checkboxradio("refresh");
    }
    if (CUPS.WOCHEN[I][1] === 'J') {
        $("#iW2").prop("checked", true).checkboxradio("refresh");
    }
    if (CUPS.WOCHEN[I][2] === 'J') {
        $("#iW3").prop("checked", true).checkboxradio("refresh");
    }
    if (CUPS.WOCHEN[I][3] === 'J') {
        $("#iW4").prop("checked", true).checkboxradio("refresh");
    }
    if (CUPS.WOCHEN[I][4] === 'J') {
        $("#iW5").prop("checked", true).checkboxradio("refresh");
    }

    if (CUPS.ANMELDERF[I]) {
        $("#iANMELDERF").prop("checked", true).checkboxradio("refresh");
    }

    $("#iSPIELEAB").val(CUPS.SPIELEAB[I]);
    $('#iSWNAMEV,#iSWNAMEVN,#iSWNAMENV').prop('checked', false).checkboxradio('refresh');
    $("#iSWNAME" + CUPS.SWNAME[I]).prop("checked", true).checkboxradio("refresh");
    $("#iNAME2LEN").val(CUPS.NAME2LEN[I]);
    if (new Date(CUPS.NEXTTERMIN[I]).toDateString() === new Date().toDateString()
        || CUPS.NEXTTERMIN[I] > Date.now()) {
        oNEXTTERMIN = CUPS.NEXTTERMIN[I];
        $("#iNEXTTERMIN").val(new Date(CUPS.NEXTTERMIN[I]).toISOString().substr(0, 10));
    }

    $("#iDISPAB0").val(CUPS.DISPAB[I][0]);
    $("#iDISPAB1").val(CUPS.DISPAB[I][1]);
    $("#iDISPAB3").val(CUPS.DISPAB[I][3]);
    $("#iVOLLAB0").val(CUPS.VOLLAB[I][0]);
    $("#iVOLLAB1").val(CUPS.VOLLAB[I][1]);
    $("#iVOLLAB3").val(CUPS.VOLLAB[I][3]);
    $("#iSPJERUNDE").val(CUPS.SPJERUNDE[I]);
    if (CUPS.TURNIER[I]) {
        if (CUPS.TURNIER[I] !== 'Handy') {
            $("#tTYP").text('PC-Turnier');
        } else {
            $("#tTYP").text('Spontanturnier');
            $("#iRUNDEN").val(CUPS.RUNDEN[I]);
        }
        if (LS.I === I) {
            $("#tTURCODE").text(LS.TURCODE);
            $("#tTURRUNDE").text(LS.TURRUNDE);
        } else {
            $("#TurnierDaten").hide();
        }
    } else {
        $('#bTurnierDaten').hide();
    }

    if ($(window).innerWidth() < $(window).innerHeight()) {
        $('#bEingabe').click();
    } else {
        $('#nbHilfeEingabe').hide();
    }

    $('input:radio[name=iREGELN]').change(function () {
        CUPS.REGELN[I] = $("input:radio[name=iREGELN]:checked").val();
    });
    $('#hTitel1').text(CUPS.NAME[I]);
    myJTip = new jBox('Tooltip', {
        theme: 'TooltipError',
        delayClose: 20,
        closeOnClick: true,
        closeOnEsc: true
    });
});