# JS Project Proposal: Blockhead

### Background:

Blockhead is a game that is based on the 3D puzzle game bloxors, in which the players must move a rectangular prism across a board into a hole. The main difference with this game is that the view will be strictly overhead.

### Functionality & MVP:

Blockhead

- [x] Render tiles to the screen
- [x] Make block movable with arrow keys
- [x] Block falls off board if not set on tiles, resetting level
- [x] Counters track number of falls and move for current game session.
- [x] Level changes when goal is reached

### Architecture and Technologies:

- 'JavaScript' (game logic)
- 'Canvas' (rendering of board tiles and block)
- 'Webpack' (bundling files together)
- 'Sass' (styling page)

#### The game will require the following files:

- 'display.js' to handle rendering of the game.
- 'game.js' to handle the rules of the game.
- 'levels.js' to store information on level progression and floor layouts. Serves as a bundle for all levels.
  + Each level will have its own file detailing the exact position and nature of each tile.
- 'tile.js' to store information on each tile and update them independently.
- 'block.js' (player) to handle the movement logic for the block.
- 'blockhead.js' to start the game and serve as the entry file.

### Wireframes:

![wireframe](./assets/Images/BlockHead.png)

The app is contained in one screen with nav links to my Github and LinkedIn in the top left corner. The block is controlled with the arrow keys, and in the game players can move the block with the arrow keys. Instructions are provided on the bottom of the page for the player's convenience.

### Implementation Timeline:

**Day 1:** Setup the project. Set up Webpack, specifying entry and exit files. Establish project structure: place files into assets folder organized as such:
- CSS/
  + modules/
  + partials/
  + main.scss
  + output.css
- Images/
- Sounds/
- JavaScript/
  + bundle/
  + levels/
  + display.js
  + game.js
  + levels.js
  + tile.js
  + block.js
  + blockhead.js
The rest of the day will be spent learning how Canvas handles rendering. Write 'blockhead.js' and start writing 'game.js' and 'display.js'

**Day 2:** Render the board and movable block. Figure out how the block's size and position change depending on its current shape.
  * First, render a single floor tile to the canvas.
  * Render an entire level next.
    + Levels are designed to be flexible and modular in nature. In the interest of making floor positions and sizes adjustable every tile's position is defined relative to a starting tile.
    + Levels consist of arrays with objects detailing each tile's position and properties (goal, start, etc.)
    + A level generator function then creates an array of tile objects with properties defined by each object in the level array:

```
const levelGenerator = (length) => {
  const levels = [Tutorial(length),
                     LevelOne(length),
                     LevelTwo(length),
                     LevelThree(length)];
  levels.forEach(level => {
    level.forEach((positionData, idx) => {
      level[idx] = new Tile(positionData);
    });
  });
  return levels;
};

// Level files are organized like a grid, with each grouping of objects corresponding to tiles in the same column. Length is a constant dictating the size of the tiles and block.

const levelOne = (length, startX = 330, startY = 240) => {
  return(
    [
      { x: startX, y: startY, type: "start" },
      { x: startX + length * 6, y: startY + length * 3, type: "goal" },

      { x: startX - length, y: startY - length, type: "none" },
      { x: startX - length, y: startY, type: "none" },
      { x: startX - length, y: startY + length, type: "none" },
```

  * The block's movement patterns are complex and as such should be handled by the block directly.

**Day 3:** Set rules for block falling off board reaching goal.
  * Once the block is moving properly the block needs to be bound to the floor.
  * The simplest way to handle this is with the getImageData property of the canvas context. This consists of an array of RGB values for every pixel over a given area.
  * By setting the background to a different RGB value than the floor we can check a block's status by evaluating the RGB values of its new position prior to re-rendering.
  * Evaluating every pixel of the block's new position is a intensive process and unnecessary; instead we can determine a block's status just by evaluating the RGB values at the block's corners:

```
tileMovesOffFloor(coordinates) {
  for(let i = 0; i < coordinates.length; i++) {
    let corner = coordinates[i];
    let point = this.ctx.getImageData(corner[0], corner[1], 1, 1);
    let colorData = point.data.slice(0, 3);
    let color = this.stringifyRGB(colorData);
    if (color === this.backgroundColor) {
      return true;
    }
  }
  return false;
}
```

 * In the event the block moves off the stage its position will be reset to the start tile.

### Bonus Features:

- [ ] 'Make floor destructible:' Normal tiles will disappear after being stepped on x times. The current steps remaining on a tile will be marked by a number.
- [ ] 'Other tile types:' The original game has multiple tiles with functionalities such as switches, different weight-bearing capacities, teleportation, etc.
- [ ] 'Score tracker:' The original game tracks the number of moves a player has taken. It would make for a fun competition if, in addition to tracking a player's current score the game ranked players.
