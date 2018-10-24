
/* global DS, LS, chrome */

var canvas;
var ctx;
var aktPos = 0;
var Hoehe = 300;
var Breite = 200;
var hMeld = 'J';
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
    'use strict';

    Hoehe = canvas.height;
    Breite = canvas.width;

    ctx.save();
    ctx.textAlign = 'center';

    if (Hoehe > Breite) { // Hochformat

        var B = Breite;
        var H = Hoehe;
        var BB = Breite;      // Blockbreite
        var BH = Breite / 2.3;  // Blockhöhe
        var TH = Breite / 8.9;  // Texthöhe

        if (Breite / (Hoehe / 2) > 1.7) {         // Korrektur breite Tablets llll
            TH = Breite / (8.9 + (Breite / (Hoehe / 2.4) - 1.7));
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
                if (LS.Vorhand === 4) {
                    ctx.fillStyle = hVorhandBGcol;
                } else {
                    ctx.fillStyle = '#eee';
                }
                ctx.fillRect(0, Hoehe * 0.25, Breite * 0.44, Hoehe * 0.5);

                if (LS.Vorhand === 2) {
                    ctx.fillStyle = hVorhandBGcol;
                } else {
                    ctx.fillStyle = '#eee';
                }
                ctx.fillRect(Breite * 0.56, Hoehe * 0.25, Breite * 0.44, Hoehe * 0.5);

                if (LS.Vorhand === 1) {
                    ctx.fillStyle = hVorhandBGcol;
                } else {
                    ctx.fillStyle = '#eee';
                }
                ctx.fillRect(0, Hoehe * 0.75, Breite, Hoehe * 0.25);

                if (LS.Vorhand === 3) {
                    ctx.fillStyle = hVorhandBGcol;
                } else {
                    ctx.fillStyle = '#eee';
                }
                ctx.fillRect(0, 0, Breite, Hoehe * 0.25);
            }

            ctx.beginPath();
            ctx.moveTo(0, Hoehe * 0.25);
            ctx.lineTo(Breite, Hoehe * 0.25);
            ctx.closePath();
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(0, Hoehe * 0.75);
            ctx.lineTo(Breite, Hoehe * 0.75);
            ctx.closePath();
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(Breite, 0);
            ctx.closePath();
            ctx.strokeStyle = '#bbb';
            ctx.stroke();

            ctx.fillStyle = "#269";
            ctx.beginPath();
            ctx.arc(Breite * 0.5, Hoehe * 0.25, Breite * 0.08, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
            ctx.beginPath();
            ctx.arc(Breite * 0.5, Hoehe * 0.75, Breite * 0.08, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
            ctx.fillRect(Breite * 0.42, Hoehe * 0.25, Breite * 0.16, Hoehe * 0.5);

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
            ctx.beginPath();
            ctx.arc(Breite * 0.5, Hoehe * 0.25, Breite * 0.06, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
            ctx.beginPath();
            ctx.arc(Breite * 0.5, Hoehe * 0.75, Breite * 0.06, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
            ctx.fillRect(Breite * 0.44, Hoehe * 0.25, Breite * 0.12, Hoehe * 0.5);

            // Buttons
            ctx.fillStyle = "lightgray";
            ctx.beginPath();
            ctx.arc(Breite - TH / 4, Hoehe * 0.75, TH / 1.8, 0, 2 * Math.PI);
            ctx.arc(TH / 4, Hoehe * 0.75, TH / 1.8, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fill();
            ctx.font = "bold " + (TH / 1.82) + "pt Helvetica";
            if (aktPos > 1) {
                ctx.fillStyle = "gray";
                ctx.beginPath();
                ctx.arc(TH / 8, Hoehe * 0.75, TH / 1.8, 0, 2 * Math.PI);
                ctx.closePath();
                ctx.fill();
                ctx.fillStyle = "white";
            } else {
                ctx.fillStyle = "DarkGray";
            }
            ctx.fillText('<', TH / 4, Hoehe * 0.75 + (TH / 4.2));
            if (aktPos < DS.Game.length - 1) {
                ctx.fillStyle = "gray";
                ctx.beginPath();
                ctx.arc(Breite - TH / 8, Hoehe * 0.75, TH / 1.8, 0, 2 * Math.PI);
                ctx.closePath();
                ctx.fill();
                ctx.fillStyle = "white";
            } else {
                ctx.fillStyle = "DarkGray";
            }
            ctx.fillText('>', Breite - TH / 4, Hoehe * 0.75 + (TH / 4.2));
        }

    } else {

        var B = Hoehe;
        var H = Breite;
        var BB = Breite / 2;   // Blockbreite
        var BH = Hoehe / 3.4;  // Blockhöhe
        var TH = Hoehe / 8.9;  // Texthöhe

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
                ctx.fillRect(Breite * 0.25, Hoehe * 0.58, Breite * 0.5, Hoehe * 0.42);

                if (LS.Vorhand === 3) {
                    ctx.fillStyle = hVorhandBGcol;
                } else {
                    ctx.fillStyle = '#eee';
                }
                ctx.fillRect(Breite * 0.25, 0, Breite * 0.5, Hoehe * 0.42);

                if (LS.Vorhand === 4) {
                    ctx.fillStyle = hVorhandBGcol;
                } else {
                    ctx.fillStyle = '#eee';
                }
                ctx.fillRect(0, 0, Breite * 0.25, Hoehe);

                if (LS.Vorhand === 2) {
                    ctx.fillStyle = hVorhandBGcol;
                } else {
                    ctx.fillStyle = '#eee';
                }
                ctx.fillRect(Breite * 0.75, 0, Breite * 0.25, Hoehe);
            }

            ctx.beginPath();
            ctx.moveTo(Breite * 0.25, 0);
            ctx.lineTo(Breite * 0.25, Hoehe);
            ctx.closePath();
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(Breite * 0.75, 0);
            ctx.lineTo(Breite * 0.75, Hoehe);
            ctx.closePath();
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(Breite, 0);
            ctx.closePath();
            ctx.strokeStyle = '#bbb';
            ctx.stroke();

            ctx.fillStyle = "#269";
            ctx.beginPath();
            ctx.arc(Breite * 0.25, Hoehe * 0.5, Hoehe * 0.08, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
            ctx.beginPath();
            ctx.arc(Breite * 0.75, Hoehe * 0.5, Hoehe * 0.08, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
            ctx.fillRect(Breite * 0.25, Hoehe * 0.42, Breite * 0.5, Hoehe * 0.16);

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

            ctx.beginPath();
            ctx.arc(Breite * 0.25, Hoehe * 0.5, Hoehe * 0.06, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
            ctx.beginPath();
            ctx.arc(Breite * 0.75, Hoehe * 0.5, Hoehe * 0.06, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
            ctx.fillRect(Breite * 0.25, Hoehe * 0.44, Breite * 0.5, Hoehe * 0.12);

            ctx.fillStyle = "#33d";
        }
    }

    if (pI === 1) {

        ctx.translate(Breite / 2, Hoehe - BH);

        if (Breite >= Hoehe) {
            if (hDisp !== 1) {
                ctx.font = "bold " + (TH / 1.82) + "pt Helvetica";
                ctx.font = "bold " + (TH / 1.82) + "pt sans-serif-condensed";
                ctx.fillText(getTitel(), 0, -TH * 1.35);
            } else {
                ctx.font = "bold " + (TH / 1.4) + "pt Helvetica";
                ctx.font = "bold " + (TH / 1.4) + "pt sans-serif-condensed";
                ctx.fillText(getSpiel(), 0, -TH * 1.35);
            }
        }

    } else if (pI === 2) {
        ctx.translate(Breite - BH, Hoehe / 2);
        ctx.rotate(Math.PI * -90 / 180);

        if (Hoehe >= Breite) {
            if (hDisp !== 1) {
                ctx.font = 'bold ' + (TH / 2) + "pt sans-serif-condensed";
                ctx.fillText(getTitel(), 0, TH * -0.33);
            } else {
                ctx.font = 'bold ' + (TH / 1.8) + "pt sans-serif-condensed";
                ctx.fillText(getSpiel(), 0, TH * -0.33);
            }
        }

    } else if (pI === 3) {
        ctx.translate(Breite / 2, BH);
        ctx.rotate(Math.PI * -180 / 180);
    } else if (pI === 4) {
        ctx.translate(BH, Hoehe / 2);
        ctx.rotate(Math.PI * 90 / 180);
    }

    var hKorr = 0;                        // llll
    if (Breite / (Hoehe / 2) > 1.7) {         // Korrektur breite Tablets llll
        hKorr = (Breite / (Hoehe / 2) - 1.7) * 33;
    }

    if (((pI === 1 || pI === 3) && (Hoehe >= Breite))
            || ((pI === 2 || pI === 4) && (Hoehe <= Breite))) {

        if (canvas.height >= canvas.width) { // Hochformat

            setFontStyle(pSumme, "S", TH - hKorr, B / 4, B / 2.6 + hKorr * 1.5);
            if (hDisp !== 1) {

                if (pI === 2) {
                    ctx.fillStyle = "#111";
                    ctx.font = (TH * 0.72) + "pt sans-serif-condensed";
                    ctx.fillText(pVName, -B / 5, BH);
                    ctx.fillText(pNName, -B / 5, B / 2.6 + hKorr * 1.5);
                } else {
                    ctx.fillStyle = "#111";
                    ctx.font = (TH * 0.72) + "pt sans-serif-condensed";
                    ctx.fillText(pVName, -B / 5, B / 3.8 + hKorr * 1.5);
                    ctx.fillText(pNName, -B / 5, B / 2.6 + hKorr * 1.5);
                }

            } else {
                setFontStyle(pPunkte, "P", TH - hKorr, -B / 5, B / 2.6 + hKorr * 1.5 + 5, pI);  // +5, da kein Fettdruck
                if (DS.Storno[aktPos]) {
                    ctx.fillStyle = "#111";
                    ctx.fillText('——', -B / 4, B / 2.6 + hKorr * 1.5);
                }
            }
        } else {
            setFontStyle(pSumme, "S", TH, B / 4, B / 4);
            if (hDisp === 1) {
                setFontStyle(pPunkte, "P", TH, -B / 4, B / 4, pI);
                if (DS.Storno[aktPos]) {
                    ctx.fillStyle = "#111";
                    ctx.fillText('——', -B / 4, B / 4);
                }
            } else {
                ctx.fillStyle = "#111";
                ctx.font = (TH * 0.8) + "pt sans-serif-condensed";
                ctx.fillText(pVName, -B / 4, B / 12);
                ctx.fillText(pNName, -B / 4, B / 4);
            }
        }

    } else {
        if (canvas.height >= canvas.width) { // Hochformat
            if (hDisp === 1) {
                setFontStyle(pPunkte, "P", TH, 0, TH * 1.9, pI);
                if (DS.Storno[aktPos]) {
                    ctx.fillStyle = "#111";
                    ctx.fillText('——', 0, TH * 1.9);
                }
            } else {
                ctx.fillStyle = "#111";
                ctx.font = (TH / 1.6) + "pt sans-serif-condensed";
                ctx.fillText(pVName, 0, BH * 0.24);
                ctx.fillText(pNName, 0, BH * 0.46);
            }
            setFontStyle(pSumme, "S", TH - hKorr, 0, BH * 0.95);
        } else {
            setFontStyle(pSumme, "S", TH, 0, BH * 0.95);
            if (hDisp === 1) {
                setFontStyle(pPunkte, "P", TH, 0, TH * 0.6, pI);
                if (DS.Storno[aktPos]) {
                    ctx.fillStyle = "#111";
                    ctx.fillText('——', 0, TH * 0.6);
                }
            } else {
                ctx.font = (TH * 0.8) + "pt sans-serif-condensed";
                ctx.fillStyle = "#111";
                ctx.fillText(pVName + '  ' + pNName, 0, TH * 0.25);
            }
        }
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
    if (parseInt(window.event.offsetY / (Hoehe / 7)) === 5) {
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