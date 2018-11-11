
/* global LS, myJTip, myJBox, CUPS */

var myJBox = null;
var myJTip = null;

function showEineNotiz(pText, pColor) {
    if (!pColor) {
        pColor = 'yellow';
    }
    new jBox('Notice', {
        attributes: {
            x: 'right',
            y: 'bottom'
        },
        color: pColor,
        content: '<span class="M N">' + pText + '</span>',
        autoClose: 6000
    });
}

function showEinenTip(pTarget, pText) {
    $(pTarget).focus();
    myJTip.setContent('<span class="M N">' + pText + '</span>');
    myJTip.open({
        target: pTarget
    });
}

function showEinenMoment(pCup, pText, pForce, pSkip) {
    var hTitel = '';
    if (myJBox) {
        if (myJBox.isOpen) {
            myJBox.close();
        }
    }
    if (isNaN(pCup)) {
        hTitel = pCup;
    } else if (pCup !== 0) {
        if (pCup === 54) {
            hTitel = "St. Tarockcup:";
        } else if (pCup === 56) {
            hTitel = "Wr. Tarockcup:";
        } else if (pCup === 58) {
            hTitel = "Stadltarock:";
        } else {
            hTitel = CUPS.NAME[pCup] + ':';
        }
    } else {
        hTitel = 'Abakus:';
    }
    if (hTitel && hTitel.length > 20 && $(window).innerWidth() <= $(window).innerHeight()) {
        if (hTitel.indexOf('Mannschaftsturnier') > 0) {
            hTitel = hTitel.replace('Mannschaftsturnier', 'MT.');
        }
    }
    myJBox = new jBox('Modal', {
        title: '<div class="L2" style="background-color:#27a;color: white;">'
                + '&nbsp;&nbsp;<i class="iSpinner zmdi-refresh-sync iL"></i>&nbsp;&nbsp;'
                + hTitel
                + '&nbsp;&nbsp;</div>',
        content: '<span id=emText class="L">' + pText + '</span><br>'
                + '<span id=emText2 class="L">Einen&nbsp;Moment&nbsp;bitte.</span>'
                + (pSkip ? '<div hidden class="C bUeberspringen"><button class="L2 ui-corner-all" onClick="skipEinenMoment(' + pSkip + ');">Aktualisierung &uuml;berspringen</button><div>' : ''),
        position: {x: 'center', y: 111},
        closeOnClick: false,
        closeButton: false,
        closeOnEsc: false
    }).open();
    var hID = myJBox.id;
    setTimeout(function () {
        if (pForce) {
            whenCUPSloaded();
            $('#dUnAktuell').show();
        } else {
            $('.bUeberspringen').show();
            showEinenMoment2(hID, pSkip);
        }
    }, (pSkip ? 6000 : 10000));
}

function skipEinenMoment(pSkip) {
    STAT = JSON.parse(localStorage.getItem("Abakus.STAT" + ("000" + pSkip).substr(-3)));
    hideEinenMoment();
    whenSTATloaded();
}

function showEinenMoment2(pID, pSkip) {
    if (myJBox) {
        if (myJBox.isOpen && myJBox.id === pID) {
            if (navigator.onLine || pSkip) {
                $('#emText2').append('<br><span class="L" >Langsame Verbindung...</span>');
                setTimeout(function () {
                    showEinenMoment3(pID, pSkip);
                }, 20000);
            } else {
                showEinenFehler('Verbindungsfehler!', 'Verbindung herstellen', 'und Vorgang wiederholen.');
            }
        }
    }
}

function showEinenMoment3(pID, pSkip) {
    if (myJBox) {
        if (myJBox.isOpen && myJBox.id === pID) {
            if (navigator.onLine || pSkip) {
                $('#emText2').append('<br><span id=emText2 class="L" style="color: DarkGoldenRod;">Sehr langsame Verbindung!</span>');
                setTimeout(function () {
                    showEinenMoment4(pID, pSkip);
                }, 30000); // 1 min = 60000
            } else {
                showEinenFehler('Verbindungsfehler!', 'Verbindung herstellen', 'und Vorgang wiederholen.');
            }
        }
    }
}

