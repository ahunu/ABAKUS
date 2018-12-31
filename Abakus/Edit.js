
/* global LS, DS */

var PC = false;

var mErgaenzt = false;
var mJungmann = false;
var mKontra = false;
var mRenonce = false;
var mSelberrufer = true;
var mFensterbrett = false;

var sBasis = 0;
var iSpieler = 0;
var iPartner = 0;

var xStorno = false;
var xManu = false;
var xKorr = false;
var xNeu = false;

var iSPIEL = 0;
var I = 0;

var nFehler = 0;
var nWillWas = 0;
var iWillWas = 0;
var nStandby = 0;
var nEingaben = 0;
var nBetrag = 0;

var iRufer = 1;
var iSolorufer = 2;
var iPagatrufer = 3;
var iUhurufer = 4;
var iKakadurufer = 5;
var iQuapilrufer = 6;
var iSelberrufer = 7;
var i6er = 8;
var i3er = 9;
var iSolo3er = 10;
var iFarben3er = 11;
var iFarbensolo = 12;
var iTrischaker = 13;
var iPiZwiccolo = 14;
var iBettler = 15;
var iPiZwiccoloOvert = 16;
var iBettlerOvert = 17;
var iDiverse = 18;

var hPunkte = [];
var hSpieler = [];
var hCount = [];

var myJBox = null;

function IsInteger(value) {
    if ((parseFloat(value) === parseInt(value)) && !isNaN(value)) {
        return true;
    } else {
        return false;
    }
}

function Deactivate(button) {
    'use strict';
    setTimeout(function () {
        $(button).removeClass('ui-btn-active');
    }, 100);
}

function showSeite(pSeite) {
    $('body').addClass('ui-disabled');
    var NEXT = new Object();
    NEXT.Seite = pSeite;
    localStorage.setItem('Abakus.NEXT', JSON.stringify(NEXT));
    window.location.replace('Abakus' + LS.AnzSpieler + LS.JeSeite + '.html');
}

function ResetSpieler(pSpieler) {
    if (xNeu || xKorr) {
        if (iSpieler === 0) {
            $('#Meldung').hide();
        }
        $('#tName1,#tName2,#tName3,#tName4,#tName5,#tName6').removeClass('Link');
        $("#tName" + pSpieler).addClass('Link');
        iSpieler = pSpieler;
        $("#bK2,#bK4").removeClass('ui-disabled');
    }
}

function showPositivSpiel() {
    myJBox = new jBox('Modal', {
        title: '<div style="background-color:#27a;border:8px solid #27a;color: white;font-size:30px">&nbsp;Positivspiel:</div>',
        content: (LS.Tarif[1] ? '<button data-role=none style="width:100%;font-weight:bold;font-size:26px" onclick="setSpiel(1)">Rufer      </button><br>' : '')
                + (LS.Tarif[2] ? '<button data-role=none style="width:100%;font-weight:bold;font-size:26px" onclick="setSpiel(2)">Solorufer  </button><br>' : '')
                + (LS.Tarif[3] ? '<button data-role=none style="width:100%;font-weight:bold;font-size:26px" onclick="setSpiel(3)">I-Rufer    </button><br>' : '')
                + (LS.Tarif[4] ? '<button data-role=none style="width:100%;font-weight:bold;font-size:26px" onclick="setSpiel(4)">II-Rufer   </button><br>' : '')
                + (LS.Tarif[5] ? '<button data-role=none style="width:100%;font-weight:bold;font-size:26px" onclick="setSpiel(5)">III-Rufer  </button><br>' : '')
                + (LS.Tarif[6] ? '<button data-role=none style="width:100%;font-weight:bold;font-size:26px" onclick="setSpiel(6)">IIII-Rufer </button><br>' : '')
                + (LS.Tarif[8] ? '<button data-role=none style="width:100%;font-weight:bold;font-size:26px" onclick="setSpiel(8)">6er        </button><br>' : '')
                + (LS.Tarif[9] ? '<button data-role=none style="width:100%;font-weight:bold;font-size:26px" onclick="setSpiel(9)">3er        </button><br>' : '')
                + (LS.Tarif[10] ? '<button data-role=none style="width:100%;font-weight:bold;font-size:26px" onclick="setSpiel(10)">Solodreier</button><br>' : '')
                + '<button data-role=none style="width:100%;font-size:26px" onclick="setSpiel(0)">zur&uuml;ck</button>'
    });
    myJBox.open();
}

