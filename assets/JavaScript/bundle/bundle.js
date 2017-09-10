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
const Display = __webpack_require__(10);

document.addEventListener("DOMContentLoaded", () => {
  const blockheadBoard = document.getElementById("blockhead");
  const ctx = blockheadBoard.getContext("2d");
  blockheadBoard.width = 900;
  blockheadBoard.height = 500;

  const game = new Game(ctx, 30);
  new Display(game, ctx).start();
});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Floor = __webpack_require__(2);
const Levels = __webpack_require__(4);
const Block = __webpack_require__(9);

class Game {
  constructor(ctx, tileSize) {
    this.levels = Levels(tileSize);
    this.currentLevel = this.levels[0];
    this.ctx = ctx;
    this.blockStart = Object.assign({}, this.currentLevel[0]);
    this.block = new Block(ctx, this.blockStart, tileSize);
    this.floor = new Floor(this.currentLevel, ctx, tileSize);
    this.tileSize = tileSize;
  }

  handleBoard() {
    const step = this.tileSize;
    document.addEventListener("keydown", (e) => {
      e.preventDefault();
      switch (e.keyCode) {
        case 40:
          this.move(0, step);
          break;
        case 38:
          this.move(0, -1 * step);
          break;
        case 37:
          this.move(-1 * step, 0);
          break;
        case 39:
          this.move(step, 0);
          break;
    }});
  }

  resetBlock() {
    this.ctx.clearRect(0 , 0, 900, 500);
    this.block = new Block(this.ctx, this.blockStart, this.tileSize);
    this.draw();
  }

  checkBlock() {

  }

  move(x, y) {
    this.ctx.fillStyle = 'rgb(0, 0, 0)';
    this.ctx.fillRect(0, 0, 900, 500);
    this.floor.layTiles();
    this.block.move(x, y);
    this.checkBlock();
    this.block.draw();
  }

  draw() {
    this.floor.layTiles();
    this.block.draw();
  }
}

module.exports = Game;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Tile = __webpack_require__(3);

class Floor {
  constructor(positions, ctx, tileSize) {
    this.positions = positions;
    this.ctx = ctx;
    this.tileSize = tileSize;
  }

  layTiles() {
    const ctx = this.ctx;
    this.positions.forEach(pos => {
      const options = {
        size: this.tileSize,
        position: { x: pos.x, y: pos.y },
        isGoal: pos.isGoal,
        isStart: pos.isStart
      };
      const tile = new Tile(ctx, options);
      tile.draw();
    });
  }
}

module.exports = Floor;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

class Tile {
  constructor(ctx, options) {
    this.ctx = ctx;
    this.position = options.position;
    this.isGoal = options.isGoal;
    this.isStart = options.isStart;
    this.size = options.size;
  }

  draw() {
    const { x, y } = this.position;
    const ctx = this.ctx;
    const size = this.size;
    ctx.fillStyle = this.statusCheck();
    ctx.fillRect(x, y, size, size);
    ctx.strokeRect(x, y, size, size);
  }

  statusCheck() {
    if (this.isStart) {
      return 'rgb(255, 0, 0)';
    } else if (this.isGoal) {
      return 'rgb(0, 255, 0)';
    } else {
      return 'rgb(192, 192, 192)';
    }
  }
}

module.exports = Tile;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Tutorial = __webpack_require__(5);
const LevelOne = __webpack_require__(6);
const LevelTwo = __webpack_require__(7);
const LevelThree = __webpack_require__(8);

const levels = (tileSize) => {
  return(
    [
      Tutorial(tileSize, 360, 180),
      LevelOne(tileSize, 330, 240),
      LevelTwo(tileSize, 270, 210),
      LevelThree(tileSize, 210, 280)
    ]);
};

module.exports = levels;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

const tutorial = (size, startX, startY) => {
  return(
    [
    { x: startX, y: startY, isStart: true },
    { x: startX, y: startY + size },
    { x: startX, y: startY + size * 2 },
    { x: startX, y: startY + size * 3 },
    { x: startX, y: startY + size * 4 },

    { x: startX + size, y: startY },
    { x: startX + size, y: startY + size },
    { x: startX + size, y: startY + size * 2 },
    { x: startX + size, y: startY + size * 3 },
    { x: startX + size, y: startY + size * 4 },

    { x: startX + size * 2, y: startY },
    { x: startX + size * 2, y: startY + size },
    { x: startX + size * 2, y: startY + size * 2, isGoal: true },
    { x: startX + size * 2, y: startY + size * 3 },
    { x: startX + size * 2, y: startY + size * 4 },

    { x: startX + size * 3, y: startY },
    { x: startX + size * 3, y: startY + size },
    { x: startX + size * 3, y: startY + size * 2 },
    { x: startX + size * 3, y: startY + size * 3 },
    { x: startX + size * 3, y: startY + size * 4 },

    { x: startX + size * 4, y: startY },
    { x: startX + size * 4, y: startY + size },
    { x: startX + size * 4, y: startY + size * 2 },
    { x: startX + size * 4, y: startY + size * 3 },
    { x: startX + size * 4, y: startY + size * 4 },
  ]);
};


