import { AnimatedSprite, DestroyOptions, Graphics, Rectangle, Ticker } from "pixi.js";
import { PhysicsContainer } from "./PhysicsContainer";
import { finalScreenWidth, scene } from "..";
import { flubberScaleFactor } from "../scenes/Onboarding";
import { IHitbox } from "../interfaces/IHitbox";

export class Flubber extends PhysicsContainer implements IHitbox {
    public flubber!: AnimatedSprite;
    private static readonly HORIZONTAL_SPEED = 500;
    private static readonly VERTICAL_SPEED = 0;
    private static readonly GRAVITY: number = 1000;
    private hitBox!: Graphics;
    constructor(flubSprite: AnimatedSprite) {
        super();
        this.createSprite(flubSprite)
    }


    createSprite = (flub: AnimatedSprite) => {
        this.flubber = flub
        this.flubber.play();

        this.addChild(this.flubber)
        const auxO = new Graphics()
            .circle(0, 0, 5 * (1 / flubberScaleFactor))
            .fill({ color: 0xff00ff, alpha: .3 })

        this.hitBox = new Graphics()
            .rect(0, 0, this.flubber.width, this.flubber.height)
            .fill({ color: 0x0000ff, alpha: .3 })
        this.acce.y = Flubber.GRAVITY;
        this.speed.set(Flubber.HORIZONTAL_SPEED, Flubber.VERTICAL_SPEED)

        this.addChild(auxO, this.hitBox)
    }
    public override update(t: Ticker) {

        try {
            super.update(t)
            this.flubber.update(t)
            // if (Keyboard.state.get("ArrowRight")) {
            //     this.physGangnam.speed.x += 100
            //     // this.aniGangman.animationSpeed < 1 ? this.aniGangman.animationSpeed += 0.01 : null
            //     // this.aniGangman.x += this.speed * ds
            // }
            // if (Keyboard.state.get("ArrowLeft")) {
            //     this.physGangnam.speed.x -= 100

            //     // this.aniGangman.animationSpeed > 0 ? this.aniGangman.animationSpeed -= 0.01 : null
            //     // this.aniGangman.x -= this.speed * ds
            // }
            const moveX = scene.player.x
            const moveY = scene.player.y
            console.log("moveY", moveY)
            const flubberRightLimit = this.x + this.width
            const flubberFloor = this.y + this.height
            if (flubberRightLimit > finalScreenWidth + moveX) {
                this.speed.x = Math.abs(this.speed.x) * -1
                // this.physGangnam.scale.x = -1
                this.tint = 0xff00ff
            } else if (this.x < -200 + moveX) {
                this.speed.x = Math.abs(this.speed.x)
                // this.physGangnam.scale.x = 1
                this.tint = 0x00ff00

            }
            if (flubberFloor > moveY) {
                this.speed.y = Math.abs(this.speed.y) * -1
            }
        } catch (error) {
            console.log(error)
        }

    }
    public override destroy(options?: DestroyOptions | undefined): void {
        super.destroy(options)
    }
    getHitbox(): Rectangle {
        return this.hitBox.getBounds().rectangle;
    }
}