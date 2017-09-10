const Tutorial = require('./tutorial');
const LevelOne = require('./level_one');
const LevelTwo = require('./level_two');
const LevelThree = require('./level_three');

const levels = (tileSize) => {
  return(
    [
      Tutorial(tileSize, 360, 180),
      LevelOne(tileSize, 330, 240),
      LevelTwo(tileSize, 270, 210),
      LevelThree(tileSize, 210, 280)
    ]);
};

module.exports = levels;
