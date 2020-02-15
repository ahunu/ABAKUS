
/* global firebase, showCupwertung, showPlatzierungen, showTermine, showTurnier, showSaison, jHtmlArea, MPPUtils, isSaison, pell, editor, isFinale */

// 51 Hausruckcup
// 52 Raiffeisencup
// 53 Sauwaldcup
// 54 St. Tarockcup
// 55 Tiroler Tarockcup
// 56 Wr. Tarockcup

// 15 Stadl Tarock

var ADMIN = false;
var PC = false;
var FB = undefined;
var firebaseRef = null;
var LS = new Object();
var CUPS = new Object();
var STAT = new Object();
var SPIELER = new Object();
var AKTUELLES = null;
var SAISON = [];

var SP = new Object();
var CUPPUNKTE = new Object();

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
var I = -1;
var Y = 0;
var stCup = 0;
var iSaison = 0;
var stSaison = '';
var stFinale = false;
var stFinalTeilnehmer = 0;
var stFilter = '';
var stStat = 0;
var stNamenLen = 0.45;
var stHeute = "2017-04-04";
var stFont = 6;
var stFontMax = 6;
var stFontPlus = 0;
var stLastZitat = [];
var stStickyHeader = false;
var stFotoCount = 0;
var stFotoStyle = 0;
var daysOfWeek = ["So.,", "Mo.,", "Di.,", "Mi.,", "Do.,", "Fr.,", "Sa.,"];
var monthsOfYear = ["Jän.", "Feb.", "März", "April", "Mai", "Juni", "Juli", "Aug.", "Sep.", "Okt.", "Nov.", "Dez."];
var anz = 1;
var html = '';

var lastBtn = '';

function IsInteger(value) {
    if ((parseFloat(value) === parseInt(value)) && !isNaN(value)) {
        return true;
    } else {
        return false;
    }
}

function QUERFORMAT() {
    if ($(window).innerWidth() > $(window).innerHeight()) {
        return true;
//    } else {
        return false;
    }
}

function historyBack() {
    $('body').addClass('ui-disabled');
    history.back();
}

