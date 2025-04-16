export class Obstacle {
  constructor(board, playerBody, prize, existingObstacles = []) {
    this.boardElm = board.boardElm;
    this.size = board.cellSize;
    this.cols = Math.floor(board.width / this.size);
    this.rows = Math.floor(board.height / this.size);
    this.element = null;
    this.create(playerBody, prize, existingObstacles);
  }

  getAvailablePositions(playerBody, prize, existingObstacles) {
    const available = [];

    for (let x = 0; x < this.cols; x++) {
      for (let y = 0; y < this.rows; y++) {
        const cell = { x: x * this.size, y: y * this.size };

        const occupiedByPlayer = playerBody.some(
          (part) => part.x === cell.x && part.y === cell.y
        );

        const occupiedByPrize =
          prize &&
          prize.position &&
          prize.position.x === cell.x &&
          prize.position.y === cell.y;

        const occupiedByOtherObstacle = existingObstacles.some(
          (ob) =>
            ob.position && ob.position.x === cell.x && ob.position.y === cell.y
        );

        if (!occupiedByPlayer && !occupiedByPrize && !occupiedByOtherObstacle) {
          available.push(cell);
        }
      }
    }

    return available;
  }

  create(playerBody, prize, existingObstacles) {
    const available = this.getAvailablePositions(
      playerBody,
      prize,
      existingObstacles
    );
    if (available.length === 0) return;

    const index = Math.floor(Math.random() * available.length);
    const { x, y } = available[index];

    this.element = document.createElement("div");
    this.element.className = "obstacle";
    this.element.style.left = `${x}px`;
    this.element.style.bottom = `${y}px`;

    this.position = { x, y };

    this.boardElm.appendChild(this.element);
  }

  remove() {
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
  }
}
