const Tutorial = require('./levels/tutorial');
const LevelOne = require('./levels/level_one');
const LevelTwo = require('./levels/level_two');
const LevelThree = require('./levels/level_three');

const levels = (length) => {
  return(
    [
      Tutorial(length, 360, 180),
      LevelOne(length, 330, 240),
      LevelTwo(length, 270, 210),
      LevelThree(length, 210, 280)
    ]);
};

module.exports = levels;
