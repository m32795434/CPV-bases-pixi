import { AnimatedSprite, Assets, Text, Ticker } from "pixi.js";
import { FlowerWithHat } from "../models/Flower-with-hat";
import { StonePaperGame } from "../models/StonePaperGame";
import { sound } from "@pixi/sound";
import { Platform } from "../models/Platform";
import { finalScreenWidth } from "..";
import { AniGangnam } from "../models/AniGangnam";
import { Scene } from "../interfaces/Scene";
import { AnimatedPlayer } from "../models/AnimatedPlayer";

export let aniGangnamScaleFactor = .2;
export let aniZombieScaleFactor = 1.2;
export let platfomScaleFactor = .1;

export class Onboarding extends Scene {

    constructor() {
        super();
        (async () => {
            await Assets.load('ShortStack Regular.ttf')
            await Assets.load('Roboto-Italic.ttf')
            const zombieBundle = await Assets.loadBundle('zombie')

            this._plats = []

            const aniGangnam: AniGangnam = new AniGangnam();
            aniGangnam.scale.set(aniGangnamScaleFactor)
            aniGangnam.interactive = true;
            aniGangnam.on('pointerup', this.handlePlayPause, this)

            // const triangle4: Triangle = new Triangle();
            // triangle4.position.set(0, 125)
            // triangle4.scale.set(.3)

            const title = new Text({
                text: '¡ONBOARDING!',
                style: { fontFamily: 'ShortStack Regular' }
            })
            title.anchor.set(.5)
            title.position.set(finalScreenWidth / 2, 20)

            const flowerToptWithHat: FlowerWithHat = new FlowerWithHat();
            //all contanier's properties, FIRST
            // flowerToptWithHat.pivot.set(flowerToptWithHat.width, flowerToptWithHat.height)
            flowerToptWithHat.scale.set(0.5)
            flowerToptWithHat.position.set(finalScreenWidth - 100, 150)


            const version: Text = new Text({
                text: "¡V8🚀!",
                style: {
                    fontFamily: "ShortStack Regular",
                    fontSize: 40,
                    fill: 0x900000
                }
            })
            version.position.set(finalScreenWidth - version.width - 5, version.height - 10)
            version.angle = -5;


            // const ship = new AniSpace();
            // ship.position.set(10, 450)
            // ship.scale.set(.7)

            const stonePaperGame = new StonePaperGame();
            stonePaperGame.position.set(10, 10)

            const zombie1Sprite = new AnimatedSprite([
                zombieBundle.character_zombie_run0,
                zombieBundle.character_zombie_run1,
                zombieBundle.character_zombie_run2,
            ], false)
            zombie1Sprite.animationSpeed = 0.05;

            const animatedZombie = new AnimatedPlayer(zombie1Sprite);
            animatedZombie.scale.set(aniZombieScaleFactor)
            animatedZombie.interactive = true;

            const platform1 = new Platform()
            platform1.scale.set(platfomScaleFactor)
            platform1.position.set(200, 600)
            this._plats.push(platform1)

            const platform2 = new Platform()
            platform2.scale.set(platfomScaleFactor)
            platform2.position.set(600, 600)
            this._plats.push(platform2)


            this.addChild(platform1, platform2)

            this.addChild(aniGangnam, animatedZombie, stonePaperGame, title, flowerToptWithHat, version,)

            Ticker.shared.add(function (t: Ticker) {
                aniGangnam.update(t);
                animatedZombie.update(t)
            })
        })()


    }
    override handlePlayPause(): void {
        if (sound.isPlaying()) sound.pause('my-sound')
        else sound.play('my-sound')
    }
}

// NineSliceSprite

// const boardTexture = await Assets.load('board.png')
// const nineSliceBoard = new NineSliceSprite({
//     texture: boardTexture,
//     leftWidth: 50,
//     rightWidth: 50,
//     bottomHeight: 35,
//     topHeight: 35
// });

// nineSliceBoard.width = 500
// nineSliceBoard.height = 300
// nineSliceBoard.scale.set(.5)
// // nineSliceBoard.angle = 90;
// nineSliceBoard.position.set(10, 450)
// // nineSliceBoard.skew.set(Math.PI * 0.1, Math.PI * 0.05)
// // nineSliceBoard.pivot.set(1, 1)

// const title: HTMLText = new HTMLText({
//     text: '¡<red>ONBOARDING</red>!',
//     style: {
//         fontFamily: 'ShortStack Regular',
//         fill: 'white',
//         fontSize: 50,
//         tagStyles: {
//             red: {
//                 fill: 'red',
//             },
//             blue: {
//                 fill: 'blue',
//             },
//             green: {
//                 fill: 'green',
//             }
//         }
//     }
// });