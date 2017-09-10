const Tutorial = require('./tutorial');
const LevelOne = require('./level_one');
const LevelTwo = require('./level_two');
const LevelThree = require('./level_three');

const levels = (tileSize) => {
  return(
    [
      Tutorial(tileSize, 360, 180),
      LevelOne(tileSize, 330, 210),
      LevelTwo(tileSize, 270, 270),
      LevelThree(tileSize, 210, 190)
    ]);
};

module.exports = levels;
