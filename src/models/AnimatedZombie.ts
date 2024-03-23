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


            //ATENTION!
            const zombieLeftLimit = (this.zombiePlayer.x + this.zombiePlayer.width / 2) * aniZombieScaleFactor
            const zombieFloor = this.zombiePlayer.y * aniZombieScaleFactor
            // console.log("this.zombiePlayer.width", this.zombiePlayer.width)//si hay scale -> real
            // console.log("finalScreenWidth", finalScreenWidth)//si hay scale -> real
            // console.log("this.zombiePlayer.x", this.zombiePlayer.x)//si hay scale -> NO ES real. Idem "y". Si el scale<1, este valor saldrá de la pantalla
            if (zombieLeftLimit > finalScreenWidth) {
                //ATENTION!
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