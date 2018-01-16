const LevelGenerator = require('../level_generator');

const levels = LevelGenerator(30);

test('Initializes LevelGenerator', () => {
  expect(levels).toBeInstanceOf(LevelGenerator);
});
