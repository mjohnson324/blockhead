class Tile {
  constructor(options) {
    this.xPos = options.x;
    this.yPos = options.y;
    this.type = options.type;
  }

  typeCheck() {
    if (this.type === "start") {
      return 'rgb(0, 255, 255)';
    } else if (this.type === "goal") {
      return 'rgb(0, 255, 0)';
    } else if (this.type === "none") {
      return 'rgb(192, 192, 192)';
    }
  }
}

module.exports = Tile;
