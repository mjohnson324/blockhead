/* global test describe expect */

const LevelGenerator = require("../game_objects/level_generator");
const Tile = require("../game_objects/tile");

const levels = {
    1: {
        floorDimensions: { xRange: 1, yRange: 3 },
        floorData: [
            { x: 0, y: 0, type: "s" },
            { x: 0, y: 2, type: "g" },
            { x: 0, y: 1, type: "n" },
        ]
    },
    2: {
        floorDimensions: { xRange: 3, yRange: 2 },
        floorData: [
            { x: 0, y: 0, type: "s" },
            { x: 2, y: 1, type: "g" },
            { x: 1, y: 0, type: "n" },
            { x: 1, y: 1, type: "n" },
        ]
    },
};
const levelMaker = new LevelGenerator(30, levels);

describe("Floor construction and helper functions", () => {
    test("LevelGenerator keeps track of the current level", () => {
        expect(levelMaker.currentLevel).toBe(1);
    });

    test("Dynamically create data for tiles", () => {
        const start = { xPos: 100, yPos: 100 };
        const tileInfo = { x: 3, y: 5, type: "n" };
        const tileOptions = levelMaker.constructTileCoordinates(tileInfo, start);
        expect(tileOptions).toEqual({ x: 190, y: 250, type: "n" });
    });

    test("Dynamically center floors", () => {
        const dimensions = { xRange: 15, yRange: 15 };
        const start = levelMaker.centerFloor(dimensions);
        expect(start).toEqual({ xPos: 225, yPos: 25 });
    });

    test("Set up a floor of tiles for gameplay", () => {
        const newLevel = {
            "[435, 205]": new Tile({ x: 435, y: 205, type: "s" }),
            "[435, 265]": new Tile({ x: 435, y: 265, type: "g" }),
            "[435, 235]": new Tile({ x: 435, y: 235, type: "n" }),
        };
        levelMaker.constructFloor();
        expect(levelMaker.constructedFloor).toEqual(newLevel);
    });

    test("Start tile for constructed floor can be looked up instantly", () => {
        const testPosition = { xPos: 435, yPos: 205 };
        levelMaker.constructFloor();
        expect(levelMaker.currentStartPosition).toEqual(testPosition);
    });

    test("Tiles can be looked up individually", () => {
        levelMaker.constructFloor();
        const comparisonTile = new Tile({ x: 435, y: 235, type: "n" });
        const actualTile = levelMaker.lookupTile({ xPos: 435, yPos: 235 });
        expect(actualTile).toEqual(comparisonTile);
    });
});

describe("Floor construction as game progresses", () => {
    test("LevelGenerator progresses to the next level", () => {
        levelMaker.nextLevel();
        expect(levelMaker.currentLevel).toBe(2);
    });

    test("LevelGenerator constructs the right floor after progressing", () => {
        const testFloor = {
            "[405, 220]": new Tile({ x: 405, y: 220, type: "s" }),
            "[465, 250]": new Tile({ x: 465, y: 250, type: "g" }),
            "[435, 220]": new Tile({ x: 435, y: 220, type: "n" }),
            "[435, 250]": new Tile({ x: 435, y: 250, type: "n" }),
        };
        levelMaker.constructFloor();
        expect(levelMaker.constructedFloor).toEqual(testFloor);
    });
});
