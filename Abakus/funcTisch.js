
/* global LS, CUPS, I, iPfad, hHeute, STAT, mTischTurnier, PC, QUERFORMAT() */

function TischNeuLoeschen() {
    if (mTischNeuLoeschen === "N") {
        TischNeu(true);
    } else {
        TischLoeschen(true);
    }
}

function TischNeu(pNeu) {
    'use strict';
    if (LS.I && LS.I !== I) {
        if (CUPS.TURNIER[I] === 'Handy'
                && (CUPS.BEREadmin[I].indexOf(LS.ME) >= 0 || I <= 3)
                && mTischTurnier === 'Turnier') {
            iStartStop(false); // der Admin will das Turnier starten
            return; // very important
        }
    }

    var iWochentag = (new Date()).getDay();
    var iVortag = iWochentag - 1;
    if (iWochentag === 0) {
        iVortag = 6;
    } else {
        iVortag = iWochentag - 1;
    }

    if ((CUPS.TYP[I] === 'CUP' || CUPS.TYP[I] === 'MT') && !QUERFORMAT()) {
        if (I > 4) {
            var hOK = false;
            for (var termin in CUPS.TERMINE) {
                if (CUPS.TERMINE[termin].CUP === I && CUPS.TERMINE[termin].DATUM === hHeute) {
                    hOK = true;
                    break;
                }
            }
            if (!hOK) {
                showEineMeldung(I, 'Laut Turnierkalender findet heute kein Turnier statt.');
                return;
            }
        }
    } else if (new Date(CUPS.NEXTTERMIN[I]).toDateString() === new Date().toDateString()) {
        if (new Date().getHours() >= CUPS.SPIELEAB[I] - 1) {
        } else {
            showEineMeldung(I, 'Es wird erst ab<br>' + CUPS.SPIELEAB[I] + ' Uhr gespielt.');
            return;
        }
    } else {
        if (CUPS.SPIELTAGE[I][iWochentag] === 'J'
                || CUPS.SPIELTAGE[I][iVortag] === 'J' && (new Date()).getHours() <= 6) {
            if (CUPS.TURNIER[I]) {
                var iWoche = parseInt((new Date().getDate() - 1) / 7);
                if (CUPS.WOCHEN[I][iWoche] !== 'J') {
                    var aWochentag = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
                    showEineMeldung(I, 'Diesen ' + aWochentag[iWochentag] + '<br>wird nicht gespielt.');
                    $(this).removeClass('ui-disabled');
                    return;
                }
            }
            if (CUPS.SPIELTAGE[I][iWochentag] === 'J' && (new Date()).getHours() >= CUPS.SPIELEAB[I] - 1
                    || CUPS.SPIELTAGE[I][iVortag] === 'J' && (new Date()).getHours() <= 6) {
            } else {
                showEineMeldung(I, 'Es wird erst ab<br>' + CUPS.SPIELEAB[I] + ' Uhr gespielt.');
                return;
            }
        } else {
            var aWochentag = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
            showEineMeldung(I, 'An einem ' + aWochentag[iWochentag] + '<br>wird nicht gespielt.');
            return;
        }
    }

    if (LS.I && LS.I !== I) {
        if (CUPS.TURNIER[LS.I]) {
            if (CUPS.TURNIER[LS.I] === 'Handy') {
                showEineMeldung(I, '&nbsp;Bitte&nbsp;zuerst&nbsp;das&nbsp;Turnier&nbsp;&nbsp;&nbsp;<br>'
                        + '&nbsp;<b>' + CUPS.NAME[LS.I] + '</b>&nbsp;beenden.');
                return;
            } else {
                var hNAME = '';
                for (var termin in CUPS.TERMINE) {
                    if (CUPS.TERMINE[termin].CUP === LS.I && CUPS.TERMINE[termin].DATUM === hHeute) {
                        hNAME = CUPS.TERMINE[termin].NAME;
                        break;
                    }
                }
                if (hNAME) {
                    showEineMeldung(I, '&nbsp;Bitte&nbsp;zuerst&nbsp;den&nbsp;Tisch&nbsp;des&nbsp;Turniers&nbsp;<br>'
                            + '&nbsp;<b>' + hNAME + '</b>&nbsp;speichern.');
                    return;
                }
            }
        }
    }

    if (pNeu || LS.gespielt < 1) {
//        LS.AnzGespeichert = 0;
//        LS.AnzSpieler = 0;
//        LS.gespielt = 0;
//        LS.Spieler = ['', '', '', '', '', '', ''];
//        LS.NR = ['', '', '', '', '', '', ''];
//        LS.VName = ['', '', '', '', '', '', ''];
//        LS.NName = ['', '', '', '', '', '', ''];
//        LS.Sterne = ['', '', '', '', '', '', ''];
//        LS.Ort = ['', '', '', '', '', '', ''];
//        LS.Spiele = [0, 0, 0, 0, 0, 0, 0];
//        if (LS.I !== I || !CUPS.TURNIER[LS.I]) {
//            LS.I = 0;
//        }
        if (CUPS.TURNIER[I] === 'PC' && QUERFORMAT() && (CUPS.BEREadmin[I].indexOf(LS.ME) >= 0 || I <= 3)) {
            if (I > 4 && (navigator.appName === 'Microsoft Internet Explorer'
                    || navigator.userAgent.match(/Trident/)
                    || navigator.userAgent.match(/MSIE /))) {
                showEineWarnung("HTML5 Object Fehler:",
                        "<b>ACHTUNG:</b> Der Internet Explorer wird seit<br>"
                        + "geraumer Zeit nicht mehr weiterentwickelt.<br>"
                        + "Benutze einen der folgenden Browser:<br>"
                        + "<b>Chrome</b>, <b>Firefox</b>, <b>Edge</b> oder <b>Opera</b>.");
                return;
            }

            LS.ShowCups = I;
            localStorage.setItem('Abakus.LS', JSON.stringify(LS));
            if (window.location.hash) {
                window.location.replace('_Turnier/TU_1_Anmeldung.html?init');
            } else {
                window.location.href = '_Turnier/TU_1_Anmeldung.html?init';
            }
        } else if (!CUPS.TURNIER[I] && (CUPS.TYP[I] === 'PR' || I === 1) && localStorage.getItem("Abakus.STAT" + ("000" + I).substr(-3))) {
            LS.LoadCups = I * -1; // - = neuer Tisch
            localStorage.setItem('Abakus.LS', JSON.stringify(LS));
            window.location.href = 'Abakus/Anmeldung.html';
        } else {
            if (CUPS.TYP[I] === "CUP" || CUPS.TYP[I] === "MT") {
                loadTURNIER(I, hHeute, 'Das Turnier wird geladen.', hHeute + ', neuer Tisch');
            } else {
//              if (CUPS.TURNIER[I] || (CUPS.BEREadmin[I].indexOf(LS.ME) < 0 && I > 3)) {
                if (CUPS.TURNIER[I]) {
                    loadSTAT(I, 'Spieler werden geladen.');
                } else {
                    loadSTAT(I, 'Spieler werden aktualisiert.', I);
                }
            }
        }
    } else {
        mTischNeuLoeschen = "N";
        if (LS.I !== I) {
            $("#tsTitel").html(CUPS.NAME[LS.I] + ':').show();
            $('#tsText').html('<br>Es wurden ' + LS.gespielt + ' Spiele gespielt.');
        } else {
            $('#tsText').html('Es wurden ' + LS.gespielt + ' Spiele gespielt.');
        }
        if (mTischTurnier === 'Turnier') {
            $('#tsNeuerTischTurnier').html('Das Turnier starten:');
            $('#tsDieDen').html('die');
            $('#tsSpieleLoeschen').html('Spiele l&ouml;schen<br>und Turnier starten');
        } else {
            $('#tsNeuerTischTurnier').html('Ein neuer Tisch:');
            $('#tsDieDen').html('die');
            $('#tsSpieleLoeschen').html('Spiele l&ouml;schen<br>und neuen Tisch');
        }
        $("#pTISCHSPEICHERN").popup("open").show();
    }
}

