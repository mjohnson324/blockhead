# Blockhead: an HTML5 Canvas Game

### Background:

Blockhead is a game that is based on the 3D puzzle game bloxors, in which the players must move a rectangular prism across a board into a hole. The main difference with this game is the 2D overhead perspective.

- Controls: Move the block with arrow keys
- Counters are set for the current level as well as the time, number of moves taken thus far, and total number of falls for a current game session.

**Notice**: This game is (currently) not accessible from mobile devices. A keyboard is required to play the game. I may change this in the future with, say, page buttons that can be used to control the block. I do not consider this approach ideal as they would lack responsiveness.

### Architecture and Technologies:

- 'JavaScript' (game logic)
- 'Canvas' (rendering of board tiles and block)
- 'Webpack' (bundling files together)
- 'SASS' (styling page)

### File Structure:

- **blockhead.js**, the root file for the game.
- **page_buttons.js** to handle all buttons on the page including sound and tutorial display.
- **game.js** to handle the rules of the game and bring other game files together.
  - **menu.js**, the start menu with various options
  - **display.js** to handle rendering.
    - **clock.js** to keep track of session lengths.
  - **block.js** to handle the movement and transformations of the player block.
  - **sound.js** to control when sound effects and music play.
  - **level_generator.js** to manage levels. This class handles the construction of floors, creating sets of tiles for each level. for the current level it also tracks the relationships between tiles and state of each tile.
    - **tile.js** to store information on individual floor tiles.
+ Level and tile data are stored in the **levels** directory, one file for each level with data for each tile making up a floor. Levels are aggregated together into one object.

### Screenshot:

![wireframe](./assets/Images/BlockHead.png)

Level files consist of arrays of objects, with each object consisting of data for a tile object. Tile objects are organized like a grid, with each grouping of objects corresponding to tiles in the same column (save for the start and goal tile). Length is a constant dictating the size of the tiles and block to allow for easy resizing.

``` JavaScript
const levelOne = (length, startX = 330, startY = 240) => {
  return(
    [
      { x: startX, y: startY, type: "start" },
      { x: startX + length * 6, y: startY + length * 3, type: "goal" },

      { x: startX - length, y: startY - length, type: "none" },
      { x: startX - length, y: startY, type: "none" },
      { x: startX - length, y: startY + length, type: "none" },
```

Level Data is fed to the level generator (code below), which takes each level array and constructs arrays of tile objects to track floor information during play.

``` JavaScript
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
```

### Future Features:

[ ] 'Make floor destructible:' Normal tiles will disappear after being stepped on x times. The current steps remaining on a tile will be marked by a number.

[ ] 'Other tile types:' The original game has multiple tiles with functionalities such as switches, different weight-bearing capacities, teleportation, etc.

[ ] 'Score tracker:' The original game tracks the number of moves a player has taken. It would make for a fun competition if, in addition to tracking a player's current score the game ranked players. I've considered Firebase as a possible server option.

[ ] 'Mobile access': In the spirit of introducing my game to more people I may also adapt the game to mobile devices. I do not yet know of an ideal way to implement mobile controls.
