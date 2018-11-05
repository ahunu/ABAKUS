
/* global CUPS, I, hHeute, LS */

function showText(pText) {
    if (!QUERFORMAT()) {
        window.location.href = 'Abakus/Text.html?' + pText;
        return;
    }
    $('#dCopyright').each(function () { // sonst funktioniert important nicht
        this.style.setProperty('display', 'none', 'important');
    });
    $('#qfHeaderIcon').show();
    resetLastBtn();
    lastBtn = '#b' + pText;
    $(lastBtn).addClass('ui-btn-active');

    var html = '';
    var hH = parseInt($(window).innerHeight() - $('#qfHeader').height() - 4);
    html = '<div style="width:100%; margin-left: auto; margin-right: auto; overflow-y: auto; height:' + hH + 'px; background-image: url(\'Icons/Background.png\'); background-size: 50%; background-position: center center; background-repeat: no-repeat; ">'
            + '<div style="width: 80%; padding: 1em; margin: 3em auto;">';

    var hTitel2 = '';
    if (pText === 'TippsUndTricks') {
        writeCanvas('Tipps und Tricks');
    } else {
        writeCanvas(pText);
    }

    if (pText === 'Geschichte') {
        hTitel2 = 'Die Geschichte des Tarockspiels';
        html += getGeschichte();
    } else if (pText === 'Anekdoten') {
        hTitel2 = 'Hoppalas und andere Geschichten';
        html += getAnekdoten();
    } else if (pText === 'Zitate') {
        hTitel2 = '';
        html += showLogo();
    } else if (pText === 'Links') {
        hTitel2 = 'Die wichtigsten Tarocklinks';
        html += getLinks();
    } else if (pText === 'Etikette') {
        hTitel2 = 'Benehmen ist gefragt';
        html += getEtikette();
    } else if (pText === 'TippsUndTricks') {
        hTitel2 = 'Gewusst wie';
        html += getTippsUndTricks();
    }
    html += '</html></html>';
    $('#qfHeaderZeile2').html(hTitel2);
    $('#dRumpf').html(html).trigger('create');
}