function showFarbenSpiel() {
    if (LS.Tarif[11]) {
        myJBox = new jBox('Modal', {
            title: '<div style="background-color:#27a;border:8px solid #27a;color: white;font-size:30px">&nbsp;Farbenspiel:</div>',
            content: (LS.Tarif[11] ? '<button data-role=none style="width:100%;font-weight:bold;font-size:26px" onclick="setSpiel(11)">Farben-3er    </button><br>' : '')
                    + (LS.Tarif[12] ? '<button data-role=none style="width:100%;font-weight:bold;font-size:26px" onclick="setSpiel(12)">Farbensolo-3er</button><br>' : '')
                    + '<button data-role=none style="width:100%;font-size:26px" onclick="setSpiel(0)">zur&uuml;ck</button>'
        });
        myJBox.open();
    } else {
        setSpiel(12);
    }
}

function showNegativSpiel() {
    myJBox = new jBox('Modal', {
        title: '<div style="background-color:#27a;border:8px solid #27a;color: white;font-size:30px">&nbsp;Negativspiel:</div>',
        content: (LS.Tarif[13] ? '<button data-role=none style="width:100%;font-weight:bold;font-size:26px" onclick="setSpiel(13)">Trischaken    </button><br>' : '')
                + (LS.Tarif[14] ? '<button data-role=none style="width:100%;font-weight:bold;font-size:26px" onclick="setSpiel(14)">Piccolo/Zwi.  </button><br>' : '')
                + (LS.Tarif[15] ? '<button data-role=none style="width:100%;font-weight:bold;font-size:26px" onclick="setSpiel(15)">Bettler       </button><br>' : '')
                + (LS.Tarif[16] ? '<button data-role=none style="width:100%;font-weight:bold;font-size:26px" onclick="setSpiel(16)">Pic./Zwi.overt</button><br>' : '')
                + (LS.Tarif[17] ? '<button data-role=none style="width:100%;font-weight:bold;font-size:26px" onclick="setSpiel(17)">Bettler overt </button><br>' : '')
                + '<button data-role=none style="width:100%;font-size:26px" onclick="setSpiel(0)">zur&uuml;ck</button>'
    });
    myJBox.open();
}

function setSpiel(pSPIEL) {

    if (iSPIEL === 0) {
        $('#Meldung').hide();
    }

    if (pSPIEL) {
        iSPIEL = pSPIEL;
    }

    if (myJBox) {
        myJBox.close();  // Nicht bei Korrektur
    }

    $('#bPS,#bFS,#bNS').removeClass('ui-btn-active');
    if (iSPIEL <= 10) {
        $('#bPS').addClass('ui-btn-active');
    } else if (iSPIEL <= 12) {
        $('#bFS').addClass('ui-btn-active');
    } else {
        $('#bNS').addClass('ui-btn-active');
    }

    if (iSPIEL === iRufer) {
        $('#tSPIEL').text('Rufer   ');
    } else if (iSPIEL === iSolorufer) {
        $('#tSPIEL').text('Soloruf.');
    } else if (iSPIEL === iPagatrufer) {
        $('#tSPIEL').text('I-Rufer ');
    } else if (iSPIEL === iUhurufer) {
        $('#tSPIEL').text('II-Rufer');
    } else if (iSPIEL === iKakadurufer) {
        $('#tSPIEL').text('III-Ruf.');
    } else if (iSPIEL === iQuapilrufer) {
        $('#tSPIEL').text('IIII-Ruf');
    } else if (iSPIEL === i6er) {
        $('#tSPIEL').text('6er     ');
    } else if (iSPIEL === i3er) {
        $('#tSPIEL').text('3er     ');
    } else if (iSPIEL === iSolo3er) {
        $('#tSPIEL').html('Solo&nbsp;3er');
    } else if (iSPIEL === iFarben3er) {
        $('#tSPIEL').text('Farb.3er');
    } else if (iSPIEL === iFarbensolo) {
        $('#tSPIEL').text('FaSo.3er');
    } else if (iSPIEL === iTrischaker) {
        $('#tSPIEL').text('Trisch. ');
    } else if (iSPIEL === iPiZwiccolo) {
        $('#tSPIEL').text('Pi.Zwi. ');
    } else if (iSPIEL === iBettler) {
        $('#tSPIEL').text('Bettler ');
    } else if (iSPIEL === iPiZwiccoloOvert) {
        $('#tSPIEL').text('PiZwi.ov');
    } else if (iSPIEL === iBettlerOvert) {
        $('#tSPIEL').text('Bet.ov. ');
    }

    if (iSPIEL === iTrischaker && xNeu) {
        ResetSpieler(LS.Vorhand);
    }
    $('#Meldung').hide();

    mSelberrufer = false;
    $('#dSelberrufer').hide();
    $('#cbSelberrufer').prop('checked', false).checkboxradio("refresh");

    mJungmann = false;
    $('#dJungmann').hide();
    $('#cbJungmann').prop('checked', false).checkboxradio("refresh");

    mKontra = false;
    $('#dKontra').hide();
    $('#cbKontra').prop('checked', false).checkboxradio("refresh");

    mRenonce = false;
    $('#dRenonce').hide();
    $('#cbRenonce').prop('checked', false).checkboxradio("refresh");
}

