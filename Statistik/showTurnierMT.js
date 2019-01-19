
/* global STAT, LS, QUERFORMAT(), getName */

var iMannschaft = 5;
function showTurnierMW(pTurnier) {

    if (QUERFORMAT()) {
        if (lastBtn) {
            $(lastBtn).removeClass('ui-btn-active');
        }
        lastBtn = '#b' + pTurnier;
        $(lastBtn).addClass('ui-btn-active');
    }

    if ($("input:radio[name=iWERTUNG]:checked").val() === 'EW') {
        showTurnierEW(pTurnier);
        return;
    }

    if (pTurnier) {
        stStat = pTurnier;
    } else {
        pTurnier = stStat;
    }

    if (jbSpieler.isOpen) {
        jbSpieler.close();
    }

    $("#dCopyright").hide();
    showIcons([]);
    if (ADMIN) {
        showIcons(['#iPrint', '#iAnekdote']);
    }

    writeCanvas(stStat + '  Mannschaftswertung');
    $('#nb_Mannschaft').addClass('ui-btn-active');
    $('#nb_Uebersicht, #nb_Einzel').removeClass('ui-btn-active').removeClass('ui-disabled');
    var i = 0;
    var nSpieler = 0;
    var hClass = '';
    stNamenLen = 0.41;
    var html = getStatMeldungen()
            + "<table id=mTable data-role='table' data-mode='columntoggle' class='ui-body-d ui-shadow ui-responsive table-stripe' data-column-btn-text=''><thead>"
            + "<tr id='L0P1' class='bGrau'>"
            + "<th class=TR>#&nbsp;&nbsp;</th>"
            + (QUERFORMAT() && LS.ShowSpielerNr ? "<th class=TC>Nr.&nbsp;</th>" : '')
            + "<th>&nbspName</th>"
            + (QUERFORMAT() ? "<th>&nbspOrt</th>" : "")
            + "<th class=TR>Ges&nbsp;</th>"
            + "<th class=TR>R1&nbsp;</th>"
            + "<th class=TR>R2&nbsp;</th>"
            + "<th class=TR>R3&nbsp;</th>"
            + "</tr></thead><tbody>";
    var MANNSCHAFTEN = {};
    for (var spieler in STAT[pTurnier]) {
        if (spieler[0] !== '_') {
            if (MANNSCHAFTEN[STAT[pTurnier][spieler][iMannschaft]]) {
                MANNSCHAFTEN[STAT[pTurnier][spieler][iMannschaft]] += STAT[pTurnier][spieler][4];
            } else {
                MANNSCHAFTEN[STAT[pTurnier][spieler][iMannschaft]] = STAT[pTurnier][spieler][4];
            }
        }
    }

    var SORTsp = [];
    for (var iSpieler in STAT[pTurnier]) {
        if (iSpieler[0] !== '_') {
            SORTsp[SORTsp.length] = ''
                    + (5000 - STAT[pTurnier][iSpieler][4])
                    + (5000 - Math.max(STAT[pTurnier][iSpieler][1], STAT[pTurnier][iSpieler][2], STAT[pTurnier][iSpieler][3]))
                    + ';' + iSpieler;
        }
    }
    SORTsp.sort();
    var SORTman = [];
    for (var mannschaft in MANNSCHAFTEN) {
        SORTman.push([5000 - MANNSCHAFTEN[mannschaft], mannschaft]);
    }
    SORTman.sort();
    for (var i = 0; i < SORTman.length; i++) {
        html += '<tr class="' + hClass + '">';
        if (LS.ShowSpielerNr && QUERFORMAT()) {
            html += "<th></th>";
        }
        if (QUERFORMAT()) {
            html += '<th class="TC" colspan="3">' + (i + 1) + '.&nbsp;&nbsp;' + SORTman[i][1] + '</th>';
        } else {
            html += '<th class="TC" colspan="2">' + (i + 1) + '.&nbsp;&nbsp;' + SORTman[i][1] + '</th>';
        }
        html += '<th class="TR">' + ((SORTman[i][0] - 5000) * -1) + '&nbsp;</th>'
                + '<td class="TC" colspan="3">Punkte</td>'
                + '</tr>';
        nSpieler = 0;
        for (var ii = 0; ii < SORTsp.length; ii++) {
            var iSpieler = SORTsp[ii].substring((SORTsp[ii].lastIndexOf(';') + 1));
            nSpieler++;
            if (STAT[pTurnier][iSpieler][iMannschaft] === SORTman[i][1]) {
                if (iSpieler === LS.ME) {
                    hClass = 'bBeige';
                } else {
                    hClass = '';
                    for (var iFreund in LS.Freunde) {
                        if (LS.Freunde[iFreund] === iSpieler) {
                            hClass = ' bBeige2';
                        }
                    }
                    if (LS.tempVIPs) {
                        if (LS.tempVIPs.indexOf(iSpieler) > 0) {
                            hClass = ' bBeige2';
                        }
                    }
                }

                html += '<tr class="' + hClass + '">'
                        + '<td class="TR">&nbsp;' + nSpieler + '.&nbsp;</td>';
                if (LS.ShowSpielerNr && QUERFORMAT()) {
                    html += '<td class=TC>' + (isNaN(iSpieler) ? '????' : iSpieler) + '&nbsp;</td>';
                }
                html += '<td><span onclick="event.stopPropagation();popupSpieler(\'' + iSpieler + '\');" class="P ' + (iSpieler === LS.ME ? 'cSchwarz' : 'cBlau') + '">' + (getName(iSpieler).replace(' ', '&nbsp;')) + '</span></td>';
                if (QUERFORMAT()) {
                    html += '<td>' + getSpielerOrt(iSpieler) + '</td>';
                }
                html += '<th class="TR">' + STAT[pTurnier][iSpieler][4] + '&nbsp;</th>'
                        + '<td class="TR">' + STAT[pTurnier][iSpieler][1] + '&nbsp;</td>'
                        + '<td class="TR">' + STAT[pTurnier][iSpieler][2] + '&nbsp;</td>'
                        + '<td class="TR">' + STAT[pTurnier][iSpieler][3] + '&nbsp;</td>'
                        + '</tr>';
            }
        }
    }

    if (QUERFORMAT()) {
        $('#dRumpf').html("<div class=outer>" + html + "</tbody></table><br>&nbsp;&nbsp;&nbsp;<span class='XXS'>&copy; 2015-" + new Date().getFullYear() + " by Leo Luger</span><br></div>").trigger('create').show();
        setFont();
        $('#tStand').hide();
        if (window.navigator.userAgent.indexOf("MSIE ") === -1) {
            $('#mTable').stickyTableHeaders({cacheHeaderHeight: true, "fixedOffset": $('#qfHeader')});
        }
    } else {
        $('#sideContentMT').html("<div class=outer>" + html + "</tbody></table><br>&nbsp;&nbsp;&nbsp;<span class='XXS'>&copy; 2015-" + new Date().getFullYear() + " by Leo Luger</span><br></div>").trigger('create').show();
        setFont(4.7);
        $('#nbUebersicht,#nbArchiv,#bAktSaison').removeClass('ui-disabled').removeClass('ui-btn-active');
        $('#sideDetails,#sideContent').hide();
        setTimeout(function () {
            var hx = $(window).innerHeight() - $('#sideContentMT').offset().top - $('#dFooter').height() - 1;
            $('#sideContentMT').css('height', hx + 'px');
        });
    }

    window.scrollTo(0, 0);
}


