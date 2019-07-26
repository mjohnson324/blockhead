# Blockhead: an HTML5 Canvas Game

[Play Game](https://www.michael-w-johnson.com/blockhead)

![wireframe](./assets/images/blockhead.png)

## Background

Blockhead is a navigation puzzle game. The goal is to move a block that changes shape to the end of every stage. Counters are set for the current level, time played, number of moves taken, and the number of times the player has fallen off the stage.

Controls: Move the block with arrow keys or the provided buttons

---

## Stack

- **ES6 JavaScript** for game logic and level creation
- **HTML5 Canvas** for rendering
- **Webpack** for tracking dependencies and debugging
- **Jest** for testing

## File Structure

- **blockhead.js**, the root file.

- **game.js**, handling rules and tracking events.

- **levels/**, housing all game levels. Levels are stored as JSON objects representing floor tiles including relative positions and behavior.

- **test/** To facilitate game maintenance, refactoring, and feature updates.

- **game_objects/**, housing the following:

  - **menu.js**, for constructing the start menu

  - **tile.js** to produce floor tiles. Tiles have varying effects.

  - **level_generator.js** to manage levels. This class constructs floors by creating tiles from level data, centers each floor, and tracks the tile at each position.

  - **display.js**, to handle rendering.

  - **clock.js**, to track time.

  - **block.js**, to handle the movement and transformations of the player block.

  - **sound.js**, to control sound effects and music play.

  - **controls.js**, to abstract away game controls.

---

## Contributing

If interested, I could use help with the following:

- Designing more levels
- UI design
- New game features

## Future Ideas

- [ ] **Score Database:** If managaeable, I will add a score database recording the top scores. Not planning to implement this at the present time.
