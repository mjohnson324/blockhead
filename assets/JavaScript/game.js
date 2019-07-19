const Block = require("./game_objects/block");
const controls = require("./game_objects/controls");
const Display = require("./game_objects/display");
const LevelGenerator = require("./game_objects/level_generator");
// const Menu = require("./game_objects/menu");
const sound = require("./game_objects/sound");

const GameMusic = new sound.GameMusic();

class Game {
    constructor(ctx, length) {
        this.display = new Display(ctx, length);
        this.levels = new LevelGenerator(length);
        this.block = new Block(length, { width: length, height: length });

        this.pauseStatus = true;
        this.moves = 0;
        this.falls = 0;

        this.move = this.move.bind(this);
        this.pause = this.pause.bind(this);
        this.restart = this.restart.bind(this);
    }

    start() {

    }

    startMenu() {
        GameMusic.startMenu();
    }

    startGame() {
        GameMusic.startGame();
        this.moves = 0;
        this.falls = 0;
        this.levels.constructFloor();
        this.block.setPosition(this.levels.currentStartPosition);
        this.timerId = setInterval(this.display.drawTime, 1000);
        document.addEventListener("keydown", this.move);
        document.addEventListener("keydown", this.pause);
        this.display.render(this.displayOptions());
        this.display.drawBlock(this.block);
    }

    restart(e) {
        controls.restartGame(e, this);
    }

    move(e) {
        const arrowKeycodes = [37, 38, 39, 40];
        if (arrowKeycodes.includes(e.keyCode)) {
            controls.getMove(e, this.block);
            this.moves += 1;
            this.checkBlock();
        }
    }

    pause(e) {
        controls.pauseButton(e, this);
    }

    displayOptions() {
        return {
            level: this.levels.constructedFloor,
            levelNumber: this.levels.currentLevel,
            moves: this.moves,
            falls: this.falls,
        };
    }

    checkBlock() {
        if (this.block.width === this.block.height) {
            this.checkGoal();
        }
        const { levelData, currentLevel } = this.levels;
        if (levelData[currentLevel] !== undefined) {
            this.checkBounds();
        }
    }

    checkGoal() {
        const tile = this.levels.lookupTile(this.block.position());
        if (tile !== undefined && tile.type === "goal") {
            this.nextLevel();
        }
    }

    nextLevel() {
        sound.playGoalSound();
        this.levels.nextLevel();
        const { levelData, currentLevel } = this.levels;
        if (levelData[currentLevel] === undefined) {
            this.endGame();
        } else {
            this.levels.constructFloor();
            this.block.setPosition(this.levels.currentStartPosition);
            this.display.render(this.displayOptions());
            this.display.drawBlock(this.block);
        }
    }

    endGame() {
        document.removeEventListener("keydown", this.move);
        document.removeEventListener("keydown", this.pause);
        clearInterval(this.timerId);
        this.display.drawFinish(this.displayOptions());
        document.addEventListener("keydown", this.restart);
    }

    checkBounds() {
        const { currentLevel, levelData } = this.levels;
        const coordinates = this.getCoordinates();
        if (this.display.tileMovesOffFloor(coordinates)) {
            this.resetLevel();
        } else if (levelData[currentLevel] !== undefined) {
            this.display.render(this.displayOptions());
            this.display.drawBlock(this.block);
            sound.playBlockSound(this.block);
        }
    }

    getCoordinates() {
        const { xPos, yPos } = this.block.position();
        const { width, height } = this.block.dimensions();
        return [
            [xPos + Math.floor(width / 4), yPos + Math.floor(height / 4)],
            [xPos + Math.floor(width * 3 / 4), yPos + Math.floor(height * 3 / 4)],
        ];
    }

    resetLevel() {
        document.removeEventListener("keydown", this.move);
        this.falls += 1;
        this.flashFailure();
    }

    flashFailure() {
        this.display.render(this.displayOptions());
        this.display.drawFail(this.block.properties());
        sound.playFallSound();
        this.block.resetBlock(this.levels.currentStartPosition);
        setTimeout(() => {
            this.display.render(this.displayOptions());
            this.display.drawBlock(this.block);
            document.addEventListener("keydown", this.move);
        }, 800);
    }
}

module.exports = Game;
