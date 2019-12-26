
/* global STAT, SAISON, isAnzTeilnehmer, isSaison, isAnzTeilnahmen, isAnzTurniere, jbSpieler, LS */

function showTeilnehmerzahlen() {

    var nGesTeilnehmer = 0;

    function getAbweichung(pSaison) {
        var dSaison = parseInt((SAISON[pSaison][isAnzTeilnahmen] / SAISON[pSaison][isAnzTurniere]) + 0.5);
        var dGesamt = parseInt((STAT._ANZTEILNAHMEN / STAT._ANZTURNIERE) + 0.5);
        if (dSaison === dGesamt) {
            return "&plusmn;0,0 %";
        } else {
            hRet = (dSaison - dGesamt) / (dGesamt / 1000);
            if (hRet >= 0.05) {
                hRet = parseInt(hRet + 0.05);
                return '+' + parseInt(hRet / 10) + ',' + parseInt(hRet % 10) + ' %';
            } else if (hRet <= -0.05) {
                hRet = parseInt(hRet - 0.05);
                return parseInt(hRet / 10) + ',' + Math.abs(parseInt(hRet % 10)) + ' %';
            } else {
                return "&plusmn;0,0 %";
            }
        }
    }

    if (QUERFORMAT()) {
        if (lastBtn) {
            $(lastBtn).removeClass('ui-btn-active');
        }
        lastBtn = '#bTeilnehmerzahlen';
        $(lastBtn).addClass('ui-btn-active');
    }

    if (jbSpieler.isOpen) {
        jbSpieler.close();
    }

    if (LS.ME !== "NOBODY") {
        showIcons(['#iPrint']);
    }

    stStat = 'Teilnehmerzahlen';
    stNamenLen = 99;
    writeCanvas(stStat);
    $("#dCopyright").hide();

    if (QUERFORMAT()) {
        $('#dRumpf').html('');
    } else {
        $('#dContent').html('');
        $('#sideTurniere').hide();
        $('#nbUebersicht,#nbSaison,#nbArchiv').removeClass('ui-disabled').removeClass('ui-btn-active');
        var hx = $(window).innerHeight() - $('#sideContent').offset().top - 1;
        $('#sideContent').css('height', hx + 'px').scrollTop(0);
    }

    var html = "";

    for (var iSaison = 1; iSaison < SAISON.length; iSaison++) {
        if (SAISON[iSaison][isAnzTurniere]) {
            nGesTeilnehmer += SAISON[iSaison][isAnzTeilnehmer];
            html += "<tr>"
                    + "<td class=TC>&nbsp;" + SAISON[iSaison][isSaison] + "</td>"
                    + "<td class=TC>" + SAISON[iSaison][isAnzTurniere] + "</td>"
                    + (QUERFORMAT() ? "<td class=TR>" + SAISON[iSaison][isAnzTeilnehmer] + "&nbsp;&nbsp;&nbsp;</td>" : "")
                    + "<td class=TR>" + SAISON[iSaison][isAnzTeilnahmen] + "&nbsp;&nbsp;&nbsp;</td>"
                    + "<td class=TR>" + parseInt((SAISON[iSaison][isAnzTeilnahmen] / SAISON[iSaison][isAnzTurniere]) + 0.5) + "&nbsp;&nbsp;&nbsp;&nbsp;</td>"
                    + "<td class=TR>" + getAbweichung(iSaison) + "&nbsp;&nbsp;</td>"
                    + (QUERFORMAT() ? "<td class=TC>" + STAT._PUNKTEPOTENTIAL[iSaison] + "</td>" : "")
                    + (QUERFORMAT() ? "<td></td>" : "")
                    + "</tr>";
        }
    }

    html = "<table id=mTable data-role='table' data-filter='true' data-input='#iFilter' data-mode='columntoggle' cellspacing='0' class='table ui-body-d ui-shadow ui-responsive table-stripe' data-column-btn-text=''><tbody>"
            + "<tr id='L0P1' class='bGrau'>"
            + "<th class=TL></th>"
            + "<th xclass=TR></th>"
            + "<th class=TR>Teil-&nbsp;&nbsp;&nbsp;</th>"
            + (QUERFORMAT() ? "<th class=TR>Teil-&nbsp;&nbsp;&nbsp;</th>" : "")
            + "<th class=TR>&#216; pro&nbsp;</th>"
            + "<th class=TR>Abwei.&nbsp;&nbsp;</th>"
            + (QUERFORMAT() ? "<th class=TC>&#216;&nbsp;</th>" : "")
            + (QUERFORMAT() ? "<td>&nbsp;&nbsp;&nbsp;&nbsp;</td>" : "")
            + "</tr>"

            + "<tr id='L0P1' class='bGrau'>"
            + "<th class=TL></th>"
            + "<th xclass=TR>" + (QUERFORMAT() ? "Turniere" : "Turn.") + "</th>"
            + (QUERFORMAT() ? "<th class=TR>nehmer</th>" : "")
            + "<th class=TR>nahmen</th>"
            + "<th class=TR>Turnier</th>"
            + "<th class=TR>vom &#216;&nbsp;&nbsp;</th>"
            + (QUERFORMAT() ? "<th class=TC>Gewinn&nbsp;</th>" : "")
            + (QUERFORMAT() ? "<td></td>" : "")
            + "</tr>"
            + html;
    if (CUPS.TYP[stCup] === 'CUP') {
        html += "<tr class='bGrau'>"
                + "<th class=TC>&nbsp;Gesamt</th>"
                + "<td class=TC>" + STAT._ANZTURNIERE + "</td>"
                + (QUERFORMAT() ? "<td></td>" : "")
                + "<td class=TR>" + STAT._ANZTEILNAHMEN + "&nbsp;&nbsp;&nbsp;</td>"
                + "<td class=TR>" + parseInt((STAT._ANZTEILNAHMEN / STAT._ANZTURNIERE) + 0.5) + "&nbsp;&nbsp;&nbsp;&nbsp;</td>"
                + "<td class=TR></td>"
                + (QUERFORMAT() ? "<td></td>" : "")
                + (QUERFORMAT() ? "<td></td>" : "")
                + "</tr>";
        html += "<tr class='bGrau'>"
                + "<th class=TC>&nbsp;Im&nbsp;Schnitt</th>"
                + "<td class=TC>" + parseInt((STAT._ANZTURNIERE / STAT._ANZSAISONEN) + 0.5) + "</td>"
                + (QUERFORMAT() ? "<td class=TR>" + parseInt((nGesTeilnehmer / STAT._ANZSAISONEN) + 0.5) + "&nbsp;&nbsp;&nbsp;</td>" : "")
                + "<td class=TR>" + parseInt((STAT._ANZTEILNAHMEN / STAT._ANZSAISONEN) + 0.5) + "&nbsp;&nbsp;&nbsp;</td>"
                + "<td class=TR>" + parseInt((STAT._ANZTEILNAHMEN / STAT._ANZTURNIERE) + 0.5) + "&nbsp;&nbsp;&nbsp;&nbsp;</td>"
                + "<td class=TR></td>"
                + (QUERFORMAT() ? "<td class=TC>" + STAT._PUNKTEPOTENTIAL[0] + "</td>" : "")
                + (QUERFORMAT() ? "<td></td>" : "")
                + "</tr>";
    }

    html += "</tbody></table>"
            + "<br>"

            + '<div class=S style="margin: 2vw;text-align:justify"><b>Legende:</b><br>'
            + 'Der <b>durchschnittliche Gewinn</b> ist eine statistische Größe der Turnierergebnisse, welche '
            + 'in verschiedenen Cups nach unterschiedlichen Regeln erreicht wurden, vergleichbar machen soll. '
            + 'Er markiert jene Punktezahl die für einen guten Spieler, ohne den sprichwörtlichen Erdäpfeln in der Tasche, erreichbar sein sollte. '
            + 'Der durchschnittliche Gewinn darf nicht mit dem durchschnittlichen Turnierergebnis verwechselt werden. Letzterer ist nämlich immer Null.'
            + '<br><br></div>'

            + "<div style='font-size:1.2vw;font-weight: normal;text-align:center'>"
            + (QUERFORMAT() ? "&mdash;&mdash; &copy; 2015-2019 by Leo Luger &mdash;&mdash;" : "")
            + "</div>";

    if (QUERFORMAT()) {
        $('#dRumpf').html(html).css('margin-top', $('#qfHeader').height() + 'px');
    } else {
        $('#dContent').html(html);
    }
    setFont(4.8, true);
}