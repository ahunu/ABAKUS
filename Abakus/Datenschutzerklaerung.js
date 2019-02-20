
function fIchStimmeZu() {
    writeLOG('Ich habe der Datenschutzerklärung zugestimmt.');
    history.back();
}

function fIchStimmeNichtZu() {
    localStorage.clear();
    if (navigator.userAgent.match(/Android/i)) {
        history.back();
    } else {
        history.go(-2);
    }
}

$(document).bind('pageinit', function () {

    document.oncontextmenu = function () {
        return false; // oncontextmenu
    };
    document.onselectstart = function () {
        return false;
    };

});