import { AnimatedSprite, DestroyOptions, Graphics, Rectangle, Ticker } from "pixi.js";
import { PhysicsContainer } from "./PhysicsContainer";
import { finalScreenHeight, finalScreenWidth, scene } from "..";
import { aniGangnamScaleFactor } from "../scenes/not-in-use/Onboarding-no-camera";
import { IHitbox } from "../interfaces/IHitbox";

export class AniGangnam extends PhysicsContainer implements IHitbox {
    public aniGangman!: AnimatedSprite;
    private static readonly HORIZONTAL_SPEED = 500;
    private static readonly VERTICAL_SPEED = 0;
    private static readonly GRAVITY: number = 1000;
    private hitBox!: Graphics;
    constructor(gang: AnimatedSprite) {
        super();
        this.createSprite(gang)
    }


    createSprite = (gang: AnimatedSprite) => {
        this.aniGangman = gang
        this.aniGangman.play();

        this.addChild(this.aniGangman)
        const auxO = new Graphics()
            .circle(0, 0, 5 * (1 / aniGangnamScaleFactor))
            .fill({ color: 0xff00ff, alpha: .3 })

        this.hitBox = new Graphics()
            .rect(0, 0, this.aniGangman.width, this.aniGangman.height)
            .fill({ color: 0x0000ff, alpha: .3 })
        this.acce.y = AniGangnam.GRAVITY;
        this.speed.set(AniGangnam.HORIZONTAL_SPEED, AniGangnam.VERTICAL_SPEED)

        this.addChild(auxO, this.hitBox)
    }
    public override update(t: Ticker) {

        try {
            super.update(t)
            this.aniGangman.update(t)
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

            const moveX = scene._player.x
            const moveY = scene._player.y
            const gangnamRightLimit = this.x + this.width
            const gangnamFloor = this.y + this.height
            if (gangnamRightLimit > finalScreenWidth + moveX) {
                this.speed.x = Math.abs(this.speed.x) * -1
                // this.physGangnam.scale.x = -1
                this.tint = 0xff00ff
            } else if (this.x < 0 + moveX) {
                this.speed.x = Math.abs(this.speed.x)
                // this.physGangnam.scale.x = 1
                this.tint = 0x00ff00

            }
            if (gangnamFloor > finalScreenHeight + moveY) {
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