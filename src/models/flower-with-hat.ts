import { Assets, Container, Graphics, Sprite } from "pixi.js";
import { makeGameScreen } from "..";

export class flowerWithHat extends Container {
    constructor() {
        super();
        (async () => {
            const loadScreenAssets = await Assets.loadBundle(['load-screen', 'game-screen']);
            console.log(loadScreenAssets)
            if (loadScreenAssets) {

                const flowerTop = new Sprite(loadScreenAssets['load-screen'].flowerTop);//119*181
                const hat = new Sprite(loadScreenAssets['load-screen'].hat);//47*28

                // flowerTop.anchor.set(0.5);
                // flowerTop.x = app.screen.width / 2;
                // flowerTop.y = app.screen.height / 2;
                //we have .rotation, .angle, .scale too, and more!
                this.addChild(flowerTop)

                const flowerTopStroke = new Graphics()
                    .rect((flowerTop.x), (flowerTop.y), flowerTop.width, flowerTop.height)
                    .stroke(0x0000ff)

                this.addChild(flowerTopStroke)

                // hat.anchor.set(0.5);
                // hat.scale.set(0.5, 0.5);
                //Position, from its parent
                hat.position.x = flowerTop.x - flowerTop.width / 2;
                hat.position.y = flowerTop.y - flowerTop.height / 2;
                this.addChild(hat)


                const hatStroke = new Graphics()
                    .rect(hat.x, hat.y, hat.width, hat.height)
                    .stroke(0x0000ff);
                this.addChild(hatStroke)

                flowerTop.eventMode = 'static';
                flowerTop.cursor = 'pointer';


                flowerTop.on('pointertap', async () => {
                    // app.ticker.stop();
                    flowerTop.destroy();
                    makeGameScreen();
                });
            }

        })()


    }
}