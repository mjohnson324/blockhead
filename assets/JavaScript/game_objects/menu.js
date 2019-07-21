class Menu {
    constructor() {
        this.addMenuButton = this.addMenuButton.bind(this);
        this.removeMenuButton = this.removeMenuButton.bind(this);
    }

    start(display, game, boardSize) {
        display.drawMenu(boardSize);
        this.addMenuButton("start-button", game.startGame);
        // this.addMenuButton("tutorial-button", game.startTutorial);
        this.addMenuButton("controls-button", game.showControls);
    }

    addMenuButton(elementId, eventResult) {
        const container = document.getElementById("canvas-container");
        const button = document.createElement("button");
        const word = elementId.split("-")[0];
        const capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1);
        button.setAttribute("id", elementId);
        button.innerText = capitalizedWord;
        button.addEventListener("click", eventResult);
        container.appendChild(button);
    }

    removeMenuButton(elementId, eventResult) {
        const button = document.getElementById(elementId);
        console.log(button);
        console.log(button.parentNode);
        console.log(button.parentElement);
        button.removeEventListener("click", eventResult);
        button.parentNode.removeChild(button);
    }

    controlsMenu(display, game, boardSize) {
        display.drawControls(boardSize);
        this.addMenuButton("back-button", game.redrawMenu);
        this.removeMenuButton("start-button", game.startGame);
        // this.removeMenuButton("tutorial-button", game.startTutorial);
        this.removeMenuButton("controls-button", game.showControls);
    }
}

module.exports = Menu;
