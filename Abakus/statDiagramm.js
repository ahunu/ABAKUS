
/* global SORT, getName */

function dispChart(pKolonne, pI) {
    if (stAnzSpalten === 1) {
        var hBreite = $('#stBody').width();
    } else {
        var hBreite = $('#SP1').width();
        if (hBreite === $('#stBody').width()) {
            if (QUERFORMAT()) {
                hBreite = hBreite / 2;
            }
        }
        if (hBreite > 456) {
            hBreite = 456;
        }
    }

    if (cI[1] === pI
            || cI[2] === pI
            || cI[3] === pI) {
        cI.splice(4, 1);
    } else {
        cI[4] = pI;
    }
    cChart3 = cChart2;
    cChart2 = cChart1;
    cChart1 = new Object();
    cChart1.credits = {enabled: false};
    cChart1.chart = {type: 'column', options3d: {enabled: true, alpha: 15, beta: 15, depth: 110}};
    cChart1.title = {text: null};
    cChart1.colors = ['#666', '#a9a9a9', '#ee3322'];
    cChart1.xAxis = {categories: [], labels: {style: {fontSize: '19px', fontFamily: 'Verdana, sans-serif', color: '#000'},
            useHTML: true,
            formatter: function () {
                var hName = this.value.replace(/<BR>/g, " ");
                if (hName.indexOf('<br>') > 0) {
                    hName = hName.substr(0, hName.indexOf('<br>'))
                }
                if (hName.charAt(hName.length - 1) === '.') {
                    if ($('#stDet' + pKolonne).text().substr(0, hName.length - 1) === hName.substr(0, hName.length - 1)) {
                        return "<b>" + this.value + "</b>";
                    } else {
                        return this.value;
                    }
                } else {
                    if ($('#stDet' + pKolonne).text() === hName) {
                        return "<b>" + this.value + "</b>";
                    } else {
                        return this.value;
                    }
                }
            }
        }};
    cChart1.yAxis = {min: 0, title: {text: "<span style='color:#ee3322'>&#9609;&nbsp;</span><span style='color:black'> Cuppunkte,&nbsp;&nbsp;</span><span style='color:#a9a9a9'>&#9609;&nbsp;</span><span style='color:black'> Abz&uumlge</span>", useHTML: true, style: {fontSize: '18px', fontFamily: 'Verdana, sans-serif'}, x: -5},
        labels: {enabled: false},
        alternateGridColor: '#ffd'};
    cChart1.plotOptions = {column: {depth: 90, stacking: true, ygrouping: false, groupZPadding: 2, pointPadding: 0.02, dataLabels: {enabled: true, style: {fontSize: '22px', fontFamily: 'Verdana, sans-serif'}}}};
    cChart1.series = [{}];
    cChart1.series[0] = {name: '&empty; Verlust', data: []};
    cChart1.series[1] = {name: 'Abz&uuml;ge', data: []};
    cChart1.series[2] = {name: 'Cuppunkte', data: []};
    cChart1.plotOptions.column.depth = hBreite / 6;

//  if (PC && stAktSpalten < 3) {
    if (QUERFORMAT() && stAktSpalten < 3) {
        cChart1.legend = {x: -2000};
        cChart1.legend = {enabled: false};
    } else {
        cChart1.legend = {enabled: false};
    }

    cChart1.tooltip = {style: {fontSize: '20px', fontFamily: 'Verdana, sans-serif'},
        enabled: true,
        formatter: function () {
            var ii = 0;
            var hName = this.x.replace(/<BR>/g, " ");
            hName = this.x.replace(/<b>/g, "");
            if (hName.indexOf('</b><br>') > 0) {
                hName = hName.substr(0, hName.indexOf('</b><br>'))
            }
            for (var j = 1, eoa = SORT.length; j < eoa; j++) {
                var i = parseInt(SORT[j].substring((SORT[j].lastIndexOf(';') + 1)));
                if ((QUERFORMAT() && stAktSpalten < 3) || cI.length === 4) {
                    if (hName === getName(i)) {
                        ii = i;
                    }
                } else {
                    if (hName === getName(i, 99)) {
                        ii = i;
                    }
                }
            }
            ;
            var hJeSpiel = Math.round(STAT.S[ii].PUNKTE[stTurCupGes] / STAT.S[ii].SPIELE[stTurCupGes] * 100) / 100;
            var hJeSpielL = parseInt(hJeSpiel);
            var hJeSpielR = Math.abs(parseInt((hJeSpiel - hJeSpielL) * 100));
            return  '<b>' + getName(ii, 99) + ':</b><br>'
                    + "<table data-role=table><tbody>"
                    + "<tr><td style='text-align: right'>" + STAT.S[ii].SPIELE[stTurCupGes] + "</td><td>&nbsp;Spiele&nbsp&nbsp;</td><td style='text-align: right'>" + STAT.S[ii].PUNKTE[stTurCupGes] + "</td><td>&nbsp;Punkte</td><tr>"
                    + "<tr><td style='text-align: right'> 1</td><td>&nbsp;Spiel </td><td style='text-align: right'>" + hJeSpielL + "</td><td>," + hJeSpielR + "&nbsp;Punkte</td><tr>"
                    + "<tr><td style='text-align: right'>60</td><td>&nbsp;Spiele</td><th style='text-align: right'>" + Math.round(60 * STAT.S[ii].PUNKTE[stTurCupGes] / STAT.S[ii].SPIELE[stTurCupGes]) + "</th><th>&nbsp;D60-Punkte</th><tr>"
                    + "</tbody></table>";
        },
        backgroundColor: '#ffe',
        useHTML: true
    };

    var ii = -1;
    for (var j = 1; j < cI.length; j++) {
        ii++;
        if (false && QUERFORMAT() && stAktSpalten < 3) { // false = Namen schrägstellen, keine Details
            if (STAT.S[cI[j]].SPIELE[stDetTurCupGes[pKolonne]]) {
                d60TP = Math.round(STAT.S[cI[j]].PUNKTE[stDetTurCupGes[pKolonne]] * 60 / STAT.S[cI[j]].SPIELE[stDetTurCupGes[pKolonne]]);
                hText = '<br>' + STAT.S[cI[j]].SPIELE[stDetTurCupGes[pKolonne]] + '&nbsp;Spiele<br>' + STAT.S[cI[j]].PUNKTE[stDetTurCupGes[pKolonne]] + '&nbsp;Punkte<br>' + d60TP + '&nbsp;D60-Punkte';
            } else {
                hText = ' hat nicht gespielt.';
            }
            cChart1.xAxis.categories[ii] = '<b>' + getName(cI[j]) + '</b>' + hText;
        } else {
            cChart1.xAxis.categories[ii] = '<b>' + getName(cI[j], 99).replace(/ /g, "<BR>") + '</b>';
            cChart1.xAxis.labels.rotation = -45;
        }
        if (STAT.S[cI[j]].SPIELE[stDetTurCupGes[pKolonne]]) {
            d60TP = Math.round(STAT.S[cI[j]].PUNKTE[stDetTurCupGes[pKolonne]] * 60 / STAT.S[cI[j]].SPIELE[stDetTurCupGes[pKolonne]]);
            CupPunkte = Math.round(getCupPunkte(cI[j], stDetTurCupGes[pKolonne]));
            if (d60TP < 0) {
                cChart1.series[0].data[ii] = d60TP;
                cChart1.series[1].data[ii] = null;
                cChart1.series[2].data[ii] = null;
                if (cChart1.yAxis.min > d60TP) {
                    cChart1.yAxis.min = d60TP;
                }
            } else {
                cChart1.series[0].data[ii] = null;
                if (CupPunkte > 0) {
                    cChart1.series[2].data[ii] = CupPunkte;
                } else {
                    cChart1.series[2].data[ii] = null;
                }
                if (d60TP > CupPunkte) {
                    cChart1.series[1].data[ii] = (d60TP - CupPunkte);
                } else {
                    cChart1.series[1].data[ii] = null;
                }
            }
        } else {
            cChart1.series[0].data[ii] = null;
            cChart1.series[1].data[ii] = null;
            cChart1.series[2].data[ii] = null;
        }
    }
    ;

    $('#dContainer' + pKolonne).attr('style', 'height: ' + (hBreite) + 'px; width: 100%; margin: 0 auto;');

    setTimeout(function () {
        $('#dContainer' + pKolonne).highcharts(cChart1);
        setTimeout(function () {
            $('#dText' + pKolonne).html(htmlText(pKolonne)).trigger('create');
            $('#dFiller').remove();
        }, 1000);
    }, 200);
}

