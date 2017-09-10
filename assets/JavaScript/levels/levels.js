const Tutorial = require('./tutorial');

const levels = (tileSize) => {
  return(
    [
      Tutorial(tileSize, 360, 180)
    ]);
};

module.exports = levels;
