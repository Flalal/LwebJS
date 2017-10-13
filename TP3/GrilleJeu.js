function GrilleJeu (dimension) {
    const VIDE = 0;
    const JOUEUR1 = 1;
    const POUR_JOUEUR1 = 2;
    const JOUEUR2 = -1;
    const POUR_JOUEUR2 = -2;
    const DIRECTION = [{x:-1,y:0},{x:-1,y:1},{x:0,y:1},{x:1,y:1},{x:1,y:0},{x:1,y:-1},{x:0,y:-1},{x:-1,y:-1}];

    this.dimension = dimension; // la taille du jeu
    this.jeu = new Array;       // le tableau contenant les jetons des joueurs

//*************************************
// initialisation de la grille du jeu
//*************************************

    for (var i=0;i<dimension; i++) {
        this.jeu[i]=new Array;
        for (var j=0;j<dimension;j++) {
            this.jeu[i][j]=VIDE;
        }
    }

    var milieu = this.dimension /2;
    this.jeu[milieu-1][milieu-1]=JOUEUR1;
    this.jeu[milieu][milieu]=JOUEUR1;
    this.jeu[milieu-1][milieu]=JOUEUR2;
    this.jeu[milieu][milieu-1]=JOUEUR2;

//*************************************
// Les méthodes associées
//*************************************

    this.toString = function () {
        var res = "";
        for (var i=0;i<dimension; i++) {
            res += i+":[" + this.jeu[i][0];
            for (var j=1;j<dimension;j++) {
                res +=","+this.jeu[i][j];
            }
            res+="]\n";
        }
        return res;
    }

    this.coupPossible = function (ligne,colonne) {
        // retourne faux si ligne et colonne sont en dehors du jeu
        if (ligne <0 || ligne >= this.dimension) return false;
        if (colonne <0 || colonne >= this.dimension) return false;
        return true;
    }

    this.coupJouable = function (ligne, colonne, couleurAdverse) {
        // retourne vrai si jeu[ligne][colonne] contient une couleurAdverse
        if (! this.coupPossible(ligne,colonne)) return false;
        var couleurCourante = this.jeu[ligne][colonne];
        if (couleurCourante == VIDE || couleurCourante != couleurAdverse) return false;
        return true;
    }

    this.jouableLigne = function (coup, ligne, colonne) {

        // retourne vrai si en continuant dans la même direction on trouve une couleur adverse
        if (! this.coupPossible(ligne+coup.x,colonne+coup.y)) return false;
        var couleurAdverse = this.jeu[ligne][colonne];
        var couleurCourante = this.jeu[ligne+coup.x][colonne+coup.y];
        if (couleurCourante == VIDE) return false;
        if (couleurAdverse != couleurCourante) return true;
        return this.jouableLigne(coup,ligne+coup.x,colonne+coup.y);
    }

    this.jouable= function (ligne,colonne,numJoueur) {
        // retourne vrai si la case ligne colonne est jouable par le joueur numJoueur
        var couleurAdverse = numJoueur == JOUEUR1 ? JOUEUR2:JOUEUR1;
        var couleurJoueur  = numJoueur != JOUEUR1 ? JOUEUR2:JOUEUR1;
        for (var pos in DIRECTION) {
            var coup = DIRECTION[pos];
            if ( this.coupJouable(ligne+coup.x,colonne+coup.y,couleurAdverse)) {
                if (this.jouableLigne(coup, ligne+coup.x, colonne+coup.y)) return true;
            }
        }
        return false;
    }
    this.printTab = function (tab) {
        var res = "";
        for (var i=0;i<dimension; i++) {
            res += i+":[" + tab[i][0];
            for (var j=1;j<dimension;j++) {
                res +=","+tab[i][j];
            }
            res+="]\n";
        }
        console.log(res);
    }

    this.cloneJeu = function () {
        var grille = new Array;
        for (var ligne=0;ligne<this.dimension; ligne++) {
            grille[ligne]= new Array;
            for (var colonne=0;colonne<this.dimension;colonne++) {
                grille[ligne][colonne]=this.jeu[ligne][colonne];
            } // for colonne
        } // for ligne
        return grille;
    }

    this.getListeCoups = function (numJoueur) {
        // retourne une copie du jeu contenant les cases où le joueur numJoueur peut jouer
        var grille = this.cloneJeu(); // faire une copie
        var couleur = numJoueur==1?POUR_JOUEUR1:POUR_JOUEUR2;
        for (var ligne=0;ligne<this.dimension; ligne++) {
            for (var colonne=0;colonne<this.dimension;colonne++) {
                if (grille[ligne][colonne]==VIDE) {
                    if (this.jouable(ligne,colonne, numJoueur)) {
                        grille[ligne][colonne] = couleur
                    }
                }
            } // for colonne
        } // for ligne
        this.printTab(grille);
        return grille;
    }

    this.getCoup = function (tab,numJoueur) {
        var tabCoupsPossibles = new Array;
        var couleur = numJoueur==1?POUR_JOUEUR1:POUR_JOUEUR2;
        var dimension = tab.length;
        for (var ligne=0;ligne<dimension; ligne++) {
            for (var colonne=0;colonne<dimension;colonne++) {
                if (couleur-tab[ligne][colonne]==0) {
                    tabCoupsPossibles.push({'x':ligne,'y':colonne});
                }
            } // for colonne
        } // for ligne
        // console.log("Liste des coups possible du joueur "+numJoueur +":"+couleur+"\n");
        // console.log(tabCoupsPossibles);
        // console.log("xxxxxxxxx\n");
        var nbCoupsPossibles=tabCoupsPossibles.length;
        if (nbCoupsPossibles == 0 ) return null;
        var numCoup = Math.floor(Math.random() * 10000)%nbCoupsPossibles;
        return tabCoupsPossibles[numCoup];
    }
    /*
     this.getCoupFromIA = function(tab,numJoueur) {
     return true;
     }
     */
    this.retournerLigne = function (coup,ligne, colonne, couleurJoueur) {
        var couleurCourante = this.jeu[ligne][colonne];
        if (couleurCourante != couleurJoueur) {
            this.jeu[ligne][colonne]=couleurJoueur;
            this.retournerLigne(coup,ligne+coup.x, colonne+coup.y, couleurJoueur);
        }

    }

    this.retournerLesPions = function (numJoueur, position) {
        var couleurAdverse = numJoueur == JOUEUR1 ? JOUEUR2:JOUEUR1;
        var couleurJoueur  = numJoueur != JOUEUR1 ? JOUEUR2:JOUEUR1;
        var ligne = position.x;
        var colonne = position.y;
        for (var pos in DIRECTION) {
            var coup = DIRECTION[pos];
            if ( this.coupJouable(ligne+coup.x,colonne+coup.y,couleurAdverse)) {
                if (this.jouableLigne(coup, ligne+coup.x, colonne+coup.y)) this.retournerLigne(coup,ligne+coup.x, colonne+coup.y, couleurJoueur);
            }
        }
    }


    this.jouer = function (numJoueur, position) {
        var couleur = numJoueur==1?JOUEUR1:JOUEUR2;
        if (this.jeu[position.x][position.y]==VIDE) {
            this.jeu[position.x][position.y] = couleur;
            this.retournerLesPions(numJoueur, position);
        } else {
            // TODO : gestion erreur
        }
    }

}

