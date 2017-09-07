const Floor = require('./floor');
const Tutorial = require('./levels/tutorial');
const Block = require('./block');

class Game {
  constructor(ctx) {
    this.tutorial = Tutorial;
    this.ctx = ctx;
    const blockStart = Object.assign({}, this.tutorial[0]);
    this.block = new Block(ctx, blockStart);
    this.floor = new Floor(this.tutorial, ctx);
  }

  handleBoard() {
    document.addEventListener("keydown", (e) => {
      e.preventDefault();
      switch (e.keyCode) {
        case 40:
          this.move(0, 30);
          break;
        case 38:
          this.move(0, -30);
          break;
        case 37:
          this.move(-30, 0);
          break;
        case 39:
          this.move(30, 0);
          break;
    }});
  }

  move(x, y) {
    this.ctx.clearRect(0 , 0, 900, 500);
    this.floor.layTiles();
    this.block.move(x, y);
  }

  draw() {
    this.floor.layTiles();
    this.block.draw();
  }
}

module.exports = Game;
