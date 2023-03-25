 function random(min,max){  
    // (10, 3)
    // random 1 => 1*(10-3) + 3 => 7 + 3 = 10 
    // random 0 => 0*(10-3) + 3  = 3
    return Math.random()*(max - min) + min ; 
}

function drawFood(foodpos, ctx, res) {
    const myImage = new Image();
    switch (foodpos.type) {
        case 'Blueberrys':
            myImage.src = 'Assets/Food/blueberries.png';
            break;
        case 'Olive':
            myImage.src = 'Assets/Food/olive.png';
            break;
        case 'carrot':
            myImage.src = 'Assets/Food/carrot.png';
            break;
        case 'grapes':
            myImage.src = 'Assets/Food/grapes.png';
            break;
        case 'watermelon':
            myImage.src = 'Assets/Food/watermelon.png';
            break;
        case 'Bomb':
            myImage.src = 'Assets/Poisen/bomb.png';
            break;
        case 'cracker':
            myImage.src = 'Assets/Poisen/firecracker.png';
            break;
        case 'radio':
            myImage.src = 'Assets/Poisen/radioactive.png';
            break;
    }
    ctx.drawImage(myImage, foodpos.x * res, foodpos.y * res, res * 1.5, res * 1.5);
    // ctx.beginPath();
    // ctx.fillStyle = foodpos.color;
    // ctx.fillRect(foodpos.x *res, foodpos.y *res, res,res);
}


function updateScoreUI(score,tailLength,speed,bestScore){
    let scoreDom = document.querySelector('[data-score]');
    let tailDom = document.querySelector('[data-tailLength]');
    let speedRate = document.querySelector('[data-speedRate]');
    let bestScoreEl = document.querySelector('[data-bestScore]');
    
     scoreDom.textContent = score;
     tailDom.textContent = tailLength;
     bestScoreEl.textContent = bestScore;
     speedRate.textContent = `X`+ (speed/.1).toFixed(1); 
}
 class Timer {
    constructor(){
        this.previousTime = Date.now();
    }

    timeSpent(){
        let now = Math.floor((Date.now() - this.previousTime)/1000); 
        return now; 
    }


    countDown(timeLimit){
        let result;
        this.timeLimit = timeLimit;
        let now = Math.floor((Date.now() - this.previousTime)/1000); 
        let count = this.timeLimit - now ; 
        result = count > 0 ? count : null ;
            return result ; 
    }
 }


function gameOverScreenRender(storedData){
    return `
    <div class="gameOverScreen-wrapper">
        <div class="gameOverScreen-level_info">
            <p>speed: <span>X${storedData.speed}</span></p>
            <p>Tail length: <span>${storedData.tail}</span> </p>
        </div>
        
        <article class="gameOverScreen-score">
                <h3 class="h3-header">SCORE</h3>
                <h2 class="h2-header">${storedData.score}</h2>
                <p>total time <span>${storedData.time}</span></p>
        </article>

        <article class="gameOverScreen-Headline">
            <h1 class="h1-header">Game Over</h1>
        </article>

        <article class="gameOverScreen-Playagain">
            <p>Play again! </p>
            <img src="./Assets/Svg/EnterKey.svg" alt="EnterKey">
        </article>
    </div>

`
}

function pauseScreenRender(score){
return `
    <div class="gameOverScreen-wrapper">
         <div class="score__table-container ">
            <table data-playedGames class="score__table">
                <tr>
                    <th>Game</th>
                    <th>Score</th>
                    <th>Tail length</th>
                    <th>Time spent</th>
                </tr>
            </table>
         </div>       
        <div data-PouseScreencontent>        
        <article class="gameOverScreen-score">
                <h3 class="h3-header">SCORE</h3>
                <h2 class="h2-header">${score}</h2>
        </article>

        <article class="gameOverScreen-Headline">
            <h1 class="h1-header">Pause!</h1>
        </article>
        </div>
        <article class="flex_container">
        <article class="gameOverScreen-history gameOverScreen-Playagain ">
            <p>History Score </p>
            <p><span><img src="./Assets/Svg/History.svg" alt="History"></span> press <b> V</b>  </p>
            
        </article>
            <article class="gameOverScreen-Playagain">
                <p>Continue! </p>
                <img src="./Assets/Svg/EnterKey.svg" alt="EnterKey">
            </article>
           
         </article>
        


    </div>

`
}


function getBestScore(){
    let dataLocalStorage = JSON.parse(localStorage.getItem('scoreData')); 
    if(dataLocalStorage == null){
        return 'This is the first game'
    }else {
        return Math.max(...dataLocalStorage.map(object => object.score));
    }
}

function previousScore(){
    let score = JSON.parse(localStorage.getItem('scoreData'));
    if(score == null){
        return [{
            score:'noData',
            speed:'noData',
            tail:'noData',
            time:'noData'
        }];
        
    }else {
        return score; 
    }
    
}

function playedGames(previous){
    let games = document.querySelector('[data-playedGames]'); 
    previous.forEach((game,index) => {
        games.innerHTML += oneGameScoreUI(game,index + 1);  //+1 to start with 1index
    });
}

function oneGameScoreUI(game,index){
    return `
        <tr>
            <td>${index}</td>
            <td>${game.score}</td>
            <td>${game.tail}</td>
            <td>${game.time}s</td>
            
        </tr>
    `; 
}

export {Timer,random,drawFood,updateScoreUI,gameOverScreenRender,pauseScreenRender,previousScore,getBestScore,playedGames}