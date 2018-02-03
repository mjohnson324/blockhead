class Menu {
  constructor(context) {
    this.blockSize = "medium";
    this.canvas = document.getElementById("blockhead");
    this.context = context;
  }

  activateMenu() {

    this.canvas.addEventListenenr('click', this.startGame);
    this.canvas.addEventListener('click', this.beginTutorial);
    this.canvas.addEventListener('click', this.alterOptions);
  }

  startGame(e) {
    e.preventDefault();
  }

  beginTutorial(e) {
    e.preventDefault(e);

  }

  alterBlockSize() {
    e.preventDefault(e);

  }
}

module.exports = Menu;
