const levelTwo = (size, startX, startY) => {
  return(
    [
      { x: startX, y: startY, isStart: true },
      { x: startX + size * 12, y: startY, isGoal: true },

      { x: startX - size, y: startY + size * 2 },
      { x: startX - size, y: startY + size },
      { x: startX - size, y: startY },
      { x: startX - size, y: startY - size },

      { x: startX, y: startY + size * 2 },
      { x: startX, y: startY + size },
      { x: startX, y: startY - size },

      { x: startX + size, y: startY + size * 2 },
      { x: startX + size, y: startY + size },
      { x: startX + size, y: startY },
      { x: startX + size, y: startY - size },

      { x: startX + size * 2, y: startY + size * 2 },
      { x: startX + size * 2, y: startY + size },
      { x: startX + size * 2, y: startY },
      { x: startX + size * 2, y: startY - size },

      { x: startX + size * 3, y: startY + size },

      { x: startX + size * 4, y: startY + size },

      { x: startX + size * 5, y: startY + size * 3 },
      { x: startX + size * 5, y: startY + size * 2 },
      { x: startX + size * 5, y: startY + size },

      { x: startX + size * 6, y: startY + size * 3 },
      { x: startX + size * 6, y: startY + size * 2 },
      { x: startX + size * 6, y: startY + size },

      { x: startX + size * 7, y: startY + size * 3 },
      { x: startX + size * 7, y: startY + size * 2 },
      { x: startX + size * 7, y: startY + size },

      { x: startX + size * 8, y: startY + size * 3 },

      { x: startX + size * 9, y: startY + size * 3 },

      { x: startX + size * 10, y: startY + size * 3 },
      { x: startX + size * 10, y: startY + size * 2 },
      { x: startX + size * 10, y: startY + size },
      { x: startX + size * 10, y: startY },
      { x: startX + size * 10, y: startY - size },

      { x: startX + size * 11, y: startY + size * 3 },
      { x: startX + size * 11, y: startY + size * 2 },
      { x: startX + size * 11, y: startY + size },
      { x: startX + size * 11, y: startY },
      { x: startX + size * 11, y: startY - size },
      { x: startX + size * 11, y: startY - size * 2 },

      { x: startX + size * 12, y: startY + size },
      { x: startX + size * 12, y: startY - size },
      { x: startX + size * 12, y: startY - size * 2 },

      { x: startX + size * 13, y: startY + size },
      { x: startX + size * 13, y: startY },
      { x: startX + size * 13, y: startY - size },
      { x: startX + size * 13, y: startY - size * 2 },
    ]
  );
};

module.exports = levelTwo;
