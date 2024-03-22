import { AnimatedSprite, Assets, Graphics } from "pixi.js";
import { PhysicsContainer } from "./PhysicsContainer";

export class Player extends PhysicsContainer {
    public aniZombie!: AnimatedSprite;
    constructor() {
        super();
        this.createSprite()

    }
    createSprite = async () => {
        const zombieBundle = await Assets.loadBundle('zombie')
        this.aniZombie = new AnimatedSprite([
            zombieBundle.character_zombie_run0,
            zombieBundle.character_zombie_run1,
            zombieBundle.character_zombie_run2,
        ], false)
        this.aniZombie.animationSpeed = 0.05;
        this.aniZombie.play();

        this.addChild(this.aniZombie)
        const physGangCircle = new Graphics()
            .circle(0, 0, 20)
            .fill(0xff00ff)
        this.addChild(physGangCircle)
    }
}