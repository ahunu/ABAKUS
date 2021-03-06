
/* global LS, firebase, CUPS, setFont */

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
var stLastZitat = [];
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
var stANMELDUNG = {};
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
    if (pCup === 1 || pCup === 5 || pCup === 6 || pCup === 7) { // Private Runde, oö. Regeln, wr. Regeln, tir. Regeln
        return false;
    } else if (LS.ME === "NOBODY") {
        return true;
    } else if (pCup <= 7) {
        return false;
    } else if (CUPS.TYP[pCup] === 'CUP' || CUPS.TYP[pCup] === 'MT') {
        return false;
    } else if (CUPS.BEREadmin[pCup].indexOf(LS.ME) >= 0
            || CUPS.BEREschreiben[pCup].indexOf(LS.ME) >= 0
            || CUPS.BEREadmin[pCup].indexOf('*') >= 0
            || CUPS.BEREschreiben[pCup].indexOf('*') >= 0) {
        return false;
    } else {
        return true;
    }
}

function QUERFORMAT() {
    if ($(window).innerWidth() > $(window).innerHeight()) {
        return true;
    } else {
        return false;
    }
}

function AnmeldenExe() {
    'use strict';
    console.log('>> AnmeldenExe();');
    stANMELDUNG = {};
    stANMELDUNG.UM = new Date().toISOString();
    stANMELDUNG.FUER = stNextTermin;
    stANMELDUNG.ANGEMELDET = true;
    stANMELDUNG.NAME = LS.MEname;

    if (STAT.ANMELDUNGEN && STAT.ANMELDUNGEN[LS.ME] && Date.now() < STAT.ANMELDUNGEN[LS.ME].FUER && STAT.ANMELDUNGEN[LS.ME].NACHRICHT) {
        stANMELDUNG.NACHRICHT = STAT.ANMELDUNGEN[LS.ME].NACHRICHT;
    }
    if (!stANMELDUNG.NACHRICHT) {
        stANMELDUNG.NACHRICHT = null;
    }

    firebase.database().ref('/00/' + ("000" + stCup).slice(-3) + '/ANMELDUNGEN/' + LS.ME)
            .update(stANMELDUNG)
            .then(function () {
                console.log('>>>> AnmeldenExe(' + stANMELDUNG.ANGEMELDET + ');');
                firebase.database().ref('/00/' + ("000" + stCup).slice(-3))
                        .update({
                            ZULETZTupd: new Date().toISOString() + ' ' + LS.ME + ', ' + window.innerWidth + ' ' + stCup + ' angemeldet.'
                        })
                        .catch(function (error) {
                            showEineDBWarnung(error, 'AnmeldenExe2()');
                        });
            })
            .catch(function (error) {
                showEineDBWarnung(error, 'AnmeldenExe()');
            });
}

function AbmeldenExe() {
    'use strict';
    console.log('<< AbmeldenExe();');
    stANMELDUNG = {};
    stANMELDUNG.UM = new Date().toISOString();
    stANMELDUNG.FUER = stNextTermin;
    stANMELDUNG.ANGEMELDET = stANMELDUNG.UM + ' ' + window.innerWidth + ' ' + stCup;
    stANMELDUNG.NAME = LS.MEname;
    if (STAT.ANMELDUNGEN && STAT.ANMELDUNGEN[LS.ME] && Date.now() < STAT.ANMELDUNGEN[LS.ME].FUER && STAT.ANMELDUNGEN[LS.ME].NACHRICHT) {
        stANMELDUNG.NACHRICHT = STAT.ANMELDUNGEN[LS.ME].NACHRICHT;
    }
    if (!stANMELDUNG.NACHRICHT) {
        stANMELDUNG.NACHRICHT = null;
    }

    firebase.database().ref('/00/' + ("000" + stCup).slice(-3) + '/ANMELDUNGEN/' + LS.ME)
            .update(stANMELDUNG)
            .then(function () {
                if (stANMELDUNG && stANMELDUNG.ANGEMELDET) {
                    console.log('<<<< AbmeldenExe(' + stANMELDUNG.ANGEMELDET + ');');
                } else {
                    console.log('<<<< AbmeldenExe(null);');
                }
                firebase.database().ref('/00/' + ("000" + stCup).slice(-3))
                        .update({
                            ZULETZTupd: new Date().toISOString() + ' ' + LS.ME + ', ' + window.innerWidth + ' ' + stCup + ' abgemeldet.'
                        })
                        .catch(function (error) {
                            showEineDBWarnung(error, 'AbmeldenExe2()');
                        });
            })
            .catch(function (error) {
                showEineDBWarnung(error, 'AbmeldenExe()');
            });
}

