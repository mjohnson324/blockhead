const Floor = require('./floor');
const Levels = require('./levels/levels');
const Block = require('./block');

class Game {
  constructor(ctx, tileSize) {
    this.backgroundRGB = [25, 25, 25];
    this.backgroundColor = this.stringifyRGB(this.backgroundRGB);

    this.levels = Levels(tileSize);
    this.levelNumber = 0;
    this.currentLevel = this.levels[0];
    this.ctx = ctx;
    const blockStart = Object.assign({}, this.currentLevel[0]);
    this.blockGoal = Object.assign({}, this.currentLevel[1]);
    this.block = new Block(ctx, blockStart, tileSize);
    this.floor = new Floor(this.currentLevel, ctx, tileSize);
    this.tileSize = tileSize;
    this.getMove = this.getMove.bind(this);
  }

  stringifyRGB(colorArray) {
    return(
      'rgb('
      .concat(colorArray[0])
      .concat(', ')
      .concat(colorArray[1])
      .concat(', ')
      .concat(colorArray[2])
      .concat(')')
    );
  }

  handleBoard() {
    document.addEventListener("keydown", this.getMove, true);
  }

  getMove(e) {
    const step = this.tileSize;
    switch (e.keyCode) {
      case 40:
        e.preventDefault();
        this.move(0, step);
        break;
      case 38:
        e.preventDefault();
        this.move(0, -1 * step);
        break;
      case 37:
        e.preventDefault();
        this.move(-1 * step, 0);
        break;
      case 39:
        e.preventDefault();
        this.move(step, 0);
        break;
    }
  }

  move(x, y) {
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fillRect(0, 0, 900, 500);
    this.floor.layTiles();
    this.block.move(x, y);
    this.checkBlock();
    this.block.draw();
  }

  checkBlock() {
    const blockSize = this.block.dimensions;
    if (blockSize.width === blockSize.height) {
      this.checkGoal();
    }
    this.checkBounds();
  }

  checkBounds() {
    const { x, y } = this.block.position;
    const { width, height } = this.block.dimensions;
    const { x2, y2 } = { x2: x + width, y2: y + height };
    const coords = [[x, y], [x, y2], [x2, y], [x2, y2]];
    coords.forEach(coord => {
      const point = this.ctx.getImageData(coord[0], coord[1], 1, 1);
      const colorData = point.data.slice(0, 3);
      const color = this.stringifyRGB(colorData);
      if (color === this.backgroundColor) {
        this.resetLevel();
      }
    });
  }

  resetLevel() {
    const { position, dimensions } = this.block;
    const blockStart = Object.assign({}, this.currentLevel[0]);
    this.block = new Block(this.ctx, blockStart, this.tileSize);
    this.draw();
    this.block.drawFail(position, dimensions);
  }

  checkGoal() {
    const xGoal = this.blockGoal.x;
    const yGoal = this.blockGoal.y;
    const { x, y } = this.block.position;
    if (x === xGoal && y === yGoal) {
      this.nextLevel();
    }
  }

  nextLevel() {
    this.levelNumber += 1;
    this.currentLevel = this.levels[this.levelNumber];
    if (this.currentLevel === undefined) {
      debugger
      document.removeEventListener("keydown", this.getMove, true);
      this.ctx.clearRect(0, 0, 900, 500);
      debugger
      this.ctx.font = '20px sans-serif';
      this.ctx.fillText("Thanks for playing! More levels coming soon! (probably)", 50, 300);
      debugger
      return null;
    }
    debugger
    const blockStart = Object.assign({}, this.currentLevel[0]);
    this.blockGoal = Object.assign({}, this.currentLevel[1]);
    this.block = new Block(this.ctx, blockStart, this.tileSize);
    this.floor = new Floor(this.currentLevel, this.ctx, this.tileSize);
    this.draw();
  }

  draw() {
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fillRect(0, 0, 900, 500);
    this.ctx.font = '30px sans-serif';

    this.ctx.fillStyle = 'white';
    this.ctx.fillText(`Level ${this.levelNumber}`, 25, 50);
    this.floor.layTiles();
    this.block.draw();
  }
}

module.exports = Game;
