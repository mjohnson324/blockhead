const Floor = require('./floor');
const Levels = require('./levels/levels');
const Block = require('./block');

class Game {
  constructor(ctx, tileSize) {
    this.levels = Levels(tileSize);
    this.levelNumber = 0;
    this.currentLevel = this.levels[0];
    this.ctx = ctx;
    this.blockStart = Object.assign({}, this.currentLevel[0]);
    this.blockGoal = Object.assign({}, this.currentLevel[1]);
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

  move(x, y) {
    this.ctx.fillStyle = 'rgb(25, 25, 25)';
    this.ctx.fillRect(0, 0, 900, 500);
    this.floor.layTiles();
    this.block.move(x, y);
    this.checkBlock();
    this.block.draw();
  }

  resetBlock() {
    this.ctx.clearRect(0 , 0, 900, 500);
    this.block = new Block(this.ctx, this.blockStart, this.tileSize);
    this.draw();
  }

  checkBlock() {
    const blockSize = this.block.dimensions;
    if (blockSize.width === blockSize.height) {
      this.checkGoal();
    } else {
      this.checkBounds();
    }
  }

  checkBounds() {
  }

  checkGoal() {
    const xGoal = this.blockGoal.x;
    const yGoal = this.blockGoal.y;
    const { x, y } = this.block.position;
    if (x === xGoal && y === yGoal) {
      this.levelNumber += 1;
      this.currentLevel = this.levels[this.levelNumber];
      this.blockStart = Object.assign({}, this.currentLevel[0]);
      this.blockGoal = Object.assign({}, this.currentLevel[1]);
      this.block = new Block(this.ctx, this.blockStart, this.tileSize);
      this.floor = new Floor(this.currentLevel, this.ctx, this.tileSize);
      this.draw();
    }
  }

  draw() {
    this.ctx.fillStyle = 'rgb(25, 25, 25)';
    this.ctx.fillRect(0, 0, 900, 500);
    this.floor.layTiles();
    this.block.draw();
  }
}

module.exports = Game;
