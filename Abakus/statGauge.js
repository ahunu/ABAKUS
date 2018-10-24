
function showGauge(pSpiele, pEigGewonnen, pEigVerloren, pAnz, pKolonne) {

    var hHoehe = 0;
    var hFont = '';
    if (QUERFORMAT()) {
        if (stAnzSpalten <= 2) {
            hHoehe = $(window).innerWidth() * 0.4 * 0.367;
            hFont = "1.5vw";
        } else {
            hHoehe = $(window).innerWidth() * 0.3 * 0.367;
            hFont = "1.5vw";
        }
    } else {
        hHoehe = $(window).innerWidth() * 0.367;
        hFont = "5vw";
    }

    var gaugeOptions = {

        chart: {
            type: 'solidgauge',
            backgroundColor: '#fafafa',
            spacingTop: 40,
            spacingBottom: 0
        },

        title: null,

        pane: {
            center: ['50%', '90%'],
            size: '140%',
            startAngle: -90,
            endAngle: 90,
            background: {
                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
                innerRadius: '60%',
                outerRadius: '100%',
                shape: 'arc'
            }
        },

        tooltip: {
            enabled: false
        },

        // the value axis
        yAxis: {
            lineWidth: 0,
            minorTickInterval: null,
            tickPixelInterval: 400,
            tickWidth: 0,
            title: {
                y: (hHoehe * -0.47)
            },
            labels: {
                enabled: false
            }
        },

        credits: {
            enabled: false
        },

        plotOptions: {
            solidgauge: {
                animation: false,
                dataLabels: {
                    y: 5,
                    borderWidth: 0,
                    useHTML: true
                }
            }
        }
    };

    setTimeout(function () {
        $('#container-ges' + pKolonne).highcharts(Highcharts.merge(gaugeOptions, {
            yAxis: {
                min: 0,
                max: 100,
                title: {text: 'Spiele gespielt: <b>' + pSpiele + '</b>'
                            + '<br>eigene Spiele: <b>' + (pEigGewonnen + pEigVerloren) + '</b>',
                    style: {"color": "#333333", "fontSize": hFont}
                }
            },

            series: [{
                    name: 'Speed',
                    data: [Math.round((pEigGewonnen + pEigVerloren) / (pSpiele / 100))],
                    dataLabels: {
                        format: '<div style="text-align:center"><span class="M">{y} %</span>'
                    }
                }],

            colors: ['#ee3322']

        }));
    }, hWait);

    setTimeout(function () {
        $('#container-gew' + pKolonne).highcharts(Highcharts.merge(gaugeOptions, {
            yAxis: {
                min: 0,
                max: 100,
                title: {text: ' <br>davon gew.: <b>' + pEigGewonnen + '</b>',
                    style: {"color": "#333333", "fontSize": hFont}
                }
            },

            series: [{
                    name: 'RPM',
                    data: [Math.round(pEigGewonnen / ((pEigGewonnen + pEigVerloren) / 100))],
                    dataLabels: {
                        format: '<div style="text-align:center"><span class="M">{y} %</span>'
                    }
                }],

            colors: ['#282']

        }));
    }, hWait);


    pAnz[0] = pAnz[1] + pAnz[2] + pAnz[3] + pAnz[4];

    if (pAnz[0]) {

        pAnz[1] = Math.round(pAnz[1] / (pAnz[0] / 100));
        pAnz[2] = Math.round(pAnz[2] / (pAnz[0] / 100));
        pAnz[3] = Math.round(pAnz[3] / (pAnz[0] / 100));
        pAnz[4] = Math.round(pAnz[4] / (pAnz[0] / 100));

        var tSpiel = [, '3er', 'Rufer', 'Farbspiele', 'Negativspiele'];
        var tFarbe = [, '#ee3322', '#aaa', '#daa520', '#008b8b'];
        var hOK = false;
        var h = '';
        while (!hOK) {
            hOK = true;
            for (var ii = 1; ii <= 3; ii++) {
                if (pAnz[ii] < pAnz[ii + 1]) {
                    h = pAnz[ii];
                    pAnz[ii] = pAnz[ii + 1];
                    pAnz[ii + 1] = h;
                    h = tSpiel[ii];
                    tSpiel[ii] = tSpiel[ii + 1];
                    tSpiel[ii + 1] = h;
                    h = tFarbe[ii];
                    tFarbe[ii] = tFarbe[ii + 1];
                    tFarbe[ii + 1] = h;
                    hOK = false;
                }
            }
        }

        var hChart = {
            chart: {
                type: 'pyramid',
                marginRight: 180,
                backgroundColor: '#fafafa',
                spacingLeft: 0
            },
            title: null,
            credits: {
                enabled: false
            },
            colors: ['#ee3322', '#aaa', '#daa520', '#008b8b'],
            plotOptions: {
                series: {
                    dataLabels: {
                        enabled: true,
                        useHTML: true,
                        format: '<span style="font-size: ' + hFont + '">{point.y:,.0f} %&nbsp;&nbsp;</span><span style="font-size: ' + hFont + '; font-weight: normal"> {point.name}</span>'
                    }
                }
            },
            legend: {
                enabled: false
            },
            series: [{
                    name: 'Spiele',
                    data: [
                        [tSpiel[1], pAnz[1]],
                        [tSpiel[2], pAnz[2]],
                        [tSpiel[3], pAnz[3]],
                        [tSpiel[4], pAnz[4]]
                    ]
                }]
        };

        for (var ii = 5; ii > 0; ii--) {
            if (!pAnz[ii]) {
                hChart.series[0].data.splice(ii - 1, 1);
            }
            hChart.colors[ii - 1] = tFarbe[ii];
        }

        setTimeout(function () {
            var hHoehe = $('#container-pyramid' + pKolonne).height();
            var hBreite = $('#container-pyramid' + pKolonne).width();
            if (hBreite < 10) {
//                hBreite = hHoehe;  // ??????????????
            }
            if (QUERFORMAT() && typeof stAktSpalten === 'number') {
                hChart.chart.marginRight = hBreite / (11 + (stAktSpalten * 2)) + (hBreite / 2);
                hChart.chart.marginLeft = hBreite / (11 + (stAktSpalten * 2));
            } else {
                hChart.chart.marginRight = hBreite / 23 + (hBreite / 2);
                hChart.chart.marginLeft = hBreite / 23;
            }
            $('#container-pyramid' + pKolonne).highcharts(hChart);
        }, hWait);
    }
    hWait = 0;
}