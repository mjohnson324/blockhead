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
    ctx.fillStyle = 'rgb(0, 255, 0)';
    ctx.fillRect(x, y, 20, 20);
    ctx.strokeRect(x, y, 20, 20);
  }
}

module.exports = Tile;
