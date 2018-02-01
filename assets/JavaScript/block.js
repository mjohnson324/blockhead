class Block {
  constructor(length, dimensions) {
    this.length = length;
    this.width = dimensions.width;
    this.height = dimensions.height;
  }

  setPosition(coordinates) {
    this.xPos = coordinates.xPos;
    this.yPos = coordinates.yPos;
  }

  dimensions() {
    return {
      width: this.width,
      height: this.height,
    };
  }

  position() {
    return {
      xPos: this.xPos,
      yPos: this.yPos
    };
  }

  changePosition(dx, dy) {
    this.xPos += dx;
    this.yPos += dy;
  }

  transformBlock(x, y) {
    this.width === this.height ?
      this.expand(x, y) : this.checkDimensionsAndMovement(x, y);
  }

  expand(x, y) {
    x !== 0 ? this.expandWidth(x, y) : this.expandHeight(x, y);
  }

  // To simulate a rectangular prism, the block's dimensions and
  // position must change differently depending on its current size and
  // the direction it moves.
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
    x > 0 ? this.changePosition(x, y) : this.changePosition(2 * x, y);
  }

  expandHeight(x, y) {
    this.height *= 2;
    y > 0 ? this.changePosition(x, y) : this.changePosition(x, 2 * y);
  }

  contractWidth(x, y) {
    this.width /= 2;
    x > 0 ? this.changePosition(2 * x, y) : this.changePosition(x, y);
  }

  contractHeight(x, y) {
    this.height /= 2;
    y > 0 ? this.changePosition(x, y * 2) : this.changePosition(x, y);
  }
}

module.exports = Block;
