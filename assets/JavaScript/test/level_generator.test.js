const LevelGenerator = require('../level_generator');

const levels = {
  1: {
    floorDimensions: { xRange: , yRange: },
    floorData: [
      { x: 0, y: 0, type: "start" },
      { x: 0, y: 2, type: "goal" },
      { x: 0, y: 1, type: "none" },
    ]
  },
  2: {
    floorDimensions: { xRange: , yRange: },
    floorData: [
      { x: 0, y: 0, type: "start" },
      { x: 2, y: 1, type: "goal" },
      { x: 1, y: 0, type: "none" },
      { x: 1, y: 1, type: "none" },
    ]
  },
};
const levels = new LevelGenerator(30, levels);

test('LevelGenerator keeps track of the current level', () => {
  expect(levels.currentLevel).toBe(1);
});

test('LevelGenerator progresses to the next level', () => {
  levels.nextLevel();
  expect(levels.currentLevel).toBe(2);
});
