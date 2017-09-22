class Sound {
  constructor(musicButton) {
    this.rectangleSound = new Audio('../Sounds/Effects/lrsf-menu-nav-3-rec.wav');
    this.squareSound = new Audio('../Sounds/Effects/lrsf-menu-nav-0-square.wav');
    this.fall = new Audio('../Sounds/Effects/lrsf-explode-3-fall.wav');
    this.music = new Audio('../Sounds/Music/undertale-09.mp3');
    this.musicButton = musicButton;
    this.playMusic = true;
    this.music.loop = true;

    this.toggleMusic = this.toggleMusic.bind(this);
  }

  start() {
    this.musicButton.addEventListener("click", this.toggleMusic);
    this.music.play();
  }

  toggleMusic() {
    if (this.playMusic === true) {
      this.playMusic = false;
      this.music.pause();
    } else {
      this.playMusic === false;
      this.music.play();
    }
  }

  blockSound(block) {
    if (block.length === block.width) {
      this.squareSound.play();
    } else {
      this.rectangleSound.play();
    }
  }

  fallSound() {
    this.fall.play();
  }
}

module.exports = Sound;
