import { Board } from "./class-board.js";
import { Player } from "./class-player.js";
import { Prize } from "./class-prize.js";
import { Obstacle } from "./class-obstacle.js";
import { Bullet } from "./class-bullet.js";

// Game Status
window.gameOver = false;
window.paused = false;
window.obstacles = [];

// Game Elements
let player;
let prize;
let score = 0;
let level = 1;

let currentSpeed = 0;
const minSpeed = 50;
const speedStep = 10;

const pointsPerObstacle = 10;

let bulletStock = 0;
const maxBullets = 5;

let backgroundMusic = new Audio("./files/game-play.mp3");
backgroundMusic.loop = true;
backgroundMusic.volume = 0.2;

const pointsPerPrize = 10;
const pointsPerLevel = 50;
const board = new Board(gameLoop, startGame, backgroundMusic);

startGame();

function startGame() {
  player = new Player(board);

  if (prize) prize.remove();

  prize = new Prize(board);
  prize.create(player.body, window.obstacles);

  window.obstacles.forEach((ob) => ob.remove());
  window.obstacles = [];

  score = 0;
  level = 1;
  currentSpeed = 160;

  document.getElementById("score").textContent = score;
  document.getElementById("level").textContent = level;

  bulletStock = 0;
  updateBullets(bulletStock);

  player.render();

  backgroundMusic.currentTime = 0;
  backgroundMusic.play();
  gameLoop();
}

// Game Loop
function gameLoop() {
  if (window.gameOver || window.paused) return;

  player.move();
  const head = player.body[player.body.length - 1];

  if (player.checkCollisions(head)) return;

  // برخورد با جایزه
  if (head.x === prize.position.x && head.y === prize.position.y) {
    score += pointsPerPrize;
    document.getElementById("score").textContent = score;

    prize.remove();
    prize.create(player.body, window.obstacles);

    const audioPrize = new Audio("./files/prize.mp3");
    audioPrize.volume = 0.2;
    audioPrize.play();

    if (score >= level * pointsPerLevel) {
      level++;
      document.getElementById("level").textContent = level;

      currentSpeed = Math.max(minSpeed, currentSpeed - speedStep);

      player.grow = true;

      if (level >= 3 && bulletStock < maxBullets) {
        bulletStock++;
        updateBullets(bulletStock);
      }
    }

    if (score % pointsPerObstacle === 0) {
      const obstacle = new Obstacle(
        board,
        player.body,
        prize,
        window.obstacles
      );
      if (obstacle.position) {
        window.obstacles.push(obstacle);
      }
    }
  }

  if (!window.gameOver) {
    setTimeout(gameLoop, currentSpeed);
  }
}

// Control Player's Direction
document.addEventListener("keydown", (event) => {
  if (window.gameOver || window.paused) return;

  if (event.key === "ArrowUp") player.setDirection("up");
  else if (event.key === "ArrowRight") player.setDirection("right");
  else if (event.key === "ArrowDown") player.setDirection("down");
  else if (event.key === "ArrowLeft") player.setDirection("left");
  else if (event.key === " ") {
    if (level >= 3 && bulletStock > 0) {
      const head = player.body[player.body.length - 1];
      const startPos = { x: head.x, y: head.y };

      // Shoot Bullet according to Player's Direction
      switch (player.direction) {
        case "up":
          startPos.y += player.moveSize;
          break;
        case "down":
          startPos.y -= player.moveSize;
          break;
        case "left":
          startPos.x -= player.moveSize;
          break;
        case "right":
          startPos.x += player.moveSize;
          break;
      }

      new Bullet(board, startPos, player.direction);

      const audio = new Audio("./files/shoot.mp3");
      audio.play();

      bulletStock--;
      updateBullets(bulletStock);
    }
  }
});

// Pause Game
window.addEventListener("keydown", (event) => {
  if (window.gameOver) return;
  if (event.key === "Escape") {
    board.handlePause();
  }
});

// Restart Game
document
  .getElementById("restart-btn")
  .addEventListener("click", () => board.handleRestart());

// Update Bullet
function updateBullets(bullet) {
  const bulletsContainer = document.getElementById("bullets");
  const spans = bulletsContainer.querySelectorAll("span img");

  spans.forEach((img, index) => {
    if (index < bullet) {
      img.src = "./images/bullet.png";
      img.style.opacity = 1;
    } else {
      img.src = "./images/bullet-gray.png";
      img.style.opacity = 0.5;
    }
  });
}
