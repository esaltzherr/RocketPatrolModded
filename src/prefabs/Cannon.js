
var input;
// Rocket prefab
class Cannon extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.add.existing(this);
        this.isFiring = false;
        this.moveSpeed = 2;
        this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx
        this.angle = 0;
    }

    update() {
        this.angle = 1;

    }

    reset(){
        
    }
}