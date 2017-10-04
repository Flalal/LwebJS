/**
 * Created by florian.flahaut on 04/10/17.
 */
// calculatrice.js

var tableBoutons = {
    0:{balise:"INPUT",attributs:{type:"button",id:"7",value:7,'class':"bouton-simple"}},
    1:{balise:"INPUT",attributs:{type:"button",id:"8",value:8,'class':"bouton-simple"}},
    2:{balise:"INPUT",attributs:{type:"button",id:"9",value:9,'class':"bouton-simple"}},
    3:{balise:"INPUT",attributs:{type:"button",id:"/",value:"/",'class':"bouton-simple"}},
    4:{balise:"BR",attributs:null},
    5:{balise:"INPUT",attributs:{type:"button",id:"4",value:4,'class':"bouton-simple"}},
    6:{balise:"INPUT",attributs:{type:"button",id:"5",value:5,'class':"bouton-simple"}},
    7:{balise:"INPUT",attributs:{type:"button",id:"6",value:6,'class':"bouton-simple"}},
    8:{balise:"INPUT",attributs:{type:"button",id:"*",value:"*",'class':"bouton-simple"}},
    9:{balise:"BR",attributs:null},
    10:{balise:"INPUT",attributs:{type:"button",id:"1",value:1,'class':"bouton-simple"}},
    11:{balise:"INPUT",attributs:{type:"button",id:"2",value:2,'class':"bouton-simple"}},
    12:{balise:"INPUT",attributs:{type:"button",id:"3",value:3,'class':"bouton-simple"}},
    13:{balise:"INPUT",attributs:{type:"button",id:"-",value:"-",'class':"bouton-simple"}},
    14:{balise:"BR",attributs:null},
    15:{balise:"INPUT",attributs:{type:"button",id:"0",value:0,'class':"bouton-double"}},
    16:{balise:"INPUT",attributs:{type:"button",id:"3",value:3,'class':"bouton-simple"}},
    17:{balise:"INPUT",attributs:{type:"button",id:"-",value:"-",'class':"bouton-simple"}},
    18:{balise:"BR",attributs:null},
    19:{balise:"INPUT",attributs:{type:"button",id:"-",value:"=",'class':"bouton-quadruple"}}
};




function ajouterNoeud (div, tab) {
    var bouton = document.createElement(tab['balise']);
    var attributs = tab['attributs'];
    var parametres = tab['parametres'];
    if (attributs != null) {
        for (var i in attributs ) {
            bouton.setAttribute(i,attributs[i]);
        }
    }
    div.appendChild(bouton);
    if (typeof(parametres)=='function') {
        initEventHandlers(bouton,'click',parametres);
    } else if (typeof(parametres)== 'undefined'){
        initEventHandlers(bouton, 'click', function () {alert("Je suis en vacances !");} );
    }
}




function modeCalculatrice (mode) {
    alert("Mode : "+mode);
}
function initButton() {
    var btn1 = document.getElementById('modeClassique');
    initEventHandlers(btn1, 'click', function() {modeCalculatrice(0);});
    var btn2 = document.getElementById('modeScientifique');
    initEventHandlers(btn2, 'click', function() {modeCalculatrice(1);});
} // initButton

function initEventHandlers(element, event, fx) {
    if (element.addEventListener)
        element.addEventListener(event, fx, false);
    else if (element.attachEvent)
        element.attachEvent('on' + event, fx);
} // observe

initEventHandlers(window, 'load', initButton);



function verifMode(mode){
    var body = document.getElementsByTagName("body").item(0);

    if(body.childElementCount!=1){
        var res = document.getElementById("resultat");
        var calc = document.getElementById("laCalculatrice");
        body.removeChild(res);
        body.removeChild(calc);

        if(mode == 0 ){
            var scientifique = document.getElementById("laCalculatriceScientifique");
            body.removeChild(scientifique);
        }
    }
}

function modeCalculatrice(mode){
    verifMode(mode);

    var body = document.getElementsByTagName("body").item(0);
    var modeScience = document.getElementById('modeScientifique');
    var modeClassique = document.getElementById('modeClassique');

    var divResultat = document.createElement("div");
    var divLaCalculatrice = document.createElement("div");

    divResultat.setAttribute("id","resultat");
    divLaCalculatrice.setAttribute("id","laCalculatrice");
    divResultat.setAttribute("class","resultat-classique");
    divLaCalculatrice.setAttribute("class","calc-simple");

    if(mode==1) { // scientifique


        var divLaCalculatriceScientifique = document.createElement("div");

        divResultat.setAttribute("id","resultat");
        divResultat.setAttribute("class","resultat-scientifique");
        divLaCalculatriceScientifique.setAttribute("id","laCalculatriceScientifique")
        divLaCalculatriceScientifique.setAttribute("class","calc-scientifique")

        body.appendChild(divResultat);
        body.appendChild(divLaCalculatriceScientifique);
        body.appendChild(divLaCalculatrice);

        modeScience.disabled = true;
        modeClassique.disabled = false;
        return;
    }

    body.appendChild(divResultat);
    body.appendChild(divLaCalculatrice);

    modeClassique.disabled = true;
    modeScience.disabled = false;


}