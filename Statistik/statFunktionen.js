
/* global stStat, stCup, QUERFORMAT(), LS, stFont, STAT, PC, stSynchron, CUPS, stNextTerminDat, SPIELER, tFIXPUNKTE, stSort, stTurCupGes, context, canvas, jbArchiv, stFinalTeilnehmer, stNamenLen, stSaison, iSaison, sp0Cupsiege, SP, stFilter, QUERFORMAT */

function sortNumber(a, b) {
    return a - b;
}

function istFreund(pSpieler) {
    for (var freund in LS.Freunde) {
        if (LS.Freunde[freund] === pSpieler) {
            return true;
        }
    }
    return false;
}

function myDateString(pDate) {
    var hDate = new Date(pDate);
    return hDate.getFullYear() + '-' + ('00' + (hDate.getMonth() + 1)).substr(-2) + '-' + ('00' + (hDate.getDate())).substr(-2);
}

function getJahrIndex(pDate) {
    var aktDate = new Date();
    var hJar = parseInt(pDate);
    if (pDate[5] === '0') {
        var hMon = parseInt(pDate.substr(6, 1)) - 1;
    } else {
        var hMon = parseInt(pDate.substr(5, 2)) - 1;
    }
    if (pDate[8] === '0') {
        var hTag = parseInt(pDate.substr(9, 1));
    } else {
        var hTag = parseInt(pDate.substr(8, 2));
    }
    var pDate = new Date(hJar, hMon, hTag);
    var hDiff = pDate.getFullYear() - aktDate.getFullYear();
    if (pDate.getMonth() < 3 && aktDate.getMonth() >= 3) {
        hDiff--;
    } else if (aktDate.getMonth() < 3 && pDate.getMonth() >= 3) {
        hDiff++;
    }
    return hDiff * -1;
}

function getStatMeldungen() {

    var ret = "";
    var Pfad = "../";
    if (STAT._AKTTURNIER && STAT._AKTTURNIER._TURNIER === stStat) {
        if (STAT._AKTTURNIER._RUNDE) {
            var nMinSeitRundeStart = parseInt((Date.now() - STAT._AKTTURNIER._RUNDESTART) / 60000);
            if (STAT._AKTTURNIER._RUNDE <= 3) {
                if (nMinSeitRundeStart < 15) {
                    ret += "&nbsp;<img src='" + Pfad + "Icons/Achtung.png'  width='24' height='24'><span class=M>&nbsp;<b>Runde " + STAT._AKTTURNIER._RUNDE + " wurde begonnen.</b><br></span>";
                } else if (nMinSeitRundeStart < 45) {
                    ret += "&nbsp;<img src='" + Pfad + "Icons/Achtung.png'  width='24' height='24'><span class=M>&nbsp;<b>Runde " + STAT._AKTTURNIER._RUNDE + " wird gespielt.</b><br></span>";
                } else if (nMinSeitRundeStart < 90) {
                    ret += "&nbsp;<img src='" + Pfad + "Icons/Achtung.png'  width='24' height='24'><span class=M>&nbsp;<b>Runde " + STAT._AKTTURNIER._RUNDE + " wird noch <wbr>gespielt.</b><br></span>";
                } else {
                    ret += "&nbsp;<img src='" + Pfad + "Icons/Achtung.png'  width='24' height='24'><span class=M>&nbsp;<b>Runde " + STAT._AKTTURNIER._RUNDE + " noch <wbr>nicht <wbr>gespeichert.</b><br></span>";
                }
            } else {
                ret += "<div class=noprint>";
                if (QUERFORMAT()) {
                    ret += "&nbsp;<img src='" + Pfad + "Icons/OK.png'  width='24' height='24'><span class=M>&nbsp;<b>Das Turnier wurde beendet.</b><br></span>";
                    ret += "&nbsp;<img src='" + Pfad + "Icons/Achtung.png'  width='24' height='24'><span class=M>&nbsp;<b>Die Korrektheit der Daten wurde noch nicht best&auml;tigt.</b><br></span>";
                    if (nMinSeitRundeStart < 15) {
                        var hZeit = new Date(STAT._AKTTURNIER._RUNDESTART + (60000 * 15)).toLocaleTimeString().substr(0, 5);
                        ret += "&nbsp;<img src='" + Pfad + "Icons/Achtung.png'  width='24' height='24'><span class=M>&nbsp;<b>Reklamationen werden bis " + hZeit + " angenommen.</b></span>";
                    }
                } else {
                    if (nMinSeitRundeStart < 15) {
                        var hZeit = new Date(STAT._AKTTURNIER._RUNDESTART + (60000 * 15)).toLocaleTimeString().substr(0, 5);
                        ret += "&nbsp;<img src='" + Pfad + "Icons/Achtung.png'  width='24' height='24'><span class=M>&nbsp;<b>Reklamationen werden bis " + hZeit + " angenommen.</b></span>";
                    } else {
                        ret += "&nbsp;<img src='" + Pfad + "Icons/Achtung.png'  width='24' height='24'><span class=M>&nbsp;<b>Die Korrektheit der Daten wurde noch nicht best&auml;tigt.</b><br></span>";
                    }
                }
                ret += "</div>";
            }
        }
    }
    ret += "<div id=dInstabil " + (!PC && !navigator.onLine && stSynchron ? "" : "hidden") + ">";
    ret += "&nbsp;<img src='" + Pfad + "Icons/Achtung.png'  width='24' height='24'><span class=M>&nbsp;<b>Instabile Internetverbindung.</b><br></span>";
    ret += "</div>";
    ret += "<div id=dOffline " + (navigator.onLine || stSynchron ? "hidden" : "") + ">";
    ret += "&nbsp;<img src='" + Pfad + "Icons/Fehler.png'   width='24' height='24'><span class=M>&nbsp;<b>Keine Verbindung zum Internet.</b><br></span>";
    ret += "&nbsp;<img src='" + Pfad + "Icons/Achtung.png'  width='24' height='24'><span class=M>&nbsp;<b>Daten wurden nicht aktualisiert.</b><br></span>";
    ret += "</div>";
    return ret;
}

