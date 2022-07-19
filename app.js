const game = document.querySelector("#game");
const context = game.getContext("2d");
const score = document.querySelector(".score");

const foodImg = new Image();
foodImg.src = "images/apple.png";

const grid = 30;

let scoreValue = 0;
let direction = "";
let movement;

score.textContent = scoreValue.toString();

let food = {
    x: Math.floor(Math.random() * 20) * grid,
    y: Math.floor(Math.random() * 20) * grid,
    img: foodImg
};

let snake = [];
snake[0] = {
    x: game.clientWidth / 2,
    y: game.clientHeight / 2
}

document.addEventListener("keydown", getDirection);

function showGame() {
    context.beginPath();
    context.fillStyle = "#333";
    context.fillRect(0, 0, game.clientWidth, game.clientHeight);
    context.drawImage(food.img, food.x, food.y, grid, grid);

    for(let snakeCell = 0; snakeCell < snake.length; snakeCell++) {
        context.beginPath();
        context.fillStyle = "green";
        context.strokeStyle = "#fff";
        context.rect(snake[snakeCell].x, snake[snakeCell].y, grid, grid);
        context.fill();
        context.stroke();
    }

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction === "left") snakeX -= grid;
    if(direction === "down") snakeY -= grid;
    if(direction === "right") snakeX += grid;
    if(direction === "up") snakeY += grid;

    let newSnakeCell = {
        x: snakeX,
        y: snakeY
    };

    if(snakeX === food.x && snakeY === food.y) {
        food = {
            x: Math.floor(Math.random() * 20) * grid,
            y: Math.floor(Math.random() * 20) * grid,
            img: foodImg
        };

        scoreValue++
        score.textContent = scoreValue.toString();
    } else {
        snake.pop();
    }

    eatSnake(newSnakeCell, snake);

    snake.unshift(newSnakeCell);
}

function getDirection(event) {
    if(event.keyCode === 37 || event.keyCode === 65 && direction !== "right")
        direction = "left";
    else if(event.keyCode === 38 || event.keyCode === 87 && direction !== "up")
        direction = "down";
    else if(event.keyCode === 39 || event.keyCode === 68 && direction !== "left")
        direction = "right";
    else if(event.keyCode === 40 || event.keyCode === 83 && direction !== "down")
        direction = "up";
}

function eatSnake(head, snakeArr) {
    for(let i = 0; i < snakeArr.length; i++) {
        if(head.x === snakeArr[i].x && head.y === snakeArr[i].y) {
            clearInterval(movement);
        }
    }
}

movement = setInterval(showGame, 1000 / 15);
