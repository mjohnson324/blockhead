const LevelGenerator = require('../level_generator');

const levels = new LevelGenerator(30);

test('Initializes LevelGenerator', () => {
  expect(levels).toBeInstanceOf(LevelGenerator);
});

test('Keeps track of the current level', () => {
  expect(levels.currentLevel).toBe(1);
});
