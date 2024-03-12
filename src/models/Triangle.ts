import { Container, Graphics } from "pixi.js";

export class Triangle extends Container {
    constructor() {
        super();
        const triangle = new Graphics();
        // triangle.setStrokeStyle({ color: 0xFF00FF, width: 10, alpha: 1 })
        triangle.moveTo(0, 0);
        triangle.lineTo(200, 0)
        triangle.lineTo(0, 200)
        triangle.lineTo(0, 0)
        triangle.stroke({ width: 4, color: 0xffd900 });
        triangle.fill(0xffd900)
        this.addChild(triangle)
    }
}