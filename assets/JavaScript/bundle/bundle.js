/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(1);
const PageButtons = __webpack_require__(14);

document.addEventListener("DOMContentLoaded", () => {
  const buttonActivation = new PageButtons();
  const blockheadBoard = document.getElementById("blockhead");
  const ctx = blockheadBoard.getContext("2d");
  blockheadBoard.width = 900;
  blockheadBoard.height = 500;
  new Game(ctx, 30).start();
});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const LevelGenerator = __webpack_require__(2);
const Block = __webpack_require__(4);
const Display = __webpack_require__(5);
const Sound = __webpack_require__(7);
const allLevels = __webpack_require__(8);

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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Tile = __webpack_require__(3);

class LevelGenerator {
  constructor(length, levels) {
    this.currentLevel = 1;
    this.length = length;
    this.levelData = levels;

    this.constructTileCoordinates = this.constructTileCoordinates.bind(this);
  }

  nextLevel() {
    this.currentLevel += 1;
  }

  resetCurrentLevel() {
    this.currentLevel = 1;
  }

  constructFloor() {
    this.constructedFloor = this.generateLevel();
    this.currentStartPosition = this.getStart(this.constructedFloor);
  }

  getStart(floor) {
    for (var position in floor) {
      let tile = floor[position];
      if (tile.type === "start") {
        return { xPos: tile.xPos, yPos: tile.yPos };
      }
    }
  }

  generateLevel() {
    const level = this.levelData[this.currentLevel];
    const startPosition = this.centerFloor(level.floorDimensions);
    return this.setCoordinates(level.floorData, startPosition);
  }

  centerFloor(floorDimensions) { // Tiles are positioned relative to the
    const canvasWidth = 900;     // position of the top-left tile on a floor.
    const canvasHeight = 500;
    const floorWidth = floorDimensions.xRange * this.length;
    const floorHeight = floorDimensions.yRange * this.length;
    const startCornerXPos = Math.floor((canvasWidth - floorWidth) / 2);
    const startCornerYPos = Math.floor((canvasHeight - floorHeight) / 2);
    return { xPos: startCornerXPos, yPos: startCornerYPos };
  }

  setCoordinates(floorData, startPosition) {
    const newFloor = {};
    floorData.forEach(tileData => {
      let tileOptions = this.constructTileCoordinates(tileData, startPosition);
      let tile = new Tile(tileOptions);
      let tilePosition = `[${tile.xPos}, ${tile.yPos}]`;
      newFloor[tilePosition] = tile;
    });
    return newFloor;
  }

  constructTileCoordinates(tileData, startPosition) {
    const x = startPosition.xPos + this.length * tileData.x;
    const y = startPosition.yPos + this.length * tileData.y;
    return { x: x, y: y, type: tileData.type, };
  }

  lookupTile(position) {
    const currentPosition = `[${position.xPos}, ${position.yPos}]`;
    return this.constructedFloor[currentPosition];
  }
}

module.exports = LevelGenerator;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

class Tile {
  constructor(options) {
    this.xPos = options.x;
    this.yPos = options.y;
    this.type = this.typeReference(options.type);
  }

  typeReference(type) {
    switch(type) {
      case "n":
        return "none";
      case "s":
        return "start";
      case "g":
        return "goal";
      case "c":
        return "collapsible";
      case "w":
        return "warp";
      case "h":
        return "heavySwitch";
      case "l":
        return "lightSwitch";
      case "b":
        return "bridge";
    }
  }
}

module.exports = Tile;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

class Block {
  constructor(length, dimensions) {
    this.length = length;
    this.width = dimensions.width;
    this.height = dimensions.height;
  }

  dimensions() {
    return {
      width: this.width,
      height: this.height,
    };
  }

  position() {
    return {
      xPos: this.xPos,
      yPos: this.yPos
    };
  }

  properties() {
    return {
      xPos: this.xPos,
      yPos: this.yPos,
      width: this.width,
      height: this.height
    };
  }

