import {Timer,playedGames,drawFood,updateScoreUI,gameOverScreenRender,pauseScreenRender,getBestScore,previousScore} from './functions.js'
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
        speed: .1,
        score: 0,
    }

let previous = previousScore();
let snakeHead = new Cell(head,init,res);
let gameOverScreen = false;
let pause = false; 
let bodylength = 9; 
let bodyParts = []; 
let count = 0;
let food = new Food(); 
//it return object of the food info like ( type, points,danger,x,y)
let foodPoz = food.generate();
let timeEl = document.querySelector('[data-time]');
let gameOverScreenElement = document.querySelector('[data-gameOver]');
let totalTime = new Timer();

//it return object of the food info like ( type, points,danger,x,y)
let badFood = new Food(false); 
let badFoodPoz  = badFood.generate();
let badFoodTimer = new Timer();
let timer = new Timer(); 
let bestScore = getBestScore(); 
//the game loop and animation 
function loop(){
    let total_time = totalTime.timeSpent();
    if(!gameOverScreen){
    //drawing the game field with borders 
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.strokeStyle = '#000';
    ctx.strokeRect(0,0,canvas.width,canvas.height);

 //Making food every 1 sec 
    if(badFoodTimer.timeSpent() >= 3){
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
        let eatSound = new Audio();
        eatSound.src = './Assets/sounds/gameboy-pluck.mp3';
        eatSound.play();
        level.score += (foodPoz.points - foodPoz.danger);
        timer = new Timer(); 
        bodylength++;
        food = new Food();
        foodPoz = food.generate();
        
        //applying score change effect 
        document.querySelector('[data-score]').classList.add('score-change'); 
        document.querySelector('[data-tailLength]').classList.add('score-change'); 
        setTimeout(()=>{
            document.querySelector('[data-score]').classList.remove('score-change');
            document.querySelector('[data-tailLength]').classList.remove('score-change');
    
    }, 200);

        for (let i = 0; i < bodyParts.length; i++) {
            const part = bodyParts[i];
            if(foodPoz.x*res === part.x && foodPoz.y*res === part.y ){
                food = new Food();
                foodPoz = food.generate();
            }

        }
 
    }


    //Speed Rules by BodyLength 
     if(15 <= bodylength && bodylength < 30 ){
        level.speed = .15;
     }else if(30 <= bodylength && bodylength < 45 ){
        level.speed = .2;
     } else if(45 <= bodylength && bodylength < 70 ){
        level.speed = .25;
     }else if(70 <= bodylength && bodylength < 85 ){
        level.speed = .3;
     }else {
        level.speed = .1;
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

   
    //game over on head body collision

    bodyParts.forEach(part =>{
        part.draw();
        if(head.x === part.x && head.y === part.y && bodylength >= 10 ){
            console.log('Body Collision');
            gameOverScreen = true;
            gameOver(total_time);
        }
     });
     
     //game over on negative score 
    if(level.score  < 0 ){
        level.score = 0;
        console.log('Body Collision');
        gameOverScreen = true;
        gameOver(total_time);
    }

    updateScoreUI(level.score,bodylength,level.speed,bestScore);
    drawFood(foodPoz,ctx,res);
    drawFood(badFoodPoz,ctx,res);
    snakeHead.draw();
    count++; 
    timeEl.textContent = `${total_time}s`;
    if(!pause){
        
        window.requestAnimationFrame(loop); 
    }
    
}
}

//saving the score and game objects in localStorage and render the best score 
function gameOver(total_time){
    if(head.vx !== 0 || head.vy !== 0){
     
        
        let LSstoredScore = localStorage.getItem('scoreData') === null ? []:JSON.parse(localStorage.getItem('scoreData'));
        let storedScore = [...LSstoredScore];
        let currentStoredDataScore = {
            speed:(level.speed/.1).toFixed(1),
            tail:bodylength,
            score:level.score,
            time:total_time.toString()
        }; 
        storedScore.push(currentStoredDataScore); 
        
        localStorage.setItem('scoreData',JSON.stringify(storedScore));
        gameOverScreenElement.innerHTML = gameOverScreenRender(currentStoredDataScore); 
        gameOverScreenElement.classList.add('gameOver-show');
        previous = previousScore();
        bestScore = getBestScore(); 
    }
}
//Enter key functionality --> Pause and restart on gameoverscreen
window.addEventListener('keyup',(e)=>{
    e.preventDefault();
    if (e.key == 'Enter' && gameOverScreen == true) {
        gameOverScreen = false;
        gameOverScreenElement.classList.remove('gameOver-show');
       
        head = {
            x: 0,
            y: 0,
            vx: 1,
            vy: 0,
            ctx: ctx,
            color: '#FF701F'
        }

        level = {
            speed: .1,
            score: 0,
        }
         bodylength = 1;
         bodyParts = [];
         count = 0;
         totalTime = new Timer();
        snakeHead = new Cell(head,init,res);
        
        window.requestAnimationFrame(loop);
        Control(head);
         

    }else if (e.key == 'Enter' && gameOverScreen == false){
        pause = !pause;
        
        gameOverScreenElement.innerHTML = pauseScreenRender(level.score);
        
        gameOverScreenElement.classList.toggle('gameOver-show');
        playedGames(previous.reverse());
        window.addEventListener('keyup',(e)=>{
            if(e.key === 'v'){
                let historyTable = document.querySelector('.score__table-container'); 
                let content = document.querySelector('[data-PouseScreencontent]'); 
                historyTable.classList.toggle('show');
                content.classList.toggle('hide');
            }
            
        }) ;
        window.requestAnimationFrame(loop); 
        
    }
}); 


window.requestAnimationFrame(loop);
Control(head);

function playMusic(){
    let audio = new Audio(); 
    audio.src = 'Assets/sounds/gameMusic.mp3'
    audio.play();
}
