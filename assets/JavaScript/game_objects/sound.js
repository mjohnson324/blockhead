const rectangleSound = document.getElementById("block-rectangle");
const squareSound = document.getElementById("block-square");
// const bridgeUpSound = document.getElementById("bridge-up");
// const bridgeDownSound = document.getElementById("bridge-down");
const fallSound = document.getElementById("fall");
const completeLevelSound = document.getElementById("complete-level");
// const warpSound = document.getElementById("warp");
const gameMusic = document.getElementById("game-song");
const menuMusic = document.getElementById("menu-song");

menuMusic.loop = true;
gameMusic.loop = true;

class GameMusic {
    constructor() {
        this.playMusic = true;
        this.currentMusic = menuMusic;
        this.musicButton = document.getElementById("music");
        this.musicDisplay = document.getElementById("music-icon");

        this.toggleMusic = this.toggleMusic.bind(this);

        this.musicButton = document.getElementById("music");
        this.musicButton.addEventListener("click", this.toggleMusic);
    }

    startGame() {
        if (this.playMusic === true) {
            this.currentMusic.pause();
            this.currentMusic = gameMusic;
            this.currentMusic.play();
        } else {
            this.currentMusic = gameMusic;
        }
    }

    startMenu() {
        if (this.playMusic === true) {
            this.currentMusic.pause();
            this.currentMusic = menuMusic;
            this.currentMusic.play();
        } else {
            this.currentMusic = menuMusic;
        }
    }

    toggleMusic(e) {
        e.preventDefault();
        this.playMusic === true ? this.pauseMusic() : this.resumeMusic();
    }

    pauseMusic() {
        this.playMusic = false;
        this.musicDisplay.className = "fas fa-volume-mute fa-2x";
        this.currentMusic.pause();
    }

    resumeMusic() {
        this.playMusic = true;
        this.musicDisplay.className = "fas fa-volume-up fa-2x";
        this.currentMusic.play();
    }
}

function playBlockSound(block) {
    block.height === block.width ?
        squareSound.play() : rectangleSound.play();
}

function playFallSound() {
    fallSound.play();
}

function playGoalSound() {
    completeLevelSound.play();
}

// function playWarpSound() {
//     warpSound.play();
// }

// function playBridgeSound(tile) {
//     tile.active ?
//         bridgeUpSound.play() : bridgeDownSound.play();
// }

module.exports = {
    playBlockSound,
    playFallSound,
    playGoalSound,
    GameMusic
};
