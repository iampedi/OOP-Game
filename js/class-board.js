export class Board {
  constructor(gameLoop, startGame, backgroundMusic, width = 576) {
    this.width = width;
    this.height = this.width;
    this.gameLoop = gameLoop;
    this.startGame = startGame;
    this.backgroundMusic = backgroundMusic;
    this.cellSize = this.width / 24;
    this.boardElm = document.querySelector("#board");
    this.pauseElm = document.querySelector("#pause");
    this.pauseKeyElm = document.querySelector("#pause span");

    this.create();
  }
  create() {
    this.boardElm.style.width = this.width + "px";
    this.boardElm.style.height = this.height + "px";
  }

  handlePause() {
    if (window.paused) {
      window.paused = false;
      this.pauseKeyElm.textContent = "PAUSE";
      this.pauseElm.classList.remove("paused");
      this.backgroundMusic.play();
      this.gameLoop();
    } else {
      window.paused = true;
      this.pauseElm.classList.add("paused");
      this.pauseKeyElm.textContent = "RESUME";
      this.backgroundMusic.pause();
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

    if (this.backgroundMusic) {
      this.backgroundMusic.pause();
      this.backgroundMusic.currentTime = 0;
    }

    const audio = new Audio("./files/game-over.mp3");
    audio.play().catch((err) => {
      console.log("Game Over Sound failed to play:", err);
    });

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
