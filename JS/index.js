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
    
let bodylength = 1; 
let bodyParts = []; 
let count = 0;
let food = new Food(); 
//it return object of the food info like ( type, points,danger,x,y)
let foodPoz = food.generate(); 
let snakeHead = new Cell(head,init,res);


//the game loop and animation 
function loop(){ 
    //drawing the game field with borders 
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.strokeStyle = '#000';
    ctx.strokeRect(0,0,canvas.width,canvas.height);

    
    let speed = 1/level.speed; 
    if(count > speed){ //speed control 
       
        //collision detection 
       


        bodyParts.push(new Body(head.x,head.y, '#FFC188',ctx,res)); 
        //limit the body parts number to the body length , 
        while(bodyParts.length > bodylength){
            bodyParts.shift();
        }

        snakeHead.update();
        count = 0; 
    }
    if(head.x === foodPoz.x*res && head.y === foodPoz.y*res ){
        console.log('detect');
        bodylength++;
        food = new Food();
        foodPoz = food.generate();
    }
    bodyParts.forEach(part =>{
        part.draw();
     });
    drawFood(foodPoz);
    snakeHead.draw();
    count++; 

    window.requestAnimationFrame(loop); 
    
}


window.requestAnimationFrame(loop); 
Control(head);


function drawFood(foodpos){
    ctx.beginPath();
    ctx.fillStyle = foodpos.color;
    ctx.fillRect(foodpos.x *res, foodpos.y *res, res,res);
}