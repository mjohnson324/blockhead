class Tile {
  constructor(ctx, options) {
    this.ctx = ctx;
    this.position = options.position;
    this.isGoal = options.isGoal;
    this.isStart = options.isStart;
  }

  draw() {
    const { x, y } = this.position;
    const ctx = this.ctx;
    ctx.fillStyle = this.statusCheck();
    ctx.fillRect(x, y, 30, 30);
    ctx.strokeRect(x, y, 30, 30);
  }

  statusCheck() {
    if (this.isStart) {
      return 'rgb(255, 0, 0)';
    } else if (this.isGoal) {
      return 'rgb(0, 255, 0)';
    } else {
      return 'rgb(192, 192, 192)';
    }
  }
}

module.exports = Tile;
