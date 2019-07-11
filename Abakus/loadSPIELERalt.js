///* global firebase */

//  LOG  Funktionen  **************************************************************************
function xxxloadSPIELER() {

    showEinenMoment('ABAKUS', 'Spieler&nbsp;werden&nbsp;geladen.');

    if (typeof FB !== 'object') {
        firebase.initDB(0);
    }

    firebase.database().ref('/00/Spieler/SPIELERext').once('value')
            .then(function (snapshot) {
                SPIELERext = snapshot.val();
                hideEinenMoment();
                whenSPIELERloaded();
            }, function (error) {
                showEineDBWarnung(error, 'loadSPIELER()', 'Load Spieler');
                return false;
            });
}