function getGeschichte() {

    if (LS.ME === '3244' || LS.ME === '3425' || LS.ME === '6162') {
        showEineMeldung('Format:',' B: ' + $(window).width() + ', H: ' + $(window).height() + '<BR> B: ' + $(window).innerWidth() + ', H: ' + $(window).innerHeight());

    }

    return '<span class=M style="text-align:justify">'

            + '<p>Spielkarten werden in einer Handschrift eines Mönches Johannes aus dem Jahre 1377 erstmalig schriftlich erwähnt. Der Mönch, der sich als "Deutscher" bezeichnete, lebte in einem schweizer Kloster. Die Handschrift befindet sich heute im Britischen Museum.'

            + '<p>Johannes schreibt von vier Farbserien mit je 13 Karten. Nämlich König, Oberer Marschall, Unterer Marschall und zehn Nummernkarten von eins bis zehn. Mit Oberer Marschall und Unterer Marschall finden wir bereits die Vorformen von Ober, Unter und Cavall. Den Aufzeichnungen zufolge waren 1377 bereits sechs verschiedene Kartenspiele bekannt.'

            + '<p>Aus den Darstellung des Mönchs und aus anderen verläßlichen Quellen ist abzuleiten, daß sich das Kartenspiel mit Beginn des 14. Jahrhunderts entwickelte und zu Ende des Jahrhunderts einen hohen Entwicklungsstand erreichte.'

            + '<p>Spielkarten dürften ursprünglich eher ein Privileg der obersten Schichten gewesen sein, insbesondere weil diese zu der Zeit handgemalt wurden und einen entsprechenden Preis hatten. Überdies hätte das einfache Volk mit Kartenspielen, die eine gewisse Fertigkeit im Rechnen erfordern, wenig anfangen können.'

            + '<p>Im Jahr 1423 predigte der Hl. Bernadin von Siena in Bologna bereits in bewegten Worten nicht nur gegen das Würfel-, sondern auch gegen das Kartenspiel. Aus der Zeit um 1460 ist eine weitere Predigt überliefert in der ein Dominikaner in Oberitalien gegen Würfel, Karten und Trionfi wetterte.'

            + '<p>Die "trionfi", auch "tarocchi" oder "atutti" bezeichnet, kamen bereits als Reihe von 21 oder 22 Spielkarten vor, sind also die unmittelbaren "Vorfahren" unserer 22 Tarock. Da diese abstrakte Namen hatten, welche mit den Begriffen der anderen Kartenreihen nicht in Verbinung stehen, wird daraus geschlossen, daß es sich bei den "trionfi" oder "tarocchi" um ein ursprünglich eigenes Kartenspiel, gehandelt hat.'

            + '<p>Irgendwann wurden dann die vier traditionellen Farbreihen mit den "trionfi" oder "tarocchi" zu eine Kartenspiel zusammenzufügen.'

            + '<p>Auffallend ist, daß sich an der Zahl der 21 bzw. 22 "tarocchi" sozusagen vom ersten Moment an, nichts mehr geändert hat. Zu den 52 Karten der vier Farbreihen zu je 13 Karten (Werte 1 bis 10, König, Ober und Unter) kamen später angeblich in Venedig noch die 4 Damen (Königinnen) dazu.'

            + '<p>Die Herkunft der Namens "tarocco", bzw. dessen Mehrzahl "tarocchi" ist allerdings bis heute vollkommen unklar.'

            + '<p>In einen Rechnungsbuch des Herzoghofes von Ferrara aus dem Jahr 1442 wird der Ankauf eines Pakets von "trionfi-Karten" erwähnt. An anderer Stelle wird vom Erwerb von gleich vier Paketen Triumpf-Karten gesprochen. Am Hof von Ferrara wurde wohl ausgiebig tarockiert.'

            + '<p>Aus der erwähnten Dominikanerpredikt von ca. 1460 ist zu schließen, dass damals bereits weitere Kreise, wahrscheinlich in Nachahmung höfischer Sitten, dem Tarockspiel frönten. Es ist nämlich kaum vorstellbar, dass ein Prediger sich in einer öffentlichen Ansprache gegen das Vergnügen bloß einer kleinen Oberschicht gewandt hätte.'

            + '<p>Interessanterweise wendet sich der Prediger vor allem deshalb gegen die Tarock-Karten, weil deren bildliche Darstellungen angeblich christlichen Vorstellungen widersprochen hätten.'

            + '<p>Hier dürfte auch eine der Wurzeln angesprochen sein, dass später so viel an mystischen und okkulten Vorstellungen in die Tarock-Karten hineingeheimnist wurde. Dies ging so weit, dass wahrsagende Scharlatane behaupteten, die Tarock-Karten gehörten neben Bibel und Cheops-Pyramide zu den großen Mysterien der Menschheit.'

            + '<p>Dem gegenüber steht ledigliche die Tatsache, dass sich viele Symbole der Tarock-Karten durch die Jahrhunderte erhalten haben. Diese Symbole dürften tatsächlich teilweise bis auf die allerersten Tarock-Karten zurückgehen, wie sie von Künstlern für die Höfe von Ferrara oder Mailand geschaffen wurden.'

            + '<p>Diese Symbole, die teilweise christlichen Vorstellungen widersprachen, führten, vor allem ab Ende des 18. Jahrhunderts, zur Befrachtung der Tarock-Karten mit den "Weltgeheimnissen". Die buchstäbliche Verteufelung der Spielkarten durch die katholische Kirche mag dazu einen Beitrag geleistet haben.'

            + '<p>Tatsache ist aber, dass das Aufkommen der Tarock-Karten mit der Entwicklung der Renaissance in Italien zusammenfällt. Man wandte sich damals bewusst der antiken Kultur zu und versuchte auch häufig, diese mit dem Christentum in Einklang zu bringen.'

            + '<p>Jedenfalls breitete sich das Tarock-Spiel ab dem ausklingenden 15. Jahrhundert in Form der 56 Farbkarten und der 22 Tarock mit Aushahme von England, Spanien und Portugal über ganz Europa aus.'

            + '<p>Durch die Verbreitung in verschiedenen Sprachgebieten und Kulturgreisen sind zahllose Varianten des Spiels entstanden.'

            + '<p>Die stärkste Verbreitung hat das Spiel im 18. und 19. Jahrhundert wohl im Gebiet der österreichisch-ungarischen Monarchie gefunden. Im Laufe der Zeit wurde es zum österreichischen Kartenspiel schlechthin. Es wurden einige Spielarten entwickelt, die mit nicht allzu vielen Abweichungen im gesamten Gebiet der Monarchie gespielt wurden.'


            + '</span><div class=S style="text-align:justify">'
            + '<br><br><br><p>Mit freundlicher Genehmigung, stark gekürzt aus dem Buch TAROCK von Friedrich Flendrovsky.'

            + '</div>';
}

