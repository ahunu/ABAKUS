
/* global LS */

var mDrag = 0;
var Old_JeSeite = '';

function showStatus() {
    if (LS.Vorhand) {
        $('#tVorhand').html('<span class="ui-bar-f ui-corner-all L">&nbsp;' + LS.Spieler[LS.Vorhand] + '&nbsp</span> hat die Vorhand.');
    } else {
        $('#tVorhand').html('W&auml;hle eine&nbsp;<span class="ui-bar-f ui-corner-all L">&nbsp;Vorhand&nbsp</span>!');
    }

    if (LS.AnzSpieler === 5) {
        if (LS.Pausierer1) {
            $('#tPausiert').html('<span class="ui-bar-d ui-corner-all L">&nbsp;' + LS.Spieler[LS.Pausierer1] + '&nbsp</span> pausiert bis auf weiters.');
        } else {
            $('#tPausiert').html('Alle spielen, niemand pausiert.');
        }
    } else if (LS.AnzSpieler === 6) {
        if (LS.Pausierer1 || LS.Pausierer2) {
            if (LS.Pausierer1 && LS.Pausierer2) {
                $('#tPausiert').html('<span class="ui-bar-d ui-corner-all L">&nbsp;' + LS.Spieler[LS.Pausierer1] + '&nbsp</span> und <span class="ui-bar-d ui-corner-all L">&nbsp;' + LS.Spieler[LS.Pausierer2] + '&nbsp</span> pausieren bis auf weiters.');
            } else if (LS.Pausierer1) {
                $('#tPausiert').html('<span class="ui-bar-d ui-corner-all L">&nbsp;' + LS.Spieler[LS.Pausierer1] + '&nbsp</span> pausiert bis auf weiters.');
            } else {
                $('#tPausiert').html('<span class="ui-bar-d ui-corner-all L">&nbsp;' + LS.Spieler[LS.Pausierer2] + '&nbsp</span> pausiert bis auf weiters.');
            }
        } else {
            $('#tPausiert').html('Alle spielen, niemand pausiert.');
        }
    }
}

function SetVorhandGeber(pPlus) {

    LS.Vorhand = LS.Vorhand + pPlus;
    if (LS.Vorhand > LS.AnzSpieler) {
        LS.Vorhand = 1;
    }
    if (LS.Vorhand === 0) {
        LS.Vorhand = LS.AnzSpieler;
    }
    if (LS.Vorhand === LS.Pausierer1 || LS.Vorhand === LS.Pausierer2) {
        LS.Vorhand = LS.Vorhand + pPlus;
        if (LS.Vorhand > LS.AnzSpieler) {
            LS.Vorhand = 1;
        }
        if (LS.Vorhand === 0) {
            LS.Vorhand = LS.AnzSpieler;
        }
        if (LS.Vorhand === LS.Pausierer1 || LS.Vorhand === LS.Pausierer2) {
            LS.Vorhand = LS.Vorhand + pPlus;
            if (LS.Vorhand > LS.AnzSpieler) {
                LS.Vorhand = 1;
            }
            if (LS.Vorhand === 0) {
                LS.Vorhand = LS.AnzSpieler;
            }
        }
    }
    LS.Geber = LS.Vorhand - 1;
    if (LS.Geber === 0) {
        LS.Geber = LS.AnzSpieler;
    }
    if (LS.Geber === LS.Pausierer1 || LS.Geber === LS.Pausierer2) {
        LS.Geber = LS.Geber - 1;
        if (LS.Geber === 0) {
            LS.Geber = LS.AnzSpieler;
        }
        if (LS.Geber === LS.Pausierer1 || LS.Geber === LS.Pausierer2) {
            LS.Geber = LS.Geber - 1;
            if (LS.Geber === 0) {
                LS.Geber = LS.AnzSpieler;
            }
        }
    }

    LS.INA1 = 0;
    LS.INA2 = 0;
    if (LS.AnzSpieler === 4) {
        LS.INA1 = 5;
        LS.INA2 = 6;
    } else if (LS.AnzSpieler === 5) {
        if (LS.Pausierer1 > 0) {
            LS.INA1 = LS.Pausierer1;
        } else {
            LS.INA1 = LS.Geber;
        }
        LS.INA2 = 6;
    } else if (LS.AnzSpieler === 6) {
        if (LS.Pausierer1 === 0 && LS.Pausierer2 === 0) {
            LS.INA1 = LS.Geber;
            if (LS.Geber <= 3) {
                LS.INA2 = LS.Geber + 3;
            } else {
                LS.INA2 = LS.Geber - 3;
            }
        } else if (LS.Pausierer1 !== 0 && LS.Pausierer2 !== 0) {
            LS.INA1 = LS.Pausierer1;
            LS.INA2 = LS.Pausierer2;
            LS.Geber = 0;
        } else {
            LS.INA1 = LS.Pausierer1;
            LS.INA2 = LS.Geber;
            LS.Geber = 0;
        }
    }
}

