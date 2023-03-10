 function random(min,max){  
    // (10, 3)
    // random 1 => 1*(10-3) + 3 => 7 + 3 = 10 
    // random 0 => 0*(10-3) + 3  = 3
    return Math.random()*(max - min) + min ; 
}


export {random}