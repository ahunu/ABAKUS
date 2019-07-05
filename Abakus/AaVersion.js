
function getVersion() {
    return 965;   // eine neue Versionsnummer erzwingt loadCUPS() und löscht STAT*
}

function getVersionsDatum() {
    return setVersion(2019, 7, 5);   // 01 - 09 !!! Oktale Darstellung ist nicht erlaubt !!!
    function setVersion(pJahr, pMonat, pTag) {
        return new Date(pJahr, (pMonat - 1), pTag);
    }
}

// Mit wem würdest du am liebsten einmal zu abend essen?

// Wise würdest du einen perfekten Tag beschreiben?

// responsiveVoice - Die Versionen bis inclusive 1.5.12 funktionieren nach der Änderung eines Spiels auf Android nicht !!!
// Nur mit 1.4.9 wird die Meldung "wants to use speech DENY ALLOW" nach der Änderung eines Spiels nicht gezeigt.

// Panorama / Sachbücher. Romane.
// Theoretisch-praktische Anweisung zur gründlichen Erlernung des beliebten Tarok-Tappen-Spiels	älteste Königrufenregeln, 2. Auflage mit Anhang übers Königrufen, Wien 1827, s. www.noel.gv.at (NÖ Landesbibliothek)
//
// Panorama / Bilder. Skulpturen.
// KaKartenspiel	Franz von Defregger, 1910, s. https://reproarte.com/en/choice-of-topics/category/play-and-sport/27302-card-game-detail
//
// Panorama / Presse. Medien.
// www.rts-salzburg.at zeigt eine normale Seite, keine Tarockinformationen
//
//
// Panorama / Presse. Medien.
// Der link auf die Wiener Zeitung funktioniert nicht, den Artikel gibt es nicht mehr.
//
// Panorama / Sammlungen, Museen, Aussstellungen
// http://www.gamesmuseum.uwaterloo.ca

// LET kann vom Galaxy Nexus nicht interpretiert werden.

// responsiveVoice - Die Version 1.5.8 funktioniert als Android-Apps nicht !!!
// responsiveVoice - Die Version 1.5.7 funktioniert nach der Änderung eines Spiels nicht !!!
// Nur mit 1.4.9 wird die Meldung "wants to use speech DENY ALLOW" nach der Änderung eines Spiels nicht gezeigt.

// Unicodezeichen:
//    Geber: 1BE0, 1C30, 1A00
//    I - IV 2160-2163

//    (1)  2460, 2776, 2780, 24F5,
//    A 24B6, 1F110, 1F130, 1F150, 1F170, 1F1E6

// Popup-Close
// Für Android muß vor dem Verlassen einer App die Pupups geschlossen werden!!!

// Galaxy Nexus meldet bei "'string'.repeat(n)" Object has no method 'repeat'.
// Auf Galaxy Nexus und Galaxy S5 mini ist folgendes zu beachten:
// 0n wird als Oktalzahl interpretiert.
// 00n wird als Hexadezimalzahl interpretiert.
// Number.isInteger(123) ist nicht verfügbar.
// Auf dem Galaxy Nexus vertragen sich 'use strict' und Inlinefunktionen nicht miteinander.
// Auf dem Galaxy Nexus vertragen sich 'use strict' und CONST Variablendeffinitionen nicht miteinander.
// Auf dem Galaxy Nexus wird myArray.includes(...) nicht unterstützt.
