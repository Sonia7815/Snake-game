////Game Constants & Variables
let inputDir = {x: 0, y: 0};
let foodSound = new Audio("eat_some.mp3");
let gameOverSound = new Audio("game_over.mp3");
let moveSound = new Audio("background_music.mp3");
let musicSound = new Audio("hog_nosed_snake.mp3");
let speed = 2;
let score = 0;
let lastPaintTime = 0;
let snakeArray = [{x: 13, y: 15}];
let food = {x: 6, y: 7};

///Game functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(sarr) {
    // If you bump into yourself
    for (let i = 1; i < snakeArray.length; i++) {
        if (snakeArray[i].x === snakeArray[0].x && snakeArray[i].y === snakeArray[0].y) {
            return true;
        }
    }

    // Boundary check
    if (snakeArray[0].x < 0 || snakeArray[0].x >= 18 || snakeArray[0].y < 0 || snakeArray[0].y >= 18) {
        return true;
    }
    return false;
}

function gameEngine() {
    // Part 1: Updating the snake array and food
    if (isCollide(snakeArray)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x: 0, y: 0};
        alert("Game Over. Press any key to play again!");
        snakeArray = [{x: 13, y: 15}];
        food = {x: 6, y: 7};
        score = 0;
        musicSound.play();
        return; // Prevent further execution if the game is over
    }

    // If you have eaten the food, increment the food and regenerate the food
    if (snakeArray[0].y === food.y && snakeArray[0].x === food.x) {
        foodSound.play();
        // score +=1;
        // if(score>hiscoreval){
        //     hiscoreval=score;
        //     localStorage.setItem("hiscore",JSON.stringify(hiscoreval))
        //     hiscoreBox.innerHTML= "HiScore:0"+ hiscoreval; 
        // }
        // scoreBox.innerHTML="score;"+ score;
        // snakeArray.unshift({x: snakeArray[0].x + inputDir.x, y: snakeArray[0].y + inputDir.y});
        // let a = 2;
        // let b = 16;
        // do {
        //     food = {
        //         x: Math.floor(a + (b - a) * Math.random()),
        //         y: Math.floor(a + (b - a) * Math.random())
        //     };
        // } while (snakeArray.some(segment => segment.x === food.x && segment.y === food.y));
    }

    // Moving Snake
    for (let i = snakeArray.length - 2; i >= 0; i--) {
        snakeArray[i + 1] = {...snakeArray[i]};
    }
    snakeArray[0].x += inputDir.x;
    snakeArray[0].y += inputDir.y;

    // Part 2: Display the snake and food
    board.innerHTML = "";
    snakeArray.forEach((e, index) => {
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        
        if (index === 0) {
            snakeElement.classList.add("head");
        } else {
            snakeElement.classList.add("snake");
        }
        
        board.appendChild(snakeElement);
    });

    // Display the food
    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
}

///Main logic starts here
let hiscore=localStorage.getItem("hiscore");
if(hiscore===null){
    hiscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval)) 
}
else{
  hiscoreval=JSON.parse(hiscore);
  hiscoreBox.innerHTML= "HiScore:0"+ hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    let newDir = {x: 0, y: 0};
    switch (e.key) {
        case "ArrowUp":
            if (inputDir.y === 0) {
                newDir = {x: 0, y: -1};
            }
            break;
        case "ArrowDown":
            if (inputDir.y === 0) {
                newDir = {x: 0, y: 1};
            }
            break;
        case "ArrowLeft":
            if (inputDir.x === 0) {
                newDir = {x: -1, y: 0};
            }
            break;
        case "ArrowRight":
            if (inputDir.x === 0) {
                newDir = {x: 1, y: 0};
            }
            break;
        default:
            break;
    }
    if (newDir.x !== 0 || newDir.y !== 0) {
        inputDir = newDir;
        moveSound.play();
    }
});
