
/* global LS, stCup, STAT, jbSpieler, QUERFORMAT(), getName */

function showTischliste() {

    if (QUERFORMAT()) {
        if (lastBtn) {
            $(lastBtn).removeClass('ui-btn-active');
        }
        lastBtn = '#bTischliste';
        $(lastBtn).addClass('ui-btn-active');
    }

    if (STAT._AKTTURNIER) {
        if (STAT._AKTTURNIER._TURNIER === stHeute && STAT._AKTTURNIER._RUNDE <= 3) {
            stStat = 'Tischliste';
        }
    }

    var pTurnier = STAT._AKTTURNIER._TURNIER;

    $("#dCopyright").hide();

    if (ADMIN) {
        if (LS.ME === '3425') {
            showIcons(['#iDownload', '#iPrint', '#iAnekdote']);
        } else {
            showIcons(['#iPrint', '#iAnekdote']);
        }
    } else if (stCup === 54 && (LS.ME === '3590' || LS.ME === '3629')       // Hafner Hans, Timoschek Kurt
            || stCup === 56 && (LS.ME === '3322' || LS.ME === '2037')) {    // Braun Sigi, Sedlacek Robert
        showIcons(['#iAnekdote']);
    } else if (STAT[pTurnier]._ANEKDOTE) {
        showIcons(['#iAnekdote']);
    } else {
        showIcons([]);
    }

    if (jbSpieler.isOpen) {
        jbSpieler.close();
    }

    if (QUERFORMAT()) {
        writeCanvas(pTurnier + '  Tischliste');
    } else {
        writeCanvas('Tischliste');
    }

    $('#iAnekdote').removeClass('cBlau B');

    var i = 0;

    var htmlTE = '';
    var hCupName = '';
    var nSpieler = 0;
    var hClass = '';

    stNamenLen = 0.48;

    var html = getStatMeldungen()
            + "<div id='dFilter' class='noprint'><input class='N M' id='iFilter' placeholder='Nachname, Vorname," + (QUERFORMAT() ? " Ort," : "") + " ...'></div>"
            + "<table width=100% id=mTable data-role='table'  data-filter='true' data-input='#iFilter'  data-mode='columntoggle' cellspacing='0' class='table ui-body-d ui-shadow ui-responsive table-stripe' data-column-btn-text=''><thead>"
            + "<tr id='L0P1' class='bGrau'>"
            + "<th class=TC>Nr.&nbsp;</th>"
            + "<th>&nbspName</th>";
    if (QUERFORMAT()) {
        html += "<th>&nbspOrt</th>";
    }
    html += "<th class=TR>R1&nbsp;</th>"
            + "<th class=TR>R2&nbsp;</th>"
            + "<th class=TR>R3&nbsp;</th>"
            + "</tr></thead><tbody id=tbody>";

    var SORT = [];

    for (var iSpieler in STAT._AKTTURNIER) {
        if (iSpieler[0] !== '_') {
            SORT[SORT.length] = STAT._AKTTURNIER[iSpieler][0] + ';' + iSpieler;
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
                + '<td class=TC>' + (isNaN(iSpieler) ? '????' : iSpieler) + '&nbsp;</td>'
                + '<td class=link><span onclick="event.stopPropagation();popupSpieler(\'' + iSpieler + '\');" class="P' + (STAT._AKTTURNIER[LS.ME] && STAT._AKTTURNIER[LS.ME][STAT._AKTTURNIER._RUNDE + 6] === STAT._AKTTURNIER[iSpieler][STAT._AKTTURNIER._RUNDE + 6] ? ' B' : '') + (iSpieler === LS.ME ? ' cSchwarz' : ' cBlau') + '">' + (getName(iSpieler).replace(' ', '&nbsp;')) + '</span></td>';
        if (QUERFORMAT()) {
            html += '<td>' + STAT._AKTTURNIER[iSpieler][6] + '</td>'; // Ort / Mannschaft
        }
        html += '<td class="TR' + (STAT._AKTTURNIER[LS.ME] && STAT._AKTTURNIER[LS.ME][7] === STAT._AKTTURNIER[iSpieler][7] ? ' B' : '') + '">' + STAT._AKTTURNIER[iSpieler][7] + '&nbsp;</td>'
                + '<td class="TR' + (STAT._AKTTURNIER[LS.ME] && STAT._AKTTURNIER[LS.ME][8] === STAT._AKTTURNIER[iSpieler][8] ? ' B' : '') + '">' + STAT._AKTTURNIER[iSpieler][8] + '&nbsp;</td>'
                + '<td class="TR' + (STAT._AKTTURNIER[LS.ME] && STAT._AKTTURNIER[LS.ME][9] === STAT._AKTTURNIER[iSpieler][9] ? ' B' : '') + '">' + STAT._AKTTURNIER[iSpieler][9] + '&nbsp;</td>'
                + '</tr>';
    }

    html += "</tbody></table><br>";

    if (QUERFORMAT()) {
        $('#dRumpf').html(html + "<table width=100% data-role='table' data-mode='columntoggle' cellspacing='0' class='table XXS'>"
                + "<tbody><tr>"
                + "<td>&nbsp;&nbsp;&nbsp;&copy; 2015-" + new Date().getFullYear() + " by Leo Luger</td>"
                + "<td class=TC>" + (stCup === 56 ? "Siegfried Braun" : "") + "</td>"
                + "<td class=TR>tarock.firebaseapp.com?" + (stCup === 56 ? 'Wr.' : 'St.') + "Tarockcup&nbsp;</td>"
                + "</tr></tbody></table><br>");
        if (window.navigator.userAgent.indexOf("MSIE ") === -1) {
            $('#mTable').stickyTableHeaders({cacheHeaderHeight: true, "fixedOffset": $('#qfHeader')});
        }
    } else {
        $("#dContent").html(html + "&nbsp;&nbsp;&nbsp;<span class='XXS'>&copy; 2015-" + new Date().getFullYear() + " by Leo Luger<br><br></span>");
        $('#sideDetails').hide();
        $('#nbUebersicht,#nbArchiv,#bAktSaison').removeClass('ui-disabled').removeClass('ui-btn-active');
        var hx = $(window).innerHeight() - $('#dContent').offset().top - $('#dFooter').height();
        $('#sideContent').css('height', hx + 'px');
    }

    hideEinenMoment();

    setFont();
    window.scrollTo(0, 0);

    $('#tStand').hide();
}