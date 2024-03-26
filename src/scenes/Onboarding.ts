import { AnimatedSprite, Assets, Container, Sprite, Ticker } from "pixi.js";
import { sound } from "@pixi/sound";
import { Platform } from "../models/Platform";
import { AniGangnam } from "../models/AniGangnam";
import { Scene } from "../interfaces/Scene";
import { AnimatedPlayer } from "../models/AnimatedPlayer";
import { IUpdatableContainer } from "../interfaces/IUpdatableContainer";
import { checkCollision } from "../interfaces/IHitbox";

export let aniGangnamScaleFactor = .2;
export let aniZombieScaleFactor = .75;
export let platfomScaleFactor = .1;

export class Onboarding extends Scene implements IUpdatableContainer {

    private animatedZombie!: AnimatedPlayer;
    private world!: Container;
    private aniGangnam!: AniGangnam;

    constructor() {

        super();
        (async () => {
            await Assets.load('ShortStack Regular.ttf')
            await Assets.load('Roboto-Italic.ttf')
            const zombieBundle = await Assets.loadBundle('zombie')
            const bkTexture = await Assets.load("./platform/bk-planet.jpg")
            const bk = Sprite.from(bkTexture)

            this._plats = []
            this.world = new Container();
            this.world.addChild(bk)

            this.aniGangnam = new AniGangnam();
            this.aniGangnam.scale.set(aniGangnamScaleFactor)
            this.aniGangnam.interactive = true;
            this.aniGangnam.on('pointerup', this.handlePlayPause, this)

            const zombie1Sprite = new AnimatedSprite([
                zombieBundle.character_zombie_run0,
                zombieBundle.character_zombie_run1,
                zombieBundle.character_zombie_run2,
            ], false)
            zombie1Sprite.animationSpeed = 0.05;

            this.animatedZombie = new AnimatedPlayer(zombie1Sprite);
            this.animatedZombie.scale.set(aniZombieScaleFactor)
            this.animatedZombie.interactive = true;

            const platform1 = new Platform()
            platform1.scale.set(platfomScaleFactor)
            platform1.position.set(200, 600)
            this._plats.push(platform1)

            const platform2 = new Platform()
            platform2.scale.set(platfomScaleFactor)
            platform2.position.set(600, 600)
            this._plats.push(platform2)

            this.world.addChild(platform1, platform2, this.aniGangnam, this.animatedZombie)

            this.addChild(this.world)

            Ticker.shared.add((t: Ticker) => {
                this.update(t)
            })
        })()

    }
    override handlePlayPause(): void {
        if (sound.isPlaying()) sound.pause('my-sound')
        else sound.play('my-sound')
    }
    update(t: Ticker): void {
        this.aniGangnam.update(t);
        this.animatedZombie.update(t)

        try {
            for (const plat of this._plats) {
                const overlap = checkCollision(this.animatedZombie, plat)
                if (overlap != null) {
                    this.animatedZombie.separate(overlap, plat.position)
                    console.log("overlap", overlap)
                    this.animatedZombie.speed.y = 0
                    this.animatedZombie.canJump = 0;
                }
            }
        } catch (error) {
            console.log(error)
        }

    }
}
