
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

    window.onerror = function (msg, url, line, col, error) {
        console.log('msg: ' + msg + ', url: ' + url + ', line: ' + line);
        if (url !== '' || line !== 0) {
            alert(msg + ' url=' + url + ' line=' + line + ', col=' + col + ', error=' + error + '.');
        }
        return false;
    };

});