const Block = require('../block');

let block;

beforeEach(() => {
  block = new Block({ xPos : 0, yPos: 0, width: 30, height: 30 });
})

test('block initializes with options', () => {
  expect(block).toBeInstanceOf(Block);
});
