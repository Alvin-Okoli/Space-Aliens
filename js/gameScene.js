/* global Phaser */ 

class GameScene extends Phaser.Scene{
    constructor(){
        super({key: 'gameScene'})
    }

    init(data){
        this.cameras.main.setBackgroundColor('#ffffff')
    }

    preload(){
        console.log('game scene')
    }

    create(data){

    }

    update(time, delta){

    }
}

export default GameScene