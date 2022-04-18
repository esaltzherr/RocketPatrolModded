// Rocket prefab

class Cannon extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.add.existing(this);
        this.fireCooldown = 100;
        //this.isFiring = false;
        this.moveSpeed = 2;
        this.rotateSpeed = 1;
        this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx
        
    }

    update() {

        let angle = Phaser.Math.Angle.Between(this.x, this.y, input.x, input.y);
        this.angle = angle * (180/Math.PI) + 90;
        // if (keyLEFT.isDown) {
        //     this.angle -= this.rotateSpeed;
        // }
        // else if (keyRIGHT.isDown) {
        //     this.angle += this.rotateSpeed;
        // }


        // fire button
        
        //if (Phaser.Input.Keyboard.JustDown(keyF) && this.fireCooldown == 0) {
          //  console.log("From inside");
          //  this.fireCooldown = 10;
            //this.sfxRocket.play();  // play sfx
        //}


        if (this.fireCooldown != 0) {
            this.fireCooldown -= 1;
        }
    }
        /*
              if (this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
                  this.y -= this.moveSpeed;
              }
              if (this.y <= borderUISize * 3 + borderPadding) {
                  this.isFiring = false;
                  this.y = game.config.height - borderUISize - borderPadding;
              }
          }
      */
        reset(){
            //this.isFiring = false;
            this.y = game.config.height - borderUISize - borderPadding;
        }
    }