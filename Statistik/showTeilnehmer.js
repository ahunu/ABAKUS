
/* global LS, stSaison, QUERFORMAT(), stFinale, getName, SPIELER, STAT, stCup, CUPS, stEndstand, jbSpieler, ADMIN, SAISON, CUP, is2, SP, spTeilnahmen, spCuppunkte, spBestePlatz, is3, is1, isSaison, getSpielerName, sp0BestePlatz, sp0Cup3ter, sp0Cup2ter, sp0Cupsiege, aktSaison, spPunkte, spRangImCup */

function addTNPosition(pSpieler) {

    anz++;
    var hBG = (anz % 2) ? 'bSehrHell' : '';

//    const spRangImCup = 0;
//    const spCuppunkte = 1;
//    const spTeilnahmen = 2;
//    const spBestePlatz = 3;
//    const spPunkte = 4;
//    const sp0Cupsiege = 1;
//    const sp0Cup2ter = 2;
//    const sp0Cup3ter = 3;

    var nSaisonTN = 0;
    var nTurnierTN = 0;
    var nPunkte = 0;
    var hBestePlatz = 9999;
    var hSumPlatz = 0;
    var n1te = 0;
    var n2te = 0;
    var n3te = 0;

//    if (pSpieler[0] === '3' && pSpieler[1] === '4' || pSpieler === '1096') {

    if (pSpieler === LS.ME) {
        hBG = 'bBeige';
    }

    var hPos = '';

    for (var i = SP[pSpieler].length - 1; i > 0; i--) {
        if (SP[pSpieler][i]) {
            nSaisonTN++;
            nTurnierTN += SP[pSpieler][i][spTeilnahmen];
            hSumPlatz += SP[pSpieler][i][spSumPlatz];
            nPunkte += SP[pSpieler][i][spPunkte];
            if (isNaN(SP[pSpieler][i][spBestePlatz])) {
                n1te += parseInt(SP[pSpieler][i][spBestePlatz]);
                n2te += parseInt(SP[pSpieler][i][spBestePlatz].substr(2));
                n3te += parseInt(SP[pSpieler][i][spBestePlatz].substr(4));
            } else if (hBestePlatz > SP[pSpieler][i][spBestePlatz]) {
                hBestePlatz = SP[pSpieler][i][spBestePlatz];
            }
            hPos += '<tr ' + (LS.ME === pSpieler ? '' : 'hidden') + ' class="C ' + hBG + ' trDet trDet' + pSpieler + '" onclick="$(\'.trDet' + pSpieler + '\').hide();">'
                    + '<td>&nbsp;</td>'
                    + '<td class=TR><span onclick="popupSpieler(\'' + pSpieler + '\',\'' + SAISON[i][isSaison] + '\');" class="P cBlau">' + SAISON[i][isSaison] + '</span></td>'
                    + '<td class=TC>' + SP[pSpieler][i][spRangImCup] + '</td>'
                    + '<td class=TC>' + SP[pSpieler][i][spBestePlatz] + '</td>'
                    + '<td class=TC>' + parseInt(SP[pSpieler][i][spSumPlatz] / SP[pSpieler][i][spTeilnahmen]) + '</td>'
                    + '<td class="TR QUER">' + SP[pSpieler][i][spTeilnahmen] + '</td>'
                    + '<td class="TR QUER">' + SP[pSpieler][i][spPunkte] + '</td>'
                    + '<td>&nbsp;</td>'
                    + '</tr>';
        }
    }

    html = '<tr id="tr' + pSpieler + '" class="' + hBG + '" onclick="$(\'.trDet' + pSpieler + '\').toggle();">'
            + '<th></th>'
            + (SP[pSpieler][aktSaison]
                    ? '<td><span onclick="event.stopPropagation();popupSpieler(\'' + pSpieler + '\');" class="P cBlau">' + (getSpielerName(pSpieler).replace(' ', '&nbsp;')) + '</span></td>'
                    : '<td>' + (getSpielerName(pSpieler).replace(' ', '&nbsp;')) + '</td>'
                    );
    if (SP[pSpieler][0][sp0Cupsiege] || SP[pSpieler][0][sp0Cup2ter] || SP[pSpieler][0][sp0Cup3ter]) {
        html += '<td class=TC>' + (SP[pSpieler][0][sp0Cupsiege] ? SP[pSpieler][0][sp0Cupsiege] : '0') + '-'
                + (SP[pSpieler][0][sp0Cup2ter] ? SP[pSpieler][0][sp0Cup2ter] : '0') + '-'
                + (SP[pSpieler][0][sp0Cup3ter] ? SP[pSpieler][0][sp0Cup3ter] : '0') + '</td>';
    } else {
        html += '<td class=TC>' + SP[pSpieler][0][sp0BestePlatz] + '</td>';
    }
    html += '<td class=C>' + (n1te || n2te || n3te ? n1te + '-' + n2te + '-' + n3te : hBestePlatz) + '</td>'
            + '<td class=TC>' + parseInt(hSumPlatz / nTurnierTN) + '</td>'
            + '<td class="TR QUER">' + nTurnierTN + '</td>'
            + '<td class="TR QUER">' + nPunkte + '</td>'
            + '<td>&nbsp;</td>'
            + '</tr>';
    return html + hPos;
//    }

    return '';
}

