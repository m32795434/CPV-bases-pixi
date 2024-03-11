import { AnimatedSprite, Assets, Container } from "pixi.js";

export class AniGangnam extends Container {
    constructor() {
        super();
        (async () => {
            const gangnamBundle = await Assets.loadBundle('gangnam')
            console.log("gangnamBundle", gangnamBundle)
            const gangmanAnimated: AnimatedSprite = new AnimatedSprite([
                gangnamBundle.G1,
                gangnamBundle.G2,
                gangnamBundle.G3,
                gangnamBundle.G4], true)
            gangmanAnimated.animationSpeed = 0.1;
            gangmanAnimated.play();
            this.addChild(gangmanAnimated)
        })()

    }
}