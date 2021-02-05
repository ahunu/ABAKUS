
/* global CUPS, I, hHeute, LS */


function showInserateHF() {

    $('#dCopyright').each(function () { // sonst funktioniert important nicht
        this.style.setProperty('display', 'none', 'important');
    });

    var html = '';
    var hTelefonEmail = '';

    var nRubrik = [0, 0, 0, 0, 0, 0, 0];

    var hRubrik = [
        'Ich mein ja nur',
        'Ich suche',
        'Partner gesucht',
        'Wer besucht mich',
        'Wer will mich',
        'Zu verkaufen',
        'Zu verschenken'
    ];

    var html0 = '<br><div class=M style="background-color:silver; padding: 0.8vw 2vw; border: 2px solid silver; border-radius:0.7vw; box-shadow: 6px 6px 6px rgba(0,0,0,0.6);">'
        + '<div class="M3 B">Ich mein ja nur'
        + '</div><div class="M">Das musste ich jetzt mal los werden.'
        + '</div></div><br><br>';
    var html1 = '<br><div class=M style="background-color:silver; padding: 0.8vw 2vw; border: 2px solid silver; border-radius:0.7vw; box-shadow: 6px 6px 6px rgba(0,0,0,0.6);">'
        + '<div class="M3 B">Ich suche'
        + '</div><div class="M">Ich bräuchte da noch...'
        + '</div></div><br><br>';
    var html2 = '<br><div class=M style="background-color:silver; padding: 0.8vw 2vw; border: 2px solid silver; border-radius:0.7vw; box-shadow: 6px 6px 6px rgba(0,0,0,0.6);">'
        + '<div class="M3 B;">Partner gesucht'
        + '</div><div class="M">Ob Tarockieren oder Schnapsen,<br>alleine gehts nicht.'
        + '</div></div><br><br>';
    var html3 = '<br><div class=M style="background-color:silver; padding: 0.8vw 2vw; border: 2px solid silver; border-radius:0.7vw; box-shadow: 6px 6px 6px rgba(0,0,0,0.6);">'
        + '<div class="M3 B">Wer besucht mich'
        + '</div><div class="M">Bin in Gigritzpotschn auf Kur / Urlaub<br>und suche Tarockpartner. '
        + '</div></div><br><br>';
    var html4 = '<br><div class=M style="background-color:silver; padding: 0.8vw 2vw; border: 2px solid silver; border-radius:0.7vw; box-shadow: 6px 6px 6px rgba(0,0,0,0.6);">'
        + '<div class="M3 B">Wer will mich'
        + '</div><div class="M">Wenn Mauzi oder Strolche ein neues Zuhause suchen.'
        + '</div></div><br><br>';
    var html5 = '<br><div class=M style="background-color:silver; padding: 0.8vw 2vw; border: 2px solid silver; border-radius:0.7vw; box-shadow: 6px 6px 6px rgba(0,0,0,0.6);">'
        + '<div class="M3 B">Zu verkaufen'
        + '</div><div class="M">Hilfe, meine Wohnung platzt aus allen Nähten.'
        + '</div></div><br><br>';
    var html6 = '<br><div class=M style="background-color:silver; padding: 0.8vw 2vw; border: 2px solid silver; border-radius:0.7vw; box-shadow: 6px 6px 6px rgba(0,0,0,0.6);">'
        + '<div class="M3 B">Zu verschenken'
        + '</div><div class="M">Der Rest muß jetzt auch noch weg.'
        + '</div></div><br><br>';

    for (var inserat in CUPS.INSERATE) {
        iRubrik = hRubrik.indexOf(CUPS.INSERATE[inserat].RUBRIK);

        if (CUPS.INSERATE[inserat].TELEFON) {
            hTelefonEmail = 'Telefon: ' + CUPS.INSERATE[inserat].TELEFON;
            if (CUPS.INSERATE[inserat].EMAIL) {
                hTelefonEmail += '<br>eMail: ' + CUPS.INSERATE[inserat].EMAIL;
            }
        } else {
            hTelefonEmail = 'eMail: ' + CUPS.INSERATE[inserat].EMAIL;
        }

        html = '<div id="d' + inserat.replace(/-|:/g, "") + '" class=M style="background-color:white; padding:2vw; border: 2px solid silver; border-radius:0.7vw; box-shadow: 6px 6px 6px rgba(0,0,0,0.6);">'
            + '<div class="ui-grid-b">'
            + '<div class="ui-block-a" style="width:50%;">'
            + CUPS.INSERATE[inserat].NAMEORT + '<br>Datum: ' + inserat.substr(0, 10)
            + '</div>'
            + '<div class="ui-block-b" id="t' + inserat.replace(/-|:/g, "") + '"" style="width:37%;">' + hTelefonEmail
            + '</div>'
            + '<div class="ui-block-c R" style="width:13%;">'
            + (CUPS.INSERATE[inserat].SPIELER === LS.ME
                ? '<i class="iconL zmdi-edit   noprint" onclick="jbInseratOpen(\'' + inserat + '\')" title="Das Inserat ändern."></i>' + '&nbsp;&nbsp;&nbsp;'
                + '<i class="iconL zmdi-delete noprint" onclick="jbInseratDeleteOpen(\'' + inserat + '\')" title="Das Inserat löschen."></i>'
                : (inserat > LS.INSERATEbis
                    ? '<img src="../Icons/neu.png" style="transform: rotate(' + ((Math.random() * (30 + 10)) - 10) + 'deg);" alt="neu"/>'
                    : (CUPS.INSERATE[inserat].GEAENDERT && CUPS.INSERATE[inserat].GEAENDERT > LS.INSERATEbis
                        ? '<img src="../Icons/geaendert.png" style="transform: rotate(' + ((Math.random() * (30 + 10)) - 10) + 'deg);" alt="geändert"/>'
                        : ''
                    )
                )

            )
            + '</div>'
            + '</div><br>'
            + '<div style="text-align: justify;">' + CUPS.INSERATE[inserat].INSERAT + '</div>'
            + '</div><br><br>';

        nRubrik[iRubrik]++;
        if (iRubrik === 0) {
            html0 += html;
        } else if (iRubrik === 1) {
            html1 += html;
        } else if (iRubrik === 2) {
            html2 += html;
        } else if (iRubrik === 3) {
            html3 += html;
        } else if (iRubrik === 4) {
            html4 += html;
        } else if (iRubrik === 5) {
            html5 += html;
        } else if (iRubrik === 6) {
            html6 += html;
        }
    }

    
    var hH = parseInt($(window).innerHeight() - $('#dHeader').height() - $('#footer').height() - 1);
    var html = '<div style="width:100%; margin-left: auto; margin-right: auto; overflow-y: auto; height:' + hH + 'px;">'
        + '<div  style="padding: 1em;">';
        
    var hH = parseInt($(window).innerHeight() - $('#dHeader').height() - $('#footer').height() - 3);
    var html = '<div style="width:100%; margin-left: auto; margin-right: auto; overflow-y: auto; height:' + hH + 'px;">'
            + '<div  style="padding: 1em;">';

    html = '<div style="width:100%; margin-left: auto; margin-right: auto; overflow-y: auto; height:' + parseInt($(window).innerHeight() - $('#qfHeader').height() - $('#footer').height() - 3) + 'px;">'
        + '<div style="swidth: 80%; padding: 1em; margin: 3em auto;">'
        + '&nbsp;&nbsp;<button id=bInserat  class="ui-btn ui-btn-e ui-btn-inline ui-corner-all" onclick="jbInseratOpen();">&nbsp;Ein Inserat erstellen</button><br>';

        html = '<div style="width:100%; margin-left: auto; margin-right: auto; overflow-y: auto; height:' + parseInt($(window).innerHeight() - $('#qfHeader').height() + $('#footer').height() - 4) + 'px;">'
//        + '<div style="swidth: 80%; padding: 1em; margin: 3em auto;">'
        + '&nbsp;&nbsp;<button id=bInserat  class="ui-btn ui-btn-e ui-btn-inline ui-corner-all" onclick="jbInseratOpen();">&nbsp;Ein Inserat erstellen</button><br>';

    if (nRubrik[0]) html += html0;
    if (nRubrik[1]) html += html1;
    if (nRubrik[2]) html += html2;
    if (nRubrik[3]) html += html3;
    if (nRubrik[4]) html += html4;
    if (nRubrik[5]) html += html5;
    if (nRubrik[6]) html += html6;

    html += '</div>'

    LS.INSERATEbis = new Date().toISOString();
    LS.INSERATEneu = 0;
    localStorage.setItem('Abakus.LS', JSON.stringify(LS));

    $('#qfHeaderZeile2').html('Dies & Das');
    $('#dRumpf').html(html).trigger('create');

}

