# JS Project Proposal: Blockhead

### Background:

Blockhead is a game that is based on the 3D puzzle game bloxors, in which the players must move a rectangular prism across a board into a hole. The main difference with this game is the 2D overhead perspective.

- Controls: Move the block with arrow keys
- Counters are set for the current level as well as the time and total number of moves and falls for a current game session.

### Architecture and Technologies:

- 'JavaScript' (game logic)
- 'Canvas' (rendering of board tiles and block)
- 'Webpack' (bundling files together)
- 'SASS' (styling page)

### File Structure:

- **blockhead.js**, the root file for the game.
- **display.js** to handle rendering.
- **block.js** to handle the movement and transformations of the player block.
- **sound.js** to control when sound effects and music play.
- **page_buttons.js** to handle all buttons on the page including sound and tutorial display.
- **tile.js** to store information on individual floor tiles.
- **level_generator.js** to store information on level progression and create floors consisting of tile objects. Serves as a bundle for all levels.
  + Level and tile data are stored in the **levels** directory, one file for each level with data for each tile making up a floor.
- **game.js** to handle the rules of the game and bring other game files together.

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

Level Data is fed to the level generator, which takes each level array and constructs arrays of tile objects to track floor information during play.

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
