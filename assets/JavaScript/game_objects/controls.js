function pause(e, game) {
    if (e.keyCode === 13) { // enter key
        e.preventDefault();
        game.pauseStatus = !game.pauseStatus;
        game.pauseStatus === true ? pauseGame(game) : resumeGame(game);
    }
}

function resumeGame(game) {
    game.display.render(game.displayOptions());
    game.display.drawBlock(game.block);
    document.addEventListener("keydown", game.move);
    game.timerId = setInterval(game.display.drawTime, 1000);
}

function pauseGame(game) {
    clearInterval(game.timerId);
    document.removeEventListener("keydown", game.move);
    game.display.drawPause();
}

function getMove(e, block) {
    e.preventDefault();
    switch (e.keyCode) {
    case 40: // down arrow key
        block.transformBlock(0, 1);
        break;
    case 38: // up arrow key
        block.transformBlock(0, -1);
        break;
    case 37: // left arrow key
        block.transformBlock(-1, 0);
        break;
    case 39: // right arrow key
        block.transformBlock(1, 0);
    }
}

function restartGame(e, game) {
    if (e.keyCode === 32) {
        e.preventDefault();
        game.levels.resetCurrentLevel();
        game.start();
        document.removeEventListener("keydown", game.restart);
    }
}

module.exports = { pause, restartGame, getMove };
