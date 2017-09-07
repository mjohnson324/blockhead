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

  const game = new Game(ctx);
  new Display(game, ctx).start();
});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Floor = __webpack_require__(2);
const tutorial = __webpack_require__(4);

class Game {
  constructor(ctx) {
    this.tutorial = tutorial;
    this.ctx = ctx;
  }

  draw() {
    const ctx = this.ctx;
    const floor = new Floor(tutorial, ctx);
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
    ctx.fillRect(x, y, 20, 20);
    ctx.strokeRect(x, y, 20, 20);
  }
}

module.exports = Tile;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

const tutorial = [
  { x: 500, y: 200 },
  { x: 500, y: 220 },
  { x: 500, y: 240 },
  { x: 500, y: 260 },
  { x: 500, y: 280 },

  { x: 520, y: 200 },
  { x: 520, y: 220 },
  { x: 520, y: 240 },
  { x: 520, y: 260 },
  { x: 520, y: 280 },

  { x: 540, y: 200 },
  { x: 540, y: 220 },
  { x: 540, y: 240 },
  { x: 540, y: 260 },
  { x: 540, y: 280 },

  { x: 560, y: 200 },
  { x: 560, y: 220 },
  { x: 560, y: 240 },
  { x: 560, y: 260 },
  { x: 560, y: 280 },

  { x: 580, y: 200 },
  { x: 580, y: 220 },
  { x: 580, y: 240 },
  { x: 580, y: 260 },
  { x: 580, y: 280 },
];

module.exports = tutorial;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

class Display {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
  }

  start() {
    this.game.draw();
  }
}

module.exports = Display;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map