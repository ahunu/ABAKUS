
/* global CUPS, LS, stCup, jbSpieler, stHeute, QUERFORMAT(), ADMIN, firebase, FB */

function showAktuelles() {

    if (QUERFORMAT()) {
        if (lastBtn) {
            $(lastBtn).removeClass('ui-btn-active');
        }
        lastBtn = '#bAktuelles';
        $(lastBtn).addClass('ui-btn-active');
    }

    if (LS.ME !== "NOBODY") {
        showIcons(['#iPrint']);
        if (LS.ME === '3425') {
            showIcons(['#iPrint', '#iEdit']);
        } else {
            showIcons(['#iPrint']);
        }
    }

    if (CUPS.MELDAKT[stCup]) {
        if (LS.GelesenAKT[stCup] !== CUPS.MELDAKT[stCup]) {
            LS.GelesenAKT[stCup] = CUPS.MELDAKT[stCup];
            localStorage.setItem('Abakus.LS', JSON.stringify(LS));
        }
    } else {
        if (LS.GelesenAKT[stCup]) {
            LS.GelesenAKT[stCup] = null;
            localStorage.setItem('Abakus.LS', JSON.stringify(LS));
        }
    }

    stStat = 'Aktuelles';

    if (jbSpieler.isOpen) {
        jbSpieler.close();
    }
    $("#dCopyright").hide();

    writeCanvas('Aktuelles');

    if (AKTUELLES === null) {
        AKTUELLES = JSON.parse(localStorage.getItem('Abakus.AKTUELLES'));
        if (AKTUELLES[stCup]) {
            AKTUELLES = AKTUELLES[stCup];
        } else {
            AKTUELLES = "Mittels der Stiftfunktion im rechten oberen Eck, "
                    + "kann hier ein aktueller Text erfasst werden.";
        }
    }

    html = '<div class="ui-grid-b ui-responsive M J" style="padding: ' + (QUERFORMAT() ? '5vw 6vw 5vw 6vw' : '4vw 4vw 2vw 4vw') + '">'
            + AKTUELLES
            + '<br>'
            + '</div>';
    if (QUERFORMAT()) {
        $('#dRumpf').html(html).css('margin-top', $('#qfHeader').height() + 'px');
        setFont();
    } else {
        $('#dContent').html(html).trigger('create').show();
        $('#nbUebersicht').removeClass('ui-btn-active');
        $('#sideTurniere').hide();
        setFont(4);
        setTimeout(function () {
            var hx = parseInt($(window).innerHeight() - $('#dContent').offset().top - 1);
            $('#sideContent').css('height', hx + 'px');
        }, 100);
    }

    window.scrollTo(0, 0);

    $('#tStand').hide();

}


