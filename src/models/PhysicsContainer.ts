import { Container, Point } from "pixi.js";

export class PhysicsContainer extends Container {
    public speed: Point = new Point();
    public acce: Point = new Point();
    update(deltaSeconds: number) {
        this.x += this.speed.x * deltaSeconds + 0.5 * this.acce.x * Math.pow(deltaSeconds, 2)
        this.y += this.speed.y * deltaSeconds + 0.5 * this.acce.y * Math.pow(deltaSeconds, 2)
        this.speed.x += this.acce.x * deltaSeconds;
        this.speed.y += this.acce.y * deltaSeconds
    }

}