
/* global CUPS, LS, stCup, jbSpieler, stHeute, QUERFORMAT() */

function showTermine() {

    if (QUERFORMAT()) {
        if (lastBtn) {
            $(lastBtn).removeClass('ui-btn-active');
        }
        lastBtn = '#bTurnierkalender,#bTurnierkalender2';
        $(lastBtn).addClass('ui-btn-active');
    }

    function getTerminText(iTermin) {
        var hFrom = CUPS.TERMINE[iTermin].TEXT.indexOf('www.');
        if (hFrom > 0) {
            var hReturn = CUPS.TERMINE[iTermin].TEXT.substr(0, hFrom);
            var hRest = CUPS.TERMINE[iTermin].TEXT.substr(hFrom);
            hFrom = hRest.indexOf('<');
            if (hFrom > 0) {
                var hLink = hRest.substr(0, hFrom).trim();
                hRest = hRest.substr(hFrom);
                return hReturn + '<span class="cBlau P" onclick="window.open(\'http://' + hLink + '\')">' + hLink + '</span>' + hRest;
            } else {
                hRest = hRest.substr(0, hFrom).trim();
                return hReturn + '<span class="cBlau P" onclick="window.open(\'http://' + hRest + '\')">' + hRest + '</span>';
            }
        } else {
            return CUPS.TERMINE[iTermin].TEXT;
        }
    }

    if (LS.ME !== "NOBODY") {
        showIcons(['#iPrint']);
    }

    stStat = 'Termine';

    if (jbSpieler.isOpen) {
        jbSpieler.close();
    }
    $("#dCopyright").hide();

    writeCanvas('Die nächsten Turniere');

    if (CUPS.TYP[stCup] === 'MT') {
        $('#nb_Uebersicht').addClass('ui-btn-active');
        $('#nb_Mannschaft, #nb_Einzel').removeClass('ui-btn-active');
        $('#nb_Mannschaft, #nb_Einzel').addClass('ui-disabled');
    }

    if (window.location.href.indexOf('?') > 0) { // Quickstart
        var hRef = window.location.href.replace(/%20|_/g, ' ');
        for (var ii = CUPS.NAME.length; ii > 0; ii--) {
            if (hRef.indexOf(CUPS.NAME[ii]) > 0) {
                if (CUPS.BEREadmin[ii].indexOf(LS.ME) >= 0
                        || CUPS.BEREschreiben[ii].indexOf('*') >= 0
                        || CUPS.BEREschreiben[ii].indexOf(LS.ME) >= 0
                        || CUPS.TYP[ii] !== 'PR') {
                    window.location.replace('Abakus/Statistik.html' + window.location.href.substr(window.location.href.indexOf('?')));
                } else {
                    showEinenFehler(ii, 'Berechtigung fehlt!');
                    break;
                }
            }
        }
    }

    var i = 0;
    var nTermine = 0;

    var htmlTE = '';
    var hCupName = '';

    if (QUERFORMAT()) {
        htmlTE = '<div id=dBlockB class="S" style="text-align: justify;">'
                + "<table swidth=100% data-role='table' data-mode='columntoggle' cellspacing='0' class='table ui-body-d ui-shadow ui-responsive table-stripe' data-column-btn-text=''>"
                + "<tbody>";
    }

    for (var iTermin in CUPS.TERMINE) {
        if (CUPS.TERMINE[iTermin].CUP === stCup) {
            if (CUPS.TERMINE[iTermin].CUP === 54) {
                hCupName = 'St. Tarockcup';
            } else if (CUPS.TERMINE[iTermin].CUP === 56) {
                hCupName = 'Wr. Tarockcup';
            } else if (CUPS.TERMINE[iTermin].CUP === 15) {
                hCupName = 'Stadl Tarock';
            }
            if (!stFilter || CUPS.TERMINE[iTermin].NAME.toUpperCase().indexOf(stFilter) >= 0) {
                if (CUPS.TERMINE[iTermin].DATUM >= stHeute) {
                    nTermine++;
                    if (QUERFORMAT()) {
                        htmlTE += '<tr><td class=M>&nbsp;&nbsp;<span class=M>' + getDateString(CUPS.TERMINE[iTermin].DATUM) + (CUPS.TERMINE[iTermin].BEGINN ? ',&nbsp;&nbsp;&nbsp;&nbsp;' + CUPS.TERMINE[iTermin].BEGINN : '') + '</span><br>&nbsp;&nbsp;<b class=L>' + CUPS.TERMINE[iTermin].NAME + '</b></td><td>' + getTerminText(iTermin) + '&nbsp;&nbsp;</td></tr>';
                    } else {
                        htmlTE += '<li data-icon=false><a class="Sbtn" onclick="$(\'#txt' + iTermin + '\').toggle()">&nbsp;<span class="M N">' + getDateString(CUPS.TERMINE[iTermin].DATUM) + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="S N">' + hCupName + '&nbsp;<br></span>&nbsp;<span class="L">' + CUPS.TERMINE[iTermin].NAME + '</span>'
                                + '<div style="margin-left:10px" class="ui-block-b S N" id=txt' + iTermin + ' hidden>'
                                + CUPS.TERMINE[iTermin].TEXT
                                + '</div>'
                                + '</a></li>';
                    }
                }
            }
        }
    }

    if (QUERFORMAT()) {
        htmlTE += "</tbody></table>";
    }

    if (CUPS.TEXT1[stCup]) {
        htmlTE += "<div style='margin:1em' class=S>";
        if (CUPS.TEXT1[stCup]) {
            htmlTE += CUPS.TEXT1[stCup] + '<br>';
        }
        htmlTE += "</div>";
    }

    if (QUERFORMAT()) {
        htmlTE += '</div>';
    }

    if (QUERFORMAT()) {
        $('#dRumpf').html(htmlTE).css('margin-top', $('#qfHeader').height() + 'px');
    } else {
        $('#dContent').html("<ul data-role='listview'>" + htmlTE + "</ul>").trigger('create').show();
        $('#sideTurniere').hide();
        $('#nbUebersicht').removeClass('ui-btn-active');
        var hx = $(window).innerHeight() - $('#sideContent').offset().top - 1;
        $('#sideContent').css('height', hx + 'px').scrollTop(0);
    }

    setFont();
    hideEinenMoment();

    window.scrollTo(0, 0);

    $('#tStand').hide();

}




