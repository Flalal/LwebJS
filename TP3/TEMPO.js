/**
 * Created by florian.flahaut on 11/10/17.
 */
// les variables globales
var baseCourant = 10;
const BOUTON_NEUTRE = "btn btn-default";
const BOUTON_JOUEUR1 = "btn btn-info";
const BOUTON_JOUEUR2 = "btn btn-warning";
const BOUTON_JOUABLE = "btn btn-danger";

var aQuiLeTour = 1; // 1 = Joueur 1 et 2 = Joueur

var tabBoutons = new Array; // Tableau de boutons indicé de [1..dimensionxdimension]
var dimension; // taille du jeu : dimension = 3 --> Jeu 3x3

/**
 * Vérifie num touche est une touche voisine de la touche contenant la case vide
 *
 * @param {num} numéro de touche du jeu
 * @return {boolean} vrai si la touche est voisine, faux sinon
 */


function afficherMessage(message) {
    var nodeAffichage = document.getElementById("affichage");
    nodeAffichage.innerHTML = message;
}


function ajouterBouton (colonne, numBouton, valeur) {
    tabBoutons[numBouton] = document.createElement("input");
    tabBoutons[numBouton].setAttribute('type',"button");
    tabBoutons[numBouton].setAttribute('id',numBouton);
    tabBoutons[numBouton].setAttribute('class',BOUTON_NEUTRE);
    tabBoutons[numBouton].onclick = function () { couleurClic(numBouton);};
    tabBoutons[numBouton].value = valeur;
    colonne.appendChild(tabBoutons[numBouton]);
    var divAQui = document.getElementById('affichage');
    divAQui.innerHTML = 'Joueur : '  + aQuiLeTour;
}

function couleurClic(i){
    if(tabBoutons[i].getAttribute('class') != BOUTON_JOUABLE ) {
        alert('Veuillez cliquer sur une bonne case');
        return;
    }
    if(aQuiLeTour == 1 && tabBoutons[i].getAttribute('class') == BOUTON_JOUABLE) {
        tabBoutons[i].setAttribute("class", BOUTON_JOUEUR1);
        aQuiLeTour=2;
    }
    if(aQuiLeTour == 2 && tabBoutons[i].getAttribute('class') == BOUTON_JOUABLE){
        tabBoutons[i].setAttribute("class", BOUTON_JOUEUR2);
        aQuiLeTour=1;
    }
    var divAQui = document.getElementById('affichage');
    divAQui.innerHTML = 'Joueur : '  + aQuiLeTour;
    verifSetAttributDe(i);
    masquerCliquable();
    afficheCliquable();
}

function masquerCliquable(){
    for( var i = 1 ; i < tabBoutons.length ; i++){
        if(tabBoutons[i].getAttribute('class') == BOUTON_JOUABLE)
            tabBoutons[i].setAttribute('class', BOUTON_NEUTRE);
    }
}

function afficheCliquable() {
    if (aQuiLeTour == 2) {
        for (var i = 1; i < tabBoutons.length; i++) {
            if (tabBoutons[i].getAttribute('class') == BOUTON_JOUEUR2 && verifModulo(i)) {
                setAttributClassDe(i);

            }
        }
    }
    else {
        for (var i = 1; i < tabBoutons.length; i++) {
            if (tabBoutons[i].getAttribute('class') == BOUTON_JOUEUR1 && verifModulo(i)) {
                setAttributClassDe(i);
            }
        }
    }
}

