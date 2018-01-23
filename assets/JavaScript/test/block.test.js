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

  test('', () => {

  });

  test('', () => {

  });

  test('', () => {

  });

  test('', () => {

  });
})

describe('Wide rectangular block', () => {
  let wideBlock;
  beforeEach(() => {
    wideBlock = new Block({xPos: 0, yPos: 0, width: 60, height: 30 });
  });

  test('Wide block retains shape when moving up and down', () => {

  });

  test('', () => {

  });

  test('', () => {

  });
})

describe('Tall Rec', () => {
  let tallBlock;
  beforeEach(() => {
    tallBlock = new Block({xPos: 0, yPos: 0, width: 60, height: 30 });
  });

  test('Tall block retains shape when moving left and right', () => {

  });

  test('', () => {

  });

  test('', () => {

  });
})
