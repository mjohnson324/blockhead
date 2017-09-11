class Tile {
  constructor(ctx, options) {
    this.ctx = ctx;
    this.position = options.position;
    this.isGoal = options.isGoal;
    this.isStart = options.isStart;
    this.size = options.size;
  }

  draw() {
    const { x, y } = this.position;
    const ctx = this.ctx;
    const size = this.size;
    ctx.fillStyle = this.statusCheck();
    ctx.fillRect(x, y, size, size);
    ctx.strokeRect(x, y, size, size);
  }

  statusCheck() {
    if (this.isStart) {
      return 'rgb(0, 255, 255)';
    } else if (this.isGoal) {
      return 'rgb(0, 255, 0)';
    } else {
      return 'rgb(192, 192, 192)';
    }
  }
}

module.exports = Tile;
