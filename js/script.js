// A l'ouvertue de la page
window.onload = init;
let canvas;
let ctx;


//ici on va stocker des objets graphiques du jeu

let tableauRhum = [];
let tableauRequin = [];
let tableauRequinChercheur = [];
let life = 3;
let score = 0;
let level;
let etatJeu = "MenuPrincipal";
let requinChercheur;
let bateau;
let assets;
let totalScore = 0;



function init() {
    console.log("Page Chargée ! DOM ready ! Toutes les ressources de la page sont utilisables.");

    loadAssets(startGame);
}

function startGame(assetsLoaded) {
    // On récupère grace à la selector API un pointeur dans le canvas
    canvas = document.querySelector("#myCanvas");
    ctx = canvas.getContext("2d");
    assets = assetsLoaded;

    // On ajoute des écouteurs souris/clavier sur le canvas
    canvas.onmousedown = traiteMouseDown;
    canvas.onmouseup = traiteMouseUp;
    canvas.onmousemove = traiteMouseMove;

    document.onkeydown = traiteKeyDown;
    document.onkeyup = traiteKeyUp;



    // Initialisation du jeu
    level = 1;
    nextLevel();

    bateau = new Bateau(100, 100, 0, 0, 50, 100, assets.jack);
    assets.musicHome.play();


    //start(5);
    //startMan(5);
    requestAnimationFrame(animationLoop);
}

// animation à 60 images/sec
function animationLoop() {

    //on efface le canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    switch (etatJeu) {
        case "MenuPrincipal":
            afficheMenuPrincipal();
            break;
        case "JeuEnCours":
            updateJeu();
            //animate();
            //animateMan();
            break;
        case "ChangementNiveau":
            afficheEcranChangementNiveau();
            break;
        case "GameOver":
            afficheEcranGameOver();
            break;
    }



    requestAnimationFrame(animationLoop);

}


function creerBouteilleRhum(nb, speedX, speedY) {

    for (let i = 0; i < nb; i++) {

        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;

        let h = Math.random() * (75 - 25) + 50;


        let vX = -speedX + Math.random() * (speedX * 2);
        let vY = -speedY + Math.random() * (speedY * 2);

        //console.log("Vx : " + vX + " Vy: " + vY);
        let r = new Rhum(x, y, vX, vY, h, h, assets.rhum);

        // on ajoute la balle au tableau
        tableauRhum.push(r);
    }
}

function creerRequin(nb, speedX, speedY) {

    for (let i = 0; i < nb; i++) {

        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;

        let h = Math.random() * (50 - 25) + 25;

        let vX = -speedX + Math.random() * (speedX * 2);
        let vY = -speedY + Math.random() * (speedY * 2);

        let r = new Requin(x, y, speedX, speedY, h, h, assets.requin);

        // on ajoute la balle au tableau
        tableauRequin.push(r);
    }
}

function creerRequinChercheur( speedX, speedY){
    
        let r = new RequinChercheur(0, 0, speedX, speedY, 75, 75, assets.requin);
        // on ajoute la balle au tableau
        tableauRequinChercheur.push(r);
}
function dessinerElement() {
    tableauRhum.forEach((r) => {
        r.draw(ctx);
        traiteCollisionElementAvecBords(r);
        traiteCollisionBateauAvecRhum(r);
        checkScore();
        r.move();
    });

    tableauRequin.forEach((r) => {
        r.draw(ctx);
        traiteCollisionElementAvecBords(r);
        traiteCollisionBateauAvecRequin(r);
        checkScore();
        r.move();
    });

    tableauRequinChercheur.forEach((r) => {
        r.draw(ctx);
        traiteCollisionBateauAvecRequinChercheur(r);
        checkScore();
        r.move();
    });

}


function afficheMenuPrincipal() {
    ctx.save();
    ctx.fillStyle = "black";
    ctx.font = "30pt Calibri";
    ctx.fillText("Menu Principal", 400, 200);
    ctx.fillText("Cliquez Pour démarrez", 350, 250);

    ctx.fillText("Buvez toutes les bouteilles de Rhum", 280, 400);
    ctx.fillText("Evitez les Requins", 380, 450);

    ctx.restore();
}

function updateJeu() {
    bateau.draw(ctx);
    bateau.move();

    traiteCollisionBateauAvecBords();
    dessinerElement();

    afficheScore();

}

function afficheEcranChangementNiveau() {
    ctx.save();
    ctx.fillStyle = "green";
    ctx.font = "30pt Calibri";
    ctx.fillText("Niveau " + level + " Fini", 400, 350);

    ctx.fillText("Cliquez Pour le Niveau Suivant", 330, 400)
    ctx.restore();
}

function afficheEcranGameOver() {
    ctx.save();
    ctx.fillStyle = "red";
    ctx.font = "30pt Calibri";
    ctx.fillText("Vous avez échoué au Niveau " + level, 350, 350);
    ctx.fillText("Cliquez Pour Redémarrez ", 350, 400)
    ctx.restore();
}

function afficheScore() {
    ctx.save();
    ctx.fillStyle = "black";
    ctx.font = "20pt Calibri";
    ctx.fillText("Niveau " + level, 10, 20);
    ctx.fillText("Score :  " + score, 10, 45);
    ctx.fillText("Vies :  " + life, 10, 70);
    ctx.restore();
}




function checkScore() {
    if (score == maxScore) {
        //console.log("finished level:" + level);

        etatJeu = "ChangementNiveau";
        //console.log("next level:" + level);
        assets.musicGame.stop();

    }
    if (life == 0) {
        //console.log("failed level:" + level);
        etatJeu = "GameOver";

        assets.musicGame.stop();
        assets.musicEnd.play();
    }
}

let maxScore;
function nextLevel() {
    assets.musicEnd.stop();

    tableauRhum = [];
    tableauRequin = [];
    tableauRequinChercheur = [];

    score = 0;
    life = 3;

    let speedX = level;
    let speedY = level;

    creerRequinChercheur(1, level, level);
    creerBouteilleRhum(level * 5, speedX, speedY);
    creerRequin(level * 3, speedX, speedY);
    maxScore = 5 * level;

}

