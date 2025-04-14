export class Obstacle {
  constructor(board) {
    this.size = board.cellSize;
    this.boardElm = document.querySelector("#board");
    this.cols = Math.floor(this.boardElm.clientWidth / this.size);
    this.rows = Math.floor(this.boardElm.clientHeight / this.size);
  }

  create(playerBody, prizePosition) {
    const available = this.getAvailablePositions(playerBody, prizePosition);
    if (available.length === 0) return;

    const index = Math.floor(Math.random() * available.length);
    const { x, y } = available[index];

    const obstacleElm = document.createElement("div");
    obstacleElm.className = "obstacle";

    obstacleElm.style.width = this.size + "px";
    obstacleElm.style.height = this.size + "px";
    obstacleElm.style.position = "absolute";
    obstacleElm.style.left = x + "px";
    obstacleElm.style.bottom = y + "px";
    obstacleElm.style.backgroundColor = "black";
    obstacleElm.style.borderRadius = "4px";

    this.boardElm.appendChild(obstacleElm);
    this.position = { x, y };
    this.obstacleElm = obstacleElm;
  }

  getAvailablePositions(playerBody, prizePosition) {
    const available = [];

    for (let x = 0; x < this.cols; x++) {
      for (let y = 0; y < this.rows; y++) {
        const cell = { x: x * this.size, y: y * this.size };

        const occupiedByPlayer = playerBody.some(
          (segment) => segment.x === cell.x && segment.y === cell.y
        );

        const occupiedByPrize =
          prizePosition &&
          prizePosition.x === cell.x &&
          prizePosition.y === cell.y;

        if (!occupiedByPlayer && !occupiedByPrize) {
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
}
