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
    document.addEventListener("keydown", this.getMove.bind(this), true);
    const { xPos, yPos } = this.currentLevel[0];
    this.constructBlock(xPos, yPos);
    this.display.render(this.currentLevel, this.block, this.levelNumber);
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
        this.moveBlock("down");
        break;
      case 38:
        e.preventDefault();
        this.moveBlock("up");
        break;
      case 37:
        e.preventDefault();
        this.moveBlock("left");
        break;
      case 39:
        e.preventDefault();
        this.moveBlock("right");
    }
  }

  moveBlock(direction) {
    switch(direction) {
      case "down":
        this.block.transform(0, this.length);
        break;
      case "up":
        this.block.transform(0, this.length * -1);
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
    const xGoal = this.goal.xPos;
    const yGoal = this.goal.yPos;
    const { xPos, yPos } = this.block;
    if (xPos === xGoal && yPos === yGoal) {
      this.nextLevel();
    }
  }

  nextLevel() {
    this.levelNumber += 1;
    this.currentLevel = this.levels[this.levelNumber];
    if (this.currentLevel === undefined) {
      this.endGame();
    } else {
      this.goal = this.currentLevel[1];
      const { xPos, yPos } = this.currentLevel[0];
      this.constructBlock(xPos, yPos);
      this.display.render(this.currentLevel, this.block, this.levelNumber);
    }
  }

  endGame() {
    document.removeEventListener("keydown", this.getMove, true);
    this.display.drawFinish();
  }

  checkBounds() {
    const { xPos, yPos, width, height } = this.block;
    const oldOptions = { xPos: xPos, yPos: yPos, width: width, height:height };
    const coordinates = [[xPos, yPos],
      [xPos, yPos + height],
      [xPos + width, yPos],
      [xPos + width, yPos + height]];
    if (this.display.tileMovesOffFloor(coordinates)) {
      this.resetBlock(oldOptions);
    } else if (this.currentLevel) {
      this.display.render(this.currentLevel, this.block, this.levelNumber);
    }
  }

  resetBlock(oldOptions) {
    const { xPos, yPos } = this.currentLevel[0];
    this.constructBlock(xPos, yPos);
    this.display.render(this.currentLevel, this.block, this.levelNumber);
    this.display.drawFail(oldOptions);
  }
}

module.exports = Game;
