import { Container, Sprite, Texture } from "pixi.js";

export class Button extends Container {

    selected: Texture = new Texture;
    notSelected: Texture = new Texture;
    changeTexture = false;
    btn: Sprite;
    checked = false
    id: any

    constructor(selected: Texture, notSelected: Texture, width: number, height: number, id: any) {
        super();
        this.id = id;
        this.selected = selected;
        this.notSelected = notSelected;

        this.btn = Sprite.from(this.notSelected)
        this.btn.position.set(width, height)
        this.btn.eventMode = 'dynamic';
        this.eventMode = 'dynamic';
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
        this.emit('changeChecked', { name: this.id })
        this.changeTexture = !this.changeTexture
        this.checked = !this.checked
        this.btn.texture = this.checked ? this.selected : this.notSelected
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
        this.emit('changeChecked', { name: this.id })
    }
}