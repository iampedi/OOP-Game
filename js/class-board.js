export class Board {
  constructor(gameLoop, startGame, width = 576) {
    this.width = width;
    this.height = this.width;
    this.gameLoop = gameLoop;
    this.startGame = startGame;
    this.cellSize = this.width / 24;
    this.boardElm = document.querySelector("#board");
    this.pauseElm = document.querySelector("#pause");

    this.create();
  }
  create() {
    this.boardElm.style.width = this.width + "px";
    this.boardElm.style.height = this.height + "px";
  }

  handlePause() {
    if (window.paused) {
      window.paused = false;
      this.pauseElm.textContent = "Pause";
      this.gameLoop();
    } else {
      window.paused = true;
      this.pauseElm.textContent = "Resume";
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
