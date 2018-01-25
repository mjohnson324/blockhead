class Menu { // Not yet in use
  constructor(context) {
    this.textSize = "medium";
    this.blockSize = "medium";
    this.lives = false;
    this.challenge = false;
    this.canvas = document.getElementById("blockhead");
    this.context = context;

    this.activateMenu();
  }

  activateMenu() {

    this.canvas.addEventListenenr('click', this.startGame);
    this.canvas.addEventListener('click', this.beginTutorial);
    this.canvas.addEventListener('click', this.accessOptions);
  }

  startGame(e) {
    e.preventDefault();
  }

  beginTutorial(e) {
    e.preventDefault(e);

  }

  accessOptions() {
    e.preventDefault(e);

  }

  alterTextSize() {
    e.preventDefault(e);

  }

  alterBlockSize() {
    e.preventDefault(e);

  }

  enableLives() {
    e.preventDefault(e);

  }

  enableChallengeMode(e) {
    e.preventDefault();

  }
}

module.exports = Menu;
