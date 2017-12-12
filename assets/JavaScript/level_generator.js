const Tile = require('./tile');

const tutorial = require('./levels/tutorial');
const levelOne = require('./levels/level_one');
const levelTwo = require('./levels/level_two');
const levelThree = require('./levels/level_three');
const levelFour = require('./levels/level_four');


const levelGenerator = (length) => {
  const levels = [tutorial(length),
                     levelOne(length),
                     levelTwo(length),
                     levelThree(length),
                     levelFour(length)];
  levels.forEach(level => {
    level.forEach((positionData, idx) => {
      level[idx] = new Tile(positionData);
    });
  });
  return levels;
};



module.exports = levelGenerator;
