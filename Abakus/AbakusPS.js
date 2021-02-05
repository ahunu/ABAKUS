
/* global LS, pPagat, pUhu, pKakadu, pQuapil, pValat, iRufer, iPagatrufer, iUhurufer, iKakadurufer, iQuapilrufer, iSolorufer, i6er, i3er, iSolo3er, sI, pI, jbSelberrufer, selberruferSpeichern, pXY, pAbsolut, pTrull, p4Koenige, pUltimo */

function PS_Init() {
    $('#ss1,#ss2,#ss3,#ss4,#ss5,#ss6').removeClass('bgKontra2').removeClass('bgKontra4').removeClass('bgKontra8');
    $('.cPS,#P1,#P2,#P3,#P4,#P5,#P6,#P7,#P8,#P9,#PValat').buttonMarkup({ theme: 'a' });
    $('.ui-nobtn').removeClass('ui-btn').removeClass('ui-btn-a').removeClass('ui-corner-all').removeClass('ui-shadow');
    $('#P5,#P6').removeClass('ui-disabled');
    $('#P1e,#P2e,#P3e,#P4e,#P5e,#P6e,#P7e,#P8e,#P9e,#PValate').text('').hide();
    $('.cPS a,#gName').removeClass('ui-btn-active');
    $('.cFS,.cNS,#gWert').hide();
    $('.cPS').show();

    aktSpiel = 0;
    aktPunkte = 0;
    soloFaktor = 1;
    kontra = 1;

    if ((LS.TURRUNDE || LS.TURTISCH) && LS.I !== 11) {
        $('#dKontra').removeClass('nb24').addClass('nb0');
        $('#dName').removeClass('nb52').addClass('nb76');
        $('.cKontra').removeClass('bgKontra2').removeClass('bgKontra4').removeClass('bgKontra8').text('Kontra').addClass('ui-disabled');
    } else {
        if (LS.Tarif21T) {
            $('.cKontra').show();
            $('#nbSpiel').hide();
            $('#dKontra').removeClass('nb0').addClass('nb24');
            $('#dName').removeClass('nb76').addClass('nb52');
            $('.cKontra').removeClass('bgKontra2').removeClass('bgKontra4').removeClass('bgKontra8').text('Kont.');
        } else {
            $('#dKontra').removeClass('nb24').addClass('nb0');
            $('#dName').removeClass('nb52').addClass('nb76');
            $('.cKontra').removeClass('bgKontra2').removeClass('bgKontra4').removeClass('bgKontra8').text('Kontra');
        }
    }
    setFont();
}