  setPosition(coordinates) {
    this.xPos = coordinates.xPos;
    this.yPos = coordinates.yPos;
  }

  resetBlock(startPosition) {
    this.width = this.length;
    this.height = this.length;
    this.xPos = startPosition.xPos;
    this.yPos = startPosition.yPos;
  }

// To reduce information which must be tracked by the game state,
// Length is kept as a block attribute. This is because length is a
// constant dictating the size of each tile, and the block always
// moves a discrete distance (1 or 2 tiles). dx and dy therefore
// represent discrete tile steps and are multiplied by length to account
// for varying tile sizes set by the player.
  changePosition(dx, dy) {
    this.xPos += dx * this.length;
    this.yPos += dy * this.length;
  }

  transformBlock(x, y) {
    this.width === this.height ?
      this.expand(x, y) : this.checkDimensionsAndMovement(x, y);
  }

  expand(x, y) {
    x !== 0 ? this.expandWidth(x, y) : this.expandHeight(x, y);
  }

  // To simulate a rectangular prism, the block's dimensions and
  // position must change differently depending on its current size and
  // the direction it moves.
  checkDimensionsAndMovement(x, y) {
    if (this.width > this.height && x !== 0) {
      this.contractWidth(x, y);
    } else if (this.width < this.height && y !== 0) {
      this.contractHeight(x, y);
    } else {
      this.changePosition(x, y);
    }
  }

  expandWidth(x, y) {
    this.width *= 2;
    x > 0 ? this.changePosition(x, y) : this.changePosition(2 * x, y);
  }

  expandHeight(x, y) {
    this.height *= 2;
    y > 0 ? this.changePosition(x, y) : this.changePosition(x, 2 * y);
  }

  contractWidth(x, y) {
    this.width /= 2;
    x > 0 ? this.changePosition(2 * x, y) : this.changePosition(x, y);
  }

  contractHeight(x, y) {
    this.height /= 2;
    y > 0 ? this.changePosition(x, y * 2) : this.changePosition(x, y);
  }
}

module.exports = Block;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const GameClock = __webpack_require__(6);

class Display {
  constructor(ctx, length) {
    this.clock = new GameClock();
    this.ctx = ctx;
    this.length = length;
    this.colors = this.colors();
    this.fonts = this.fonts();
    this.ctx.fillStyle = this.colors.backgroundColor;
    this.ctx.fillRect(0, 0, 900, 500);

    this.drawTime = this.drawTime.bind(this);
  }

  colors() {
    return {
      backgroundColor: 'rgb(25, 25, 25)',
      textColor: 'rgb(255, 255, 255)',
      blockColor: 'rgb(200, 0, 255)',
      blockFallingColor: 'rgb(255, 0, 0)',
      tileColors: {
        start: 'rgb(0, 255, 255)',
        goal: 'rgb(0, 255, 0)',
        none: 'rgb(192, 192, 192)'
      }
    };
  }

  fonts() {
    return {
      mediumFontSize: '30px sans-serif',
      largeFontSize: '50px sans-serif',
    };
  }

  render(options) {
    this.ctx.fillStyle = this.colors.backgroundColor;
    this.ctx.fillRect(0, 0, 900, 450);
    this.ctx.fillRect(0, 450, 700, 50);
    this.ctx.font = this.fonts.mediumFontSize;
    this.ctx.fillStyle = this.colors.textColor;
    this.ctx.fillText(`Level ${options.levelNumber}`, 25, 50);
    this.ctx.fillText(`Moves: ${options.moves}`, 700, 50);
    this.ctx.fillText(`Falls: ${options.falls}`, 25, 475);
    this.drawFloor(options.level);
  }

  drawFloor(floor) {
    for (var position in floor) {
      let tile = floor[position];
      this.ctx.fillStyle = this.colors.tileColors[tile.type];
      const { xPos, yPos } = tile;
      this.ctx.fillRect(xPos, yPos, this.length, this.length);
      this.ctx.strokeRect(xPos, yPos, this.length, this.length);
    }
  }

