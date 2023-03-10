let canvas = document.getElementById('game_canvas-id'); 
let ctx = canvas.getContext('2d'); 
let totalTimer = document.querySelector('.game__information-total__time p');
 canvas.width = 400; 
 canvas.height = 600; 
let res = 20;
let init = {
    w: Math.floor(canvas.width/res),
    h: Math.floor(canvas.height/res),
    centerX:  (Math.floor(canvas.width/res)/2) * res,
    centerY:  (Math.floor(canvas.height/res)/2) * res
}


export {canvas,ctx,res,init}