function showEinenMoment4(pID, pSkip) {
    if (myJBox) {
        if (myJBox.isOpen && myJBox.id === pID) {
            if (navigator.onLine || pSkip) {
                $('#emText2').append('<br><span id=emText2 class="L" style="color: OrangeRed;">Noch zwei Minuten!</span>');
                setTimeout(function () {
                    showEinenMoment5(pID, pSkip);
                }, 30000); // 1 min = 60000
            } else {
                showEinenFehler('Verbindungsfehler!', 'Verbindung herstellen', 'und Vorgang wiederholen.');
            }
        }
    }
}

function showEinenMoment5(pID, pSkip) {
    if (myJBox) {
        if (myJBox.isOpen && myJBox.id === pID) {
            if (navigator.onLine || pSkip) {
                $('#emText2').append('<br><span id=emText2 class="L" style="color: FireBrick;">Noch eine Minute!</span>');
                setTimeout(function () {
                    showEinenMoment6(pID, pSkip);
                }, 60000);
            } else {
                showEinenFehler('Verbindungsfehler!', 'Verbindung herstellen', 'und Vorgang wiederholen.');
            }
        }
    }
}

function showEinenMoment6(pID) {
    if (myJBox) {
        if (myJBox.isOpen && myJBox.id === pID) {
            showEinenFehler('Verbindungsfehler!', 'Verbindung herstellen', 'und Vorgang wiederholen.');
        }
    }
}

function hideEinenMoment() {
    if (myJBox) {
        if (myJBox.isOpen) {
            myJBox.close();
        }
        // myJBox.destroy();             // wegen promise nicht möglich
        // $('#jBox-overlay').remove();  // wegen promise nicht möglich
    }
}

function showEineMeldung(pCup, pText, pText2) {
    var hTitel = '';
    if (myJBox) {
        if (myJBox.isOpen) {
            myJBox.close();
        }
    }
    if (isNaN(pCup)) {
        hTitel = pCup;
    } else if (pCup !== 0) {
        if (pCup === 54) {
            hTitel = "St. Tarockcup:";
        } else if (pCup === 56) {
            hTitel = "Wr. Tarockcup:";
        } else if (pCup === 58) {
            hTitel = "Stadltarock:";
        } else {
            hTitel = CUPS.NAME[pCup] + ':';
        }
    } else {
        hTitel = 'Abakus:';
    }
    myJBox = new jBox('Modal', {
        title: '<div class="L2" style="background-color: #27a; color: white; text-align: center;">&nbsp;'
                + hTitel
                + '&nbsp;</div>',
        content: '<span class="L">' + pText + (pText2 ? '<br>' + pText2 : '') + '</span>',
        position: {x: 'center', y: 111},
        overlay: true,
        closeOnClick: 'box',
        closeOnEsc: true,
        closeButton: 'box'
    }).open();
}

function showEineWarnung(pCup, pText, pText2) {
    var hTitel = '';
    if (myJBox) {
        if (myJBox.isOpen) {
            myJBox.close();
        }
    }
    var hSpace = '';
    var hTitel = '';
    if (isNaN(pCup)) {
        hTitel = pCup;
    } else if (pCup !== 0) {
        if (pCup === 54) {
            hTitel = "St. Tarockcup:";
        } else if (pCup === 56) {
            hTitel = "Wr. Tarockcup:";
        } else if (pCup === 58) {
            hTitel = "Stadltarock:";
        } else {
            hTitel = CUPS.NAME[pCup] + ':';
        }
    } else {
        hTitel = 'Abakus:';
    }
    if (hTitel.length < 30) {
        hSpace = '&nbsp;&nbsp;';
    } else {
        hSpace = '&nbsp;';
    }
    myJBox = new jBox('Modal', {
        title: '<div class="L2" style="background-color:darkOrange; color: white;">'
                + hSpace + '<i class="i zmdi-alert-circle-o iL"></i>&nbsp;'
                + hSpace + hTitel + hSpace
                + '</div>',
        content: '<span class="L" >' + pText + (pText2 ? '<br>' + pText2 : '') + '</span>',
        position: {x: 'center', y: 111},
        overlay: true,
        closeOnClick: 'box',
        closeOnEsc: true,
        closeButton: 'box'
    }).open();
}

