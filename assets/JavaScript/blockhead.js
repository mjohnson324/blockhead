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
    let length = 30;
    if (boardSize.width < 900) {  length = 20; }

    new Game(ctx, length, boardSize).start();
});