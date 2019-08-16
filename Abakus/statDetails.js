/* global LS, stCup, CUPS, stDetTurCupGes, STAT, stDetI, aDET, stTurCupGes, stDetOption, stAnzSpalten, QUERFORMAT(), stGruppiert, stOption, stKolonne, stStat, statDiagramm, setFont, stIndME */

function showDetailStat(pInd) {
    'use strict';

    stKolonne++;
    stDetTurCupGes[0] = stTurCupGes;
    stDetTurCupGes[stKolonne] = stTurCupGes;
    stDetOption   [stKolonne] = stOption;

    lastOption = stOption;

    showDetailStat2(stKolonne, pInd, true);
}

function showDetailStat2(pKolonne, pI, pNeu, pAkt) {
    'use strict';

    if (stDetI[pKolonne] !== pI) {
        stDetI[pKolonne] = pI;
        if (stAnzSpalten !== 1) {

            if (pNeu || pAkt) {
                $('.L0').removeClass('B');
                $('#L0P' + pI).addClass('B');

                $('.Z0').addClass('cBlau');
                $('#Z0P' + pI).removeClass('cBlau');
            }

            if (stIndME) {
                if (STAT.S[aDET[stDetI[pKolonne]]].NR === LS.ME) {
                    $('#L0P' + stIndME).removeClass('bBeige');
                } else {
                    $('#L0P' + stIndME).removeClass('bBeige').addClass('bBeige');
                }
            }

            $('.cFreund').removeClass('bBeige2').addClass('bBeige2');
            for (var ii = 0; ii < LS.Freunde.length; ii++) {
                if (STAT.S[aDET[stDetI[pKolonne]]].NR === LS.Freunde[ii]) {
                    $('#L0P' + stDetI[pKolonne]).removeClass('bBeige2');
                }
            }
            if (LS.tempVIPs) {
                if (LS.tempVIPs.indexOf(STAT.S[i].NR)) {
                    hBackground = ' cFreund bBeige2';
                }
            }
        }
    }

    var monthsOfYear = ["J&auml;n.", "Feb.", "M&auml;rz", "Apr.", "Mai", "Juni", "Juli", "Aug.", "Sep.", "Okt.", "Nov.", "Dez."];
    if (STAT.ZULETZT.getDate() >= 20) {
        var tZuletzt = STAT.ZULETZT.getDate() + "." + monthsOfYear[STAT.ZULETZT.getMonth()];
    } else {
        var tZuletzt = STAT.ZULETZT.getDate() + ". " + monthsOfYear[STAT.ZULETZT.getMonth()];
    }
    var heute = new Date();

    var html = '';
    if ($(window).innerWidth() < $(window).innerHeight()
            || stAnzSpalten === 1) {
        html += "<div data-role='header' data-position='fixed' class='L' style='position: fixed; top: 0; width: 100%; padding:0px; margin:0px'>"
                + "<div data-role=navbar class='noprint'>"
                + "<ul>"
                + "<li class=nb18 id='bSt2'><a onclick='statShow(false,false,true,false,2);' class = 'M3" + (stTurCupGes === 2 ? ' ui-btn-active' : '') + (STAT.MAXSPIELE[2] ? '' : ' ui-disabled') + "'>" + (heute.getFullYear() - 1) + "</a></li>"
                + "<li class=nb18 id='bSt1'><a onclick='statShow(false,false,true,false,1);' class = 'M3" + (stTurCupGes === 1 ? ' ui-btn-active' : '') + (STAT.MAXSPIELE[1] ? '' : ' ui-disabled') + "'>" + heute.getFullYear() + "</a></li>"
                + "<li class=nb26 id='bSt3'><a onclick='statShow(false,false,true,false,3);' class = 'M3" + (stTurCupGes === 3 ? ' ui-btn-active' : '') + (STAT.MAXSPIELE[3] ? '' : ' ui-disabled') + "'>" + tZuletzt + "</a></li>"
                + "<li class=nb26 id='bSt0'><a onclick='statShow(false,false,true,false,0);' class = 'M3" + (stTurCupGes === 0 ? ' ui-btn-active' : '') + (STAT.MAXSPIELE[0] ? '' : ' ui-disabled') + "'>Gesamt</a></li>"
                + "<li class=nb12><a onclick='" + '$("#hilfeText").toggle("show");Deactivate(this);' + "' class='M3 ui-disabled'>?</a></li>"
                + "</ul>"
                + "</div>"
                + "<div data-role=navbar>"
                + "<ul>"
                + "<li class=nb13 id=bZruck><a onclick='stDetTurCupGes[" + pKolonne + "]=stDetTurCupGes[" + pKolonne + "];showDetailStat2(" + pKolonne + "," + (pI - 1) + ",false,true);' class=" + ((stDetI[pKolonne] === 0 || (stDetI[pKolonne] === 1 && !CUPS.TURNIER[stCup]) || pKolonne !== stKolonne) ? "'ui-disabled M3'" : "M3") + ">&lt;</a></li>"
                + "<li class=nb74><a onclick='Deactivate(this);' id=stDet" + pKolonne + " class='ui-btn-c M3'>" + [stDetI[pKolonne]] + ". " + getName(aDET[stDetI[pKolonne]], 99) + '</a></li>'
                + "<li class=nb13 id=bVorw><a onclick='stDetTurCupGes[" + pKolonne + "]=stDetTurCupGes[" + pKolonne + "];showDetailStat2(" + pKolonne + "," + (pI + 1) + ",false,true);' class=" + ((stDetI[pKolonne] === (aDET.length - 1) || pKolonne !== stKolonne) ? "'ui-disabled M3'" : "M3") + ">&gt;</a></li>"
                + "</ul>"
                + "</div>"
                + "</div>"
                + "<div id=SP1>";
    } else if (stAktSpalten === 1 && stAnzSpalten > 1) {
        html += "<div data-role='header' data-position='fixed' class='L' style='position: fixed; top: 0; width: 100%; padding:0px; margin:0px'>"
                + "<div data-role=navbar class='noprint'>"
                + "<ul>"
                + "<li class=nb20 id='bSt2'><a onclick='statShow(false,false,true,false,2);' class = 'M3" + (stTurCupGes === 2 ? ' ui-btn-active' : '') + (STAT.MAXSPIELE[2] ? '' : ' ui-disabled') + "'>" + (heute.getFullYear() - 1) + "</a></li>"
                + "<li class=nb20 id='bSt1'><a onclick='statShow(false,false,true,false,1);' class = 'M3" + (stTurCupGes === 1 ? ' ui-btn-active' : '') + (STAT.MAXSPIELE[1] ? '' : ' ui-disabled') + "'>" + heute.getFullYear() + "</a></li>"
                + "<li class=nb28 id='bSt3'><a onclick='statShow(false,false,true,false,3);' class = 'M3" + (stTurCupGes === 3 ? ' ui-btn-active' : '') + (STAT.MAXSPIELE[3] ? '' : ' ui-disabled') + "'>" + tZuletzt + "</a></li>"
                + "<li class=nb20 id='bSt0'><a onclick='statShow(false,false,true,false,0);' class = 'M3" + (stTurCupGes === 0 ? ' ui-btn-active' : '') + (STAT.MAXSPIELE[0] ? '' : ' ui-disabled') + "'>Ges.</a></li>"
                + "<li class=nb12><a onclick='" + '$("#hilfeText").toggle("show");Deactivate(this);' + "' class='M3'>?</a></li>"
                + "</ul>"
                + "</div>"
                + "</div>"
                + $('#stBody').html();
        $('#stMain').html(html + "</div>").trigger('create', setFont);
        html = '';
    }

    html += '<div class=M>';
    var heute = new Date();
    var tZuletzt = new Date(STAT.ZULETZT).getDate() + ". " + monthsOfYear[new Date(STAT.ZULETZT).getMonth()];

    if (stAnzSpalten === 1) {
        html += getSortUndLayout();
    }
    if ($(window).innerWidth() >= $(window).innerHeight()
            && stAnzSpalten !== 1) {
        html += "<div data-role=navbar>"
                + "<ul>"
                + "<li><a onclick='Deactivate(this);' id=stDet" + pKolonne + " class='ui-btn-c M3'>" + getName(aDET[stDetI[pKolonne]], 99) + '</a></li>'
                + "</ul>"
                + "</div>";
    }

    html += htmlUebersicht(pKolonne, pI);
    if (CUPS.TURNIER[stCup]) {
        html = html
                + "<div data-role=navbar class='noprint'>"
                + "<ul>"
                + "<li><a onclick='stOption=2;stDetOption[" + pKolonne + "]=2;showDetailStat3(" + pKolonne + ");' class='M3" + (stOption === 2 ? ' ui-btn-active' : '') + "'>Spiele</a></li>"
                + "<li><a onclick='stOption=3;stDetOption[" + pKolonne + "]=3;showDetailStat3(" + pKolonne + ");' class='M3" + (stOption === 3 ? ' ui-btn-active' : '') + "'>Punkte</a></li>"
                + "<li><a onclick='stOption=1;stDetOption[" + pKolonne + "]=1;showDetailStat3(" + pKolonne + ");' class='M3" + (stOption === 1 ? ' ui-btn-active' : '') + "'>D60</a></li>"
                + "</ul>"
                + "</div>";
    } else {
        stOption = 1;
        stDetOption[pKolonne] = 1;
    }

    html = html + "<div id=Kolonne" + pKolonne + "></div></div>";

    if ($(window).innerWidth() < $(window).innerHeight()
            || stAnzSpalten === 1) {
        $('#stMain').html(html + "</div>").trigger('create');
    } else if (!pNeu) {
        $('#SP' + (2 + stKolonne - pKolonne)).html(html).trigger('create');
    } else {
        var orgSpalten = stAktSpalten;
        if (stAktSpalten !== stAnzSpalten) {
            stAktSpalten++;
            if (stAktSpalten > stAnzSpalten) {
                stAktSpalten = stAnzSpalten;
                $('#SP3,#SP4').css('width', '0%').hide();
            }
            $('#SP2').css('width', '0%').hide();
            if (stAktSpalten === 2) {
                if (stStat === 8) {
                    $("#SP1").animate({width: '50%'}, 200, statDiagramm);
                } else {
                    $("#SP1").animate({width: '50%'}, 200);
                }
            } else if (stAktSpalten === 3) {
                if (stStat === 8) {
                    $("#SP1").animate({width: '40%'}, 200, statDiagramm);
                } else {
                    $("#SP1").animate({width: '40%'}, 200);
                }
                $('#SP3').css('width', '30%');
            } else if (stAktSpalten === 4) {
                if (stStat === 8) {
                    $("#SP1").animate({width: '28%'}, 200, statDiagramm);
                } else {
                    $("#SP1").animate({width: '28%'}, 200);
                }
                $('#SP3').css('width', '24%');
                $('#SP4').css('width', '24%');
            }
        }
        if (stAktSpalten >= 4) {
            $('#SP4').html($('#SP3').html()).trigger('create').show();
        }
        if (stAktSpalten >= 3) {
            $('#SP3').html($('#SP2').html()).trigger('create').show();
        }

        $('#SP2').html(html).trigger('create').show();

        if (orgSpalten !== stAktSpalten) {
            if (stAktSpalten === 2) {
                $("#SP2").animate({width: '50%'}, 200);
            } else if (stAktSpalten === 3) {
                $("#SP2").animate({width: '30%'}, 200);
            } else if (stAktSpalten === 4) {
                $("#SP2").animate({width: '24%'}, 200);
            }
        }
    }

    if (stAnzSpalten !== 1) {
        $.mobile.silentScroll(0);
    }
    showDetailStat3(pKolonne, pI);
}

