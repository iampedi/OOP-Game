export class Board {
  constructor(gameLoop, startGame, width = 600) {
    this.width = width;
    this.height = this.width;
    this.gameLoop = gameLoop;
    this.startGame = startGame;
    this.cellSize = this.width / 30;
    this.boardElm = document.querySelector("#board");
    this.pauseElm = document.querySelector("#pause-btn");

    this.create();
  }
  create() {
    this.boardElm.style.width = this.width + "px";
    this.boardElm.style.height = this.height + "px";
  }

  handlePause() {
    if (window.paused) {
      window.paused = false;
      this.pauseElm.textContent = "Pause (Esc)";
      this.gameLoop();
    } else {
      window.paused = true;
      this.pauseElm.textContent = "Resume (Esc)";
    }
  }

  handleRestart() {
    window.gameOver = false;
    window.paused = false;
    this.handleModal();
    this.startGame();
  }

  handleGameOver() {
    window.gameOver = true;
    this.handleModal();
  }

  handleModal() {
    const modal = document.getElementById("game-over-modal");
    if (modal) {
      if (window.gameOver) {
        modal.classList.remove("hidden");
      } else {
        modal.classList.add("hidden");
      }
    }
  }
}
