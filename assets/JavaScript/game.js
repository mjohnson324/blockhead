const LevelGenerator = require('./level_generator');
const Block = require('./block');
const Display = require('./display');
const Sound = require('./sound');
const allLevels = require('./levels/all_levels');

class Game {
  constructor(ctx, length) {
    this.display = new Display(ctx, length);
    this.levels = new LevelGenerator(length, allLevels);
    this.block = new Block(length, { width: length, height: length });
    this.sound = new Sound();

    this.getMove = this.getMove.bind(this);
    this.pauseButton = this.pauseButton.bind(this);
    this.restartGame = this.restartGame.bind(this);
  }

  start() {
    this.setState();
    this.sound.start();
    this.levels.constructFloor();
    this.block.setPosition(this.levels.currentStartPosition);
    this.timerId = setInterval(this.display.drawTime, 1000);
    document.addEventListener("keydown", this.getMove);
    document.addEventListener("keydown", this.pauseButton);
    this.display.render(this.displayOptions());
    this.display.drawBlock(this.block);
  }

  setState() {
    this.state = {
      moves: 0,
      falls: 0,
      pauseStatus: false,
    };
  }

  restartGame(e) {
    switch(e.keyCode) {
      case 32:
        e.preventDefault();
        this.levels.resetCurrentLevel();
        this.start();
        document.removeEventListener("keydown", this.restartGame);
    }
  }

  getMove(e) {
    const arrowKeycodes = [37, 38, 39, 40];
    if (arrowKeycodes.includes(e.keyCode)) {
      e.preventDefault();
      switch (e.keyCode) {
        case 40: // down arrow key
          this.block.transformBlock(0, 1);
          break;
        case 38: // up arrow key
          this.block.transformBlock(0, -1);
          break;
        case 37: // left arrow key
          this.block.transformBlock(-1, 0);
          break;
        case 39: // right arrow key
          this.block.transformBlock(1, 0);
      }
      this.state.moves += 1;
      this.checkBlock();
    }
  }

  pauseButton(e) {
    switch(e.keyCode) {
      case 13:
      e.preventDefault();
      if (this.state.pauseStatus === false) {
        this.state.pauseStatus = true;
        this.pauseGame();
      } else {
        this.state.pauseStatus = false;
        this.resumeGame();
      }
    }
  }

  pauseGame() {
    clearInterval(this.timerId);
    document.removeEventListener("keydown", this.getMove);
    this.display.drawPause();
  }

  resumeGame() {
    this.display.render(this.displayOptions());
    this.display.drawBlock(this.block);
    document.addEventListener("keydown", this.getMove);
    this.timerId = setInterval(this.display.drawTime, 1000);
  }

  displayOptions() {
    return { level: this.levels.constructedFloor,
             levelNumber: this.levels.currentLevel,
             moves: this.state.moves,
             falls: this.state.falls };
  }

  checkBlock() {
    if (this.block.width === this.block.height) {
      this.checkGoal();
    }
    const { levelData, currentLevel } = this.levels;
    if (levelData[currentLevel] !== undefined) {
      this.checkBounds();
    }
  }

  checkGoal() {
    const tile = this.levels.lookupTile(this.block.position());
    if (tile !== undefined && tile.type === "goal") {
      this.nextLevel();
    }
  }

  nextLevel() {
    this.sound.playGoalSound();
    this.levels.nextLevel();
    const { levelData, currentLevel } = this.levels;
    if (levelData[currentLevel] === undefined) {
      this.endGame();
    } else {
      this.levels.constructFloor();
      this.block.setPosition(this.levels.currentStartPosition);
      this.display.render(this.displayOptions());
      this.display.drawBlock(this.block);
    }
  }

  endGame() {
    document.removeEventListener("keydown", this.getMove);
    document.removeEventListener("keydown", this.pauseButton);
    clearInterval(this.timerId);
    this.display.drawFinish(this.displayOptions());
    document.addEventListener("keydown", this.restartGame);
  }

  checkBounds() {
    const { levelData, currentLevel } = this.levels;
    const { xPos, yPos } = this.block.position();
    const { width, height } = this.block.dimensions();
    const coordinates = [[xPos, yPos],
      [xPos, yPos + height],
      [xPos + width, yPos],
      [xPos + width, yPos + height]];
    if (this.display.tileMovesOffFloor(coordinates)) {
      this.resetLevel();
    } else if (levelData[currentLevel] !== undefined) {
      this.display.render(this.displayOptions());
      this.display.drawBlock(this.block);
      this.sound.playBlockSound(this.block);
    }
  }

  resetLevel() {
    document.removeEventListener("keydown", this.getMove);
    this.state.falls += 1;
    this.flashFailure();
  }

  flashFailure() {
    this.display.render(this.displayOptions());
    this.display.drawFail(this.block.properties());
    this.sound.playFallSound();
    this.block.resetBlock(this.levels.currentStartPosition);
    setTimeout(() => {
      this.display.render(this.displayOptions());
    }, 800);
    setTimeout(() => {
      this.display.drawBlock(this.block);
    }, 800);
    setTimeout(() => {
      document.addEventListener("keydown", this.getMove);
    }, 800);
  }
}

module.exports = Game;
