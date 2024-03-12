import { Assets, Container, Graphics, Sprite } from "pixi.js";
import { app, makeGameScreen } from "..";

export class FlowerWithHat extends Container {
    constructor() {
        super();
        (async () => {
            const loadScreenAssets = await Assets.loadBundle(['load-screen', 'game-screen']);
            if (loadScreenAssets) {

                const flowerTop = new Sprite(loadScreenAssets['load-screen'].flowerTop);//119*181
                const hat = new Sprite(loadScreenAssets['load-screen'].hat);//47*28

                this.addChild(flowerTop)

                const flowerTopStroke = new Graphics()
                    .rect((flowerTop.x), (flowerTop.y), flowerTop.width, flowerTop.height)
                    .stroke(0x0000ff)

                this.addChild(flowerTopStroke)

                hat.position.x = flowerTop.x - flowerTop.width / 2;
                hat.position.y = flowerTop.y - flowerTop.height / 2;
                this.addChild(hat)


                const hatStroke = new Graphics()
                    .rect(hat.x, hat.y, hat.width, hat.height)
                    .stroke(0x0000ff);
                this.addChild(hatStroke)
                flowerTop.interactive = true;
                flowerTop.eventMode = 'static';
                flowerTop.cursor = 'pointer';

                let elapsed = 0.0;

                flowerTop.on('pointertap', async () => {
                    app.ticker.add((ticker: any) => {
                        elapsed += ticker.deltaTime;
                        if (elapsed < 100) {
                            flowerTop.x = 100.0 + Math.cos(elapsed / 10.0) * 100.0;
                        } else {
                            const index = app.stage.children.findIndex((el) => el.label === 'Onboarding')
                            app.stage.removeChild(app.stage.children[index])
                            app.ticker.stop();
                            makeGameScreen();
                        }
                    });
                });
            }

        })()


    }
    // removeScene = false;
}