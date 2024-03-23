import { AnimatedSprite, Assets, DestroyOptions, Graphics, Ticker } from 'pixi.js';
import { ZombiePhysContainer } from './ZombiePhysContainer';
import { Keyboard } from '../utils/Keyboard';
import { aniZombieScaleFactor } from '../scenes/Onboarding';

export class Player extends ZombiePhysContainer {
    public aniZombie!: AnimatedSprite;
    private static readonly HORIZONTAL_SPEED = 500;
    private static readonly VERTICAL_SPEED = 500;
    private static readonly GRAVITY: number = 1000;
    public canJump = 0;
    private hitBox!: Graphics;
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
        this.aniZombie.anchor.set(.5, 1)
        this.aniZombie.play();

        this.addChild(this.aniZombie)
        const auxO = new Graphics()
            .circle(0, 0, 5 * (1 / aniZombieScaleFactor))
            .fill({ color: 0xff00ff, alpha: 0.3 })
        // const auxOne = new Graphics()
        //     .circle((this.aniZombie.x + this.aniZombie.width) * aniZombieScaleFactor / 2, (this.aniZombie.y + this.aniZombie.height) * aniZombieScaleFactor, 2)
        //     .fill({ color: 0xff00ff, alpha: 0.3 })

        // this.addChild(auxO, auxOne)
        this.hitBox = new Graphics()
            .rect(this.aniZombie.x - this.aniZombie.width / 2, this.aniZombie.y - this.aniZombie.height, this.aniZombie.width, this.aniZombie.height)
            .fill({ color: 0xff00ff, alpha: 0.3 })
        this.addChild(auxO, this.hitBox)
        this.acce.y = Player.GRAVITY;
        // this.speed.x = Player.HORIZONTAL_SPEED
        Keyboard.down.on("ArrowUp", this.jump, this)
    }
    public override update(t: Ticker): void {
        super.update(t)
        this.aniZombie.update(t)

        if (Keyboard.state.get("ArrowRight")) {
            this.speed.x = Player.HORIZONTAL_SPEED
            this.scale.x = 1

        } else if (Keyboard.state.get("ArrowLeft")) {
            this.speed.x = -Player.HORIZONTAL_SPEED
            this.scale.x = -1//I didn't set the pivot for "this", just the animatedSprite anchor to the .5 in x. Then the graphics are positionated from the animatedSprite position(x,y,size, anchor),I add the graphisc to the container ,and it doesn't matter if I scale.x the animated, or container. At last, I set the scaleFactor for x and y, to the instance of the container in the scene

        } else {
            this.speed.x = 0
        }


        // } else if (Keyboard.state.get("ArrowDown")) {
        //     this.speed.y = Player.VERTICAL_SPEED

        // }
    }
    public override destroy(options?: DestroyOptions | undefined): void {
        super.destroy(options)
        Keyboard.down.off("ArrowUp", this.jump)
    }
    private jump() {
        if (this.canJump < 2) {
            this.speed.y = -Player.VERTICAL_SPEED
            this.canJump++
        }
    }
}