function onStorno() {

    H = new Object();
    H.PUNKTE = [, 0, 0, 0, 0, 0, 0];

    xKorr = false;
    xStorno = true;
    iSpieler = DS.Spieler[I];
    DEBuchen();
    return false;
}

function korrClear() {
    Deactivate('#bK1');
    $("#DE1").val('');
    $("#DE2").val('');
    $("#DE3").val('');
    $("#DE4").val('');
    $("#DE5").val('');
    $("#DE6").val('');

    $('#Meldung').hide();

    mSelberrufer = false;
    $('#dSelberrufer').hide();
    $('#cbSelberrufer').prop('checked', false).checkboxradio("refresh");

    mJungmann = false;
    $('#dJungmann').hide();
    $('#cbJungmann').prop('checked', false).checkboxradio("refresh");

    mKontra = false;
    $('#dKontra').hide();
    $('#cbKontra').prop('checked', false).checkboxradio("refresh");

    mRenonce = false;
    $('#dRenonce').hide();
    $('#cbRenonce').prop('checked', false).checkboxradio("refresh");
}

function korrBetrag(pPunkte) {
    Deactivate('#bK2,#bK4');
    if (onSubmit(false)) {
        $('#mText').html('');
        $('#Meldung').hide();
    }
    for (i = 1; i <= LS.AnzSpieler; i++) {
        if (IsInteger(H.PUNKTE[i])) {
            if (i === iSpieler) {
                if (iPartner === 0 || iPartner === iSpieler) {
                    $("#DE" + i).val(H.PUNKTE[i] + (pPunkte * 3));  // Spieler
                } else {
                    $("#DE" + i).val(H.PUNKTE[i] + pPunkte);  // Spieler
                }
            } else if (i === iPartner) {
                $("#DE" + i).val(H.PUNKTE[i] + pPunkte);  // Partner
            } else {
                $("#DE" + i).val(H.PUNKTE[i] - pPunkte);  // Gegner
            }
        }
    }
}

function korrVorzeichen() {
    Deactivate('#bK3');
    if (onSubmit(false)) {
        $('#mText').html('');
        $('#Meldung').hide();
    }
    if (nWillWas !== 4) {
        if (IsInteger(H.PUNKTE[1])) {
            $("#DE1").val(H.PUNKTE[1] * -1);
        }
        if (IsInteger(H.PUNKTE[2])) {
            $("#DE2").val(H.PUNKTE[2] * -1);
        }
        if (IsInteger(H.PUNKTE[3])) {
            $("#DE3").val(H.PUNKTE[3] * -1);
        }
        if (IsInteger(H.PUNKTE[4])) {
            $("#DE4").val(H.PUNKTE[4] * -1);
        }
        if (IsInteger(H.PUNKTE[5])) {
            $("#DE5").val(H.PUNKTE[5] * -1);
        }
        if (IsInteger(H.PUNKTE[6])) {
            $("#DE6").val(H.PUNKTE[6] * -1);
        }
    }
}

