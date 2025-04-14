export class Board {
  constructor(width = 600) {
    this.width = width;
    this.height = this.width;
    this.cellSize = this.width / 30;
    this.boardElm = document.querySelector("#board");
    this.create();
  }
  create() {
    this.boardElm.style.width = this.width + "px";
    this.boardElm.style.height = this.height + "px";
  }
}
