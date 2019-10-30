
/* global STAT, stSaison, stFilter, stFotoStyle, stCup, CUPS, jbSpieler, stFotoCount */

function showTabFotos(pIndex) {

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

    if (pIndex === 1) {
        $('#nbSaison').removeClass('ui-btn-active');
        showFotos();
//        showIcons(['#iChronik']);
    } else {
        showIcons(['#iFotos']);
        $('#sideTurniereMT').hide();
        for (var turnier in STAT) {
            if (turnier[0] === '2') {
                if (STAT[turnier]._SAISON === stSaison) {
                    if (!stFilter || STAT[turnier]._NAME.toUpperCase().indexOf(stFilter) >= 0) {
                        $('#sb' + turnier).addClass('ui-btn-active');
                        var html = '';
                        if (STAT[turnier]._STOCKERL) {
                            html += '<div>1. <span onclick="event.stopPropagation();popupSpieler(\'' + STAT[turnier]._STOCKERL[1] + '\');" class="P cBlau">' + getSpielerName(STAT[turnier]._STOCKERL[1]) + '</span>, ' + STAT[turnier][STAT[turnier]._STOCKERL[1]][4] + ' Punkte</div>'
                                    + '<div>2. <span onclick="event.stopPropagation();popupSpieler(\'' + STAT[turnier]._STOCKERL[2] + '\');" class="P cBlau">' + getSpielerName(STAT[turnier]._STOCKERL[2]) + '</span>, ' + STAT[turnier][STAT[turnier]._STOCKERL[2]][4] + ' Punkte</div>'
                                    + '<div>3. <span onclick="event.stopPropagation();popupSpieler(\'' + STAT[turnier]._STOCKERL[3] + '\');" class="P cBlau">' + getSpielerName(STAT[turnier]._STOCKERL[3]) + '</span>, ' + STAT[turnier][STAT[turnier]._STOCKERL[3]][4] + ' Punkte</div>';
                        }
                        if (STAT[turnier]._CUPFOTOS) {
                            for (var i = STAT[turnier]._CUPFOTOS.length - 1; i >= 0; i--) {
                                html = getHtmlPhoto(STAT[turnier]._CUPFOTOS[i], turnier) + html;
                            }
                        }
                        if (STAT[turnier]._FOTOS) {
                            for (var i = STAT[turnier]._FOTOS.length - 1; i >= 0; i--) {
                                html = getHtmlPhoto(STAT[turnier]._FOTOS[i], turnier) + html;
                            }
                        }
                        $('#hf' + turnier).html(html).show();
                    }
                }
            }
        }
        var hx = $(window).innerHeight() - $('#sideContent').offset().top - 1;
        $('#sideContent').css('height', hx + 'px').scrollTop(0);
    }

//        $('#sideTurniereMT').show();
//        var hx = $(window).innerHeight() - $('#sideContent').offset().top - 1;
//        $('#sideContent').css('height', hx + 'px').scrollTop(0);

}

function showSPhFotos(pIndex) {

    if (pIndex === 1) { // Smartphone
        $('#nbSaison').removeClass('ui-btn-active');
        showIcons(['#iPortrait']);
        showSaison(iSaison, true);

//        $('#sideTurniereMT').hide();
//        for (var turnier in STAT) {
//            if (turnier[0] === '2') {
//                if (STAT[turnier]._SAISON === stSaison) {
//                    if (!stFilter || STAT[turnier]._NAME.toUpperCase().indexOf(stFilter) >= 0) {
//                        $('#sb' + turnier).addClass('ui-btn-active');
//                        var html = '';
//                        if (STAT[turnier]._STOCKERL) {
//                            html += '<div>1. <span onclick="event.stopPropagation();popupSpieler(\'' + STAT[turnier]._STOCKERL[1] + '\');" class="P cBlau">' + getSpielerName(STAT[turnier]._STOCKERL[1]) + '</span>, ' + STAT[turnier][STAT[turnier]._STOCKERL[1]][4] + ' Punkte</div>'
//                                    + '<div>2. <span onclick="event.stopPropagation();popupSpieler(\'' + STAT[turnier]._STOCKERL[2] + '\');" class="P cBlau">' + getSpielerName(STAT[turnier]._STOCKERL[2]) + '</span>, ' + STAT[turnier][STAT[turnier]._STOCKERL[2]][4] + ' Punkte</div>'
//                                    + '<div>3. <span onclick="event.stopPropagation();popupSpieler(\'' + STAT[turnier]._STOCKERL[3] + '\');" class="P cBlau">' + getSpielerName(STAT[turnier]._STOCKERL[3]) + '</span>, ' + STAT[turnier][STAT[turnier]._STOCKERL[3]][4] + ' Punkte</div>';
//                        }
//                        if (STAT[turnier]._CUPFOTOS) {
//                            for (var i = STAT[turnier]._CUPFOTOS.length - 1; i >= 0; i--) {
//                                html = getHtmlPhoto(STAT[turnier]._CUPFOTOS[i], turnier) + html;
//                            }
//                        }
//                        if (STAT[turnier]._FOTOS) {
//                            for (var i = STAT[turnier]._FOTOS.length - 1; i >= 0; i--) {
//                                html = getHtmlPhoto(STAT[turnier]._FOTOS[i], turnier) + html;
//                            }
//                        }
//                        $('#hf' + turnier).html(html).show();
//                    }
//                }
//            }
//        }
//        var hx = $(window).innerHeight() - $('#sideContent').offset().top - 1;
//        $('#sideContent').css('height', hx + 'px').scrollTop(0);
    } else {
        showIcons(['#iLandscape']);
    }

//        $('#sideTurniereMT').show();
//        var hx = $(window).innerHeight() - $('#sideContent').offset().top - 1;
//        $('#sideContent').css('height', hx + 'px').scrollTop(0);

}

