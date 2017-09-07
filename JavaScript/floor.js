const Tile = require("./tile");

class Floor {
  constructor(positions, ctx) {
    this.positions = positions;
    this.ctx = ctx;

    this.layTiles();
  }

  layTiles() {
    const ctx = this.ctx;
    this.positions.forEach(pos => {
      const options = { position: pos, isGoal: false, isStart: false };
      const tile = new Tile(ctx, options);
      tile.draw();
    });
  }
}

module.exports = Floor;