function SetPraemienSolo(pSolo) {

    var cStill = 'ui-btn-c';
    var cAngesagt = 'ui-btn-e';
    var cKontra = 'bgKontra2';
    var cRetour = 'bgKontra4';
    var cSub = 'bgKontra8';

    if (pSolo && soloFaktor !== 2
        || !pSolo && soloFaktor !== 1) {

        if (LS.I === 37) {  // Eggenberger Runde, Johannes Toppelreiter
            soloFaktor = 1; // Keine Verdoppelung der Prämien
        } else {
            if (pSolo) {
                soloFaktor = 2;
            } else {
                soloFaktor = 1;
            }
        }

        if ($('#P1').hasClass(cStill)) {
            BtnSet('#P1e', LS.Tarif[pPagat] * soloFaktor);
        } else if ($('#P1').hasClass(cAngesagt)) {
            BtnSet('#P1e', LS.Tarif[pPagat] * soloFaktor * 2);
        } else if ($('#P1').hasClass(cKontra)) {
            BtnSet('#P1e', LS.Tarif[pPagat] * soloFaktor * 4);
        } else if ($('#P1').hasClass(cRetour)) {
            BtnSet('#P1e', LS.Tarif[pPagat] * soloFaktor * 8);
        } else if ($('#P1').hasClass(cSub)) {
            BtnSet('#P1e', LS.Tarif[pPagat] * soloFaktor * 16);
        }

        if ($('#P2').hasClass(cStill)) {
            BtnSet('#P2e', LS.Tarif[pUhu] * soloFaktor);
        } else if ($('#P2').hasClass(cAngesagt)) {
            BtnSet('#P2e', LS.Tarif[pUhu] * soloFaktor * 2);
        } else if ($('#P2').hasClass(cKontra)) {
            BtnSet('#P2e', LS.Tarif[pUhu] * soloFaktor * 4);
        } else if ($('#P2').hasClass(cRetour)) {
            BtnSet('#P2e', LS.Tarif[pUhu] * soloFaktor * 8);
        } else if ($('#P2').hasClass(cSub)) {
            BtnSet('#P2e', LS.Tarif[pUhu] * soloFaktor * 16);
        }

        if ($('#P3').hasClass(cStill)) {
            BtnSet('#P3e', LS.Tarif[pKakadu] * soloFaktor);
        } else if ($('#P3').hasClass(cAngesagt)) {
            BtnSet('#P3e', LS.Tarif[pKakadu] * soloFaktor * 2);
        } else if ($('#P3').hasClass(cKontra)) {
            BtnSet('#P3e', LS.Tarif[pKakadu] * soloFaktor * 4);
        } else if ($('#P3').hasClass(cRetour)) {
            BtnSet('#P3e', LS.Tarif[pKakadu] * soloFaktor * 8);
        } else if ($('#P3').hasClass(cSub)) {
            BtnSet('#P3e', LS.Tarif[pKakadu] * soloFaktor * 16);
        }

        if ($('#P4').hasClass(cStill)) {
            BtnSet('#P4e', LS.Tarif[pQuapil] * soloFaktor);
        } else if ($('#P4').hasClass(cAngesagt)) {
            BtnSet('#P4e', LS.Tarif[pQuapil] * soloFaktor * 2);
        } else if ($('#P4').hasClass(cKontra)) {
            BtnSet('#P4e', LS.Tarif[pQuapil] * soloFaktor * 4);
        } else if ($('#P4').hasClass(cRetour)) {
            BtnSet('#P4e', LS.Tarif[pKakadu] * soloFaktor * 8);
        } else if ($('#P4').hasClass(cSub)) {
            BtnSet('#P4e', LS.Tarif[pKakadu] * soloFaktor * 16);
        }

        if ($('#P5').hasClass(cStill)) {
            BtnSet('#P5e', LS.Tarif[pTrull] * soloFaktor);
        } else if ($('#P5').hasClass(cAngesagt)) {
            BtnSet('#P5e', LS.Tarif[pTrull] * soloFaktor * 2);
        } else if ($('#P5').hasClass(cKontra)) {
            BtnSet('#P5e', LS.Tarif[pTrull] * soloFaktor * 4);
        } else if ($('#P5').hasClass(cRetour)) {
            BtnSet('#P5e', LS.Tarif[pTrull] * soloFaktor * 8);
        } else if ($('#P5').hasClass(cSub)) {
            BtnSet('#P5e', LS.Tarif[pTrull] * soloFaktor * 16);
        }

        if ($('#P6').hasClass(cStill)) {
            BtnSet('#P6e', LS.Tarif[p4Koenige] * soloFaktor);
        } else if ($('#P6').hasClass(cAngesagt)) {
            BtnSet('#P6e', LS.Tarif[p4Koenige] * soloFaktor * 2);
        } else if ($('#P6').hasClass(cKontra)) {
            BtnSet('#P6e', LS.Tarif[p4Koenige] * soloFaktor * 4);
        } else if ($('#P6').hasClass(cRetour)) {
            BtnSet('#P6e', LS.Tarif[p4Koenige] * soloFaktor * 8);
        } else if ($('#P6').hasClass(cSub)) {
            BtnSet('#P6e', LS.Tarif[p4Koenige] * soloFaktor * 16);
        }

        if ($('#P7').hasClass(cStill)) {
            BtnSet('#P7e', LS.Tarif[pUltimo] * soloFaktor);
        } else if ($('#P7').hasClass(cAngesagt)) {
            BtnSet('#P7e', LS.Tarif[pUltimo] * soloFaktor * 2);
        } else if ($('#P7').hasClass(cKontra)) {
            BtnSet('#P7e', LS.Tarif[pUltimo] * soloFaktor * 4);
        } else if ($('#P7').hasClass(cRetour)) {
            BtnSet('#P7e', LS.Tarif[pUltimo] * soloFaktor * 8);
        } else if ($('#P7').hasClass(cSub)) {
            BtnSet('#P7e', LS.Tarif[pUltimo] * soloFaktor * 16);
        }

        if ($('#P8').hasClass(cStill)) {
            BtnSet('#P8e', LS.Tarif[pAbsolut] * soloFaktor);
        } else if ($('#P8').hasClass(cAngesagt)) {
            BtnSet('#P8e', LS.Tarif[pAbsolut] * soloFaktor * 2);
        } else if ($('#P8').hasClass(cKontra)) {
            BtnSet('#P8e', LS.Tarif[pAbsolut] * soloFaktor * 4);
        } else if ($('#P8').hasClass(cRetour)) {
            BtnSet('#P8e', LS.Tarif[pAbsolut] * soloFaktor * 8);
        } else if ($('#P8').hasClass(cSub)) {
            BtnSet('#P8e', LS.Tarif[pAbsolut] * soloFaktor * 16);
        }

        if ($('#P9').hasClass(cStill)) {
            BtnSet('#P9e', LS.Tarif[pXY] * soloFaktor);
        } else if ($('#P9').hasClass(cAngesagt)) {
            BtnSet('#P9e', LS.Tarif[pXY] * soloFaktor * 2);
        } else if ($('#P9').hasClass(cKontra)) {
            BtnSet('#P9e', LS.Tarif[pXY] * soloFaktor * 4);
        } else if ($('#P9').hasClass(cRetour)) {
            BtnSet('#P9e', LS.Tarif[pXY] * soloFaktor * 8);
        } else if ($('#P9').hasClass(cSub)) {
            BtnSet('#P9e', LS.Tarif[pXY] * soloFaktor * 16);
        }

        if (LS.Tarif[pValat]) {
            if ($('#PValat').hasClass(cStill)) {
                BtnSet('#PValate', LS.Tarif[pValat] * soloFaktor);
            } else if ($('#PValat').hasClass(cAngesagt)) {
                BtnSet('#PValate', LS.Tarif[pValat] * soloFaktor * 2);
            } else if ($('#PValat').hasClass(cKontra)) {
                BtnSet('#PValate', LS.Tarif[pValat] * soloFaktor * 4);
            } else if ($('#PValat').hasClass(cRetour)) {
                BtnSet('#PValate', LS.Tarif[pValat] * soloFaktor * 8);
            } else if ($('#PValat').hasClass(cSub)) {
                BtnSet('#PValate', LS.Tarif[pValat] * soloFaktor * 16);
            }
        }
    }
}

