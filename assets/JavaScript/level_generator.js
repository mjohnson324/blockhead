const Tile = require('./tile');

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
