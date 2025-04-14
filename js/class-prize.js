export class Prize {
  constructor(board, count = 1) {
    this.count = count;
    this.size = board.cellSize;
    this.boardElm = document.querySelector("#board");
    this.cols = Math.floor(this.boardElm.clientWidth / this.size);
    this.rows = Math.floor(this.boardElm.clientHeight / this.size);
  }

  create(playerBody, obstacles = []) {
    const available = this.getAvailablePositions(playerBody, obstacles);
    if (available.length === 0) return;

    const index = Math.floor(Math.random() * available.length);
    const { x, y } = available[index];

    this.prizeElm = document.createElement("div");
    this.prizeElm.className = "prize";

    this.prizeElm.style.width = this.size + "px";
    this.prizeElm.style.height = this.size + "px";
    this.prizeElm.style.position = "absolute";
    this.prizeElm.style.left = x + "px";
    this.prizeElm.style.bottom = y + "px";

    this.boardElm.appendChild(this.prizeElm);

    this.position = { x, y };
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

  isEatenBy(head) {
    return (
      this.position && head.x === this.position.x && head.y === this.position.y
    );
  }

  remove() {
    if (this.prizeElm) {
      this.prizeElm.remove();
      this.prizeElm = null;
      this.position = null;
    }
  }
}