function showInserateQF() {

    if (window.location.hash) {
        I = 0;
        LS.ShowCups = 0;
        history.back();
    }
    $('#qfHeaderIcon').show();
    resetLastBtn();
    LS.LastBtn = '#bInserat';
    $(LS.LastBtn).addClass('ui-btn-active');
    writeCanvas('Inserate');

    $('#dCopyright').each(function () { // sonst funktioniert important nicht
        this.style.setProperty('display', 'none', 'important');
    });

    var html = '';
    var hTelefonEmail = '';

    var nRubrik = [0, 0, 0, 0, 0, 0, 0];

    var hRubrik = [
        'Ich mein ja nur',
        'Ich suche',
        'Partner gesucht',
        'Wer besucht mich',
        'Wer will mich',
        'Zu verkaufen',
        'Zu verschenken'
    ];

    var html0 = '<br><div class=M style="background-color:silver; padding: 0.8vw 2vw; border: 2px solid silver; border-radius:0.7vw; box-shadow: 6px 6px 6px rgba(0,0,0,0.6);">'
        + '<div class="ui-grid-a">'
        + '<div class="ui-block-a XL B" style="width:40%;">Ich mein ja nur'
        + '</div><div class="ui-block-b L" style="width:60%;">Das musste ich jetzt mal los werden.'
        + '</div></div></div><br><br>';
    var html1 = '<br><div class=M style="background-color:silver; padding: 0.8vw 2vw; border: 2px solid silver; border-radius:0.7vw; box-shadow: 6px 6px 6px rgba(0,0,0,0.6);">'
        + '<div class="ui-grid-a">'
        + '<div class="ui-block-a XL B" style="width:40%;">Ich suche'
        + '</div><div class="ui-block-b L" style="width:60%;">Ich bräuchte da noch...'
        + '</div></div></div><br><br>';
    var html2 = '<br><div class=M style="background-color:silver; padding: 0.8vw 2vw; border: 2px solid silver; border-radius:0.7vw; box-shadow: 6px 6px 6px rgba(0,0,0,0.6);">'
        + '<div class="ui-grid-a">'
        + '<div class="ui-block-a XL B" style="width:40%;">Partner gesucht'
        + '</div><div class="ui-block-b L" style="width:60%;">Ob Tarockieren oder Schnapsen,<br>alleine gehts nicht.'
        + '</div></div></div><br><br>';
    var html3 = '<br><div class=M style="background-color:silver; padding: 0.8vw 2vw; border: 2px solid silver; border-radius:0.7vw; box-shadow: 6px 6px 6px rgba(0,0,0,0.6);">'
        + '<div class="ui-grid-a">'
        + '<div class="ui-block-a XL B" style="width:40%;">Wer besucht mich'
        + '</div><div class="ui-block-b L" style="width:60%;">Bin in Gigritzpotschn auf Kur / Urlaub<br>und suche Tarockpartner. '
        + '</div></div></div><br><br>';
    var html4 = '<br><div class=M style="background-color:silver; padding: 0.8vw 2vw; border: 2px solid silver; border-radius:0.7vw; box-shadow: 6px 6px 6px rgba(0,0,0,0.6);">'
        + '<div class="ui-grid-a">'
        + '<div class="ui-block-a XL B" style="width:40%;">Wer will mich'
        + '</div><div class="ui-block-b L" style="width:60%;">Wenn Mauzi oder Strolche ein neues Zuhause suchen.'
        + '</div></div></div><br><br>';
    var html5 = '<br><div class=M style="background-color:silver; padding: 0.8vw 2vw; border: 2px solid silver; border-radius:0.7vw; box-shadow: 6px 6px 6px rgba(0,0,0,0.6);">'
        + '<div class="ui-grid-a">'
        + '<div class="ui-block-a XL B" style="width:40%;">Zu verkaufen'
        + '</div><div class="ui-block-b L" style="width:60%;">Hilfe, meine Wohnung platzt aus allen Nähten.'
        + '</div></div></div><br><br>';
    var html6 = '<br><div class=M style="background-color:silver; padding: 0.8vw 2vw; border: 2px solid silver; border-radius:0.7vw; box-shadow: 6px 6px 6px rgba(0,0,0,0.6);">'
        + '<div class="ui-grid-a">'
        + '<div class="ui-block-a XL B" style="width:40%;">Zu verschenken'
        + '</div><div class="ui-block-b L" style="width:60%;">Der Rest muß jetzt auch noch weg.'
        + '</div></div></div><br><br>';

    for (var inserat in CUPS.INSERATE) {
        iRubrik = hRubrik.indexOf(CUPS.INSERATE[inserat].RUBRIK);

        if (CUPS.INSERATE[inserat].TELEFON) {
            hTelefonEmail = 'Telefon: ' + CUPS.INSERATE[inserat].TELEFON;
            if (CUPS.INSERATE[inserat].EMAIL) {
                hTelefonEmail += '<br>eMail: ' + CUPS.INSERATE[inserat].EMAIL;
            }
        } else {
            hTelefonEmail = 'eMail: ' + CUPS.INSERATE[inserat].EMAIL;
        }

        html = '<div id="d' + inserat.replace(/-|:/g, "") + '" class=M style="background-color:white; padding:2vw; border: 2px solid silver; border-radius:0.7vw; box-shadow: 6px 6px 6px rgba(0,0,0,0.6);">'
            + '<div class="ui-grid-b">'
            + '<div class="ui-block-a" style="width:50%;">'
            + CUPS.INSERATE[inserat].NAMEORT + '<br>Datum: ' + inserat.substr(0, 10)
            + '</div>'
            + '<div class="ui-block-b" id="t' + inserat.replace(/-|:/g, "") + '"" style="width:37%;">' + hTelefonEmail
            + '</div>'
            + '<div class="ui-block-c R" style="width:13%;">'
            + (CUPS.INSERATE[inserat].SPIELER === LS.ME
                ? '<i class="iconL zmdi-edit   noprint" onclick="jbInseratOpen(\'' + inserat + '\')" title="Das Inserat ändern."></i>' + '&nbsp;&nbsp;&nbsp;'
                + '<i class="iconL zmdi-delete noprint" onclick="jbInseratDeleteOpen(\'' + inserat + '\')" title="Das Inserat löschen."></i>'
                : (inserat > LS.INSERATEbis
                    ? '<img src="Icons/neu.png" style="transform: rotate(' + ((Math.random() * (30 + 10)) - 10) + 'deg);" alt="neu"/>'
                    : (CUPS.INSERATE[inserat].GEAENDERT && CUPS.INSERATE[inserat].GEAENDERT > LS.INSERATEbis
                        ? '<img src="Icons/geaendert.png" style="transform: rotate(' + ((Math.random() * (30 + 10)) - 10) + 'deg);" alt="geändert"/>'
                        : ''
                    )
                )

            )
            + '</div>'
            + '</div><br>'
            + '<div style="text-align: justify;">' + CUPS.INSERATE[inserat].INSERAT + '</div>'
            + '</div><br><br>';

        nRubrik[iRubrik]++;
        if (iRubrik === 0) {
            html0 += html;
        } else if (iRubrik === 1) {
            html1 += html;
        } else if (iRubrik === 2) {
            html2 += html;
        } else if (iRubrik === 3) {
            html3 += html;
        } else if (iRubrik === 4) {
            html4 += html;
        } else if (iRubrik === 5) {
            html5 += html;
        } else if (iRubrik === 6) {
            html6 += html;
        }
    }

    html = '<div style="width:100%; margin-left: auto; margin-right: auto; overflow-y: auto; height:' + parseInt($(window).innerHeight() - $('#qfHeader').height() - 4) + 'px;">'
        + '<div style="width: 80%; padding: 1em; margin: 3em auto;">'
        + '&nbsp;&nbsp;<button id=bInserat  class="ui-btn ui-btn-e ui-btn-inline ui-corner-all" onclick="jbInseratOpen();">&nbsp;Ein Inserat erstellen</button><br>';

    if (nRubrik[0]) html += html0;
    if (nRubrik[1]) html += html1;
    if (nRubrik[2]) html += html2;
    if (nRubrik[3]) html += html3;
    if (nRubrik[4]) html += html4;
    if (nRubrik[5]) html += html5;
    if (nRubrik[6]) html += html6;

    LS.INSERATEbis = new Date().toISOString();
    LS.INSERATEneu = 0;
    localStorage.setItem('Abakus.LS', JSON.stringify(LS));

    $('#qfHeaderZeile2').html('Dies & Das');
    $('#dRumpf').html(html).trigger('create');
    setTInserate();

}

