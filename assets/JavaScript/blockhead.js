const Game = require("./game");

document.addEventListener("DOMContentLoaded", () => {
    const blockheadBoard = document.getElementById("blockhead");
    const blockheadBoardContainer = document.getElementById("canvas-container");
    const ctx = blockheadBoard.getContext("2d");
    blockheadBoard.width = blockheadBoardContainer.width;
    blockheadBoard.height = blockheadBoardContainer.height;
    new Game(ctx, 30).start();
});
