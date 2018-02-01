const Tile = require('../tile');

let tile;

beforeEach(() => {
  tile = new Tile({ x: 0, y: 0, type: "n" });
});

test('Tile initializes with options', () => {
  expect(tile.xPos).toEqual(0);
  expect(tile.yPos).toEqual(0);
  expect(tile.type).toEqual("none");
});

test('Tiles are assigned the correct type', () => {
  const noType = tile.typeReference("n");
  const startType = tile.typeReference("s");
  const bridgeType = tile.typeReference("b");
  expect(noType).toEqual("none");
  expect(startType).toEqual("start");
  expect(bridgeType).toEqual("bridge");
});
