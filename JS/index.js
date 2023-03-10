import {random} from './functions.js'
import {canvas,ctx,res,init} from './init.js'
import Control from './controls.js'
import {Body,Cell} from './snake.js'
import {Food} from './Food.js'

//----------------------------------------------------
//Global Variables 
    let head = {
        x: init.centerX,
        y:init.centerY,
        vx:0,
        vy:0,
        ctx: ctx,
        color:'#FF701F'
    }

    let level = {
        level: 1,
        speed: .1,
        score: 0,
        time: 2,
        goal: 15
    }
    
let bodylength = 5; 
let bodyParts = []; 
let count = 0;
let foodPos; 

let snakeHead = new Cell(head,res); 
function loop(){ 
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.strokeStyle = '#000';
    ctx.strokeRect(0,0,canvas.width,canvas.height);
    let speed = 1/level.speed; 
    if(count > speed){ //speed control 
      
        bodyParts.push(new Body(head.x,head.y, '#FFC188',ctx,res)); 
        while(bodyParts.length > bodylength){
            bodyParts.shift();
        }

        snakeHead.update();
        count = 0; 
    }

    bodyParts.forEach(part =>{
        part.draw();
     });
    snakeHead.draw();
    count++; 
    window.requestAnimationFrame(loop); 
    
}


window.requestAnimationFrame(loop); 
Control(head);