function Deactivate(button) {
    'use strict';
    setTimeout(function () {
        $(button).removeClass('ui-btn-active');
    });
}

function showTisch(pJeSeite) {
    'use strict';
    if (pJeSeite) {
        LS.JeSeite = pJeSeite;
        $('#dTisch41,#dTisch42').hide();
        if (LS.JeSeite === '1') {
            $('#JeSeite1').attr('checked', true).checkboxradio('refresh');
            $('#JeSeite2').attr('checked', false).checkboxradio('refresh');
        } else {
            $('#JeSeite1').attr('checked', false).checkboxradio('refresh');
            $('#JeSeite2').attr('checked', true).checkboxradio('refresh');
        }
    }
    if (LS.AnzSpieler === 4) {
        if (LS.JeSeite === '') {
            LS.JeSeite = '1';
        }
        if (LS.JeSeite === '1') {
            $('#SP141').html(LS.VName[1].replace(' ', '&nbsp;') + '  ' + LS.NName[1]);
            $('#SP241').html(LS.VName[2].replace(' ', '&nbsp;') + '<br>' + LS.NName[2]);
            $('#SP341').html(LS.VName[3].replace(' ', '&nbsp;') + '  ' + LS.NName[3]);
            $('#SP441').html(LS.VName[4].replace(' ', '&nbsp;') + '<br>' + LS.NName[4]);
        } else {
            $('#SP142').html(LS.VName[1].replace(' ', '&nbsp;') + '<br>' + LS.NName[1]);
            $('#SP242').html(LS.VName[2].replace(' ', '&nbsp;') + '<br>' + LS.NName[2]);
            $('#SP342').html(LS.VName[3].replace(' ', '&nbsp;') + '<br>' + LS.NName[3]);
            $('#SP442').html(LS.VName[4].replace(' ', '&nbsp;') + '<br>' + LS.NName[4]);
        }
        $('#dTisch4' + LS.JeSeite).show();
    } else if (LS.AnzSpieler === 5) {
        $('#SP15').html(LS.VName[1].replace(' ', '&nbsp;') + '  ' + LS.NName[1]);
        $('#SP25').html(LS.VName[2].replace(' ', '&nbsp;') + '<br>' + LS.NName[2]);
        $('#SP35').html(LS.VName[3].replace(' ', '&nbsp;') + '<br>' + LS.NName[3]);
        $('#SP45').html(LS.VName[4].replace(' ', '&nbsp;') + '<br>' + LS.NName[4]);
        $('#SP55').html(LS.VName[5].replace(' ', '&nbsp;') + '<br>' + LS.NName[5]);
        $('#dTisch5').show();
    } else if (LS.AnzSpieler === 6) {
        $('#SP16').html(LS.VName[1].replace(' ', '&nbsp;') + '  ' + LS.NName[1]);
        $('#SP26').html(LS.VName[2].replace(' ', '&nbsp;') + '<br>' + LS.NName[2]);
        $('#SP36').html(LS.VName[3].replace(' ', '&nbsp;') + '<br>' + LS.NName[3]);
        $('#SP46').html(LS.VName[4].replace(' ', '&nbsp;') + '  ' + LS.NName[4]);
        $('#SP56').html(LS.VName[5].replace(' ', '&nbsp;') + '<br>' + LS.NName[5]);
        $('#SP66').html(LS.VName[6].replace(' ', '&nbsp;') + '<br>' + LS.NName[6]);
        $('#dTisch6').show();
    }
    showStatus();
}