function htmlUebersicht(pKolonne, pI) {
    'use strict';
    var D60, GesPunkte;

    var fDatum;
    var monthsOfYear = ["J&auml;n.", "Feb.", "M&auml;rz", "Apr.", "Mai", "Juni", "Juli", "Aug.", "Sep.", "Okt.", "Nov.", "Dez."];

    var html = '';
    var hPeriode = '';
    var hZeile = '';

    html = "<table id=uTab data-role='table' data-mode='columntoggle' class='ui-body-d ui-shadow table-stripe ui-responsive' data-column-btn-text='' >"
            + "<thead>"
            + "<tr class='bGrau M'><th></th><th class=TC>" + (CUPS.TURNIER[STAT.I] ? 'Stockerl' : '') + "</th><th colspan=3 class=TC>&nbsp;&nbsp;&nbsp;Punkte</th><th class=TR>Anz</th></tr>"
            + "<tr class='bGrau M'><th></th><th class=TC>" + (CUPS.TURNIER[STAT.I] ? 'pl&auml;tze' : '') + "</th><th class=TR>Cup</th><th class=TR>D60</th><th class=TR>Ges.</th><th class=TR>&nbsp;Sp</th></tr>"
            + "</thead>"
            + "<tbody>";

    if (typeof STAT.S[aDET[stDetI[pKolonne]]].SPIELE[3] === 'number') {
        if (STAT.S[aDET[stDetI[pKolonne]]].SPIELE[3] > 0) {
            STAT.ZULETZT = new Date(STAT.ZULETZT);
            fDatum = STAT.ZULETZT.getDate() + "." + monthsOfYear[STAT.ZULETZT.getMonth()];
            D60 = Math.round(STAT.S[aDET[stDetI[pKolonne]]].PUNKTE[3] * 60 / STAT.S[aDET[stDetI[pKolonne]]].SPIELE[3]);
            GesPunkte = Math.round(getCupPunkte(aDET[stDetI[pKolonne]], 3));
            if (GesPunkte < 0) {
                GesPunkte = '';
            }
            if (stDetTurCupGes[pKolonne] === 3) {
                hZeile = ' class="B"';
                hPeriode = '';
            } else {
                hZeile = '';
                hPeriode = ' class="cBlau P"';
            }
            hZeile = hZeile + ' onclick="stDetTurCupGes[' + pKolonne + ']=3;showDetailStat2(' + pKolonne + ',' + pI + ');"';
            if (STAT.S[aDET[stDetI[pKolonne]]].NR === '0000') {
                html = html + '<tr' + hZeile + '><th' + hPeriode + '>&nbsp;' + fDatum + '</th><td></td><td></td><td></td><td></td><td class=TR>' + STAT.S[aDET[stDetI[pKolonne]]].SPIELE[3] + '</td></tr>';
            } else {
                if (CUPS.TURNIER[stCup]) {
                    html = html + '<tr' + hZeile + '><th' + hPeriode + '>&nbsp;' + fDatum + '</th><td class=TC>' + STAT.S[aDET[stDetI[pKolonne]]].STOCKERL[3] + '</td><td class=TR>' + GesPunkte + '</td><td class=TR>' + D60 + '</td><td class=TR>' + STAT.S[aDET[stDetI[pKolonne]]].PUNKTE[3] + '</td><td class=TR>' + STAT.S[aDET[stDetI[pKolonne]]].SPIELE[3] + '</td></tr>';
                } else {
                    html = html + '<tr' + hZeile + '><th' + hPeriode + '>&nbsp;' + fDatum + '</th><td></td><td class=TR>' + GesPunkte + '</td><td class=TR>' + D60 + '</td><td class=TR>' + STAT.S[aDET[stDetI[pKolonne]]].PUNKTE[3] + '</td><td class=TR>' + STAT.S[aDET[stDetI[pKolonne]]].SPIELE[3] + '</td></tr>';
                }
            }
        }
    }

    if (typeof STAT.S[aDET[stDetI[pKolonne]]].SPIELE[1] === 'number') {
        if (STAT.S[aDET[stDetI[pKolonne]]].SPIELE[1] > 0) {
            D60 = Math.round(STAT.S[aDET[stDetI[pKolonne]]].PUNKTE[1] * 60 / STAT.S[aDET[stDetI[pKolonne]]].SPIELE[1]);
            GesPunkte = Math.round(getCupPunkte(aDET[stDetI[pKolonne]], 1));
            if (GesPunkte < 0) {
                GesPunkte = '';
            }
            if (stDetTurCupGes[pKolonne] === 1) {
                hZeile = ' class="B"';
                hPeriode = '';
            } else {
                hZeile = '';
                hPeriode = ' class="cBlau P"';
            }
            hZeile = hZeile + ' onclick="stDetTurCupGes[' + pKolonne + ']=1;showDetailStat2(' + pKolonne + ',' + pI + ');"';
            if (STAT.S[aDET[stDetI[pKolonne]]].NR === '0000') {
                html = html + '<tr' + hZeile + '><th' + hPeriode + '>&nbsp;' + new Date().getFullYear() + '</th><td></td><td></td><td></td><td></td><td class=TR>' + STAT.S[aDET[stDetI[pKolonne]]].SPIELE[1] + '</td></tr>';
            } else {
                if (CUPS.TURNIER[stCup]) {
                    html = html + '<tr' + hZeile + '><th' + hPeriode + '>&nbsp;' + new Date().getFullYear() + '</th><td class=TC>' + STAT.S[aDET[stDetI[pKolonne]]].STOCKERL[1] + '</td><td class=TR>' + GesPunkte + '</td><td class=TR>' + D60 + '</td><td class=TR>' + STAT.S[aDET[stDetI[pKolonne]]].PUNKTE[1] + '</td><td class=TR>' + STAT.S[aDET[stDetI[pKolonne]]].SPIELE[1] + '</td></tr>';
                } else {
                    html = html + '<tr' + hZeile + '><th' + hPeriode + '>&nbsp;' + new Date().getFullYear() + '</th><td class=TC></td><td class=TR>' + GesPunkte + '</td><td class=TR>' + D60 + '</td><td class=TR>' + STAT.S[aDET[stDetI[pKolonne]]].PUNKTE[1] + '</td><td class=TR>' + STAT.S[aDET[stDetI[pKolonne]]].SPIELE[1] + '</td></tr>';
                }
            }
        }
    }

    if (typeof STAT.S[aDET[stDetI[pKolonne]]].SPIELE[2] === 'number') {
        if (STAT.S[aDET[stDetI[pKolonne]]].SPIELE[2] > 0) {
            D60 = Math.round(STAT.S[aDET[stDetI[pKolonne]]].PUNKTE[2] * 60 / STAT.S[aDET[stDetI[pKolonne]]].SPIELE[2]);
            GesPunkte = Math.round(getCupPunkte(aDET[stDetI[pKolonne]], 2));
            if (GesPunkte < 0) {
                GesPunkte = '';
            }
            if (stDetTurCupGes[pKolonne] === 2) {
                hZeile = ' class="B"';
                hPeriode = '';
            } else {
                hZeile = '';
                hPeriode = ' class="cBlau P"';
            }
            hZeile = hZeile + ' onclick="stDetTurCupGes[' + pKolonne + ']=2;showDetailStat2(' + pKolonne + ',' + pI + ');"';
            if (STAT.S[aDET[stDetI[pKolonne]]].NR === '0000') {
                html = html + '<tr' + hZeile + '><th' + hPeriode + '>&nbsp;' + (new Date().getFullYear() - 1) + '</th><td></td><td></td><td></td><td></td><td class=TR>' + STAT.S[aDET[stDetI[pKolonne]]].SPIELE[2] + '</td></tr>';
            } else {
                if (CUPS.TURNIER[stCup]) {
                    html = html + '<tr' + hZeile + '><th' + hPeriode + '>&nbsp;' + (new Date().getFullYear() - 1) + '</th><td class=TC>' + STAT.S[aDET[stDetI[pKolonne]]].STOCKERL[2] + '</td><td class=TR>' + GesPunkte + '</td><td class=TR>' + D60 + '</td><td class=TR>' + STAT.S[aDET[stDetI[pKolonne]]].PUNKTE[2] + '</td><td class=TR>' + STAT.S[aDET[stDetI[pKolonne]]].SPIELE[2] + '</td></tr>';
                } else {
                    html = html + '<tr' + hZeile + '><th' + hPeriode + '>&nbsp;' + (new Date().getFullYear() - 1) + '</th><td class=TC></td><td class=TR>' + GesPunkte + '</td><td class=TR>' + D60 + '</td><td class=TR>' + STAT.S[aDET[stDetI[pKolonne]]].PUNKTE[2] + '</td><td class=TR>' + STAT.S[aDET[stDetI[pKolonne]]].SPIELE[2] + '</td></tr>';
                }
            }
        }
    }

    D60 = Math.round(STAT.S[aDET[stDetI[pKolonne]]].PUNKTE[0] * 60 / STAT.S[aDET[stDetI[pKolonne]]].SPIELE[0]);
    GesPunkte = Math.round(getCupPunkte(aDET[stDetI[pKolonne]], 0));
    if (GesPunkte < 0) {
        GesPunkte = '';
    }
    if (stDetTurCupGes[pKolonne] === 0) {
        hZeile = ' class="B"';
        hPeriode = '';
    } else {
        hZeile = '';
        hPeriode = ' class="cBlau P"';
    }
    hZeile = hZeile + ' onclick="stDetTurCupGes[' + pKolonne + ']=0;showDetailStat2(' + pKolonne + ',' + pI + ');"';
    if (STAT.S[aDET[stDetI[pKolonne]]].NR === '0000') {
        html = html + '<tr' + hZeile + '><th' + hPeriode + '>&nbsp;Gesamt</th><td></td><td></td><td></td><td></td><td class=TR>' + STAT.S[aDET[stDetI[pKolonne]]].SPIELE[0] + '</td></tr>';
    } else {
        if (CUPS.TURNIER[stCup]) {
            html = html + '<tr' + hZeile + '><th' + hPeriode + '>&nbsp;Ges.</th><td class=TC>' + STAT.S[aDET[stDetI[pKolonne]]].STOCKERL[0] + '</td><td class=TR>' + GesPunkte + '</td><td class=TR>' + D60 + '</td><td class=TR>' + STAT.S[aDET[stDetI[pKolonne]]].PUNKTE[0] + '</td><td class=TR>' + STAT.S[aDET[stDetI[pKolonne]]].SPIELE[0] + '</td></tr>';
        } else {
            html = html + '<tr' + hZeile + '><th' + hPeriode + '>&nbsp;Gesamt</th><td class=TC></td><td class=TR>' + GesPunkte + '</td><td class=TR>' + D60 + '</td><td class=TR>' + STAT.S[aDET[stDetI[pKolonne]]].PUNKTE[0] + '</td><td class=TR>' + STAT.S[aDET[stDetI[pKolonne]]].SPIELE[0] + '</td></tr>';
        }
    }

    html = html + "</tbody></table>";
    return html;
}

