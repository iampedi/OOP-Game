import { StaticObstacle, FallingObstacle } from "./class-obstacle.js";


// 🔹 ساخت بورد و بازیکن
const board = new Board();
const player = new Player(board);

// 🔹 آرایه موانع فعال و ستون‌های اشغال‌شده
// let activeObstacles = [];
// const occupiedColumns = new Set();

// 🔹 شروع بازی
startGame();

function startGame() {
  board.create();
  player.create();
}

// 🔹 کنترل حرکت بازیکن با کلیدها
document.addEventListener("keydown", (event) => {
  if (window.gameOver) return;

  if (event.key === "ArrowUp") player.moveUp();
  else if (event.key === "ArrowRight") player.moveRight();
  else if (event.key === "ArrowDown") player.moveDown();
  else if (event.key === "ArrowLeft") player.moveLeft();
});

// setInterval(() => {
//   if (window.gameOver) return;
//   const fixed = new StaticObstacle(player, occupiedColumns);
//   activeObstacles.push(fixed);
// }, 7000);

// setInterval(() => {
//   if (window.gameOver) return;
//   const moving = new FallingObstacle(player, 1, occupiedColumns);
//   activeObstacles.push(moving);
// }, 3000);

// // 🔹 حذف موانع مرده از لیست
// setInterval(() => {
//   activeObstacles = activeObstacles.filter((o) => o.obstacleElm.isConnected);
// }, 1000);

// function showGameOverModal() {
//   const modal = document.getElementById("game-over-modal");
//   modal.classList.remove("hidden");
// }
// window.showGameOverModal = showGameOverModal;

// document.getElementById("restart-btn").addEventListener("click", () => {
//   location.reload();
// });





// Class Player
moveUp() {
    if (this.positionY + this.height + this.moveSize > this.boardHeight) {
      this.positionY = this.boardHeight - this.height;
    } else {
      this.positionY += this.moveSize;
    }
    this.playerElm.style.bottom = this.positionY + "px";
  }

  moveRight() {
    if (this.positionX + this.width + this.moveSize > this.boardWidth) {
      this.positionX = this.boardWidth - this.width;
    } else {
      this.positionX += this.moveSize;
    }
    this.playerElm.style.left = this.positionX + "px";
  }

  moveDown() {
    if (this.positionY - this.moveSize < 0) {
      this.positionY = 0;
    } else {
      this.positionY -= this.moveSize;
    }
    this.playerElm.style.bottom = this.positionY + "px";
  }

  moveLeft() {
    if (this.positionX - this.moveSize < 0) {
      this.positionX = 0;
    } else {
      this.positionX -= this.moveSize;
    }
    this.playerElm.style.left = this.positionX + "px";
  }

  static defaultWidth(boardWidth = 600) {
    return boardWidth / 30;
  }