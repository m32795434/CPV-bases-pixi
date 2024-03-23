import { Container, Ticker } from "pixi.js";
import { IUpdatableContainer } from '../interfaces/IUpdatableContainer';
import { finalScreenHeight, finalScreenWidth } from "..";
import { aniZombieScaleFactor } from "../scenes/Onboarding";
import { Player } from "./Player";

// TickerScene
export class AnimatedZombie extends Container implements IUpdatableContainer {
    //playerDino
    private zombiePlayer!: Player;

    constructor() {
        super();
        this.create()
    }

    create = () => {
        this.zombiePlayer = new Player()
        this.addChild(this.zombiePlayer)
    }
    update(t: Ticker) {
        if (this.zombiePlayer.aniZombie) {
            this.zombiePlayer.update(t)

            // if (Keyboard.state.get("ArrowRight")) {
            //     this.zombiePlayer.speed.x += 100
            //     // this.aniGangman.animationSpeed < 1 ? this.aniGangman.animationSpeed += 0.01 : null
            //     // this.aniGangman.x += this.speed * ds
            // }
            // if (Keyboard.state.get("ArrowLeft")) {
            //     this.zombiePlayer.speed.x -= 100

            //     // this.aniGangman.animationSpeed > 0 ? this.aniGangman.animationSpeed -= 0.01 : null
            //     // this.aniGangman.x -= this.speed * ds
            // }
            const zombiePTotalWith = (this.zombiePlayer.x + this.zombiePlayer.width / 2) * aniZombieScaleFactor
            const zombieFloor = this.zombiePlayer.y * aniZombieScaleFactor
            if (zombiePTotalWith > finalScreenWidth) {
                this.zombiePlayer.x = finalScreenWidth * (1 / aniZombieScaleFactor) - this.zombiePlayer.width / 2
            } else if ((this.zombiePlayer.x - this.zombiePlayer.width / 2) * aniZombieScaleFactor < 0) {
                this.zombiePlayer.x = 0 + this.zombiePlayer.width / 2
            }
            if (zombieFloor > finalScreenHeight) {
                this.zombiePlayer.canJump = 0;
                //Because I want to see in the screen a value, that will be scaled
                this.zombiePlayer.y = finalScreenHeight * (1 / aniZombieScaleFactor)
                this.zombiePlayer.speed.y = 0
                // this.zombiePlayer.speed.y = Math.abs(this.zombiePlayer.speed.y) * -1

            }
        }
    }
}