import { AnimatedSprite, Assets, Container, Ticker } from "pixi.js";
import { Keyboard } from "../utils/Keyboard";
import { IUpdatableContainer } from '../interfaces/IUpdatableContainer';

export class AniGangnam extends Container implements IUpdatableContainer {
    private aniGangman!: AnimatedSprite;//poner en any, para build
    // private localTicker!: Ticker;
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
            gangnamBundle.G4], false)
        this.aniGangman.animationSpeed = 0.05;
        this.aniGangman.play();

        // const aniGangStroke = new Graphics()
        //     .rect(this.x, this.y, this.width, this.height)
        //     .stroke(0x0000ff)

        this.addChild(this.aniGangman)
        // this.localTicker = new Ticker();
        // this.localTicker.add(this.update, this)
        // Ticker.shared.add(this.update, this)
    }
    update(t: Ticker) {
        if (this.aniGangman) {
            // t.speed = 2
            const localTicker = new Ticker();
            localTicker.deltaTime = t.deltaTime * 10;
            //localTicker.deltaMS = t.deltaMS * 1000;
            // localTicker.speed *= 0.25
            this.aniGangman.update(localTicker)
            console.log("t: ", t, "localTicker: ", localTicker)
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
}