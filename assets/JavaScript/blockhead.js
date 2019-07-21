const Game = require("./game");

document.addEventListener("DOMContentLoaded", () => {
    const blockheadBoard = document.getElementById("blockhead");
    const blockheadBoardContainer = document.getElementById("canvas-container");
    const ctx = blockheadBoard.getContext("2d");

    const boardSize = {
        width: blockheadBoardContainer.offsetWidth,
        height: blockheadBoardContainer.offsetHeight,
    };
    blockheadBoard.width = boardSize.width;
    blockheadBoard.height = boardSize.height;

    new Game(ctx, 30, boardSize).start();
});