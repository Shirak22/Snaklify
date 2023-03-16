import {random} from './functions.js'
import {canvas,ctx,res,init} from './init.js'

class Food{
    constructor(){
        this.settings;
        this.x = Math.floor(random(0,init.w)); 
        this.y = Math.floor(random(0,init.h));
        this.food = [
            {
                type: 'Blueberrys',
                points: '22',
                danger:'0',
                x: this.x,
                y: this.y,
                color:"#07f"
            },
            {
                type: 'Fruits',
                points: '10',
                danger:'0',
                x: this.x,
                y: this.y,
                color:"#a25"
            },
            {
                type: 'Olive',
                points: '53',
                danger:'0',
                x: this.x,
                y: this.y,
                color:"#0f7"
            }

        ];

    }

    generate(){
       let randomFood = Math.round(random(0,2));
       this.settings = this.food[randomFood];
       return this.food[randomFood]; 
       
    }


    

}


export {Food}