function jbInseratDeleteOpen(pKey) {
    jbInseratDelete = new jBox('Modal', {
        title: '<div class=L3 style="background-color:#27a;border:8px solid #27a;color: white;">&nbsp;Mein Inserat löschen!</div>',
        content: '<div class=L3 style="text-align:left">&nbsp;Soll dieses Inserat<br>&nbsp;gelöscht werden?</div>'
            + '<div class="ui-grid-a">'
            + '<div class="ui-block-a" style="padding:8px">'
            + '<button class="L3 ui-corner-all" onClick="jbInseratDelete.close();" style="width:100%;white-space:nowrap;" data-theme="a">&nbsp;Abbrechen&nbsp;</button>'
            + '</div>'
            + '<div class="ui-block-b" style="padding:8px;">'
            + '<button class="L3 ui-corner-all" onClick="deleteInserat(\'' + pKey + '\');" style="width:100%;background-color:#efcc44;font-weight:bold;white-space:nowrap;" data-theme="e">&nbsp;&nbsp;&nbsp;Löschen&nbsp;&nbsp;&nbsp;</button>'
            + '</div>'
            + '</div>',
        closeButton: false
    });
    jbInseratDelete.open();

}

function deleteInserat(pKey) {

    jbInseratDelete.close();
    showEinenMoment('Mein Inserat:', 'Das Inserat wird gelöscht.');

    if (typeof FB !== 'object') {
        firebase.initDB(I);
    }

    firebase.database().ref('/00/CUPS/INSERATE/' + pKey)
        .set(null)  // ACHTUNG !!! .set(...) ist gefählich wie sonst nichts
        .then(function () {
            firebase.database().ref('/00/CUPS')
                .update({ TIMESTAMP: firebase.database.ServerValue.TIMESTAMP })
                .then(function () {
                    $('#d' + pKey.replace(/-|:/g, "")).addClass('ui-disabled');
                    $('#t' + pKey.replace(/-|:/g, "")).addClass('cRot').addClass('B').text('GELÖSCHT!');
                    LS.INSERATEanz--;
                    localStorage.setItem('Abakus.LS', JSON.stringify(LS));
                    setTInserate();
                    delete CUPS.INSERATE[pKey];
                    hideEinenMoment();
                })
                .catch(function (error) {
                    showEinenDBFehler(error);
                });
        })
        .catch(function (error) {
            showEinenFehler('Internet Verbindungsfehler.<br>' + error, 'Später noch mal probieren.');
        });
}

