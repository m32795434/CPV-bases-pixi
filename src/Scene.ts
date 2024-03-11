import { Container } from "pixi.js";
import { FlowerWithHat } from "./models/Flower-with-hat";
import { AniGangnam } from "./models/AniGangnam";

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


            this.addChild(flowerToptWithHat, aniGangnam)
        })()


    }
}