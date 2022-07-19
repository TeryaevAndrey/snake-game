const game = document.querySelector("#game");
const context = game.getContext("2d");
const score = document.querySelector(".score");

const foodImg = new Image();
foodImg.src = "images/apple.png";

const grid = 30;

let scoreValue = 0;

score.textContent = scoreValue.toString();

let food = {
    x: Math.floor(Math.random() * 20) * grid,
    y: Math.floor(Math.random() * 20) * grid,
    img: foodImg
};

function showGame() {
    context.fillStyle = "#333";
    context.fillRect(0, 0, game.clientWidth, game.clientHeight);
    context.drawImage(food.img, food.x, food.y, grid, grid);
}

setInterval(showGame, 1000 / 20);