function jbInseratOpen(pInserat) {

    if (typeof pInserat === "undefined") {
        pInserat = null;
    }

    var hBisDatum = Date.now();
    if (pInserat) {
        hBisDatum = new Date(pInserat.substr(0, 19) + '.' + pInserat.substr(20));
        hBisDatum = hBisDatum.getTime();
    }

    hBisDatum = new Date(hBisDatum + (86400000 * 90)).toISOString().substr(0, 10); // + 90 Tage

    var hINSERAT = '';
    var hRUBRIK = '';
    var hTELEFON = '';
    var hEMAIL = '';

    if (pInserat) {
        hINSERAT = CUPS.INSERATE[pInserat].INSERAT;
        hRUBRIK = CUPS.INSERATE[pInserat].RUBRIK;
        hTELEFON = CUPS.INSERATE[pInserat].TELEFON;
        hEMAIL = CUPS.INSERATE[pInserat].EMAIL;
    }

    var SPIELERnr = JSON.parse(localStorage.getItem('Abakus.SPIELERnr'));

    var hNameOrt = SPIELERnr[LS.ME][2];
    if (hNameOrt.indexOf(',') > 0) {
        hNameOrt = hNameOrt.substr(0, hNameOrt.indexOf(','));
    }
    hNameOrt = LS.MEname + ', ' + hNameOrt;

    hSelect = [
        'Ich mein ja nur',
        'Ich suche',
        'Partner gesucht',
        'Wer besucht mich',
        'Wer will mich',
        'Zu verkaufen',
        'Zu verschenken'
    ];

    if (!jbInserat) {
        jbInserat = new jBox('Modal', {
            title: '<div class=L2 style="background-color:#27a;border:8px solid #27a;color: white;width:70vw;">&nbsp;Meine Inserat</div>',
            content: '<div class="M2">'

                + '<div class="ui-grid-b">'
                + '<div class="ui-block-a" style="width:7vw;">Rubrik:</div>'
                + '<div class="ui-block-b" style="width:22vw;">'

                + '<select class="ui-btn ui-btn-d" id="iRUBRIK" data-collapsed="true">'
                + '<option value="" class="cRot" hidden>Wähle eine Rubrik&nbsp;</option>'
                + '<option value="' + hSelect[0] + '">' + hSelect[0] + '</option>'
                + '<option value="' + hSelect[1] + '">' + hSelect[1] + '</option>'
                + '<option value="' + hSelect[2] + '">' + hSelect[2] + '</option>'
                + '<option value="' + hSelect[3] + '">' + hSelect[3] + '</option>'
                + '<option value="' + hSelect[4] + '">' + hSelect[4] + '</option>'
                + '<option value="' + hSelect[5] + '">' + hSelect[5] + '</option>'
                + '<option value="' + hSelect[6] + '">' + hSelect[6] + '</option>'
                + '</select>'

                + '</div>'
                + '<div class="ui-block-c" style="width:40vw;">'
                + '<div id="tRUBRIK" style="xwidth:62%;line-break:auto"></div><br>'
                + '</div>'
                + '</div>'


                + '<div class="ui-grid-b">'
                + '<div class="ui-block-a" style="width:8vw;">Inserat:</div>'
                + '<div class="ui-block-b" style="width:62vw;">'
                + '<div id="eINSERAT" class="M" style="height:33vh;background-color:#eee; border-width:5px; border-style:groove; text-align:justify"></div>'
                + '</div>'
                + '</div><br>'

                + '<div class="ui-grid-c">'
                + '<div class="ui-block-a" style="width:8vw;">Inserent:</div>'
                + '<div class="ui-block-b" style="width:33vw;" id="iNAMEORT">' + hNameOrt + '</div>'
                + '<div class="ui-block-c" style="width:7vw;">Telefon:</div>'
                + '<div class="ui-block-d" style="width:21vw;">'
                + '<input data-clear-btn="false" id="iTELEFON" class="ciINSERAT M">'
                + '</div>'
                + '</div>'

                + '<div class="ui-grid-d">'
                + '<div class="ui-block-a" style="width:41vw;"></div>'
                + '<div class="ui-block-b" style="width:7vw;">Email:</div>'
                + '<div class="ui-block-c" style="width:21vw;">'
                + '<input data-clear-btn="false" id="iEMAIL" class="ciINSERAT M">'
                + '</div>'
                + '</div>'

                + '</div>'
                + '<div class="ui-grid-b">'
                + '<div class="ui-block-a" style="width:39%;padding:11px 8px 0px 4px;">'
                + '<button class="L ui-corner-all" onClick="hideEinenTip();jbInserat.close();" style="width:100%;" data-theme="a">abbrechen</button>'
                + '</div>'
                + '<div class="ui-block-b" style="width:31%;padding:11px 4px 0px 4px;">'
                + '<button class="L ui-corner-all" onClick="hideEinenTip();$(\'.ciINSERAT\').val(\'\').focus();" style="width:100%;">clear</button>'
                + '</div>'
                + '<div class="ui-block-c" style="width:30%;padding:11px 4px 0px 8px;">'
                + '<button class="L3 ui-corner-all" onClick="submitINSERAT();" style="width:100%;background-color:#efcc44;font-weight:bold;" data-theme="e">OK</button>'
                + '</div>'
                + '</div>'
                + '<div style="width:68vw;text-align=justify;" class="S J"><br>Dieses Inserat wird in Abakus bis zum ' + hBisDatum + ' sichtbar sein. Gesetzeswidrige, obszöne oder gewalt&shy;verherr&shy;lichende Inhalte sind nicht gestattet. Der Inhaber von Abakus behält es sich vor Inserate ohne der Angabe von Gründen zu löschen.</div>',
            closeButton: false
        });

        setTimeout(function () {
            eINSERAT = window.pell.init({
                element: document.getElementById('eINSERAT'),
                actions: ['bold', 'italic', 'underline', 'superscript', 'subscript', 'olist', 'ulist', 'line', 'link', 'undo', 'redo'],
                defaultParagraphSeparator: ''
            });
            $('.pell-actionbar').attr('style', 'background-color:#ddd;border:1px solid;');
        });
    }

    jbInserat.open();

    function setRubrik(pRubrik) {
        if (pRubrik === "Ich mein ja nur") {
            $("#tRUBRIK").text("Das musste ich jetzt einfach mal los werden.");
        } else if (pRubrik === "Ich suche") {
            $("#tRUBRIK").text("Ich bräuchte da noch...");
        } else if (pRubrik === "Partner gesucht") {
            $("#tRUBRIK").text("Ob tarockieren, schnapsen oder pfitschigogerln, alleine gehts schwer.");
        } else if (pRubrik === "Wer besucht mich") {
            $("#tRUBRIK").text("Ich werde in drei Monaten in XY meine Kur, meine Urlaub, einen Spitalsaufenthalt antreten.");
        } else if (pRubrik === "Wer will mich") {
            $("#tRUBRIK").text("Wenn Mauzi oder Strolche ein neues Zuhause suchen.");
        } else if (pRubrik === "Zu verkaufen") {
            $("#tRUBRIK").text("Hilfe, meine Wohnung platzt aus allen Nähten.");
        } else if (pRubrik === "Zu verschenken") {
            $("#tRUBRIK").text("Der Rest muß jetzt auch noch weg.");
        } else {
            $("#tRUBRIK").text("");
        }
    }

    setTimeout(function () {
        if (pInserat) {
            $("#iRUBRIK").val(CUPS.INSERATE[pInserat].RUBRIK);
            setRubrik(CUPS.INSERATE[pInserat].RUBRIK);
            eINSERAT.content.innerHTML = CUPS.INSERATE[pInserat].INSERAT;
            $('#iTELEFON').val(CUPS.INSERATE[pInserat].TELEFON);
            $('#iEMAIL').val(CUPS.INSERATE[pInserat].EMAIL);
        } else {
            $("#iRUBRIK").val("");
            setRubrik("");
            eINSERAT.content.innerHTML = "";
            $('#iTELEFON').val("");
            $('#iEMAIL').val("");
        }
        $('.pell-content').css('padding', '11px').css('height',
            ($("#eINSERAT").height() - $(".pell-actionbar:first-child").height() - 5)
            + 'px').focus();
    }, 100);

    $('#iRUBRIK').change(function () {
        setRubrik($("#iRUBRIK").blur().val());
    });
}