function showTurnierEW(pTurnier) {

    if (pTurnier) {
        stStat = pTurnier;
    } else {
        pTurnier = stStat;
    }
    $("#dCopyright").hide();
    writeCanvas(stStat + '  Einzelwertung');
    $('#nb_Einzel').addClass('ui-btn-active');
    $('#nb_Uebersicht, #nb_Mannschaft').removeClass('ui-btn-active');
    var i = 0;
    var nSpieler = 0;
    var hClass = '';
    stNamenLen = 0.41;
    var html = getStatMeldungen()
            + "<table id=mTable data-role='table' data-mode='columntoggle' class='ui-body-d ui-shadow ui-responsive table-stripe' data-column-btn-text=''><thead>"
            + "<tr id='L0P1' class='bGrau'>"
            + "<th class=TR>#&nbsp;&nbsp;</th>"
            + (QUERFORMAT() && LS.ShowSpielerNr ? "<th class=TC>Nr.&nbsp;</th>" : "")
            + "<th>&nbspName</th>"
            + (QUERFORMAT() ? "<th>&nbspOrt</th>" : "")
            + "<th class=TR>Ges&nbsp;</th>"
            + "<th class=TR>R1&nbsp;</th>"
            + "<th class=TR>R2&nbsp;</th>"
            + "<th class=TR>R3&nbsp;</th>"
            + "</tr></thead><tbody>";
    var SORT = [];
    for (var iSpieler in STAT[pTurnier]) {
        if (iSpieler[0] !== '_') {
            SORT[SORT.length] = ''
                    + (5000 - STAT[pTurnier][iSpieler][4])
                    + (5000 - Math.max(STAT[pTurnier][iSpieler][1], STAT[pTurnier][iSpieler][2], STAT[pTurnier][iSpieler][3]))
                    + ';' + iSpieler;
        }
    }

    SORT.sort();
    for (var ii = 0; ii < SORT.length; ii++) {
        var iSpieler = SORT[ii].substring((SORT[ii].lastIndexOf(';') + 1));
        nSpieler++;
        if (iSpieler === LS.ME) {
            hClass = 'bBeige';
        } else {
            hClass = '';
            for (var freund in LS.Freunde) {
                if (freund === iSpieler) {
                    hClass = ' bBeige2';
                }
            }
            if (LS.tempVIPs) {
                if (LS.tempVIPs.indexOf(iSpieler) > 0) {
                    hClass = ' bBeige2';
                }
            }
        }

        html += '<tr class="' + hClass + '">'
                + '<td class="TR">&nbsp;' + nSpieler + '.&nbsp;</td>';
        if (LS.ShowSpielerNr && QUERFORMAT()) {
            html += '<td class=TC>' + (isNaN(iSpieler) ? '????' : iSpieler) + '&nbsp;</td>';
        }
        html += '<td><span onclick="event.stopPropagation();popupSpieler(\'' + iSpieler + '\');" class="P ' + (iSpieler === LS.ME ? 'cSchwarz' : 'cBlau') + '">' + (getName(iSpieler).replace(' ', '&nbsp;')) + '</span></td>';
        if (QUERFORMAT()) {
            html += '<td>' + getSpielerOrt(iSpieler) + '</td>';
        }
        html += '<th class="TR">' + STAT[pTurnier][iSpieler][4] + '&nbsp;</th>'
                + '<td class="TR">' + STAT[pTurnier][iSpieler][1] + '&nbsp;</td>'
                + '<td class="TR">' + STAT[pTurnier][iSpieler][2] + '&nbsp;</td>'
                + '<td class="TR">' + STAT[pTurnier][iSpieler][3] + '&nbsp;</td>'
                + '</tr>';
    }

    if (QUERFORMAT()) {
        $('#dRumpf').html("<div class=outer>" + html + "</tbody></table><br>&nbsp;&nbsp;&nbsp;<span class='XXS'>&copy; 2015-" + new Date().getFullYear() + " by Leo Luger</span><br></div>").trigger('create').show();
        $('#tStand').hide();
        if (window.navigator.userAgent.indexOf("MSIE ") === -1) {
            $('#mTable').stickyTableHeaders({cacheHeaderHeight: true, "fixedOffset": $('#qfHeader')});
        }
        setFont();
    } else {
        $('#sideContentMT').html("<div class=outer>" + html + "</tbody></table><br>&nbsp;&nbsp;&nbsp;<span class='XXS'>&copy; 2015-" + new Date().getFullYear() + " by Leo Luger</span><br></div>").trigger('create').show();
        setFont(4.7);
        $('#nbUebersicht,#nbArchiv,#bAktSaison').removeClass('ui-disabled').removeClass('ui-btn-active');
        $('#sideDetails,#sideContent').hide();
        setTimeout(function () {
            var hx = $(window).innerHeight() - $('#sideContentMT').offset().top - $('#dFooter').height() - 1;
            $('#sideContentMT').css('height', hx + 'px');
        });
    }

    window.scrollTo(0, 0);
}