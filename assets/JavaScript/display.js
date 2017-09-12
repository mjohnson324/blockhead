const Tile = require("./tile");
const Levels = require("./levels/levels");

class Display {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
  }

  start() {
    this.game.draw();
    this.game.handleBoard();
  }
}

module.exports = Display;



class Floor {
  constructor(positions, ctx) {
    this.positions = positions;
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
