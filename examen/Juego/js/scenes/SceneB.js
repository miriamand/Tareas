class SceneB extends Phaser.Scene {

    constructor()
    {
        super({ key: 'SceneB'})
    }

     preload ()
{
    this.load.image('sky', 'assets/fondo.jpg');
    this.load.image('ground', 'assets/base.png');
    this.load.image('star', 'assets/diamond.png');
    this.load.image('bomb', 'assets/star.png');
    this.load.spritesheet('dude', 
        'assets/angel.png',
        { frameWidth: 32, frameHeight: 48 }
    );
}

 create ()
{
    //cielo
    this.add.image(400, 300, 'sky');

    //plataformas
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    this.platforms.create(590, 400, 'ground');
    this.platforms.create(40, 250, 'ground');
    this.platforms.create(740, 220, 'ground');
    
    //jugador
    this.player = this.physics.add.sprite(100, 450, 'dude');
this.player.setBounce(0.2);
this.player.setCollideWorldBounds(true);
this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 2 }),
    frameRate: 10,
    repeat: -1
});
this.anims.create({
    key: 'turn',
    frames: [ { key: 'dude', frame: 4 } ],
    frameRate: 20
});
this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
});
this.physics.add.collider(this.player, this.platforms);

//estrellas
this.stars = this.physics.add.group({
    key: 'star',
    repeat: 11,
    setXY: { x: 12, y: 0, stepX: 70 }
});

this.stars.children.iterate(function (child) {

    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    
});

//puntaje
this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#fff' });
this.score = 0;

//bombas
this.bombs = this.physics.add.group();

this.physics.add.collider(this.bombs, this.platforms);

this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
}
 update ()
{
    //movimiento
    this.cursors = this.input.keyboard.createCursorKeys();
    if (this.cursors.left.isDown)
{
    this.player.setVelocityX(-160);

    this.player.anims.play('left', true);
}
else if (this.cursors.right.isDown)
{
    this.player.setVelocityX(160);

    this.player.anims.play('right', true);
}
else
{
    this.player.setVelocityX(0);

    this.player.anims.play('turn');
}

if (this.cursors.up.isDown && this.player.body.touching.down)
{
    this.player.setVelocityY(-330);
}
this.physics.add.collider(this.stars, this.platforms);
this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

}

 collectStar (player, star)
{
    star.disableBody(true, true);
    this.score += 10;
    this.scoreText.setText('Score: ' + this.score);
    if (this.stars.countActive(true) === 0)
    {
        this.stars.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

        });

        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var bomb = this.bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);



    }
}
 hitBomb (player, bomb)
{
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('off');

    this.gameOver = true;

this.text1 = this.add.text(300, 250, 'Perdiste', { font: "50px Arial Black", fill: "#fff" });
    this.text1.setStroke('#00f', 16);
    this.text1.setShadow(2, 2, "#333333", 2, true, true);
    //reinicio
    this.text2 = this.add.text(150, 350, 'Click para reiniciar', { font: "50px Arial Black", fill: "#fff"});
    this.text2.setStroke('#00f', 16);
    this.text2.setShadow(2, 2, "#333333", 2, true, true);
    this.input.on('pointerdown', function () {
    this.scene.restart('SceneB');
    this.score=0;
    }, this);
   
}

}
export default SceneB;