function showDetailStat3(pKolonne, pI) {
    'use strict';

    if (pI) {
        $('.L' + pKolonne).removeClass('B');
        $('#L' + pKolonne + 'P' + pI).addClass('B');

        $('.Z' + pKolonne).addClass('cBlau');
        $('#Z' + pKolonne + 'P' + pI).removeClass('cBlau P');
    }

    var html = '';
    if (stDetOption[pKolonne] === 4 && STAT.S[aDET[stDetI[pKolonne]]].NR === '0000') {
        var hOption = 1;
    } else {
        var hOption = stDetOption[pKolonne];
    }
    if (hOption === 1) {
        if (STAT.S[aDET[stDetI[pKolonne]]].NR === '0000') {
            html = html + htmlText0000(pKolonne);
            $('#Kolonne' + pKolonne).html(html).trigger('create');
        } else {
            html = html + "<div id='dContainer" + pKolonne + "'></div><div id=dFiller><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></div><div id=dText" + pKolonne + " style='margin:0.4em;'></div>";
            $('#Kolonne' + pKolonne).html(html).trigger('create');
            dispChart(pKolonne, aDET[stDetI[pKolonne]]);
        }
    } else if (hOption === 2) {
        html = html + htmlSpielePunkte(pKolonne, true);
        $('#Kolonne' + pKolonne).html(html).trigger('create');
        setTimeout(function () {
            showGauge(STAT.S[aDET[stDetI[pKolonne]]].ANZSPIELE[stDetTurCupGes[pKolonne]][20],
                    anzGewonnen,
                    STAT.S[aDET[stDetI[pKolonne]]].ANZSPIELE[stDetTurCupGes[pKolonne]][0] - anzGewonnen,
                    anzSpPyr,
                    pKolonne);
        });
    } else if (hOption === 3) {
        html = html + htmlSpielePunkte(pKolonne);
        $('#Kolonne' + pKolonne).html(html).trigger('create');
    }

    if (hOption !== 1) {
        $(".cBeige").attr('style', 'background:#FFb;');
    }
}