  drawMenu() { // Not yet in use
    this.ctx.font = this.fonts.largeFontSize;
    this.ctx.fillStyle = this.colors.textColor;
    this.ctx.fillText('Blockhead', 400, 200);
    this.ctx.font = this.fonts.mediumFontSize;
    this.ctx.fillStyle = 'red';
    this.ctx.fillText('Options (coming soon!)', 350, 300);
    this.ctx.fillText('Tutorial (coming soon!)', 350, 350);
    this.ctx.fillStyle = this.colors.textColor;
    this.ctx.fillText('Start', 300, 250);
  }

  stringifyTime() {
    const { minutes, seconds } = this.clock.currentTime();

    const minuteString = (minutes < 10) ? `0${minutes}` : minutes;
    const secondString = (seconds < 10) ? `0${seconds}` : seconds;

    return `${minuteString}:${secondString}`;
  }

  drawTime() {
    const displayTime = this.stringifyTime();
    this.ctx.fillStyle = this.colors.backgroundColor;
    this.ctx.fillRect(200, 450, 900, 50);
    this.ctx.font = this.fonts.mediumFontSize;
    this.ctx.fillStyle = this.colors.textColor;
    this.ctx.fillText(displayTime, 700, 475);
    this.clock.upTick();
  }

  drawBlock(block) {
    const { xPos, yPos, width, height } = block;
    this.ctx.fillStyle = this.colors.blockColor;
    this.ctx.fillRect(xPos, yPos, width, height);
    this.ctx.strokeRect(xPos, yPos, width, height);
  }

  stringifyRGBData(colorData) {
    return 'rgb('.concat(colorData[0])
      .concat(', ')
      .concat(colorData[1])
      .concat(', ')
      .concat(colorData[2])
      .concat(')');
  }

  tileMovesOffFloor(coordinates) {
    for(let i = 0; i < coordinates.length; i++) {
      let corner = coordinates[i];
      let point = this.ctx.getImageData(corner[0], corner[1], 1, 1);
      let colorData = point.data.slice(0, 3);
      let color = this.stringifyRGBData(colorData);
      if (color === this.colors.backgroundColor) {
        return true;
      }
    }
    return false;
  }

  drawPause() {
    this.ctx.fillStyle = this.colors.backgroundColor;
    this.ctx.fillRect(0, 0, 900, 500);
    this.ctx.font = this.fonts.largeFontSize;
    this.ctx.fillStyle = this.colors.textColor;
    this.ctx.fillText(`Pause`, 400, 200);
    this.ctx.font = this.fonts.mediumFontSize;
    this.ctx.fillText(`(Press enter to resume)`, 300, 300);
  }

  drawFail(oldOptions) {
    const { xPos, yPos, width, height } = oldOptions;
    this.ctx.fillStyle = this.colors.blockFallingColor;
    this.ctx.fillRect(xPos, yPos, width, height);
  }

  drawFinish(options) {
    this.ctx.fillStyle = this.colors.backgroundColor;
    this.ctx.fillRect(0, 0, 900, 500);
    this.ctx.font = this.fonts.largeFontSize;
    this.ctx.fillStyle = this.colors.textColor;
    this.ctx.fillText(`Final Tally:`, 50, 100);
    this.ctx.font = this.fonts.mediumFontSize;
    this.ctx.fillText(`Moves: ${options.moves}`, 70, 155);
    this.ctx.fillText(`Falls: ${options.falls}`, 70, 190);
    this.ctx.fillText(`Time: ${options.time}`, 70, 225);
    this.ctx.fillText(
      "Thanks for playing! More levels will be added in the future",
      50,
      350);
    this.ctx.fillText("Press spacebar to start over", 50, 400);
  }
}

module.exports = Display;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

class GameClock {
  constructor() {
    this.gameTimeSeconds = 0;
  }

  upTick() {
    this.gameTimeSeconds += 1;
  }

  currentTime() {
    const gameTime = this.gameTimeSeconds;
    const seconds = gameTime % 60;
    const minutes = Math.floor(gameTime / 60) % 60;
    return { minutes: minutes, seconds: seconds };
  }
}

