
/* global STAT, QUERFORMAT(), CUPS, stCup, jbSpieler, sortNumber, LS, stLastZitat, SAISON, isSaison */

function showInhalt() {

    if (jbSpieler.isOpen) {
        jbSpieler.close();
    }

    $('#sideTurniere,#iPlus,#iMinus').hide();

    $("#sideContent").show();

    var html = '';

    if (stCup === 49 || stCup === 51 || stCup === 52) {
        html = '<li data-role="list-divider">&nbsp;&nbsp;&nbsp;&nbsp;Allgemeines</li>'
                + (CUPS.MELDAKT[stCup]
                        ? '<li data-icon="false"><a id="bAktuelles" onClick="showAktuelles();">&nbsp;Aktuelles</a></li>'
                        : ''
                        )
                + '<li data-icon="false"><a id="bTurnierkalender" onClick="showTermine();">&nbsp;Turnierkalender</a></li>';
    } else if (CUPS.TYP[stCup] === 'CUP') {
        html = '<li data-role="list-divider">&nbsp;&nbsp;&nbsp;&nbsp;Gesamtstatistiken</li>'
                + '<li data-icon="false"><a id="bCupsieger" onClick="showCupsieger();" ' + (LS.ME !== 'NOBODY' ? '' : 'class="ui-disabled"') + '>&nbsp;Cupsieger</a></li>'
                + '<li data-icon="false"><a id="bTeilnehmerzahlen" onClick="showTeilnehmerzahlen();" ' + (LS.ME !== 'NOBODY' ? '' : 'class="ui-disabled"') + '>&nbsp;Teilnehmerzahlen</a></li>'
                + '<li data-icon="false"><a id="bBestenliste" onClick="showBestenliste();" ' + (LS.ME !== 'NOBODY' ? '' : 'class="ui-disabled"') + '>&nbsp;Ewige Bestenliste</a></li>'
                + '<li data-role="list-divider">&nbsp;&nbsp;&nbsp;&nbsp;Allgemeines</li>'
                + (CUPS.MELDAKT[stCup] || CUPS.BEREadmin[stCup].indexOf(LS.ME) >= 0 || CUPS.BEREschreiben[stCup].indexOf(LS.ME) >= 0
                        ? '<li data-icon="false"><a id="bAktuelles" onClick="showAktuelles();">&nbsp;Aktuelles</a></li>'
                        : ''
                        )
                + '<li data-icon="false"><a id="bTurnierkalender" onClick="showTermine();">&nbsp;Turnierkalender</a></li>'
                + '<li data-icon="false"><a id="bTarifeUndRegeln" onClick="showRegeln();">&nbsp;Tarife und Regeln</a></li>'
                + '<li data-role="list-divider">&nbsp;&nbsp;&nbsp;&nbsp;Archiv</li>';
    } else if (CUPS.TYP[stCup] === 'ET' || CUPS.TYP[stCup] === 'MT') {
        html = '<li data-role="list-divider">&nbsp;&nbsp;&nbsp;&nbsp;Statistiken</li>'
                + '<li data-icon="false"><a id=bCupwertung onclick="showCupwertung();">&nbsp;Gesamtwertung</a></li>'
                + '<li data-icon="false"><a id=bHeinewertung onclick="showHeinewertung();">&nbsp;Heinewertung</a></li>'
                + '<li data-icon="false"><a id="bBestenliste" onClick="showBestenliste();" ' + (LS.ME !== 'NOBODY' ? '' : 'class="ui-disabled"') + '>&nbsp;Ewige Bestenliste</a></li>'
                + '<li data-icon="false"><a id=bPlatzierungen onclick="showPlatzierungen();">&nbsp;Platzierungen</a></li>'
                + '<li data-icon="false"><a id="bTeilnehmerzahlen" onClick="showTeilnehmerzahlen();" ' + (LS.ME !== 'NOBODY' ? '' : 'class="ui-disabled"') + '>&nbsp;Teilnehmerzahlen</a></li>'
                + (QUERFORMAT()
                        ? '<li data-icon="foto"><a id=bChronik onclick="showChronik()">&nbsp;Chronik</a><a id="bParallaxCh" onclick="showParallax(true);"></a></li>'
                        : '')
                + '<li data-role="list-divider">&nbsp;&nbsp;&nbsp;&nbsp;Allgemeines</li>'
                + (CUPS.MELDAKT[stCup] || CUPS.BEREadmin[stCup].indexOf(LS.ME) >= 0 || CUPS.BEREschreiben[stCup].indexOf(LS.ME) >= 0
                        ? '<li data-icon="false"><a id="bAktuelles" onClick="showAktuelles();">&nbsp;Aktuelles</a></li>'
                        : ''
                        )
                + '<li data-icon="false"><a id="bTurnierkalender" onClick="showTermine();">&nbsp;Turnierkalender</a></li>'
                + '<li data-icon="false"><a id="bTarifeUndRegeln" onClick="showRegeln();">&nbsp;Tarife und Regeln</a></li>';
    }

    if (CUPS.TYP[stCup] === 'CUP') {
        for (var i = 1; i < SAISON.length; i++) {
            html += '<li data-icon="false"><a onClick="showSaison(' + i + ');">&nbsp;' + SAISON[i][isSaison] + '</a></li>';
        }
    }
    $('#dContent').html(html + '<br>').listview('refresh');

    $('#nbUebersicht').addClass('ui-btn-active');
    $('#nbSaison,#nbArchiv').removeClass('ui-btn-active');

    showIcons([]);


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
        $('.cMTturn,#dContent').show();
    } else {
        $('#nbTurniere').removeClass("ui-btn-active");
        $('#nbAllgemeines').addClass("ui-btn-active");
        $('.cMTturn,#dContent').hide();
    }

    $("#sideContent,#sideTurniere,#dCopyright").show();
    var hx = parseInt($(window).innerHeight() - $('#sideContent').offset().top - 3);
    $('#sideContent').css('height', hx + 'px');
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