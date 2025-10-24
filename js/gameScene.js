/* global Phaser */ 

class GameScene extends Phaser.Scene{

    // create an alien
    createAlien(){
        const alienXLocation = Math.floor(Math.random() * 400)+20;
        const alienYLocation = Math.floor(Math.random() * 50)*-1;
        const anAlien = this.physics.add.sprite(alienXLocation, -20, 'alien').setScale(0.3)
        anAlien.body.velocity.y = 200
        this.aliensGroup.add(anAlien)
    }

    createRock(){
        const rockXlocation = Math.floor(Math.random()*400)+20;
        const rockYLocation = Math.floor(Math.random() * 50)*-1;
        const randomRock = Math.floor(Math.random()*10)+1;

        let aRock;
        if(randomRock === 1 || randomRock === 2){
            aRock = this.physics.add.sprite(rockXlocation, rockYLocation, `rock${randomRock}`).setScale(0.6);
            aRock.health = 2;
        } 
        else if(randomRock === 9){
            aRock = this.physics.add.sprite(rockXlocation, rockYLocation, `rock${randomRock}`).setScale(1.2);
            aRock.health = 4;
        } 
        else {
            aRock = this.physics.add.sprite(rockXlocation, rockYLocation, `rock${randomRock}`).setScale(0.8);
            aRock.health = 3;
        }
        this.rockGroup.add(aRock);
        aRock.body.velocity.y = 200;
        aRock.maxHealth = aRock.health;
        

        for(let i=0; i<4; i++){
            const smallrockXlocation = Math.floor(Math.random()*400)+20;
            const smallrockYLocation = Math.floor(Math.random() * 50)*-1;            
            const smallRock = this.physics.add.sprite(smallrockXlocation, smallrockYLocation, 'rock3').setScale(0.3)
            this.rockGroup.add(smallRock);
            smallRock.health = 1;
            smallRock.maxHealth = smallRock.health;
            smallRock.body.velocity.y = 200            
        }
    }

    constructor(){
        super({key: 'gameScene'})

        this.background = null;
        this.ship = null;
        this.fireMissle = false;
        this.touchFire = false;
        this.score = 0;
        this.scoreText = null;
        this.scoreTextStyle = { font: '30px Arial', fill: '#ffffff', align: 'center' };

        this.gameText = null;
        this.gameTextStyle = { font: '30px Times', fill: '#ff0000', align: 'center' }
    }

    init(data){
        this.cameras.main.setBackgroundColor('#ffffff')
    }

    preload(){
        console.log('game scene')

        //images
        this.load.image('starBackground', './assets/space.jpeg')
        this.load.image('ship', './assets/ship.png')
        this.load.image('misile', './assets/missile.png')
        this.load.image('alien', './assets/alien.png')

        //audio
        this.load.audio('laser', './assets/laser1.wav')
        this.load.audio('explosion', './assets/barrelExploding.wav')
        this.load.audio('bomb', './assets/bomb.wav')
    }

    create(data){
        this.background = this.add.sprite(0, 0, 'starBackground').setScale(0.8)
        this.background.setOrigin(0, 0)

        // Rock group
        this.rockGroup = this.physics.add.group({});

        //Create a group for the missles and aliens, Also create the first alien
        this.missileGroup = this.physics.add.group()
        this.aliensGroup = this.add.group()
        this.createRock();
        this.createAlien();
        

        //add the ship
        this.ship = this.physics.add.sprite(450/2, 800 - 100, 'ship').setScale(0.3)
        this.ship.setInteractive({draggable: true})
        this.ship.setCollideWorldBounds(true)
        this.ship.on('drag', (pointer, dragX, dragY)=>{
            this.ship.x = dragX
            this.ship.y = dragY
            
        })
        this.ship.on('pointerdown', ()=>{
            this.touchFire = true;
        })

        // Touch to loop fire
        this.time.addEvent({
            delay: 200,
            callback: ()=>{
                if(this.touchFire === true){
                const aNewMissile = this.physics.add.sprite(this.ship.x-20, this.ship.y, 'misile').setScale(0.5)
                const bNewMissile = this.physics.add.sprite(this.ship.x+20, this.ship.y, 'misile').setScale(0.5)
                this.missileGroup.add(aNewMissile)
                this.missileGroup.add(bNewMissile)
                // this.sound.play('laser')
                }
            },
            loop: true  
        })

        // Collision between missles and aliens
        this.physics.add.collider(this.missileGroup, this.aliensGroup, (missileCollide, alienCollide)=>{
            missileCollide.destroy()
            alienCollide.destroy()
            // this.sound.play('explosion')
            this.score += 1;
            this.scoreText.setText('Score: ' + this.score.toString())
            if(this.score === 40){
                this.level = 2;
                this.gameText = this.add.text(450/2, 800 - 600, 'Level 2', this.gameTextStyle).setOrigin(0.5)
            }
            if(this.aliensGroup.getLength()<10 && this.level === 1){
                this.createAlien()
                this.createAlien()
                console.log(this.aliensGroup.getLength())
            }
        })

        // Score and Pause text
        this.scoreText = this.add.text(10, 10, 'Score: ' + this.score.toString(), this.scoreTextStyle);
        this.pauseText = this.add.text(400-50, 10, 'Pause', this.scoreTextStyle);
        this.pauseText.setInteractive({useHandCursor: true})
        this.pauseText.on('pointerup', ()=>{
            this.startButton.setVisible(true);
            this.menuButton.setVisible(true);

            this.physics.pause();
            this.touchFire = false;
        })

        //Collision between ship and alien
        this.physics.add.collider(this.ship, this.aliensGroup, (shipCollide, alienCollide)=>{
            this.sound.play('bomb')
            this.physics.pause();
            shipCollide.destroy();
            alienCollide.destroy();
            this.touchFire = false;
            this.gameOverText = this.add.text(450/2, 800 - 600, 'Game Over!\nScore: ' + this.score, this.gameTextStyle).setOrigin(0.5)

            this.startButton.setVisible(true);
            this.menuButton.setVisible(true);
        })

        this.physics.add.collider(this.missileGroup, this.rockGroup, (missile, rock)=>{
            missile.destroy();
            rock.health -= 1;
            
            if(rock.health === 0){
                rock.destroy();
                this.score += rock.maxHealth;
                this.scoreText.setText('Score: '+ this.score.toString())
            }
        })

        this.time.addEvent({
            delay: 2000,
            callback: ()=>{
                this.createAlien();
                this.createRock();
                this.createRock();
                this.createAlien();
                // this.gameText.setText('')
            },
            loop: true  
        })

        // this.time.addEvent({
        //     delay: 3000,
        //     callback: ()=> this.createRock(),
        //     loop: true
        // })

        // Menu and Restart buttons
        this.startButton = this.add.sprite(450/2, 400 , 'startButton').setScale(0.4).setVisible(false);
        this.menuButton = this.add.sprite(450/2, 480, 'menuButton').setScale(0.4).setVisible(false);
        this.startButton.setInteractive({useHandCursor: true})
        this.startButton.on('pointerdown', ()=>{
        this.scene.start('gameScene')
        this.score = 0;
        })

        this.menuButton.setInteractive({useHandCursor: true})
        this.menuButton.on('pointerdown', ()=>{
        this.scene.start('menuScene')
        })
        // Menu and Restart buttons end
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
                const aNewMissile = this.add.rectangle(this.ship.x, this.ship.y, 10, 50, '#000000ff')
                this.missileGroup.add(aNewMissile)
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
