
/* global STAT, CUPS, stCup, QUERFORMAT(), stFinale, jbSpieler, SPIELER, PC, LS, getName, getSpielerName, stSaison, ADMIN, SAISON, iSaison, isSaison, stAktTurniere, isAnzTurniere */

function showTurnier(pTurnier) {

    var mMitgespielt = false;

    if (QUERFORMAT()) {
        if (lastBtn) {
            $(lastBtn).removeClass('ui-btn-active');
        }
        lastBtn = '#b' + pTurnier;
        $(lastBtn).addClass('ui-btn-active');
    }

    if (pTurnier) {
        stStat = pTurnier;
    } else {
        pTurnier = stStat;
    }
    stSaison = STAT[pTurnier]._SAISON;
    for (var i = 1; i < SAISON.length; i++) {
        if (SAISON[i][0] === stSaison) {
            iSAISON = SAISON[i][0];
        }
    }

    if (jbSpieler.isOpen) {
        jbSpieler.close();
    }
    $("#dCopyright").hide();

    if (QUERFORMAT()) {
        writeCanvas(pTurnier + '  ' + STAT[pTurnier]._NAME);
    } else {
        writeCanvas(STAT[pTurnier]._NAME);
    }

    $('#iEdit').removeClass('cBlau B');

    var i = 0;
    var nSpieler = 0;
    var hClass = '';

    stNamenLen = 0.38;

    if (STAT._LASTTURNIER && STAT._LASTTURNIER.substr(0, 10) === pTurnier) {
        if (!LS.GelesenSTAT[stCup] || LS.GelesenSTAT[stCup] !== CUPS.MELDSTAT[stCup]) {
            LS.GelesenSTAT[stCup] = CUPS.MELDSTAT[stCup];
            localStorage.setItem('Abakus.LS', JSON.stringify(LS));
        } else if (LS.GelesenSTAT[stCup]) {
            LS.GelesenSTAT[stCup] = null;
            localStorage.setItem('Abakus.LS', JSON.stringify(LS));
        }
    }

    var html = getStatMeldungen()
            + (QUERFORMAT() ? "<div id='dFilter' class='noprint'><input class='N M' id='iFilter' placeholder='Nachname, Vorname," + (QUERFORMAT() ? " Ort," : "") + " ...'></div>" : "")
            + "<table id=mTable data-role='table' data-filter='true' data-input='#iFilter' data-mode='columntoggle' cellspacing='0' class='table ui-body-d ui-shadow ui-responsive table-stripe' data-column-btn-text=''><thead>"
            + "<tr id='L0P1' class='bGrau'>"
            + "<th class=TR>#&nbsp;&nbsp;</th>"
            + (QUERFORMAT() && LS.ShowSpielerNr ? "<th class=TC>Nr.&nbsp;</th>" : "")
            + "<th>&nbspName</th>"
            + (QUERFORMAT() ? "<th>&nbspOrt</th>" : "")
            + (QUERFORMAT() ? "<th class=TR>Cup&nbsp;</th>" : "")
            + "<th class=TR>Ges&nbsp;</th>"
            + "<th class=TR>R1&nbsp;</th>"
            + "<th class=TR>R2&nbsp;</th>"
            + "<th class=TR>R3&nbsp;</th>"
            + "</tr></thead><tbody id=tbody>"
            + (!QUERFORMAT() ? "<tr id='rFilter'><td colspan='5'><input class='N M' id='iFilter' placeholder='Nachname, Vorname, ...'></td>"
                    + "<td class=TC><i id='icFilter' onclick='$(this).addClass(\"ui-disabled\");$(\"#iFilter\").val(\"\").blur();$(\"#tbody\").find(\"tr\").show();' class='i zmdi-plus-bold zmdi-hc-rotate-45 ui-disabled'></i></td></tr>" : "");

    var SORT = [];

    for (var iSpieler in STAT[pTurnier]) {
        if (iSpieler[0] !== '_') {
            SORT[SORT.length] = ''
                    + (2000 - STAT[pTurnier][iSpieler][4])
                    + (2000 - Math.max(STAT[pTurnier][iSpieler][1], STAT[pTurnier][iSpieler][2], STAT[pTurnier][iSpieler][3]))
                    + (2000 + Math.min(STAT[pTurnier][iSpieler][1], STAT[pTurnier][iSpieler][2], STAT[pTurnier][iSpieler][3]))
                    + ';' + iSpieler;
            if (iSpieler === LS.ME) {
                mMitgespielt = true;
            }
        }
    }

    if (LS.ME !== "NOBODY") {
        var hIcons = [];
        if (LS.ME === '3425'
                || LS.ME === 'xx3757' && stCup === 56     // Erwin Haider
                || LS.ME === 'xx4731' && stCup === 15) {  // Alexandra Sabkovski
            hIcons = ['#iPrint', '#iDownload'];
        } else {
            hIcons = ['#iPrint'];
        }
        if (mMitgespielt) {
            hIcons.unshift('#iScrollToMe'); // #iScrollToMe auf [0].
        }
        showIcons(hIcons);
    }

    SORT.sort();

    for (var ii = 0; ii < SORT.length; ii++) {
        var iSpieler = SORT[ii].substring((SORT[ii].lastIndexOf(';') + 1));
        nSpieler++;

        if (iSpieler === LS.ME) {
            hClass = 'bBeige';
        } else {
            hClass = '';
            if (istFreund(iSpieler)) {
                hClass = ' bBeige2';
            }
            if (LS.tempVIPs) {
                if (LS.tempVIPs.indexOf(iSpieler) > 0) {
                    hClass = ' bBeige2';
                }
            }
        }

        html += '<tr ' + (iSpieler === LS.ME ? 'id="tr' + LS.ME + '"' : '') + ' class="' + hClass + '">'
                + '<td class="TR">&nbsp;' + nSpieler + '.&nbsp;</td>';
        if (LS.ShowSpielerNr && QUERFORMAT()) {
            html += '<td class=TC>' + (isNaN(iSpieler) ? '????' : iSpieler) + '&nbsp;</td>';
        }
        html += '<td class=link><span id="sp' + iSpieler + '" onclick="event.stopPropagation();popupSpieler(\'' + iSpieler + '\');" class="P ' + (iSpieler === LS.ME ? 'cSchwarz' : 'cBlau') + '">' + (getName(iSpieler).replace(' ', '&nbsp;')) + '</span></td>';
        if (QUERFORMAT()) {
            html += '<td>' + getSpielerOrt(iSpieler, true) + '</td>'
                    + '<td class=TR>' + getFixPunkte(pTurnier, iSpieler) + '&nbsp;</td>';
        }
        html += '<th class="TR">' + STAT[pTurnier][iSpieler][4] + '&nbsp;</th>'
                + '<td class="TR">' + STAT[pTurnier][iSpieler][1] + '&nbsp;</td>'
                + '<td class="TR">' + STAT[pTurnier][iSpieler][2] + '&nbsp;</td>'
                + '<td class="TR">' + STAT[pTurnier][iSpieler][3] + '&nbsp;</td>'
                + '</tr>';
    }

    html += "</tbody></table><br>";

    if (QUERFORMAT()) {
        $('#dRumpf').html(html + "<table width=100% data-role='table' data-mode='columntoggle' cellspacing='0' class='table XXS'>"
                + "<tbody><tr>"
                + "<td>&nbsp;&nbsp;&nbsp;&copy; 2015-" + new Date().getFullYear() + " by Leo Luger</td>"
                + "<td class=TC>" + (stCup === 56 ? "" : "") + "</td>"
                + (stCup === 53 ? "<td class=TR>tarock.web.app?Sauwaldcup&nbsp;</td>" : "")
                + (stCup === 54 ? "<td class=TR>tarock.web.app?St.Tarockcup&nbsp;</td>" : "")
                + (stCup === 55 ? "<td class=TR>tarock.web.app?Tirolcup&nbsp;</td>" : "")
                + (stCup === 56 ? "<td class=TR>tarock.web.app?Wr.Tarockcup&nbsp;</td>" : "")
                + (stCup === 15 ? "<td class=TR>tarock.web.app?Stadl Tarock&nbsp;</td>" : "")
                + "</tr></tbody></table>").css('margin-top', $('#qfHeader').height() + 'px');
        $('#tStand').hide();
    } else {
//        $('#sideContent').css('height', '2px');
        $('#sideTurniere').hide();
        $("#dContent").html(html + "&nbsp;&nbsp;&nbsp;<span class='XXS'>&copy; 2015-" + new Date().getFullYear() + " by Leo Luger<br><br></span>");
        $('#sideTurniere').hide();
        $('#nbUebersicht,#nbSaison,#nbArchiv').removeClass('ui-disabled').removeClass('ui-btn-active');
        var hx = $(window).innerHeight() - $('#sideContent').offset().top - 1;
        $('#sideContent').css('height', hx + 'px').scrollTop(0);
        $('#nbTurniere,.nbFilter').removeClass('ui-btn-active');
    }

    hideEinenMoment();
    setFont(4.7, true);

//    if (QUERFORMAT()) {
    window.scrollTo(0, 0);
    if (window.navigator.userAgent.indexOf("MSIE ") === -1) {
        $('#mTable').stickyTableHeaders({cacheHeaderHeight: true, "fixedOffset": $('#qfHeader')});
    }
//    }

    if (QUERFORMAT() && PC) {
        $(".cBlau,.cSchwarz").on("mouseenter", function () {
            $("#sideTurniere,#sideContent").hide();
            var hID = $(this).attr('id');
            html = '<div data-role="navbar">'
                    + '<ul>'
                    + '<li><a href="#" class="ui-btn-active">'
                    + ((isNaN(hID.substr(2)) || !PC) ? '' : '<span class="N">' + hID.substr(2) + '</span>&nbsp;&nbsp;') + getSpielerName(hID.substr(2)).replace(' ', '&nbsp;') + (iSaison === 1 ? '' : '&nbsp;&nbsp;-&nbsp;&nbsp;' + stSaison + ' ') + (!isNaN(hID.substr(2)) && isVERSTORBEN(SPIELER[hID.substr(2)][4]) ? '&nbsp;&#134;' : '') + (QUERFORMAT() && stStat !== "Platzierungen" ? '' : '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + getSpielerOrt(hID.substr(2), true))
                    + '</a></li>'
                    + '</ul>'
                    + '</div>';
            $("#sideSpieler").html(html + getSpieler(hID.substr(2))).trigger('create').show();
        });
        $('.cBlau,.cSchwarz').on("mouseleave", function () {
            $("#sideSpieler").hide();
            $("#sideTurniere,#sideContent").show();
        });
    }

}

function isVERSTORBEN(pSchalter) {
    return ((pSchalter & 2) !== 0);
}

function getSpieler(pSpieler, pSaison) {

    if (!pSaison) {
        if (stSaison) {
            pSaison = stSaison;
        } else {
            pSaison = SAISON[1][0];
        }
    }

    if (!pSaison) {
        pSaison = stSaison;
    }
    var nWertungen = stAktTurniere;
    if (pSaison !== stSaison) {
        for (var iS in SAISON) {
            if (SAISON[iS][isSaison] === pSaison) {
                nWertungen = SAISON[pSaison][isAnzTurniere];
                break;
            }
        }
    }

    if (nWertungen > 10) {
        nWertungen = parseInt(nWertungen / 2);
    } else {
        nWertungen = parseInt((nWertungen + 1) / 2);
    }

    var html = "<table data-role='table' data-mode='columntoggle' cellspacing='0' class='ui-body-d ui-shadow ui-responsive table-stripe' data-column-btn-text=''><thead>"
            + "<tr class='bGrau sM'>"
            + "<th class=TR>#&nbsp;</th>"
            + "<th>&nbsp;Turnier&nbsp;</th>";
    if (CUPS.TYP[stCup] !== 'MT') {
        html += "<th class=TR nowrap>Cup&nbsp;</th>";
    }
    html += "<th class=TR nowrap>Ges&nbsp;</th>";
    if (QUERFORMAT()) {
        html += "<th class=TR>R1&nbsp;</th>"
                + "<th class=TR>R2&nbsp;</th>"
                + "<th class=TR>R3&nbsp;</th>";
    }
    html += "</tr></thead><tbody class=sM>";

    var position = '';
    var positionen = '';
    var cuppunkte = 0;
    var aCuppunkte = [];
    var oCuppunkte = {};
    var hCuppunkte = 0;
    if (CUPS.TYP[stCup] === 'CUP') {
        for (var iTurnier in STAT) {
            if (iTurnier[0] === '2' && STAT[iTurnier]._SAISON === pSaison) {
                if (STAT[iTurnier][pSpieler]) {
                    hCuppunkte = getHeinePunkte(iTurnier, pSpieler);
                    if (!isNaN(hCuppunkte)) {
                        aCuppunkte.push([900 - getHeinePunkte(iTurnier, pSpieler), iTurnier]);
                    }
                }
            }
        }
        if (aCuppunkte.length) {
            aCuppunkte.sort();
            for (var i = 0; i < aCuppunkte.length && i < nWertungen; i++) {
                cuppunkte += (parseInt(aCuppunkte[i][0]) - 900) * -1;
                if (cuppunkte > 0) {
                    oCuppunkte[aCuppunkte[i][1]] = (parseInt(aCuppunkte[i][0]) - 900) * -1;
                }
            }
        }

        if (cuppunkte && aCuppunkte.length > 1) {
            positionen = '<tr class=bGrau>'
                    + '<td></td>'
                    + '<th class=TC>Gesamt</th>'
                    + '<th class="TR" nowrap>' + cuppunkte + '&nbsp;</th>';
            if (QUERFORMAT()) {
                positionen += '<th class="TC" colspan="4">Cuppunkte&nbsp;&nbsp;<i onclick="event.stopPropagation();$(\'#jbSpielerHelp\').toggle();" class="i zmdi-info P"></i></th>';
            } else {
                positionen += '<th></th>';
            }
            positionen += '</tr>';
        }
    }

    var tName = '';
    nTurniere = 0;
    for (var iTurnier in STAT) {
        if (iTurnier[0] === '2' && (STAT[iTurnier]._SAISON === pSaison || CUPS.TYP[stCup] !== 'CUP')) {
            if (STAT[iTurnier][pSpieler]) {
                nTurniere++;
                tName = STAT[iTurnier]._NAME;
                if (QUERFORMAT()) {
                    if (tName.length > 28) {
                        if (tName[28] === ' ') {
                            tName = tName.substr(0, 27);
                        } else {
                            tName = tName.substr(0, 27) + '.';
                        }
                    }
                } else {
                    if (tName.length > 20) {
                        if (tName[20] === ' ') {
                            tName = tName.substr(0, 19);
                        } else {
                            tName = tName.substr(0, 19) + '.';
                        }
                    }
                }

                position = '<tr>'
                        + '<td class="TR" nowrap>&nbsp;' + STAT[iTurnier][pSpieler][0] + '.</td>'
                        + '<td nowrap>&nbsp;' + tName + '</td>';
                if (CUPS.TYP[stCup] !== 'MT') {
                    if (oCuppunkte[iTurnier]) {
                        position += '<th class="TR" nowrap>' + getHeinePunkte(iTurnier, pSpieler) + '&nbsp;</th>';
                    } else if (getHeinePunkte(iTurnier, pSpieler) === '-') {
                        position += '<td class="TR" nowrap>-&nbsp;</td>';
                    } else {
                        position += '<td class="TR" nowrap><span class=LT>' + getHeinePunkte(iTurnier, pSpieler) + '</span>&nbsp;</td>';
                    }
                }
                position += '<th class="TR" nowrap>' + STAT[iTurnier][pSpieler][4] + '&nbsp;</th>';
                if (QUERFORMAT()) {
                    position += '<td class="TR" nowrap>' + STAT[iTurnier][pSpieler][1] + '&nbsp;</td>'
                            + '<td class="TR" nowrap>' + STAT[iTurnier][pSpieler][2] + '&nbsp;</td>'
                            + '<td class="TR" nowrap>' + STAT[iTurnier][pSpieler][3] + '&nbsp;</td>';
                }
                position += '</tr>';
                positionen = position + positionen;
            }
        }
    }

    return html + positionen + "</tbody></table>";

}

function popupSpieler(pSpieler, pSaison) {

    if (!pSaison) {
        if (stSaison) {
            pSaison = stSaison;
        } else {
            pSaison = SAISON[1][0];
        }
    }
    var html = "<table data-role='table' data-mode='columntoggle' cellspacing='0' class='ui-body-d ui-shadow ui-responsive table-stripe' data-column-btn-text=''><thead>"
            + "<tr class='bGrau sM'>"
            + "<th class=TR>#&nbsp;</th>"
            + "<th>&nbsp;Turnier&nbsp;</th>";
    if (CUPS.TYP[stCup] !== 'MT') {
        html += "<th class=TR nowrap>Cup&nbsp;</th>";
    }
    html += "<th class=TR nowrap>Ges&nbsp;</th>";
    if (QUERFORMAT()) {
        html += "<th class=TR>R1&nbsp;</th>"
                + "<th class=TR>R2&nbsp;</th>"
                + "<th class=TR>R3&nbsp;</th>";
    }
    html += "</tr></thead><tbody class=sM>";

    $('#jbSpielerHelp').hide();

    var position = '';
    var positionen = '';
    var cuppunkte = 0;
    var aCuppunkte = [];
    var oCuppunkte = {};
    var hCuppunkte = 0;
    if (CUPS.TYP[stCup] === 'CUP') {
        for (var iTurnier in STAT) {
            if (iTurnier[0] === '2' && STAT[iTurnier]._SAISON === pSaison && iTurnier !== stFinale) {
                if (STAT[iTurnier][pSpieler]) {
                    hCuppunkte = getHeinePunkte(iTurnier, pSpieler);
                    if (!isNaN(hCuppunkte)) {
                        aCuppunkte.push([900 - getHeinePunkte(iTurnier, pSpieler), iTurnier]);
                    }
                }
            }
        }
        if (aCuppunkte.length) {
            aCuppunkte.sort();
            for (var i = 0; i < aCuppunkte.length && i < parseInt(CUPS.TURNIER[stCup]); i++) {
                cuppunkte += (parseInt(aCuppunkte[i][0]) - 900) * -1;
                if (cuppunkte > 0) {
                    oCuppunkte[aCuppunkte[i][1]] = (parseInt(aCuppunkte[i][0]) - 900) * -1;
                }
            }
        }
        if (stFinale) {
            hCupPunkte = getHeinePunkte(stFinale, pSpieler);
            if (!isNaN(hCupPunkte)) {
                cuppunkte += parseInt(hCupPunkte);
            }
        }

        if (cuppunkte && aCuppunkte.length > 1) {
            positionen = '<tr class=bGrau>'
                    + '<td></td>'
                    + '<th class=TC>Gesamt</th>'
                    + '<th class="TR" nowrap>' + cuppunkte + '&nbsp;</th>';
            if (QUERFORMAT()) {
                positionen += '<th class="TC" colspan="4">Cuppunkte&nbsp;&nbsp;<i onclick="event.stopPropagation();$(\'#jbSpielerHelp\').toggle();" class="i zmdi-info P"></i></th>';
            } else {
                positionen += '<th></th>';
            }
            positionen += '</tr>';
        }
    }
    var tName = '';
    nTurniere = 0;
    for (var iTurnier in STAT) {
        if (iTurnier[0] === '2' && (STAT[iTurnier]._SAISON === pSaison || CUPS.TYP[stCup] !== 'CUP')) {
            if (STAT[iTurnier][pSpieler]) {
                nTurniere++;
                tName = STAT[iTurnier]._NAME;
                if (QUERFORMAT()) {
                    if (tName.length > 28) {
                        if (tName[28] === ' ') {
                            tName = tName.substr(0, 27);
                        } else {
                            tName = tName.substr(0, 27) + '.';
                        }
                    }
                } else {
                    if (tName.length > 20) {
                        if (tName[20] === ' ') {
                            tName = tName.substr(0, 19);
                        } else {
                            tName = tName.substr(0, 19) + '.';
                        }
                    }
                }

                position = '<tr>'
                        + '<td class="TR" nowrap>&nbsp;' + STAT[iTurnier][pSpieler][0] + '.</td>'
                        + '<td nowrap>&nbsp;' + tName + '</td>';
                if (CUPS.TYP[stCup] !== 'MT') {
                    if (oCuppunkte[iTurnier] || iTurnier === stFinale) {
                        position += '<th class="TR" nowrap>' + getHeinePunkte(iTurnier, pSpieler) + '&nbsp;</th>';
                    } else if (getHeinePunkte(iTurnier, pSpieler) === '-') {
                        position += '<td class="TR" nowrap>-&nbsp;</td>';
                    } else {
                        position += '<td class="TR" nowrap><span class=LT>' + getHeinePunkte(iTurnier, pSpieler) + '</span>&nbsp;</td>';
                    }
                }
                position += '<th class="TR" nowrap>' + STAT[iTurnier][pSpieler][4] + '&nbsp;</th>';
                if (QUERFORMAT()) {
                    position += '<td class="TR" nowrap>' + STAT[iTurnier][pSpieler][1] + '&nbsp;</td>'
                            + '<td class="TR" nowrap>' + STAT[iTurnier][pSpieler][2] + '&nbsp;</td>'
                            + '<td class="TR" nowrap>' + STAT[iTurnier][pSpieler][3] + '&nbsp;</td>';
                }
                position += '</tr>';
                positionen = position + positionen;
            }
        }
    }

    html = html + positionen + "</tbody></table>";

    if (!jbSpieler.isOpen) {
        jbSpieler.open();
    }

    $('#jbSpielerTitel').html(((isNaN(pSpieler) || !PC) ? '' : pSpieler + '&nbsp;&nbsp;') + getSpielerName(pSpieler).replace(' ', '&nbsp;') + (stSaison === pSaison ? '' : '&nbsp;&nbsp;-&nbsp;&nbsp;' + pSaison + ' ') + (!isNaN(pSpieler) && isVERSTORBEN(SPIELER[pSpieler][4]) ? '&nbsp;&#134;' : '') + (QUERFORMAT() && stStat !== "Platzierungen" ? '' : '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + getSpielerOrt(pSpieler, true)));
    var hFont = 0;
    if (nTurniere <= 4) {
        hFont = 2.8;
    } else {
        hFont = 2.8 - ((nTurniere - 4) * 0.03);
    }
    hFont += 'vh';
    $('#jbSpielerContent').html(html).css('font-size', hFont);
}