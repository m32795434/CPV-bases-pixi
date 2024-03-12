import { Container } from "pixi.js";
import { FlowerWithHat } from "./models/Flower-with-hat";
import { AniGangnam } from "./models/AniGangnam";
import { Triangle } from "./models/Triangle";

export class Scene extends Container {
    constructor() {
        super();
        (async () => {
            const flowerToptWithHat: FlowerWithHat = new FlowerWithHat();
            //all contanier's properties, FIRST
            // flowerToptWithHat.pivot.set(flowerToptWithHat.width, flowerToptWithHat.height)
            flowerToptWithHat.position.set(200, 200)
            const aniGangnam: AniGangnam = new AniGangnam();
            aniGangnam.scale.set(.2)

            const triangle4: Triangle = new Triangle();
            triangle4.position.set(0, 125)
            triangle4.scale.set(.3)

            this.addChild(flowerToptWithHat, aniGangnam, triangle4)

            // const aniGangStroke = new Graphics()
            //     .rect(aniGangnam.x, aniGangnam.y, aniGangnam.width, aniGangnam.height)
            //     .stroke(0x0000ff)
            // this.addChild(aniGangStroke)
        })()


    }
}