function htmlText(pKolonne) {
    'use strict';
    var hName, hWann;
    var monthsOfYear = ["J&auml;n.", "Feb.", "M&auml;rz", "Apr.", "Mai", "Juni", "Juli", "Aug.", "Sep.", "Okt.", "Nov.", "Dez."];

    var html = '';

    if (stDetTurCupGes[pKolonne] === 0) {
        hWann = 'insgesamt';
    } else if (stDetTurCupGes[pKolonne] === 1) {
        hWann = new Date().getFullYear();
    } else if (stDetTurCupGes[pKolonne] === 2) {
        hWann = new Date().getFullYear() - 1;
    } else if (stDetTurCupGes[pKolonne] === 3) {
        STAT.ZULETZT = new Date(STAT.ZULETZT);
        hWann = 'am ' + STAT.ZULETZT.getDate() + ". " + monthsOfYear[STAT.ZULETZT.getMonth()];
    }

    hName = STAT.S[aDET[stDetI[pKolonne]]].VNAME.trim() + ' ' + STAT.S[aDET[stDetI[pKolonne]]].NNAME[0] + '.' + STAT.S[aDET[stDetI[pKolonne]]].STERNE;

    var hSpiele = STAT.S[aDET[stDetI[pKolonne]]].SPIELE[stDetTurCupGes[pKolonne]];
    if (hSpiele === 0) {
        html = "<div id='dContainer'></div><div ystyle='margin:0.4em;'>";
        html = hName + " hat " + hWann + " nicht gespielt.<br>";
    } else {
        var hPunkte = STAT.S[aDET[stDetI[pKolonne]]].PUNKTE[stDetTurCupGes[pKolonne]];
        var hJeSpiel = Math.round(hPunkte / hSpiele * 100) / 100;
        var hJeSpielL = parseInt(hJeSpiel);
        var hJeSpielR = Math.abs(parseInt((hJeSpiel - hJeSpielL) * 100));
        var hD60 = Math.round(hPunkte * 60 / hSpiele * 100) / 100;
        var hD60Rund = Math.round(hPunkte * 60 / hSpiele);
        var hProz = Math.round(hSpiele / (STAT.MAXSPIELE[stDetTurCupGes[pKolonne]] / 100) * 100) / 100;
        var hFehlProz = Math.round((CUPS.VOLLAB[stCup][stDetTurCupGes[pKolonne]] - hProz) * 100) / 100;

        html = "<table data-role='table' data-mode='columntoggle' class='ui-body-d ui-shadow table-stripe ui-responsive' data-column-btn-text=''>"
                + "<thead>"
                + "<tr class='bGrau M'><th colspan=4 class=TC>Berechnung der D60-Punkte:</th></tr>"
                + "</thead>"
                + "<tbody>"
                + "<tr><td class=TR>" + hSpiele + "&nbsp;&nbsp;</td><td>Spiele</td><td class=TR>" + hPunkte + "</td><td>&nbsp;&nbsp;Punkte</td></tr>"
                + "<tr><td class=TR>1&nbsp;&nbsp;</td><td>Spiel</td><td class=TR>" + hJeSpielL + "</td><td>," + hJeSpielR + "&nbsp;&nbsp;Punkte</td></tr>"
                + "<tr><td class=TR>60&nbsp;&nbsp;</td><td>Spiele</td><th class=TR>" + hD60Rund + "</th><th>&nbsp;&nbsp;D60-Punkte</th></tr>"
                + "</tbody></table><br>";

        if (hPunkte >= 0 && hProz < CUPS.VOLLAB[stCup][stDetTurCupGes[pKolonne]]) {
            html = html
                    + "<table data-role='table' data-mode='columntoggle' class='ui-body-d ui-shadow table-stripe ui-responsive' data-column-btn-text=''>"
                    + "<thead>"
                    + "<tr class='bGrau M'><th colspan=4 class=TC>Berechnung der Abz&uuml;ge:</th></tr>"
                    + "</thead>"
                    + "<tbody>"
                    + "<tr><td>Maximal</td><td class=TR>" + STAT.MAXSPIELE[stDetTurCupGes[pKolonne]] + "</td><td>&nbsp;&nbsp;Spiele</td><td class=TR>100 %</td></tr>"
                    + "<tr><td>Soll</td><td class=TR>" + Math.round((STAT.MAXSPIELE[stTurCupGes] * CUPS.VOLLAB[stCup][stTurCupGes] / 100) + 0.5) + "</td><td>&nbsp;&nbsp;Spiele</td><td class=TR>" + CUPS.VOLLAB[stCup][stDetTurCupGes[pKolonne]] + " %</td></tr>"
                    + "<tr><td>gespielt</td><td class=TR>" + hSpiele + "</td><td>&nbsp;&nbsp;Spiele</td><td class=TR nowrap>" + hProz + " %</td></tr>";
            if (hFehlProz > 0) {
                html = html
                        + "<tr><td>es fehlen</td><td class=TR>" + (Math.round((STAT.MAXSPIELE[stTurCupGes] * CUPS.VOLLAB[stCup][stTurCupGes] / 100) + 0.5) - hSpiele) + "</td><td>&nbsp;&nbsp;Spiele</td><td class=TR nowrap>" + hFehlProz + " %</td></tr>"
                        + "<tr><th>Abz&uuml;ge</th><td class=TR>2 x</td><td nowrap>&nbsp;&nbsp;" + hFehlProz + " %</td><th class=TR nowrap>" + (hFehlProz >= 50 ? (parseInt(hFehlProz * 20) / 10) : (hFehlProz * 2)) + " %</th></tr>";
            } else {
                html = html
                        + "<tr><td>Mehrspiele</td><td class=TR>" + ((Math.round((STAT.MAXSPIELE[stTurCupGes] * CUPS.VOLLAB[stCup][stTurCupGes] / 100) + 0.5) - hSpiele) * -1) + "</td><td>&nbsp;&nbsp;Spiele</td><td class=TR nowrap>" + (hFehlProz * -1) + " %</td></tr>"
                        + "<tr><th>Abz&uuml;ge</th><td class=TR></td><td class=TR></td><th class=TR>0.00 %</th></tr>";
            }
            html = html + "</tbody></table><br>";
        }

        if (hPunkte < 0) {
            html = html
                    + "<table data-role='table' data-mode='columntoggle' class='ui-body-d ui-shadow ctable-stripe ui-responsive' data-column-btn-text=''>"
                    + "<thead>"
                    + "<tr class='bGrau M'><th class=TC>Berechnung der Cuppunkte:</th></tr>"
                    + "</thead>"
                    + "<tbody class=M>"
                    + "<tr><td class=TC>Wegen negativer Punktezahl</td></tr>"
                    + "<tr><td class=TC>gibt es keine Cuppunkte.</td></tr>";
        } else if (hProz >= CUPS.VOLLAB[stCup][stDetTurCupGes[pKolonne]]) {
            html = html
                    + "<table data-role='table' data-mode='columntoggle' class='ui-body-d ui-shadow ctable-stripe ui-responsive' data-column-btn-text=''>"
                    + "<thead>"
                    + "<tr class='bGrau M'><th class=TC>Berechnung der Cuppunkte:</th></tr>"
                    + "</thead>"
                    + "<tbody>"
                    + "<tr><td class=TC>Bei <b>" + parseInt(hProz) + "</b>% gespielten Spielen</td></tr>"
                    + "<tr><td class=TC>werden die D60-Punkte</td></tr>"
                    + "<tr><td class=TC>voll angerechnet.</td></tr>";
            if (hD60Rund >= 10) {
                html = html
                        + "<tr><td class=TC><b>" + hName + "</b> darf sich</td></tr>"
                        + "<tr><td class=TC>&uuml;ber <b>" + hD60Rund + " Cuppunkte</b> freuen.</td></tr>";
            } else {
                html = html
                        + "<tr><td class=TC><b>" + hName + "</b> erh&auml;lt <b>" + hD60Rund + " Cuppunkte</b>.</td></tr>";
            }
        } else if (hFehlProz <= 49.99) {
            html = html
                    + "<table data-role='table' data-mode='columntoggle' class='ui-body-d ui-shadow table-stripe ui-responsive' data-column-btn-text=''>"
                    + "<thead>"
                    + "<tr class='bGrau M'><th colspan=5 class=TC>Berechnung der Cuppunkte:</th></tr>"
                    + "</thead>"
                    + "<tbody>"
                    + "<tr><td class=TC> </td><td class=TR>" + hD60Rund + "</td><td>&nbsp;&nbsp;D60-Punkte</td><td class=TC> </td><td class=TR>100 %</td></tr>"
                    + "<tr><td class=TC>-</td><td class=TR>" + (hD60Rund - Math.round((hD60 / 100) * (100 - hFehlProz - hFehlProz))) + "</td><td>&nbsp;&nbsp;Punke Abzug</td><td class=TC>-</td><td class=TR>" + (hFehlProz * 2) + " %</td></tr>"
                    + "<tr><td class=TC>=</td><th class=TR>" + Math.round((hD60 / 100) * (100 - hFehlProz - hFehlProz)) + "</th><th>&nbsp;&nbsp;Cuppunkte</th><td class=TC>=</td><td class=TR>" + Math.round((100 - hFehlProz * 2) * 100) / 100 + " %</td></tr>";
        } else {
            html = html
                    + "<table data-role='table' data-mode='columntoggle' class='ui-body-d ui-shadow ctable-stripe ui-responsive' data-column-btn-text=''>"
                    + "<thead>"
                    + "<tr class='bGrau M'><th class=TC>Berechnung der Cuppunkte:</th></tr>"
                    + "</thead>"
                    + "<tbody>"
                    + "<tr><td class=TC>Da mehr als 100 % Abz&uuml;ge</td></tr>"
                    + "<tr><td class=TC>gibt es f&uuml;r <b>" + hName + "</b></td></tr>"
                    + "<tr><td class=TC>schlanke <b>0 Cuppunkte</b>.</td></tr>";
        }

        html = html + "</tbody></table><br>";
    }
    return html;
}

