class Block {
  constructor(options) {
    this.xPos = options.xPos;
    this.yPos = options.yPos;
    this.width = options.width;
    this.height = options.height;
  }

  changePosition(dx, dy) {
    this.xPos += dx;
    this.yPos += dy;
  }

  transform(x, y) {
    if (this.width === this.height) {
      this.expand(x, y);
    } else {
      this.checkDimensionsAndMovement(x, y);
    }
  }

  expand(x, y) {
    if (x !== 0) {
      this.expandWidth(x, y);
    } else {
      this.expandHeight(x, y);
    }
  }

  checkDimensionsAndMovement(x, y) {
    if (this.width > this.height && x !== 0) {
      this.contractWidth(x, y);
    } else if (this.width < this.height && y !== 0) {
      this.contractHeight(x, y);
    } else {
      this.changePosition(x, y);
    }
  }

  expandWidth(x, y) {
    this.width *= 2;
    if (x > 0) {
      this.changePosition(x, y);
    } else {
      this.changePosition(2 * x, y);
    }
  }

  expandHeight(x, y) {
    this.height *= 2;
    if (y > 0) {
      this.changePosition(x, y);
    } else {
      this.changePosition(x, 2 * y);
    }
  }

  contractWidth(x, y) {
    this.width /= 2;
    if (x > 0) {
      this.changePosition(2 * x, y);
    } else {
      this.changePosition(x, y);
    }
  }

  contractHeight(x, y) {
    this.height /= 2;
    if (y > 0) {
      this.changePosition(x, y * 2);
    } else {
      this.changePosition(x, y);
    }
  }
}

module.exports = Block;
