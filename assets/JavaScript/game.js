const Block = require("./game_objects/block");
const controls = require("./game_objects/controls");
const Display = require("./game_objects/display");
const LevelGenerator = require("./game_objects/level_generator");
const Menu = require("./game_objects/menu");
const sound = require("./game_objects/sound");

const GameMusic = new sound.GameMusic();

class Game {
    constructor(ctx, length, boardSize) {
        this.boardSize = boardSize;
        this.length = length;
        this.pauseStatus = true;
        this.moves = 0;
        this.falls = 0;

        this.display = new Display(ctx);
        this.levels = new LevelGenerator();
        this.block = new Block(length, length);
        this.menu = new Menu(this.display, boardSize);

        this.move = this.move.bind(this);
        this.pause = this.pause.bind(this);
        this.restart = this.restart.bind(this);
        this.start = this.start.bind(this);
    }

    start() {
        this.display.drawStart();
        const board = document.getElementById("blockhead");
        board.addEventListener("onclick", this.startMenu);
    }

    startGame(e) {
        e.preventDefault();
        this.menu.removeMenuButton("start-button", this.startGame);
        this.menu.removeMenuButton("tutorial-button", this.startTutorial);
        this.menu.removeMenuButton("controls-button", this.showControls);
        GameMusic.startGame();
        this.levels.constructFloor(this.length, this.boardSize);
        this.block.setPosition(this.levels.currentStartPosition);
        this.timerId = setInterval(this.display.drawTime, 1000);
        document.addEventListener("keydown", this.move);
        document.addEventListener("keydown", this.pause);
        this.display.render(this.displayOptions());
        this.display.drawBlock(this.block);
    }

    // startTutorial(e) {
    //     e.preventDefault();
    //     this.menu.removeMenuButton("start-button", this.startGame);
    //     this.menu.removeMenuButton("tutorial-button", this.startTutorial);
    //     this.menu.removeMenuButton("controls-button", this.showControls);
    //     GameMusic.startMenu();
    // }

    startMenu(e) {
        e.preventDefault();
        const board = document.getElementById("blockhead");
        this.menu.start(this.display, this, this.boardSize);
        GameMusic.startMenu();
        board.removeEventListener("onclick", this.startMenu);
    }

    redrawMenu(e) {
        e.preventDefault();
        const backButton = document.getElementById("back-button");
        if (backButton !== null) {
            backButton.removeEventListener("onclick", this.reDrawMenu);
            backButton.parentNode.removeChild(backButton);
        }
        this.menu.start(this.display, this, this.boardSize);
    }

    restart(e) {
        controls.restartGame(e, this);
    }

    move(e) {
        const arrowKeycodes = [37, 38, 39, 40];
        if (arrowKeycodes.includes(e.keyCode)) {
            controls.getMove(e, this.block, this.length);
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
            length: this.length,
            boardSize: this.boardSize,
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
        const { xPos, yPos } = this.block;
        const tile = this.levels.lookupTile({ xPos, yPos });
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
            this.levels.constructFloor(this.length, this.boardSize);
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

    // gets current position of block. Coordinates are set to avoid bugs related
    // to narrow gaps.
    getCoordinates() {
        const { xPos, yPos, width, height } = this.block;
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
        this.display.drawFail(this.block);
        sound.playFallSound();
        this.block.resetBlock(this.length, this.levels.currentStartPosition);
        setTimeout(() => {
            this.display.render(this.displayOptions());
            this.display.drawBlock(this.block);
            document.addEventListener("keydown", this.move);
        }, 800);
    }
}

module.exports = Game;
