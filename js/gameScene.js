/* global Phaser */ 

class GameScene extends Phaser.Scene{
    constructor(){
        super({key: 'gameScene'})

        this.background = null;
        this.ship = null;
    }

    init(data){
        this.cameras.main.setBackgroundColor('#ffffff')
    }

    preload(){
        console.log('game scene')

        //images
        this.load.image('starBackground', 'assets/starBackground.png')
        this.load.image('ship', 'assets/spaceShip.png')
    }

    create(data){
        this.background = this.add.sprite(0, 0, 'starBackground').setScale(2.0)
        this.background.setOrigin(0, 0)

        this.ship = this.physics.add.sprite(1920/2, 1080 - 100, 'ship')
    }

    update(time, delta){
        const keyLeftObj = this.input.keyboard.addKey('LEFT')
        const keyRightObj = this.input.keyboard.addKey('RIGHT')

        if(keyLeftObj.isDown){
            this.ship.x -= 15
            if(this.ship.x < 0){
                this.ship.x = 0
            }
        }

        if(keyRightObj.isDown){
            this.ship.x += 15
            if(this.ship.x > 1920){
                this.ship.x = 1920
            }
        }
    }
}

export default GameScene