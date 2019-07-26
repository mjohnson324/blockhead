const Tile = require("./tile");
const allLevels = require("../levels/all_levels");

class LevelGenerator {
    constructor() {
        this.currentLevel = 1;
        this.levelData = allLevels;
        this.constructedFloor = null;
        this.currentStartPosition = null;

        this.constructTileCoordinates = this.constructTileCoordinates.bind(this);
    }

    nextLevel() {
        this.currentLevel += 1;
    }

    resetCurrentLevel() {
        this.currentLevel = 1;
    }

    constructFloor(length, boardSize) {
        this.constructedFloor = this.generateLevel(length, boardSize);
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

    generateLevel(length, boardSize) {
        const level = this.levelData[this.currentLevel];
        const startPosition = this.centerFloor(level.floorDimensions, length, boardSize);
        return this.setCoordinates(level.floorData, startPosition, length);
    }

    // Tiles are positioned relative to the position of the top-left tile on a floor.
    centerFloor(floorDimensions, length, boardSize) {
        const {width, height } = boardSize;
        const floorWidth = floorDimensions.xRange * length;
        const floorHeight = floorDimensions.yRange * length;
        const startCornerXPos = Math.floor((width - floorWidth) / 2);
        const startCornerYPos = Math.floor((height - floorHeight) / 2);
        return { xPos: startCornerXPos, yPos: startCornerYPos };
    }

    setCoordinates(floorData, startPosition, length) {
        const newFloor = {};
        floorData.forEach(tileData => {
            let tileOptions = this.constructTileCoordinates(tileData, startPosition, length);
            let tile = new Tile(tileOptions);
            let tilePosition = `[${tile.xPos}, ${tile.yPos}]`;
            newFloor[tilePosition] = tile;
        });
        return newFloor;
    }

    constructTileCoordinates(tileData, startPosition, length) {
        const x = startPosition.xPos + length * tileData.x;
        const y = startPosition.yPos + length * tileData.y;
        let relations = null;
        if (tileData.relations !== undefined) {
            relations = [];
            tileData.relations.forEach(relation => {
                let xPos = startPosition.xPos + length * relation[0];
                let yPos = startPosition.yPos + length * relation[1];
                relations.push({ xPos, yPos });
            });
        }
        return { x: x, y: y, type: tileData.type, active: tileData.active, relations };
    }

    lookupTile(position) {
        const currentPosition = `[${position.xPos}, ${position.yPos}]`;
        return this.constructedFloor[currentPosition];
    }
}

module.exports = LevelGenerator;
