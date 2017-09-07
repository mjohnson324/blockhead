const defaults = {
  position: [0, 0],
  isGoal: false
};

class Tile {
  constructor(options =defaults) {
    this.position = options.position;
    this.size = 20;
    this.isGoal = options.isGoal;
  }


}

module.exports = Tile;
