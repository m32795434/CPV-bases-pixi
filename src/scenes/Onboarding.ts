import { Assets, Container, Text, Ticker } from "pixi.js";
import { FlowerWithHat } from "../models/Flower-with-hat";
import { AniGangnam } from "../models/AniGangnam";
import { Triangle } from "../models/Triangle";
import { StonePaperGame } from "../models/StonePaperGame";
import { AniSpace } from "../models/AniSpace";
import { sound } from "@pixi/sound";

export let aniGangnamScaleFactor = .2;
export class Onboarding extends Container {

    constructor() {
        super();
        (async () => {
            await Assets.load('ShortStack Regular.ttf')
            await Assets.load('Roboto-Italic.ttf')
            const flowerToptWithHat: FlowerWithHat = new FlowerWithHat();
            //all contanier's properties, FIRST
            // flowerToptWithHat.pivot.set(flowerToptWithHat.width, flowerToptWithHat.height)
            flowerToptWithHat.scale.set(0.5)
            flowerToptWithHat.position.set(250, 500)
            const aniGangnam: AniGangnam = new AniGangnam();
            aniGangnam.scale.set(aniGangnamScaleFactor)

            const triangle4: Triangle = new Triangle();
            triangle4.position.set(0, 125)
            triangle4.scale.set(.3)

            const title = new Text({
                text: '¡ONBOARDING!',
                style: { fontFamily: 'ShortStack Regular' }
            })
            title.position.set(100, 20)


            const version: Text = new Text({
                text: "¡V8🚀!",
                style: {
                    fontFamily: "ShortStack Regular",
                    fontSize: 40,
                    fill: 0x900000
                }
            })
            version.position.set(600 - version.width - 5, 600 - version.height - 10)
            version.angle = -5;


            const ship = new AniSpace();
            ship.position.set(10, 450)
            ship.scale.set(.7)

            this.addChild(ship, title, flowerToptWithHat, aniGangnam, triangle4, version,)
            const stonePaperGame = new StonePaperGame();
            stonePaperGame.position.set(150, 100)

            this.addChild(stonePaperGame)
            aniGangnam.interactive = true;
            aniGangnam.on('pointerup', this.handlePlayPause, this)

            Ticker.shared.add(function (t: Ticker) {
                aniGangnam.update(t);
            })
        })()


    }
    handlePlayPause() {
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