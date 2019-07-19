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
    mediumFontSize: "30px sans-serif",
    largeFontSize: "50px sans-serif",
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

class Display {
    constructor(ctx, length) {
        this.clock = new GameClock();
        this.ctx = ctx;
        this.length = length;

        this.drawTime = this.drawTime.bind(this);
    }

    // drawStart() {
    //     this.ctx.fillStyle = colors.backgroundColor;
    //     this.ctx.font = fonts.largeFontSize;
    //     this.ctx.fillRect(0, 0, 900, 450);
    //     this.ctx.fillText("Click anywhere to begin", 25, 50);
    // }

    render(options) {
        this.ctx.fillStyle = colors.backgroundColor;
        this.ctx.fillRect(0, 0, 900, 450);
        this.ctx.fillRect(0, 450, 700, 50);
        this.ctx.font = fonts.mediumFontSize;
        this.ctx.fillStyle = colors.textColor;
        this.ctx.fillText(`Level ${options.levelNumber}`, 25, 50);
        this.ctx.fillText(`Moves: ${options.moves}`, 700, 50);
        this.ctx.fillText(`Falls: ${options.falls}`, 25, 475);
        this.drawFloor(options.level);
    }

    drawFloor(floor) {
        for (var position in floor) {
            let tile = floor[position];
            this.ctx.fillStyle = colors.tileColors[tile.type];
            const { xPos, yPos } = tile;
            this.ctx.fillRect(xPos, yPos, this.length, this.length);
            this.ctx.strokeRect(xPos, yPos, this.length, this.length);
        }
    }

    // drawMenu() {
    //     this.ctx.font = fonts.largeFontSize;
    //     this.ctx.fillStyle = colors.textColor;
    //     this.ctx.fillText("Blockhead", 400, 200);
    //     this.ctx.font = fonts.mediumFontSize;
    //     this.ctx.fillText("Start", 300, 250);
    //     this.ctx.fillText("Directions", 300, 300);
    // }

    stringifyTime() {
        const { minutes, seconds } = this.clock.currentTime();

        const minuteString = (minutes < 10) ? `0${minutes}` : minutes;
        const secondString = (seconds < 10) ? `0${seconds}` : seconds;

        return `${minuteString}:${secondString}`;
    }

    drawTime() {
        const displayTime = this.stringifyTime();
        this.ctx.fillStyle = colors.backgroundColor;
        this.ctx.fillRect(200, 450, 900, 50);
        this.ctx.font = fonts.mediumFontSize;
        this.ctx.fillStyle = colors.textColor;
        this.ctx.fillText(displayTime, 700, 475);
        this.clock.upTick();
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

    drawPause() {
        this.ctx.fillStyle = colors.backgroundColor;
        this.ctx.fillRect(0, 0, 900, 500);
        this.ctx.font = fonts.largeFontSize;
        this.ctx.fillStyle = colors.textColor;
        this.ctx.fillText("Pause", 400, 200);
        this.ctx.font = fonts.mediumFontSize;
        this.ctx.fillText("(Press enter to resume)", 300, 300);
    }

    drawFail(block) {
        const { xPos, yPos, width, height } = block;
        this.ctx.fillStyle = colors.blockFallingColor;
        this.ctx.fillRect(xPos, yPos, width, height);
    }

    drawFinish(options) {
        this.ctx.fillStyle = colors.backgroundColor;
        this.ctx.fillRect(0, 0, 900, 500);
        this.ctx.font = fonts.largeFontSize;
        this.ctx.fillStyle = colors.textColor;
        this.ctx.fillText("Final Tally:", 50, 100);
        this.ctx.font = fonts.mediumFontSize;
        this.ctx.fillText(`Moves: ${options.moves}`, 70, 155);
        this.ctx.fillText(`Falls: ${options.falls}`, 70, 190);
        this.ctx.fillText(`Time: ${options.time}`, 70, 225);
        this.ctx.fillText("Press spacebar to start over", 50, 400);
    }
}

module.exports = Display;