function getSpielerOrt(pNR, pSTANDORT) {
    var hOrt = '';
    if (isNaN(pNR)) {
        hOrt = pNR.substr(pNR.lastIndexOf('ˆ') + 1).replace(/%20|_|ˆ/g, ' ');
    } else {
        if (SPIELER[pNR]) {
            if (pSTANDORT && SPIELER[pNR].length > 3) {
                if (SPIELER[pNR][3]) {
                    return SPIELER[pNR][3];
                }
            }
            hOrt = SPIELER[pNR][2];
        } else {
            return '?';
        }
    }
    if (hOrt.indexOf(',') > 0) {
        hOrt = hOrt.substr(0, hOrt.indexOf(','));
    }
    if (hOrt.indexOf('/') > 0) {
        hOrt = hOrt.substr(0, hOrt.indexOf('/'));
    }
    if (hOrt.indexOf('-') > 0) {
        hOrt = hOrt.substr(0, hOrt.indexOf('-'));
    }
    return hOrt;
}

function getCupPunkte(pTurnier, pSpieler) {

    if (stCup === 55) { // 55 Tirolcup
        if (!STAT[pTurnier][pSpieler]) {
            return '-'; // Spieler hat am Finale nicht teilgenommen
        }
        var divident = STAT[pTurnier]._TEILNEHMER - STAT[pTurnier][pSpieler][0];
        var divisor = STAT[pTurnier]._TEILNEHMER - 1;
        var ret = Math.round(200 * Math.pow((divident / divisor), 3));
        if (ret) {
            return ret;
        } else {
            return '-';
        }
    } else if (stCup >= 50 && stCup <= 60 && stCup !== 55 || stCup === 125 || stCup === 181) { // 125 wurde als Testcup verwendet!
        if (STAT[pTurnier][pSpieler]) {
            if (typeof STAT[pTurnier][pSpieler][0] === "number") { // Fixpunkte
                if (STAT[pTurnier][pSpieler][0] <= 50) {
                    return tFIXPUNKTE[STAT[pTurnier][pSpieler][0]];
                } else {
                    if (STAT[pTurnier]._NAME.toUpperCase().indexOf('FINAL') >= 0
                            && (stCup === 54 && stSaison <= '2018/19'
                                    || stCup === 125 && stSaison <= '2018/19'
                                    || stCup === 56 && stSaison <= '2018/19')) {
                        return (STAT[pTurnier][pSpieler][0] - 50) * -1;
                    } else {
                        return '-';
                    }
                }
            }
        } else {
            if (STAT[pTurnier]._NAME.toUpperCase().indexOf('FINAL') >= 0
                    && (stCup === 54 && stSaison <= '2018/19'
                            || stCup === 125 && stSaison <= '2018/19'
                            || stCup === 56 && stSaison <= '2018/19')) {
                return stFinalTeilnehmer * -1 + 49;
            } else {
                return '-';
            }
        }
    }

    if (!STAT[pTurnier][pSpieler]) {
        return '-'; // Spieler hat am Finale nicht teilgenommen
    }
    var hPunkte = STAT[pTurnier][pSpieler][4]; // Meine Cuppunkte
    if (hPunkte <= 0) {
        return '-';
    } else if (hPunkte >= 300) {
        return 200;
    } else if (hPunkte > 100) {
        return parseInt((hPunkte - 100) / 2) + 100;
    } else {
        return hPunkte;
    }
}

