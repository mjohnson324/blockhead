const tutorial = (size, startX, startY) => {
  return(
    [
    { x: startX, y: startY, isStart: true },
    { x: startX, y: startY + size },
    { x: startX, y: startY + size * 2 },
    { x: startX, y: startY + size * 3 },
    { x: startX, y: startY + size * 4 },

    { x: startX + size, y: startY },
    { x: startX + size, y: startY + size },
    { x: startX + size, y: startY + size * 2 },
    { x: startX + size, y: startY + size * 3 },
    { x: startX + size, y: startY + size * 4 },

    { x: startX + size * 2, y: startY },
    { x: startX + size * 2, y: startY + size },
    { x: startX + size * 2, y: startY + size * 2, isGoal: true },
    { x: startX + size * 2, y: startY + size * 3 },
    { x: startX + size * 2, y: startY + size * 4 },

    { x: startX + size * 3, y: startY },
    { x: startX + size * 3, y: startY + size },
    { x: startX + size * 3, y: startY + size * 2 },
    { x: startX + size * 3, y: startY + size * 3 },
    { x: startX + size * 3, y: startY + size * 4 },

    { x: startX + size * 4, y: startY },
    { x: startX + size * 4, y: startY + size },
    { x: startX + size * 4, y: startY + size * 2 },
    { x: startX + size * 4, y: startY + size * 3 },
    { x: startX + size * 4, y: startY + size * 4 },
  ]);
};


module.exports = tutorial;
