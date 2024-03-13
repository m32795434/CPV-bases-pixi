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
    mouseupHandler() {
        // console.log("uiBundle::", this.uiBundle)
        this.changeTexture = !this.changeTexture
        this.checked = !this.checked
        this.btn.texture = this.selected
        this.callb(this.id)
    }
    mouseoverHandler() {
        this.btn.texture = this.selected
    }
    mouseoutHandler() {
        if (!this.changeTexture) this.btn.texture = this.notSelected
    }
    touchendHandler() {
        this.btn.texture = this.changeTexture ? this.notSelected : this.selected
        this.changeTexture = !this.changeTexture
        this.checked = !this.checked
        this.callb(this.id)
    }
}