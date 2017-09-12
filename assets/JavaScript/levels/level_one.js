const levelOne = (length, startX, startY) => {
  return(
    [
      { x: startX, y: startY, isStart: true },
      { x: startX + length * 6, y: startY + length * 3, isGoal: true },

      { x: startX - length, y: startY - length },
      { x: startX - length, y: startY },
      { x: startX - length, y: startY + length },

      { x: startX, y: startY - length },
      { x: startX, y: startY + length },
      { x: startX, y: startY + length * 2 },

      { x: startX + length, y: startY - length },
      { x: startX + length, y: startY },
      { x: startX + length, y: startY + length },
      { x: startX + length, y: startY + length * 2 },

      { x: startX + length * 2, y: startY },
      { x: startX + length * 2, y: startY + length },
      { x: startX + length * 2, y: startY + length * 2 },

      { x: startX + length * 3, y: startY },
      { x: startX + length * 3, y: startY + length },
      { x: startX + length * 3, y: startY + length * 2 },

      { x: startX + length * 4, y: startY },
      { x: startX + length * 4, y: startY + length },
      { x: startX + length * 4, y: startY + length * 2 },
      { x: startX + length * 4, y: startY + length * 3 },

      { x: startX + length * 5, y: startY + length },
      { x: startX + length * 5, y: startY + length * 2 },
      { x: startX + length * 5, y: startY + length * 3 },
      { x: startX + length * 5, y: startY + length * 4 },

      { x: startX + length * 6, y: startY + length },
      { x: startX + length * 6, y: startY + length * 2 },
      { x: startX + length * 6, y: startY + length * 4 },

      { x: startX + length * 7, y: startY + length },
      { x: startX + length * 7, y: startY + length * 2 },
      { x: startX + length * 7, y: startY + length * 3 },
      { x: startX + length * 7, y: startY + length * 4 },

      { x: startX + length * 8, y: startY + length * 2 },
      { x: startX + length * 8, y: startY + length * 3 },
    ]
  );
};

module.exports = levelOne;
