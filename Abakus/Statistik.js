
/* global LS, firebase, CUPS, setFont, imgStatistik */

var PC = false;
var FB = undefined;
var firebaseRef = null;

var Pfad = '../';

var STAT = new Object();
var DET = new Object();

var cChart1, cChart2, cChart3;
var cI = [];

var stTurCupGes = 2;
var stLaenge = 0;

var stTIMESTAMP = undefined;
var stCup = 0;
var stAktiv = false;
var stGruppiert = true;
var stStat = 0;
var stSort = 'GES';
var stGelegenheitsspieler = true;
var stAktSpalten = 0;
var stAnzSpalten = 3;
var stTitel = 'Abakus';
var html = '';
var stOption = 2;
var stNTitel = 0;
var stNamenLen = 0;
var stLastZitat = 0;
var stKolonne = 0;
var stDetI = [0];
var stDetTurCupGes = [0];
var stDetOption = [0];
var stIndME = 0;
var stFont = 6;
var stFontMax = 6;
var stFontPlus = 0;
var stHeader = false;
var stVollAb = 0;
var stSynchron = false;
var lastOption = 0;
var lastScrollPos = 0;
var anzGewonnen = 0;
var hWait = 500;

var onValueInit = false;
var anzSpPyr = [0, 0, 0, 0, 0];

var SORT = null;

var aDET, iDET;
var anzVersuche = 0;

var myJBox = null;
var jbNavbarExt = null;
var jbArchiv = null;

var daysOfWeek = ["So.", "Mo.", "Di.", "Mi.", "Do.", "Fr.", "Sa."];
var monthsOfYear = ["Jän.", "Feb.", "März", "April", "Mai", "Juni", "Juli", "Aug.", "Sep.", "Okt.", "Nov.", "Dez."];
var stNextTermin = 0;
var stNextTerminDat = null;

var mAnmelden = true;

var jbNachricht = null;

function seiteUeberspringen(pCup) {
    return (!(CUPS.BEREadmin[pCup].indexOf(LS.ME) >= 0 || CUPS.BEREschreiben[pCup].indexOf(LS.ME) >= 0 || ((CUPS.BEREadmin[pCup].indexOf('*') >= 0 || CUPS.BEREschreiben[pCup].indexOf('*') >= 0) && LS.ME !== "NOBODY") || pCup <= 7));
}

function QUERFORMAT() {
    if ($(window).innerWidth() > $(window).innerHeight()) {
        return true;
    } else {
        return false;
    }
}

function historyBack() {
    $('body').addClass('ui-disabled');
    if (!QUERFORMAT()) {
        LS.ShowCups = 0;
        localStorage.setItem('Abakus.LS', JSON.stringify(LS));
        LS.ShowCups = stCup; // for after Bottom-Forward
        $('#bMeinTisch').addClass('ui-disabled');
    }
    history.back();
}

function AnAbmelden(pAnmelden) {
    mAnmelden = pAnmelden;
    if (pAnmelden) {
        loadSTAT(stCup, 'Du wirst angemeldet!', null, AnmeldenExe);
    } else {
        loadSTAT(stCup, 'Du wirst abgemeldet!', null, AbmeldenExe);
    }
}

function AnmeldenExe() {
    var hANMELDUNG = {};
    hANMELDUNG[LS.ME] = {};
    if (LS.ME === '2778') {
        hANMELDUNG[LS.ME].NAME = 'Phan Thomas';
    } else {
        hANMELDUNG[LS.ME].NAME = LS.MEname;
    }
    hANMELDUNG[LS.ME].NAME = LS.MEname;
    hANMELDUNG[LS.ME].FUER = stNextTermin;
    hANMELDUNG[LS.ME].UM = new Date().toISOString();
    firebase.database().ref('/00/' + ("000" + stCup).slice(-3) + '/ANMELDUNGEN')
            .update(hANMELDUNG)
            .then(function () {
                firebase.database().ref('/00/' + ("000" + stCup).slice(-3))
                        .update({
                            ZULETZTupd: new Date().toISOString()
                        })
                        .then(function () {
                            hideEinenMoment();
                        })
                        .catch(function (error) {
                            showEineDBWarnung(error, 'NachrichtSenden()');
                        });
            })
            .catch(function (error) {
                showEineDBWarnung(error, 'NachrichtSenden()');
            });
}

