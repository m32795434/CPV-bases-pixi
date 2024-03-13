import { Container, Sprite, Texture } from "pixi.js";

export class Button extends Container {

    private selected: Texture = new Texture;
    private notSelected: Texture = new Texture;
    private changeTexture = false;
    private btn: any;

    constructor(selected: Texture, notSelected: Texture, width: number, height: number) {
        super();


        this.selected = selected;
        this.notSelected = notSelected;

        this.btn = Sprite.from(this.notSelected)
        this.btn.position.set(width, height)
        this.btn.interactive = true;
        this.btn.on("pointerup", this.pointerupHandler, this)
        this.btn.on("mouseover", this.mouseoverHandler, this)
        this.btn.on("mouseout", this.mouseoutHandler, this)

        this.addChild(this.btn)
    }
    pointerupHandler() {
        // console.log("uiBundle::", this.uiBundle)
        this.changeTexture = !this.changeTexture
        this.btn.texture = this.selected
    }
    mouseoverHandler() {
        this.btn.texture = this.selected
    }
    mouseoutHandler() {
        if (!this.changeTexture) this.btn.texture = this.notSelected
    }
}