function NachrichtSenden() {
    'use strict';
    console.log('>> NachrichtSenden();');
    stANMELDUNG = {};
    stANMELDUNG.FUER = stNextTermin;
    if (STAT.ANMELDUNGEN && STAT.ANMELDUNGEN[LS.ME] && Date.now() < STAT.ANMELDUNGEN[LS.ME].FUER && (STAT.ANMELDUNGEN[LS.ME].ANGEMELDET === true || STAT.ANMELDUNGEN[LS.ME].ANGEMELDET === 'J')) {
        stANMELDUNG.ANGEMELDET = true;
        stANMELDUNG.UM = STAT.ANMELDUNGEN[LS.ME].UM;
    } else {
        stANMELDUNG.ANGEMELDET = stANMELDUNG.UM + ' ' + window.innerWidth + ' ' + stCup;
        stANMELDUNG.UM = new Date().toISOString();
    }
    stANMELDUNG.NAME = LS.MEname;
    stANMELDUNG.NACHRICHT = $('#iNachricht').val().trim();
    if (!stANMELDUNG.NACHRICHT) {
        stANMELDUNG.NACHRICHT = null;
    }

    firebase.database().ref('/00/' + ("000" + stCup).slice(-3) + '/ANMELDUNGEN/' + LS.ME)
            .update(stANMELDUNG)
            .then(function () {
                if (stANMELDUNG && stANMELDUNG.NACHRICHT) {
                    console.log('>>>> NachrichtSenden(' + stANMELDUNG.NACHRICHT + ');');
                } else {
                    console.log('>>>> NachrichtSenden(null);');
                }
                firebase.database().ref('/00/' + ("000" + stCup).slice(-3))
                        .update({
                            ZULETZTupd: new Date().toISOString() + ' ' + LS.ME + ', ' + window.innerWidth + ' ' + stCup + ' Textänderung.'
                        })
                        .catch(function (error) {
                            showEineDBWarnung(error, 'NachrichtSenden2()');
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
            content: '<a class="ui-btn ui-btn-a K' + (CUPS.ANMELDERF[stCup] ? '' : ' ui-disabled') + '" onclick="jbNavbarExt.close();statShow(10);">&nbsp;Anmeldung&nbsp;</a>'
                    + '<a class="ui-btn ui-btn-a K' + (STAT.MAXSPIELE[1] + STAT.MAXSPIELE[2] < STAT.MAXSPIELE[0] ? '' : ' ui-disabled') + '" onclick="jbNavbarExt.close();showArchiv();">Archiv</a>'
                    + '<a class="ui-btn ui-btn-a K" onclick="jbNavbarExt.close();$(\'#hilfeText\').toggle(\'show\');">Hilfe</a>'
                    + '<a class="ui-btn ui-btn-a K N" onclick="jbNavbarExt.close();">zurück</a>'
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
            title: '<div class=L3 style="white-space:nowrap;text-align:center;background-color:#27a;border:4px solid #27a;color: white;">&nbsp;&nbsp;Archiv:&nbsp;</div>'
        });
        var jbArchivCon = '';
        if (STAT.MAXSPIELE.length > 4) {
            for (var ii = 4; ii < STAT.MAXSPIELE.length; ii++) {
                if (STAT.MAXSPIELE[ii]) {
                    jbArchivCon += '<a class="ui-btn ui-btn-a K" onclick="closeArchiv();statShow(-1,' + "'D60'" + ',false,false,' + ii + ');">' + (2010 + ii) + '</a>';
                }
            }
        }
        if (jbArchivCon) {
            jbArchivCon += '<a class="ui-btn ui-btn-a K N" onclick="closeArchiv();">zurück</a>';
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

    if (!onValueInit) {
        console.log('ON Init:');
        onValueInit = true;
        firebaseRef = firebase.database().ref('/00/' + ("000" + stCup).slice(-3) + '/ZULETZTupd');
        firebaseRef.on('value', function (data) {
            console.log('ON update:', STAT.ZULETZTupd, data.val());
            $('#dOffline').hide();
            if (navigator.onLine) {
                $('#dInstabil').hide();
            } else {
                $('#dInstabil').show();
            }
            if (data.val() !== STAT.ZULETZTupd) {
                loadSTAT(stCup, 'Statistik wird geladen.', false, false);
            } else if (!stSynchron) {
                stSynchron = true;
                if (stStat === 10) { // Anmeldung
                    $('#bAnAbmelden,#bNachricht,#mTable').removeClass('ui-disabled');
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

    hideEinenMoment();
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
//    LS.ShowCups = 0;
//    localStorage.setItem('Abakus.LS', JSON.stringify(LS));

    if (LS.ME !== "3425") {
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
                + '<span class=M>f&uuml;r die Spieler/innen von<br>'
                + '<b>' + CUPS.NAME[stCup] + '</b></span><br>'
                + '<textarea id=iNachricht class=L rows=3 style="width:' + ($(window).innerWidth() * (QUERFORMAT() ? 0.4 : 0.8)) + 'px;background:silver;"></textarea>'
                + '</div>'
                + '<div class="ui-grid-b">'
                + '<div class="ui-block-a" style="width:39%;padding:11px 8px 0px 4px;">'
                + '<button class="L ui-corner-all" onClick="jbNachricht.close();" style="width:100%;" data-theme="a">zur&uuml;ck</button>'
                + '</div>'
                + '<div class="ui-block-b" style="width:31%;padding:11px 4px 0px 4px;">'
                + '<button class="L ui-corner-all" onClick="$(\'#iNachricht\').val(\'\').focus();" style="width:100%;">clear</button>'
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
    } else if (stCup !== LS.I) {
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
            } else if (stStat === 1 || stSort === 'STO' || CUPS.TURNIER[stCup] !== 'Handy') {
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
            $('#mTable').css('font-size', '1.5vw');
//            var canvas = document.getElementById("stCanvas");
//            var context = canvas.getContext('2d');
//            context.clearRect(0, 0, 70, 70);
//            context.drawImage(imgStatistik, 3, 4);  // Original Icon herstellen
        }
    });
    window.onbeforeunload = function (event) {
        if (/iPad|iPhone/.test(navigator.userAgent)) {
            $('body').addClass('ui-disabled');
        }
//        if (!QUERFORMAT() && seiteUeberspringen(stCup)) {
//            LS.ShowCups = 0;
//            localStorage.setItem('Abakus.LS', JSON.stringify(LS));
//            $('#bMeinTisch').addClass('ui-disabled');
//            LS.ShowCups = stCup; // for after Bottom-Forward
//        }
    };
//    window.onbeforeunload = function (event) {
//        if (/iPad|iPhone/.test(navigator.userAgent)) {
//            $('body').addClass('ui-disabled');
//        }
//        if (QUERFORMAT()
//                || LS.ME === '3425' && window.location.origin === 'file://'
//                || !seiteUeberspringen(stCup)) {
//        } else {
//            LS.ShowCups = 0;
//            localStorage.setItem('Abakus.LS', JSON.stringify(LS));
//            $('#bMeinTisch').addClass('ui-disabled');
//            LS.ShowCups = stCup; // for after Bottom-Forward
//        }
//    };
});