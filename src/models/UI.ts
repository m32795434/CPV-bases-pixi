import { Assets, Container, Sprite } from "pixi.js";

export class UI extends Container {
    constructor() {
        super();
        (async () => {
            const uiBundle = await Assets.loadBundle('ui');
            if (uiBundle) {
                const background = new Sprite(uiBundle.background)
                this.addChild(background)
            }
        })()
    }
}