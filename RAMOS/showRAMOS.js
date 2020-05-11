
// 19 erfasst
// 25 nicht genehmigt
// 29 genehmigt
// 30 in arbeit
// 35 abgebrochen
// 39 erledidigt
// 40

const DATA = [
    ['22. April', 'CM1', '07:00', '09:00', 39, 'AiH', 'Ottokar Hans', 'Öl wechseln', '06:55', '11:25', '', '', '', '', '', '', '', '', ''],
    ['22. April', 'CM1', '09:00', '17:00', 39, 'HEI', 'Ottokar Hans', 'Auftrag 3943', '11:30', '14:20', '', '', '', '', '', '', '', '', ''],
    ['22. April', 'CM2', '07:00', '17:00', 39, 'HUB', 'Klause Maria', 'Motor tauschen', '06:33', '17:00', '', '', '', '', '', '', '', '', ''],
    ['22. April', 'CM3', '07:00', '17:00', 39, 'BeR', 'Huber Franz', 'Service', '07:02', '19:10', '', '', '', '', '', '', '', '', ''],
    ['22. April', 'CM4', '07:00', '17:00', 39, 'HEI', 'Drumm Doris', 'Auftrag 3493', '07:00', '17:00', '', '', '', '', '', '', '', '', ''],
    ['22. April', 'CM5', '07:00', '17:00', 39, 'HEI', 'Klamm Franz', 'Auftrag 3432', '07:33', '17:00', '', '', '', '', '', '', '', '', ''],
    ['22. April', 'KF1', '07:00', '17:00', 39, 'AiH', 'Murauer Sepp', 'Auftrag 3934', '06:55', '21:10', '', '', '', '', '', '', '', '', ''],
    ['22. April', 'KF2', '07:00', '17:00', 25, 'HUB', '', 'Service', '', '', '', '', '', '', '', '', '', '', ''],
    ['22. April', 'KF3', '07:00', '17:00', 25, 'HEI', '', 'Auftrag 3043', '', '', '', '', '', '', '', '', '', '', ''],
    ['22. April', 'KF4', '07:00', '17:00', 39, 'HEI', 'Baier Rudi', 'Auftrag 3043', '07:12', '15:30', '', '', '', '', '', '', '', '', ''],
    ['22. April', 'KF5', '07:00', '17:00', 35, 'HEI', 'Schauer Kurt', 'Auftrag 3043', '06:45', '6:53', '', '', '', '', '', '', '', '', ''],
    ['22. April', 'UMW', '07:00', '17:00', 39, 'HUB', 'Bauer Franz', 'Lager wechseln', '07:00', '17:10', '', '', '', '', '', '', '', '', ''],
    ['22. April', 'TT1', '07:00', '17:00', 39, 'BeR', 'Klauser Sepp', 'Auftrag 3033', '07:00', '17:12', '', '', '', '', '', '', '', '', ''],
    ['22. April', 'TT2', '07:00', '17:00', 39, 'HUB', 'Maier Franz', 'Auftrag 3433', '07:00', '16:04', '', '', '', '', '', '', '', '', ''],

    ['23. April', 'CM1', '07:00', '09:00', 30, 'AiH', 'Ottokar Hans', 'Öl wechseln', '', '', '', '', '', '', '', '', ''],
    ['23. April', 'CM1', '09:00', '17:00', 30, 'HEI', 'Ottokar Hans', 'Auftrag 3943', '', '', '', '', '', '', '', '', ''],
    ['23. April', 'CM2', '07:00', '17:00', 30, 'HUB', 'Klause Maria', 'Motor tauschen', '', '', '', '', '', '', '', '', ''],
    ['23. April', 'CM3', '07:00', '17:00', 30, 'BeR', 'Huber Franz', 'Service', '', '', '', '', '', '', '', '', ''],
    ['23. April', 'CM4', '07:00', '17:00', 35, 'HEI', 'Drumm Doris', 'Auftrag 3493', '', '', '', '', '', '', '', '', ''],
    ['23. April', 'CM5', '07:00', '17:00', 35, 'HEI', 'Klamm Franz', 'Auftrag 3432', '', '', '', '', '', '', '', '', ''],
    ['23. April', 'KF1', '07:00', '17:00', 25, 'AiH', '', 'Auftrag 3934', '', '', '', '', '', '', '', '', ''],
    ['23. April', 'KF2', '07:00', '17:00', 29, 'HUB', '', 'Service', '', '', '', '', '', '', '', '', ''],
    ['23. April', 'KF3', '07:00', '17:00', 29, 'HEI', '', 'Auftrag 3043', '', '', '', '', '', '', '', '', ''],
    ['23. April', 'KF4', '07:00', '17:00', 29, 'HEI', '', 'Auftrag 3043', '', '', '', '', '', '', '', '', ''],
    ['23. April', 'KF5', '07:00', '17:00', 29, 'HEI', '', 'Auftrag 3043', '', '', '', '', '', '', '', '', ''],
    ['23. April', 'UMW', '07:00', '17:00', 19, 'HUB', '', 'Lager wechseln', '', '', '', '', '', '', '', '', ''],
    ['23. April', 'TT1', '07:00', '17:00', 19, 'BeR', '', 'Auftrag 3033', '', '', '', '', '', '', '', '', ''],
    ['23. April', 'TT2', '07:00', '17:00', 19, 'HUB', '', 'Auftrag 3433', '', '', '', '', '', '', '', '', '']
];

