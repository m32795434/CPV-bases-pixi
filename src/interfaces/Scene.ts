import { Container } from "pixi.js";
import { Platform } from "../models/Platform";
import { AnimatedPlayer } from "../models/AnimatedPlayer";
import { Flubber } from "../models/Flubber";

export class Scene extends Container {
    protected _plats!: Platform[];
    protected _wolrd!: Container;
    public player!: AnimatedPlayer;
    public flubber!: Flubber;

    constructor() {
        super()
    }
    handlePlayPause(): void { }
    get plats(): Platform[] {
        return this._plats
    }
    get world(): Container {
        return this._wolrd
    }
    set setWorld(c: Container) {
        this._wolrd = c
    }
}