function pruefenPS() {
    var pGame = '';
    var pPraemie = '';
    var hRufer = iRufer;

    var cStill = 'ui-btn-c';
    var cAngesagt = 'ui-btn-e';
    var cKontra = 'bgKontra2';
    var cRetour = 'bgKontra4';
    var cSub = 'bgKontra8';

    if ($('#P1').hasClass(cStill)) {
        pPraemie = pPraemie + '\\u2780';
    } else if ($('#P1').hasClass(cAngesagt)
        || $('#P1').hasClass(cKontra)
        || $('#P1').hasClass(cRetour)
        || $('#P1').hasClass(cSub)) {
        pPraemie = pPraemie + '\\u278A';
        hRufer = iPagatrufer;
    }
    if ($('#P2').hasClass(cStill)) {
        pPraemie = pPraemie + '\\u2781';
    } else if ($('#P2').hasClass(cAngesagt)
        || $('#P2').hasClass(cKontra)
        || $('#P2').hasClass(cRetour)
        || $('#P2').hasClass(cSub)) {
        pPraemie = pPraemie + '\\u278B';
        hRufer = iUhurufer;
    }
    if ($('#P3').hasClass(cStill)) {
        pPraemie = pPraemie + '\\u2782';
    } else if ($('#P3').hasClass(cAngesagt)
        || $('#P3').hasClass(cKontra)
        || $('#P3').hasClass(cRetour)
        || $('#P3').hasClass(cSub)) {
        pPraemie = pPraemie + '\\u278C';
        hRufer = iKakadurufer;
    }
    if ($('#P4').hasClass(cStill)) {
        pPraemie = pPraemie + '\\u2783';
    } else if ($('#P4').hasClass(cAngesagt)
        || $('#P4').hasClass(cKontra)
        || $('#P4').hasClass(cRetour)
        || $('#P4').hasClass(cSub)) {
        pPraemie = pPraemie + '\\u278D';
        hRufer = iQuapilrufer;
    }

    if ($('#P5').hasClass(cStill)) {
        pPraemie = pPraemie + '\\u24E3'; // t
    } else if ($('#P5').hasClass(cAngesagt)
        || $('#P5').hasClass(cKontra)
        || $('#P5').hasClass(cRetour)
        || $('#P5').hasClass(cSub)) {
        pPraemie = pPraemie + '\\u24C9'; // T
    }
    if ($('#P6').hasClass(cStill)) {
        pPraemie = pPraemie + '\\u24DA'; // k
    } else if ($('#P6').hasClass(cAngesagt)
        || $('#P6').hasClass(cKontra)
        || $('#P6').hasClass(cRetour)
        || $('#P6').hasClass(cSub)) {
        pPraemie = pPraemie + '\\u24C0'; // K
    }
    if ($('#P7').hasClass(cStill)) {
        pPraemie = pPraemie + '\\u24E4'; // u
    } else if ($('#P7').hasClass(cAngesagt)
        || $('#P7').hasClass(cKontra)
        || $('#P7').hasClass(cRetour)
        || $('#P7').hasClass(cSub)) {
        pPraemie = pPraemie + '\\u24CA'; // U
    }
    if (LS.Regeln !== 'Ti.') {
        if ($('#P8').hasClass(cStill)) {
            pPraemie = pPraemie + '\\u24D0'; // a
        } else if ($('#P8').hasClass(cAngesagt)
            || $('#P8').hasClass(cKontra)
            || $('#P8').hasClass(cRetour)
            || $('#P8').hasClass(cSub)) {
            if (LS.Tarif20T === 'V') {
                hRufer = iQuapilrufer;
                var hFuenfer = true;
            } else {
                pPraemie = pPraemie + '\\u24B6'; // A (Absolut)
            }
        }
    } else {
        if ($('#P8').hasClass(cStill)) {
            pPraemie = pPraemie + '\\u24E2'; // s
        } else if ($('#P8').hasClass(cAngesagt)
            || $('#P8').hasClass(cKontra)
            || $('#P8').hasClass(cRetour)
            || $('#P8').hasClass(cSub)) {
            pPraemie = pPraemie + '\\u24C8'; // S
        }
    }
    if ($('#P9').hasClass(cStill)) {
        pPraemie = pPraemie + '\\u24E7'; // x
    } else if ($('#P9').hasClass(cAngesagt)
        || $('#P9').hasClass(cKontra)
        || $('#P9').hasClass(cRetour)
        || $('#P9').hasClass(cSub)) {
        if (LS.Tarif21T === 'V') {
            hRufer = iQuapilrufer;
            var hFuenfer = true;
        } else {
            pPraemie = pPraemie + '\\u24CD'; // X
        }
    }

    if ($('#PValat').hasClass(cStill)) {
        pPraemie = pPraemie + '\\u24E5'; // v
    } else if ($('#PValat').hasClass(cAngesagt)
        || $('#PValat').hasClass(cKontra)
        || $('#PValat').hasClass(cRetour)
        || $('#PValat').hasClass(cSub)) {
        pPraemie = pPraemie + '\\u24CB'; // V
    }

    if (aktSpiel === iRufer
        || aktSpiel === iPagatrufer
        || aktSpiel === iUhurufer
        || aktSpiel === iKakadurufer
        || aktSpiel === iQuapilrufer) {
        aktSpiel = hRufer;
    }

    pPraemie = eval('"' + pPraemie + '"');

    if (aktSpiel === iRufer) {
        pGame = 'Rufer ' + pPraemie;
    } else if (aktSpiel === iSolorufer) {
        pGame = 'Soloruf. ' + pPraemie;
    } else if (aktSpiel === iPagatrufer) {
        pGame = 'I-Rufer ' + pPraemie;
    } else if (aktSpiel === iUhurufer) {
        pGame = 'II-Rufer ' + pPraemie;
    } else if (aktSpiel === iKakadurufer) {
        pGame = 'III-Ruf. ' + pPraemie;
    } else if (aktSpiel === iQuapilrufer) {
        if (hFuenfer) {
            pGame = 'V-Ruf. ' + pPraemie;
        } else {
            pGame = 'IIII-Ruf. ' + pPraemie;
        }
    } else if (aktSpiel === i6er) {
        pGame = '6er ' + pPraemie;
    } else if (aktSpiel === i3er) {
        pGame = '3er ' + pPraemie;
    } else if (aktSpiel === iSolo3er) {
        pGame = 'Solo-3er ' + pPraemie;
    }

    if (sI === 0) { // Nicht möglich!
        showEinenTip('#bEnter', 'Es&nbsp;wurde&nbsp;kein<br><b>Spieler</b>&nbsp;ausgewählt.');
        return;
    } else if (aktSpiel === 0) { // Nicht möglich!
        showEinenTip('#bEnter', 'Es&nbsp;wurde&nbsp;kein<br><b>Spiel</b>&nbsp;ausgewählt.');
        return;
    } else if (aktSpiel === iRufer && sI !== LS.Vorhand) {
        showEinenTip('#ss' + LS.Vorhand, 'Nur&nbsp;die&nbsp;Vorhand&nbsp;kann<br>einen&nbsp;Rufer&nbsp;spielen.');
        return;
    } else if ((aktSpiel <= iQuapilrufer) && pI === 0) {
        jbSelberrufer.open();
        return;
    } else {
        XSBuchen(pGame, aktPunkte, sI, pI);
    }
}
