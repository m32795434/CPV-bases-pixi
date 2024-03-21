import { AnimatedSprite, Assets, Container, Point, Ticker } from "pixi.js";
import { Keyboard } from "../utils/Keyboard";
import { IUpdatableContainer } from '../interfaces/IUpdatableContainer';
import { PhysicsContainer } from "./PhysicsContainer";
import { finalScreenWidth } from "..";

export class AniGangnam extends Container implements IUpdatableContainer {
    private aniGangman!: AnimatedSprite;
    private physGangnam!: PhysicsContainer;
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

        // this.localTicker = new Ticker();
        // this.localTicker.add(this.update, this)
        // Ticker.shared.add(this.update, this)
        this.physGangnam = new PhysicsContainer();
        this.physGangnam.addChild(this.aniGangman)
        this.addChild(this.physGangnam)
        this.physGangnam.speed.set(50, 10)
        console.log("finalScreenWidth: ", finalScreenWidth)
        console.log("window.innerWidth: ", window.innerWidth)

    }
    update(t: Ticker) {
        if (this.aniGangman) {
            const ds = t.deltaMS / 1000 * 90;
            this.aniGangman.update(t)
            if (Keyboard.state.get("ArrowRight")) {
                // this.aniGangman.animationSpeed < 1 ? this.aniGangman.animationSpeed += 0.01 : null
                // this.aniGangman.x += this.speed * ds
            }
            if (Keyboard.state.get("ArrowLeft")) {
                // this.aniGangman.animationSpeed > 0 ? this.aniGangman.animationSpeed -= 0.01 : null
                // this.aniGangman.x -= this.speed * ds
            }
            const gangnamTotalWith = (this.physGangnam.x + this.physGangnam.width) * .2
            if (gangnamTotalWith > finalScreenWidth) {
                this.physGangnam.x -= (this.physGangnam.width * 0.2)
                this.physGangnam.speed.x = Math.abs(this.physGangnam.speed.x) * -1
            }
            this.physGangnam.update(ds)
        }
    }
}