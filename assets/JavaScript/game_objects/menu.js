class Menu {
    start(display, game, controls) {
        display.drawMenu(game.boardSize);
        const startParams = { id: "start-button", event: game.startGame, text: "Start" };
        const controlsParams = { id: "controls-button", event: game.showControls, text: "Controls" };
        // const tutorialParams = { id: "tutorial-button", event: game.startTutorial, text: Tutorial };
        controls.addButton(startParams);
        // controls.addButton(tutorialParams);
        controls.addButton(controlsParams);
    }

    controlsMenu(display, game, controls) {
        display.drawControls(game.boardSize);
        const backParams = { id: "back-button", event: game.redrawMenu, text: "Back" };
        controls.addButton(backParams);
        controls.removeButton({ id: "start-button", event: game.startGame });
        // controls.removeButton({ id: "tutorial-button", event: game.startTutorial });
        controls.removeButton({ id: "controls-button", event: game.showControls });
    }
}

module.exports = Menu;
