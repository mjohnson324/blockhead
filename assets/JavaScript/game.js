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

        this.display = new Display(ctx, length);
        this.levels = new LevelGenerator();
        this.block = new Block(length, length);
        this.menu = new Menu();

        this.move = this.move.bind(this);
        this.pause = this.pause.bind(this);
        this.restart = this.restart.bind(this);
        this.startMenu = this.startMenu.bind(this);
        this.startGame = this.startGame.bind(this);
        this.showControls = this.showControls.bind(this);
        this.redrawMenu = this.redrawMenu.bind(this);
        this.runClock = this.runClock.bind(this);
        this.up = this.up.bind(this);
        this.right = this.right.bind(this);
        this.left = this.left.bind(this);
        this.down = this.down.bind(this);
        this.quit = this.quit.bind(this);
        this.endGame = this.endGame.bind(this);
    }

    start() {
        this.display.drawStart(this.boardSize);
        const board = document.getElementById("canvas-container");
        board.addEventListener("click", this.startMenu);
    }

    startGame(e) {
        e.preventDefault();
        this.pauseStatus = false;
        controls.removeButton({ id: "start-button", event: this.startGame });
        controls.removeButton({ id: "controls-button", event: this.showControls });
        controls.setMoveButtons(this);
        controls.addButton({id: "pause-button", event: this.pause, text: "Pause" });
        GameMusic.switchTrack(this.pauseStatus);
        this.levels.constructFloor(this.length, this.boardSize);
        this.block.setPosition(this.levels.currentStartPosition);
        this.timerId = setInterval(this.runClock, 1000);
        document.addEventListener("keydown", this.move);
        this.display.render(this.displayOptions());
        this.display.drawBlock(this.block);
    }

    startMenu(e) {
        e.preventDefault();
        this.menu.start(this.display, this, controls);
        GameMusic.setupSoundButton(controls.addButton);
        GameMusic.switchTrack(this.pauseStatus);
        const board = document.getElementById("canvas-container");
        board.removeEventListener("click", this.startMenu);
    }

    redrawMenu(e) {
        e.preventDefault();
        controls.removeButton({ id: "back-button", event: this.redrawMenu  });
        this.menu.start(this.display, this, controls);
    }

    showControls(e) {
        e.preventDefault();
        this.menu.controlsMenu(this.display, this, controls);
    }

    runClock() {
        this.display.drawTime(this.boardSize);
    }

    restart(e) {
        controls.restartGame(e, this, GameMusic);
    }

    move(e) {
        const arrowKeycodes = [37, 38, 39, 40];
        if (arrowKeycodes.includes(e.keyCode)) {
            controls.getMove(e, this.block, this.length, null);
            this.moves += 1;
            this.checkBlock();
        }
    }

    up(e) {
        controls.getMove(e, this.block, this.length, "up");
        this.moves += 1;
        this.checkBlock();
    }

    right(e) {
        controls.getMove(e, this.block, this.length, "right");
        this.moves += 1;
        this.checkBlock();
    }

    down(e) {
        controls.getMove(e, this.block, this.length, "down");
        this.moves += 1;
        this.checkBlock();
    }

    left(e) {
        controls.getMove(e, this.block, this.length, "left");
        this.moves += 1;
        this.checkBlock();
    }

    pause(e) {
        e.preventDefault();
        controls.pause(this);
    }

    quit(e) {
        e.preventDefault();
        this.display.drawQuit(this.boardSize);
        controls.removeButton({ id: "pause-button", event: this.pause });
        controls.removeButton({ id: "quit-button", event: this.quit });
        controls.addButton({ id: "yes-button", event: this.endGame, text: "Yes" });
        controls.addButton({ id: "no-button", event: this.pause, text: "No" });
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
        const { levelData, currentLevel } = this.levels;
        if (levelData[currentLevel] !== undefined) {
            const coordinates = this.getCoordinates();
            if (this.display.tileMovesOffFloor(coordinates)) {
                this.resetLevel();
            } else if (this.block.width === this.block.height) {
                this.checkTile();
            } else {
                this.reRender();
            }
        }
    }

    checkTile() {
        const { xPos, yPos } = this.block;
        const tile = this.levels.lookupTile({ xPos, yPos });
        if (tile.type === "goal") {
            this.nextLevel();
        } else if (tile.type === "collapsible") {
            this.resetLevel();
        } else if (tile.type === "warp") {
            this.warp(tile.relations[0]);
        } else if (tile.type === "activator") {
            this.levels.activate(tile.relations);
            sound.playBridgeSound();
            this.reRender();
        } else {
            this.reRender();
        }
    }

    warp(position) {
        sound.playWarpSound();
        this.block.setPosition(position);
        this.reRender();
    }

    reRender() {
        this.display.render(this.displayOptions());
        this.display.drawBlock(this.block);
        sound.playBlockSound(this.block);
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

    endGame(e) {
        this.pauseStatus = true;
        if (e !== undefined) {
            e.preventDefault();
            controls.removeButton({ id: "yes-button", event: this.endGame });
            controls.removeButton({ id: "no-button", event: this.pause });
        } else {
            document.removeEventListener("keydown", this.move);
            controls.removeButton({ id: "pause-button", event: this.pause });
            clearInterval(this.timerId);
            controls.setMoveButtons(this);
        }
        this.display.drawFinish(this.displayOptions());
        setTimeout(() => {
            const board = document.getElementById("canvas-container");
            board.addEventListener("click", this.restart);
        }, 500);
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
        this.pauseStatus = true;
        document.removeEventListener("keydown", this.move);
        controls.setMoveButtons(this);
        this.falls += 1;
        this.flashFailure();
    }

    flashFailure() {
        this.display.render(this.displayOptions());
        this.display.drawFail(this.block);
        sound.playFallSound();
        this.block.resetBlock(this.length, this.levels.currentStartPosition);
        setTimeout(() => {
            this.pauseStatus = false;
            this.display.render(this.displayOptions());
            this.display.drawBlock(this.block);
            document.addEventListener("keydown", this.move);
            controls.setMoveButtons(this);
        }, 800);
    }
}

module.exports = Game;
