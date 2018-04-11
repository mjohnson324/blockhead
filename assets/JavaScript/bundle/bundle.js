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
const PageButtons = __webpack_require__(21);

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

const Block = __webpack_require__(2);
const Controls = __webpack_require__(3);
const Display = __webpack_require__(4);
const LevelGenerator = __webpack_require__(6);
const Menu = __webpack_require__(8);
const Sound = __webpack_require__(9);

const allLevels = __webpack_require__(10);

class Game {
  constructor(ctx, length) {
    this.display = new Display(ctx, length);
    this.levels = new LevelGenerator(length, allLevels);
    this.block = new Block(length, { width: length, height: length });
    this.sound = new Sound();
    this.controls = new Controls();

    this.move = this.move.bind(this);
    this.pause = this.pause.bind(this);
    this.restart = this.restart.bind(this);
  }

  start() {
    this.moves = 0;
    this.falls = 0;
    this.sound.start();
    this.levels.constructFloor();
    this.block.setPosition(this.levels.currentStartPosition);
    this.timerId = setInterval(this.display.drawTime, 1000);
    document.addEventListener("keydown", this.move);
    document.addEventListener("keydown", this.pause);
    this.display.render(this.displayOptions());
    this.display.drawBlock(this.block);
  }

  restart(e) {
    this.controls.restartGame(e, this);
  }

  move(e) {
    const arrowKeycodes = [37, 38, 39, 40];
    if (arrowKeycodes.includes(e.keyCode)) {
      this.controls.getMove(e, this.block);
      this.moves += 1;
      this.checkBlock();
    }
  }

  pause(e) {
    this.controls.pauseButton(e, this);
  }

  displayOptions() {
    return {
      level: this.levels.constructedFloor,
      levelNumber: this.levels.currentLevel,
      moves: this.moves,
      falls: this.falls,
    };
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
    document.removeEventListener("keydown", this.move);
    document.removeEventListener("keydown", this.pause);
    clearInterval(this.timerId);
    this.display.drawFinish(this.displayOptions());
    document.addEventListener("keydown", this.restart);
  }

  checkBounds() {
    const { currentLevel, levelData } = this.levels;
    const coordinates = this.getCoordinates();
    if (this.display.tileMovesOffFloor(coordinates)) {
      this.resetLevel();
    } else if (levelData[currentLevel] !== undefined) {
      this.display.render(this.displayOptions());
      this.display.drawBlock(this.block);
      this.sound.playBlockSound(this.block);
    }
  }

  getCoordinates() {
    const { xPos, yPos } = this.block.position();
    const { width, height } = this.block.dimensions();
    return [
      [xPos + Math.floor(width / 4), yPos + Math.floor(height / 4)],
      [xPos + Math.floor(width * 3 / 4), yPos + Math.floor(height * 3 / 4)],
    ];
  }

  resetLevel() {
    document.removeEventListener("keydown", this.move);
    this.falls += 1;
    this.flashFailure();
  }

  flashFailure() {
    this.display.render(this.displayOptions());
    this.display.drawFail(this.block.properties());
    this.sound.playFallSound();
    this.block.resetBlock(this.levels.currentStartPosition);
    setTimeout(() => {
      this.display.render(this.displayOptions());
      this.display.drawBlock(this.block);
      document.addEventListener("keydown", this.move);
    }, 800);
  }
}

module.exports = Game;


/***/ }),
/* 2 */
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
/* 3 */
/***/ (function(module, exports) {

class Controls {
  constructor() {
    this.pauseStatus = false;
  }

  restartGame(e, game) {
    if (e.keyCode === 32) {
        e.preventDefault();
        game.levels.resetCurrentLevel();
        game.start();
        document.removeEventListener("keydown", game.restart);
    }
  }

  getMove(e, block) {
    e.preventDefault();
    switch (e.keyCode) {
      case 40: // down arrow key
        block.transformBlock(0, 1);
        break;
      case 38: // up arrow key
        block.transformBlock(0, -1);
        break;
      case 37: // left arrow key
        block.transformBlock(-1, 0);
        break;
      case 39: // right arrow key
        block.transformBlock(1, 0);
    }
  }

  pauseButton(e, game) {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.pauseStatus = !this.pauseStatus;
      this.pauseStatus === true ? this.pauseGame(game) : this.resumeGame(game);
    }
  }

  pauseGame(game) {
    clearInterval(game.timerId);
    document.removeEventListener("keydown", game.move);
    game.display.drawPause();
  }

  resumeGame(game) {
    game.display.render(game.displayOptions());
    game.display.drawBlock(game.block);
    document.addEventListener("keydown", game.move);
    game.timerId = setInterval(game.display.drawTime, 1000);
  }
}

module.exports = Controls;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const GameClock = __webpack_require__(5);

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
        none: 'rgb(192, 192, 192)',
        collapsible: 'rgb(255, 128, 0)',
        warp: 'rgb(255, 255, 0)',
        activator: 'rgb(255, 255, 255)',
        bridge: 'rgb(128, 0, 0)',
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
    this.ctx.fillText("Press spacebar to start over", 50, 400);
  }
}

