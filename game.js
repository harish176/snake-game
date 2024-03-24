let inputdir = {x: 0, y: 0};
let prescore=document.getElementsByClassName('prescore')[0];
let highscore=document.getElementsByClassName('highscore')[0];
const foodsound=new Audio('eating.mp3');
const movesound = new Audio('keychange.mp4');
const musicsound = new Audio('gamemusic.mp3');
let score=0;
let maxscore=0;
let board=document.getElementById('board');
let speed=5;
let lastpaint=0;
let snakearr = [
    {x: 13, y: 15}

]

let food = {x: 10,y: 12};


main=(ctime)=>{
    window.requestAnimationFrame(main);
    if((ctime-lastpaint)/1000 < 1/speed){
        return;
    }

    lastpaint=ctime;

    gameEngine();
}



iscollide=(snake)=>{
   //if u eat snake
   for(let i=1 ; i < snakearr.length; i++){
    if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
        return true;
    }
   }

   if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <=0){
    return true;
   }
}

let high = localStorage.getItem("high");
if(high === null){
    maxscore=0;
    localStorage.setItem("high", JSON.stringify(maxscore));
}else{
    maxscore=JSON.parse(high)
    maxscore.innerHTML = "highscore : 0";
}

gameEngine=()=>{
     //updating the snake array & food
    if(iscollide(snakearr)){
    //    gameoversound.play();
      musicsound.pause();
       inputdir = {x:0, y:0};
       alert("game over press any key to play again");
       snakearr = [ {x: 13, y: 15}];
       score=0;
       prescore.innerHTML="score:"+score;
    }
    musicsound.play();

    //if u have eaten he food,increament the score and regenerate the food
     if(snakearr[0].x===food.x && snakearr[0].y===food.y){
        score += 1;
        prescore.innerHTML="score:"+score;
        if(maxscore<score){
            maxscore=score;
            highscore.innerHTML="highscore:"+maxscore;
        }


        snakearr.unshift({x:snakearr[0].x+inputdir.x,y:snakearr[0].y+inputdir.y});
        food = {x:Math.round(2+(16-2)*Math.random()),y:Math.round(2+(16-2)*Math.random())};
     }

     //moving the snake
     for(let i=snakearr.length - 2; i>=0; i--){
        snakearr[i+1] = {...snakearr[i]};
     }

     snakearr[0].x += inputdir.x;
     snakearr[0].y += inputdir.y;
     //render the snake anf food
     board.innerHTML="";
     snakearr.forEach((e,index)=>{
          let snakeelement=document.createElement('div');
          snakeelement.style.gridRowStart=e.y;
          snakeelement.style.gridColumnStart=e.x;
          if(index===0){
            snakeelement.classList.add('head');
          }else{
            snakeelement.classList.add('snake');
          }
          board.appendChild(snakeelement);
     })

     let foodelement=document.createElement('div');
     foodelement.style.gridRowStart=food.y;
     foodelement.style.gridColumnStart=food.x;
     foodelement.classList.add('food');
     board.appendChild(foodelement);
}

window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputdir= {x:0, y:1};
    movesound.play();

    switch(e.key){
        case "ArrowDown":
             inputdir.x=0;
             inputdir.y=1;
             break;
        case "ArrowUp":
             inputdir.x=0;
             inputdir.y=-1;
             break;
        case "ArrowLeft":
             inputdir.x=-1;
             inputdir.y=0;
             break;
        case "ArrowRight":
             inputdir.x=1;
             inputdir.y=0;
             break;
    }
})


window.requestAnimationFrame(main);