function onOK() {
    'use strict';

    var H_Pausierer1 = 0;
    var H_Pausierer2 = 0;
    var H_Pausierer3 = 0;

    $('#tFehler').hide();

    for (var ii = 1; ii <= LS.AnzSpieler; ii++) {
        if ($('#SP' + ii + LS.AnzSpieler).hasClass('ui-bar-d')) { // Pausierer
            if (H_Pausierer1 === 0) {
                H_Pausierer1 = ii;
            } else if (H_Pausierer2 === 0) {
                H_Pausierer2 = ii;
            } else {
                H_Pausierer3 = ii;
            }
        }
    }

    if (LS.AnzSpieler === 5 && H_Pausierer2 !== 0) {
        $('#tFehler').html('&nbsp;Nur Einer kann pausieren.').show();
        return false;
    }
    if (LS.AnzSpieler === 6 && H_Pausierer3 !== 0) {
        $('#tFehler').html('&nbsp;Nur Zwei k&ouml;nnen pausieren.').show();
        return false;
    }

    if (!LS.Vorhand) {
        $('#tFehler').html('&nbsp;Wer hat die Vorhand?').show();
        return false;
    }

    if (LS.AnzSpieler === 4) {
        if (typeof $("input[name='JeSeite']:checked").val() === "undefined") {
            $('#tFehler').html('&nbsp; Wieviele sitzen je Seite ?').show();
            return false;
        }
    }

    if ((LS.AnzSpieler === 4 && LS.JeSeite !== Old_JeSeite)
            || (LS.Pausierer1 !== H_Pausierer1)
            || (LS.Pausierer2 !== H_Pausierer2)
            || (LS.doppelt !== parseInt($('input[id=nDoppelt]').val()))
            || true) {

        if (LS.AnzSpieler !== 4) {
            LS.JeSeite = "";
        }

        LS.Pausierer1 = H_Pausierer1;
        LS.Pausierer2 = H_Pausierer2;

        LS.Vorhand += -1;

        SetVorhandGeber(1);

        LS.doppelt = parseInt($('input[id=nDoppelt]').val());
        if (isNaN(LS.doppelt)) {
            LS.doppelt = 0;
        }

        localStorage.setItem('Abakus.LS', JSON.stringify(LS));
    }

    window.history.back();

}

