class Clock() {
  constructor() {
    this.time = 0;
  }

  tick() {
    const { minutes, seconds } = this.currentTime();
    this.upTick()
  }

  upTick() {
    this.time += 1;
  }

  currentTime() {
    const gameTime = this.time;
    const seconds = gameTime % 60;
    const minutes = Math.floor(gameTime / 60) % 60;
    return { minutes: minutes, seconds: seconds };
  }
}

module.exports = Clock;
