const Tile = require("./tile");

class Floor {
  constructor(positions, ctx) {
    this.positions = positions;
    this.ctx = ctx;
  }

  layTiles() {
    const ctx = this.ctx;
    this.positions.forEach(pos => {
      const options = {
        position: { x: pos.x, y: pos.y },
        isGoal: pos.isGoal,
        isStart: pos.isStart
      };
      const tile = new Tile(ctx, options);
      tile.draw();
    });
  }
}

module.exports = Floor;
