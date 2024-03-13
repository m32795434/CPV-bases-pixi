import { AnimatedSprite, Assets, Container } from "pixi.js";

export class AniSpace extends Container {
    constructor() {
        super();
        (async () => {
            const shipBundle = await Assets.loadBundle('space_ship')
            const aniSpaceShip: AnimatedSprite = new AnimatedSprite([
                shipBundle.spaceShips_004,
                shipBundle.spaceShips_003,
                shipBundle.spaceShips_002,
                shipBundle.spaceShips_007,
                shipBundle.spaceShips_008,
                shipBundle.spaceShips_006], true)
            aniSpaceShip.animationSpeed = 0.05;
            aniSpaceShip.play();

            // const aniGangStroke = new Graphics()
            //     .rect(this.x, this.y, this.width, this.height)
            //     .stroke(0x0000ff)

            this.addChild(aniSpaceShip)
        })()

    }
}