window.onunload = function () {};
window.onload = function () {
    // $(document).ready(function () {

    myReferrer = document.referrer;

    LS = new Object();
    LS = JSON.parse(localStorage.getItem('Abakus.LS'));
    Old_JeSeite = LS.JeSeite;

    if (LS.ME !== "3425") {
        document.oncontextmenu = function () {
            return false; // oncontextmenu
        };
    }
    document.onselectstart = function () {
        return false;
    };

    CUPS = new Object();
    CUPS = JSON.parse(localStorage.getItem('Abakus.CUPS'));

    $('#tCupName').text(CUPS.NAME[LS.I] + ':');

    showTisch();

    if (LS.AnzSpieler <= 4) {
        $('#fs4').show();
        $('#JeSeite' + LS.JeSeite).attr('checked', true).checkboxradio('refresh');
    }

    $('.SP' + LS.Vorhand).removeClass('ui-bar-a').addClass('ui-bar-f');
    if (LS.AnzSpieler >= 5 && LS.Pausierer1 !== 0) {
        $('.SP' + LS.Pausierer1).removeClass('ui-bar-a').addClass('ui-bar-d');
    }
    if (LS.AnzSpieler >= 6 && LS.Pausierer2 !== 0) {
        $('.SP' + LS.Pausierer2).removeClass('ui-bar-a').addClass('ui-bar-d');
    }

    $('input[name=nDoppelt]').val(LS.doppelt);

    if (CUPS.TURNIER[LS.I]) {
        $('#dDoppelt').hide();
    }

    $("#bDoppelt").click(function () {
        var hDoppelt = parseInt($('input[id=nDoppelt]').val());
        hDoppelt += LS.AnzSpieler;
        if (LS.Pausierer1 && LS.Pausierer1 <= LS.AnzSpieler) {
            hDoppelt--;
        }
        if (LS.Pausierer2 && LS.Pausierer2 <= LS.AnzSpieler) {
            hDoppelt--;
        }
        $('input[id=nDoppelt]').val(hDoppelt);
    });

    $('#hTitel1').text(CUPS.NAME[LS.I]);
    $('#dHeaderEquivalent').height($("#header").height());

    if (LS.AnzSpieler === 4) {
        $("#SP141,#SP241,#SP341,#SP441, #SP142,#SP242,#SP342,#SP442").click(function () {
            if (LS.Vorhand) {
                $('#SP' + LS.Vorhand + '41').removeClass('ui-bar-f').addClass('ui-bar-a');
                $('#SP' + LS.Vorhand + '42').removeClass('ui-bar-f').addClass('ui-bar-a');
            }
            LS.Vorhand = parseInt(this.id[2]);
            $('#SP' + LS.Vorhand + '41').removeClass('ui-bar-a').addClass('ui-bar-f');
            $('#SP' + LS.Vorhand + '42').removeClass('ui-bar-a').addClass('ui-bar-f');
            showStatus();
        });
    } else {

        if (LS.AnzSpieler === 5) {
            $("#SP15,#SP25,#SP35,#SP45,#SP55").click(function () {
                if (parseInt(this.id[2]) === mDrag) {
                    return;
                }
                if (LS.Vorhand) {
                    $('#SP' + LS.Vorhand + LS.AnzSpieler).removeClass('ui-bar-f').addClass('ui-bar-a');
                }
                LS.Vorhand = parseInt(this.id[2]);
                $(this).removeClass('ui-bar-a').removeClass('ui-bar-d').addClass('ui-bar-f');
                if (LS.Vorhand === LS.Pausierer1) {
                    LS.Pausierer1 = 0;
                }
                if (LS.Vorhand === LS.Pausierer2) {
                    LS.Pausierer2 = 0;
                }
                showStatus();
            });
        } else {
            $("#SP16,#SP26,#SP36,#SP46,#SP56,#SP66").click(function () {
                if (parseInt(this.id[2]) === mDrag) {
                    return;
                }
                if (LS.Vorhand) {
                    $('#SP' + LS.Vorhand + LS.AnzSpieler).removeClass('ui-bar-f').addClass('ui-bar-a');
                }
                LS.Vorhand = parseInt(this.id[2]);
                $(this).removeClass('ui-bar-a').removeClass('ui-bar-d').addClass('ui-bar-f');
                if (LS.Vorhand === LS.Pausierer1) {
                    LS.Pausierer1 = 0;
                }
                if (LS.Vorhand === LS.Pausierer2) {
                    LS.Pausierer2 = 0;
                }
                showStatus();
            });
        }

        $(document).on("swipe", ".SPx56", function (event) {
            mDrag = parseInt($(this)[0].id[2]); // TS3425
            setTimeout(function () {
                mDrag = 0;
            }, 500);
            if (parseInt(mDrag) === LS.Vorhand) {
                LS.Vorhand = 0;
            }
            if ($('#' + $(this)[0].id).hasClass('ui-bar-f')) { // Vorhand
                LS.Vorhand = 0;
                $('.SP' + mDrag).removeClass('ui-bar-f').addClass('ui-bar-d');
                if (LS.AnzSpieler === 5) {
                    if (LS.Pausierer1) {
                        $('.SP' + LS.Pausierer1).removeClass('ui-bar-d').addClass('ui-bar-a');
                    }
                    LS.Pausierer1 = mDrag;
                } else {
                    if (LS.Pausierer1 && LS.Pausierer2) {
                        $('.SP' + LS.Pausierer2).removeClass('ui-bar-d').addClass('ui-bar-a');
                        LS.Pausierer2 = LS.Pausierer1;
                    } else if (LS.Pausierer1) {
                        LS.Pausierer2 = LS.Pausierer1;
                    }
                    LS.Pausierer1 = mDrag;
                }
            } else if ($('#' + $(this)[0].id).hasClass('ui-bar-a')) { // Normalo
                $('.SP' + mDrag).removeClass('ui-bar-a').addClass('ui-bar-d');
                if (LS.AnzSpieler === 5) {
                    if (LS.Pausierer1) {
                        $('.SP' + LS.Pausierer1).removeClass('ui-bar-d').addClass('ui-bar-a');
                    }
                    LS.Pausierer1 = mDrag;
                } else {
                    if (LS.Pausierer1 && LS.Pausierer2) {
                        $('.SP' + LS.Pausierer2).removeClass('ui-bar-d').addClass('ui-bar-a');
                        LS.Pausierer2 = LS.Pausierer1;
                    } else if (LS.Pausierer1) {
                        LS.Pausierer2 = LS.Pausierer1;
                    }
                    LS.Pausierer1 = mDrag;
                }
            } else {
                $('.SP' + mDrag).removeClass('ui-bar-d').addClass('ui-bar-a');
                if (LS.Pausierer1 === mDrag) {
                    LS.Pausierer1 = 0;
                }
                if (LS.Pausierer2 === mDrag) {
                    LS.Pausierer2 = 0;
                }
            }

            showStatus();

        });
    }

};