function getAnekdoten() {
    return '<span class=M style="text-align:justify">'

            + '<p><b>Am 14. 7. 2018 vor dem Garser Tarock:</b><br>'
            + 'Es ist 12 Uhr 15 als Christian Hofmann nach einer langen Nacht aufwacht. Viel zu spät um noch eine Mitfahrgelegenheit nach Gars zu organisieren. '
            + 'Anton Zirkl, sein Leibchauffeur ist bereits auf dem Weg nach Gars. Die Schwester hat bereits anderes geplant. Bleibt nur noch ein Taxi. '
            + 'Mit der Taxizentrale vereinbart Christian einen Fixpreis von 194 Euro. Nachdem sich der Fahrer zweimal verfährt, fragt er auf der Polizeistation in Krems nach dem Weg. '
            + 'Als sie in Gars ankommen ist das Turnier bereits seit 25 Minuten im Gang. Trinkgeld gibts keines. Irgendwann ist Schluss mit lustig, denkt sich Christian.'

            + '<p><b>Am 31. 5. 2015 beim Strebersdorfer Heurigen-Tarock:</b><br>'
            + 'Friedrich F. begrüßt einen neuen Spieler bei seinen Tisch mit "<b>GRÖTAAZ!</b>". Der Frischling '
            + 'ist etwas verwirrt und weiß nicht recht was er sagen soll. Fritz wiederholt "<b>Gestatten, GRÖTAAZ, '
            + 'größter Tarockierer aller Zeiten!</b>". Darauf der Jungspund "<b>Oh, Grüß Sie Herr Doppler, ich wollte sie eh schon immer gern kennen lernen</b>".'

            + '<p><b>Am 26. 9. 2015 beim Tarock im Arsenal:</b><br>'
            + 'Johann Brugger lizitiert mit vier Damen, vier Reitern und zwei Buben einen Farbendreier. '
            + 'Im Talon liegen vier Könige, zwei davon nimmt er auf und sagt den Valat an. '
            + 'Das neue Kartenpakt wurde nur unzureichend gemischt.'

            + '<p><b>Beim Weihnachtsturnier 2014 am Schutzhaus Ameisbach:</b><br>'
            + 'Gleich bei ihrem ersten Turnier darf Gerlinde R. mit Lore Krainer an einem Tisch spielen. '
            + 'Nachdem sie von Lore wegen eines Spielfehler gerügt wurde, bemängelte sie, dass man das auch mit mehr "<b>Wortwitz</b>" hätte sagen können. '
            + 'Später fragte sie dann Lore, was sie früher beruflich gemacht hätte. Lore sagte, sie wäre "<b>Professor für Wortwitz</b>".'

            + '<p><b>Bei einem wiener Cupturnier:</b><br>'
            + 'Alois Kappl ist wegen einer Bemerkung von Ingrid Müller verärgert. Genaue Details dazu sind leider nicht bekannt. '
            + 'Als er später bei einem Solorufer Partner von Ingrid ist, fällt ihm beim viertletzten Stich der Quapil runter. '
            + 'Lakonisch meint er dazu: "<b>Ups, der is ma jetzt owi gfoin</b>". '

            + '<p><b>Im Sommer 1988:</b><br>'
            + 'Wie jedes Jahr, so verbringt Günther Klaus auch 1988 seinen Urlaub mit seinen Töchtern, viereinhalb, sechs und zehn Jahre, auf dem FKK-Campingplatz am Keutschacher See in Kärnten. '
            + 'Zwischendurch wird oft tarockiert. Zwanzigerrufen. Ein Campinggast ist ganz erstaunt, wie tapfer sich die Viereinhalbjährige im Spiel behauptet. '
            + 'Er sagt zu ihr: "<b>Jö, du kannst ja schon zählen</b>". '
            + 'Darauf die Kleine trocken: "<b>Muss ich ja, sonst bescheißen mich meine Schwestern</b>". '

            + '</span><div class=S style="text-align:justify">'
            + '<br><br><br><p>Wenn du von einer Anekdote weißt, zu deren Veröffentlichung es von den betroffenen Personen keine Einwände gibt, '
            + 'dann maile diese bitte an Luger.Leo@gmail.com. Ich danke im Voraus. <b><i>Leo Luger</i></b></div>';
}