function TischLoeschen(pLoeschen) {
    if (pLoeschen || LS.gespielt < 1) {
        var hLog = CUPS.NAME[LS.I];
        hLog += '<br>Es wurden ' + LS.gespielt + ' Spiele gespielt.';
        if (LS.gespielt) {
            DS = JSON.parse(localStorage.getItem('Abakus.DS'));
            hLog += "<table data-role='table' id='tSpielerPunkte' data-mode='columntoggle' class='ui-body-d ui-shadow table-stripe ui-responsive' data-column-btn-text=''>"
                    + "<thead>"
                    + "<tr sclass='ui-bar-d'>"
                    + "<th>&nbsp;Spieler"
                    + "</th>"
                    + "<th class=TC>Punkte&nbsp;"
                    + "</th>"
                    + "</tr>";
            for (var i = 1; i <= 6; i++) {
                if (LS.Spieler[i]) {
                    hLog += '<tr><td>&nbsp;' + LS.NName[i] + ' ' + LS.VName[i] + LS.Sterne[i] + '</td><td class=TC>' + DS.Punkte[i][0] + '&nbsp;</td></tr>';
                } else if (LS.Spiele[i] !== 0) {
                    hLog += '<tr><td class="cRot B">&nbsp;???</td><td class=TR>' + DS.Punkte[i][0] + '&nbsp;</td></tr>';
                }
            }
            hLog += "<tbody>"
                    + "</tbody>"
                    + "</table>"
                    + 'Der Tisch wurde gelöscht.';
        } else {
            hLog += '<br>Der Tisch wurde gelöscht.';
        }
        writeLOG(hLog);
        LS.AnzGespeichert = 0;
        LS.AnzSpieler = 0;
        LS.gespielt = 0;
        LS.Spieler = ['', '', '', '', '', '', ''];
        LS.NR = ['', '', '', '', '', '', ''];
        LS.VName = ['', '', '', '', '', '', ''];
        LS.NName = ['', '', '', '', '', '', ''];
        LS.Sterne = ['', '', '', '', '', '', ''];
        LS.Ort = ['', '', '', '', '', '', ''];
        LS.Spiele = [0, 0, 0, 0, 0, 0, 0];
        LS.Meldung = "Der Tisch wurde gelöscht!";
        var h = LS.I;
        if (CUPS.TURNIER[I] === 'Handy' && (CUPS.BEREadmin[I].indexOf(LS.ME) >= 0 || I <= 3)) {
            // Sonst kann der Admin das Turnier nicht beenden.
        } else {
            LS.I = 0;
        }
        localStorage.setItem('Abakus.LS', JSON.stringify(LS));
        showCup(h);
        $('#bZuMeinemTisch').hide();
        $('a').removeClass('cAktiv');
    } else {
        mTischNeuLoeschen = "L";
        if (LS.I !== I) {
            $("#tsTitel").html(CUPS.NAME[LS.I] + ':').show();
            $('#tsText').html('<br>Es wurden ' + LS.gespielt + ' Spiele gespielt.');
        } else {
            $('#tsText').html('Es wurden ' + LS.gespielt + ' Spiele gespielt.');
        }
        $('#tsNeuerTischTurnier').html('Den Tisch löschen:');
        $('#tsDieDen').html('den');
        $('#tsSpieleLoeschen').html('Tisch löschen');
        $("#pTISCHSPEICHERN").popup("open").show();
    }
}

function getCupText() {
    var html = '';
    if (LS.Meldung) {
        html += '<div class="cRot B">' + LS.Meldung + '</div><br>';
        LS.Meldung = '';
        localStorage.setItem('Abakus.LS', JSON.stringify(LS));
    }
    if (!(I === LS.I && LS.AnzSpieler) || QUERFORMAT()) {
        if (CUPS.TEXT1[I]) {
            html += CUPS.TEXT1[I];
        }
    }
    if (LS.I === I && LS.TURRUNDE > 0) {
        if (LS.TURRUNDE === 1) {
            if (LS.TURGESPIELT === 0) {
                html += "<br><img src='" + iPfad + "OK.png'  width='24' height='24'><span class=M>&nbsp;&nbsp;<b>Turnier wurde gestartet.</b></span>";
            } else {
                html += "<br><img src='" + iPfad + "Achtung.png'  width='24' height='24'><span class=M>&nbsp;&nbsp;<b>Runde 1 noch nicht beendet.</b></span>";
            }
        } else if (LS.TURGESPIELT === 0) {
            html += "<br><img src='" + iPfad + "OK.png'  width='24' height='24'><span class=M>&nbsp;&nbsp;<b>Runde " + LS.TURRUNDE + " wird gespielt.</b></span>";
        } else if (LS.TURSPIELER === LS.TURGESPIELT) {
            html += "<br><img src='" + iPfad + "Achtung.png'  width='24' height='24'><span class=M>&nbsp;&nbsp;<b>" + ((LS.TURRUNDE === 3) ? "Turnier" : "Runde " + LS.TURRUNDE) + " noch nicht beendet.</b></span>";
        } else {
            var hText;
            if (LS.TURSPIELER - LS.TURGESPIELT < 8) {
                hText = "Ein Tisch ausst&auml;ndig.";
            } else {
                hText = parseInt((LS.TURSPIELER - LS.TURGESPIELT) / 4) + " Tische ausst&auml;ndig.";
            }
            html += "<br><img src='" + iPfad + "Achtung.png'  width='24' height='24'><span class=M>&nbsp;&nbsp;<b>Runde " + LS.TURRUNDE + ":&nbsp;&nbsp;&nbsp;" + hText + "</b></span>";
        }
    }
    return html;
}

