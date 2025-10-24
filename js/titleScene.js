/* global Phaser */

class TitleScene extends Phaser.Scene{

    constructor(){
        super({key: 'titleScene'})

        this.titleSceneBackgroundImage = null
        this.titleSceneText = null
        this.titleSceneTextStyle = {font: '60px Times', fontWeight: '10px', fill: '#ece757ff', align: 'center'}
        this.devTextStyle = {font: '40px Times', fontWeight: '10px', fill: '#ffffff', align: 'center'}
    }

    init(data){
        this.cameras.main.setBackgroundColor('#ffffff')
    }

    preload(){
        console.log('title scene')
        this.load.image('titleSceneBackground', './assets/Night Sky Background Picture Wallpaper Image For Free Download - Pngtree.jpeg')
        this.load.image('titleShip', './assets/whitespaceship.png')

    }

    create(data){
        this.titleSceneBackgroundImage = this.add.sprite(450/2, 800/2, 'titleSceneBackground').setScale(0.6, 1.2)

        this.titleSceneText = this.add.text(450 / 2 , 80, 'Space Aliens', this.titleSceneTextStyle).setOrigin(0.5)

        this.titleShip = this.add.image(450 / 2 , 800/2, 'titleShip').setScale(0.5)

        this.developer = this.add.text(450 / 2 , 750, 'Dev Vin⚙️', this.devTextStyle).setOrigin(0.5)

        this.time.delayedCall(3000, ()=>this.scene.start('menuScene'))
    }

    update(time, delta){
    }
}

export default TitleScene