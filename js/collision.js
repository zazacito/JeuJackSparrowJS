//Fonction Générique de collision cercle-cercle, rectangle-rectangle

function circRectsOverlap(x0, y0, w0, h0, cx, cy, r) {
    var testX = cx;
    var testY = cy;
    if (testX < x0) testX = x0;
    if (testX > (x0 + w0)) testX = (x0 + w0);
    if (testY < y0) testY = y0;
    if (testY > (y0 + h0)) testY = (y0 + h0);
    return (((cx - testX) * (cx - testX) + (cy - testY) * (cy - testY)) < r * r);
}

function rectsOverlap(x1, y1, w1, h1, x2, y2, w2, h2) {

    if ((x1 > (x2 + w2)) || ((x1 + w1) < x2))
        return false; // No horizontal axis projection overlap
    if ((y1 > (y2 + h2)) || ((y1 + h1) < y2))
        return false; // No vertical axis projection overlap
    return true; // If previous tests failed, then both axis projections
    // overlap and the rectangles intersect
}



function  traiteCollisionMan(man) {
    if (rectsOverlap(monstre.x, monstre.y, monstre.l,monstre.h, man.x, man.y, man.width, man.height)) {
        let index = men.indexOf(man);
        men.splice(index, 1);
        console.log('Collision Homme');
        //vie--;
    }
}

function traiteCollisionBateauAvecBords() {
    if (bateau.x > canvas.width - bateau.l) {
        //console.log("Collision à Droite");
        bateau.x = canvas.width - bateau.l;
        bateau.vitesseX = -bateau.vitesseX;
    }
    else if (bateau.x < 0) {
        //console.log("Collision à Gauche");
        bateau.x =0;
        bateau.vitesseX = -bateau.vitesseX;
    }

    if (bateau.y < 0) {
        //collision haut
        bateau.y = 0;
        bateau.vitesseY = - bateau.vitesseY;
    }
    else if (bateau.y + bateau.h > canvas.height) {
        bateau.y = canvas.height - bateau.h;
        bateau.vitesseY = - bateau.vitesseY;

    }
}



function traiteCollisionElementAvecBords(r) {
    if (r.x > canvas.width - r.l) {
        //console.log("Collision à Droite");
        r.x = canvas.width - r.l;
        r.vitesseX = -r.vitesseX;
    }
    else if (r.x < 0) {
        //console.log("Collision à Gauche");
        r.x =0;
        r.vitesseX = -r.vitesseX;
    }

    if (r.y < 0) {
        //console.log("Collision en Haut");
        r.y = 0;
        r.vitesseY = - r.vitesseY;
    }
    else if (r.y + r.h > canvas.height) {
        //console.log("Collision en Bas");
        r.y = canvas.height - r.h;
        r.vitesseY = - r.vitesseY;

    }
}



function traiteCollisionBateauAvecRhum(r){
    if (rectsOverlap(bateau.x, bateau.y, bateau.l,bateau.h, r.x, r.y, r.l, r.h)) {
        let index = tableauRhum.indexOf(r);
        tableauRhum.splice(index, 1);
        //console.log('Collision Rhum');
        
        assets.drinkRhum.play();
        score ++;
    }
}
function traiteCollisionBateauAvecRequin(r){
    if (rectsOverlap(bateau.x, bateau.y, bateau.l,bateau.h, r.x, r.y, r.l, r.h)) {
        let index = tableauRequin.indexOf(r);
        tableauRequin.splice(index, 1);
        //console.log('Collision Requin');
        
        assets.sharkPain.play();

        life --;
    }

        
}


function traiteCollisionBateauAvecRequinChercheur(r){
    if (rectsOverlap(bateau.x, bateau.y, bateau.l,bateau.h, r.x, r.y, r.l, r.h)) {
        console.log('Collision Requin Chercheur');
        
        let index = tableauRequinChercheur.indexOf(r);
        tableauRequinChercheur.splice(index, 1);

        assets.sharkPain.play();

        life --;
    }

        
}