function getZitat() {

    var iZitat = stLastZitat;
    do {
        iZitat = Date.now() % 53;
    } while (iZitat === stLastZitat);

    stLastZitat = iZitat;

    if (iZitat === 0) {
        return ['Die Karten sind neu gewürfelt.',
            'Oliver Kahn, 1969-, dt. Tormann'];
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
        return ['Das Vergleichen ist&nbsp;das&nbsp;Ende&nbsp;des&nbsp;Glücks'
                    + '<br>und der Anfang der&nbsp;Unzufriedenheit.',
            'Søren Kierkegaard, dän.&nbsp;Philosoph'];
    } else if (iZitat === 22) {
        return ['Glück ist kein Geschenk der&nbsp;Götter,'
                    + '<br>sondern die Frucht innerer&nbsp;Einstellung.',
            'Erich Fromm, 1900-1980, dt.&nbsp;Philosoph'];
    } else if (iZitat === 23) {
        return ['Wenn man glücklich ist,'
                    + '<br>sollte man nicht noch&nbsp;glücklicher&nbsp;sein&nbsp;wollen.',
            'Theodor Fontane, 1819-1898, dt.&nbsp;Schriftsteller'];
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
        return ['Die wahren Lebenskünstler sind&nbsp;bereits&nbsp;glücklich,'
                    + '<br>wenn sie nicht unglücklich&nbsp;sind.',
            'Jean Anouilh, 1910-1987, fr.&nbsp;Schriftsteller'];
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
        return ['Niemand ist vollkommen:'
                    + '<br>Glück heißt, seine&nbsp;Grenzen&nbsp;kennen'
                    + '<br>und sie lieben.',
            'Romain Rolland, 1866-1944, fr.&nbsp;Schriftsteller'];
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
        return ['Lerne verlieren zu können'
                    + '<br>und Du wirst gewinnen.',
            'Reinhold Bertsch'];
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
        return ["Ich könnt' weinen,"
                    + "<br>was aus mir hätt' werden können.",
            'Günther Nenning, 1921-2006, österr.&nbsp;Querdenker'];
    } else if (iZitat === 48) {
        return ['Es macht keinen Sinn,'
                    + '<br>mit Männern zu streiten -'
                    + '<br>sie haben ja doch immer unrecht',
            'Zsa Zsa Gabor, 1934-1998, ung.&nbsp;amerik.&nbsp;Schauspielerin'];
    } else if (iZitat === 49) {
        return ['Frauen sind da um geliebt, '
                    + '<br>nicht um verstanden zu werden.',
            'Oscar Wilde, 1854-1900, irischer Schriftsteller'];
    } else if (iZitat === 50) {
        return ['Ich bereue nichts im Leben, '
                    + '<br>außer dem, was ich nicht getan habe.',
            'Coco Chanel, 1883-1971, franz. Desingnerin'];
    } else if (iZitat === 51) {
        return ["Hint' noch is' a jeder a Prophet.",
            'Johann Nepomuk Nestroy, 1801-1862,<br>österr. Dramatiker, Schauspieler und Opernsänger'];
    } else if (iZitat === 52) {
        return ['Männer haben keine Geduld.'
                    + '<br>Darum haben sie auch den'
                    + '<br>Reißverschluss erfunden.',
            'Senta Berger, 1941-, österr.dt. Schauspielerin'];
    }
}

