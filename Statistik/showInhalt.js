
/* global STAT, QUERFORMAT(), CUPS, stCup, jbSpieler, sortNumber, LS, stLastZitat, SAISON, isSaison */

function showInhalt() {

    if (CUPS.TYP[stCup] === 'MT') {
        showUebersichtMT('*');
        return;
    }

    if (jbSpieler.isOpen) {
        jbSpieler.close();
    }

    $('#iPlus,#iMinus').hide();

    $("#sideContent").show();
    $('#sideTurniereMT').html(
            '<li data-role="list-divider">&nbsp;&nbsp;&nbsp;&nbsp;Gesamtstatistiken</li>'
            + '<li data-icon="false"><a id="bCupsieger" onClick="showCupsieger();">&nbsp;Cupsieger</a></li>'
            + '<li data-icon="false"><a id="bTeilnehmerzahlen" onClick="showTeilnehmerzahlen();">&nbsp;Teilnehmerzahlen</a></li>'
            + '<li data-icon="false"><a id="bTeilnehmer" onClick="showTeilnehmer();" ' + (LS.ME === '3425' || LS.ME === '3244' ? '' : 'class="ui-disabled"') + '>&nbsp;Teilnehmer</a></li>'
//            + (stCup === 56 || stCup === 82 ? '<li data-icon="false"><a id="bFotos" onClick="showFotos();">&nbsp;Fotos</a></li>' : '')
            + '<li data-role="list-divider">&nbsp;&nbsp;&nbsp;&nbsp;Allgemeines</li>'
            + '<li data-icon="false"><a id="bTurnierkalender" onClick="showTermine();">&nbsp;Turnierkalender</a></li>'
            + '<li data-icon="false"><a id="bTarifeUndRegeln" onClick="showRegeln();">&nbsp;Tarife und Regeln</a></li>'
            + '<li data-role="list-divider">&nbsp;&nbsp;&nbsp;&nbsp;Archiv</li>').listview('refresh').show();

    var html = '';

    for (var i = 1; i < SAISON.length; i++) {
        html += '<li data-icon="false"><a onClick="showSaison(' + i + ');">&nbsp;' + SAISON[i][isSaison] + '</a></li>';
    }
    $('#dContent').html(html + '<br>').listview('refresh');

    $('#nbUebersicht').addClass('ui-btn-active');
    $('#nbSaison,#nbArchiv').removeClass('ui-btn-active');
    if (QUERFORMAT()) {
        showIcons([]);
    }

    stStat = 'Uebersicht';
    writeCanvas('Vivat Valat!');
    hideEinenMoment();
    setFont();

    var hx = parseInt($(window).innerHeight() - $('#sideContent').offset().top - 1);
    $('#sideContent').css('height', hx + 'px');

    window.scrollTo(0, 0);
    if (QUERFORMAT()) {
        showLogo();
    }
}

function showUebersichtMT(pTurniere) {



    if (jbSpieler.isOpen) {
        jbSpieler.close();
    }

    $("#iPlus,#iMinus").hide();
    showIcons([]);

    var html = '';
    var nTurniere = 0;
    for (var turnier in STAT) {
        if (turnier[0] === '2') {
            nTurniere++;
            if (STAT._AKTTURNIER && STAT._AKTTURNIER._TURNIER === turnier) {
                hDataTheme = ' data-theme="f" ';
                if (STAT._AKTTURNIER._RUNDE <= 3) {
                    var hIchSitzeAuf = '';
                    if (STAT._AKTTURNIER[LS.ME]) {
                        hIchSitzeAuf = '<span class="M N"><br>&nbsp;&nbsp;Ich sitze auf <b>' + STAT._AKTTURNIER[LS.ME][7] + '</b>, <b>' + STAT._AKTTURNIER[LS.ME][8] + '</b> und <b>' + STAT._AKTTURNIER[LS.ME][9] + '</b>.</span>';
                    }
                    html = '<li data-theme="f" data-icon=false><a class="Sbtn K" id="bTischliste" onclick="showTischliste();">&nbsp;<span class="L">Tischliste' + hIchSitzeAuf + '</a></li>'
                            + html;
                }
            } else {
                hDataTheme = '';
            }
            html = '<li ' + hDataTheme + ' data-icon=info><a class="K" id="b' + turnier + '" onclick="showTurnierMW(\'' + turnier + '\');">&nbsp;<span class="L">' + STAT[turnier]._NAME + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="M N"><br>&nbsp;' + (new Date(turnier).toLocaleDateString()) + ', ' + getVeranstalter(STAT[turnier]._VERANSTALTER) + '</span></a>'
                    + '<a onclick="$(\'#hToggle' + nTurniere + '\').toggle(\'show\');">Stockerpl&auml;tze</a></li>'
                    + html;
        }
    }

    pSort = '';

    $('#dContent').html(html + '<br>').listview('refresh').show();

    $('#iMW').prop('checked', true).checkboxradio('refresh');
    $('#iEW').prop('checked', false).checkboxradio('refresh');

    stStat = 'Uebersicht';
    writeCanvas('Vivat Valat!');
    showLogo();
    hideEinenMoment();
    setFont();
    window.scrollTo(0, 0);

    if (pTurniere) {
        $('#nbTurniere').addClass("ui-btn-active");
        $('#nbAllgemeines').removeClass("ui-btn-active");
        $('.cMTallg').hide();
        $('.cMTturn,#dContent').show();
    } else {
        $('#nbTurniere').removeClass("ui-btn-active");
        $('#nbAllgemeines').addClass("ui-btn-active");
        $('.cMTallg').show();
        $('.cMTturn,#dContent').hide();
    }

    $("#sideContent,#sideTurniereMT,#dCopyright").show();
    var hx = parseInt($(window).innerHeight() - $('#sideContent').offset().top - 3);
    $('#sideContent').css('height', hx + 'px');
}

