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

document.addEventListener("DOMContentLoaded", () => {
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
const Block = __webpack_require__(8);
const Display = __webpack_require__(9);

class Game {
  constructor(ctx, length) {
    this.display = new Display(ctx, length);
    this.length = length;
    this.levels = LevelGenerator(length);
    this.levelNumber = 0;
  }

  start() {
    this.currentLevel = this.levels[this.levelNumber];
    this.goal = this.currentLevel[1];
    document.addEventListener("keydown", this.moveBlock.bind(this), true);
    const { x, y } = this.currentLevel[0];
    this.constructBlock(x, y);
    this.display.render(this.currentLevel, this.block);
  }

  constructBlock(x, y) {
    const blockOptions = { xPos: x,
                           yPos: y,
                           width: this.length,
                           height: this.length };
    this.block = new Block(blockOptions);
  }

  getMove(e) {
    switch (e.keyCode) {
      case 40:
        e.preventDefault();
        return this.moveBlock("down");
      case 38:
        e.preventDefault();
        return this.moveBlock("up");
      case 37:
        e.preventDefault();
        return this.moveBlock("left");
      case 39:
        e.preventDefault();
        this.moveBlock("right");
    }
  }

  moveBlock(direction) {
    switch(direction) {
      case "down":
        this.block.transform(0, this.length * -1);
        break;
      case "up":
        this.block.transform(0, this.length);
        break;
      case "left":
        this.block.transform(this.length * -1, 0);
        break;
      case "right":
        this.block.transform(this.length, 0);
    }
    this.checkBlock();
  }

  checkBlock() {
    if (this.block.width === this.block.height) {
      this.checkGoal();
    }
    this.checkBounds();
  }

  checkGoal() {
    const xGoal = this.goal.x;
    const yGoal = this.goal.y;
    const { xPos, yPos } = this.block;
    if (xPos === xGoal && yPos === yGoal) {
      this.nextLevel();
    }
  }

  nextLevel() {
    this.levelNumber += 1;
    this.currentLevel = this.levels[this.levelNumber];
    if (this.currentLevel === undefined) {
      return this.endGame();
    }
    this.goal = this.currentLevel[1];
    const { x, y } = this.currentLevel[0];
    this.constructBlock(x, y);
    this.display.render(this.currentLevel, this.block);
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
      this.resetBlock();
    }
    this.display.render(this.currentLevel, this.block);
    this.display.drawFail(oldOptions);
  }

  resetBlock() {
    const { x, y } = this.currentLevel[0];
    this.constructBlock(x, y);
  }
}

module.exports = Game;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Tile = __webpack_require__(3);

const Tutorial = __webpack_require__(4);
const LevelOne = __webpack_require__(5);
const LevelTwo = __webpack_require__(6);
const LevelThree = __webpack_require__(7);


const levelGenerator = (length) => {
  const levels = [Tutorial(length),
                     LevelOne(length),
                     LevelTwo(length),
                     LevelThree(length)];
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
    this.color = this.typeCheck();
  }

  statusCheck() {
    if (this.type === "start") {
      return 'rgb(0, 255, 255)';
    } else if (this.type === "goal") {
      return 'rgb(0, 255, 0)';
    } else if (this.type === "none") {
      return 'rgb(192, 192, 192)';
    }
  }
}

module.exports = Tile;


/***/ }),
/* 4 */
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
/* 5 */
/***/ (function(module, exports) {

const levelOne = (length, startX = 330, startY = 240) => {
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

module.exports = levelOne;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

const levelTwo = (length, startX = 210, startY = 280) => {
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

module.exports = levelTwo;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

const levelThree = (length, startX = 270, startY = 210) => {
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

module.exports = levelThree;


/***/ }),
/* 8 */
/***/ (function(module, exports) {

class Block {
  constructor(options) {
    this.xPos = options.xPos;
    this.yPos = options.yPos;
    this.width = options.width;
    this.height = options.height;
  }

  position(dx, dy) {
    this.xPos += dx;
    this.yPos += dy;
  }

  transform(x, y) {
    if (this.width === this.height) {
      this.expand(x, y);
    } else {
      this.checkDimensionsAndMovement(x, y);
    }
  }

  expand(x, y) {
    if (x !== 0) {
      this.expandWidth(x, y);
    } else {
      this.expandHeight(x, y);
    }
  }

  checkDimensionsAndMovement(x, y) {
    if (this.width > this.height && x !== 0) {
      this.contractWidth(x, y);
    } else if (this.width < this.height && y !== 0) {
      this.contractHeight(x, y);
    } else {
      this.position(x, y);
    }
  }

  expandWidth(x, y) {
    this.width *= 2;
    if (x > 0) {
      this.position(x, y);
    } else {
      this.position(2 * x, y);
    }
  }

  expandHeight(x, y) {
    this.height *= 2;
    if (y > 0) {
      this.position(x, y);
    } else {
      this.position(x, 2 * y);
    }
  }

  contractWidth(x, y) {
    this.width /= 2;
    if (x > 0) {
      this.position(2 * x, y);
    } else {
      this.position(x, y);
    }
  }

  contractHeight(x, y) {
    this.height /= 2;
    if (y > 0) {
      this.position(x, y * 2);
    } else {
      this.position(x, y);
    }
  }
}

module.exports = Block;


/***/ }),
/* 9 */
/***/ (function(module, exports) {

class Display {
  constructor(ctx, length) {
    this.ctx = ctx;
    this.length = length;
    const backgroundRGB = [25, 25, 25];
    this.backgroundColor = this.stringifyRGB(backgroundRGB);
  }

  stringifyRGB(colorArray) {
    return(
      'rgb('
      .concat(colorArray[0])
      .concat(', ')
      .concat(colorArray[1])
      .concat(', ')
      .concat(colorArray[2])
      .concat(')')
    );
  }

  render(floor, block) {
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fillRect(0, 0, 900, 500);
    this.ctx.font = '30px sans-serif';
    this.ctx.fillStyle = 'white';
    this.ctx.fillText(`Level ${this.levelNumber}`, 25, 50);
    this.drawFloor(floor);
    this.drawBlock(block);
  }

  drawFloor(floor) {
    floor.forEach(tile => {
      this.ctx.fillStyle = tile.color;
      const { xPos, yPos } = tile;
      this.ctx.fillRect(xPos, yPos, this.length, this.length);
      this.ctx.strokeRect(xPos, yPos, this.length, this.length);
    });
  }

  drawBlock(block) {
    const { xPos, yPos, width, height } = block;
    this.ctx.fillStyle = 'rgb(200, 0, 255)';
    this.ctx.fillRect(xPos, yPos, width, height);
    this.ctx.strokeRect(xPos, yPos, width, height);
  }

  tileMovesOffFloor(coordinates) {
    for(let i = 0; i < coordinates,length; i++) {
      let corner = coordinates[i];
      let point = this.ctx.getImageData(corner[0], corner[1], 1, 1);
      let colorData = point.data.slice(0, 3);
      let color = this.stringifyRGB(colorData);
      if (color === this.backgroundColor) {
        return true;
      }
    }
    return false;
  }

  drawFail(oldOptions) {
    const { xPos, yPos, width, height } = oldOptions;
    this.ctx.fillStyle = 'rgb(255, 0, 0)';
    this.ctx.fillRect(xPos, yPos, width, height);
  }

  drawFinish() {
    this.ctx.clearRect(0, 0, 900, 500);
    this.ctx.font = '20px sans-serif';
    this.ctx.fillText(
      "Thanks for playing! More levels coming soon! (probably)",
      50,
      300);
  }
}

module.exports = Display;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map