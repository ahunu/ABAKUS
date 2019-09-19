
/* global STAT, stSaison, stFilter */

function showChronik(pTurnier) {

    if (QUERFORMAT()) {
        if (lastBtn) {
            $(lastBtn).removeClass('ui-btn-active');
        }
        lastBtn = '#bChronik';
        $(lastBtn).addClass('ui-btn-active');
    }

    if (jbSpieler.isOpen) {
        jbSpieler.close();
    }
    $("#dCopyright").hide();

    stStat = 'Chronik';

    if (pTurnier) {
        writeCanvas('Vivat Valat!');
    } else if (CUPS.TYP[stCup] === 'MT') {
        writeCanvas('Chronik');
    } else {
        writeCanvas('Chronik ' + stSaison);
    }

    var html = '';
    var nTurniere = 0;
    var foto = ['fotos/15.jpg', 'fotos/16.jpg', 'fotos/17.jpg', 'fotos/18.jpg', 'fotos/19.jpg', 'fotos/20.jpg', 'fotos/21.jpg', 'fotos/22.jpg', 'fotos/23.jpg', 'fotos/24.jpg', 'fotos/25.jpg', 'fotos/26.jpg', 'fotos/27.jpg', 'fotos/28.jpg', 'fotos/29.jpg', 'fotos/30.jpg'];
    var hSize = ['large', 'medium', 'small'];

    if (pTurnier) {
        nTurniere++;
        html = '<div id="r' + pTurnier + '" class="ss-row XL">'
                + '<div class="ss-left foto-titel">' + pTurnier + '</div>'
                + '<div class="ss-right foto-titel B">' + STAT[pTurnier]._NAME + '</div>'
                + '</div>' // + html;

                + '<div class="ss-row ss-' + hSize[(nTurniere - 1) % 3] + ' XL">'
                + '<div class="ss-left">'
                + '<a href="#" class="ss-circle" style="background-image: url(' + foto[nTurniere % 10] + ')"></a>'
                + '</div>'
                + '<div class="ss-right ss-' + hSize[(nTurniere - 1) % 3] + '-mag M3">'
                + (STAT[pTurnier]._STOCKERL
                        ? '<div>1. <span onclick="event.stopPropagation();popupSpieler(\'' + STAT[pTurnier]._STOCKERL[1] + '\');" class="P cBlau">' + getSpielerName(STAT[pTurnier]._STOCKERL[1]) + '</span>, ' + STAT[pTurnier][STAT[pTurnier]._STOCKERL[1]][4] + ' Punkte</div>'
                        + '<div>2. <span onclick="event.stopPropagation();popupSpieler(\'' + STAT[pTurnier]._STOCKERL[2] + '\');" class="P cBlau">' + getSpielerName(STAT[pTurnier]._STOCKERL[2]) + '</span>, ' + STAT[pTurnier][STAT[pTurnier]._STOCKERL[2]][4] + ' Punkte</div>'
                        + '<div>3. <span onclick="event.stopPropagation();popupSpieler(\'' + STAT[pTurnier]._STOCKERL[3] + '\');" class="P cBlau">' + getSpielerName(STAT[pTurnier]._STOCKERL[3]) + '</span>, ' + STAT[pTurnier][STAT[pTurnier]._STOCKERL[3]][4] + ' Punkte</div>'
                        : ''
                        )
                + '<br>'
                + '</div>'
                + '</div>'
                + (STAT[pTurnier]._ANEKDOTE
                        ? '<div class=ss-row><div class="ss-center M3" style="text-align:justify;">' + STAT[pTurnier]._ANEKDOTE + '</div></div>'
                        : ''
                        )
                + html;
    } else {
        for (var turnier in STAT) {
            if (turnier[0] === '2') {
                if (STAT[turnier]._SAISON === stSaison) {
                    if (!stFilter || STAT[turnier]._NAME.toUpperCase().indexOf(stFilter) >= 0) {
                        nTurniere++;
                        html = '<div id="r' + turnier + '" class="ss-row XL">'
                                + '<div class="ss-left foto-titel">' + turnier + '</div>'
                                + '<div class="ss-right foto-titel B">' + STAT[turnier]._NAME + '</div>'
                                + '</div>' // + html;

                                + '<div class="ss-row ss-' + hSize[(nTurniere - 1) % 3] + ' XL">'
                                + '<div class="ss-left">'
                                + '<a href="#" class="ss-circle" style="background-image: url(' + foto[nTurniere % 10] + ')"></a>'
                                + '</div>'
                                + '<div class="ss-right ss-' + hSize[(nTurniere - 1) % 3] + '-mag M3">'
                                + (STAT[turnier]._STOCKERL
                                        ? '<div>1. <span onclick="event.stopPropagation();popupSpieler(\'' + STAT[turnier]._STOCKERL[1] + '\');" class="P cBlau">' + getSpielerName(STAT[turnier]._STOCKERL[1]) + '</span>, ' + STAT[turnier][STAT[turnier]._STOCKERL[1]][4] + ' Punkte</div>'
                                        + '<div>2. <span onclick="event.stopPropagation();popupSpieler(\'' + STAT[turnier]._STOCKERL[2] + '\');" class="P cBlau">' + getSpielerName(STAT[turnier]._STOCKERL[2]) + '</span>, ' + STAT[turnier][STAT[turnier]._STOCKERL[2]][4] + ' Punkte</div>'
                                        + '<div>3. <span onclick="event.stopPropagation();popupSpieler(\'' + STAT[turnier]._STOCKERL[3] + '\');" class="P cBlau">' + getSpielerName(STAT[turnier]._STOCKERL[3]) + '</span>, ' + STAT[turnier][STAT[turnier]._STOCKERL[3]][4] + ' Punkte</div>'
                                        : ''
                                        )
                                + '<br>'
                                + '</div>'
                                + '</div>'
                                + (STAT[turnier]._ANEKDOTE
                                        ? '<div class=ss-row><div class="ss-center M3" style="text-align:justify;">' + STAT[turnier]._ANEKDOTE + '</div></div>'
                                        : ''
                                        )
                                + html;
                    }
                }
            }
        }
    }

    if (!pTurnier) {
        html = '<div>'
                + '<div id="ss-container" class="ss-container">'
                + html
                + '</div></div>';
    }

    if (QUERFORMAT()) {
        var hx = $(window).innerHeight() - $('#qfHeader').height();
        html = '<div style="margin-top: -0px; height: ' + hx + 'px;">'
                + html
                + '</div>';
        $('#dRumpf').html(html).css('margin-top', $('#qfHeader').height() + 'px');

    } else {
        $('#dContent').html(html);
    }
    $("#dCopyright").hide();

    if (!pTurnier) {

        var $sidescroll = (function () {

            // the row elements
            var $rows = $('#ss-container > div.ss-row'),
                    // we will cache the inviewport rows and the outside viewport rows
                    $rowsViewport, $rowsOutViewport,
                    // navigation menu links
                    $links = $('#ss-links > a'),
                    // the window element
                    $win = $(window),
                    // we will store the window sizes here
                    winSize = {},
                    // used in the scroll setTimeout function
                    anim = false,
                    // page scroll speed
                    scollPageSpeed = 2000,
                    // page scroll easing
                    scollPageEasing = 'easeInOutExpo',
                    // initialize function
                    init = function () {
                        // get window sizes
                        getWinSize();
                        // initialize events
                        initEvents();
                        // define the inviewport selector
                        defineViewport();
                        // gets the elements that match the previous selector
                        setViewportRows();
                        // show the pointers for the inviewport rows
//                        $rowsViewport.find('a.ss-circle').addClass('ss-circle-deco');
                        // set positions for each row
                        placeRows();
                    },
                    // defines a selector that gathers the row elems that are initially visible.
                    // the element is visible if its top is less than the window's height.
                    // these elements will not be affected when scrolling the page.
                    defineViewport = function () {
                        $.extend($.expr[':'], {
                            inviewport: function (el) {
                                if ($(el).offset().top < winSize.height) {
                                    return true;
                                }
                                return false;
                            }
                        });
                    },
                    // checks which rows are initially visible
                    setViewportRows = function () {
                        $rowsViewport = $rows.filter(':inviewport');
                        $rowsOutViewport = $rows.not($rowsViewport);
                    },
                    // get window sizes
                    getWinSize = function () {
                        winSize.width = $win.width();
                        winSize.height = $win.height();
                    },
                    // initialize some events
                    initEvents = function () {

                        // navigation menu links.
                        // scroll to the respective section.
                        $links.on('click.Scrolling', function (event) {

                            // scroll to the element that has id = menu's href
                            $('html, body').stop().animate({
                                scrollTop: $($(this).attr('href')).offset().top
                            }, scollPageSpeed, scollPageEasing);
                            return false;
                        });
                        $(window).on({
                            // when scrolling the page change the position of each row
                            'scroll.Scrolling': function (event) {

                                // set a timeout to avoid that the
                                // placeRows function gets called on every scroll trigger
                                if (anim)
                                    return false;
                                anim = true;
                                setTimeout(function () {

                                    placeRows();
                                    anim = false;
                                }, 10);
                            }
                        });
                    },
                    // sets the position of the rows (left and right row elements).
                    // Both of these elements will start with -50% for the left/right (not visible)
                    // and this value should be 0% (final position) when the element is on the
                    // center of the window.
                    placeRows = function () {

                        // how much we scrolled so far
                        var winscroll = $win.scrollTop(),
                                // the y value for the center of the screen
                                winCenter = winSize.height / 1.5 + winscroll;
                        // for every row that is not inviewport
                        $rowsOutViewport.each(function (i) {

                            var $row = $(this),
                                    // the left side element
                                    $rowL = $row.find('div.ss-left'),
                                    // the right side element
                                    $rowR = $row.find('div.ss-right'),
                                    // the center element
                                    $rowC = $row.find('div.ss-center'),
                                    // top value
                                    rowT = $row.offset().top;
                            // hide the row if it is under the viewport
                            if (rowT > winSize.height + winscroll) {
                                $rowL.css({left: '-50%'});
                                $rowR.css({right: '-50%'});
//                            $rowC.css({right: '-50%'});
                            }
                            // if not, the row should become visible (0% of left/right) as it gets closer to the center of the screen.
                            else {

                                // row's height
                                var rowH = $row.height(),
                                        // the value on each scrolling step will be proporcional to the distance from the center of the screen to its height
                                        factor = (((rowT + rowH / 2) - winCenter) / (winSize.height / 2 + rowH / 2)),
                                        // value for the left / right of each side of the row.
                                        // 0% is the limit
                                        val = Math.max(factor * 40, 0);

                                // set calculated values
                                $rowL.css({left: -val + '%'});
                                $rowR.css({right: -val + '%'});
                                $rowC.css({right: -val * 2 + '%'});

                            }

                        });
                    };
            return {init: init};
        })();
        $sidescroll.init();
    }

}