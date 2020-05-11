
/* global CUPS, LS, hCup, jbSpieler, stHeute, QUERFORMAT(), ADMIN, firebase, FB, stCup */

function showPresseschau() {

    var aBericht = [];

    var hCup = stCup;
    if (window.location.search === '?Presseschau') {
        if (LS.VIC[0]) {
            hCup = LS.VIC[0];
        } else {
            hCup = 56;
        }
    }

    if (hCup === 50)
        hFilter = 'HRC';
    else if (hCup === 51)
        hFilter = 'KTC';
    else if (hCup === 52)
        hFilter = 'RTC';
    else if (hCup === 53)
        hFilter = 'SWC';
    else if (hCup === 54)
        hFilter = 'STC';
    else if (hCup === 55)
        hFilter = 'TTC';
    else if (hCup === 56)
        hFilter = 'WTC';
    else
        hFilter = 'WTC';

    aBericht.push(["27.6.2007", "Diverses", "Bridge, Schnapsen und Tarock sind laut VwGH Geschick&shy;lich&shy;keits&shy;spiele", "https://www.wienerzeitung.at/startseite/archiv/101657-Ein-gutes-Blatt-Glueck-oder-Koennen.html?em_no_split=1"]);

    aBericht.push(["19.12.2019", "Diverses", "Karteln gegen die Einsamkeit", "https://www.wienerzeitung.at/nachrichten/chronik/wien/2043161-Karteln-gegen-die-Einsamkeit.html?em_no_split=1"]);

    aBericht.push(["26.11.2008", "Personen", "Versäumt habe man &hellip; zu tarockieren, so Gusenbauer", "https://www.wienerzeitung.at/dossiers/wahlen/oester&shy;reich/250919-Ein-Abschluss-mit-viel-Gefuehl.html"]);

    aBericht.push(["12.6.2004", "Diverses", "Piatnik setzt nicht alles auf eine Karte", "https://www.wienerzeitung.at/nachrichten/wirtschaft/international/308467-Piatnik-setzt-nicht-alles-auf-eine-Karte.html"]);

    aBericht.push(["1.5.2018", "WTC", "Erstmals kommt der öster&shy;reich&shy;ische Tarock&shy;meister aus dem Sauwald-Cup", "https://www.wienerzeitung.at/multimedia/spiele/tarock/tarock-cup/962197-Erstmals-kommt-der-Oester&shy;reichische-Tarockmeister-aus-dem-Sauwald-Cup.html"]);

    aBericht.push(["22.6.2008", "Tarockkurs", "Pagatkassa: Vorsicht ist die Mutter der Weisheit", "https://www.wienerzeitung.at/startseite/archiv/81221-Vorsicht-ist-die-Mutter-der-Weisheit.html?em_no_split=1"]);

    aBericht.push(["12.3.2017", "WTC", "Ingrid Müller ist zum dritten Mal Wiener Tarock&shy;meisterin", "https://www.wienerzeitung.at/multimedia/spiele/tarock/tarock-cup/879122-Ingrid-Mueller-ist-zum-dritten-Mal-Wiener-Tarockmeisterin.html"]);

    aBericht.push(["18.3.2018", "WTC", "Arno Peter ist Wiener Zeitung-Tarockmeister 2017/18", "https://www.wienerzeitung.at/multimedia/spiele/tarock/tarock-cup/953479-Arno-Peter-ist-Wiener-Zeitung-Tarockmeister-2017-18.html"]);

    aBericht.push(["15.9.2005", "STC", "Steirisches Königrufen", "https://www.wienerzeitung.at/startseite/archiv/129914-Steirisches-Koenigrufen.html?em_no_split=1"]);

    aBericht.push(["15.1.2006", "Diverses", "Auch Südpolen gehört noch zum Reich Tarockaniens", "https://www.wienerzeitung.at/startseite/archiv/123451-Auch-Suedpolen-gehoert-noch-zum-Reich-Tarockaniens.html"]);

    aBericht.push(["20.5.2012", "WTC", "Leopold Luger wird zum Seriensieger - auch in Villach erfolgreich", "https://www.wienerzeitung.at/multimedia/spiele/tarock/tarock-cup/458979-Leopold-Luger-wird-zum-Seriensieger-auch-in-Villach-erfolgreich.html"]);

    aBericht.push(["19.9.2005", "Tarockkurs", "Königrufen", "https://www.wienerzeitung.at/startseite/archiv/130650-Koenigrufen.html"]);

    aBericht.push(["16.3.2015", "WTC", "Ernst Punz ist Wiener Tarock&shy;meister 2014/15", "https://www.wienerzeitung.at/multimedia/spiele/tarock/tarock-cup/740831-Knapper-geht-es-nicht.html"]);

    aBericht.push(["22.9.2009", "Diverses", "Kurz notiert: Tarock hilft gegen Alzheimer", "https://www.wienerzeitung.at/startseite/archiv/70419-Kurz-notiert.html"]);

    aBericht.push(["12.4.2011", "Diverses", "Wo woar mei Leistung? Neulich sitze ich im Cafe Ritter in der Ottakringer Straße und spiele Tarock", "https://www.wienerzeitung.at/meinung/glossen/24352-Wo-woar-mei-Leistung.html"]);

    aBericht.push(["17.3.2014", "WTC", "Ingrid Müller ist Wiener Tarock&shy;meisterin 2013/14", "https://www.wienerzeitung.at/multimedia/spiele/tarock/tarock-cup/615666-Ingrid-Mueller-ist-Wiener-Tarockmeisterin-2013-14.html"]);

    aBericht.push(["11.11.2019", "Personen", "Peter Handke und eine Salzburger Tarock-Runde", "https://www.wienerzeitung.at/nachrichten/kultur/literatur/2037461-Als-Handke-Hakenkreuze-uebermalte.html?em_no_split=1"]);

    aBericht.push(["3.11.2009", "Diverses", "Tarockcup im Netz", "https://www.wienerzeitung.at/startseite/archiv/67752-Tarockcup-im-Netz.html"]);

    aBericht.push(["13.3.2016", "WTC", "Arno Peter ist Wiener Tarock&shy;meister 2015/16", "https://www.wienerzeitung.at/multimedia/spiele/tarock/tarock-cup/806179-Arno-Peter-ist-Wiener-Tarockmeister-2015-16.html"]);

    aBericht.push(["17.3.2019", "WTC", "Werner Wydra ist Wiener Tarock&shy;meister 2018/19", "https://www.wienerzeitung.at/multimedia/spiele/tarock/tarock-cup/2001761-Werner-Wydra-ist-Wiener-Tarockmeister.html"]);

    aBericht.push(["10.12.2007", "Tarockkurs", "Das Grundspiel im Königrufen", "https://www.wienerzeitung.at/startseite/archiv/90602-Das-Grundspiel-im-Koenigrufen.html"]);

    aBericht.push(["12.9.2005", "Tarockkurs", "Verlegen und Zählen", "https://www.wienerzeitung.at/startseite/archiv/129969-Verlegen-und-Zaehlen.html?em_no_split=1"]);

    aBericht.push(["18.3.2006", "Tarockkurs", "Im Gegenspiel entscheidn die Gabeln", "https://www.wienerzeitung.at/startseite/archiv/119287-Im-Gegenspiel-entscheiden-die-Gabeln.html"]);

    aBericht.push(["15.10.2005", "Tarockkurs", "XX-Rufen: Alles nur kein Emmen&shy;talerblatt", "https://www.wienerzeitung.at/startseite/archiv/128684-Alles-nur-kein-Emmentalerblatt.html"]);

    aBericht.push(["19.3.2013", "WTC", "Manfred Doppler ist Wiener Tarock&shy;meister 2012/13", "https://www.wienerzeitung.at/multimedia/spiele/tarock/tarock-cup/532457-Manfred-Doppler-ist-Wiener-Tarockmeister-2012-13.html"]);

    aBericht.push(["28.6.2006", "Tarockkurs", "Warum die Damen so wichtig sind", "https://www.wienerzeitung.at/startseite/archiv/115302-Warum-die-Damen-so-wichtig-sind..html"]);

    aBericht.push(["30.5.2006", "Tarockkurs", "Wie man eine Farbe markiert", "https://www.wienerzeitung.at/startseite/archiv/116389-Wie-man-eine-Farbe-markiert.html"]);

    aBericht.push(["12.3.2006", "Tarockkurs", "Soll ich runterklopfen oder mich nach hinten spielen?", "https://www.wienerzeitung.at/startseite/archiv/119188-Soll-ich-runterklopfen-oder-mich-nach-hinten-spielen.html"]);

    aBericht.push(["19.9.2005", "Tarockkurs", "Modernes Königrufen", "https://www.wienerzeitung.at/startseite/archiv/130497-Modernes-Koenigrufen.html?em_no_split=1"]);

    aBericht.push(["8.4.2006", "Tarockkurs", "Kein Stich oder 2 Stiche?", "https://www.wienerzeitung.at/startseite/archiv/118057-Kein-Stich-oder-2-Stiche.html"]);

    aBericht.push(["29.6.2006", "Tarockkurs", "Ein hohes Trullstück, aber zu schwach für einen Dreier", "https://www.wienerzeitung.at/startseite/archiv/115296-Ein-hohes-Trullstueck-aber-zu-schwach-fuer-einen-Dreier.html"]);

    aBericht.push(["31.12.2006", "Tarockkurs", "Im Solo spielt man Könige, hat man derer auch wenige", "https://www.wienerzeitung.at/startseite/archiv/108852-Im-Solo-spielt-man-Koenige-hat-man-derer-auch-wenige..html"]);

    aBericht.push(["12.9.2006", "Tarockkurs", "Geben und Lizitieren", "https://www.wienerzeitung.at/startseite/archiv/130503-Geben-und-Lizitieren.html?em_no_split=1"]);

    aBericht.push(["21.10.2005", "Tarockkurs", "Partnerwahl beim Pagatrufer - der alte Praktikus hat schon recht", "https://www.wienerzeitung.at/startseite/archiv/128662-Partnerwahl-beim-Pagatrufer-der-alte-Praktikus-hat-schon-recht.html"]);

    aBericht.push(["30.9.2006", "Tarockkurs", "Warum man Farben anzeigt und angezeigte Farben nachbringt", "https://www.wienerzeitung.at/startseite/archiv/111213-Warum-man-Farben-anzeigt-und-angezeigte-Farben-nachbringt.html"]);

    aBericht.push(["22.8.2006", "Tarockkurs", "Gegner spielt hohes Tarock aus, um Valat zu verhindern", "https://www.wienerzeitung.at/startseite/archiv/113635-Gegner-spielt-hohes-Tarock-aus-um-Valat-zu-verhindern.html"]);

    aBericht.push(["27.5.2007", "Tarockkurs", "Warten auf die fetten Stiche", "https://www.wienerzeitung.at/startseite/archiv/101143-Warten-auf-die-fetten-Stiche.html"]);

    aBericht.push(["30.9.2006", "Tarockkurs", "Wo die hängengebliebene Karte am wenigsten weh tut", "https://www.wienerzeitung.at/startseite/archiv/111369-Wo-die-haengengebliebene-Karte-am-wenigsten-weh-tut..html"]);

    aBericht.push(["15.9.2005", "Tarockkurs", "Pagat Ultimo", "https://www.wienerzeitung.at/startseite/archiv/130460-Pagat-Ultimo.html"]);

    aBericht.push(["27.3.2006", "Tarockkurs", "Piccolo - ein überaus reizvolles Spiel", "https://www.wienerzeitung.at/startseite/archiv/118707-Klein-aber-oho-ein-ueberaus-reizvolles-Spiel.html"]);

    aBericht.push(["26.1.2006", "Tarockkurs", "Wenn der Pagat über Gstieß und Mond triumphiert", "https://www.wienerzeitung.at/multimedia/spiele/tarock/tarock-cup/122703-Wenn-der-Pagat-ueber-Gstiess-und-Mond-triumphiert.html"]);

    aBericht.push(["11.4.2007", "Tarockkurs", "Wie mit irreführen ein stilles Vogerl gelingen kann", "https://www.wienerzeitung.at/startseite/archiv/103966-Wie-mit-Irrefuehren-ein-stilles-Vogerl-gelingen-kann.html"]);

    aBericht.push(["12.9.2005", "Tarockkurs", "Spielansagen und Prämien", "https://www.wienerzeitung.at/startseite/archiv/130763-Spielansagen-und-Praemien.html?em_no_split=1"]);

    aBericht.push(["30.9.2006", "Tarockkurs", "Soll der Ruferspieler in der gerufenen Farbe blank sein?", "https://www.wienerzeitung.at/startseite/archiv/111853-Soll-der-Ruferspieler-in-der-gerufenen-Farbe-blank-sein.html"]);

    aBericht.push(["12.12.2005", "Tarockkurs", "Wann spiel ich klein aus, wann spiel ich groß aus?", "https://www.wienerzeitung.at/startseite/archiv/125109-Wann-spiel-ich-klein-aus-wann-spiel-ich-gross-aus.html"]);

    aBericht.push(["30.9.2006", "Tarockkurs", "Wie man dem Partner Tarock anzeigt", "https://www.wienerzeitung.at/startseite/archiv/111370-Wie-man-dem-Partner-Tarock-anzeigt.html"]);

    aBericht.push(["7.11.2005", "Tarockkurs", "Wer spielt mit wem?", "https://www.wienerzeitung.at/startseite/archiv/127098-Wer-spielt-mit-wem.html"]);

    aBericht.push(["6.12.2005", "Tarockkurs", "Ein schwer kalkulierbarer Bursche", "https://www.wienerzeitung.at/startseite/archiv/125000-Ein-schwer-kalkulierbarer-Bursche.html"]);

    aBericht.push(["12.9.2005", "Tarockkurs", "Die Spielwiese", "https://www.wienerzeitung.at/startseite/archiv/130710-Die-Spielweise.html"]);

    aBericht.push(["18.1.2006", "Tarockkurs", "Warum ein starker Partner seine Tarock vorsichtig einsetzen muss", "https://www.wienerzeitung.at/startseite/archiv/124687-Warum-ein-starker-Partner-seine-Tarock-vorsichtig-einsetzen-muss.html"]);

    aBericht.push(["11.11.2005", "Tarockkurs", "Die Spielkarten und ihre Werte", "https://www.wienerzeitung.at/startseite/archiv/126556-Die-Spielkarten-und-ihre-Werte.html"]);

    aBericht.push(["11.11.2005", "Tarockkurs", "Spieltaktische Hinweise", "https://www.wienerzeitung.at/startseite/archiv/125590-Spieltaktische-Hinweise.html?em_no_split=1"]);

    aBericht.push(["28.6.2006", "Tarockkurs", "Der starke Partner spielt Farbe, um das Vogerl zu retten", "https://www.wienerzeitung.at/startseite/archiv/115186-Der-starke-Partner-spielt-Farbe-um-das-Vogerl-zu-retten..html"]);

    aBericht.push(["11.11.2005", "Tarockkurs", "Die weiteren Prämienansagen", "https://www.wienerzeitung.at/startseite/archiv/125709-Die-weiteren-Praemienansagen.html?em_no_split=1"]);

    aBericht.push(["25.12.2005", "Tarockkurs", "Checklist für das Bettler-Spiel", "https://www.wienerzeitung.at/startseite/archiv/124068-Checklist-fuer-das-Bettler-Spiel.html"]);

    aBericht.push(["11.11.2005", "Tarockkurs", "Lizitieren der Prämien", "https://www.wienerzeitung.at/startseite/archiv/126347-Lizitieren-der-Praemien.html?em_no_split=1"]);

    aBericht.push(["14.9.2005", "Tarockkurs", "Rumänisches / Ukrainisches Tarock", "https://www.wienerzeitung.at/startseite/archiv/130224-Rumaenisches-Ukrainisches-Tarock.html?em_no_split=1"]);

    aBericht.push(["29.1.2007", "Tarockkurs", "Was ein leidenschaftlicher Tarockierer wissen sollte", "https://www.wienerzeitung.at/multimedia/spiele/tarock/tarock-cup/110422-Was-ein-leidenschaftlicher-Tarockierer-wissen-sollte.html"]);

    aBericht.push(["28.6.2006", "Tarockkurs", "Wie man Tarock fehlerfrei mitzählt", "https://www.wienerzeitung.at/startseite/archiv/115219-Wie-man-Tarock-fehlerfrei-mitzaehlt..html"]);

    aBericht.push(["21.8.2007", "Tarockkurs", "Wozu die kleinen Tarock, die Mittelstecher und die Stecher gut sind", "https://www.wienerzeitung.at/startseite/archiv/97077-Wozu-die-kleinen-Tarock-die-Mittelstecher-und-die-Stecher-gut-sind.html?em_no_split=1"]);

    aBericht.push(["10.10.2019", "Tarockkurs", "Der Meister und seine Tarock-Akademie", "https://www.nachrichten.at/oberoester&shy;reich/der-meister-und-seine-tarock-akademie;art4,3174916"]);

    aBericht.push(["5.7.2016", "Diverses", "Schelling will nicht mehr tarockieren!", "https://www.wienerzeitung.at/meinung/glossen/829673-Schelling-will-nicht-mehr-tarockieren.html"]);

    aBericht.push(["6.11.2018", "Diverses", "Ein verschüttetes Kulturgut", "https://www.wienerzeitung.at/meinung/glossen/1000424-Ein-verschuettetes-Kulturgut.html"]);

    aBericht.push(["19.5.2016", "Diverses", "Tiroler Landesmuseum widmen sich der Kulturgeschichte des Spielens", "https://www.tt.com/artikel/11522412/tiroler-landesmuseen-widmen-sich-der-kulturgeschichte-des-spielens"]);

    aBericht.push(["15.4.2014", "Diverses", "Skatspiel für immaterielles Kulturerbe vorgeschlagen", "https://www.tt.com/artikel/8239074/skatspiel-fuer-immaterielles-kulturerbe-vorgeschlagen"]);

    aBericht.push(["12.1.2016", "Diverses", "Habsburger-Mythos im Talon", "https://www.tt.com/artikel/10932982/habsburger-mythos-im-talon"]);

    aBericht.push(["21.1.2018", "Diverses", "Niko hat viele Asse im Ärmel", "https://www.tt.com/artikel/13900938/niko-hat-viele-asse-im-aermel"]);

    aBericht.push(["3.10.2018", "Diverses", "Altes Spiel, neue Blüte: Tarock-Renaissance im Cafe", "https://www.diepresse.com/5505130/altes-spiel-neue-blute-tarock-renaissance-im-cafe?from=rss"]);

    aBericht.push(["26.3.2018", "Diverses", "Tarock ist Taktik und viel Gefühl", "https://www.nachrichten.at/oberoester&shy;reich/Guenther-Steidl-Tarock-ist-Taktik-und-viel-Gefuehl;art4,2851094"]);

    aBericht.push(["29.9.2016", "Diverses", "Besser wird, wer nicht immer gegen die gleichen Mitspieler antritt", "https://www.nachrichten.at/oberoester&shy;reich/steyr/Tarock-Besser-wird-wer-nicht-immer-gegen-die-gleichen-Mitspieler-antritt;art68,2359779"]);

    aBericht.push(["13.1.2017", "Diverses", "Beim Tarock gibts kein schlechtes Blatt", "https://www.nachrichten.at/oberoester&shy;reich/Beim-Tarock-gibt-s-kein-schlechtes-Blatt;art4,2454757"]);

    aBericht.push(["2.1.2016", "Diverses", "Tarock muss man mit Freude spielen", "https://www.nachrichten.at/oberoester&shy;reich/Josef-Muelleder-Tarock-muss-man-mit-Freude-spielen;art4,2073802"]);

    aBericht.push(["20.11.2015", "Diverses", "Tarock ist viel mehr als ein Karten&shy;spiel", "https://www.nachrichten.at/oberoester&shy;reich/Wolfgang-Mayr-Tarock-ist-viel-mehr-als-ein-Kartenspiel;art4,2036698"]);

    aBericht.push(["28.6.2013", "Diverses", "Wo Staudenhocker auf die Wildsau warten", "https://www.nachrichten.at/meine-welt/freizeit/Wo-Staudenhocker-auf-die-Wildsau-warten;art7,1147109"]);

    aBericht.push(["29.3.2010", "Diverses", "Tarock: Heimlicher Volkssport", "https://www.nachrichten.at/oberoester&shy;reich/muehlviertel/Tarock-Heimlicher-Volkssport;art69,360922"]);

    aBericht.push(["29.10.2010", "Diverses", "Freude über einen schönen Vogel", "https://www.nachrichten.at/meine-welt/freizeit/Freude-ueber-einen-schoenen-Vogel;art7,488490"]);

    aBericht.push(["28.11.2015", "Diverses", "Spatz, Mond, Gstiß: Ober&shy;rreich ist Tarock-Hochburg", "https://www.nachrichten.at/oberoester&shy;reich/Spatz-Mond-G-stiess-Oberoester&shy;reich-ist-Tarock-Hochburg;art4,2044067"]);

    aBericht.push(["29.3.2010", "Diverses", "Erfolgreicher Tarockclub: Mit den Leonfeldnern ist gut Karten&shy;spielen", "https://www.nachrichten.at/oberoester&shy;reich/muehlviertel/Erfolgreicher-Tarockclub-Mit-den-Leonfeldnern-ist-gut-Kartenspielen;art69,360997"]);

    aBericht.push(["15.9.2005", "Regeln", "Lungauer Tarock", "https://www.wienerzeitung.at/startseite/archiv/129955-Lungauer-Tarock.html"]);

    aBericht.push(["15.9.2005", "Regeln", "Melker Variante", "https://www.wienerzeitung.at/startseite/archiv/130649-Melker-Variante.html?em_no_split=1"]);

    aBericht.push(["15.9.2005", "Regeln", "Reform-Tarock", "https://www.wienerzeitung.at/startseite/archiv/130263-Reform-Tarock.html?em_no_split=1"]);

    aBericht.push(["25.9.2007", "Regeln", "Strohmandeln", "https://www.wienerzeitung.at/multimedia/spiele/tarock/tarock-cup/95356-Wie-sehen-die-idealen-Regeln-aus.html?em_no_split=1"]);

    aBericht.push(["11.11.2005", "Regeln", "Illustriertes Zwanzigerrufen", "https://www.wienerzeitung.at/startseite/archiv/126691-Die-schoenste-Variante-des-Tarockspiels.html"]);

    aBericht.push(["14.9.2005", "Regeln", "Slowenisches Tarock", "https://www.wienerzeitung.at/startseite/archiv/130834-Slowenisches-Tarock.html?em_no_split=1"]);

    aBericht.push(["1.1.2000", "Personen", "Lore Krainer - Eine Biographie", "https://austria-forum.org/af/Biographien/Krainer%2C_Lore"]);

    aBericht.push(["22.4.2016", "Personen", "Karl Renner - Einsatz von taktischen Mitteln", "https://www.diepresse.com/4973653/einsatz-von-taktischen-mitteln?from=rss"]);

    aBericht.push(["10.5.2017", "Personen", "Reinhold Mitterlehner - Die ewige Zukunftshoffnung", "https://www.diepresse.com/5215640/die-ewige-zukunftshoffnung?from=rss"]);

    aBericht.push(["16.8.2017", "Personen", "Felix Wallner - Ich liebe das Groteske", "https://www.nachrichten.at/oberoester&shy;reich/linz/Ich-liebe-das-Absurde-das-Groteske;art66,2651524"]);

    aBericht.push(["15.10.2009", "Karten", "Linz als gutes Blatt: Künstler bringt die Stadt auf den Tarock-Spieltisch", "https://www.nachrichten.at/oberoester&shy;reich/wels/Linz-als-gutes-Blatt-Kuenstler-bringt-die-Stadt-auf-den-Tarock-Spieltisch;art67,276205"]);

    aBericht.push(["30.3.2009", "Diverses", "Vom Tarockieren und der Ehre der Jägerschaft", "https://www.nachrichten.at/panorama/society/Fast-privat-Vom-Tarockieren-und-der-Ehre-der-Jaegerschaft;art411,136411"]);

    aBericht.push(["9.11.2010", "Diverses", "Sküs zum Achtziger", "https://www.nachrichten.at/archivierte-artikel/fast_privat/Skues-zum-Achtziger;art33018,501490"]);

    aBericht.push(["8.5.2018", "ÖF", "Anton Wimmer ist öster&shy;reichischer Tarock&shy;meister 2017/18", "https://www.nachrichten.at/oberoester&shy;reich/salzkammergut/Anton-Wimmer-ist-oester&shy;reichischer-Tarockmeister;art71,2889129"]);

    aBericht.push(["24.4.2013", "ÖF", "Florian Ebner ist öster&shy;reichischer Tarock&shy;meister 2012/13", "https://www.wienerzeitung.at/multimedia/spiele/tarock/tarock-cup/541535-Florian-Ebner-ist-Oester&shy;reichischer-Tarockmeister-2012-13.html"]);

    aBericht.push(["13.3.2008", "ÖF", "Manfred Huemer ist Tarock&shy;meister 2007/08", "https://www.wienerzeitung.at/startseite/archiv/87424-Manfred-Huemer-ist-Tarockmeister-2007-08.html"]);

    aBericht.push(["22.4.2012", "ÖF", "Josef Böckl wird öster&shy;reichischer Tarock&shy;meister 2011/12", "https://www.wienerzeitung.at/multimedia/spiele/tarock/tarock-cup/452516-Josef-Boeckl-wird-oester&shy;reichischer-Tarockmeister-2011-12.html"]);

    aBericht.push(["17.4.2016", "ÖF", "Josef Mülleder feiert einen Favoritensieg und ist öster&shy;reichischer Tarock&shy;meister 2015/16", "https://www.wienerzeitung.at/multimedia/spiele/tarock/tarock-cup/813250-Josef-Muelleder-feiert-einen-Favoritensieg-und-ist-Oester&shy;reichischer-Tarockmeister.html"]);

    aBericht.push(["25.4.2010", "ÖF", "Herann Manzenreiter ist öster&shy;reichischer Tarock&shy;meister 2009/10", "https://www.wienerzeitung.at/startseite/archiv/58872-Hermann-Manzenreiter-ist-oester&shy;reichischer-Tarockmeister-2009-10.html?em_no_split=1"]);

    aBericht.push(["13.4.2014", "ÖF", "Rudolf Stürmer ist öster&shy;reichischer Tarock&shy;meister 2013/14", "https://www.wienerzeitung.at/multimedia/spiele/tarock/tarock-cup/622344-Rudolf-Stuermer-ist-oester&shy;reichischer-Tarockmeister-2013-14.html"]);

    aBericht.push(["18.6.2017", "ÖF", "Josef Böckl gewinnt Jubiläumsturnier Zehn Jahre öster&shy;reich-Finale", "https://www.wienerzeitung.at/multimedia/spiele/tarock/tarock-cup/899007-Josef-Boeckl-gewinnt-Jubilaeumsturnier-Zehn-Jahre-Oester&shy;reich-Finale.html"]);

    aBericht.push(["23.4.2017", "ÖF", "Christian Rieseneder ist öster&shy;reichischer Tarock&shy;meister 2016/16", "https://www.wienerzeitung.at/multimedia/spiele/tarock/tarock-cup/887532-Christian-Rieseneder-ist-oester&shy;reichischer-Tarockmeister-2016-17.html"]);

    aBericht.push(["12.4.2015", "ÖF", "Hubert Zauner ist öster&shy;reichischer Tarock&shy;meister 2014/15", "https://www.wienerzeitung.at/multimedia/spiele/tarock/tarock-cup/746019-Hubert-Zauner-ist-oester&shy;reichischer-Tarockmeister-2014-15.html"]);

    aBericht.push(["7.10.2010", "SWC", "Nur Bares ist Wahres: 3000 Euro für die Tarock-Sieger", "https://www.nachrichten.at/oberoester&shy;reich/innviertel/schaerding/Nur-Bares-ist-Wahres-3000-Euro-fuer-die-Tarock-Sieger;art14856,478503"]);

    aBericht.push(["18.9.2015", "SWC", "BBTC: Die Innviertler räumten ab", "https://www.nachrichten.at/oberoester&shy;reich/innviertel/Tarock-Cup-Die-Innviertler-raeumten-ab;art70,1972905"]);

    aBericht.push(["24.9.2013", "HRC", "Sieg beim Tarockmarathon 2013 blieb in Ober&shy;rreich", "https://www.nachrichten.at/oberoester&shy;reich/salzkammergut/Sieg-beim-Tarockmarathon-blieb-in-Oberoester&shy;reich;art71,1201694"]);

    aBericht.push(["18.3.2014", "HRC", "Franz Kienast siegte beim Tarockfinale 2013/14", "https://www.nachrichten.at/oberoester&shy;reich/salzkammergut/Kienast-siegte-beim-Tarockfinale;art71,1333311"]);

    aBericht.push(["21.3.2013", "HRC", "Johann Zandt ist Tarock&shy;meister 2012/13", "https://www.nachrichten.at/oberoester&shy;reich/salzkammergut/Padinger-als-bester-Spieler-aus-dem-Bezirk-ist-Vierter;art71,1086934"]);

    aBericht.push(["20.3.2012", "HRC", "Balthasar Rohrmoser gewinnt den Hausruckcup 2011/12", "https://www.nachrichten.at/oberoester&shy;reich/salzkammergut/180-Tarockierer-spielten-um-den-15-Hausruckcup;art71,842586"]);

    aBericht.push(["16.3.2011", "HRC", "Rudolf Stürmer gewinnt den Hausruckcup 2010/11", "https://www.nachrichten.at/oberoester&shy;reich/salzkammergut/Rang-drei-fuer-besten-Bezirks-Tarockierer;art71,574761"]);

    aBericht.push(["17.3.2010", "HRC", "Hermann Manzenreiter gewinnt den Hausruckcup 2009/10", "https://www.nachrichten.at/oberoester&shy;reich/salzkammergut/204-Tarockierer-beim-Hausruckcup-Finale;art71,352408"]);

    aBericht.push(["17.3.2009", "HRC", "Peter Steiner gewinnt den Hausruckcup 2008/09", "https://www.nachrichten.at/oberoester&shy;reich/salzkammergut/Ein-lachender-Dritter-holte-sich-den-Sieg-im-Tarockcup;art71,125795"]);

    aBericht.push(["21.9.2017", "HRC", "Balthasar Rohrmoser gewinnt den Frankenmarkter Marathon 2017", "https://www.nachrichten.at/oberoester&shy;reich/salzkammergut/Begeisterung-fuer-Tarock;art71,2684503"]);

    aBericht.push(["26.9.2016", "HRC", "Franz Padinger gewinnt den Frankenmarkter Marathon 2016", "https://www.nachrichten.at/oberoester&shy;reich/salzkammergut/Lokalmatador-Padinger-gewinnt-in-Frankenmarkt;art71,2355030"]);

    aBericht.push(["24.3.2014", "RTC", "Rudolf Stürmer: Yak-Züchter ist Tarock-Meister 2013/14", "https://www.nachrichten.at/oberoester&shy;reich/Rudolf-Stuermer-Yak-Zuechter-ist-neuer-Tarock-Meister;art4,1339187"]);

    aBericht.push(["22.3.2016", "RTC", "Josef Mülleder ließ sich den Tarockcup-Sieg 2015/16 nich nehmen", "https://www.nachrichten.at/oberoester&shy;reich/muehlviertel/Muelleder-liess-sich-den-Tarockcup-Sieg-nicht-nehmen;art69,2182391"]);

    aBericht.push(["16.1.2013", "RTC", "Frauen drückten Tarock-Cup ihren Stempel auf", "https://www.nachrichten.at/oberoester&shy;reich/muehlviertel/Frauen-drueckten-Tarock-Cup-ihren-Stempel-auf;art69,1044361"]);

    aBericht.push(["25.3.2013", "RTC", "Tarockcup 2012/13: Titel geht an Dallinger", "https://www.nachrichten.at/oberoester&shy;reich/linz/Tarockcup-Titel-geht-an-Dallinger;art66,1089429"]);

    aBericht.push(["31.3.2011", "RTC", "Markus Leimhofer gewinnt den Raiffeisen Tarockcup 2010/11", "https://www.nachrichten.at/oberoester&shy;reich/linz/Markus-Leimhofer-gewinnt-Tarockcup;art66,586159"]);

    aBericht.push(["26.3.2018", "RTC", "Günther Steidl gewinnt den Raiffeisen Tarockcup 2017/18", "https://www.nachrichten.at/oberoester&shy;reich/Die-Muehlviertler-sind-die-besten-Tarockierer;art4,2850995"]);



    aBericht.push(["", "", "", ""]);


    $('#nbUebersicht').removeClass('ui-btn-active');

    if (QUERFORMAT()) {
        if (lastBtn) {
            $(lastBtn).removeClass('ui-btn-active');
        }
        lastBtn = '#bPresseschau';
        $(lastBtn).addClass('ui-btn-active');
    }

    showIcons([]);

//    if (CUPS.MELDAKT[0]) {
//        if (LS.GelesenAKT[0] !== CUPS.MELDAKT[0]) {
//            LS.GelesenAKT[0] = CUPS.MELDAKT[0];
//            localStorage.setItem('Abakus.LS', JSON.stringify(LS));
//        }
//    } else {
//        if (LS.GelesenAKT[0]) {
//            LS.GelesenAKT[0] = null;
//            localStorage.setItem('Abakus.LS', JSON.stringify(LS));
//        }
//    }

    stStat = 'Presseschau';

    if (window.location.search === '?Presseschau') {
        writeCanvas('Was schreibt die Presse?');
    } else {
        writeCanvas(stStat);
    }
    showLogo();

    if (jbSpieler.isOpen) {
        jbSpieler.close();
    }

    $('#sideTurniere').html(
            '<div data-role="navbar">'
            + '<ul>'
            + (hCup === 50 ? '<li class="nb56"><a id="nbHRC" class="prFilter M2 ui-btn-active" onClick="setPresseFilter(\'HRC\')">Hausruckcup</a></li>' : '')
            + (hCup === 51 ? '<li class="nb56"><a id="nbKTC" class="prFilter M2 ui-btn-active" onclick="setPresseFilter(\'KTC\')">Kärntencup</a></li>' : '')
            + (hCup === 52 ? '<li class="nb56"><a id="nbRTC" class="prFilter M2 ui-btn-active" onclick="setPresseFilter(\'RTC\')">Raiffeisencup</a></li>' : '')
            + (hCup === 53 ? '<li class="nb56"><a id="nbSWC" class="prFilter M2 ui-btn-active" onClick="setPresseFilter(\'SWC\')">Sauwaldcup</a></li>' : '')
            + (hCup === 54 ? '<li class="nb56"><a id="nbSTC" class="prFilter M2 ui-btn-active" onclick="setPresseFilter(\'STC\')">St. Tarockcup</a></li>' : '')
            + (hCup === 55 ? '<li class="nb56"><a id="nbTTC" class="prFilter M2 ui-btn-active" onclick="setPresseFilter(\'TTC\')">Tirolcup</a></li>' : '')
            + (hCup === 56 ? '<li class="nb56"><a id="nbWTC" class="prFilter M2 ui-btn-active" onclick="setPresseFilter(\'WTC\')">Wr. Tarockcup</a></li>' : '')
            + '<li class="nb44"><a id="nbÖF" class="prFilter M2" onclick="setPresseFilter(\'ÖF\')">Ö-Finale</a></li>'
            + '</ul>'
            + '</div>'

            + '<div data-role="navbar">'
            + '<ul>'
            + (hCup !== 50 ? '<li class="nb6"><a id="nbHRC" class="prFilter M2" onClick="setPresseFilter(\'HRC\')">HRC</a></li>' : '')
            + (hCup !== 51 ? '<li class="nb6"><a id="nbKTC" class="prFilter M2" onclick="setPresseFilter(\'KTC\')">KTC</a></li>' : '')
            + (hCup !== 52 ? '<li class="nb6"><a id="nbRTC" class="prFilter M2" onclick="setPresseFilter(\'RTC\')">RTC</a></li>' : '')
            + (hCup !== 53 ? '<li class="nb6"><a id="nbSWC" class="prFilter M2" onClick="setPresseFilter(\'SWC\')">SWC</a></li>' : '')
            + (hCup !== 54 ? '<li class="nb6"><a id="nbSTC" class="prFilter M2" onclick="setPresseFilter(\'STC\')">STC</a></li>' : '')
            + (hCup !== 55 ? '<li class="nb6"><a id="nbTTC" class="prFilter M2" onclick="setPresseFilter(\'TTC\')">TTC</a></li>' : '')
            + (hCup !== 56 ? '<li class="nb6"><a id="nbWTC" class="prFilter M2" onclick="setPresseFilter(\'WTC\')">WTC</a></li>' : '')
            + '</ul>'
            + '</div>'

            + '<div data-role="navbar">'
            + '<ul>'
            + '<li class="nb28"><a id="nbRegeln" class="prFilter M2" onClick="setPresseFilter(\'Regeln\')">Regeln</a></li>'
            + '<li class="nb44"><a id="nbTarockkurs" class="prFilter M2" onclick="setPresseFilter(\'Tarockkurs\')">Tarockkurs</i></a></li>'
            + '<li class="nb28"><a id="nbKarten" class="prFilter M2" onclick="setPresseFilter(\'Karten\')">Karten</i></a></li>'
            + '</ul>'
            + '</div>'


            + '<div data-role="navbar">'
            + '<ul>'
            + '<li class="nb56"><a id="nbPersonen" class="prFilter M2" onClick="setPresseFilter(\'Personen\')">Persönlichkeiten</a></li>'
            + '<li class="nb44"><a id="nbDiverses" class="prFilter M2" onclick="setPresseFilter(\'Diverses\')">Diverses</i></a></li>'
            + '</ul>'
            + '</div>'

            + '<li data-role="list-divider">&nbsp;&nbsp;&nbsp;' + (window.location.search === '?Presseschau' ? 'Kategorie:' : 'Presseschau:') + '&nbsp;&nbsp;<span id=tFilter class=N>'
            + (hCup === 50 ? 'Hausruckcup' : '')
            + (hCup === 51 ? 'Kärntencup' : '')
            + (hCup === 52 ? 'Raiffeisencup' : '')
            + (hCup === 53 ? 'Sauwaldcup' : '')
            + (hCup === 54 ? 'St. Tarockcup' : '')
            + (hCup === 55 ? 'Tirolcup' : '')
            + (hCup === 56 ? 'Wr. Tarockcup' : '')
            + '</span></li>'
            ).listview('refresh').trigger('create').show();

// Wr. Tarockcup Ö-Finale
// Alle Cups Personen
// Regeln Tarockkurs Karten
// Alles Zurücksetzen

    html = '';

    for (var i = 0; i < aBericht.length; i++) {
        if (aBericht[i][0]) {
            html += '<div id="bArtikel' + i + '"' + (hFilter === aBericht[i][1] ? ' ' : ' hidden ') + 'class="S3 J presse-btn ' + aBericht[i][1] + '" onclick="showArtikel(\'' + aBericht[i][3] + '\', ' + i + ',\'' + aBericht[i][2] + '\')" style="max-width:30vw;text-align:justify;overflow-wrap: break-word;word-wrap: break-word;">'
                    + '<b>' + aBericht[i][2] + '</b>'
                    + '<div class="S">' +aBericht[i][0] + '&nbsp;&nbsp;&nbsp;' + aBericht[i][1] + '</div></div>';
        }
    }

    $('#dContent').html(html + '<br>').listview('refresh');

    window.scrollTo(0, 0);
    if (QUERFORMAT()) {
        showLogo();
    }
    $("#sideContent").show().scrollTop(0);
    setTimeout(function () {
        var hx = parseInt($(window).innerHeight() - $('#dContent').offset().top - 1);
        $('#sideContent').css('height', hx + 'px');
    }, 100);
}

