class Menu {
    start(display, game, controls) {
        display.drawMenu(game.boardSize);
        const startParams = { id: "start-button", event: game.startGame, text: "Start" };
        const controlsParams = { id: "controls-button", event: game.showControls, text: "Controls" };
        controls.addButton(startParams);
        controls.addButton(controlsParams);
    }

    controlsMenu(display, game, controls) {
        display.drawControls(game.boardSize);
        const backParams = { id: "back-button", event: game.redrawMenu, text: "Back" };
        controls.addButton(backParams);
        controls.removeButton({ id: "start-button", event: game.startGame });
        controls.removeButton({ id: "controls-button", event: game.showControls });
    }
}

module.exports = Menu;