module.exports = GameClock;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

class Sound {
  constructor() {
    this.rectangleSound = document.getElementById("block-rectangle");
    this.squareSound = document.getElementById("block-square");
    this.fallSound = document.getElementById("fall");
    this.completeLevelSound = document.getElementById("complete-level");
    this.gameMusic = document.getElementById("game-song");
    this.menuMusic = document.getElementById("menu-song"); // Not yet in use

    this.toggleMusic = this.toggleMusic.bind(this);
  }

  start() {
    this.musicButton = document.getElementById("music");
    this.musicButton.addEventListener("click", this.toggleMusic);
    this.playMusic = true;
    this.gameMusic.loop = true;
    this.gameMusic.play();
  }

  toggleMusic() {
    this.playMusic === true ? this.pausMusic() : this.resumeMusic();
  }

  pausMusic() {
    this.playMusic = false;
    this.musicButton.className = "off";
    this.gameMusic.pause();
  }

  resumeMusic() {
    this.playMusic = true;
    this.musicButton.className = "on";
    this.gameMusic.play();
  }

  playBlockSound(block) {
    block.height === block.width ?
      this.squareSound.play() : this.rectangleSound.play();
  }

  playFallSound() {
    this.fallSound.play();
  }

  playGoalSound() {
    this.completeLevelSound.play();
  }
}

module.exports = Sound;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

const tutorial = __webpack_require__(9);
const levelOne = __webpack_require__(10);
const levelTwo = __webpack_require__(11);
const levelThree = __webpack_require__(12);
const levelFour = __webpack_require__(13);

module.exports = {
  tutorial: tutorial,
  1: levelOne,
  2: levelTwo,
  3: levelThree,
  4: levelFour,
};


