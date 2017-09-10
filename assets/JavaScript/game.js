const Floor = require('./floor');
const Tutorial = require('./levels/tutorial');
const Block = require('./block');

class Game {
  constructor(ctx, tileSize) {
    this.tutorial = Tutorial;
    this.ctx = ctx;
    const blockStart = Object.assign({}, this.tutorial[0]);
    this.block = new Block(ctx, blockStart, tileSize);
    this.floor = new Floor(this.tutorial, ctx, tileSize);
    this.tileSize = tileSize;
  }

  handleBoard() {
    const step = this.tileSize;
    document.addEventListener("keydown", (e) => {
      e.preventDefault();
      switch (e.keyCode) {
        case 40:
          this.move(0, step);
          break;
        case 38:
          this.move(0, -1 * step);
          break;
        case 37:
          this.move(-1 * step, 0);
          break;
        case 39:
          this.move(step, 0);
          break;
    }});
  }

  move(x, y) {
    const step = this.tileSize;
    this.ctx.clearRect(0 , 0, 900, 500);
    this.floor.layTiles();
    this.block.move(x, y);
  }

  draw() {
    const step = this.tileSize;
    this.floor.layTiles();
    this.block.draw();
  }
}

module.exports = Game;