function getCupButtons() {
    var html = '';
    if (CUPS.BEREadmin[I].indexOf(LS.ME) >= 0 || I <= 3) {
        if (CUPS.TURNIER[I] === 'Handy') {

            var iWochentag = (new Date()).getDay();
            var iVortag = iWochentag - 1;
            if (iWochentag === 0) {
                iVortag = 6;
            } else {
                iVortag = iWochentag - 1;
            }

            var cClass = '';
            if (new Date(CUPS.NEXTTERMIN[I]).toDateString() !== new Date().toDateString()) {
                if (CUPS.SPIELTAGE[I][iWochentag] === 'J'
                        || CUPS.SPIELTAGE[I][iVortag] === 'J' && (new Date()).getHours() <= 6) {
                    if (CUPS.TURNIER[I]) { // nicht in dieser Woche
                        var iWoche = parseInt((new Date().getDate() - 1) / 7);
                        //                  if (I ===  8 && new Date().getDate() >= 15) {
                        if (CUPS.WOCHEN[I][iWoche] !== 'J') {
                            cClass = ' ui-disabled';
                        }
                    }
                    if (CUPS.SPIELTAGE[I][iWochentag] === 'J' && (new Date()).getHours() + 1 >= CUPS.SPIELEAB[I] // 1 Stunde Toleranz
                            || CUPS.SPIELTAGE[I][iVortag] === 'J' && (new Date()).getHours() <= 6) {
                    } else {
                        cClass = ' ui-disabled';
                        // Es wird erst ab "17" Uhr gespielt.
                    }
                } else {
                    cClass = ' ui-disabled';
                    // An einen "Freitag" wird nicht gespielt.
                }
            }

            if (LS.I === 0 && !LS.TURRUNDE || (LS.I !== 0 && LS.I !== I)) {
                html += "<a onclick='iStartStop(true);' data-rel='popup' data-theme=e data-position-to='window' data-role='button' data-inline='true' data-mini='true' class='L" + cClass + "' data-transition='pop' id=bStartbutton>&nbsp;Turnier starten&nbsp;</a>";
            } else if (LS.I === I) {
                if (LS.TURRUNDE < 3) {
                    html += "<a onclick='iStartStop(true);' data-rel='popup' data-theme=e data-position-to='window' data-role='button' data-inline='true' data-mini='true' class='L" + cClass + "' data-transition='pop' id=bRundeXbeenden>&nbsp;Runde " + LS.TURRUNDE + " beenden&nbsp;</a>";
                } else {
                    html += "<a onclick='iStartStop(true);' data-rel='popup' data-theme=e data-position-to='window' data-role='button' data-inline='true' data-mini='true' class='L" + cClass + "' data-transition='pop' id=bTurnierBeenden>&nbsp;Turnier beenden&nbsp;</a>";
                }
            }
        }
    }
    if ((CUPS.TYP[I] !== 'CUP' && CUPS.BEREadmin[I].indexOf(LS.ME) >= 0)
            || LS.ME === '3425'
            || I <= 2) {
        html += "<a onclick='hrefParameterAendern();' data-role='button' data-inline='true' data-mini='true' >&nbsp;Parameter ändern&nbsp;</a>";
    }
    return html + '<br><br>';
}

function hrefParameterAendern() {
    'use strict';
    LS.ShowCups = I;
    localStorage.setItem('Abakus.LS', JSON.stringify(LS));
    window.location.href = 'Abakus/ParameterAendern.html';
}