function onSubmit(pBuchen) {

    if (!xNeu) {
        xKorr = true;
        xStorno = false;
    }
    mErgaenzt = false;

    $('#mText').removeClass('cGruen').addClass('cRot');

    $('#Meldung').hide();
    if (mJungmann) {
        $('#dJungmann').show();
    } else {
        $('#dJungmann').hide();
    }
    if (mKontra) {
        $('#dKontra').show();
    } else {
        $('#dKontra').hide();
    }
    if (mRenonce) {
        $('#dRenonce').show();
    } else {
        $('#dRenonce').hide();
    }

    H = new Object();
    H.PUNKTE = [, 0, 0, 0, 0, 0, 0];

    if (pBuchen && iSPIEL === 0) {
        $('#mText').html('Bitte ein Spiel ausw&auml;hlen.');
        $('#Meldung').show();
        return false;
    }

    if (xNeu || xKorr) {
        nFehler = 0;
        iWillWas = 0;
        nWillWas = 0;
        nStandby = 0;
        nEingaben = 0;
        nBetrag = 0;

        if (LS.AnzSpieler === 6) {
            H.PUNKTE[6] = getPUNKTE(6);
        }
        if (LS.AnzSpieler >= 5) {
            H.PUNKTE[5] = getPUNKTE(5);
        }
        H.PUNKTE[4] = getPUNKTE(4);
        H.PUNKTE[3] = getPUNKTE(3);
        H.PUNKTE[2] = getPUNKTE(2);
        H.PUNKTE[1] = getPUNKTE(1);

        if (nFehler) {
            $('#mText').html('Ung&uuml;ltige Eingabe!');
            $('#Meldung').show();
            return false;
        }

        if (!xManu && iSPIEL === 0) {
            $('#mText').html('Was wurde gespielt?');
            $('#Meldung').show();
            return false;
        }

        if (xManu && nWillWas > 0) {
            if (nWillWas === 1) {
                nBetrag = 0;
                for (var ii = 1; ii <= LS.AnzSpieler; ii++) {
                    if (H.PUNKTE[ii] !== '' && H.PUNKTE[ii] !== '-') {
                        nBetrag = nBetrag + H.PUNKTE[ii];
                    }
                }
                $('#DE' + iWillWas).val(nBetrag * -1).css("color", "red");
                $('#mText').html('Stimmt das ?');
                $('#Meldung').show();
                return false;
            } else {
                $('#mText').html('Unvollst&auml;ndige Eingabe !');
                $('#Meldung').show();
                return false;
            }
        }

        if (xNeu && !xManu) {
            H.PUNKTE[0] = 0;

            if (LS.INA1 <= LS.AnzSpieler && H.PUNKTE[LS.INA1] !== '-') {
                $('#DE' + LS.INA1).css("color", "red").focus();
                $('#mText').html(LS.Spieler[LS.INA1] + ' hat nicht gespielt !');
                $('#Meldung').show();
                return false;
            }
            if (LS.INA2 <= LS.AnzSpieler && H.PUNKTE[LS.INA2] !== '-') {
                $('#DE' + LS.INA2).css("color", "red").focus();
                $('#mText').html(LS.Spieler[LS.INA2] + ' hat nicht gespielt !');
                $('#Meldung').show();
                return false;
            }
        }

        if (nEingaben === 1 && nWillWas === 3 && !xManu) {
            mErgaenzt = true;
            for (var ii = 1; ii <= LS.AnzSpieler; ii++) {
                if (H.PUNKTE[ii] !== '' && !isNaN(H.PUNKTE[ii])) {
                    if (iSPIEL !== iTrischaker) {
                        iSpieler = ii;
                    } else if (xNeu) {
                        iSpieler = LS.Vorhand;
                    }
                    ResetSpieler(iSpieler);
                    nBetrag = H.PUNKTE[ii] * -1;
                    H.PUNKTE[ii] = H.PUNKTE[ii] * 3;
                    $('#DE' + ii).val(H.PUNKTE[ii]);
                }
            }
            for (var ii = 1; ii <= LS.AnzSpieler; ii++) {
                if (H.PUNKTE[ii] === '') {
                    H.PUNKTE[ii] = nBetrag;
                    $('#DE' + ii).val(H.PUNKTE[ii]);
                }
            }
        } else if (nEingaben === 2 && nWillWas === 2 && !xManu) {
            mErgaenzt = true;
            nBetrag1 = 123456;
            for (var ii = 1; ii <= LS.AnzSpieler; ii++) {
                if (H.PUNKTE[ii] !== '' && !isNaN(H.PUNKTE[ii])) {
                    if (nBetrag1 === 123456) {
                        nBetrag1 = H.PUNKTE[ii];
                    } else {
                        nBetrag2 = H.PUNKTE[ii];
                    }
                }
            }
            if (nBetrag1 + nBetrag2 === 0) {
                nBetrag = 0;
            } else if (nBetrag1 === nBetrag2) {
                nBetrag = nBetrag1 * -1;
            } else {
                $('#mText').html('Unvollst&auml;ndige Eingabe !');
                $('#Meldung').show();
                return false;
            }
            for (var ii = 1; ii <= LS.AnzSpieler; ii++) {
                if (H.PUNKTE[ii] === '') {
                    H.PUNKTE[ii] = nBetrag;
                    $('#DE' + ii).val(H.PUNKTE[ii]);
                }
            }
        } else if (nEingaben === 3 && nWillWas === 1 && !xManu) {
            mErgaenzt = true;
            var iWillWas = 0;
            for (var ii = 1; ii <= LS.AnzSpieler; ii++) {
                if (H.PUNKTE[ii] !== '' && !isNaN(H.PUNKTE[ii])) {
                    nBetrag -= H.PUNKTE[ii];
                } else {
                    iWillWas = ii;
                }
            }
            H.PUNKTE[iWillWas] = nBetrag;
            $('#DE' + iWillWas).val(nBetrag);
        } else if (nEingaben + nWillWas > 4 && !xManu) {
            if (xKorr) {
                if (nEingaben > 4) {
                    $('#mText').html('Es k&ouml;nnen maximal vier mitspielen!');
                    $('#Meldung').show();
                    return false;
                } else if (nEingaben < 4) {
                    $('#mText').html('Vier m&uuml;ssen schon mitspielen!');
                    $('#Meldung').show();
                    return false;
                }
            } else {
                $('#mText').html('Es k&ouml;nnen maximal vier mitspielen!');
                $('#Meldung').show();
                return false;
            }
        } else if (nEingaben + nWillWas < 4) {
            $('#mText').html('Vier m&uuml;ssen schon mitspielen!');
            $('#Meldung').show();
            return false;
        } else if (nWillWas > 0) {
            for (var ii = 1; ii <= LS.AnzSpieler; ii++) {
                if (H.PUNKTE[ii] === '') {
                    $('#DE' + ii).focus();
                    $('#mText').html('Wieviele Punkte hat ' + LS.VName[ii] + '?');
                    $('#Meldung').show();
                    return false;
                }
            }
        } else {
//          Alles OK !!!
        }
    }

    if (!pBuchen) {
        return true;
    }

    nBetrag = 0;
    for (var ii = 1; ii <= LS.AnzSpieler; ii++) {
        if (H.PUNKTE[ii] !== '' && H.PUNKTE[ii] !== '-') {
            nBetrag = nBetrag + H.PUNKTE[ii];
        }
    }
    if (nBetrag !== 0) {
        $('#mText').html('Quersumme ungleich 0! (' + nBetrag + ')');
        $('#Meldung').show();
        return false;
    }

    if (!xManu) {
        if (iSpieler === 0) {
            $('#mText').html('Wer hat gespielt ?');
            $('#Meldung').show();
            return false;
        }
        if (isNaN(H.PUNKTE[iSpieler])) {
            $('#DE' + iSpieler).css("color", "red").focus();
            $('#mText').html(LS.VName[iSpieler] + ' hat ausgesetzt. Bitte eventuell die Vorhand korrigieren.');
            $('#Meldung').show();
            return false;
        }
    }

    if ((H.PUNKTE[1] === '-' || H.PUNKTE[1] === 0)
            && (H.PUNKTE[2] === '-' || H.PUNKTE[2] === 0)
            && (H.PUNKTE[3] === '-' || H.PUNKTE[3] === 0)
            && (H.PUNKTE[4] === '-' || H.PUNKTE[4] === 0)
            && (H.PUNKTE[5] === '-' || H.PUNKTE[5] === 0)
            && (H.PUNKTE[6] === '-' || H.PUNKTE[6] === 0)) {
        if (!mFensterbrett) {
            mFensterbrett = true;
            $('#mText').html('Vier mal Null Punkte?');
            $('#Meldung').show();
            return false;
        }
    }

    if (xManu) {
        LS.gespielt = getINT($('#iGespielt').val());
        if (LS.gespielt === false) {
            $('input[id=iGespielt]').css("color", "red").focus();
            return false;
        } else {
            if (LS.gespielt <= 0) {
                $('input[id=iGespielt]').focus();
                $('#mText').html('Wieviele Spiele wurden gespielt ?');
                $('#Meldung').show();
                return false;
            }
        }
        iSpieler = 0;
    }

    anaPunkte();
    if (iSPIEL > 0 && iSPIEL < 7 && (hCount[0] === 3 || hCount[1] === 3)) {
        if (!$('#dSelberrufer').is(":visible")) {
            $('#mText').html('Un&uuml;bliche Punkteverteilung!');
            $('#dRenonce').show();
            $('#dSelberrufer').show();
            $('#Meldung').show();
            return false;
        }
    } else {
        $('#dSelberrufer').hide();
    }

    if (!xManu) {
        if (hCount[0] === 4 || mRenonce || mKontra || mJungmann) {
            // vier mal 0 ist immer möglich
        } else {
            if (iSPIEL === iTrischaker) {
                if (hCount[0] === 3 || hCount[1] === 3) {
                    // alles OK
                } else {
                    $('#mText').html('Un&uuml;bliche Punkteverteilung!');
                    $('#Meldung').show();
                    $('#dJungmann').show();
                    $('#dKontra').show();
                    $('#dRenonce').show();
                    return false;
                }
            } else if (iSPIEL < 7) {        // Partnerspiele
                if ((hCount[0] === 2 && hCount[1] === 2)
                        || ((hCount[0] === 3 || hCount[1] === 3) && mSelberrufer)) {
                    // alles OK
                } else {
                    $('#mText').html('Un&uuml;bliche Punkteverteilung!');
                    $('#Meldung').show();
                    $('#dRenonce').show();
                    return false;
                }
            } else if (hCount[0] !== 3 && hCount[1] !== 3) {
                $('#mText').html('Un&uuml;bliche Punkteverteilung!');
                $('#Meldung').show();
                $('#dRenonce').show();
                if (iSPIEL > iTrischaker) {   // Negativspiele
                    $('#dKontra').show();
                }
                return false;
            }
        }
    }

    if (mErgaenzt) {
        $('#mText').html('Die Eingaben wurden erg&auml;nzt.');
        $('#Meldung').show();
        return false;
    }

    $('body').addClass('ui-disabled');
    DEBuchen();

}

