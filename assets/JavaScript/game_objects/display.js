const GameClock = require("./clock");

const colors = {
    backgroundColor: "rgb(25, 25, 25)",
    textColor: "rgb(255, 255, 255)",
    blockColor: "rgb(200, 0, 255)",
    blockFallingColor: "rgb(255, 0, 0)",
    tileColors: {
        start: "rgb(0, 255, 255)",
        goal: "rgb(0, 255, 0)",
        none: "rgb(192, 192, 192)",
        collapsible: "rgb(255, 128, 0)",
        warp: "rgb(255, 255, 0)",
        activator: "rgb(255, 255, 255)",
        bridge: "rgb(160, 0, 0)",
    }
};

let fonts = (length) => {
    return(
        {
            mediumFontSize: `${length}px Russo One, sans-serif`,
            largeFontSize: `${length * 5 / 3}px Russo One, sans-serif`,
        }
    );
};

const clock = new GameClock();

class Display {
    constructor(ctx, length) {
        this.ctx = ctx;
        this.length = length;
        this.fonts = fonts(length);

        this.drawTime = this.drawTime.bind(this);
    }

    drawStart(boardSize) {
        const { width, height } = boardSize;
        this.ctx.fillStyle = colors.backgroundColor;
        this.ctx.font = this.fonts.largeFontSize;
        this.ctx.fillRect(0, 0, width, height);
        this.ctx.fillStyle = colors.textColor;
        this.ctx.fillText("Click", width / 3, height / 2);
        this.ctx.fillText("to begin", width / 3, height / 2 + 50);
    }

    render(options) {
        const h1 = this.length * 4;
        const h2 = this.length * 3;
        const w = this.length * 7;
        const { width, height } = options.boardSize;
        this.ctx.fillStyle = colors.backgroundColor;
        this.ctx.fillRect(0, 0, width, height - h2);
        this.ctx.fillStyle = colors.textColor;
        this.ctx.font = this.fonts.mediumFontSize;
        this.ctx.fillText(`Level ${options.levelNumber}`, width / 5 , this.length * 3);
        this.ctx.fillText(`Moves: ${options.moves}`, width - w, height - h1);
        this.ctx.fillText(`Falls: ${options.falls}`, width - w, height - h2);
        this.drawFloor(options.level, options.length);
    }

    drawFloor(floor, length) {
        for (var position in floor) {
            let tile = floor[position];
            this.ctx.fillStyle = tile.active ?
                colors.tileColors[tile.type] : colors.backgroundColor;
            const { xPos, yPos } = tile;
            this.ctx.fillRect(xPos, yPos, length, length);
            this.ctx.strokeRect(xPos, yPos, length, length);
        }
    }

    drawMenu(boardSize) {
        const { width, height } = boardSize;
        this.ctx.font = this.fonts.largeFontSize;
        this.ctx.fillStyle = colors.backgroundColor;
        this.ctx.fillRect(0, 0, width, height);
        this.ctx.fillStyle = colors.textColor;
        this.ctx.fillText("Blockhead", width / 3, height / 4);
    }

    drawControls(boardSize) {
        const { width, height } = boardSize;
        this.ctx.font = this.fonts.largeFontSize;
        this.ctx.fillStyle = colors.backgroundColor;
        this.ctx.fillRect(0,0, width, height);
        this.ctx.fillStyle = colors.textColor;
        this.ctx.fillText("Controls:", width / 3, height / 4);
        this.ctx.font = this.fonts.mediumFontSize;
        this.ctx.fillText("Up: up-arrow", width / 3, height * 3 / 8);
        this.ctx.fillText("Down: down-arrow", width / 3, height / 2);
        this.ctx.fillText("Left: left-arrow", width / 3, height * 5 / 8);
        this.ctx.fillText("Right: right-arrow", width / 3, height * 3 / 4);
    }

    stringifyTime() {
        const { minutes, seconds } = clock.currentTime();

        const minuteString = (minutes < 10) ? `0${minutes}` : minutes;
        const secondString = (seconds < 10) ? `0${seconds}` : seconds;

        return `Time: ${minuteString}:${secondString}`;
    }

    drawTime(boardSize) {
        const h1 = this.length * 3;
        const h2 = this.length * 3 / 2;
        const w = this.length * 7;
        const { width, height } = boardSize;
        const displayTime = this.stringifyTime();
        this.ctx.fillStyle = colors.backgroundColor;
        this.ctx.fillRect(width / 3, height - h1, width * 2 / 3, h2);
        this.ctx.font = this.fonts.mediumFontSize;
        this.ctx.fillStyle = colors.textColor;
        this.ctx.fillText(displayTime, width - w, height - h2);
        clock.upTick();
    }

    drawBlock(block) {
        const { xPos, yPos, width, height } = block;
        this.ctx.fillStyle = colors.blockColor;
        this.ctx.fillRect(xPos, yPos, width, height);
        this.ctx.strokeRect(xPos, yPos, width, height);
    }

    stringifyRGBData(colorData) {
        return "rgb(".concat(colorData[0])
            .concat(", ")
            .concat(colorData[1])
            .concat(", ")
            .concat(colorData[2])
            .concat(")");
    }

    tileMovesOffFloor(coordinates) {
        for(let i = 0; i < coordinates.length; i++) {
            let corner = coordinates[i];
            let point = this.ctx.getImageData(corner[0], corner[1], 1, 1);
            let colorData = point.data.slice(0, 3);
            let color = this.stringifyRGBData(colorData);
            if (color === colors.backgroundColor) {
                return true;
            }
        }
        return false;
    }

    drawPause(boardSize) {
        const { width, height } = boardSize;
        this.ctx.fillStyle = colors.backgroundColor;
        this.ctx.fillRect(0, 0, width, height);
        this.ctx.font = this.fonts.largeFontSize;
        this.ctx.fillStyle = colors.textColor;
        this.ctx.fillText("Pause", width / 3, height / 2);
        this.ctx.font = this.fonts.mediumFontSize;
    }

    drawFail(block) {
        const { xPos, yPos, width, height } = block;
        this.ctx.fillStyle = colors.blockFallingColor;
        this.ctx.fillRect(xPos, yPos, width, height);
    }

    drawQuit(boardSize) {
        const { width, height } = boardSize;
        this.ctx.fillStyle = colors.backgroundColor;
        this.ctx.fillRect(0, 0, width, height);
        this.ctx.font = this.fonts.largeFontSize;
        this.ctx.fillStyle = colors.textColor;
        this.ctx.fillText("Really quit?", width / 3, height / 2);
    }

    drawFinish(options) {
        const timeTaken = this.stringifyTime();
        clock.resetClock();
        const { width, height } = options.boardSize;
        this.ctx.fillStyle = colors.backgroundColor;
        this.ctx.fillRect(0, 0, width, height);
        this.ctx.font = this.fonts.largeFontSize;
        this.ctx.fillStyle = colors.textColor;
        this.ctx.fillText("Final Tally:", width / 3, height / 5);
        this.ctx.font = this.fonts.mediumFontSize;
        this.ctx.fillText(`Levels Completed: ${options.levelNumber - 1}`, width / 3, height * 3 / 10);
        this.ctx.fillText(`Moves: ${options.moves}`, width / 3, height * 2 / 5);
        this.ctx.fillText(`Falls: ${options.falls}`, width / 3, height / 2);
        this.ctx.fillText(`${timeTaken}`, width / 3, height * 3 / 5);
        this.ctx.fillText("Click to start over", width / 3, height * 7 / 10);
    }
}

module.exports = Display;
