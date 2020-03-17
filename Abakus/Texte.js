
/* global CUPS, I, hHeute, LS */

function showText(pText) {
    if (QUERFORMAT()) {
        if (window.location.hash) {
            I = 0;
            LS.ShowCups = 0;
            history.back();
        }
    } else {
        window.location.href = 'Abakus/Text.html?' + pText;
        return;
    }
    $('#dCopyright').each(function () { // sonst funktioniert important nicht
        this.style.setProperty('display', 'none', 'important');
    });
    $('#qfHeaderIcon').show();
    resetLastBtn();
    LS.LastBtn = '#b' + pText;
    $(LS.LastBtn).addClass('ui-btn-active');

    var html = '';
    var hH = parseInt($(window).innerHeight() - $('#qfHeader').height() - 4);
    html = '<div style="width:100%; margin-left: auto; margin-right: auto; overflow-y: auto; height:' + hH + 'px; background-image: url(\'Icons/Background.png\'); background-size: 50%; background-position: center center; background-repeat: no-repeat; ">'
            + '<div style="width: 80%; padding: 1em; margin: 3em auto;">';

    var hTitel2 = '';
    if (pText === 'Aktuelles') {
        writeCanvas(CUPS.NAME[I]);
    } else if (pText === 'CTHeinepunkte') {
        writeCanvas('Warum Heinepunkte?');
    } else if (pText === 'TippsUndTricks') {
        writeCanvas('Tipps und Tricks');
    } else if (pText === 'CTDetailstatistik') {
        writeCanvas('Detailstatistik');
    } else {
        writeCanvas(pText);
    }

    if (pText === 'Aktuelles') {
        hTitel2 = CUPS.MELDAKT[I];
        html += AKTUELLES[I];
        if (QUERFORMAT() && PC) {
            $('#iEdit').attr('style', 'position: fixed; top: 2px; right: 0.5vw; font-size: 3.1vw; cursor: pointer;').show();
        }
    } else if (pText === 'Geschichte') {
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
    } else if (pText === 'CTHeinepunkte') {
        hTitel2 = 'Eine Initiative von SWC, STT, TTC und WTC.';
        html += getDetailstatistik();
    } else if (pText === 'Etikette') {
        hTitel2 = 'Benehmen ist gefragt';
        html += getEtikette();
    } else if (pText === 'TippsUndTricks') {
        hTitel2 = 'Gewusst wie';
        html += getTippsUndTricks();
    } else if (pText === 'Urlaubsplaner') {
        hTitel2 = 'Tarockurlaub gefällig?';
        html += getUrlaubsplaner();
        $("#qfHeaderIcon").attr("src", "Icons/Urlaub.png");
    }
    html += '</div></div>';
    $('#qfHeaderZeile2').html(hTitel2);
    $('#dRumpf').html(html).trigger('create');
}

