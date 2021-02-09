class RequinChercheur extends Requin{
    target = {};
    vitesse = 1;
    angle = 0;

    constructor(x,y,vitesseX,vitesseY,h,l,image){
       super(x,y,vitesseX,vitesseY,h,l,image);
        
    }
    draw(ctx){
        super.draw(ctx);

        ctx.save();

        ctx.translate(this.x, this.y)
        ctx.rotate(this.angle);
        
                
        ctx.restore();
    }
    distanceToTarget(){
        let dx = this.target.x - this.x;
        let dy = this.target.y - this.y;
        
        return Math.sqrt(dx*dx + dy*dy);
    }
    setTarget(x,y){
        this.target.x = x;
        this.target.y =y;
    }
    move(){
        // Si aucune cible n'est définie, on ne fait rien;
        //if (this.target.x == undefined) return;

        // on se dirige vers la cible
        let dx = this.target.x  - this.x;
        let dy = this.target.y - this.y;

        this.angle = Math.atan2(dy,dx);

        if (this.distanceToTarget()<3) return;

        this.x += this.vitesseX * Math.cos(this.angle);
        this.y += this.vitesseY * Math.sin(this.angle);

    

    }
}