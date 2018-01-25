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
const PageButtons = __webpack_require__(13);

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
const Block = __webpack_require__(10);
const Display = __webpack_require__(11);
const Sound = __webpack_require__(12);

class Game {
  constructor(ctx, length) {
    this.display = new Display(ctx, length);
    this.levels = LevelGenerator(length);
    this.tileLength = length;
    this.sound = new Sound();

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
    this.sound.start();
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
          this.block.transformBlock(0, this.state.length);
          break;
        case 38: // up arrow key
          this.block.transformBlock(0, this.state.length * -1);
          break;
        case 37: // left arrow key
          this.block.transformBlock(this.state.length * -1, 0);
          break;
        case 39: // right arrow key
          this.block.transformBlock(this.state.length, 0);
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
      this.sound.playBlockSound(this.block);
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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Tile = __webpack_require__(3);
const allLevels = __webpack_require__(4);

const levelGenerator = (length) => {
  const levels = allLevels.map(level => level(length));
  levels.forEach(level => {
    level.forEach((positionData, idx) => {
      level[idx] = new Tile(positionData);
    });
  });
  return levels;
};



module.exports = levelGenerator;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

class Tile {
  constructor(options) {
    this.xPos = options.x;
    this.yPos = options.y;
    this.type = options.type;
  }
}

module.exports = Tile;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const tutorial = __webpack_require__(5);
const levelOne = __webpack_require__(6);
const levelTwo = __webpack_require__(7);
const levelThree = __webpack_require__(8);
const levelFour = __webpack_require__(9);

module.exports = [
  tutorial,
  levelOne,
  levelTwo,
  levelThree,
  levelFour
];


/***/ }),
/* 5 */
/***/ (function(module, exports) {

const tutorial = (length, startX = 360, startY = 180) => {
  return(
    [
    { x: startX, y: startY, type: "start" },
    { x: startX + length * 2, y: startY + length * 2, type: "goal" },

    { x: startX, y: startY + length, type: "none" },
    { x: startX, y: startY + length * 2, type: "none" },
    { x: startX, y: startY + length * 3, type: "none" },
    { x: startX, y: startY + length * 4, type: "none" },

    { x: startX + length, y: startY, type: "none" },
    { x: startX + length, y: startY + length, type: "none" },
    { x: startX + length, y: startY + length * 2, type: "none" },
    { x: startX + length, y: startY + length * 3, type: "none" },
    { x: startX + length, y: startY + length * 4, type: "none" },

    { x: startX + length * 2, y: startY, type: "none" },
    { x: startX + length * 2, y: startY + length, type: "none" },
    { x: startX + length * 2, y: startY + length * 3, type: "none" },
    { x: startX + length * 2, y: startY + length * 4, type: "none" },

    { x: startX + length * 3, y: startY, type: "none" },
    { x: startX + length * 3, y: startY + length, type: "none" },
    { x: startX + length * 3, y: startY + length * 2, type: "none" },
    { x: startX + length * 3, y: startY + length * 3, type: "none" },
    { x: startX + length * 3, y: startY + length * 4, type: "none" },

    { x: startX + length * 4, y: startY, type: "none" },
    { x: startX + length * 4, y: startY + length, type: "none" },
    { x: startX + length * 4, y: startY + length * 2, type: "none" },
    { x: startX + length * 4, y: startY + length * 3, type: "none" },
    { x: startX + length * 4, y: startY + length * 4, type: "none" },
  ]);
};

module.exports = tutorial;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

const levelOne = (length, startX = 300, startY = 180) => {
  return(
    [
      { x: startX, y: startY, type: "start" },
      { x: startX + length * 9, y: startY, type: "goal" },

      { x: startX + length, y: startY, type: "none" },
      { x: startX + length * 2, y: startY, type: "none" },
      { x: startX + length * 3, y: startY, type: "none" },
      { x: startX + length * 4, y: startY, type: "none" },
      { x: startX + length * 5, y: startY, type: "none" },
      { x: startX + length * 6, y: startY, type: "none" },
      { x: startX + length * 7, y: startY, type: "none" },
      { x: startX + length * 8, y: startY, type: "none" },
    ]
  );
}

module.exports = levelOne;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

const levelTwo = (length, startX = 330, startY = 240) => {
  return(
    [
      { x: startX, y: startY, type: "start" },
      { x: startX + length * 6, y: startY + length * 3, type: "goal" },

      { x: startX - length, y: startY - length, type: "none" },
      { x: startX - length, y: startY, type: "none" },
      { x: startX - length, y: startY + length, type: "none" },

      { x: startX, y: startY - length, type: "none" },
      { x: startX, y: startY + length, type: "none" },
      { x: startX, y: startY + length * 2, type: "none" },

      { x: startX + length, y: startY - length, type: "none" },
      { x: startX + length, y: startY, type: "none" },
      { x: startX + length, y: startY + length, type: "none" },
      { x: startX + length, y: startY + length * 2, type: "none" },

      { x: startX + length * 2, y: startY, type: "none" },
      { x: startX + length * 2, y: startY + length, type: "none" },
      { x: startX + length * 2, y: startY + length * 2, type: "none" },

      { x: startX + length * 3, y: startY, type: "none" },
      { x: startX + length * 3, y: startY + length, type: "none" },
      { x: startX + length * 3, y: startY + length * 2, type: "none" },

      { x: startX + length * 4, y: startY, type: "none" },
      { x: startX + length * 4, y: startY + length, type: "none" },
      { x: startX + length * 4, y: startY + length * 2, type: "none" },
      { x: startX + length * 4, y: startY + length * 3, type: "none" },

      { x: startX + length * 5, y: startY + length, type: "none" },
      { x: startX + length * 5, y: startY + length * 2, type: "none" },
      { x: startX + length * 5, y: startY + length * 3, type: "none" },
      { x: startX + length * 5, y: startY + length * 4, type: "none" },

      { x: startX + length * 6, y: startY + length, type: "none" },
      { x: startX + length * 6, y: startY + length * 2, type: "none" },
      { x: startX + length * 6, y: startY + length * 4, type: "none" },

      { x: startX + length * 7, y: startY + length, type: "none" },
      { x: startX + length * 7, y: startY + length * 2, type: "none" },
      { x: startX + length * 7, y: startY + length * 3, type: "none" },
      { x: startX + length * 7, y: startY + length * 4, type: "none" },

      { x: startX + length * 8, y: startY + length * 2, type: "none" },
      { x: startX + length * 8, y: startY + length * 3, type: "none" },
    ]
  );
};

module.exports = levelTwo;


/***/ }),
/* 8 */
/***/ (function(module, exports) {

const levelThree = (length, startX = 210, startY = 280) => {
  return(
    [
      { x: startX, y: startY, type: "start" },
      { x: startX + length * 12, y: startY, type: "goal" },

      { x: startX - length, y: startY + length * 2, type: "none" },
      { x: startX - length, y: startY + length, type: "none" },
      { x: startX - length, y: startY, type: "none" },
      { x: startX - length, y: startY - length, type: "none" },

      { x: startX, y: startY + length * 2, type: "none" },
      { x: startX, y: startY + length, type: "none" },
      { x: startX, y: startY - length, type: "none" },

      { x: startX + length, y: startY + length * 2, type: "none" },
      { x: startX + length, y: startY + length, type: "none" },
      { x: startX + length, y: startY, type: "none" },
      { x: startX + length, y: startY - length, type: "none" },

      { x: startX + length * 2, y: startY + length * 2, type: "none" },
      { x: startX + length * 2, y: startY + length, type: "none" },
      { x: startX + length * 2, y: startY, type: "none" },
      { x: startX + length * 2, y: startY - length, type: "none" },

      { x: startX + length * 3, y: startY + length, type: "none" },

      { x: startX + length * 4, y: startY + length, type: "none" },

      { x: startX + length * 5, y: startY + length * 3, type: "none" },
      { x: startX + length * 5, y: startY + length * 2, type: "none" },
      { x: startX + length * 5, y: startY + length, type: "none" },

      { x: startX + length * 6, y: startY + length * 3, type: "none" },
      { x: startX + length * 6, y: startY + length * 2, type: "none" },
      { x: startX + length * 6, y: startY + length, type: "none" },

      { x: startX + length * 7, y: startY + length * 3, type: "none" },
      { x: startX + length * 7, y: startY + length * 2, type: "none" },
      { x: startX + length * 7, y: startY + length, type: "none" },

      { x: startX + length * 8, y: startY + length * 3, type: "none" },

      { x: startX + length * 9, y: startY + length * 3, type: "none" },

      { x: startX + length * 10, y: startY + length * 3, type: "none" },
      { x: startX + length * 10, y: startY + length * 2, type: "none" },
      { x: startX + length * 10, y: startY + length, type: "none" },
      { x: startX + length * 10, y: startY, type: "none" },
      { x: startX + length * 10, y: startY - length, type: "none" },

      { x: startX + length * 11, y: startY + length * 3, type: "none" },
      { x: startX + length * 11, y: startY + length * 2, type: "none" },
      { x: startX + length * 11, y: startY + length, type: "none" },
      { x: startX + length * 11, y: startY, type: "none" },
      { x: startX + length * 11, y: startY - length, type: "none" },
      { x: startX + length * 11, y: startY - length * 2, type: "none" },

      { x: startX + length * 12, y: startY + length, type: "none" },
      { x: startX + length * 12, y: startY - length, type: "none" },
      { x: startX + length * 12, y: startY - length * 2, type: "none" },

      { x: startX + length * 13, y: startY + length, type: "none" },
      { x: startX + length * 13, y: startY, type: "none" },
      { x: startX + length * 13, y: startY - length, type: "none" },
      { x: startX + length * 13, y: startY - length * 2, type: "none" },
    ]
  );
};

module.exports = levelThree;


/***/ }),
/* 9 */
/***/ (function(module, exports) {

const levelFour = (length, startX = 270, startY = 210) => {
  return(
    [
      { x: startX, y: startY, type: "start" },
      { x: startX + length * 13, y: startY - length, type: "goal" },

      { x: startX + length, y: startY, type: "none" },

      { x: startX + length * 2, y: startY, type: "none" },

      { x: startX + length * 3, y: startY, type: "none" },

      { x: startX + length * 4, y: startY, type: "none" },
      { x: startX + length * 4, y: startY - length, type: "none" },
      { x: startX + length * 4, y: startY - length * 2, type: "none" },

      { x: startX + length * 5, y: startY + length * 3, type: "none" },
      { x: startX + length * 5, y: startY + length * 2, type: "none" },
      { x: startX + length * 5, y: startY + length, type: "none" },
      { x: startX + length * 5, y: startY, type: "none" },
      { x: startX + length * 5, y: startY - length, type: "none" },
      { x: startX + length * 5, y: startY - length * 2, type: "none" },

      { x: startX + length * 6, y: startY + length * 3, type: "none" },
      { x: startX + length * 6, y: startY - length, type: "none" },
      { x: startX + length * 6, y: startY - length * 2, type: "none" },
      { x: startX + length * 6, y: startY - length * 3, type: "none" },
      { x: startX + length * 6, y: startY - length * 4, type: "none" },
      { x: startX + length * 6, y: startY - length * 5, type: "none" },

      { x: startX + length * 7, y: startY + length * 3, type: "none" },
      { x: startX + length * 7, y: startY - length * 4, type: "none" },
      { x: startX + length * 7, y: startY - length * 5, type: "none" },
      { x: startX + length * 7, y: startY - length * 6, type: "none" },

      { x: startX + length * 8, y: startY + length * 3, type: "none" },
      { x: startX + length * 8, y: startY + length * 2, type: "none" },
      { x: startX + length * 8, y: startY + length, type: "none" },
      { x: startX + length * 8, y: startY - length * 4, type: "none" },
      { x: startX + length * 8, y: startY - length * 5, type: "none" },
      { x: startX + length * 8, y: startY - length * 6, type: "none" },

      { x: startX + length * 9, y: startY + length * 3, type: "none" },
      { x: startX + length * 9, y: startY + length * 2, type: "none" },
      { x: startX + length * 9, y: startY + length, type: "none" },
      { x: startX + length * 9, y: startY - length * 3, type: "none" },
      { x: startX + length * 9, y: startY - length * 4, type: "none" },
      { x: startX + length * 9, y: startY - length * 5, type: "none" },
      { x: startX + length * 9, y: startY - length * 6, type: "none" },

      { x: startX + length * 10, y: startY + length * 3, type: "none" },
      { x: startX + length * 10, y: startY + length * 2, type: "none" },
      { x: startX + length * 10, y: startY + length, type: "none" },
      { x: startX + length * 10, y: startY - length * 3, type: "none" },
      { x: startX + length * 10, y: startY - length * 4, type: "none" },
      { x: startX + length * 10, y: startY - length * 5, type: "none" },

      { x: startX + length * 11, y: startY + length, type: "none" },
      { x: startX + length * 11, y: startY, type: "none" },
      { x: startX + length * 11, y: startY - length, type: "none" },

      { x: startX + length * 12, y: startY + length, type: "none" },
      { x: startX + length * 12, y: startY, type: "none" },
      { x: startX + length * 12, y: startY - length, type: "none" },

      { x: startX + length * 13, y: startY, type: "none" },
    ]
  );
};

module.exports = levelFour;


/***/ }),
/* 10 */
/***/ (function(module, exports) {

class Block {
  constructor(options) {
    this.xPos = options.xPos;
    this.yPos = options.yPos;
    this.width = options.width;
    this.height = options.height;
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

  changePosition(dx, dy) {
    this.xPos += dx;
    this.yPos += dy;
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
/* 11 */
/***/ (function(module, exports) {

class Display {
  constructor(ctx, length) {
    this.ctx = ctx;
    this.length = length;
    this.colors = this.colors();
    this.fonts = this.fonts();
    this.ctx.fillStyle = this.colors.backgroundColor;
    this.ctx.fillRect(0, 0, 900, 500);
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
    }
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

  drawClock(time) {
    this.ctx.fillStyle = this.colors.backgroundColor;
    this.ctx.fillRect(200, 450, 900, 50);
    this.ctx.font = this.fonts.mediumFontSize;
    this.ctx.fillStyle = this.colors.textColor;
    this.ctx.fillText(time, 700, 475);
  }

  drawFloor(floor) {
    floor.forEach(tile => {
      this.ctx.fillStyle = this.colors.tileColors[tile.type];
      const { xPos, yPos } = tile;
      this.ctx.fillRect(xPos, yPos, this.length, this.length);
      this.ctx.strokeRect(xPos, yPos, this.length, this.length);
    });
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
/* 12 */
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
/* 13 */
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