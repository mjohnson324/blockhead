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
    mediumFontSize: "30px Russo One",
    largeFontSize: "50px Russo One",
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

    // drawStart(options) {
    //     const { width, height } = options.boardSize
    //     this.ctx.fillStyle = colors.backgroundColor;
    //     this.ctx.font = fonts.largeFontSize;
    //     this.ctx.fillRect(0, 0, width, height);
    //     this.ctx.fillText("Click anywhere to begin", width / 2, height / 2);
    // }

    render(options) {
        const { width, height } = options.boardSize;
        this.ctx.fillStyle = colors.backgroundColor;
        this.ctx.fillRect(0, 0, width, height);
        this.ctx.fillRect(0, width - 50, height - 200, 50);
        this.ctx.font = fonts.mediumFontSize;
        this.ctx.fillStyle = colors.textColor;
        this.ctx.fillText(`Level ${options.levelNumber}`, 50, 25);
        this.ctx.fillText(`Moves: ${options.moves}`, height - 200, 50);
        this.ctx.fillText(`Falls: ${options.falls}`, 50, width - 25);
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

    // drawMenu(options) {
    //     const { width, height } = options.boardSize;
    //     this.ctx.font = fonts.largeFontSize;
    //     this.ctx.fillStyle = colors.textColor;
    //     this.ctx.fillText("Blockhead", width / 2, height / 3);
    //     this.ctx.font = fonts.mediumFontSize;
    //     this.ctx.fillText("Start", width / 2, height / 2);
    //     this.ctx.fillText("Tutorial", width / 2, height * 2 / 3);
    // }

    stringifyTime() {
        const { minutes, seconds } = clock.currentTime();

        const minuteString = (minutes < 10) ? `0${minutes}` : minutes;
        const secondString = (seconds < 10) ? `0${seconds}` : seconds;

        return `${minuteString}:${secondString}`;
    }

    drawTime(options) {
        const { width, height } = options.boardSize;
        const displayTime = this.stringifyTime();
        this.ctx.fillStyle = colors.backgroundColor;
        this.ctx.fillRect(200, height - 50, width, 50);
        this.ctx.font = fonts.mediumFontSize;
        this.ctx.fillStyle = colors.textColor;
        this.ctx.fillText(displayTime, width - 200, height - 25);
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

    drawPause(options) {
        const { width, height } = options.boardSize;
        this.ctx.fillStyle = colors.backgroundColor;
        this.ctx.fillRect(0, 0, width, height);
        this.ctx.font = fonts.largeFontSize;
        this.ctx.fillStyle = colors.textColor;
        this.ctx.fillText("Pause", width / 2, height / 2);
        this.ctx.font = fonts.mediumFontSize;
    }

    drawFail(block) {
        const { xPos, yPos, width, height } = block;
        this.ctx.fillStyle = colors.blockFallingColor;
        this.ctx.fillRect(xPos, yPos, width, height);
    }

    drawFinish(options) {
        clock.resetClock();
        const { width, height } = options.boardSize;
        this.ctx.fillStyle = colors.backgroundColor;
        this.ctx.fillRect(0, 0, width, height);
        this.ctx.font = fonts.largeFontSize;
        this.ctx.fillStyle = colors.textColor;
        this.ctx.fillText("Final Tally:", width / 2, height / 5);
        this.ctx.font = fonts.mediumFontSize;
        this.ctx.fillText(`Moves: ${options.moves}`, width / 2, height * 3 / 10);
        this.ctx.fillText(`Falls: ${options.falls}`, width / 2, height * 2 / 5);
        this.ctx.fillText(`Time: ${options.time}`, width / 2, height / 2);
        this.ctx.fillText("Press spacebar to start over", width / 2, height * 3 / 5);
    }
}

module.exports = Display;
