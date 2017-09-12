const levelTwo = (length, startX, startY) => {
  return(
    [
      { x: startX, y: startY, isStart: true },
      { x: startX + length * 12, y: startY, isGoal: true },

      { x: startX - length, y: startY + length * 2 },
      { x: startX - length, y: startY + length },
      { x: startX - length, y: startY },
      { x: startX - length, y: startY - length },

      { x: startX, y: startY + length * 2 },
      { x: startX, y: startY + length },
      { x: startX, y: startY - length },

      { x: startX + length, y: startY + length * 2 },
      { x: startX + length, y: startY + length },
      { x: startX + length, y: startY },
      { x: startX + length, y: startY - length },

      { x: startX + length * 2, y: startY + length * 2 },
      { x: startX + length * 2, y: startY + length },
      { x: startX + length * 2, y: startY },
      { x: startX + length * 2, y: startY - length },

      { x: startX + length * 3, y: startY + length },

      { x: startX + length * 4, y: startY + length },

      { x: startX + length * 5, y: startY + length * 3 },
      { x: startX + length * 5, y: startY + length * 2 },
      { x: startX + length * 5, y: startY + length },

      { x: startX + length * 6, y: startY + length * 3 },
      { x: startX + length * 6, y: startY + length * 2 },
      { x: startX + length * 6, y: startY + length },

      { x: startX + length * 7, y: startY + length * 3 },
      { x: startX + length * 7, y: startY + length * 2 },
      { x: startX + length * 7, y: startY + length },

      { x: startX + length * 8, y: startY + length * 3 },

      { x: startX + length * 9, y: startY + length * 3 },

      { x: startX + length * 10, y: startY + length * 3 },
      { x: startX + length * 10, y: startY + length * 2 },
      { x: startX + length * 10, y: startY + length },
      { x: startX + length * 10, y: startY },
      { x: startX + length * 10, y: startY - length },

      { x: startX + length * 11, y: startY + length * 3 },
      { x: startX + length * 11, y: startY + length * 2 },
      { x: startX + length * 11, y: startY + length },
      { x: startX + length * 11, y: startY },
      { x: startX + length * 11, y: startY - length },
      { x: startX + length * 11, y: startY - length * 2 },

      { x: startX + length * 12, y: startY + length },
      { x: startX + length * 12, y: startY - length },
      { x: startX + length * 12, y: startY - length * 2 },

      { x: startX + length * 13, y: startY + length },
      { x: startX + length * 13, y: startY },
      { x: startX + length * 13, y: startY - length },
      { x: startX + length * 13, y: startY - length * 2 },
    ]
  );
};

module.exports = levelTwo;
