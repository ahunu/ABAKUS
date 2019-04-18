
/* global firebase, showCupwertung, showPlatzierungen, showTermine, showTurnier, showSaison, jHtmlArea, MPPUtils, isSaison, pell */

// 51 Hausruckcup
// 52 Raiffeisencup
// 53 Sauwaldcup
// 54 St. Tarockcup
// 55 Tiroler Tarockcup
// 56 Wr. Tarockcup

// 58 Sommer Stadl Tarock

var ADMIN = false;
var PC = false;
var FB = undefined;
var firebaseRef = null;
var LS = new Object();
var CUPS = new Object();
var STAT = new Object();
var SPIELER = new Object();
var SAISON = [];
var CUP = new Object();
var CUPD = new Object();

var tFIXPUNKTE = [, 223, 198, 180, 168, 156, 147, 138, 131, 124, // 0 - 9
    117, 110, 105, 100, 95, 90, 85, 80, 76, 72, // 10 - 19
    68, 64, 60, 56, 52, 49, 46, 43, 40, 37, // 20 - 29
    34, 31, 28, 26, 24, 22, 20, 18, 16, 14, // 30 - 39
    12, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]; // 40 - 50

var onValueInit = false;
var myJBox = null;
var myJTip = null;
var jbSpieler = null;
var jbArchiv = null;
var jbHome = null;
var I = -1;
var Y = 0;
var stCup = 0;
var iSaison = 0;
var aktSaison = 0;
var stSaison = '';
var stFinale = false;
var stFinalTeilnehmer = 0;
var stStat = 0;
var stNamenLen = 0.45;
var stHeute = "2017-04-04";
var stFont = 6;
var stFontMax = 6;
var stFontPlus = 0;
var stLastZitat = [];
var stStickyHeader = false;
var stShowList = true;
var jbAnekdote = null;
var daysOfWeek = ["So,", "Mo,", "Di,", "Mi,", "Do,", "Fr,", "Sa,"];
var monthsOfYear = ["J&auml;n.", "Feb.", "M&auml;rz", "April", "Mai", "Juni", "Juli", "Aug.", "Sep.", "Okt.", "Nov.", "Dez."];

var lastBtn = '';

function QUERFORMAT() {
    if ($(window).innerWidth() > $(window).innerHeight()) {
        return true;
    } else {
        return false;
    }
}

function historyBack() {
    $('body').addClass('ui-disabled');
    if (QUERFORMAT()
            || window.location.href.indexOf('?FromTurnier') > 0
            || STAT._AKTTURNIER && STAT._AKTTURNIER._RUNDE && STAT._AKTTURNIER._RUNDE <= 3 && LS.ME.length === 4) {
        history.back();
    } else {
        LS.ShowCups = 0;
        localStorage.setItem('Abakus.LS', JSON.stringify(LS));
        LS.ShowCups = stCup; // for after Bottom-Forward
        history.back();
    }
}

function defHome() {
    var hContent = ''
            + '<button class="L" style="width:100%;font-weight:bold;text-align:left;" onclick="jbHome.close();historyBack()">&nbsp;<img src="../Icons/icon-36-ldpi.png" height="32" width="32" style="margin:-8px;">&nbsp;&nbsp;Abakus <span style="font-weight:normal">Hauptseite</span></button><br>'
            + '<button class="L" style="width:100%;font-weight:bold;text-align:left;" onclick="jbHome.close();fINIT(56)">&nbsp;<img src="../Icons/i56.png" height="32" width="32" style="margin:-8px;">&nbsp;&nbsp;Wr. Tarockcup</button><br>'
            + '<button class="L" style="width:100%;font-weight:bold;text-align:left;" onclick="jbHome.close();fINIT(54)">&nbsp;<img src="../Icons/i54.png" height="32" width="32" style="margin:-8px;">&nbsp;&nbsp;St. Tarockcup</button><br>'
            + '<button class="L" style="width:100%;" onclick="jbHome.close();$(\'#nbHome\').removeClass(\'ui-btn-active\');">abbrechen</button>';
    jbHome = new jBox('Modal', {
        title: '<div class="L" style="background-color:#27a;border:3px solid #27a;color: white;font-weight:bold;"><center>Wechsle auf</center></div>',
        content: hContent,
        position: {x: 0, y: 0},
        closeButton: false,
        overlay: false,
        attach: (QUERFORMAT() ? '#nbHome' : ''),
        trigger: 'mouseenter',
        closeOnMouseleave: true
    });
}

