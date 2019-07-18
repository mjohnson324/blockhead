const Game = require("./game");

document.addEventListener("DOMContentLoaded", () => {
    const blockheadBoard = document.getElementById("blockhead");
    const ctx = blockheadBoard.getContext("2d");
    blockheadBoard.width = 900;
    blockheadBoard.height = 500;
    new Game(ctx, 30).start();
});
