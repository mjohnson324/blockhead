const Game = require('./game');

document.addEventListener("DOMContentLoaded", () => {
  const directions = document.getElementById('directions');
  const directionsDisplay = document.getElementById('direct');
  directionsDisplay.addEventListener("click", () => {
    toggleView(directions);
  });

  const blockheadBoard = document.getElementById("blockhead");
  const ctx = blockheadBoard.getContext("2d");
  blockheadBoard.width = 900;
  blockheadBoard.height = 500;
  new Game(ctx, 30).start();
});

function toggleView(directions) {
  if (directions.className === "hidden") {
    directions.className = "display";
  } else {
    directions.className = "hidden";
  }
}
