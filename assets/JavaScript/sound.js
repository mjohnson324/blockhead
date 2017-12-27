class Sound {
  constructor() {
    this.rectangleSound = document.getElementById("block-rectangle");
    this.squareSound = document.getElementById("block-square");
    this.fall = document.getElementById("fall");
    this.completeLevel = document.getElementById("complete-level");
    this.gameMusic = document.getElementById("game-song");
    this.menuMusic = document.getElementById("menu-song");

    this.toggleMusic = this.toggleMusic.bind(this);
  }

  start() {
    this.musicButton = document.getElementById("music");
    this.playMusic = true;
    this.gameMusic.loop = true;
    this.musicButton.addEventListener("click", this.toggleMusic);
    this.gameMusic.play();
  }

  toggleMusic() {
    if (this.playMusic === true) {
      this.musicButton.className = "off";
      this.playMusic = false;
      this.gameMusic.pause();
    } else {
      this.playMusic = true;
      this.musicButton.className = "on";
      this.gameMusic.play();
    }
  }

  blockSound(block) {
    if (block.height === block.width) {
      this.squareSound.play();
    } else {
      this.rectangleSound.play();
    }
  }

  fallSound() {
    this.fall.play();
  }

  goalSound() {
    this.completeLevel.play();
  }
}

module.exports = Sound;
