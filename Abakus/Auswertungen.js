
/* global eigGewonnen, eigVerloren, prozGespielt, prozGewonnen, LS, DS */

function showUebersicht() {
    'use strict';
    Seite = 'LI';
    var html = "<div id='dContainer'></div>"
            + "<a class='ui-btn ui-icon-gear  ui-corner-all' data-theme='d' onclick='showSchreibzettel();'>Schreibzettel</a>"
            + "<a class='ui-btn ui-icon-audio ui-corner-all' data-theme='d' onclick='showChronik(true);'>Chronik</a>"
            + "<a class='ui-btn ui-icon-edit  ui-corner-all' data-theme='d' onclick='showDetails(true);'>Details</a>";

    $('#LIste').html(html).trigger('create').show();

    if (LS.AnzSpieler === 4) {
        setFont(1.3);
    } else if (LS.AnzSpieler === 5) {
        setFont(1);
    } else {
        setFont(0.9);
    }

    showChart();

    $('html, body').animate({
        scrollTop: $("#LIste").offset().top
    });
}

function showChart() {
    'use strict';

    if (QUERFORMAT()) {
        var hBreite = $(window).innerWidth() / 3;
    } else {
        var hBreite = $(window).innerWidth();
    }

    var cChart = new Object();
    cChart.spacingBottom = 0;
    cChart.spacingTop = 0;
    cChart.spacingRight = 10;
    cChart.credits = {enabled: false};
    cChart.chart = {type: 'column', spacing: [0, 0, 0, 0], marginLeft: 20, marginRight: -18,
        options3d: {enabled: true, alpha: 15, beta: 15, depth: 110},
        backgroundColor: '#fafafa'
    };
    cChart.title = {text: null};
    cChart.colors = ['#ee3322', '#228822'];
    cChart.xAxis = {categories: [], labels: {style: {fontSize: (28 - (LS.AnzSpieler * 2)) + 'px', fontFamily: 'Verdana, sans-serif', color: '#000'},
            useHTML: true,
            rotation: -45
        }};
    cChart.yAxis = {min: 0, max: 10,
        title: {x: -10, text: "% sseigene Spiele", style: {color: '#444', fontSize: '20px', fontFamily: 'Verdana, sans-serif'}},
        labels: {enabled: false},
        alternateGridColor: '#ffd'};
    cChart.plotOptions = {column: {dataLabels: {enabled: true, formatter: function () {
                    if (this.y >= 10) {
                        return this.y + ' %';
                    } else {
                        return this.y;
                    }
                }, y: 10, align: 'right', rotation: -90, style: {color: '#eee', fontSize: '20px', fontFamily: 'Verdana, sans-serif'}}}};
    cChart.series = [{name: '% eigeness Spiele', data: []}];
    cChart.plotOptions.column.depth = hBreite / (1 + LS.AnzSpieler);

    if (QUERFORMAT()) {
        cChart.legend = {x: -2000};
    } else {
        cChart.legend = {enabled: false};
    }

    cChart.tooltip = {style: {fontSize: '20px', fontFamily: 'Verdana, sans-serif'},
        enabled: true,
        formatter: function () {
            var ii = 0;
            var hName = this.x.replace(/<b>/g, "");
            if (hName.indexOf('</b>') > 0) {
                hName = hName.substr(0, hName.indexOf('</b>'))
            }
            for (var j = 1; j <= LS.AnzSpieler; j++) {
                if (hName === LS.Spieler[j]) {
                    ii = j;
                }
            }
            return  '<b>' + hName + ':</b><br>'
                    + "<table data-role=table><tbody>"
                    + "<tr><td>gespielt</td><td style='text-align: right'>" + LS.Spiele[ii] + "</td><td style='text-align: right'>&nbsp;Spiele</td><tr>"
                    + "<tr><td>eigene</td><td style='text-align: right'>" + (eigGewonnen[ii] + eigVerloren[ii]) + "</td><th style='text-align: right'>&nbsp;" + prozGespielt[ii] + " %</th><tr>"
                    + "<tr><td>davon gew.&nbsp;</td><td style='text-align: right'>" + eigGewonnen[ii] + "</td><th style='text-align: right'>&nbsp;" + Math.round((eigGewonnen[ii]) / ((eigGewonnen[ii] + eigVerloren[ii]) / 100)) + " %</th><tr>"
                    + "</tbody></table>";
        },
        backgroundColor: '#ffe',
        useHTML: true
    };

    var ii = -1;
    for (var j = 1; j <= LS.AnzSpieler; j++) {

        ii++;
        eigGewonnen[j] = 0;
        eigVerloren[j] = 0;

        for (var iDS = 1; iDS < DS.Game.length; iDS++) {
            if (!DS.Storno[iDS]) {
                if (DS.Spieler[iDS] === j) {
                    if (DS.Punkte[j][iDS] >= 0) {
                        eigGewonnen[j]++;
                    } else {
                        eigVerloren[j]++;
                    }
                }
            }
        }

        if (LS.Spiele[j]) {
            prozGespielt[j] = Math.round((eigGewonnen[j] + eigVerloren[j]) / (LS.Spiele[j] / 100));
            prozGewonnen[j] = Math.round(eigGewonnen[j] / ((eigGewonnen[j] + eigVerloren[j]) / 100));
        } else {
            prozGespielt[j] = 0;
            prozGewonnen[j] = 0;
        }

        if (cChart.yAxis.max < prozGespielt[j]) {
            cChart.yAxis.max = prozGespielt[j];
        }

        cChart.xAxis.categories[ii] = '<b>' + LS.Spieler[j] + '</b>';
        if (eigGewonnen[j] || eigVerloren[j]) {
            cChart.series[0].data[ii] = prozGespielt[j];
        } else {
            cChart.series[0].data[ii] = null;
        }
    }

    $('#dContainer').attr('style', 'height: ' + (hBreite / 1) + 'px; width: ' + (QUERFORMAT() ? 40 : 100) + '%; margin: 0 auto;');

    setTimeout(function () {
        $('#dContainer').highcharts(cChart);
    }, 200);
}