function checkNeuerTisch() {
    'use strict';
    var hGefunden = false;
    if (I !== 3) {  // Ein PC-Turnier kann an jeden Tag stattfinden
        for (var termin in CUPS.TERMINE) {
            if (CUPS.TERMINE[termin].CUP === I && CUPS.TERMINE[termin].DATUM === hHeute) {
                hGefunden = true;
                break;
            }
        }
        if (!hGefunden) {
            showEineWarnung(I, 'Laut Turnierkalender findet heute kein Turnier statt.');
            return false;
        }
    }
    if (!STAT._AKTTURNIER) {
        if (STAT[hHeute]) {
            showEineWarnung(I, 'Das Turnier wurde bereits beendet.');
            return false;
        } else {
            showEineWarnung(I, 'Das Turnier wurde noch nicht gestartet.', 'Hab etwas Geduld.');
            return false;
        }
    }
    if (STAT._AKTTURNIER._RUNDE > 3) {
        showEineWarnung(I, 'Das Turnier wurde bereits beendet.');
        return;
    }
    if (!STAT._AKTTURNIER[LS.ME]) {
        showEineWarnung(I, 'Du bist nich angemeldet.', 'Informiere den Veranstalter.');
        return false;
    }
    if (STAT._AKTTURNIER._RUNDE === 3 && STAT._AKTTURNIER[LS.ME][3] !== '-') {
        showEineWarnung(I, 'Du hast bereits alle Runden gespielt.');
        return false;
    }
    var nMinSeitRundeStart = parseInt((Date.now() - STAT._AKTTURNIER._RUNDESTART) / 60000);
    if (nMinSeitRundeStart < -35) {
        showEineWarnung(I, ' Die Uhr am Handy geht nach<br>oder die am Turnier-PC vor.', 'Korrigiere die Uhrzeit.');
        return false;
    }
    if (nMinSeitRundeStart > 240) {
        showEineWarnung(I, ' Die Uhr am Handy geht vor<br>oder die am Turnier-PC nach.', 'Korrigiere die Uhrzeit.');
        return false;
    }
    if (STAT._AKTTURNIER._RUNDE === 3 && nMinSeitRundeStart > 75) {
        showEineWarnung(I, 'Das Turnier wird bald beendet.');
        return;
    }

    LS.I = I;
    LS.CupName = CUPS.NAME[LS.I];
    LS.Regeln = CUPS.REGELN[LS.I];
    LS.Spieltyp = CUPS.TYP[LS.I];
    LS.SpieleJeRunde = CUPS.SPJERUNDE[LS.I];
    LS.DoppelteRunden = false;
    LS.Tarif = new Array(19);
    LS.Vorhand = 0;
    LS.Geber = 0;
    LS.INA1 = 0;
    LS.INA2 = 0;
    LS.AnzSpieler = 0;
    LS.Pausierer1 = 0;
    LS.Pausierer2 = 0;
    LS.gespielt = 0;
    LS.AnzGespeichert = 0;
    LS.doppelt = 0;
    LS.JeSeite = '';
    LS.NR = ['', '', '', '', '', '', ''];
    LS.Spieler = ['', '', '', '', '', '', ''];
    LS.VName = ['', '', '', '', '', '', ''];
    LS.NName = ['', '', '', '', '', '', ''];
    LS.Sterne = ['', '', '', '', '', '', ''];
    LS.Ort = ['', '', '', '', '', '', ''];
    LS.Spiele = [0, 0, 0, 0, 0, 0, 0];
    LS.Von = new Date();
    LS.Bis = new Date();
    LS.TURRUNDE = STAT._AKTTURNIER._RUNDE;
    LS.TURTISCH = 0;
    var hTurnier = STAT._AKTTURNIER._TURNIER;
    var SPIELERnr = JSON.parse(localStorage.getItem('Abakus.SPIELERnr'));
    if (nMinSeitRundeStart > 75) {
        LS.TURRUNDE++;
    }

    if (STAT[hTurnier][LS.ME]) {
        if (STAT[hTurnier][LS.ME][LS.TURRUNDE] !== '-') {
            showEineWarnung(I, 'Du hast Runde ' + LS.TURRUNDE + ' bereits gespielt.');
            return;
        }
    }

    if (STAT._AKTTURNIER[LS.ME][LS.TURRUNDE + 6] === 0
            || STAT._AKTTURNIER[LS.ME][LS.TURRUNDE + 6] === '-') {
        showEineWarnung(I, 'Du bist nich angemeldet.', 'Informiere den Veranstalter.');
        return;
    }
    LS.TURTISCH = STAT._AKTTURNIER[LS.ME][LS.TURRUNDE + 6];
    var SORT = [];
    for (var spieler in STAT._AKTTURNIER) {
        if (spieler[0] !== '_') {
            SORT[SORT.length] = STAT._AKTTURNIER[spieler][0] + ';' + spieler;
        }
    }
    SORT.sort();
    var nAngemeldet = 0;
    for (var i = 0; i < SORT.length; i++) {
        spieler = SORT[i].substr(SORT[i].lastIndexOf(';') + 1);
        if (spieler === LS.ME || nAngemeldet) { // Mich und Spieler nach mir anmelden
            nAngemeldet++;
            if (STAT._AKTTURNIER[spieler][LS.TURRUNDE + 6] === LS.TURTISCH) {
                if (STAT._AKTTURNIER[spieler][LS.TURRUNDE] !== '-') {
                    showEineWarnung(I, spieler + ' hat Runde ' + LS.TURRUNDE + ' bereits gespielt.');
                    return;
                }
                if (spieler.length === 4) {
                    blert(spieler, SPIELERnr[spieler][1], SPIELERnr[spieler][0], STAT._AKTTURNIER[spieler][6], '');
                } else {
                    blert(spieler, STAT._AKTTURNIER[spieler][0].substr(0, STAT._AKTTURNIER[spieler][0].indexOf(' ')), STAT._AKTTURNIER[spieler][6], STAT._AKTTURNIER[spieler][6], '');
                }
            }
        }
    }

    for (var i = 0; i < SORT.length; i++) {
        spieler = SORT[i].substr(SORT[i].lastIndexOf(';') + 1);
        if (spieler !== LS.ME) { // Die Spieler vor mir anmelden
            if (STAT._AKTTURNIER[spieler][LS.TURRUNDE + 6] === LS.TURTISCH) {
                if (STAT._AKTTURNIER[spieler][LS.TURRUNDE] !== '-') {
                    showEineWarnung(I, spieler + ' hat Runde ' + LS.TURRUNDE + ' bereits gespielt.');
                    return;
                }
                if (spieler.length === 4) {
                    blert(spieler, SPIELERnr[spieler][1], SPIELERnr[spieler][0], STAT._AKTTURNIER[spieler][6], '');
                } else {
                    blert(spieler, STAT._AKTTURNIER[spieler][0].substr(0, STAT._AKTTURNIER[spieler][0].indexOf(' ')), STAT._AKTTURNIER[spieler][6], STAT._AKTTURNIER[spieler][6], '');
                }
            }
        } else {
            break;
        }
    }


    LS.Vorhand = (Date.now() % (LS.AnzSpieler) + 1);
// onOK aus Anmeldung.js

    LS.VName[1] = LS.VName[1].trim();
    LS.VName[2] = LS.VName[2].trim();
    LS.VName[3] = LS.VName[3].trim();
    LS.VName[4] = LS.VName[4].trim();
    LS.VName[5] = LS.VName[5].trim();
    LS.VName[6] = LS.VName[6].trim();
    LS.Spieler[1] = LS.VName[1];
    LS.Spieler[2] = LS.VName[2];
    LS.Spieler[3] = LS.VName[3];
    LS.Spieler[4] = LS.VName[4];
    LS.Spieler[5] = LS.VName[5];
    LS.Spieler[6] = LS.VName[6];
    if ((LS.VName[1].substr(0, 3) === LS.VName[2].substr(0, 3))
            || (LS.VName[1].substr(0, 3) === LS.VName[3].substr(0, 3))
            || (LS.VName[1].substr(0, 3) === LS.VName[4].substr(0, 3))
            || (LS.VName[1].substr(0, 3) === LS.VName[5].substr(0, 3))
            || (LS.VName[1].substr(0, 3) === LS.VName[6].substr(0, 3))) {
        if (LS.VName[1].substr(0, 3) === LS.VName[2].substr(0, 3)) {
            LS.Spieler[2] = LS.NName[2].substr(0, 1) + '.' + LS.VName[2];
        }
        if (LS.VName[1].substr(0, 3) === LS.VName[3].substr(0, 3)) {
            LS.Spieler[3] = LS.NName[3].substr(0, 1) + '.' + LS.VName[3];
        }
        if (LS.VName[1].substr(0, 3) === LS.VName[4].substr(0, 3)) {
            LS.Spieler[4] = LS.NName[4].substr(0, 1) + '.' + LS.VName[4];
        }
        if (LS.VName[1].substr(0, 3) === LS.VName[5].substr(0, 3)) {
            LS.Spieler[5] = LS.NName[5].substr(0, 1) + '.' + LS.VName[5];
        }
        if (LS.VName[1].substr(0, 3) === LS.VName[6].substr(0, 3)) {
            LS.Spieler[6] = LS.NName[6].substr(0, 1) + '.' + LS.VName[6];
        }
        LS.Spieler[1] = LS.NName[1].substr(0, 1) + '.' + LS.VName[1];
    }

    if ((LS.VName[2].substr(0, 3) === LS.VName[3].substr(0, 3))
            || (LS.VName[2].substr(0, 3) === LS.VName[4].substr(0, 3))
            || (LS.VName[2].substr(0, 3) === LS.VName[5].substr(0, 3))
            || (LS.VName[2].substr(0, 3) === LS.VName[6].substr(0, 3))) {
        if (LS.VName[2].substr(0, 3) === LS.VName[3].substr(0, 3)) {
            LS.Spieler[3] = LS.NName[3].substr(0, 1) + '.' + LS.VName[3];
        }
        if (LS.VName[2].substr(0, 3) === LS.VName[4].substr(0, 3)) {
            LS.Spieler[4] = LS.NName[4].substr(0, 1) + '.' + LS.VName[4];
        }
        if (LS.VName[2].substr(0, 3) === LS.VName[5].substr(0, 3)) {
            LS.Spieler[5] = LS.NName[5].substr(0, 1) + '.' + LS.VName[5];
        }
        if (LS.VName[2].substr(0, 3) === LS.VName[6].substr(0, 3)) {
            LS.Spieler[6] = LS.NName[6].substr(0, 1) + '.' + LS.VName[6];
        }
        LS.Spieler[2] = LS.NName[2].substr(0, 1) + '.' + LS.VName[2];
    }

    if ((LS.VName[3].substr(0, 3) === LS.VName[4].substr(0, 3))
            || (LS.VName[3].substr(0, 3) === LS.VName[5].substr(0, 3))
            || (LS.VName[3].substr(0, 3) === LS.VName[6].substr(0, 3))) {
        if (LS.VName[3].substr(0, 3) === LS.VName[4].substr(0, 3)) {
            LS.Spieler[4] = LS.NName[4].substr(0, 1) + '.' + LS.VName[4];
        }
        if (LS.VName[3].substr(0, 3) === LS.VName[5].substr(0, 3)) {
            LS.Spieler[5] = LS.NName[5].substr(0, 1) + '.' + LS.VName[5];
        }
        if (LS.VName[3].substr(0, 3) === LS.VName[6].substr(0, 3)) {
            LS.Spieler[6] = LS.NName[6].substr(0, 1) + '.' + LS.VName[6];
        }
        LS.Spieler[3] = LS.NName[3].substr(0, 1) + '.' + LS.VName[3];
    }

    if ((LS.VName[4].substr(0, 3) === LS.VName[5].substr(0, 3))
            || (LS.VName[4].substr(0, 3) === LS.VName[6].substr(0, 3))) {
        if (LS.VName[4].substr(0, 3) === LS.VName[5].substr(0, 3)) {
            LS.Spieler[5] = LS.NName[5].substr(0, 1) + '.' + LS.VName[5];
        }
        if (LS.VName[4].substr(0, 3) === LS.VName[6].substr(0, 3)) {
            LS.Spieler[6] = LS.NName[6].substr(0, 1) + '.' + LS.VName[6];
        }
        LS.Spieler[4] = LS.NName[4].substr(0, 1) + '.' + LS.VName[4];
    }

    if (LS.VName[6]) {
        if ((LS.VName[5].substr(0, 3) === LS.VName[6].substr(0, 3))) {
            LS.Spieler[5] = LS.NName[5].substr(0, 1) + '.' + LS.VName[5];
            LS.Spieler[6] = LS.NName[6].substr(0, 1) + '.' + LS.VName[6];
        }
    }

    if (LS.Spieler[2].substr(3, 1) === '.') {
        LS.Spieler[2] = LS.VName[2].substr(0, 1) + '.' + LS.NName[2];
    }
    if (LS.Spieler[3].substr(3, 1) === '.') {
        LS.Spieler[3] = LS.VName[3].substr(0, 1) + '.' + LS.NName[3];
    }
    if (LS.Spieler[4].substr(3, 1) === '.') {
        LS.Spieler[4] = LS.VName[4].substr(0, 1) + '.' + LS.NName[4];
    }
    if (LS.Spieler[5].substr(3, 1) === '.') {
        LS.Spieler[5] = LS.VName[5].substr(0, 1) + '.' + LS.NName[5];
    }
    if (LS.Spieler[6].substr(3, 1) === '.') {
        LS.Spieler[6] = LS.VName[6].substr(0, 1) + '.' + LS.NName[6];
    }

    LS.Spieler[1] = LS.Spieler[1] + LS.Sterne[1];
    LS.Spieler[2] = LS.Spieler[2] + LS.Sterne[2];
    LS.Spieler[3] = LS.Spieler[3] + LS.Sterne[3];
    LS.Spieler[4] = LS.Spieler[4] + LS.Sterne[4];
    LS.Spieler[5] = LS.Spieler[5] + LS.Sterne[5];
    LS.Spieler[6] = LS.Spieler[6] + LS.Sterne[6];
    LS.SpieleJeRunde = CUPS.SPJERUNDE[LS.I];
    if (LS.Spieler[5] === '') {
        LS.JeSeite = '1';
        if (LS.AnzSpieler !== 4) {
            LS.AnzSpieler = 4;
            LS.Pausierer1 = 5;
            LS.Pausierer2 = 6;
        }
    } else if (LS.Spieler[6] === '') {
        if (LS.AnzSpieler !== 5) {
            LS.AnzSpieler = 5;
            LS.Pausierer1 = 0;
            LS.Pausierer2 = 6;
        }
    } else {
        if (LS.AnzSpieler !== 6) {
            LS.AnzSpieler = 6;
            LS.Pausierer1 = 0;
            LS.Pausierer2 = 0;
        }
    }
    if (LS.SpieleJeRunde && LS.AnzSpieler > 4) {
        LS.SpieleJeRunde = parseInt((CUPS.SPJERUNDE[LS.I] / 4) * LS.AnzSpieler);
    }

    SetGeberPausierer();
    setTarif();
    localStorage.setItem('Abakus.LS', JSON.stringify(LS));
    var DS = new Object();
    DS.GameI = [0];
    DS.Game = [''];
    DS.Spieler = [''];
    DS.Partner = [''];
    DS.Punkte = [[0], [0], [0], [0], [0], [0], [0]];
    DS.Korr = [false];
    DS.Storno = [false];
    localStorage.setItem('Abakus.DS', JSON.stringify(DS));
    var NEXT = new Object();
    NEXT.Seite = 'GR';
    localStorage.setItem('Abakus.NEXT', JSON.stringify(NEXT));
    window.location.href = 'Abakus/Abakus' + LS.AnzSpieler + LS.JeSeite + '.html';
}

