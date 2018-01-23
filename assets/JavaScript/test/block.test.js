const Block = require('../block');
// The numbers associated with the block width and height are arbitrary.
// I found 30 to be a good default width and height for the block;
// not too big, not too small for the screen.

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

  describe('Moving without changing shape', () => {
    const wideBlockSize = { width: 60, height: 30 };
    test('Wide block retains shape when moving up', () => {
      wideBlock.transformBlock(0, 30);
      expect(wideBlock.dimensions()).toEqual(wideBlockSize);
    });

    test('Wide block retains shape when moving down', () => {
      wideBlock.transformBlock(0, -30);
      expect(wideBlock.dimensions()).toEqual(wideBlockSize);
    })
  });

  describe('Horizontal contractions', () => {
    const squareBlockSize = { width: 30, height: 30 };
    test('Wide block transforms correctly when contracting right', () => {
      const rightShift = { xPos: 60, yPos: 0 };
      wideBlock.transformBlock(30, 0);
      expect(wideBlock.dimensions()).toEqual(squareBlockSize);
      expect(wideBlock.position()).toEqual(rightShift);
    });

    test('Wide block transforms correctly when contracting left', () => {
      const leftShift = { xPos: -30, yPos: 0 };
      wideBlock.transformBlock(-30, 0);
      expect(wideBlock.dimensions()).toEqual(squareBlockSize);
      expect(wideBlock.position()).toEqual(leftShift);
    });
  });
})

describe('Tall rectangular blocks', () => {
  let tallBlock;
  beforeEach(() => {
    tallBlock = new Block({xPos: 0, yPos: 0, width: 30, height: 60 });
  });

  describe('Moving without changing shape', () => {
    const tallBlockSize = { width: 30, height: 60 };
    test('Tall block retains shape when moving left', () => {
      tallBlock.transformBlock(30, 0);
      expect(tallBlock.dimensions()).toEqual(tallBlockSize);
    });

    test('Tall block retains shape when moving right', () => {
      tallBlock.transformBlock(-30, 0);
      expect(tallBlock.dimensions()).toEqual(tallBlockSize);
    });
  });

  test('Tall block transforms correctly when contracting upward', () => {

  });

  test('Tall block transforms correctly when contracting downward', () => {

  });
})
