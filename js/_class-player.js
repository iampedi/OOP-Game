export class Player {
  constructor(board) {
    this.boardWidth = board.width;
    this.boardHeight = board.height;
    this.width = board.cellSize;
    this.height = this.width;
    this.moveSize = this.width;

    this.boardElm = document.querySelector("#board");
    this.direction = "up";
    this.grow = false;

    const centerX =
      Math.floor(this.boardWidth / 2 / this.moveSize) * this.moveSize;
    const bottomY =
      Math.floor(this.boardWidth / 2 / this.moveSize) * this.moveSize;

    this.body = [
      { x: centerX, y: bottomY }, // End of body
      { x: centerX, y: bottomY + this.moveSize }, // Head of body
    ];
  }

  render() {
    document.querySelectorAll(".body-part").forEach((el) => {
      el.remove();
    });

    this.body.forEach((segment, index) => {
      const bodyPart = document.createElement("div");
      bodyPart.classList.add("body-part");

      let rotation = 0;

      // Compare Tail Direction (Compare with the next Part)
      if (index === 0 && this.body.length > 1) {
        const next = this.body[1];
        const dx = next.x - segment.x;
        const dy = next.y - segment.y;

        if (dx > 0) rotation = 90;
        else if (dx < 0) rotation = -90;
        else if (dy > 0) rotation = 0;
        else if (dy < 0) rotation = 180;

        bodyPart.classList.add("tail");
      } else if (index === this.body.length - 1 && this.body.length > 1) {
        // Compare Head Direction (Compare with the previous Part)
        const prev = this.body[this.body.length - 2];
        const dx = segment.x - prev.x;
        const dy = segment.y - prev.y;

        if (dx > 0) rotation = 90;
        else if (dx < 0) rotation = -90;
        else if (dy > 0) rotation = 0;
        else if (dy < 0) rotation = 180;

        bodyPart.classList.add("head");
      } else {
        // Body
        bodyPart.classList.add("body");
      }

      // Movements
      bodyPart.style.left = segment.x + "px";
      bodyPart.style.bottom = segment.y + "px";

      // Just rotate head and tail
      if (index === 0 || index === this.body.length - 1) {
        bodyPart.style.transform = `rotate(${rotation}deg)`;
        bodyPart.style.transformOrigin = "center center";
      }

      this.boardElm.appendChild(bodyPart);
    });
  }

  setDirection(newDirection) {
    // Avoid opposite directions
    const opposites = {
      up: "down",
      down: "up",
      left: "right",
      right: "left",
    };

    if (newDirection !== opposites[this.direction]) {
      this.direction = newDirection;
    }
  }

  move() {
    const head = { ...this.body[this.body.length - 1] };

    switch (this.direction) {
      case "up":
        head.y += this.moveSize;
        break;
      case "down":
        head.y -= this.moveSize;
        break;
      case "left":
        head.x -= this.moveSize;
        break;
      case "right":
        head.x += this.moveSize;
        break;
    }

    this.body.push(head);
    this.body.shift();

    // if (this.grow) {
    //   this.grow = false;
    // } else {
    //   this.body.shift();
    // }
    this.render();
    return head;
  }

  isInsideBoard(position) {
    return (
      position.x >= 0 &&
      position.y >= 0 &&
      position.x < this.boardWidth &&
      position.y < this.boardHeight
    );
  }

  hasCollision(position) {
    return this.body.some(
      (segment) => segment.x === position.x && segment.y === position.y
    );
  }

  // hasHitObstacle(obstacles) {
  //   const head = this.body[this.body.length - 1];
  //   return obstacles.some((ob) => ob.isEatenBy(head));
  // }

  // handlePrizeCollision(prize) {
  //   const head = this.body[this.body.length - 1];

  //   if (prize.isEatenBy(head)) {
  //     this.growNextStep();
  //     prize.remove();
  //     return true; // ← یعنی برخورد کرده
  //   }

  //   return false; // ← برخوردی نبود
  // }

  // growNextStep() {
  //   this.grow = true;
  // }

  handleGameOver(position) {
    if (!this.isInsideBoard(position)) {
      window.gameOver = true;
      return true;
    }

    return false;
  }
}
