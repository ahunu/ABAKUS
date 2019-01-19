
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

    var hZitat = getZitat();
    $('#tWeisheit').html(hZitat[0]);
    $('#tWeiser').html(hZitat[1]);

    $("#dCopyright").attr('style', "width:" + ($(window).innerWidth() * 0.72) + "px;position: absolute; top: " + ($(window).innerHeight() - $('#dCopyright').height() - 2) + "px; left: " + ($(window).innerWidth() / 100 * 28) + "px;");
    $("#dCopyright").show();
}


function getZitat() {

    var iZitat = stLastZitat;
    do {
        iZitat = Date.now() % 47;
    } while (iZitat === stLastZitat);

    stLastZitat = iZitat;

    if (iZitat === 0) {
        return ['Frauen sind da um geliebt, '
                    + '<br>nicht um verstanden zu werden.',
            'Oscar Wilde, 1854-1900, irischer Schriftsteller'];
    } else if (iZitat === 1) {
        return ['Die Karten sind neu gewürfelt.',
            'Oliver Kahn, 1969-, dt. Tormann'];
    } else if (iZitat === 2) {
        return ['Im Tarock bin ich im Stande,'
                    + '<br>den Mitspielenden das Beuschel'
                    + '<br>aus dem Leib zu reißen!',
            'Johann Strauß, 1825-1899, Walzerkönig'];
    } else if (iZitat === 3) {
        return ['Wer ohne Sünde ist'
                    + '<br>(keine Fehler macht),'
                    + '<br>werfe den ersten Stein!',
            'Jesus von Nazareth'];
    } else if (iZitat === 4) {
        return ['Ich kann verlieren,'
                    + '<br>aber ich ärgere mich.'
                    + '<br>Auch wenn ich Karten spiele.',
            'Ernst Happel, österr.&nbsp;Fußballtrainer'];
    } else if (iZitat === 5) {
        return ['Zuerst hatten wir kein Glück'
                    + '<br>und dann kam&nbsp;auch&nbsp;noch&nbsp;Pech&nbsp;dazu.',
            'Jürgen Wegmann, 1964-, dt.&nbsp;Fußballer'];
    } else if (iZitat === 6) {
        return ['Eine Stolz getragene Niederlage'
                    + '<br>ist auch ein Sieg.',
            'Marie von Ebner-Eschenbach, <span style="white-space: nowrap">1830-1916, österr. Schriftstellerin</span>'];
    } else if (iZitat === 7) {
        return ['Im Leben kommt es nicht&nbsp;darauf&nbsp;an,'
                    + '<br>ein gutes Blatt in&nbsp;der&nbsp;Hand&nbsp;zu&nbsp;haben,'
                    + '<br>sondern mit schlechten Karten gut&nbsp;zu&nbsp;spielen.',
            'Zitat von Unbekannt'];
    } else if (iZitat === 8) {
        return ['Ein kluger Mann macht&nbsp;nicht&nbsp;alle&nbsp;Fehler&nbsp;selbst.'
                    + '<br>Er gibt auch anderen eine&nbsp;Chance.',
            'Winston Churchill, 1874-1965, engl.&nbsp;Politiker'];
    } else if (iZitat === 9) {
        return ['Will man den Charakter eines&nbsp;Menschen&nbsp;erkennen,'
                    + '<br>so muß man nur mit&nbsp;ihm&nbsp;Karten&nbsp;spielen.',
            'Otto von Bismarck, 1815-1898, dt.&nbsp;Reichskanzler'];
    } else if (iZitat === 10) {
        return ['Ein guter Spieler versteht es, das&nbsp;Spiel&nbsp;zu&nbsp;gewinnen,'
                    + '<br>ein guter Charakter, es&nbsp;lachend&nbsp;zu&nbsp;verlieren.',
            'Zitat von Unbekannt'];
    } else if (iZitat === 11) {
        return ['Das Spiel ist die höchste Form'
                    + '<br>der Forschung.',
            'Albert Einstein, 1879-1955, Physiker&nbsp;und&nbsp;Nobelpreisträger'];
    } else if (iZitat === 12) {
        return ['Leute hören nicht auf zu spielen, weil&nbsp;sie&nbsp;alt&nbsp;werden,'
                    + '<br>sie werden alt, weil&nbsp;sie&nbsp;aufhören&nbsp;zu&nbsp;spielen!',
            'Oliver Wendell Holmes, 1809-1894, amerik.&nbsp;Schriftsteller'];
    } else if (iZitat === 13) {
        return ['Man kann auf jedem Niveau unzufrieden sein,'
                    + '<br>man kann aber auch auf jedem Niveau glücklich sein.',
            'Manuel Koch, 1987-, querschnittgelämt,'
                    + '<br>bekannt aus Wetten dass, nach&nbsp;seinem&nbsp;Unfall'];
    } else if (iZitat === 14) {
        return ['Ich weiß nicht immer, wovon&nbsp;ich&nbsp;rede.'
                    + '<br>Aber ich weiß, dass&nbsp;ich&nbsp;recht&nbsp;habe.',
            'Muhammad&nbsp;Ali, <span style="white-space: nowrap">1942-2016, amerik. Boxlegende</span>'];
    } else if (iZitat === 15) {
        return ['Ich glaube, dass&nbsp;der&nbsp;Tabellenerste'
                    + '<br>den Spitzenreiter jederzeit&nbsp;schlagen&nbsp;kann.',
            'Berti Vogts, 1946-, dt.&nbsp;Fußballtrainer'];
    } else if (iZitat === 16) {
        return ['Ausdauer wird früher oder&nbsp;später&nbsp;belohnt'
                    + '<br>- meistens später.',
            'Wilhelm Busch, 1832-1908, dt.&nbsp;Dichter&nbsp;und&nbsp;Zeichner'];
    } else if (iZitat === 17) {
        return ['Ich bin so schnell, dass ich, als&nbsp;ich&nbsp;gestern&nbsp;Nacht'
                    + '<br>auf meinen Zimmer das&nbsp;Licht&nbsp;ausschaltete,'
                    + '<br>im Bett lag bevor das&nbsp;Licht&nbsp;ausging.',
            'Muhammad&nbsp;Ali, <span style="white-space: nowrap">1942-2016, amerik. Boxlegende</span>'];
    } else if (iZitat === 18) {
        return ['Jeder Mensch hat ein Brett&nbsp;vor&nbsp;dem&nbsp;Kopf'
                    + '<br>- es kommt nur auf die Entfernung an.',
            'Marie von Ebner-Eschenbach, <span style="white-space: nowrap">1830-1916, österr. Schriftstellerin</span>'];
    } else if (iZitat === 19) {
        return ['Spielen ist eine Tätigkeit,'
                    + '<br>die man nicht ernst genug nehmen kann.',
            'Jacques Cousteau, 1910-1997, fr.&nbsp;Meeresforscher'];
    } else if (iZitat === 20) {
        return ['Gott würfelt nicht.',
            'Albert Einstein, 1879-1955, Physiker&nbsp;und&nbsp;Nobelpreisträger'];
    } else if (iZitat === 21) {
        return ['Frauen sind da um geliebt, '
                    + '<br>nicht um verstanden zu werden.',
            'Oscar Wilde, 1854-1900, irischer Schriftsteller'];
    } else if (iZitat === 22) {
        return ["Hint' noch is' a jeder a Prophet.",
            'Johann Nepomuk Nestroy, 1801-1862,<br>österr. Dramatiker, Schauspieler und Opernsänger'];
    } else if (iZitat === 23) {
        return ['Es macht keinen Sinn,'
                    + '<br>mit Männern zu streiten -'
                    + '<br>sie haben ja doch immer unrecht.',
            'Zsa Zsa Gabor, 1934-1998, ung.&nbsp;amerik.&nbsp;Schauspielerin'];
    } else if (iZitat === 24) {
        return ['Es ist mein Job, nie&nbsp;zufrieden&nbsp;zu&nbsp;sein.',
            'Wernher von Braun, 1912-1977, dt.amerik.&nbsp;Raumfahrtpionier'];
    } else if (iZitat === 25) {
        return ['Reich wird man erst durch Dinge,'
                    + '<br>die man nicht begehrt.',
            'Mahatma Gandhi, 1869-1948, ind.&nbsp;Publizist&nbsp;und&nbsp;Pazifist'];
    } else if (iZitat === 26) {
        return ['Glücksspiel ist das Kind der Habsucht,'
                    + '<br>der Bruder der Sittenlosigkeit'
                    + '<br>und der Vater des Unheils.',
            'George Washington, 1732-1799, erster&nbsp;amerik.&nbsp;Präsident'];
    } else if (iZitat === 27) {
        return ['Was für ein herrliches Leben hatte&nbsp;ich!'
                    + '<br>Ich wünschte nur,'
                    + '<br>ich hätte es früher bemerkt',
            'Colette, 1873-1954, fr.&nbsp;Schriftstellerin&nbsp;und&nbsp;Künstlerin'];
    } else if (iZitat === 28) {
        return ['Ich bereue nichts im Leben, '
                    + '<br>außer dem, was ich nicht getan habe.',
            'Coco Chanel, 1883-1971, franz. Desingnerin'];
    } else if (iZitat === 29) {
        return ['Dumme Gedanken hat jeder,'
                    + '<br>aber der Weise verschweigt sie.',
            'Wilhelm Busch, 1832-1908, dt.&nbsp;Dichter&nbsp;und&nbsp;Zeichner'];
    } else if (iZitat === 30) {
        return ['In der Wut verliert der Mensch seine Intelligenz.',
            'Tenzin Gyatso, 1935-, Dalai&nbsp;Lama'];
    } else if (iZitat === 31) {
        return ['Enttäuscht vom Affen, schuf&nbsp;Gott&nbsp;den&nbsp;Menschen.'
                    + '<br>Danach verzichtete er auf weitere&nbsp;Experimente.',
            'Mark Twain, 1835-1910, amerik.&nbsp;Schriftsteller'];
    } else if (iZitat === 32) {
        return ['Niemand stirbt als Jungfrau...'
                    + '<br>das Leben fickt uns alle.',
            'Kurt Cobain, 1967-1994, amerik.&nbsp;Sänger&nbsp;und&nbsp;Gitarrist'];
    } else if (iZitat === 33) {
        return ['Männer haben keine Geduld.'
                    + '<br>Darum haben sie auch den'
                    + '<br>Reißverschluss erfunden.',
            'Senta Berger, 1941-, österr.dt. Schauspielerin'];
    } else if (iZitat === 34) {
        return ['Wenn man aus einer Niederlage etwas lernt,'
                    + '<br>hat man nicht wirklich verloren.',
            'von Unbekannt'];
    } else if (iZitat === 35) {
        return ['Es gibt Tage, an denen man&nbsp;verliert,'
                    + '<br>und Tage an denen die&nbsp;anderen&nbsp;gewinnen.',
            'Klaus Klages alias Graf Fito, <span style="white-space: nowrap">1938-, dt. Philosoph</span>'];
    } else if (iZitat === 36) {
        return ['Wer nicht verlieren kann,'
                    + '<br>sollte nicht spielen.',
            'Alexander Daßler, 1969-, <span style="white-space: nowrap">IT-Systemtechnicker</span>'];
    } else if (iZitat === 37) {
        return ['Niederlagen nimmt man sich zu&nbsp;Herzen,'
                    + '<br>Siege steigen zu Kopfe.',
            'Willy Meurer, 1934-, dt.can.&nbsp;Kaufmann&nbsp;und&nbsp;Publizist'];
    } else if (iZitat === 38) {
        return ["Ich könnt' weinen,"
                    + "<br>was aus mir hätt' werden können.",
            'Günther Nenning, 1921-2006, österr.&nbsp;Querdenker'];
    } else if (iZitat === 39) {
        return ['Spieler sind wir doch alle.',
            'Carl Friedrich von Weizsäcker, <span style="white-space: nowrap">1912-2007, dt. Bundespräsident</span>'];
    } else if (iZitat === 40) {
        return ['Ich hasse das Chaos,'
                    + '<br>aber das Chaos liebt mich.',
            'Klaus Klages alias Graf Fito, <span style="white-space: nowrap">1938-, dt. Philosoph</span>'];
    } else if (iZitat === 41) {
        return ['Tarock ist der einzige&nbsp;Kampfsport,'
                    + '<br>der im Sitzen ausgeführt wird.',
            'Lore Krainer, Kabarettistin und&nbsp;passionierte&nbsp;Tarockiererin'];
    } else if (iZitat === 42) {
        return ['Man muss sein Glück teilen,'
                    + '<br>um es zu multiplizieren.',
            'Marie von Ebner-Eschenbach, <span style="white-space: nowrap">1830-1916, österr. Schriftstellerin</span>'];
    } else if (iZitat === 43) {
        return ['Fußball ist wie Schach.'
                    + '<br>Nur ohne Würfel.',
            'Jan Böhmermann, 1981-, dt. Satiriker'];
    } else if (iZitat === 44) {
        return ['Wir müssen gewinnen.'
                    + '<br>Alles andere ist primär.',
            'Hans Krankl, 1953-, österr. Fußballlegende'];
    } else if (iZitat === 45) {
        return ['Wir haben keine Chance -'
                    + '<br>und die müssen wir nützen.',
            'Hans Krankl, 1953-, österr. Fußballlegende'];
    } else if (iZitat === 46) {
        return ['Kein Alkohol'
                    + '<br>ist auch keine Lösung.',
            'Campino alias Andreas Frege, 1962-&nbsp;dt.&nbsp;Sänger'];
    } else if (iZitat === 47) {
    } else if (iZitat === 48) {
    } else if (iZitat === 49) {
    } else if (iZitat === 50) {
    } else if (iZitat === 51) {
    } else if (iZitat === 52) {
    } else if (iZitat === 53) {
    }
}