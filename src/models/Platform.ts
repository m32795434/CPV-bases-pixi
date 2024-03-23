import { Assets, Container, Sprite } from "pixi.js";

export class Platform extends Container {
    constructor() {
        super()
        this.createSprite()

    }
    createSprite = async () => {
        const pltBundle = await Assets.loadBundle('platform')

        const plt = new Sprite(pltBundle.platform_no_grass)
        this.addChild(plt)
    }

}