function AbmeldenExe() {
    var hANMELDUNG = {};
    hANMELDUNG[LS.ME] = null;
    firebase.database().ref('/00/' + ("000" + stCup).slice(-3) + '/ANMELDUNGEN')
            .update(hANMELDUNG)
            .then(function () {
                firebase.database().ref('/00/' + ("000" + stCup).slice(-3))
                        .update({
                            ZULETZTupd: new Date().toISOString()
                        })
                        .then(function () {
                            hideEinenMoment();
                        })
                        .catch(function (error) {
                            showEineDBWarnung(error, 'NachrichtSenden()');
                        });
            })
            .catch(function (error) {
                showEineDBWarnung(error, 'NachrichtSenden()');
            });
}

function NachrichtSenden() {

    STAT.ANMELDUNGEN[LS.ME].NACHRICHT = $('#iNachricht').val();

    firebase.database().ref('/00/' + ("000" + stCup).slice(-3) + '/ANMELDUNGEN/' + LS.ME)
            .update({
                NACHRICHT: STAT.ANMELDUNGEN[LS.ME].NACHRICHT
            })
            .then(function () {
                firebase.database().ref('/00/' + ("000" + stCup).slice(-3))
                        .update({
                            ZULETZTupd: new Date().toISOString()
                        })
                        .then(function () {
                            hideEinenMoment();
                        })
                        .catch(function (error) {
                            showEineDBWarnung(error, 'NachrichtSenden()');
                        });
            })
            .catch(function (error) {
                showEineDBWarnung(error, 'NachrichtSenden()');
            });
}

function showNavbarExt() {
    if (!jbNavbarExt) {
        jbNavbarExt = new jBox('Modal', {
            animation: {open: 'zoomIn', close: 'zoomOut'},
            position: {x: 'right', y: 'center'},
            closeButton: false,
            closeOnClick: true,
            title: '<div class=L3 style="text-align:center;background-color:#27a;border:4px solid #27a;color: white;">&nbsp;. . .</div>',
            content: '<button class=L2 style="white-space:nowrap;width:100%;font-weight:bold;" onclick="jbNavbarExt.close();statShow(10);" ' + (CUPS.ANMELDERF[stCup] ? '' : 'class="ui-disabled"') + '>Anmeldung</button><br>'
                    + '<button class=L2 style="width:100%;font-weight:bold;" onclick="jbNavbarExt.close();showArchiv();" ' + (STAT.MAXSPIELE[1] + STAT.MAXSPIELE[2] < STAT.MAXSPIELE[0] ? '' : 'class="ui-disabled"') + '>Archiv</button><br>'
                    + '<button class=L2 style="width:100%;font-weight:bold;" onclick="jbNavbarExt.close();$(\'#hilfeText\').toggle(\'show\');">Hilfe</button><br>'
                    + '<button class="L2" style="width:100%;" onclick="jbNavbarExt.close();">zurück</button>'
        });
    }
    jbNavbarExt.open();
}

function showArchiv() {
    if (!jbArchiv) {
        jbArchiv = new jBox('Modal', {
            animation: {open: 'zoomIn', close: 'zoomOut'},
            position: {x: 'right', y: 'center'},
            closeButton: false,
            closeOnClick: true,
            title: '<div class=L3 style="white-space:nowrap;text-align:center;background-color:#27a;border:4px solid #27a;color: white;">&nbsp;Archiv:</div>'
        });

        var jbArchivCon = '';
        if (STAT.MAXSPIELE.length > 4) {
            for (var ii = 4; ii < STAT.MAXSPIELE.length; ii++) {
                if (STAT.MAXSPIELE[ii]) {
                    jbArchivCon += '<button class=L3 data-role=none style="width:100%;font-weight:bold;" onclick="closeArchiv();statShow(-1,' + "'D60'" + ',false,false,' + ii + ');">' + (2010 + ii) + '</button><br>';
                }
            }
        }
        if (jbArchivCon) {
            jbArchivCon += '<button class=L2 data-role=none style="white-space:nowrap;width:100%;" onclick="closeArchiv();">zur&uuml;ck</button>';
        }
        jbArchiv.setContent(jbArchivCon);
    }
    jbArchiv.open();
}

function closeArchiv() {
    if (jbArchiv) {
        if (jbArchiv.isOpen) {
            jbArchiv.close();
        }
    }
    if (stStat === 10 || stTurCupGes > 3) {
        Activate('#bArchiv');
    } else {
        Activate('#bSt' + stTurCupGes);
    }
}