function blert(pNR, pVNAME, pNNAME, pORT, pSTERNE) {
    LS.AnzSpieler++;
    LS.NR    [LS.AnzSpieler] = pNR;
    LS.VName [LS.AnzSpieler] = pVNAME.trim();
    LS.NName [LS.AnzSpieler] = pNNAME.trim();
    LS.Ort   [LS.AnzSpieler] = pORT.trim();
    LS.Sterne[LS.AnzSpieler] = pSTERNE;
}

function SetGeberPausierer() {

    LS.Geber = LS.Vorhand - 1;
    if (LS.Geber === 0) {
        LS.Geber = LS.AnzSpieler;
    }
    if (LS.Geber === LS.Pausierer1 || LS.Geber === LS.Pausierer2) {
        LS.Geber = LS.Geber - 1;
        if (LS.Geber === 0) {
            LS.Geber = LS.AnzSpieler;
        }
        if (LS.Geber === LS.Pausierer1 || LS.Geber === LS.Pausierer2) {
            LS.Geber = LS.Geber - 1;
            if (LS.Geber === 0) {
                LS.Geber = LS.AnzSpieler;
            }
        }
    }

    LS.INA1 = 0;
    LS.INA2 = 0;
    if (LS.AnzSpieler === 4) {
        LS.INA1 = 5;
        LS.INA2 = 6;
    } else if (LS.AnzSpieler === 5) {
        if (LS.Pausierer1 > 0) {
            LS.INA1 = LS.Pausierer1;
        } else {
            LS.INA1 = LS.Geber;
        }
        LS.INA2 = 6;
    } else if (LS.AnzSpieler === 6) {
        if (LS.Pausierer1 === 0 && LS.Pausierer2 === 0) {
            LS.INA1 = LS.Geber;
            if (LS.Geber <= 3) {
                LS.INA2 = LS.Geber + 3;
            } else {
                LS.INA2 = LS.Geber - 3;
            }
        } else if (LS.Pausierer1 !== 0 && LS.Pausierer2 !== 0) {
            LS.INA1 = LS.Pausierer1;
            LS.INA2 = LS.Pausierer2;
            LS.Geber = 0;
        } else {
            LS.INA1 = LS.Pausierer1;
            LS.INA2 = LS.Geber;
            LS.Geber = 0;
        }
    }
}

