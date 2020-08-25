
function fIchStimmeZu() {
    writeLOG('Ich habe der Datenschutzerklärung zugestimmt.');
    history.back();
}

function fIchStimmeNichtZu() {
    localStorage.clear();
    if (navigator.userAgent.match(/Android/i)) {       // Android
        history.back();
    } else if (navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)) {   // iOS
        history.go(-2);
    } else {                                           // PC
        if (window.matchMedia('(display-mode: standalone)').matches) {
            history.back();                            // PC APP
        } else {
            history.go(-2);
        }
    }
}

$(document).bind('pageinit', function () {

    document.oncontextmenu = function () {
        return false; // oncontextmenu
    };
    document.onselectstart = function () {
        return false;
    };

    if (navigator.userAgent.toUpperCase().indexOf("ANDROID") >= 0) {
        var LS = JSON.parse(localStorage.getItem('Abakus.LS'));
        if (LS.ME === 'NOBODY') {
            $('#tLoeschen').html('Alle lokalen Daten löschen.');
        } else {
            $('#tLoeschen').html('Die Registrierung und<br>alle lokalen Daten löschen.');
        }
    }

});