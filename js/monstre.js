let monstre = {
    x: 100,
    y: 100,
    l: 50,
    h: 50,
    vitesseX: 0,
    vitesseY: 0,
    donneTonNom: function () {
        return "Je m'appelle Paul, je suis en x = " + this.x + ", y = " + this.y;
    },
    draw: function () {
        //bonne pratique: sauver le contexte courant
        //couleur courante, taille du trait, etc. avant
        //de dessiner ou de modifier quelque chose dans
        //le contexte
        ctx.save();
 
        //ctx.translate(this.x - 400, this.y - 10);
 
        //ctx.fillRect(400, 10, this.l, this.h);

        this.image = new Image();
        this.image.src = "./assets/images/bateauPirate.png";
        ctx.drawImage(this.image, this.x,this.y,100,100);
 
        //On restaure le contexte
        ctx.restore();
    },
    move: function () {
        this.x += this.vitesseX;
        this.y += this.vitesseY;
    },
    setPos: function (x,y){
        monstre.x = x - this.l/2;
        monstre.y = y - this.h/2;
    }
}