class Block {
  constructor(ctx, startPos) {
    this.position = startPos;
    this.ctx = ctx;
    this.dimensions = { width: 30, height: 30 };
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
        this.dimensions.width = 60;
        return { dx: i, dy: j };
      } else if ( i < 0) {
        this.dimensions.width = 60;
        return { dx: 2 * i, dy: j };
      } else if (j > 0) {
        this.dimensions.height = 60;
        return { dx: i, dy: j };
      } else {
        this.dimensions.height = 60;
        return { dx: i, dy: 2 * j };
      }
    } else if (this.dimensions.width > this.dimensions.height) {
      if (i > 0) {
        this.dimensions.width = 30;
        return { dx: 2 * i, dy: j };
      } else if ( i < 0) {
        this.dimensions.width = 30;
        return { dx: i, dy: j };
      } else {
        return { dx: i, dy: j };
      }
    } else {
      if (j > 0) {
        this.dimensions.height = 30;
        return { dx: i, dy: 2 * j };
      } else if (j < 0) {
        this.dimensions.height = 30;
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
