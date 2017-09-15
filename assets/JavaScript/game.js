const LevelGenerator = require('./level_generator');
const Block = require('./block');
const Display = require('./display');

class Game {
  constructor(ctx, length) {
    this.display = new Display(ctx, length);
    this.levels = LevelGenerator(length);
    this.state = {
                   length: length,
                   levelNumber: 0
                 };
  }

  start() {
    this.state.currentLevel = this.levels[this.state.levelNumber];
    this.state.moves = 0;
    this.state.falls = 0;
    this.state.goal = this.state.currentLevel[1];
    document.addEventListener("keydown", this.getMove.bind(this), true);
    const { xPos, yPos } = this.state.currentLevel[0];
    this.constructBlock(xPos, yPos);
    this.display.render(this.displayOptions());
  }

  constructBlock(x, y) {
    const blockOptions = { xPos: x,
                           yPos: y,
                           width: this.state.length,
                           height: this.state.length,
                          };
    this.block = new Block(blockOptions);
  }

  displayOptions() {
    return { level: this.state.currentLevel,
             block: this.block,
             levelNumber: this.state.levelNumber,
             moves: this.state.moves,
             falls: this.state.falls };
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
        this.block.transform(0, this.state.length);
        break;
      case "up":
        this.block.transform(0, this.state.length * -1);
        break;
      case "left":
        this.block.transform(this.state.length * -1, 0);
        break;
      case "right":
        this.block.transform(this.state.length, 0);
    }
    this.state.moves += 1;
    this.checkBlock();
  }

  checkBlock() {
    if (this.block.width === this.block.height) {
      this.checkGoal();
    }
    this.checkBounds();
  }

  checkGoal() {
    const { xPos, yPos } = this.state.goal;
    const currentX = this.block.xPos;
    const currentY = this.block.yPos;
    if (xPos === currentX && yPos === currentY) {
      this.nextLevel();
    }
  }

  nextLevel() {
    this.state.levelNumber += 1;
    this.state.currentLevel = this.levels[this.state.levelNumber];
    if (this.state.currentLevel === undefined) {
      this.endGame();
    } else {
      this.state.goal = this.state.currentLevel[1];
      const { xPos, yPos } = this.state.currentLevel[0];
      this.constructBlock(xPos, yPos);
      this.display.render(this.displayOptions());
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
    } else if (this.state.currentLevel) {
      this.display.render(this.displayOptions());
    }
  }

  resetBlock(oldOptions) {
    const { xPos, yPos } = this.state.currentLevel[0];
    this.constructBlock(xPos, yPos);
    this.state.falls += 1;
    this.display.render(this.displayOptions());
    this.display.drawFail(oldOptions);
  }
}

module.exports = Game;
