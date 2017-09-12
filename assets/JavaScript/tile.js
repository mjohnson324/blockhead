class Tile {
  constructor(options) {
    this.position = options.position;
    this.isGoal = options.isGoal;
    this.isStart = options.isStart;
  }
}

module.exports = Tile;
