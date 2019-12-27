
/* global firebase, iVERANSTALTER */

// 51 Hausruckcup
// 52 Raiffeisencup
// 53 Sauwaldcup
// 54 St. Tarockcup
// 55 Tiroler Tarockcup
// 56 Wr. Tarockcup
// 16 Tarock on Tour
// 15 Stadl Tarock
// 17 UTC Klobainersee
// 83 Villacher Cup

var FB = undefined;
var LS = new Object();
var CUPS = new Object();
var STAT = new Object();
var SPIELERext = new Object();

var myJBox = null;
var myJTip = null;
var I = -1;
var Y = 0;
var TERMINE = [];
var nGeaendert = 0;
var daysOfWeek = ["So,", "Mo,", "Di,", "Mi,", "Do,", "Fr,", "Sa,"];
var monthsOfYear = ["J&auml;n.", "Feb.", "M&auml;rz", "April", "Mai", "Juni", "Juli", "Aug.", "Sep.", "Okt.", "Nov.", "Dez."];
var hHeute = '';
var hVersionsDatum = '';

function QUERFORMAT() {
    if ($(window).innerWidth() > $(window).innerHeight()) {
        return true;
    } else {
        return false;
    }
}

function whenSPIELERloaded() {
    loadCUPS('Turnierkalender', 'Termine werden geladen.');
}

function myDateString(pDate) {
    var hDate = new Date(pDate);
    return hDate.getFullYear() + '-' + ('00' + (hDate.getMonth() + 1)).substr(-2) + '-' + ('00' + (hDate.getDate())).substr(-2);
}

function getDateString(pDate) {
    var hDate = new Date(pDate);
    return daysOfWeek[hDate.getDay()] + ' ' + hDate.getDate() + ". " + monthsOfYear[hDate.getMonth()] + " " + hDate.getFullYear();
}

