import { AnimatedSprite, Assets, Container } from "pixi.js";

export class AniGangnam extends Container {
    aniGangman: AnimatedSprite = new AnimatedSprite([])//poner en any, para build
    constructor() {
        super();
        this.createSprite();
    }

    createSprite = async () => {
        const gangnamBundle = await Assets.loadBundle('load-screen')
        this.aniGangman = new AnimatedSprite([
            gangnamBundle.G1,
            gangnamBundle.G2,
            gangnamBundle.G3,
            gangnamBundle.G4], true)
        this.aniGangman.animationSpeed = 0.1;
        this.aniGangman.play();

        // const aniGangStroke = new Graphics()
        //     .rect(this.x, this.y, this.width, this.height)
        //     .stroke(0x0000ff)

        this.addChild(this.aniGangman)
    }
}