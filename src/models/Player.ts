import { AnimatedSprite, Assets, Graphics, Ticker } from 'pixi.js';
import { ZombiePhysContainer } from './ZombiePhysContainer';
import { Keyboard } from '../utils/Keyboard';
import { aniZombieScaleFactor } from '../scenes/Onboarding';

export class Player extends ZombiePhysContainer {
    public aniZombie!: AnimatedSprite;
    private static readonly HORIZONTAL_SPEED = 500;
    private static readonly GRAVITY: number = 1000;

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
        const auxO = new Graphics()
            .circle(0, 0, 2)
            .fill(0xff00ff)
        const auxOne = new Graphics()
            .circle((this.aniZombie.x + this.aniZombie.width) * aniZombieScaleFactor, (this.aniZombie.y + this.aniZombie.height) * aniZombieScaleFactor, 2)
            .fill(0xff00ff)

        this.addChild(auxO, auxOne)

        this.acce.y = Player.GRAVITY;
        // this.speed.x = Player.HORIZONTAL_SPEED
    }
    public override update(t: Ticker): void {
        super.update(t)
        this.aniZombie.update(t)

        if (Keyboard.state.get("ArrowRight")) {
            this.speed.x = Player.HORIZONTAL_SPEED

        } else if (Keyboard.state.get("ArrowLeft")) {
            this.speed.x = -Player.HORIZONTAL_SPEED

        } else {
            this.speed.x = 0
        }
    }
}