// les variables globales
var baseCourant = 10;
const BOUTON_NEUTRE = "btn btn-default";
const BOUTON_JOUEUR1 = "btn btn-info";
const BOUTON_JOUEUR2 = "btn btn-warning";
const BOUTON_JOUABLE = "btn btn-success"
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
    tabBoutons[numBouton].value = valeur;
    colonne.appendChild(tabBoutons[numBouton]);
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