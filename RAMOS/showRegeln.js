
/* global CUPS, LS, stCup, jbSpieler, stHeute, QUERFORMAT(), ADMIN */

function showRegeln() {

    if (QUERFORMAT()) {
        if (lastBtn) {
            $(lastBtn).removeClass('ui-btn-active');
        }
        lastBtn = '#bTarifeUndRegeln';
        $(lastBtn).addClass('ui-btn-active');
    }

    if (LS.ME !== "NOBODY") {
        showIcons(['#iPrint']);
    }

    stStat = 'Regeln';

    if (jbSpieler.isOpen) {
        jbSpieler.close();
    }
    $("#dCopyright").hide();

    writeCanvas('Tarife und Regeln');

    if (QUERFORMAT()) {
        var hTableWidth = 45;
        var hTablePadding = '4vw 6vw 2vw 6vw';
        var hTextPadding = '1vw 6vw 3vw 3vw';
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
            + "</tbody></table>"
            + "<br>*) Rufer und Trischaken kann nur gespielt werden, wenn die anderen Spieler weiter gesagt haben.<br>"
            + "<br>**) Der Sechserdreier muss von der Vorhand sofort lizitiert werden.<br><br>"
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
            + "<br>Bei Solospielen zählen die Prämien doppelt.<br>"
            + "<br>Mondfang, Absolut und Honneurs werden nicht honoriert.<br>"
            + "<br>Jedes Spiel muss gespielt werden. Ein Blatt ohne Tarock und ohne Könige wird nicht zusammengeworfen.<br>"
            + "<br>Kaiserstich: Fallen Sküs, Mond und Pagat zusammen (egal in welcher Reihenfolge), so sticht der Pagat. In Negativspielen gibt es keinen Kaiserstich.<br>"
            + '</div></div>'

            + '<div class="ui-grid-b ui-responsive S" style="padding: ' + hTextPadding + '">'

            + '<ul>'
            + '<div class="M B" style="padding: 1vh 0 1vh 0">§&nbsp;&nbsp;Allgemeines:</div>'
            + '<li>Es wird gegen den Uhrzeigersinn gegeben und gespielt. Jeder Spieler erhält zweimal 6 Karten, der Talon (zweimal 3 Karten) wird in die Mitte gegeben.</li>'
            + '<li>Jedes Spiel muss gespielt werden. Kein Blatt wird zusammengeworfen.</li>'
            + '<li>Ein Spieler darf einen Vogel oder König ultimo nur dann ansagen, wenn er die jeweilige Karte im Blatt hat.</li>'
            + '<li>Wenn kein Verstoß gegen Farb-, Stich- oder Prämienzwang vorliegt, darf eine gespielte Karte nicht zurückgenommen werden.</li>'

            + '<li>Bei den Solospielen zählen die Prämien doppelt.</li>'
            + '<li>Kontra (doppelt), Re (vierfach) und Sub (achtfach) haben keine Auswirkung auf die Schrift, sondern werden nach jedem Spiel sofort ausbezahlt.</li>'
            + '<li>Bei positiven Spielen gilt das Kontra für alle Spieler, bei negativen Spielen wird individuell kontriert. Beim Trischaken gibt es kein Kontra.</li>'

            + '<li>Um das Spiel nicht zu stören, haben Zuschauer vom Spieltisch genügend weit entfernt zu stehen. Jegliche Störungen des Spiels durch einen Kiebitz ' + (stCup === 54 ? '' : 'oder durch den 5ten Spieler bei Fünfertischen ') + 'wie Äußerungen zum Spiel (auch durch Mimik oder Gestik) sind strikt untersagt. Wenn der Verdacht besteht, dass ein Spiel durch den Einfluss eines Kiebitzes gewonnen oder verloren wurde, kann der Schiedsrichter herbeigerufen werden. Dieser kann auf Annullierung des Spieles entscheiden und den Störenfried vom Turnier ausschließen oder auf unbestimmte Zeit sperren. Jeder Spieler hat das Recht, einen Kiebitz wegzuweisen.</li>'

            + '<li>Um ein positiven Spiel zu gewinnen benötigt der Spielaufnehmer 35 Punkte und 2 Blatt.</li>'
            + '<li>Nach jedem Spiel wird das Ergebnis auf dem Schreibzettel oder per App notiert.</li>'
            + '<li>Am Ende jeder Runde erhalten die Gewinner von den Verlierern jeweils 10 Cent pro Punkt.</li>'
            + '</ul>'

            + '<ul>'
            + '<div class="M B" style="padding: 1vh 0 1vh 0">§&nbsp;&nbsp;Turnierablauf:</div>'
            + '<li><span style="font-weight: bold">Anmeldung:</span>&nbsp;&nbsp;Ab 13 Uhr.</li>'
            + '<li><span style="font-weight: bold">Turnierbeginn:</span>&nbsp;&nbsp;Die Turniere beginne jeweils um 14 Uhr. Wer sich bei der Anreise verspätet, möge bitte rechtzeitig den Veranstalter oder die Turnierleitung verständigen.</li>'
            + '<li><span style="font-weight: bold">Modus:</span>&nbsp;&nbsp;Es werden drei Runden zu je 20 Spiele gespielt.</li>'
            + '<li><span style="font-weight: bold">Zeitlimit:</span>&nbsp;&nbsp;Pro Runde gibt es ein Zeitlimit von zwei Stunden. Wird dieses Limit überschritten kann der Schiedsrichter die Runde vorzeitig abbrechen.</li>'
            + '<li><span style="font-weight: bold">Sperre:</span>&nbsp;&nbsp;Ein unentschuldigtes Verlassen eines Turniers führt zu einer Sperre. Die Dauer der Sperre wird individuell festgelegt.</li>'
            + '</ul>'

            + '<ul>'
            + '<div class="M B" style="padding: 1vh 0 1vh 0">§&nbsp;&nbsp;Platzwahl und erster Geber:</div>'
            + '<li>Die Sitzordung wird vom Tischzettel (der längliche Streifen) vorgegen. Diese ist mit der Reihenfolge auf der App ident.</li>'
            + '<li>Der erste Spieler am Tisch kann seinen Platz frei wählen. Die restliche Spieler setzen sich laut Tischzettel/App entgegen dem Uhrzeigersinn auf den entspechenden Platz.</li>'
            + '<li>Ist kein Tischzettel verfügbar und sitzt auch niemand mit einer App am Tisch, besteht freie Platzwahl.</li>'
            + '<li>Wird mit der App geschrieben, ist der erste Geber von dieser vorgegeben. Andernfalls zieht jeder Spieler eine Karte. Wer die höchste Karte zieht, ist der Geber.</li>'
            + '</ul>'



            + '<ul>'
            + '<div class="M B" style="padding: 1vh 0 1vh 0">§&nbsp;&nbsp;Spielablauf:</div>'
            + '<li><span style="font-weight: bold">Lizitation:</span>&nbsp;&nbsp;Die Vorhand eröffnet mit "Mein Spiel!", mit "Vorhand!" oder mit "Sechserdreier!" die Lizitation. Danach können die Spieler reihum ein Spiel lizitieren oder "Weiter!" sagen. Wer einmal "Weiter!" gesagt hat, darf nicht mehr mitbieten. Ein eigenes Spiel kann nicht überboten werden. Es gibt keinen Besserrufer. Nur Pagat-, Uhu-, Kakadu- und Quapilrufer. Wird ein Spiel nicht mehr überboten, ist die Lizitation zu Ende.</li>'
            + '<li><span style="font-weight: bold">König rufen:</span>&nbsp;&nbsp;Bei Partnerspielen muss nach der Litzitation ein König (Partner) gerufen werden. Wer drei Könige im Blatt hat kann den Vierten rufen. Hat jemand vier Könige im Blatt, muss er eine Dame rufen. Es ist nicht erlaubt sich selbst zu rufen (Renonce).</li>'
            + '<li><span style="font-weight: bold">Talonaufnahme:</span>&nbsp;&nbsp;Bei Rufer, Vogerlrufer, Dreier und Farbendreier wird der Talon aufgedeckt. Der Spieler kann entscheiden welche Hälfte er aufnehmen will. Liegt bei einem Rufer oder bei einem Vogerlrufer der gerufene König, kann das Spiel geschliffen werden. Bei einem Sechserdreier werden alle sechs Karten des Talons verdeckt aufgenommen. Bei den Solospielen bleibt der Talon verdeckt liegen und zählt am Schluss zu den Stichen der Gegner. Liegt bei einem Solorufer der gerufene König im Talon, gehört die Hälfte mit dem König dem Alleinspieler.</li>'
            + '<li><span style="font-weight: bold">Ablage:</span>&nbsp;&nbsp;Bei Tarockspielen werden zuerst Farbkarten verdeckt abgelegt. Wer keine Farbkarten mehr hat, muss Tarock offen abgelegen. Bei einem Farbendreier werden soweit verfügbar Tarocke verdeckt abgelegt. Wenn ein Farbspieler keine Tarocke mehr hat, muss er Farbkarten offen ablegen. Könige und Trullstücke dürfen weder bei Tarockspielen noch bei einem Farbendreier abgelegt werden.</li>'
            + '<li><span style="font-weight: bold">Ansagen, Ich liege:</span>&nbsp;&nbsp;Nach der Wiederholung des Spiels, des gerufenen Königs und der Ansage eventueller Prämien wird die Spielansage mit den Worten "Ich liege!" beendet.</li>'
            + '<li><span style="font-weight: bold">Kontrarunde:</span>&nbsp;&nbsp;Eventuelle Prämien müssen in der ersten Kontrarunde angesagt werden. Der Spielersteher kann keine Prämien mehr ansagen. Wer keine Prämie ansagen und auch nicht kontrieren will, sagt "Gut!". Ein mit "Gut!" quittiertes Spiel, eine mit "Gut!" quittierte Prämie kann nicht mehr kontriert werden. Nebst Kontra (doppel) sind Retour (vierfach) und Sub (achtfach) möglich. Sollte sich bei einem Partnerspiel heraustellen, dass man seinen Partner kontriert hat, ist das Kontra nicht gültig.</li>'
            + '</ul>'

            + '<ul>'
            + '<div class="M B" style="padding: 1vh 0 1vh 0">§&nbsp;&nbsp;Tarockspiele:</div>'
            + '<li><span style="font-weight: bold">Ablage:</span>&nbsp;&nbsp;Zuerst müssen Farbkarten verdeckt verlegt werden. Wenn man keine Farbkarten mehr hat müssen Tarock offen abgelegt werden. Könige und Trullstücke dürfen nie abgelegt werden.</li>'
            + '<li><span style="font-weight: bold">Ausspiel:</span>&nbsp;&nbsp;Das erste Ausspielen hat immer die Vorhand.</li>'
            + '<li><span style="font-weight: bold">Farbzwang:</span>&nbsp;&nbsp;Kann ein Spieler eine Farbe nicht bedienen, muss er Tarock zugeben/stechen. Erst wenn ein Spieler kein Tarock mehr im Blatt hat, darf er eine beliebige Farbkarte zugeben. Kann er Tarock nicht bedienen, ist ebenfalles eine beliebige Farbkarte zuzugeben.</li>'
            + '<li><span style="font-weight: bold">Prämienzwang:</span>&nbsp;&nbsp;Nur wenn es der Farbzwang erzwingt darf ein angesagtes Vogerl oder der angesagte König ultimo aufgegeben werden. Wurden mehrere Vögel angesagt, so muss zuerst das höhere Vogerl aufgegeben werden.</li>'
            + '<li><span style="font-weight: bold">Kaiserstich:</span>&nbsp;&nbsp;Fällt die Trull in einem Stich zusammen (egal in welcher Reihenfolge) sticht der Pagat.</li>'
            + '</ul>'

            + '<ul>'
            + '<div class="M B" style="padding: 1vh 0 1vh 0">§&nbsp;&nbsp;Ruferspiele:</div>'
            + '<li><span style="font-weight: bold">Lizitation:</span>&nbsp;&nbsp;Ein Ruferspiel mit Vogel muss sofort unter Nennung des Vogels lizitiert werden, also Pagatrufer, Uhurufer, Kakadurufer oder Quapilrufer. Nach dem Verlegen kann der Spieler weitere Vögel ansagen. Hat ein Spieler die Lizitation gewonnen, muss er einen König rufen. Hat jemand drei Könige in der Hand kann er auch den Vierten rufen. Wer vier Könige hat muss eine Dame rufen. Selbstrufen ist nicht erlaubt und Renonce.</li>'
            + '<li><span style="font-weight: bold">Selberrufer:</span>&nbsp;&nbsp;Liegt beim Rufer, Pagatrufer etc. der gerufene König im Talon, kann sich der Spieler frei entscheiden, welche Talonhälfte er aufnimmt, es gibt also keine Strafprämie für einen liegengelassenen König. Wer sich selbst ruft, kann „schleifen“. In diesem Fall werden die Punkte des normalen Spiels für die Schrift gewertet (z.B. Pagatrufer 3 Punkte). Entscheidet sich der Spieler zu spielen, kann er kontriert werden. Das Kontra zählt nicht für die Schrift, wird aber am Tisch sofort ausbezahlt. Liegt bei einem Solorufer der gerufene König im Talon, erhält der Alleinspieler die Talonhälfte mit dem König. Kontras zählen in diesem Fall nicht, egal ob das Spiel bzw. allfällige Prämien gewonnen wurden oder nicht.</li>'
            + '</ul>'



            + '<ul>'
            + '<div class="M B" style="padding: 1vh 0 1vh 0">§&nbsp;&nbsp;Farbspiele:</div>'
            + '<li><span style="font-weight: bold">Ablage:</span>&nbsp;&nbsp;Zunächst müssen Tarock verdeckt verlegt werden. Wenn man keine Tarock mehr hat müssen Farbkarten offen abgelegt werden. Nach dem Verlegen muss der Spieler mindestens 6 Farbkarten im Blatt haben. Könige und Trullstücke dürfen nie abgelegt werden.</li>'
            + '<li><span style="font-weight: bold">Ausspiel:</span>&nbsp;&nbsp;Das erste Ausspielen hat immer die Vorhand. Tarock darf erst ausgespielt werden, wenn ein Spieler keine Farbkarten mehr hat.</li>'
            + '<li><span style="font-weight: bold">Farbzwang:</span>&nbsp;&nbsp;Kann ein Spieler eine Farbe nicht bedienen, muss er Tarock zugeben. Erst wenn ein Spieler kein Tarock mehr im Blatt hat, darf er eine beliebige Farbkarte zugeben.</li>'
            + '<li><span style="font-weight: bold">Prämien:</span>&nbsp;&nbsp;Von den Prämien zählen nur die vier Könige und der Valat.</li>'
            + '<li><span style="font-weight: bold">Kaiserstich:</span>&nbsp;&nbsp;Nur wenn Tarock ausgespielt wurde und die Trull in einem Stich zusammenfällt (egal in welcher Reihenfolge) sticht der Pagat.</li>'
            + '</ul>'

            + '<ul>'
            + '<div class="M B" style="padding: 1vh 0 1vh 0">§&nbsp;&nbsp;Negativspiele:</div>'
            + '<li><span style="font-weight: bold">Ausspiel:</span>&nbsp;&nbsp;Bei Negativspielen spielt immer der Spielersteher aus.</li>'
            + '<li><span style="font-weight: bold">Stichzwang:</span>&nbsp;&nbsp;Es gilt Stichzwang.</li>'
            + '<li><span style="font-weight: bold">Farbzwang:</span>&nbsp;&nbsp;Kann ein Spieler eine Farbe nicht bedienen, muss er Tarock zugeben. Erst wenn ein Spieler kein Tarock mehr im Blatt hat, darf er eine beliebige Farbkarte zugeben.</li>'
            + '<li><span style="font-weight: bold">Ouvertspiele:</span>&nbsp;&nbsp;Nach dem ersten Stich legen alle Spieler ihre Karten offen auf den Tisch. Die 3 Gegenspieler dürfen sich beraten („plaudern“). Die gespielten Karten/Stiche werden entweder eingezogen oder bleiben vor jedem Spieler offen auf dem Tisch liegen.</li>'
            + '<li><span style="font-weight: bold">Kaiserstich:</span>&nbsp;&nbsp;Bei Negativspielen gibt es keinen Kaiserstich.</li>'
            + '<li><span style="font-weight: bold">Pagat:</span>&nbsp;&nbsp;Der Pagat darf nur als letztes Tarock ausgespielt und zugegeben werden.</li>'
            + '</ul>'


            + '<ul>'
            + '<div class="M B" style="padding: 1vh 0 1vh 0">§&nbsp;&nbsp;Trischaken:</div>'
            + '<li>Die sechs Karten des Talons werden einzeln zu den ersten sechs Stichen vor deren Einziehen offen dazugegeben.</li>'
            + '<li>Die Vorhand ist verantwortlich für die richtige Zugabe der Zuwaage zu den ersten sechs Stichen.</li>'
            + '<li>Verlierer des Trischakens ist der Spieler mit den meisten Punkten. Sind zwei Verlierer punktegleich, so teilen sie sich die an die anderen Spieler zu verteilenden Punkte. Ist aber die Vorhand punktegleich, so verliert sie allein; punktegleiche Spieler werden so behandelt, als ob sie weniger Punkte hätten.</li>'
            + '<li>Als „Bürgermeister“ gilt ein Spieler, der mindestens 35 Punkte und 2 Blatt erzielt hat.</li>'
            + '<li>Es werden grundsätzlich sechs Punkte verteilt. Dieser Wert verdoppelt sich bei einem „Bürgermeister“ sowie bei einer „verlierenden Vorhand“ und vervierfacht sich bei einem „Vorhand-Bürgermeister“.</li>'
            + '<li>Die zu verteilenden Punkte werden in der Regel gleichmäßig an alle ausgeschüttet. Erzielen allerdings ein oder mehrere Spieler keinen Stich („Jungfrau“), so zieht die „Jungfrau“ alle zu verteilenden Punkte zur Gänze ein. Gibt es mehrere „Jungfrauen“, dann werden die zu verteilenden Punkte unter ihnen geteilt.</li>'
            + '<li>Bei einem Renonce erhalten die drei regulären Spielern je sechs Punkte.</li>'
            + '</ul>'

            + '<ul>'
            + '<div class="M B" style="padding: 1vh 0 1vh 0">§&nbsp;&nbsp;Prämien:</div>'
            + '<li>Jeder Spieler kann nur einmal Prämien ansagen, und er muss zuvor angesagte Prämien anderer Spieler gleich kontrieren, später kann er nur noch jene Prämien, die nach ihm angesagt wurden, kontrieren.</li>'
            + '<li>Ein Spieler darf einen Vogel oder König ultimo nur dann ansagen, wenn er die jeweilige Karte im Blatt hat.</li>'
            + '<li>Bei Solorufer, Solodreier und Farbensolo gelten die Prämien doppelt.</li>'
            + '<li>Partner oder Gegner eines Ruferspielers sagen eine Prämie (z.B. Trull) an, ohne sich zu deklarieren, ob sie Partner oder Gegner sind. Stellt sich am Ende heraus, dass sich Partner kontriert haben, zählt das Kontra nicht für die Schrift und wird auch nicht ausbezahlt.</li>'
            + '<li>Ein Spieler, der einen Vogel oder einen König ultimo angesagt hat, muss versuchen, die entsprechende Karte zum vorgeschriebenen Stich zu spielen. Er darf also nicht den Pagat oder den gerufenen König früher spielen, auch wenn es ihm mehr Punkte brächte.</li>'
            + '<li>Wer einen angesagten Vogel nicht zum vorgeschriebenen Stich spielen kann, weil er in diesem Stich eine Farbe bedienen muss, kann anschließend diese Karte jederzeit spielen.</li>'
            + '<li>Wenn mehrere Vögel, z.B. Kakadu und Uhu, angesagt sind, muss von oben abgebaut werden. Hat ein Spieler zum viertletzten Stich als einzige Tarock nur noch Tarock III und II im Blatt und ein Gegner spielt Tarock aus, muss er Tarock III zugeben. Er darf also nicht im viertletzten Stich Tarock II nehmen, in der Hoffnung mit Tarock III im drittletzten Stich den Kakadu zu gewinnen.</li>'
            + '</ul>'


            + '<ul>'
            + '<div class="M B" style="padding: 1vh 0 1vh 0">§&nbsp;&nbsp;Wie sehen die Regeln für Renonce aus?</div>'
            + '<li>Begeht ein Spieler Renonce, erhalten die anderen Spieler so viele Punkte, als hätten sie das Spiel und die angesagten Prämien gewonnen (der renoncierende Ruferspieler zahlt also auch dem eigenen Partner; der renoncierende Gegner eines Dreierspielers zahlt den anderen 2 Gegnern je 1 Mal, dem Dreierspieler 3 Mal, also in Summe 5 Mal).</li>'
            + '<li>Verstöße gegen Farbzwang oder Stichzwang gelten dann als Renonce, wenn jener Spieler, der den Stich gemacht hat, die Karten schon eingezogen hat. Liegen die Karten noch am Tisch, darf bei Verstößen gegen Farbzwang/Stichzwang korrigiert werden. Ein Ausspiel zum nächsten Stich gilt als „eingezogen“, auch wenn der vorige Stich noch offen am Tisch liegt.</li>'
            + '<li>Bei Ouvertspielen gilt ein Verstoß gegen den Farbzwang oder Stichzwang dann als eingetreten, wenn entweder zum nächsten Stich ausgespielt worden ist (wenn die Karten/Stiche vor jedem Spieler offen liegenbleiben) oder wenn der Stich umgedreht worden ist (wenn die Karten/Stiche eingezogen werden). Davor ist eine Korrektur des Verstoßes noch möglich, sofern er entdeckt wird.</li>'
            + '<li>Wenn auf Renonce erkannt wird, ist das jeweilige Spiel zu Ende. Entsteht einem Spieler durch Renonce eines anderen Spielers eine offensichtliche Punkteeinbuße, weil stille Vögel, ein stiller König ultimo oder ein stiller Valat gelungen wäre, so kann er diese Punkte (über den Schiedsrichter) beim renoncierenden Spieler einfordern. Die anderen Spieler bekommen vom renoncierenden Spieler nur das Spiel und die angesagten Prämien.</li>'
            + '<li>Wird der angesagte Vogel oder der angesagte König durch Versehen zu früh (oder nicht rechtzeitig) gespielt, sind die anderen am Tisch angehalten, den Spieler darauf hinzuweisen. Sind die Karten bereits eingezogen, gilt das Vogel/der angesagte König als verloren, das Spiel selbst jedoch nicht als Renonce (sofern sich der renoncierende Spieler nicht dadurch einen Vorteil verschafft hat).</li>'
            + '<li>Jeder Spieler darf in den zuvor gespielten Stich Einblick nehmen. Er darf jedoch nicht in seine eingezogenen Stiche hineinschauen, das Nachwassern ist also verboten.</li>'
            + '<li>Vergeben ist dann nicht Renonce, wenn der Fehler vor Beginn der Lizitation bemerkt wird. Der Spieler gibt straffrei neu. Stellt sich erst später heraus, dass ein Spieler zu wenig oder zu viele Karten im Blatt hat, so hat der Spieler mit den zu vielen und der mit den zu wenigen Karten Renonce begangen.</li>'
            + '<li>Hat ein Spieler am Ende eine Karte zu wenig oder zu viel, dann hat er mit 11 bzw. 13 Karten das Spiel begonnen. Das ist Renonce. Gleiches gilt für den Fall, dass ein Spieler deswegen am Ende eine Karte zu wenig hat, weil er im Verlauf des Spiels versehentlich zwei Karten auf den Tisch gelegt hat oder weil ihm während des Spiels eine Karte auf den Boden gefallen ist.</li>'
            + '<li>Die Stiche werden getrennt vom Talon und von der Ablage auf den Tisch abgelegt. Jeder Spieler darf nur seine eigenen Stiche einziehen, nicht auch die Stiche seines Partners! Auch die Gegner eines Dreierspielers dürfen ihre Stiche nicht zusammenlegen. Nach dem Spiel ist die Ablage auf Verlangen herzuzeigen.</li>'
            + '<li>Falsches Ausspiel: Hier ist die Relevanz des Vergehens für das angesagte Spiel zu prüfen. Einigt sich der Tisch nicht, entscheidet der Schiedsrichter bzw. das Schiedsrichtergremium, ob Renonce vorliegt oder nicht. Nach dem Umdrehen des ersten Stiches gilt ein falsches Ausspiel als „saniert“ und das Spiel wird fortgesetzt.</li>'
            + '<li>Eine Renonce, die nicht sofort bzw. erst im Nachhinein bemerkt wird, gilt als „überspielt“ bzw. als nicht mehr einforderbar, wenn zum nächsten Spiel gemischt und abgehoben wurde.</li>'
            + '<li>Bei Unklarheiten und Streitfällen, ob eine Renonce vorliegt, ist der für die jeweilige Runde eingeteilte Schiedsrichter herbeizurufen. Es sind alle Karten geordnet zu halten und noch vorhandene Karten auf der Hand werden nicht hergezeigt, bis der Sachverhalt geklärt ist. Falls ein Spieler sein Blatt herzeigt oder die bereits am Tisch liegenden Karten durchmischt, muss er damit rechnen, dass der Renonce-Fall gegen ihn entschieden wird.</li>'
            + '</ul>'

            + '<ul>'
            + '<div class="M B" style="padding: 1vh 0 1vh 0">§&nbsp;&nbsp;Die Tarocketikette:</div>'
            + '<li>Auf einen fairen Spielablauf wird großer Wert gelegt. Wir bitten um einen freundlichen und kollegialen Umgang unter den Spielern, um höfliches, korrektes und ruhiges Verhalten.</li>'
            + '<li>Störendes Reden während des Spielablaufs ist unerwünscht (insbesondere Kommentare zum Spiel und Kritik an den Mitspielern) und hat auf Aufforderung gänzlich zu unterbleiben.</li>'
            + '<li>Wenn sich ein Spieler durch das Verhalten eines Mitspielers sehr gestört fühlt, kann der Schiedsrichter gerufen werden und eine Verwarnung aussprechen. Im Wiederholungsfall wird eine Sperre für ein oder mehrere Turniere verhängt.</li>'
            + '<li>Die Spiele und Prämien sind mit ihren üblichen Namen anzusagen (etwa: Tarock III heißt Kakadu, nicht Dreier). Das Lizit ist zügig, korrekt und gut hörbar durchzuführen, einschließlich der Gut!-Meldungen.</li>'
            + '<li>Es muss ordentlich gemischt und eine möglichst zufällige Verteilung der Karten angestrebt werden. Die Mitspieler dürfen dies (und etwaiges Nachmischen) vom Geber einfordern. Der Abheber darf auch mehrmals abheben. Die abgehobenen Karten sind noch am Tisch wieder zu einem Paket zusammenzufügen. Der Geber darf bis zum Ende des Gebens keine Karte zu Gesicht bekommen, auch nicht seine eigenen Karten.</li>'
            + '</ul>'

            + '<ul>'
            + '<div class="M B" style="padding: 1vh 0 1vh 0">§&nbsp;&nbsp;Ausschluss des Rechtsweges:</div>'
            + '<li>Der Rechtsweg ist ausgeschlossen. Mit der Teilnahme erklärt sich jeder Spieler damit ausdrücklich einverstanden und auch Entscheidungen der Cupleitung und der Schiedsrichter zu akzeptieren. Der Cupleitung und den Veranstaltern steht es frei, ohne Angabe von Gründen Spieler von der Teilnahme auszuschließen. Es besteht kein Rechtsanspruch auf Teilnahme an einzelnen Turnierveranstaltungen.</li>'
            + '</ul>'
            + '<br>'
            + '</div>';

    if (stCup === 53 || stCup === 55) {
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