function showAnekdotenMT() {

    if (jbSpieler.isOpen) {
        jbSpieler.close();
    }

    $("#dCopyright").hide();
    showIcons([]);

    var html = '';
    for (var turnier in STAT) {
        if (turnier[0] === '2') {
            if (STAT[turnier]._ANEKDOTE) {
                html = '<tr>'
                        + '<td class=noprint>&nbsp;&nbsp;</td>'
                        + '<td class="M" >' + turnier + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>'
                        + '<td class="cBlau P B L" onclick="showTurnierMW(\'' + turnier + '\');"><span style="white-space:nowrap">' + STAT[turnier]._NAME + '</span></td>'
                        + '<td class="M" nowrap>'
                        + '<tr hidden></tr><tr class="M"><td colspan="4" class=M><div style="text-align:justify;margin: 0 5px 0 44px;">' + STAT[turnier]._ANEKDOTE + '</div></td></tr>'
                        + html;
            }
        }
    }

    pSort = '';

    if (QUERFORMAT()) {
        $('#dRumpf').html(html);
    } else {
        $('#sideTurniereMT').hide();
        $('#dContent').html(html + '<br>').show();
        $('#nbAllgemeines').removeClass('ui-btn-active');
    }

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

function showFotos() {

        if (QUERFORMAT()) {
            if (lastBtn) {
                $(lastBtn).removeClass('ui-btn-active');
            }
            lastBtn = '#bFotos';
            $(lastBtn).addClass('ui-btn-active');
        }

        if (jbSpieler.isOpen) {
            jbSpieler.close();
        }

        if (LS.ME !== "NOBODY") {
            showIcons([]);
        }

        stStat = 'Fotos';
//        stNamenLen = 99;
//        writeCanvas(stStat);
        $("#dCopyright").hide();
//        if (QUERFORMAT()) {
//            $('#dRumpf').html('');
//        } else {
//            $('#dContent').html('');
//            $('#sideTurniereMT').hide();
//            $('#nbUebersicht,#nbSaison,#nbArchiv').removeClass('ui-disabled').removeClass('ui-btn-active');
//            var hx = $(window).innerHeight() - $('#sideContent').offset().top - 1;
//            $('#sideContent').css('height', hx + 'px').scrollTop(0);
//        }

        if (QUERFORMAT()) {
            var hx = $(window).innerWidth() - $('#dRumpf').offset().left - 1;
            $('#qfHeader,#dMargin').hide();
//            $('#dRumpf').html('<iframe src="https://utcklopeinersee.jimdofree.com" height=' + ($(window).innerHeight() - 10) + ' width=' + hx + '></iframe>').show();
            $('#dRumpf').html('<iframe id=myIFrame src="#" height=' + ($(window).innerHeight() - 10) + ' width=' + hx + '></iframe>').show();
//var ifr = document.getElementById('myIFrame');
//if (ifr) {
//  ifr.contentWindow.location.replace('https://utcklopeinersee.jimdofree.com');
//}
$("#myIFrame").get(0).contentWindow.location.replace('https://utcklopeinersee.jimdofree.com');
        } else {
            var hx = $(window).innerHeight() - $('#hfHeaderL').offset().top - 1;
            $('#hfHeader,#sideContent').hide();
            $('#sideTurniereMT').html('<iframe src="https://utcklopeinersee.jimdofree.com" height=' + hx + ' width=' + $(window).innerWidth() + '></iframe>').show();
        }
}