class Sound {
  constructor(musicButton) {
    this.rectangleSound = new Audio('../Sounds/Effects/270315__littlerobotsoundfactory__menu-navigate-03.wav');
    this.squareSound = new Audio('../Sounds/Effects/270324__littlerobotsoundfactory__menu-navigate-00.wav');
    this.fall = new Audio('../Sounds/Effects/270311__littlerobotsoundfactory__explosion-03.wav');
    this.music = new Audio('../Sounds/Music/toby fox - UNDERTALE Soundtrack - 09 Enemy Approaching.mp3');
    this.playMusic = true;
    this.music.loop = true;
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
}

module.exports = Sound;
