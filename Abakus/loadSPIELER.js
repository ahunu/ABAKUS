///* global firebase */

//  LOG  Funktionen  **************************************************************************
function loadSPIELER() {

    showEinenMoment('ABAKUS', 'Spieler&nbsp;werden&nbsp;geladen.');

    if (typeof FB !== 'object') {
        firebase.initDB(0);
    }

    firebase.database().ref('/00/SPIELERext').once('value')
            .then(function (snapshot) {
                SPIELERext = snapshot.val();
                hideEinenMoment();
                whenSPIELERloaded();
            }, function (error) {
                showEineDBWarnung(error, 'loadSPIELER()', 'Load Spieler');
                return false;
            });
}