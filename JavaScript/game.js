const Floor = require('./floor');
const Tutorial = require('./levels/tutorial');

class Game {
  constructor(ctx) {
    this.tutorial = Tutorial;
    this.ctx = ctx;
  }

  draw() {
    const ctx = this.ctx;
    const tutorial = this.tutorial;
    const floor = new Floor(tutorial, ctx);
  }
}

module.exports = Game;