module.exports = tutorial;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

const levelOne = (size, startX, startY) => {
  return(
    [
      { x: startX, y: startY, isStart: true },

      { x: startX - size, y: startY - size },
      { x: startX - size, y: startY },
      { x: startX - size, y: startY + size },

      { x: startX, y: startY - size },
      { x: startX, y: startY + size },
      { x: startX, y: startY + size * 2 },

      { x: startX + size, y: startY - size },
      { x: startX + size, y: startY },
      { x: startX + size, y: startY + size },
      { x: startX + size, y: startY + size * 2 },

      { x: startX + size * 2, y: startY },
      { x: startX + size * 2, y: startY + size },
      { x: startX + size * 2, y: startY + size * 2 },

      { x: startX + size * 3, y: startY },
      { x: startX + size * 3, y: startY + size },
      { x: startX + size * 3, y: startY + size * 2 },

      { x: startX + size * 4, y: startY },
      { x: startX + size * 4, y: startY + size },
      { x: startX + size * 4, y: startY + size * 2 },
      { x: startX + size * 4, y: startY + size * 3 },

      { x: startX + size * 5, y: startY + size },
      { x: startX + size * 5, y: startY + size * 2 },
      { x: startX + size * 5, y: startY + size * 3 },
      { x: startX + size * 5, y: startY + size * 4 },

      { x: startX + size * 6, y: startY + size },
      { x: startX + size * 6, y: startY + size * 2 },
      { x: startX + size * 6, y: startY + size * 3, isGoal: true },
      { x: startX + size * 6, y: startY + size * 4 },

      { x: startX + size * 7, y: startY + size },
      { x: startX + size * 7, y: startY + size * 2 },
      { x: startX + size * 7, y: startY + size * 3 },
      { x: startX + size * 7, y: startY + size * 4 },

      { x: startX + size * 8, y: startY + size * 2 },
      { x: startX + size * 8, y: startY + size * 3 },
    ]
  );
};

module.exports = levelOne;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

const levelTwo = (size, startX, startY) => {
  return(
    [
      { x: startX, y: startY, isStart: true },

      { x: startX - size, y: startY + size * 2 },
      { x: startX - size, y: startY + size },
      { x: startX - size, y: startY },
      { x: startX - size, y: startY - size },

      { x: startX, y: startY + size * 2 },
      { x: startX, y: startY + size },
      { x: startX, y: startY - size },

      { x: startX + size, y: startY + size * 2 },
      { x: startX + size, y: startY + size },
      { x: startX + size, y: startY },
      { x: startX + size, y: startY - size },

      { x: startX + size * 2, y: startY + size * 2 },
      { x: startX + size * 2, y: startY + size },
      { x: startX + size * 2, y: startY },
      { x: startX + size * 2, y: startY - size },

      { x: startX + size * 3, y: startY + size },

      { x: startX + size * 4, y: startY + size },

      { x: startX + size * 5, y: startY + size * 3 },
      { x: startX + size * 5, y: startY + size * 2 },
      { x: startX + size * 5, y: startY + size },

      { x: startX + size * 6, y: startY + size * 3 },
      { x: startX + size * 6, y: startY + size * 2 },
      { x: startX + size * 6, y: startY + size },

      { x: startX + size * 7, y: startY + size * 3 },
      { x: startX + size * 7, y: startY + size * 2 },
      { x: startX + size * 7, y: startY + size },

      { x: startX + size * 8, y: startY + size * 3 },

      { x: startX + size * 9, y: startY + size * 3 },

      { x: startX + size * 10, y: startY + size * 3 },
      { x: startX + size * 10, y: startY + size * 2 },
      { x: startX + size * 10, y: startY + size },
      { x: startX + size * 10, y: startY },
      { x: startX + size * 10, y: startY - size },

      { x: startX + size * 11, y: startY + size * 3 },
      { x: startX + size * 11, y: startY + size * 2 },
      { x: startX + size * 11, y: startY + size },
      { x: startX + size * 11, y: startY },
      { x: startX + size * 11, y: startY - size },
      { x: startX + size * 11, y: startY - size * 2 },

      { x: startX + size * 12, y: startY + size },
      { x: startX + size * 12, y: startY, isGoal: true },
      { x: startX + size * 12, y: startY - size },
      { x: startX + size * 12, y: startY - size * 2 },

      { x: startX + size * 13, y: startY + size },
      { x: startX + size * 13, y: startY },
      { x: startX + size * 13, y: startY - size },
      { x: startX + size * 13, y: startY - size * 2 },
    ]
  );
};

module.exports = levelTwo;


