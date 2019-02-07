
/* global LS, stSaison, QUERFORMAT(), stFinale, getName, SPIELER, STAT, stCup, CUPS, stSaisonTab, stEndstand, jbSpieler, ADMIN, SAISON, CUP, CUPD */


function addPosition(pSaison) {

    var p0 = 0;
    var p1 = 9999;
    var p2 = 9999;
    var p3 = 9999;

    var tBlockB = '';
    var tBlockC = '';
    var tBlockD = '';
    var tBlockE = '';

    var hBG = (pSaison % 2) ? '' : 'bSehrHell';

    var html = '';

    if (!QUERFORMAT()) {
        html += '<tr class=' + hBG + '>'
                + '<td>&nbsp;&nbsp;</td>'
                + '<th class="TC">' + stSaison + ':</th>'
                + '<td colspan="2"></td>'
//                + '<td class="S2">Turniere: ' + SAISON[stSaison].anzTurniere + '</td>'
                + '</tr>';
    }

    for (var i = 0; i < CUPD.length; i++) {
        var spieler = CUPD[i].substring((CUPD[i].lastIndexOf(';') + 1));
        p0 = parseInt(CUPD[i]);
        if (p1 >= p0) {
            p1 = p0;
            if (QUERFORMAT()) {
                tBlockB += '<div>1. <span onclick="event.stopPropagation();popupSpieler(\'' + spieler + '\',\'' + stSaison + '\');" class="P cBlau">' + (getName(spieler).replace(' ', '&nbsp;')) + '</span></div>';
                tBlockC += CUP[spieler][1] + '-' + CUP[spieler][2] + '-' + CUP[spieler][3] + '<br>';
                tBlockD += (9000 - p0) + '<br>' + '';
                tBlockE += CUP[spieler][5].length + '<br>';
            } else {
                html += '<tr class=' + hBG + '>'
                        + '<td></td>'
                        + '<td>' + '1. <span onclick="event.stopPropagation();popupSpieler(\'' + spieler + '\',\'' + stSaison + '\');" class="P cBlau">' + (getName(spieler).replace(' ', '&nbsp;')) + '</span></td>'
                        + '<td class="TC">' + CUP[spieler][1] + '-' + CUP[spieler][2] + '-' + CUP[spieler][3] + '</td>'
                        + '<td class="TR">' + (9000 - p0) + '&nbsp;</td>'
                        + '</tr>';
            }
        } else if (p2 >= p0) {
            p2 = p0;
            if (QUERFORMAT()) {
                tBlockB += '<div>2. <span onclick="event.stopPropagation();popupSpieler(\'' + spieler + '\',\'' + stSaison + '\');" class="P cBlau">' + (getName(spieler).replace(' ', '&nbsp;')) + '</span></div>';
                tBlockC += CUP[spieler][1] + '-' + CUP[spieler][2] + '-' + CUP[spieler][3] + '<br>';
                tBlockD += (9000 - p0) + '<br>' + '';
                tBlockE += CUP[spieler][5].length + '<br>';
            } else {
                html += '<tr class=' + hBG + '>'
                        + '<td></td>'
                        + '<td>' + '2. <span onclick="event.stopPropagation();popupSpieler(\'' + spieler + '\',\'' + stSaison + '\');" class="P cBlau">' + (getName(spieler).replace(' ', '&nbsp;')) + '</span></td>'
                        + '<td class="TC">' + CUP[spieler][1] + '-' + CUP[spieler][2] + '-' + CUP[spieler][3] + '</td>'
                        + '<td class="TR">' + (9000 - p0) + '&nbsp;</td>'
                        + '</tr>';
            }
        } else if (p3 >= p0) {
            p3 = p0;
            if (QUERFORMAT()) {
                tBlockB += '<div>3. <span onclick="event.stopPropagation();popupSpieler(\'' + spieler + '\',\'' + stSaison + '\');" class="P cBlau">' + (getName(spieler).replace(' ', '&nbsp;')) + '</span></div>';
                tBlockC += CUP[spieler][1] + '-' + CUP[spieler][2] + '-' + CUP[spieler][3] + '<br>';
                tBlockD += (9000 - p0) + '<br>' + '';
                tBlockE += CUP[spieler][5].length + '<br>';
            } else {
                html += '<tr class=' + hBG + '>'
                        + '<td></td>'
                        + '<td>' + '3. <span onclick="event.stopPropagation();popupSpieler(\'' + spieler + '\',\'' + stSaison + '\');" class="P cBlau">' + (getName(spieler).replace(' ', '&nbsp;')) + '</span></td>'
                        + '<td class="TC">' + CUP[spieler][1] + '-' + CUP[spieler][2] + '-' + CUP[spieler][3] + '</td>'
                        + '<td class="TR">' + (9000 - p0) + '&nbsp;</td>'
                        + '</tr>';
            }
        } else {
            break;
        }
    }

    if (QUERFORMAT()) {
        html = '<br>'
                + '<div class="ui-grid-d">'
                + '<div class="ui-block-a" style="width:22%; text-align: center;">'
                + '<div class="XL">' + stSaison + ':</div>'
                + '<div class="S">Turniere: ' + SAISON[stSaison].anzTurniere + '</div>'
                + '</div>'
                + '<div class="ui-block-b S" style="width:25%;">' + tBlockB + '</div>'
                + '<div class="ui-block-c S C" style="width:8%;">' + tBlockC + '</div>'
                + '<div class="ui-block-d S R" style="width:8%;">' + tBlockD + '</div>'
                + '<div class="ui-block-e S R" style="width:6%;">' + tBlockE + '</div>'
                + '</div>';
        $('#dRumpf').prepend(html);
    } else {
        return html;
    }
}

