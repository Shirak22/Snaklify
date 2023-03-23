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


function updateScoreUI(score,tailLength){
    let scoreDom = document.querySelector('[data-score]');
    let tailDom = document.querySelector('[data-tailLength]');
     scoreDom.textContent = score;
     tailDom.textContent = tailLength; 
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
export {Timer,random,drawFood,updateScoreUI}