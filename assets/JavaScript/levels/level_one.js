const levelOne = (length, startX = 300, startY = 180) => {
  return(
    [
      { x: startX, y: startY, type: "start" },
      { x: startX + length * 10, y: startY, type: "goal" },

      { x: startX + length, y: startY, type: "none" },
      { x: startX + length * 2, y: startY, type: "none" },
      { x: startX + length * 3, y: startY, type: "none" },
      { x: startX + length * 4, y: startY, type: "none" },
      { x: startX + length * 5, y: startY, type: "none" },
      { x: startX + length * 6, y: startY, type: "none" },
      { x: startX + length * 7, y: startY, type: "none" },
      { x: startX + length * 8, y: startY, type: "none" },
      { x: startX + length * 9, y: startY, type: "none" }
    ]
  );
}

module.exports = levelOne;
