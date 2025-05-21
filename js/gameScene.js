/* global Phaser */ 

class GameScene extends Phaser.Scene{
    constructor(){
        super({key: 'gameScene'})

        this.background = null;
        this.ship = null;
        this.fireMissle = false;
    }

    init(data){
        this.cameras.main.setBackgroundColor('#ffffff')
    }

    preload(){
        console.log('game scene')

        //images
        this.load.image('starBackground', 'assets/starBackground.png')
        this.load.image('ship', 'assets/spaceShip.png')
        this.load.image('misile', 'assets/missile.png')

        //audio
        this.load.audio('laser', 'assets/laser1.wav')
    }

    create(data){
        this.background = this.add.sprite(0, 0, 'starBackground').setScale(2.0)
        this.background.setOrigin(0, 0)

        this.ship = this.physics.add.sprite(1920/2, 1080 - 100, 'ship')

        //Create a group for the missles
        this.missileGroup = this.physics.add.group()
    }

    update(time, delta){
        const keyLeftObj = this.input.keyboard.addKey('LEFT')
        const keyRightObj = this.input.keyboard.addKey('RIGHT')
        const keySpaceObj = this.input.keyboard.addKey('SPACE')

        if(keyLeftObj.isDown === true){
            this.ship.x -= 15
            if(this.ship.x < 0){
                this.ship.x = 0
            }
        }

        if(keyRightObj.isDown === true){
            this.ship.x += 15
            if(this.ship.x > 1920){
                this.ship.x = 1920
            }
        }

        if(keySpaceObj.isDown === true){
            if(this.fireMissle === false){
                //fire a missle
                this.fireMissle = true
                const aNewMissle = this.physics.add.sprite(this.ship.x, this.ship.y, 'misile')
                this.missileGroup.add(aNewMissle)
                this.sound.play('laser')
            }
        }

        if(keySpaceObj.isUp === true){
            this.fireMissle = false
        }

        this.missileGroup.children.each(function (item){
            item.y = item.y - 15
            if(item.y < 0){
                item.destroy()
            }
        })
    }
}

export default GameScene