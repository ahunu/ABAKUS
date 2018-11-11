
/* global LS */

var n = 0;

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
//            return false; // oncontextmenu
        };
    }
    document.onselectstart = function () {
//        return false;
    };

    $("#iShowSpielerNr").prop("checked", LS.ShowSpielerNr).checkboxradio("refresh");
    $('#iShowSpielerNr').change(function () {
        LS.ShowSpielerNr = !LS.ShowSpielerNr;
        $('#iShowSpielerNr').prop('checked', LS.ShowSpielerNr).checkboxradio('refresh');
    });


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
        $('#bLayout').hide();
        $('#bEingabe').click();
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
        $("#iTIMEOUT").val(100);
    });

    $("#bSpeichern").click(function () {

        $(".onExit").addClass('ui-disabled');

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

});

window.onbeforeunload = function (e) {
    $(".onExit").addClass('ui-disabled');
};