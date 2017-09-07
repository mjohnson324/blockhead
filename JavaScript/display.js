class Display {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.block = this.game.block;
  }

  handleBlock() {
    document.addEventListener("keydown", (e) => {
      e.preventDefault();
      switch (e.keyCode) {
        case 40:
          this.block.move(0, 30);
          break;
        case 38:
          this.block.move(0, -30);
          break;
        case 37:
          this.block.move(-30, 0);
          break;
        case 39:
          this.block.move(30, 0);
          break;
    }});
  }

  start() {
    this.game.draw();
    // this.animate.bind(this);
    this.handleBlock();
  }
}

module.exports = Display;