module.exports = Display;


/***/ }),
/* 5 */
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const Tile = __webpack_require__(7);

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
/* 7 */
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
      case "a":
        return "activator";
      case "b":
        return "bridge";
    }
  }
}

module.exports = Tile;


/***/ }),
/* 8 */
/***/ (function(module, exports) {

class Menu {
  constructor(context) {
    this.blockSize = "medium";
    this.canvas = document.getElementById("blockhead");
    this.context = context;
  }

  activateMenu() {

    this.canvas.addEventListenenr('click', this.startGame);
    this.canvas.addEventListener('click', this.beginTutorial);
    this.canvas.addEventListener('click', this.alterOptions);
  }

  startGame(e) {
    e.preventDefault();
  }

  beginTutorial(e) {
    e.preventDefault(e);

  }

  alterBlockSize() {
    e.preventDefault(e);

  }
}

module.exports = Menu;


/***/ }),
/* 9 */
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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

const tutorial = __webpack_require__(11);
const levelOne = __webpack_require__(12);
const levelTwo = __webpack_require__(13);
const levelThree = __webpack_require__(14);
const levelFour = __webpack_require__(15);
const levelFive = __webpack_require__(16);
const levelSix = __webpack_require__(17);
const levelSeven = __webpack_require__(18);
const levelEight = __webpack_require__(19);
const levelNine = __webpack_require__(20);

module.exports = {
  tutorial: tutorial,
  1: levelOne,
  2: levelTwo,
  3: levelThree,
  4: levelFour,
};

// 6: levelSix,
// 7: levelSeven,
// 8: levelEight,
// 9: levelNine,
// 5: levelFive,


