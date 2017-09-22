const Game = require('./game');
const PageButtons = require('./page_buttons');

document.addEventListener("DOMContentLoaded", () => {
  const buttonActivation = new PageButtons();
  const blockheadBoard = document.getElementById("blockhead");
  const ctx = blockheadBoard.getContext("2d");
  blockheadBoard.width = 900;
  blockheadBoard.height = 500;
  new Game(ctx, 30).start();
});