function htmlText0000(pKolonne) {
    'use strict';
    var hName, hWann, hPer, hWer;
    var monthsOfYear = ["J&auml;n.", "Feb.", "M&auml;rz", "Apr.", "Mai", "Juni", "Juli", "Aug.", "Sep.", "Okt.", "Nov.", "Dez."];

    var html = '';

    if (stDetTurCupGes[pKolonne] === 0) {
        hWann = 'insgesamt';
        hPer = 'Auf der Gesamtwertung';
    } else if (stDetTurCupGes[pKolonne] === 1) {
        hWann = new Date().getFullYear();
        hPer = 'Im Cup';
    } else if (stDetTurCupGes[pKolonne] === 2) {
        hWann = new Date().getFullYear() - 1;
        hPer = 'Im Cup';
    } else if (stDetTurCupGes[pKolonne] === 3) {
        STAT.ZULETZT = new Date(STAT.ZULETZT);
        hWann = 'am ' + STAT.ZULETZT.getDate() + ". " + monthsOfYear[STAT.ZULETZT.getMonth()];
        hPer = 'Beim Turnier';
    }

    hWer = 0;
    for (var ii = 1; ii < STAT.S.length; ii++) {
        if (STAT.MAXSPIELE[stDetTurCupGes[pKolonne]] === STAT.S[ii].SPIELE[stDetTurCupGes[pKolonne]]) {
            hWer = ii;
            break;
        }
    }
    hName = getName(hWer);

    html = "<div style='margin:0.4em;'>"
            + "Mit " + STAT.MAXSPIELE[stDetTurCupGes[pKolonne]] + " Spielen war <b>" + hName + "</b>  " + hWann + " der/die fleiÃŸigste Spieler/in.<br>"
            + hPer + " werden die Cuppunkte ab " + CUPS.VOLLAB[stCup][stDetTurCupGes[pKolonne]] + " Prozent der maximal gespielten Spiele voll gerechnet.<br>"
            + "Somit gibt es ab " + Math.round((STAT.MAXSPIELE[stDetTurCupGes[pKolonne]] * CUPS.VOLLAB[stCup][stDetTurCupGes[pKolonne]] / 100) + 0.5) + " Spielen keine AbzÃ¼ge.<br>"
            + "</div>";

    return html;
}

