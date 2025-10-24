/* global Phaser */ 

class MenuScene extends Phaser.Scene{
    constructor(){
        super({key: 'menuScene'})

        this.menuSceneBackgroundImage = null
        this.startButton = null
    }

    init(data){
        this.cameras.main.setBackgroundColor('#ffffff')
    }

    preload(){
        console.log('menu scene')
        this.load.image('menuSceneBackground', './assets/aliens_screen_image2.jpg')
        this.load.image('startButton', './assets/start.png')
        this.load.image('menuButton', './assets/menu_button.png')
        for(let i=0; i<11; i++){
            this.load.image(`rock${i+1}`, `assets/rock/rock${+i+1}.png`)
        }
    }

    create(data){
        this.menuSceneBackgroundImage = this.add.sprite(450/2, 800/2, 'menuSceneBackground').setScale(0.8, 1.2)

        this.startButton = this.add.sprite(400/2, 800/2 , 'startButton').setScale(0.5)
        this.startButton.setInteractive({useHandCursor: true})
        this.startButton.on('pointerup', ()=>this.clickButton())

        this.rock1 = this.add.sprite(50, 700, 'rock1').setScale(0.6)
        this.rock2 = this.add.sprite(400, 700, 'rock2').setScale(0.6)
        this.rock3 = this.add.sprite(200, 700, 'rock3').setScale(0.3)
        this.rock4 = this.add.sprite(100, 500, 'rock4').setScale(0.8)
        this.rock5 = this.add.sprite(300, 500, 'rock5').setScale(0.8)
        this.rock6 = this.add.sprite(200, 300, 'rock6').setScale(0.8)
        this.rock7 = this.add.sprite(350, 300, 'rock7').setScale(0.8)  
        this.rock8 = this.add.sprite(100, 200, 'rock8').setScale(0.8)
        this.rock9 = this.add.sprite(300, 200, 'rock9').setScale(1.)
        this.rock10 = this.add.sprite(200, 100, 'rock10').setScale(0.8)
        this.rock11 = this.add.sprite(350, 100, 'rock11').setScale(0.8)       
        // this.rock12 = this.add.sprite(100, 400, 'rock12').setScale(1.2)
    }

    update(time, delta){

    }

    clickButton(){
        this.scene.start('gameScene')
    }
}

export default MenuScene