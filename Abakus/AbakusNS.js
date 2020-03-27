/* global iTrischaker, LS, sI, pI, iPiZwiccolo, iBettler, iPiZwiccoloOvert, iBettlerOvert */

function NS_Init() {
    $('#ss1,#ss2,#ss3,#ss4,#ss5,#ss6,#bNegKontra,#gName').removeClass('bgKontra2').removeClass('bgKontra4').removeClass('bgKontra8');
    $('.cNS,#Nx2,#Nx4').buttonMarkup({theme: 'a'});
    $('.ui-nobtn').removeClass('ui-btn').removeClass('ui-btn-a').removeClass('ui-corner-all').removeClass('ui-shadow');
    $('.cNS a,#gName').removeClass('ui-btn-active');
    $('#bNegKontra').addClass('ui-disabled').text('Kontra *');

    aktSpiel = 0;
    aktPunkte = 0;
    kontra = 1;
    negKontra = [null, 1, 1, 1, 1, 1, 1];

    $('.cPS,.cFS,#gWert').hide();
    $('.cNS').show();

    $('#dKontra').removeClass('nb24').addClass('nb0');
    $('#dName').removeClass('nb52').addClass('nb76');
}

function pruefenNS() {
    if (aktSpiel === iTrischaker) {
        var pGame = 'Trisch.';
    } else if (aktSpiel === iPiZwiccolo) {
        var pGame = 'Pi.Zwi.';
    } else if (aktSpiel === iBettler) {
        var pGame = 'Bettler';
    } else if (aktSpiel === iPiZwiccoloOvert) {
        var pGame = 'PiZwi.ov';
    } else if (aktSpiel === iBettlerOvert) {
        var pGame = 'Bet.ov.';
    }

    if (aktSpiel === iTrischaker) {
        if (pI) {
            XSBuchen(pGame, aktPunkte, sI, pI, LS.Vorhand);
        } else {
            XSBuchen(pGame, aktPunkte, sI, 0, LS.Vorhand);
        }
    } else {
        NSBuchen(pGame, aktPunkte, sI, 0);
    }
}