function showCupsieger() {

    var html = '';

    if (QUERFORMAT()) {
        if (lastBtn) {
            $(lastBtn).removeClass('ui-btn-active');
        }
        lastBtn = '#bCupsieger';
        $(lastBtn).addClass('ui-btn-active');
    }

    if (jbSpieler.isOpen) {
        jbSpieler.close();
    }

    showIcons([]);

    stStat = 'Cupsieger';
    stNamenLen = 99;
    writeCanvas(stStat);
    $("#dCopyright").hide();

    SAISON["Gesamt"] = {
        anzSaisonen: 0,
        anzTurniere: 0
    };

    if (QUERFORMAT()) {
        $('#dRumpf').html('');
    } else {
        $('#dContent').html('');
        $('#sideDetails').hide();
        $('#nbUebersicht,#nbArchiv,#bAktSaison').removeClass('ui-disabled').removeClass('ui-btn-active');
        var hx = $(window).innerHeight() - $('#sideContent').offset().top - $('#dFooter').height() - 1;
        $('#sideContent').css('height', hx + 'px').scrollTop(0);
    }

    var CUP = {};
    stSaison = '';
    var nTurniere = 0;
    var nSaison = 0;
    for (var turnier in STAT) {
        if (turnier[0] === '2') {
            if (STAT[turnier]._SAISON !== stSaison) {
                if (stSaison) {
                    nSaison++;
                    bereSaison(nTurniere);
                    html = addPosition(nSaison) + html;
                }
                nTurniere = 0;
                stSaison = STAT[turnier]._SAISON;
            }
            nTurniere++;
        }
    }
    if (stSaison) {
        nSaison++;
        bereSaison(nTurniere);
        html = addPosition(nSaison) + html;
        if (!QUERFORMAT()) {
            $('#dContent').html(
                    "<table id=mTable data-role='table' data-filter='true' data-input='#iFilter' data-mode='columntoggle' cellspacing='0' class='table ui-body-d ui-shadow ui-responsive ssssstable-stripe' data-column-btn-text=''><thead>"
                    + "<tr id='L0P1' class='bGrau'>"
                    + "<th class=TL></th>"
                    + "<th class=TR></th>"
                    + "<td class=TC>1.2.3.</td>"
                    + "<td class=TR>CupP&nbsp;</td>"
                    + "</tr></thead><tbody>"
                    + html + "</tbody></table>").show();
        }
        setFont(4.7, true);
    }
}