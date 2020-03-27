
/* global LS, pValat, iFarbensolo, iFarben3er, sI */

function FS_Init() {
    $('#ss1,#ss2,#ss3,#ss4,#ss5,#ss6').removeClass('bgKontra2').removeClass('bgKontra4').removeClass('bgKontra8');
    $('.cFS,#F1,#F2,#F3,#FValat').buttonMarkup({theme: 'a'});
    $('.ui-nobtn').removeClass('ui-btn').removeClass('ui-btn-a').removeClass('ui-corner-all').removeClass('ui-shadow');
    $('.cFS a,#gName').removeClass('ui-btn-active');
    $('#F1e,#F2e,#F3e,#FValate').text('').hide();

    aktSpiel = 0;
    aktPunkte = 0;
    soloFaktor = 1;
    kontra = 1;

    if (!LS.Tarif[iFarben3er]) {
        $('#d11').addClass('ui-disabled');
        $('#d11_1').addClass('ui-disabled');
    }
    if (!LS.Tarif[iFarbensolo]) {
        $('#d12').addClass('ui-disabled');
    }
    $('.cPS,.cNS,#gWert').hide();
    $('.cFS').show();

    $('#dKontra').removeClass('nb24').addClass('nb0');
    $('#dName').removeClass('nb52').addClass('nb76');
    $('.cKontra').removeClass('bgKontra2').removeClass('bgKontra4').removeClass('bgKontra8').text('Kontra');
    if ((LS.TURRUNDE || LS.TURTISCH) && LS.I !== 11) {
        $('.cKontra').addClass('ui-disabled');
    }
    setFont();
}

function pruefenFS() {

    var cStill = 'ui-btn-c';
    var cAngesagt = 'ui-btn-e';
    var cKontra = 'ui-btn-b';

    var pPraemie = '';

    if ($('#F1').hasClass(cStill)) {
        pPraemie = pPraemie + '\\u24DA'; // k
    } else if ($('#F1').hasClass(cAngesagt) || $('#F1').hasClass(cKontra)) {
        pPraemie = pPraemie + '\\u24C0'; // K
    }
    if (LS.Regeln !== 'Ti.') {
        if ($('#F2').hasClass(cStill)) {
            pPraemie = pPraemie + '\\u24D0'; // a
        } else if ($('#F2').hasClass(cAngesagt) || $('#F2').hasClass(cKontra)) {
            pPraemie = pPraemie + '\\u24B6'; // A
        }
    } else {
        if ($('#F2').hasClass(cStill)) {
            pPraemie = pPraemie + '\\u24E2'; // s
        } else if ($('#F2').hasClass(cAngesagt) || $('#F2').hasClass(cKontra)) {
            pPraemie = pPraemie + '\\u24C8'; // S
        }
    }
    if ($('#F3').hasClass(cStill)) {
        pPraemie = pPraemie + '\\u24E7'; // x
    } else if ($('#F3').hasClass(cAngesagt) || $('#F3').hasClass(cKontra)) {
        pPraemie = pPraemie + '\\u24CD'; // X
    }

    pPraemie = eval('"' + pPraemie + '"');

    if (aktSpiel === iFarben3er) {
        var pGame = 'Farb.3er ' + pPraemie;
    } else {
        var pGame = 'Farb.Solo ' + pPraemie;
    }

    XSBuchen(pGame, aktPunkte, sI, 0);
}

