const Tile = require("./tile");

class Floor {
  constructor(positions, ctx, tileSize) {
    this.positions = positions(tileSize);
    this.ctx = ctx;
    this.tileSize = tileSize;
  }

  layTiles() {
    const ctx = this.ctx;
    this.positions.forEach(pos => {
      const options = {
        size: this.tileSize,
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
