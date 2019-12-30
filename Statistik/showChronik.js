
/* global STAT, stSaison, stFilter, stFotoStyle, stFotoCount, SAISON, isFinale, iSaison, LS, ADMIN, stCup, CUPS, jbSpieler, isAnzTurniere, isAnzTeilnehmer, isAnzTeilnahmen, getSpielerName */

function showChronik(pTurnier) {

    hideEinenTip();

    if (CUPS.TYP[stCup] !== 'CUP') {
        iSaison = 1;
        stSaison === '&nbsp;';
    }
    if (QUERFORMAT()) {
        if (lastBtn) {
            $(lastBtn).removeClass('ui-btn-active');
        }
        if (pTurnier) {
            lastBtn = '#sb' + pTurnier;
        } else {
            lastBtn = '#bChronik';
        }
        $(lastBtn).addClass('ui-btn-active');
    }

    stFotoCount = 0;

    if (jbSpieler.isOpen) {
        jbSpieler.close();
    }
    $("#dCopyright").hide();
    stStat = 'Chronik';
    if (pTurnier) {
        stStat = pTurnier;
        writeCanvas('Vivat Valat!');
        if (ADMIN || LS.ME === '3425') {
            showIcons(['#iEdit']);
        } else {
            showIcons([]);
        }
    } else {
        showIcons([]);
        if (CUPS.TYP[stCup] === 'CUP') {
            writeCanvas('Chronik ' + stSaison);
        } else {
            writeCanvas('Chronik');
        }
    }

    var html = '';
    if (pTurnier) {
        if (IsInteger(pTurnier) && CUPS.TYP[stCup] === 'CUP') {
            html = getCupHtml(pTurnier, SAISON[iSaison][isFinale]) + html;
        } else {
            html = getHtml(pTurnier) + html;
        }
    } else {
        html = '<div class="llf_row">'
                + '<br><div class="llf_footer XXS" style="color: #888;padding: 5vh 0 0 28vw;"><br>&copy; 2015-' + new Date().getFullYear() + ' by Leo Luger</div>'
                + '</div>';
        for (var turnier in STAT) {
            if (turnier[0] === '2') {
                if (STAT[turnier]._SAISON === stSaison || CUPS.TYP[stCup] !== 'CUP') {
                    if (!stFilter || STAT[turnier]._NAME.toUpperCase().indexOf(stFilter) >= 0) {
                        html = getHtml(turnier) + html;
                    }
                }
            }
        }
        if (SAISON[iSaison][isFinale]) {
            html = getCupHtml(iSaison, SAISON[iSaison][isFinale]) + html;
        }
    }

    html = '<div>'
            + '<div id="llf_container" class=S3>'
            + html
            + '</div></div>';
    if (QUERFORMAT()) {
        var hx = $(window).innerHeight() - $('#qfHeader').height();
        html = '<div style="margin-top: -0px; height: ' + hx + 'px;">'
                + html
                + '</div>';
        $('#dRumpf').html(html).css('margin-top', $('#qfHeader').height() + 'px');
    } else {
        $('#sideTurniere').hide();
        $('#dContent').html(html);
        var hx = $(window).innerHeight() - $('#sideContent').offset().top - 1;
        $('#sideContent').css('height', hx + 'px').scrollTop(0);
    }
    $("#dCopyright").hide();

    window.scrollTo(0, 0);

    if (LS.FotoAnimieren && !pTurnier) {

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
                        // show the pointers for the inviewport rows
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


    function getHtml(pTurnier) {
        var html = '<div class="llf_row XL">'
                + '<div class="llf_left llf_titel">' + pTurnier + '</div>'
                + '<div class="llf_right llf_titel B">' + STAT[pTurnier]._NAME + '</div>'
                + '</div>';

        if (!STAT[pTurnier]._FOTOS) {

            html += '<div class="llf_row">'
                    + '<div class="llf_left">'
                    + getHtmlVeranstalter(STAT[pTurnier]._VERANSTALTER)
                    + 'Teilnehmer: ' + STAT[pTurnier]._TEILNEHMER + '<br>'
                    + '</div>'
                    + '<div class="llf_right" style="text-align:justify;padding: -29vh 0 30vh 4%;">'
                    + (STAT[pTurnier]._STOCKERL
                            ? '<div>1. <span onclick="event.stopPropagation();popupSpieler(\'' + STAT[pTurnier]._STOCKERL[1] + '\');" class="P cBlau">' + getSpielerName(STAT[pTurnier]._STOCKERL[1]) + '</span>, ' + STAT[pTurnier][STAT[pTurnier]._STOCKERL[1]][4] + ' Punkte</div>'
                            + '<div>2. <span onclick="event.stopPropagation();popupSpieler(\'' + STAT[pTurnier]._STOCKERL[2] + '\');" class="P cBlau">' + getSpielerName(STAT[pTurnier]._STOCKERL[2]) + '</span>, ' + STAT[pTurnier][STAT[pTurnier]._STOCKERL[2]][4] + ' Punkte</div>'
                            + '<div>3. <span onclick="event.stopPropagation();popupSpieler(\'' + STAT[pTurnier]._STOCKERL[3] + '\');" class="P cBlau">' + getSpielerName(STAT[pTurnier]._STOCKERL[3]) + '</span>, ' + STAT[pTurnier][STAT[pTurnier]._STOCKERL[3]][4] + ' Punkte</div>'
                            : '&nbsp;'
                            )
                    + '</div>'
                    + '</div>';

        } else if (STAT[pTurnier]._FOTOS.length === 1) {

            html += '<div class="llf_row">'
                    + '<div class="llf_left">'
                    + getHtmlPhoto(STAT[pTurnier]._FOTOS[0])
                    + '</div>'
                    + '<div class="llf_right" style="text-align:justify;padding: -29vh 0 30vh 4%;">'
                    + (STAT[pTurnier]._STOCKERL
                            ? '<br><div>1. <span onclick="event.stopPropagation();popupSpieler(\'' + STAT[pTurnier]._STOCKERL[1] + '\');" class="P cBlau">' + getSpielerName(STAT[pTurnier]._STOCKERL[1]) + '</span>, ' + STAT[pTurnier][STAT[pTurnier]._STOCKERL[1]][4] + ' Punkte</div>'
                            + '<div>2. <span onclick="event.stopPropagation();popupSpieler(\'' + STAT[pTurnier]._STOCKERL[2] + '\');" class="P cBlau">' + getSpielerName(STAT[pTurnier]._STOCKERL[2]) + '</span>, ' + STAT[pTurnier][STAT[pTurnier]._STOCKERL[2]][4] + ' Punkte</div>'
                            + '<div>3. <span onclick="event.stopPropagation();popupSpieler(\'' + STAT[pTurnier]._STOCKERL[3] + '\');" class="P cBlau">' + getSpielerName(STAT[pTurnier]._STOCKERL[3]) + '</span>, ' + STAT[pTurnier][STAT[pTurnier]._STOCKERL[3]][4] + ' Punkte</div>'
                            : '&nbsp;'
                            )
                    + getHtmlVeranstalter(STAT[pTurnier]._VERANSTALTER)
                    + 'Teilnehmer: ' + STAT[pTurnier]._TEILNEHMER + '<br>'
                    + '</div>'
                    + '</div>';

        } else if (STAT[pTurnier]._FOTOS.length >= 2) {

            html += '<div class="llf_row">'
                    + '<div class="llf_left">'
                    + getHtmlPhoto(STAT[pTurnier]._FOTOS[0])
                    + getHtmlVeranstalter(STAT[pTurnier]._VERANSTALTER)
                    + 'Teilnehmer: ' + STAT[pTurnier]._TEILNEHMER + '<br>'
                    + '</div>'
                    + '<div class="llf_right" style="text-align:justify;padding: -29vh 0 30vh 4%;">'
                    + (STAT[pTurnier]._STOCKERL
                            ? '<div>1. <span onclick="event.stopPropagation();popupSpieler(\'' + STAT[pTurnier]._STOCKERL[1] + '\');" class="P cBlau">' + getSpielerName(STAT[pTurnier]._STOCKERL[1]) + '</span>, ' + STAT[pTurnier][STAT[pTurnier]._STOCKERL[1]][4] + ' Punkte</div>'
                            + '<div>2. <span onclick="event.stopPropagation();popupSpieler(\'' + STAT[pTurnier]._STOCKERL[2] + '\');" class="P cBlau">' + getSpielerName(STAT[pTurnier]._STOCKERL[2]) + '</span>, ' + STAT[pTurnier][STAT[pTurnier]._STOCKERL[2]][4] + ' Punkte</div>'
                            + '<div>3. <span onclick="event.stopPropagation();popupSpieler(\'' + STAT[pTurnier]._STOCKERL[3] + '\');" class="P cBlau">' + getSpielerName(STAT[pTurnier]._STOCKERL[3]) + '</span>, ' + STAT[pTurnier][STAT[pTurnier]._STOCKERL[3]][4] + ' Punkte</div><br>'
                            : '&nbsp;'
                            )
                    + getHtmlPhoto(STAT[pTurnier]._FOTOS[1], true)
                    + '</div>'
                    + '</div>';

        } else {

        }

        if (STAT[pTurnier]._ANEKDOTE) {
            html += '<div class=llf_row><div class="llf_center" style="text-align:justify;">' + STAT[pTurnier]._ANEKDOTE + '</div></div>';
        }


        return html;

    }

    function getCupHtml(pSaison, pTurnier) {
        function getHtmlCupStockerl(pSaison) {
            return "<table class='table ui-responsive' data-column-btn-text=''><tbody>"
                    + '<tr>'
                    + '<td></td>'
                    + '<td></td>'
                    + '<td class="TC B XXS"><br>1.2.3.</td>'
                    + '<td class="TR B XXS">Cup-<br>punkte</td>'
                    + '</tr>'

                    + '<tr>'
                    + '<td></td>'
                    + '<td>' + '1. <span onclick="event.stopPropagation();popupSpieler(\'' + SAISON[pSaison][is1] + '\',\'' + SAISON[pSaison][isSaison] + '\');" class="P cBlau"><b>' + (getSpielerName(SAISON[pSaison][is1]).replace(' ', '&nbsp;')) + '</b></span></td>'
                    + '<td class="TC">' + SP[SAISON[pSaison][is1]][pSaison][spBestePlatz] + '</td>'
                    + '<td class="TR">' + SP[SAISON[pSaison][is1]][pSaison][spCuppunkte] + '&nbsp;</td>'
                    + '</tr>'

                    + '<tr>'
                    + '<td></td>'
                    + '<td>' + '2. <span onclick="event.stopPropagation();popupSpieler(\'' + SAISON[pSaison][is2] + '\',\'' + SAISON[pSaison][isSaison] + '\');" class="P cBlau">' + (getSpielerName(SAISON[pSaison][is2]).replace(' ', '&nbsp;')) + '</span></td>'
                    + '<td class="TC">' + SP[SAISON[pSaison][is2]][pSaison][spBestePlatz] + '</td>'
                    + '<td class="TR">' + SP[SAISON[pSaison][is2]][pSaison][spCuppunkte] + '&nbsp;</td>'
                    + '</tr>'

                    + '<tr>'
                    + '<td></td>'
                    + '<td>' + '3. <span onclick="event.stopPropagation();popupSpieler(\'' + SAISON[pSaison][is3] + '\',\'' + SAISON[pSaison][isSaison] + '\');" class="P cBlau">' + (getSpielerName(SAISON[pSaison][is3]).replace(' ', '&nbsp;')) + '</span></td>'
                    + '<td class="TC">' + SP[SAISON[pSaison][is3]][pSaison][spBestePlatz] + '</td>'
                    + '<td class="TR">' + SP[SAISON[pSaison][is3]][pSaison][spCuppunkte] + '&nbsp;</td>'
                    + '</tr></tbody></table>';
        }
        function getHtmlCupDaten(pSaison) {
            return "<table class='table ui-responsive' data-column-btn-text=''><tbody>"
                    + '<tr>'
                    + '<td class="XXS">&nbsp;<br>&nbsp;</td>'
                    + '</tr>'

                    + '<tr>'
                    + '<td class="TR">' + SAISON[pSaison][isAnzTurniere] + ' Turniere</td>'
                    + '</tr>'

                    + '<tr>'
                    + '<td class="TR">' + SAISON[pSaison][isAnzTeilnehmer] + ' Teilnehmer</td>'
                    + '</tr>'

                    + '<tr>'
                    + '<td class="TR">' + SAISON[pSaison][isAnzTeilnahmen] + ' Teilnahmen</td>'
                    + '</tr></tbody></table>';
        }
        var html = '<div class="llf_row XL">'
                + '<div class="llf_left llf_titel">' + SAISON[pSaison][isSaison] + '</div>'
                + '<div class="llf_right llf_titel B">Cupsieger</div>'
                + '</div>';

        if (!STAT[pTurnier]._CUPFOTOS) {

            html += '<div class="llf_row">'
                    + '<div class="llf_left">'
                    + getHtmlCupDaten(pSaison)
                    + '</div>'
                    + '<div class="llf_right" style="text-align:justify;padding: -29vh 0 30vh 4%;">'
                    + getHtmlCupStockerl(pSaison)
                    + '</div>'
                    + '</div>';

        } else if (STAT[pTurnier]._CUPFOTOS.length === 1) {

            html += '<div class="llf_row">'
                    + '<div class="llf_left" style="padding-top: 3vh">'
                    + getHtmlPhoto(STAT[pTurnier]._CUPFOTOS[0])
                    + '</div>'
                    + '<div class="llf_right" style="text-align:justify;padding: -69vh 0 30vh 4%;">'
                    + getHtmlCupStockerl(pSaison)
                    + '<div style="padding-top: 1vh">'
                    + 'Turniere: ' + SAISON[pSaison][isAnzTurniere] + '<br>'
                    + 'Teilnehmer: ' + SAISON[pSaison][isAnzTeilnehmer] + '<br>'
                    + 'Teilnahmen: ' + SAISON[pSaison][isAnzTeilnahmen] + '<br>'
                    + '</div>'
                    + '</div>'
                    + '</div>';

        } else if (STAT[pTurnier]._CUPFOTOS.length >= 2) {

            html += '<div class="llf_row">'
                    + '<div class="llf_left">'
                    + getHtmlPhoto(STAT[pTurnier]._FOTOS[0])
                    + getHtmlVeranstalter(STAT[pTurnier]._VERANSTALTER)
                    + 'Teilnehmer: ' + STAT[pTurnier]._TEILNEHMER + '<br>'
                    + '</div>'
                    + '<div class="llf_right" style="text-align:justify;padding: -29vh 0 30vh 4%;">'
                    + (STAT[pTurnier]._STOCKERL
                            ? '<div>1. <span onclick="event.stopPropagation();popupSpieler(\'' + STAT[pTurnier]._STOCKERL[1] + '\');" class="P cBlau">' + getSpielerName(STAT[pTurnier]._STOCKERL[1]) + '</span>, ' + STAT[pTurnier][STAT[pTurnier]._STOCKERL[1]][4] + ' Punkte</div>'
                            + '<div>2. <span onclick="event.stopPropagation();popupSpieler(\'' + STAT[pTurnier]._STOCKERL[2] + '\');" class="P cBlau">' + getSpielerName(STAT[pTurnier]._STOCKERL[2]) + '</span>, ' + STAT[pTurnier][STAT[pTurnier]._STOCKERL[2]][4] + ' Punkte</div>'
                            + '<div>3. <span onclick="event.stopPropagation();popupSpieler(\'' + STAT[pTurnier]._STOCKERL[3] + '\');" class="P cBlau">' + getSpielerName(STAT[pTurnier]._STOCKERL[3]) + '</span>, ' + STAT[pTurnier][STAT[pTurnier]._STOCKERL[3]][4] + ' Punkte</div><br>'
                            : '&nbsp;'
                            )
                    + getHtmlPhoto(STAT[pTurnier]._FOTOS[1], true)
                    + '</div>'
                    + '</div>';

        } else {

        }

        if (STAT[pTurnier]._CUPANEKDOTE) {
            html += '<div class=llf_row><div class="llf_center" style="text-align:justify;">' + STAT[pTurnier]._CUPANEKDOTE + '</div></div>';
        }

        return html;

    }

    function getHtmlVeranstalter(pVeranstalter) {
        if (pVeranstalter.length === 4) {
            return '&nbsp;<br>Veranstalter: <span onclick="event.stopPropagation();popupSpieler(\'' + pVeranstalter + '\');" class="P cBlau">' + getSpielerName(pVeranstalter) + '</span><br>';
        } else {
            return '&nbsp;<br>Veranstalter: ' + pVeranstalter + '</span><br>';
        }
    }

}

function bTurnierSec(pTurnier) {
    if (QUERFORMAT()) {
        showChronik(pTurnier);
    } else {
        if (!$('#hf' + pTurnier).is(':visible')) {
            $('#sb' + pTurnier).addClass('ui-btn-active');
            var html = '';
            if (STAT[pTurnier]._FOTOS && STAT[pTurnier]._FOTOS.length >= 1) {
                html += '<img class="llf_Image" src="https://drive.google.com/uc?id=' + STAT[pTurnier]._FOTOS[0] + '"/>';
            }
            if (STAT[pTurnier]._STOCKERL) {
                html += '<div>1. <span onclick="event.stopPropagation();popupSpieler(\'' + STAT[pTurnier]._STOCKERL[1] + '\');" class="P cBlau">' + getSpielerName(STAT[pTurnier]._STOCKERL[1]) + '</span>, ' + STAT[pTurnier][STAT[pTurnier]._STOCKERL[1]][4] + ' Punkte</div>'
                        + '<div>2. <span onclick="event.stopPropagation();popupSpieler(\'' + STAT[pTurnier]._STOCKERL[2] + '\');" class="P cBlau">' + getSpielerName(STAT[pTurnier]._STOCKERL[2]) + '</span>, ' + STAT[pTurnier][STAT[pTurnier]._STOCKERL[2]][4] + ' Punkte</div>'
                        + '<div>3. <span onclick="event.stopPropagation();popupSpieler(\'' + STAT[pTurnier]._STOCKERL[3] + '\');" class="P cBlau">' + getSpielerName(STAT[pTurnier]._STOCKERL[3]) + '</span>, ' + STAT[pTurnier][STAT[pTurnier]._STOCKERL[3]][4] + ' Punkte</div>';
            }
            $('#hf' + pTurnier).html(html).show();
        } else {
            $('#sb' + pTurnier).removeClass('ui-btn-active');
            $('#hf' + pTurnier).hide();
        }
    }
}

function getHtmlPhoto(pPhoto, pZweitfoto) {
    var hStyle = '';
    if (stFotoStyle === 1) {
        hStyle = '';
    } else if (stFotoStyle === 2) {
        hStyle = '';
    } else if (stFotoStyle === 3) {
        hStyle = ' style="border-radius: 50%;"';
    } else if (stFotoStyle === 4) {
        var h = new Date() % 100;
        h = (h * (++stFotoCount) * 103) % 30 - 15;
        if (h === -1) {
            h = -5;
        } else if (h === 0) {
            h = 4;
        } else if (h === 1) {
            h = 6;
        }
        hStyle = ' style="transform: rotate(' + h + 'deg) scale(' + (1.15 - Math.abs(h / 100)) + ')"';
    }

    var hStyle = '';
    var h = 0;
    if (stFotoStyle === 1) {
    } else if (stFotoStyle === 2) {
        hStyle = '';
    } else if (stFotoStyle === 3) {
        hStyle = ' style="border-radius: 50%;"';
    } else if (stFotoStyle === 4 || stFotoStyle === 5) {
        h = Date.now() % 100;
        h = (h * (++stFotoCount) * 103) % 10 - 5;
        if (h === -1) {
            h = -3;
        } else if (h === 0) {
            h = 3;
        } else if (h === 1) {
            h = 5;
        }
    }

    return '<div class="llf_Container' + (stFotoStyle === 1 || stFotoStyle === 4 ? '_flat' : '') + (pZweitfoto ? '_ZF' : '') + ' llf' + h + '"' + hStyle + '>'
            + '<img class="llf_Image" src="https://drive.google.com/uc?id=' + pPhoto + '"' + hStyle + '/>'
            + '</div>';
}