export class Prize {
  constructor(board) {
    this.boardElm = board.boardElm;
    this.size = board.cellSize;
    this.cols = Math.floor(this.boardElm.clientWidth / this.size);
    this.rows = Math.floor(this.boardElm.clientHeight / this.size);
  }

  getAvailablePositions(playerBody, obstacles = []) {
    const available = [];

    for (let x = 0; x < this.cols; x++) {
      for (let y = 0; y < this.rows; y++) {
        const cell = { x: x * this.size, y: y * this.size };

        const occupiedByPlayer = playerBody.some(
          (segment) => segment.x === cell.x && segment.y === cell.y
        );

        const occupiedByObstacle = obstacles.some(
          (ob) =>
            ob.position && ob.position.x === cell.x && ob.position.y === cell.y
        );

        if (!occupiedByPlayer && !occupiedByObstacle) {
          available.push(cell);
        }
      }
    }

    return available;
  }

  create(playerBody, obstacles = []) {
    const available = this.getAvailablePositions(playerBody, obstacles);
    if (available.length === 0) return;

    const index = Math.floor(Math.random() * available.length);
    const { x, y } = available[index];

    this.prizeElm = document.createElement("div");
    this.prizeElm.className = "prize";

    this.prizeElm.style.left = x + "px";
    this.prizeElm.style.bottom = y + "px";

    this.boardElm.appendChild(this.prizeElm);

    this.position = { x, y };
  }

  remove() {
    if (this.prizeElm) {
      this.prizeElm.remove();
      this.prizeElm = null;
      this.position = null;
    }
  }
}
