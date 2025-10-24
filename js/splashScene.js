/* global Phaser */

class SplashScene extends Phaser.Scene{
    constructor(){
        super({key: 'splashScene'})
        this.splashSceneBackgroundImage = null
    }

    init (data){
        this.cameras.main.setBackgroundColor('#ffffff')
    }

    preload(){
        console.log('Splash scene')
        this.load.image('devin', './assets/devin.png')
    }

    create(data){
        this.splashSceneBackgroundImage = this.add.image(450/ 2, 800/ 2, 'devin').setScale(0.4)
        this.time.delayedCall(3000, ()=>this.scene.start('titleScene'))
    }

    update (time){3
    }
}

export default SplashScene