const game = document.querySelector("#game");
const context = game.getContext("2d");
const score = document.querySelector(".score-value");
const startBtn = document.querySelector("#start");
const resetBtn = document.querySelector("#reset");
const endGame = document.querySelector(".end-game");

const foodImg = new Image();
foodImg.src = "images/apple.png";

const grid = 30;

let scoreValue = 0;
let direction = "";
let movement;
let speed = 1000 / 15;

score.textContent = scoreValue.toString();

let food = {
  x: Math.floor(Math.random() * 20) * grid,
  y: Math.floor(Math.random() * 20) * grid,
  img: foodImg,
};

let snake = [];
snake[0] = {
  x: game.width / 2,
  y: game.height / 2,
};

let x1 = 0;
let y1 = 0;

const handleTouchStart = (e) => {
  const firstTouch = e.touches[0];

  x1 = firstTouch.clientX;
  y1 = firstTouch.clientY;
};

const handleTouchMove = (e) => {
  if (!x1 || !y1) {
    return false;
  }

  let x2 = e.touches[0].clientX;
  let y2 = e.touches[0].clientY;

  let xDiff = x2 - x1;
  let yDiff = y2 - y1;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    if (xDiff > 0) direction = "right";
    else direction = "left";
  } else {
    if (yDiff > 0) direction = "up";
    else direction = "down";
  }

  x1 = null;
  y1 = null;
};

document.addEventListener("keydown", getDirection);
document.addEventListener("touchstart", handleTouchStart, false);
document.addEventListener("touchmove", handleTouchMove, false);
startBtn.addEventListener("click", startGame);
resetBtn.addEventListener("click", resetGame);

resetBtn.setAttribute("disabled", "true");

function showGame() {
  context.beginPath();
  context.fillStyle = "#333";
  context.fillRect(0, 0, game.width, game.height);
  context.drawImage(food.img, food.x, food.y, grid, grid);

  for (let snakeCell = 0; snakeCell < snake.length; snakeCell++) {
    context.beginPath();
    context.fillStyle = "green";
    context.strokeStyle = "#fff";
    context.rect(snake[snakeCell].x, snake[snakeCell].y, grid, grid);
    context.fill();
    context.stroke();
  }

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction === "left") snakeX -= grid;
  if (direction === "down") snakeY -= grid;
  if (direction === "right") snakeX += grid;
  if (direction === "up") snakeY += grid;

  let newSnakeCell = {
    x: snakeX,
    y: snakeY,
  };

  if (snakeX === food.x && snakeY === food.y) {
    food = {
      x: Math.floor(Math.random() * 20) * grid,
      y: Math.floor(Math.random() * 20) * grid,
      img: foodImg,
    };

    scoreValue++;
    score.textContent = scoreValue.toString();
  } else {
    snake.pop();
  }

  if (snakeX >= game.width) newSnakeCell.x = 0;
  if (snakeX < 0) newSnakeCell.x = game.width;
  if (snakeY >= game.width) newSnakeCell.y = 0;
  if (snakeY < 0) newSnakeCell.y = game.height;

  eatSnake(newSnakeCell, snake);

  snake.unshift(newSnakeCell);
}

function getDirection(event) {
  if (event.keyCode === 37 || (event.keyCode === 65 && direction !== "right"))
    direction = "left";
  else if (event.keyCode === 38 || (event.keyCode === 87 && direction !== "up"))
    direction = "down";
  else if (
    event.keyCode === 39 ||
    (event.keyCode === 68 && direction !== "left")
  )
    direction = "right";
  else if (
    event.keyCode === 40 ||
    (event.keyCode === 83 && direction !== "down")
  )
    direction = "up";
}

function eatSnake(head, snakeArr) {
  for (let i = 0; i < snakeArr.length; i++) {
    if (head.x === snakeArr[i].x && head.y === snakeArr[i].y) {
      clearInterval(movement);
      endGame.textContent = "Ваш счет: " + scoreValue.toString();
      endGame.style.display = "block";
    }
  }
}

function startGame() {
  endGame.style.display = "none";
  movement = setInterval(showGame, speed);
  startBtn.setAttribute("disabled", "true");
  resetBtn.removeAttribute("disabled");
}

function resetGame() {
  endGame.style.display = "none";
  clearInterval(movement);
  scoreValue = 0;
  score.textContent = scoreValue.toString();

  snake = [];
  snake[0] = {
    x: game.width / 2,
    y: game.height / 2,
  };

  food = {
    x: Math.floor(Math.random() * 20) * grid,
    y: Math.floor(Math.random() * 20) * grid,
    img: foodImg,
  };

  direction = "";
  movement = setInterval(showGame, speed);
}
