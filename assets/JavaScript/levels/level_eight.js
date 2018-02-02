const levelEight = {
  floorDimensions: { xRange: 13, yRange: 7 },
  floorData: [
    { x: 11, y: 1, type: "g" },
    { x: 3, y: 5, type: "s" },
    { x: 0, y: 1, type: "w" },
    { x: 1, y: 0, type: "w" },
    { x: 1, y: 1, type: "n" },
    { x: 1, y: 2, type: "w" },
    { x: 2, y: 1, type: "w" },
    { x: 2, y: 4, type: "n" },
    { x: 2, y: 5, type: "n" },
    { x: 2, y: 6, type: "n" },
    { x: 3, y: 1, type: "b" },
    { x: 3, y: 4, type: "n" },
    { x: 3, y: 6, type: "n" },
    { x: 4, y: 1, type: "b" },
    { x: 4, y: 4, type: "n" },
    { x: 4, y: 5, type: "n" },
    { x: 4, y: 6, type: "n" },
    { x: 5, y: 1, type: "h" },
    { x: 5, y: 5, type: "n" },
    { x: 6, y: 1, type: "h" },
    { x: 6, y: 5, type: "n" },
    { x: 7, y: 1, type: "n" },
    { x: 7, y: 5, type: "n" },
    { x: 8, y: 1, type: "b" },
    { x: 8, y: 4, type: "n" },
    { x: 8, y: 5, type: "n" },
    { x: 8, y: 6, type: "n" },
    { x: 9, y: 1, type: "b" },
    { x: 9, y: 4, type: "n" },
    { x: 9, y: 5, type: "w" },
    { x: 9, y: 6, type: "n" },
    { x: 10, y: 0, type: "n" },
    { x: 10, y: 1, type: "n" },
    { x: 10, y: 2, type: "n" },
    { x: 10, y: 4, type: "n" },
    { x: 10, y: 5, type: "n" },
    { x: 10, y: 6, type: "n" },
    { x: 11, y: 0, type: "n" },
    { x: 11, y: 2, type: "n" },
    { x: 12, y: 0, type: "n" },
    { x: 12, y: 1, type: "n" },
    { x: 12, y: 2, type: "n" },
  ],
};

module.exports = levelEight;

// warp: [9, 5], warps to: [0, 1], [1, 0]
// warp: [1, 2], warps to: [1, 2], [0, 1]
// warp: [2, 1], warps to: [0, 1], [2, 1]
// warp: [0, 1], warps to: [1, 0], [2, 1]
// warp: [1, 0], warps to: [5, 1], [7, 1]
// heavySwitch [5, 1] toggles bridges [3-1, 4-1]
// heavySwitch [6, 1] toggles bridges [8-1, 9-1]
// bridges both off by default
