//  LOG  Funktionen  **************************************************************************
function loadSPIELER() {
    showEinenMoment('ABAKUS','Spieler&nbsp;werden&nbsp;geladen.');
    firebase.database().ref('/00/Spieler/SPIELERext').once('value')
    .then(function(snapshot) {
        SPIELERext = snapshot.val();
        hideEinenMoment();
        whenSPIELERloaded();
    }, function (error) {
        showEineDBWarnung(error,'loadSPIELER()','Load Spieler');
        return false;
    });
};