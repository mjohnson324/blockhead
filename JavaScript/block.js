class Block {
  constructor(ctx, startPos) {
    this.position = startPos;
    this.ctx = ctx;
  }

  move(i, j) {
    const { x, y } = this.position;
    this.position.x += i;
    this.position.y += j;
    this.draw();
  }

  draw() {
    const { x, y } = this.position;
    this.ctx.fillStyle = 'rgb(75, 0, 130)';
    this.ctx.fillRect(x, y, 30, 30);
    this.ctx.strokeRect(x, y, 30, 30);
  }
}

module.exports = Block;
