import { Container, EventEmitter, Sprite } from "pixi.js";

export class ToggleButton extends Container {

    private upState: Sprite;
    private downState: Sprite;

    public static readonly TOGGLED: string = "toggled";
    public static readonly TOGGLED_UP: string = "toggled_up";
    public static readonly TOGGLED_DOWN: string = "toggled_down";
    public toggledEvent: EventEmitter = new EventEmitter();
    private _state: "UP" | "DOWN" = "UP";
    public get state(): "UP" | "DOWN" {
        return this._state;
    }
    public set state(value: "UP" | "DOWN") {
        this.setToggle(value);
    }
    constructor(upStateTexture: string, downStateTexture: string) {
        super();

        this.upState = Sprite.from(upStateTexture);
        this.downState = Sprite.from(downStateTexture);

        this.addChild(this.upState);
        this.addChild(this.downState);

        this.downState.visible = false;

        this.interactive = true;
        this.cursor = "pointer"; // Pixi 7
        // this.buttonMode = true; // Pixi 6

        this.on("pointertap", () => {
            if (this.state === "UP") {
                this.setToggle("DOWN");
            } else {
                this.setToggle("UP");
            }
        })
    }
    private setToggle(value: "UP" | "DOWN") {

        if (value == this.state) return;

        if (this.state === "UP") {
            this.state = "DOWN";
            this.downState.visible = true;
            this.upState.visible = false;
            this.toggledEvent.emit(ToggleButton.TOGGLED_DOWN);
        } else {
            this.state = "UP";
            this.downState.visible = false;
            this.upState.visible = true;
            this.toggledEvent.emit(ToggleButton.TOGGLED_UP);
        }
        this.toggledEvent.emit(ToggleButton.TOGGLED, this.state);
    }
}