function whenCUPSloaded(pNachNeuAendernLoeschen, pScrollTo) {

    if (!pScrollTo) {
        pScrollTo = '?';
    }

    $("#bEinNeuesTurnierEinplanen").removeClass('ui-disabled');
    if (pNachNeuAendernLoeschen) {
        TERMINE.sort(function (a, b) {
            return (a.DATUM > b.DATUM) ? 1 : ((b.DATUM > a.DATUM) ? -1 : 0);
        });
    } else {
        TERMINE = [];
        for (var termin in CUPS.TERMINE) {
            if (CUPS.TERMINE[termin].DATUM >= hVersionsDatum) {
                TERMINE[TERMINE.length] = CUPS.TERMINE[termin];
            }
        }
    }

    var nTermine = 0;
    var htmlTE = '';
    var hCupName = '';
    var hClass = '';
    var hWoche = 0;
    if (new Date('2017-05-30') !== 'Invalid Date') { // Safari am PC ist Meschuke
        for (var termin in TERMINE) {

            if (pScrollTo && pScrollTo === 'li' + TERMINE[termin].DATUM
                    || TERMINE[termin].CUP === 51 && $("#cb51").is(':checked')
                    || TERMINE[termin].CUP === 52 && $("#cb52").is(':checked')
                    || TERMINE[termin].CUP === 53 && $("#cb53").is(':checked')
                    || TERMINE[termin].CUP === 54 && $("#cb54").is(':checked')
                    || TERMINE[termin].CUP === 55 && $("#cb55").is(':checked')
                    || TERMINE[termin].CUP === 56 && $("#cb56").is(':checked')
                    || ($("#cbDiverse").is(':checked') && TERMINE[termin].CUP !== 51 && TERMINE[termin].CUP !== 52 && TERMINE[termin].CUP !== 53 && TERMINE[termin].CUP !== 54 && TERMINE[termin].CUP !== 55 && TERMINE[termin].CUP !== 56)) {
                if (TERMINE[termin].CUP === 3) {
                    hCupName = 'Tarockcup (Test)';
                    hClass = ' cDIV';
                } else if (TERMINE[termin].CUP === 30) {
                    hCupName = 'Villacher MT';
                    hClass = ' cDIV';
                } else if (TERMINE[termin].CUP === 31) {
                    hCupName = 'Drumlinger MT';
                    hClass = ' cDIV';
                } else if (TERMINE[termin].CUP === 49) {
                    hCupName = 'Österreichfinale';
                    hClass = ' cWTC';
                } else if (TERMINE[termin].CUP === 50) {
                    hCupName = 'Hausruckcup';
                    hClass = ' cHRC';
                } else if (TERMINE[termin].CUP === 51) {
                    hCupName = 'Hausruckcup';
                    hClass = ' cHRC';
                } else if (TERMINE[termin].CUP === 52) {
                    hCupName = 'Raiffeisencup';
                    hClass = ' cRTC';
                } else if (TERMINE[termin].CUP === 53) {
                    hCupName = 'Sauwaldcup';
                    hClass = ' cSWC';
                } else if (TERMINE[termin].CUP === 54) {
                    hCupName = 'St. Tarockcup';
                    hClass = ' cSTC';
                } else if (TERMINE[termin].CUP === 55) {
                    hCupName = 'Tirolcup';
                    hClass = ' cTTC';
                } else if (TERMINE[termin].CUP === 56) {
                    hCupName = 'Wr. Tarockcup';
                    hClass = ' cWTC';
                } else if (TERMINE[termin].CUP === 80) {
                    hCupName = 'Wr. Marathon';
                    hClass = ' cDIV';
                } else {
                    hCupName = CUPS.NAME[TERMINE[termin].CUP];
                    hClass = ' cDIV';
                }
                if (TERMINE[termin].DATUM >= hHeute) {
                    nTermine++;
//                    if (hDatum !== TERMINE[termin].DATUM) {
//                        hDatum = TERMINE[termin].DATUM;
//                        htmlTE += '<span class="M B">&nbsp;&nbsp;' + getDateString(TERMINE[termin].DATUM) + '</span>';
//                    }

                    Date.prototype.getWoche = function () {
                        var onejan = new Date(this.getFullYear(), 0, 1);
                        return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() - 1) / 7);
                    };


                    if (hWoche !== new Date(TERMINE[termin].DATUM).getWoche()) {
                        hWoche = new Date(TERMINE[termin].DATUM).getWoche();
                        htmlTE += '<span class="S B">&nbsp;&nbsp;' + hWoche + '. Woche, ' + new Date(TERMINE[termin].DATUM).getFullYear() + '</span>';
                    }
                    if (QUERFORMAT()) {
                        htmlTE += '<li  id=li' + TERMINE[termin].DATUM + ' data-icon=false><a class="Sbtn" onClick="showTermin(' + termin + ');">'
                                + '<div class="ui-grid-a' + hClass + '">'
                                + '<div class="ui-block-a">'
                                + '&nbsp;<span class="L N">' + getDateString(TERMINE[termin].DATUM) + '&nbsp;&nbsp;&nbsp;' + (TERMINE[termin].BEGINN ? TERMINE[termin].BEGINN : '') + '&nbsp;&nbsp;</span><span class="S N">' + hCupName + '&nbsp;<br></span>&nbsp;<span class="L">' + TERMINE[termin].NAME + '</span>'
                                + '</div>'
                                + '<div class="ui-block-b S N">'
                                + TERMINE[termin].TEXT.replace(/;/g, '<br>')
                                + '</div>'
                                + '</div>'
                                + '</a></li>';
                    } else {
                        htmlTE += '<li id=li' + TERMINE[termin].DATUM + ' data-icon=false><a class="Sbtn" onClick="showTermin(' + termin + ');">'
                                + '<div class="' + hClass + '">'
                                + '&nbsp;<span class="L N">' + getDateString(TERMINE[termin].DATUM) + '&nbsp;&nbsp;' + (TERMINE[termin].BEGINN ? TERMINE[termin].BEGINN : '') + '&nbsp;&nbsp;</span><span class="S N">' + hCupName + '&nbsp;<br></span>&nbsp;<span class="L">' + TERMINE[termin].NAME + '</span>'
                                + '</div>'
                                + '</a></li>';
                    }
                }
            }
        }
    }
    $('#dTermine').html("<ul data-role='listview'>" + htmlTE + "</ul>").trigger('create').show();
    hideEinenMoment();

    if (pScrollTo && false) {
        $('html, body').animate({
            scrollTop: $("#" + pScrollTo).offset() - 237
        }, 500);
    }
}

