class Tile {
  constructor(options) {
    this.position = options.position;
    this.type = options.type;
    this.color = this.typeCheck();
  }

  statusCheck() {
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
