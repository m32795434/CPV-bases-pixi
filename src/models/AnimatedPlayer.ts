import { AnimatedSprite, DestroyOptions, Graphics, ObservablePoint, Rectangle, Ticker } from 'pixi.js';
import { ZombiePhysContainer } from './ZombiePhysContainer';
import { Keyboard } from '../utils/Keyboard';
import { aniZombieScaleFactor } from '../scenes/not-in-use/Onboarding-no-camera';
import { IHitbox } from '../interfaces/IHitbox';
import { finalScreenHeight, finalScreenWidth } from '..';

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
            super.update(t)//from ZombiePhysContainer
            this.player.update(t) // for the AnimatedSprite

            if (Keyboard.state.get("ArrowRight")) {
                this.speed.x = AnimatedPlayer.HORIZONTAL_SPEED
                this.player.scale.x = 1

            } else if (Keyboard.state.get("ArrowLeft")) {
                this.speed.x = -AnimatedPlayer.HORIZONTAL_SPEED
                this.player.scale.x = -1//I didn't set the pivot for "this", just the animatedSprite anchor to the .5 in x. Then the graphics are positionated from the animatedSprite position(x,y,size, anchor),I add the graphisc to the container ,and it doesn't matter if I scale.x the animated, or container. At last, I set the scaleFactor for x and y, to the instance of the container in the scene

            } else {
                this.speed.x = 0
            }

            //NOTAS! Ahora escalo la instancia de this (padre del sprite), y agrego al padre los graphics, y posiciono tdo de acuerdo a este padre : this.x, this.y, etc....NO NECESITO APLICAR SCALE FACTORS
            //Ancla y scale.x, aplico al hijo (sprite)
            //ANTES:
            //Escalaba la instancia de AnimatedZombie (padre), pero desde el padre posicionaba al hijo AnimatedZombie.zombiePlayer.x = algo
            //si le reasignaba la posicion al hijo, con su propio width o posición, desde el padre, no aplicaba factor
            // si utilizaba otro valor real como finalScreenWidth aplicaba inversa factor. (porque cuando tengo un scaleFactor<1, "x" e "y" se vuelven enormen, y los valores del mundo global que asigno, los debo volver enormes antes de asignar al hijo que va a estar reducido) commit 1e05196
            const zombieRightLimit = (this.x + this.width / 2)
            const zombieFloor = this.y
            if (zombieRightLimit > finalScreenWidth) {
                this.x = finalScreenWidth - this.width / 2

            } else if ((this.x - this.width / 2) < 0) {
                this.x = this.width / 2
            }
            if (zombieFloor > finalScreenHeight) {
                this.canJump = 0;
                this.y = finalScreenHeight
                this.speed.y = 0
                // this.speed.y = Math.abs(this.speed.y) * -1
            }

            // console.log("checkCollision",checkCollision())
            // } else if (Keyboard.state.get("ArrowDown")) {
            //     this.speed.y = Player.VERTICAL_SPEED
            // }

        } catch (error) {
            console.log(error)
        }


    }
    public separate(overlap: Rectangle, plat: ObservablePoint) {
        if (overlap.width < overlap.height) {
            //Si quiero que no escale, debo setear una direccion, y anular la HORIZONTAL_SPEED. Solo si cambia la direccion, vuelve a su valor original HORIZONTAL_SPEED
            if (this.x > plat.x) {
                this.x += overlap.width
            } else if (this.x < plat.x) {
                this.x -= overlap.width
            }
        } else {
            if (this.y > plat.y) {
                this.y -= overlap.height
            }
            // else if (this.y < plat.y) {
            //     this.y += overlap.height
            // }
            // this.y -= overlap.height;
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