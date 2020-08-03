
/* global LS, Pfad, stSynchron, CUPS, STAT, stCup, PC, stNextTerminDat, stVollAb, stTurCupGes, imgStatistik, QUERFORMAT(), stStat, statDiagramm, stSort, imgSkuess, LOG, stFont, stAktiv */

function getStatMeldungen(pAnAbmelden, nAnmeldungen) {

    var ret = "";

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
    if (CUPS.TURNIER[stCup] && STAT.TURRUNDE > 0) {
        if (STAT.TURRUNDE === 1) {
            if (STAT.TURGESPIELT === 0) {
                ret += "&nbsp;<img src='" + Pfad + "Icons/OK.png'  width='24' height='24'><span class=M>&nbsp;<b>Turnier wurde gestartet.</b><br></span>";
            } else {
                ret += "&nbsp;<img src='" + Pfad + "Icons/Achtung.png'  width='24' height='24'><span class=M>&nbsp;<b>Runde 1 noch nicht beendet.</b><br></span>";
            }
        } else if (STAT.TURGESPIELT === 0) {
            ret += "&nbsp;<img src='" + Pfad + "Icons/OK.png'  width='24' height='24'><span class=M>&nbsp;<b>Runde " + STAT.TURRUNDE + " wird gespielt.</b><br></span>";
        } else if (STAT.TURSPIELER === STAT.TURGESPIELT) {
            ret += "&nbsp;<img src='" + Pfad + "Icons/Achtung.png'  width='24' height='24'><span class=M>&nbsp;<b>" + ((STAT.TURRUNDE === 3) ? "Turnier" : "Runde " + STAT.TURRUNDE) + " noch nicht beendet.</b><br></span>";
        } else {
            var hText;
            if (STAT.TURSPIELER - STAT.TURGESPIELT < 8) {
                hText = "Ein Tisch ausständig.";
            } else {
                hText = parseInt((STAT.TURSPIELER - STAT.TURGESPIELT) / 4) + " Tische ausst&auml;ndig.";
            }
            ret += "&nbsp;<img src='" + Pfad + "Icons/Achtung.png'  width='24' height='24'><span class=M>&nbsp;<b>Runde " + STAT.TURRUNDE + ":&nbsp;&nbsp;&nbsp;" + hText + "</b><br></span>";
        }
    } else if (CUPS.ANMELDERF[stCup]) {
        ret += '<div class="noprint" ' + (pAnAbmelden ? '' : 'onclick="statShow(10,null,null,null,-1);"') + '>';
        var hAnAbmelden = '';
        var sDate = new Date(CUPS.TIMESTAMP);
        var hDate = new Date();
        if (new Date('2016-01-11T18:02:22.210Z').getHours() !== 19) {
            hAnAbmelden = "<br>&nbsp;<img src='../Icons/Fehler.png' width='24' height='24'><span class='cRot M'>"
                    + "&nbsp;Die Zeitzone ist ungleich Wien.<br>"
                    + '&nbsp;<b>An- und abmelden ist nicht möglich.</b></span>';
        } else if (sDate.getFullYear() > hDate.getFullYear() || sDate.getTime() > hDate.getTime() + 60000 * 60) {  // + 60 Minuten Toleranz
            hAnAbmelden = "<br>&nbsp;<img src='../Icons/Fehler.png' width='24' height='24'><span class='cRot M'>"
                    + '&nbsp;Das Systemdatum ist nicht aktuell.<br>'
                    + '&nbsp;<b>An- und abmelden ist nicht möglich.</b></span>';
        } else if (sDate.getFullYear() < hDate.getFullYear()) {
            hAnAbmelden = "<br>&nbsp;<img src='../Icons/Fehler.png' width='24' height='24'><span class='cRot M'>"
                    + '&nbsp;Das System wurde für ' + hDate.getFullYear() + '<br>'
                    + '&nbsp;noch nicht freigegeben.<br>'
                    + '&nbsp;Informiere einen Administrator.<br>'
                    + '&nbsp;<b>An- und abmelden ist nicht möglich.</b></span>';
        } else {
            if (STAT.TEILNEHMER && pAnAbmelden) {
                if (STAT.ANMELDUNGEN && STAT.ANMELDUNGEN[LS.ME] && Date.now() < STAT.ANMELDUNGEN[LS.ME].FUER && STAT.ANMELDUNGEN[LS.ME].ANGEMELDET && (STAT.ANMELDUNGEN[LS.ME].ANGEMELDET === true || STAT.ANMELDUNGEN[LS.ME].ANGEMELDET === 'J')) {
                    hAnAbmelden = '&nbsp;&nbsp;<button id=bAnAbmelden class="ui-btn ui-btn-e ui-btn-inline ui-corner-all' + (stSynchron ? "" : " ui-disabled M2") + '" onclick="loadSTAT(stCup, \'Du wirst abgemeldet!\', false, AbmeldenExe);">&nbsp;Abmelden&nbsp;</button><br>';
                } else {
                    hAnAbmelden = '&nbsp;&nbsp;<button id=bAnAbmelden class="ui-btn ui-btn-e ui-btn-inline ui-corner-all' + (stSynchron ? "" : " ui-disabled") + '" onclick="loadSTAT(stCup, \'Du wirst angemeldet!\', false, AnmeldenExe);">&nbsp;Anmelden&nbsp;</button><br>';
                }
                if (STAT.ANMELDUNGEN && STAT.ANMELDUNGEN[LS.ME] && Date.now() < STAT.ANMELDUNGEN[LS.ME].FUER && STAT.ANMELDUNGEN[LS.ME].NACHRICHT) {
                    hAnAbmelden += '&nbsp;&nbsp;<button id=bNachricht  class="ui-btn ui-btn-e ui-btn-inline ui-corner-all' + (stSynchron ? "" : " ui-disabled M2") + '" onclick="jbNachricht.open();$(\'#iNachricht\').val(STAT.ANMELDUNGEN[LS.ME].NACHRICHT).focus();">&nbsp;Nachricht ändern&nbsp;</button>';
                } else {
                    hAnAbmelden += '&nbsp;&nbsp;<button id=bNachricht  class="ui-btn ui-btn-e ui-btn-inline ui-corner-all' + (stSynchron ? "" : " ui-disabled M2") + '" onclick="jbNachricht.open();$(\'#iNachricht\').focus();">&nbsp;Nachricht schreiben&nbsp;</button>';
                }
            } else {
                hAnAbmelden = '<br>';
            }
        }
        if (STAT.ANMELDUNGEN) {
            var nAnmeldungen = 0;
            for (var anmeldung in STAT.ANMELDUNGEN) {
                if (STAT.ANMELDUNGEN[anmeldung].ANGEMELDET && (STAT.ANMELDUNGEN[anmeldung].ANGEMELDET === true || STAT.ANMELDUNGEN[anmeldung].ANGEMELDET === 'J') && new Date().valueOf() <= STAT.ANMELDUNGEN[anmeldung].FUER) {
                    nAnmeldungen++;
                }
            }
            if (nAnmeldungen <= 0) {
                ret += "&nbsp;<img src='" + Pfad + "Icons/Fehler.png'  width='24' height='24'><span class=M>&nbsp;<b>Keine Anmeldungen für " + stNextTerminDat + ".&nbsp;&nbsp;</b><br></span>";
            } else if (nAnmeldungen === 1) {
                ret += "&nbsp;<img src='" + Pfad + "Icons/Fehler.png' width='24' height='24'><span class=M>&nbsp;<b>Eine Anmeldung f&uuml;r " + stNextTerminDat + ".</b><br></span>";
            } else if (nAnmeldungen < 4 || nAnmeldungen === 7) {
                ret += "&nbsp;<img src='" + Pfad + "Icons/Fehler.png' width='24' height='24'><span class=M>&nbsp;<b>" + nAnmeldungen + " Anmeldungen für " + stNextTerminDat + ".</b><br></span>";
            } else if (nAnmeldungen === 6 || nAnmeldungen === 11) {
                ret += "&nbsp;<img src='" + Pfad + "Icons/Achtung.png' width='24' height='24'><span class=M>&nbsp;<b>" + nAnmeldungen + " Anmeldungen für " + stNextTerminDat + ".</b><br></span>";
            } else {
                ret += "&nbsp;<img src='" + Pfad + "Icons/OK.png' width='24' height='24'><span class=M>&nbsp;<b>" + nAnmeldungen + " Anmeldungen für " + stNextTerminDat + ".</b><br></span>";
            }
        } else {
            ret += "&nbsp;<img src='" + Pfad + "Icons/Fehler.png'  width='24' height='24'><span class=M>&nbsp;<b>Keine Anmeldungen für " + stNextTerminDat + ".&nbsp;&nbsp;</b><br></span>";
        }
        if (LS.ME !== 'NOBODY') {
            var hAnmeldung = "";
            if (pAnAbmelden) {
                hAnmeldung = "&nbsp;<img src='" + Pfad + "Icons/Achtung.png' width='24' height='24'><span class=M>&nbsp;<b>Nicht angemeldet:&nbsp;&nbsp;</b></span>";
            } else {
                hAnmeldung = "&nbsp;<img src='" + Pfad + "Icons/Achtung.png' width='24' height='24'><span class=M>&nbsp;<b>Ich bin nicht angemeldet:&nbsp;&nbsp;</b></span>";
            }
            if (STAT.ANMELDUNGEN && STAT.ANMELDUNGEN[LS.ME]) {
                if (Date.now() < STAT.ANMELDUNGEN[LS.ME].FUER) {
                    if (pAnAbmelden) {
                        hAnmeldung = "&nbsp;<img src='" + Pfad + "Icons/OK.png'  width='24' height='24'><span class=M>&nbsp;<b>Angemeldet.</b></span>";
                    } else {
                        hAnmeldung = "&nbsp;<img src='" + Pfad + "Icons/OK.png'  width='24' height='24'><span class=M>&nbsp;<b>Ich bin angemeldet.</b></span>";
                    }
                }
            }
            ret += hAnmeldung + hAnAbmelden;
        } else {
            if (pAnAbmelden) {
                ret += "&nbsp;<img src='" + Pfad + "Icons/Achtung.png' width='24' height='24'><span class=M>&nbsp;Um dich anmelden zu k&ouml;nnen musst du dich zuerst </span>"
                        + '&nbsp;&nbsp;<button class="ui-btn ui-btn-e ui-btn-inline ui-corner-all" onclick="window.location.href=\'Registrieren.html\';">&nbsp;registrieren&nbsp;</button><b>.</b><br>';
            }
        }
        ret += '</div>';
    }
    return ret;
}

