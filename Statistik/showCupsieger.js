
/* global LS, stSaison, QUERFORMAT(), stFinale, getName, SPIELER, STAT, stCup, CUPS, stSaisonTab, stEndstand, jbSpieler, ADMIN, SAISON, CUP, CUPD */

function addPosition() {

    var p0 = 0;
    var p1 = 9999;
    var p2 = 9999;
    var p3 = 9999;

    var tBlockB = '';
    var tBlockC = '';
    var tBlockD = '';
    var tBlockE = '';

    for (var i = 0; i < CUPD.length; i++) {
        var spieler = CUPD[i].substring((CUPD[i].lastIndexOf(';') + 1));
        p0 = parseInt(CUPD[i]);
        if (p1 >= p0) {
            p1 = p0;
            tBlockB += '<div>1. <span onclick="event.stopPropagation();popupSpieler(\'' + spieler + '\',\'' + stSaison + '\');" class="P cBlau">' + (getName(spieler).replace(' ', '&nbsp;')) + '</span></div>';
            tBlockC += CUP[spieler][1] + '-' + CUP[spieler][2] + '-' + CUP[spieler][3] + '<br>';
            tBlockD += (9000 - p0) + '<br>' + '';
            tBlockE += CUP[spieler][5].length + '<br>';
        } else if (p2 >= p0) {
            p2 = p0;
            tBlockB += '<div>2. <span onclick="event.stopPropagation();popupSpieler(\'' + spieler + '\',\'' + stSaison + '\');" class="P cBlau">' + (getName(spieler).replace(' ', '&nbsp;')) + '</span></div>';
            tBlockC += CUP[spieler][1] + '-' + CUP[spieler][2] + '-' + CUP[spieler][3] + '<br>';
            tBlockD += (9000 - p0) + '<br>' + '';
            tBlockE += CUP[spieler][5].length + '<br>';
        } else if (p3 >= p0) {
            p3 = p0;
            tBlockB += '<div>3. <span onclick="event.stopPropagation();popupSpieler(\'' + spieler + '\',\'' + stSaison + '\');" class="P cBlau">' + (getName(spieler).replace(' ', '&nbsp;')) + '</span></div>';
            tBlockC += CUP[spieler][1] + '-' + CUP[spieler][2] + '-' + CUP[spieler][3] + '<br>';
            tBlockD += (9000 - p0) + '<br>' + '';
            tBlockE += CUP[spieler][5].length + '<br>';
        } else {
            break;
        }
    }

    if (QUERFORMAT()) {
        var html = '<br>'
                + '<div class="ui-grid-d">'
                + '<div class="ui-block-a" style="width:22%; text-align: center;">'
                + '<div class="XL">' + stSaison + ':</div>'
                + '<div class="S">Turniere: ' + SAISON[stSaison].anzTurniere + '</div>'
                + '</div>'
                + '<div class="ui-block-b S" style="width:25%;">' + tBlockB + '</div>'
                + '<div class="ui-block-c S C" style="width:8%;">' + tBlockC + '</div>'
                + '<div class="ui-block-d S R" style="width:8%;">' + tBlockD + '</div>'
                + '<div class="ui-block-e S R" style="width:6%;">' + tBlockE + '</div>'
                + '</div>';
        $('#dRumpf').prepend(html);
    } else {
        var html = '<tr>'
                + '<th class="S2 TC">' + stSaison + ':</th>'
//                + '<td class="S2">Turniere: ' + SAISON[stSaison].anzTurniere + '</td>'
                + '</tr>'
                + '<tr>'
                + '<td class="S2">' + tBlockB + '</td>'
                + '<td class="S2">' + tBlockC + '</td>'
                + '</tr>';
        $('#dContent').prepend(html);
    }
}

function showCupsieger() {

    if (QUERFORMAT()) {
        if (lastBtn) {
            $(lastBtn).removeClass('ui-btn-active');
        }
        lastBtn = '#bCupsieger';
        $(lastBtn).addClass('ui-btn-active');
    }

    if (jbSpieler.isOpen) {
        jbSpieler.close();
    }

    showIcons([]);

    stStat = 'Cupsieger';
    stNamenLen = 99;
    writeCanvas(stStat);
    $("#dCopyright").hide();

    SAISON["Gesamt"] = {
        anzSaisonen: 0,
        anzTurniere: 0
    };

    if (QUERFORMAT()) {
        $('#dRumpf').html('');
    } else {
        $('#dContent').html('');
        $('#sideDetails').hide();
        $('#nbUebersicht,#nbArchiv,#bAktSaison').removeClass('ui-disabled').removeClass('ui-btn-active');
        var hx = $(window).innerHeight() - $('#sideContent').offset().top - $('#dFooter').height() - 1;
        $('#sideContent').css('height', hx + 'px').scrollTop(0);
    }

    var CUP = {};
    stSaison = '';
    var nTurniere = 0;
    for (var turnier in STAT) {
        if (turnier[0] === '2') {
            if (STAT[turnier]._SAISON !== stSaison) {
                if (stSaison) {
                    bereSaison(nTurniere);
                    addPosition();
                }
                nTurniere = 0;
                stSaison = STAT[turnier]._SAISON;
            }
            nTurniere++;
        }
    }
    if (stSaison) {
        bereSaison(nTurniere);
        addPosition();
    }
}