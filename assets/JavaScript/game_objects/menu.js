class Menu {
    constructor(context) {
        this.canvas = document.getElementById("blockhead");
        this.context = context;
    }

    activateMenu() {
        this.canvas.addEventListenenr("click", this.startGame);
    }

    startGame(e) {
        e.preventDefault();
    }

    alterBlockSize(e) {
        e.preventDefault();

    }
}

module.exports = Menu;