function getNextTermin(pCup) {

    var hHeute = new Date();
    hHeute.setHours(22); // 22 wegen der Sommenrzeit
    hHeute.setMinutes(59);
    hHeute.setSeconds(59);
    hHeute.setMilliseconds(999);
    hHeute = hHeute.valueOf();

    var hZuletzt = new Date(0); // Keine Anmeldung wenn Turnier schon eröffnet
    if (typeof CUPS.MEZULETZT[pCup] === 'number') {
        hZuletzt = new Date(CUPS.MEZULETZT[pCup]);
    }
    hZuletzt.setHours(22); // 22 wegen der Sommenrzeit
    hZuletzt.setMinutes(59);
    hZuletzt.setSeconds(59);
    hZuletzt.setMilliseconds(999);
    hZuletzt = hZuletzt.valueOf();

    if (CUPS.NEXTTERMIN[pCup] >= hHeute
            && CUPS.NEXTTERMIN[pCup] > hZuletzt) {
        return CUPS.NEXTTERMIN[pCup];
    }

    var nextTermin = hHeute;
    if (hHeute === hZuletzt) {
        nextTermin += 86400000;
    }

    var iWoche = 0;
    var iWochentag = 0;

    for (var ii = 1; ii < 999999; ii++) {
        datNextTermin = new Date(nextTermin);
        iWoche = parseInt((datNextTermin.getDate() - 1) / 7);
        iWochentag = datNextTermin.getDay();
        if ((CUPS.WOCHEN[pCup] === '-----' || CUPS.WOCHEN[pCup][iWoche] === 'J')
                && (CUPS.SPIELTAGE[pCup] === '-------' || CUPS.SPIELTAGE[pCup][iWochentag] === 'J')) {
            break;
        }
        nextTermin += 86400000;
    }
    return nextTermin;
}

