import { AnimatedSprite, DestroyOptions, Graphics, Rectangle, Ticker } from 'pixi.js';
import { ZombiePhysContainer } from './ZombiePhysContainer';
import { Keyboard } from '../utils/Keyboard';
import { aniZombieScaleFactor } from '../scenes/Onboarding';
import { IHitbox, checkCollision } from '../interfaces/IHitbox';
import { finalScreenHeight, finalScreenWidth, scene } from '..';

// TickerScene

export class AnimatedPlayer extends ZombiePhysContainer implements IHitbox {
    public player!: AnimatedSprite;
    private static readonly HORIZONTAL_SPEED = 500;
    private static readonly VERTICAL_SPEED = 500;
    private static readonly GRAVITY: number = 1000;
    public canJump = 0;
    private hitBox!: Graphics;
    constructor(player: AnimatedSprite) {
        super();
        this.createSprite(player)

    }
    createSprite = (player: AnimatedSprite) => {
        this.player = player
        this.player.anchor.set(.5, 1)
        this.player.play();

        this.addChild(this.player)
        const auxO = new Graphics()
            .circle(0, 0, 5 * (1 / aniZombieScaleFactor))
            .fill({ color: 0xff00ff, alpha: 0.3 })
        // const auxOne = new Graphics()
        //     .circle((this.aniZombie.x + this.aniZombie.width) * aniZombieScaleFactor / 2, (this.aniZombie.y + this.aniZombie.height) * aniZombieScaleFactor, 2)
        //     .fill({ color: 0xff00ff, alpha: 0.3 })

        // this.addChild(auxO, auxOne)
        this.hitBox = new Graphics()
            .rect(this.player.x - this.player.width / 2, this.player.y - this.player.height, this.player.width, this.player.height)
            .fill({ color: 0xff00ff, alpha: 0.3 })
        this.addChild(auxO, this.hitBox)
        this.acce.y = AnimatedPlayer.GRAVITY;
        // this.speed.x = Player.HORIZONTAL_SPEED
        Keyboard.down.on("ArrowUp", this.jump, this)
    }
    public override update(t: Ticker): void {
        try {
            if (scene.plats.length !== 0 && this.hitBox) {
                super.update(t)//from ZombiePhysContainer
                this.player.update(t) // for the AnimatedSprite

                console.log(checkCollision(this, scene.plats[0]))


                if (Keyboard.state.get("ArrowRight")) {
                    this.speed.x = AnimatedPlayer.HORIZONTAL_SPEED
                    this.scale.x = 1

                } else if (Keyboard.state.get("ArrowLeft")) {
                    this.speed.x = -AnimatedPlayer.HORIZONTAL_SPEED
                    this.scale.x = -1//I didn't set the pivot for "this", just the animatedSprite anchor to the .5 in x. Then the graphics are positionated from the animatedSprite position(x,y,size, anchor),I add the graphisc to the container ,and it doesn't matter if I scale.x the animated, or container. At last, I set the scaleFactor for x and y, to the instance of the container in the scene

                } else {
                    this.speed.x = 0
                }

                //ATENTION!
                //si comparo con otras cosas aplico scaleFactor
                const zombieLeftLimit = (this.x + this.width / 2) * aniZombieScaleFactor
                const zombieFloor = this.y * aniZombieScaleFactor

                if (zombieLeftLimit > finalScreenWidth) {
                    //ATENTION!
                    //si me asigno en la posición mi propio width o posición, no aplico factor
                    // si me asigno en la posición otro valor real como finalScreenWidth aplico inversa factor. (porque cuando tengo un scaleFactor<1, "x" e "y" se vuelven enormen, y los valores del mundo global que asigno, los debo volver enormes)

                    this.x = finalScreenWidth * (1 / aniZombieScaleFactor) - this.width / 2

                } else if ((this.x - this.width / 2) * aniZombieScaleFactor < 0) {
                    this.x = this.width / 2
                }
                if (zombieFloor > finalScreenHeight) {
                    this.canJump = 0;
                    //ATENTION!
                    this.y = finalScreenHeight * (1 / aniZombieScaleFactor)
                    this.speed.y = 0
                    // this.speed.y = Math.abs(this.speed.y) * -1
                }

                // console.log("checkCollision",checkCollision())
                // } else if (Keyboard.state.get("ArrowDown")) {
                //     this.speed.y = Player.VERTICAL_SPEED
                // }
            }

        } catch (error) {
            console.log(error)
        }


    }
    public override destroy(options?: DestroyOptions | undefined): void {
        super.destroy(options)
        Keyboard.down.off("ArrowUp", this.jump)
    }
    private jump() {
        if (this.canJump < 2) {
            this.speed.y = -AnimatedPlayer.VERTICAL_SPEED
            this.canJump++
        }
    }
    getHitbox(): Rectangle {
        // console.log("this.hitBox.getBounds()", this.hitBox.getBounds().rectangle)
        return this.hitBox.getBounds().rectangle;
    }
}