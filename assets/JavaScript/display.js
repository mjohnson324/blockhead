class Display {
  constructor(ctx, length) {
    this.ctx = ctx;
    this.length = length;
    const backgroundRGB = [25, 25, 25];
    this.backgroundColor = this.stringifyRGB(backgroundRGB);
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fillRect(0, 0, 900, 500);
  }

  stringifyRGB(colorArray) {
    return(
      'rgb('
      .concat(colorArray[0])
      .concat(', ')
      .concat(colorArray[1])
      .concat(', ')
      .concat(colorArray[2])
      .concat(')')
    );
  }

  render(options) {
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fillRect(0, 0, 900, 450);
    this.ctx.fillRect(0, 450, 200, 50);
    this.ctx.font = '30px sans-serif';
    this.ctx.fillStyle = 'white';
    this.ctx.fillText(`Level ${options.levelNumber}`, 25, 50);
    this.ctx.fillText(`Moves: ${options.moves}`, 700, 50);
    this.ctx.fillText(`Falls: ${options.falls}`, 25, 475);
    this.drawFloor(options.level);
  }

  drawClock(time) {
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fillRect(200, 450, 900, 50);
    this.ctx.font = '30px sans-serif';
    this.ctx.fillStyle = 'white';
    this.ctx.fillText(time, 700, 475);
  }

  drawFloor(floor) {
    floor.forEach(tile => {
      this.ctx.fillStyle = tile.color;
      const { xPos, yPos } = tile;
      this.ctx.fillRect(xPos, yPos, this.length, this.length);
      this.ctx.strokeRect(xPos, yPos, this.length, this.length);
    });
  }

  drawBlock(block) {
    const { xPos, yPos, width, height } = block;
    this.ctx.fillStyle = 'rgb(200, 0, 255)';
    this.ctx.fillRect(xPos, yPos, width, height);
    this.ctx.strokeRect(xPos, yPos, width, height);
  }

  tileMovesOffFloor(coordinates) {
    for(let i = 0; i < coordinates.length; i++) {
      let corner = coordinates[i];
      let point = this.ctx.getImageData(corner[0], corner[1], 1, 1);
      let colorData = point.data.slice(0, 3);
      let color = this.stringifyRGB(colorData);
      if (color === this.backgroundColor) {
        return true;
      }
    }
    return false;
  }

  drawFail(oldOptions) {
    const { xPos, yPos, width, height } = oldOptions;
    this.ctx.fillStyle = 'rgb(255, 0, 0)';
    this.ctx.fillRect(xPos, yPos, width, height);
  }

  drawFinish(options) {
    this.ctx.clearRect(0, 0, 900, 500);
    this.ctx.font = '50px sans-serif';
    this.ctx.fillStyle = "white";
    this.ctx.fillText(`Final Tally:`, 50, 100);
    this.ctx.font = '30px sans-serif';
    this.ctx.fillText(`Moves: ${options.moves}`, 70, 155);
    this.ctx.fillText(`Falls: ${options.falls}`, 70, 190);
    this.ctx.fillText(`Time: ${options.time}`, 70, 225);
    this.ctx.fillText(
      "Thanks for playing! More levels will be added in the future",
      50,
      350);
  }
}

module.exports = Display;