function getCupPunkte(i, pTurCupGes) {
    if (typeof pTurCupGes !== 'number') {
        pTurCupGes = stTurCupGes;
    }

    var ret = STAT.S[i].PUNKTE[pTurCupGes] * 60 / STAT.S[i].SPIELE[pTurCupGes];
    if (STAT.S[i].SPIELE[pTurCupGes] < (STAT.MAXSPIELE[pTurCupGes] * stVollAb / 100)) {
        if (STAT.S[i].PUNKTE[pTurCupGes] >= 0) {
            var hAbzuege = stVollAb - (STAT.S[i].SPIELE[pTurCupGes] / (STAT.MAXSPIELE[pTurCupGes] / 100));
            if (hAbzuege < 50) {
                ret = ret / 100 * (100 - hAbzuege - hAbzuege);
            } else {
                ret = 0;
            }
        }
    }
    return ret;
}

function writeCanvas(pTitel, pFName) {
    var canvas = document.getElementById("stHead");
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(imgStatistik, 3, 4);
    context.fillStyle = "#111111";
    if (QUERFORMAT()) {
        context.font = 'italic bold 24pt sans-serif';
        context.fillText(CUPS.NAME[stCup], 77, 31);
        context.font = '22pt sans-serif';
        context.fillText(pTitel, 77, 60);
    } else {
        context.font = 'italic bold 24pt sans-serif-condensed';
        context.fillText(CUPS.NAME[stCup], 77, 31);
        context.font = '22pt sans-serif-condensed';
        context.fillText(pTitel, 77, 60);
    }

    if (PC) {
        if (pFName) {
            document.title = CUPS.NAME[stCup] + ' - ' + pFName;
        } else {
            document.title = CUPS.NAME[stCup] + ' - ' + pTitel;
        }
    }
}

