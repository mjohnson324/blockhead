const Floor = require('./floor');
const Tutorial = require('./levels/tutorial');
const Block = require('./block');

class Game {
  constructor(ctx) {
    this.tutorial = Tutorial;
    this.ctx = ctx;
    this.block = new Block(ctx, this.tutorial[0]);
  }

  draw() {
    const ctx = this.ctx;
    const tutorial = this.tutorial;
    const floor = new Floor(tutorial, ctx);
    this.block.draw();
  }
}

module.exports = Game;
