function pause(game) {
    game.pauseStatus = !game.pauseStatus;
    game.pauseStatus === true ? pauseGame(game) : resumeGame(game);
}

function resumeGame(game) {
    game.display.render(game.displayOptions());
    game.display.drawBlock(game.block);
    document.addEventListener("keydown", game.move);
    setMoveButtons(game);
    game.timerId = setInterval(game.runClock, 1000);
}

function pauseGame(game) {
    clearInterval(game.timerId);
    setMoveButtons(game);
    document.removeEventListener("keydown", game.move);
    game.display.drawPause(game.boardSize);
}

function getMove(e, block, length, move) {
    e.preventDefault();
    if (e.keyCode === 40 || move === "down") { // down arrow
        block.transformBlock(0, 1 * length);
    } else if (e.keyCode === 39 || move === "right") { // right arrow key
        block.transformBlock(1 * length, 0);
    } else if (e.keyCode === 38 || move === "up") { // up arrow key
        block.transformBlock(0, -1 * length);
    } else if (e.keyCode === 37 || move === "left") { // left arrow key
        block.transformBlock(-1 * length, 0);
    }
}

function restartGame(game, music) {
    game.moves = 0;
    game.falls = 0;
    game.levels.resetCurrentLevel();
    music.switchTrack(game.pauseStatus);
    game.redrawMenu();
    const board = document.getElementById("canvas-container");
    board.removeEventListener("click", game.restart);
}

function setMoveButtons(game) {
    const arrows = [
        { text: "\u2190", id: "left", event: game.left },
        { text: "\u2191", id: "top", event: game.up },
        { text: "\u2192", id: "right", event:game.right },
        { text: "\u2193", id: "bottom", event: game.down }
    ];

    if (game.pauseStatus === false) {
        arrows.forEach(props => addButton(props));
    } else {
        arrows.forEach(props => removeButton(props));
    }
}

function addButton({ id, text, event }) {
    const container = document.getElementById("canvas-container");
    const button = document.createElement("button");
    button.setAttribute("id", id);
    button.innerText = text;
    button.addEventListener("click", event);
    container.appendChild(button);
}

function removeButton({ id, event }) {
    const button = document.getElementById(id);
    button.removeEventListener("click", event);
    button.parentNode.removeChild(button);
}

module.exports = { pause,
    restartGame,
    getMove,
    setMoveButtons,
    addButton,
    removeButton,
};
