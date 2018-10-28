
/* global stStat, stCup, QUERFORMAT(), LS, stFont, STAT, PC, stSynchron, CUPS, stNextTerminDat, SPIELER, tFIXPUNKTE, stSort, stTurCupGes, context, canvas, jbHome, jbArchiv */

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

    if (stCup === 58) {
        ret += "&nbsp;<img src='" + Pfad + "Icons/Fehler.png'  width='24' height='24'><span class=M>&nbsp;<b>Dies ist nicht die offizielle Turnierwertung.</b><br></span>";
        ret += "&nbsp;<img src='" + Pfad + "Icons/Achtung.png'  width='24' height='24'><span class=M>&nbsp;<b>Die offizielle Liste (nach Tischpunkten) kannst du bei Alexandra Sabkovski erfragen.</b><br></span>";
    }

    if (STAT._AKTTURNIER && STAT._AKTTURNIER._TURNIER === stStat && false) {
        if (STAT._AKTTURNIER._RUNDE) {
            var nMinSeitRundeStart = parseInt((Date.now() - STAT._AKTTURNIER._RUNDESTART) / 60000);
            if (STAT._AKTTURNIER._RUNDE <= 3) {
                if (nMinSeitRundeStart < 15) {
                    ret += "&nbsp;<img src='" + Pfad + "Icons/Achtung.png'  width='24' height='24'><span class=M>&nbsp;<b>Runde " + STAT._AKTTURNIER._RUNDE + " wurde begonnen.</b><br></span>";
                } else if (nMinSeitRundeStart < 60) {
                    ret += "&nbsp;<img src='" + Pfad + "Icons/Achtung.png'  width='24' height='24'><span class=M>&nbsp;<b>Runde " + STAT._AKTTURNIER._RUNDE + " wird gespielt.</b><br></span>";
                } else if (nMinSeitRundeStart < 90) {
                    ret += "&nbsp;<img src='" + Pfad + "Icons/Achtung.png'  width='24' height='24'><span class=M>&nbsp;<b>Runde " + STAT._AKTTURNIER._RUNDE + " wird noch gespielt.</b><br></span>";
                } else {
                    ret += "&nbsp;<img src='" + Pfad + "Icons/Achtung.png'  width='24' height='24'><span class=M>&nbsp;<b>Runde " + STAT._AKTTURNIER._RUNDE + " wurde noch nicht gespeichert.</b><br></span>";
                }
            } else {
                ret += "<div class=noprint>&nbsp;<img src='" + Pfad + "Icons/OK.png'  width='24' height='24'><span class=M>&nbsp;<b>Das Turnier wurde beendet.</b><br></span></div>";
                ret += "&nbsp;<img src='" + Pfad + "Icons/Achtung.png'  width='24' height='24'><span class=M>&nbsp;<b>Die Korrektheit der Daten wurde noch nicht best&auml;tigt.</b><br></span>";
                if (nMinSeitRundeStart < 15) {
                    var hZeit = new Date(STAT._AKTTURNIER._RUNDESTART + (60000 * 15)).toLocaleTimeString().substr(0, 5);
                    ret += "&nbsp;<img src='" + Pfad + "Icons/Achtung.png'  width='24' height='24'><span class=M>&nbsp;<b>Reklamationen werden bis " + hZeit + " angenommen.</b></span>";
                }
            }
        }
    }
    if (LS.Meldung) {
        ret = ret + "&nbsp;<img src='" + Pfad + "Icons/OK.png'  width='24' height='24'><span class=M>&nbsp;<b>" + LS.Meldung + "</b><br></span>";
        LS.Meldung = '';
        localStorage.setItem('Abakus.LS', JSON.stringify(LS));
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

    if (stCup < 58) {
        if (STAT[pTurnier][pSpieler]) {
            if (typeof STAT[pTurnier][pSpieler][0] === "number") { // Fixpunkte
                if (STAT[pTurnier][pSpieler][0] <= 50) {
                    return tFIXPUNKTE[STAT[pTurnier][pSpieler][0]];
                } else {
                    return '-';
                }
            }
        } else {
            return '-';
        }
    }

    var hPunkte = STAT[pTurnier][pSpieler][4]; // Meine Cuppunkte
    if (hPunkte < 0) {
        hPunkte = '-';
    } else if (hPunkte > 100) {
        hPunkte = parseInt((hPunkte - 100) / 2) + 100;
    }
    return hPunkte;
}

