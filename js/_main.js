import { Board } from "./class-board.js";
import { Player } from "./class-player.js";
import { Prize } from "./class-prize.js";
import { Obstacle } from "./class-obstacle.js";

// Game Status
window.gameOver = false;
window.paused = false;

let currentScore = 0;
let currentLevel = 1;
let currentSpeed = 200;
// let prizeCount = 0;
let obstacles = [];

// Game Objects
const board = new Board(gameLoop);
const player = new Player(board);
const prize = new Prize(board);
player.obstacles = obstacles;

startGame();

function startGame() {
  player.render();
  // prize.create(player.body, obstacles);
  gameLoop();
}

// Game Loop
function gameLoop() {
  if (window.gameOver || window.paused) return;

  const head = player.move();

  if (player.handleGameOver(head)) return;

  if (!window.gameOver) {
    setTimeout(gameLoop, currentSpeed);
  }

  // if (player.handlePrizeCollision(prize)) {
  //   currentScore += 10;
  //   prizeCount += 1;
  //   updateScoreDisplay();
  //   prize.create(player.body, obstacles);

  //   // Level up every 5 prizes
  //   if (prizeCount % 5 === 0) {
  //     currentLevel += 1;
  //     currentSpeed = getSpeedByLevel(currentLevel);
  //     updateLevelDisplay(currentLevel);
  //   }

  //   // Add obstacles based on level & prize count
  //   if (shouldAddObstacle(currentLevel, prizeCount)) {
  //     const newObstacle = new Obstacle(board);
  //     newObstacle.create(player.body, prize.position, obstacles);
  //     obstacles.push(newObstacle);
  //     player.obstacles = obstacles;
  //   }
  // }

  // Check collision with obstacles
  // if (player.hasHitObstacle(obstacles)) {
  //   window.gameOver = true;
  //   alert("Game Over!");
  //   return;
  // }
}

// Pause Game
if (board.pauseElm) {
  board.pauseElm.addEventListener("click", () => board.pause());

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      board.pause();
    }
  });
}

// Control Player's Direction
document.addEventListener("keydown", (event) => {
  if (window.gameOver || window.paused) return;

  if (event.key === "ArrowUp") player.setDirection("up");
  else if (event.key === "ArrowRight") player.setDirection("right");
  else if (event.key === "ArrowDown") player.setDirection("down");
  else if (event.key === "ArrowLeft") player.setDirection("left");
});

// // Update Score
// function updateScoreDisplay() {
//   document.getElementById("score").textContent = currentScore;
// }

// // Update Speed Based on Level
// function getSpeedByLevel(level) {
//   return Math.max(50, 200 - (level - 1) * 10);
// }

// // Update Level in UI
// function updateLevelDisplay(level) {
//   document.getElementById("level").textContent = level;
// }

// // Determine if an obstacle should be added
// function shouldAddObstacle(level, prizeCount) {
//   return prizeCount % Math.max(1, 5 - Math.min(level - 1, 4)) === 0;
// }
