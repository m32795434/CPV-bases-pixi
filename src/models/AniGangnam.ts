import { AnimatedSprite, Assets, Container } from "pixi.js";

export class AniGangnam extends Container {
    constructor() {
        super();
        (async () => {
            const gangnamBundle = await Assets.loadBundle('load-screen')
            const aniGangman: AnimatedSprite = new AnimatedSprite([
                gangnamBundle.G1,
                gangnamBundle.G2,
                gangnamBundle.G3,
                gangnamBundle.G4], true)
            aniGangman.animationSpeed = 0.1;
            aniGangman.play();

            // const aniGangStroke = new Graphics()
            //     .rect(this.x, this.y, this.width, this.height)
            //     .stroke(0x0000ff)

            this.addChild(aniGangman)
        })()

    }
}