function compStNamenLen() {  // Mit Google Nexus 5 geprüft
    if (CUPS.TURNIER[stCup] === 'PC') {
        if (stSort === 'STO') {
            if (stTurCupGes === 3) {
                stNamenLen = 0.45; // OK
            } else {
                stNamenLen = 0.36; // OK
            }
        } else if (stSort === 'NAM') {
            stNamenLen = 0.37;  // ???
        } else if (stTurCupGes === 3) {
            stNamenLen = 0.44;  // OK+
        } else {
            stNamenLen = 0.32;  // OK
        }
    } else if (stStat === -1) {   // 1 = Standardliste
        if (CUPS.TURNIER[stCup] && stTurCupGes === 3) {
            stNamenLen = 0.36;   // Note 4 OK
        } else {
            stNamenLen = 0.26;   // Note 4 OK
        }
    } else if (stStat === 1) {   // 1 = Standardliste
        if (CUPS.TURNIER[stCup] && stTurCupGes === 3) {
            stNamenLen = 0.33;   // Nexus und Note 4 OK
        } else {
            stNamenLen = 0.37;   // Nexus und Note 4 OK
        }
    } else if (stStat === 2) {   // 2 = Stockerlliste
        if (stTurCupGes === 3) {
            stNamenLen = 0.41;   // OK
        } else {
            stNamenLen = 0.28;   // ????
        }
    } else if (stStat === 7) {   // / = 3er-Liste
        stNamenLen = 0.28;       // ????
    } else if (stStat > 2) {   // >2= Staudingerliste etc.
        stNamenLen = 0.26;       // doppelt geprüft
        if (CUPS.TURNIER[stCup] && stTurCupGes === 3) {
            stNamenLen = 0.31;   // ????
        } else {
            stNamenLen = 0.35;   // OK
        }
        stNamenLen = 0.20;       // doppelt geprüft
    } else {                     // ansonst
        stNamenLen = 0.38;
    }

    stNamenLen = stNamenLen - 0.03;
    if ($(window).width() > 360) {
        stNamenLen = stNamenLen + ((($(window).width()) - 360) * 0.005 * stNamenLen);
    }

    var hSchriftG = LS.SchriftG;
    if (stStat > 2 && !QUERFORMAT()) {
        hSchriftG--;   // Die Staudingerliste braucht mehr Platz
    }
    switch (hSchriftG) {
        case - 1: // sehr klein + Staudinger + !QUERFORMAT()
            stNamenLen = stNamenLen + 0.22;
            break;
        case 0: // sehr klein
            stNamenLen = stNamenLen + 0.15;
            break;
        case 1: // klein
            stNamenLen = stNamenLen + 0.09;
            break;
        case 2: // mittel
            stNamenLen = stNamenLen + 0.04;
            break;
        case 3: // groß
            stNamenLen = stNamenLen + 0;
            break;
        case 4: // sehr groß
            stNamenLen = stNamenLen - 0.03;
            break;
    }
}

function getSpielerName(pNR) {
    if (pNR === '0000') {
        return 'Pr&auml;sidium';
    } else if (isNaN(pNR)) {
        if (pNR) {
            return pNR.substr(0, pNR.lastIndexOf('ˆ')).replace(/%20|_|ˆ/g, ' ');
        } else {
            return pNR;
        }
    } else {
        if (SPIELER[pNR]) {
            return SPIELER[pNR][0] + ' ' + SPIELER[pNR][1];
        } else {
            return pNR + ' (neu)';
        }
    }
}

