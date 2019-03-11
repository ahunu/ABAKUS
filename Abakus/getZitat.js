
function getZitat() {

    var iZitat = stLastZitat;
    do {
        iZitat = Date.now() % 52;
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
                return ['Wer nicht liebt Wein, Weib und Gesang,'
                    + '<br>bleibt ein Narr sein Leben lang.',
            'Martin Luther, 1483-1546, dt. Theologe und Reformator'];
    } else if (iZitat === 48) {
        return ['Wir schätzen die Menschen,'
                    + '<br>die frisch und offen ihre Meinung sagen -'
                    + '<br>vorausgesetzt sie meinen dasselbe wie wir.',
            'Mark Twain, 1835-1910, amerik.&nbsp;Schriftsteller'];
    } else if (iZitat === 49) {
        return ['Man bleibt jung, solange man noch lernen,'
                    + '<br>neue Gewohnheiten annehmen und'
                    + '<br>Widerspruch ertragen kann.',
            'Marie von Ebner-Eschenbach, <span style="white-space: nowrap">1830-1916, österr. Schriftstellerin</span>'];
    } else if (iZitat === 50) {
        return ['Nicht die Glücklichen sind dankbar.'
                    + '<br>Es sind die Dankbaren die glücklich sind',
            'Francis Bacon, 1561-1626, engl. Philosoph'];
    } else if (iZitat === 51) {
        return ['Bier ist der Beweis,'
                    + '<br>dass Gott uns liebt und will,'
                    + '<br>dass wir glücklich sind.',
            'Benjamin Franklin, 1706-1790,<br>amerik. Erfinder und Politiker'];
    } else if (iZitat === 52) {
        return [''
                    + '<br>',
            ''];
    } else if (iZitat === 53) {
        return [''
                    + '<br>',
            ''];
    } else if (iZitat === 54) {
        return [''
                    + '<br>',
            ''];
    } else if (iZitat === 55) {
        return [''
                    + '<br>',
            ''];
    } else if (iZitat === 56) {
        return [''
                    + '<br>',
            ''];
    } else if (iZitat === 57) {
        return [''
                    + '<br>',
            ''];
    } else if (iZitat === 58) {
        return [''
                    + '<br>',
            ''];
    } else if (iZitat === 59) {
        return [''
                    + '<br>',
            ''];
    }
}