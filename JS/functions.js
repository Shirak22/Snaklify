 function random(min,max){  
    // (10, 3)
    // random 1 => 1*(10-3) + 3 => 7 + 3 = 10 
    // random 0 => 0*(10-3) + 3  = 3
    return Math.random()*(max - min) + min ; 
}

function drawFood(foodpos,ctx,res){
    ctx.beginPath();
    ctx.fillStyle = foodpos.color;
    ctx.fillRect(foodpos.x *res, foodpos.y *res, res,res);
}


function updateScoreUI(score,tailLength){
    let scoreDom = document.querySelector('[data-score]');
    let tailDom = document.querySelector('[data-tailLength]');
     scoreDom.textContent = score;
     tailDom.textContent = tailLength; 
}
export {random,drawFood,updateScoreUI}