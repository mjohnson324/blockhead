class Block {
  constructor(ctx, startPos, tileSize) {
    this.position = startPos;
    this.ctx = ctx;
    this.tileSize = tileSize;
    this.dimensions = { width: tileSize, height: tileSize };
  }

  move(i, j) {
    const { dx, dy } = this.checkStanding(i, j);
    this.position.x += dx;
    this.position.y += dy;
    this.draw();
  }

  checkStanding(i, j) {
    if (this.dimensions.width === this.dimensions.height) {
      if (i > 0) {
        this.dimensions.width = this.tileSize * 2;
        return { dx: i, dy: j };
      } else if ( i < 0) {
        this.dimensions.width = this.tileSize * 2;
        return { dx: 2 * i, dy: j };
      } else if (j > 0) {
        this.dimensions.height = this.tileSize * 2;
        return { dx: i, dy: j };
      } else {
        this.dimensions.height = this.tileSize * 2;
        return { dx: i, dy: 2 * j };
      }
    } else if (this.dimensions.width > this.dimensions.height) {
      if (i > 0) {
        this.dimensions.width = this.tileSize;
        return { dx: 2 * i, dy: j };
      } else if ( i < 0) {
        this.dimensions.width = this.tileSize;
        return { dx: i, dy: j };
      } else {
        return { dx: i, dy: j };
      }
    } else {
      if (j > 0) {
        this.dimensions.height = this.tileSize;
        return { dx: i, dy: 2 * j };
      } else if (j < 0) {
        this.dimensions.height = this.tileSize;
        return { dx: i, dy: j };
      } else {
        return { dx: i, dy: j };
      }
    }
  }

  draw() {
    const { x, y } = this.position;
    const { width, height } = this.dimensions;
    this.ctx.fillStyle = 'rgb(200, 0, 255)';
    this.ctx.fillRect(x, y, width, height);
    this.ctx.strokeRect(x, y, width, height);
  }
}

module.exports = Block;