function showEinenFehler(pCup, pText, pText2) {
    var hTitel = '';
    if (myJBox) {
        if (myJBox.isOpen) {
            myJBox.close();
        }
    }
    var hSpace = '';
    var hTitel = '';
    if (isNaN(pCup)) {
        hTitel = pCup;
    } else if (pCup !== 0) {
        if (pCup === 54) {
            hTitel = "St. Tarockcup:";
        } else if (pCup === 56) {
            hTitel = "Wr. Tarockcup:";
        } else if (pCup === 58) {
            hTitel = "Stadltarock:";
        } else {
            hTitel = CUPS.NAME[pCup] + ':';
        }
    } else {
        hTitel = 'Abakus:';
    }
    if (hTitel.length < 30) {
        hSpace = '&nbsp;&nbsp;';
    } else {
        hSpace = '&nbsp;';
    }
    myJBox = new jBox('Modal', {
        title: '<div class="L" style="background-color:FireBrick; color: white;">'
                + hSpace + '<i class="i zmdi-minus-circle-outline iL"></i>&nbsp;'
                + hSpace + hTitel + hSpace
                + '</div>',
        content: '<span class="L">' + pText + (pText2 ? '<br>' + pText2 : '') + '</span>',
        position: {x: 'center', y: 111},
        overlay: true,
        closeOnClick: true,
        closeButton: 'box',
        closeOnEsc: true
    }).open();
    writeLOG(hTitel + '<br>' + pText + (pText2 ? '<br>' + pText2 : ''), false);
}

function showEinenDBFehler(pError, pText, pText2) {
    showEineDBWarnung(pError, pText, pText2);
}

function showEineDBWarnung(pError, pText, pText2) {
    if (myJBox) {
        if (myJBox.isOpen) {
            myJBox.close();
        }
    }
    var hMeld = 'F' + pError + ': ' + getDBFehlertext(pError) + ', ' + pText;
    console.log('Datenbankfehler ' + hMeld);
    if (LS.ME === '3425') {
        myJBox = new jBox('Modal', {
            title: '<div class="L2" style="background-color:FireBrick; color: white; text-align: center;">&nbsp;F' + pError + ':&nbsp;Verbindungsfehler:&nbsp;</div>',
            content: '<span class="L">' + hMeld + (pText2 ? '<br>' + pText2 : '') + '</span>',
            position: {x: 'center', y: 111}
        }).open();
    } else {
        myJBox = new jBox('Modal', {
            title: '<div class="L2" style="background-color:FireBrick; color: white; text-align: center;">&nbsp;F' + pError + ':&nbsp;Verbindungsfehler:&nbsp;</div>',
            content: '<span class="L2">Verbindung herstellen<br>und Vorgang wiederholen.</span>',
            position: {x: 'center', y: 111}
        }).open();
    }
    writeLOG(hMeld, pError);
}

function writeLOG(pLog, pError) {
    'use strict';
    var LOG = JSON.parse(localStorage.getItem('Abakus.LOG'));
    if (!LOG) {
        LOG = '';
    }
    console.log(new Date().toLocaleTimeString());
    console.log(new Date().toLocaleTimeString().substr(0, 5));
    console.log(new Date().toLocaleTimeString().substring(0, 5));
    LOG += '<br>' + new Date().toISOString().substr(0, 10) + ' ' + new Date().toLocaleTimeString().substr(0, 5) + '<br>';
    if (pError) {
        var hHref = window.location.href;
        if (hHref.indexOf('firebaseapp.com') >= 0) {
            hHref = hHref.substr(hHref.indexOf('firebaseapp.com') + 15);
        } else if (hHref.indexOf('ABAKUS/public_html') >= 0) {
            hHref = hHref.substr(hHref.indexOf('ABAKUS/public_html') + 18);
        } else if (hHref.indexOf('www') >= 0) {
            hHref = hHref.substr(hHref.indexOf('www') + 3);
        }
        LOG += '/' + hHref + ' - JS-Fehler: ' + pError + '<br>';
    }
    LOG += pLog + '<br>';
    localStorage.setItem('Abakus.LOG', JSON.stringify(LOG));
}

