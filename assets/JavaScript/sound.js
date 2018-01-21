class Sound {
  constructor() {
    this.rectangleSound = document.getElementById("block-rectangle");
    this.squareSound = document.getElementById("block-square");
    this.fallSound = document.getElementById("fall");
    this.completeLevelSound = document.getElementById("complete-level");
    this.gameMusic = document.getElementById("game-song");
    this.menuMusic = document.getElementById("menu-song");

    this.toggleMusic = this.toggleMusic.bind(this);
  }

  start() {
    this.musicButton = document.getElementById("music");
    this.musicButton.addEventListener("click", this.toggleMusic);
    this.playMusic = true;
    this.gameMusic.loop = true;
    this.gameMusic.play();
  }

  toggleMusic() {
    this.playMusic === true ? this.pausMusic() : this.resumeMusic();
  }

  pausMusic() {
    this.playMusic = false;
    this.musicButton.className = "off";
    this.gameMusic.pause();
  }

  resumeMusic() {
    this.playMusic = true;
    this.musicButton.className = "on";
    this.gameMusic.play();
  }

  playBlockSound(block) {
    block.height === block.width ?
      this.squareSound.play() : this.rectangleSound.play();
  }

  playFallSound() {
    this.fallSound.play();
  }

  playGoalSound() {
    this.completeLevelSound.play();
  }
}

module.exports = Sound;