function getZitatF(pClass) {
    var hZitat = getZitat();
    return "<br><br><br><br><div class='C " + pClass + " B cBlau'><i>" + hZitat[0] + "</i></div>"
            + "<br><div class='C " + pClass + "'>" + hZitat[1] + "</div>";
}

function setAnzSpalten(pSpalten) {
    $('#sortUndLayout').hide();
    if (stAktSpalten < pSpalten) {
        if (stAktSpalten === 1) {
            if (pSpalten === 2) {
                $('#SP2').html(getZitatF('L'));
            } else if (pSpalten === 3) {
                $('#SP2').html(getZitatF('M'));
                $('#SP3').html('');
            } else if (pSpalten === 4) {
                $('#SP2').html('');
                $('#SP3').html(getZitatF('S'));
                $('#SP4').html('');
            }
        } else if (stAktSpalten === 2) {
            if (pSpalten === 3) {
                $('#SP3').html(getZitatF('M'));
            } else if (pSpalten === 4) {
                $('#SP3').html(getZitatF('S'));
                $('#SP4').html('');
            }
        } else if (stAktSpalten === 3) {
            if (pSpalten === 4) {
                $('#SP4').html(getZitatF('S'));
            }
        }
    }

    stAktSpalten = stAnzSpalten = pSpalten;

    if (stAktSpalten === 1) {
        $('#SP2,#SP3,#SP4').html('').hide();
        if (stStat === 8) {
            $("#SP1").animate({width: '100%'}, 200, statDiagramm);
        } else {
            $("#SP1").animate({width: '100%'}, 200);
        }
    } else if (stAktSpalten === 2) {
        $('#SP3,#SP4').html('').hide();
        if (stStat === 8) {
            $("#SP1").animate({width: '60%'}, 200, statDiagramm);
        } else {
            $("#SP1").animate({width: '60%'}, 200);
        }
        $('#SP2').css('width', '40%').show();
    } else if (stAktSpalten === 3) {
        $('#SP4').html('').hide();
        if (stStat === 8) {
            $("#SP1").animate({width: '40%'}, 200, statDiagramm);
        } else {
            $("#SP1").animate({width: '40%'}, 200);
        }
        $('#SP2,#SP3').css('width', '30%').show();
    } else if (stAktSpalten === 4) {
        $("#SP1").animate({width: '28%'}, 200);
        $('#SP2,#SP3,#SP4').css('width', '24%').show();
    }
}

