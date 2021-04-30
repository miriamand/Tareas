import SceneB from './SceneB.js'

class SceneA extends Phaser.Scene
{
    constructor ()
    {
        super({ key: 'SceneA', active: true});
        this.i = 0;
    }

    preload()
    {
        this.load.image('fondo', 'assets/open.png');
    }

    create ()
    {
        this.add.image(400, 300, 'fondo');

        this.hsv = Phaser.Display.Color.HSVColorWheel();
        //  Rainbow Text
        this.text1 = this.add.text(250, 150, 'Comenzar', { font: "50px Arial Black"});

        this.input.on('pointerdown', function () {
            this.cameras.main.fadeOut(100, 0, 0, 0);
        }, this);

        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.isSleeping('SceneA');
            this.scene.add('SceneB', new SceneB, true, {x:0,y:0});
            this.scene.moveUp('SceneB');
        })

    }

    update ()
    {
        const top = this.hsv[this.i].color;
        const bottom = this.hsv[359 - this.i].color;

        this.text1.setTint(top, top, bottom, bottom);
        this.i++;

        if (this.i === 360)
        {
            this.i = 0;
        }
    }
}
export default SceneA;