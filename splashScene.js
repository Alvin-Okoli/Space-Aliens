/* global Phaser */

class SplashScene extends Phaser.Scene{
    constructor(){
        super({key: 'splashScene'})
    }

    init (data){
        this.cameras.main.setBackgroundColor('#ffffff')
    }

    preload(){
        console.log('Splash scene')
    }

    create(data){

    }

    update (time, delta){

    }
}

export default SplashScene