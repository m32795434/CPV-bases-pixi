import { Assets, Container, HTMLText, NineSliceSprite } from "pixi.js";
import { Button } from "./Button";

export class StonePaperGame extends Container {
    private uiBundle: any;
    private handArray: Button[] = [];
    private dialog: HTMLText = new HTMLText;
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



                this.dialog = new HTMLText({
                    text: `<red>Selected...</red>`,
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
                this.dialog.anchor.set(.5)
                this.dialog.position.set(background.width / 2, 200)

                this.addChild(this.dialog)

                document.addEventListener('keydown', this.onkeydown.bind(this))

            }
        })()
    }
    onkeydown(e: KeyboardEvent): void {
        console.log("key: ", e.code)
        this.dialog.text = `<red>${e.code}</red>`
    }
    changeChecked(name: any) {
        this.handArray.forEach((el: any) => {
            if (el.id !== name) {
                el.uncheck();
            }
        })
        this.dialog.text = `<red>${name}</red>`;
        console.log("\nname: ", name)
        //app.renderer.render(app.stage)
    }
}