function showLogo(pInit) {

    resetLastBtn();
    lastBtn = '#bZitate';
    $(lastBtn).addClass('ui-btn-active');

    if (!QUERFORMAT() && !pInit) {
        showText('Zitate');
        return;
    }

    $('#qfHeaderIcon').hide();
    $('#qfHeaderZeile1,#qfHeaderZeile2').html('');
    var hH = parseInt($(window).innerHeight() / 1.2);
    var hW = parseInt($(window).innerWidth() / 1.5);
    $('#dRumpf').html("<div onclick='showLogo();' style='height:" + hH + 'px; width:' + hW + 'px; background-image: url("Icons/Background.png"); background-size: 50%; background-position: center; background-repeat: no-repeat;\'></div>');

    var hZitat = getZitat();
    $('#tWeisheit').html(hZitat[0]);
    $('#tWeiser').html(hZitat[1]);

    $("#dCopyright").show();
}

function getZitate() {
    var hZitat = getZitat();
    return '<div style="height:' + (parseInt($(window).innerHeight() / 2.5)) + 'px"></div>'
            + '<div class="C B L cBlau"><i>' + hZitat[0] + '</i></div>'
            + '<br>'
            + '<div class="M2 C" style="width:100%">' + hZitat[1] + '</div><br>';
}

function getLinks() {
    return '<span class="cBlau P M" onclick="window.open(\'http://tarockoesterreich.jimdo.com\')"><b>Österreich-Finale (ÖF)</b>, Casino Linz (Franz Kienast), seit 2008</span><br>'
            + '<br>'
            + '<span class="cBlau P M" onclick="window.open(\'http://www.tarockcup.at\')" ><b>Raiffeisen Tarockcup Austria (RTC)</b>, M&uuml;hlviertel (Karl Haas), seit 1995/96</span><br>'
            + '<span class="cBlau P M" onclick="window.open(\'https://hausruckcup1.jimdo.com\')" ><b>Hausruckviertler Tarockcup (HRC)</b>, Hausruck (Franz Kienast), seit 1997/98</span><br>'
            + '<span class="cBlau P M" onclick="window.open(\'https://tarockrunde-sauwald.jimdo.com\')" ><b>Sauwaldcup (SWC)</b>, Innviertel (Sepp Lang), seit 2016</span><br>'
            + '<span class="cBlau P M" onclick="window.open(\'https://www.wienerzeitung.at/themen_channel/spiele/tarock/tarock_cup\')" ><b>Wiener Zeitung Tarockcup (WTC)</b>, Wien/NÖ (Siegfried Braun), seit 2003</span><br>'
            + '<span class="cBlau P M" onclick="showCup(56)" ><b>Wiener Zeitung Tarockcup</b> - Ergebnisse</span><br>'
            + '<span class="cBlau P M" onclick="window.open(\'https://tarockcup.weebly.com\')" ><b>Steirischer Tarockcup (STC)</b>, Steiermark (Peter Baumann), seit 2013/14</span><br>'
            + '<span class="cBlau P M" onclick="showCup(54)" ><b>Steirischer Tarockcup</b> - Ergebnisse</span><br>'
            + '<span class="cBlau P M" onclick="window.open(\'http://www.tarock.tirol\')" ><b>Tiroler Tarockcup (TTC)</b>, Tirol (Markus Mair), seit 2008/09</span><br>'
            + '<br>'
            + '<span class="cBlau P M" onclick="showCup(58)" ><b>Sommer Stadl Tarock (SST)</b>, Altenhof (Alexandra Sabkovski)</span><br>'
            + '<br>'
            + '<span class="cBlau P M" onclick="window.open(\'http://www.tarock.tirol/tarock_aktuell/tarockkalender.pdf\')" ><b>Turnierkalender - &Ouml;sterreich</b>, Markus Mair</span><br>'
            + '<span class="cBlau P M" onclick="window.open(\'http://www.tarock.tirol/tarock_aktuell/tarock_medaillenspiegel_cups.pdf\')" ><b>Medaillenspiegel &uuml;ber alle Cups</b>, Markus Mair</span><br>'
            + '<span class="cBlau P M" onclick="window.open(\'http://www.tarock.tirol/tarock_aktuell/vorrundenpunkte_zwischenstand.pdf\')" ><b>Vorrundenpunkte für das Ö-Finale</b>, Markus Mair</span><br>'
            + '<span class="cBlau P M" onclick="window.open(\'http://www.tarock.tirol/tarock_weblinks.html\')" ><b>Tarock-Linksammlung</b>, Markus Mair</span><br>';
}

