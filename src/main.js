/*
Elroy Saltzherr, Modded Rocket Patrol: Seagull Control, 4/18, took about 8-12 hours

Point Breakdown:
Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi) (60): pirate theme
Implement mouse control for player movement and mouse click to fire (20): mouse
Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (20): seagull
*/



let config = {
  type: Phaser.AUTO,
  width: 640,
  height: 480,
  physics: {
    default: "arcade",
    arcade: {
      //debug: true
    }
  },
  scene: [ Menu, Play ]
}



/*
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
  }
*/
let game = new Phaser.Game(config);

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;