function submitINSERAT(pKey) {

    hideEinenTip();

    var DATA = new Object();

    DATA.SPIELER = LS.ME;
    DATA.NAMEORT = $("#iNAMEORT").text();
    DATA.RUBRIK = $("#iRUBRIK").val();
    DATA.TELEFON = $("#iTELEFON").val();
    DATA.EMAIL = $("#iEMAIL").val();
    DATA.INSERAT = repairPell(eINSERAT.content.innerHTML);
    if (!DATA.EMAIL) {
        DATA.EMAIL = null;
    }
    if (!DATA.TELEFON) {
        DATA.TELEFON = null;
    }

    if (DATA.RUBRIK === '') {
        showEinenTip("#iRUBRIK", 'In welcher Rubrik soll dein Inserat erscheinen?');
        return;
    }

    if (!DATA.TELEFON && !DATA.EMAIL) {
        showEinenTip("#iTELEFON", 'Bitte Telefon oder Email angeben.');
        return;
    }

    if (DATA.TELEFON && DATA.TELEFON.length < 8) {
        showEinenTip("#iTELEFON", 'Bitte eine vollständige Telefonnummer angeben.');
        return;
    }

    if (DATA.EMAIL && DATA.EMAIL.length < 8) {
        showEinenTip("#iTELEFON", 'Bitte eine vollständige Telefonnummer angeben.');
        return;
    }

    var hSave = pKey;
    if (!pKey) {
        hSave = (new Date().toISOString()).replace(/\./g, ':');
        showEinenMoment('Inserat von', 'Das Inserat wird erstellt.');
    } else {
        showEinenMoment('Inserat von', 'Das Inserat wird geändert.');
    }

    if (typeof FB !== 'object') {
        firebase.initDB(I);
    }

    firebase.database().ref('/00/CUPS/INSERATE/' + hSave)
        .update(DATA)  // ACHTUNG !!! .set(...) ist gefählich wie sonst nichts
        .then(function () {
            firebase.database().ref('/00/CUPS')
                .update({ TIMESTAMP: firebase.database.ServerValue.TIMESTAMP })
                .then(function () {
                    if (!CUPS.INSERATE) {
                        CUPS.INSERATE = {};
                    }
                    CUPS.INSERATE[hSave] = DATA;
                    localStorage.setItem('Abakus.CUPS', JSON.stringify(CUPS));
                    if (pKey) {
                        LS.Meldung = 'Das Inserat wurde gespeichert!';
                    } else {
                        LS.INSERATEanz++;
                        setTInserate();
                        LS.Meldung = 'Das Inserat wurde gespeichert!';
                    }
                    LS.Meldung = 'Das Inserat wurde gespeichert!';
                    localStorage.setItem('Abakus.LS', JSON.stringify(LS));
                    hideEinenMoment();
                    jbInserat.close();
                    showInserateQF();
                })
                .catch(function (error) {
                    showEinenDBFehler(error);
                });
        })
        .catch(function (error) {
            showEinenFehler('Internet Verbindungsfehler.', 'Später noch mal probieren.');
            console.error("submitINSERAT: Nix is OK !");
        });
}