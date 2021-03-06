
/* global LS, DS, chrome */

var canvas;
var ctx;
var aktPos = 0;
var Hoehe = 300;
var Breite = 200;
var TH; // Texthöhe;
var BH; // Blockhöhe;
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

    ctx.save();
    ctx.textAlign = 'center';

    if (QUERFORMAT()) {
        Breite = canvas.height;
        Hoehe = canvas.width;
        ctx.translate(Hoehe, 0);
        ctx.rotate(Math.PI * 90 / 180);
    } else {
        Hoehe = canvas.height;
        Breite = canvas.width;
    }

    TH = Breite / 8.2;      // Texthöhe
    BH = Breite - TH * 4.7;   // Blockhöhe
    TH = Breite / 8.7;     // Texthöhe

    if (Breite / (Hoehe / 2) > 1.7) {         // Korrektur breite Tablets llll
//        TH = TH - ((Breite / (Hoehe / 2.05)) - 1.7) * 110;
        TH = (Breite + Hoehe) / 22;
    }

    if (pI === 1) {

        if (LS.SpieleJeRunde && LS.SpieleJeRunde === nSpiele) {
            ctx.fillStyle = 'silver';
            ctx.fillRect(0, 0, Breite, Hoehe);
        } else if (aktPos !== DS.Game.length - 1) {
            ctx.fillStyle = '#eee';
            ctx.fillRect(0, 0, Breite, Hoehe);
        } else {
            Activate('#nbGR');
            if (LS.Vorhand === 2) {
                ctx.fillStyle = hVorhandBGcol;
            } else if (LS.INA1 === 2 || LS.INA2 === 2) {
                if (LS.Pausierer1 === 2 || LS.Pausierer2 === 2) {
                    ctx.fillStyle = '#888';
                } else {
                    ctx.fillStyle = '#bbb';
                }
            } else {
                ctx.fillStyle = '#eee';
            }
            ctx.fillRect(Breite * 0.5, Hoehe * 0.5, Breite * 0.5, Hoehe * 0.33);

            if (LS.Vorhand === 6) {
                ctx.fillStyle = hVorhandBGcol;
            } else if (LS.INA1 === 6 || LS.INA2 === 6) {
                if (LS.Pausierer1 === 6 || LS.Pausierer2 === 6) {
                    ctx.fillStyle = '#888';
                } else {
                    ctx.fillStyle = '#bbb';
                }
            } else {
                ctx.fillStyle = '#eee';
            }
            ctx.fillRect(0, Hoehe * 0.5, Breite * 0.5, Hoehe * 0.33);

            if (LS.Vorhand === 3) {
                ctx.fillStyle = hVorhandBGcol;
            } else if (LS.INA1 === 3 || LS.INA2 === 3) {
                if (LS.Pausierer1 === 3 || LS.Pausierer2 === 3) {
                    ctx.fillStyle = '#888';
                } else {
                    ctx.fillStyle = '#bbb';
                }
            } else {
                ctx.fillStyle = '#eee';
            }
            ctx.fillRect(Breite * 0.5, Hoehe * 0.17, Breite * 0.5, Hoehe * 0.33);

            if (LS.Vorhand === 5) {
                ctx.fillStyle = hVorhandBGcol;
            } else if (LS.INA1 === 5 || LS.INA2 === 5) {
                if (LS.Pausierer1 === 5 || LS.Pausierer2 === 5) {
                    ctx.fillStyle = '#888';
                } else {
                    ctx.fillStyle = '#bbb';
                }
            } else {
                ctx.fillStyle = '#eee';
            }
            ctx.fillRect(0, Hoehe * 0.17, Breite * 0.5, Hoehe * 0.33);

            if (LS.Vorhand === 1) {
                ctx.fillStyle = hVorhandBGcol;
            } else if (LS.INA1 === 1 || LS.INA2 === 1) {
                if (LS.Pausierer1 === 1 || LS.Pausierer2 === 1) {
                    ctx.fillStyle = '#888';
                } else {
                    ctx.fillStyle = '#bbb';
                }
            } else {
                ctx.fillStyle = '#eee';
            }
            ctx.fillRect(0, Hoehe * 0.83, Breite, Hoehe * 0.17);

            if (LS.Vorhand === 4) {
                ctx.fillStyle = hVorhandBGcol;
            } else if (LS.INA1 === 4 || LS.INA2 === 4) {
                if (LS.Pausierer1 === 4 || LS.Pausierer2 === 4) {
                    ctx.fillStyle = '#888';
                } else {
                    ctx.fillStyle = '#bbb';
                }
            } else {
                ctx.fillStyle = '#eee';
            }
            ctx.fillRect(0, 0, Breite, Hoehe * 0.17);
        }

        ctx.beginPath();
        ctx.moveTo(0, Hoehe * 0.17, 0);
        ctx.lineTo(Breite, Hoehe * 0.17);
        ctx.closePath();
        ctx.strokeStyle = '#111';
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, Hoehe * 0.5, 0);
        ctx.lineTo(Breite, Hoehe * 0.5);
        ctx.closePath();
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, Hoehe * 0.83, 0);
        ctx.lineTo(Breite, Hoehe * 0.83);
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
        ctx.arc(Breite * 0.5, Hoehe * 0.18, Breite * 0.075, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
        ctx.beginPath();
        ctx.arc(Breite * 0.5, Hoehe * 0.82, Breite * 0.075, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
        ctx.fillRect(Breite * 0.425, Hoehe * 0.18, Breite * 0.15, Hoehe * 0.636);
        // lll
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
        ctx.arc(Breite / 2, Hoehe * 0.18, Breite * 0.06, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
        ctx.beginPath();
        ctx.arc(Breite * 0.5, Hoehe * 0.82, Breite * 0.06, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
        ctx.fillRect(Breite * 0.44, Hoehe * 0.18, Breite * 0.12, Hoehe * 0.636);
        // lll
        if (!QUERFORMAT()) {
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
        }

        ctx.translate(Breite / 2, Hoehe - TH / 5);

    } else if (pI === 2) {

        ctx.translate(Breite - BH, Hoehe / 1.5);
        ctx.rotate(Math.PI * -90 / 180);

        if (hDisp !== 1) {
            ctx.font = 'bold ' + (TH * 0.55) + "pt sans-serif-condensed";
            ctx.fillText(getTitel(), Hoehe / 6, -TH * 0.44);
        } else {
            ctx.font = 'bold ' + (TH * 0.62) + "pt sans-serif-condensed";
            ctx.fillText(getSpiel(), Hoehe / 6, -TH * 0.44);
        }

    } else if (pI === 3) {

        ctx.translate(Breite - BH, Hoehe / 3);
        ctx.rotate(Math.PI * -90 / 180);

    } else if (pI === 4) {

        ctx.translate(Breite / 2, TH / 5);
        ctx.rotate(Math.PI * -180 / 180);

    } else if (pI === 5) {

        ctx.translate(BH, Hoehe / 3);
        ctx.rotate(Math.PI * -270 / 180);

    } else if (pI === 6) {

        ctx.translate(BH, Hoehe / 1.5);
        ctx.rotate(Math.PI * -270 / 180);

    }

    if (pI === 1 || pI === 4) {

        setFontStyle(pSumme, "S", TH, Breite / 4, 0);
        if (hDisp === 1) {
            setFontStyle(pPunkte, "P", TH, -Breite / 4, 3, pI); // 3, da kein Fettdruck
            if (DS.Storno[aktPos]) {
                ctx.fillStyle = "#111";
                ctx.fillText('——', -Breite / 4, 3);
            }
        } else {
            ctx.fillStyle = "#111";
            ctx.font = (TH / 1.5) + "pt sans-serif-condensed";
            ctx.fillText(pVName, -Breite / 5, TH * -1);
            ctx.fillText(pNName, -Breite / 5, TH * -0.1);
        }
    } else {

        setFontStyle(pSumme, "S", TH, 0, BH - TH / 4);
        if (hDisp === 1) {
            setFontStyle(pPunkte, "P", TH, 0, BH / 2.3, pI);
            if (DS.Storno[aktPos]) {
                ctx.fillStyle = "#111";
                ctx.fillText('——', 0, BH / 2.3);
            }
        } else {
            ctx.fillStyle = "#111";
            ctx.font = (TH / 1.6) + "pt sans-serif-condensed";
            ctx.fillText(pVName, 0, BH * 0.21);
            ctx.fillText(pNName, 0, BH * 0.42);
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
    aDisp(getEval(LS.VName[1]), getEval(LS.NName[1]) + LS.Sterne[1], getPunkte(1), getSumme(1), 1);
    aDisp(getEval(LS.VName[2]), getEval(LS.NName[2]) + LS.Sterne[2], getPunkte(2), getSumme(2), 2);
    aDisp(getEval(LS.VName[3]), getEval(LS.NName[3]) + LS.Sterne[3], getPunkte(3), getSumme(3), 3);
    aDisp(getEval(LS.VName[4]), getEval(LS.NName[4]) + LS.Sterne[4], getPunkte(4), getSumme(4), 4);
    aDisp(getEval(LS.VName[5]), getEval(LS.NName[5]) + LS.Sterne[5], getPunkte(5), getSumme(5), 5);
    aDisp(getEval(LS.VName[6]), getEval(LS.NName[6]) + LS.Sterne[6], getPunkte(6), getSumme(6), 6);
}

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
    DispSummen();
    if (iMP3 !== -1) {
        iMP3 = iMP3 + parseInt(window.event.offsetY / (Hoehe / 7));
        audioElement.src = mp3Name[iMP3];
        // erst abspielen wenn genug vom mp3 geladen wurde
        audioElement.addEventListener('canplay', function () {
            audioElement.play();
        }, false);
    }
}