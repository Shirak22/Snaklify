export default function Control(head){

    document.addEventListener('keydown', (e) => {
        e.preventDefault; 
      if(e.keyCode == 38){
        if(head.vy === 1 ) return; 
        head.vy = -1; 
        head.vx = 0; 
  
       
        
      }else if(e.keyCode == 37){
        if(head.vx === 1 ) return; 
        head.vy = 0; 
        head.vx = -1; 
      
        
      }else if(e.keyCode == 39){
        if(head.vx === -1 ) return; 
  
        head.vy = 0; 
        head.vx = 1; 
      
      
  
      }else if(e.keyCode == 40){
        if(head.vy === -1 ) return; 
  
        head.vy = 1; 
        head.vx = 0; 
       
        
      }
  
  
    }); 
  
  
  } //Keyboard Controls function 
