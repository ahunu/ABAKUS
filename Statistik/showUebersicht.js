
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
            '<li data-role="list-divider">&nbsp;&nbsp;&nbsp;&nbsp;Allgemeine Listen</li>'
            + '<li data-icon="false"><a id="bTurnierkalender" onClick="showTermine();">&nbsp;Turnierkalender</a></li>'
            + '<li data-icon="false"><a id="bTarifeUndRegeln" onClick="showRegeln();">&nbsp;Tarife und Regeln</a></li>'
            + '<li data-role="list-divider">&nbsp;&nbsp;&nbsp;&nbsp;Archiv</li>').listview('refresh').show();

    var html = '';
    for (var saison in stSaisonTab) {
        html += '<li data-icon="false"><a onClick="showSaison(stSaisonTab[' + saison + ']);">&nbsp;' + stSaisonTab[saison] + '</a></li>';
    }
    $('#dContent').html(html).listview('refresh');

    $('#nbUebersicht').addClass('ui-btn-active');
    $('#nbArchiv').removeClass('ui-btn-active');
    if (QUERFORMAT()) {
        showIcons([]);
        $('#tArchiv').text('Archiv');
    }

    if (stSaisonTab.length) {
        $('#bAktSaison').removeClass('ui-disabled');
    }
    stStat = 'Uebersicht';
    writeCanvas('Vivat Valat!');
    hideEinenMoment();
    setFont();

    var hx = $(window).innerHeight() - $('#sideContent').offset().top - $('#dFooter').height() - 11;
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
    if (QUERFORMAT()) {
        var hx = $(window).innerHeight() - $('#sideContent').offset().top;
    } else {
        var hx = $(window).innerHeight() - $('#sideContent').offset().top - $('#dFooter').height();
    }
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
    $('#dRumpf').html("<div onclick='showLogo();' style='height:" + hH + 'px; width:' + hW + 'px; background-image: url("../Icons/Background.png"); background-size: 50%; background-position: center; background-repeat: no-repeat;\'></div>');

    var iZitat = stLastZitat;
    do {
        iZitat = Date.now() % 42;
    } while (iZitat === stLastZitat);
    stLastZitat = iZitat;
    if (iZitat === 0) {
        $('#tWeisheit').html('Die Karten sind neu gewürfelt.');
        $('#tWeiser').html('Oliver Kahn, 1969-, dt. Tormann');
    } else if (iZitat === 1) {
        $('#tWeisheit').html('Die Karten sind neu gewürfelt.');
        $('#tWeiser').html('Oliver Kahn, 1969-, dt. Tormann');
    } else if (iZitat === 2) {
        $('#tWeisheit').html('Im Tarock bin ich im Stande,'
                + '<br>den Mitspielenden das Beuschel'
                + '<br>aus dem Leib zu reißen!');
        $('#tWeiser').html('Johann Strauß, 1825-1899, Walzerkönig');
    } else if (iZitat === 3) {
        $('#tWeisheit').html('Wer ohne Sünde ist'
                + '<br>(keine Fehler macht),'
                + '<br>werfe den ersten Stein!');
        $('#tWeiser').html('Jesus von Nazareth');
    } else if (iZitat === 4) {
        $('#tWeisheit').html('Ich kann verlieren,'
                + '<br>aber ich ärgere mich.'
                + '<br>Auch wenn ich Karten spiele.');
        $('#tWeiser').html('Ernst Happel, österr. Fußballtrainer');
    } else if (iZitat === 5) {
        $('#tWeisheit').html('Zuerst hatten wir kein Glück'
                + '<br>und dann kam auch noch Pech dazu.');
        $('#tWeiser').html('Jürgen Wegmann, 1964-, dt. Fußballer');
    } else if (iZitat === 6) {
        $('#tWeisheit').html('Eine Stolz getragene Niederlage'
                + '<br>ist auch ein Sieg.');
        $('#tWeiser').html('Marie von Ebner-Eschenbach, 1830-1916, österr. Schriftstellerin');
    } else if (iZitat === 7) {
        $('#tWeisheit').html('Im Leben kommt es nicht darauf an,'
                + '<br>ein gutes Blatt in der Hand zu haben,'
                + '<br>sondern mit schlechten Karten gut zu spielen.');
        $('#tWeiser').html('Zitat von Unbekannt');
    } else if (iZitat === 8) {
        $('#tWeisheit').html('Ein kluger Mann macht nicht alle Fehler selbst.'
                + '<br>Er gibt auch anderen eine Chance.');
        $('#tWeiser').html('Winston Churchill 1874-1965, engl. Politiker');
    } else if (iZitat === 9) {
        $('#tWeisheit').html('Will man den Charakter eines Menschen erkennen,'
                + '<br>so muß man nur mit ihm Karten spielen.');
        $('#tWeiser').html('Otto von Bismarck, 1815-1898, dt. Reichskanzler');
    } else if (iZitat === 10) {
        $('#tWeisheit').html('Ein guter Spieler versteht es, das Spiel zu gewinnen,'
                + '<br>ein guter Charakter, es lachend zu verlieren.');
        $('#tWeiser').html('Zitat von Unbekannt');
    } else if (iZitat === 11) {
        $('#tWeisheit').html('Das Spiel ist die höchste Form'
                + '<br>der Forschung.');
        $('#tWeiser').html('Albert Einstein, 1879-1955, Physiker und Nobelpreisträger');
    } else if (iZitat === 12) {
        $('#tWeisheit').html('Leute hören nicht auf zu spielen, weil sie alt werden,'
                + '<br>sie werden alt, weil sie aufhören zu spielen!');
        $('#tWeiser').html('Oliver Wendell Holmes, 1809-1894, amerik. Schriftsteller');
    } else if (iZitat === 13) {
        $('#tWeisheit').html('Man kann auf jedem Niveau unzufrieden sein,'
                + '<br>man kann aber auch auf jedem Niveau glücklich sein.');
        $('#tWeiser').html('Manuel Koch, 1987-, querschnittgelämt,'
                + '<br>bekannt aus Wetten dass, nach seinem Unfall');
    } else if (iZitat === 14) {
        $('#tWeisheit').html('Ich weiß nicht immer, wovon ich rede.'
                + '<br>Aber ich weiß, dass ich recht habe.');
        $('#tWeiser').html('Muhammad Ali, 1942-2016, us Boxlegende');
    } else if (iZitat === 15) {
        $('#tWeisheit').html('Ich glaube, dass der Tabellenerste den'
                + '<br>Spitzenreiter jederzeit schlagen kann.');
        $('#tWeiser').html('Berti Vogts, 1946-, dt. Fußballtrainer');
    } else if (iZitat === 16) {
        $('#tWeisheit').html('Ausdauer wird früher oder später belohnt'
                + '<br>- meistens später.');
        $('#tWeiser').html('Wilhelm Busch, 1832-1908, dt. Dichter und Zeichner');
    } else if (iZitat === 17) {
        $('#tWeisheit').html('Ich bin so schnell, dass ich, als ich gestern Nacht'
                + '<br>auf meinen Zimmer das Licht ausschaltete,'
                + '<br>im Bett lag bevor das Licht ausging.');
        $('#tWeiser').html('Muhammad Ali, 1942-2016, us Boxlegende');
    } else if (iZitat === 18) {
        $('#tWeisheit').html('Jeder Mensch hat ein Brett vor dem Kopf'
                + '<br>- es kommt nur auf die Entfernung an.');
        $('#tWeiser').html('Marie von Ebner-Eschenbach, 1830-1916, öst. Schriftstellerin');
    } else if (iZitat === 19) {
        $('#tWeisheit').html('Spielen ist eine Tätigkeit,'
                + '<br>die man nicht ernst genug nehmen kann.');
        $('#tWeiser').html('Jacques Cousteau, 1910-1997, fr. Meeresforscher');
    } else if (iZitat === 20) {
        $('#tWeisheit').html('Gott würfelt nicht.');
        $('#tWeiser').html('Albert Einstein, 1879-1955, dt./us Physiker');
    } else if (iZitat === 21) {
        $('#tWeisheit').html('Das Vergleichen ist das Ende des Glücks'
                + '<br>und der Anfang der Unzufriedenheit.');
        $('#tWeiser').html('Søren Kierkegaard, dän. Philosoph');
    } else if (iZitat === 22) {
        $('#tWeisheit').html('Glück ist kein Geschenk der Götter,'
                + '<br>sondern die Frucht innerer Einstellung.');
        $('#tWeiser').html('Erich Fromm, 1900-1980, dt. Philosoph');
    } else if (iZitat === 23) {
        $('#tWeisheit').html('Wenn man glücklich ist,'
                + '<br>sollte man nicht noch glücklicher sein wollen.');
        $('#tWeiser').html('Theodor Fontane, 1819-1898, dt. Schriftsteller');
    } else if (iZitat === 24) {
        $('#tWeisheit').html('Es ist mein Job, nie zufrieden zu sein.');
        $('#tWeiser').html('Wernher von Braun, 1912-1977, us Raumfahrtpionier');
    } else if (iZitat === 25) {
        $('#tWeisheit').html('Reich wird man erst durch Dinge,'
                + '<br>die man nicht begehrt.');
        $('#tWeiser').html('Mahatma Gandhi, 1869-1948, ind. Publizist und Pazifist');
    } else if (iZitat === 26) {
        $('#tWeisheit').html('Glücksspiel ist das Kind der Habsucht,'
                + '<br>der Bruder der Sittenlosigkeit'
                + '<br>und der Vater des Unheils.');
        $('#tWeiser').html('George Washington, 1732-1799, erster us Präsident');
    } else if (iZitat === 27) {
        $('#tWeisheit').html('Was für ein herrliches Leben hatte ich!'
                + '<br>Ich wünschte nur,'
                + '<br>ich hätte es früher bemerkt');
        $('#tWeiser').html('Colette, 1873-1954, fr. Schriftstellerin und Künstlerin');
    } else if (iZitat === 28) {
        $('#tWeisheit').html('Die wahren Lebenskünstler sind bereits glücklich,'
                + '<br>wenn sie nicht unglücklich sind.');
        $('#tWeiser').html('Jean Anouilh, 1910-1987, fr. Schriftsteller');
    } else if (iZitat === 29) {
        $('#tWeisheit').html('Dumme Gedanken hat jeder,'
                + '<br>aber der Weise verschweigt sie.');
        $('#tWeiser').html('Wilhelm Busch, 1832-1908, dt. Dichter und Zeichner');
    } else if (iZitat === 30) {
        $('#tWeisheit').html('In der Wut verliert der Mensch seine Intelligenz.');
        $('#tWeiser').html('Tenzin Gyatso, 1935-, Dalai Lama');
    } else if (iZitat === 31) {
        $('#tWeisheit').html('Enttäuscht vom Affen, schuf Gott den Menschen.'
                + '<br>Danach verzichtete er auf weitere Experimente.');
        $('#tWeiser').html('Mark Twain, 1835-1910, us Schriftsteller');
    } else if (iZitat === 32) {
        $('#tWeisheit').html('Niemand stirbt als Jungfrau...'
                + '<br>das Leben fickt uns alle.');
        $('#tWeiser').html('Kurt Cobain, 1967-1994, us Sänger und Gitarrist');
    } else if (iZitat === 33) {
        $('#tWeisheit').html('Niemand ist vollkommen:'
                + '<br>Glück heißt, seine Grenzen kennen'
                + '<br>und sie lieben.');
        $('#tWeiser').html('Romain Rolland, 1866-1944, fr. Schriftsteller');
    } else if (iZitat === 34) {
        $('#tWeisheit').html('Wenn man aus einer Niederlage etwas lernt,'
                + '<br>hat man nicht wirklich verloren.');
        $('#tWeiser').html('von Unbekannt');
    } else if (iZitat === 35) {
        $('#tWeisheit').html('Es gibt Tage, an denen man verliert,'
                + '<br>und Tage an denen die anderen gewinnen.');
        $('#tWeiser').html('Klaus Klages alias Graf Fito, 1938-, dt. Philosoph');
    } else if (iZitat === 36) {
        $('#tWeisheit').html('Wer nicht verlieren kann,'
                + '<br>sollte nicht spielen.');
        $('#tWeiser').html('Alexander Daßler, 1969-, IT-Systemtechnicker');
    } else if (iZitat === 37) {
        $('#tWeisheit').html('Niederlagen nimmt man sich zu Herzen,'
                + '<br>Siege steigen zu Kopfe.');
        $('#tWeiser').html('Willy Meurer, 1934-, dt.can. Kaufmann und Publizist');
    } else if (iZitat === 38) {
        $('#tWeisheit').html('Lerne verlieren zu können'
                + '<br>und Du wirst gewinnen.');
        $('#tWeiser').html('Reinhold Bertsch');
    } else if (iZitat === 39) {
        $('#tWeisheit').html('Spieler sind wir doch alle.');
        $('#tWeiser').html('Carl Friedrich von Weizsäcker, 1912-2007, dt. Bundespräsident');
    } else if (iZitat === 40) {
        $('#tWeisheit').html('Ich hasse das Chaos,'
                + '<br>aber das Chaos liebt mich.');
        $('#tWeiser').html('Klaus Klages alias Graf Fito, 1938-, dt. Philosoph');
    } else if (iZitat === 41) {
        $('#tWeisheit').html('Tarock ist der einzige Kampfsport,'
                + '<br>der im Sitzen ausgeführt wird.');
        $('#tWeiser').html('Lore Krainer, Kabarettistin und passionierte Tarockiererin');
    }
    $("#dCopyright").attr('style', "width:" + ($(window).innerWidth() * 0.7) + "px;position: absolute; top: " + ($(window).innerHeight() - $('#dCopyright').height() - 2) + "px; left: " + ($(window).innerWidth() / 100 * 30) + "px;");
    $("#dCopyright").show();
}