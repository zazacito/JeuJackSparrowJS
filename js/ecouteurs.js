let mousePos = {};




function traiteMouseDown(event){
    //console.log("Souris cliqué: " + event.button );
    //console.log("Cliquée en x = " + mousePos.x + " et en y = "+ mousePos.y);

    switch (etatJeu){
        case "MenuPrincipal":
            etatJeu = "JeuEnCours";
            assets.musicHome.stop();
            assets.musicGame.play();
            break;
        case "JeuEnCours":
            assets.musicEnd.stop();

            break;
        case "ChangementNiveau":
            level ++;
            nextLevel();
            etatJeu = "JeuEnCours";
            assets.musicGame.play();

            break;
        case "GameOver":
            level = 1;
            nextLevel();
            assets.musicGame.play();

            etatJeu = "JeuEnCours";
            break;
        
    }
}

function traiteMouseUp(event){
    //console.log("Souris relaché: "+ event.button);
}

function traiteMouseMove(event){
    //console.log("Souris déplacé");
    // Pour prendre en compte les marges, le css, etc
    var rect = canvas.getBoundingClientRect();

    mousePos.x = event.clientX -rect.left;
    mousePos.y = event.clientY- rect.top;
    //console.log("Souris en x = " + mousePos.x + " et en y = "+ mousePos.y);

    //monstre.setPos(mousePos.x,mousePos.y);

    bateau.setPos(mousePos.x,mousePos.y);

    if (tableauRequinChercheur[0]){
        tableauRequinChercheur[0].setTarget(mousePos.x, mousePos.y);

    }

    


}

function traiteKeyDown(event){
    ///console.log("Touche enfoncé: " + event.key);
    switch (event.key){
        case "ArrowLeft":
            monstre.vitesseX = -1;
            break;
        case "ArrowRight":
            monstre.vitesseX = 1;
            break;
        case "ArrowUp":
            monstre.vitesseY= -5;
            break;
        case "ArrowDown":
            monstre.vitesseY= 5;
            break;
    }
}

function traiteKeyUp(event){
    //console.log("Touche relaché: " + event.key);

}

