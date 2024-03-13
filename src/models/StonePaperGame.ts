import { Assets, Container, HTMLText, NineSliceSprite } from "pixi.js";
import { Button } from "./Button";
import { app } from "..";

export class StonePaperGame extends Container {
    private uiBundle: any;
    private handArray: Button[] = [];
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
                background.width = 250
                background.height = 300
                // background.scale.set(.5)

                const stone = new Button(
                    await Assets.load('./UI/hand_yellow_closed.png'),
                    await Assets.load('./UI/green_hand_closed.png'), 10, 15, this.changeChecked.bind(this), "stone")
                const paper = new Button(
                    await Assets.load('./UI/hand_yellow_open.png'),
                    await Assets.load('./UI/green_hand_open.png'), background.width / 3 + 10, 10, this.changeChecked.bind(this), "paper")
                const scissor = new Button(
                    await Assets.load('./UI/hand_yellow_peace.png'),
                    await Assets.load('./UI/green_hand_peace.png'), background.width / 3 * 2 + 10, 10, this.changeChecked.bind(this), "scissor")
                this.handArray.push(stone, paper, scissor)
                this.addChild(background, stone, paper, scissor)



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
    changeChecked(name: any) {
        this.handArray.forEach((el: any) => {
            if (el.id !== name)
                el.uncheck();
            console.log("el: ", el, "\nname: ", name)
        })
        app.renderer.render(app.stage)
    }
}