function showTermin(pTermin) {
    'use strict';
    $("#iDATUM,#iBEGINN,#iCUP,#iNAME,#iVERANSTALTER,#iLOKAL,#iORT").filter(':input:focus').blur();
    $('input[id=iVERANSTALTER]').css("color", "black");
    if (pTermin >= 0) {
        if (CUPS.BEREadmin[TERMINE[pTermin].CUP].indexOf(LS.ME) < 0 && CUPS.BEREschreiben[TERMINE[pTermin].CUP].indexOf(LS.ME) < 0) {
            showEineMeldung(TERMINE[pTermin].NAME + ':', 'Änderung nicht möglich.', 'Keine Berechtigung!');
            return;
        }
        I = pTermin;
        $('#bNeu').hide();
        $('#bAendern').show();
        $('#tTitel').html('Turnier ändern:');
        $('#iDATUM').val(TERMINE[I].DATUM);
        $('#iBEGINN').val(TERMINE[I].BEGINN);
        $('#iCUP').val(TERMINE[pTermin].CUP);
        $('#tCUP').html(CUPS.NAME[TERMINE[pTermin].CUP]).addClass('B');
        $('#iNAME').val(TERMINE[I].NAME);
        var iVERANSTALTER = TERMINE[I].VERANSTALTER;
        if (TERMINE[I].VERANSTALTER === "Präsidium") {
            $('#iVERANSTALTER').val(-1);
            if (TERMINE[pTermin].CUP === 56) {
                $('#tVERANSTALTER').html('Präsidium, Tel. 0699/10360228, 0664/8598867');
            } else {
                $('#tVERANSTALTER').html('Präsidium');
            }
        } else if (TERMINE[I].VERANSTALTER === "Alle Veranstalter") {
            $('#iVERANSTALTER').val(-2);
            $('#tVERANSTALTER').text('Alle Veranstalter');
        } else if (TERMINE[I].VERANSTALTER === "Alle Cups") {
            $('#iVERANSTALTER').val(-3);
            $('#tVERANSTALTER').text('Alle Cups');
        } else if (SPIELERext[iVERANSTALTER]) {
            $('#iVERANSTALTER').val(TERMINE[I].VERANSTALTER);
            $('#tVERANSTALTER').text(SPIELERext[iVERANSTALTER][0] + ' ' + SPIELERext[iVERANSTALTER][1] + ', Tel. ' + SPIELERext[iVERANSTALTER][9]);
        } else if (TERMINE[pTermin].CUP === 80) { // Wiener Marathon
            $('#iVERANSTALTER').val(TERMINE[I].VERANSTALTER);
            $('#tVERANSTALTER').html('Promotor ' + iVERANSTALTER + ' existiert nicht.');
        } else {
            $('#iVERANSTALTER').val(TERMINE[I].VERANSTALTER);
            $('#tVERANSTALTER').html('Veranstalter ' + iVERANSTALTER + ' existiert nicht.');
        }

        var hText = TERMINE[I].TEXT;
        var iVon = 0;
        var iBis = hText.indexOf('<br>');
        hText = hText.substr(iBis + 4);
        iVon = 0;
        iBis = hText.indexOf('<br>');
        if (iBis > 0) {
            $('#iLOKAL').val(hText.substr(iVon, iBis));
        } else {
            $('#iLOKAL').val('');
        }
        hText = hText.substr(iBis + 4);
        $('#iORT').val(hText);
    } else {
        I = TERMINE.length;
        $('#pTermin').popup("open");
        $('#bNeu').show();
        $('#bAendern').hide();
        $('#tTitel').text('Ein Turnier einplanen:');
        $('#iDATUM').val(null);
        $('#iBEGINN').val(null);

        if (LS.ME === '3425') {
            $('#iCUP').val('');
            $('#tCUP').text('???');
        } else if (LS.ME === '0197') { // Manfred Huemer
            $('#iCUP').val('');
            $('#tCUP').html('<span class="S">(14 = Leonfelder Turnier, 18 = Wr. Städtische Turnier)</span>').removeClass('B');
        } else if (LS.ME === '1014') { // Franz Kienast
            $('#iCUP').val('');
            $('#tCUP').html('<span class="S">(51 = Hausruckcup, 16 = Tarock on Tour, 49 = Österreichfinale)</span>').removeClass('B');
        }

        $('#iNAME').val('');
        $('#iVERANSTALTER').val('');
        if ($('#tCUP').text().indexOf("Steirischer Tarockcup") < 0) {
            $('#tVERANSTALTER').html('<span class="S">(-1 = Präsidium, -2 = Alle Veranstalter, -3 = Alle Cups)</span>').removeClass('B');
        } else {
            $('#tVERANSTALTER').html('');
        }
        $('#iLOKAL').val('');
        $('#iORT').val('');
    }

    $('#pTermin').popup("open");
    $('#iVNAME').focus();
}