function getName(pNR, pMax) {

    var ret = '';
    if (isNaN(pNR)) {
        ret = pNR.substr(0, pNR.lastIndexOf('ˆ')).replace(/%20|_|ˆ/g, ' ');
    } else {
        if (SPIELER[pNR]) {
            ret = SPIELER[pNR][0] + ' ' + SPIELER[pNR][1];
        } else {
            ret = pNR + ' ?';
        }
    }

    if (pMax) {
        if (pMax >= 99) {
            return ret;
        }
    } else if (QUERFORMAT()) { // 22 = Himmelfreundpointner R.
        if (ret.length <= 22) {
            return ret;
        } else if (ret.charAt(21) === ' ' || ret.charAt(22) === ' ') {
            return ret.substr(0, 22);
        } else {
            return ret.substr(0, 22) + '.';
        }
    }

    if (QUERFORMAT()) {
        return ret;
    } else {
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
            if (stNamenLen > l) {
                len = ii;
            }
        }
        if (ret.indexOf('uml;') > 0 && ret.indexOf('uml;') < len) {
            return ret.substring(0, len + 6);
        } else {
            return ret.substring(0, len + 1);
        }
    }
}

function listeDrucken() {
    'use strict';
    if (stCup !== 54 && stCup !== 56 && stCup !== 4) {
        $("#iHeaderIcon").attr("src", "../Icons/icon-64.png");
    }
    if ($('#iFilter').length) {
        if ($('#iFilter').val()) {
            $('#dFilter').removeClass('noprint');
        } else {
            $('#dFilter').addClass('noprint');
        }
    }
    $('#dPrint').attr('style', 'width:100%');
    $('#tStand').css('position', 'absolute');
    $('#qfHeader').removeClass('fixHeader');
    $('#qfHeader').addClass('printHeader');
    $('#mTable').css('font-size', '2.4vw');

    $('tr').removeClass('bBeige bBeige2'); // Markierung entfernen
    $('.cSchwarz').removeClass('cSchwarz').addClass('cBlau');

    javascript:window.print();
}

function showIcons(pIcons) {
    'use strict';
    if (QUERFORMAT()) {
        $('#iDownload,#iPrint,#iAnekdote').hide();
        var i = 0;
        for (i = 0; i < pIcons.length; i++) {
            $(pIcons[i]).attr('style', 'position: fixed; top: 2px; right: ' + (25 + (50 * i)) + 'px; font-size: 44px; cursor: pointer;').show();
        }
    }
}

function writeCanvas(pTitel) {
    var hTitel = CUPS.NAME[stCup];
    if (QUERFORMAT()) {
        if (stCup === 54) {
            hTitel = 'Steirischer Tarockcup';
        } else if (stCup === 55) {
            hTitel = 'Tiroler Tarockcup';
        } else if (stCup === 56) {
            if (stCup === 56 && window.location.href.toUpperCase().indexOf('OOV') > 0) {
                hTitel = 'Wr. Tarockcup - out of Vienna';
            } else {
                hTitel = 'Wiener Zeitung Tarockcup';
            }
        }
    } else {
        if (stCup === 56 && window.location.href.toUpperCase().indexOf('OOV') > 0) {
            hTitel = 'Wr. Tarockcup - ooV';
        }
    }
    $('#tStand').hide();
    if (stCup >= 50 && stCup <= 59) {
        $("#hfHeaderIcon,#qfHeaderIcon").attr("src", "../Icons/i" + stCup + ".png");
    } else {
        $("#hfHeaderIcon,#qfHeaderIcon").attr("src", "../Icons/Farben.png");
    }
    $('#hfHeaderZeile1,#qfHeaderZeile1').html(hTitel.replace(/ |_/g, '&nbsp;'));
    $('#hfHeaderZeile2,#qfHeaderZeile2').html(pTitel.replace(/ |_/g, '&nbsp;'));

    if (PC) {
        if (stCup === 56 && QUERFORMAT()) {
            $('#qfHeaderZeile1').attr("style", "margin:-1pt 0;font-size:23pt;white-space:nowrap;font-family:'Times New Roman';");
        } else {
            $('#qfHeaderZeile1').attr("style", "margin:-1pt 0;font-size:23pt;white-space:nowrap;font-family:Arial;font-style:italic;");
        }
        $('#qfHeaderZeile2').attr("style", "margin:-5pt 0;font-size:21pt;white-space:nowrap;font-family:Arial;font-weight:normal;");
    }
    // 51 H Hausruckcup
    // 52 R Raiffeisencup
    // 53 S Sauwaldcup
    // 54 G St. Tarockcup
    // 55 T Tiroler Tarockcup
    // 56 W Wr. Tarockcup
    // 58 A Sommerstadl

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
        } else if (stCup === 58) {
            document.title = 'SST - ' + pTitel.replace('  ', ' ').replace('/', '-');
        } else if (stCup === 58) {
            document.title = 'UTC - ' + pTitel.replace('  ', ' ').replace('/', '-');
        } else {
            document.title = CUPS.NAME[stCup] + ' - ' + pTitel.replace('  ', ' ').replace('/', '-');
        }
    }
}

