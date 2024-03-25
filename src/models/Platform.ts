import { Assets, Container, Graphics, Point, Rectangle, Sprite } from "pixi.js";
import { platfomScaleFactor } from "../scenes/not-in-use/Onboarding-no-camera";
import { IHitbox } from "../interfaces/IHitbox";

export class Platform extends Container implements IHitbox {
    private hitBox!: Graphics;
    // private pltSprite!: Sprite
    constructor() {
        super()
        this.createSprite()

    }
    getHitbox(): Rectangle {
        return this.hitBox.getBounds().rectangle;
        // console.log("this.hitBox.getBounds()", this.hitBox.getBounds().rectangle)
    }
    createSprite = async () => {
        const pltBundle = await Assets.loadBundle('platform')

        const pltSprite = new Sprite(pltBundle.platform_no_grass)
        pltSprite.anchor.set(.5, 0)
        this.addChild(pltSprite)
        console.log("plt.width", pltSprite.width)
        console.log("plt.height", pltSprite.height)
        console.log("plt.x", pltSprite.toGlobal(new Point()))

        const pt = new Graphics()
            //if I want to see for example 10px outside, here I use the scaleFactor^-1
            .circle(0, 0, 5 * (1 / platfomScaleFactor))
            .fill({ color: 0xff00ff, alpha: 0.3 })
        this.hitBox = new Graphics()
            //If I scale the instance outside, here, It doesn't matters. I use here, the real size.
            .rect(pltSprite.x - pltSprite.width / 2, 0, pltSprite.width, pltSprite.height)
            .fill({ color: 0xff00ff, alpha: 0.3 })
        this.addChild(pt, this.hitBox)
    }

}