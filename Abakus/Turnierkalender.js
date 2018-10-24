
/* global firebase */

// 51 Hausruckcup
// 52 Raiffeisencup
// 53 Sauwaldcup
// 54 St. Tarockcup     - 6027 Matuschek Dieter, - 6013 Hrastnik Horst
// 55 Tiroler Tarockcup
// 56 Wr. Tarockcup
// 58 Stadltarock

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

//function showEinenTip(pTarget, pText) {
//    $(pTarget).focus();
//    myJTip.setContent('<span class="M" style="color:white; background-image: linear-gradient(to bottom, #ffffe0, #fffacd) padding:0; margin:0">' + pText + '</span>');
//    myJTip.open({
//        target: pTarget
//    });
//}

function getDateString(pDate) {
    var hDate = new Date(pDate);
    return daysOfWeek[hDate.getDay()] + ' ' + hDate.getDate() + ". " + monthsOfYear[hDate.getMonth()] + " " + hDate.getFullYear();
}

function whenCUPSloaded(pNachNeuAendernLoeschen, pScrollTo) {

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
    if (new Date('2017-05-30') !== 'Invalid Date') { // Safari am PC ist Meschuke
        for (var termin in TERMINE) {

            if (pScrollTo && pScrollTo === 'li' + TERMINE[termin].DATUM
                    || TERMINE[termin].CUP === 51 && $("#cb51").is(':checked')
                    || TERMINE[termin].CUP === 53 && $("#cb53").is(':checked')
                    || TERMINE[termin].CUP === 54 && $("#cb54").is(':checked')
                    || TERMINE[termin].CUP === 55 && $("#cb55").is(':checked')
                    || TERMINE[termin].CUP === 56 && $("#cb56").is(':checked')
                    || ($("#cbDiverse").is(':checked') && TERMINE[termin].CUP !== 51 && TERMINE[termin].CUP !== 53 && TERMINE[termin].CUP !== 54 && TERMINE[termin].CUP !== 55 && TERMINE[termin].CUP !== 56)) {
                if (TERMINE[termin].CUP === 3) {
                    hCupName = 'Tarockcup (Test)';
                    hClass = ' cDIV';
                } else if (TERMINE[termin].CUP === 30) {
                    hCupName = 'Villacher MT';
                    hClass = ' cDIV';
                } else if (TERMINE[termin].CUP === 31) {
                    hCupName = 'Drumlinger MT';
                    hClass = ' cDIV';
                } else if (TERMINE[termin].CUP === 51) {
                    hCupName = 'Hausruckcup';
                    hClass = ' cHRC';
                } else if (TERMINE[termin].CUP === 53) {
                    hCupName = 'Sauwaldcup';
                    hClass = ' cSWC';
                } else if (TERMINE[termin].CUP === 54) {
                    hCupName = 'St. Tarockcup';
                    hClass = ' cSTC';
                } else if (TERMINE[termin].CUP === 55) {
                    hCupName = 'Tir. Tarockcup';
                    hClass = ' cTTC';
                } else if (TERMINE[termin].CUP === 56) {
                    hCupName = 'Wr. Tarockcup';
                    hClass = ' cWTC';
                } else {
                    hCupName = CUPS.NAME[TERMINE[termin].CUP];
                    hClass = ' cDIV';
                }
                if (TERMINE[termin].DATUM >= hHeute) {
                    nTermine++;
                    if (QUERFORMAT()) {
                        htmlTE += '<li  id=li' + TERMINE[termin].DATUM + ' data-icon=false><a class="Sbtn" onClick="showTermin(' + termin + ');">'
                                + '<div class="ui-grid-a' + hClass + '">'
                                + '<div class="ui-block-a">'
                                + '&nbsp;<span class="L N">' + getDateString(TERMINE[termin].DATUM) + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="S N">' + hCupName + '&nbsp;<br></span>&nbsp;<span class="L">' + TERMINE[termin].NAME + '</span>'
                                + '</div>'
                                + '<div class="ui-block-b S N">'
                                + TERMINE[termin].TEXT.replace(/;/g, '<br>')
                                + '</div>'
                                + '</div>'
                                + '</a></li>';
                    } else {
                        htmlTE += '<li id=li' + TERMINE[termin].DATUM + ' data-icon=false><a class="Sbtn" onClick="showTermin(' + termin + ');">'
                                + '<div class="' + hClass + '">'
                                + '&nbsp;<span class="L N">' + getDateString(TERMINE[termin].DATUM) + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="S N">' + hCupName + '&nbsp;<br></span>&nbsp;<span class="L">' + TERMINE[termin].NAME + '</span>'
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
    if (pTermin >= 0) {
        if (CUPS.BEREadmin[TERMINE[pTermin].CUP].indexOf(LS.ME) < 0) {
            showEineMeldung(TERMINE[pTermin].NAME + ':', '&Auml;nderung nicht m&ouml;glich.', 'Keine Berechtigung!');
            return;
        }
        I = pTermin;
        $('#bNeu').hide();
        $('#bAendern').show();
        $('#tTitel').html('Turnier &auml;ndern:');
        $('#iDATUM').val(TERMINE[I].DATUM);
        $('#iCUP').val(TERMINE[pTermin].CUP).hide();
        if (LS.ME === '3425') {
            $('#tCUP').html(TERMINE[pTermin].CUP + '&nbsp;&nbsp;' + CUPS.NAME[TERMINE[pTermin].CUP]).show();
        } else {
            $('#tCUP').html(CUPS.NAME[TERMINE[pTermin].CUP]).show();
        }
        $('#iNAME').val(TERMINE[I].NAME);
        $('#iVERANSTALTER').val(TERMINE[I].VERANSTALTER);
        var iVERANSTALTER = TERMINE[pTermin].VERANSTALTER;
        if (iVERANSTALTER === '0000') {
            if (TERMINE[pTermin].CUP === 56) {
                $('#tVERANSTALTER').html('Pr&auml;sidium, Tel. 0699/10360228, 0664/8598867');
            } else {
                $('#tVERANSTALTER').html('Pr&auml;sidium');
            }
        } else if (SPIELERext[iVERANSTALTER]) {
            $('#tVERANSTALTER').text(SPIELERext[iVERANSTALTER][0] + ' ' + SPIELERext[iVERANSTALTER][1] + ', Tel. ' + SPIELERext[iVERANSTALTER][9]);
        } else {
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
        $('#bNeu').show();
        $('#bAendern').hide();
        $('#tTitel').text('Ein Turnier einplanen:');
        $('#iDATUM').val(null);
        if (LS.ME === '3425') {
            $('#iCUP').val('').show();
            $('#tCUP').val('').hide();
        }
        $('#iNAME').val('');
        $('#iVERANSTALTER').val('');
        $('#tVERANSTALTER').html('(0 = Präsidium, 9999 = Alle Veranstalter)').removeClass('B');
        $('#iLOKAL').val('');
        $('#iORT').val('');
    }

    $('#pTermin').popup("open");
    $('#iVNAME').focus();
}

function onAendern() {
    'use strict';
    nGeaendert++;
    $("#iDATUM,#iCUP,#iNAME,#iVERANSTALTER,#iLOKAL,#iORT").filter(':input:focus').blur();
    if (I < 0) {
        I = TERMINE.length;
    }

    var x = $('#iDATUM').val();
    if ($('#iDATUM').val() === "") {
        showEinenTip('#iDATUM', 'Wann soll das Turnier stattfinden?');
        return;
    }

    if ($('#iDATUM').val() < hHeute) {
        showEinenTip('#iDATUM', 'Das Termin mu&szlig; in der Zukunft liegen!');
        return;
    }

    var hCUP = parseInt($('#iCUP').val().trim());
    if (isNaN(hCUP) || hCUP !== 51 && hCUP !== 53 && hCUP !== 54 && hCUP !== 55 && hCUP !== 56 && hCUP !== 58 && hCUP !== 59 && hCUP !== 31 && hCUP !== 30 && hCUP !== 3 && hCUP !== 4) {
        showEinenTip('#iCUP', 'Hausruckcup = 51,<br>Sauwaldcup = 53,<br>St. Tarockcup = 54,<br>Tir. Tarockcup = 55,<br>Wr. Tarockcup = 56,<br>Stadltarock = 58,<br>UTC Klopeinersee = 59,<br>Drumlinger MT = 31,<br>Villacher MT = 30!');
        return;
    }
    if (!/^[a-zA-Z0-9\u00C0-\u00ff\-\'\`\´\.\&\/\;\,\(\)\ ]*$/.test($('#iCUP').val())) {
        showEinenTip('#iCUP', 'Der <b>Cup</b> enth&auml;lt ein ung&uuml;ltiges Sonderzeichen.');
        $('input[id=iCUP]').css("color", "red").focus();
        return;
    }

    if ($('#iNAME').val().trim() === "") {
        showEinenTip('#iNAME', 'Wie willst du das Turnier nennen?');
        return;
    }

    if (!/^[a-zA-Z0-9\u00C0-\u00ff\-\'\`\´\.\&\/\;\,\(\)\ ]*$/.test($('#iNAME').val())) {
        showEinenTip('#iNAME', 'Der <b>Turniername</b> enth&auml;lt ein ung&uuml;ltiges Sonderzeichen.');
        $('input[id=iNAME]').css("color", "red").focus();
        return;
    }

    if ($('#iVERANSTALTER').val().trim() === "") {
        showEinenTip('#iVERANSTALTER', 'Wer veranstaltes das Turnier?');
        return;
    }
    if (!/^[a-zA-Z0-9\u00C0-\u00ff\-\'\`\´\.\&\/\;\,\(\)\ ]*$/.test($('#iVERANSTALTER').val())) {
        showEinenTip('#iVERANSTALTER', 'Der <b>Veranstalter</b> enth&auml;lt ein ung&uuml;ltiges Sonderzeichen.');
        $('input[id=iVERANSTALTER]').css("color", "red").focus();
        return;
    }
    var iVERANSTALTER = $('#iVERANSTALTER').val();
    iVERANSTALTER = "0000" + iVERANSTALTER;
    iVERANSTALTER = iVERANSTALTER.substring((iVERANSTALTER.length - 4));
    if (iVERANSTALTER === '0000') {
        if (hCUP === 56) {
            $('#tVERANSTALTER').html('Pr&auml;sidium, Tel. 0699/10360228, 0664/8598867');
        } else {
            $('#tVERANSTALTER').html('Pr&auml;sidium');
        }
    } else if (SPIELERext[iVERANSTALTER]) {
        $('#tVERANSTALTER').text(SPIELERext[iVERANSTALTER][0] + ' ' + SPIELERext[iVERANSTALTER][1] + ', Tel. ' + SPIELERext[iVERANSTALTER][9]);
    } else {
        showEinenTip('#iVERANSTALTER', 'Spieler ' + iVERANSTALTER + ' existiert nicht, 0 = Pr&auml;sidium');
        $('input[id=iVERANSTALTER]').css("color", "red").focus();
        return;
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
    $("#iDATUM,#iCUP,#iNAME,#iVERANSTALTER,#iLOKAL,#iORT").filter(':input:focus').blur();
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
                LS.Meldung = ('Der Turnierkalender wurden ge&auml;ndert!');
                localStorage.setItem('Abakus.LS', JSON.stringify(LS));
                CUPS.TERMINE = TERMINE;
                localStorage.setItem('Abakus.CUPS', JSON.stringify(CUPS));
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
    if (LS.ME !== "3425" && LS.ME !== "1000") {
        document.oncontextmenu = function () {
//            return false; // oncontextmenu
        };
    }
    document.onselectstart = function () {
        return false;
    };
    new jBox('Tooltip', {
        attach: '.tooltip'
    });

    firebase.initDB(0, 'admin');

    if (CUPS.BEREadmin[51].indexOf(LS.ME) >= 0) {
        $('#iCUP').val(51);
        $('#cb51').prop('checked', true).checkboxradio("refresh");
        $('#tHRC,#tCUP').text('Hausruckcup').show();
    }
    if (CUPS.BEREadmin[53].indexOf(LS.ME) >= 0) {
        $('#iCUP').val(53);
        $('#cb53').prop('checked', true).checkboxradio("refresh");
        $('#tSWC,#tCUP').html('Sauwald Tarockcup').show();
    }
    if (CUPS.BEREadmin[54].indexOf(LS.ME) >= 0) {
        $('#iCUP').val(54);
        $('#cb54').prop('checked', true).checkboxradio("refresh");
        $('#tSTC,#tCUP').html('Steirischer Tarockcup').show();
    }
    if (CUPS.BEREadmin[55].indexOf(LS.ME) >= 0) {
        $('#iCUP').val(55);
        $('#cb55').prop('checked', true).checkboxradio("refresh");
        $('#tTTC,#tCUP').html('Tiroler Tarockcup').show();
    }
    if (CUPS.BEREadmin[56].indexOf(LS.ME) >= 0) {
        $('#iCUP').val(56);
        $('#cb56').prop('checked', true).checkboxradio("refresh");
        $('#tWTC,#tCUP').html('Wiener Tarockcup').show();
    }
    if (CUPS.BEREadmin[58].indexOf(LS.ME) >= 0) {
        $('#iCUP').val(58);
        $('#cbDiverse').prop('checked', true).checkboxradio("refresh");
        $('#tDIV,#tCUP').html('Sommer Stadl Tarock').show();
    }

    if (LS.ME === '3425') {
        $('#iCUP').val('').show();
        $('#tCUP').val('???').show();
    } else {
        $('#iCUP').hide();
        $('#tCUP').show();
    }

    window.onerror = function (msg, url, line, col, error) {
        alert(msg + ' url=' + url + ' line=' + line + ', col=' + col + ', error=' + error + '.');
        return false;
    };
    myJTip = new jBox('Tooltip', {
        theme: 'TooltipSmall',
        Class: 'TooltipError',
        target: '#iVNN',
        content: '?',
        delayClose: 20,
        closeOnClick: true,
        closeOnEsc: true,
        zIndex: 8000
    });
    $(':checkbox').change(function () {
        whenCUPSloaded(true);
    });
    $('#iVERANSTALTER').change(function () {
        var iVERANSTALTER = $('#iVERANSTALTER').val();
        iVERANSTALTER = "0000" + iVERANSTALTER;
        iVERANSTALTER = iVERANSTALTER.substring((iVERANSTALTER.length - 4));
        if (iVERANSTALTER === '0000') {
            if (parseInt($('#iCUP').val()) === 56) {
                $('#tVERANSTALTER').html('Pr&auml;sidium, Tel. 0699/10360228, 0664/8598867');
            } else {
                $('#tVERANSTALTER').html('Pr&auml;sidium');
            }
        } else if (SPIELERext[iVERANSTALTER]) {
            $('#tVERANSTALTER').text(SPIELERext[iVERANSTALTER][0] + ' ' + SPIELERext[iVERANSTALTER][1] + ', Tel. ' + SPIELERext[iVERANSTALTER][9]);
        } else {
            showEinenTip('#iVERANSTALTER', 'Spieler ' + iVERANSTALTER + ' existiert nicht, 0 = Pr&aum;sidium');
            $('input[id=iVERANSTALTER]').css("color", "red").focus();
            return;
        }
    });
    loadSPIELER();
});

window.onbeforeunload = function (e) {
    $('#main').addClass('ui-disabled');
};