function htmlSpielePunkte(pKolonne, pGauge) {

    var PROZspiele = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var BTRGcol2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var PROZcol2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    var ii = i = 0;
    var html = '';

    STAT.S[aDET[stDetI[pKolonne]]].ANZSPIELE[stDetTurCupGes[pKolonne]][20] = STAT.S[aDET[stDetI[pKolonne]]].ANZSPIELE[stDetTurCupGes[pKolonne]][0] + STAT.S[aDET[stDetI[pKolonne]]].ANZSPIELE[stDetTurCupGes[pKolonne]][19];
    STAT.S[aDET[stDetI[pKolonne]]].ANZGEWONNEN[stDetTurCupGes[pKolonne]][20] = STAT.S[aDET[stDetI[pKolonne]]].ANZGEWONNEN[stDetTurCupGes[pKolonne]][0] + STAT.S[aDET[stDetI[pKolonne]]].ANZGEWONNEN[stDetTurCupGes[pKolonne]][19];
    STAT.S[aDET[stDetI[pKolonne]]].PKTGEWONNEN[stDetTurCupGes[pKolonne]][20] = STAT.S[aDET[stDetI[pKolonne]]].PKTGEWONNEN[stDetTurCupGes[pKolonne]][0] + STAT.S[aDET[stDetI[pKolonne]]].PKTGEWONNEN[stDetTurCupGes[pKolonne]][19];

    for (var ii = 1; ii <= 18; ii++) {   // is Wichtig !!!
        if (STAT.S[aDET[stDetI[pKolonne]]].ANZSPIELE[stDetTurCupGes[pKolonne]][ii] > 0) {
            PROZspiele[ii] = Math.round(STAT.S[aDET[stDetI[pKolonne]]].ANZSPIELE[stDetTurCupGes[pKolonne]][ii] / (STAT.S[aDET[stDetI[pKolonne]]].ANZSPIELE[stDetTurCupGes[pKolonne]][0] / 100)) + '%';
            if (STAT.S[aDET[stDetI[pKolonne]]].ANZGEWONNEN[stDetTurCupGes[pKolonne]][ii] !== 0) {
                if (stDetOption[pKolonne] === 2) {
                    PROZcol2[ii] = Math.round(STAT.S[aDET[stDetI[pKolonne]]].ANZGEWONNEN[stDetTurCupGes[pKolonne]][ii] / (STAT.S[aDET[stDetI[pKolonne]]].ANZSPIELE[stDetTurCupGes[pKolonne]][ii] / 100)) + '%';
                } else {
                    PROZcol2[ii] = Math.round(STAT.S[aDET[stDetI[pKolonne]]].PKTGEWONNEN[stDetTurCupGes[pKolonne]][ii] / (STAT.S[aDET[stDetI[pKolonne]]].PKTGEWONNEN[stDetTurCupGes[pKolonne]][0] / 100)) + '%';
                }
            } else {
                PROZcol2[ii] = '0%';
            }
        } else {
            PROZspiele[ii] = '-';
            PROZcol2[ii] = '-';
        }
    }
    for (var ii = 0; ii <= 19; ii = ii + 19) {
        if (STAT.S[aDET[stDetI[pKolonne]]].ANZSPIELE[stDetTurCupGes[pKolonne]][ii] > 0) {
            PROZspiele[ii] = Math.round(STAT.S[aDET[stDetI[pKolonne]]].ANZSPIELE[stDetTurCupGes[pKolonne]][ii] / (STAT.S[aDET[stDetI[pKolonne]]].ANZSPIELE[stDetTurCupGes[pKolonne]][20] / 100)) + '%';
            if (STAT.S[aDET[stDetI[pKolonne]]].ANZGEWONNEN[stDetTurCupGes[pKolonne]][ii] !== 0) {
                if (stDetOption[pKolonne] === 2) {
                    PROZcol2[ii] = Math.round(STAT.S[aDET[stDetI[pKolonne]]].ANZGEWONNEN[stDetTurCupGes[pKolonne]][ii] / (STAT.S[aDET[stDetI[pKolonne]]].ANZSPIELE[stDetTurCupGes[pKolonne]][ii] / 100)) + '%';
                } else {
                    PROZcol2[ii] = Math.round(STAT.S[aDET[stDetI[pKolonne]]].PKTGEWONNEN[stDetTurCupGes[pKolonne]][ii] / (STAT.S[aDET[stDetI[pKolonne]]].PKTGEWONNEN[stDetTurCupGes[pKolonne]][20] / 100)) + '%';
                }
            } else {
                PROZcol2[ii] = '0%';
            }
        } else {
            PROZspiele[ii] = '-';
            PROZcol2[ii] = '-';
        }
    }
    for (var ii = 0; ii <= 20; ii++) {
        if (stDetOption[pKolonne] === 2) {
            BTRGcol2[ii] = STAT.S[aDET[stDetI[pKolonne]]].ANZGEWONNEN[stDetTurCupGes[pKolonne]][ii];
        } else {
            BTRGcol2[ii] = STAT.S[aDET[stDetI[pKolonne]]].PKTGEWONNEN[stDetTurCupGes[pKolonne]][ii];
        }
    }

    PROZspiele[20] = '100%';
    if (stDetOption[pKolonne] === 2) {
        PROZcol2[20] = Math.round(STAT.S[aDET[stDetI[pKolonne]]].ANZGEWONNEN[stDetTurCupGes[pKolonne]][20] / (STAT.S[aDET[stDetI[pKolonne]]].ANZSPIELE[stDetTurCupGes[pKolonne]][20] / 100)) + '%';
    } else {
        PROZcol2[0] = '100%';
        PROZcol2[19] = '';
        PROZcol2[20] = '';
    }

    anzGewonnen = BTRGcol2[0];

    if (pGauge) {
        var hHoehe = 0;
        if (QUERFORMAT()) {
            if (stAnzSpalten <= 2) {
                hHoehe = $(window).innerWidth() * 0.4 * 0.367;
            } else {
                hHoehe = $(window).innerWidth() * 0.3 * 0.367;
            }
        } else {
            hHoehe = $(window).innerWidth() * 0.367;
        }
        html += "<div class=ui-grid-a>"
                + "<div class=ui-block-a><div id='container-ges" + pKolonne + "' style='width: 100%; height: " + hHoehe + "px;'></div></div>"
                + "<div class=ui-block-b><div id='container-gew" + pKolonne + "' style='width: 100%; height: " + hHoehe + "px;'></div></div>"
                + "</div>"
                + "<div id='container-pyramid" + pKolonne + "' style='width:100%; height: " + hHoehe + "px; float: left'></div>";
    }

    html += "<div data-role=navbar>"
            + "<ul>"
            + "<li><a onclick='stGruppiert=true ;showDetailStat3(" + pKolonne + ");' class='M3" + (stGruppiert ? ' ui-btn-active' : '') + "'>gruppiert</a></li>"
            + "<li><a onclick='stGruppiert=false;showDetailStat3(" + pKolonne + ");' class='M3" + (!stGruppiert ? ' ui-btn-active' : '') + "'>detailliert</a></li>"
            + "</ul>"
            + "</div>"
            + "<table data-role='table' data-mode='columntoggle' class='ui-body-d ui-shadow table-stripe ui-responsive' data-column-btn-text='' >"
            + "<thead>"
            + "<tr class='bGrau th-groups M'><th>&nbsp;Spiele</th><th colspan='2' class=TC>aktiv</th><th colspan='2' class=TC>" + (stDetOption[pKolonne] === 2 ? "gewonnen" : "Punkte") + "</th></tr>"
            + "</thead>"
            + "<tbody>";

    anzSpPyr = [0, 0, 0, 0, 0];

    function sumGruppe(pInd) {
        'use strict';
        STAT.S[aDET[stDetI[pKolonne]]].ANZSPIELE[stDetTurCupGes[pKolonne]][22] = 0;
        STAT.S[aDET[stDetI[pKolonne]]].ANZGEWONNEN[stDetTurCupGes[pKolonne]][22] = 0;
        STAT.S[aDET[stDetI[pKolonne]]].PKTGEWONNEN[stDetTurCupGes[pKolonne]][22] = 0;
        for (var ii = 0; ii < pInd.length; ii++) {
            STAT.S[aDET[stDetI[pKolonne]]].ANZSPIELE[stDetTurCupGes[pKolonne]][22] +=
                    STAT.S[aDET[stDetI[pKolonne]]].ANZSPIELE[stDetTurCupGes[pKolonne]][pInd[ii]];
            STAT.S[aDET[stDetI[pKolonne]]].ANZGEWONNEN[stDetTurCupGes[pKolonne]][22] +=
                    STAT.S[aDET[stDetI[pKolonne]]].ANZGEWONNEN[stDetTurCupGes[pKolonne]][pInd[ii]];
            STAT.S[aDET[stDetI[pKolonne]]].PKTGEWONNEN[stDetTurCupGes[pKolonne]][22] +=
                    STAT.S[aDET[stDetI[pKolonne]]].PKTGEWONNEN[stDetTurCupGes[pKolonne]][pInd[ii]];
        }

        if (STAT.S[aDET[stDetI[pKolonne]]].ANZSPIELE[stDetTurCupGes[pKolonne]][22] > 0) {
            PROZspiele[22] = Math.round(STAT.S[aDET[stDetI[pKolonne]]].ANZSPIELE[stDetTurCupGes[pKolonne]][22] / (STAT.S[aDET[stDetI[pKolonne]]].ANZSPIELE[stDetTurCupGes[pKolonne]][0] / 100)) + '%';
            if (STAT.S[aDET[stDetI[pKolonne]]].ANZGEWONNEN[stDetTurCupGes[pKolonne]][22] !== 0) {
                if (stDetOption[pKolonne] === 2) {
                    PROZcol2[22] = Math.round(STAT.S[aDET[stDetI[pKolonne]]].ANZGEWONNEN[stDetTurCupGes[pKolonne]][22] / (STAT.S[aDET[stDetI[pKolonne]]].ANZSPIELE[stDetTurCupGes[pKolonne]][22] / 100)) + '%';
                } else {
                    PROZcol2[22] = Math.round(STAT.S[aDET[stDetI[pKolonne]]].PKTGEWONNEN[stDetTurCupGes[pKolonne]][22] / (STAT.S[aDET[stDetI[pKolonne]]].PKTGEWONNEN[stDetTurCupGes[pKolonne]][0] / 100)) + '%';
                }
            } else {
                PROZcol2[22] = '0%';
            }
        } else {
            PROZspiele[22] = '-';
            PROZcol2[22] = '-';
        }

        if (stDetOption[pKolonne] === 2) {
            BTRGcol2[22] = STAT.S[aDET[stDetI[pKolonne]]].ANZGEWONNEN[stDetTurCupGes[pKolonne]][22];
        } else {
            BTRGcol2[22] = STAT.S[aDET[stDetI[pKolonne]]].PKTGEWONNEN[stDetTurCupGes[pKolonne]][22];
        }
    }

    if (stGruppiert) {

        sumGruppe([1, 2, 3, 4, 5, 6]);
        anzSpPyr[2] = STAT.S[aDET[stDetI[pKolonne]]].ANZSPIELE[stDetTurCupGes[pKolonne]][22];
        html += '<tr><th>&nbsp;Rufersp.</th><td class=TR>' + STAT.S[aDET[stDetI[pKolonne]]].ANZSPIELE[stDetTurCupGes[pKolonne]][22] + '</td><td class=TR>' + PROZspiele[22] + '</td><td class=TR>' + BTRGcol2[22] + '</td><td class=TR>' + PROZcol2[22] + '</td></tr>';
        if (STAT.S[aDET[stDetI[pKolonne]]].ANZSPIELE[stDetTurCupGes[pKolonne]][7]) {
            PROZspiele[ 7] = Math.round(STAT.S[aDET[stDetI[pKolonne]]].ANZSPIELE[stDetTurCupGes[pKolonne]][7] / (STAT.S[aDET[stDetI[pKolonne]]].ANZSPIELE[stDetTurCupGes[pKolonne]][22] / 100)) + '%';
            if (stDetOption[pKolonne] === 2) {
                PROZcol2[7] = Math.round(STAT.S[aDET[stDetI[pKolonne]]].ANZGEWONNEN[stDetTurCupGes[pKolonne]][7] / (STAT.S[aDET[stDetI[pKolonne]]].ANZSPIELE[stDetTurCupGes[pKolonne]][7] / 100)) + '%';
            } else {
                PROZcol2[7] = Math.round(STAT.S[aDET[stDetI[pKolonne]]].PKTGEWONNEN[stDetTurCupGes[pKolonne]][7] / (STAT.S[aDET[stDetI[pKolonne]]].PKTGEWONNEN[stDetTurCupGes[pKolonne]][0] / 100)) + '%';
            }
        } else {
            PROZspiele[ 7] = '-';
            PROZcol2  [ 7] = '-';
        }
        if (stDetOption[pKolonne] === 2) {
            BTRGcol2[22] = STAT.S[aDET[stDetI[pKolonne]]].ANZGEWONNEN[stDetTurCupGes[pKolonne]][22];
        } else {
            BTRGcol2[22] = STAT.S[aDET[stDetI[pKolonne]]].PKTGEWONNEN[stDetTurCupGes[pKolonne]][22];
        }
        html += '<tr><td>&nbsp;davon SR</td><td class=TR>' + STAT.S[aDET[stDetI[pKolonne]]].ANZSPIELE[stDetTurCupGes[pKolonne]][ 7] + '</td><td class=TR>' + PROZspiele[ 7] + '</td><td class=TR>' + BTRGcol2[7] + '</td><td class=TR>' + PROZcol2[7] + '</td></tr>';
        sumGruppe([8, 9, 10]);
        anzSpPyr[1] = STAT.S[aDET[stDetI[pKolonne]]].ANZSPIELE[stDetTurCupGes[pKolonne]][22];
        html += '<tr><th>&nbsp;6,3,S3er</th><td class=TR>' + STAT.S[aDET[stDetI[pKolonne]]].ANZSPIELE[stDetTurCupGes[pKolonne]][22] + '</td><td class=TR>' + PROZspiele[22] + '</td><td class=TR>' + BTRGcol2[22] + '</td><td class=TR>' + PROZcol2[22] + '</td></tr>';
        sumGruppe([11, 12]);
        anzSpPyr[3] = STAT.S[aDET[stDetI[pKolonne]]].ANZSPIELE[stDetTurCupGes[pKolonne]][22];
        html += '<tr><th>&nbsp;Farb.Sp.</th><td class=TR>' + STAT.S[aDET[stDetI[pKolonne]]].ANZSPIELE[stDetTurCupGes[pKolonne]][22] + '</td><td class=TR>' + PROZspiele[22] + '</td><td class=TR>' + BTRGcol2[22] + '</td><td class=TR>' + PROZcol2[22] + '</td></tr>';
        sumGruppe([13, 14, 15, 16, 17]);
        anzSpPyr[4] = STAT.S[aDET[stDetI[pKolonne]]].ANZSPIELE[stDetTurCupGes[pKolonne]][22];
        anzSpPyr[0] = anzSpPyr[1] + anzSpPyr[2] + anzSpPyr[3] + anzSpPyr[4];
        html += '<tr><th>&nbsp;Neg.Sp. </th><td class=TR>' + STAT.S[aDET[stDetI[pKolonne]]].ANZSPIELE[stDetTurCupGes[pKolonne]][22] + '</td><td class=TR>' + PROZspiele[22] + '</td><td class=TR>' + BTRGcol2[22] + '</td><td class=TR>' + PROZcol2[22] + '</td></tr>';

    } else {

        sumGruppe([1, 2, 3, 4, 5, 6]);
        anzSpPyr[2] = STAT.S[aDET[stDetI[pKolonne]]].ANZSPIELE[stDetTurCupGes[pKolonne]][22];
        sumGruppe([8, 9, 10]);
        anzSpPyr[1] = STAT.S[aDET[stDetI[pKolonne]]].ANZSPIELE[stDetTurCupGes[pKolonne]][22];
        sumGruppe([11, 12]);
        anzSpPyr[3] = STAT.S[aDET[stDetI[pKolonne]]].ANZSPIELE[stDetTurCupGes[pKolonne]][22];
        sumGruppe([13, 14, 15, 16, 17]);
        anzSpPyr[4] = STAT.S[aDET[stDetI[pKolonne]]].ANZSPIELE[stDetTurCupGes[pKolonne]][22];
        anzSpPyr[0] = anzSpPyr[1] + anzSpPyr[2] + anzSpPyr[3] + anzSpPyr[4];
        html = html + '<tr><th>&nbsp;Rufer   </th><td class=TR>' + STAT.S[aDET[stDetI[pKolonne]]].ANZSPIELE[stDetTurCupGes[pKolonne]][1] + '</td><td class=TR>' + PROZspiele[1] + '</td><td class=TR>' + BTRGcol2[1] + '</td><td class=TR>' + PROZcol2[1] + '</td></tr>';
        html = html + '<tr><th>&nbsp;SoloRuf.</th><td class=TR>' + STAT.S[aDET[stDetI[pKolonne]]].ANZSPIELE[stDetTurCupGes[pKolonne]][2] + '</td><td class=TR>' + PROZspiele[2] + '</td><td class=TR>' + BTRGcol2[2] + '</td><td class=TR>' + PROZcol2[2] + '</td></tr>';
        html = html + '<tr><th>&nbsp;I-Rufer </th><td class=TR>' + STAT.S[aDET[stDetI[pKolonne]]].ANZSPIELE[stDetTurCupGes[pKolonne]][3] + '</td><td class=TR>' + PROZspiele[3] + '</td><td class=TR>' + BTRGcol2[3] + '</td><td class=TR>' + PROZcol2[3] + '</td></tr>';
        html = html + '<tr><th>&nbsp;II-Rufer</th><td class=TR>' + STAT.S[aDET[stDetI[pKolonne]]].ANZSPIELE[stDetTurCupGes[pKolonne]][4] + '</td><td class=TR>' + PROZspiele[4] + '</td><td class=TR>' + BTRGcol2[4] + '</td><td class=TR>' + PROZcol2[4] + '</td></tr>';
        html = html + '<tr><th>&nbsp;III-Ruf.</th><td class=TR>' + STAT.S[aDET[stDetI[pKolonne]]].ANZSPIELE[stDetTurCupGes[pKolonne]][5] + '</td><td class=TR>' + PROZspiele[5] + '</td><td class=TR>' + BTRGcol2[5] + '</td><td class=TR>' + PROZcol2[5] + '</td></tr>';
        html = html + '<tr><th>&nbsp;IIII-Ruf</th><td class=TR>' + STAT.S[aDET[stDetI[pKolonne]]].ANZSPIELE[stDetTurCupGes[pKolonne]][6] + '</td><td class=TR>' + PROZspiele[6] + '</td><td class=TR>' + BTRGcol2[6] + '</td><td class=TR>' + PROZcol2[6] + '</td></tr>';
        html = html + '<tr><td>&nbsp;davon SR</td><td class=TR>' + STAT.S[aDET[stDetI[pKolonne]]].ANZSPIELE[stDetTurCupGes[pKolonne]][7] + '</td><td class=TR>' + PROZspiele[7] + '</td><td class=TR>' + BTRGcol2[7] + '</td><td class=TR>' + PROZcol2[7] + '</td></tr>';
        html = html + '<tr><th>&nbsp;6er     </th><td class=TR>' + STAT.S[aDET[stDetI[pKolonne]]].ANZSPIELE[stDetTurCupGes[pKolonne]][8] + '</td><td class=TR>' + PROZspiele[8] + '</td><td class=TR>' + BTRGcol2[8] + '</td><td class=TR>' + PROZcol2[8] + '</td></tr>';
        html = html + '<tr><th>&nbsp;3er     </th><td class=TR>' + STAT.S[aDET[stDetI[pKolonne]]].ANZSPIELE[stDetTurCupGes[pKolonne]][9] + '</td><td class=TR>' + PROZspiele[9] + '</td><td class=TR>' + BTRGcol2[9] + '</td><td class=TR>' + PROZcol2[9] + '</td></tr>';
        html = html + '<tr><th>&nbsp;Solo 3er</th><td class=TR>' + STAT.S[aDET[stDetI[pKolonne]]].ANZSPIELE[stDetTurCupGes[pKolonne]][10] + '</td><td class=TR>' + PROZspiele[10] + '</td><td class=TR>' + BTRGcol2[10] + '</td><td class=TR>' + PROZcol2[10] + '</td></tr>';

        if ((CUPS.TARIF[stCup].length >= 18 && CUPS.TARIF[stCup][4] > 0)
                || (CUPS.TARIF[stCup].length < 18 && CUPS.REGELN[stCup] !== 'Ooe.')) {
            html = html + '<tr class=cBeige><th>&nbsp;Fa.3er  </th><td class=TR>' + STAT.S[aDET[stDetI[pKolonne]]].ANZSPIELE[stDetTurCupGes[pKolonne]][11] + '</td><td class=TR>' + PROZspiele[11] + '</td><td class=TR>' + BTRGcol2[11] + '</td><td class=TR>' + PROZcol2[11] + '</td></tr>';
        }
        html = html + '<tr class=cBeige><th>&nbsp;Fa.Solo </th><td class=TR>' + STAT.S[aDET[stDetI[pKolonne]]].ANZSPIELE[stDetTurCupGes[pKolonne]][12] + '</td><td class=TR>' + PROZspiele[12] + '</td><td class=TR>' + BTRGcol2[12] + '</td><td class=TR>' + PROZcol2[12] + '</td></tr>';
        html = html + '<tr><th>&nbsp;Trisch. </th><td class=TR>' + STAT.S[aDET[stDetI[pKolonne]]].ANZSPIELE[stDetTurCupGes[pKolonne]][13] + '</td><td class=TR>' + PROZspiele[13] + '</td><td class=TR>' + BTRGcol2[13] + '</td><td class=TR>' + PROZcol2[13] + '</td></tr>';
        html = html + '<tr><th>&nbsp;Pi.Zwi. </th><td class=TR>' + STAT.S[aDET[stDetI[pKolonne]]].ANZSPIELE[stDetTurCupGes[pKolonne]][14] + '</td><td class=TR>' + PROZspiele[14] + '</td><td class=TR>' + BTRGcol2[14] + '</td><td class=TR>' + PROZcol2[14] + '</td></tr>';
        html = html + '<tr><th>&nbsp;Bettler </th><td class=TR>' + STAT.S[aDET[stDetI[pKolonne]]].ANZSPIELE[stDetTurCupGes[pKolonne]][15] + '</td><td class=TR>' + PROZspiele[15] + '</td><td class=TR>' + BTRGcol2[15] + '</td><td class=TR>' + PROZcol2[15] + '</td></tr>';
        html = html + '<tr><th>&nbsp;PiZwi.Ov</th><td class=TR>' + STAT.S[aDET[stDetI[pKolonne]]].ANZSPIELE[stDetTurCupGes[pKolonne]][16] + '</td><td class=TR>' + PROZspiele[16] + '</td><td class=TR>' + BTRGcol2[16] + '</td><td class=TR>' + PROZcol2[16] + '</td></tr>';
        html = html + '<tr><th>&nbsp;Bet.Ov. </th><td class=TR>' + STAT.S[aDET[stDetI[pKolonne]]].ANZSPIELE[stDetTurCupGes[pKolonne]][17] + '</td><td class=TR>' + PROZspiele[17] + '</td><td class=TR>' + BTRGcol2[17] + '</td><td class=TR>' + PROZcol2[17] + '</td></tr>';

    }


    if (STAT.S[aDET[stDetI[pKolonne]]].ANZSPIELE[stDetTurCupGes[pKolonne]][18] > 0) {
        html += '<tr><th>&nbsp;Diverse </th><td class=TR>' + STAT.S[aDET[stDetI[pKolonne]]].ANZSPIELE[stDetTurCupGes[pKolonne]][18] + '</td><td class=TR>' + PROZspiele[18] + '</td><td class=TR>' + BTRGcol2[18] + '</td><td class=TR>' + PROZcol2[18] + '</td></tr>';
    }
    if (STAT.S[aDET[stDetI[pKolonne]]].NR !== '0000') {
        html += '<tr class=bGrau><th>'
                + '&nbsp;aktiv   </th><th class=TR>' + STAT.S[aDET[stDetI[pKolonne]]].ANZSPIELE[stDetTurCupGes[pKolonne]][0] + '</th><th class=TR>' + PROZspiele[0] + '</th><th class=TR>' + BTRGcol2[0] + '</th><th class=TR>' + PROZcol2[0] + '</th></tr>'
                + '<tr class=bGrau><th>'
                + '&nbsp;passiv  </th><th class=TR>' + STAT.S[aDET[stDetI[pKolonne]]].ANZSPIELE[stDetTurCupGes[pKolonne]][19] + '</th><th class=TR>' + PROZspiele[19] + '</th><th class=TR>' + BTRGcol2[19] + '</th><th class=TR>' + PROZcol2[19] + '</th></tr>';
    }
    html += '<tr class=ui-bar-b><th>'
            + '&nbsp;gesamt  </th><th class=TR>' + STAT.S[aDET[stDetI[pKolonne]]].ANZSPIELE[stDetTurCupGes[pKolonne]][20] + '</th><th class=TR>' + PROZspiele[20] + '</th><th class=TR>' + BTRGcol2[20] + '</th><th class=TR>' + PROZcol2[20] + '</th></tr>'
            + '</tbody></table><div class=M>&nbsp;H&auml;ndisch mitgeschriebene Spiele &nbsp;sind&nbsp;nicht&nbsp;ber&uuml;cksichtigt.</div>';
    html += '<div class=M>&nbsp;SR = Selberrufer</div>';
    return html;
}