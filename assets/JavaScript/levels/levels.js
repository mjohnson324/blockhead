const Tutorial = require('./tutorial');
const LevelOne = require('./level_one');
const LevelTwo = require('./level_two');
const LevelThree = require('./level_three');

const levels = (length) => {
  return(
    [
      length,
      Tutorial(length, 360, 180),
      LevelOne(length, 330, 240),
      LevelTwo(length, 270, 210),
      LevelThree(length, 210, 280)
    ]);
};

module.exports = levels;
