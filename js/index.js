//game constants and variables
let inputDir = {x:0, y:0};
const foodsound = new Audio('../music/aditya-kumar.mp3');
const gameoversound = new Audio('../music/moye-moye.mp3');
const movesound = new Audio('../music/move.mp3');
const musicsound = new Audio('../music/music.mp3');

let speed =5;
let score=0;
let lastPaintTime =0;
let snakeArr =[
    {x:13, y:15}
]

let food = {x:6, y:5}



//GAme FUnctions

function main(ctime)
{
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed)
    {
        return;
    }
    lastPaintTime=ctime;

    gameEngine();
}

function isCollide(snake)
{
    //if you bump into urself
     for(let i=1;i<snakeArr.length;i++)
     {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y)
        {
            return true;
        }

    }
    //you bum into the wall
        if(snake[0].x >=18 || snake[0].x <=0 || snake[0].y >=18 || snake[0].y <=0)
        {
            return true;
        }
    return false;
}

function gameEngine()
{    
       
    //part1: update the snake array & food
      if(isCollide(snakeArr))
      {
        gameoversound.currentTime = 0;
        gameoversound.play();
        musicsound.pause()
        inputDir ={x:0,y:0}
        alert("Game over!. Press any key to Restart ")
        snakeArr=[{x:13,y:15}];
        gameoversound.pause();
        musicsound.play();
        score=0;
        scoreBox.innerHTML="Score: "+score
    }
    else{
        // musicsound.play();
    }
    
    //if you have eaten the food increment the score and regenerate the food
    
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x)
    {
        foodsound.play();
         score+=1
         if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hi", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
         scoreBox.innerHTML="Score: "+score
        snakeArr.unshift({x:snakeArr[0].x +inputDir.x, y:snakeArr[0].y +inputDir.y});
        
        let a = 2;
        let b =16; 
        food ={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
        
    }
    
    //moving the snake
      for(let i=snakeArr.length -2 ;i>=0;i--)
      {
          snakeArr[i+1] = {...snakeArr[i]};
          
      }
      snakeArr[0].x +=inputDir.x
      snakeArr[0].y +=inputDir.y
      
    //part2 : render the snake and food
    
    //display the snake
    board.innerHTML ="";
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart =e.y;
        snakeElement.style.gridColumnStart =e.x;

        if(index == 0)
        {
            snakeElement.classList.add('head');
        }
        else{
            
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    
    //display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart =food.y;
    foodElement.style.gridColumnStart =food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
    
    
    
}


//main logic starts here


let hi = localStorage.getItem("amogh");

if(hi === null){
    hiscoreval =0;
    let high = JSON.stringify(hiscoreval)
    localStorage.setItem("hi", high)
}
else{
    hiscoreval = JSON.parse("hi");
    hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
}




window.requestAnimationFrame(main);
window.addEventListener('keydown',e =>{
    inputDir ={x:0,y:1}
    movesound.play()
    switch(e.key)
    {
        case "ArrowUp":console.log("Arrow up");
        inputDir.x=0
        inputDir.y=-1;
        break;
        case "ArrowDown":console.log("Arrow Down");
        inputDir.x=0
        inputDir.y=1
        break;
        case "ArrowLeft":console.log("Arrow Left");
        inputDir.x=-1
        inputDir.y=0
        break;
        case "ArrowRight":console.log("Arrow Right");
        inputDir.x=1
        inputDir.y=0
        break;
       default:
    }
})

//music off and on
function music() {
    // Get the image element
    var image = document.getElementById("speaker");

    // Check the current source and toggle between two images
    if (image.src.endsWith("img/on.png")) {
        musicsound.pause()
        image.src = "img/off.png";
    } else {
        musicsound.play()
        image.src = "img/on.png";

    }

    // Toggle additional properties or states as needed
    // Example: Toggle a class for additional styling
    image.classList.toggle("selected");
}