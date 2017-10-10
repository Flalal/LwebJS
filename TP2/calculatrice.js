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
    16:{balise:"INPUT",attributs:{type:"button",id:".",value:".",'class':"bouton-simple"}},
    17:{balise:"INPUT",attributs:{type:"button",id:"+",value:"+"    ,'class':"bouton-simple"}},
    18:{balise:"BR",attributs:null},
    19:{balise:"INPUT",attributs:{type:"button",id:"=",value:"=",'class':"bouton-quatriple"}},
    20:{balise:"INPUT",attributs:{type:"button",id:"",value:"Clear",'class':"bouton-quatriple"}}
};


var tableBoutonsScientifique = {
    0:{balise:"INPUT",attributs:{type:"button",id:"sqrt",value:'&radic;','class':"bouton-simple"}},
    1:{balise:"BR",attributs:null},
    2:{balise:"INPUT",attributs:{type:"button",id:"log",value:'log','class':"bouton-simple"}},
    3:{balise:"BR",attributs:null},
    4:{balise:"INPUT",attributs:{type:"button",id:"puissance2",value:'x²','class':"bouton-simple"}},
    5:{balise:"BR",attributs:null},
    6:{balise:"INPUT",attributs:{type:"button",id:"fact",value:'x!','class':"bouton-simple"}},
    7:{balise:"BR",attributs:null},
    8:{balise:"INPUT",attributs:{type:"button",id:"...",value:'...','class':"bouton-simple"}},
    9:{balise:"BR",attributs:null},
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
    if (typeof(parametres)== 'undefined'){
        if(attributs != null) {
            if(attributs['value']=='='){
                initEventHandlers(bouton, 'click',function(){resultat();});
            }
            if(attributs['id']=='sqrt' || attributs['id']=='log' || attributs['id'] == 'puissance2' || attributs['id']=='fact'){
                initEventHandlers(bouton, 'click', function(){ special(attributs['id']);})
            }
            if(attributs['value'] == 'Clear'){
                initEventHandlers(bouton, 'click', function(){ reset();})
            }
            else {
                initEventHandlers(bouton, 'click', function () {
                    touche(attributs['value']);
                });
            }
        }
        else {
            return;
        }
    }
}

function reset(){
    document.getElementById('resultat') = "";
}

Math.puissance2 = function (x){
    return x*x;
};

Math.fact = function (x) {
    if(x==1)
        return 1;
    return Math.fact(x-1)*x;
};

function touche(t) {
    var resultat = document.getElementById('resultat');
    resultat.innerHTML += t;
}

function resultat() {
    var resultat = document.getElementById('resultat');
    resultat.innerHTML = eval(resultat.innerHTML );
}

function special(nom){
    var z = document.getElementById('resultat');
    var val = eval(z.innerHTML);
    var fct = 'Math.' + nom;
    z.innerHTML = eval(fct + '(' + val + ')');
}

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

function modeCalculatrice(mode){-
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
        for(var j in tableBoutons) {
            ajouterNoeud(divLaCalculatrice,tableBoutons[j]);
        }
        for(var k in tableBoutonsScientifique){
            ajouterNoeud(divLaCalculatriceScientifique,tableBoutonsScientifique[k]);
        }
        return;
    }

    body.appendChild(divResultat);
    body.appendChild(divLaCalculatrice);

    modeClassique.disabled = true;
    modeScience.disabled = false;

    for(var i in tableBoutons) {
        ajouterNoeud(divLaCalculatrice, tableBoutons[i]);
    }



}

//==============================================================================
//==============================================================================
//==============================================================================

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

