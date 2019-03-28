
/* global STAT, QUERFORMAT(), CUPS, stCup, jbSpieler, sortNumber, LS, CUPSIEGER, stSaisonTab, stLastZitat */

function showUebersicht() {

    if (CUPS.TYP[stCup] === 'MT') {
        showUebersichtMT('*');
        return;
    }

    if (jbSpieler.isOpen) {
        jbSpieler.close();
    }

    $('#iPlus,#iMinus,#sideContentMT').hide();

    $("#sideContent").show();
    $('#sideDetails').html(
            '<li data-role="list-divider">&nbsp;&nbsp;&nbsp;&nbsp;Gesamtstatistiken</li>'
            + '<li data-icon="false"><a id="bCupsieger" onClick="showCupsieger();">&nbsp;Cupsieger</a></li>'
            + '<li data-icon="false"><a id="bTeilnehmerzahlen" onClick="showTeilnehmerzahlen();">&nbsp;Teilnehmerzahlen</a></li>'
            + '<li data-role="list-divider">&nbsp;&nbsp;&nbsp;&nbsp;Allgemeines</li>'
            + '<li data-icon="false"><a id="bTurnierkalender" onClick="showTermine();">&nbsp;Turnierkalender</a></li>'
            + '<li data-icon="false"><a id="bTarifeUndRegeln" onClick="showRegeln();">&nbsp;Tarife und Regeln</a></li>'
            + '<li data-role="list-divider">&nbsp;&nbsp;&nbsp;&nbsp;Archiv</li>').listview('refresh').show();

    var html = '';

    for (var i = 1; i < stSaisonTab.length; i++) {
        html += '<li data-icon="false"><a onClick="showSaison(stSaisonTab[' + i + ']);">&nbsp;' + stSaisonTab[i] + '</a></li>';
    }
    $('#dContent').html(html).listview('refresh');

    $('#nbUebersicht').addClass('ui-btn-active');
    $('#nbSaison,#nbArchiv').removeClass('ui-btn-active');
    if (QUERFORMAT()) {
        showIcons([]);
    }

    stStat = 'Uebersicht';
    writeCanvas('Vivat Valat!');
    hideEinenMoment();
    setFont();

    var hx = parseInt($(window).innerHeight() - $('#sideContent').offset().top - $('#dFooter').height() - 1);
    $('#sideContent').css('height', hx + 'px');

    window.scrollTo(0, 0);
    if (QUERFORMAT()) {
        showLogo();
    }
}

function showUebersichtMT() {

    if (jbSpieler.isOpen) {
        jbSpieler.close();
    }

    $("#iPlus,#iMinus,#sideContentMT").hide();
    showIcons([]);

    var html = '';
    var nTurniere = 0;
    for (var turnier in STAT) {
        if (turnier[0] === '2') {
            nTurniere++;
            if (STAT._AKTTURNIER && STAT._AKTTURNIER._TURNIER === turnier) {
                if (STAT._AKTTURNIER._RUNDE <= 3) {
                    html = '<li data-theme="f" data-icon=false><a class="Sbtn" id="bTischliste" onclick="showTischliste();">&nbsp;<span class="L">Tischliste</span></a></li>'
                            + html;
                }
                html = '<li data-theme="f" data-icon=false><a id="b' + turnier + '" class="Sbtn" onclick="showTurnierMW(\'' + turnier + '\');">&nbsp;<span class="L">' + STAT[turnier]._NAME + '</span><span class="M N"><br>&nbsp;' + (new Date(turnier).toLocaleDateString()) + '</span></a></li>'
                        + html;
            } else {
                html = '<li data-icon=false><a id="b' + turnier + '" class="Sbtn" onclick="showTurnierMW(\'' + turnier + '\');">&nbsp;<span class="L">' + STAT[turnier]._NAME + '</span><span class="M N"><br>&nbsp;' + (new Date(turnier).toLocaleDateString()) + '</span></a></li>'
                        + html;
            }
        }
    }

    pSort = '';

    $('#dContent').html(html).listview('refresh').show();

    $('#iMW').prop('checked', true).checkboxradio('refresh');
    $('#iEW').prop('checked', false).checkboxradio('refresh');

    stStat = 'Uebersicht';
    writeCanvas('Vivat Valat!');
    showLogo();
    hideEinenMoment();
    setFont();
    window.scrollTo(0, 0);

    $("#sideContent,#sideDetails,#dContent,#dCopyright").show();
    var hx = parseInt($(window).innerHeight() - $('#sideContent').offset().top - $('#dFooter').height() - 3);
    $('#sideContent').css('height', hx + 'px');
}

function showAnekdotenMT() {

    if (jbSpieler.isOpen) {
        jbSpieler.close();
    }

    $("#dCopyright").hide();
    showIcons([]);

    var html = '';
    var nTurniere = 0;
    for (var turnier in STAT) {
        if (turnier[0] === '2') {
            nTurniere++;
            html = '<tr>'
                    + '<td class=noprint>&nbsp;&nbsp;</td>'
                    + '<td class="cBlau P B L" onclick="showTurnier(\'' + turnier + '\');"><span style="white-space:nowrap">' + STAT[turnier]._NAME + '</span></td>'
                    + '<td class="M" >' + turnier + '&nbsp;</td>'
                    + '<td class="M" nowrap>'
                    + (STAT[turnier]._ANEKDOTE
                            ? '<tr hidden></tr>'
                            + '<tr id="a' + nTurniere + '" class="M"><td colspan="4" class=M><div style="text-align:justify;margin: 0 5px 0 44px;">' + STAT[turnier]._ANEKDOTE + '</div></td></tr>'
                            : ''
                            )
                    + html;
        }
    }

    pSort = '';

    $('#dRumpf').html(html).listview('refresh').show();

    stStat = 'Anekdoten';
    writeCanvas('Anekdoten');

    setFont();
    window.scrollTo(0, 0);
    $("#dCopyright").hide();

}

function setMwEwWertung(pWertung) {
    if (pWertung === 'MW') {
        $('#iMW').prop('checked', true).checkboxradio('refresh');
        $('#iEW').prop('checked', false).checkboxradio('refresh');
    } else {
        $('#iMW').prop('checked', false).checkboxradio('refresh');
        $('#iEW').prop('checked', true).checkboxradio('refresh');
    }
    if (stStat[0] === '2' && QUERFORMAT()) {
        showTurnierMW(stStat);
    }
}

function showLogo() {
    var hH = parseInt($(window).innerHeight() / 1.2);
    var hW = parseInt($(window).innerWidth() / 1.5);
    $('#dRumpf').html("<div onclick='showLogo();' style='height:" + hH + 'px; width:' + hW + 'px; background-image: url("../Icons/Background.png"); background-size: 50%; background-position: center; background-repeat: no-repeat;\'></div>').show();

    var hZitat = getZitat();
    $('#tWeisheit').html(hZitat[0]);
    $('#tWeiser').html(hZitat[1]);

    $("#dCopyright").attr('style', "width:" + ($(window).innerWidth() * 0.72) + "px;position: absolute; top: " + ($(window).innerHeight() - $('#dCopyright').height() - 2) + "px; left: " + ($(window).innerWidth() / 100 * 28) + "px;").show();
}