function defArchiv() {
    var hContent = '';
    for (var i = SAISON.length - 1; i > 0; i--) {
        hContent += '<button class="L" style="width:100%;font-weight:bold;" onclick="jbArchiv.close();showSaison(' + i + ')">' + SAISON[i][isSaison] + '</button><br>';
    }
    hContent += '<button class="L" data-role=none style="width:100%;" onclick="jbArchiv.close();">zur&uuml;ck</button>';
    jbArchiv = new jBox('Modal', {
        title: '<div class="L" style="background-color:#27a;border:3px solid #27a;color: white;font-weight:bold;"><center>Archiv&nbsp;&nbsp;&nbsp;<i class="i zmdi-play zmdi-hc-rotate-90"></i></center></div>',
        content: hContent,
        target: $('#nbArchiv'),
        position: {x: 'right', y: 'top'},
        width: $('#nbSaison').width() + $('#nbArchiv').width() + 4,
        closeButton: false,
        overlay: false,
        attach: (QUERFORMAT() ? '#nbArchiv' : ''),
        trigger: 'mouseenter',
        closeOnMouseleave: true
    });
}

function nbHome() {
    if (LS.ME[0] === '-' || window.location.href.indexOf('?FromTurnier') > 0) {
        $('#nbHome').buttonMarkup({theme: 'd'});
        $('#dRumpf,#dFooter').addClass('ui-disabled');
        historyBack();
    } else {
        if (jbArchiv) {
            if (jbArchiv.isOpen) {
                jbArchiv.close();
            }
        }
        jbHome.open();
    }
}

function nbArchiv() {
    $('#nbArchiv').removeClass('ui-btn-active');
    if (jbHome) {
        if (jbHome.isOpen) {
            jbHome.close();
        }
    }
    jbArchiv.open();
}

function getSTAT(pCup) {
    stCup = pCup;
    stSynchron = false;
    STAT = JSON.parse(localStorage.getItem("Abakus.STAT" + ("000" + stCup).substr(-3)));
    if (STAT === null) {
        loadInProgress = true;
        loadSTAT(stCup, 'Statistik wird geladen.');
    } else {
        whenSTATloaded(true);
    }
}

function whenSTATloaded() {

    initSAISON();

    if (LS.ME[0] === '-' || window.location.href.indexOf('?FromTurnier') > 0) {
        $('#tZumTurnier').html('Zum Turnier');
    } else if (STAT._AKTTURNIER && STAT._AKTTURNIER._RUNDE <= 3 && LS.ME.length === 4) {
        $('#tZumTurnier').html('Zurück');
        defHome();
    } else {
        defHome();
    }

    if (CUPS.TYP[stCup] === 'MT') {
        showUebersichtMT('*');
    }
    if (!stStat) {
        if (CUPS.TYP[stCup] === 'MT') {
            showUebersichtMT('*');
        } else {
            if (aktSaison) {
                showSaison(aktSaison);
            } else {
                showUebersicht();
                showTermine();
            }
        }
    } else {
        if (stStat === 'Uebersicht') {
            if (CUPS.TYP[stCup] === 'MT') {
                showUebersichtMT();
            } else {
                showSaison();
            }
        } else if (stStat === 'Cupwertung') {
            showCupwertung();
        } else if (stStat === 'Platzierungen') {
            showPlatzierungen();
        } else if (stStat === 'Tischliste') {
            showTischliste();
        } else if (stStat === 'Termine') {
            showTermine();
        } else {
            showTurnier();
        }
    }
    setTimeout(function () {
        hideEinenMoment();
        if (!onValueInit) {
            onValueInit = true;
            firebaseRef = firebase.database().ref('/00/' + ("000" + stCup).slice(-3) + '/_LASTTURNIER');
            firebaseRef.on('value', function (data) {
                $('#dOffline').hide();
                if (navigator.onLine) {
                    $('#dInstabil').hide();
                } else {
                    $('#dInstabil').show();
                }
                if (!STAT._LASTTURNIER) {
                    loadSTAT(stCup, 'Statistik wird geladen.');
                } else if (data.val() !== STAT._LASTTURNIER) {
                    loadTURNIER(stCup, data.val().substr(0, 10), 'Statistik wird geladen.', data.val());
                } else if (!stSynchron) {
                    stSynchron = true;
                }
            }, function (error) {
                stSynchron = false;
                $('#dOffline').show();
                $('#dInstabil').hide();
                showEinenDBFehler(error, 'initSTAT()', 'STAT on');
                return false;
            });
        }
    });
    defArchiv();
}

