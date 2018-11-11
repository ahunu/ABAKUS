
function fIchStimmeZu() {
    $('.onExit').addClass('ui-disabled');
    writeLOG('Ich habe der Datenschutzerklärung zugestimmt.');
    history.back();
}

function fIchStimmeNichtZu() {
    $('.onExit').addClass('ui-disabled');
    localStorage.clear();
    setTimeout(function () {
        if (navigator.app) {
            navigator.app.exitApp();
        } else if (navigator.device) {
            navigator.device.exitApp();
        } else {
            history.go(-2);
        }
    }, 100);
}

$(document).bind('pageinit', function () {

    document.oncontextmenu = function () {
        return false; // oncontextmenu
    };
    document.onselectstart = function () {
        return false;
    };

});