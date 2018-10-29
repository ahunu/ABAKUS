
function fIchStimmeZu() {
    $('.onExit').addClass('ui-disabled');
    history.back();
}

function fIchStimmeNichtZu() {
    $('.onExit').addClass('ui-disabled');
    localStorage.clear();
    setTimeout(function () {
        if (window.location.href.toUpperCase().indexOf('FIREBASEAPP.COM') >= 0
                || window.location.href.toUpperCase().indexOf('FILE:///C:') >= 0) {
//            window.close();
            history.go(-2);
        } else {
            navigator.app.exitApp(); // close phonegap
        }
    }, 100);
}

function writeLOG(pLog, pError) {
    'use strict';
    var LOG = JSON.parse(localStorage.getItem('Abakus.LOG'));
    if (!LOG) {
        LOG = '';
    }
    if (pError) {
        console.error(pLog);
        $('#tLOG').append('<span><b>' + pLog + '</br></span><br>');
    } else {
        console.log(pLog);
        $('#tLOG').append('<span>' + pLog + '</span><br>');
    }
    if (pError) {
        LOG += new Date().toLocaleString() + ', ERROR:<br>';
    } else {
        LOG += new Date().toLocaleString() + ':<br>';
    }
    LOG += pLog + '<br>';
    localStorage.setItem('Abakus.LOG', JSON.stringify(LOG));
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