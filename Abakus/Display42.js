
/* global DS, chrome, LS */

var canvas;
var ctx;
var aktPos = 0;
var Hoehe = 300;
var Breite = 200;
var hMeld = 'J';
var bgColor = '';
var cBG = '';
var hDisp = 1;
var nSpiele = 0;
var hVorhandBGcol = "#efdf99";

var audioElement = new Object();
var mp3Name = [
    '../_mp3/ap_Fanfare.mp3',
    '../_mp3/ap_Fanfare_kurz.mp3',
    '../_mp3/ap_Fanfare_Tschardas.mp3',
    '../_mp3/ap_Applaus_kurz.mp3',
    '../_mp3/a_dodado.mp3',
    '../_mp3/a_dudade.mp3',
    '../_mp3/a_hmhmhm.mp3',

    '../_mp3/a_hmhmhm.mp3',
    '../_mp3/a_Husten.mp3',
    '../_mp3/an_Lacher.mp3',
    '../_mp3/an_Babylacher.mp3',
    '../_mp3/an_Trauerfanfare.mp3',
    '../_mp3/an_Winseln.mp3',
    '../_mp3/an_Furz.mp3'
];

function aDisp(pVName, pNName, pPunkte, pSumme, pI) {

    Hoehe = canvas.height;
    Breite = canvas.width;

    ctx.save();
    ctx.textAlign = 'center';

    var BB = Breite / 2;       // Blockbreite

    if (QUERFORMAT()) {
        var TH = Hoehe / 8;       // Texthöhe
        var BH = Hoehe / 2 - TH * 1.6; // Blockhöhe
        var TH = Hoehe / 8.5;      // Texthöhe
    } else {
        var TH = Hoehe / 11;        // Texthöhe
        var BH = Hoehe / 2 - TH * 2.2;  // Blockhöhe
        TH = Hoehe / 11.7;          // Texthöhe
        if (Breite / (Hoehe / 2) > 1.7) {         // Korrektur breite Tablets llll
            TH = (Breite + Hoehe) / 22;
        }
    }

    if (pI === 1) {

        if (LS.SpieleJeRunde && LS.SpieleJeRunde <= nSpiele) {
            ctx.fillStyle = 'silver';
            ctx.fillRect(0, 0, Breite, Hoehe);
        } else if (aktPos !== DS.Game.length - 1) {
            ctx.fillStyle = '#eee';
            ctx.fillRect(0, 0, Breite, Hoehe);
        } else {
            Activate('#nbGR');
            if (LS.Vorhand === 1) {
                ctx.fillStyle = hVorhandBGcol;
            } else {
                ctx.fillStyle = '#eee';
            }
            ctx.fillRect(0, Hoehe * 0.5, Breite * 0.5, Hoehe * 0.5);

            if (LS.Vorhand === 2) {
                ctx.fillStyle = hVorhandBGcol;
            } else {
                ctx.fillStyle = '#eee';
            }
            ctx.fillRect(Breite * 0.5, Hoehe * 0.5, Breite * 0.5, Hoehe * 0.5);

            if (LS.Vorhand === 3) {
                ctx.fillStyle = hVorhandBGcol;
            } else {
                ctx.fillStyle = '#eee';
            }
            ctx.fillRect(Breite * 0.5, 0, Breite * 0.5, Hoehe * 0.5);

            if (LS.Vorhand === 4) {
                ctx.fillStyle = hVorhandBGcol;
            } else {
                ctx.fillStyle = '#eee';
            }
            ctx.fillRect(0, 0, Breite * 0.5, Hoehe * 0.5);
        }

        ctx.beginPath();
        ctx.moveTo(0, Hoehe / 2);
        ctx.lineTo(Breite, Hoehe / 2);
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(Breite / 2, 0);
        ctx.lineTo(Breite / 2, Hoehe);
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Breite, 0);
        ctx.closePath();
        ctx.strokeStyle = '#bbb';
        ctx.stroke();

        ctx.fillStyle = "#269";
        ctx.fillRect(0, Hoehe * 0.44, Breite, Hoehe * 0.12);

        ctx.fillStyle = "dimgray";
        if (aktPos >= 1) {
            if (DS.Storno[aktPos]) {
                ctx.fillStyle = "lightsalmon";
            } else if (DS.Korr[aktPos]) {
                ctx.fillStyle = "peachpuff";
            } else if (DS.Game[aktPos][0] === '*') {
                ctx.fillStyle = "gold";
            }
        }
        ctx.fillRect(0, Hoehe * 0.45, Breite, Hoehe * 0.10);

        ctx.fillStyle = "lightgray";
        ctx.beginPath();
        ctx.arc(Breite * 0.025, Hoehe * 0.5, Hoehe * 0.05, 0, Math.PI * 2, true);
        ctx.arc(Breite * 0.975, Hoehe * 0.5, Hoehe * 0.05, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
        ctx.font = "bold " + (TH / 2) + "pt Helvetica";
        if (aktPos > 1) {
            ctx.fillStyle = "gray";
            ctx.beginPath();
            ctx.arc(Breite * 0.005, Hoehe * 0.5, Hoehe * 0.05, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = "white";
        } else {
            ctx.fillStyle = "DarkGray";
        }
        ctx.fillText('<', TH / 4, Hoehe * 0.5 + (TH / 4.2));
        if (aktPos < DS.Game.length - 1) {
            ctx.fillStyle = "gray";
            ctx.beginPath();
            ctx.arc(Breite * 0.995, Hoehe * 0.5, Hoehe * 0.05, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = "white";
        } else {
            ctx.fillStyle = "DarkGray";
        }
        ctx.fillText('>', Breite - TH / 4, Hoehe * 0.5 + (TH / 4));

        if (hDisp !== 1) {
            ctx.font = 'bold ' + (TH * 0.5) + "pt sans-serif-condensed";
            ctx.fillText(getTitel(), Breite / 2, (Hoehe + TH * 0.5) / 2);

            if (LS.ME === '3425') { // llll
                $('#dLabZeile1').text(getTitel());
            }

        } else {
            ctx.font = 'bold ' + (TH * 0.6) + "pt sans-serif-condensed";
            ctx.fillText(getSpiel(), Breite / 2, (Hoehe + TH * 0.6) / 2);
            if (LS.ME === '3425') { // llll
                $('#dLabZeile1').text(getSpiel());
            }
        }

        ctx.translate(Breite / 4, Hoehe - BH);

    } else if (pI === 2) {

        ctx.translate(Breite / 4 * 3, Hoehe - BH);

    } else if (pI === 3) {

        ctx.translate(Breite / 4 * 3, BH);
        ctx.rotate(Math.PI * -180 / 180);

    } else if (pI === 4) {

        ctx.translate(Breite / 4, BH);
        ctx.rotate(Math.PI * -180 / 180);
    }

    if (QUERFORMAT()) {
        ctx.fillStyle = "#111";
        ctx.font = (TH) + "pt sans-serif-condensed";
        ctx.fillText(pVName, 0, 0);

        setFontStyle(pPunkte, "P", TH, -Breite / 8, BH - TH / 2, pI);
        if (DS.Storno[aktPos]) {
            ctx.fillStyle = "#111";
            ctx.fillText('——', -Breite / 8, BH - TH / 2);
        }

        setFontStyle(pSumme, "S", TH, BB / 4, BH - TH / 2);
    } else {
        ctx.fillStyle = "#111";
        if (Breite > 1100) { // HD und größer
            ctx.font = (TH / 1.2) + "pt sans-serif-condensed";
        } else {
            ctx.font = (TH / 1.7) + "pt sans-serif-condensed";
        }
        ctx.font = (TH / 1.3) + "pt sans-serif-condensed"; // llll
        ctx.fillText(pVName, 0, TH * -0.55);

        if (hDisp === 1) {
            setFontStyle(pPunkte, "P", TH, 0, BH * 0.4, pI);
            if (DS.Storno[aktPos]) {
                ctx.fillStyle = "#111";
                ctx.fillText('——', 0, BH * 0.4);
            }
        } else {
            ctx.fillStyle = "#111";
            if (Breite > 1100) { // HD und größer
                ctx.font = (TH / 1.2) + "pt sans-serif-condensed";
            } else {
                ctx.font = (TH / 1.7) + "pt sans-serif-condensed";
            }
            ctx.font = (TH / 1.3) + "pt sans-serif-condensed";  // llll
            ctx.fillText(pNName, 0, BH * 0.22);
        }
        setFontStyle(pSumme, "S", TH, 0, BH - TH / 3);
    }

    ctx.restore();
    if (navigator.appVersion.indexOf("Windows") >= 0) {
        if (typeof chrome === "object") {
            document.body.appendChild(audioElement);
        }
    }

}

function DispSummen() {
    aDisp(getEval(LS.VName[1]) + LS.Sterne[1], getEval(LS.NName[1]), getPunkte(1), getSumme(1), 1);
    aDisp(getEval(LS.VName[2]) + LS.Sterne[2], getEval(LS.NName[2]), getPunkte(2), getSumme(2), 2);
    aDisp(getEval(LS.VName[3]) + LS.Sterne[3], getEval(LS.NName[3]), getPunkte(3), getSumme(3), 3);
    aDisp(getEval(LS.VName[4]) + LS.Sterne[4], getEval(LS.NName[4]), getPunkte(4), getSumme(4), 4);
    if (LS.SpieleJeRunde) {
        if (LS.gespielt === LS.SpieleJeRunde && hMeld === 'J') {
            setTimeout(function () {
                DispSummen2();
            }, 250);
        }
    }
}
;

function DispSummen2() {
    aDisp(getEval(LS.VName[1]) + LS.Sterne[1], getEval(LS.NName[1]), getPunkte(1), getSumme(1), 1);
    aDisp(getEval(LS.VName[2]) + LS.Sterne[2], getEval(LS.NName[2]), getPunkte(2), getSumme(2), 2);
    aDisp(getEval(LS.VName[3]) + LS.Sterne[3], getEval(LS.NName[3]), getPunkte(3), getSumme(3), 3);
    aDisp(getEval(LS.VName[4]) + LS.Sterne[4], getEval(LS.NName[4]), getPunkte(4), getSumme(4), 4);
    if (LS.SpieleJeRunde) {
        if (LS.gespielt === LS.SpieleJeRunde && hMeld === 'J') {
            setTimeout(function () {
                DispSummen();
            }, 250);
        }
    }
}
;

function changeDisp() {
    'use strict';
    if (typeof window.event === "undefined") { // nicht mit Firefox
        hDisp = hDisp * -1;
        DispSummen();
        return false;
    }
    var iMP3 = -1;
    if (parseInt(window.event.offsetY / (Hoehe / 7)) === 3) {
        if (window.event.offsetX > Breite * 0.9) {
            if (aktPos < DS.Game.length - 1) {
                Deactivate('#nbGR');
                aktPos++;
                hDisp = 1;
                DispSummen();
            }
        } else if (window.event.offsetX < Breite * 0.1) {
            if (aktPos > 1) {
                Deactivate('#nbGR');
                aktPos--;
                hDisp = 1;
                DispSummen();
            }
        } else {
            hDisp = hDisp * -1;
            DispSummen();
        }
        return false;
    }

    if (navigator.appVersion.indexOf("Windows") >= 0 && navigator.vendor.indexOf("Apple") < 0) {
        if (typeof chrome === "object") {
            audioElement.pause();
            if (window.event.offsetX > Breite * 0.8) {
                iMP3 = 0;
            } else if (window.event.offsetX < Breite * 0.2) {
                iMP3 = 7;
            }
        }
    }

    hDisp = hDisp * -1;
    hMeld = 'N';
    DispSummen();
    if (iMP3 === -1) {
        if (false) {
            var audio = new Media('../_mp3/a_hmhmhm.mp3');
            audio.play();
        }
    } else {
        iMP3 = iMP3 + parseInt(window.event.offsetY / (Hoehe / 7));
        audioElement.src = mp3Name[iMP3];
        // erst abspielen wenn genug vom mp3 geladen wurde
        audioElement.addEventListener('canplay', function () {
            audioElement.play();
        }, false);
    }
}