function getDBFehlertext(pErrorCode) {

    var meld = '';

    if (pErrorCode === -1) {
        meld = 'OtherCause';
    } else if (pErrorCode === 1) {
        meld = 'InternalServerError';
    } else if (pErrorCode === 100) {
        meld = 'Keine&nbsp;Verbindung';
    } else if (pErrorCode === 101) {
        meld = 'ObjectNotFound';
    } else if (pErrorCode === 102) {
        meld = 'InvalidQuery';
    } else if (pErrorCode === 103) {
        meld = 'InvalidClassName';
    } else if (pErrorCode === 104) {
        meld = 'MissingObjectId';
    } else if (pErrorCode === 105) {
        meld = 'InvalidKeyName';
    } else if (pErrorCode === 106) {
        meld = 'InvalidPointer';
    } else if (pErrorCode === 107) {
        meld = 'InvalidJSON';
    } else if (pErrorCode === 108) {
        meld = 'CommandUnavailable';
    } else if (pErrorCode === 109) {
        meld = 'NotInitialized';
    } else if (pErrorCode === 111) {
        meld = 'IncorrectType';
    } else if (pErrorCode === 112) {
        meld = 'InvalidChannelName';
    } else if (pErrorCode === 115) {
        meld = 'PushMisconfigured';
    } else if (pErrorCode === 116) {
        meld = 'ObjectTooLarge';
    } else if (pErrorCode === 119) {
        meld = 'OperationForbidden';
    } else if (pErrorCode === 120) {
        meld = 'CacheMiss';
    } else if (pErrorCode === 121) {
        meld = 'InvalidNestedKey';
    } else if (pErrorCode === 122) {
        meld = 'InvalidFileName';
    } else if (pErrorCode === 123) {
        meld = 'InvalidACL';
    } else if (pErrorCode === 124) {
        meld = 'Timeout';
    } else if (pErrorCode === 125) {
        meld = 'InvalidEmailAddress';
    } else if (pErrorCode === 137) {
        meld = 'DuplicateValue';
    } else if (pErrorCode === 139) {
        meld = 'InvalidRoleName';
    } else if (pErrorCode === 140) {
        meld = 'ExceededQuota';
    } else if (pErrorCode === 141) {
        meld = 'ScriptFailed';
    } else if (pErrorCode === 142) {
        meld = 'ValidationFailed';
    } else if (pErrorCode === 153) {
        meld = 'FileDeleteFailed';
    } else if (pErrorCode === 155) {
        meld = 'RequestLimitExceeded';
    } else if (pErrorCode === 160) {
        meld = 'InvalidEventName';
    } else if (pErrorCode === 200) {
        meld = 'UsernameMissing';
    } else if (pErrorCode === 201) {
        meld = 'PasswordMissing';
    } else if (pErrorCode === 202) {
        meld = 'UsernameTaken';
    } else if (pErrorCode === 203) {
        meld = 'EmailTaken';
    } else if (pErrorCode === 204) {
        meld = 'EmailMissing';
    } else if (pErrorCode === 205) {
        meld = 'EmailNotFound';
    } else if (pErrorCode === 206) {
        meld = 'SessionMissing';
    } else if (pErrorCode === 207) {
        meld = 'MustCreateUserThroughSignup';
    } else if (pErrorCode === 208) {
        meld = 'AccountAlreadyLinked';
    } else if (pErrorCode === 250) {
        meld = 'LinkedIdMissing';
    } else if (pErrorCode === 251) {
        meld = 'InvalidLinkedSession';
    } else if (pErrorCode === 252) {
        meld = 'UnsupportedService';
    } else {
        meld = 'OTHERCAUSE';
    }

    return meld;
}

window.onerror = function (pMsg, pUrl, pLine, pCol, pError) {
    var msg = '';
    if (pMsg && pMsg !== 'Script error.') {
        msg += 'msg: ' + pMsg + '<br>';
    }
    var iLast = window.location.href.lastIndexOf('/');
    iLast = window.location.href.substr(0, iLast - 1).lastIndexOf('/');
    msg += 'url: ' + window.location.href.substr(iLast + 1) + '<br>';
    if (pUrl) {
        iLast = pUrl.lastIndexOf('/');
        iLast = pUrl.substr(0, iLast - 1).lastIndexOf('/');
        pUrl = pUrl.substr(iLast + 1);
        if (window.location.href.indexOf(pUrl) < 0) {
            msg += 'script: ' + pUrl + '<br>';
        }
    }
    if (pLine) {
        msg += 'line: ' + pLine + '<br>';
    }
    if (pCol) {
        msg += 'col: ' + pCol + '<br>';
    }
    if (pError) {
        msg += 'error: ' + pError + '<br>';
    }
    msg = msg.substr(0, msg.lastIndexOf('<br>'));
    showEinenFehler('Javascriptfehler:', msg);
    return false;
};