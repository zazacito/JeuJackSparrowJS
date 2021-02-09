// 1 On dÃ©finisse une sorte de "programme principal"
// le point d'entrÃ©e du code qui sera appelÃ©e dÃ¨s que la
// page ET SES RESSOURCES est chargÃ©e

window.onload = init;

let grille;
let canvas, ctx, canvasLargeur, canvasHauteur;
let mousePos = {};
let userState = "rien";
let cookieDragguee = null;
let assets;

function init() {
  console.log("Page et ressources prêtes Ã  l'emploi");
  // appelÃ©e quand la page et ses ressources sont prÃªtes.
  // On dit aussi que le DOM est ready (en fait un peu plus...)

  loadAssets(startGame);
}

function startGame(assetsLoaded) {
  canvas = document.querySelector("#myCanvas");
  ctx = canvas.getContext("2d");
  canvasLargeur = canvas.width;
  canvasHauteur = canvas.height;
  assets = assetsLoaded;

  grille = new Grille(9, 9, canvasLargeur, canvasHauteur, assetsLoaded);

  canvas.onmousedown = traiteMouseDown;
  canvas.onmouseup = traiteMouseUp;
  canvas.onmousemove = traiteMouseMove;

  requestAnimationFrame(animationLoop);
}

function traiteMouseDown(event) {
  //console.log("Souris cliquÃ©e bouton = " + event.button);
  //console.log("souris clickÃ©e " + mousePos.x + " " + mousePos.y);
  assets.plop.play();

  switch (userState) {
    case "cookieEnDrag":
    case "rien":
      // on a cliquÃ© sur une cookie, on va recherche la cookie en fonction
      // du x et du y cliquÃ©
      // puis on va changer l'Ã©tat pour "cookieEnDrag"
      userState = "cookieEnDrag";

      cookieDraggee = grille.getCookie(mousePos.x, mousePos.y);
  }
}

function traiteMouseUp(event) {
  console.log("Souris relÃ¢chÃ©e bouton = " + event.button);
  console.log("souris relÃ¢chÃ©e " + mousePos.x + " " + mousePos.y);
  switch (userState) {
    case "cookieEnDrag":
      cookieCible = grille.getCookie(mousePos.x, mousePos.y);
      // regarder si on peut swapper ? ou si on est pas trop loin....
      console.log(
        "on essaie d echanger avec une cookie de type : " + cookieCible.type
      );
      userState = "rien";
      break;
    case "rien":
      break;
  }
}

function getMousePos(event) {
  let rect = canvas.getBoundingClientRect();
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;

  mousePos = {
    x: x,
    y: y,
  };
}
function traiteMouseMove(event) {
  getMousePos(event);

  //console.log("x souris = " + mousePos.x + " y souris = " + mousePos.y);
}
function animationLoop() {
  // Efface le canvas
  ctx.clearRect(0, 0, canvasLargeur, canvasHauteur);

  // On dessine les objets
  grille.drawGrille(ctx);
  grille.showCookies(ctx);

  switch (userState) {
    case "cookieEnDrag": {
      cookieDraggee.dragAndDraw(ctx, mousePos.x, mousePos.y);
      break;
    }
  }
  // on demande Ã  redessiner 60 fois par seconde
  requestAnimationFrame(animationLoop);
}