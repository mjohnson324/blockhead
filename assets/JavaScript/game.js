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
    this.tick = this.tick.bind(this);
    this.pauseButton = this.pauseButton.bind(this);
    this.restartGame = this.restartGame.bind(this);
  }

  setState() {
    this.state = {
      moves: 0,
      falls: 0,
      time: -1,
      pauseStatus: false,
    };
  }

  start() {
    this.setState();
    this.sound.start();
    this.timerId = setInterval(this.tick, 1000);
    document.addEventListener("keydown", this.getMove);
    document.addEventListener("keydown", this.pauseButton);
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
    const { minutes, seconds } = this.upTick();
    const timeDisplay = timeString(minutes, seconds);
    this.display.drawClock(timeDisplay);
  }

  upTick() {
    this.state.time += 1;
    const gameTime = this.state.time;
    const seconds = gameTime % 60;
    const minutes = Math.floor(gameTime / 60) % 60;
    return { minutes: minutes, seconds: seconds };
  }

  timeString(minutes, seconds) {
    const minuteString = (minutes < 10) ? `0${minutes}` : minutes;
    const secondString = (seconds < 10) ? `0${seconds}` : seconds;
    return `${minutes}:${seconds}`;
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
    this.sound.playGoalSound();
    this.state.levelNumber += 1;
    this.state.currentLevel = this.levels.levels[this.state.levelNumber];
    if (this.state.currentLevel === undefined) {
      this.endGame();
    } else {
      this.state.goal = this.state.currentLevel[1];

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
    const { xPos, yPos } = this.block.position();
    const { width, height } = this.block.dimensions();
    const coordinates = [[xPos, yPos],
      [xPos, yPos + height],
      [xPos + width, yPos],
      [xPos + width, yPos + height]];
    if (this.display.tileMovesOffFloor(coordinates)) {
      this.resetBlock();
    } else if (this.state.currentLevel) {
      this.display.render(this.displayOptions());
      this.display.drawBlock(this.block);
      this.sound.playBlockSound(this.block);
    }
  }

  resetBlock() {
    document.removeEventListener("keydown", this.getMove);

    this.state.falls += 1;
    this.flashFailure(oldOptions);
  }

  flashFailure(oldOptions) {
    this.display.render(this.displayOptions());
    this.display.drawFail(oldOptions);
    this.sound.playFallSound();
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