function setTarif() {
    'use strict';
    LS.Tarif = new Array(19);
    if (CUPS.TARIF[LS.I].length >= 18) {
        LS.Tarif[iRufer          ] = CUPS.TARIF[LS.I][1 ]; // Rufer
        LS.Tarif[iSolorufer      ] = CUPS.TARIF[LS.I][1 ] * 2; // Solorufer
        LS.Tarif[iPagatrufer     ] = CUPS.TARIF[LS.I][1 ]; // Pagat
        LS.Tarif[iUhurufer       ] = CUPS.TARIF[LS.I][1 ]; // Uhu
        LS.Tarif[iKakadurufer    ] = CUPS.TARIF[LS.I][1 ]; // Kakadu
        LS.Tarif[iQuapilrufer    ] = CUPS.TARIF[LS.I][1 ]; // Quapil
        LS.Tarif[i6er            ] = CUPS.TARIF[LS.I][2 ]; // 6er
        LS.Tarif[i3er            ] = CUPS.TARIF[LS.I][3 ]; // 3er
        LS.Tarif[iSolo3er        ] = CUPS.TARIF[LS.I][3 ] * 2; // Solo3er
        LS.Tarif[iFarben3er      ] = CUPS.TARIF[LS.I][4 ]; // Farben-3er
        LS.Tarif[iFarbensolo     ] = CUPS.TARIF[LS.I][5 ]; // Farbensolo
        LS.Tarif[iTrischaker     ] = CUPS.TARIF[LS.I][6 ]; // Trischaken
        LS.Tarif[iPiZwiccolo     ] = CUPS.TARIF[LS.I][7 ]; // Pi/Zwiccolo
        LS.Tarif[iBettler        ] = CUPS.TARIF[LS.I][8 ]; // Bettler
        LS.Tarif[iPiZwiccoloOvert] = CUPS.TARIF[LS.I][9 ]; // Pi/Zwiccolo overt
        LS.Tarif[iBettlerOvert   ] = CUPS.TARIF[LS.I][10]; // Bettler overt
        LS.Tarif[iPagat          ] = CUPS.TARIF[LS.I][11]; // Pagat
        LS.Tarif[iUhu            ] = CUPS.TARIF[LS.I][12]; // Uhu
        LS.Tarif[iKakadu         ] = CUPS.TARIF[LS.I][13]; // Kakadu
        LS.Tarif[iQuapil         ] = CUPS.TARIF[LS.I][14]; // Quapil
        LS.Tarif[iV              ] = CUPS.TARIF[LS.I][15]; // V
        LS.Tarif[iTrull          ] = CUPS.TARIF[LS.I][16]; // Trull
        LS.Tarif[i4Koenige       ] = CUPS.TARIF[LS.I][17]; // Vier Könige
        LS.Tarif[iUltimo         ] = CUPS.TARIF[LS.I][18]; // König ultimo
        LS.Tarif[iValat          ] = CUPS.TARIF[LS.I][19]; // Valat
        if (CUPS.TARIF[LS.I][20]) {
            LS.Tarif[iAbsolut    ] = CUPS.TARIF[LS.I][20]; // Prämie 20
            LS.Tarif20T = CUPS.TARIF20T[LS.I];
        } else {
            LS.Tarif[iAbsolut    ] = 0;
            LS.Tarif20T = '';
        }
        if (CUPS.TARIF[LS.I][21]) {
            LS.Tarif[iXY         ] = CUPS.TARIF[LS.I][21]; // Prämie 21
            LS.Tarif21T = CUPS.TARIF21T[LS.I];
        } else {
            LS.Tarif[iXY         ] = 0;
            LS.Tarif21T = '';
        }
    } else if (CUPS.REGELN[LS.I] === 'Wr.') {
        LS.Tarif[iRufer          ] = 1; // Rufer
        LS.Tarif[iSolorufer      ] = 2; // Solorufer
        LS.Tarif[iPagatrufer     ] = 1; // Pagat
        LS.Tarif[iUhurufer       ] = 1; // Uhu
        LS.Tarif[iKakadurufer    ] = 1; // Kakadu
        LS.Tarif[iQuapilrufer    ] = 1; // Quapil
        LS.Tarif[i6er            ] = 4; // 6er
        LS.Tarif[i3er            ] = 5; // 3er
        LS.Tarif[iSolo3er        ] = 10; // Solo3er
        LS.Tarif[iFarben3er      ] = 5; // Farben-3er
        LS.Tarif[iFarbensolo     ] = 10; // Farbensolo
        LS.Tarif[iTrischaker     ] = 2; // Trischaken
        LS.Tarif[iPiZwiccolo     ] = 2; // Pi/Zwiccolo
        LS.Tarif[iBettler        ] = 4; // Bettler
        LS.Tarif[iPiZwiccoloOvert] = 6; // Pi/Zwiccolo overt
        LS.Tarif[iBettlerOvert   ] = 8; // Bettler overt
        LS.Tarif[iPagat          ] = 1; // Pagat
        LS.Tarif[iUhu            ] = 2; // Uhu
        LS.Tarif[iKakadu         ] = 3; // Kakadu
        LS.Tarif[iQuapil         ] = 4; // Quapil
        LS.Tarif[iV              ] = 0; // V
        LS.Tarif[iTrull          ] = 1; // Trull
        LS.Tarif[i4Koenige       ] = 1; // Vier Könige
        LS.Tarif[iUltimo         ] = 1; // König ultimo
        LS.Tarif[iValat          ] = 0; // Valat
        LS.Tarif[iAbsolut        ] = 0; // Absolut
        LS.Tarif[iXY             ] = 0; // Prämie XY
        LS.Tarif20T = '';
        LS.Tarif21T = '';
    } else if (CUPS.REGELN[LS.I] === 'Ooe.') {
        LS.Tarif[iRufer          ] = 1; // Rufer
        LS.Tarif[iSolorufer      ] = 2; // Solorufer
        LS.Tarif[iPagatrufer     ] = 1; // Pagat
        LS.Tarif[iUhurufer       ] = 1; // Uhu
        LS.Tarif[iKakadurufer    ] = 1; // Kakadu
        LS.Tarif[iQuapilrufer    ] = 1; // Quapil
        LS.Tarif[i6er            ] = 4; // 6er
        LS.Tarif[i3er            ] = 4; // 3er
        LS.Tarif[iSolo3er        ] = 8; // Solo3er
        LS.Tarif[iFarben3er      ] = 0; // Farben-3er
        LS.Tarif[iFarbensolo     ] = 5; // Farbensolo
        LS.Tarif[iTrischaker     ] = 1; // Trischaken
        LS.Tarif[iPiZwiccolo     ] = 2; // Pi/Zwiccolo
        LS.Tarif[iBettler        ] = 2; // Bettler
        LS.Tarif[iPiZwiccoloOvert] = 6; // Pi/Zwiccolo overt
        LS.Tarif[iBettlerOvert   ] = 7; // Bettler overt
        LS.Tarif[iPagat          ] = 1; // Pagat
        LS.Tarif[iUhu            ] = 2; // Uhu
        LS.Tarif[iKakadu         ] = 3; // Kakadu
        LS.Tarif[iQuapil         ] = 4; // Quapil
        LS.Tarif[iV              ] = 0; // V
        LS.Tarif[iTrull          ] = 1; // Trull
        LS.Tarif[i4Koenige       ] = 1; // Vier Könige
        LS.Tarif[iUltimo         ] = 1; // König ultimo
        LS.Tarif[iValat          ] = 0; // Valat
        LS.Tarif[iAbsolut        ] = 0; // Absolut
        LS.Tarif[iXY             ] = 0; // Prämie XY
        LS.Tarif20T = '';
        LS.Tarif21T = '';
    } else {
        LS.Tarif[iRufer          ] = 1; // Rufer
        LS.Tarif[iSolorufer      ] = 2; // Solorufer
        LS.Tarif[iPagatrufer     ] = 1; // Pagat
        LS.Tarif[iUhurufer       ] = 1; // Uhu
        LS.Tarif[iKakadurufer    ] = 1; // Kakadu
        LS.Tarif[iQuapilrufer    ] = 1; // Quapil
        LS.Tarif[i6er            ] = 4; // 6er
        LS.Tarif[i3er            ] = 5; // 3er
        LS.Tarif[iSolo3er        ] = 10; // Solo3er
        LS.Tarif[iFarben3er      ] = 5; // Farben-3er
        LS.Tarif[iFarbensolo     ] = 10; // Farbensolo
        LS.Tarif[iTrischaker     ] = 2; // Trischaken
        LS.Tarif[iPiZwiccolo     ] = 2; // Pi/Zwiccolo
        LS.Tarif[iBettler        ] = 4; // Bettler
        LS.Tarif[iPiZwiccoloOvert] = 8; // Pi/Zwiccolo overt
        LS.Tarif[iBettlerOvert   ] = 8; // Bettler overt
        LS.Tarif[iPagat          ] = 1; // Pagat
        LS.Tarif[iUhu            ] = 2; // Uhu
        LS.Tarif[iKakadu         ] = 3; // Kakadu
        LS.Tarif[iQuapil         ] = 4; // Quapil
        LS.Tarif[iV              ] = 0; // V
        LS.Tarif[iTrull          ] = 1; // Trull
        LS.Tarif[i4Koenige       ] = 1; // Vier Könige
        LS.Tarif[iUltimo         ] = 1; // König ultimo
        LS.Tarif[iValat          ] = 10; // Valat
        LS.Tarif[iAbsolut        ] = 1; // Absolut
        LS.Tarif[iXY             ] = 1; // Prämie XY
        LS.Tarif20T = 'Sack';
        LS.Tarif21T = 'XY';
    }
}