// TODO
// ** Retourner les pieces après un coup d'un joueur
// ** Mettre à jour le jeu après un coup d'un joueur
// ** IA : proposer un coup
const JOUEUR1 = 1;
const JOUEUR2 = 2;

var jeu = new GrilleJeu(6);
console.log(jeu.toString());

for (var i=0; i<2; i++) {
    console.log ("============ Le jeueur 1=======n");
    console.log ("La liste des coups possibles : \n");
    var plateauCourant= jeu.getListeCoups(JOUEUR1);
    var position = jeu.getCoup (plateauCourant, JOUEUR1);

    console.log("Le joueur 1 joue à la position : "+ position.x + ","+position.y+"\n");
    jeu.jouer(JOUEUR1, position);
    console.log("Etat du jeu après le coup ...\n");
    console.log(jeu.toString());

    console.log ("============ Le jeueur 2=======n");
    console.log ("La liste des coups possibles : \n");
    var plateau= jeu.getListeCoups(JOUEUR2);
    position = jeu.getCoup (plateau, JOUEUR2);

    console.log("Le joueur 2 joue à la position : "+ position.x + ","+position.y+"\n");
    jeu.jouer(JOUEUR2, position);
    console.log("Etat du jeu après le coup ...\n");
    console.log(jeu.toString());
}
