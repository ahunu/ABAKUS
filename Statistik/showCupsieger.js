
/* global STAT, stSaison, stFilter, jbSpieler, SAISON, isFinale, isAnzTurniere, isSaison */

function showCupsieger() {

    if (QUERFORMAT()) {
        if (lastBtn) {
            $(lastBtn).removeClass('ui-btn-active');
        }
        lastBtn = '#bCupsieger';
        $(lastBtn).addClass('ui-btn-active');
    }

    stFotoCount = 0;

    if (jbSpieler.isOpen) {
        jbSpieler.close();
    }
    $("#dCopyright").hide();

    stStat = 'Cupchronik';
    writeCanvas(stStat);

    var html = '';
    var nTurniere = 0;

    for (var iSaison = 1; iSaison < SAISON.length; iSaison++) {
        if (SAISON[iSaison][isAnzTurniere]) {
            if ((iSaison === 1 && SAISON[1][isFinale])
                    || iSaison > 1) {

                nTurniere++;

                html += '<div class="llf_row XL">'
                        + '<div class="llf_center llf_titel B C">' + SAISON[iSaison][isSaison] + '</div>'
                        + '</div>'

                        + (STAT[SAISON[iSaison][isFinale]]._CUPFOTOS // Cupsiegerfoto
                                ? '<div class="llf_row XL">'
                                + '<div class="llf_left">'
                                + getHtmlPhoto(STAT[SAISON[iSaison][isFinale]]._CUPFOTOS)
                                + '</div>'

                                + '<div class="llf_right ss-large-mag M3">'

                                + "<table class='table ui-responsive' data-column-btn-text=''><tbody>"

                                + '<tr>'
                                + '<td></td>'
                                + '<td></td>'
                                + '<td class="TR B XXS">Cup-<br>punkte</td>'
                                + '<td class="TC B XXS"><br>1.2.3.</td>'
                                + '</tr>'

                                + '<tr>'
                                + '<td></td>'
                                + '<td>' + '1. <span onclick="event.stopPropagation();popupSpieler(\'' + SAISON[iSaison][is1] + '\',\'' + SAISON[iSaison][isSaison] + '\');" class="P cBlau"><b>' + (getSpielerName(SAISON[iSaison][is1]).replace(' ', '&nbsp;')) + '</b></span></td>'
                                + '<td class="TR">' + SP[SAISON[iSaison][is1]][iSaison][spCuppunkte] + '&nbsp;</td>'
                                + '<td class="TC">' + SP[SAISON[iSaison][is1]][iSaison][spBestePlatz] + '</td>'
                                + '</tr>'

                                + '<tr>'
                                + '<td></td>'
                                + '<td>' + '2. <span onclick="event.stopPropagation();popupSpieler(\'' + SAISON[iSaison][is2] + '\',\'' + SAISON[iSaison][isSaison] + '\');" class="P cBlau">' + (getSpielerName(SAISON[iSaison][is2]).replace(' ', '&nbsp;')) + '</span></td>'
                                + '<td class="TR">' + SP[SAISON[iSaison][is2]][iSaison][spCuppunkte] + '&nbsp;</td>'
                                + '<td class="TC">' + SP[SAISON[iSaison][is2]][iSaison][spBestePlatz] + '</td>'
                                + '</tr>'

                                + '<tr>'
                                + '<td></td>'
                                + '<td>' + '3. <span onclick="event.stopPropagation();popupSpieler(\'' + SAISON[iSaison][is3] + '\',\'' + SAISON[iSaison][isSaison] + '\');" class="P cBlau">' + (getSpielerName(SAISON[iSaison][is3]).replace(' ', '&nbsp;')) + '</span></td>'
                                + '<td class="TR">' + SP[SAISON[iSaison][is3]][iSaison][spCuppunkte] + '&nbsp;</td>'
                                + '<td class="TC">' + SP[SAISON[iSaison][is3]][iSaison][spBestePlatz] + '</td>'
                                + '</tr></tbody></table>'

                                + '<br>'
                                + '</div>'
                                + '</div>'

                                : ''
                                )



                        + (!STAT[SAISON[iSaison][isFinale]]._CUPFOTOS // Kein Foto
                                ? '<div class=llf_row><div class="llf_center M3" style="text-align:justify;">'
                                + "<table class='table ui-responsive' data-column-btn-text=''><tbody>"

                                + '<tr>'
                                + '<td></td>'
                                + '<td></td>'
                                + (QUERFORMAT() ? '<td></td>' : '')
                                + '<td class="TR B XXS">Cup-<br>punkte</td>'
                                + '<td class="TC B XXS"><br>1.2.3.</td>'
                                + (QUERFORMAT() ? '<td class="TR B XXS"><br>TN</td><td>&nbsp;</td>' : '')
                                + '</tr>'

                                + '<tr>'
                                + '<td></td>'
                                + '<td>' + '1. <span onclick="event.stopPropagation();popupSpieler(\'' + SAISON[iSaison][is1] + '\',\'' + SAISON[iSaison][isSaison] + '\');" class="P cBlau"><b>' + (getSpielerName(SAISON[iSaison][is1]).replace(' ', '&nbsp;')) + '</b></span></td>'
                                + (QUERFORMAT() ? '<td>' + getSpielerOrt(SAISON[iSaison][is1]) + '</td>' : '')
                                + '<td class="TR">' + SP[SAISON[iSaison][is1]][iSaison][spCuppunkte] + '&nbsp;</td>'
                                + '<td class="TC">' + SP[SAISON[iSaison][is1]][iSaison][spBestePlatz] + '</td>'
                                + (QUERFORMAT() ? '<td class="TR">' + SP[SAISON[iSaison][is1]][iSaison][spTeilnahmen] + '</td><td>&nbsp;</td>' : '')
                                + '</tr>'

                                + '<tr>'
                                + '<td></td>'
                                + '<td>' + '2. <span onclick="event.stopPropagation();popupSpieler(\'' + SAISON[iSaison][is2] + '\',\'' + SAISON[iSaison][isSaison] + '\');" class="P cBlau">' + (getSpielerName(SAISON[iSaison][is2]).replace(' ', '&nbsp;')) + '</span></td>'
                                + (QUERFORMAT() ? '<td>' + getSpielerOrt(SAISON[iSaison][is2]) + '</td>' : '')
                                + '<td class="TR">' + SP[SAISON[iSaison][is2]][iSaison][spCuppunkte] + '&nbsp;</td>'
                                + '<td class="TC">' + SP[SAISON[iSaison][is2]][iSaison][spBestePlatz] + '</td>'
                                + (QUERFORMAT() ? '<td class="TR">' + SP[SAISON[iSaison][is2]][iSaison][spTeilnahmen] + '</td><td>&nbsp;</td>' : '')
                                + '</tr>'

                                + '<tr>'
                                + '<td></td>'
                                + '<td>' + '3. <span onclick="event.stopPropagation();popupSpieler(\'' + SAISON[iSaison][is3] + '\',\'' + SAISON[iSaison][isSaison] + '\');" class="P cBlau">' + (getSpielerName(SAISON[iSaison][is3]).replace(' ', '&nbsp;')) + '</span></td>'
                                + (QUERFORMAT() ? '<td>' + getSpielerOrt(SAISON[iSaison][is3]) + '</td>' : '')
                                + '<td class="TR">' + SP[SAISON[iSaison][is3]][iSaison][spCuppunkte] + '&nbsp;</td>'
                                + '<td class="TC">' + SP[SAISON[iSaison][is3]][iSaison][spBestePlatz] + '</td>'
                                + (QUERFORMAT() ? '<td class="TR">' + SP[SAISON[iSaison][is3]][iSaison][spTeilnahmen] + '</td><td>&nbsp;</td>' : '')
                                + '</tr></tbody></table>'

                                + '</div></div>'
                                : ''
                                )

                        + (STAT[SAISON[iSaison][isFinale]]._CUPANEKDOTE
                                ? '<div class=llf_row><div class="llf_center M3" style="text-align:justify;">' + STAT[SAISON[iSaison][isFinale]]._CUPANEKDOTE + '</div></div>'
                                : ''
                                );
            }
        }
    }

    html = '<div>'
            + '<div id="llf_container">'
            + html
            + '<div class="llf_row">'
            + '<div class="llf_footer XXS" style="color: #888;padding: 5vh 0 0 28vw;">&nbsp;<br>&copy; 2015-2019 by Leo Luger</div>'
            + '</div>'
            + '</div></div>';

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


    if (new Date().getHours() < 15) {

        var $sidescroll = (function () {

            // the row elements
            var $rows = $('#llf_container > div.llf_row'),
                    // we will cache the inviewport rows and the outside viewport rows
                    $rowsViewport, $rowsOutViewport,
                    // the window element
                    $win = $(window),
                    // we will store the window sizes here
                    winSize = {},
                    // used in the scroll setTimeout function
                    anim = false,
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
                                    $rowL = $row.find('div.llf_left'),
                                    // the right side element
                                    $rowR = $row.find('div.llf_right'),
                                    // the center element
                                    $rowC = $row.find('div.llf_center'),
                                    // top value
                                    rowT = $row.offset().top;
                            // hide the row if it is under the viewport
                            if (rowT > winSize.height + winscroll) {
                                $rowL.css({left: '-50%'});
                                $rowR.css({right: '-50%'});

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

                                if (val <= 0) {
                                    $row.find('.llf_left, .llf_right, .llf_center').css({position: 'static'});
                                } else {
                                    $row.find('.llf_left, .llf_right, .llf_center').css({position: 'relative'});
                                }

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