import { AnimatedSprite, Assets, Container, Ticker } from "pixi.js";
import { Keyboard } from "../utils/Keyboard";
import { IUpdatableContainer } from '../interfaces/IUpdatableContainer';

export class AniGangnam extends Container implements IUpdatableContainer {
    private aniGangman: any;//poner en any, para build
    constructor() {
        super();
        this.createSprite()
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
        Ticker.shared.add(this.update, this)
    }
    update() {

        if (Keyboard.state.get("ArrowRight")) {
            this.aniGangman.animationSpeed < 1 ? this.aniGangman.animationSpeed += 0.01 : null
            this.aniGangman.x++
        }
        if (Keyboard.state.get("ArrowLeft")) {
            this.aniGangman.animationSpeed > 0 ? this.aniGangman.animationSpeed -= 0.01 : null
            this.aniGangman.x--
        }
    }
}