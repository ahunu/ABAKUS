
function REGELN(pCup) {
    if (pCup === 55) { // Tirolcup
        return '<div class="J">'
                + '<div class="ui-grid-b ui-responsive S" style="padding: 4vw 6vw 2vw 6vw">'
                + '<div class="ui-block-a" style="width:' + (QUERFORMAT() ? 45 : 100) + '%;">'
                + "<table width=100% data-role='table' data-mode='columntoggle' cellspacing='0' class='table ui-body-d ui-shadow ui-responsive table-stripe' data-column-btn-text=''><thead>"
                + "<tr class='bGrau'><th>&nbsp;&nbsp;Spiele</th><th class=TR>Punkte&nbsp;</th></tr></thead>"
                + "<tbody>"
                + "<tr><th>&nbsp;&nbsp;Rufer *</th><th class=TR>1&nbsp;&nbsp;</th></tr>"
                + "<tr><th>&nbsp;&nbsp;Trischaken *</th><th class=TR>2&nbsp;&nbsp;</th></tr>"
                + "<tr><th>&nbsp;&nbsp;Piccolo</th><th class=TR>2&nbsp;&nbsp;</th></tr>"
                + "<tr><th>&nbsp;&nbsp;Solorufer</th><th class=TR>2&nbsp;&nbsp;</th></tr>"
                + "<tr><th>&nbsp;&nbsp;Besserrufer</th><th class=TR>3&nbsp;&nbsp;</th></tr>"
                + "<tr><th>&nbsp;&nbsp;Bettler</th><th class=TR>4&nbsp;&nbsp;</th></tr>"
                + "<tr><th>&nbsp;&nbsp;Sechserdreier *</th><th class=TR>4&nbsp;&nbsp;</th></tr>"
                + "<tr><th>&nbsp;&nbsp;Farbendreier</th><th class=TR>5&nbsp;&nbsp;</th></tr>"
                + "<tr><th>&nbsp;&nbsp;Dreier</th><th class=TR>5&nbsp;&nbsp;</th></tr>"
                + "<tr><th>&nbsp;&nbsp;Zwiccolo ouvert</th><th class=TR>8&nbsp;&nbsp;</th></tr>"
                + "<tr><th>&nbsp;&nbsp;Piccolo ouvert</th><th class=TR>8&nbsp;&nbsp;</th></tr>"
                + "<tr><th>&nbsp;&nbsp;Bettel ouvert</th><th class=TR>8&nbsp;&nbsp;</th></tr>"
                + "<tr><th>&nbsp;&nbsp;Farbensolo</th><th class=TR>10&nbsp;&nbsp;</th></tr>"
                + "<tr><th>&nbsp;&nbsp;Solodreier</th><th class=TR>10&nbsp;&nbsp;</th></tr>"
                + "</tbody></table>"
                + '</div>'
                + '<br>'
                + '<div class="ui-block-b" style="width:9%;">'
                + '</div>'
                + '<div class="ui-block-c" style="width:' + (QUERFORMAT() ? 45 : 100) + '%;">'
                + "<table width=100% data-role='table' data-mode='columntoggle' cellspacing='0' class='table ui-body-d ui-shadow ui-responsive table-stripe' data-column-btn-text=''><thead>"
                + "<tr class='bGrau'><th>&nbsp;&nbsp;Zusätze</th><th class=TR>still / angesagt&nbsp;</th></tr></thead>"
                + "<tbody>"
                + "<tr><th>&nbsp;&nbsp;König ultimo</th><th class=TR>1 / 2&nbsp;&nbsp;</th></tr>"
                + "<tr><th>&nbsp;&nbsp;Pagat (I)</th><th class=TR>1 / 2&nbsp;&nbsp;</th></tr>"
                + "<tr><th>&nbsp;&nbsp;Uhu (II)</th><th class=TR>2 / 4&nbsp;&nbsp;</th></tr>"
                + "<tr><th>&nbsp;&nbsp;Kakadu (III)</th><th class=TR>3 / 6&nbsp;&nbsp;</th></tr>"
                + "<tr><th>&nbsp;&nbsp;Quapil (IIII)</th><th class=TR>4 / 8&nbsp;&nbsp;</th></tr>"
                + "<tr><th>&nbsp;&nbsp;Mondfang</th><th class=TR>1 / 2&nbsp;&nbsp;</th></tr>"
                + "<tr><th>&nbsp;&nbsp;Trull</th><th class=TR>1 / 2&nbsp;&nbsp;</th></tr>"
                + "<tr><th>&nbsp;&nbsp;Vier Könige</th><th class=TR>1 / 2&nbsp;&nbsp;</th></tr>"
                + "<tr><th>&nbsp;&nbsp;1. Sack</th><th class=TR>1 / 2&nbsp;&nbsp;</th></tr>"
                + "<tr><th>&nbsp;&nbsp;2. Sack</th><th class=TR>1 / 2&nbsp;&nbsp;</th></tr>"
                + "<tr><th>&nbsp;&nbsp;Valat</th><th class=TR>10 / 20&nbsp;&nbsp;</th></tr>"
                + "</tbody></table>"
                + "<br>*) Vorhandspiele<br>"
                + '</div></div>'

                + '<div class="ui-grid-b ui-responsive S" style="padding: 1vw 6vw 3vw 3vw">'

                + '<ul>'
                + '<div class="M B" style="padding: 1vh 0 1vh 0">1)&nbsp;&nbsp;Allgemeines</div>'
                + '<li><b>Königrufen</b> wird mit 54 Karten, zu viert und gegen den Uhrzeigersinn gespielt - zu fünft setzt der Geber aus. Es muss abgehoben werden (links oder gegenüber). Jeder Spieler erhält zweimal sechs Karten, der Talon wird in der Mitte oder zu Beginn gegeben.</li>'
                + '<li><b>Mit jedem Blatt</b> muss gespielt werden. In positiven Spielen spielt die Vorhand zum ersten Stich aus, in negativen der Spieler. Es gilt Farbzwang (eine ausgespielte Farbe muss bedient werden) und Tarockzwang (auf eine Fehlfarbe muss man Tarock spielen).</li>'
                + '<li><b>Was liegt, pickt.</b> Eine regelwidrig gespielte Karte darf jedoch ausnahmsweise zurückgenommen werden, solange der Stich noch nicht umgedreht bzw. nicht schon zum nächsten Stich ausgespielt wurde. Jeder darf den letzten Stich sehen, alle anderen Stiche und der Talon sind tabu (nachwassern verboten).</li>'
                + '<li><b>Gezählt</b> wird immer in Lagen zu drei Karten mit zwei Punkten Abzug pro Lage, bei unvollständigen Lagen wird nur ein Punkt abgezogen. Um zu gewinnen, sind 36 Punkte erforderlich (= 35/2 Blatt bei blattgenauer Zählweise).</li>'
                + '<li><b>Kontra</b> (Re-/Subkontra) verdoppelt den Spielwert. Spiel und Zusätze können getrennt kontriert werden. In Negativspielen kontriert jeder Gegner individuell, ansonsten gilt ein Kontra immer für alle Spieler.</li>'
                + '<li><b>Kaiserstich:</b> fällt die Trull zusammen, sticht der Pagat (nur in der Reihenfolge Mond, Sküs und Pagat).</li>'
                + '</ul>'

                + '<ul>'
                + '<div class="M B" style="padding: 1vh 0 1vh 0">2)&nbsp;&nbsp;Lizitation</div>'
                + '<li><b>Ersteigerung:</b> Die Vorhand beginnt mit <i>Vorhand</i> oder einer Spielansage. Die Vorhandspiele stehen nur der Vorhand offen. Den Sechserdreier kann sie nur vorneweg ansagen, alle anderen Spiele auch im Nachhinein. Angesagte Spiele dürfen nur durch höherrangige Spiele überboten werden. Eine eigene Spielansage darf nicht  erhöht werden, außer sie wurde zuvor überboten. Wer einmal gepasst hat, darf nicht mehr mitbieten.</li>'
                + '<li><b>Ansagen:</b> Der Spieler kann jetzt einen König rufen, den Talon aufnehmen und eventuelle Zusätze ansagen. Hat er drei Könige im Blatt, kann er â€žden Viertenâ€œ rufen (ohne die Farbe zu nennen). Sich selber rufen ist nicht erlaubt. Beim Solodreier müssen die Zusätze gleich nach dem Spiel angesagt werden, da dieses nicht überboten werden kann. Das Liegen beendet die Ansage. Erst dann können die anderen Spieler reihum entweder weitere Zusätze ansagen oder die bisherigen Ansagen kontrieren bzw. mit <i>gut</i> quittieren. Auf jede Ansage darf so lange mit weiteren Ansagen reagiert werden, bis drei Spieler hintereinander <i>gut</i> gesagt haben (nachbessern erlaubt).</li>'
                + '</ul>'

                + '<ul>'
                + '<div class="M B" style="padding: 1vh 0 1vh 0">3)&nbsp;&nbsp;Positivspiele</div>'
                + '<li><b>Spiele mit Talon:</b> Der Spieler darf eine Hälfte aufnehmen und drei Karten ablegen. Die Ablage gehört zu den eigenen Stichen, die andere Hälfte zu den Stichen der Gegner. Könige und Trullstücke dürfen nie abgelegt werden, Tarock erst wenn erzwungen und dann nur offen. Beim Sechserdreier wird der ganze Talon verdeckt aufgenommen und der Spielverlust zählt doppelt (nur das Spiel). Wenn der gerufene König im Talon liegt, kann man das Spiel schleifen (aufgeben). Die Hälfte mit dem gerufenen König darf liegengelassen werden.</li>'
                + '<li><b>Solospiele (ohne Talon):</b> Der Talon bleibt verdeckt liegen und gehört am Ende zu den Stichen der Gegner. Liegt der gerufene König im Talon, gehört diese Hälfte dem Spieler. Alle Zusätze zählen doppelt.</li>'
                + '<li><b>Farbenspiele:</b> Tarock sticht nicht. So lange man Farbkarten hat, darf man kein Tarock ausspielen. Kann man eine Farbe nicht bedienen, muss man Tarock zugeben. Statt der Farbkarten sind Tarock zu verlegen (verdeckt und keine Fünferzähler; Farbkarten nur erzwungen und offen). Als Zusätze gelten nur Könige, Säcke und Valat.</li>'
                + '</ul>'

                + '<ul>'
                + '<div class="M B" style="padding: 1vh 0 1vh 0">4)&nbsp;&nbsp;Negativspiele</div>'
                + '<li>Keine Zusätze; der Pagat darf erst als letztes Tarock gespielt werden (außer bei Kaiserstich mit Stichzwang).</li>'
                + '<li><b>Trischaken:</b> bunt gemischt; ohne Kontra. Die Vorhand kann bestimmen, ob mit oder ohne Stichzwang gespielt wird und ob der Talon zu den ersten sechs Stichen (offen) oder zum letzten Stich dazugegeben wird. Es wird blattgenau abgerechnet. Die zwei Spieler mit den meisten Punkten zahlen an die beiden anderen je zwei Punkte (2 x 2). Ein Bürgermeister (â‰¥ 35/2 Blatt) zahlt sechs Punkte (3 x 2). Eine Jungfrau (kein Stich) kassiert sechs Punkte (3 x 2). Hat die Vorhand die meisten Punkte, zahlt sie ebenfalls sechs Punkte (3 x 2), als Bürgermeister doppelt (3 x 4). Punktegleiche Spieler teilen sich die Punkte, haben die beiden mittleren Spieler gleichviel Punkte, gehen beide leer aus. Bei einer Renonce ist an die anderen der Fixwert von je vier Punkten zu zahlen (3 x 4).</li>'
                + '<li><b>Bettler, Piccolo & Co:</b> Stichzwang; kein Talon. Der Spieler spielt aus. Bei-Spiele sind nicht erlaubt.</li>'
                + '<li><b>Ouvert:</b> Die Karten werden nach dem ersten Stich aufgedeckt. Wird mit Reden gespielt, dürfen sich die Gegenspieler über die Spielstrategie unterhalten. Gilt Schweigepflicht, dürfen sie sich weder beraten noch gegenseitig beeinflussen und es gilt <i>berührt, geführt</i>. Legt der Veranstalter nichts fest, darf geredet werden.</li>'
                + '</ul>'

                + '<ul>'
                + '<div class="M B" style="padding: 1vh 0 1vh 0">5)&nbsp;&nbsp;Zusätze (Prämien)</div>'
                + '<li><b>Spiel</b> und Prämien werden getrennt verrechnet. Auch die Gegenpartei kann Zusätze ansagen oder still spielen.</li>'
                + '<li><b>Vögel und König ultimo:</b> Die Vögel müssen selber stechen, bei König Ultimo genügt es auch, wenn der Partner sticht. Vögel kann man nur ansagen, wenn man sie selbst im Blatt hat (kein kommandieren). Beide Ansagen dürfen nicht freiwillig aufgegeben werden. Müssen angesagte Vögel vorzeitig gespielt werden, muss zuerst immer der höchste Vogel aufgegeben werden.</li>'
                + '<li><b>Fänge:</b> Wird der Mond von den Gegnern gefangen, zählt das als Mondfang. Alle anderen Fänge zählen nicht.</li>'
                + '<li><b>Valat:</b> Die Prämie ist wie alle anderen zusätzlich zum Spiel zu zahlen. Als Zusätze (egal ob still oder angesagt) zählen alle Stichprämien (Vögel, Ultimo, Mondfang), aber keine Materialprämien (Trull, vier Könige, Säcke).</li>'
                + '</ul>'

                + '<ul>'
                + '<div class="M B" style="padding: 1vh 0 1vh 0">6)&nbsp;&nbsp;Renonce</div>'
                + '<li>Begeht jemand einen <b>Regelverstoß</b> (z. B. Missachtung von Farb-, Tarock- oder Stichzwang, Talonfehler, Spiel mit falscher Kartenanzahl, Besserrufer ohne Vogel im Blatt, Spielverrat etc.), muss er alle regulären Spieler so stellen, als ob sie Spiel und angesagte Zusätze gewonnen hätten.</li>'
                + '<li>Entsteht einem regulären Spieler darüber hinaus ein weiterer offensichtlicher Punkteverlust, ist er schadlos zu halten. Er und seine Partner können diese Punkte zusätzlich einfordern, solange ihr Verlust nicht ohnehin durch den Renoncewert abgedeckt ist.</li>'
                + '<li>Neben den Cupregeln gelten auch die <b>Tarocketikette</b> und die <b>Richtlinien</b> zur Regelauslegung. Die Entschei-dungen der Schiedsrichter bzw. Turnierleiter sind zu akzeptieren. Grobe Unsportlichkeiten (z. B. betrügerisches Falschspiel) können mit Ausschluss und Sperren geahndet werden.</li>'
                + '</ul>'

                + '<ul>'
                + '<div class="M B" style="padding: 1vh 0 1vh 0">7)&nbsp;&nbsp;Modus</div>'
                + '<li>Üblicherweise werden <b>drei Runden</b> mit je 16 Spielen ausgetragen (20 Spiele an Fünfertischen). Es gibt ein Zeitlimit, d. h. der Turnierleiter kann bei Bedarf ausständige Tische vorzeitig beenden.</li>'
                + '<li>Pro Punkt werden <b>zehn Cent</b> abgerechnet. Es gibt keine doppelten Runden und etwaige Kontras zählen nicht zur Turnierwertung. Die Sitzordnung wird durch Kartenziehen festgelegt (Tarock ist erste Vorhand). Der Schreiber ist für die korrekte und vollständige Mitschrift verantwortlich.</li>'
                + '<li>Die <b>Schriftpunkte</b> aus allen Runden werden addiert. Der Spieler mit den meisten Punkten gewinnt. Bei ex aequo gelten der Reihe nach folgende Kriterien: die bessere beste Runde, die besseren Tischränge und zuletzt das Los.</li>'
                + '<li>Alle Angaben erfolgen ohne Gewähr. Der Rechtsweg ist ausgeschlossen.</li>'
                + '</ul>'

                + '<ul>'
                + '<br>'
                + '<b class=S>&nbsp;&nbsp;&nbsp;Viel Vergnügen!</b>'
                + '<br>'
                + '<p class=S>&nbsp;&nbsp;&nbsp;(c) Markus Mair 2019, www.tarock.tirol</p>'
                + '</ul>'
                + '<br>'
                + '</div>';

    } else if (pCup === 53) { // Sauwaldcup
        return '<div class="J">'
                + '<div class="ui-grid-b ui-responsive S" style="padding: 4vw 6vw 2vw 6vw">'
                + '<div class="ui-block-a" style="width:' + (QUERFORMAT() ? 45 : 100) + '%;">'
                + "<table width=100% data-role='table' data-mode='columntoggle' cellspacing='0' class='table ui-body-d ui-shadow ui-responsive table-stripe' data-column-btn-text=''><thead>"
                + "<tr class='bGrau'><th>&nbsp;&nbsp;Spiele</th><th class=TR>Punkte&nbsp;</th></tr></thead>"
                + "<tbody>"
                + "<tr><th>&nbsp;&nbsp;Vorhandrufer *</th><th class=TR>1&nbsp;&nbsp;</th></tr>"
                + "<tr><th>&nbsp;&nbsp;Trischaken *</th><th class=TR>1&nbsp;&nbsp;</th></tr>"
                + "<tr><th>&nbsp;&nbsp;Piccolo</th><th class=TR>2&nbsp;&nbsp;</th></tr>"
                + "<tr><th>&nbsp;&nbsp;Bettel</th><th class=TR>2&nbsp;&nbsp;</th></tr>"
                + "<tr><th>&nbsp;&nbsp;Solorufer</th><th class=TR>2&nbsp;&nbsp;</th></tr>"
                + "<tr><th>&nbsp;&nbsp;A-Rufer</th><th class=TR>3&nbsp;&nbsp;</th></tr>"
                + "<tr><th>&nbsp;&nbsp;Dreier</th><th class=TR>5&nbsp;&nbsp;</th></tr>"
                + "<tr><th>&nbsp;&nbsp;Sechserdreier *</th><th class=TR>4&nbsp;&nbsp;</th></tr>"
                + "<tr><th>&nbsp;&nbsp;Farbensolo</th><th class=TR>4&nbsp;&nbsp;</th></tr>"
                + "<tr><th>&nbsp;&nbsp;Piccolo ouvert</th><th class=TR>6&nbsp;&nbsp;</th></tr>"
                + "<tr><th>&nbsp;&nbsp;Bettel ouvert</th><th class=TR>7&nbsp;&nbsp;</th></tr>"
                + "<tr><th>&nbsp;&nbsp;Solodreier</th><th class=TR>8&nbsp;&nbsp;</th></tr>"
                + "</tbody></table>"
                + '</div>'
                + '<br>'
                + '<div class="ui-block-b" style="width:9%;">'
                + '</div>'
                + '<div class="ui-block-c" style="width:' + (QUERFORMAT() ? 45 : 100) + '%;">'
                + "<table width=100% data-role='table' data-mode='columntoggle' cellspacing='0' class='table ui-body-d ui-shadow ui-responsive table-stripe' data-column-btn-text=''><thead>"
                + "<tr class='bGrau'><th>&nbsp;&nbsp;Zusätze</th><th class=TR>still / angesagt&nbsp;</th></tr></thead>"
                + "<tbody>"
                + "<tr><th>&nbsp;&nbsp;König ultimo</th><th class=TR>1 / 2&nbsp;&nbsp;</th></tr>"
                + "<tr><th>&nbsp;&nbsp;Pagat (I)</th><th class=TR>1 / 2&nbsp;&nbsp;</th></tr>"
                + "<tr><th>&nbsp;&nbsp;Uhu (II)</th><th class=TR>2 / 4&nbsp;&nbsp;</th></tr>"
                + "<tr><th>&nbsp;&nbsp;Kakadu (III)</th><th class=TR>3 / 6&nbsp;&nbsp;</th></tr>"
                + "<tr><th>&nbsp;&nbsp;Quapil (IIII)</th><th class=TR>4 / 8&nbsp;&nbsp;</th></tr>"
                + "<tr><th>&nbsp;&nbsp;Mondfang</th><th class=TR>1 / 2&nbsp;&nbsp;</th></tr>"
                + "<tr><th>&nbsp;&nbsp;Trull</th><th class=TR>1 / 2&nbsp;&nbsp;</th></tr>"
                + "<tr><th>&nbsp;&nbsp;4 Könige</th><th class=TR>1 / 2&nbsp;&nbsp;</th></tr>"
                + "<tr><th>&nbsp;&nbsp;Valat</th><th class=TR>4-/8fach&nbsp;&nbsp;</th></tr>"
                + "</tbody></table>"
                + "<br>*) Vorhandspiele<br><br>"
                + '</div></div>'

                + '<div class="ui-grid-b ui-responsive S" style="padding: 1vw 6vw 3vw 3vw">'

                + '<ul>'
                + '<div class="M B" style="padding: 1vh 0 1vh 0">&nbsp;&nbsp;Allgemeines:</div>'
                + '<li>Es muss mit Geld gespielt werden (1 Punkt = 10 Cent), und es wird plus und minus geschrieben.</li>'
                + '<li>Jedes Spiel muss gespielt bzw. gewertet werden. Ein Blatt ohne Tarock und Könige darf nicht abgelegt werden.</li>'
                + '<li>Wer die höchste Karte hebt, beginnt mit der Abgabe der Karten. Es muss gründlich gemischt und abgehoben werden. Der Talon wird in der Mitte gegeben.</li>'
                + '<li>Zum Gewinn braucht ein Spieler 36 Punkte (35 Punkte und 2 Blatt).</li>'
                + '<li>Bei den Spielen Rufer, Solo-Rufer und A-Rufer ist es untersagt einen König zu rufen, der sich im eigenen Blatt befindet. Ein Verstoß gegen diese Regel ist ganz klar Renonce.</li>'
                + '<li>Nur mit „Vorhand“ kann sich der Vorhandspieler freihalten, ob er ein positives oder negatives Spiel spielt. Alle Spiele, außer Sechser-Dreier, sind möglich, auch ohne vorherige Lizitation. Ein Spiel wird mit "ich liege" eröffnet. Die übrigen Spieler müssen jede Ansage mit "gut" zur Kenntnis nehmen - außer sie kontrieren.</li>'
                + '<li>Liegt beim Rufer oder A-Rufer der gerufene König im Talon, kann der Spieler das Spiel „schleifen“. Es werden die Punkte des normalen Rufers bzw. A-Rufers + Ansage gewertet.</li>'
                + '<li>Hat man drei Könige im Blatt, so ist es erlaubt den „vierten König“ zu rufen, ohne die Farbe zu verraten.</li>'
                + '<li>Ein Kontra wirkt sich nicht auf die Punktewertung aus und bindet bei den positiven Spielen alle Spieler einer Partei, bei den negativen Spielen muss jeder Spieler für sich selbst kontrieren. Das Spiel Trischaken kann nicht kontriert werden.</li>'
                + '</ul>'

                + '<ul>'
                + '<div class="M B" style="padding: 1vh 0 1vh 0">&nbsp;&nbsp;Vorhand:</div>'
                + '<li>Der Vorhandspieler hat einen Sechser-Dreier sofort anzumelden, alle anderen Spiele können auch im Nachhinein gemeldet werden. Wird der Sechser-Dreier verloren, wird nur das Spiel (nicht aber die Ansagen) doppelt (vom Spieler aus) gewertet (Verlorener Valat beim Sechser-Dreier - 8 mal 8 Punkte).</li>'
                + '<li>Ein weiteres Recht des Vorhandspielers ist es, ein bereits lizitiertes Spiel zu halten (also selbst zu spielen).</li>'
                + '<li>Hat der Vorhandspieler alle vier Könige im Blatt und sieht er keine Möglichkeit ein Spiel zu spielen, so muss die Vorhand an den nächsten Spieler mit "ich gebe die Vorhand weiter" abgegeben werden. Alle Rechte der Vorhand gehen somit auf den nächsten Spieler über, auch das Recht einen Sechser-Dreier zu spielen. Auf das nächste Spiel hat dies aber keine Auswirkung, d.h. ein Spieler hat zweimal hintereinander die Vorhand.</li>'
                + '</ul>'

                + '<ul>'
                + '<div class="M B" style="padding: 1vh 0 1vh 0">&nbsp;&nbsp;Trischaken:</div>'
                + '<li>Es besteht Farb- und Stichzwang, aber es muss nicht austarockiert werden.</li>'
                + '<li>Der Pagat darf nur als letzter Tarock aus- bzw. zugegeben werden.</li>'
                + '<li>Der Spieler, der den letzten Stich erzielt, erhält den Talon.</li>'
                + '<li>Verlierer des Trischakens ist jener Spieler mit den meisten Punkten. Hat der Vorhandspieler die meisten Punkte oder ist er Punktegleich mit anderen Spielern, muss er doppelt bezahlen. Wurde das Spiel mit mindestens 36 Punkten verloren, wird ebenfalls doppelt bezahlt. Der Vorhandspieler hat in diesem Fall den vierfachen Wert zu bezahlen.</li>'
                + '<li>Haben alle Spieler mindestens einen Stich, so bezahlt jener Spieler mit den meisten Punkten den anderen drei je einen Punkt. Bei Punktegleichheit zweier oder dreier Spieler geben die Verlierer an die bzw. den Gewinner je einen Punkt ab.</li>'
                + '<li>Hat ein Spieler keinen Stich, so erhält er vom Verlierer drei Punkte, die anderen beiden gehen leer aus. Bei Punktegleichheit erhält die „Jungfrau“ von den Verlieren die drei Punkte.</li>'
                + '<li>Haben zwei Spieler keinen Stich, so erhalten sie je drei Punkte. Bei Punktegleichheit (also jeweils 35 Punkte) erhalten die „Jungfrauen“ jeweils drei Punkte. Hat ein Spieler alle Stiche erzielt, gibt er sechs Punkte ab (der Vorhandspieler gibt 12 Punkte ab).</li>'
                + '<li>Bei einem Renonce erhalten die drei regulären Spieler immer jeweils drei Punkte, der Renoncespieler neun Minuspunkte (unabhängig davon, wer das Spiel gespielt hat).</li>'
                + '</ul>'

                + '<ul>'
                + '<div class="M B" style="padding: 1vh 0 1vh 0">&nbsp;&nbsp;Negativspiele:</div>'
                + '<li>Negativspiele sind: Piccolo, Bettel, Piccolo-Ouvert, Bettel-Ouvert. Nicht die Vorhand, sondern der Spieler selbst spielt aus.</li>'
                + '<li>Der Pagat darf nur als letzter Tarock aus- bzw. zugegeben werden. Es herrscht Stichzwang.</li>'
                + '<li>Bei den Ouvertspielen werden nach dem ersten und vor dem zweiten Ausspielen alle Karten offen auf den Tisch gelegt. Die drei Gegenspieler dürfen untereinander über die Spiestrategie beraten.</li>'
                + '</ul>'

                + '<ul>'
                + '<div class="M B" style="padding: 1vh 0 1vh 0">&nbsp;&nbsp;Farbensolo:</div>'
                + '<li>Die Tarock als „5. Farbe“ zu sehen, man muss mindestens 6 Farbkarten im Blatt haben. Die Vorhand spielt aus.</li>'
                + '<li>Es darf erst Tarock gespielt werden, wenn man keine Farbkarten mehr im Blatt hat.</li>'
                + '<li>Wenn eine Farbe nicht in den Karten ist, muss Tarock zugegeben werden. Hat man keine Tarock mehr im Blatt, kann eine beliebige Karte zugegeben werden.</li>'
                + '<li>Es besteht kein Stichzwang und nur der Valat und alle Könige sind zulässige Ansagen.</li>'
                + '<li>Es wird ohne Talon und Trumpf gespielt. Der Talon fällt am Ende des Spieles den Gegenspielern zu.</li>'
                + '</ul>'

                + '<ul>'
                + '<div class="M B" style="padding: 1vh 0 1vh 0">&nbsp;&nbsp;Ansagen:</div>'
                + '<li>Alle Ansagen gelten heimlich jeweils die Hälfte, bei den Solospielen doppelt (außer dem Valat).</li>'
                + '<li>Jeder Spieler kann nur einmal eine „Ansage“ tätigen.</li>'
                + '<li>Die Figuren Pagat, Uhu, Kakadu, Quapil sowie König Ultimo können nicht für andere Spieler (z.B. Partner) angesagt werden.</li>'
                + '<li>Beim Solo-Dreier (höchstes Spiel, daher kein Überbieten mehr möglich) müssen alle Ansagen sofort gemeldet werden, bevor der Spieler das Spiel für eröffnet erklärt (z.B. mit „ich liege“).</li>'
                + '<li>Eine der vier Figuren Pagat, Uhu, Kakadu oder Quapil ist Voraussetzung für einen A-Rufer. Hat man keine dieser Figuren vor dem Talonkauf im Blatt und spielt trotzdem einen A-Rufer, so ist dies als Renonce zu werten (je drei Punkte an die Mitspieler).</li>'
                + '<li>Sagt ein Spieler den falschen Ansager an (etwa Uhu im Blatt, sagt aber Kakadu an oder falschen König), so begeht er keine Renonce und verliert nur den jeweiligen Ansager (evtl. kontriert).</li>'
                + '<li>Werden mehrere Ansagen getätigt, so sind diese - im Falle eines Scheiterns - in der Reihenfolge gemäß ihrer Wertigkeit abzugeben (also zuerst Quapil, dann Kakadu, dann Uhu und zuletzt Pagat). Ein Verstoß gegen diese Regel ist ganz klar Renonce.</li>'
                + '<li>Wird ein angesagter Vogel oder König zum falschen Zeitpunkt gespielt, so ist er verloren (darf nicht mehr zurückgenommen werden), aber es ist kein Renonce sofern der Spieler nicht gegen die Reihenfolge (siehe oben) verstößt. Der Spielpartner muss den Verlust mittragen.</li>'
                + '<li>Will sich jedoch ein Spieler offensichtlich einen Vorteil verschaffen (etwa angesagten Pagat vorzeitig heimstechen um Trull und Spiel zu retten oder mit angesagtem König vorzeitig einstechen), so ist das ganz klar Renonce.</li>'
                + '<li>Beim Valat (angesagt: 8facher Spielwert; heimlich: 4facher Spielwert) gelten nur die angesagten Ansagen.</li>'
                + '<li>Da sich der Valat nur auf das Spiel bezieht, gelten andere „Ansagen“ (z.B. Trull) nicht automatisch als verloren wenn das Spiel verliert.</li>'
                + '</ul>'

                + '<ul>'
                + '<div class="M B" style="padding: 1vh 0 1vh 0">&nbsp;&nbsp;Renonceregelung:</div>'
                + '<li>Die Renonceregelung kann nicht alle möglichen Fälle berücksichtigen. Hier muss immer an die Fairness der einzelnen Spieler appelliert werden. Oberstes Gebot ist Kollegialität und Freude am Tarockspiel.</li>'
                + '<li>Alle regulären Spieler erhalten die Punkte als hätten sie das Spiel und alle angesagten Ansagen gewonnen (Ausnahme: Trischaken, siehe dort). Der Spieler, der das Renonce begangen hat, erhält die Punkte der drei Mitspieler als Minuspunkte eingetragen.</li>'
                + '<li>Wird eine falsche Abgabe der Karten noch vor der ersten Ansage bzw. nach Beendigung der Abgabe bemerkt, ist die Abgabe zu wiederholen. Ansonsten ist für den/die Spieler mit falscher Kartenzahl ein Renoncespiel zu werten.</li>'
                + '<li>Verstöße gegen Farb- und Stichzwang gelten dann als Renonce, wenn die Karten eingezogen sind. So lange die Karten am Tisch liegen, können Verstöße korrigiert werden. Ansonsten gilt: Was liegt, das pickt!</li>'
                + '<li>Falsches Ausspielen - Zurechtweisen von allen Spielern aber kein Renonce (Wiederholt falsches Ausspielen wird nach Ermahnung als ein Renonce gewertet). Nach eingezogenen Karten, keine Reklamationen mehr möglich und das Spiel läuft ungestraft weiter.</li>'
                + '<li>Im Zweifelsfall entscheidet ein Schiedsrichter der „TarockRunde Sauwald“.</li>'
                + '</ul>'

                + '<ul>'
                + '<br>'
                + '<p class=S>&nbsp;&nbsp;Regelwerk der TarockRunde Sauwald – Stand 2019, Autor: Sepp LANG</p>'
                + '</ul>'
                + '<br>'
                + '</div>';
    }
}