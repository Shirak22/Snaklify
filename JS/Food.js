import {random} from './functions.js'
import {canvas,ctx,res,init} from './init.js'

class Food{
    constructor(settings){
        this.settings = settings ;
        this.x = Math.floor(random(0,init.w)); 
        this.y = Math.floor(random(0,init.h));
        this.food = [
            {
                type: 'Blueberrys',
                points: '22',
                danger:'0',
                x: this.x,
                y: this.y
            },
            {
                type: 'Fruits',
                points: '10',
                danger:'0',
                x: this.x,
                y: this.y
            },
            {
                type: 'Olive',
                points: '53',
                danger:'0',
                x: this.x,
                y: this.y
            }

        ];

    }

    generate(){
       let randomFood = Math.round(random(0,2));
       this.settings = this.food[randomFood];
       return this.food[randomFood]; 
       
    }

    draw(){
        ctx.fillRect(this.x *res, this.y *res, res,res); 
    }



}


export {Food}