function defArchiv() {
    var hContent = '';
    for (var i = 1; i < SAISON.length; i++) {
        hContent += '<a class="ui-btn ui-btn-a K" onclick="jbArchiv.close();showSaison(' + i + ')">' + SAISON[i][isSaison] + '</a>';
    }
    hContent += '<a class="ui-btn ui-btn-a K N" onclick="resetNB();jbArchiv.close();">zurück</a>';
    jbArchiv = new jBox('Modal', {
        title: '<div class="L" style="background-color:#27a;border:3px solid #27a;color: white;font-weight:bold;"><center>Archiv&nbsp;&nbsp;&nbsp;<i class="i zmdi-play zmdi-hc-rotate-270"></i></center></div>',
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

function resetNB() {
    $(stStat === 'Uebersicht' ? '#nbUebersicht' : '#nbSaison').addClass('ui-btn-active');
}

function nbArchiv() {
    $('#nbArchiv').removeClass('ui-btn-active');
    jbArchiv.open();
}

function getSTAT(pCup) {
    stCup = pCup;
    stSynchron = false;

    if ((CUPS.TYP[stCup] === 'CUP' || CUPS.TYP[stCup] === 'ET') && stCup > 4) {
        $(".hfHeaderIcon,#qfHeaderIcon").attr("src", "../Icons/i" + stCup + ".png");
    } else {
        $(".hfHeaderIcon,#qfHeaderIcon").attr("src", "../Icons/Farben.png");
    }
    $('.hfHeaderIcon').css('height', $('#hfHeader').height() - 8).show();

    STAT = JSON.parse(localStorage.getItem("Abakus.STAT" + ("000" + stCup).substr(-3)));
    if (STAT === null) {
        loadInProgress = true;
        loadSTAT(stCup, 'Statistik wird geladen.');
    } else {
        whenSTATloaded();
    }
}

function whenSTATloaded(pNewTurnier) {

    initSAISON();

    if (LS.ME[0] === '-' || window.location.href.indexOf('?FromTurnier') > 0) {
        $('#tZumTurnier').html('<div class="L C" style="margin-top:12px">Zum Turnier zurück&nbsp;&nbsp;</div>');
    }

    if (window.location.href.indexOf('?Aktuelles') > 0) {
        iSaison = 1;
        showInhalt();
        showAktuelles();
    } else if (LS.ShowFunktion) {
        iSaison = 1;
        showInhalt();
        showRegeln();
        delete LS.ShowFunktion;
        localStorage.setItem('Abakus.LS', JSON.stringify(LS));
    } else if (window.location.href.indexOf('?Tourplan') > 0) {
        showInhalt();
        showTourplan();
    } else if (pNewTurnier) {
        showSaison(1);
        if (pNewTurnier === true) {
            showTischliste();
        } else {
            showTurnier(pNewTurnier);
        }
    } else if (!stStat) {
        if (CUPS.TYP[stCup] === 'MT') {
            if (STAT) {
                showUebersichtMT(true);
            } else {
                showUebersichtMT(false);
            }
        } else {
            if (STAT && STAT._ANZSAISONEN) {
                showSaison(1);
            } else {
                showInhalt();
                showTermine();
            }
        }
    } else {
        if (stStat === 'Uebersicht') {
            if (CUPS.TYP[stCup] === 'MT') {
                showUebersichtMT(true);
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
        } else if (stStat[0] === '2') {
            showTurnier();
        } else {
            showLogo();
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

function sgetDateString(pDate) {
    var hDate = new Date(parseInt(pDate), (parseInt(pDate.substr(5, 2)) - 1), parseInt(pDate.substr(-2))); // Safari versteht "var hDate = new Date(pDate);" nicht
    if (typeof hDate === 'object') {
        return daysOfWeek[hDate.getDay()] + ' ' + hDate.getDate() + ". " + monthsOfYear[hDate.getMonth()] + " " + hDate.getFullYear();
    } else {
        return pDate;
    }
}
function getDateString(pDate) {
    if (typeof pDate === 'string' && pDate[4] === '-') {
        var hJar = parseInt(pDate);
        if (pDate[5] === '0') {
            var hMon = parseInt(pDate.substr(6, 1)) - 1;
        } else {
            var hMon = parseInt(pDate.substr(5, 2)) - 1;
        }
        if (pDate[8] === '0') {
            var hTag = parseInt(pDate.substr(9, 1));
        } else {
            var hTag = parseInt(pDate.substr(8, 2));
        }
        var hDate = new Date(hJar, hMon, hTag);
    } else {
        var hDate = new Date(pDate);
    }
    if (new Date().getFullYear() === hDate.getFullYear()) {
        return daysOfWeek[hDate.getDay()] + ' ' + hDate.getDate() + ". " + monthsOfYear[hDate.getMonth()];
    } else {
        return daysOfWeek[hDate.getDay()] + ' ' + hDate.getDate() + ". " + monthsOfYear[hDate.getMonth()] + " <span style='text-decoration: overline;zoom: .9; -moz-transform:scale(.9)'>" + (hDate.getFullYear() - 2000) + "</span>";
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
                scrollTop: $("#tr" + LS.ME).offset().top - 333
            }, 800);
        } else {
            $('html, body').animate({
                scrollTop: $("#tr" + LS.ME).offset().top - 237
            }, 800);
        }
    } else {
        $('#sideContent').scrollTop(0).scrollTop($("#tr" + LS.ME).offset().top - 333);
    }
}

function turnierPruefenSpeichern(pSpeichern) {

    hideEinenTip();

    $('#bASpeichern').addClass('ui-disabled');

    var DATA = {};

    if (IsInteger(stStat)) {
        DATA._CUPANEKDOTE = repairPell(editor.content.innerHTML);
        DATA._CUPFOTOS = [];
    } else {
        DATA._ANEKDOTE = repairPell(editor.content.innerHTML);
        DATA._FOTOS = [];
    }

    var val = '';

    var nFehler = 0;

    $('.ciFOTO').each(function (i, obj) {
        val = $(obj).val();
        if (val) {

            var testImg = new Image();
            testImg.complete = false;
            testImg.src = "https://drive.google.com/uc?id=" + val;
            if (!testImg.complete) {
                showEinenTip(obj, 'Das Foto wurde noch nicht vollständig geladen.<br>Versuche es später nochmal.');
                nFehler++;
                return false;
            }
            if (testImg.width < 500 || testImg.width > 1024) {
                showEinenTip(obj, 'Es sind nur Fotos mit einer Breit<br>von 500 bis 1024 Pixel erlaubt.');
                nFehler++;
                return false;
            }
            if (testImg.width <= testImg.height) {
                showEinenTip(obj, 'Es sind nur Fotos im Querformat erlaupt.');
                nFehler++;
                return false;
            }

            if (IsInteger(stStat)) {
                DATA._CUPFOTOS[i] = val;
            } else {
                DATA._FOTOS[i] = val;
            }

        } else {
            $(obj).parent().remove();
        }
    });

    if (nFehler) {
        return;
    }

    $('#bASpeichern').removeClass('ui-disabled');

    if (!pSpeichern) {
        return;
    }

    var dbRef = '';
    if (IsInteger(stStat)) {
        dbRef = '/00/' + ("000" + stCup).slice(-3) + '/' + SAISON[iSaison][isFinale];
        if (DATA._CUPFOTOS.length === 0) {
            DATA._CUPFOTOS = null;
        }
    } else {
        dbRef = '/00/' + ("000" + stCup).slice(-3) + '/' + stStat;
        if (DATA._FOTOS.length === 0) {
            DATA._FOTOS = null;
        }
    }

    showEinenMoment(stCup, 'Die Änderung wird gespeichert.');

    firebase.database().ref(dbRef)
            .update(DATA)
            .then(function () {
                if (IsInteger(stStat)) {
                    if (DATA._CUPANEKDOTE) {
                        STAT[SAISON[iSaison][isFinale]]._CUPANEKDOTE = DATA._CUPANEKDOTE;
                    } else {
                        delete STAT[SAISON[iSaison][isFinale]]._CUPANEKDOTE;
                    }
                    if (DATA._CUPFOTOS) {
                        STAT[SAISON[iSaison][isFinale]]._CUPFOTOS = DATA._CUPFOTOS;
                    } else {
                        delete STAT[SAISON[iSaison][isFinale]]._CUPFOTOS;
                    }
                } else {
                    if (DATA._ANEKDOTE) {
                        STAT[stStat]._ANEKDOTE = DATA._ANEKDOTE;
                    } else {
                        delete STAT[stStat]._ANEKDOTE;
                    }
                    if (DATA._FOTOS) {
                        STAT[stStat]._FOTOS = DATA._FOTOS;
                    } else {
                        delete STAT[stStat]._FOTOS;
                    }
                }
                localStorage.setItem("Abakus.STAT" + ("000" + stCup).substr(-3), JSON.stringify(STAT));
                if (STAT._LASTTURNIER && STAT._LASTTURNIER.substr(0, 10) === stStat) {
                    STAT._LASTTURNIER = stStat + ', ' + Date.now();
                    firebase.database().ref('/00/' + ("000" + stCup).slice(-3))
                            .update({
                                _LASTTURNIER: STAT._LASTTURNIER
                            })
                            .then(function () {
                                localStorage.setItem("Abakus.STAT" + ("000" + stCup).substr(-3), JSON.stringify(STAT));
                                hideEinenMoment();
                                showChronik(stStat);
                            })
                            .catch(function (error) {
                                showEineDBWarnung(error, 'writeAnekdote()');
                            });
                } else {
                    hideEinenMoment();
                    showChronik(stStat);
                }
            })
            .catch(function (e) {
                showEineDBWarnung(e, 'writeAnekdote()');
            });

}

function newFoto() {
    $('<div><input class="ciFOTO" type="text" data-role="none" value="" ><img class=cFotoImg hidden src="???" width="100%"></div>').insertBefore($('#iNewFoto'));
    $(".ciFOTO").focusout(function () {
        $('.ciFOTO').each(function (i, obj) {
            val = $(obj).val();
            if (val) {
                if (val.indexOf('/file/d/') > 1) {
                    val = val.substr(val.indexOf('/file/d/') + 8);
                }
                if (val.indexOf('/open?id=') > 1) {
                    val = val.substr(val.indexOf('/open?id=') + 9);
                }
                if (val.indexOf('/view?') > 1) {
                    val = val.substr(0, val.indexOf('/view?'));
                }
                $(obj).val(val);
                $(obj).next().attr("src", "https://drive.google.com/uc?id=" + val).show();
            } else {
                $(obj).next().hide();
            }
        });
    });
}

function showSomething() {
    if (lastBtn === '#bAktuelles') {
        editAktuelles();
    } else {
        editAnekdote();
    }
}

function editAnekdote() {
    if (jbSpieler) {
        if (jbSpieler.isOpen) {
            jbSpieler.close();
        }
    }

    showIcons([]);

    var html = '<div class="M2" style="padding:3vw">'
            + 'Anekdote:'
            + '<div id="editor" class="M" style="background:#eee; border-width:6px; border-style:double;border-color:#ddd; text-align: justify;"></div>'
            + '<br>Fotos:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=XS>Abakus ist für Fotos mit einer Breite von 1024 Pixel optimiert.</span>'
            + '<div id="fotoedit-grid">';

    if (IsInteger(stStat) && STAT[SAISON[iSaison][isFinale]]._CUPFOTOS) {
        for (var i = 0, len = STAT[SAISON[iSaison][isFinale]]._CUPFOTOS.length; i < len; i++) {
            html += '<div><input class="ciFOTO" type="text" data-role="none" value="' + STAT[SAISON[iSaison][isFinale]]._CUPFOTOS[i] + '" >'
                    + '<img class=cFotoImg src="https://drive.google.com/uc?id=' + STAT[SAISON[iSaison][isFinale]]._CUPFOTOS[i] + '" width="100%"></div>';
        }
    } else if (!IsInteger(stStat) && STAT[stStat]._FOTOS) {
        for (var i = 0, len = STAT[stStat]._FOTOS.length; i < len; i++) {
            html += '<div><input class="ciFOTO" type="text" data-role="none" value="' + STAT[stStat]._FOTOS[i] + '" >'
                    + '<img class=cFotoImg src="https://drive.google.com/uc?id=' + STAT[stStat]._FOTOS[i] + '" width="100%"></div>';
        }
    } else {
        html += '<div><input class="ciFOTO" type="text" data-role="none" value="" ><img class=cFotoImg hidden src="???" width="100%"></div>';
    }

    html += '<i onclick="newFoto();"  title="Ein Foto einfügen." id=iNewFoto class="i zmdi-plus noprint cQUER XXL"></i>'
            + '</div>'
            + '<br>'
            + '<div class="ui-grid-b">'
            + '<div class="ui-block-a" style="padding:11px 8px 0px 4px;">'
            + '<button class="L2 ui-corner-all" onClick="hideEinenTip();showChronik(stStat);" style="width:100%;" data-theme="a">abbrechen</button>'
            + '</div>'
            + '<div class="ui-block-b" style="padding:11px 4px 0px 4px;">'
            + '<button id=bAClear class="L2 ui-corner-all" onClick="turnierPruefenSpeichern(false)" style="width:100%;">prüfen</button>'
            + '</div>'
            + '<div class="ui-block-c" style="padding:11px 4px 0px 8px;">'
            + '<button id=bASpeichern class="L3 ui-corner-all ui-disabled" onClick="turnierPruefenSpeichern(true)" style="width:100%;background-color:#efcc44;font-weight:bold;" data-theme="e">speichern</button>'
            + '</div>'
            + '</div>'
            + '</div>';

    $('#dRumpf').html(html);

    setTimeout(function () {
        editor = window.pell.init({
            element: document.getElementById('editor'),
            actions: ['bold', 'italic', 'underline', 'superscript', 'subscript', 'olist', 'ulist', 'line', 'link', 'undo', 'redo'],
            defaultParagraphSeparator: '',
            onChange: function () {
            }
        });
        $('.pell-actionbar').attr('style', 'background-color:#ddd;border:1px solid;');
    });
    setTimeout(function () {
        editor.content.innerHTML = '';
        if (IsInteger(stStat) && STAT[SAISON[iSaison][isFinale]]._CUPANEKDOTE) {
            $('.pell-content').html(STAT[SAISON[iSaison][isFinale]]._CUPANEKDOTE);
            editor.content.innerHTML = STAT[SAISON[iSaison][isFinale]]._CUPANEKDOTE;
        } else if (!IsInteger(stStat) && STAT[stStat]._ANEKDOTE) {
            $('.pell-content').html(STAT[stStat]._ANEKDOTE);
            editor.content.innerHTML = STAT[stStat]._ANEKDOTE;
        } else {
            $('.pell-content').html('');
            editor.content.innerHTML = '';
        }
        $('.pell-content').focus();
    }, 100);

    $(".ciFOTO").focusout(function () {
        $('.ciFOTO').each(function (i, obj) {
            val = $(obj).val();
            if (val) {
                if (val.indexOf('/file/d/') > 1) {
                    val = val.substr(val.indexOf('/file/d/') + 8);
                }
                if (val.indexOf('/open?id=') > 1) {
                    val = val.substr(val.indexOf('/open?id=') + 9);
                }
                if (val.indexOf('/view?') > 1) {
                    val = val.substr(0, val.indexOf('/view?'));
                }
                $(obj).val(val);
                $(obj).next().attr("src", "https://drive.google.com/uc?id=" + val).show();
            } else {
                $(obj).next().hide();
            }
        });
    });

}

// I N I T  ************************************************************************************
$(document).ready(function () {
    fINIT();
});
function fINIT(pCup) {
    $('#iDownload,#iPrint,#iEdit,#iScrollToMe,#iShowDetails,#iHideDetails,#iLandscape,#iPortrait,#iFotos,#iChronik').hide();
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
    $('#dRumpf').css('margin-top', $('#qfHeader').height() + 'px');
    showLogo();
    var hx = $(window).innerHeight() - $('#sideContent').offset().top - 1;
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
    if (stCup >= 60) {
        LS.ShowSpielerNr = false;
    }
    if (CUPS.TYP[stCup] === 'CUP') {
        $('.cET,.cMT').remove();
    } else if (CUPS.TYP[stCup] === 'ET') {
        $('.cCUP,.cMT').remove();
    } else {
        $('.cCUP,.cET').remove();
    }

    if (LS.ME !== "3425" && LS.ME !== "1000") {
        document.oncontextmenu = function () {
//            return false; // oncontextmenu
        };
    }

    document.onselectstart = function () {
        if (document.activeElement.className && document.activeElement.className === 'pell-content') {
// Ansonst funktioniert der htmlEditor nicht
        } else {
            return false;
        }
    };

    if (LS.FotoStyle) {
        stFotoStyle = LS.FotoStyle;
    } else {
        stFotoStyle = (new Date() % 4) + 1;
    }

    if (stCup === 0) {
        history.go(-1);
    }
    if (stCup !== 53) {
        $('#nb53').remove();
    }
    if (QUERFORMAT() && (CUPS.BEREadmin[stCup].indexOf(LS.ME) >= 0 || CUPS.BEREschreiben[stCup].indexOf(LS.ME) >= 0 || LS.ME === '3425' && I === 56 || LS.ME[0] === '-')) {
        ADMIN = true;
        myJTip = new jBox('Tooltip', {
            theme: 'TooltipError',
            delayClose: 20,
            closeOnClick: true,
            closeOnEsc: true
        });
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
            $('#tStand').css('position', 'fixed');
            $('#qfHeader').attr('style', 'position: fixed; top: 0; width: 100%; padding:0em; margin:0px; background:#f5f5f5');
            $('#qfHeaderLinks').attr('style', 'width:8%;text-align:center;');
            $('#qfHeaderRechts').attr('style', 'width:92%');
            $('#qfHeaderZeile1').attr("style", "margin:-1pt 0;font-size:2.27vw;white-space:nowrap;font-family:Arial;font-style:italic;");
            $('#qfHeaderZeile2').attr("style", "margin:-5pt 0;font-size:2.08vw;white-space:nowrap;font-family:Arial;font-weight:normal;");
            $('#qfHeaderIcon').css('height', $('#qfHeaderZeile1').height() * 1.6).show();
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
    };
}