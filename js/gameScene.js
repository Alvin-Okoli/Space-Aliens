/* global Phaser */ 

class GameScene extends Phaser.Scene{

    // create an alien
    createAlien(){
        const alienXLocation = Math.floor(Math.random() * 1920) + 1
        let alienXvelocity = Math.floor(Math.random() * 50) + 1
        alienXvelocity = Math.round(Math.random())? 1 : -1
        const anAlien = this.physics.add.sprite(alienXLocation, -100, 'alien')
        anAlien.body.velocity.y = 200
        anAlien.body.velocity.x = 200
        this.aliensGroup.add(anAlien)
    }

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
        this.load.image('alien', 'assets/alien.png')

        //audio
        this.load.audio('laser', 'assets/laser1.wav')
        this.load.audio('explosion', 'assets/barrelExploding.wav')
    }

    create(data){
        this.background = this.add.sprite(0, 0, 'starBackground').setScale(2.0)
        this.background.setOrigin(0, 0)

        this.ship = this.physics.add.sprite(1920/2, 1080 - 100, 'ship')

        //Create a group for the missles
        this.missileGroup = this.physics.add.group()
        this.aliensGroup = this.add.group()
        this.createAlien()

        // Collision between missles and aliens
        this.physics.add.collider(this.missileGroup, this.aliensGroup, function(missileCollide, alienCollide){
            missileCollide.destroy()
            alienCollide.destroy()
            this.sound.play('explosion')
            this.createAlien()
            this.createAlien()
        }.bind(this))
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