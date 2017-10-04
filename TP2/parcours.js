/**
 * Created by florian.flahaut on 04/10/17.
 */
// Compensation pour MSIE...
if ('undefined' == typeof Node)
    Node = { ELEMENT_NODE: 1, TEXT_NODE: 3 };

// Le coeur de l'exemple !

function getInnerText(node) {
    var result = '';
    //alert ("type:"+ node.nodeName);
    if (Node.TEXT_NODE == node.nodeType)
        return node.nodeValue;
    if (Node.ELEMENT_NODE != node.nodeType)
        return '';
    for (var index = 0; index < node.childNodes.length; ++index)
        result += getInnerText(node.childNodes.item(index));
    return result;
} // getInnerText

//** Tout le reste sert juste à faire une démo de getInnerText... **

function parcours() {
    var text = getInnerText(document.getElementById('fragmentRoot'));
    var results = document.getElementById('results');
    if (! results.hasChildNodes()) {
        var txt = document.createTextNode(text);
        results.appendChild(txt);
    }

    var h1 = document.createElement("H1");
    var br = document.createElement("br");
    var br2 = document.createElement("br");

    var nodeRemarque = document.createTextNode("mais le contenu du bouton ne s'affiche pas .... pourquoi ?");
    results.appendChild(br);
    results.appendChild(nodeRemarque);
    h1.appendChild(document.createTextNode("Un Gros titre"));


    results.appendChild(br2);
    results.appendChild(h1);

    results.style.display = '';
} // demo

function initButton() {
    var btn = document.getElementById('afficher');
    initEventHandlers(btn, 'click', parcours);
} // initButton

function initEventHandlers(element, event, fx) {
    if (element.addEventListener)
        element.addEventListener(event, fx, false);
    else if (element.attachEvent)
        element.attachEvent('on' + event, fx);
} // observe

initEventHandlers(window, 'load', initButton);