function getEtikette() {
    return '<span class=M style="text-align:justify">'
            + '<p>Tarock ist ein Spiel. Somit stehen Spaß und Spielwitz im Vordergrund, Fair Play wird vorausgesetzt. '
            + 'Ein freundlicher Umgang und gegenseitigen Respekt jedenfalls '
            + 'aber korrektes, höfliches Verhalten darf von jeden Spieler erwartet werden. Die hier angeführten Leitlinien dienen '
            + 'einem reibungslosen und vergnüglichen Spielverlauf. Sie sind Teil der allgemeinen '
            + 'Spielkultur, die sich jeder Spieler zu eigen machen sollte.'

            + '<p>Die Karten sind so zu mischen, zu geben und zu halten, dass niemand in die Karten '
            + 'sehen kann. Wer das nicht beachtet, sollte darauf hingewiesen werden. Jeder kann '
            + 'verlangen, dass nachgemischt wird, auch mehrmaliges Abheben ist erlaubt. '

            + '<p>Der Lizitation ist aufmerksam zu folgen. Die Ansagen sollten zügig erfolgen und '
            + 'eindeutig sein. Missverständliche Wiederholungen sind zu vermeiden. Wer etwas '
            + 'ansagen will, sollte dies auch zu erkennen geben. Wer nichts ansagen will, muss alle '
            + 'bisherigen Ansagen laut und deutlich mit „weiter“ oder „gut“ quittieren. Jeder '
            + 'Spieler sollte sich schon vorab überlegen, was er ansagen oder ausspielen will − '
            + 'nicht erst, wenn er dran ist. '

            + '<p>Um die Geduld der Mitspieler nicht über Gebühr zu strapazieren, sollte jeder Spieler '
            + 'das Spiel nicht durch Unaufmerksamkeit, ewiges Mischen, allzu langes Nachdenken, '
            + 'unmotiviertes Kartenziehen, zögerliches Zuwerfen oder durch Reden zur Unzeit unnötig verzögern. '

            + '<p>Die liegengebliebenen Talonkarten sollen nach dem ersten Stich umgedreht werden. '
            + 'Jeder sollte seine Stiche bis zum Zählen von den Stichen der/des Partner(s) getrennt ablegen. '
            + 'Die Stiche sind so einzuziehen, dass jeder sehen kann, mit welcher Karte gestochen wurde. '

            + '<p>Selbstverständlich darf über das laufende Spiel nichts verraten werden, weder durch '
            + 'Reden, noch durch Mimik, Gestik oder sonst wie. Insbesondere bei Ruferspielen dürfen die '
            + 'Partnerschaften nicht durch unbedachte Gesten oder Bemerkungen vorzeitig '
            + 'verraten werden. Generell sind störende Kommentare und Belehrungen am Tarocktisch nicht erwünscht. '

            + '<p>Bei Ouvertspielen sind die Karten so aufzulegen, dass sie gut sichtbar sind und '
            + 'jedem Spieler eindeutig zugeordnet werden können. Jeder Spieler ist für sein Spiel selbst '
            + 'verantwortlich. In keinem Fall ist es gestattet, in das Blatt eines anderen Spielers zu '
            + 'greifen oder gar eine seiner Karten zu spielen.'

            + '<p>Klare Regelverstöße sind in jedem Fall als Renonce zu ahnden. Falsches Ausspiel, '
            + 'vorzeitiges Zugeben, verräterische Äußerungen und ähnliche Gewohnheiten sind '
            + 'aber nicht als Renonce zu werten, solange sie nicht spielentscheidend sind und nicht '
            + 'mit der Absicht begangen wurden, sich einen unerlaubten Vorteil zu verschaffen. Bei '
            + 'wiederholten Verstößen wird jedoch automatisch Absicht unterstellt und auf '
            + 'Renonce entschieden. '

            + '<p>Wird eine Renonce reklamiert, sind alle Karten (Blätter, Stiche und Talon) getrennt '
            + 'zu halten, bis der Sachverhalt geklärt ist. Wer dagegen verstößt, muss damit '
            + 'rechnen, dass zu seinen Ungunsten entschieden wird. Sämtliche Ungereimtheiten '
            + 'sollten von allen Beteiligten stets mit Augenmaß und Fingerspitzengefühl geklärt '
            + 'werden. In strittigen Fällen sollte immer ein Schiedsrichter hinzugezogen werden. '

            + '<p>Nach dem Motto "Kiebitz halt\'s Maul" ist es jeden nicht mitspielenden Spieler  '
            + 'untersagt irgendewelche Kommentare zum Blatt oder zum Spiel eines Spieler abzugeben. '
            + 'In privaten Runden kann vereinbart werden, daß ein Spielverrat, eine Spielbeeinflussung '
            + 'durch einen Kiebitz als Renonce gewertet wird. Das Spiel ist in so einem Fall vom Kiebitz zu bezahlen. '

            + '<p>Nicht enden wollende Leichenreden und ausufernde Regeldiskussionen '
            + 'sowie Belehrungen, Besserwisserei und Rechthaberei haben am Tarocktisch nichts verloren. '
            + 'Ebenso sind abfällige Gesten, abfällige Bemerkungen sowie missbilligende Blicke '
            + 'und ähnliche Unmutsäußerungen verpönt. '

            + '<p>Während ungeübtere Spieler zu flottem Spiel aufgerufen sind, '
            + 'werden die erfahrenen Spieler um Gelassenheit und Nachsicht '
            + 'und beide Gruppen um gegenseitige Rücksichtnahme gebeten. '

            + '<div class="S C">'
            + '<br><br><i><font face="Segoe Print" color="#0000bb"><span class="XL cBlau">Leo Luger</span></font></i><br><br><br>'
            + 'In Anlehnung an die Taroquette von Markus Mair.<br>'
            + (QUERFORMAT() ? '<img style="zoom:66%" src="Icons/Tir.Tarockcup.png" alt="Tiroler Tarockcup" onclick="window.open(\'http://www.tarock.tirol\')">' : '')
            + '</div>'
            + '</span>';
}

