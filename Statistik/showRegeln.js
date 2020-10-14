
/* global CUPS, LS, stCup, jbSpieler, stHeute, QUERFORMAT(), ADMIN */

function showRegelnALT() {

    if (QUERFORMAT()) {
        if (lastBtn) {
            $(lastBtn).removeClass('ui-btn-active');
        }
        lastBtn = '#bRegelnAlt';
        $(lastBtn).addClass('ui-btn-active');
    }

    showIcons(['#iPrint']);

    stStat = 'Regeln';

    if (jbSpieler.isOpen) {
        jbSpieler.close();
    }
    $("#dCopyright").hide();

    writeCanvas('Regeln alt');

    if (QUERFORMAT()) {
//        var hx = parseInt($(window).innerHeight() - $('#dContent').offset().top - 36);
        var hx = parseInt($(window).innerHeight() - $('#qfHeader').height() - 5);
    } else {
        var hx = parseInt($(window).innerHeight() - $('#dContent').offset().top - 66);
    }

//    html = '<iframe src="../WTC-Regeln-Alt.pdf#toolbar=0" width="100%" height="' + hx + 'px"></iframe>';

    html = '<embed src="../Icons/WTC-Regeln-Alt.pdf#toolbar=0&navpanes=0&scrollbar=0" type="application/pdf" width="100%" height="' + hx + 'px"/>';


    if (QUERFORMAT()) {
        $('#dRumpf').html(html).css('margin-top', $('#qfHeader').height() + 'px');
        setFont();
    } else {
        $('#dContent').html(html).trigger('create').show();
        $('#nbUebersicht,#nbSaison,#nbArchiv').removeClass('ui-disabled').removeClass('ui-btn-active');
        $('#sideTurniere').hide();
        setFont(4);
        setTimeout(function () {
            var hx = parseInt($(window).innerHeight() - $('#dContent').offset().top + 11);
            $('#sideContent').css('height', hx + 'px');
        }, 100);
    }

    window.scrollTo(0, 0);

    $('#tStand').hide();

}

