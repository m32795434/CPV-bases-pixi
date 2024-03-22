import { Container, Ticker } from "pixi.js";
import { Keyboard } from "../utils/Keyboard";
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
        this.zombiePlayer.speed.set(500, 0)
        this.zombiePlayer.acce.set(0, 1000)
        this.addChild(this.zombiePlayer)
    }
    update(t: Ticker) {
        if (this.zombiePlayer.aniZombie) {
            console.log("this.zombiePlayer.speed", this.zombiePlayer.speed)
            console.log("this.zombiePlayer.x", this.zombiePlayer.x)
            const localTicker = new Ticker()
            localTicker.deltaTime = t.deltaTime * 5
            const ds = t.deltaMS / 1000;

            if (Keyboard.state.get("ArrowRight")) {
                this.zombiePlayer.speed.x += 100
                // this.aniGangman.animationSpeed < 1 ? this.aniGangman.animationSpeed += 0.01 : null
                // this.aniGangman.x += this.speed * ds
            }
            if (Keyboard.state.get("ArrowLeft")) {
                this.zombiePlayer.speed.x -= 100

                // this.aniGangman.animationSpeed > 0 ? this.aniGangman.animationSpeed -= 0.01 : null
                // this.aniGangman.x -= this.speed * ds
            }
            const zombiePTotalWith = (this.zombiePlayer.x + this.zombiePlayer.width) * aniZombieScaleFactor
            const zombiePTotalHeight = (this.zombiePlayer.y + this.zombiePlayer.height) * aniZombieScaleFactor
            if (zombiePTotalWith > finalScreenWidth) {
                this.zombiePlayer.speed.x = Math.abs(this.zombiePlayer.speed.x) * -1
                // this.zombiePlayer.scale.x = -1
                this.zombiePlayer.tint = 0xff00ff
            } else if (this.zombiePlayer.x * aniZombieScaleFactor < 0) {
                this.zombiePlayer.speed.x = Math.abs(this.zombiePlayer.speed.x)
                // this.zombiePlayer.scale.x = 1
                this.zombiePlayer.tint = 0x00ff00

            }
            if (zombiePTotalHeight > finalScreenHeight) {
                this.zombiePlayer.speed.y = Math.abs(this.zombiePlayer.speed.y) * -1
            }
            this.zombiePlayer.update(ds)
            this.zombiePlayer.aniZombie.update(localTicker)
        }
    }
}