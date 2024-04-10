import { Assets, Container, NineSliceSprite, Text } from "pixi.js";
import { Button } from "./Button";
import { filters as soundFilters, sound } from "@pixi/sound";

export class StonePaperGame extends Container {
    private uiBundle: any;
    private handArray: Button[] = [];
    private dialog: Text = new Text;

    constructor() {
        super();
        (async () => {
            await Assets.load('doorClose_3');
            // console.log(AssetSound)
            // AssetSound.volume = .1
            // sound.volume("doorClose_3", .1)

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
                    //before, we sent this callback:  this.changeChecked.bind(this)
                    await Assets.load('./UI/green_hand_closed.png'), 10, 15, "stone")
                const paper = new Button(
                    await Assets.load('./UI/hand_yellow_open.png'),
                    await Assets.load('./UI/green_hand_open.png'), background.width / 3 + 10, 10, "paper")
                const scissor = new Button(
                    await Assets.load('./UI/hand_yellow_peace.png'),
                    await Assets.load('./UI/green_hand_peace.png'), background.width / 3 * 2 + 10, 10, "scissor")
                this.handArray.push(stone, paper, scissor)
                this.addChild(background, stone, paper, scissor)
                stone.on("pointerdown", () => {
                    sound.toggleMuteAll();
                    // ("doorClose_3")
                })
                paper.on("pointerdown", () => {
                    // sound.volume("doorClose_3", .1)
                    sound.volume("doorClose_3", 5)
                })
                scissor.on("pointerdown", () => {
                    sound.volumeAll = .1
                    sound.volume("doorClose_3", 1)
                    // sound.play("doorClose_3")
                })

                await Assets.load('ComicNeue Bold.ttf');

                this.dialog = new Text({
                    text: 'Selected...',
                    style: {
                        fontFamily: 'ComicNeue Bold'
                    }
                })
                this.dialog.anchor.set(.5)
                this.dialog.position.set(background.width / 2, 200)
                this.dialog.interactive = true;
                this.dialog.on("pointerdown", () => {
                    sound.play("doorClose_3", { loop: true, singleInstance: true, filters: [new soundFilters.TelephoneFilter()] })
                })
                this.addChild(this.dialog)

                document.addEventListener('keydown', this.onkeydown.bind(this))
                this.eventMode = 'dynamic'
            }
            this.handArray.forEach((el) => {
                el.eventMode = 'dynamic'
                el.on('changeChecked', this.changeChecked, this)
            })
        })()
    }
    onkeydown(e: KeyboardEvent): void {
        // console.log("key: ", e.code)
        this.dialog.text = e.code
    }
    changeChecked(arg: any) {
        this.handArray.forEach((el: any) => {
            if (el.id !== arg.name) {
                el.uncheck();
            }
        })
        this.dialog.text = arg.name
        console.log("\nname: ", arg.name)
    }
}
