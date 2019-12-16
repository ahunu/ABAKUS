/* global LS, stCup, CUPS, stDetTurCupGes, STAT, stDetI, aDET, stTurCupGes, stDetOption, stAnzSpalten, QUERFORMAT(), stGruppiert, stOption, stKolonne, stStat, statDiagramm, setFont, stIndME */

function statQuoten() {
    'use strict';

//    stKolonne++;
//    stDetTurCupGes[0] = stTurCupGes;
//    stDetTurCupGes[stKolonne] = stTurCupGes;
//    stDetOption   [stKolonne] = stOption;
//
//    lastOption = stOption;
//
//    showDetailStat2(stKolonne, pInd, true);

    writeCanvas('Quoten');

    $('.ui-btn-active').removeClass('ui-btn-active');

    $('#sortUndLayout').hide();
    if (stCup === 8) {
        $('#SP1').html("<table data-role='table' style='width:100vw' data-mode='columntoggle' class='M3 ui-body-d ui-shadow table-stripe ui-responsive' data-column-btn-text=''>"
                + "<thead>"
                + "<tr class='bGrau'><th>Spieler</th><th>3.</th><th>2.</th><th>1.</th></tr>"
                + "</thead>"
                + "<tbody>"
                + "<tr><td class=TC> 4</td><td class=TC> 2</td><td class=TC> 4</td><td class=TC> 6</td></tr>"
                + "<tr><td class=TC> 5</td><td class=TC> 3</td><td class=TC> 6</td><td class=TC> 9</td></tr>"
                + "<tr><td class=TC> 6</td><td class=TC> 3,5</td><td class=TC> 7</td><td class=TC> 10,5</td></tr>"
                + "<tr><td class=TC> 7</td><td class=TC> 4,5</td><td class=TC> 9</td><td class=TC> 13,5</td></tr>"
                + "<tr><td class=TC> 8</td><td class=TC> 5</td><td class=TC> 10</td><td class=TC> 15</td></tr>"
                + "<tr><td class=TC> 9</td><td class=TC> 5</td><td class=TC> 10</td><td class=TC> 15</td></tr>"
                + "<tr><td class=TC> 10</td><td class=TC> 6</td><td class=TC> 12</td><td class=TC> 18</td></tr>"
                + "<tr><td class=TC> 11</td><td class=TC> 7</td><td class=TC> 14</td><td class=TC> 21</td></tr>"
                + "<tr><td class=TC> 12</td><td class=TC> 7</td><td class=TC> 14</td><td class=TC> 21</td></tr>"
                + "<tr><td class=TC> 13</td><td class=TC> 8</td><td class=TC> 16</td><td class=TC> 24</td></tr>"
                + "<tr><td class=TC> 14</td><td class=TC> 9</td><td class=TC> 18</td><td class=TC> 27</td></tr>"
                + "<tr><td class=TC> 15</td><td class=TC> 10</td><td class=TC> 20</td><td class=TC> 30</td></tr>"
                + "<tr><td class=TC> 16</td><td class=TC> 11</td><td class=TC> 22</td><td class=TC> 33</td></tr>"
                + "<tr><td class=TC> 17</td><td class=TC> 11</td><td class=TC> 22</td><td class=TC> 33</td></tr>"
                + "<tr><td class=TC> 18</td><td class=TC> 12</td><td class=TC> 24</td><td class=TC> 36</td></tr>"
                + "<tr><td class=TC> 19</td><td class=TC> 13</td><td class=TC> 26</td><td class=TC> 49</td></tr>"
                + "<tr><td class=TC> 20</td><td class=TC> 14</td><td class=TC> 28</td><td class=TC> 42</td></tr>"
                + "</tbody></table><br>");
    } else {
        $('#SP1').html("<table data-role='table' style='width:100vw' data-mode='columntoggle' class='M3 ui-body-d ui-shadow table-stripe ui-responsive' data-column-btn-text=''>"
                + "<thead>"
                + "<tr class='bGrau'><th>Spieler</th><th>3.</th><th>2.</th><th>1.</th></tr>"
                + "</thead>"
                + "<tbody>"
                + "<tr><td class=TC> 4</td><td class=TC> 5</td><td class=TC> 10</td><td class=TC> 15</td></tr>"
                + "<tr><td class=TC> 5</td><td class=TC> 6</td><td class=TC> 12</td><td class=TC> 18</td></tr>"
                + "<tr><td class=TC> 6</td><td class=TC> 8</td><td class=TC> 16</td><td class=TC> 24</td></tr>"
                + "<tr><td class=TC> 7</td><td class=TC> 9</td><td class=TC> 18</td><td class=TC> 27</td></tr>"
                + "<tr><td class=TC> 8</td><td class=TC> 10</td><td class=TC> 20</td><td class=TC> 30</td></tr>"
                + "<tr><td class=TC> 9</td><td class=TC> 11</td><td class=TC> 22</td><td class=TC> 33</td></tr>"
                + "<tr><td class=TC> 10</td><td class=TC> 13</td><td class=TC> 26</td><td class=TC> 39</td></tr>"
                + "<tr><td class=TC> 11</td><td class=TC> 15</td><td class=TC> 30</td><td class=TC> 45</td></tr>"
                + "<tr><td class=TC> 12</td><td class=TC> 16</td><td class=TC> 32</td><td class=TC> 48</td></tr>"
                + "<tr><td class=TC> 13</td><td class=TC> 18</td><td class=TC> 36</td><td class=TC> 54</td></tr>"
                + "<tr><td class=TC> 14</td><td class=TC> 20</td><td class=TC> 40</td><td class=TC> 60</td></tr>"
                + "<tr><td class=TC> 15</td><td class=TC> 21</td><td class=TC> 42</td><td class=TC> 63</td></tr>"
                + "<tr><td class=TC> 16</td><td class=TC> 23</td><td class=TC> 46</td><td class=TC> 69</td></tr>"
                + "<tr><td class=TC> 17</td><td class=TC> 25</td><td class=TC> 50</td><td class=TC> 75</td></tr>"
                + "<tr><td class=TC> 18</td><td class=TC> 26</td><td class=TC> 52</td><td class=TC> 78</td></tr>"
                + "<tr><td class=TC> 19</td><td class=TC> 28</td><td class=TC> 36</td><td class=TC> 84</td></tr>"
                + "<tr><td class=TC> 20</td><td class=TC> 30</td><td class=TC> 60</td><td class=TC> 90</td></tr>"
                + "</tbody></table><br>");
    }
}