function whenSTATloaded() {
    'use strict';
    if (CUPS.TURNIER[I] && CUPS.TURNIER[I] !== 'Handy') {
        checkNeuerTisch();
        return;
    }

    var hJetzt = new Date().getTime();
    if (STAT && new Date(STAT.ZULETZTupd).getTime() > hJetzt + 60000 * 15) {  // + 15 Minuten Toleranz
        showEineWarnung('F1: Datum oder Uhrzeit falsch.', 'Bitte korrigieren.');
        return false;
    }

    if (new Date(getVersionsDatum()).getTime() > hJetzt + 60000 * 15) {  // + 15 Minuten Toleranz
        showEineWarnung('F2: Datum oder Uhrzeit falsch.', 'Bitte korrigieren.');
        return false;
    }

    if (CUPS.TURNIER[I]) {

        if (PC && CUPS.TURNIER[I] === 'PC') {
        } else {
            if (STAT.TURRUNDE === 0) {
                showEineWarnung(I, "Turnier noch nicht gestartet!", "Informiere den Veranstalter.");
                return false;
            }
        }

        if (CUPS.TURNIER[I] === 'Handy') {

            if (new Date(STAT.TURTIMESTAMP).getTime() > hJetzt + 60000 * 15) { // + 15 Minuten Toleranz
                if (LS.ME !== '3425') {
                    showEineWarnung('F3: Datum oder Uhrzeit falsch.', 'Bitte korrigieren.');
                    return false;
                }
            }

            if (new Date(STAT.TURTIMESTAMP).toDateString() !== new Date().toDateString()) {
                if (CUPS.BEREadmin[I].indexOf(LS.ME) >= 0 || CUPS.BEREadmin[I].indexOf('*') >= 0) {
                    if (new Date(STAT.TURTIMESTAMP).getTime() + 60000 * 60 * 24 > hJetzt) { // 24 Stunden Toleranz
                        showEineWarnung('F4: Datum oder Uhrzeit falsch.',
                                'Korrekturen müssen innerhalb von 24 Stunden nach Turnierstart durchgeführt werden.');
                    }
                } else {
                    showEineWarnung('F3: Datum ungültig:', 'Nur an dem Tag, an dem<br>'
                            + 'das Turnier gestartet wurde,<br>'
                            + 'dem ' + new Date(STAT.TURTIMESTAMP).toLocaleDateString() + ', kann ein<br>'
                            + 'Tisch eingegeben werden.');
                    return false;
                }
            }

            if (I > 3) {
                if (CUPS.BEREadmin[I].indexOf(LS.ME) >= 0 || STAT.TURGESPIELT === 0) {
// Administrator muß händische Tische nacherfassen
                } else {
                    showEineWarnung(I, "Runde " + STAT.TURRUNDE + " läuft noch!", "Etwas Geduld bitte!");
                    return false;
                }
            }

        }
    }

    hideEinenMoment(); // iOS ist hier leider ein bisserl langsam.
    LS.Von = new Date();
    LS.Bis = new Date();
    LS.LoadCups = I * -1; // - = neuer Tisch
    localStorage.setItem('Abakus.LS', JSON.stringify(LS));
    setTimeout(function () {
        window.location.href = 'Abakus/Anmeldung.html';
    });
}

