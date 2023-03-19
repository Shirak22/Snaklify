import {Timer,random,drawFood,updateScoreUI} from './functions.js'
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
let gameOverScreen = false;
let bodylength = 1; 
let bodyParts = []; 
let count = 0;
let food = new Food(); 
//it return object of the food info like ( type, points,danger,x,y)
let foodPoz = food.generate();


//it return object of the food info like ( type, points,danger,x,y)
let badFood = new Food(false); 
let badFoodPoz  = badFood.generate();
let badFoodTimer = new Timer();
let snakeHead = new Cell(head,init,res);
let timer = new Timer(); 


//the game loop and animation 
function loop(){ 
    //drawing the game field with borders 
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.strokeStyle = '#000';
    ctx.strokeRect(0,0,canvas.width,canvas.height);

 //Making food every 1 sec 
    if(badFoodTimer.timeSpent() >= 2){
        badFoodTimer = new Timer();
         badFood = new Food(false); 
        badFoodPoz  = badFood.generate();
    }

   //Making food every 5 sec 
    if(timer.timeSpent() >= 5){
        timer = new Timer();
        food = new Food();
        foodPoz = food.generate();
    }
    

   

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

  

    //food and head collision 
    if(head.x === foodPoz.x*res && head.y === foodPoz.y*res ){
        level.score += (foodPoz.points - foodPoz.danger);
        timer = new Timer(); 
        bodylength++;
        food = new Food();
        foodPoz = food.generate();


        for (let i = 0; i < bodyParts.length; i++) {
            const part = bodyParts[i];
            if(foodPoz.x*res === part.x && foodPoz.y*res === part.y ){
                food = new Food();
                foodPoz = food.generate();
            }

        }
       
        
    }
    //bad food and head collision 
    if(head.x === badFoodPoz.x*res && head.y === badFoodPoz.y*res ){
        level.score += (badFoodPoz.points - badFoodPoz.danger);
        timer = new Timer(); 
        bodylength++;
        badFood = new Food();
        badFoodPoz = food.generate();


        for (let i = 0; i < bodyParts.length; i++) {
            const part = bodyParts[i];
            if(badFoodPoz.x*res === part.x && badFoodPoz.y*res === part.y ){
                badFood = new Food();
                badFoodPoz = food.generate();
            }

        }
       
        
    }

   

    bodyParts.forEach(part =>{
        part.draw();
        if(head.x === part.x && head.y === part.y && bodylength >= 10 ){
            if(head.vx !== 0 || head.vy !== 0){
                console.log('Body Collision');
                gameOverScreen = true; 
            }
            
        }
     });
     
     //game over on negative score 
    if(level.score  < 0 ){
        level.score = 0;
        gameOverScreen = true;
    }

    updateScoreUI(level.score,bodylength);
    drawFood(foodPoz,ctx,res);
    drawFood(badFoodPoz,ctx,res);
    snakeHead.draw();
    count++; 
if(!gameOverScreen){
    window.requestAnimationFrame(loop); 
}
    
    
}



window.requestAnimationFrame(loop); 
Control(head);

 