function setAttributClassDe(i){
    try {

        if( i == dimension){ // En haut a droite
            if (tabBoutons[i - 1].getAttribute('class') == BOUTON_NEUTRE)
                tabBoutons[i - 1].setAttribute('class', BOUTON_JOUABLE);
            if (tabBoutons[i + dimension].getAttribute('class') == BOUTON_NEUTRE)
                tabBoutons[i + dimension].setAttribute('class', BOUTON_JOUABLE);
            if (tabBoutons[i + dimension - 1].getAttribute('class') == BOUTON_NEUTRE)
                tabBoutons[i + dimension - 1].setAttribute('class', BOUTON_JOUABLE);
            return;
        }

        if( i == dimension*dimension-dimension+1){ // bas gauche

            if (tabBoutons[i + 1].getAttribute('class') == BOUTON_NEUTRE)
                tabBoutons[i + 1].setAttribute('class', BOUTON_JOUABLE);
            if (tabBoutons[i - dimension].getAttribute('class') == BOUTON_NEUTRE)
                tabBoutons[i - dimension].setAttribute('class', BOUTON_JOUABLE);
            if (tabBoutons[i - dimension + 1].getAttribute('class') == BOUTON_NEUTRE)
                tabBoutons[i - dimension + 1].setAttribute('class', BOUTON_JOUABLE);
            return;
        }

        if (i % dimension == 0) { // col droite
            if (tabBoutons[i - dimension].getAttribute('class') == BOUTON_NEUTRE)
                tabBoutons[i - dimension].setAttribute('class', BOUTON_JOUABLE);
            if (tabBoutons[i - 1].getAttribute('class') == BOUTON_NEUTRE)
                tabBoutons[i - 1].setAttribute('class', BOUTON_JOUABLE);
            if (tabBoutons[i + dimension].getAttribute('class') == BOUTON_NEUTRE)
                tabBoutons[i + dimension].setAttribute('class', BOUTON_JOUABLE);
            if (tabBoutons[i + dimension - 1].getAttribute('class') == BOUTON_NEUTRE)
                tabBoutons[i + dimension - 1].setAttribute('class', BOUTON_JOUABLE);
            if (tabBoutons[i - dimension - 1].getAttribute('class') == BOUTON_NEUTRE)
                tabBoutons[i - dimension - 1].setAttribute('class', BOUTON_JOUABLE);
            return;
        }
        if (i % dimension == 1) { // col gauche
            if (tabBoutons[i - dimension].getAttribute('class') == BOUTON_NEUTRE)
                tabBoutons[i - dimension].setAttribute('class', BOUTON_JOUABLE);
            if (tabBoutons[i + 1].getAttribute('class') == BOUTON_NEUTRE)
                tabBoutons[i + 1].setAttribute('class', BOUTON_JOUABLE);
            if (tabBoutons[i + dimension].getAttribute('class') == BOUTON_NEUTRE)
                tabBoutons[i + dimension].setAttribute('class', BOUTON_JOUABLE);
            if (tabBoutons[i + dimension + 1].getAttribute('class') == BOUTON_NEUTRE)
                tabBoutons[i + dimension + 1].setAttribute('class', BOUTON_JOUABLE);
            if (tabBoutons[i - dimension + 1].getAttribute('class') == BOUTON_NEUTRE)
                tabBoutons[i - dimension + 1].setAttribute('class', BOUTON_JOUABLE);
            return;
        }
    }catch (exception_var_1){}

    try { // Le reste
        if (tabBoutons[i + 1].getAttribute('class') == BOUTON_NEUTRE)
            tabBoutons[i + 1].setAttribute('class', BOUTON_JOUABLE);
        if (tabBoutons[i - 1].getAttribute('class') == BOUTON_NEUTRE)
            tabBoutons[i - 1].setAttribute('class', BOUTON_JOUABLE);
        if (tabBoutons[i + dimension].getAttribute('class') == BOUTON_NEUTRE)
            tabBoutons[i + dimension].setAttribute('class', BOUTON_JOUABLE);
        if (tabBoutons[i - dimension].getAttribute('class') == BOUTON_NEUTRE)
            tabBoutons[i - dimension].setAttribute('class', BOUTON_JOUABLE);
        if (tabBoutons[i + dimension + 1].getAttribute('class') == BOUTON_NEUTRE)
            tabBoutons[i + dimension + 1].setAttribute('class', BOUTON_JOUABLE);
        if (tabBoutons[i + dimension - 1].getAttribute('class') == BOUTON_NEUTRE)
            tabBoutons[i + dimension - 1].setAttribute('class', BOUTON_JOUABLE);
        if (tabBoutons[i - dimension + 1].getAttribute('class') == BOUTON_NEUTRE)
            tabBoutons[i - dimension + 1].setAttribute('class', BOUTON_JOUABLE);
        if (tabBoutons[i - dimension - 1].getAttribute('class') == BOUTON_NEUTRE)
            tabBoutons[i - dimension - 1].setAttribute('class', BOUTON_JOUABLE);
    }catch (exception_var_1){}
}

