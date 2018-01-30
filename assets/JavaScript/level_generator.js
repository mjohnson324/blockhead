const Tile = require('./tile');

class LevelGenerator {
  constructor(length, levels) {
    this.currentLevel = 1;
    this.length = length;
    this.levelData = levels;
  }

  nextLevel() {
    this.currentLevel += 1;
  }

  generateLevel() {
    const level = this.levelData[this.currentLevel];
    this.centerFloor(level.floorDimensions);
  }

  centerFloor(floorDimensions) {
    const canvasWidth = 900;
    const canvasHeight = 500;
    const floorWidth = floorDimensions.xRange * this.length;
    const floorHeight = floorDimensions.yRange * this.length;
    const startCornerXPos = Math.floor((canvasWidth - floorWidth) / 2);
    const startCornerYPos = Math.floor((canvasHeight - floorHeight) / 2);
    return { xPos: startCornerXPos, yPos: startCornerYPos };
  }

  setCoordinates() {

  }

  constructTileCoordinates() {

  }

  lookupTile() {

  }
}

module.exports = LevelGenerator;
