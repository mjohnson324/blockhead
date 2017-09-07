class Display {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
  }

  start() {
    this.game.draw();
  }
}

module.exports = Display;
