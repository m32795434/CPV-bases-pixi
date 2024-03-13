import { Assets, Container, HTMLText, NineSliceSprite, Sprite } from "pixi.js";
import { Button } from "./Button";

export class StonePaperGame extends Container {
    private uiBundle: any;
    constructor() {
        super();
        (async () => {
            this.uiBundle = await Assets.loadBundle('ui');
            if (this.uiBundle) {

                // const background = new Sprite(uiBundle.background)

                const background = new NineSliceSprite({
                    texture: this.uiBundle.background,
                    leftWidth: 15,
                    rightWidth: 15,
                    bottomHeight: 15,
                    topHeight: 15
                });
                const stone = new Button(
                    await Assets.load('./UI/hand_yellow_closed.png'),
                    await Assets.load('./UI/green_hand_closed.png'), 10, 15)
                background.width = 250
                background.height = 300
                // background.scale.set(.5)
                this.addChild(background)
                this.addChild(stone)

                const paper = new Sprite(this.uiBundle.green_hand_open)
                paper.position.set(background.width / 3 + 10, 10)
                this.addChild(paper)
                const scissor = new Sprite(this.uiBundle.green_hand_peace)
                scissor.position.set(background.width / 3 * 2 + 10, 10)
                this.addChild(scissor)

                const selected: HTMLText = new HTMLText({
                    text: '<red>Selected...</red>',
                    style: {
                        fontFamily: 'ShortStack-Regular',
                        fill: 'white',
                        fontSize: 40,
                        tagStyles: {
                            red: {
                                fill: 'red',
                            },
                            blue: {
                                fill: 'blue',
                            },
                            green: {
                                fill: 'green',
                            }
                        }
                    }
                });
                selected.anchor.set(.5)
                selected.position.set(background.width / 2, 200)

                this.addChild(selected)


            }
        })()
    }

}