function showRegeln() {

    if (QUERFORMAT()) {
        if (lastBtn) {
            $(lastBtn).removeClass('ui-btn-active');
        }
        lastBtn = '#bTarifeUndRegeln';
        $(lastBtn).addClass('ui-btn-active');
    }

    showIcons(['#iPrint']);

    stStat = 'Regeln';

    if (jbSpieler.isOpen) {
        jbSpieler.close();
    }
    $("#dCopyright").hide();

    writeCanvas('Tarife und Regeln');

    if (QUERFORMAT()) {
        var hTableWidth = 45;
        var hTablePadding = '4vw 6vw 0 6vw';
        var hTextPadding = '0 6vw 3vw 3vw';
    } else {
        var hTableWidth = 100;
        var hTablePadding = '4vw 4vw 2vw 4vw';
        var hTextPadding = '1vw 4vw 2vw 0vw';
    }

    html = '<div class="J">'

            + '<div class="ui-grid-b ui-responsive S" style="padding: ' + hTablePadding + '">'
            + '<div class="ui-block-a" style="width:' + hTableWidth + '%;">'
            + "<table width=100% data-role='table' data-mode='columntoggle' cellspacing='0' class='table ui-body-d ui-shadow ui-responsive table-stripe' data-column-btn-text=''><thead>"
            + "<tr class='bGrau'><th>&nbsp;&nbsp;Die Spiele</th><th class=TR>Punkte&nbsp;</th></tr></thead>"
            + "<tbody>"
            + "<tr><th>&nbsp;&nbsp;Rufer *</th><th class=TR>1&nbsp;&nbsp;</th></tr>"
            + "<tr><th>&nbsp;&nbsp;Trischaken *</th><th class=TR>2&nbsp;&nbsp;</th></tr>"
            + "<tr><th>&nbsp;&nbsp;Piccolo, Zwiccolo</th><th class=TR>2&nbsp;&nbsp;</th></tr>"
            + "<tr><th>&nbsp;&nbsp;Solorufer</th><th class=TR>2&nbsp;&nbsp;</th></tr>"
            + "<tr><th>&nbsp;&nbsp;Pagatrufer</th><th class=TR>3&nbsp;&nbsp;</th></tr>"
            + "<tr><th>&nbsp;&nbsp;Bettler</th><th class=TR>4&nbsp;&nbsp;</th></tr>"
            + "<tr><th>&nbsp;&nbsp;Sechserdreier **</th><th class=TR>4 / -8&nbsp;&nbsp;</th></tr>"
            + "<tr><th>&nbsp;&nbsp;Uhurufer</th><th class=TR>5&nbsp;&nbsp;</th></tr>"
            + "<tr><th>&nbsp;&nbsp;Farbendreier</th><th class=TR>5&nbsp;&nbsp;</th></tr>"
            + "<tr><th>&nbsp;&nbsp;Dreier</th><th class=TR>5&nbsp;&nbsp;</th></tr>"
            + "<tr><th>&nbsp;&nbsp;Piccolo und Zwiccolo ouvert</th><th class=TR>6&nbsp;&nbsp;</th></tr>"
            + "<tr><th>&nbsp;&nbsp;Kakadurufer</th><th class=TR>7&nbsp;&nbsp;</th></tr>"
            + "<tr><th>&nbsp;&nbsp;Bettler ouvert</th><th class=TR>8&nbsp;&nbsp;</th></tr>"
            + "<tr><th>&nbsp;&nbsp;Quapilrufer</th><th class=TR>9&nbsp;&nbsp;</th></tr>"
            + "<tr><th>&nbsp;&nbsp;Farbensolo</th><th class=TR>10&nbsp;&nbsp;</th></tr>"
            + "<tr><th>&nbsp;&nbsp;Solodreier</th><th class=TR>10&nbsp;&nbsp;</th></tr>"
            + "</tbody></table><br>"
            + '</div>'
            + '<div class="ui-block-b" style="width:9%;">'
            + '</div>'
            + '<div class="ui-block-c" style="width:' + hTableWidth + '%;">'
            + "<table swidth=100% data-role='table' data-mode='columntoggle' cellspacing='0' class='table ui-body-d ui-shadow ui-responsive table-stripe' data-column-btn-text=''><thead>"
            + "<tr class='bGrau'><th>&nbsp;&nbsp;Die Prämien</th><th class=TR>still / angesagt&nbsp;</th></tr></thead>"
            + "<tbody>"
            + "<tr><th>&nbsp;&nbsp;König ultimo</th><th class=TR>1 / 2&nbsp;&nbsp;</th></tr>"
            + "<tr><th>&nbsp;&nbsp;Trull</th><th class=TR>1 / 2&nbsp;&nbsp;</th></tr>"
            + "<tr><th>&nbsp;&nbsp;4 Könige</th><th class=TR>1 / 2&nbsp;&nbsp;</th></tr>"
            + "<tr><th>&nbsp;&nbsp;Pagat (I)</th><th class=TR>1 / 2&nbsp;&nbsp;</th></tr>"
            + "<tr><th>&nbsp;&nbsp;Uhu (II)</th><th class=TR>2 / 4&nbsp;&nbsp;</th></tr>"
            + "<tr><th>&nbsp;&nbsp;Kakadu (III)</th><th class=TR>3 / 6&nbsp;&nbsp;</th></tr>"
            + "<tr><th>&nbsp;&nbsp;Quapil (IIII)</th><th class=TR>4 / 8&nbsp;&nbsp;</th></tr>"
            + "<tr><th>&nbsp;&nbsp;Valat</th><th class=TR>10 / 20&nbsp;&nbsp;</th></tr>"
            + "</tbody></table>"
            + "<br>*) Rufer und Trischaken können nur gespielt werden, wenn die anderen Spieler \"weiter\" gesagt haben.<br>"
            + "<br>**) Der Sechserdreier muss von der Vorhand sofort lizitiert werden.<br><br>"
            + '</div></div>'

            + '<div class="ui-grid-b ui-responsive S" style="padding: ' + hTextPadding + '">'


            + '<ul>'
            + '<div class="M B" style="padding: 1vh 0 1vh 0">§&nbsp;&nbsp;Allgemeines:</div>'
            + '<li>Es wird gegen den Uhrzeigersinn gegeben und gespielt. Jeder Spieler erhält zweimal 6 Karten, der Talon (zweimal 3 Karten) wird in die Mitte gegeben.</li>'
            + '<li>Jedes Spiel muss gespielt werden. Kein Blatt wird zusammen&shy;geworfen.</li>'
            + '<li>Wenn kein Verstoß gegen Farb-, Stich- oder Prämienzwang vorliegt, darf eine gespielte Karte nicht zurückgenommen werden.</li>'
            + '<li>Kontra (doppelt), Retour (vierfach) und Sub (achtfach) haben keine Auswirkung auf die Schrift, sondern werden nach jedem Spiel sofort ausbezahlt.</li>'
            + '<li>Bei positiven Spielen gilt das Kontra für alle Spieler, bei negativen Spielen wird individuell kontriert. Beim Trischaken gibt es kein Kontra.</li>'
            + '<li>Um das Spiel nicht zu stören, haben Zuschauer vom Spieltisch genügend weit entfernt zu stehen. Jegliche Störungen des Spiels durch einen Kiebitz oder durch den 5ten Spieler bei Fünfertischen wie Äußerungen zum Spiel (auch durch Mimik oder Gestik) sind strikt untersagt. Wenn der Verdacht besteht, dass ein Spiel durch den Einfluss eines Kiebitzes gewonnen oder verloren wurde, kann der Schiedsrichter herbeigerufen werden. Dieser kann auf Annullierung des Spieles entscheiden und den Störenfried vom Turnier ausschließen oder auf unbestimmte Zeit sperren. Jeder Spieler hat das Recht, einen Kiebitz wegzuweisen.</li>'
            + '<li>Um ein positives Spiel zu gewinnen benötigt der Spielaufnehmer 35 Punkte und 2 Blatt.</li>'
            + '<li>Nach jedem Spiel wird das Ergebnis per App oder auf dem Schreiberzettel notiert.</li>'
            + '<li>Am Ende jeder Runde erhalten die Gewinner von den Verlierern jeweils 10 Cent pro Punkt.</li>'
            + '</ul>'


            + '<ul>'
            + '<div class="M B" style="padding: 1vh 0 1vh 0">§&nbsp;&nbsp;Turnierablauf:</div>'
            + '<li><span style="font-weight: bold">Anmeldung:&nbsp;&nbsp;</span>Ab 13 Uhr.</li>'
            + '<li><span style="font-weight: bold">Turnierbeginn:&nbsp;&nbsp;</span>Die Turniere beginnen jeweils um 14 Uhr. Wer sich bei der Anreise verspätet, möge bitte rechtzeitig den Veranstalter oder die Turnierleitung verständigen.</li>'
            + '<li><span style="font-weight: bold">Modus:&nbsp;&nbsp;</span>Es werden drei Runden zu je 20 Spiele gespielt.</li>'
            + '<li><span style="font-weight: bold">Zeitlimit:&nbsp;&nbsp;</span>Pro Runde gibt es ein Zeitlimit von zwei Stunden. Wird dieses Limit überschritten kann der Schiedsrichter die Runde vorzeitig abbrechen.</li>'
            + '<li><span style="font-weight: bold">Sperre:&nbsp;&nbsp;</span>Ein unentschuldigtes Verlassen eines Turniers führt zu einer Sperre. Die Dauer der Sperre wird individuell festgelegt.</li>'
            + '</ul>'


            + '<ul>'
            + '<div class="M B" style="padding: 1vh 0 1vh 0">§&nbsp;&nbsp;Platzwahl und erster Geber:</div>'
            + '<li>Der erste Spieler am Tisch kann seinen Platz frei wählen. Die restlichen Spieler setzen sich laut Tischzettel/App entgegen dem Uhrzeigersinn auf den entsprechenden Platz.</li>'
            + '<li>Ist kein Tischzettel verfügbar und sitzt auch niemand mit einer App am Tisch, besteht freie Platzwahl.</li>'
            + '<li>Wird mit der App geschrieben, ist der erste Geber von dieser vorgegeben. Andernfalls zieht jeder Spieler eine Karte. Wer die höchste Karte zieht, ist der Geber.</li>'
            + '</ul>'


            + '<ul>'
            + '<div class="M B" style="padding: 1vh 0 1vh 0">§&nbsp;&nbsp;Spielablauf:</div>'
            + '<li><span style="font-weight: bold">Lizitation:&nbsp;&nbsp;</span>Die Vorhand eröffnet mit "Mein Spiel!", mit "Vorhand!" oder mit "Sechserdreier!" die Lizitation. Danach können die Spieler reihum ein Spiel lizitieren oder "Weiter!" sagen. Wer einmal "Weiter!" gesagt hat, darf nicht mehr mitbieten. Ein eigenes Spiel kann nicht überboten werden. Es gibt keinen Besserrufer. Nur Pagat-, Uhu-, Kakadu- und Quapilrufer. Wird ein Spiel nicht mehr überboten, ist die Lizitation zu Ende.</li>'
            + '<li><span style="font-weight: bold">König rufen:&nbsp;&nbsp;</span>Bei Partnerspielen muss nach der Lizitation ein König (Partner) gerufen werden. Wer drei Könige im Blatt hat, kann den "Vierten" rufen. Hat jemand vier Könige im Blatt, muss er eine Dame rufen. Es ist nicht erlaubt sich selbst zu rufen (Renonce).</li>'
            + '<li><span style="font-weight: bold">Talon Aufnahme:&nbsp;&nbsp;</span>Bei Rufer, Vogerlrufer, Dreier und Farben&shy;dreier wird der Talon aufgedeckt. Der Spieler kann entscheiden, welche Hälfte er aufnehmen will. Liegt bei einem Rufer oder bei einem Vogerlrufer der gerufene König, kann das Spiel geschliffen werden. Bei einem Sechserdreier werden alle sechs Karten des Talons verdeckt aufgenommen. Bei den Solospielen bleibt der Talon verdeckt liegen und zählt am Schluss zu den Stichen der Gegner. Liegt bei einem Solorufer der gerufene König im Talon, gehört die Hälfte mit dem König dem Alleinspieler.</li>'
            + '<li><span style="font-weight: bold">Ablage:&nbsp;&nbsp;</span>Bei Tarockspielen werden zuerst Farbkarten verdeckt abgelegt. Wer keine Farbkarten mehr hat, muss Tarock offen abgelegen. Bei einem Farbendreier werden, soweit verfügbar, Tarockkarten verdeckt abgelegt. Wenn ein Farbspieler keine Tarockarten mehr hat, muss er Farbkarten offen ablegen. Könige und Trullstücke dürfen weder bei Tarockspielen noch bei einem Farbendreier abgelegt werden.</li>'
            + '<li><span style="font-weight: bold">Ansagen, "Ich liege":&nbsp;&nbsp;</span>Nach der Wiederholung des Spiels, des gerufenen Königs und der Ansage eventueller Prämien wird die Spielansage mit den Worten "Ich liege" beendet.</li>'
            + '<li><span style="font-weight: bold">Kontrarunde:&nbsp;&nbsp;</span>Eventuelle Prämien müssen in der ersten Kontrarunde angesagt werden. Der Spielersteher kann keine Prämien mehr ansagen. Wer keine Prämie ansagen und auch nicht kontrieren will, sagt "Gut". Ein mit "Gut" quittiertes Spiel, eine mit "Gut" quittierte Prämie kann nicht mehr kontriert werden. Nebst Kontra (doppelt) sind Retour (vierfach) und Sub (achtfach) möglich. Sollte sich bei einem Partnerspiel herausstellen, dass man seinen Partner kontriert hat, ist das Kontra nicht gültig.</li>'
            + '</ul>'


            + '<ul>'
            + '<div class="M B" style="padding: 1vh 0 1vh 0">§&nbsp;&nbsp;Tarockspiele:</div>'
            + '<li><span style="font-weight: bold">Ablage:&nbsp;&nbsp;</span>Zuerst müssen Farbkarten verdeckt verlegt werden. Wenn man keine Farbkarten mehr hat, müssen Tarock offen abgelegt werden. Könige und Trullstücke dürfen nie abgelegt werden.</li>'
            + '<li><span style="font-weight: bold">Ausspiel:&nbsp;&nbsp;</span>Das erste Ausspiel hat immer die Vorhand.</li>'
            + '<li><span style="font-weight: bold">Farbzwang:&nbsp;&nbsp;</span>Kann ein Spieler eine Farbe nicht bedienen, muss er Tarock zugeben/stechen. Erst wenn ein Spieler kein Tarock mehr im Blatt hat, darf er eine beliebige Farbkarte zugeben. Kann er Tarock nicht bedienen, ist ebenfalls eine beliebige Farbkarte zuzugeben.</li>'
            + '<li><span style="font-weight: bold">Kaiserstich:&nbsp;&nbsp;</span>Fällt die Trull in einem Stich zusammen (egal in welcher Reihenfolge), sticht der Pagat. </li>'
            + '</ul>'


            + '<ul>'
            + '<div class="M B" style="padding: 1vh 0 1vh 0">§&nbsp;&nbsp;Ruferspiele:</div>'
            + '<li><span style="font-weight: bold">Lizitation:&nbsp;&nbsp;</span>Ein Ruferspiel mit Vogerl muss sofort unter Nennung des Vogerls lizitiert werden, also Pagatrufer, Uhurufer, Kakadurufer oder Quapilrufer. Nach dem Verlegen kann der Spieler weitere Vögel ansagen. Hat ein Spieler die Lizitation gewonnen, muss er einen König rufen. Hat jemand drei Könige in der Hand, kann er auch den "Vierten" rufen. Wer vier Könige hat muss eine Dame rufen. Selbstrufen ist nicht erlaubt und Renonce.</li>'
            + '<li><span style="font-weight: bold">Selberrufer:&nbsp;&nbsp;</span>Liegt beim Rufer, Pagatrufer etc. der gerufene König im Talon, kann sich der Spieler frei entscheiden, welche Talonhälfte er aufnimmt. Wer sich selbst ruft, kann "schleifen". In diesem Fall werden die Punkte des normalen Spiels für die Schrift gewertet (z.B. Pagatrufer 3 Punkte). Entscheidet sich der Spieler zu spielen, kann er kontriert werden. Liegt bei einem Solorufer der gerufene König im Talon, erhält der Alleinspieler die Talonhälfte mit dem König. Kontras zählen in diesem Fall nicht, egal ob das Spiel bzw. allfällige Prämien gewonnen wurden oder nicht.</li>'
            + '</ul>'


            + '<ul>'
            + '<div class="M B" style="padding: 1vh 0 1vh 0">§&nbsp;&nbsp;Farbspiele:</div>'
            + '<li><span style="font-weight: bold">Ablage:&nbsp;&nbsp;</span>Zunächst müssen Tarock verdeckt verlegt werden. Wenn man keine Tarockkarten mehr hat, müssen Farbkarten offen abgelegt werden. Nach dem Verlegen muss der Spieler mindestens 6 Farbkarten im Blatt haben. Könige und Trullstücke dürfen nie abgelegt werden.</li>'
            + '<li><span style="font-weight: bold">Ausspiel:&nbsp;&nbsp;</span>Das erste Ausspiel hat immer die Vorhand. Tarock darf erst ausgespielt werden, wenn ein Spieler keine Farbkarten mehr hat.</li>'
            + '<li><span style="font-weight: bold">Farbzwang:&nbsp;&nbsp;</span>Kann ein Spieler eine Farbe nicht bedienen, muss er Tarock zugeben. Erst wenn ein Spieler kein Tarock mehr im Blatt hat, darf er eine beliebige Farbkarte zugeben.</li>'
            + '<li><span style="font-weight: bold">Prämien:&nbsp;&nbsp;</span>Von den Prämien zählen nur die vier Könige und der Valat.</li>'
            + '<li><span style="font-weight: bold">Kaiserstich:&nbsp;&nbsp;</span>Nur wenn Tarock ausgespielt wurde und die Trull in einem Stich zusammenfällt (egal in welcher Reihenfolge), sticht der Pagat.</li>'
            + '</ul>'


            + '<ul>'
            + '<div class="M B" style="padding: 1vh 0 1vh 0">§&nbsp;&nbsp;Negativspiele:</div>'
            + '<li><span style="font-weight: bold">Ausspiel:&nbsp;&nbsp;</span>Bei Negativspielen spielt immer der Spielersteher aus.</li>'
            + '<li><span style="font-weight: bold">Stichzwang:&nbsp;&nbsp;</span>Es gilt Stichzwang.</li>'
            + '<li><span style="font-weight: bold">Farbzwang:&nbsp;&nbsp;</span>Kann ein Spieler eine Farbe nicht bedienen, muss er Tarock zugeben. Erst wenn ein Spieler kein Tarock mehr im Blatt hat, darf er eine beliebige Farbkarte zugeben.</li>'
            + '<li><span style="font-weight: bold">Ouvertspiele:&nbsp;&nbsp;</span>Nach dem ersten Stich legen alle Spieler ihre Karten offen auf den Tisch. Die 3 Gegenspieler dürfen sich beraten ("plaudern"). Die gespielten Karten/Stiche werden entweder eingezogen oder bleiben vor jedem Spieler offen auf dem Tisch liegen.</li>'
            + '<li><span style="font-weight: bold">Kaiserstich:&nbsp;&nbsp;</span>Bei Negativspielen gibt es keinen Kaiserstich.</li>'
            + '<li><span style="font-weight: bold">Pagat:&nbsp;&nbsp;</span>Der Pagat darf nur als letztes Tarock ausgespielt und zugegeben werden.</li>'
            + '</ul>'


            + '<ul>'
            + '<div class="M B" style="padding: 1vh 0 1vh 0">§&nbsp;&nbsp;Trischaken:</div>'
            + '<li><span style="font-weight: bold">Zuwaage:&nbsp;&nbsp;</span>Die sechs Karten des Talons werden einzeln zu den ersten sechs Stichen vor deren Einziehen offen dazugegeben. Die Vorhand ist für die richtige Zugabe der Zuwaage zu den ersten sechs Stichen verantwortlich.</li>'
            + '<li><span style="font-weight: bold">Verlierer:&nbsp;&nbsp;</span>Verloren hat das Trischaken der Spieler mit den meisten Punkten. Gibt es zwei punktegleiche Verlierer, teilen sich diese die zu vergebenden Punkte. Ist jedoch die Vorhand mit einem anderen Spieler punktegleich, ist die Vorhand der alleinige Verlierer.</li>'
            + '<li><span style="font-weight: bold">Bürgermeister:&nbsp;&nbsp;</span>Wer 35 Punkte und 2 Blatt oder mehr erreicht hat ist "Bürgermeister".</li>'
            + '<li><span style="font-weight: bold">Punkteverteilung:&nbsp;&nbsp;</span>Es werden grundsätzlich sechs Punkte verteilt. Dieser Wert verdoppelt sich bei einem "Bürgermeister" sowie bei einer "verlierenden Vorhand" und vervierfacht sich bei einem "Vorhand-Bürgermeister".</li>'
            + '<li><span style="font-weight: bold">Jungfrau:&nbsp;&nbsp;</span>Erzielt ein Spieler keinen Stich ("Jungfrau"), erhält er alle zu verteilenden Punkte. Gibt es mehrere "Jungfrauen", werden die zu vergebenden Punkte unter ihnen aufgeteilt.</li>'
            + '<li><span style="font-weight: bold">Renonce:&nbsp;&nbsp;</span>Bei einem Renonce erhalten die drei regulären Spieler je sechs Punkte, so als hätten sie keinen Stich gemacht ("Jungfrau").</li>'
            + '</ul>'


            + '<ul>'
            + '<div class="M B" style="padding: 1vh 0 1vh 0">§&nbsp;&nbsp;Prämien:</div>'
            + '<li><span style="font-weight: bold">Sofort ansagen, kontrieren:&nbsp;&nbsp;</span>Prämien müssen sofort, bei der ersten Gelegenheit angesagt werden. Dasselbe gilt für etwaige Kontras.</li>'
            + '<li><span style="font-weight: bold">Im Blatt:&nbsp;&nbsp;</span>Vögel und König ultimo können nur angesagt werden, wenn man die entsprechende Karte im Blatt hat.</li>'
            + '<li><span style="font-weight: bold">Solospiele:&nbsp;&nbsp;</span>Bei Solorufer, Solodreier und Farbensolo zählen alle Prämien doppelt.</li>'
            + '<li><span style="font-weight: bold">Partnerspiele:&nbsp;&nbsp;</span>Stellt sich bei einem Partnerspiel heraus, dass man eine Prämie seines Partner (zum Beispiel die Trull) kontriert hat, gilt das Kontra nicht.</li>'
            + '<li><span style="font-weight: bold">Prämienzwang:&nbsp;&nbsp;</span>Ein angesagter Vogel, ein angesagter Künig ultimo darf nur aufgegeben werden, wenn es der Farbzwang erfordert. Wurden mehrere Vögel angesagt, muss zuerst der höhere Vogel aufgegeben werden.</li>'
            + '<li><span style="font-weight: bold">Stiller Valat:&nbsp;&nbsp;</span>Ein stiller Valat inkludiert die stille Trull und die stillen Könige. Alle anderen Prämie werden gewertet. Wurde das Spiel bei einem stillen Valat kontriert, so zählt das Kontra nicht.</li>'
            + '<li><span style="font-weight: bold">Angesagter Valat:&nbsp;&nbsp;</span>Da ein Valat die Trull und vier Könige inkludiert, können diese Prämien bei einem angesagten Valat nicht angesagt werden. Vögel und König ultimo können immer angesagt werden. Wurde der Valat kontriert, wird ein gewonnenes Spiel gegengerechnet. Selbst&shy;verständlich kann das Spiel und der Valat kontriert werden.</li>'
            + '</ul>'


            + '<ul>'
            + '<div class="M B" style="padding: 1vh 0 1vh 0">§&nbsp;&nbsp;Renonce:</div>'
            + '<li>Begeht ein Spieler Renonce, erhalten die anderen Spieler so viele Punkte, als hätten sie das Spiel und die angesagten Prämien gewonnen. Der renoncierende Spieler bei einem Ruferspiel zahlt also auch dem eigenen Partner. Der renoncierende Gegner eines Dreierspielers zahlt dem Dreierspieler somit dreimal und seinen Partner je einmal. In Summe also fünfmal).</li>'
            + '<li>Verstöße gegen Farbzwang oder Stichzwang gelten dann als Renonce, sobald der Stich umgedreht wurde. Liegen die Karten noch offen auf dem Tisch, darf bei Verstößen gegen Farb-, Stich- und Prämienzwang korrigiert werden.</li>'
            + '<li>Bei Ouvertspielen gilt ein Verstoß gegen den Farbzwang oder Stichzwang dann als eingetreten, wenn entweder zum nächsten Stich ausgespielt worden ist (wenn die Karten/Stiche vor jedem Spieler offen liegenbleiben) oder wenn der Stich umgedreht worden ist (wenn die Karten/Stiche eingezogen werden). Bis dahin kann der Fehler korrigiert werden.</li>'
            + '<li>Wenn auf Renonce erkannt wird, ist das jeweilige Spiel zu Ende. Entsteht einem Spieler durch Renonce eines anderen Spielers eine offensichtliche Punkteeinbuße, weil stille Vögerl, ein stiller König ultimo oder ein stiller Valat nachweisbar gelungen wäre, sind diese Punkte dem Spielersteher (nicht den Gegner) zu ersetzen. Die anderen Spieler bekommen vom renoncierenden Spieler nur das Spiel und die angesagten Prämien.</li>'
            + '<li>Wird der angesagte Vogel oder der angesagte König durch Versehen zu früh (oder nicht rechtzeitig) gespielt, sind die anderen am Tisch angehalten, den Spieler darauf hinzuweisen. Sind die Karten bereits eingezogen, gilt das Vogerl/der angesagte König als verloren, das Spiel selbst jedoch nicht als Renonce (sofern sich der renoncierende Spieler nicht dadurch einen Vorteil verschafft hat).</li>'
            + '<li>Jeder Spieler darf in den zuvor gespielten Stich Einblick nehmen. Er darf jedoch nicht in seine eingezogenen Stiche hineinschauen. "Nachwassern" ist also verboten.</li>'
            + '<li>Vergeben ist dann nicht Renonce, wenn der Fehler vor Beginn der Lizitation bemerkt wird. Es muss straffrei neu gegeben werden. Stellt sich erst später heraus, dass ein Spieler zu wenig oder zu viele Karten im Blatt hat, müssen die Spieler mit der falschen Anzahl an Karten das Renonce zu gleichen Teilen bezahlen.</li>'
            + '<li>Hat ein Spieler am Ende eine Karte zu wenig oder zu viel, dann hat er mit 11 bzw. 13 Karten das Spiel begonnen. Das ist Renonce. Gleiches gilt für den Fall, dass ein Spieler deswegen am Ende eine Karte zu wenig hat, weil er im Verlauf des Spiels versehentlich zwei Karten auf den Tisch gelegt hat oder weil ihm während des Spiels eine Karte auf den Boden gefallen ist.</li>'
            + '<li>Die Stiche werden getrennt vom Talon und von der Ablage auf den Tisch abgelegt. Jeder Spieler darf nur seine eigenen Stiche einziehen, nicht auch die Stiche seines Partners! Auch die Gegner eines Dreierspielers dürfen ihre Stiche nicht zusammenlegen. Nach dem Spiel ist die Ablage auf Verlangen herzuzeigen.</li>'
            + '<li>Falsches Ausspiel: Hier ist die Relevanz des Vergehens für das angesagte Spiel zu prüfen. Einigt sich der Tisch nicht, entscheidet der Schiedsrichter bzw. das Schiedsrichter&shy;gremium, ob Renonce vorliegt oder nicht. Nach dem Umdrehen des ersten Stiches gilt ein falsches Ausspiel als "saniert", und das Spiel wird fortgesetzt.</li>'
            + '<li>Eine Renonce, die nicht sofort bzw. erst im Nachhinein bemerkt wird, gilt als "überspielt" bzw. als nicht mehr einforderbar, wenn zum nächsten Spiel gemischt und abgehoben wurde.</li>'
            + '<li>Bei Unklarheiten und Streitfällen, ob eine Renonce vorliegt, ist der für die jeweilige Runde eingeteilte Schiedsrichter herbei&shy;zurufen. Es sind alle Karten geordnet zu halten und noch vorhandene Karten auf der Hand werden nicht hergezeigt, bis der Sachverhalt geklärt ist. Falls ein Spieler sein Blatt herzeigt oder die bereits am Tisch liegenden Karten durchmischt, muss er damit rechnen, dass zu seinen ungunsten entschieden wird.</li>'
            + '</ul>'


            + '<ul>'
            + '<div class="M B" style="padding: 1vh 0 1vh 0">§&nbsp;&nbsp;Die Tarocketikette:</div>'
            + '<li>Auf einen fairen Spielablauf wird größter Wert gelegt. Wir bitten um einen freundlichen und kollegialen Umgang unter den Spielern, um höfliches, korrektes und ruhiges Verhalten.</li>'
            + '<li>Störendes Reden während des Spielablaufs ist unerwünscht (insbesondere Kommentare zum Spiel und Kritik an den Mitspielern) und hat auf Aufforderung gänzlich zu unterbleiben.</li>'
            + '<li>Wenn sich ein Spieler durch das Verhalten eines Mitspielers sehr gestört fühlt, kann der Schiedsrichter gerufen werden und eine Verwarnung aussprechen. Im Wiederholungsfall wird eine Sperre für ein oder mehrere Turniere verhängt.</li>'
            + '<li>Die Spiele und Prämien sind mit ihren üblichen Namen anzusagen (etwa: Tarock III heißt Kakadu, nicht Dreier). Das Lizit ist zügig, korrekt und gut hörbar durchzuführen, einschließlich der Gut-Meldungen.</li>'
            + '<li>Es muss ordentlich gemischt und eine möglichst zufällige Verteilung der Karten angestrebt werden. Die Mitspieler dürfen dies (und etwaiges Nachmischen) vom Geber einfordern. Der Abheber darf auch mehrmals abheben. Die abgehobenen Karten sind noch am Tisch wieder zu einem Paket zusammenzufügen. Der Geber darf bis zum Ende des Gebens keine Karte zu Gesicht bekommen, auch nicht seine eigenen Karten.</li>'
            + '</ul>'


            + '<ul>'
            + '<div class="M B" style="padding: 1vh 0 1vh 0">§&nbsp;&nbsp;Ausschluss des Rechtsweges:</div>'
            + '<li>Der Rechtsweg ist ausgeschlossen. Mit seiner Teilnahme akzeptiert jeder Spieler die Entscheidungen der Cupleitung und der Schiedsrichter. Der Cupleitung und dem Veranstalter steht es frei, ohne Angabe von Gründen Spieler von der Teilnahme auszuschließen. Es besteht kein Rechtsanspruch auf Teilnahme an einzelnen Turnierveranstaltungen.</li>'
            + '</ul>'
            + '</div>';


    if (stCup === 53 || stCup === 55 || stCup === 34) {
        html = REGELN(stCup);
    }

    if (QUERFORMAT()) {
        $('#dRumpf').html(html).css('margin-top', $('#qfHeader').height() + 'px');
        setFont();
    } else {
        $('#dContent').html(html).trigger('create').show();
        $('#nbUebersicht,#nbSaison,#nbArchiv').removeClass('ui-disabled').removeClass('ui-btn-active');
        $('#sideTurniere').hide();
        setFont(4);
        setTimeout(function () {
            var hx = parseInt($(window).innerHeight() - $('#dContent').offset().top - 1);
            $('#sideContent').css('height', hx + 'px');
        }, 100);
    }

    window.scrollTo(0, 0);

    $('#tStand').hide();

}