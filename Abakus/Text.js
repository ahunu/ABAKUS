
var LS = new Object();
var stLastZitat = [];

function showNextZitat() {
    if (window.location.href.indexOf('Zitate') > 0) {
        html = '<div style="width:100%; margin-left: auto; margin-right: auto;">'
                + '<div style="padding: .2em;">';
        html += getZitate();
        html += '</html></html>';
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
    LS.ShowCups = 0;
    LS.LastBtn = '';
    localStorage.setItem('Abakus.LS', JSON.stringify(LS));

    var hH = parseInt($(window).innerHeight() - $('#dHeader').height() - $('#footer').height() - 1);
    var html = '<div style="width:100%; margin-left: auto; margin-right: auto; overflow-y: auto; height:' + hH + 'px;">'
            + '<div style="padding: 1em;">';
    if (window.location.href.indexOf('Geschichte') > 0) {
        $('#hTitel1').text("Die Geschichte");
        $('#hTitel2').text("des Tarockspiels");
        html += getGeschichte();
    } else if (window.location.href.indexOf('Anekdoten') > 0) {
        $('#hTitel1').text("Anekdoten");
        $('#hTitel2').text("und Kurzweiliges");
        html += getAnekdoten();
    } else if (window.location.href.indexOf('Zitate') > 0) {
        $('#DHeader').hide();
        html = '<div style="width:100%; margin-left: auto; margin-right: auto;">'
                + '<div style="padding: .2em;">';
        $('#hTitel2').text("Zitate");
        html += getZitate();
    } else if (window.location.href.indexOf('Etikette') > 0) {
        $('#hTitel2').text("Tarocketikette");
        html += getEtikette();
    } else if (window.location.href.indexOf('TippsUndTricks') > 0) {
        $('#hTitel2').text("Tipps & Tricks");
        html += getTippsUndTricks();
    }
    html += '</html></html>';
    $('#dRumpf').html(html);

});