import { AnimatedSprite, Assets, Container, Graphics, Ticker } from "pixi.js";
import { Keyboard } from "../utils/Keyboard";
import { IUpdatableContainer } from '../interfaces/IUpdatableContainer';
import { PhysicsContainer } from "./PhysicsContainer";
import { finalScreenHeight, finalScreenWidth } from "..";
import { aniGangnamScaleFactor } from "../scenes/Onboarding";

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
        this.physGangnam.speed.set(500, 0)
        this.physGangnam.acce.set(0, 150)

        const physGangCircle = new Graphics()
            .circle(0, 0, 20)
            .fill(0xff00ff)
        this.physGangnam.addChild(physGangCircle)
    }
    update(t: Ticker) {
        if (this.aniGangman) {
            const ds = t.deltaMS / 1000 * 5;
            this.physGangnam.update(ds)
            this.aniGangman.update(t)
            if (Keyboard.state.get("ArrowRight")) {
                this.physGangnam.speed.x += 100
                // this.aniGangman.animationSpeed < 1 ? this.aniGangman.animationSpeed += 0.01 : null
                // this.aniGangman.x += this.speed * ds
            }
            if (Keyboard.state.get("ArrowLeft")) {
                this.physGangnam.speed.x -= 100

                // this.aniGangman.animationSpeed > 0 ? this.aniGangman.animationSpeed -= 0.01 : null
                // this.aniGangman.x -= this.speed * ds
            }
            const gangnamTotalWith = (this.physGangnam.x + this.physGangnam.width) * aniGangnamScaleFactor
            const gangnamTotalHeight = (this.physGangnam.y + this.physGangnam.height) * aniGangnamScaleFactor
            if (gangnamTotalWith > finalScreenWidth) {
                this.physGangnam.speed.x = Math.abs(this.physGangnam.speed.x) * -1
                // this.physGangnam.scale.x = -1
                this.physGangnam.tint = 0xff00ff
            } else if (this.physGangnam.x * aniGangnamScaleFactor < 0) {
                this.physGangnam.speed.x = Math.abs(this.physGangnam.speed.x)
                // this.physGangnam.scale.x = 1
                this.physGangnam.tint = 0x00ff00

            }
            if (gangnamTotalHeight > finalScreenHeight) {
                this.physGangnam.speed.y = Math.abs(this.physGangnam.speed.y) * -1
            }
        }
    }
}