function getPUNKTE(pInd) {
    'use strict';

    if ($('#DE' + pInd).hasClass('ui-disabled')) {
        return '-';
    }

    var str = '' + $('#DE' + pInd).val();

    if (str) {
        str = str.trim();
    }

    if (str !== '') {
        if (str.indexOf('+') === 0) {
            str = (str.substr(1, str.length)).trim();
        }
        if (str.indexOf('+') === (str.length - 1)) {
            str = (str.substr(0, str.length - 1)).trim();
        }
        if (str.indexOf('-') === (str.length - 1)) {
            str = ('-' + str.substr(0, str.length - 1)).trim();
        }
        if (str === '-0') {
            str = '0';
        }
    }

    var ret = parseInt(str);

    if (str === '') {
        $('#DE' + pInd).val(str).css("color", "");
        iWillWas = pInd;
        nWillWas++;
        return str;
    } else if ('' + ret !== str) {
        $('#DE' + pInd).val(str).css("color", "red").focus();
        nFehler++;
        return false;
    } else if (isNaN(ret) || (parseInt(str) !== parseFloat(str))) {
        $('#DE' + pInd).val(str).css("color", "red").focus();
        nFehler++;
        return false;
    } else {
        $('#DE' + pInd).val(ret).css("color", "");
        nEingaben++;
        return ret;
    }
}