function getTippsUndTricks() {
    return '<span class=M style="text-align:justify">'

            + '<p><b>Muss ich mich registrieren?</b><br>'
            + 'Nein. Du kannst die App auch ohne Registrierung verwenden und in den allgemeinen Runden sogar eigene Tische eingeben. '
            + 'Nur wenn du in anderen Runden oder Cups Tische eingeben willst oder dir die Spielestatistik ansehen willst, '
            + 'ist eine Registrierung erforderlich. '
            + 'Auch das Betreiben einer eigenen Runde oder eines eigenen Cups ist nur mit Registrierung möglich. '

            + '<p><b>Wo finde ich zus&auml;tzliche Informationen?</b><br>'
            + 'Zu jeder Seite kannst du &uuml;ber die Seiten&uuml;berschrift zus&auml;tzliche Infos abrufen. '
            + 'Tippe mal auf den &Uuml;berschriftsbalken und die Infos werden angezeigt. '
            + 'Nach einem weiteren Antippen verschwinden die Infos wieder. '

            + '<p><b>Wozu initialisieren?</b><br>'
            + '<b>Programmfehler aufgrund einer Inkompatibilt&auml;t beheben:</b><br>'
            + 'Dieses App wird laufend weiterentwickelt. Dies kann zur Folge haben, dass die geladenen Daten mit der App nicht mehr kompatibel sind. Um diese Inkompatibilit&auml;t zu beseitigen, dr&uuml;ckst du hier oder auf der Hauptseite links unten auf '
            + '<a class="ui-btn ui-btn-inline ui-corner-all K" style="margin:0;padding:0em;margin:0;" onclick="bInitialisieren();">&nbsp; '
            + '<i class="i zmdi-star"></i>&nbsp;&nbsp;Initialisieren&nbsp;</a>.&nbsp;Danach wird die App wieder wie gewohnt funktionieren. '


            + (($(window).innerHeight() > $(window).innerWidth()) // Hochformat
                    ? '<p><b>Internetseite:</b><br>'
                    + 'Diese App kann im Internet auch mit <b>https://tarock.firebaseapp.com</b> aufgerufen werden.'

                    + '<p><b>Bei fehlendem Minus:</b><br>'
                    + 'Falls bei der Eingabe eines Tisches auf der virtuellen Tastatur kein Minus vorhanden ist, müssen Minuspunkte mit einer führenden Null eingegeben werden.<br>'
                    + 'Auf einem Android-Handy kannst du das Problem mit dem fehlendem Minus mit der Installation der Google-Tastatur beheben.<br>'
                    : '')

            + (($(window).innerHeight() < $(window).innerWidth()) // Querformat
                    ? '<p><b>Gibt es von diesem Programm eine App für mein Handy?</b><br>'
                    + 'Ja, du kannst sie dir kostenlos aus dem Android PlayStore herunterladen. '
                    + 'Ihr Name ist "<b>Die Tarock-App</b>". '
                    + 'Für iPhones ist leider keine App verfügbar. '
                    + 'Du kannst jedoch die funktionsgleiche Internetseite "<b>tarock.firebaseapp.com</b>" verwenden. '
                    : '')

            + '<p><b>Hast du weitere Fragen?</b>'
            + '<br> Alfred Plischnack,'
            + '<br> Hans Hafner,'
            + '<br> Johannes Toppelreiter,'
            + '<br> Kurt Timoschek,'
            + '<br> Markus Mair,'
            + '<br> Veronika Schober,'
            + '<br> Wolfgang Stein und ich'
            + '<br> Leo Luger helfen gerne.'
            + '<br>'
            + '<br>'
            + '<br> Ich wünsche gute Blätter'
            + '<br> und viel Spaß mit der App!'
            + '<br> <i>Leo Luger</i>'
            + '</span>';
}

