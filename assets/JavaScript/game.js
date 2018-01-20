const LevelGenerator = require('./level_generator');
const Block = require('./block');
const Display = require('./display');
const Sound = require('./sound');

class Game {
  constructor(ctx, length) {
    this.display = new Display(ctx, length);
    this.levels = LevelGenerator(length);
    this.tileLength = length;
    this.sound = new Sound();

    this.sound.start();
    this.getMove = this.getMove.bind(this);
    this.tick = this.tick.bind(this);
    this.pauseButton = this.pauseButton.bind(this);
    this.restartGame = this.restartGame.bind(this);
  }

  setState() {
    this.state = {
      length: this.tileLength,
      levelNumber: 1,
      moves: 0,
      falls: 0,
      minutes: 0,
      seconds: 0,
      pauseStatus: false,
      currentLevel: this.levels[1],
    };
  }

  start() {
    this.setState();
    this.state.goal = this.state.currentLevel[1];
    this.timerId = setInterval(this.tick, 1000);
    document.addEventListener("keydown", this.getMove);
    document.addEventListener("keydown", this.pauseButton);
    this.constructBlock();
    this.display.render(this.displayOptions());
    this.display.drawBlock(this.block);
  }

  restartGame(e) {
    switch(e.keyCode) {
      case 32:
        e.preventDefault();
        this.start();
        document.removeEventListener("keydown", this.restartGame);
    }
  }

  tick() {
    let minutes = this.state.minutes;
    let seconds = this.state.seconds;
    minutes = (minutes < 10) ? `0${minutes}` : minutes;
    seconds = (seconds < 10) ? `0${seconds}` : seconds;
    this.state.timeString = `${minutes}:${seconds}`;
    this.display.drawClock(this.state.timeString);
    this.uptick();
  }

  uptick() {
    this.state.seconds += 1;
    if (this.state.seconds >= 60) {
      this.state.seconds = 0;
      this.state.minutes += 1;
      if (this.state.minutes >= 60) {
        this.state.minutes = 0;
      }
    }
  }

  constructBlock() {
    const { xPos, yPos } = this.state.currentLevel[0];
    const blockOptions = { xPos: xPos,
      yPos: yPos,
      width: this.state.length,
      height: this.state.length,
    };
    this.block = new Block(blockOptions);
  }

  getBlockOptions() {
    const { xPos, yPos, width, height } = this.block;
    return { xPos: xPos, yPos: yPos, width: width, height:height };
  }

  displayOptions() {
    return { level: this.state.currentLevel,
             levelNumber: this.state.levelNumber,
             moves: this.state.moves,
             falls: this.state.falls,
             time: this.state.timeString };
  }

  getMove(e) {
    const arrowKeycodes = [37, 38, 39, 40];
    if (arrowKeycodes.includes(e.keyCode)) {
      e.preventDefault();
      switch (e.keyCode) {
        case 40: // down arrow key
          this.block.transform(0, this.state.length);
          break;
        case 38: // up arrow key
          this.block.transform(0, this.state.length * -1);
          break;
        case 37: // left arrow key
          this.block.transform(this.state.length * -1, 0);
          break;
        case 39: // right arrow key
          this.block.transform(this.state.length, 0);
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
        this.state.pauseStatus = false
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
    this.timerId = setInterval(this.tick, 1000);
  }

  checkBlock() {
    if (this.block.width === this.block.height) {
      this.checkGoal();
    }
    if (this.state.currentLevel) {
      this.checkBounds();
    }
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
    this.sound.goalSound();
    this.state.levelNumber += 1;
    this.state.currentLevel = this.levels[this.state.levelNumber];
    if (this.state.currentLevel === undefined) {
      this.endGame();
    } else {
      this.state.goal = this.state.currentLevel[1];
      this.constructBlock();
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
    const { xPos, yPos, width, height } = this.getBlockOptions();
    const coordinates = [[xPos, yPos],
      [xPos, yPos + height],
      [xPos + width, yPos],
      [xPos + width, yPos + height]];
    if (this.display.tileMovesOffFloor(coordinates)) {
      this.resetBlock();
    } else if (this.state.currentLevel) {
      this.display.render(this.displayOptions());
      this.display.drawBlock(this.block);
      this.sound.blockSound(this.block);
    }
  }

  resetBlock() {
    document.removeEventListener("keydown", this.getMove);
    const oldOptions = this.getBlockOptions();
    this.constructBlock();
    this.state.falls += 1;
    this.flashFailure(oldOptions);
  }

  flashFailure(oldOptions) {
    this.display.render(this.displayOptions());
    this.display.drawFail(oldOptions);
    this.sound.fallSound();
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
