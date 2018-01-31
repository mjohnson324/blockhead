const LevelGenerator = require('../level_generator');
const Tile = require('../tile');

const levels = {
  1: {
    floorDimensions: { xRange: 1, yRange: 3 },
    floorData: [
      { x: 0, y: 0, type: "start" },
      { x: 0, y: 2, type: "goal" },
      { x: 0, y: 1, type: "none" },
    ]
  },
  2: {
    floorDimensions: { xRange: 3, yRange: 2 },
    floorData: [
      { x: 0, y: 0, type: "start" },
      { x: 2, y: 1, type: "goal" },
      { x: 1, y: 0, type: "none" },
      { x: 1, y: 1, type: "none" },
    ]
  },
};
const levelMaker = new LevelGenerator(30, levels);

test('LevelGenerator keeps track of the current level', () => {
  expect(levelMaker.currentLevel).toBe(1);
});

test('Dynamically create data for tiles', () => {
  const start = { xPos: 100, yPos: 100 };
  const tileInfo = { x: 3, y: 5, type: "none" };
  const tileOptions = levelMaker.constructTileCoordinates(tileInfo, start);
  expect(tileOptions).toEqual({ x: 190, y: 250, type: "none" });
});

test('Dynamically center floors', () => {
  const dimensions = { xRange: 15, yRange: 15 };
  const start = levelMaker.centerFloor(dimensions);
  expect(start).toEqual({ xPos: 225, yPos: 25 });
});

test('Set up a floor of tiles for gameplay', () => {
  const newLevel = {
    '[435, 205]': new Tile({ x: 435, y: 205, type: "start" }),
    '[435, 265]': new Tile({ x: 435, y: 265, type: "goal" }),
    '[435, 235]': new Tile({ x: 435, y: 235, type: "none" }),
  };
  levelMaker.constructFloor();
  expect(levelMaker.constructedFloor).toEqual(newLevel)
});

test('Tiles can be looked up individually', () => {
  levelMaker.constructFloor();
  const comparisonTile = new Tile({ x: 435, y: 235, type: "none" });
  const actualTile = levelMaker.lookupTile({ xPos: 435, yPos: 235 });
  expect(actualTile).toEqual(comparisonTile);
});

test('LevelGenerator progresses to the next level', () => {
  levelMaker.nextLevel();
  expect(levelMaker.currentLevel).toBe(2);
});
