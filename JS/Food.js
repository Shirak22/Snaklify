import {random} from './functions.js'
import {canvas,ctx,res,init} from './init.js'

class Food{
    constructor(foodType=true){
        this.settings;
        this.foodType = foodType; 
        this.food; 
        this.x = Math.floor(random(0,init.w)); 
        this.y = Math.floor(random(0,init.h));
        if(this.foodType === true){
            this.food = [
             
                {
                    type: 'watermelon',
                    points: '10',
                    danger:'0',
                    x: this.x,
                    y: this.y,
                    color:"#07f"
                },
                {
                    type: 'grapes',
                    points: '22',
                    danger:'0',
                    x: this.x,
                    y: this.y,
                    color:"#07f"
                },
                {
                    type: 'carrot',
                    points: '10',
                    danger:'0',
                    x: this.x,
                    y: this.y,
                    color:"#a25"
                },   {
                    type: 'Blueberrys',
                    points: '22',
                    danger:'0',
                    x: this.x,
                    y: this.y,
                    color:"#07f"
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
        }else {
            this.food = [
                {
                    type: 'cracker',
                    points: '0',
                    danger:'12',
                    x: this.x,
                    y: this.y,
                    color:"#511"
                },  {
                    type: 'cracker',
                    points: '0',
                    danger:'12',
                    x: this.x,
                    y: this.y,
                    color:"#511"
                },  {
                    type: 'cracker',
                    points: '0',
                    danger:'12',
                    x: this.x,
                    y: this.y,
                    color:"#511"
                },
                {
                    type: 'Bomb',
                    points: '0',
                    danger:'25',
                    x: this.x,
                    y: this.y,
                    color:"#000"
                },
              
                {
                    type: 'radio',
                    points: '0',
                    danger:'60',
                    x: this.x,
                    y: this.y,
                    color:"#723"
                }
    
            ];
        }
       

       

    }

    generate(){
       let randomNumber = Math.round(random(0,100));
       let randomFood; 
       // 60% chance to generate Fruits food and 30% blueberrys and 10% Olives 
       if(randomNumber <= 60){
        randomFood = Math.round(random(0,2));//Fruits 
       }else if(randomNumber > 60 && randomNumber <= 90){
        randomFood = 3;//Blueberrys
       }else{
        randomFood = 4;//Olive
       }

       this.settings = this.food[randomFood];
       return this.food[randomFood]; 
    }


    

}


export {Food}