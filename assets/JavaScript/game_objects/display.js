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
        activator: "#FFF",
        bridge: "rgb(128, 0, 0)",
    }
};

const fonts = {
    mediumFontSize: "30px Russo One, sans-serif",
    largeFontSize: "50px Russo One, sans-serif",
};

// function resizeCanvas() {
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//     ctx.fillStyle = "red";
//     ctx.fillRect(0,0, l1.length, l2.length);
//     ctx.fillStyle = " blue";
//     ctx.fillText("Hi", canvas.width / 2, canvas.height / 2);
// }
// window.addEventListener("resize", resizeCanvas);

const clock = new GameClock();

class Display {
    constructor(ctx) {
        this.ctx = ctx;

        this.drawTime = this.drawTime.bind(this);
    }

    drawStart(boardSize) {
        const { width, height } = boardSize;
        this.ctx.fillStyle = colors.backgroundColor;
        this.ctx.font = fonts.largeFontSize;
        this.ctx.fillRect(0, 0, width, height);
        this.ctx.fillStyle = colors.textColor;
        this.ctx.fillText("Click anywhere", width / 2 - 200, height / 2);
        this.ctx.fillText("to begin", width / 2 - 125, height / 2 + 50);
    }

    render(options) {
        const { width, height } = options.boardSize;
        this.ctx.fillStyle = colors.backgroundColor;
        this.ctx.fillRect(0, 0, width, height - 100);
        this.ctx.fillRect(0, height - 100, width / 2, 100);
        this.ctx.font = fonts.mediumFontSize;
        this.ctx.fillStyle = colors.textColor;
        this.ctx.fillText(`Level ${options.levelNumber}`, 100, 100);
        this.ctx.fillText(`Moves: ${options.moves}`, width - 200, 100);
        this.ctx.fillText(`Falls: ${options.falls}`, 100, height - 50);
        this.drawFloor(options.level, options.length);
    }

    drawFloor(floor, length) {
        for (var position in floor) {
            let tile = floor[position];
            this.ctx.fillStyle = colors.tileColors[tile.type];
            const { xPos, yPos } = tile;
            this.ctx.fillRect(xPos, yPos, length, length);
            this.ctx.strokeRect(xPos, yPos, length, length);
        }
    }

    drawMenu(boardSize) {
        const { width, height } = boardSize;
        this.ctx.font = fonts.largeFontSize;
        this.ctx.fillStyle = colors.backgroundColor;
        this.ctx.fillRect(0, 0, width, height);
        this.ctx.fillStyle = colors.textColor;
        this.ctx.fillText("Blockhead:", width / 2 - 125, height / 4);
        this.ctx.font = fonts.mediumFontSize;
        this.ctx.fillText("a game by Michael Johnson", width / 2 - 200, height / 3);
    }

    drawControls(boardSize) {
        const { width, height } = boardSize;
        this.ctx.font = fonts.largeFontSize;
        this.ctx.fillStyle = colors.backgroundColor;
        this.ctx.fillRect(0,0, width, height);
        this.ctx.fillStyle = colors.textColor;
        this.ctx.fillText("Controls:", width / 2 - 100, height / 4);
        this.ctx.font = fonts.mediumFontSize;
        this.ctx.fillText("Up: up-arrow", width / 2 - 100, height * 3 / 8);
        this.ctx.fillText("Down: down-arrow", width / 2 - 100, height / 2);
        this.ctx.fillText("Left: left-arrow", width / 2 - 100, height * 5 / 8);
        this.ctx.fillText("Right: right-arrow", width / 2 - 100, height * 3 / 4);
        this.ctx.fillText("Pause: enter", width / 2 - 100, height * 7 / 8);
    }

    stringifyTime() {
        const { minutes, seconds } = clock.currentTime();

        const minuteString = (minutes < 10) ? `0${minutes}` : minutes;
        const secondString = (seconds < 10) ? `0${seconds}` : seconds;

        return `${minuteString}:${secondString}`;
    }

    drawTime(boardSize) {
        const { width, height } = boardSize;
        const displayTime = this.stringifyTime();
        this.ctx.fillStyle = colors.backgroundColor;
        this.ctx.fillRect(width / 2, height - 100, width / 2, 100);
        this.ctx.font = fonts.mediumFontSize;
        this.ctx.fillStyle = colors.textColor;
        this.ctx.fillText(displayTime, width - 200, height - 50);
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
        this.ctx.font = fonts.largeFontSize;
        this.ctx.fillStyle = colors.textColor;
        this.ctx.fillText("Pause", width / 2 - 100, height / 2);
        this.ctx.font = fonts.mediumFontSize;
    }

    drawFail(block) {
        const { xPos, yPos, width, height } = block;
        this.ctx.fillStyle = colors.blockFallingColor;
        this.ctx.fillRect(xPos, yPos, width, height);
    }

    drawFinish(options) {
        const timeTaken = this.stringifyTime();
        clock.resetClock();
        const { width, height } = options.boardSize;
        this.ctx.fillStyle = colors.backgroundColor;
        this.ctx.fillRect(0, 0, width, height);
        this.ctx.font = fonts.largeFontSize;
        this.ctx.fillStyle = colors.textColor;
        this.ctx.fillText("Final Tally:", width / 2 - 200, height / 5);
        this.ctx.font = fonts.mediumFontSize;
        this.ctx.fillText(`Moves: ${options.moves}`, width / 2 - 100, height * 3 / 10);
        this.ctx.fillText(`Falls: ${options.falls}`, width / 2 - 100, height * 2 / 5);
        this.ctx.fillText(`Time: ${timeTaken}`, width / 2 - 100, height / 2);
        this.ctx.fillText("Press enter to start over", width / 2 - 200, height * 3 / 5);
    }
}

module.exports = Display;