function onAendern() {
    'use strict';
    nGeaendert++;
    $("#iDATUM,#iBEGINN,#iCUP,#iNAME,#iVERANSTALTER,#iLOKAL,#iORT").filter(':input:focus').blur();
    $('input[id=iVERANSTALTER]').css("color", "black");
    if (I < 0) {
        I = TERMINE.length;
    }

    var hCUP = parseInt($('#iCUP').val().trim());
    if (hCUP > 0) {
        if (CUPS.NAME[hCUP]) {
            $('#tCUP').html(CUPS.NAME[hCUP]).addClass('B');
        } else {
            $('#tCUP').html('???').removeClass('B');
        }
    }

    if (LS.ME === '0197') { // Manfred Huemer
        if (hCUP !== 14 && hCUP !== 18) {
            showEinenTip('#iCUP', 'Leonfelder Turniere = 14,<br>Wr. Städtische Turnier = 18!');
            return;
        }
    } else if (LS.ME === '1014') { // Franz Kienast
        if (hCUP !== 49 && hCUP !== 51 && hCUP !== 16) {
            showEinenTip('#iCUP', 'Hausruckcup = 51,<br>Tarock on Tour = 16,<br>Österreichfinale = 49!');
            return;
        }
    }

    if (hCUP < 0 || !CUPS.TYP[hCUP] || (CUPS.TYP[hCUP] !== 'CUP' && CUPS.TYP[hCUP] !== 'ET' && CUPS.TYP[hCUP] !== 'MT')) {
        showEinenTip('#iCUP', 'Österreichfinale = 49,<br>Hausruckcup = 50,<br>Ktn. Tarockcup = 51,<br>Raiffeisencup = 52,<br>Sauwaldcup = 53,<br>St. Tarockcup = 54,<br>Tirolcup = 55,<br>Wr. Tarockcup = 56,<br>Leonfeldner Turnier = 18,<br>Tarock on Tour = 16,<br>Wr. Marathon = 80,<br>Stadl Tarock = 15,<br>UTC Klopeinersee = 17,<br>Villacher Cup = 83,<br>Drumlinger MT = 31,<br>Villacher MT = 30!');
        return;
    }

    if ($('#iDATUM').val() === "") {
        showEinenTip('#iDATUM', 'Wann soll das Turnier stattfinden?');
        return;
    }

    if ($('#iDATUM').val() < hHeute) {
        showEinenTip('#iDATUM', 'Das Termin mu&szlig; in der Zukunft liegen!');
        return;
    }

    if ($('#iNAME').val().trim() === "") {
        showEinenTip('#iNAME', 'Wie willst du das Turnier nennen?');
        return;
    }
    if ($('#iNAME').val().length < 4) {
        showEinenTip('#iNAME', 'Bitte den vollständigen Turniername eingeben.');
        return;
    }
    if ($('#iNAME').val().length > 24) {
        showEinenTip('#iNAME', 'Der Turniername darf nur 24 Zeichen lang sein.');
        return;
    }

    if (!/^[a-zA-Z0-9\u00C0-\u00ff\-\'\`\´\.\&\/\;\,\(\)\ ]*$/.test($('#iNAME').val())) {
        showEinenTip('#iNAME', 'Der <b>Turniername</b> enthält ein ungültiges Sonderzeichen.');
        $('input[id=iNAME]').css("color", "red").focus();
        return;
    }

    var iVERANSTALTER = parseInt($('#iVERANSTALTER').val());
    if (iVERANSTALTER === -1 && $('#tCUP').text().indexOf("Steirischer Tarockcup") < 0) {
        iVERANSTALTER = 'Präsidium';
        if (hCUP === 56) {
            $('#tVERANSTALTER').html('Präsidium, Tel. 0699/10360228, 0664/8598867');
        } else {
            $('#tVERANSTALTER').html('Präsidium');
        }
    } else if (iVERANSTALTER === -2 && $('#tCUP').text().indexOf("Steirischer Tarockcup") < 0) {
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
        if (SPIELERext[iVERANSTALTER]) {
            $('#tVERANSTALTER').text(SPIELERext[iVERANSTALTER][0] + ' ' + SPIELERext[iVERANSTALTER][1] + ', Tel. ' + SPIELERext[iVERANSTALTER][9]);
        } else {
            showEinenTip('#iVERANSTALTER', 'Spieler ' + iVERANSTALTER + ' existiert nicht, 0 = Präsidium');
            $('input[id=iVERANSTALTER]').css("color", "red").focus();
            return;
        }
    }

    if ($('#iLOKAL').val().trim() === "") {
        showEinenTip('#iLOKAL', 'Eine Beschreibung des Lokals fehlt noch!');
        return;
    }
    if (!/^[a-zA-Z0-9\u00C0-\u00ff\-\'\`\´\.\&\/\;\,\(\)\ ]*$/.test($('#iLOKAL').val())) {
        showEinenTip('#iLOKAL', 'In Lokal und Internet sind Sonderzeichen nicht erlaubt.');
        $('input[id=iLOKAL]').css("color", "red").focus();
        return;
    }
    if (!/^[a-zA-Z0-9\u00C0-\u00ff\-\'\`\´\.\&\/\;\,\(\)\ ]*$/.test($('#iORT').val())) {
        showEinenTip('#iORT', 'In Ort und Strasse sind Sonderzeichen nicht erlaubt.');
        $('input[id=iORT]').css("color", "red").focus();
        return;
    }

    TERMINE[I] = {};
    TERMINE[I].DATUM = $('#iDATUM').val();
    TERMINE[I].BEGINN = $('#iBEGINN').val();
    TERMINE[I].CUP = parseInt($('#iCUP').val().trim());
    TERMINE[I].NAME = $('#iNAME').val().trim();
    TERMINE[I].VERANSTALTER = iVERANSTALTER;
    TERMINE[I].TEXT = $('#tVERANSTALTER').text() + '<br>' + $('#iLOKAL').val().trim() + '<br>' + $('#iORT').val().trim();
    $('#pTermin').popup("close");
    whenCUPSloaded(true, 'li' + TERMINE[I].DATUM);
    $('#bSpeichern').removeClass('ui-disabled');
}

function onLoeschen() {
    'use strict';
    nGeaendert++;
    $("#iDATUM,#iBEGINN,#iCUP,#iNAME,#iVERANSTALTER,#iLOKAL,#iORT").filter(':input:focus').blur();
    TERMINE.splice(I, 1);
    $('#pTermin').popup("close");
    whenCUPSloaded(true);
    $('#bSpeichern').removeClass('ui-disabled');
}

function Speichern() {
    'use strict';
    if (nGeaendert === 0) {
        window.history.back();
        return;
    }
    showEinenMoment('Turnierkalender:', 'Termine werden gespeichert.');
    firebase.database().ref('/00/CUPS')
            .update({
                TERMINE: TERMINE
            })
            .then(function () {
                hideEinenMoment();
                LS.Meldung = ('Der Turnierkalender wurde geändert!');
                localStorage.setItem('Abakus.LS', JSON.stringify(LS));
                CUPS.TERMINE = TERMINE;
                localStorage.setItem('Abakus.CUPS', JSON.stringify(CUPS));
                nGeaendert = 0; // Sonst kein history.back();
                window.history.back();
            })
            .catch(function (error) {
                showEineDBWarnung(error, 'Update TERMINE:');
            });
}

$(document).bind('pageinit', function () {
    'use strict';
    hHeute = myDateString(new Date());
    hVersionsDatum = myDateString(getVersionsDatum());
    LS = JSON.parse(localStorage.getItem('Abakus.LS'));
    CUPS = JSON.parse(localStorage.getItem('Abakus.CUPS'));
    if (LS.ME !== "3425" && LS.ME !== "1014") {
        document.oncontextmenu = function () {
            return false; // oncontextmenu
        };
    }
    document.onselectstart = function () {
        return false;
    };
    new jBox('Tooltip', {
        attach: '.tooltip'
    });

    firebase.initDB(0, 'admin');

//    if (CUPS.BEREadmin[50].indexOf(LS.ME) >= 0 || CUPS.BEREschreiben[50].indexOf(LS.ME) >= 0) {
//        $('#iCUP').val(50);
//        $('#cb50').prop('checked', true).checkboxradio("refresh");
//        $('#tWMA,#tCUP').text('Hausruckcup').show();
//    }
    if (CUPS.BEREadmin[51].indexOf(LS.ME) >= 0 || CUPS.BEREschreiben[51].indexOf(LS.ME) >= 0) {
        $('#iCUP').val(51);
        $('#cb51').prop('checked', true).checkboxradio("refresh");
        $('#tHRC,#tCUP').text('Hausruckcup').show();
    }
    if (CUPS.BEREadmin[52].indexOf(LS.ME) >= 0 || CUPS.BEREschreiben[52].indexOf(LS.ME) >= 0) {
        $('#iCUP').val(52);
        $('#cb52').prop('checked', true).checkboxradio("refresh");
        $('#tRTC,#tCUP').text('Raiffeisencup').show();
    }
    if (CUPS.BEREadmin[53].indexOf(LS.ME) >= 0 || CUPS.BEREschreiben[53].indexOf(LS.ME) >= 0) {
        $('#iCUP').val(53);
        $('#cb53').prop('checked', true).checkboxradio("refresh");
        $('#tSWC,#tCUP').html('Sauwald Tarockcup').show();
    }
    if (CUPS.BEREadmin[54].indexOf(LS.ME) >= 0 || CUPS.BEREschreiben[54].indexOf(LS.ME) >= 0) {
        $('#iCUP').val(54);
        $('#cb54').prop('checked', true).checkboxradio("refresh");
        $('#tSTC,#tCUP').html('Steirischer Tarockcup').show();
    }
    if (CUPS.BEREadmin[55].indexOf(LS.ME) >= 0 || CUPS.BEREschreiben[55].indexOf(LS.ME) >= 0) {
        $('#iCUP').val(55);
        $('#cb55').prop('checked', true).checkboxradio("refresh");
        $('#tTTC,#tCUP').html('Tiroler Tarockcup').show();
    }
    if (CUPS.BEREadmin[56].indexOf(LS.ME) >= 0 || CUPS.BEREschreiben[56].indexOf(LS.ME) >= 0) {
        $('#iCUP').val(56);
        $('#cb56').prop('checked', true).checkboxradio("refresh");
        $('#tWTC,#tCUP').html('Wiener Tarockcup').show();
    }
    if (CUPS.BEREadmin[16].indexOf(LS.ME) >= 0 || CUPS.BEREschreiben[16].indexOf(LS.ME) >= 0) {
        $('#iCUP').val(16);
        $('#cbDiverse').prop('checked', true).checkboxradio("refresh");
        $('#tDIV,#tCUP').html('Tarock on Tour').show();
    }
    if (CUPS.BEREadmin[15].indexOf(LS.ME) >= 0 || CUPS.BEREschreiben[15].indexOf(LS.ME) >= 0) {
        $('#iCUP').val(15);
        $('#cbDiverse').prop('checked', true).checkboxradio("refresh");
        $('#tDIV,#tCUP').html('Stadl Tarock').show();
    }
    if (CUPS.BEREadmin[83].indexOf(LS.ME) >= 0 || CUPS.BEREschreiben[83].indexOf(LS.ME) >= 0) {
        $('#iCUP').val(83);
        $('#cbDiverse').prop('checked', true).checkboxradio("refresh");
        $('#tDIV,#tCUP').html('Villacher Cup').show();
    }

    if (LS.ME === '3425') {
        $('#iCUP').val('');
        $('#tCUP').text('???');
    } else if (LS.ME === '0197') { // Manfred Huemer
        $('#iCUP').val('');
        $('#cbDiverse').prop('checked', true).checkboxradio("refresh");
        $('#tCUP').html('<span class="S">(14 = Leonfelder Turnier, 18 = Wr. Städtische Turnier)</span>').removeClass('B');
    } else if (LS.ME === '1014') { // Franz Kienast
        $('#iCUP').val('');
        $('#cbDiverse').prop('checked', true).checkboxradio("refresh");
        $('#tCUP').html('<span class="S">(51 = Hausruckcup, 16 = Tarock on Tour, 49 = Österreichfinale)</span>').removeClass('B');
    } else {
        $('#iCUP').hide();
        $(".autoCup").attr("style", "width:0");
    }

    myJTip = new jBox('Tooltip', {
        theme: 'TooltipError',
        delayClose: 20,
        closeOnClick: true,
        closeOnEsc: true
    });
    $(':checkbox').change(function () {
        whenCUPSloaded(true);
    });
    $('#iVERANSTALTER').change(function () {
        hideEinenTip();
        $('input[id=iVERANSTALTER]').css("color", "black");

        var iVERANSTALTER = $('#iVERANSTALTER').val();
        if (parseInt(iVERANSTALTER) === -1) {
            iVERANSTALTER = 'Präsidium';
//            if (hCUP === 56) {
//                $('#tVERANSTALTER').html('Präsidium, Tel. 0699/10360228, 0664/8598867');
//            } else {
            $('#tVERANSTALTER').html('Präsidium');
//            }
        } else if (parseInt(iVERANSTALTER) === -2) {
            iVERANSTALTER = 'Alle Veranstalter';
            $('#tVERANSTALTER').text('Alle Veranstalter');
        } else if (parseInt(iVERANSTALTER) === -3) {
            iVERANSTALTER = 'Alle Cups';
            $('#tVERANSTALTER').text('Alle Cups');
        } else if (parseInt(iVERANSTALTER) < 1) {
            showEinenTip('#iVERANSTALTER', iVERANSTALTER + ' ist keine gültige Spielernummer.');
            $('input[id=iVERANSTALTER]').css("color", "red").focus();
            return;
        } else {
            iVERANSTALTER = "0000" + iVERANSTALTER;
            iVERANSTALTER = iVERANSTALTER.substring((iVERANSTALTER.length - 4));
            if (SPIELERext[iVERANSTALTER]) {
                $('#tVERANSTALTER').text(SPIELERext[iVERANSTALTER][0] + ' ' + SPIELERext[iVERANSTALTER][1] + ', Tel. ' + SPIELERext[iVERANSTALTER][9]);
            } else {
                showEinenTip('#iVERANSTALTER', 'Spieler ' + iVERANSTALTER + ' existiert nicht, 0 = Präsidium');
                $('input[id=iVERANSTALTER]').css("color", "red").focus();
                return;
            }
        }
    });
    loadSPIELER();
    CUPS = JSON.parse(localStorage.getItem('Abakus.CUPS'));
    SPIELERext = JSON.parse(localStorage.getItem('Abakus.SPIELERnr'));

    window.addEventListener('beforeunload', (event) => {
        if (nGeaendert) {
            // Cancel the event as stated by the standard.
            event.preventDefault();
            // Chrome requires returnValue to be set.
            event.returnValue = '';
        }
    });

});