function getDateString(pDate) {
    var hDate = new Date(parseInt(pDate), (parseInt(pDate.substr(5, 2)) - 1), parseInt(pDate.substr(-2))); // Safari versteht "var hDate = new Date(pDate);" nicht
    if (typeof hDate === 'object') {
        return daysOfWeek[hDate.getDay()] + ' ' + hDate.getDate() + ". " + monthsOfYear[hDate.getMonth()] + " " + hDate.getFullYear();
    } else {
        return pDate;
    }
}

function scrollToMe() {
    if (jbSpieler) {
        if (jbSpieler.isOpen) {
            jbSpieler.close();
        }
    }
    if (QUERFORMAT()) {
        if (stStat === "Platzierungen") {
            $('.parent').scrollTop(0).animate({
                scrollTop: $("#itsMe").offset().top - 333
            }, 800);
        } else {
            $('html, body').animate({
                scrollTop: $("#itsMe").offset().top - 237
            }, 800);
        }
    } else {
//        $('#sideContent').scrollTop(0).animate({
//            scrollTop: $("#itsMe").offset().top - 333
//        }, 800);
        $('#sideContent').scrollTop(0).scrollTop($("#itsMe").offset().top - 333);
    }
}

function showAnekdote() {
    if (jbSpieler) {
        if (jbSpieler.isOpen) {
            jbSpieler.close();
        }
    }
    if (!jbAnekdote) {
        jbAnekdote = new jBox('Modal', {
            title: '<div class=L2 style="background-color:#27a;border:8px solid #27a;color: white;">&nbsp;Eine Anekdote zum Turnier <b><span id=jbAnekdoteTitle></span></b>:</div>',
            content: '<div>'
                    + '<div id="editor" class="M" style="width: 300px; ddheight: ' + ($(window).innerHeight() / 4 - 11) + 'px; width:' + ($(window).innerWidth() * (QUERFORMAT() ? 0.7 : 0.9)) + 'px;background:#eee; border-width:6px; border-style:double;border-color:#ddd; text-align: justify;"></div>'
//+ '<div id="editor" class="M" style="background-color:#eee; border-width:5px; border-style:groove; text-align:left"></div>'
                    + '<div class="ui-grid-b">'
                    + '<div class="ui-block-a" style="padding:11px 8px 0px 4px;">'
                    + '<button class="L2 ui-corner-all" onClick="writeAnekdote(false);" style="width:100%;" data-theme="a">abbrechen</button>'
                    + '</div>'
                    + '<div class="ui-block-b" style="padding:11px 4px 0px 4px;">'
                    + '<button id=bAClear class="L2 ui-corner-all" onClick="$(\'.pell-content\').html(\'\').focus();" style="width:100%;">clear</button>'
                    + '</div>'
                    + '<div class="ui-block-c" style="padding:11px 4px 0px 8px;">'
                    + '<button id=bASpeichern class="L3 ui-corner-all" onClick="writeAnekdote(true);" style="width:100%;background-color:#efcc44;font-weight:bold;" data-theme="e">speichern</button>'
                    + '</div>'
                    + '</div>',
            closeButton: false
        });
        setTimeout(function () {
            if (ADMIN
                    || stCup === 54 && (LS.ME === '3590' || LS.ME === '3629')       // Hafner Hans, Timoschek Kurt
                    || stCup === 56 && (LS.ME === '3322' || LS.ME === '2037')) {    // Braun Sigi, Sedlacek Robert
                editor = pell.init({
                    element: document.getElementById('editor'),
                    actions: ['bold', 'italic', 'underline', 'olist', 'ulist', 'line', 'undo', 'redo'],
                    classes: {actionbar: 'pell-actionbar-custom-name'},
                    onChange: function () {
                    }
                });
            } else {
                editor = pell.init({
                    element: document.getElementById('editor'),
                    actions: [],
                    classes: {actionbar: 'pell-actionbar-custom-name'},
                    onChange: function () {
                    }
                });
                $('#bAClear,#bASpeichern').hide();
            }
            $('.pell-actionbar-custom-name').attr('style', 'background-color:#ddd;border:1px solid;');
        });
    }
    jbAnekdote.open();
    setTimeout(function () {
        editor.content.innerHTML = '';
        $('#jbAnekdoteTitle').text(STAT[stStat]._NAME);
        if (STAT[stStat]._ANEKDOTE) {
            $('.pell-content').html(STAT[stStat]._ANEKDOTE).focus();
        } else {
            $('.pell-content').html('').focus();
        }

        if (STAT[stStat]._ANEKDOTE) {
            editor.content.innerHTML = STAT[stStat]._ANEKDOTE;
        } else {
            editor.content.innerHTML = '';
        }

    }, 100);
}

