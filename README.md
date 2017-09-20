# JS Project Proposal: Blockhead

### Background:

Blockhead is a game that is based on the 3D puzzle game bloxors, in which the players must move a rectangular prism across a board into a hole. The main difference with this game is that the view will be strictly overhead.

### Functionality & MVP:

Blockhead

- [x] Render tiles to the screen
- [x] Make block movable with arrow keys
- [x] Block falls off board if not set on tiles, resetting level
- [x] Level changes when goal is reached

### Architecture and Technologies:

- 'JavaScript' (game logic)
- 'Canvas' (rendering of board tiles and block)
- 'Webpack' (bundling files together)

The game will require the following files:

- 'display.js' to handle rendering of the game.
- 'game.js' to handle the rules of the game.
- 'levels.js' to store information on level progression and floor layouts. Serves as a bundle for all levels.
  + Each level will have its own file detailing the exact position and nature of each tile.
- 'tile.js' to store information on each tile and update them independently.
- 'block.js' to handle the movement logic for the block.
- 'blockhead.js' to start the game and serve as the entry file.

### Wireframes:

![wireframe](./assets/Images/BlockHead.png)

The app is contained in one screen with nav links to my Github and LinkedIn in the top left corner. Control of the game is toggled with the mouse, and in the game players can move the block with the arrow keys. Instructions are provided on the bottom of the page for the player's convenience, and a tutorial level will also be provided to give the player room to feel out the game.

### Implementation Timeline:

**Day 1:** Setup the project.

**Day 2:** Render the board and movable block.

**Day 3:** Set rules for block falling off board reaching goal.

### Bonus Features:

- [ ] 'Make floor destructible:' Tiles will disappear after being stepped on x times. The current steps remaining on a tile will be marked by a number.
- [ ] 'Other tile types:' The original game has multiple tiles with functionalities such as switches, different weight-bearing capacities, teleportation, etc.
- [ ] 'Score tracker:' The original game tracks the number of moves a player has taken. It would make for a fun competition if, in addition to tracking a player's current score the game ranked players.
