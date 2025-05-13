/* global Phaser */

import SplashScene from './splashScene.js'

// Our game scene
const splashScene = new SplashScene()

const config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    backgroundColor: 0xffffff,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
}

const game = new Phaser.Game(config)

// load scene
game.scene.add('splashScene', splashScene)
game.scene.add('scene', titleScene)

game.scene.start('splashScene')
