const Block = require('../block');

test('block initializes with options', () => {
  expect(new Block({})).toBeInstanceOf(Block);
});