function verifSetAttributDe(i){
    if(verifColVersHaut(i)) {
        alert("Il y en a un au dessus");
    }
    if(verifColVersBas(i)){
        alert("Il y en a un en dessous");
    }
    /*if(verifRawVersDroite(i)){
     alert("Il y en a un à droite ")
     }
     if(verifRawVersGauche(i)) {
     alert("Il y en a un a gauche");
     }
     if(verifDiagoVersHautGauche(i)){
     alert("Il y en a un vers Haut Gauche");
     }
     if(verifDiagoVersHautDroit(i)){
     alert("Il y en a un vers Haut Gauche");
     }
     if(verifDiagoVersBasGauche(i)){
     alert("Il y en a un vers Haut Gauche");
     }
     if(verifDiagoVersBasDroit(i)){
     alert("Il y en a un vers Haut Gauche");
     }*/
    //verifRaw(i);
    //verifDiago(i);
}
/*
 function verifColVersHaut(i){
 i-=dimension;
 if (i<0)
 return false;
 if(aQuiLeTour == 2 && tabBoutons[i].getAttribute('class') == BOUTON_JOUEUR1 ) {
 return true;
 }
 return verifColVersHaut(i);
 }

 function verifColVersBas(i){
 i+=dimension;
 if (i>dimension*dimension)
 return false;
 if(aQuiLeTour == 2 && tabBoutons[i].getAttribute('class') == BOUTON_JOUEUR1 ) {
 return true;
 }
 return verifColVersBas(i);
 }
 */
function verifModulo(i){
    if( i > i % dimension)
        return verifModulo(i-dimension);

    return true;
}

function creerBoutons(colonne,numCol) {

    var numBouton = numCol;
    var maxNum = dimension*dimension;
    for (var ligne=1;ligne<=dimension; ligne++) {
        ajouterBouton (colonne, numBouton, numBouton.toString(baseCourant).toUpperCase());
        numBouton += dimension;
    } // for
}

function creerColonne (plateau,numColonne){
    var divColonne = document.createElement("div");
    divColonne.setAttribute('class',"btn-group");
    divColonne.setAttribute('role',"group");
    plateau.appendChild(divColonne);
    creerBoutons(divColonne,numColonne);
}

function supprimerPlateauJeu() {
    console.log("supprimerPlateauJeu");
    var plateau = document.getElementById("plateau");
    while (0<plateau.childNodes.length) {
        var noeudFils = plateau.firstChild;
        console.log(noeudFils);
        plateau.removeChild(noeudFils);
        console.log("Nombre fils : "+ plateau.childNodes.length);
    }
}

function creerJeu (tailleJeu) {
    supprimerPlateauJeu();
    dimension=tailleJeu;
    var plateau = document.getElementById("plateau");
    plateau.setAttribute('class',"btn-group btn-group-justified");
    plateau.setAttribute('role',"group");
    for (var col=0;col<dimension;col++) creerColonne(plateau,col+1);

    couleurDebut();
}

function couleurDebut(){
    var milieu = dimension * dimension / 2;
    var milieuMilieu = milieu - (dimension/2);
    tabBoutons[milieuMilieu].setAttribute("class",BOUTON_JOUEUR1);
    tabBoutons[milieuMilieu+dimension+1].setAttribute("class",BOUTON_JOUEUR1);
    tabBoutons[milieuMilieu+1].setAttribute("class",BOUTON_JOUEUR2);
    tabBoutons[milieuMilieu+dimension].setAttribute("class",BOUTON_JOUEUR2);
    afficheCliquable();
}

function initPanneauDeCommandes() {
    dimension = 0;
    var jeu3x3 = document.getElementById('4x4');
    initEventHandlers(jeu3x3, 'click', function() {creerJeu(4); });
    var jeu4x4 = document.getElementById('12x12');
    initEventHandlers(jeu4x4, 'click', function() {creerJeu(12); });
} // initPanneauDeCommandes

function initEventHandlers(element, event, fx) {
    if (element.addEventListener)
        element.addEventListener(event, fx, false);
    else if (element.attachEvent)
        element.attachEvent('on' + event, fx);
} // observe

//initEventHandlers(window, 'load', function() {creerJeu(4);});
initEventHandlers(window, 'load', initPanneauDeCommandes);