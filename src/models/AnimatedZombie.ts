import { AnimatedSprite, Container, Ticker } from "pixi.js";
import { IUpdatableContainer } from '../interfaces/IUpdatableContainer';
import { finalScreenHeight, finalScreenWidth, scene } from "..";
import { aniZombieScaleFactor } from "../scenes/Onboarding";
import { AnimatedPlayer } from "./AnimatedPlayer";
import { checkCollision } from "../interfaces/IHitbox";

// TickerScene
export class AnimatedZombie extends Container implements IUpdatableContainer {
    //playerDino
    private zombiePlayer!: AnimatedPlayer;
    public aniSprite!: AnimatedSprite;
    constructor() {
        super();
        this.create()
    }

    create = async () => {

        this.zombiePlayer = new AnimatedPlayer(this.aniSprite)
        this.addChild(this.zombiePlayer)
    }
    update(t: Ticker) {
        if (this.zombiePlayer.player) {
            this.zombiePlayer.update(t)

            console.log(checkCollision(this.zombiePlayer, scene.plats[0]))


            //ATENTION!
            //si comparo con otras cosas aplico scaleFactor
            const zombieLeftLimit = (this.zombiePlayer.x + this.zombiePlayer.width / 2) * aniZombieScaleFactor
            const zombieFloor = this.zombiePlayer.y * aniZombieScaleFactor

            if (zombieLeftLimit > finalScreenWidth) {
                //ATENTION!
                //si me asigno en la posición mi propio width o posición, no aplico factor
                // si me asigno en la posición otro valor real como finalScreenWidth aplico inversa factor. (porque cuando tengo un scaleFactor<1, "x" e "y" se vuelven enormen, y los valores del mundo global que asigno, los debo volver enormes)

                this.zombiePlayer.x = finalScreenWidth * (1 / aniZombieScaleFactor) - this.zombiePlayer.width / 2

            } else if ((this.zombiePlayer.x - this.zombiePlayer.width / 2) * aniZombieScaleFactor < 0) {
                this.zombiePlayer.x = this.zombiePlayer.width / 2
            }
            if (zombieFloor > finalScreenHeight) {
                this.zombiePlayer.canJump = 0;
                //ATENTION!
                this.zombiePlayer.y = finalScreenHeight * (1 / aniZombieScaleFactor)
                this.zombiePlayer.speed.y = 0
                // this.zombiePlayer.speed.y = Math.abs(this.zombiePlayer.speed.y) * -1
            }
        }
    }
}