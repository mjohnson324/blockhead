const Tile = require('./tile');

class LevelGenerator {
  constructor(length, levels) {
    this.currentLevel = 1;
    this.length = length;
    this.levelData = levels;
    this.constructedFloor = this.generateLevel();
  }

  nextLevel() {
    this.currentLevel += 1;
  }

  generateLevel() {
    const level = this.levelData[this.currentLevel];
    const startPosition = this.centerFloor(level.floorDimensions);
    return setCoordinates(level.tileData, startPosition);
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

  setCoordinates() {

  }

  constructTileCoordinates() {

  }

  lookupTile() {

  }
}

module.exports = LevelGenerator;