function getVeranstalter(pNR) {
    if (pNR.length === 4) {
        return getSpielerName(pNR, true);
    } else {
        return pNR;
    }
}

function getSpielerName(pNR, pOhneSterne) {
    if (isNaN(pNR)) {
        if (pNR) {
            return pNR.substr(0, pNR.lastIndexOf('ˆ')).replace(/%20|_|ˆ/g, ' ');
        } else {
            return pNR;
        }
    } else {
        if (SPIELER[pNR]) {
            var ret = SPIELER[pNR][0] + ' ' + SPIELER[pNR][1];
            if (SP[pNR] && SP[pNR][0][sp0Cupsiege] && !pOhneSterne) {
                if (stCup !== 56 || window.location.href.toUpperCase().indexOf('OOV') < 0) { // OOV = Out Of Vienna
                    var nTimes = SP[pNR][0][sp0Cupsiege];
                    ret += ' ';
                    while (nTimes > 0) {
                        ret += '*';
                        nTimes--;
                    }
                }
            }
            return ret;
        } else {
            return pNR + ' (neu)';
        }
    }
}

function getName(pNR, pMax) {

    if (typeof pMax === "undefined") {
        pMax = 99;
    }
    var ret = '';
    if (isNaN(pNR)) {
        ret = pNR.substr(0, pNR.lastIndexOf('ˆ')).replace(/%20|_|ˆ/g, ' ');
    } else {
        if (SPIELER[pNR]) {
            ret = SPIELER[pNR][0] + ' ' + SPIELER[pNR][1];
        } else {
            ret = pNR + ' (neu)';
        }
    }

    if (pMax) {
        if (pMax >= 99) {
            if (QUERFORMAT) {
                if (ret.length > 22) {
                    if (ret.charAt(21) === ' ' || ret.charAt(22) === ' ') {
                        ret = ret.substr(0, 22);
                    } else {
                        ret = ret.substr(0, 22) + '.';
                    }
                }
            }
            if (SP[pNR] && SP[pNR][0][sp0Cupsiege]) {
                if (stCup !== 56 || window.location.href.toUpperCase().indexOf('OOV') < 0) { // OOV = Out Of Vienna
                    var nTimes = SP[pNR][0][sp0Cupsiege];
                    ret += ' ';
                    while (nTimes > 0) {
                        ret += '*';
                        nTimes--;
                    }
                }
            }
            return ret;
        }
    } else if (QUERFORMAT()) { // 22 = Himmelfreundpointner R.
        if (ret.length > 22) {
            if (ret.charAt(21) === ' ' || ret.charAt(22) === ' ') {
                ret = ret.substr(0, 22);
            } else {
                ret = ret.substr(0, 22) + '.';
            }
        }
        if (SP[pNR] && SP[pNR][0][sp0Cupsiege]) {
            if (stCup !== 56 || window.location.href.toUpperCase().indexOf('OOV') < 0) { // OOV = Out Of Vienna
                var nTimes = SP[pNR][0][sp0Cupsiege];
                ret += ' ';
                while (nTimes > 0) {
                    ret += '*';
                    nTimes--;
                }
            }
        }
        return ret;
    }

    var hNamenLen = stNamenLen;
    if ($(window).width() > 360) {
        hNamenLen = stNamenLen + ((($(window).width()) - 360) * 0.003 * stNamenLen);
    }
    l = 0;
    len = 0;
    for (var ii = 0; ii < ret.length; ii++) {

        switch (ret[ii]) {
            case ' ':
            case '.':
            case ',':
            case 'i':
            case 'j':
            case 'l':
                f = 70;
                break;
            case 'I':
            case '*':
                f = 62;
                break;
            case 't':
                f = 52;
                break;
            case 'f':
            case 'r':
                f = 51;
                break;
            case 'c':
            case 'k':
            case 's':
            case 'v':
            case 'x':
            case 'y':
            case 'z':
                f = 38;
                break;
            case 'e':
                f = 36;
                break;
            case 'a':
                f = 35;
                break;
            case 'b':
            case 'd':
            case 'g':
            case 'h':
            case 'n':
            case 'o':
            case 'p':
            case 'q':
            case 'u':
            case 'ä':
            case 'ü':
            case 'ö':
                f = 34;
                break;
            case 'w':
                f = 27;
                break;
            case 'm':
                f = 23;
                break;
            case 'J':
                f = 38;
                break;
            case 'L':
                f = 34;
                break;
            case 'F':
            case 'T':
            case 'Z':
                f = 31;
                break;
            case 'A':
            case 'Ä':
            case 'B':
            case 'E':
            case 'P':
            case 'S':
            case 'K':
            case 'V':
            case 'X':
            case 'Y':
                f = 29;
                break;
            case 'C':
            case 'D':
            case 'H':
            case 'N':
            case 'R':
            case 'U':
            case 'Ü':
                f = 26;
                break;
            case 'G':
            case 'O':
            case 'Ö':
            case 'Q':
                f = 25;
                break;
            case 'M':
                f = 23;
                break;
            case 'W':
                f = 20;
                break;
            default:
                f = 30;
        }

        l = l + (1 / f);
        if (hNamenLen > l) {
            len = ii;
        }
    }
    if (ret.indexOf('uml;') > 0 && ret.indexOf('uml;') < len) {
        return ret.substring(0, len + 6);
    } else {
        return ret.substring(0, len + 1);
    }
}

