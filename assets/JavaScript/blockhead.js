const Game = require('./game');
const Display = require('./display');

document.addEventListener("DOMContentLoaded", () => {
  const blockheadBoard = document.getElementById("blockhead");
  const ctx = blockheadBoard.getContext("2d");
  blockheadBoard.width = 900;
  blockheadBoard.height = 500;

  const game = new Game(ctx, 30);
  new Display(game, ctx).start();
});