/***/ }),
/* 8 */
/***/ (function(module, exports) {

const levelThree = (size, startX, startY) => {
  return(
    [
      { x: startX, y: startY, isStart: true },

      { x: startX + size, y: startY },

      { x: startX + size * 2, y: startY },

      { x: startX + size * 3, y: startY },

      { x: startX + size * 4, y: startY },
      { x: startX + size * 4, y: startY - size },
      { x: startX + size * 4, y: startY - size * 2 },

      { x: startX + size * 5, y: startY + size * 3 },
      { x: startX + size * 5, y: startY + size * 2 },
      { x: startX + size * 5, y: startY + size },
      { x: startX + size * 5, y: startY },
      { x: startX + size * 5, y: startY - size },
      { x: startX + size * 5, y: startY - size * 2 },

      { x: startX + size * 6, y: startY + size * 3 },
      { x: startX + size * 6, y: startY - size },
      { x: startX + size * 6, y: startY - size * 2 },
      { x: startX + size * 6, y: startY - size * 3 },
      { x: startX + size * 6, y: startY - size * 4 },
      { x: startX + size * 6, y: startY - size * 5 },

      { x: startX + size * 7, y: startY + size * 3 },
      { x: startX + size * 7, y: startY - size * 4 },
      { x: startX + size * 7, y: startY - size * 5 },
      { x: startX + size * 7, y: startY - size * 6 },

      { x: startX + size * 8, y: startY + size * 3 },
      { x: startX + size * 8, y: startY + size * 2 },
      { x: startX + size * 8, y: startY + size },
      { x: startX + size * 8, y: startY - size * 4 },
      { x: startX + size * 8, y: startY - size * 5 },
      { x: startX + size * 8, y: startY - size * 6 },

      { x: startX + size * 9, y: startY + size * 3 },
      { x: startX + size * 9, y: startY + size * 2 },
      { x: startX + size * 9, y: startY + size },
      { x: startX + size * 9, y: startY - size * 3 },
      { x: startX + size * 9, y: startY - size * 4 },
      { x: startX + size * 9, y: startY - size * 5 },
      { x: startX + size * 9, y: startY - size * 6 },

      { x: startX + size * 10, y: startY + size * 3 },
      { x: startX + size * 10, y: startY + size * 2 },
      { x: startX + size * 10, y: startY + size },
      { x: startX + size * 10, y: startY - size * 3 },
      { x: startX + size * 10, y: startY - size * 4 },
      { x: startX + size * 10, y: startY - size * 5 },

      { x: startX + size * 11, y: startY + size },
      { x: startX + size * 11, y: startY },
      { x: startX + size * 11, y: startY - size },

      { x: startX + size * 12, y: startY + size },
      { x: startX + size * 12, y: startY },
      { x: startX + size * 12, y: startY - size },
      { x: startX + size * 12, y: startY - size * 2 },

      { x: startX + size * 13, y: startY },
      { x: startX + size * 13, y: startY - size, isGoal: true },
      { x: startX + size * 13, y: startY  - size * 2 },

      { x: startX + size * 14, y: startY },
      { x: startX + size * 14, y: startY - size },
      { x: startX + size * 14, y: startY - size * 2 },
    ]
  );
};

module.exports = levelThree;


/***/ }),
/* 9 */
/***/ (function(module, exports) {

class Block {
  constructor(ctx, startPos, tileSize) {
    this.position = startPos;
    this.ctx = ctx;
    this.tileSize = tileSize;
    this.dimensions = { width: tileSize, height: tileSize };
  }

  move(i, j) {
    const { dx, dy } = this.checkStanding(i, j);
    this.position.x += dx;
    this.position.y += dy;
  }

  checkStanding(i, j) {
    if (this.dimensions.width === this.dimensions.height) {
      if (i > 0) {
        this.dimensions.width = this.tileSize * 2;
        return { dx: i, dy: j };
      } else if ( i < 0) {
        this.dimensions.width = this.tileSize * 2;
        return { dx: 2 * i, dy: j };
      } else if (j > 0) {
        this.dimensions.height = this.tileSize * 2;
        return { dx: i, dy: j };
      } else {
        this.dimensions.height = this.tileSize * 2;
        return { dx: i, dy: 2 * j };
      }
    } else if (this.dimensions.width > this.dimensions.height) {
      if (i > 0) {
        this.dimensions.width = this.tileSize;
        return { dx: 2 * i, dy: j };
      } else if ( i < 0) {
        this.dimensions.width = this.tileSize;
        return { dx: i, dy: j };
      } else {
        return { dx: i, dy: j };
      }
    } else {
      if (j > 0) {
        this.dimensions.height = this.tileSize;
        return { dx: i, dy: 2 * j };
      } else if (j < 0) {
        this.dimensions.height = this.tileSize;
        return { dx: i, dy: j };
      } else {
        return { dx: i, dy: j };
      }
    }
  }

  draw() {
    const { x, y } = this.position;
    const { width, height } = this.dimensions;
    this.ctx.fillStyle = 'rgb(200, 0, 255)';
    this.ctx.fillRect(x, y, width, height);
    this.ctx.strokeRect(x, y, width, height);
  }
}

module.exports = Block;


/***/ }),
/* 10 */
/***/ (function(module, exports) {

class Display {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
  }

  start() {
    this.game.draw();
    this.game.handleBoard();
  }
}

module.exports = Display;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map