function listeDrucken() {
    'use strict';
    if (!window.chrome) {
        showEineMeldung('Achtung', 'Die Druckfunktion wird von deinem<br>Browser nicht ausreichend unterstützt.'
                + '<br>Verwende einen der folgenden Browser:'
                + '<br><b>Google Chrome</b>, <b>Opera</b>, <b>Vivaldi</b>'
                + '<br>oder einen anderen kompatiblen Browser.');
        return;
    }
    window.scrollTo(0, 0);
    if (stCup !== 54 && stCup !== 56 && stCup !== 4) {
        $("#iHeaderIcon").attr("src", "../Icons/icon-64.png");
    }
    $('#tStand').css('position', 'absolute');
    $('#qfHeader').attr('style', 'position: absolute; top: 0; width: 100%; padding:0; margin:0; background:#ffffff');
    $('#qfHeaderLinks').attr('style', 'width:12%;text-align:center;');
    $('#qfHeaderRechts').attr('style', 'width:88%');
    $('#qfHeaderZeile1').attr('style', 'margin:-4pt 0;font-size:32px;white-space:nowrap;font-style:italic;');
    $('#qfHeaderZeile2').attr('style', 'margin:-6pt 0;font-size:30px;white-space:nowrap;font-weight:normal;');
    $('#qfHeaderIcon').css('height', 63).show();
    javascript:window.print();
}

