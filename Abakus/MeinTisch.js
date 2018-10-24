/*jslint browser: true, plusplus: true, vars: true */
/*global $, jQuery, Parse, CUP, CUPS, LS, console, spNext, initSTAT*/

var PC = false;

var FB = undefined;
var STAT = new Object();
var I = 0;
var time2Check = false;
var AnmeldungGestartet = false;
var iTURCODE = 0;
var aPfad = '';
var iPfad = '../Icons/';
var rPfad = '../';
var mTischTurnier = '';
var myJBox = null;
const hHeute = myDateString(new Date());
const iRufer = 1;
const iSolorufer = 2;
const iPagatrufer = 3;
const iUhurufer = 4;
const iKakadurufer = 5;
const iQuapilrufer = 6;
const iSelberrufer = 7;
const i6er = 8;
const i3er = 9;
const iSolo3er = 10;
const iFarben3er = 11;
const iFarbensolo = 12;
const iTrischaker = 13;
const iPiZwiccolo = 14;
const iBettler = 15;
const iPiZwiccoloOvert = 16;
const iBettlerOvert = 17;
const iPagat = 18;
const iUhu = 19;
const iKakadu = 20;
const iQuapil = 21;
const iV = 22;
const iTrull = 23;
const i4Koenige = 24;
const iUltimo = 25;
const iValat = 26;

function QUERFORMAT() {
    if ($(window).innerWidth() > $(window).innerHeight()) {
        return true;
    } else {
        return false;
    }
}

function historyBack() {
    if (!QUERFORMAT()) {
        LS.ShowCups = 0;
        localStorage.setItem('Abakus.LS', JSON.stringify(LS));
    }
    history.back();
}

function hrefStatistik(pParameter) {
    if (!pParameter) {
        pParameter = '';
    }
    localStorage.setItem('Abakus.LS', JSON.stringify(LS));
    if (CUPS.TURNIER[I] && CUPS.TURNIER[I] !== 'Handy') {
        window.location.href = "../Statistik/Statistik.html";
    } else {
        window.location.href = "Statistik.html" + pParameter;
    }
}

function myDateString(pDate) {
    console.log('>>> ' + pDate);
    if (typeof pDate === "object") {
        var hDate = new Date(pDate);
    } else { // string z.B. 2018-04-04
        var hDate = new Date(parseInt(pDate), (parseInt(pDate.substr(5, 2)) - 1), parseInt(pDate.substr(-2))); // Safari versteht "var hDate = new Date(pDate);" nicht
    }
    return hDate.getFullYear() + '-' + ('00' + (hDate.getMonth() + 1)).substr(-2) + '-' + ('00' + (hDate.getDate())).substr(-2);
}

function writeHeader(pTitel, pTitel2) {
    $('#hTitel1').text(pTitel);
    $('#hTitel2').html(pTitel2);
}

