/* global Phaser */

import SplashScene from './splashScene.js'
import TitleScene from './titleScene.js'
import MenuScene from './menuScene.js';
import GameScene from './gameScene.js';

const config = {
    type: Phaser.AUTO,
    width: 450,
    height: 800,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    backgroundColor: 0xffffff,
    scene: [  MenuScene, GameScene],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    }
}

const game = new Phaser.Game(config)

// SplashScene, TitleScene, ,