const Floor = require('./floor');
const Levels = require('./levels/levels');
const Block = require('./block');

class Game {
  constructor(ctx, tileSize) {
    this.levels = Levels(tileSize);
    this.currentLevel = this.levels[0];
    this.ctx = ctx;
    this.blockStart = Object.assign({}, this.currentLevel[0]);
    this.block = new Block(ctx, this.blockStart, tileSize);
    this.floor = new Floor(this.currentLevel, ctx, tileSize);
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

  resetBlock() {
    this.ctx.clearRect(0 , 0, 900, 500);
    this.block = new Block(this.ctx, this.blockStart, this.tileSize);
    this.draw();
  }

  checkBlock() {

  }

  move(x, y) {
    this.ctx.fillStyle = 'rgb(0, 0, 0)';
    this.ctx.fillRect(0, 0, 900, 500);
    this.floor.layTiles();
    this.block.move(x, y);
    this.checkBlock();
    this.block.draw();
  }

  draw() {
    this.floor.layTiles();
    this.block.draw();
  }
}

module.exports = Game;