function writeAnekdote(pWrite) {
    if (pWrite) {
        var vAnekdote = editor.content.innerHTML;
        if (!vAnekdote) {
            vAnekdote = null;
        }
        firebase.database().ref('/00/' + ("000" + stCup).slice(-3) + '/' + stStat)
                .update({
                    _ANEKDOTE: vAnekdote
                })
                .then(function () {
                    firebase.database().ref('/00/' + ("000" + stCup).slice(-3))
                            .update({
                                _LASTTURNIER: (STAT._LASTTURNIER.substr(0, 10) + ', ' + Date.now())
                            })
                            .then(function () {
                                var vAnekdote = editor.content.innerHTML;
                                if (vAnekdote) {
                                    STAT[stStat]._ANEKDOTE = vAnekdote;
                                    $('#bAnekdoten').removeClass('ui-disabled');
                                } else {
                                    delete STAT[stStat]._ANEKDOTE;
                                }
                                hideEinenMoment();
                            })
                            .catch(function (error) {
                                showEineDBWarnung(error, 'writeAnekdote()');
                            });
                })
                .catch(function (e) {
                    showEineDBWarnung(e, 'writeAnekdote()');
                });
    }
    jbAnekdote.close();
}

// I N I T  ************************************************************************************
$(document).ready(function () {
    fINIT();
});
function fINIT(pCup) {
    $('#iDownload,#iPrint,#iAnekdote,#iGo').hide();
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
    showLogo();
    var hx = $(window).innerHeight() - $('#sideContent').offset().top - $('#dFooter').height() - 1;
    $('#sideContent').css('height', hx + 'px');
    setStMaxFont();
    LS = JSON.parse(localStorage.getItem('Abakus.LS'));
    if (LS === null) {
        if (window.location.href.indexOf('?') > 0) {
            window.location.replace('../index.html' + window.location.href.substr(window.location.href.indexOf('?')));
        } else {
            window.location.replace('../index.html');
        }
    }
    CUPS = JSON.parse(localStorage.getItem('Abakus.CUPS'));
    stHeute = myDateString(new Date());
    if (pCup) {
        stCup = pCup;
        stStat = 0;
    } else {
        stCup = LS.ShowCups;
    }
    if (stCup >= 58) {
        LS.ShowSpielerNr = false;
    }

    if (QUERFORMAT()) {
        $('#hfHeader').remove();
    } else {
        $('#dLinks').attr("style", "width:100%");
        $('#qfHeader,#dDummy,#dPrint,#qfHeaderLinks,#qfHeaderZeile1,#qfHeaderZeile2,#dMargin,#dRumpf,#dCopyright,#tStand').remove();
    }

    if (LS.ME !== "3425" && LS.ME !== "1000") {
        document.oncontextmenu = function () {
//            return false; // oncontextmenu
        };
    }

    document.onselectstart = function () {
        if (jbAnekdote) {
            if (jbAnekdote.isOpen) {
// Ansonst funktioniert der htmlEditor nicht
            } else {
                return false;
            }
        } else {
            return false;
        }
    };
    if (stCup === 0) {
        history.go(-1);
    }
    if (QUERFORMAT() && (CUPS.BEREadmin[stCup].indexOf(LS.ME) >= 0 || LS.ME === '2037' && I === 56 || LS.ME[0] === '-')) {
        ADMIN = true;
    }
    STAT = JSON.parse(localStorage.getItem('Abakus.STAT' + (("000" + stCup).slice(-3))));
    SPIELER = JSON.parse(localStorage.getItem('Abakus.SPIELERnr'));
    if (!pCup) {
        firebase.initDB(stCup, 'rw');
    }

    if (CUPS.TYP[stCup] === 'MT') {
        writeCanvas(eval('"\\u00DC"') + 'bersicht');
    } else {
        writeCanvas(eval('"\\u00DC"') + 'bersicht ' + stSaison);
    }

    $('#tJJJJ').text(new Date().getFullYear());
    setFont();
    myJTip = new jBox('Tooltip', {
        theme: 'TooltipSmall',
        Class: 'TooltipError',
        target: '#iVNN',
        content: '?',
        delayClose: 20,
        closeOnClick: true,
        closeOnEsc: true,
        zIndex: 8000
    });
    var hx = 0;
    var hy = 0;
    if (QUERFORMAT()) {
        hy = $(window).innerHeight() / 7;
        hx = 0;
    } else {
        hy = $(window).innerHeight() / 5;
        hx = $(window).innerWidth() / 10;
    }
    jbSpieler = new jBox('Modal', {
        title: '<div class=M style="white-space:nowrap;background-color:#27a;color: white;">'
                + '&nbsp;&nbsp;<i class="i zmdi-account iL"></i>&nbsp;&nbsp;'
                + '<span id=jbSpielerTitel></span>'
                + '</div>',
        content: '<div onclick="jbSpieler.close();"><div id=jbSpielerContent></div><div id=jbSpielerHelp hidden>'
                + (QUERFORMAT() ? 'Die Cuppunkte ergeben sich aus der Summe<br>der sechs besten Ergebnisse plus dem Finale.'
                        : 'Zur Berechnung der Cuppunkte<br>werden die sieben besten<br>Ergebnisse verwendet.')
                + '</div></div>',
        position: {x: hx, y: hy},
        closeButton: 'box',
        closeOnEsc: true,
        overlay: false,
        draggable: 'title'
    });
    if (!PC) { // Auf Android versagt ansonst der erste Aufruf!!!
        jbSpieler.open();
        $('#jbSpielerTitel').html('&nbsp;');
        $('#jbSpielerContent').html('&nbsp;');
        jbSpieler.close();
    }

    var mediaQueryList = window.matchMedia('print');
    mediaQueryList.addListener(function (mql) {
        if (mql.matches) {
// onbeforeprint equivalent
        } else {
            $('#dPrint').attr('style', 'width:72%');
            $('#tStand').css('position', 'fixed');
            $('#qfHeader').removeClass('printHeader');
            $('#qfHeader').addClass('fixHeader');
            $('#mTable').css('font-size', '1.5vw');
        }
    });
    $(document).on('keyup', '#iFilter', function () {
        var rows = $("#tbody").find("tr");
        if (this.value.length) {
            var data = this.value.replace(/ /g, ',').split(",");
            var data2 = [];
            for (var i = 0; i < data.length; i++) {
                data[i] = data[i].trim();
                if (data[i].length >= 3) {
                    data[i] = data[i][0].toUpperCase() + data[i].substr(1);
                    if (data[i].length >= 3 && data[i] >= 'A' && data[i] <= 'Zz') {
                        data2.push(data[i]);
                    }
                }
            }
            if (data2.length) {
                if (parseInt(LS.ME) > 0) {
                    data2.push(LS.ME);
                }
                $("#tbody tr").hide();
                $.each(data2, function (i, v) {
                    rows.filter(":contains('" + v + "')").show();
                });
            } else {
                rows.show();
            }
            $("#rFilter").show();
            $("#icFilter").removeClass('ui-disabled');
        } else {
            rows.show();
            $("#icFilter").addClass('ui-disabled');
        }
    });
    getSTAT(stCup);
    window.onbeforeunload = function (event) {
        if (/iPad|iPhone/.test(navigator.userAgent)) {
            $('body').addClass('ui-disabled');
        }
        if (firebaseRef) {
            firebaseRef.off();
        }
        if (STAT && STAT._AKTTURNIER && STAT._AKTTURNIER._RUNDE && STAT._AKTTURNIER._RUNDE <= 3 && LS.ME.length === 4) {
        } else if (!QUERFORMAT() && LS.I !== LS.ShowCups) {
            LS.ShowCups = 0;
            localStorage.setItem('Abakus.LS', JSON.stringify(LS));
            LS.ShowCups = stCup; // for after Bottom-Forward
        }
    };
}