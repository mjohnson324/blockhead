class Menu {
  constructor(canvas) {
    this.textSize = "medium";
    this.blockSize = "medium";
    this.lives = false;
    this.challenge = false;

    this.activateMenu(canvas);
  }

  activateMenu(canvas) {
    // elem.addEventListener('click', function(e) {
    //     console.log('click: ' + e.offsetX + '/' + e.offsetY);
    //     var rect = collides(rects, e.offsetX, e.offsetY);
    //     if (rect) {
    //         console.log('collision: ' + rect.x + '/' + rect.y);
    //     } else {
    //         console.log('no collision');
    //     }
    // }, false);
  }

  startGame() {

  }

  beginTutorial() {

  }

  accessOptions() {

  }

  alterTextSize() {

  }

  alterBlockSize() {

  }

  enableLives() {

  }

  enableChallengeMode() {

  }
}

module.exports = Menu;
