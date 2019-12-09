
/* global CUPS, I, hHeute, LS */

function showAktuelles(pText) {
    if (!QUERFORMAT()) {
        window.location.href = 'Abakus/Text.html?' + pText;
        return;
    }
    $('#dCopyright').each(function () { // sonst funktioniert important nicht
        this.style.setProperty('display', 'none', 'important');
    });
    if (CUPS.MELDAKT[I]) {
        $('#qfHeaderZeile2').text(CUPS.MELDAKT[I]);
    } else {
        $('#qfHeaderZeile2').text('Eine wichtige Information eingeben');
    }

    $(LS.LastBtn).removeClass('ui-btn-active');

    if (QUERFORMAT() && PC) {
        $('#iEdit').attr('style', 'position: fixed; top: 2px; right: 0.5vw; font-size: 3.1vw; cursor: pointer;').show();
    }

    var html = '';
    var hH = parseInt($(window).innerHeight() - $('#qfHeader').height() - 4);
    html = '<div style="width:100%; margin-left: auto; margin-right: auto; overflow-y: auto; height:' + hH + 'px; background-image: url(\'Icons/Background.png\'); background-size: 50%; background-position: center center; background-repeat: no-repeat; ">'
            + '<div style="width: 80%; padding: 1em; margin: 3em auto;">';

    if (AKTUELLES[I]) {
        html += AKTUELLES[I];
    }

    html += '</div></div>';
    $('#qfHeaderZeile2').html(hTitel2);
    $('#dRumpf').html(html).trigger('create');
}