function getINT(pStr) {
    var Str = $.trim(pStr);
    var Int = parseInt(Str);
    if (Str === "")
        return 0;
    if (isNaN(Int))
        return false;
    if (Str.indexOf('-') >= 0 && Int > 0) {
        return (Int * -1);
    }
    if (Str.toString() === Int.toString()) {
        return Int;
    } else {
        return false;
    }
}

function QUERFORMAT() {
    if ($(window).innerWidth() > $(window).innerHeight()) {
        return true;
    } else {
        return false;
    }
}

function setFont() {
    'use strict';
    $('#bMA,#hTischEingeben,#hSpielLoeschen').hide();

    $('#bPS,#bFS,#bNS,#bMA,#bK1,#bK2,#bK3,#bK4,.xx').removeClass('ui-corner-all');
    $('#nbLI,#nbED,#nbPS,#nbFS,#nbNS,#nbGR').removeClass('ui-corner-all');

    if (QUERFORMAT()) {
        $('#iMeinTisch').height($(window).innerWidth() / 26).width($(window).innerWidth() / 26);
        $('#iMeinTisch2').height($(window).innerWidth() / 44).width($(window).innerWidth() / 44);
    } else {
        $('#iMeinTisch').height($(window).innerWidth() / 9);
        $('#iMeinTisch2').height($(window).innerWidth() / 18);
    }

    if (LS.gespielt === 0) {
        var CUPS = new Object();
        CUPS = JSON.parse(localStorage.getItem('Abakus.CUPS'));
        if (LS.ME === '3425' || CUPS.BEREadmin[LS.I].indexOf(LS.ME) >= 0) {
            $('#iMA').addClass('zmdi-Tisch');
            $('#bMA,#hTischEingeben').show();
        } else {
            $('#bMA').hide();
        }
    } else {
        if (I === DS.Game.length - 1) {
            $('#iMA').addClass('zmdi-delete');
            $('#bMA,#hSpielLoeschen').show();
        } else {
            $('#bMA').hide();
        }
    }
}

function onManuStorno() {
    if (DS.Game.length === 0 || xNeu) {
        onManu();
    } else {
        onStorno();
    }
}

