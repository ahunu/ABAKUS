/* global stCup, CUPS, STAT, stAnzSpalten, LS, PC, setFont, SORT */

function statShow(pStat, pSort, pHeader, pRunde, pTurCupGes) {
    'use strict';

// stTurCupGes:
// 0 = Gesamt
// 1 = laufendes Jahr
// 2 = Vorjahr
// 3 = LETZTE Runde/Turnier

    $('#stHead').show();
    lastOption = 0;
    lastScrollPos = 0;
    stAktSpalten = 1;

    hWait = 500;

    if (CUPS.TURNIER[stCup] === 'PC' && stOption === 2) {
        stOption = 1;
    }

    if (stStat === 10 || stTurCupGes > 3) { // Anmeldungen || Archiv
        if (typeof pTurCupGes !== 'number') {
            pTurCupGes = 3;
        }
        if (!pStat) {
            pStat = -1;
        }
        if (!pSort) {
            pSort = 'GES';
        }
    }

    if (pStat === 0) {
        if (CUPS.TURNIER[stCup]) {
            if (CUPS.TURNIER[stCup] === "Handy") {
                if ((STAT.TURRUNDE === 2 || STAT.TURRUNDE === 3) && STAT.TURGESPIELT === 0) {
                    pStat = -1;
                    stSort = 'TIS' + STAT.TURRUNDE;
                    pRunde = STAT.TURRUNDE;
                    pTurCupGes = 3;
                } else {
                    pStat = -1;
                    stSort = 'GES';
                }
            } else {
                pStat = -1;
                stSort = 'GES';
                pTurCupGes = 3;
            }
        } else {
            pStat = 1;
            stSort = 'CUP';
        }
        var hCreateHeader = true;
    } else {
        if (pHeader || stAnzSpalten === 1 || pStat === 10) {
            var hCreateHeader = true;
        } else {
            var hCreateHeader = false;
        }
    }
    hCreateHeader = true; // Sonst werden die NB-Buttons nicht aktiviert
    if (pStat) {
        stStat = pStat;
    }
    if (pSort) {
        stSort = pSort;
    }
    if (typeof pTurCupGes === 'number') {
        stTurCupGes = pTurCupGes;
    }
    if (stSort.indexOf('TIS') === 0 && !pRunde) {
        stSort = 'GES';
    }

    if ((stTurCupGes === 4 || stTurCupGes === 5) && stStat === -1) {
        stStat = 1;      // Für die Jahre 2014 und 2015
        stSort = 'CUP';  // existiert keine Cupwertung
    }

    if (stTurCupGes <= 3) {
        stVollAb = CUPS.VOLLAB[stCup][stTurCupGes];
    } else {
        stVollAb = CUPS.VOLLAB[stCup][1];
    }

    compStNamenLen();

    html = getSortUndLayout();

    if (hCreateHeader) {
        html += "<div class=ui-grid-c><div class=ui-block-a id=SP1 style='width:100%;'>";
    }
    var heute = new Date();
    var daysOfWeek = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
    var monthsOfYear = ["J" + eval('"\\u00e4"') + "n.", "Feb.", "M" + eval('"\\u00e4"') + "rz", "Apr.", "Mai", "Juni", "Juli", "Aug.", "Sep.", "Okt.", "Nov.", "Dez."];

    STAT.ZULETZT = new Date(STAT.ZULETZT);
    stTIMESTAMP = new Date(STAT.ZULETZT);

    html += getHilfeText();

    if (stStat === 8) {
        statDiagramm();
    } else {
        if (stStat === 10) {
            html = html + statPosAnmeld();
        } else if (CUPS.TURNIER[stCup]) {
            if (stSort === 'TZU') {
                html = html + statPosDivPCtur();
            } else if ((stStat === -1 || stStat === 2) && (stTurCupGes === 1 || stTurCupGes === 2 || stTurCupGes === 3 || stTurCupGes > 3) || stSort[0] === 'T') {
                if ((CUPS.TYP[stCup] === 'MT' || stCup === 11) && (stTurCupGes === 1 || stTurCupGes === 2)) { // 1 === akt. Jahr, 2 === Vorjahr
                    html = html + statPosCupD60(pRunde);
                } else {
                    html = html + statPosCup(pRunde);
                }
            } else if (stStat <= 1 || stSort === 'STO') {
                html = html + statPosCupD60(pRunde);
            } else {
                html = html + statPosDiv();  // Staudingerliste
            }
        } else {
            if (stStat <= 1 || stSort === 'STO') {
                html = html + statPosCupD60(pRunde);
            } else {
                html = html + statPosDiv();  // Staudingerliste
            }
        }
        if (hCreateHeader) {
            var hZuletzt = new Date(STAT.ZULETZT);
            if (CUPS.TURNIER[stCup] && LS.TURRUNDE === 1 && LS.I === stCup) {
                hZuletzt = new Date();
            }
            if (LS.AnzSpalten === 1 || stAnzSpalten > 3 || !QUERFORMAT()) {
                if (hZuletzt.getDate() >= 20) {
                    var tZuletzt = hZuletzt.getDate() + "." + monthsOfYear[hZuletzt.getMonth()];
                } else {
                    var tZuletzt = hZuletzt.getDate() + ". " + monthsOfYear[hZuletzt.getMonth()];
                }
            } else {
                var tZuletzt = daysOfWeek[hZuletzt.getDay()] + " " + hZuletzt.getDate() + ". " + monthsOfYear[hZuletzt.getMonth()];
            }
            html += "</div>";
            if (QUERFORMAT()) {
                html += '<div class=ui-block-b id=SP2 style="width:0%;"></div>'
                        + '<div class=ui-block-c id=SP3 style="width:0%;"></div>'
                        + '<div class=ui-block-d id=SP4 style="width:0%;"></div>';
            }
            html += "</div>";
            if (stCup > 450 && PC) {  // damit Google beim Drucken keine Zeilen schluckt.
                var hDataPosition = "";
            } else {
                var hDataPosition = " data-position='fixed'";
            }
            if (QUERFORMAT()) {
                if (LS.ME === '3425' && !STAT.MAXSPIELE) {
                    showEineMeldung('statShow(), Line 167', 'Warum ist STAT.MAXSPIELE[] nicht deffiniert?');
                }
                $('#stMain').html(
                        "<div id='stHeader' data-role='header' " + hDataPosition + " class='K' style='position: fixed; top: 0; width: 100%; padding:0em; margin:0px'>"
                        + "<canvas id='stHead' onclick='$(\"#sortUndLayout\").toggle(\"show\");' width='2000' height='66'></canvas>"
                        + "<div id=stNavbar data-role='navbar' class='noprint'>"
                        + "<ul>"
                        + "<li class=nb11 id='bSt2'><a onclick='statShow(false,false,false,false,2);' class='nbButton " + (stTurCupGes === 2 ? ' ui-btn-active' : '') + (STAT.MAXSPIELE[2] ? '' : ' ui-disabled') + "'>" + (heute.getFullYear() - 1) + "</a></li>"
                        + "<li class=nb11 id='bSt1'><a onclick='statShow(false,false,false,false,1);' class='nbButton " + (stTurCupGes === 1 ? ' ui-btn-active' : '') + (STAT.MAXSPIELE[1] ? '' : ' ui-disabled') + "'>" + heute.getFullYear() + "</a></li>"
                        + "<li class=nb6  id='bSt3'><a onclick='statShow(false,false,false,false,3);' class='nbButton " + (stTurCupGes === 3 ? ' ui-btn-active' : '') + (STAT.MAXSPIELE[3] ? '' : ' ui-disabled') + "'>" + tZuletzt + "</a></li>"
                        + "<li class=nb6  id='bSt0'><a onclick='statShow(false,false,false,false,0);' class='nbButton " + (stTurCupGes === 0 ? ' ui-btn-active' : '') + (STAT.MAXSPIELE[0] ? '' : ' ui-disabled') + "'>Gesamt</a></li>"
                        + "<li class=nb6  id='bAnmeldung'><a id=aAnmeldung onclick='statShow(10);'    class='nbButton " + (stStat === 10 ? ' ui-btn-active' : '') + (CUPS.ANMELDERF[stCup] ? '' : ' ui-disabled') + "'>Anmeldungen</a></li>"
                        + "<li class=nb6  id='bArchiv'><a onclick='showArchiv();'                     class='nbButton " + (STAT.MAXSPIELE[1] + STAT.MAXSPIELE[2] < STAT.MAXSPIELE[0] ? '' : ' ui-disabled') + "'>Archiv</a></li>"
                        + "<li class=nb11 id='bSt99'><a onclick='if ($(\"#hilfeText\").is(\":visible\")) {$(\"#hilfeText\").hide();} else {$(\"#hilfeText\").show();}' class='nbButton'>Hilfe</a></li>"
                        + "</ul>"
                        + "</div>"
                        + "</div>"
                        + "<div id=stBody>"
                        + html
                        + "</div>"
                        ).trigger('create').show(setFont);
            } else {

                        + "<li class=nb20 id='bSt2'><a onclick='statShow(false,false,false,false,2);' class='nbButton M3 " + (stTurCupGes === 2 ? ' ui-btn-active' : '') + (STAT.MAXSPIELE[2] ? '' : ' ui-disabled') + "'>" + (heute.getFullYear() - 1) + "</a></li>"
                        + "<li class=nb20 id='bSt1'><a onclick='statShow(false,false,false,false,1);' class='nbButton M3 " + (stTurCupGes === 1 ? ' ui-btn-active' : '') + (STAT.MAXSPIELE[1] ? '' : ' ui-disabled') + "'>" + heute.getFullYear() + "</a></li>"
                        + "<li class=nb28 id='bSt3'><a onclick='statShow(false,false,false,false,3);' class='nbButton M3 " + (stTurCupGes === 3 ? ' ui-btn-active' : '') + (STAT.MAXSPIELE[3] ? '' : ' ui-disabled') + "'>" + tZuletzt + "</a></li>"
                        + "<li class=nb20 id='bSt0'><a onclick='statShow(false,false,false,false,0);' class='nbButton M3 " + (stTurCupGes === 0 ? ' ui-btn-active' : '') + (STAT.MAXSPIELE[0] ? '' : ' ui-disabled') + "'>Gesamt</a></li>"
                        + "<li class=nb12 id='bSt99'><a onclick='showNavbarExt();Deactivate(this);' class='nbButton M3'>...</a></li>"

                
                $('#stMain').html(
                        "<div id='stHeader' data-role='header' " + hDataPosition + " class='K' style='position: fixed; top: 0; width: 100%; padding:0em; margin:0px'>"
                        + "<canvas id='stHead' onclick='$(\"#sortUndLayout\").toggle(\"show\");' width='2000' height='66'></canvas>"
                        + "<div id=stNavbar data-role='navbar' class='noprint'>"
                        + "<ul>"
                        + "<li class=nb18 id='bSt2'><a onclick='statShow(false,false,false,false,2);' class='nbButton M3 " + (stTurCupGes === 2 ? ' ui-btn-active' : '') + (STAT.MAXSPIELE[2] ? '' : ' ui-disabled') + "'>" + (heute.getFullYear() - 1) + "</a></li>"
                        + "<li class=nb18 id='bSt1'><a onclick='statShow(false,false,false,false,1);' class='nbButton M3 " + (stTurCupGes === 1 ? ' ui-btn-active' : '') + (STAT.MAXSPIELE[1] ? '' : ' ui-disabled') + "'>" + heute.getFullYear() + "</a></li>"
                        + "<li class=nb27 id='bSt3'><a onclick='statShow(false,false,false,false,3);' class='nbButton M3 " + (stTurCupGes === 3 ? ' ui-btn-active' : '') + (STAT.MAXSPIELE[3] ? '' : ' ui-disabled') + "'>" + tZuletzt + "</a></li>"
                        + "<li class=nb26 id='bSt0'><a onclick='statShow(false,false,false,false,0);' class='nbButton M3 " + (stTurCupGes === 0 ? ' ui-btn-active' : '') + (STAT.MAXSPIELE[0] ? '' : ' ui-disabled') + "'>Gesamt</a></li>"
                        + "<li class=nb11 id='bSt99'><a onclick='showNavbarExt();Deactivate(this);' class='nbButton M3'>...</a></li>"
                        + "</ul>"
                        + "</div>"
                        + "</div>"
                        + "<div id=stBody>"
                        + html
                        + "</div>"
                        ).trigger('create').show(setFont);
            }
        } else {
            $('#SP1').html(html).trigger('create').show(setFont);
        }
        window.scrollTo(0, 0);
    }
    $("#sortUndLayout").hide();

    if (pRunde) {
        $("#stRunde2,#stRunde3,#stOptWann").buttonMarkup({theme: 'a'});
        if (pRunde === 2) {
            Deactivate("#stRunde2");
            $("#stRunde2").buttonMarkup({theme: 'c'});
        } else if (pRunde === 3) {
            Deactivate("#stRunde3");
            $("#stRunde3").buttonMarkup({theme: 'c'});
        }
    }

    html = '';
    monthsOfYear = ["J" + eval('"\\u00e4"') + "nner", "Februar", "M" + eval('"\\u00e4"') + "rz", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];

    if (pStat === 10) {
        writeCanvas('Anmeldungen');
    } else if (SORT.length < 3) { // Auf der Stockerlliste sind eventuell nur 3 Spieler
        writeCanvas('Keine Daten!');
    } else if (stStat <= 1) {
        if (stTurCupGes === 0) {
            writeCanvas('Gesamtwertung ' + (CUPS.TURNIER[stCup] && stStat === 1 ? 'D60 ' : ''));
        } else if (stTurCupGes === 1) {
            writeCanvas('Cupwertung ' + (CUPS.TURNIER[stCup] && stStat === 1 ? 'D60 ' : '') + (heute.getFullYear()));
        } else if (stTurCupGes === 2) {
            writeCanvas('Cupwertung ' + (CUPS.TURNIER[stCup] && stStat === 1 ? 'D60 ' : '') + (heute.getFullYear() - 1));
        } else if (stTurCupGes === 3) {
            if (CUPS.TURNIER[stCup]) {
                if (stSort.indexOf('TIS') === 0) {
                    writeCanvas(pRunde + '. Runde, ' + daysOfWeek[stTIMESTAMP.getDay()] + " " + stTIMESTAMP.getDate() + ". " + monthsOfYear[stTIMESTAMP.getMonth()] + ' ' + stTIMESTAMP.getFullYear(),
                            pRunde + '. Runde  ' + stTIMESTAMP.getFullYear() + '-' + ('0' + (stTIMESTAMP.getMonth() + 1)).substr(-2) + '-' + ('0' + (stTIMESTAMP.getDate())).substr(-2));
                } else {
                    writeCanvas((stCup === 30 ? 'Einzelwertung ' : 'Turnier ') + (stStat === 1 ? 'D60  ' : ' ') + daysOfWeek[stTIMESTAMP.getDay()] + " " + stTIMESTAMP.getDate() + ". " + monthsOfYear[stTIMESTAMP.getMonth()] + ' ' + stTIMESTAMP.getFullYear(),
                            (stCup === 30 ? 'Einzelwertung ' : 'Turnier ') + (stStat === 1 ? 'D60  ' : ' ') + stTIMESTAMP.getFullYear() + '-' + ('0' + (stTIMESTAMP.getMonth() + 1)).substr(-2) + '-' + ('0' + (stTIMESTAMP.getDate())).substr(-2));
                }
            } else {
                writeCanvas('Tageswertung  ' + daysOfWeek[stTIMESTAMP.getDay()] + " " + stTIMESTAMP.getDate() + ". " + monthsOfYear[stTIMESTAMP.getMonth()],
                        'Tageswertung  ' + stTIMESTAMP.getFullYear() + '-' + ('0' + (stTIMESTAMP.getMonth() + 1)).substr(-2) + '-' + ('0' + (stTIMESTAMP.getDate())).substr(-2));
            }
        } else {
            if (stStat === -1 && CUPS.TURNIER[stCup]) {
                writeCanvas('Cupwertung ' + (2010 + stTurCupGes));
            } else {
                writeCanvas('Tarockquotient ' + (2010 + stTurCupGes));
            }
        }
    } else {
        var hTitel = '';
        if (stStat === 2) {
            hTitel = 'Stockerlliste';
        } else if (stStat === 3) {
            hTitel = 'Gewinner';
        } else if (stStat === 4) {
            hTitel = 'Verlierer';
        } else if (stStat === 5) {
            hTitel = 'Vielspieler';
        } else if (stStat === 6) {
            hTitel = 'Wenigspieler';
        } else if (stStat === 7) {
            hTitel = '3er-Liste';
        } else if (stStat === 8) {
            hTitel = 'Die Positiven';
        } else if (stStat === 9) {
            hTitel = 'Tischliste';
        } else if (stStat === 10) {
            hTitel = 'Anmeldungen';
        } else {
            hTitel = '???';
        }
        if (stTurCupGes === 0) {
            writeCanvas(hTitel + '  (gesamt)');
        } else if (stTurCupGes === 1) {
            writeCanvas(hTitel + '  ' + (heute.getFullYear()));
        } else if (stTurCupGes === 2) {
            writeCanvas(hTitel + '  ' + (heute.getFullYear() - 1));
        } else {
            writeCanvas(hTitel + '  ' + daysOfWeek[stTIMESTAMP.getDay()] + " " + stTIMESTAMP.getDate() + ". " + monthsOfYear[stTIMESTAMP.getMonth()],
                    hTitel + '  ' + stTIMESTAMP.getFullYear() + '-' + ('0' + (stTIMESTAMP.getMonth() + 1)).substr(-2) + '-' + ('0' + (stTIMESTAMP.getDate())).substr(-2));
        }
    }

    stHeader = true;

}