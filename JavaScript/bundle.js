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
const Display = __webpack_require__(5);

document.addEventListener("DOMContentLoaded", () => {
  const blockheadBoard = document.getElementById("blockhead");
  const ctx = blockheadBoard.getContext("2d");
  blockheadBoard.width = 900;
  blockheadBoard.height = 500;
  
  const game = new Game(ctx);
  new Display(game, ctx).start();
});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Floor = __webpack_require__(2);
const Tutorial = __webpack_require__(4);
const Block = __webpack_require__(6);

class Game {
  constructor(ctx) {
    this.tutorial = Tutorial;
    this.ctx = ctx;
    this.block = new Block(ctx, this.tutorial[0]);
  }

  draw() {
    const ctx = this.ctx;
    const tutorial = this.tutorial;
    const floor = new Floor(tutorial, ctx);
    this.block.draw();
  }
}

module.exports = Game;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Tile = __webpack_require__(3);

class Floor {
  constructor(positions, ctx) {
    this.positions = positions;
    this.ctx = ctx;
    
    this.layTiles();
  }

  layTiles() {
    const ctx = this.ctx;
    this.positions.forEach(pos => {
      const options = { position: pos, isGoal: false, isStart: false };
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
  }

  draw() {
    const { x, y } = this.position;
    const ctx = this.ctx;
    ctx.fillStyle = 'rgb(0, 255, 0)';
    ctx.fillRect(x, y, 30, 30);
    ctx.strokeRect(x, y, 30, 30);
  }
}

module.exports = Tile;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

const tutorial = [
  { x: 375, y: 175 },
  { x: 375, y: 205 },
  { x: 375, y: 235 },
  { x: 375, y: 265 },
  { x: 375, y: 295 },

  { x: 405, y: 175 },
  { x: 405, y: 205 },
  { x: 405, y: 235 },
  { x: 405, y: 265 },
  { x: 405, y: 295 },

  { x: 435, y: 175 },
  { x: 435, y: 205 },
  { x: 435, y: 235 },
  { x: 435, y: 265 },
  { x: 435, y: 295 },

  { x: 465, y: 175 },
  { x: 465, y: 205 },
  { x: 465, y: 235 },
  { x: 465, y: 265 },
  { x: 465, y: 295 },

  { x: 495, y: 175 },
  { x: 495, y: 205 },
  { x: 495, y: 235 },
  { x: 495, y: 265 },
  { x: 495, y: 295 },
];

module.exports = tutorial;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

class Display {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.block = this.game.block;
  }

  handleBlock() {
    document.addEventListener("keydown", (e) => {
      e.preventDefault();
      switch (e.keyCode) {
        case 40:
          this.block.move(0, 30);
          break;
        case 38:
          this.block.move(0, -30);
          break;
        case 37:
          this.block.move(-30, 0);
          break;
        case 39:
          this.block.move(30, 0);
          break;
    }});
  }

  start() {
    this.game.draw();
    // this.animate.bind(this);
    this.handleBlock();
  }
}

module.exports = Display;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

class Block {
  constructor(ctx, startPos) {
    this.position = startPos;
    this.ctx = ctx;
  }

  move(i, j) {
    const { x, y } = this.position;
    this.ctx.clearRect(x, y, 30, 30);
    this.position.x += i;
    this.position.y += j;
    this.draw();
  }

  draw() {
    const { x, y } = this.position;
    this.ctx.fillStyle = 'rgb(75, 0, 130)';
    this.ctx.fillRect(x, y, 30, 30);
    this.ctx.strokeRect(x, y, 30, 30);
  }
}

module.exports = Block;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map