/***/ }),
/* 11 */
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
/* 12 */
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
/* 13 */
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
/* 14 */
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
/* 15 */
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
/* 16 */
/***/ (function(module, exports) {

const levelFive = {
  floorDimensions: { xRange: 14, yRange: 9 },
  floorData: [
    { x: 1, y: 5, type: "s" },
    { x: 12, y: 7, type: "g" },
    { x: 0, y: 2, type: "n" },
    { x: 0, y: 3, type: "n" },
    { x: 0, y: 4, type: "n" },
    { x: 0, y: 5, type: "n" },
    { x: 0, y: 6, type: "n" },
    { x: 1, y: 2, type: "n" },
    { x: 1, y: 3, type: "n" },
    { x: 1, y: 4, type: "n" },
    { x: 1, y: 6, type: "n" },
    { x: 2, y: 2, type: "n" },
    { x: 2, y: 3, type: "n" },
    { x: 2, y: 4, type: "n" },
    { x: 2, y: 5, type: "n" },
    { x: 2, y: 6, type: "n" },
    { x: 3, y: 0, type: "c" },
    { x: 3, y: 1, type: "c" },
    { x: 3, y: 2, type: "n" },
    { x: 4, y: 0, type: "c" },
    { x: 4, y: 1, type: "c" },
    { x: 5, y: 0, type: "c" },
    { x: 5, y: 1, type: "c" },
    { x: 5, y: 5, type: "n" },
    { x: 5, y: 6, type: "n" },
    { x: 5, y: 7, type: "n" },
    { x: 5, y: 8, type: "n" },
    { x: 6, y: 0, type: "c" },
    { x: 6, y: 1, type: "c" },
    { x: 6, y: 2, type: "w" },
    { x: 6, y: 5, type: "n" },
    { x: 6, y: 6, type: "n" },
    { x: 6, y: 7, type: "n" },
    { x: 6, y: 8, type: "n" },
    { x: 7, y: 5, type: "n" },
    { x: 7, y: 6, type: "n" },
    { x: 7, y: 7, type: "n" },
    { x: 7, y: 8, type: "n" },
    { x: 8, y: 5, type: "n" },
    { x: 8, y: 6, type: "n" },
    { x: 9, y: 2, type: "n" },
    { x: 9, y: 5, type: "c" },
    { x: 9, y: 6, type: "c" },
    { x: 10, y: 2, type: "n" },
    { x: 10, y: 3, type: "n" },
    { x: 10, y: 4, type: "n" },
    { x: 10, y: 5, type: "c" },
    { x: 10, y: 6, type: "c" },
    { x: 10, y: 7, type: "c" },
    { x: 10, y: 8, type: "c" },
    { x: 11, y: 2, type: "n" },
    { x: 11, y: 3, type: "n" },
    { x: 11, y: 4, type: "n" },
    { x: 11, y: 5, type: "c" },
    { x: 11, y: 6, type: "c" },
    { x: 11, y: 7, type: "c" },
    { x: 11, y: 8, type: "c" },
    { x: 12, y: 5, type: "n" },
    { x: 12, y: 6, type: "n" },
    { x: 12, y: 8, type: "n" },
    { x: 13, y: 5, type: "n" },
    { x: 13, y: 6, type: "n" },
    { x: 13, y: 7, type: "n" },
    { x: 13, y: 8, type: "n" },
  ],
};

module.exports = levelFive;

// warp: [6, 2], warps to: [9, 2], [11, 2]


/***/ }),
/* 17 */
/***/ (function(module, exports) {

const levelSix = {
  floorDimensions: { xRange: 16, yRange: 10 },
  floorData: [
    { x: 14, y: 1, type: "s" },
    { x: 1, y: 8, type: "g" },
    { x: 0, y: 7, type: "n" },
    { x: 0, y: 8, type: "n" },
    { x: 0, y: 9, type: "n" },
    { x: 1, y: 1, type: "n" },
    { x: 1, y: 2, type: "n" },
    { x: 1, y: 3, type: "n" },
    { x: 1, y: 4, type: "n" },
    { x: 1, y: 7, type: "n" },
    { x: 1, y: 9, type: "n" },
    { x: 2, y: 1, type: "n" },
    { x: 2, y: 2, type: "n" },
    { x: 2, y: 3, type: "n" },
    { x: 2, y: 4, type: "n" },
    { x: 2, y: 7, type: "n" },
    { x: 2, y: 8, type: "n" },
    { x: 2, y: 9, type: "n" },
    { x: 3, y: 1, type: "n" },
    { x: 3, y: 2, type: "n" },
    { x: 3, y: 3, type: "n" },
    { x: 3, y: 4, type: "n" },
    { x: 3, y: 5, type: "n" },
    { x: 3, y: 8, type: "n" },
    { x: 3, y: 9, type: "n" },
    { x: 4, y: 1, type: "n" },
    { x: 4, y: 2, type: "n" },
    { x: 4, y: 3, type: "n" },
    { x: 4, y: 4, type: "n" },
    { x: 4, y: 5, type: "n" },
    { x: 4, y: 8, type: "n" },
    { x: 5, y: 1, type: "b" },
    { x: 5, y: 5, type: "n" },
    { x: 5, y: 8, type: "b" },
    { x: 6, y: 1, type: "b" },
    { x: 6, y: 5, type: "a" },
    { x: 6, y: 8, type: "b" },
    { x: 7, y: 1, type: "n" },
    { x: 7, y: 5, type: "n" },
    { x: 7, y: 8, type: "n" },
    { x: 8, y: 1, type: "n" },
    { x: 8, y: 5, type: "b" },
    { x: 8, y: 8, type: "n" },
    { x: 9, y: 1, type: "a" },
    { x: 9, y: 5, type: "b" },
    { x: 9, y: 8, type: "n" },
    { x: 10, y: 1, type: "n" },
    { x: 10, y: 5, type: "n" },
    { x: 10, y: 6, type: "n" },
    { x: 10, y: 7, type: "n" },
    { x: 10, y: 8, type: "n" },
    { x: 11, y: 1, type: "n" },
    { x: 11, y: 5, type: "n" },
    { x: 11, y: 6, type: "n" },
    { x: 11, y: 7, type: "n" },
    { x: 11, y: 8, type: "n" },
    { x: 12, y: 0, type: "n" },
    { x: 12, y: 1, type: "n" },
    { x: 12, y: 5, type: "n" },
    { x: 12, y: 6, type: "n" },
    { x: 12, y: 7, type: "n" },
    { x: 12, y: 8, type: "n" },
    { x: 13, y: 0, type: "n" },
    { x: 13, y: 1, type: "n" },
    { x: 13, y: 2, type: "n" },
    { x: 13, y: 6, type: "n" },
    { x: 13, y: 7, type: "n" },
    { x: 14, y: 0, type: "n" },
    { x: 14, y: 2, type: "n" },
    { x: 14, y: 6, type: "a" },
    { x: 14, y: 7, type: "n" },
    { x: 15, y: 0, type: "n" },
    { x: 15, y: 1, type: "n" },
    { x: 15, y: 2, type: "n" },
  ],
};

module.exports = levelSix;

// activator [9, 1] toggles bridges [5-1, 6-1]
// activator [6, 5] toggles bridges [8-5, 9-5] and [5-8, 6-8]
// activator [14, 6] toggles bridges [5-8, 6-8]
// bridges [5-1, 6-1] default off
// bridges [8-5, 9-5] default off
// bridges [5-8, 6-8] default off


/***/ }),
/* 18 */
/***/ (function(module, exports) {

const levelSeven = {
  floorDimensions: { xRange: 14, yRange: 10 },
  floorData: [
    { x: 12, y: 3, type: "s" },
    { x: 7, y: 4, type: "g" },
    { x: 0, y: 0, type: "n" },
    { x: 0, y: 1, type: "n" },
    { x: 0, y: 2, type: "n" },
    { x: 0, y: 3, type: "n" },
    { x: 0, y: 4, type: "n" },
    { x: 0, y: 5, type: "n" },
    { x: 1, y: 0, type: "n" },
    { x: 1, y: 1, type: "n" },
    { x: 1, y: 2, type: "n" },
    { x: 1, y: 3, type: "n" },
    { x: 1, y: 4, type: "n" },
    { x: 1, y: 5, type: "n" },
    { x: 2, y: 0, type: "n" },
    { x: 2, y: 3, type: "n" },
    { x: 2, y: 4, type: "n" },
    { x: 2, y: 5, type: "n" },
    { x: 2, y: 6, type: "n" },
    { x: 2, y: 7, type: "n" },
    { x: 3, y: 0, type: "c" },
    { x: 3, y: 4, type: "c" },
    { x: 3, y: 7, type: "n" },
    { x: 3, y: 8, type: "n" },
    { x: 3, y: 9, type: "n" },
    { x: 4, y: 0, type: "n" },
    { x: 4, y: 4, type: "c" },
    { x: 4, y: 7, type: "n" },
    { x: 4, y: 8, type: "n" },
    { x: 4, y: 9, type: "n" },
    { x: 5, y: 0, type: "n" },
    { x: 5, y: 4, type: "c" },
    { x: 5, y: 5, type: "c" },
    { x: 5, y: 6, type: "c" },
    { x: 5, y: 7, type: "c" },
    { x: 5, y: 8, type: "c" },
    { x: 5, y: 9, type: "n" },
    { x: 6, y: 0, type: "n" },
    { x: 6, y: 3, type: "n" },
    { x: 6, y: 4, type: "n" },
    { x: 6, y: 5, type: "n" },
    { x: 6, y: 6, type: "c" },
    { x: 6, y: 7, type: "c" },
    { x: 6, y: 8, type: "c" },
    { x: 7, y: 0, type: "n" },
    { x: 7, y: 3, type: "n" },
    { x: 7, y: 5, type: "n" },
    { x: 7, y: 6, type: "c" },
    { x: 7, y: 7, type: "n" },
    { x: 7, y: 8, type: "c" },
    { x: 8, y: 0, type: "c" },
    { x: 8, y: 3, type: "n" },
    { x: 8, y: 4, type: "n" },
    { x: 8, y: 5, type: "n" },
    { x: 8, y: 6, type: "c" },
    { x: 8, y: 7, type: "c" },
    { x: 8, y: 8, type: "c" },
    { x: 8, y: 9, type: "n" },
    { x: 9, y: 0, type: "n" },
    { x: 9, y: 6, type: "c" },
    { x: 9, y: 7, type: "c" },
    { x: 9, y: 8, type: "c" },
    { x: 9, y: 9, type: "n" },
    { x: 10, y: 0, type: "n" },
    { x: 10, y: 1, type: "n" },
    { x: 10, y: 6, type: "n" },
    { x: 10, y: 7, type: "c" },
    { x: 10, y: 8, type: "c" },
    { x: 11, y: 0, type: "n" },
    { x: 11, y: 1, type: "n" },
    { x: 11, y: 2, type: "n" },
    { x: 11, y: 3, type: "n" },
    { x: 11, y: 4, type: "n" },
    { x: 11, y: 5, type: "n" },
    { x: 11, y: 6, type: "n" },
    { x: 12, y: 0, type: "n" },
    { x: 12, y: 1, type: "n" },
    { x: 12, y: 2, type: "n" },
    { x: 12, y: 4, type: "n" },
    { x: 13, y: 2, type: "n" },
    { x: 13, y: 3, type: "n" },
    { x: 13, y: 4, type: "n" },
  ],
};

module.exports = levelSeven;


/***/ }),
/* 19 */
/***/ (function(module, exports) {

const levelEight = {
  floorDimensions: { xRange: 13, yRange: 7 },
  floorData: [
    { x: 11, y: 1, type: "g" },
    { x: 3, y: 5, type: "s" },
    { x: 0, y: 1, type: "w" },
    { x: 1, y: 0, type: "w" },
    { x: 1, y: 1, type: "n" },
    { x: 1, y: 2, type: "w" },
    { x: 2, y: 1, type: "w" },
    { x: 2, y: 4, type: "n" },
    { x: 2, y: 5, type: "n" },
    { x: 2, y: 6, type: "n" },
    { x: 3, y: 1, type: "b" },
    { x: 3, y: 4, type: "n" },
    { x: 3, y: 6, type: "n" },
    { x: 4, y: 1, type: "b" },
    { x: 4, y: 4, type: "n" },
    { x: 4, y: 5, type: "n" },
    { x: 4, y: 6, type: "n" },
    { x: 5, y: 1, type: "a" },
    { x: 5, y: 5, type: "n" },
    { x: 6, y: 1, type: "a" },
    { x: 6, y: 5, type: "n" },
    { x: 7, y: 1, type: "n" },
    { x: 7, y: 5, type: "n" },
    { x: 8, y: 1, type: "b" },
    { x: 8, y: 4, type: "n" },
    { x: 8, y: 5, type: "n" },
    { x: 8, y: 6, type: "n" },
    { x: 9, y: 1, type: "b" },
    { x: 9, y: 4, type: "n" },
    { x: 9, y: 5, type: "w" },
    { x: 9, y: 6, type: "n" },
    { x: 10, y: 0, type: "n" },
    { x: 10, y: 1, type: "n" },
    { x: 10, y: 2, type: "n" },
    { x: 10, y: 4, type: "n" },
    { x: 10, y: 5, type: "n" },
    { x: 10, y: 6, type: "n" },
    { x: 11, y: 0, type: "n" },
    { x: 11, y: 2, type: "n" },
    { x: 12, y: 0, type: "n" },
    { x: 12, y: 1, type: "n" },
    { x: 12, y: 2, type: "n" },
  ],
};

module.exports = levelEight;

// warp: [9, 5], warps to: [0, 1], [1, 0]
// warp: [1, 2], warps to: [1, 2], [0, 1]
// warp: [2, 1], warps to: [0, 1], [2, 1]
// warp: [0, 1], warps to: [1, 0], [2, 1]
// warp: [1, 0], warps to: [5, 1], [7, 1]
// activator [5, 1] toggles bridges [3-1, 4-1]
// activator [6, 1] toggles bridges [8-1, 9-1]
// bridges both off by default


/***/ }),
/* 20 */
/***/ (function(module, exports) {

const levelNine = {
  floorDimensions: { xRange: 15, yRange: 10 },
  floorData: [
    { x: 4, y: 8, type: "s" },
    { x: 7, y: 2, type: "g" },
    { x: 0, y: 2, type: "b" },
    { x: 0, y: 3, type: "n" },
    { x: 0, y: 4, type: "n" },
    { x: 0, y: 5, type: "n" },
    { x: 0, y: 6, type: "n" },
    { x: 1, y: 0, type: "n" },
    { x: 1, y: 1, type: "n" },
    { x: 1, y: 2, type: "n" },
    { x: 1, y: 6, type: "b" },
    { x: 2, y: 0, type: "n" },
    { x: 2, y: 1, type: "n" },
    { x: 2, y: 2, type: "n" },
    { x: 2, y: 6, type: "b" },
    { x: 3, y: 0, type: "n" },
    { x: 3, y: 1, type: "n" },
    { x: 3, y: 2, type: "n" },
    { x: 3, y: 6, type: "n" },
    { x: 3, y: 7, type: "n" },
    { x: 3, y: 8, type: "n" },
    { x: 3, y: 9, type: "n" },
    { x: 4, y: 6, type: "n" },
    { x: 4, y: 7, type: "n" },
    { x: 4, y: 9, type: "n" },
    { x: 5, y: 6, type: "n" },
    { x: 5, y: 7, type: "n" },
    { x: 5, y: 8, type: "n" },
    { x: 5, y: 9, type: "n" },
    { x: 6, y: 6, type: "c" },
    { x: 6, y: 7, type: "c" },
    { x: 6, y: 8, type: "c" },
    { x: 6, y: 9, type: "n" },
    { x: 7, y: 3, type: "b" },
    { x: 7, y: 4, type: "n" },
    { x: 7, y: 5, type: "c" },
    { x: 7, y: 6, type: "c" },
    { x: 7, y: 7, type: "c" },
    { x: 7, y: 8, type: "c" },
    { x: 7, y: 9, type: "n" },
    { x: 8, y: 2, type: "b" },
    { x: 8, y: 3, type: "b" },
    { x: 8, y: 4, type: "n" },
    { x: 8, y: 5, type: "c" },
    { x: 8, y: 6, type: "c" },
    { x: 8, y: 7, type: "c" },
    { x: 8, y: 8, type: "c" },
    { x: 8, y: 9, type: "a" },
    { x: 9, y: 2, type: "n" },
    { x: 9, y: 3, type: "n" },
    { x: 9, y: 4, type: "n" },
    { x: 9, y: 5, type: "c" },
    { x: 9, y: 6, type: "c" },
    { x: 9, y: 7, type: "c" },
    { x: 9, y: 8, type: "c" },
    { x: 10, y: 2, type: "b" },
    { x: 10, y: 6, type: "c" },
    { x: 10, y: 7, type: "c" },
    { x: 10, y: 8, type: "c" },
    { x: 11, y: 2, type: "b" },
    { x: 11, y: 6, type: "n" },
    { x: 11, y: 7, type: "n" },
    { x: 11, y: 8, type: "n" },
    { x: 12, y: 0, type: "n" },
    { x: 12, y: 1, type: "n" },
    { x: 12, y: 2, type: "n" },
    { x: 12, y: 3, type: "n" },
    { x: 12, y: 6, type: "n" },
    { x: 12, y: 7, type: "w" },
    { x: 12, y: 8, type: "n" },
    { x: 13, y: 0, type: "n" },
    { x: 13, y: 1, type: "a" },
    { x: 13, y: 2, type: "n" },
    { x: 13, y: 3, type: "n" },
    { x: 13, y: 6, type: "n" },
    { x: 13, y: 7, type: "n" },
    { x: 13, y: 8, type: "n" },
    { x: 14, y: 0, type: "n" },
    { x: 14, y: 1, type: "n" },
    { x: 14, y: 2, type: "n" },
    { x: 14, y: 3, type: "a" },
    { x: 14, y: 4, type: "n" },
    { x: 14, y: 5, type: "n" },
    { x: 14, y: 6, type: "b" },
  ],
};

module.exports = levelNine;

// warp [12, 7] warps to [12, 7], [2, 1]
// activator [8, 9] toggles bridges 1-6, 2-6 & 0-2
// activator [13, 1] toggles bridges 10-2, 11-2, 8-2. 8-3 & 7-3
// activator [14, 3] toggles bridge 14-6
// bridges 0-2, 1-6, 2-6, 7-3, 8-3, 8-2, 14-6 default off
// bridge 10-2, 11-2 default on


/***/ }),
/* 21 */
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