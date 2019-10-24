
/* global STAT, stSaison, stFilter, LS.FotoStyle, stCup, CUPS, jbSpieler, stFotoCount */

function showParallax(pChronik) {

    if (QUERFORMAT()) {
        if (lastBtn) {
            $(lastBtn).removeClass('ui-btn-active');
        }
        if (pChronik) {
            lastBtn = '#bParallaxCh';
        } else {
            lastBtn = '#bParallax';
        }
        $(lastBtn).addClass('ui-btn-active');
    }

    stFotoCount = 0;

    if (jbSpieler.isOpen) {
        jbSpieler.close();
    }
    $("#dCopyright").hide();
    stStat = 'Fotos';

    showIcons([]);
    if (CUPS.TYP[stCup] === 'MT') {
        if (pChronik) {
            writeCanvas('Chronik');
        } else {
            writeCanvas('Fotos');
        }
    } else {
        if (pChronik) {
            writeCanvas('Chronik ' + stSaison);
        } else {
            writeCanvas('Fotos ' + stSaison);
        }
    }

    var html = '';

    for (var turnier in STAT) {
        if (turnier[0] === '2') {
            if (STAT[turnier]._SAISON === stSaison) {
                if (!stFilter || STAT[turnier]._NAME.toUpperCase().indexOf(stFilter) >= 0) {
                    if (STAT[turnier]._FOTOS) {
                        for (var i = STAT[turnier]._FOTOS.length - 1; i >= 0; i--) {
                            html = getHtmlPhoto(STAT[turnier]._FOTOS[i], turnier, (!i && !pChronik)) + html;
                        }
                    }
                    if (pChronik) {
                        html = '<div style="padding: 2vh 0.2vw 2vh 6vw">'
                                + '<div class="ui-grid-b" style="text-overflow: ellipsis;white-space: nowrap;overflow: hidden;">'
                                + '<div class="ui-block-a XL" style="width:62%">'
                                + turnier + ' <b>&nbsp;' + STAT[turnier]._NAME + '</b>'
                                + '</div>'
                                + '<div class="ui-block-b" style="width:38%">'

                                + (STAT[turnier]._STOCKERL
                                        ? '<div class=M><div>1. <span onclick="event.stopPropagation();popupSpieler(\'' + STAT[turnier]._STOCKERL[1] + '\');" class="P cBlau">' + getSpielerName(STAT[turnier]._STOCKERL[1]) + '</span>, ' + STAT[turnier][STAT[turnier]._STOCKERL[1]][4] + ' Punkte</div>'
                                        + '<div>2. <span onclick="event.stopPropagation();popupSpieler(\'' + STAT[turnier]._STOCKERL[2] + '\');" class="P cBlau">' + getSpielerName(STAT[turnier]._STOCKERL[2]) + '</span>, ' + STAT[turnier][STAT[turnier]._STOCKERL[2]][4] + ' Punkte</div>'
                                        + '<div>3. <span onclick="event.stopPropagation();popupSpieler(\'' + STAT[turnier]._STOCKERL[3] + '\');" class="P cBlau">' + getSpielerName(STAT[turnier]._STOCKERL[3]) + '</span>, ' + STAT[turnier][STAT[turnier]._STOCKERL[3]][4] + ' Punkte</div></div>'
                                        : '&nbsp;'
                                        )

                                + '</div>'
                                + '</div>'
                                + (STAT[turnier]._ANEKDOTE ? '<div class="M J" style="padding:2vh 6vw 0 0">' + STAT[turnier]._ANEKDOTE + '</div>' : '')
                                + '</div>' + html;
                    }
                    if (STAT[turnier]._CUPFOTOS) {
                        for (var i = STAT[turnier]._CUPFOTOS.length - 1; i >= 0; i--) {
                            html = getHtmlPhoto(STAT[turnier]._CUPFOTOS[i], turnier, (!i && !pChronik), true) + html;
                        }
                    }
                    if (STAT[turnier]._NAME.toUpperCase().indexOf('FINAL') >= 0) {
                        if (pChronik) {
                            html = '<div style="padding: 2vh 0.2vw 2vh 6vw">'
                                    + '<div class="ui-grid-b" style="text-overflow: ellipsis;white-space: nowrap;overflow: hidden;">'
                                    + '<div class="ui-block-a XL" style="width:62%">'
                                    + stSaison + ' <b>&nbsp;Cupsieger</b>'
                                    + '</div>'
                                    + '<div class="ui-block-b M" style="width:38%">'

//                                    + (STAT[turnier]._STOCKERL
//                                            ? '<div class=M><div>1. <span onclick="event.stopPropagation();popupSpieler(\'' + STAT[turnier]._STOCKERL[1] + '\');" class="P cBlau">' + getSpielerName(STAT[turnier]._STOCKERL[1]) + '</span>, ' + STAT[turnier][STAT[turnier]._STOCKERL[1]][4] + ' Punkte</div>'
//                                            + '<div>2. <span onclick="event.stopPropagation();popupSpieler(\'' + STAT[turnier]._STOCKERL[2] + '\');" class="P cBlau">' + getSpielerName(STAT[turnier]._STOCKERL[2]) + '</span>, ' + STAT[turnier][STAT[turnier]._STOCKERL[2]][4] + ' Punkte</div>'
//                                            + '<div>3. <span onclick="event.stopPropagation();popupSpieler(\'' + STAT[turnier]._STOCKERL[3] + '\');" class="P cBlau">' + getSpielerName(STAT[turnier]._STOCKERL[3]) + '</span>, ' + STAT[turnier][STAT[turnier]._STOCKERL[3]][4] + ' Punkte</div></div>'
//                                            : '&nbsp;'
//                                            )




                                    + "<table class='table ui-responsive' data-column-btn-text=''><tbody>"

                                    + '<td></td>'
                                    + '<td>' + '1. <span onclick="event.stopPropagation();popupSpieler(\'' + SAISON[iSaison][is1] + '\',\'' + SAISON[iSaison][isSaison] + '\');" class="P cBlau"><b>' + (getSpielerName(SAISON[iSaison][is1]).replace(' ', '&nbsp;')) + '</b></span></td>'
                                    + '<td class="TC">' + SP[SAISON[iSaison][is1]][iSaison][spBestePlatz] + '</td>'
                                    + '<td class="TR">' + SP[SAISON[iSaison][is1]][iSaison][spCuppunkte] + '&nbsp;</td>'
                                    + '</tr>'

                                    + '<tr>'
                                    + '<td></td>'
                                    + '<td>' + '2. <span onclick="event.stopPropagation();popupSpieler(\'' + SAISON[iSaison][is2] + '\',\'' + SAISON[iSaison][isSaison] + '\');" class="P cBlau">' + (getSpielerName(SAISON[iSaison][is2]).replace(' ', '&nbsp;')) + '</span></td>'
                                    + '<td class="TC">' + SP[SAISON[iSaison][is2]][iSaison][spBestePlatz] + '</td>'
                                    + '<td class="TR">' + SP[SAISON[iSaison][is2]][iSaison][spCuppunkte] + '&nbsp;</td>'
                                    + '</tr>'

                                    + '<tr>'
                                    + '<td></td>'
                                    + '<td>' + '3. <span onclick="event.stopPropagation();popupSpieler(\'' + SAISON[iSaison][is3] + '\',\'' + SAISON[iSaison][isSaison] + '\');" class="P cBlau">' + (getSpielerName(SAISON[iSaison][is3]).replace(' ', '&nbsp;')) + '</span></td>'
                                    + '<td class="TC">' + SP[SAISON[iSaison][is3]][iSaison][spBestePlatz] + '</td>'
                                    + '<td class="TR">' + SP[SAISON[iSaison][is3]][iSaison][spCuppunkte] + '&nbsp;</td>'
                                    + '</tr></tbody></table>'


                                    + '</div>'
                                    + '</div>'
                                    + (STAT[turnier]._CUPANEKDOTE ? '<div class="M J" style="padding:2vh 6vw 0 0">' + STAT[turnier]._CUPANEKDOTE + '</div>' : '')
                                    + '</div>' + html;
                        }
                    }
                }
            }
        }
    }

    if (QUERFORMAT()) {
        $('#dRumpf').html(html).css('margin-top', $('#qfHeader').height() + 'px');
    } else {
        $('#sideTurniereMT').hide();
        $('#dContent').html(html);
        var hx = $(window).innerHeight() - $('#sideContent').offset().top - 1;
        $('#sideContent').css('height', hx + 'px').scrollTop(0);
    }
    $("#dCopyright").hide();
    window.scrollTo(0, 0);

    var scrolled = $(window).scrollTop();
    $('.parallax').each(function (index) {
        var imageSrc = $(this).data('image-src');
        var imageHeight = $(this).data('height');
        $(this).css('background-image', 'url(' + imageSrc + ')');
        $(this).css('height', imageHeight);
        if (LS.FotoAnimieren) {
            var initY = $(this).offset().top;
            var height = $(this).height();
            var diff = scrolled - initY;
            var ratio = Math.round((diff / height) * 100);
            $(this).css('background-position', 'right ' + parseInt(-(ratio * 3)) + 'px'); // * 1.5
        }
    });

    if (LS.FotoAnimieren) {
        $(window).scroll(function () {
            var scrolled = $(window).scrollTop();
            $('.parallax').each(function (index, element) {
                var initY = $(this).offset().top;
                var height = $(this).height();

                // Check if the element is in the viewport.
                var visible = isInViewport(this);
                if (visible) {
                    var diff = scrolled - initY;
                    var ratio = Math.round((diff / height) * 100);
                    $(this).css('background-position', 'right ' + parseInt(-(ratio * 1)) + 'px'); // * 1.5
                }
            });
        });
    }

    function isInViewport(node) {
        // Am I visible? Height and Width are not explicitly necessary in visibility
        // detection, the bottom, right, top and left are the essential checks. If an
        // image is 0x0, it is technically not visible, so it should not be marked as
        // such. That is why either width or height have to be > 0.
        var rect = node.getBoundingClientRect();
        return (
                (rect.height > 0 || rect.width > 0) &&
                rect.bottom >= 0 &&
                rect.right >= 0 &&
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.left <= (window.innerWidth || document.documentElement.clientWidth)
                );
    }

    function getHtmlPhoto(pFoto, pTurnier, pText, pCup) {
        return '<div class="parallax" sid="parallax-1"  data-height="' + (parseInt($(window).innerHeight() * 0.98)) + 'px" data-image-src="https://drive.google.com/uc?id=' + pFoto + '">'
                + '<div class="caption">'
                + (pText ? '<span class="border L">' + pTurnier + ' <b>' + STAT[pTurnier]._NAME + '</b><br>'
                        + (STAT[pTurnier]._STOCKERL
                                ? '<div class=M><div>1. <span onclick="event.stopPropagation();popupSpieler(\'' + STAT[pTurnier]._STOCKERL[1] + '\');" class="P cBlau">' + getSpielerName(STAT[pTurnier]._STOCKERL[1]) + '</span>, ' + STAT[pTurnier][STAT[pTurnier]._STOCKERL[1]][4] + ' Punkte</div>'
                                + '<div>2. <span onclick="event.stopPropagation();popupSpieler(\'' + STAT[pTurnier]._STOCKERL[2] + '\');" class="P cBlau">' + getSpielerName(STAT[pTurnier]._STOCKERL[2]) + '</span>, ' + STAT[pTurnier][STAT[pTurnier]._STOCKERL[2]][4] + ' Punkte</div>'
                                + '<div>3. <span onclick="event.stopPropagation();popupSpieler(\'' + STAT[pTurnier]._STOCKERL[3] + '\');" class="P cBlau">' + getSpielerName(STAT[pTurnier]._STOCKERL[3]) + '</span>, ' + STAT[pTurnier][STAT[pTurnier]._STOCKERL[3]][4] + ' Punkte</div></div>'
                                : '&nbsp;'
                                )


                        + '</span>'
                        : '')
                + '</div>'
                + '</div>';
    }

}