function showIcons(pIcons) {
    'use strict';
    $('#iHideDetails,#iShowDetails,#iScrollToMe,#iDownload,#iPrint,#iEdit,#iPortrait,#iLandscape,#iFotos,#iChronik').hide();
    if (QUERFORMAT()) {
        if (pIcons.length) {
            if (!PC) {
                for (var i = pIcons.length - 1; i >= 0; i--) {
                    if (pIcons[i] === '#iPrint' || pIcons[i] === '#iDownload') {
                        pIcons.splice(i, 1);
                    }
                }
            }
            for (var i = 0; i < pIcons.length; i++) {
                $(pIcons[i]).attr('style', 'position: fixed; top: 2px; right: ' + (0.5 + (3.7 * i)) + 'vw; font-size: 3.1vw; cursor: pointer;').show();
            }
            $('#qfHeader').attr('style', 'position: fixed; top: 0;  width: 72%; padding:0; margin:0; background:#f5f5f5;');
        } else {
            $('#qfHeader').attr('style', 'position: fixed; top: 0;  width: 72%; padding:0; margin:0; background:#f5f5f5; z-index: 999999');
        }
    } else {
        if (pIcons.length) {
            $(pIcons[0]).attr('style', 'position: fixed; top: ' + ($("#hfHeader").offset().top + 7) + 'px; right: 8px; font-size: 34px; cursor: pointer;').show();
        }
    }
}

function writeCanvas(pTitel) {
    var hTitel = CUPS.NAME[stCup];
    if (stCup === 53) {
        $(".hfHeaderIcon,#qfHeaderIcon").attr("src", "../Icons/i53" + (stFilter.replace(/Ü/g, 'UE')) + ".png");
        if (stFilter) {
            if (stFilter === 'BBTC') {
                hTitel = 'Baumgartner Bier Tarockcup';
            } else {
                hTitel = 'Sauwald Sküs';
            }
        } else {
            hTitel = 'Sauwald Tarockcup';
        }
    }
    $('#tStand').hide();
    $('.hfHeaderZeile1,#qfHeaderZeile1').html(hTitel.replace(/ |_/g, '&nbsp;'));
    if (stCup === 55 && pTitel === 'Vivat Valat!' && false) {
        $('.hfHeaderZeile2,#qfHeaderZeile2').html('<div class="cBlau P" onclick="window.open(\'http://www.tarock.tirol\')">www.tarock.tirol</div>');
    } else {
        $('.hfHeaderZeile2,#qfHeaderZeile2').html(pTitel.replace(/ |_/g, '&nbsp;'));
    }
    if (PC) {
        $('#qfHeaderZeile1').attr("style", "margin:-1pt 0;font-size:23pt;white-space:nowrap;font-family:Arial;font-style:italic;");
        $('#qfHeaderZeile2').attr("style", "margin:-5pt 0;font-size:21pt;white-space:nowrap;font-family:Arial;font-weight:normal;");
    }
    $('#qfHeaderIcon').css('height', $('#qfHeaderZeile1').height() * 1.6).show();
    // 51 H Hausruckcup
    // 52 R Raiffeisencup
    // 53 S Sauwaldcup
    // 54 G St. Tarockcup
    // 55 T Tiroler Tarockcup
    // 56 W Wr. Tarockcup
    // 15 A Stadl Tarock

    if (PC) {
        if (stCup === 51) {
            document.title = 'HRC - ' + pTitel.replace('  ', ' ').replace('/', '-');
        } else if (stCup === 52) {
            document.title = 'RTC - ' + pTitel.replace('  ', ' ').replace('/', '-');
        } else if (stCup === 53) {
            document.title = 'SWC - ' + pTitel.replace('  ', ' ').replace('/', '-');
        } else if (stCup === 54) {
            document.title = 'STC - ' + pTitel.replace('  ', ' ').replace('/', '-');
        } else if (stCup === 55) {
            document.title = 'TTC - ' + pTitel.replace('  ', ' ').replace('/', '-');
        } else if (stCup === 56) {
            document.title = 'WTC - ' + pTitel.replace('  ', ' ').replace('/', '-');
        } else if (stCup === 56) {
            document.title = 'WTC - ' + pTitel.replace('  ', ' ').replace('/', '-');
        } else if (stCup === 15) {
            document.title = 'STA - ' + pTitel.replace('  ', ' ').replace('/', '-');
        } else if (stCup === 17) {
            document.title = 'UTC - ' + pTitel.replace('  ', ' ').replace('/', '-');
        } else {
            document.title = CUPS.NAME[stCup] + ' - ' + pTitel.replace('  ', ' ').replace('/', '-');
        }
    }
}