function Weiterspielen() {
    'use strict';
    if (LS.ShowCups !== LS.I
            || LS.SpieleJeRunde !== CUPS.SPJERUNDE[LS.I]) {
        LS.ShowCups = LS.I;
        LS.SpieleJeRunde = CUPS.SPJERUNDE[LS.I];
        localStorage.setItem('Abakus.LS', JSON.stringify(LS));
    }
    var NEXT = new Object();
    NEXT.Seite = 'GR';
    localStorage.setItem('Abakus.NEXT', JSON.stringify(NEXT));
    window.location.href = 'Abakus/Abakus' + LS.AnzSpieler + LS.JeSeite + '.html';
}

function replaceTischSpeichern() {
    window.location.href = 'Abakus/TischSpeichern.html';
}

function getINT(pStr) {
    var Str = $.trim(pStr);
    var Int = parseInt(Str);
    if (Str === "")
        return false;
    if (isNaN(Str))
        return false;
    if (isNaN(Int))
        return false;
    if (Str.indexOf('-') >= 0 & Int > 0) {
        return (Int * -1);
    }
    if (Str.toString() === Int.toString()) {
        return Int;
    } else {
        return false;
    }
}

function checkVersion() {
    'use strict';
    var sDate = new Date(CUPS.TIMESTAMP);
    var hDate = new Date();
    if (new Date('2016-01-11T18:02:22.210Z').getHours() !== 19) {
        $('#bSpeichern').addClass('ui-disabled');
        $('#hSpeichern').html('<span class="cRot">'
                + 'Die Zeitzone ist ungleich Wien.<br>'
                + '<b>Speichern ist nicht möglich.</b></span>').show();
    } else if (sDate.getFullYear() > hDate.getFullYear() || sDate.getTime() > hDate.getTime() + 60000 * 60) {  // + 60 Minuten Toleranz
        $('#bSpeichern').addClass('ui-disabled');
        $('#hSpeichern').html('<span class=cRot>'
                + 'Das Systemdatum ist nicht aktuell.<br>'
                + '<b>Speichern ist nicht möglich.</b></span>').show();
    } else if (sDate.getFullYear() < hDate.getFullYear()) {
        $('#bSpeichern').addClass('ui-disabled');
        $('#hSpeichern').html('<span class=cRot>'
                + 'Das System wurde für ' + hDate.getFullYear() + '<br>'
                + 'noch nicht freigegeben.<br>'
                + 'Informiere einen Administrator.<br>'
                + '<b>Speichern ist nicht möglich.</b></span>').show();
    }
}