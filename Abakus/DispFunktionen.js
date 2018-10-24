
/* global chrome, NEXT, responsiveVoice */

function showGR() {

    DS = new Object();
    DS = JSON.parse(localStorage.getItem('Abakus.DS'));
    LS = new Object();
    LS = JSON.parse(localStorage.getItem('Abakus.LS'));

    if (navigator.appVersion.indexOf("Windows") >= 0) {
        if (typeof chrome === "object") {
            audioElement = new Audio('');
            audioElement.type = 'audio/mpeg';
        }
    }

    aktPos = DS.Game.length - 1;

    canvas = document.getElementById('bchart');
    if (window.location.search) {
        canvas.height = parseInt(window.location.search.substr(1)) - $('#NB').height() - $('#NB').height() - 2;
    } else {
        canvas.height = $(window).innerHeight() - $('#NB').height() - $('#NB').height() - 2;
    }
    canvas.width = $(window).width();
    ctx = canvas.getContext('2d');
    ctx.textAlign = "center";

    ctx.fillStyle = "#33d";
    ctx.strokeStyle = "#111";

    if (LS.Ansagen) {
        $("#iAudioOn").show();
        $("#iAudioOff").hide();
    } else {
        $("#iAudioOn").hide();
        $("#iAudioOff").show();
    }

    if (navigator.vendor.indexOf("Apple") >= 0) {
        $("#iAudioOn").hide();
        $("#iAudioOff").show();
        if (!(navigator.userAgent.match(/iPhone/i)) && !(navigator.userAgent.match(/iPod/i))) {
            $('#nbAudio').removeClass('ui-disabled').addClass('ui-disabled');
        }
    }

    if (LS.gespielt >= 2 && LS.gespielt !== LS.SpieleJeRunde) {
        hDisp = 1;
    } else {
        hDisp = -1;
    }

    DispSummen();
    if (NEXT.AnsageVorlesen && LS.Ansagen) { // An anderer Positon funktionier ResponsiveVoice nicht
        NEXT.AnsageVorlesen = false;         // wants to use speech DENY ALLOW -- nach Änderung eines Spiels EDITn.html
        localStorage.setItem('Abakus.NEXT', JSON.stringify(NEXT));
        if (navigator.vendor.indexOf("Apple") < 0) {
            responsiveVoice.OnVoiceReady = function () {
                responsiveVoice.speak(LS.Ansage, 'Deutsch Female');
            };
        } else if ('speechSynthesis' in window) {
            var hAnsage = new SpeechSynthesisUtterance(LS.Ansage);
            hAnsage.lang = "de-DE";
            window.speechSynthesis.speak(hAnsage);
        }
    }
}

function setFontStyle(pPunkte, pArt, pTH, x, y, pI) {
    var sPunkte = pPunkte + '';
    if (pPunkte >= 0 || pPunkte === '-' || sPunkte[0] !== '-') {
        ctx.fillStyle = "#111";
    } else {
        ctx.fillStyle = "#b00";
    }
    if (pArt === "P") {
        y = y - pTH / 10;
        if (pI === DS.Spieler[aktPos]) {
            ctx.font = 'italic ' + (pTH * 1.4) + "pt sans-serif-condensed";
        } else {
            ctx.font = (pTH * 1.4) + "pt sans-serif-condensed";
        }
        if (DS.Storno[aktPos]) {
            if (pPunkte >= 0 || pPunkte === '-') {
                ctx.fillStyle = "#555";
            } else {
                ctx.fillStyle = "#f66";
            }
        } else if (pI === DS.Spieler[aktPos]) {
            ctx.fillStyle = "#ffa500";
            ctx.fillText(pPunkte, x + pTH / 21, y + pTH / 45);
            ctx.fillText(pPunkte, x + pTH / 14, y + pTH / 30);
            ctx.fillText(pPunkte, x + pTH / 7, y + pTH / 15);
            if (pPunkte >= 0 || pPunkte === '-' || sPunkte[0] !== '-') {
                ctx.fillStyle = "#111";
            } else {
                ctx.fillStyle = "#b00";
            }
        }
    } else {
        if (sPunkte.length <= 2) {
            ctx.font = "bold " + (pTH * 1.6) + "pt Helvetica";
        } else {
            ctx.font = "bold " + (pTH * (1.6 - ((sPunkte.length - 2) / 10))) + "pt Helvetica";
        }
    }
    ctx.fillText(pPunkte, x, y);
}

function getEval(pName) {
    'use strict';
    return pName.replace(/&auml;/g, 'ä').replace(/&ouml;/g, 'ö').replace(/&uuml;/g, 'ü').replace(/&szlig;/g, 'ß');
}

function IsInteger(value) {
    'use strict';
    if ((parseFloat(value) === parseInt(value)) && !isNaN(value)) {
        return true;
    } else {
        return false;
    }
}

function getTitel() {
    var d = new Date();
    var hh = (d.getHours() < 10 ? '0' + d.getHours() : d.getHours());
    var mm = (d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes());

    if (DS.Storno[aktPos]
            || DS.Korr[aktPos]
            || DS.Game[aktPos][0] === '*') {
        ctx.fillStyle = "#111";
    } else {
        ctx.fillStyle = "#fb0";
    }

    if (LS.TURTISCH) {
        return hh + ':' + mm + '  Runde ' + LS.TURRUNDE + ', Tisch ' + LS.TURTISCH;
    } else {
        if (LS.CupName.indexOf("  ") > 1) {
            return hh + ':' + mm + '  ' + LS.CupName.substr(0, LS.CupName.indexOf('  '));
        } else {
            return hh + ':' + mm + '  ' + LS.CupName;
        }
    }
}
;

