const Floor = require('./floor');
const tutorial = require('./levels/tutorial');

class Game {
  constructor(ctx) {
    this.tutorial = tutorial;
    this.ctx = ctx;
  }

  draw() {
    const ctx = this.ctx;
    const floor = new Floor(tutorial, ctx);
  }
}

module.exports = Game;
