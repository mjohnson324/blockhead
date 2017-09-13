const LevelGenerator = require('./level_generator');
const Block = require('./block');
const Display = require('./display');

class Game {
  constructor(ctx, length) {
    this.display = new Display(ctx, length);
    this.length = length;
    this.levels = LevelGenerator(length);
    this.levelNumber = 0;
  }

  start() {
    this.currentLevel = this.levels[this.levelNumber];
    this.goal = this.currentLevel[1];
    document.addEventListener("keydown", this.moveBlock.bind(this), true);
    const { x, y } = this.currentLevel[0];
    this.constructBlock(x, y);
    this.display;
  }

  constructBlock(x, y) {
    const blockOptions = { xPos: x,
                           yPos: y,
                           width: this.length,
                           height: this.length };
    this.block = new Block(blockOptions);
  }

  getMove(e) {
    switch (e.keyCode) {
      case 40:
        e.preventDefault();
        return this.moveBlock("down");
      case 38:
        e.preventDefault();
        return this.moveBlock("up");
      case 37:
        e.preventDefault();
        return this.moveBlock("left");
      case 39:
        e.preventDefault();
        this.moveBlock("right");
    }
  }

  moveBlock(direction) {
    switch(direction) {
      case "down":
        this.block.transform(0, this.length * -1);
        break;
      case "up":
        this.block.transform(0, this.length);
        break;
      case "left":
        this.block.transform(this.length * -1, 0);
        break;
      case "right":
        this.block.transform(this.length, 0);
    }
    this.checkBlock();
  }

  checkBlock() {
    if (this.block.width === this.block.height) {
      this.checkGoal();
    }
    this.checkBounds();
  }

  checkGoal() {
    const xGoal = this.goal.x;
    const yGoal = this.goal.y;
    const { xPos, yPos } = this.block;
    if (xPos === xGoal && yPos === yGoal) {
      this.nextLevel();
    }
  }

  nextLevel() {
    this.levelNumber += 1;
    this.currentLevel = this.levels[this.levelNumber];
    if (this.currentLevel === undefined) {
      return this.endGame();
    }
    this.goal = this.currentLevel[1];
    const { x, y } = this.currentLevel[0];
    this.constructBlock(x, y);
    this.display;
  }

  endGame() {
    document.removeEventListener("keydown", this.getMove, true);
    this.display;
  }

  checkBounds() {
    const { xPos, yPos, width, height } = this.block;
    const coordinates = [[xPos, yPos],
      [xPos, yPos + height],
      [xPos + width, yPos],
      [xPos + width, yPos + height]];
    if (this.display.tileMovesOffFloor(coordinates)) {
      this.resetLevel();
    } else {
      this.display;
    }
  }

  resetLevel() {
    const { x, y } = this.currentLevel[0];
    this.constructBlock(x, y);
    this.display;
  }
}

module.exports = Game;
