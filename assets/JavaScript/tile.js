class Tile {
  constructor(options) {
    this.xPos = options.x;
    this.yPos = options.y;
    this.type = this.typeReference(options.type);
  }

  typeReference(type) {
    switch(type) {
      case "n":
        return "none";
      case "s":
        return "start";
      case "g":
        return "goal";
      case "c":
        return "collapsible";
      case "w":
        return "warp";
      case "h":
        return "heavySwitch";
      case "l":
        return "lightSwitch";
      case "b":
        return "bridge";
    }
  }
}

module.exports = Tile;
