const tutorial = (length, startX, startY) => {
  return(
    [
    { x: startX, y: startY, type: "start" },
    { x: startX + length * 2, y: startY + length * 2, type: "goal" },

    { x: startX, y: startY + length, type: "none" },
    { x: startX, y: startY + length * 2, type: "none" },
    { x: startX, y: startY + length * 3, type: "none" },
    { x: startX, y: startY + length * 4, type: "none" },

    { x: startX + length, y: startY, type: "none" },
    { x: startX + length, y: startY + length, type: "none" },
    { x: startX + length, y: startY + length * 2, type: "none" },
    { x: startX + length, y: startY + length * 3, type: "none" },
    { x: startX + length, y: startY + length * 4, type: "none" },

    { x: startX + length * 2, y: startY, type: "none" },
    { x: startX + length * 2, y: startY + length, type: "none" },
    { x: startX + length * 2, y: startY + length * 3, type: "none" },
    { x: startX + length * 2, y: startY + length * 4, type: "none" },

    { x: startX + length * 3, y: startY, type: "none" },
    { x: startX + length * 3, y: startY + length, type: "none" },
    { x: startX + length * 3, y: startY + length * 2, type: "none" },
    { x: startX + length * 3, y: startY + length * 3, type: "none" },
    { x: startX + length * 3, y: startY + length * 4, type: "none" },

    { x: startX + length * 4, y: startY, type: "none" },
    { x: startX + length * 4, y: startY + length, type: "none" },
    { x: startX + length * 4, y: startY + length * 2, type: "none" },
    { x: startX + length * 4, y: startY + length * 3, type: "none" },
    { x: startX + length * 4, y: startY + length * 4, type: "none" },
  ]);
};

module.exports = tutorial;