function setFont() {
    'use strict';
    if (QUERFORMAT()) {
        setTimeout(function () {
            $('.QUER').show();
        }, 200);
    } else {
        if (jbHome && jbHome.isOpen) {
            jbHome.close();
        }
        if (jbArchiv && jbArchiv.isOpen) {
            jbArchiv.close();
        }
    }
    $('#dOver').hide();

    if ($('#mTable').length) { // if exists
        stFont = 4.444;
        stFontPlus = 0;
        if (QUERFORMAT()) {
            if ($(window).innerWidth() < 1360) {        // Mein 15 Zoll Laptop: 1344
                $('#mTable').css('font-size', '1.5vw');
            } else if ($(window).innerWidth() < 1560) { // Mein 28 Zöller: 1536
                $('#mTable').css('font-size', '1.4vw');
            } else {
                $('#mTable').css('font-size', '1.16vw'); // 4K, etc.
            }
        } else {
            $('#mTable').css('font-size', stFont + 'vw').show(optFont);
        }
    }
}

function optFont() {
    'use strict';
    if (LS.ME === '34s25') {
        if (stFont === 4.444) {
            alert($('#L0P1').html()+',  '+$('#L0P1').width()+'px < ? ' + $(window).innerWidth() +'px.');
        }
        setTimeout(function () {
            var pWidth = $(window).innerWidth();
            if (stFontPlus === 0) {
                if (($('#L0P1').width()) < pWidth) {
                    stFontPlus = 0.5;
                    stFont -= 0.5; // Damit der Font beim Wechsel der List nicht größer wird.
                } else if (($('#L0P1').width()) > pWidth) {
                    stFontPlus = -0.5;
                } else {
                    return;
                }
            } else {
                if (stFontPlus > 0 && stFont >= LS.Font[3] + LS.SchriftG - 5
                        || stFontPlus < 0 && stFont <= 10) {
                    return;
                }
            }

            if ($('#L0P1').width() < pWidth && stFontPlus < 0
                    || $('#L0P1').width() > pWidth && stFontPlus > 0 && stFont > LS.Font[1] + LS.SchriftG - 5) {
                if ($('#L0P1').width() > pWidth) {
                    stFont -= 0.5;
                    $('#mTable').css('font-size', stFont + 'px');
                }
            } else {
                stFont += stFontPlus;
                $('#mTable').css('font-size', stFont + 'px').show(optFont);
            }
        });
    } else {
        setTimeout(function () {
            var pWidth = $(window).innerWidth();
            if (PC) {
                pWidth -= 12; // Scrollleiste abziehen
            }
            if (($('#L0P1').width()) === pWidth) {
                return;
            } else if (($('#L0P1').width()) < pWidth) {
                if (stFontPlus === 0) {
                    stFontPlus = 0.1;
                    stFont += stFontPlus;
                    $('#mTable').css('font-size', stFont + 'vw').show(optFont);
                    return;
                } else if (stFontPlus === 0.1) {
                    stFont += stFontPlus;
                    $('#mTable').css('font-size', stFont + 'vw').show(optFont);
                    return;
                } else {
                    stFont += -0.05;
                    $('#mTable').css('font-size', stFont + 'vw');
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
                    if (stFont <= 4.4) {
                        return;
                    }
                    $('#mTable').css('font-size', stFont + 'vw').show(optFont);
                    return;
                } else {
                    stFont += 0.05;
                    $('#mTable').css('font-size', stFont + 'vw');
                    return;
                }
            }
        });

    }
}