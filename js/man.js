//load images

images.player = new Image();
images.player.src = './assets/images/man.png';
const manAction =['up', 'top right', 'right', 'down right',
'down','left','down left'];
let men = [];

class Man {
    constructor(){
        this.width = 50;
        this.height = 50;
        this.frameX = 1;
        this.x =Math.random()*canvas.width;
        this.y = Math.random()*canvas.height;
        this.speed = (Math.random()*3.5)+1.5;
        this.action = manAction[Math.floor(Math.random()*manAction.length)];
        if (this.action === 'up'){
            this.frameY = 0;
            this.maxFame = 5;
            this.minFrame = 0;
        }else if (this.action === 'down') {
            this.frameY = 1;
            this.maxFame = 5;
            this.minFrame = 0;
        }else if (this.action === 'down right'){
            this.frameY = 2;
            this.maxFame =5 ;
            this.minFrame =0 ;
        }else if (this.action === 'right'){
            this.frameY = 3;
            this.maxFame = 5;
            this.minFrame = 0;
        }else if (this.action === 'top right'){
            this.frameY = 4;
            this.maxFame =5 ;
            this.minFrame =0 ;
        }else if (this.action === 'down left'){
            this.frameY = 5;
            this.maxFame =5 ;
            this.minFrame =0 ;
        }else if (this.action === 'left') {
            this.frameY = 6;
            this.maxFame =5 ;
            this.minFrame =0;
        }
        else if (this.action === 'top left') {
            this.frameY = 7;
            this.maxFame =5 ;
            this.minFrame =0;
        }
    }

    draw(){
        drawSprite(images.player, this.width*this.frameX,this.height*this.frameY,
            this.width, this.height,this.x,this.y,this.width,this.height);
           
        //animate sprite   
        if (this.frameX < this.maxFame){
            this.frameX++;
        } 
        else this.frameX = this.minFrame;
    }
    update(){
        if (this.action === 'right'){
            //move player 
            if (this.x > canvas.width+this.width) {
                this.x = 0 - this.width;
                this.y = Math.random()*(canvas.height - this.height);
            }
            else {
                this.x +=this.speed;
                
            }
        }else if (this.action === 'up'){
            if(this.y < (0-this.height)){
                this.y = canvas.height + this.height;
                this.x = Math.random()*canvas.width;
            }else{
                this.y -= this.speed;
            }
        }else if (this.action === 'down right'){
            if(this.y > (canvas.height+this.height) 
                && this.x > (canvas.width+this.width)){
                this.y = 0 - this.height;
                this.x = Math.random()*canvas.width;
            }else{
                this.x += this.speed;
                this.y += this.speed;
            }
        }else if(this.action === 'down') {
            if (this.y > canvas.height + (this.height * 5)) {
                this.y = 0 - this.height;
                this.x = Math.random() * canvas.width;
                this.speed = (Math.random() * 2) + 3;
            } else {
                this.y += this.speed;  
            }
        }else if (this.action === 'top right') {
            if (this.y < 0 - this.height && this.x > canvas.width + this.width) {
                this.y = canvas.height + this.height
                this.x = Math.random() * canvas.width;
                this.speed = (Math.random() * 2) + 3;
            } else {
                this.y -= this.speed; 
                this.x += this.speed; 
            }
        }else if (this.action === 'left'){
            //move player 
            if (this.x < 0) {
                this.x = 0 + this.width;
                this.y = Math.random()*(canvas.height - this.height);
            }
            else {
                this.x +=this.speed;
                
            }
        }
        else if (this.action === 'down left'){
            
        }
        else if (this.action === 'top left'){
            
        }


        
    }
}


function drawSprite(img, sX, sY, sW, sH, dX, dY,dW,dH){
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY,dW,dH);
}

function animateMan(){
    for (i = 0; i<men.length;i++){
        traiteCollisionMan(men[i]);
    }
    for (i = 0; i<men.length;i++){
        men[i].draw();
        men[i].update();
    }
}


function startMan(nb){
    men = [];
    const numberOfMen = nb;
    for (i=0; i < numberOfMen; i++){
        men.push(new Man());
    }
}