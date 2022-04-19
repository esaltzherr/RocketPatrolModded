


var mouse;
var input;


class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('cannonball', './assets/cannonball.png');
        this.load.image('cannon', './assets/cannon.png');
        this.load.image('seagul', './assets/seagul.png');
        this.load.image('waves', './assets/waves.png');
        this.load.image('wall', './assets/wall.png');
        this.load.image('parrot', './assets/parrot.png');
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', { frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9 });

    }

    create() {
        this.rockets = this.physics.add.group();
        //this.rockets.enableBody = true;
        this.ships = this.physics.add.group();
        this.parrots = this.physics.add.group();
        //this.ships.enableBody = true;

        //wall boundry because sprite collisions
        this.walls = this.physics.add.group();


        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'waves').setOrigin(0, 0);
        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        // add rocket (p1)
        //this.physics.add.sprite(100,100,"spaceship");
        this.cannon = new Cannon(this, game.config.width / 2, game.config.height - borderUISize - borderPadding, 'cannon').setOrigin(0.5, 0);

        // mouse input position
        input = this.input;
        mouse = this.input.mousePointer;



        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // add spaceships (x3)
        // this.ship01 = new Spaceship(this, game.config.width + borderUISize * 6, borderUISize * 4, 'seagul', 0, 30).setOrigin(0, 0);
        // this.ship02 = new Spaceship(this, game.config.width + borderUISize * 3, borderUISize * 5 + borderPadding * 2, 'seagul', 0, 20).setOrigin(0, 0);
        // this.ship03 = new Spaceship(this, game.config.width, borderUISize * 6 + borderPadding * 4, 'seagul', 0, 10).setOrigin(0, 0);
        
        this.walls.create(-50,0,'wall');
        this.shipstartingx = 700;
        this.parrotstartingx = 700;
        let shipspeed = 300;
        var j = this.ships.create(this.shipstartingx, 150, 'seagul');
        this.physics.moveTo(j, j.x -10, j.y, shipspeed);
        j = this.ships.create(this.shipstartingx, 200, 'seagul');
        this.physics.moveTo(j, j.x -10, j.y, shipspeed);
        j = this.ships.create(this.shipstartingx, 250, 'seagul');
        this.physics.moveTo(j, j.x -10, j.y, shipspeed);
        var p = this.parrots.create(this.parrotstartingx, 120, 'parrot');
        this.physics.moveTo(p, p.x -10, p.y, 500);


        //this.cannon = new Cannon(this, 100, 100, 'cannon', 0 ,10);

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0 }),
            frameRate: 30
        });
        // initialize score
        this.score = 0;
        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 2, this.score, scoreConfig);
        // GAME OVER flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width / 2, game.config.height / 2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }

    update() {
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        this.starfield.tilePositionX -= 4;
        if (!this.gameOver) {
            this.cannon.update();
            //this.p1Rocket.update();         // update rocket sprite
            // this.ship01.update();           // update spaceships (x3)
            // this.ship02.update();
            // this.ship03.update();

        }
        //console.log(this.cannon.fireCooldown);
        //console.log(Phaser.Input.Keyboard);
        //console.log(this.cannon.fireCooldown);
        if (mouse.isDown && this.cannon.fireCooldown <= 0) {
            
            this.fire();

        }

        // collisons
        this.physics.add.overlap(this.ships, this.rockets, this.collide, null, this);
        this.physics.add.overlap(this.ships, this.walls, this.rocketReset, null, this);
        this.physics.add.overlap(this.parrots, this.rockets, this.parrotpoints, null, this);
        this.physics.add.overlap(this.parrots, this.walls, this.parrotReset, null, this);


        // check collisions

        //for(let i = spaceships.length; i > 0; i--){


        //}

        // // check collisions
        // if (this.checkCollision(this.p1Rocket, this.ship03)) {
        //     this.p1Rocket.reset();
        //     this.shipExplode(this.ship03);
        // }
        // if (this.checkCollision(this.p1Rocket, this.ship02)) {
        //     this.p1Rocket.reset();
        //     this.shipExplode(this.ship02);
        // }
        // if (this.checkCollision(this.p1Rocket, this.ship01)) {
        //     this.p1Rocket.reset();
        //     this.shipExplode(this.ship01);
        // }

    }
    // checkCollision(rocket, ship) {
    //     // simple AABB checking
    //     if (rocket.x < ship.x + ship.width &&
    //         rocket.x + rocket.width > ship.x &&
    //         rocket.y < ship.y + ship.height &&
    //         rocket.height + rocket.y > ship.y) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }
    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after ani completes
            //ship.reset();                       // reset ship position
            //ship.alpha = 1;                     // make ship visible again
            //boom.destroy();                     // remove explosion sprite
        });
        // score add and repaint
        this.score += 10;
        this.scoreLeft.text = this.score;
    }
    fire() {
        let rocketSpeed = 400;
        //let rocket = this.physics.add.sprite(this.cannon.x, this.cannon.y, 'cannonball');
        //this.physics.moveTo(rocket, input.x, input.y, rocketSpeed);
        
        var h = this.rockets.create(this.cannon.x, this.cannon.y, 'cannonball');
        h.angle = this.cannon.angle;
        this.physics.moveTo(h, input.x, input.y, rocketSpeed);
        
        this.cannon.fireCooldown = 100;
        this.cannon.sfxRocket.play();  // play sfx
        //console.log(this.rockets);
    }
    rocketReset(ships, walls){
        ships.x = this.shipstartingx;
    }
    parrotReset(parrots, walls){
        parrots.x = this.parrotstartingx;
    }
    collide(ships, rockets){
        this.score += 10;
        this.scoreLeft.text = this.score;
        ships.x = this.shipstartingx;
        rockets.destroy();
    }
    parrotpoints(parrots, rockets){
        this.score += 50;
        this.scoreLeft.text = this.score;
        parrots.x = this.shipstartingx;
        rockets.destroy();
    }
}