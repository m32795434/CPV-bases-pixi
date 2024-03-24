import { Container } from "pixi.js";
import { Platform } from "../models/Platform";

export class Scene extends Container {
    protected _plats!: Platform[];
    constructor() {
        super()
    }
    handlePlayPause(): void { }
    get plats(): Platform[] {
        return this._plats
    }
}