/***/ }),
/* 9 */
/***/ (function(module, exports) {

const tutorial = {
  floorDimensions: { xRange: 5, yRange: 5, },
  floorData: [
    { x: 0, y: 0, type: "s" },
    { x: 2, y: 2, type: "g" },
    { x: 0, y: 1, type: "n" },
    { x: 0, y: 2, type: "n" },
    { x: 0, y: 3, type: "n" },
    { x: 0, y: 4, type: "n" },
    { x: 1, y: 0, type: "n" },
    { x: 1, y: 1, type: "n" },
    { x: 1, y: 2, type: "n" },
    { x: 1, y: 3, type: "n" },
    { x: 1, y: 4, type: "n" },
    { x: 2, y: 0, type: "n" },
    { x: 2, y: 1, type: "n" },
    { x: 2, y: 3, type: "n" },
    { x: 2, y: 4, type: "n" },
    { x: 3, y: 0, type: "n" },
    { x: 3, y: 1, type: "n" },
    { x: 3, y: 2, type: "n" },
    { x: 3, y: 3, type: "n" },
    { x: 3, y: 4, type: "n" },
    { x: 4, y: 0, type: "n" },
    { x: 4, y: 1, type: "n" },
    { x: 4, y: 2, type: "n" },
    { x: 4, y: 3, type: "n" },
    { x: 4, y: 4, type: "n" },
  ],
};

module.exports = tutorial;


/***/ }),
/* 10 */
/***/ (function(module, exports) {

const levelOne = {
  floorDimensions: { xRange: 10, yRange: 1, },
  floorData: [
    { x: 0, y: 0, type: "s" },
    { x: 9, y: 0, type: "g" },
    { x: 1, y: 0, type: "n" },
    { x: 2, y: 0, type: "n" },
    { x: 3, y: 0, type: "n" },
    { x: 4, y: 0, type: "n" },
    { x: 5, y: 0, type: "n" },
    { x: 6, y: 0, type: "n" },
    { x: 7, y: 0, type: "n" },
    { x: 8, y: 0, type: "n" }
  ],
};

module.exports = levelOne;


/***/ }),
/* 11 */
/***/ (function(module, exports) {

const levelTwo = {
  floorDimensions: { xRange: 10, yRange: 6, },
  floorData: [
    { x: 1, y: 1, type: "s" },
    { x: 7, y: 4, type: "g" },
    { x: 0, y: 0, type: "n" },
    { x: 0, y: 1, type: "n" },
    { x: 0, y: 2, type: "n" },
    { x: 1, y: 0, type: "n" },
    { x: 1, y: 2, type: "n" },
    { x: 1, y: 3, type: "n" },
    { x: 2, y: 0, type: "n" },
    { x: 2, y: 1, type: "n" },
    { x: 2, y: 2, type: "n" },
    { x: 2, y: 3, type: "n" },
    { x: 3, y: 1, type: "n" },
    { x: 3, y: 2, type: "n" },
    { x: 3, y: 3, type: "n" },
    { x: 4, y: 1, type: "n" },
    { x: 4, y: 2, type: "n" },
    { x: 4, y: 3, type: "n" },
    { x: 5, y: 1, type: "n" },
    { x: 5, y: 2, type: "n" },
    { x: 5, y: 3, type: "n" },
    { x: 5, y: 4, type: "n" },
    { x: 6, y: 2, type: "n" },
    { x: 6, y: 3, type: "n" },
    { x: 6, y: 4, type: "n" },
    { x: 6, y: 5, type: "n" },
    { x: 7, y: 2, type: "n" },
    { x: 7, y: 3, type: "n" },
    { x: 7, y: 5, type: "n" },
    { x: 8, y: 2, type: "n" },
    { x: 8, y: 3, type: "n" },
    { x: 8, y: 4, type: "n" },
    { x: 8, y: 5, type: "n" },
    { x: 9, y: 3, type: "n" },
    { x: 9, y: 4, type: "n" },
  ],
};

module.exports = levelTwo;


/***/ }),
/* 12 */
/***/ (function(module, exports) {

const levelThree = {
  floorDimensions: { xRange: 15, yRange: 6, },
  floorData: [
    { x: 1, y: 2, type: "s" },
    { x: 13, y: 2, type: "g" },
    { x: 0, y: 4, type: "n" },
    { x: 0, y: 3, type: "n" },
    { x: 0, y: 2, type: "n" },
    { x: 0, y: 1, type: "n" },
    { x: 1, y: 4, type: "n" },
    { x: 1, y: 3, type: "n" },
    { x: 1, y: 1, type: "n" },
    { x: 2, y: 4, type: "n" },
    { x: 2, y: 3, type: "n" },
    { x: 2, y: 2, type: "n" },
    { x: 2, y: 1, type: "n" },
    { x: 3, y: 4, type: "n" },
    { x: 3, y: 3, type: "n" },
    { x: 3, y: 2, type: "n" },
    { x: 3, y: 1, type: "n" },
    { x: 4, y: 3, type: "n" },
    { x: 5, y: 3, type: "n" },
    { x: 6, y: 5, type: "n" },
    { x: 6, y: 4, type: "n" },
    { x: 6, y: 3, type: "n" },
    { x: 7, y: 5, type: "n" },
    { x: 7, y: 4, type: "n" },
    { x: 7, y: 3, type: "n" },
    { x: 8, y: 5, type: "n" },
    { x: 8, y: 4, type: "n" },
    { x: 8, y: 3, type: "n" },
    { x: 9, y: 5, type: "n" },
    { x: 10, y: 5, type: "n" },
    { x: 11, y: 5, type: "n" },
    { x: 11, y: 4, type: "n" },
    { x: 11, y: 3, type: "n" },
    { x: 11, y: 2, type: "n" },
    { x: 11, y: 1, type: "n" },
    { x: 12, y: 5, type: "n" },
    { x: 12, y: 4, type: "n" },
    { x: 12, y: 3, type: "n" },
    { x: 12, y: 2, type: "n" },
    { x: 12, y: 1, type: "n" },
    { x: 12, y: 0, type: "n" },
    { x: 13, y: 3, type: "n" },
    { x: 13, y: 1, type: "n" },
    { x: 13, y: 0, type: "n" },
    { x: 14, y: 3, type: "n" },
    { x: 14, y: 2, type: "n" },
    { x: 14, y: 1, type: "n" },
    { x: 14, y: 0, type: "n" },
  ],
};

module.exports = levelThree;


/***/ }),
/* 13 */
/***/ (function(module, exports) {

const levelFour = {
  floorDimensions: { xRange: 14, yRange: 10, },
  floorData: [
    { x: 0, y: 6, type: "s" },
    { x: 13, y: 5, type: "g" },
    { x: 1, y: 6, type: "n" },
    { x: 2, y: 6, type: "n" },
    { x: 3, y: 6, type: "n" },
    { x: 4, y: 6, type: "n" },
    { x: 4, y: 5, type: "n" },
    { x: 4, y: 4, type: "n" },
    { x: 5, y: 9, type: "n" },
    { x: 5, y: 8, type: "n" },
    { x: 5, y: 7, type: "n" },
    { x: 5, y: 6, type: "n" },
    { x: 5, y: 5, type: "n" },
    { x: 5, y: 4, type: "n" },
    { x: 6, y: 9, type: "n" },
    { x: 6, y: 5, type: "n" },
    { x: 6, y: 4, type: "n" },
    { x: 6, y: 3, type: "n" },
    { x: 6, y: 2, type: "n" },
    { x: 6, y: 1, type: "n" },
    { x: 7, y: 9, type: "n" },
    { x: 7, y: 2, type: "n" },
    { x: 7, y: 1, type: "n" },
    { x: 7, y: 0, type: "n" },
    { x: 8, y: 9, type: "n" },
    { x: 8, y: 8, type: "n" },
    { x: 8, y: 7, type: "n" },
    { x: 8, y: 2, type: "n" },
    { x: 8, y: 1, type: "n" },
    { x: 8, y: 0, type: "n" },
    { x: 9, y: 9, type: "n" },
    { x: 9, y: 8, type: "n" },
    { x: 9, y: 7, type: "n" },
    { x: 9, y: 3, type: "n" },
    { x: 9, y: 2, type: "n" },
    { x: 9, y: 1, type: "n" },
    { x: 9, y: 0, type: "n" },
    { x: 10, y: 9, type: "n" },
    { x: 10, y: 8, type: "n" },
    { x: 10, y: 7, type: "n" },
    { x: 10, y: 3, type: "n" },
    { x: 10, y: 2, type: "n" },
    { x: 10, y: 1, type: "n" },
    { x: 11, y: 7, type: "n" },
    { x: 11, y: 6, type: "n" },
    { x: 11, y: 5, type: "n" },
    { x: 12, y: 7, type: "n" },
    { x: 12, y: 6, type: "n" },
    { x: 12, y: 5, type: "n" },
    { x: 13, y: 6, type: "n" },
  ],
};

module.exports = levelFour;


/***/ }),
/* 14 */
/***/ (function(module, exports) {

class PageButtons {
  constructor() {
    this.toggleImage = this.toggleImage.bind(this);

    this.activateTutorialImages();
    this.activateDirections();
  }

  activateTutorialImages() {
    const imageIds = ['falling', 'goal', 'move', 'transform'];
    imageIds.forEach(id => {
      let button = document.getElementById(`${id}-button`);
      let displayImage = document.getElementById(`${id}`);
      button.addEventListener("click", () => {
        this.toggleImage(displayImage);
      });
    });
  }

  activateDirections() {
    const button = document.getElementById('direct-button');
    const display = document.getElementById('direct');
    button.addEventListener("click", () => {
      this.toggleDirections(display);
    });
  }

  toggleImage(image) {
    image.className === "hidden" ?
      image.className = "show" : image.className = "hidden";
  }

  toggleDirections(directions) {
    directions.className === "hidden" ?
      directions.className = "display" : directions.className = "hidden";
  }
}

module.exports = PageButtons;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map