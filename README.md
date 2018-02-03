# Blockhead: an HTML5 Canvas Game

### Background:

Blockhead is a game that is based on the 3D puzzle game bloxors, in which the players must move a rectangular prism across a board into a hole. The main difference with this game is the 2D overhead perspective.

- Controls: Move the block with arrow keys
- Counters are set for the current level as well as the time, number of moves taken thus far, and total number of falls for a current game session.

**Notice**: This game is (currently) not accessible from mobile devices. A keyboard is required to play the game. I may change this in the future with, say, page buttons that can be used to control the block. I do not consider this approach ideal as I've noticed lag in the responsiveness of page buttons on mobile phones.

### Architecture and Technologies:

- 'JavaScript' (game logic)
- 'Canvas' (rendering of board tiles and block)
- 'Webpack' (bundling files together)
- 'SASS' (styling page)
- 'Jest' (game testing)

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
+ Tests are stored in the **test** directory and assist in preventing bugs and adding documentation via a test-driven development approach.

### Screenshot:

![wireframe](./assets/Images/BlockHead.png)

Here's an example code snippet of level data:

``` JavaScript
const levelOne = {
  floorDimensions: { xRange: 10, yRange: 1, },
  floorData: [
    { x: 0, y: 0, type: "s" },
    { x: 9, y: 0, type: "g" },
    { x: 1, y: 0, type: "n" },
    { x: 2, y: 0, type: "n" },
    { x: 3, y: 0, type: "n" },
```

The goal of the above code is to store information on levels in a dynamic and minimalistic manner. I want players to be able to adjust tile size when starting the game to make the game more visually accessible. I also want floors to always be centered so the game looks more professional. To that end I only store the tile's type which dictates its behavior, and its position relative to other tiles in a level. The floorDimensions is used to center a floor based on the tile size chosen by the player, which is then used to to position each tile individually.


``` JavaScript
setCoordinates(floorData, startPosition) {
  const newFloor = {};
  floorData.forEach(tileData => {
    let tileOptions = this.constructTileCoordinates(tileData, startPosition);
    let tile = new Tile(tileOptions);
    let tilePosition = `[${tile.xPos}, ${tile.yPos}]`;
    newFloor[tilePosition] = tile;
  });
  return newFloor;
}

lookupTile(position) {
  const currentPosition = `[${position.xPos}, ${position.yPos}]`;
  return this.constructedFloor[currentPosition];
}
```

*setCoordinates* constructs a floor for gameplay, consisting of tiles where each key represents the tile's position on the floor. I use an object instead of an array for instant lookup. Any time the player makes a move *lookupTile* can be used to look up the tile at their location to enable various actions (reaching the goal, pressing a button, etc.)

### Future Features:

[ ] (In progress) 'Other tile types:' The original game has multiple tiles with functionalities such as switches, different weight-bearing capacities, teleportation, etc.

[ ] 'Score tracker:' The original game tracks the number of moves a player has taken. It would make for a fun competition if, in addition to tracking a player's current score the game ranked players. I've considered Firebase as a possible server option.

[ ] 'Mobile access': In the spirit of introducing my game to more people I may also adapt the game to mobile devices. I do not yet know of an ideal way to implement mobile controls.