function setStMaxFont() {
    var elem = document.createElement('div');
    elem.style.width = '1in';
    document.body.appendChild(elem);
    stFontMax = 5.5 - parseInt($(window).innerWidth() / elem.offsetWidth * 2.3) / 10;
    document.body.removeChild(elem);
}

function setFont(pFont, pStickyHeader) {
    'use strict';
    if (pStickyHeader) {
        stStickyHeader = true;
    } else {
        stStickyHeader = false;
    }
    if (QUERFORMAT()) {
        setTimeout(function () {
            $('.QUER').show();
        }, 200);
    } else {
        if (jbArchiv && jbArchiv.isOpen) {
            jbArchiv.close();
        }
    }
    if ($('#mTable').length) { // if exists
        if (QUERFORMAT()) {
            if ($(window).innerWidth() < 1360) {        // Mein 15 Zoll Laptop: 1344
                $('#mTable').css('font-size', '1.5vw');
            } else if ($(window).innerWidth() < 1560) { // Mein 28 Zöller: 1536
                $('#mTable').css('font-size', '1.4vw');
            } else {
                $('#mTable').css('font-size', '1.16vw'); // 4K, etc.
            }
        } else {
            setStMaxFont();
            if (pFont) {
                stFont = pFont;
            } else {
                stFont = 4.2;
            }
            stFontPlus = 0;
            if (stFont > stFontMax) {
                stFont = stFontMax;
            }
            $('#mTable').css('font-size', stFont + 'vw').show(optFont);
        }
    }
}

function optFont() {
    'use strict';
    setTimeout(function () {
        var pWidth = $(window).innerWidth();
        var tWidth = $('#mTable').width();
        if (tWidth === pWidth) {
            if (PC) {
                stFont -= 0.3;
                $('#mTable').css('font-size', stFont + 'vw');
            }
            if (stStickyHeader) {
                $("#mTable").stickyTableHeaders({scrollableArea: $("#dContent" + (CUPS.TYP[stCup] === "MT" ? "MT" : ""))[0], "fixedOffset": 0.01});
            }
            return;
        } else if (tWidth < pWidth) {
            if (stFontPlus === 0) {
                stFontPlus = 0.1;
                stFont += stFontPlus;
                $('#mTable').css('font-size', stFont + 'vw').show(optFont);
                return;
            } else if (stFontPlus === 0.1) {
                if (stFont < stFontMax) {
                    stFont += stFontPlus;
                    $('#mTable').css('font-size', stFont + 'vw').show(optFont);
                } else {
                    if (stStickyHeader) {
                        $("#mTable").stickyTableHeaders({scrollableArea: $("#dContent" + (CUPS.TYP[stCup] === "MT" ? "MT" : ""))[0], "fixedOffset": 0.01});
                    }
                }
                return;
            } else {
                stFont += 0.05;
                if (PC) {
                    stFont -= 0.3;
                }
                $('#mTable').css('font-size', stFont + 'vw');
                if (stStickyHeader) {
                    $("#mTable").stickyTableHeaders({scrollableArea: $("#dContent" + (CUPS.TYP[stCup] === "MT" ? "MT" : ""))[0], "fixedOffset": 0.01});
                }
                return;
            }
        } else {
            if (stFontPlus === 0) {
                stFontPlus = -0.1;
                stFont += stFontPlus;
                $('#mTable').css('font-size', stFont + 'vw').show(optFont);
                return;
            } else if (stFontPlus === -0.1) {
                stFont += stFontPlus;
                $('#mTable').css('font-size', stFont + 'vw').show(optFont);
                return;
            } else {
                stFont -= 0.05;
                if (PC) {
                    stFont -= 0.3;
                }
                $('#mTable').css('font-size', stFont + 'vw');
                if (stStickyHeader) {
                    $("#mTable").stickyTableHeaders({scrollableArea: $("#dContent" + (CUPS.TYP[stCup] === "MT" ? "MT" : ""))[0], "fixedOffset": 0.01});
                }
                return;
            }
        }
    });
}