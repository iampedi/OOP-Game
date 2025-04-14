export class Player {
  constructor(board) {
    this.boardWidth = board.width;
    this.boardHeight = board.height;
    this.width = board.cellSize;
    this.height = this.width;
    this.moveSize = this.width;

    const centerX =
      Math.floor(this.boardWidth / 2 / this.moveSize) * this.moveSize;
    const bottomY = 0;

    this.body = [
      { x: centerX, y: bottomY }, // دم
      { x: centerX, y: bottomY + this.moveSize }, // سر
    ];

    this.direction = "up";
    this.grow = false;
    this.boardElm = document.querySelector("#board");

    this.render();
  }

  render() {
    document.querySelectorAll(".snake-part").forEach((el) => el.remove());

    this.body.forEach((segment, index) => {
      const part = document.createElement("div");
      part.classList.add("snake-part");

      let rotation = 0;

      // ✅ جهت دم (مقایسه با بعدی)
      if (index === 0 && this.body.length > 1) {
        const next = this.body[1];
        const dx = next.x - segment.x;
        const dy = next.y - segment.y;

        if (dx > 0) rotation = 90;
        else if (dx < 0) rotation = -90;
        else if (dy > 0) rotation = 0;
        else if (dy < 0) rotation = 180;

        part.classList.add("tail");
      }

      // ✅ جهت سر (مقایسه با قبلی)
      else if (index === this.body.length - 1 && this.body.length > 1) {
        const prev = this.body[this.body.length - 2];
        const dx = segment.x - prev.x;
        const dy = segment.y - prev.y;

        if (dx > 0) rotation = 90;
        else if (dx < 0) rotation = -90;
        else if (dy > 0) rotation = 0;
        else if (dy < 0) rotation = 180;

        part.classList.add("head");
      }

      // ✅ بدنه
      else {
        part.classList.add("body");
      }

      // 📐 اندازه و موقعیت
      part.style.width = this.width + "px";
      part.style.height = this.height + "px";
      part.style.position = "absolute";
      part.style.left = segment.x + "px";
      part.style.bottom = segment.y + "px";

      // 🎯 فقط سر و دم بچرخن
      if (index === 0 || index === this.body.length - 1) {
        part.style.transform = `rotate(${rotation}deg)`;
        part.style.transformOrigin = "center center";
      }

      this.boardElm.appendChild(part);
    });
  }

  setDirection(newDirection) {
    // جلوگیری از برگشت خلاف جهت (مثلاً مستقیم از left به right)
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
    if (this.shouldStop(this.obstacles)) {
      return; // هیچ حرکتی انجام نده
    }

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

    if (this.grow) {
      this.grow = false;
    } else {
      this.body.shift();
    }

    this.render();
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

  hasHitObstacle(obstacles) {
    const head = this.body[this.body.length - 1];
    return obstacles.some((ob) => ob.isEatenBy(head));
  }

  handlePrizeCollision(prize) {
    const head = this.body[this.body.length - 1];

    if (prize.isEatenBy(head)) {
      this.growNextStep();
      prize.remove();
      return true; // ← یعنی برخورد کرده
    }

    return false; // ← برخوردی نبود
  }

  growNextStep() {
    this.grow = true;
  }

  shouldStop(obstacles) {
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

    // خارج از بورد؟
    if (!this.isInsideBoard(head)) return true;

    // برخورد با خودش؟
    if (this.hasCollision(head)) return true;

    // برخورد با مانع؟
    if (this.obstacles && this.obstacles.some((ob) => ob.isEatenBy(head)))
      return true;

    return false;
  }
}
