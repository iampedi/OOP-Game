import { Board } from "./class-board.js";
import { Player } from "./class-player.js";
import { Prize } from "./class-prize.js";
import { Obstacle } from "./class-obstacle.js";

// 🔹 وضعیت بازی
window.gameOver = false;
let score = 0;
let obstacles = [];
let speed = 200;

function getSpeedByScore(score) {
  return Math.max(80, 200 - score * 5);
}

// 🔹 ساخت بورد و بازیکن
const board = new Board();
const player = new Player(board);
const prize = new Prize(board);
player.obstacles = obstacles;

// 🔹 شروع بازی
startGame();

function startGame() {
  board.create();
  player.render();
  prize.create(player.body, obstacles);
  gameLoop(); // شروع بازی
}

function updateScore() {
  document.getElementById("score").textContent = score;
}

function updateSpeedDisplay(currentSpeed) {
  document.getElementById("speed").textContent = currentSpeed + " ms";
}

function gameLoop() {
  if (window.gameOver) return;

  player.move();

  const head = player.body[player.body.length - 1];

  if (player.handlePrizeCollision(prize)) {
    score++;
    updateScore();
    prize.create(player.body, obstacles);

    if (score % 3 === 0) {
      const newObstacle = new Obstacle(board);
      newObstacle.create(player.body, prize.position);
      obstacles.push(newObstacle);
      player.obstacles = obstacles;
    }
  }

  if (player.hasHitObstacle(obstacles)) {
    return;
  }

  // 🔁 اجرای حلقه بعدی با سرعت جدید
  const currentSpeed = getSpeedByScore(score);
  updateSpeedDisplay(currentSpeed);
  setTimeout(gameLoop, currentSpeed);
}

document.addEventListener("keydown", (event) => {
  if (window.gameOver) return;

  if (event.key === "ArrowUp") player.setDirection("up");
  else if (event.key === "ArrowRight") player.setDirection("right");
  else if (event.key === "ArrowDown") player.setDirection("down");
  else if (event.key === "ArrowLeft") player.setDirection("left");
});
