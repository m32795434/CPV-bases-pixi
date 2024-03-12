import { Assets, Container, NineSliceSprite, Text } from "pixi.js";
import { FlowerWithHat } from "./models/Flower-with-hat";
import { AniGangnam } from "./models/AniGangnam";
import { Triangle } from "./models/Triangle";

export class Scene extends Container {
    constructor() {
        super();
        (async () => {
            await Assets.load('ShortStack-Regular.ttf')
            const flowerToptWithHat: FlowerWithHat = new FlowerWithHat();
            //all contanier's properties, FIRST
            // flowerToptWithHat.pivot.set(flowerToptWithHat.width, flowerToptWithHat.height)
            flowerToptWithHat.position.set(200, 200)
            const aniGangnam: AniGangnam = new AniGangnam();
            aniGangnam.scale.set(.2)

            const triangle4: Triangle = new Triangle();
            triangle4.position.set(0, 125)
            triangle4.scale.set(.3)

            const title: Text = new Text({
                text: "¡Hello v8!🚀",
                style: {
                    fontFamily: "short-stack",
                    fontSize: 40,
                    fill: 0x900000
                }
            })
            title.position.set(600 - title.width, 40)
            title.angle = -5;

            const boardTexture = await Assets.load('board.png')
            const nineSliceBoard = new NineSliceSprite({
                texture: boardTexture,
                leftWidth: 1,
                rightWidth: 50,
                bottomHeight: 35,
                topHeight: 35
            });

            nineSliceBoard.width = 500
            nineSliceBoard.height = 200
            nineSliceBoard.scale.set(1.1)
            // nineSliceBoard.angle = 90;
            nineSliceBoard.position.set(50, 250)
            // nineSliceBoard.skew.set(Math.PI * 0.1, Math.PI * 0.05)
            // nineSliceBoard.pivot.set(1, 1)
            // const boardRect = new Graphics()
            //     .rect(nineSliceBoard.x, nineSliceBoard.y, nineSliceBoard.width, nineSliceBoard.height)
            //     .stroke(0x900000)
            this.addChild(nineSliceBoard, flowerToptWithHat, aniGangnam, triangle4, title,)

            // const aniGangStroke = new Graphics()
            //     .rect(aniGangnam.x, aniGangnam.y, aniGangnam.width, aniGangnam.height)
            //     .stroke(0x0000ff)
            // this.addChild(aniGangStroke)
        })()


    }
}