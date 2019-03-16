
/* global T, iTischR1, iTischR2, iTischR3, iMannschaft, STAT */
function SAISON(pTurniere, pTeilnehmer, pTeilnahmen) {
    this._Turniere = pTurniere;
    this._Teilnehmer = pTeilnehmer;
    this._Teilnahmen = pTeilnahmen;
}

function initSAISON() {
    var iSaison = -1;
    var hSaison = '';
    var nTurniere = 0;
    for (var turnier in STAT) {
        if (turnier[0] === '2') {
            if (STAT[turnier]._SAISON !== hSaison) {
                if (hSaison) {
                    console.log(iSaison + ': ' + hSaison + ', ' + nTurniere);
//                    bereSaison(nTurniere);
//                    addPosition();
                    iSaison++;
                }
                nTurniere = 0;
                hSaison = STAT[turnier]._SAISON;
            }
            nTurniere++;
        }
    }
    if (hSaison) {
        console.log(iSaison + ': ' + hSaison + ', ' + nTurniere);
//        bereSaison(nTurniere);
//        addPosition();
    }
}