function getSpiel() {
    'use strict';
    var ret = '';
    var hSpiel = '';

    if (DS.Storno[aktPos] || DS.Korr[aktPos] || DS.Game[aktPos][0] === '*') {
        ctx.fillStyle = "#111";
    } else {
        ctx.fillStyle = "#fb0";
    }

    if (DS.Game[aktPos][0] === '*') {
        hSpiel = DS.Game[aktPos].substring(1);
    } else {
        hSpiel = DS.Game[aktPos];
    }
    ret = hSpiel;
    if (LS.doppelt > 0 && aktPos === DS.Game.length - 1) {
        if (hSpiel.length <= 6) {
            ret = ret + '   ' + LS.doppelt + '*';
        } else if (hSpiel.indexOf(" ") < 0) {
            ret = ret + '  ' + LS.doppelt + '*';
        } else {
            ret = ret + ' ' + LS.doppelt + '*';
        }
    }

    if (LS.DoppelteRunden) {
        if (LS.doppelt <= 0) {
            $('#iTarife').show();
            $('#iDoppelt').hide();
        } else {
            $('#iTarife').hide();
            $('#iDoppelt').show();
            $('#iDoppelt').removeClass('zmdi-collection-item-' + (LS.doppelt + 1));
            if (LS.doppelt < 9) {
                $('#iDoppelt').addClass('zmdi-collection-item-' + LS.doppelt);
            } else if (LS.doppelt === 9) {
                $('#iDoppelt').removeClass('zmdi-collection-item-99');
                $('#iDoppelt').addClass('zmdi-collection-item-9');
            } else {
                $('#iDoppelt').addClass('zmdi-collection-item-99');
            }
        }
    }

    if (DS.Game[aktPos].length <= 8) {
        ret = '   ' + ret;
    } else if (DS.Game[aktPos].indexOf(" ") < 0) {
        ret = '  ' + ret;
    } else {
        ret = ' ' + ret;
    }

    if (DS.Storno[aktPos]) {
        ret = 'S:' + ret;
    } else {
        ret = nSpiele + '.' + ret;
    }

    if (ret.length < 12 && (LS.AnzSpieler !== 4 || LS.JeSeite !== '2')) {
        ret = ret + '                    '.substr(0, parseInt((12 - ret.length) * 2));
    }

    return ret;
}
;

function getPunkte(pSpieler) {
    'use strict';
    if (aktPos < 1) {
        return 0;
    }
    var ret = DS.Punkte[pSpieler][aktPos];

    if (ret >= 0) {
        ret = '+' + ret;
    }

    if (aktPos === DS.Game.length - 1 && pSpieler !== LS.Pausierer1 && pSpieler !== LS.Pausierer2) {
        var hGeber = LS.Vorhand - 1;
        if (hGeber === 0) {
            hGeber = LS.AnzSpieler;
        }
        if (hGeber === LS.Pausierer1) {
            hGeber -= 1;
            if (hGeber === 0) {
                hGeber = LS.AnzSpieler;
            }
        }
        if (hGeber === LS.Pausierer2) {
            hGeber -= 1;
            if (hGeber === 0) {
                hGeber = LS.AnzSpieler;
            }
        }
        if (pSpieler === hGeber) {
            ret += eval('"\\u2447"'); // drei kleine Karten
//            ret += eval('"\\u2276"'); // Kleiner Pfeil
//            ret += eval('"\\u2057"'); // Kleiner Pfeil
//            ret += eval('"\\u2a94"'); // Kleiner Pfeil
//            ret += eval('"\\u270e"'); // Kleiner Pfeil
//            ret += eval('"\\u270d"'); // Kleiner Pfeil
//            ret += eval('"\\u2447"'); // Kleiner Pfeil
//            ret += eval('"\\u1367"'); // Kleiner Pfeil
//            ret += eval('"\\u2263"'); // IstGleichZeichen schräg (in der unteren Hälfte)
//            ret += '*';
//            ret += eval('"\\u2e17"'); // IstGleichZeichen schräg (in der unteren Hälfte)
//            ret += eval('"\\u2023"'); // Kleiner Pfeil
//            ret += eval('"\\u030b"'); // Kleiner Pfeil
        }
    }
    return ret;
}

function getSumme(pSpieler) {
    'use strict';
    var ret = 0;

    if (pSpieler === 1) {
        nSpiele = 0;
        if (aktPos === 0 || DS.Storno[aktPos]) {
            $('#nbKorr').removeClass('ui-disabled').addClass('ui-disabled');
        } else {
            $('#nbKorr').removeClass('ui-disabled');
        }
        if (aktPos !== DS.Game.length - 1 || LS.Ansage === ""
                || (navigator.vendor.indexOf("Apple") >= 0)
                && !navigator.userAgent.match(/iPhone/i)
                && !navigator.userAgent.match(/iPod/i)) {
            $('#nbAudio').removeClass('ui-disabled').addClass('ui-disabled');
        } else {
            $('#nbAudio').removeClass('ui-disabled');
        }
        for (var ii = 1; ii <= aktPos; ii++) {
            if (!DS.Storno[ii]) {
                nSpiele++;
            }
        }
    }

    for (var ii = 1; ii <= aktPos; ii++) {
        if (!DS.Storno[ii]) {
            if (IsInteger(DS.Punkte[pSpieler][ii])) {
                ret = ret + DS.Punkte[pSpieler][ii];
            }
        }
    }

    return ret;
}