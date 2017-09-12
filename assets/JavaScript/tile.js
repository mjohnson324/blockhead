class Tile {
  constructor(options) {
    this.position = options.position;
    this.isGoal = options.isGoal;
    this.isStart = options.isStart;
    this.color = this.statusCheck();
  }

  statusCheck() {
    if (this.isStart) {
      return 'rgb(0, 255, 255)';
    } else if (this.isGoal) {
      return 'rgb(0, 255, 0)';
    } else {
      return 'rgb(192, 192, 192)';
    }
  }
}

module.exports = Tile;
