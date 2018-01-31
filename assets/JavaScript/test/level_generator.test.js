const LevelGenerator = require('../level_generator');

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
  expect(tileOptions).toEqual({ xPos: 190, yPos: 250, type: "none" });
});

test('LevelGenerator progresses to the next level', () => {
  levelMaker.nextLevel();
  expect(levelMaker.currentLevel).toBe(2);
});
