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
    if (this.width === this.height) {
      if (i > 0) {
        this.width = 60;
        return { dx: i, dy: j };
      } else if ( i < 0) {
        this.width = 60;
        return { dx: 2 * i, dy: j };
      } else if (j > 0) {
        this.height = 60;
        return { dx: i, dy: j };
      } else {
        this.height = 60;
        return { dx: i, dy: 2 * j };
      }
    } else if (this.width > this.height) {
      if (i > 0) {
        this.width = 30;
        return { dx: 2 * i, dy: j };
      } else if ( i < 0) {
        this.width = 30;
        return { dx: i, dy: j };
      } else {
        return { dx: i, dy: j };
      }
    } else {
      if (j > 0) {
        this.height = 30;
        return { dx: i, dy: 2 * j };
      } else if (j < 0) {
        this.height = 30;
        return { dx: i, dy: j };
      } else {
        return { dx: i, dy: j };
      }
    }
  }

  draw() {
    const { x, y } = this.position;
    this.ctx.fillStyle = 'rgb(75, 0, 130)';
    this.ctx.fillRect(x, y, this.width, this.height);
    this.ctx.strokeRect(x, y, this.width, this.height);
  }
}

module.exports = Block;
