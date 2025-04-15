import { Board } from "./class-board.js";
import { Player } from "./class-player.js";

// Game Status
window.gameOver = false;
window.paused = false;

let currentSpeed = 200;

// Game Objects
const board = new Board(gameLoop, startGame);
let player;

startGame();

function startGame() {
  player = new Player(board);
  player.render();
  // prize.create(player.body, obstacles);
  gameLoop();
}

// Game Loop
function gameLoop() {
  if (window.gameOver || window.paused) return;

  player.move();
  const head = player.body[player.body.length - 1];

  if (player.checkCollisions(head)) return;

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
});

// Pause Game
if (board.pauseElm) {
  board.pauseElm.addEventListener("click", () => board.handlePause());

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      board.handlePause();
    }
  });
}

// Restart Game
document
  .getElementById("restart-btn")
  .addEventListener("click", () => board.handleRestart());
