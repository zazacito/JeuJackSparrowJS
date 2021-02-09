class BalleChercheuse extends Balle {
    target = {};
    vitesse = 1;
    angle = 0;

    constructor(x,y,rayon,couleur,vitesseX,vitesseY,image){
        super(x,y,rayon,couleur,vitesseX,vitesseY);
        this.image  = image;
    }
    setTarget(x,y){
        this.target.x = x;
        this.target.y =y;
    }
    draw(ctx){
        //super.draw(ctx);
        ctx.save();

        //ctx.translate(this.x, this.y)
        //ctx.rotate(this.angle);
        
        // On dessine un trait dans la direction de la balle
        ctx.drawImage(this.image, this.x,this.y,this.rayon,this.rayon);
        

        ctx.restore();
    }
    distanceToTarget(){
        let dx = this.target.x - this.x;
        let dy = this.target.y - this.y;
        
        return Math.sqrt(dx*dx + dy*dy);
    }
    move(){
        // Si aucune cible n'est définie, on ne fait rien;
        if (this.target.x == undefined) return;

        // on se dirige vers la cible
        let dx = this.target.x  - this.x;
        let dy = this.target.y - this.y;

        this.angle = Math.atan2(dy,dx);

        //if (this.distanceToTarget()<3) return;

        this.x += this.vitesseX * Math.cos(this.angle);
        this.y += this.vitesseY * Math.sin(this.angle);

    

    }
}