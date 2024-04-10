import { Container, EventEmitter, Sprite } from "pixi.js";


export class Button extends Container {

    public static readonly CLICKED: string = "clicked"
    private default: Sprite;
    private down: Sprite;

    public clickedEvent: EventEmitter = new EventEmitter();

    public clickedCallback?: Function = undefined;
    constructor(defaultTexture: string, downTexture: string) {

        super();
        this.default = Sprite.from(defaultTexture);
        this.down = Sprite.from(downTexture);
        this.addChild(this.default);
        this.addChild(this.down);
        this.down.visible = false;
        this.interactive = true;
        this.eventMode = "dynamic" // pixi 7 only

        this.on("pointertap", () => {
            this.clickedEvent.emit(Button.CLICKED);
        })

        this.on("pointerdown", () => {
            this.setButtonState(true);
        })

        this.on("pointerup", () => {
            this.setButtonState(false);
        })


    }

    private setButtonState(down: boolean) {
        this.down.visible = down;
        this.default.visible = !down;
    }
}