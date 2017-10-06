'use strict';
if ('undefined' == typeof Node) Node = { ELEMENT_NODE: 1, TEXT_NODE: 3 };
const BAS_VERS_HAUT = -1;
const BAS_PLUS_HAUT = 1;
const PERMUTER = 0;

// TODO : les traitements demandés
/*
function copier(){
    var texteBas = document.getElementById('zbas').value;
    document.getElementById('zhaut').innerHTML = texteBas;
}

function concatener() {
    var texteHaut = document.getElementById('zhaut').value;
    document.getElementById('zbas').innerHTML += texteHaut;

}
function permuter(){
    var texteHaut = document.getElementById('zhaut').value;
    var texteBas = document.getElementById('zbas').value;
    document.getElementById('zbas').innerHTML = texteHaut;
    document.getElementById('zhaut').innerHTML = texteBas;
}
*/

function fleche(mode){
    if(mode==BAS_PLUS_HAUT){
        var texteHaut = document.getElementById('zhaut').value;
        document.getElementById('zbas').value += texteHaut;
    }
    if(mode==BAS_VERS_HAUT){
        var texteBas = document.getElementById('zbas').value;
        document.getElementById('zhaut').value = texteBas;
    }
    if(mode==PERMUTER){
        var texteHaut = document.getElementById('zhaut').value;
        var texteBas = document.getElementById('zbas').value;
        document.getElementById('zbas').value = texteHaut;
        document.getElementById('zhaut').value = texteBas;
    }
}

function initButton() {
    var btn1 = document.getElementById('copier');
    initEventHandlers(btn1, 'click', function () {fleche(-1);} );
    var btn2 = document.getElementById('concatener');
    initEventHandlers(btn2, 'click', function() { fleche(1);});
    var btn3 = document.getElementById('permuter');
    initEventHandlers(btn3, 'click', function() { fleche(0);});

} // initButton

function initEventHandlers(element, event, fx) {
    if (element.addEventListener)
        element.addEventListener(event, fx, false);
    else if (element.attachEvent)
        element.attachEvent('on' + event, fx);
} // observe

initEventHandlers(window, 'load', initButton);