function statDiagramm() {
    'use strict';
    var sKey = '';
    var d60TP = 0;
    var CupPunkte = 0;
    var cChart = new Object();
    cChart.credits = {enabled: false};
    cChart.chart = {type: 'bar', marginRight: -10};
    cChart.title = {text: null};
    cChart.colors = ['#a9a9a9', '#ee3322'];
    cChart.xAxis = {categories: [], labels: {useHTML: true, style: {fontSize: '20px', fontFamily: 'Verdana, sans-serif'},
            formatter: function () {
                for (var j = 0, eoa = SORT.length; j < eoa; j++) {
                    var i = parseInt(SORT[j].substring((SORT[j].lastIndexOf(';') + 1)));
                    if (this.value === getName(i)) {
                        return '<a onclick="showDetailStat(' + j + ');">' + this.value + '</a>';
                    }
                }
                ;

            }
        }};
    cChart.yAxis = {min: 0, title: {text: null}, labels: {enabled: false}};
    cChart.plotOptions = {series: {stacking: 'normal', ygrouping: false, groupZPadding: 2, pointPadding: 0.001,
            dataLabels: {enabled: true, style: {fontSize: '22px', fontFamily: 'Verdana, sans-serif'}}
        }
    };

    cChart.series = [{}];
    cChart.series[0] = {name: 'Abz&uuml;ge', data: []};
    cChart.series[1] = {name: 'D60-Cuppunkte', data: []};

    cChart.tooltip = {style: {fontSize: '20px', fontFamily: 'Verdana, sans-serif'},
        enabled: true,
        formatter: function () {
            var ii = 0;
            for (var j = 0, eoa = SORT.length; j < eoa; j++) {
                var i = parseInt(SORT[j].substring((SORT[j].lastIndexOf(';') + 1)));
                if (this.x === getName(i)) {
                    ii = i;
                }
            }
            ;
            var hJeSpiel = Math.round(STAT.S[ii].PUNKTE[stTurCupGes] / STAT.S[ii].SPIELE[stTurCupGes] * 100) / 100;
            var hJeSpielL = parseInt(hJeSpiel);
            var hJeSpielR = Math.abs(parseInt((hJeSpiel - hJeSpielL) * 100));
            return  '<b>' + getName(ii, 99) + ':</b><br>'
                    + "<table data-role=table><tbody>"
                    + "<tr><td style='text-align: right'>" + STAT.S[ii].SPIELE[stTurCupGes] + "</td><td>&nbsp;Spiele&nbsp&nbsp;</td><td style='text-align: right'>" + STAT.S[ii].PUNKTE[stTurCupGes] + "</td><td>&nbsp;Punkte</td><tr>"
                    + "<tr><td style='text-align: right'> 1</td><td>&nbsp;Spiel </td><td style='text-align: right'>" + hJeSpielL + "</td><td>," + hJeSpielR + "&nbsp;Punkte</td><tr>"
                    + "<tr><td style='text-align: right'>60</td><td>&nbsp;Spiele</td><th style='text-align: right'>" + Math.round(60 * STAT.S[ii].PUNKTE[stTurCupGes] / STAT.S[ii].SPIELE[stTurCupGes]) + "</th><th>&nbsp;D60-Punkte</th><tr>"
                    + "</tbody></table>";
        },
//            shared: true,
        backgroundColor: '#ffe',
        useHTML: true
    };

    cChart.legend = {
        reversed: true,
        useHTML: true,
        itemStyle: {color: '#000000', fontSize: '18px', fontFamily: 'Verdana, sans-serif'}
    };

    SORT = [];
    for (var i = 0, eoa = STAT.S.length; i < eoa; i++) {
        if (STAT.S[i].SPIELE[stTurCupGes] > 0) {
            if (STAT.S[i].SPIELE[stTurCupGes] >= (STAT.MAXSPIELE[stTurCupGes] * CUPS.DISPAB[stCup][stTurCupGes] / 100)
                    || stGelegenheitsspieler) {

                if (STAT.S[i].PUNKTE[stTurCupGes] >= 0) {
                    sKey = getCupPunkte(i);
                    if (parseInt(sKey) === 0) {
                        sKey = STAT.S[i].PUNKTE[stTurCupGes] * 60 / STAT.S[i].SPIELE[stTurCupGes];
                    } else {
                        sKey = sKey * 1000;
                    }
                    if (stSort.indexOf('TIS') === 0) {
                        if (CUPS.SWNAME[stCup] === 'NV') {
                            sKey = STAT.S[i].SCHREIBER[0] + ',' + STAT.S[i].NNAME + ' ' + STAT.S[i].VNAME + ';' + i;
                        } else {
                            sKey = STAT.S[i].SCHREIBER[0] + ',' + STAT.S[i].VNAME + ' ' + STAT.S[i].NNAME + ';' + i;
                        }
                    } else {
                        sKey = (50000000000 - parseInt(sKey * 100)) + ',' + getName(i, 99) + ';' + i;
                    }
                    if (STAT.S[i].NR === '0000') {
                        sKey = '00000000000;' + i;
                    }
                    SORT[SORT.length] = sKey
                }
            }
        }
    }
    ;

    SORT.sort();

    var ii = -1;
    var iH = 0;
    cI = [];
    aDET = [];
    for (var j = 0, eoa = SORT.length; j < eoa; j++) {
        var i = parseInt(SORT[j].substring((SORT[j].lastIndexOf(';') + 1)));
        aDET[aDET.length] = i;

        if (STAT.S[i].NR !== '0000') {
            ii++;
            iH++;
            if (iH === 1) {
                cI[1] = i;
            } else if (iH === 2) {
                cI[2] = i;
            } else if (iH === 3) {
                cI[3] = i;
            }
            cChart.xAxis.categories[ii] = getName(i);
            d60TP = Math.round(STAT.S[i].PUNKTE[stTurCupGes] * 60 / STAT.S[i].SPIELE[stTurCupGes]);
            CupPunkte = Math.round(getCupPunkte(i));
            if (CupPunkte > 0) {
                cChart.series[1].data[ii] = CupPunkte;
            } else {
                cChart.series[1].data[ii] = null;
            }
            if (d60TP > CupPunkte) {
                cChart.series[0].data[ii] = (d60TP - CupPunkte);
            } else {
                if (d60TP === 0) {
                    cChart.series[0].data[ii] = 0;
                } else {
                    cChart.series[0].data[ii] = null;
                }
            }
        }
    }
    ;

    html = getHilfeText() + "<div id='diagramm' style='height: " + ((ii + 2) * 60) + "px; width: 100%; margin: 0 auto;'></div>";
    $('#SP1').html(html).trigger('create');
    $("#SP1 .ui-btn").attr('style', 'padding:' + (LS.Padding / 10) + 'em 0em;font-size:22px;text-decoration:none;');
    html = '';

    $('#diagramm').highcharts(cChart);

}