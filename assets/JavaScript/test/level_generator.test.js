const LevelGenerator = require('../level_generator');
const levels = require('../levels/all_levels');

const levels = new LevelGenerator(30, levels);

test('LevelGenerator keeps track of the current level', () => {
  expect(levels.currentLevel).toBe(1);
});

test('LevelGenerator progresses to the next level', () => {
  levels.nextLevel();
  expect(levels.currentLevel).toBe(2);
});
