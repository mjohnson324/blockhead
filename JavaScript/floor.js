const Tile = require("./tile");

class Floor {
  constructor(positions) {
    this.positions = positions;
  }

  layTiles() {
    this.positions.forEach(pos => {
      ctx.fillStyle = 'rgb(0, 255, 0)';
    });
  }
}

module.exports = Floor;