function compStNamenLen() {  // Mit Google Nexus 5 geprüft
    if (CUPS.TURNIER[stCup] !== 'Handy') {
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

    if (stStat > 2 && !QUERFORMAT()) {
        stNamenLen += 0.09;   // Die Staudingerliste braucht mehr Platz
    } else {
        stNamenLen += 0.04;
    }
    if ($(window).width() > 360) {
        stNamenLen = stNamenLen + ((($(window).width()) - 360) * 0.005 * stNamenLen);
    }
}

function getName(i, pMax) {
    if (STAT.S[i].NR === '0000') {
        return 'Summiert';
    }
    if (STAT.S[i].NR === '2778') {
        STAT.S[i].VNAME = 'Thomas';
        STAT.S[i].NNAME = 'Phan';
    }
    var ret = '';
    if (pMax) {
        if (pMax >= 99) {
            if (CUPS.SWNAME[stCup][0] === 'V') {
                ret = STAT.S[i].VNAME + ' ' + STAT.S[i].NNAME;
            } else {
                ret = STAT.S[i].NNAME + ' ' + STAT.S[i].VNAME;
            }
            if (typeof STAT.S[i].STERNE === 'string') {
                ret = ret + ' ' + STAT.S[i].STERNE;
            }
            return ret;
        }
    }
    var maxLength = 0;
    if (CUPS.NAME2LEN[stCup] > 0) {
        maxlength = CUPS.NAME2LEN[stCup];
    } else {
        maxlength = 100;
    }
    if (pMax) {
        maxlength = pMax;
    }

    if (CUPS.SWNAME[stCup] === 'V') {
        ret = STAT.S[i].VNAME;
    } else if (CUPS.SWNAME[stCup] === 'VN') {
        if (STAT.S[i].NNAME.length > maxlength) {
            ret = STAT.S[i].VNAME + ' ' + STAT.S[i].NNAME.substr(0, maxlength) + '.';
        } else {
            ret = STAT.S[i].VNAME + ' ' + STAT.S[i].NNAME;
        }
    } else {
        if (STAT.S[i].VNAME.length > maxlength) {
            ret = STAT.S[i].NNAME + ' ' + STAT.S[i].VNAME.substr(0, maxlength) + '.';
        } else {
            ret = STAT.S[i].NNAME + ' ' + STAT.S[i].VNAME;
        }
    }
    ret = ret.trim();
    if (typeof STAT.S[i].STERNE === 'string') {
        ret = ret + ' ' + STAT.S[i].STERNE;
    }
    if (QUERFORMAT() || stStat === 8) {
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

function getSkeyStockerl(pString) {
    var ret = 900000000000;

    ret -= (parseInt(pString.substr(0, (pString.indexOf('-')))) * 10000000); // erste Plätze

    pString = pString.substr(pString.indexOf('-') + 1);
    ret -= (parseInt(pString.substr(0, (pString.indexOf('-')))) * 100000);   // zweite Plätze

    pString = pString.substr(pString.indexOf('-') + 1);
    ret -= (parseInt(pString) * 1000);     // dritte Plätze

    return ret;
}

function getHilfeText() {
    var hKlicke = '';
    if (QUERFORMAT()) {
        hKlicke = 'klicke';
    } else {
        hKlicke = 'tippe';
    }
    return "<div id='hilfeText' style='margin:0.8em;padding:.0em' class=M hidden>"
            + "<b>Hilfe:</b>"
            + "<hr>"
            + "Willst du die Statistik einer anderen Runde, eines anderen Cups ausw&auml;hlen,"
            + "dann <b>" + hKlicke + " auf den Cup- Rundennamen</b> in der oberen H&auml;lfte des &Uuml;berschriftsbalken."
            + "<br>"
            + "<hr>"
            + "Willst du die Statistik mal nach einen anderen Kriterium sortiert habe oder willst du eine Spezialliste oder ein PDF erstellen,<br>"
            + "dann <b>" + hKlicke + " mal auf die untere H&auml;lfte des &Uuml;berschriftsbalken</b>."
            + "<br>"
            + "<br>"
            + "<b>Legende:</b>"
            + "<hr>"
            + "Das <b>D60-Punktesystem</b> basiert auf den durchschnittlich pro 60 Spielen erreichten Punkten.<br>"
            + "Wer beim Turnier weniger als " + CUPS.VOLLAB[stCup][3] + " %, im Cup weniger als " + CUPS.VOLLAB[stCup][1] + " %, in der Gesamtwertung weniger als " + CUPS.VOLLAB[stCup][0] + " % der maximalen gespielten Spiele gespielt hat, dem werden f&uuml;r jedes fehlende Prozent zwei Prozent von den Cuppunkten abgezogen.<br>"
            + "<hr>"
            + "<b>Ges - Gesamtpunkte</b>"
            + "<hr>"
            + "<b>D60 - Durchschnitt pro 60 Spiele</b>"
            + "<br>Die D60-Punkte errechnen sich aus den Gesamtpunkten durch die Anzahl der Spiele mal 60."
            + "<br>Da im Wiener Cup bei einem Turnier 60 Spiele gespielt werden, entsprechen die D60-Punkte den durchschnittlich pro regul&auml;ren Turnier erreichten Punkten"
            + "<hr>"
            + "<b>Cup - Cuppunkte</b>"
            + "<br>Bei Spielern die mindestens " + CUPS.VOLLAB[stCup][stTurCupGes] + " % der maximal gespielten "
            + "Spiele gespielt haben sind die Cuppunkte mit den D60-Punkten ident."
            + "<br>Beim Rest der Spieler werden f&uuml;r jedes fehlende Prozent zwei Prozent von den Cuppunkten abgezogen."
            + "<hr>"
            + "<b>Anz. Spiel - Anzahl der gespielten Spiele</b>"
            + "<hr>"
            + (stSort === 'STO'
                    ? "<b>Stockerl - Stockerlpl&auml;tze</b>"
                    + "<br>Jemand mit 1-4-7 hat ein Turnier gewonnen, 4 zweite und 7 dritte Pl&auml;tze erreicht."
                    + "<hr>"
                    : ""
                    )
            + (true || CUPS.TURNIER[stCup] === 'Handy' && stTurCupGes !== 3
                    ? ''
                    : "<a style='padding:.0em' data-role='button' data-icon='plus' data-iconpos='notext' data-inline='true'>Info</a><b> - vollst&auml;ndige Liste</b>"
                    + "<hr>"
                    + "<a style='padding:.0em' data-role='button' data-icon='minus' data-iconpos='notext' data-inline='true'>Info</a><b> - reduzierte Liste</b>"
                    + "<br>Gelegenheitsspieler welcher weniger als " + CUPS.DISPAB[stCup][stTurCupGes] + " % der maximal gespielten "
                    + "Spiele gespielt haben werden nicht angezeigt."
                    + "<hr>"
                    )
            + "</div>"
            ;
}

function getSortUndLayout() {
    'use strict';
    return  "<div id=sortUndLayout hidden>"
            + "<div class='ui-grid-a ui-responsive L'>"
            + "<div class='ui-block-a st-breakpoint'>"
            + (CUPS.TURNIER[stCup] === 'Handy' && STAT.TURRUNDE > 0 && stTurCupGes === 3
                    ? "<div class='L B'><br>&nbsp;Tischliste:</div>"
                    + "<div data-role=navbar>"
                    + "<ul>"
                    + "<li><a onclick='statShow(-1," + '"TIS1",false,1,3' + ");' class='" + (stSort === 'TIS1' ? 'ui-btn-active' : '') + (STAT.TURRUNDE >= 1 ? '' : ' ui-disabled') + "'>1. Runde</a></li>"
                    + "<li><a onclick='statShow(-1," + '"TIS2",false,2,3' + ");' class='" + (stSort === 'TIS2' ? 'ui-btn-active' : '') + (STAT.TURRUNDE >= 2 ? '' : ' ui-disabled') + "'>2. Runde</a></li>"
                    + "<li><a onclick='statShow(-1," + '"TIS3",false,3,3' + ");' class='" + (stSort === 'TIS3' ? 'ui-btn-active' : '') + (STAT.TURRUNDE === 3 ? '' : ' ui-disabled') + "'>3. Runde</a></li>"
                    + "</ul>"
                    + "</div>"
                    : "")
            + (CUPS.TURNIER[stCup] !== 'Handy' && STAT.TURRUNDE > 0
                    ? "<div class='L B'><br>&nbsp;Zum aktuellen Turnier:</div>"
                    + "<div data-role=navbar>"
                    + "<ul>"
                    + "<li><a onclick='statShow(9," + '"TZU",false,1,3' + ");' >Tischliste</a></li>"
                    + "</ul>"
                    + "</div>"
                    : "")
            + "<div class='L B'><br>&nbsp;Sortierung:</div>"
            + "<div data-role=navbar>"
            + "<ul>"
            + (CUPS.TURNIER[stCup]
                    ? "<li><a onclick='statShow(-1," + '"GES"' + ");'" + (stSort === 'GES' && stStat === -1 ? ' class=ui-btn-active' : '') + ">Standardliste</a></li>"
                    + "<li><a onclick='statShow( 1," + '"CUP"' + ");'" + (stSort === 'CUP' && stStat === 1 ? ' class=ui-btn-active' : '') + ">D60 gewichtet</a></li>"
                    : "<li><a onclick='statShow( 1," + '"CUP"' + ");'" + (stSort === 'CUP' ? ' class=ui-btn-active' : '') + ">Standardliste</a></li>"
                    )
            + "<li><a onclick='statShow(1," + '"D60"' + ");'" + (stSort === 'D60' ? ' class=ui-btn-active' : '') + ">D60-Punkte</a></li>"
            + "<li><a onclick='statShow(1," + '"GES"' + ");'" + (stSort === 'GES' && stStat === 1 ? ' class=ui-btn-active' : '') + ">Gesamtpunkte</a></li>"
            + "<li><a onclick='statShow(1," + '"ANZ"' + ");'" + (stSort === 'ANZ' ? ' class=ui-btn-active' : '') + ">Anzahl Spiele</a></li>"
            + "<li><a onclick='statShow(1," + '"NAM"' + ");'" + (stSort === 'NAM' ? ' class=ui-btn-active' : '') + ">Name</a></li>"
            + "<li hidden></li>"
            + "</ul>"
            + "</div>"
            + (stAktiv
                    ? "<div class='L B'><br>&nbsp;Speziallisten:</div>"
                    + "<div data-role=navbar>"
                    + "<ul>"
                    + (stCup === 8 || stCup === 9
                            ? "<li><a onclick='statQuoten(22," + '"STO"' + ");'" + (stSort === 'STO' ? ' class=ui-btn-active' : '') + ">Quoten</a></li>"
                            : "")
                    + (CUPS.TURNIER[stCup]
                            ? "<li><a onclick='statShow(2," + '"STO"' + ");'" + (stSort === 'STO' ? ' class=ui-btn-active' : '') + ">Stockerlliste</a></li>"
                            : "")
                    + "<li><a onclick='statShow(8," + '"DIA"' + ");'" + (stSort === 'DIA' ? ' class=ui-btn-active' : '') + ">Die Positiven</a></li>"
                    + (CUPS.TURNIER[stCup] === 'Handy'
                            ? "<li><a onclick='statShow(7," + '"3er"' + ");'" + (stSort === '3er' ? ' class=ui-btn-active' : '') + ">3er-Liste</a></li>"
                            + "<li><a onclick='statShow(3," + '"GEW-"' + ");'" + (stSort === 'GEW-' ? ' class=ui-btn-active' : '') + ">Gewinner</a></li>"
                            + "<li><a onclick='statShow(4," + '"GEW+"' + ");'" + (stSort === 'GEW+' ? ' class=ui-btn-active' : '') + ">Verlierer</a></li>"
                            + "<li><a onclick='statShow(5," + '"EIG-"' + ");'" + (stSort === 'EIG-' ? ' class=ui-btn-active' : '') + ">Vielspieler</a></li>"
                            + "<li><a onclick='statShow(6," + '"EIG+"' + ");'" + (stSort === 'EIG+' ? ' class=ui-btn-active' : '') + ">Wenigspieler</a></li>"
                            + "<li hidden></li>"
                            : "")
                    + "</ul>"
                    + "</div>"
                    : "")
            + "<br>"
            + "</div>"
            + "<div class='ui-block-b st-breakpoint'>"

            + (QUERFORMAT() && stAktiv
                    ? "<div class='L B'><br>&nbsp;Layout:</div>"
                    + "<div data-role=navbar>"
                    + "<ul>"
                    + "<li><a onclick='setAnzSpalten(1);'" + (stAnzSpalten === 1 ? ' class=ui-btn-active' : '') + ">1 Kolonne</a></li>"
                    + "<li><a onclick='setAnzSpalten(2);'" + (stAnzSpalten === 2 ? ' class=ui-btn-active' : '') + ">2 Kolonnen</a></li>"
                    + "<li><a onclick='setAnzSpalten(3);'" + (stAnzSpalten === 3 ? ' class=ui-btn-active' : '') + ">3 Kolonnen</a></li>"
                    + "<li hidden></li>"
                    + "<li hidden></li>"
                    + "<li hidden></li>"
                    + "</ul>"
                    + "</div><br>"
                    + "<a class='ui-btn ui-btn-d ui-corner-all' onclick='listeDrucken();'>Liste drucken</a>"
                    + (LS.ME === "3244" && PC
                            ? "<a class='ui-btn ui-btn-d ui-corner-all' onclick='downloadExcel();'>Das letzte Turnier downloaden</a>"
                            : '')
                    : '')
            + "<br>"
            + "</div>"
            + "</div>"
            + "</div>";
}

function listeDrucken() {
    'use strict';
    $('tr').removeClass('bBeige bBeige2');
    var canvas = document.getElementById("stHead");
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, 70, 70);
    context.drawImage(imgSkuess, 3, 4);
    $("#sortUndLayout").hide();
    $('html, body').scrollTop();
    setTimeout(function () {
        $('#mTable').css('font-size', '3vw');
        javascript:window.print();
    }, 500);
}

function tischStornieren(pVON) {
    'use strict';
    LS.I = stCup;
    LS.CupName = CUPS.NAME[stCup];
    LS.Regeln = CUPS.REGELN[stCup];
    LS.Spieltyp = CUPS.TYP[stCup];
    LS.SpieleJeRunde = CUPS.SPJERUNDE[stCup];
    LS.AnzSpieler = 0;
    LS.Pausierer1 = 0;
    LS.Pausierer2 = 0;
    LS.gespielt = 0;
    LS.AnzGespeichert = 0;
    LS.NR = ['', '', '', '', '', '', ''];
    LS.Spieler = ['', '', '', '', '', '', ''];
    LS.VName = ['', '', '', '', '', '', ''];
    LS.NName = ['', '', '', '', '', '', ''];
    LS.Ort = ['', '', '', '', '', '', ''];
    LS.Spiele = [0, 0, 0, 0, 0, 0, 0];
    LS.Von = new Date(pVON);
    LS.Bis = new Date();

    LS.Punkte = [0, 0, 0, 0, 0, 0, 0]; // nur wenn Storno
    LS.ANZSPIELE = [];
    LS.ANZGEWONNEN = [];
    LS.PKTGEWONNEN = [];

    var ii = 0;
    for (var i = 0; i < LOG.L.length; i++) {
        if (new Date(LOG.L[i].VON).getTime() === pVON) {
            ii++;
            LS.AnzSpieler++;
            LS.NR     [ii] = LOG.L[i].NR;
            LS.Spieler[ii] = LOG.L[i].VNAME + ' ' + LOG.L[i].NNAME;
            LS.VName  [ii] = LOG.L[i].VNAME;
            LS.NName  [ii] = LOG.L[i].NNAME;
            LS.Spiele [ii] = LOG.L[i].SPIELE * -1;
            LS.Bis = new Date(LOG.L[i].BIS);
            LS.gespielt = LS.gespielt + LOG.L[i].SPIELE;

            LS.Punkte [ii] = LOG.L[i].PUNKTE * -1;

            LS.ANZSPIELE  [ii] = [];
            LS.ANZGEWONNEN[ii] = [];
            LS.PKTGEWONNEN[ii] = [];

            LS.AktRunde = LOG.L[i].RUNDE;

            for (var y = 0; y <= 19; y++) {
                LS.ANZSPIELE  [ii][y] = LOG.L[i].ANZSPIELE  [y] * -1;
                LS.ANZGEWONNEN[ii][y] = LOG.L[i].ANZGEWONNEN[y] * -1;
                LS.PKTGEWONNEN[ii][y] = LOG.L[i].PKTGEWONNEN[y] * -1;
            }
        }
    }
    LS.gespielt = LS.gespielt / 4 * -1;

    localStorage.setItem('Abakus.LS', JSON.stringify(LS));
    window.location.href = 'TischSpeichern.html';
}

function setFont() {
    'use strict';
    function setStMaxFont() {
        var elem = document.createElement('div');
        elem.style.width = '1in';
        document.body.appendChild(elem);
        stFontMax = 5.5 - parseInt($(window).innerWidth() / elem.offsetWidth * 2.3) / 10;
        document.body.removeChild(elem);
    }
    setStMaxFont();
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
            stFont += 0.4;
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
        if (($('#L0P1').width()) === pWidth) {
            return;
        } else if (($('#L0P1').width()) < pWidth) {
            if (stFontPlus === 0) {
                stFontPlus = 0.1;
                stFont += stFontPlus;
                $('#mTable').css('font-size', stFont + 'vw').show(optFont);
                return;
            } else if (stFontPlus === 0.1) {
                if (stFont < stFontMax) {
                    stFont += stFontPlus;
                    $('#mTable').css('font-size', stFont + 'vw').show(optFont);
                }
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