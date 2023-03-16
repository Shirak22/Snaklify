

class Body {
    constructor(x,y,color,ctx,res){
        this.x = x; 
        this.y = y; 
        this.color = color;
        this.size = res;
        this.ctx = ctx; 
    }

    draw(){
        this.ctx.fillStyle = this.color; 
        this.ctx.fillRect(this.x,this.y,this.size,this.size);
        this.ctx.strokeStyle = '#171F26'; 
        this.ctx.lineWidth = 2; 
        this.ctx.strokeRect(this.x,this.y,this.size,this.size);
        
    }

}

class Cell {
    constructor(snake,init,res){
        this.snake = snake; 
        this.size = res !== undefined ? res : 20; 
        this.init = init; 
    }   

    draw(){
        this.snake.ctx.beginPath(); 
        this.snake.ctx.fillStyle = this.snake.color; 
        this.snake.ctx.fillRect(this.snake.x,this.snake.y,this.size,this.size); 
    }
    
    update(){
        //the automated move afte the vx vy value from the control side 
        this.snake.x += (this.snake.vx * this.size);
        this.snake.y += (this.snake.vy * this.size);

        //Snake rules and conditions (Boundries)
        if (this.snake.x >= this.init.w * this.size) {
            this.snake.x = 0;
        } else if (this.snake.x < 0) {
            this.snake.x = this.init.w * this.size;
        }

        if (this.snake.y >= this.init.h * this.size) {
            this.snake.y = 0;
        } else if (this.snake.y  < 0 ) {
            this.snake.y = this.init.h * this.size;
        }
    }
    
}


export {Cell, Body} ; 