function getTurnierkalender() {
    var html = '';
    var nTurniere = 0;
    for (var iTermin in CUPS.TERMINE) {
        if (CUPS.TERMINE[iTermin].DATUM >= hHeute && CUPS.TERMINE[iTermin].CUP === I) {
            if (I !== 56
                    || I === 56 && window.location.href.toUpperCase().indexOf('OOV') < 0 // OOV = Out Of Vienna
                    || I === 56 && window.location.href.toUpperCase().indexOf('OOV') > 0 && CUPS.TERMINE[iTermin].NAME.toUpperCase().indexOf('OOV') > 0) {
                nTurniere++;
                html += '<div class="ui-grid-a">'
                        + '<div class="ui-block-a M" style="width:20%;padding-top:.2em">'
                        + getDateString(CUPS.TERMINE[iTermin].DATUM)
                        + '</div>'
                        + '<div class="ui-block-b S" style="width:80%">'
                        + '<span class=L><b>' + CUPS.TERMINE[iTermin].NAME + '</b></span><br>'
                        + getTerminText(iTermin)
                        + '</div>'
                        + '</div><br>';
            }
        }
    }
    if (nTurniere === 0) {
        if (I === 3) {
            html = '<span class=M>Nachdem das letzte Turnier abgeschlossen wurde,<br> kann pro Tag ein PC-Turnier durchgespielt werden.</span><br><br>';
        } else if (I === 51 || I === 52) {
            html = '';
        } else {
            html = '<span class=L>Laut Turnierkalender sind in nächster Zeit<br>keine Turniere geplant.</span><br><br>';
        }
    } else if (nTurniere === 1) {
        html = '<span class=L>Das nächste Turnier:</span><br><br>' + html;
    } else {
        html = '<span class=L>Die nächsten Turniere sind:</span><br><br>' + html;
    }
    return html;
}

function getTerminText(iTermin) {
    var hFrom = CUPS.TERMINE[iTermin].TEXT.indexOf('www.');
    if (hFrom > 0) {
        var hReturn = CUPS.TERMINE[iTermin].TEXT.substr(0, hFrom);
        var hRest = CUPS.TERMINE[iTermin].TEXT.substr(hFrom);
        hFrom = hRest.indexOf('<');
        if (hFrom > 0) {
            hLink = hRest.substr(0, hFrom);
            hRest = hRest.substr(hFrom);
            return hReturn + '<span class="cBlau P" onclick="window.open(\'http://' + hLink + '\')">' + hLink + '</span>' + hRest;
        } else {
            return hReturn + '<span class="cBlau P" onclick="window.open(\'http://' + hRest + '\')">' + hRest + '</span>';
        }
    } else {
        return CUPS.TERMINE[iTermin].TEXT;
    }
}