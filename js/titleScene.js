/* global Phaser */

class TitleScene extends Phaser.Scene{

    constructor(){
        super({key: 'titleScene'})
    }

    init(data){
        this.camera.main.setBackgroundColor('#111111')
    }

    preload(){
        console.log('title scene')
    }

    create(data){

    }

    update(time, delta){

    }
}

export default TitleScene