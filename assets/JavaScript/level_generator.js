const Tile = require('./tile');
const allLevels = require('./levels/all_levels');

class LevelGenerator {
  constructor(length) {
    this.levels = this.generateLevels(length);
    this.currentLevel = 1;
  }

  generateLevels(length) {
    const levels = allLevels.map(level => level(length));
    levels.forEach(level => {
      level.forEach((positionData, idx) => {
        level[idx] = new Tile(positionData);
      });
    });
    return levels;
  }
}



module.exports = LevelGenerator;
