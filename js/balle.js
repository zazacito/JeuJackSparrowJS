class Balle{
    x;
    y;
    rayon;
    couleur="black";
    vitesseX =0;
    vitesseY =0;

    constructor(x,y,rayon,couleur,vitesseX,vitesseY){
        this.x = x;
        this.y = y;
        this.rayon = rayon;
        if (couleur) this.couleur = couleur;
        if (vitesseX) this.vitesseX = vitesseX;
        if (vitesseY) this.vitesseY = vitesseY;

    }
    draw(ctx){
        ctx.save();

        ctx.translate(this.x,this.y);
        // dessin d'un cercle
        ctx.beginPath();

        // cx, cy, rayon, angle départ, angle arrivée en radians
        ctx.arc(0,0,this.rayon, 0,2 * Math.PI);

        // On donne l'ordre d'afficher le chemin
        //ctx.stroke(); // en fil de fer
        ctx.fillStyle = this.couleur;
        ctx.fill() // en forme pleine
        ctx.restore();
    }

    move(){
        this.x += this.vitesseX;
        this.y += this.vitesseY;
        
    }
}