// R E A D Y  ************************************************************************************
$(document).ready(function () {

    if (navigator.platform.match(/(Win|Mac|Linux)/i)) {
        PC = true;
    } else {
        PC = false;
    }

    LS = JSON.parse(localStorage.getItem('Abakus.LS'));
    CUPS = JSON.parse(localStorage.getItem('Abakus.CUPS'));
    STAT = JSON.parse(localStorage.getItem("Abakus.STAT" + ("000" + I).substr(-3)));
    DS = JSON.parse(localStorage.getItem('Abakus.DS'));
    if (LS.ME !== "3425" && LS.ME !== "1000") {
        document.oncontextmenu = function () {
//            return false; // oncontextmenu
        };
    }
    document.onselectstart = function () {
        return false;
    };
    I = LS.ShowCups;
    if (I === 0) {
        return;
    }

// ABAKUS initialisieren ***********************************************************************


    if (!LS.Spieler             // nicht nach dem allerersten Aufruf
            || LS.gespielt === -999    // nach dem allererster Aufruf
            || CUPS.TURNIER[I] === 'PC' && QUERFORMAT() && (CUPS.BEREadmin[I].indexOf(LS.ME) >= 0 || I <= 3)) { // Am PC zum Turnier
        $('#bWeiter').addClass('ui-disabled');
        $('#bSpieler').addClass('ui-disabled');
        $('#bSpeichern').addClass('ui-disabled');
    } else {

        $('#tCupName').text(CUPS.NAME[LS.I]);
        var html = '';
        for (var i = 1; i <= 6; i++) {
            if (LS.Spieler[i]) {
                html = html + '<tr><td>&nbsp;' + LS.NName[i] + ' ' + LS.VName[i] + LS.Sterne[i] + '</td><td class=TC>' + DS.Punkte[i][0] + '&nbsp;</td></tr>';
            } else if (LS.Spiele[i] !== 0) {
                html = html + '<tr><td class="cRot B">&nbsp;???</td><td class=TC>' + DS.Punkte[i][0] + '&nbsp;</td></tr>';
            }
        }
        if (html) {
            $("#tSpielerPunkte > tbody").append(html);
            if (LS.Meldung !== 'Es wurde eine ganze Runde eingegeben.') { // Wegen Fehler nach Masseneingabe !!!!!!!!!!!!!!!!!!
                $("#tSpielerPunkte").table("refresh");
            }
        }

        $('#tGespielt').text('Es wurden ' + LS.gespielt + ' Spiele gespielt.');
        if (LS.AnzGespeichert !== 0) { // Speichern wurde nicht zu Ende gebracht
            $('#bWeiter,#bSpieler,#bSpeichern').removeClass('ui-disabled');
            $('#bWeiter,#bSpieler').addClass('ui-disabled');
            if (LS.AnzGespeichert !== LS.AnzSpieler) {
                $('#tGespielt').html('<b> ' + (LS.AnzSpieler - LS.AnzGespeichert) + ' Spieler m&uuml;ssen noch ' + (LS.gespielt > 0 ? 'gespeichert' : 'storniert') + ' werden.</b>').addClass('cRot');
            } else {
                $('#tGespielt').html('<b> Der Tisch wurde nicht vollst&auml;ndig ' + (LS.gespielt > 0 ? 'gespeichert' : 'storniert') + '.</b>').addClass('cRot');
            }
        } else {
            if (CUPS.TURNIER[I] === 'PC') {
                if (LS.gespielt < CUPS.SPJERUNDE[I]) {
                    $('#bSpeichern').addClass('ui-disabled');
                    $('#hSpeichern').html('<span class="cRot">Noch <b>' + (CUPS.SPJERUNDE[I] - LS.gespielt) + '</b> Spiele.</span>').show();
                }
            }
        }

        if (LS.Spieler[0] === 'Diverse') {
            $('#bWeiter').addClass('ui-disabled');
            $('#bSpieler').addClass('ui-disabled');
        }
        if (LS.gespielt === 0) {
            $('#bSpeichern').addClass('ui-disabled');
        }
        if (CUPS.TURNIER[I] === 'PC') {
            $('#bSpieler').addClass('ui-disabled');
        }
    }

    var html = '';
    $('#dText').html(getCupText(true));
    if (I === LS.I && (LS.AnzSpieler > 0 || LS.gespielt > 0) && !((CUPS.TYP[I] === 'CUP' || CUPS.TYP[I] === 'MT') && QUERFORMAT())) { // ***** Mysterium sakra
        writeHeader(CUPS.NAME[I], 'Mein Tisch', false);
    } else {
        $('#pMeinTisch,#pMeinTischFuss').hide();
        $('#pMeinCup,#pMeinCupFuss').show();
        $("#logo").attr("src", "../Icons/Farben.png");
        if (I === 1) {
            html = eval('"\\u00dc"') + 'bungstisch';
        } else if (I === 2) {
            html = eval('"\\u00dc"') + 'bungsturnier';
        } else if (I === 3) {
            html = 'PC-Testturnier';
        } else if (CUPS.TYP[I] === 'PR') {
            html = 'Private Runde';
        } else if (CUPS.TYP[I] === 'FC') {
            if (I === 11 || I === 20) {
                html = 'Kaffeehausrunde';
            } else {
                html = 'Wirtshausrunde';
            }
        } else if (CUPS.TYP[I] === 'TC') {
            html = 'Tarockcup';
        } else {
            html = '';
        }

        writeHeader(CUPS.NAME[I], html, false);
        if (CUPS.TURNIER[I] === 'PC') {
            if (QUERFORMAT() && (CUPS.BEREadmin[I].indexOf(LS.ME) >= 0 || I <= 4)) {
                $("#iNeuerTisch").attr("src", "../Icons/Turnier.png");
                $('#tNeuerTisch').html("Zum Turnier<div class='M N'>Vivat Valat!</div>");
            }
        }
    }

    $('#bButtons').html(getCupButtons()).trigger('create').show();
    if (LS.Meldung) {
        LS.Meldung = '';
        localStorage.setItem('Abakus.LS', JSON.stringify(LS));
    }

    checkVersion();

    setTimeout(function () {
        if (!navigator.onLine) {
            $('#dOffline').show();
        } else {
            $('#dOffline').hide();
        }
    }, 100);
    setInterval(function () {
        if (!navigator.onLine) {
            $('#dOffline').show();
        } else {
            $('#dOffline').hide();
        }
    }, 32000);
});
window.onerror = function (pMsg, pUrl, pLine, pCol, pError) {
    var msg = 'JS:';
    if (pMsg) {
        msg += ', msg: ' + pMsg;
    }
    if (pUrl) {
        msg += ', url: ' + pUrl;
    }
    if (pLine) {
        msg += ', line: ' + pLine;
    }
    if (pCol) {
        msg += ', col: ' + pCol;
    }
    if (pError) {
        msg += ', error: ' + pError;
    }
    msg += '.';
    msg[3] = ' ';
    console.log(msg);
    if (pUrl !== '' || pLine !== 0) {
        alert(msg);
    }
    return false;
};
window.onpageshow = function (event) {
    if (event.persisted) {
        if (navigator.userAgent.indexOf("Chrome") < 0
                && navigator.userAgent.indexOf("Opera") < 0) {
            window.location.reload(); // Ist bei Safari und Firefox erforderlich !!!
        }
    }
};
window.onbeforeunload = function (e) {
    $('.onExit').addClass('ui-disabled');
};