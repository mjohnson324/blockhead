const Tile = require('./tile');
const allLevels = require('./levels/all_levels');

const levelGenerator = (length) => {
  const levels = allLevels.map(level => level(length));
  levels.forEach(level => {
    level.forEach((positionData, idx) => {
      level[idx] = new Tile(positionData);
    });
  });
  return levels;
};



module.exports = levelGenerator;