function showTeilnehmer(pSort) {

    var html = '';
    if (QUERFORMAT()) {
        if (lastBtn) {
            $(lastBtn).removeClass('ui-btn-active');
        }
        lastBtn = '#bTeilnehmer';
        $(lastBtn).addClass('ui-btn-active');
    }

    if (jbSpieler.isOpen) {
        jbSpieler.close();
    }

    if (LS.ME.length === 4) {
        showIcons(['#iScrollToMe', '#iHideDetails', '#iShowDetails', '#iPrint']);
    }

    stStat = 'Teilnehmer';
    stNamenLen = 99;
    writeCanvas(stStat);
    $("#dCopyright").hide();
    if (QUERFORMAT()) {
        $('#dRumpf').html('');
    } else {
        $('#dContent').html('');
        $('#sideDetails').hide();
        $('#nbUebersicht,#nbSaison,#nbArchiv').removeClass('ui-disabled').removeClass('ui-btn-active');
        var hx = $(window).innerHeight() - $('#sideContent').offset().top - 1;
        $('#sideContent').css('height', hx + 'px').scrollTop(0);
    }

    for (var spieler in SP) {
        html += addTNPosition(spieler);
    }

    if (html) {
        html = "<table id=mTable data-role='table' data-filter='true' data-input='#iFilter' data-mode='columntoggle' cellspacing='0' class='table ui-body-d ui-shadow ui-responsive ssssstable-stripe' data-column-btn-text=''><thead>"
                + "<tr id='L0P1' class='bGrau'>"
                + "<th></th>"
                + "<th id=CUP class='C P cBlau" + (pSort === 'NAME' ? ' U' : '') + "' onclick='showTeilnehmer(\"NAME\")'>Name</th>"
                + "<th id=CUP class='C P cBlau" + (pSort === 'CUP' ? ' U' : '') + "' onclick='showTeilnehmer(\"CUP\")'>Cup<br>1.2.3</th>"
                + "<th id=TURNIER class='C P cBlau" + (pSort === 'TURNIER' ? ' U' : '') + "' onclick='showTeilnehmer(\"TURNIER\")'>Turnier<br>1.2.3</th>"
                + "<th id=PLATZ class='TC P cBlau" + (pSort === 'PLATZ' ? ' U' : '') + "' onclick='showTeilnehmer(\"PLATZ\")'>&Oslash;<br>Platz</th>"
                + "<th id=TN class='TR P cBlau QUER" + (pSort === 'TN' ? ' U' : '') + "' onclick='showTeilnehmer(\"TN\")'>TN</th>"
                + "<th id=PUNKTE class='TR P cBlau QUER" + (pSort === 'PUNKTE' ? ' U' : '') + "' onclick='showTeilnehmer(\"PUNKTE\")'>Punkte</th>"
                + "<th></th>"
                + "</tr>"
                + "</thead><tbody>"
                + html
                + "</tbody></table>";
        if (QUERFORMAT()) {
            html += "<br><table data-role=table class=XS>"
                    + "<tbody>"
                    + "<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;</td></td><th>Legende:</th><td></td></tr>"
                    + "<tr><td></td><td colspan=2>Ein Klick auf die / den</th></tr>"
                    + "<tr><td></td><td><b>Überschrift</b></td><td>blendet alle Details ein oder aus.</td></tr>"
                    + "<tr><td></td><td><b>Spielerzeile</b></td><td>blendet die Details des Spielers ein oder aus.</td></tr>"
                    + "<tr><td></td><td><b>Namen</b></td><td>zeigt die Turnierübersicht.</td></tr>"
                    + "<tr><td></td><td colspan=2>Von Spieler, die in der laufenden Saison noch nicht mitgespielt haben,</th></tr>"
                    + "<tr><td></td><td colspan=2>kann kann die Turnierübersicht nur über die Details aufgerufen werden.</th></tr>"
                    + "</tbody></table><br>";
            $('#dRumpf').html(html).show();
        } else {
            $('#dContent').html(html).show();
        }
        setFont(4.8, true);

        if (QUERFORMAT()) {
            window.scrollTo(0, 0);
            if (window.navigator.userAgent.indexOf("MSIE ") === -1) {
                $('#mTable').stickyTableHeaders({cacheHeaderHeight: true, "fixedOffset": $('#qfHeader')});
            }
        }
    }
}