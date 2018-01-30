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

  centerFloor() {

  }

  setCoordinates() {

  }

  constructTileCoordinates() {

  }

  lookupTile() {

  }
}

module.exports = LevelGenerator;
