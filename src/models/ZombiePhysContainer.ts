import { Container, Point, Ticker } from "pixi.js";

export class ZombiePhysContainer extends Container {
    public speed: Point = new Point();
    public acce: Point = new Point();
    update(t: Ticker) {
        const ds = t.deltaMS / 1000
        this.x += this.speed.x * ds + 0.5 * this.acce.x * Math.pow(ds, 2)
        this.y += this.speed.y * ds + 0.5 * this.acce.y * Math.pow(ds, 2)
        this.speed.x += this.acce.x * ds;
        this.speed.y += this.acce.y * ds
    }

}