function onManu() {
    if ($('#pManu').is(':visible')) {
        iSPIEL = 0;
        xManu = false;
        $("#pManu").hide();
        $('#bPS,#bFS,#bNS').removeClass('ui-disabled');
        $('#tSPIEL').text('Spiel ?');
        $('#DE1,#DE2,#DE3,#DE4,#DE5,#DE6').removeClass("bgVorhand").removeClass("bgInaktiv");
        $('#DE' + LS.Vorhand).addClass("bgVorhand");
        $('#DE' + LS.INA1).val('').addClass("bgInaktiv").addClass('ui-disabled');
        $('#DE' + LS.INA2).val('').addClass("bgInaktiv").addClass('ui-disabled');
        $('#bMA').removeClass('ui-btn-active');
    } else {
        iSPIEL = iDiverse;
        xManu = true;
        $("#pManu").show();
        $('#bPS,#bFS,#bNS').addClass('ui-disabled');
        $('#tSPIEL').text('Ganze Runde:');
        $('#DE1,#DE2,#DE3,#DE4,#DE5,#DE6').removeClass("bgVorhand").removeClass("bgInaktiv").removeClass('ui-disabled');
        if (LS.SpieleJeRunde) {
            $("#iGespielt").val(LS.SpieleJeRunde);
        }
    }
}

function showBody() {

    if (LS.doppelt === 0) {
        $('#tLinks,#tRechts').text('');
    } else if (LS.doppelt === 1) {
        $('#tLinks').text('0*');
        $('#tRechts').text('Letztes doppelte Spiel.');
    } else if (LS.doppelt === 2) {
        $('#tLinks').text('1*');
        $('#tRechts').text('Noch ein doppeltes Spiel.');
    } else {
        $('#tLinks').text((LS.doppelt - 1) + '*');
        $('#tRechts').text('Noch ' + (LS.doppelt - 1) + ' doppelte Spiele.');
    }

    $('#DE1,#DE2,#DE3,#DE4,#DE5,#DE6').removeClass("bgVorhand").removeClass("bgInaktiv");
    I = parseInt(window.location.search.substr(1));
    if (isNaN(I)) {
        xNeu = true;
        setFont();
        I = DS.Game.length;
        $('#DE' + LS.Vorhand).addClass("bgVorhand");
        $('#DE' + LS.INA1).val('').addClass("bgInaktiv").addClass('ui-disabled');
        $('#DE' + LS.INA2).val('').addClass("bgInaktiv").addClass('ui-disabled');
    } else {
        xKorr = true;
        setFont();
        setSpiel(Math.abs(DS.GameI[I]));

        $("#OK").text('Korr.').buttonMarkup({theme: 'b'});

        if (DS.Storno[I]) {
            $('#DE1,#DE2,#DE3,#DE4,#DE5,#DE6').textinput('disable');
            $('#bPS,#bFS,#bNS,#OK,#bMA,#lMA').addClass('ui-disabled');
        }

        iSpieler = DS.Spieler[I];
        $('#tName' + iSpieler).addClass('Link');

        if (DS.GameI[I] <= 6) {
            if (DS.Spieler[I] === DS.Partner[I] || DS.Partner[I] === 0) {
                if (DS.Spieler[I] === DS.Partner[I]) {
                    mSelberrufer = true;
                    $("#dSelberrufer").show();
                    $("#cbSelberrufer").prop("checked", true).checkboxradio("refresh");
                }
            }
        }

        $("#DE1").val(DS.Punkte[1][I]);
        $("#DE2").val(DS.Punkte[2][I]);
        $("#DE3").val(DS.Punkte[3][I]);
        $("#DE4").val(DS.Punkte[4][I]);
        $("#DE5").val(DS.Punkte[5][I]);
        $("#DE6").val(DS.Punkte[6][I]);
        if (!IsInteger(DS.Punkte[1][I])) {
            DS.Punkte[1][I] = '';
            $('#DE1').val('');
        }
        if (!IsInteger(DS.Punkte[2][I])) {
            DS.Punkte[2][I] = '';
            $('#DE2').val('');
        }
        if (!IsInteger(DS.Punkte[3][I])) {
            DS.Punkte[3][I] = '';
            $('#DE3').val('');
        }
        if (!IsInteger(DS.Punkte[4][I])) {
            DS.Punkte[4][I] = '';
            $('#DE4').val('');
        }
        if (LS.AnzSpieler >= 5) {
            if (!IsInteger(DS.Punkte[5][I])) {
                DS.Punkte[5][I] = '';
                $('#DE5').val('');
            }
        }
        if (LS.AnzSpieler >= 6) {
            if (!IsInteger(DS.Punkte[6][I])) {
                DS.Punkte[6][I] = '';
                $('#DE6').val('');
            }
        }
    }
}