/* global CUPS, LS, stCup, jbSpieler, stHeute, QUERFORMAT() */

function showTourplan() {

    if (QUERFORMAT()) {
        if (lastBtn) {
            $(lastBtn).removeClass('ui-btn-active');
        }
        lastBtn = '#bTourplan';
        $(lastBtn).addClass('ui-btn-active');
    }

    if (LS.ME !== "NOBODY") {
        showIcons(['#iPrint']);
    }

    stStat = 'Tourplan';

    if (jbSpieler.isOpen) {
        jbSpieler.close();
    }
    $("#dCopyright").hide();

    writeCanvas('Tourplan 2020');

    if (QUERFORMAT()) {
        $('#dRumpf').html('<embed src="../Icons/TarockOnTour2020.pdf#toolbar=0&navpanes=0&scrollbar=0" type="application/pdf" width="100%" height="' + parseInt($(window).innerHeight() - $('#qfHeader').height() - 5) + 'px"/>').css('margin-top', $('#qfHeader').height() + 'px');
    } else {
        $('#dContent').html("<ul data-role='listview'>" + htmlTE + "</ul>").trigger('create').show();
        $('#sideTurniere').hide();
        $('#nbUebersicht').removeClass('ui-btn-active');
        var hx = $(window).innerHeight() - $('#sideContent').offset().top - 1;
        $('#sideContent').css('height', hx + 'px').scrollTop(0);
    }

    setFont();
    hideEinenMoment();

    window.scrollTo(0, 0);

    $('#tStand').hide();

}