function showFotos() {

    if (QUERFORMAT()) {
        showIcons([]);
        if (lastBtn) {
            $(lastBtn).removeClass('ui-btn-active');
        }
        lastBtn = '#bFotos';
        $(lastBtn).addClass('ui-btn-active');
    } else {
        showIcons(['#iChronik']);
    }

    stFotoCount = 0;

    if (jbSpieler.isOpen) {
        jbSpieler.close();
    }
    $("#dCopyright").hide();
    stStat = 'Fotos';

    if (CUPS.TYP[stCup] === 'MT') {
        writeCanvas('Fotos');
    } else {
        writeCanvas('Fotos ' + stSaison);
    }

    var html = '';
    var nTurniere = 0;

    for (var turnier in STAT) {
        if (turnier[0] === '2') {
            if (STAT[turnier]._SAISON === stSaison) {
                if (!stFilter || STAT[turnier]._NAME.toUpperCase().indexOf(stFilter) >= 0) {
                    nTurniere++;
                    if (STAT[turnier]._CUPFOTOS) {
                        for (var i = STAT[turnier]._CUPFOTOS.length - 1; i >= 0; i--) {
                            html = getHtmlPhoto(STAT[turnier]._CUPFOTOS[i], turnier) + html;
                        }
                    }
                    if (STAT[turnier]._FOTOS) {
                        for (var i = STAT[turnier]._FOTOS.length - 1; i >= 0; i--) {
                            html = getHtmlPhoto(STAT[turnier]._FOTOS[i], turnier) + html;
                        }
                    }
                }
            }
        }
    }

    html = '<div id="foto-container' + (stFotoStyle === 1 || stFotoStyle === 4 ? '-flat' : '') + '">' + html + '</div>';

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

    if (QUERFORMAT()) {
        $("#foto-container" + (stFotoStyle === 1 || stFotoStyle === 4 ? '-flat' : '') + " > img").on("mouseenter", function () {
            $('.hfHeaderZeile2,#qfHeaderZeile2').text($(this).attr("alt"));
            if (stFotoStyle === 1) {
                $(this).attr("style", "box-shadow: 0 0 0px 0.5px #666;z-index:" + stFotoCount++ + ";transform: scale(1.9);");
            } else if (stFotoStyle === 2) {
                $(this).attr("style", "box-shadow: 0 0 0px 0.2px #444;z-index:" + stFotoCount++ + ";transform: scale(1.9);");
            } else if (stFotoStyle === 3) {
                $(this).attr("style", "box-shadow: 0 0 0px 0.2px #444;z-index:" + stFotoCount++ + ";transform: scale(1.9);border-radius: 50%;");
            } else if (stFotoStyle === 4) {
                $(this).attr("style", "box-shadow: 0 0 0px 0.2px #444;z-index:" + stFotoCount++ + ";transform: scale(1.9) rotate(0deg);");
            } else if (stFotoStyle === 5) {
                $(this).attr("style", "box-shadow: 0 0 0px 0.5px #444;z-index:" + stFotoCount++ + ";transform: scale(1.9) rotate(0deg);");
            }
        });

        $("#foto-container" + (stFotoStyle === 1 || stFotoStyle === 4 ? '-flat' : '') + " > img").on("mouseleave", function () {
            $('#qfHeaderZeile2').text('Fotos ' + stSaison);
            if (stFotoStyle === 1) {
                $(this).attr("style", "transform: scale(1)");
            } else if (stFotoStyle === 2) {
                $(this).attr("style", "transform: scale(1)");
            } else if (stFotoStyle === 3) {
                $(this).attr("style", "border-radius: 50%; transform: scale(1)");
            } else if (stFotoStyle === 4 || stFotoStyle === 5) {
                var h = new Date() % 100;
                h = (h * (stFotoCount++) * 7) % 30 - 15;
                if (h === 0) {
                    h = 5;
                }
                $(this).attr("style", "transform: rotate(" + h + "deg) scale(" + (1.2 - Math.abs(h / 100)) + ");z-index:" + stFotoCount++);
            }
        });
    } else {
        $("#foto-container" + (stFotoStyle === 1 || stFotoStyle === 4 ? '-flat' : '') + " > img").on("mouseenter", function () {
            $('.hfHeaderZeile2,#qfHeaderZeile2').text($(this).attr("alt"));
            console.log($(this).position());
            if ($(this).position().left < 20) {
                if (stFotoStyle === 1) {
                    $(this).attr("style", "box-shadow: 0 0 0px 0.5px #666;z-index:" + stFotoCount++ + ";transform: scale(2.02) translate(25%);");
                } else if (stFotoStyle === 2) {
                    $(this).attr("style", "box-shadow: 0 0 0px 0.2px #444;z-index:" + stFotoCount++ + ";transform: scale(2.02) translate(25%);");
                } else if (stFotoStyle === 3) {
                    $(this).attr("style", "box-shadow: 0 0 0px 0.2px #444;z-index:" + stFotoCount++ + ";transform: scale(2.02) translate(25%);border-radius: 50%;");
                } else if (stFotoStyle === 4) {
                    $(this).attr("style", "box-shadow: 0 0 0px 0.2px #444;z-index:" + stFotoCount++ + ";transform: scale(2.04) rotate(0deg) translate(24.8%);");
                } else if (stFotoStyle === 5) {
                    $(this).attr("style", "box-shadow: 0 0 0px 0.5px #444;z-index:" + stFotoCount++ + ";transform: scale(2.22) rotate(0deg) translate(23.5%);");
                }
            } else {
                if (stFotoStyle === 1) {
                    $(this).attr("style", "box-shadow: 0 0 0px 0.5px #666;z-index:" + stFotoCount++ + ";transform: scale(2.02) translate(-25%);");
                } else if (stFotoStyle === 2) {
                    $(this).attr("style", "box-shadow: 0 0 0px 0.2px #444;z-index:" + stFotoCount++ + ";transform: scale(2.02) translate(-25%);");
                } else if (stFotoStyle === 3) {
                    $(this).attr("style", "box-shadow: 0 0 0px 0.2px #444;z-index:" + stFotoCount++ + ";transform: scale(2.02) translate(-25%);border-radius: 50%;");
                } else if (stFotoStyle === 4) {
                    $(this).attr("style", "box-shadow: 0 0 0px 0.2px #444;z-index:" + stFotoCount++ + ";transform: scale(2.04) rotate(0deg) translate(-24.8%);");
                } else if (stFotoStyle === 5) {
                    $(this).attr("style", "box-shadow: 0 0 0px 0.5px #444;z-index:" + stFotoCount++ + ";transform: scale(2.22) rotate(0deg) translate(-23.5%);");
                }
            }
        });

        $("#foto-container" + (stFotoStyle === 1 || stFotoStyle === 4 ? '-flat' : '') + " > img").on("mouseleave", function () {
            $('#qfHeaderZeile2').text('Fotos ' + stSaison);
            if (stFotoStyle === 1) {
                $(this).attr("style", "transform: scale(1)");
            } else if (stFotoStyle === 2) {
                $(this).attr("style", "transform: scale(1)");
            } else if (stFotoStyle === 3) {
                $(this).attr("style", "border-radius: 50%; transform: scale(1)");
            } else if (stFotoStyle === 4 || stFotoStyle === 5) {
                var h = new Date() % 100;
                h = (h * (stFotoCount++) * 7) % 30 - 15;
                if (h === 0) {
                    h = 5;
                }
                $(this).attr("style", "transform: rotate(" + h + "deg) scale(" + (1.2 - Math.abs(h / 100)) + ");z-index:" + stFotoCount++);
            }
        });
    }

    function getHtmlPhoto(pFoto, pTurnier, pCupsieger) {

        var hStyle = '';
        if (stFotoStyle === 1) {
            hStyle = '';
        } else if (stFotoStyle === 2) {
            hStyle = '';
        } else if (stFotoStyle === 3) {
            hStyle = ' style="border-radius: 50%;"';
        } else if (stFotoStyle === 4 || stFotoStyle === 5) {
            var h = new Date() % 100;
            h = (h * (++stFotoCount) * 103) % 30 - 15;
            if (h === -1) {
                h = -5;
            } else if (h === 0) {
                h = 4;
            } else if (h === 1) {
                h = 6;
            }
            if (QUERFORMAT()) {
                hStyle = ' style="transform: rotate(' + h + 'deg) scale(' + (1.15 - Math.abs(h / 100)) + ')"';
            } else {
                hStyle = ' style="transform: rotate(' + h + 'deg)"';
            }
        }

        if (pCupsieger) {
            return '<img src="https://drive.google.com/uc?id=' + pFoto + '" alt="' + pTurnier + ' ' + STAT[pTurnier]._NAME + '"' + hStyle + ' onclick="showChronik(\'' + pTurnier + '\')">';
        } else {
            return '<img src="https://drive.google.com/uc?id=' + pFoto + '" alt="' + pTurnier + ' ' + STAT[pTurnier]._NAME + '"' + hStyle + ' onclick="showChronik(\'' + pTurnier + '\')">';
        }

    }
}