function getGeschichte() {

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

function getDetailstatistik() {
    return '<span class=M style="text-align:justify">'

            + '<p>Wir alle kennen es nur zu gut. Endlich hat man gute Blätter und macht mit 200 Punkten einen dritten Platz. Beim nächsten Mal gewinnt dann ein anderer mit 150 Punkten das Turnier.'

            + '<p>Da für einen Turniersieg mitunter stark unterschiedlich viele Punkte erforderlich sind, erhöht das Fixpunktesystem den im Königrufen ohnehin sehr hohen Glücksfaktor.'

            + '<p>Bei einem Turnier mit 300 Teilnehmern spielt jeder in drei Runden jeweils gegen drei unterschiedlich starke Gegner. Genauso wie bei einem Turnier mit 60 oder weniger Teilnehmern.'

            + '<p>Die Hürde, eine bestimmte Punktezahl zu erreichen, ist also für jeden gleich hoch. Die Chance möglichst viele Fixpunkte zu erreichen schwindet aber mit der Teilnehmerzahl.'

            + '<p>Da im Sport Fairness alles ist, wurde mit den Heinepunkten ein Punktesystem entwickelt, dass die tatsächlich erreichten Punkte als Ausgangswert verwendet.'

            + '<p>Bis 100 Punkten werden die tatsächlich erreichten Punkte voll angerechnet. Ab 100 Punkten zählt jeder zweite Punkt. Es werden maximal 200 Heinepunkte vergeben. Minuspunkte werden nicht gewertet.'

            + '<p>Aufgrund von Überlegungen im Sauwaldcup, im Tiroler, im Steirischen und im Wiener Tarockcup wird mit der Heinewertung eine faire Alternative zur Fixpunktewertung angeboten.'

//            + '<p>Da von jeden Cup immer mehr Turniere veranstaltet werden, sollen für die Heinewertung in einer späteren Ausbaustufe mehr als die üblichen sechs besten Ergebnisse verwendet werden.'

            + '</span>';
}

function getAnekdoten() {
    return '<span class=M style="text-align:justify">'

            + '<p><b>Am 13. 10. 2018 beim Murecker Turnier:</b><br>'
            + 'Mit acht Herz, Sküs, Mond und zwei kleinen Tarock in der Vorhand gibt`s nur ein Lizit: '
            + 'Farbensolo, Valat. Und das gleich beim zweiten Spiel in Runde eins. '
            + 'Das Turnier ist aber noch lange nicht zu Ende. Ein stiller Farbensolovalat, '
            + 'diesmal mit sieben Herz, Pik König und zwei kleinen Tarock geht sich da in Runde eins noch aus. '
            + 'Aller guten Dinge sind drei, sagt man '
            + 'und so greift Fortuna <b>Frithjof Kirchner</b> in der zweiten Runde noch einmal unter die Arme und verhilft ihm zu einem weiteren Valat. '
            + 'Einem stillen Farbendreiervalat. Das Turnier gewinnt er mit Bravour. Frithjof kann sein Glück kaum fassen. <b>Drei Valate bei einem Turnier</b> hat man ja auch nicht alle Tage. '

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

function showLogo(pInit) {

    resetLastBtn();
    LS.LastBtn = '#bZitate';
    $(LS.LastBtn).addClass('ui-btn-active');

    if (QUERFORMAT()) {
        if (window.location.hash) {
            I = 0;
            LS.ShowCups = 0;
            history.back();
        }
    } else if (!pInit) {
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
            + '<span class="cBlau P M" onclick="showCup(56,\'bCT\')" ><b>Wiener Tarockcup (WTC)</b>, Wien/NÖ (Siegfried Braun), seit 2003</span><br>'
            + '<span class="cBlau P M" onclick="window.open(\'https://steirercup.webnode.at\')" ><b>Steirischer Tarockcup (STC)</b>, Steiermark (Peter Baumann), seit 2013/14</span><br>'
            + '<span class="cBlau P M" onclick="showCup(54,\'bCT\')" ><b>Steirischer Tarockcup</b> - Ergebnisse</span><br>'
            + '<span class="cBlau P M" onclick="window.open(\'http://www.tarock.tirol\')" ><b>Tiroler Tarockcup (TTC)</b>, Tirol (Markus Mair), seit 2008/09</span><br>'
            + '<br>'
            + '<span class="cBlau P M" onclick="showCup(15,\'bLC\')" ><b>Stadl Tarock (SST)</b>, Altenhof (Alexandra Sabkovski)</span><br>'
            + '<br>'
            + '<span class="cBlau P M" onclick="window.open(\'http://www.tarock.tirol/tarock-aktuell/tarockkalender.pdf\')" ><b>Turnierkalender - &Ouml;sterreich</b>, Markus Mair</span><br>'
            + '<span class="cBlau P M" onclick="window.open(\'http://www.tarock.tirol/tarock-aktuell/tarock-medaillenspiegel-cups.pdf\')" ><b>Medaillenspiegel &uuml;ber alle Cups</b>, Markus Mair</span><br>'
            + '<span class="cBlau P M" onclick="window.open(\'http://www.tarock.tirol/tarock-aktuell/vorrundenpunkte-zwischenstand.pdf\')" ><b>Vorrundenpunkte für das Ö-Finale</b>, Markus Mair</span><br>'
            + '<span class="cBlau P M" onclick="window.open(\'http://www.tarock.tirol/tarock-weblinks.html\')" ><b>Tarock-Linksammlung</b>, Markus Mair</span><br>'
            + '<br>'
            + '<span class="cBlau P M" onclick="window.open(\'https://magicmoments.jetzt\')" ><b>Besinnliches</b>, &copy; by zitate.eu</span><br>';
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

function getUrlaubsplaner() {
    return '<span class=M sstyle="text-align:justify">'

            + '<div class="L" style="margin:0 0 1vh 0">14. - 17. April 2020&nbsp;&nbsp; <b>2.&nbsp;Wiener&nbsp;Tarockmarathon</b></div>'
            + 'Veranstaltungsort:&nbsp;1110&nbsp;Wien, Guglgasse&nbsp;6, Gasometer&nbsp;Ebene&nbsp;3, Restaurant&nbsp;El&nbsp;Greco<br>'
            + 'Veranstalter:&nbsp;Leo&nbsp;Luger, Tel.:&nbsp;0650&nbsp;651&nbsp;652&nbsp;2'

            + '<p><div class="L" style="margin:4vh 0 1vh 0">20. - 23. Mai 2020&nbsp;&nbsp; <b>Villacher Tarockwoche</b></div>'
            + 'Veranstaltungsort: Gasthof&nbsp;Steirerhof, 9500&nbsp;Villach<br>'
            + 'Veranstalter: Arno&nbsp;Peter, Tel.:&nbsp;0664&nbsp;3708490'

            + '<p><div class="L" style="margin:4vh 0 1vh 0">22. - 28. Juni 2020&nbsp;&nbsp; <b>UTC&nbsp;Klopeinersee</b></div>'
            + 'Veranstaltungsort: 9122 St. Kanzian, Am&nbsp;See&nbsp;V/2,&nbsp;Hotel&nbsp;Marolt<br>'
            + 'Veranstalter: Johann König, Tel.: 0699&nbsp;111&nbsp;116&nbsp;65'

            + '<p><div class="L" style="margin:4vh 0 1vh 0">25. Juli bis 2. Aug. 2020&nbsp;&nbsp; <b>Tarock&nbsp;on&nbsp;Tour</b></div>'
            + 'Route: Frankenmarkt - Zirl - Altenmarkt - Villach - Unterpremstätten - Großpetersdorf - Wien - Hardegg - Helfenberg<br>'
            + 'Organisation: Franz Kienast, Franz&nbsp;Emeder, Tel.:&nbsp;0660&nbsp;527&nbsp;515&nbsp;0, Mail:&nbsp;f.kienast@edhui.at'

            + '<p><div class="L" style="margin:4vh 0 1vh 0">16. - 24. Juni 2020&nbsp;&nbsp; <b>Tarock- und Kartenspielkreuzfahrt</b></div>'
            + 'Route: Savona, Neapel, Palermo, Valenzia, Barcelona, Marseile, Savona<br>'
            + 'Organisation: Sepp&nbsp;Lang, Tel.:&nbsp;0664&nbsp;8231678<br>'
            + 'Veranstalter: Freizeitclub&nbsp;St.&nbsp;Roman<br>'
            + 'Josef Kißlinger 07716&nbsp;20179, Claudia&nbsp;Friedl&nbsp;07712&nbsp;2747&nbsp;67235<br>'
            + 'Preise: 670 - 1110 Euro'

            + '<p><div class="L" style="margin:4vh 0 1vh 0">18. - 20. Sep. 2020&nbsp;&nbsp; <b>Frankenmarkter Marathon</b></div>'
            + 'Veranstaltungsort: Gasthof&nbsp;Greisinger, 4890&nbsp;Frankenmarkt<br>'
            + 'Veranstalter: Tarockrunde&nbsp;Frankenmarkt, Bert&nbsp;Greisinger&nbsp;Tel.:&nbsp;0664&nbsp;2863075'

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
            + 'Zu jeder Seite kannst du &uuml;ber die Seitenüberschrift zusätzliche Infos abrufen. '
            + 'Tippe mal auf den &Uuml;berschriftsbalken und die Infos werden angezeigt. '
            + 'Nach einem weiteren Antippen verschwinden die Infos wieder. '

            + '<p><b>Wozu initialisieren?</b><br>'
            + '<b>Programmfehler aufgrund einer Inkompatibilt&auml;t beheben:</b><br>'
            + 'Dieses App wird laufend weiterentwickelt. Dies kann zur Folge haben, dass die geladenen Daten mit der App nicht mehr kompatibel sind. Um diese Inkompatibilit&auml;t zu beseitigen, dr&uuml;ckst du hier oder auf der Hauptseite links unten auf '
            + '<a class="ui-btn ui-btn-inline ui-corner-all K" style="margin:0;padding:0em;margin:0;" onclick="bInitialisieren();">&nbsp; '
            + '<i class="i zmdi-star"></i>&nbsp;&nbsp;Initialisieren&nbsp;</a>.&nbsp;Danach wird die App wieder wie gewohnt funktionieren. '


            + (($(window).innerHeight() > $(window).innerWidth()) // Hochformat
                    ? '<p><b>Internetseite:</b><br>'
                    + 'Diese App kann im Internet auch mit <b>https://tarock.web.app</b> aufgerufen werden.'

                    + '<p><b>Bei fehlendem Minus:</b><br>'
                    + 'Falls bei der Eingabe eines Tisches auf der virtuellen Tastatur kein Minus vorhanden ist, müssen Minuspunkte mit einer führenden Null eingegeben werden.<br>'
                    + 'Auf einem Android-Handy kannst du das Problem mit dem fehlendem Minus mit der Installation der Google-Tastatur beheben.<br>'
                    : '')

            + (($(window).innerHeight() < $(window).innerWidth()) // Querformat
                    ? '<p><b>Gibt es von diesem Programm eine App für mein Handy?</b><br>'
                    + 'Ja, du kannst sie dir kostenlos aus dem Android PlayStore herunterladen. '
                    + 'Ihr Name ist "<b>Die Tarock-App</b>". '
                    + 'Für iPhones ist leider keine App verfügbar. '
                    + 'Du kannst jedoch die funktionsgleiche Internetseite "<b>tarock.web.app</b>" verwenden. '
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
            if (CUPS.TERMINE[iTermin].NAME.substr(0, 4) !== "test" || LS.ME === "3425") {
                nTurniere++;
                html += '<div class="ui-grid-a">'
                        + '<div class="ui-block-a M" style="width:20%;padding-top:.2em">'
                        + getDateString(CUPS.TERMINE[iTermin].DATUM)
                        + (CUPS.TERMINE[iTermin].BEGINN ? '<div class=S>Beginn: ' + CUPS.TERMINE[iTermin].BEGINN + '</div>' : '')
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
        } else if (I === 50 || I === 52) {
            html = '';
        } else if (I === 50) {
            html = '<span class=L>Das nächste Österreichfinale ist für Ende April, Anfang Mai ' + (new Date().getFullYear() + 1) + ' geplant.</span><br><br>';
        } else {
            html = '<span class=L>Laut Turnierkalender sind in nächster Zeit<br>keine Turniere geplant.</span><br><br>';
        }
    } else if (nTurniere === 1) {
        html = '<span class=L>Das nächste Turnier:</span><br><br>' + html;
    } else {
        html = '<span class=L>Die nächsten Turniere sind:</span><br><br>' + html;
    }

    if (I === 56) {
        html += '<br><div class="ui-grid-a">'
                + '<div class="ui-block-a M" style="width:30%">Unsere Sponsoren:</div>'
                + '<div class="ui-block-c L" style="width:70%">'
                + '<img class=P src="Icons/LogoGregor.png"  height="80px" onclick="window.open(\'http://www.allfinag.com/afs/home-afs\')" alt="ALLFINAG FINANCIAL SERVICES">&nbsp;&nbsp;'
                + '<img class=P src="Icons/LogoPiatnik.png" height="80px" onclick="window.open(\'https://www.piatnik.com\')" alt="Piatnik.com">&nbsp;&nbsp;'
                + '<img class=P src="Icons/LogoTextil.png"  height="80px" onclick="window.open(\'https://www.texad.at\')" alt="Textilveredelung Steyr">'
                + '</div>'
                + '</div>';
    }

    if (I === 49) {
        html += '<br><div class="ui-grid-b">'
                + '<div class="ui-block-a" style="width:20%"></div>'
                + '<div class="ui-block-b L" style="width:40%">Gesamtwertung</div>'
                + '<div class="ui-block-c L" style="width:40%">Tageswertung</div>'
                + '</div><br>'
                + '<div class="ui-grid-b S2">'
                + '<div class="ui-block-a L" style="width:20%;padding-top:.2em">2019</div>'
                + '<div class="ui-block-b" style="width:40%">'
                + '<span>1. <b>Huemer Manfred</b>, Bad Leonf.</span><br>'
                + '<span>2. Raninger Rudolf, Julbach</span><br>'
                + '<span>3. Pestitschek Günther, Graz</span><br>'
                + '</div>'
                + '<div class="ui-block-c" style="width:40%">'
                + '<span>1. Kneifl Josef, Linz</span><br>'
                + '<span>2. Kienberger Johann, Zell a.P.</span><br>'
                + '<span>3. Dallinger Elisabeth, Eferding</span><br>'
                + '</div>'
                + '</div><br>'
                + '<div class="ui-grid-b S2">'
                + '<div class="ui-block-a L" style="width:20%;padding-top:.2em">2018</div>'
                + '<div class="ui-block-b" style="width:40%">'
                + '<span>1. <b>Wimmer Anton</b>, Puchkirchen</span><br>'
                + '<span>2. Baumann Peter, Dobl</span><br>'
                + '<span>3. Wastl Friedrich, Wels</span><br>'
                + '</div>'
                + '<div class="ui-block-c" style="width:40%">'
                + '<span>1. Miesbauer Oskar, Aigen i.M.</span><br>'
                + '<span>2. Raab Jimmy, Au / Donau</span><br>'
                + '<span>3. Rieseneder Christian, Wien</span><br>'
                + '</div>'
                + '</div><br>'
                + '<div class="ui-grid-b S2">'
                + '<div class="ui-block-a L" style="width:20%;padding-top:.2em">2017</div>'
                + '<div class="ui-block-b" style="width:40%">'
                + '<span>1. <b>Rieseneder Christian</b>, Wien</span><br>'
                + '<span>2. Müller Ingrid, Wien</span><br>'
                + '<span>3. Balthasar Rohrmoser, Wals</span><br>'
                + '</div>'
                + '<div class="ui-block-c" style="width:40%">'
                + '<span>1. Proksch Rudolf, St. Georgen i.A.</span><br>'
                + '<span>2. Müller Inge, Graz</span><br>'
                + '<span>3. Rieseneder Christian, Wien</span><br>'
                + '</div>'
                + '</div><br>'
                + '<div class="ui-grid-b S2">'
                + '<div class="ui-block-a L" style="width:20%;padding-top:.2em">2016</div>'
                + '<div class="ui-block-b" style="width:40%">'
                + '<span>1. <b>Mülleder Josef</b>, Bad Leonfelden</span><br>'
                + '<span>2. Hafner Johann, Wien</span><br>'
                + '<span>3. Mair Markus, Innsbruck</span><br>'
                + '</div>'
                + '<div class="ui-block-c" style="width:40%">'
                + '<span>1. Leimhofer Barbara, Neustadl</span><br>'
                + '<span>2. Beneder Sepp, Bad Leonfelden</span><br>'
                + '<span>3. Kroiß Friedrich, Oftering</span><br>'
                + '</div>'
                + '</div><br>'
                + '<div class="ui-grid-b S2">'
                + '<div class="ui-block-a L" style="width:20%;padding-top:.2em">2015</div>'
                + '<div class="ui-block-b" style="width:40%">'
                + '<span>1. <b>Zauner Hubert</b>, Bad Ischl</span><br>'
                + '<span>2. Oleinek Dieter, Wolfsegg</span><br>'
                + '<span>3. Wenninger Johannes, Zell a.P.</span><br>'
                + '</div>'
                + '<div class="ui-block-c" style="width:40%">'
                + '<span>1. Miesbauer Oskar, Aigen i.M.</span><br>'
                + '<span>2. Oleinek Dieter, Wolfsegg</span><br>'
                + '<span>3. Ömer Liesl, Adlwang</span><br>'
                + '</div>'
                + '</div><br>'
                + '<div class="ui-grid-b S2">'
                + '<div class="ui-block-a L" style="width:20%;padding-top:.2em">2014</div>'
                + '<div class="ui-block-b" style="width:40%">'
                + '<span>1. <b>Stürmer Rudolf</b>, Bad Leonfelden</span><br>'
                + '<span>2. Diess Sigurd, Obertrum am See</span><br>'
                + '<span>3. Zandt Johann, Salzburg</span><br>'
                + '</div>'
                + '<div class="ui-block-c" style="width:40%">'
                + '<span>1. Zandt Johann, Salzburg</span><br>'
                + '<span>2. Pongruber Walter, Seekirchen</span><br>'
                + '<span>3. Zauner Herbert, Bad Ischl</span><br>'
                + '</div>'
                + '</div><br>'
                + '<div class="ui-grid-b S2">'
                + '<div class="ui-block-a L" style="width:20%;padding-top:.2em">2013</div>'
                + '<div class="ui-block-b" style="width:40%">'
                + '<span>1. <b>Ebner Florian</b>, Linz</span><br>'
                + '<span>2. Dallinger Helmut, Eferding</span><br>'
                + '<span>3. Stöbich Alois, Bad Leonfelden</span><br>'
                + '</div>'
                + '<div class="ui-block-c" style="width:40%">'
                + '<span>1. Stöbich Alois, Bad Leonfelden</span><br>'
                + '<span>2. Rieseneder Chiristian, Wien</span><br>'
                + '<span>3. Haas Johann, Waging</span><br>'
                + '</div>'
                + '</div><br>'
                + '<div class="ui-grid-b S2">'
                + '<div class="ui-block-a L" style="width:20%;padding-top:.2em">2012</div>'
                + '<div class="ui-block-b" style="width:40%">'
                + '<span>1. <b>Böckl Josef</b>, Neukirchen/V.</span><br>'
                + '<span>2. Jungwirth Markus, Tragwein</span><br>'
                + '<span>3. Raninger Christian, Julbach</span><br>'
                + '</div>'
                + '<div class="ui-block-c" style="width:40%">'
                + '<span>1. Raffelsberger Josef, Gschwandt</span><br>'
                + '<span>2. Strobl Klaus, Straß i.A.</span><br>'
                + '<span>3. Jungwirth Markus, Tragwein</span><br>'
                + '</div>'
                + '</div><br>'
                + '<div class="ui-grid-b S2">'
                + '<div class="ui-block-a L" style="width:20%;padding-top:.2em">2011</div>'
                + '<div class="ui-block-b" style="width:40%">'
                + '<span>1. <b>Leimhofer Markus</b>, Neustadl</span><br>'
                + '<span>2. Schilcher Karl, Bad Leonfelden</span><br>'
                + '<span>3. Manzenreiter Hermann Bad L.</span><br>'
                + '</div>'
                + '<div class="ui-block-c" style="width:40%">'
                + '<span>1. Leimhofer Markus, Neustadl</span><br>'
                + '<span>2. Leitner Erich, Gallneukirchen</span><br>'
                + '<span>3. Manzenreiter Hermann, Bad L.</span><br>'
                + '</div>'
                + '</div><br>'
                + '<div class="ui-grid-b S2">'
                + '<div class="ui-block-a L" style="width:20%;padding-top:.2em">2010</div>'
                + '<div class="ui-block-b" style="width:40%">'
                + '<span>1. <b>Manzenreiter Hermann</b>, Bad L.</span><br>'
                + '<span>2. Huemer Manfred, Bad Leonfelden</span><br>'
                + '<span>3. Mülleder Josef, Bad Leonfelden</span><br>'
                + '</div>'
                + '<div class="ui-block-c" style="width:40%">'
                + '<span>1. Proksch Rudolf, St. Georgen i.A.</span><br>'
                + '<span>2. Schott Edeldraut, Schwanenstadt</span><br>'
                + '<span>3. Huemer Manfred, Bad Leonfelden</span><br>'
                + '</div>'
                + '</div><br>'
                + '<div class="ui-grid-b S2">'
                + '<div class="ui-block-a L" style="width:20%;padding-top:.2em">2009</div>'
                + '<div class="ui-block-b" style="width:40%">'
                + '<span>1. <b>Doppler Manfred</b>, Ampflwang</span><br>'
                + '<span>2. Brugger Johann, Neukirchen /V.</span><br>'
                + '<span>3. Wenninger Josef, Zell a.P.</span><br>'
                + '</div>'
                + '<div class="ui-block-c" style="width:40%">'
                + '<span>1. Stöbich Alois, Bad Leonfelden</span><br>'
                + '<span>2. Ömer Helmut, Adlwang</span><br>'
                + '<span>3. Wohlmuth Johannes, Schwanenst</span><br>'
                + '</div>'
                + '</div><br>'
                + '<div class="ui-grid-b S2">'
                + '<div class="ui-block-a L" style="width:20%;padding-top:.2em">2008</div>'
                + '<div class="ui-block-b" style="width:40%">'
                + '<span>1. <b>Huemer Manfred</b>, Bad Leonf.</span><br>'
                + '<span>2. Zauner Huber, Bad Ischl</span><br>'
                + '<span>3. Angerer Thomas, Wien</span><br>'
                + '</div>'
                + '<div class="ui-block-c" style="width:40%">'
                + '<span>1. Klammer Elfi, Wien</span><br>'
                + '<span>2. Heigl Ignaz, Altenmarkt</span><br>'
                + '<span>3. Kienast Franz, Frankenmarkt</span><br>'
                + '</div>'
                + '</div><br>'
                + "<span class='XXS'>&copy; 2008-" + new Date().getFullYear() + " by Franz Kienast<br></span>";
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