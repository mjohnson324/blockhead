class Tile {
  constructor(options = {}) {
    this.position = options.position;
    this.size = 20;
    this.isGoal = options.isGoal;
  }
}

module.exports = Tile;
