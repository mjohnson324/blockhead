const Block = require('../block');

let block;

beforeEach(() => {
  block = new Block({ xPos : 0, yPos: 0, width: 30, height: 30 });
})

test('block initializes with options', () => {
  expect(block).toBeInstanceOf(Block);
});

test('block changes position incrementally', () => {
  block.changePosition(30, 30);
  expect(block.xPos).toBe(30);
  expect(block.yPos).toBe(30);
});
