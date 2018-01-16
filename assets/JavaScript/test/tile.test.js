const Tile = require('../tile');

let tile;

beforeEach(() => {
  tile = new Tile({ xPos: 0, yPos: 0, });
})

test('Tile initializes with options', () => {
  expect(tile).toBeInstanceOf(Tile);
});