function whenSTATloaded(pNotSynchron) {
    'use strict';

    if (!pNotSynchron) {
        stSynchron = true;
    }
    if (CUPS.ANMELDERF[stCup]) {
        stNextTermin = getNextTermin(stCup);
        var datNextTermin = new Date(stNextTermin);
        stNextTerminDat = daysOfWeek[datNextTermin.getDay()] + ' ' + datNextTermin.getDate() + ". " + monthsOfYear[datNextTermin.getMonth()];
        for (var anmeldung in STAT.ANMELDUNGEN) {
            if (new Date().valueOf() > STAT.ANMELDUNGEN[anmeldung].FUER) {
                delete STAT.ANMELDUNGEN[anmeldung];
            }
        }
    }

    for (var i = 0, eoa = STAT.S.length; i < eoa; i++) {
        if (STAT.S[i].NR === LS.ME) {
            if (STAT.S[i].SPIELE[1] || STAT.S[i].SPIELE[2]) {
                stAktiv = true;
            }
            break;
        }
    }

    if (stStat === 10 || window.location.search === '?Anmeldungen') {
        statShow(10);
    } else {
        statShow(0);
    }
    if (window.location.search) {
        $('#stHeader').show();
        if (window.location.search === '?Anmeldungen') {
            $('#stHeader,#stFooter').show();
        } else {
            $('#stHeader').show();
        }
    } else {
        $('#stHeader,#stFooter').show();
    }
    setTimeout(function () {
        hideEinenMoment();
        if (!onValueInit) {
            onValueInit = true;
            firebaseRef = firebase.database().ref('/00/' + ("000" + stCup).slice(-3) + '/ZULETZTupd');
            firebaseRef.on('value', function (data) {
                $('#dOffline').hide();
                if (navigator.onLine) {
                    $('#dInstabil').hide();
                } else {
                    $('#dInstabil').show();
                }
                if (data.val() !== STAT.ZULETZTupd) {
                    loadSTAT(stCup, 'Statistik wird geladen.');
                } else if (!stSynchron) {
                    stSynchron = true;
                    if (stStat === 10) { // Anmeldung
                        $('#bAnAbmelden,#bNachricht').removeClass('ui-disabled');
                    }
                }
            }, function (error) {
                stSynchron = false;
                if (stStat === 10) { // Anmeldung
                    $('#bAnAbmelden,#bNachricht').addClass('ui-disabled');
                }
                $('#dOffline').show();
                $('#dInstabil').hide();
                showEinenDBFehler(error, 'initSTAT()', 'STAT on');
                return false;
            });
        }
    });
}

function getTIME(pDAT) {
    'use strict';
    var std, min, p;
    p = new Date(pDAT);
    if (p) {
        std = p.getHours();
        min = p.getMinutes();
        if (std < 10) {
            std = '0' + std;
        }
        if (min < 10) {
            min = '0' + min;
        }
        return std + ':' + min;
    } else {
        return '00:00';
    }
}

function Activate(button) {
    setTimeout(function () {
        $(button).removeClass('ui-btn-active').addClass('ui-btn-active');
    }, 200);
}

function Deactivate(button) {
    setTimeout(function () {
        $(button).removeClass('ui-btn-active');
    }, 200);
}

