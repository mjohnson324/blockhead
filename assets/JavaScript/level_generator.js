const Tile = require('./tile');

const Tutorial = require('./levels/tutorial');
const LevelOne = require('./levels/level_one');
const LevelTwo = require('./levels/level_two');
const LevelThree = require('./levels/level_three');


const levelGenerator = (length) => {
  const levels = [Tutorial(length),
                     LevelOne(length),
                     LevelTwo(length),
                     LevelThree(length)];
  levels.forEach(level => {
    level.forEach((positionData, idx) => {
      level[idx] = new Tile(positionData);
    });
  });
  return levels;
};



module.exports = levelGenerator;
