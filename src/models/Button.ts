import { Container, Sprite, Texture } from "pixi.js";

export class Button extends Container {

    selected: Texture = new Texture;
    notSelected: Texture = new Texture;
    changeTexture = false;
    btn: any;
    checked = false
    callb: any
    id: any

    constructor(selected: Texture, notSelected: Texture, width: number, height: number, callb: any, id: any) {
        super();
        this.callb = callb
        this.id = id;
        this.selected = selected;
        this.notSelected = notSelected;

        this.btn = Sprite.from(this.notSelected)
        this.btn.position.set(width, height)
        this.btn.interactive = true;
        this.btn.on("mouseup", this.mouseupHandler, this)
        this.btn.on("touchend", this.touchendHandler, this)
        this.btn.on("mouseover", this.mouseoverHandler, this)
        this.btn.on("mouseout", this.mouseoutHandler, this)
        this.addChild(this.btn)
    }
    uncheck() {
        if (this.checked) {
            this.checked = false
            this.changeTexture = false
            this.btn.texture = this.notSelected
        }
    }
    mouseupHandler() {
        this.changeTexture = !this.changeTexture
        this.checked = !this.checked
        this.btn.texture = this.checked ? this.selected : this.notSelected
        this.callb(this.id)
    }
    mouseoverHandler() {
        this.btn.texture = this.selected
    }
    mouseoutHandler() {
        if (!this.changeTexture) this.btn.texture = this.notSelected
    }
    touchendHandler() {
        this.checked = !this.checked
        this.btn.texture = this.checked ? this.selected : this.notSelected
        this.callb(this.id)
    }
}