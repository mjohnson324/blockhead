class Sound {
  constructor() {
    this.rectangleSound = document.getElementById("block-rectangle");
    this.squareSound = document.getElementById("block-square");
    this.fall = document.getElementById("fall");
    this.completeLevel = document.getElementById("complete-level");
    this.music = document.getElementById("song");

    this.toggleMusic = this.toggleMusic.bind(this);
  }

  start() {
    this.musicButton = document.getElementById("music");
    this.playMusic = true;
    this.music.loop = true;
    this.musicButton.addEventListener("click", this.toggleMusic);
    this.music.play();
  }

  toggleMusic() {
    if (this.playMusic === true) {
      this.playMusic = false;
      this.music.pause();
    } else {
      this.playMusic = true;
      this.music.play();
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