function editAktuelles() {

    if (CUPS.MELDAKT[stCup]) {
        $('#qfHeaderZeile2').text(CUPS.MELDAKT[stCup]);
    } else {
        $('#qfHeaderZeile2').text('Eine wichtige Information eingeben');
    }

    $('#iEdit').hide();

    var hH = parseInt($(window).innerHeight() - $('#qfHeader').height() - 4);
    var html = '<div style="width:100%; margin-left: auto; margin-right: auto; overflow-y: auto; height:' + hH + 'px; background-image: url(\'Icons/Background.png\'); background-size: 50%; background-position: center center; background-repeat: no-repeat; ">'
            + '<div style="width: 80%; padding: 1em; margin: 3em auto;" fonclick="event.stopImmediatePropagation();">'
//            + '<div id="editor" class="M" style="background-color:#eee; border-width:5px; border-style:groove; text-align:left"></div>'
//            + '<br>'
            + '<div class="ui-grid-a">'
            + '<div class="ui-block-a L" style="width:30%">'
            + 'Letzte Schlagzeile:'
            + '</div>'
            + '<div class="ui-block-b" style="width:69%">'
            + '<input id="iSCHLAGZEILE" data-role="none">'
            + '</div>'
            + '</div>'
            + '<div class="ui-grid-b">'
            + '<div class="ui-block-a" style="padding:11px 8px 0px 4px;">'
            + '<button class="L2 ui-corner-all" onClick="hideEinenTip();showAktuelles();" style="width:100%;" data-theme="a">abbrechen</button>'
            + '</div>'
            + '<div class="ui-block-b" style="padding:11px 4px 0px 4px;">'
            + '<button class="L2 ui-corner-all" onClick="aktuellesCheck(false)" style="width:100%;">prüfen</button>'
            + '</div>'
            + '<div class="ui-block-c" style="padding:11px 4px 0px 8px;">'
            + '<button id=bASpeichern class="L3 ui-corner-all ui-disabled" onClick="aktuellesCheck(true)" style="width:100%;background-color:#efcc44;font-weight:bold;" data-theme="e">speichern</button>'
            + '</div>'
            + '</div>'
            + '<div id="eAKTUELLES" class="M" style="background-color:#eee; border-width:5px; border-style:groove; text-align:justify"></div>'
            + '</div>'
            + '</div>';

    $('#dRumpf').html(html).trigger('create');
    eAKTUELLES = window.pell.init({
        element: document.getElementById('eAKTUELLES'),
        actions: ['bold', 'italic', 'underline', 'superscript', 'subscript', 'olist', 'ulist', 'line', 'link', 'fotoS', 'fotoM', 'fotoL', 'undo', 'redo'],
        defaultParagraphSeparator: '',
        onChange: function (html) {
            iAKTUELLES = repairPell(html);
        }
    });
    $('.pell-actionbar').attr('style', 'background-color:#ddd;border:1px solid;');

    if (CUPS.MELDAKT[stCup]) {
        $('#iSCHLAGZEILE').val(CUPS.MELDAKT[stCup]);
        eAKTUELLES.content.innerHTML = AKTUELLES;
    } else {
        eAKTUELLES.content.innerHTML = '';
    }
    iAKTUELLES = eAKTUELLES.content.innerHTML;
}

function aktuellesCheck(pSpeichern) {

    hideEinenTip();

    $('#bASpeichern').addClass('ui-disabled');

    var iSCHLAGZEILE = $('#iSCHLAGZEILE').val();

    if (!iAKTUELLES) {
        iAKTUELLES = '';
    }

    if (iSCHLAGZEILE || iAKTUELLES) {
        if (iSCHLAGZEILE.length < 12) {
            showEinenTip('#iSCHLAGZEILE', 'Die Schlagzeile muß mindesten 12 Stellen lang sein.');
            return false;
        }
        if (iSCHLAGZEILE.length > 40) {
            showEinenTip('#iSCHLAGZEILE', 'Die Schlagzeile darf maximal 40 Zeiche lang sein.');
            return false;
        }
        if (iAKTUELLES.length < 12) {
            showEinenTip('#eAKTUELLES', 'Der Infotext muß mindestens 12 Stellen lang sein.');
            return false;
        }
        var DATA = [iSCHLAGZEILE, iAKTUELLES];
    } else {
        var DATA = null;
    }

    $('#bASpeichern').removeClass('ui-disabled');

    if (!pSpeichern) {
        return;
    }

    showEinenMoment(stCup, 'Die Änderung wird gespeichert.');

    if (typeof FB !== 'object') {
        firebase.initDB(0);
    }

    firebase.database().ref('/00/CUPS/' + ("000" + stCup).slice(-3) + '/AKTUELLES')
            .set(DATA) // set ist gefählich wie sonst nichts !!!
            .then(function () {

                CUPS.MELDAKT[stCup] = iSCHLAGZEILE;
                localStorage.setItem("Abakus.CUPS", JSON.stringify(CUPS));
                AKTUELLES = JSON.parse(localStorage.getItem('Abakus.AKTUELLES')); // Um wieder alle Elemente zu haben.
                AKTUELLES[stCup] = iAKTUELLES;
                localStorage.setItem("Abakus.AKTUELLES", JSON.stringify(AKTUELLES));
                AKTUELLES = iAKTUELLES; // Wieder nur das aktuelle Element.

                hideEinenMoment();
                showAktuelles();
            })
            .catch(function (e) {
                showEineDBWarnung(e, 'writeAktuelles()');
            });
}