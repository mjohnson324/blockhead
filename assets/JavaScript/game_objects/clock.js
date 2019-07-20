class GameClock {
    constructor() {
        this.gameTimeSeconds = 0;
    }

    resetClock() {
        this.gameTimeSeconds = 0;
    }

    upTick() {
        this.gameTimeSeconds += 1;
    }

    currentTime() {
        const gameTime = this.gameTimeSeconds;
        const seconds = gameTime % 60;
        const minutes = Math.floor(gameTime / 60) % 60;
        return { minutes, seconds };
    }
}

module.exports = GameClock;