// I N I T  ************************************************************************************
$(document).ready(function () {

    if (navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)
            ) {
        PC = false;
    } else {
        PC = true;
    }

    if (QUERFORMAT()) {
        $('#iPrint').hide();
    }

    LS = JSON.parse(localStorage.getItem('Abakus.LS'));
    if (LS === null) {
        if (window.location.href.indexOf('?') > 0) {
            window.location.replace('../Abakus.html' + window.location.href.substr(window.location.href.indexOf('?')));
        }
    }

    stCup = LS.ShowCups;

    if (LS.ME !== "3425" && LS.ME !== "1000") {
        document.oncontextmenu = function () {
            return false; // oncontextmenu
        };
    }
    document.onselectstart = function () {
        return false;
    };

    CUPS = JSON.parse(localStorage.getItem('Abakus.CUPS'));

    if (stCup <= 0) {
        history.back();
    }

    $('#tJJJJ').text(new Date().getFullYear());

    jbNachricht = new jBox('Modal', {
        title: '<div class=L2 style="background-color:#27a;border:8px solid #27a;color: white;">&nbsp;Meine Nachricht</div>',
        content: '<div>'
                + 'f&uuml;r die Spieler/innen von<br>'
                + '<b>' + CUPS.NAME[stCup] + '</b>.<br>'
                + '<textarea id=iNachricht class=L rows=3 style="width:' + ($(window).innerWidth() * (QUERFORMAT() ? 0.4 : 0.8)) + 'px;background:silver;"></textarea>'
                + '</div>'
                + '<div class="ui-grid-b">'
                + '<div class="ui-block-a" style="width:39%;padding:11px 8px 0px 4px;">'
                + '<button class="L2 ui-corner-all" onClick="jbNachricht.close();" style="width:100%;" data-theme="a">zur&uuml;ck</button>'
                + '</div>'
                + '<div class="ui-block-b" style="width:31%;padding:11px 4px 0px 4px;">'
                + '<button class="L2 ui-corner-all" onClick="$(\'#iNachricht\').val(\'\').focus();" style="width:100%;">clear</button>'
                + '</div>'
                + '<div class="ui-block-c" style="width:30%;padding:11px 4px 0px 8px;">'
                + '<button class="L3 ui-corner-all" onClick="jbNachricht.close();loadSTAT(stCup,\'Nachricht wird gespeichert.\',null,NachrichtSenden);" style="width:100%;background-color:#efcc44;font-weight:bold;" data-theme="e">OK</button>'
                + '</div>'
                + '</div>'
    });

    stAnzSpalten = LS.AnzSpalten;
    if (stCup === 11) {
        stSort = 'GES';
    } else {
        stSort = 'CUP';
    }
    stTurCupGes = 3;

    firebase.initDB(stCup);

    if (QUERFORMAT() || seiteUeberspringen(stCup)) {
        $("#tMeinTisch").text(CUPS.NAME[stCup]);
        $("#iMeinTisch").attr("src", "../Icons/Farben.png");
        $("#bMeinTisch").addClass("ui-disabled");
    } else if (stCup === LS.I) {
    } else {
        $("#tMeinTisch").text(CUPS.NAME[stCup]);
        $("#iMeinTisch").attr("src", "../Icons/Farben.png");
    }

    stSynchron = false;
    STAT = JSON.parse(localStorage.getItem("Abakus.STAT" + ("000" + stCup).substr(-3)));
    if (STAT === null) {
        loadInProgress = true;
        loadSTAT(stCup, 'Statistik wird geladen.');
    } else {
        whenSTATloaded(true);
    }

//**** ON CHANGE ***************************************************************

    $(document).on('change', '#sSchriftG', function () {
        $('#sortUndLayout').hide();
        localStorage.setItem('Abakus.LS', JSON.stringify(LS));
        compStNamenLen();
        if (CUPS.TURNIER[stCup]) {
            if (stStat === -1) {
                $('#SP1Rumpf').html(statPosCupD60()).trigger('create').show(setFont);
            } else if (stStat === 1 || stSort === 'STO' || CUPS.TURNIER[stCup] === 'PC') {
                $('#SP1Rumpf').html(statPosCup()).trigger('create').show(setFont);
            } else {
                $('#SP1Rumpf').html(statPosDiv()).trigger('create').show(setFont);
            }
        } else {
            $('#SP1Rumpf').html(statPosDiv()).trigger('create').show(setFont);
        }
    });

    $(window).on("scroll touchmove", function () {
        if (lastOption === 0) {
            var aktScrollPos = $(this).scrollTop();
            if (stHeader) {
                if (aktScrollPos > 150 && aktScrollPos > lastScrollPos) {
                    $('#stHead').slideUp();
                    stHeader = false;
                }
            } else {
                if (aktScrollPos < 200 && aktScrollPos < lastScrollPos) {
                    $('#stHead').slideDown();
                    stHeader = true;
                }
            }
            lastScrollPos = aktScrollPos;
        }
    });

    setInterval(function () {
        if (navigator.onLine) {
            $('#dOffline').hide();
            $('#dInstabil').hide();
        } else {
            if (!stSynchron) {
                $('#dOffline').show();
                $('#dInstabil').hide();
            } else {
                $('#dOffline').hide();
                $('#dInstabil').show();
            }
        }
    }, 20000);

    var mediaQueryList = window.matchMedia('print');
    mediaQueryList.addListener(function (mql) {
        if (mql.matches) {
            // onbeforeprint equivalent
        } else {
            var canvas = document.getElementById("stHead");
            var context = canvas.getContext('2d');
            context.clearRect(0, 0, 70, 70);
            context.drawImage(imgStatistik, 3, 4);  // Original Icon herstellen
        }
    });

    window.onbeforeunload = function (event) {
        if (/iPad|iPhone/.test(navigator.userAgent)) {
            $('body').addClass('ui-disabled');
        }
        if (!QUERFORMAT() && seiteUeberspringen(stCup)) {
            LS.ShowCups = 0;
            localStorage.setItem('Abakus.LS', JSON.stringify(LS));
            $('#bMeinTisch').addClass('ui-disabled');
            LS.ShowCups = stCup; // for after Bottom-Forward
        }
    };
});