function showArtikel(pUrl, pI, pText) {
    $("#dCopyright").hide();
    $('.presse-btn').removeClass('ui-btn-active');
    $('#bArtikel' + pI).addClass('ui-btn-active');
    $('#dRumpf').html('<iframe id="iFrame" src="' + pUrl + '" style="border:none; height: 2200vh; width: 72vw;"></iframe>');
    writeCanvas(pText);
    window.scrollTo(0, 0);
}

function setPresseFilter(pFilter) {
    if (pFilter === 'ÖF')
        $('#tFilter').text('Ö-Finale');
    else if (pFilter === 'Personen')
        $('#tFilter').text('Persönlichkeiten');
    else if (pFilter === 'HRC')
        $('#tFilter').text('Hausruckcup');
    else if (pFilter === 'KTC')
        $('#tFilter').text('Kärntencup');
    else if (pFilter === 'RTC')
        $('#tFilter').text('Raiffeisencup');
    else if (pFilter === 'SWC')
        $('#tFilter').text('Sauwaldcup');
    else if (pFilter === 'STC')
        $('#tFilter').text('St. Tarockcup');
    else if (pFilter === 'TTC')
        $('#tFilter').text('Tirolcup');
    else if (pFilter === 'WTC')
        $('#tFilter').text('Wr. Tarockcup');
    else
        $('#tFilter').text(pFilter);

    $('.prFilter').removeClass('ui-btn-active');
    $('#nb' + pFilter).addClass('ui-btn-active');
    $('.presse-btn').hide();
    $('.' + pFilter).show();
    $("#sideContent").scrollTop(0);
}