function showRAMOS(pStatusListe) {

    var mMitgespielt = false;

    if (QUERFORMAT()) {
        if (lastBtn) {
            $(lastBtn).removeClass('ui-btn-active');
        }
        lastBtn = '#b' + pStatusListe;
        $(lastBtn).addClass('ui-btn-active');
    }

    $("#dCopyright").hide();

    writeCanvas(pStatusListe);

    $('#iEdit').removeClass('cBlau B');

    var i = 0;
    var nAA = 0;
    var hClass = '';

    stNamenLen = 0.38;

    tStatus = [];
    tStatus[19] = 'Erfasst';
    tStatus[29] = 'Genehmigt';
    tStatus[30] = 'In arbeit';
    tStatus[35] = 'Abgebrochen';
    tStatus[39] = 'erledidigt';

    if (STAT._LASTTURNIER && STAT._LASTTURNIER.substr(0, 10) === pStatusListe) {
        if (!LS.GelesenSTAT[stCup] || LS.GelesenSTAT[stCup] !== CUPS.MELDSTAT[stCup]) {
            LS.GelesenSTAT[stCup] = CUPS.MELDSTAT[stCup];
            localStorage.setItem('Abakus.LS', JSON.stringify(LS));
        } else if (LS.GelesenSTAT[stCup]) {
            LS.GelesenSTAT[stCup] = null;
            localStorage.setItem('Abakus.LS', JSON.stringify(LS));
        }
    }

    var html = getStatMeldungen()
            + (QUERFORMAT() ? "<div id='dFilter' class='noprint'><input class='N M' id='iFilter' placeholder='Nachname, Vorname," + (QUERFORMAT() ? " Ort," : "") + " ...'></div>" : "")
            + "<table id=mTable data-role='table' data-filter='true' data-input='#iFilter' data-mode='columntoggle' cellspacing='0' class='table ui-body-d ui-shadow ui-responsive table-stripe' data-column-btn-text=''><thead>"
            + "<tr id='L0P1' class='bGrau'>"
            + "<th class=TR>#&nbsp;&nbsp;</th>"
            + '<th class="TC tooltip" data-jbox-title="Title 1" data-jbox-content="Content 1">Hover me!</th>'
            + "<th class=TR>R1&nbsp;</th>"
            + "<th class=TR>R2&nbsp;</th>"
            + "<th class=TR>R3&nbsp;</th>"
            + "</tr></thead><tbody id=tbody>"
            + (!QUERFORMAT() ? "<tr id='rFilter'><td colspan='5'><input class='N M' id='iFilter' placeholder='Nachname, Vorname, ...'></td>"
                    + "<td class=TC><i id='icFilter' onclick='$(this).addClass(\"ui-disabled\");$(\"#iFilter\").val(\"\").blur();$(\"#tbody\").find(\"tr\").show();' class='i zmdi-plus-bold zmdi-hc-rotate-45 ui-disabled'></i></td></tr>" : "");

    if (LS.ME !== "NOBODY") {
        var hIcons = ['#iPrint', '#iDownload'];
        if (mMitgespielt) {
            hIcons.unshift('#iScrollToMe'); // #iScrollToMe auf [0].
        }
        showIcons(hIcons);
    }

    var hTag = '';
    var hBG = '';

    for (var iAA = 0; iAA < DATA.length; iAA++) {

        if (DATA[iAA][4] === pStatusListe) {

            nAA++;
            if (hBG === 'bBeige2') {
                hBG = 'bBeige';
            } else {
                hBG = 'bBeige2';
            }

            if (hTag !== DATA[iAA][0]) {
                if (hTag) {
                    html += '<tr class="bGrau"><td></td><th>Mittwoch 22. April 2020</th></tr>';
                } else {
                    html += '<tr class="bGrau"><td></td><th>Donnerstag 23. April 2020</th></tr>';
                }
                hTag = DATA[iAA][0];
            }

//            if (iSpieler === LS.ME) {
//                hClass = 'bBeige';
//            } else {
//                hClass = '';
//                if (istFreund(iSpieler)) {
//                    hClass = ' bBeige2';
//                }
//                if (LS.tempVIPs) {
//                    if (LS.tempVIPs.indexOf(iSpieler) > 0) {
//                        hClass = ' bBeige2';
//                    }
//                }
//            }



            html += '<tr class="' + hClass + '">'
                    + '<td class="TC">&nbsp;' + DATA[iAA][1] + '.&nbsp;</td>'
                    + '<td class="TC">&nbsp;' + DATA[iAA][1] + '.&nbsp;</td>'
                    + '<td class="TC">&nbsp;' + DATA[iAA][1] + '.&nbsp;</td>'
                    + '<td class="TC">&nbsp;' + DATA[iAA][1] + '.&nbsp;</td>'
                    + '</tr>';
        }
    }

    html += "</tbody></table><br>";

    if (QUERFORMAT()) {
        $('#dRumpf').html(html + "<table width=100% data-role='table' data-mode='columntoggle' cellspacing='0' class='table XXS'>"
                + "<tbody><tr>"
                + "<td>&nbsp;&nbsp;&nbsp;&copy; 2015-" + new Date().getFullYear() + " by Leo Luger</td>"
                + "<td class=TC>" + (stCup === 56 ? "" : "") + "</td>"
                + (stCup === 53 ? "<td class=TR>tarock.web.app?Sauwaldcup&nbsp;</td>" : "")
                + (stCup === 54 ? "<td class=TR>tarock.web.app?St.Tarockcup&nbsp;</td>" : "")
                + (stCup === 55 ? "<td class=TR>tarock.web.app?Tirolcup&nbsp;</td>" : "")
                + (stCup === 56 ? "<td class=TR>tarock.web.app?Wr.Tarockcup&nbsp;</td>" : "")
                + (stCup === 15 ? "<td class=TR>tarock.web.app?Stadl Tarock&nbsp;</td>" : "")
                + "</tr></tbody></table>").css('margin-top', $('#qfHeader').height() + 'px');
        $('#tStand').hide();
    } else {
//        $('#sideContent').css('height', '2px');
        $('#sideTurniere').hide();
        $("#dContent").html(html + "&nbsp;&nbsp;&nbsp;<span class='XXS'>&copy; 2015-" + new Date().getFullYear() + " by Leo Luger<br><br></span>");
        $('#sideTurniere').hide();
        $('#nbUebersicht,#nbSaison,#nbArchiv').removeClass('ui-disabled').removeClass('ui-btn-active');
        var hx = $(window).innerHeight() - $('#sideContent').offset().top - 1;
        $('#sideContent').css('height', hx + 'px').scrollTop(0);
        $('#nbTurniere,.nbFilter').removeClass('ui-btn-active');
    }

    hideEinenMoment();
    setFont(4.7, true);

//    if (QUERFORMAT()) {
    window.scrollTo(0, 0);
    if (window.navigator.userAgent.indexOf("MSIE ") === -1) {
        $('#mTable').stickyTableHeaders({cacheHeaderHeight: true, "fixedOffset": $('#qfHeader')});
    }
//    }

    if (QUERFORMAT() && PC) {
        $(".cBlau,.cSchwarz").on("mouseenter", function () {
            $("#sideTurniere,#sideContent").hide();
            var hID = $(this).attr('id');
            html = '<div data-role="navbar">'
                    + '<ul>'
                    + '<li><a href="#" class="ui-btn-active">'
                    + ((isNaN(hID.substr(2)) || !PC) ? '' : '<span class="N">' + hID.substr(2) + '</span>&nbsp;&nbsp;') + getSpielerName(hID.substr(2)).replace(' ', '&nbsp;') + (iSaison === 1 ? '' : '&nbsp;&nbsp;-&nbsp;&nbsp;' + stSaison + ' ') + (!isNaN(hID.substr(2)) && isVERSTORBEN(SPIELER[hID.substr(2)][4]) ? '&nbsp;&#134;' : '') + (QUERFORMAT() && stStat !== "Platzierungen" ? '' : '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + getSpielerOrt(hID.substr(2), true))
                    + '</a></li>'
                    + '</ul>'
                    + '</div>';
            $("#sideSpieler").html(html + getSpieler(hID.substr(2))).trigger('create').show();
        });
        $('.cBlau,.cSchwarz').on("mouseleave", function () {
            $("#sideSpieler").hide();
            $("#sideTurniere,#sideContent").show();
        });
    }

    new jBox('Tooltip', {
        attach: '.tooltip',
        getTitle: 'data-jbox-title',
        getContent: 'data-jbox-content'
    });

}
