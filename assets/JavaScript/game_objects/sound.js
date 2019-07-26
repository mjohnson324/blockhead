const rectangleSound = document.getElementById("block-rectangle");
const squareSound = document.getElementById("block-square");
const bridgeSound = document.getElementById("bridge-down");
const fallSound = document.getElementById("fall");
const completeLevelSound = document.getElementById("complete-level");
const warpSound = document.getElementById("warp");
const gameMusic = document.getElementById("game-song");
const menuMusic = document.getElementById("menu-song");

menuMusic.loop = true;
gameMusic.loop = true;

class GameMusic {
    constructor() {
        this.playMusic = true;
        this.currentMusic = menuMusic;

        this.toggleMusic = this.toggleMusic.bind(this);
        this.musicButton = null;
        this.musicDisplay = null;
    }

    switchTrack(pauseStatus) {
        const newMusic = pauseStatus === true ? menuMusic : gameMusic;
        this.currentMusic.currentTime = 0;
        if (this.playMusic === true) {
            this.currentMusic.pause();
            this.currentMusic = newMusic;
            this.currentMusic.play();
        } else {
            this.currentMusic = newMusic;
        }
    }

    setupSoundButton(addButton) {
        addButton({ id: "music", event: this.toggleMusic, text: null });
        addSoundIcon(this.musicButton);
        this.musicButton = document.getElementById("music");
        this.musicDisplay = document.getElementById("music-icon");
        this.musicButton.addEventListener("click", this.toggleMusic);
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

function addSoundIcon() {
    const musicIcon = document.createElement("i");
    musicIcon.setAttribute("id", "music-icon");
    musicIcon.className = "fas fa-volume-up fa-2x";
    const musicButton = document.getElementById("music");
    musicButton.appendChild(musicIcon);
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

function playWarpSound() {
    warpSound.play();
}

function playBridgeSound() {
    bridgeSound.play();
}

module.exports = {
    playBlockSound,
    playFallSound,
    playGoalSound,
    playWarpSound,
    playBridgeSound,
    GameMusic
};
