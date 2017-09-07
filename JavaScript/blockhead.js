const Game = require('./game');
const Display = require('./display');

document.addEventListener("DOMContentLoaded", () => {
  const blockheadBoard = document.getElementById("blockhead");
  const ctx = blockheadBoard.getContext("2d");

  const game = new Game();
  new Display(game, ctx).start();
});
