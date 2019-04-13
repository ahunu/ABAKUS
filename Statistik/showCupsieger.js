
/* global LS, stSaison, QUERFORMAT(), stFinale, getName, SPIELER, STAT, stCup, CUPS, stEndstand, jbSpieler, ADMIN, SAISON, CUP, CUPD */

function addPosition(pSaison) {

    var p0 = 0;
    var p1 = 9999;
    var p2 = 9999;
    var p3 = 9999;

    var hBG = (pSaison % 2) ? 'bSehrHell' : '';

    var html = '';

    html += '<tr class=' + hBG + '>'
            + '<td>&nbsp;&nbsp;</td>'
            + '<th class="TC">' + SAISON[pSaison][isSaison] + ':</th>'
            + '<td colspan="3"></td>'
            + (QUERFORMAT() ? '<td class="TR">&nbsp;</td><td>&nbsp;</td>' : '')
            + '</tr>';

    for (var i = 0; i < CUPD.length; i++) {
        var spieler = CUPD[i].substring((CUPD[i].lastIndexOf(';') + 1));
        p0 = parseInt(CUPD[i]);
        if (p1 >= p0) {
            p1 = p0;
            html += '<tr class=' + hBG + '>'
                    + '<td></td>'
                    + '<td>' + '1. <span onclick="event.stopPropagation();popupSpieler(\'' + SAISON[pSaison][is1] + '\',\'' + stSaison + '\');" class="P cBlau"><b>' + (getName(SAISON[pSaison][is1]).replace(' ', '&nbsp;')) + '</b></span></td>'
                    + (QUERFORMAT() ? '<td>' + getSpielerOrt(SAISON[pSaison][is1]) + '</td>' : '')
                    + '<td class="TC">' + CUP[spieler][1] + '-' + CUP[spieler][2] + '-' + CUP[spieler][3] + '</td>'
                    + '<td class="TR">' + (9000 - p0) + '&nbsp;</td>'
                    + (QUERFORMAT() ? '<td class="TR">' + CUP[spieler][5].length + '&nbsp;</td><td>&nbsp;</td>' : '')
                    + '</tr>';
        } else if (p2 >= p0) {
            p2 = p0;
            html += '<tr class=' + hBG + '>'
                    + '<td></td>'
                    + '<td>' + '2. <span onclick="event.stopPropagation();popupSpieler(\'' + spieler + '\',\'' + stSaison + '\');" class="P cBlau">' + (getName(spieler).replace(' ', '&nbsp;')) + '</span></td>'
                    + (QUERFORMAT() ? '<td>' + getSpielerOrt(spieler) + '</td>' : '')
                    + '<td class="TC">' + CUP[spieler][1] + '-' + CUP[spieler][2] + '-' + CUP[spieler][3] + '</td>'
                    + '<td class="TR">' + (9000 - p0) + '&nbsp;</td>'
                    + (QUERFORMAT() ? '<td class="TR">' + CUP[spieler][5].length + '&nbsp;</td><td>&nbsp;</td>' : '')
                    + '</tr>';
        } else if (p3 >= p0) {
            p3 = p0;
            html += '<tr class=' + hBG + '>'
                    + '<td></td>'
                    + '<td>' + '3. <span onclick="event.stopPropagation();popupSpieler(\'' + spieler + '\',\'' + stSaison + '\');" class="P cBlau">' + (getName(spieler).replace(' ', '&nbsp;')) + '</span></td>'
                    + (QUERFORMAT() ? '<td>' + getSpielerOrt(spieler) + '</td>' : '')
                    + '<td class="TC">' + CUP[spieler][1] + '-' + CUP[spieler][2] + '-' + CUP[spieler][3] + '</td>'
                    + '<td class="TR">' + (9000 - p0) + '&nbsp;</td>'
                    + (QUERFORMAT() ? '<td class="TR">' + CUP[spieler][5].length + '&nbsp;</td><td>&nbsp;</td>' : '')
                    + '</tr>';
        } else {
            break;
        }
    }

    return html;
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

    if (ADMIN || LS.ME === '3425' || (LS.ME === '2037' && stCup === 56)) { // Robert Sedlaczek
        showIcons(['#iPrint']);
    }

    stStat = 'Cupsieger';
    stNamenLen = 99;
    writeCanvas(stStat);
    $("#dCopyright").hide();

    if (QUERFORMAT()) {
        $('#dRumpf').html('');
    } else {
        $('#dContent').html('');
        $('#sideDetails').hide();
        $('#nbUebersicht,#nbSaison,#nbArchiv').removeClass('ui-disabled').removeClass('ui-btn-active');
        var hx = $(window).innerHeight() - $('#sideContent').offset().top - $('#dFooter').height() - 1;
        $('#sideContent').css('height', hx + 'px').scrollTop(0);
    }

    for (var iiSaison in SAISON) {
        if (iiSaison) {
            html += addPosition(iiSaison);
        }
    }

    if (html) {
        html = "<table id=mTable data-role='table' data-filter='true' data-input='#iFilter' data-mode='columntoggle' cellspacing='0' class='table ui-body-d ui-shadow ui-responsive ssssstable-stripe' data-column-btn-text=''><thead>"
                + "<tr id='L0P1' class='bGrau'>"
                + "<th class=TL></th>"
                + "<th class=TR></th>"
                + (QUERFORMAT() ? '<th></th>' : '')
                + "<th class=TC>1.2.3.</th>"
                + "<th class=TR>CupP</th>"
                + (QUERFORMAT() ? '<th class=TR>TN&nbsp;</th><th>&nbsp;</th>' : '')
                + "</tr></thead><tbody>"
                + html
                + "</tbody></table>";
        if (QUERFORMAT()) {
            $('#dRumpf').html(html).show();
        } else {
            $('#dContent').html(html).show();
        }
        setFont(4.8, true);
    }
}