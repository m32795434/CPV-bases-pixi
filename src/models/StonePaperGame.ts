import { Assets, Container, NineSliceSprite, Text } from "pixi.js";
import { Button } from "./Button";

export class StonePaperGame extends Container {
    private uiBundle: any;
    private handArray: Button[] = [];
    private dialog: Text = new Text;

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

                await Assets.load('ComicNeue Bold.ttf');

                this.dialog = new Text({
                    text: 'Selected...',
                    style: {
                        fontFamily: 'ComicNeue Bold'
                    }
                })
                this.dialog.anchor.set(.5)
                this.dialog.position.set(background.width / 2, 200)

                this.addChild(this.dialog)

                document.addEventListener('keydown', this.onkeydown.bind(this))

            }
        })()
    }
    onkeydown(e: KeyboardEvent): void {
        console.log("key: ", e.code)
        this.dialog.text = e.code
    }
    changeChecked(name: any) {
        this.handArray.forEach((el: any) => {
            if (el.id !== name) {
                el.uncheck();
            }
        })
        this.dialog.text = name
        console.log("\nname: ", name)
        //app.renderer.render(app.stage)
    }
}