window.onunload = function () {};
window.onload = function () {
    // $(document).ready(function () {

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

    LS = new Object();
    LS = JSON.parse(localStorage.getItem('Abakus.LS'));

    ST = new Object();
    ST = JSON.parse(localStorage.getItem('Abakus.ST'));

    DS = new Object();
    DS = JSON.parse(localStorage.getItem('Abakus.DS'));

    if (LS.ME !== "3425" && LS.ME !== "1000") {
        document.oncontextmenu = function () {
            return false; // oncontextmenu
        };
    }
    document.onselectstart = function () {
        return false;
    };

    if (LS.SpieleJeRunde) {
        if (LS.gespielt >= LS.SpieleJeRunde) {
            $('.NBedit').addClass('ui-disabled');
        }
    }

    for (i = 1; i <= LS.AnzSpieler; i++) {
        $('#tName' + i).text(LS.Spieler[i]);
        $('#tSumme' + i).text(DS.Punkte[i][0]);
    }

    $('#OK').text('OK').css("font-size", "36px");

    if (window.location.search === '?DE') {
        iSPIEL = iDiverse;
        xManu = true;
        $("#pManu").show();
        $("#NB,#dOptionen,#dSpiele").hide();
        $("#tSumme1,#tSumme2,#tSumme3,#tSumme4,#tSumme5,#tSumme6").hide();
        $("#tPunkte1,#tPunkte2,#tPunkte3,#tPunkte4,#tPunkte5,#tPunkte6").hide();
        if (LS.SpieleJeRunde) {
            $("#iGespielt").val(LS.SpieleJeRunde);
        }
        setFont();
    } else if (window.location.search === '') {
        showBody();
    } else {
        showBody();
        $("#bK2,#bK4").removeClass('ui-disabled');
        onSubmit(false); // H.xxx initialisieren
        anaPunkte();
        if (iSPIEL > 0 && iSPIEL < 7 && (hCount[0] !== 2 || hCount[1] !== 2)) {
            $('#dSelberrufer').show();
        } else {
            $('#dSelberrufer').hide();
        }
    }

    $("#tName1").click(function () {
        ResetSpieler(1);
    });
    $("#tName2").click(function () {
        ResetSpieler(2);
    });
    $("#tName3").click(function () {
        ResetSpieler(3);
    });
    $("#tName4").click(function () {
        ResetSpieler(4);
    });
    $("#tName5").click(function () {
        ResetSpieler(5);
    });
    $("#tName6").click(function () {
        ResetSpieler(6);
    });

    $("#DE1,#DE2,#DE3,#DE4,#DE5,#DE6,#iGespielt").focusin(function () {
        if (!PC) { // PhoneGap cli 6.3.0 schiebt den Footer vor die virtuelle Tastatur
            $('#NB').hide();
        }
    });

    $("#DE1,#DE2,#DE3,#DE4,#DE5,#DE6,#iGespielt").focusout(function () {
        if (!PC) {
            setTimeout(function () {
                var showNB = true;
                for (var i = 1; i <= LS.AnzSpieler; i++) {
                    if ($('#DE' + i).is(':focus')) {
                        showNB = false;
                    }
                }
                if (showNB) {
                    $('#NB').show();
                }
            });
        }
    });

    if (window.location.href.toUpperCase().indexOf('FIREBASEAPP.COM') < 0) {
        $(":mobile-pagecontainer").pagecontainer("load", "Abakus" + LS.AnzSpieler + LS.JeSeite + ".html");
    }

};

$(function () {
    $('#DE1,#DE2,#DE3,#DE4,#DE5,#DE6').keyup(function () {
        var input = $(this).val();
        if (input.length > 1 && input[0] === '0') {
            $(this).val('-' + input.substr(1));
        }
    });
});

//window.onpageshow = function (event) {
//    if (event.persisted) {
//        if (navigator.userAgent.indexOf("Chrome") < 0
//                && navigator.userAgent.indexOf("Opera") < 0) {
//            var hJeSeite = LS.JeSeite;
//            LS = JSON.parse(localStorage.getItem('Abakus.LS'));
//            if (LS.AnzSpieler === 4 && LS.JeSeite !== hJeSeite) {
//                window.location.replace('Edit4' + LS.JeSeite + '.html?');
//                return;
//            }
//            showBody();
//        }
//    }
//};

window.onbeforeunload = function (e) {
    $('body').addClass('ui-disabled');
};