import { AnimatedSprite, Assets, Ticker } from "pixi.js";
import { sound } from "@pixi/sound";
import { Platform } from "../models/Platform";
import { AniGangnam } from "../models/AniGangnam";
import { Scene } from "../interfaces/Scene";
import { AnimatedPlayer } from "../models/AnimatedPlayer";

export let aniGangnamScaleFactor = .2;
export let aniZombieScaleFactor = .75;
export let platfomScaleFactor = .1;

export class Onboarding extends Scene {

    constructor() {
        super();
        (async () => {
            await Assets.load('ShortStack Regular.ttf')
            await Assets.load('Roboto-Italic.ttf')
            const zombieBundle = await Assets.loadBundle('zombie')

            this._plats = []

            const aniGangnam: AniGangnam = new AniGangnam();
            aniGangnam.scale.set(aniGangnamScaleFactor)
            aniGangnam.interactive = true;
            aniGangnam.on('pointerup', this.handlePlayPause, this)

            const zombie1Sprite = new AnimatedSprite([
                zombieBundle.character_zombie_run0,
                zombieBundle.character_zombie_run1,
                zombieBundle.character_zombie_run2,
            ], false)
            zombie1Sprite.animationSpeed = 0.05;

            const animatedZombie = new AnimatedPlayer(zombie1Sprite);
            animatedZombie.scale.set(aniZombieScaleFactor)
            animatedZombie.interactive = true;

            const platform1 = new Platform()
            platform1.scale.set(platfomScaleFactor)
            platform1.position.set(200, 600)
            this._plats.push(platform1)

            const platform2 = new Platform()
            platform2.scale.set(platfomScaleFactor)
            platform2.position.set(600, 600)
            this._plats.push(platform2)


            this.addChild(platform1, platform2)

            this.addChild(aniGangnam, animatedZombie)

            Ticker.shared.add(function (t: Ticker) {
                aniGangnam.update(t);
                animatedZombie.update(t)
            })
        })()


    }
    override handlePlayPause(): void {
        if (sound.isPlaying()) sound.pause('my-sound')
        else sound.play('my-sound')
    }
}
