
var LS = new Object();
var stLastZitat = [];
var stText = '';

function showNextZitat() {
    if (stText === 'Zitate') {
        html = '<div style="width:100%; margin-left: auto; margin-right: auto;">'
                + '<div style="padding: .2em;">';
        html += getZitate();
        html += '</div></div>';
        $('#dRumpf').html(html);
    } else {
        event.stopImmediatePropagation();
    }
}

function QUERFORMAT() {
    if ($(window).innerWidth() > $(window).innerHeight()) {
        return true;
    } else {
        return false;
    }
}

// I N I T  ************************************************************************************
$(document).ready(function () {
    'use strict';

    document.oncontextmenu = function () {
        return false; // oncontextmenu
    };

    document.onselectstart = function () {
        return false;
    };

    LS = JSON.parse(localStorage.getItem('Abakus.LS'));

    stText = LS.NextAktion;
    delete LS.NextAktion;
    localStorage.setItem('Abakus.LS', JSON.stringify(LS));

    var hH = parseInt($(window).innerHeight() - $('#dHeader').height() - $('#footer').height() - 3);
    var html = '<div style="width:100%; margin-left: auto; margin-right: auto; overflow-y: auto; height:' + hH + 'px;">'
            + '<div  style="padding: 1em;">';
    if (stText === 'Aktuelles') {
        var CUPS = JSON.parse(localStorage.getItem('Abakus.CUPS'));
        var AKTUELLES = JSON.parse(localStorage.getItem('Abakus.AKTUELLES'));
        $('#hTitel1').text(CUPS.NAME[LS.ShowCups]);
        $('#hTitel2').text(CUPS.MELDAKT[LS.ShowCups]);
        html += '<div class=M style="text-align:justify">' + AKTUELLES[LS.ShowCups] + '</div>';
        if (CUPS.TYP[LS.ShowCups] === 'CUP' && LS.ShowCups > 4) {
            $("#hLogo").attr("src", "../Icons/i" + LS.ShowCups + ".png");
        } else {
            $("#hLogo").attr("src", "../Icons/Farben.png");
        }
    } else {
        LS.ShowCups = 0;
        LS.LastBtn = '';
        localStorage.setItem('Abakus.LS', JSON.stringify(LS));
        $("#hLogo").attr("src", "../Icons/DieGeschichte.png");
        if (stText === 'Geschichte') {
            $('#hTitel1').text("Die Geschichte");
            $('#hTitel2').text("des Tarockspiels");
            html += getGeschichte();
        } else if (stText === 'Anekdoten') {
            $('#hTitel1').text("Anekdoten");
            $('#hTitel2').text("und Kurzweiliges");
            html += getAnekdoten();
        } else if (stText === 'CTDetailstatistik') {
            $('#hTitel1').text("Detailstatistik");
            $('#hTitel2').text("Eine Ankündigung");
            html += getDetailstatistik();
        } else if (stText === 'Zitate') {
            $('#dHeader').hide();
            html = '<div style="width:100%; margin-left: auto; margin-right: auto;">'
                    + '<div style="padding: .2em;">';
            $('#hTitel2').text("Zitate");
            html += getZitate();
        } else if (stText === 'Etikette') {
            $('#hTitel1').text("Tarocketikette");
            $('#hTitel2').text("Behnemen ist gefragt");
            html += getEtikette();
        } else if (stText === 'TippsUndTricks') {
            $('#hTitel1').text("Abakus");
            $('#hTitel2').text("Tipps & Tricks");
            html += getTippsUndTricks();
        } else if (stText === 'Urlaubsplaner') {
            $('#hTitel1').text("Urlaubsplaner");
            $('#hTitel2').text("Tarockurlaub gefällig?");
            html += getUrlaubsplaner();
            $("#hLogo").attr("src", "../Icons/Urlaub.png");
        }
    }
    html += '</div></div>';
    $('#dRumpf').html(html);

    $('#hLogo').css('height', $('#dHeader').height() - 8).show();

});