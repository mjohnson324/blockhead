const Block = require('../block');


describe('Square blocks becoming rectangular', () => {
  let block;
  beforeEach(() => {
    block = new Block({ xPos: 0, yPos: 0, width: 30, height: 30 });
  });

  test('block changes position incrementally', () => {
    block.changePosition(30, 30);
    expect(block.xPos).toBe(30);
    expect(block.yPos).toBe(30);
  });

  test('Square block transforms right correctly', () => {

  });

  test('Square block transforms left correctly', () => {

  });

  test('Square block transforms up correctly', () => {

  });

  test('Square block transforms down correctly', () => {

  });
})

describe('Wide rectangular blocks', () => {
  let wideBlock;
  beforeEach(() => {
    wideBlock = new Block({xPos: 0, yPos: 0, width: 60, height: 30 });
  });

  test('Wide block retains shape when moving up and down', () => {

  });

  test('Wide block transforms correctly when contracting right', () => {

  });

  test('Wide block transforms correctly when contracting left', () => {

  });
})

describe('Tall rectangular blocks', () => {
  let tallBlock;
  beforeEach(() => {
    tallBlock = new Block({xPos: 0, yPos: 0, width: 60, height: 30 });
  });

  test('Tall block retains shape when moving left and right', () => {

  });

  test('Tall block transforms correctly when contracting upward', () => {

  });

  test('Tall block transforms correctly when contracting downward', () => {

  });
})
