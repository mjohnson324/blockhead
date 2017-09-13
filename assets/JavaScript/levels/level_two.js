const levelTwo = (length, startX = 210, startY = 280) => {
  return(
    [
      { x: startX, y: startY, type: "start" },
      { x: startX + length * 12, y: startY, type: "goal" },

      { x: startX - length, y: startY + length * 2, type: "none" },
      { x: startX - length, y: startY + length, type: "none" },
      { x: startX - length, y: startY, type: "none" },
      { x: startX - length, y: startY - length, type: "none" },

      { x: startX, y: startY + length * 2, type: "none" },
      { x: startX, y: startY + length, type: "none" },
      { x: startX, y: startY - length, type: "none" },

      { x: startX + length, y: startY + length * 2, type: "none" },
      { x: startX + length, y: startY + length, type: "none" },
      { x: startX + length, y: startY, type: "none" },
      { x: startX + length, y: startY - length, type: "none" },

      { x: startX + length * 2, y: startY + length * 2, type: "none" },
      { x: startX + length * 2, y: startY + length, type: "none" },
      { x: startX + length * 2, y: startY, type: "none" },
      { x: startX + length * 2, y: startY - length, type: "none" },

      { x: startX + length * 3, y: startY + length, type: "none" },

      { x: startX + length * 4, y: startY + length, type: "none" },

      { x: startX + length * 5, y: startY + length * 3, type: "none" },
      { x: startX + length * 5, y: startY + length * 2, type: "none" },
      { x: startX + length * 5, y: startY + length, type: "none" },

      { x: startX + length * 6, y: startY + length * 3, type: "none" },
      { x: startX + length * 6, y: startY + length * 2, type: "none" },
      { x: startX + length * 6, y: startY + length, type: "none" },

      { x: startX + length * 7, y: startY + length * 3, type: "none" },
      { x: startX + length * 7, y: startY + length * 2, type: "none" },
      { x: startX + length * 7, y: startY + length, type: "none" },

      { x: startX + length * 8, y: startY + length * 3, type: "none" },

      { x: startX + length * 9, y: startY + length * 3, type: "none" },

      { x: startX + length * 10, y: startY + length * 3, type: "none" },
      { x: startX + length * 10, y: startY + length * 2, type: "none" },
      { x: startX + length * 10, y: startY + length, type: "none" },
      { x: startX + length * 10, y: startY, type: "none" },
      { x: startX + length * 10, y: startY - length, type: "none" },

      { x: startX + length * 11, y: startY + length * 3, type: "none" },
      { x: startX + length * 11, y: startY + length * 2, type: "none" },
      { x: startX + length * 11, y: startY + length, type: "none" },
      { x: startX + length * 11, y: startY, type: "none" },
      { x: startX + length * 11, y: startY - length, type: "none" },
      { x: startX + length * 11, y: startY - length * 2, type: "none" },

      { x: startX + length * 12, y: startY + length, type: "none" },
      { x: startX + length * 12, y: startY - length, type: "none" },
      { x: startX + length * 12, y: startY - length * 2, type: "none" },

      { x: startX + length * 13, y: startY + length, type: "none" },
      { x: startX + length * 13, y: startY, type: "none" },
      { x: startX + length * 13, y: startY - length, type: "none" },
      { x: startX + length * 13, y: startY - length * 2, type: "none" },
    ]
  );
};

module.exports = levelTwo;
