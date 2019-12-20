
/* global LS */

var myJTip = null;

function QUERFORMAT() {
    if ($(window).innerWidth() > $(window).innerHeight()) {
        return true;
    } else {
        return false;
    }
}

$(document).bind('pageinit', function () {

    LS = new Object();
    LS = JSON.parse(localStorage.getItem('Abakus.LS'));
    if (LS.ME !== "3425" && LS.ME !== "1000") {
        document.oncontextmenu = function () {
            return false; // oncontextmenu
        };
    }
    document.onselectstart = function () {
//        return false;
    };
    $("#iFotoAnimieren").prop("checked", LS.FotoAnimieren).checkboxradio("refresh");
    $("#iShowSpielerNr").prop("checked", LS.ShowSpielerNr).checkboxradio("refresh");
    $("#iAKTTAGE").val(LS.AktTage);
    var hFreunde = '';
    for (var ii = 0; ii < LS.Freunde.length; ii++) {
        if (ii === 0) {
            hFreunde = LS.Freunde[ii];
        } else {
            hFreunde = hFreunde + ', ' + LS.Freunde[ii];
        }
    }
    $("#iFREUNDE").val(hFreunde);
    if (LS.Timeout) {
        $("#iTIMEOUT").val(LS.Timeout);
    } else {
        $("#iTIMEOUT").val(100);
    }

    for (var i in LS.VIC) {
        if (LS.VIC[i]) {
            $('#iCB' + i).prop('checked', true).checkboxradio('refresh');
        }
    }
    if (Number.isInteger(LS.VIC[0])) {
        $('#iR' + LS.VIC[0]).prop('checked', true).checkboxradio('refresh');
    }
    $("input[name=nVIC]:radio").change(function () {
        LS.VIC[0] = parseInt($("input[name='nVIC']:checked").val());
        $('#iCB' + LS.VIC[0]).prop('checked', true).checkboxradio('refresh');
    });
    $("#iCB51").change(function () {
        LS.VIC[51] = $("#iCB51").is(":checked");
        if (LS.VIC[0] === 51 && !LS.VIC[51]) {
            $("#iR51").prop('checked', false).checkboxradio('refresh');
        }
    });

    $("#iCB52").change(function () {
        LS.VIC[52] = $("#iCB52").is(":checked");
        if (LS.VIC[0] === 52 && !LS.VIC[52]) {
            $("#iR52").prop('checked', false).checkboxradio('refresh');
        }
    });

    $("#iCB53").change(function () {
        LS.VIC[53] = $("#iCB53").is(":checked");
        if (LS.VIC[0] === 53 && !LS.VIC[53]) {
            $("#iR53").prop('checked', false).checkboxradio('refresh');
        }
    });

    $("#iCB54").change(function () {
        LS.VIC[54] = $("#iCB54").is(":checked");
        if (LS.VIC[0] === 54 && !LS.VIC[54]) {
            $("#iR54").prop('checked', false).checkboxradio('refresh');
        }
    });

    $("#iCB55").change(function () {
        LS.VIC[55] = $("#iCB55").is(":checked");
        if (LS.VIC[0] === 55 && !LS.VIC[55]) {
            $("#iR55").prop('checked', false).checkboxradio('refresh');
        }
    });

    $("#iCB56").change(function () {
        LS.VIC[56] = $("#iCB56").is(":checked");
        if (LS.VIC[0] === 56 && !LS.VIC[56]) {
            $("#iR56").prop('checked', false).checkboxradio('refresh');
        }
    });


    $("#iCB8").change(function () {
        LS.VIC[8] = $("#iCB8").is(":checked");
        if (LS.VIC[0] === 8 && !LS.VIC[8]) {
            $("#iR8").prop('checked', false).checkboxradio('refresh');
        }
    });
    $("#iCB9").change(function () {
        LS.VIC[9] = $("#iCB9").is(":checked");
        if (LS.VIC[0] === 9 && !LS.VIC[9]) {
            $("#iR9").prop('checked', false).checkboxradio('refresh');
        }
    });
    $("#iCB11").change(function () {
        LS.VIC[11] = $("#iCB11").is(":checked");
        if (LS.VIC[0] === 11 && !LS.VIC[11]) {
            $("#iR11").prop('checked', false).checkboxradio('refresh');
        }
    });
    $("#iCB14").change(function () {
        LS.VIC[14] = $("#iCB14").is(":checked");
        if (LS.VIC[0] === 14 && !LS.VIC[14]) {
            $("#iR14").prop('checked', false).checkboxradio('refresh');
        }
    });
    $("#iCB15").change(function () {
        LS.VIC[15] = $("#iCB15").is(":checked");
        if (LS.VIC[0] === 15 && !LS.VIC[15]) {
            $("#iR15").prop('checked', false).checkboxradio('refresh');
        }
    });
    $("#iCB16").change(function () {
        LS.VIC[16] = $("#iCB16").is(":checked");
        if (LS.VIC[0] === 16 && !LS.VIC[16]) {
            $("#iR16").prop('checked', false).checkboxradio('refresh');
        }
    });
    $("#iCB17").change(function () {
        LS.VIC[17] = $("#iCB17").is(":checked");
        if (LS.VIC[0] === 17 && !LS.VIC[17]) {
            $("#iR17").prop('checked', false).checkboxradio('refresh');
        }
    });

    $('#Schreibzettel' + LS.Schreibzettel).prop('checked', true).checkboxradio('refresh');
    $('#Schreibzetteltrue,#Schreibzettelfalse').click(function () {
        if ($("input[name='Schreibzettel']:checked").val() === 'true') {
            LS.Schreibzettel = true;
        } else {
            LS.Schreibzettel = false;
        }
        $('#Schreibzetteltrue').prop('checked', false).checkboxradio('refresh');
        $('#Schreibzettelfalse').prop('checked', false).checkboxradio('refresh');
        $('#Schreibzettel' + LS.Schreibzettel).prop('checked', true).checkboxradio('refresh');
    });
    $('#FotoStyle' + LS.FotoStyle).prop('checked', true).checkboxradio('refresh');
    $('#FotoStyle0,#FotoStyle1,#FotoStyle2,#FotoStyle3,#FotoStyle4,#FotoStyle5').click(function () {
        LS.FotoStyle = parseInt($("input[name='FotoStyle']:checked").val());
        $('#FotoStyle0').prop('checked', false).checkboxradio('refresh');
        $('#FotoStyle1').prop('checked', false).checkboxradio('refresh');
        $('#FotoStyle2').prop('checked', false).checkboxradio('refresh');
        $('#FotoStyle3').prop('checked', false).checkboxradio('refresh');
        $('#FotoStyle4').prop('checked', false).checkboxradio('refresh');
        $('#FotoStyle5').prop('checked', false).checkboxradio('refresh');
        $('#FotoStyle' + LS.FotoStyle).prop('checked', true).checkboxradio('refresh');
    });
    $('#AnzSpalten' + LS.AnzSpalten).prop('checked', true).checkboxradio('refresh');
    $('#AnzSpalten1,#AnzSpalten2,#AnzSpalten3,#AnzSpalten4').click(function () {
        LS.AnzSpalten = parseInt($("input[name='AnzSpalten']:checked").val());
        $('#AnzSpalten1').prop('checked', false).checkboxradio('refresh');
        $('#AnzSpalten2').prop('checked', false).checkboxradio('refresh');
        $('#AnzSpalten3').prop('checked', false).checkboxradio('refresh');
        $('#AnzSpalten4').prop('checked', false).checkboxradio('refresh');
        $('#AnzSpalten' + LS.AnzSpalten).prop('checked', true).checkboxradio('refresh');
    });
    if (navigator.platform.match(/(Win|Mac|Linux)/i)) {
        $('#bTastatur').hide();
    }
    if (QUERFORMAT()) {
        $('#nbHilfeEingabe').hide();
    } else {
        $('#bEingabe').click();
    }
    if (LS.ME === '3425' || LS.ME === '3590' || LS.ME === '6136') { // Hans Hafner, Wolfgang Stein
        $('#bReaktionszeit').show();
    }
    $("#bDefaults").click(function () {
        'use strict';
        LS.Schreibzettel = true;
        $('#Schreibzettelfalse').prop('checked', true).checkboxradio('refresh');
        $('#Schreibzetteltrue').prop('checked', false).checkboxradio('refresh');
        $('#AnzSpalten1,#AnzSpalten2,#AnzSpalten3,#AnzSpalten4').prop('checked', false).checkboxradio('refresh');
        if (navigator.platform.match(/(Win|Mac|Linux)/i)) {
            LS.AnzSpalten = 2;
            $('#AnzSpalten2').prop('checked', true).checkboxradio('refresh');
        } else {
            LS.AnzSpalten = 1;
            $('#AnzSpalten1').prop('checked', true).checkboxradio('refresh');
        }
        $('#FotoStyle1,#FotoStyle2,#FotoStyle3,#FotoStyle4,#FotoStyle5').prop('checked', false).checkboxradio('refresh');
        $('#FotoStyle0').prop('checked', true).checkboxradio('refresh');
        $("#iTIMEOUT").val(100);
    });
    $("#bSpeichern").click(function () {

        LS.VIC[0] = parseInt($("input[name='nVIC']:checked").val());
        if (!LS.VIC[0]) {
            showEinenTip("#iR51", 'Welcher Cup ist für dich der wichtigste?');
            return;
        }

        LS.AktTage = $("#iAKTTAGE").val();
        var hFreunde = $("#iFREUNDE").val();
        var hSave;
        LS.Freunde = [];
        while (hFreunde) {
            if (hFreunde.indexOf(',') >= 0) {
                hSave = hFreunde.substr(0, (hFreunde.indexOf(','))).trim();
                hFreunde = hFreunde.substr((hFreunde.indexOf(',') + 1));
            } else {
                hSave = hFreunde.trim();
                hFreunde = null;
            }
            if (hSave) {
                LS.Freunde[LS.Freunde.length] = hSave;
            }
        }

        for (var ii = 0; ii < LS.Freunde.length; ii++) {
            if (ii === 0) {
                hFreunde = LS.Freunde[ii];
            } else {
                hFreunde = hFreunde + ', ' + LS.Freunde[ii];
            }
        }
        $("#iFREUNDE").val(hFreunde);
        var hTimeout = parseInt($("#iTIMEOUT").val());
        if (hTimeout > 400) {
            hTimeout = 400;
        }
        LS.Timeout = hTimeout;
        localStorage.setItem('Abakus.LS', JSON.stringify(LS));
        window.history.back();
    });
    myJTip = new jBox('Tooltip', {
        theme: 'TooltipError',
        delayClose: 20,
        closeOnClick: true,
        closeOnEsc: true
    });
});