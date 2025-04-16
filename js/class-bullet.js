export class Bullet {
  constructor(board, startPos, direction) {
    this.board = board;
    this.size = board.cellSize;
    this.boardElm = board.boardElm;
    this.direction = direction;
    this.speed = 40; // سرعت حرکت گلوله

    this.position = { ...startPos };
    this.element = document.createElement("div");
    this.element.classList.add("bullet");
    this.element.style.left = `${this.position.x}px`;
    this.element.style.bottom = `${this.position.y}px`;
    this.boardElm.appendChild(this.element);

    this.interval = setInterval(() => this.move(), this.speed);
  }

  move() {
    switch (this.direction) {
      case "up":
        this.position.y += this.size;
        break;
      case "down":
        this.position.y -= this.size;
        break;
      case "left":
        this.position.x -= this.size;
        break;
      case "right":
        this.position.x += this.size;
        break;
    }

    // برخورد با دیوار
    if (
      this.position.x < 0 ||
      this.position.x >= this.board.width ||
      this.position.y < 0 ||
      this.position.y >= this.board.height
    ) {
      this.remove();
      return;
    }

    // برخورد با مانع
    const hitIndex = window.obstacles.findIndex(
      (ob) =>
        ob.position?.x === this.position.x && ob.position?.y === this.position.y
    );

    if (hitIndex !== -1) {
      window.obstacles[hitIndex].remove();
      window.obstacles.splice(hitIndex, 1);
      this.remove();
      return;
    }

    this.element.style.left = `${this.position.x}px`;
    this.element.style.bottom = `${this.position.y}px`;
  }

  remove() {
    clearInterval(this.interval);
    this.element.remove();
  }
}
