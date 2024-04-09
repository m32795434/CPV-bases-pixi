import { AnimatedSprite, Assets, Container, Ticker, TilingSprite } from "pixi.js";
import { sound } from "@pixi/sound";
import { Platform } from "../models/Platform";
import { Flubber } from "../models/Flubber";
import { Scene } from "../interfaces/Scene";
import { AnimatedPlayer } from '../models/AnimatedPlayer';
import { IUpdatableContainer } from "../interfaces/IUpdatableContainer";
import { checkCollision } from "../interfaces/IHitbox";
import { finalScreenHeight, finalScreenWidth } from "..";

export let flubberScaleFactor = .2;
export let aniZombieScaleFactor = .75;
export let platfomScaleFactor = .1;

export class Onboarding extends Scene implements IUpdatableContainer {

    private background!: TilingSprite;

    constructor() {
        super();
        (async () => {
            await Assets.load('ShortStack Regular.ttf')
            await Assets.load('Roboto-Italic.ttf')
            const zombieBundle = await Assets.loadBundle('zombie')
            const bkTexture = await Assets.load("./platform/bk-planet.jpg")
            const flubberBundle = await Assets.loadBundle('load-screen')
            this.background = new TilingSprite({ texture: bkTexture, width: finalScreenWidth, height: finalScreenHeight })

            this._plats = []
            this.setWorld = new Container();
            this.addChild(this.background)//the wolrd outside the parrallax
            const flubberSprite = new AnimatedSprite([
                flubberBundle.G1,
                flubberBundle.G2,
                flubberBundle.G3,
                flubberBundle.G4], false)
            flubberSprite.animationSpeed = 0.05;

            this.flubber = new Flubber(flubberSprite);
            this.flubber.scale.set(flubberScaleFactor)
            this.flubber.interactive = true;
            this.flubber.on('pointerup', this.handlePlayPause, this)

            const zombie1Sprite = new AnimatedSprite([
                zombieBundle.character_zombie_run0,
                zombieBundle.character_zombie_run1,
                zombieBundle.character_zombie_run2,
            ], false)
            zombie1Sprite.animationSpeed = 0.05;

            this.player = new AnimatedPlayer(zombie1Sprite);
            this.player.scale.set(aniZombieScaleFactor)
            this.player.interactive = true;

            let platform = new Platform()
            platform.scale.set(platfomScaleFactor)
            platform.position.set(200, 400)
            this._plats.push(platform)
            this.world.addChild(platform)

            platform = new Platform()
            platform.scale.set(platfomScaleFactor)
            platform.position.set(600, 600)
            this._plats.push(platform)
            this.world.addChild(platform)

            platform = new Platform()
            platform.scale.set(platfomScaleFactor)
            platform.position.set(1000, 500)
            this._plats.push(platform)
            this.world.addChild(platform)

            platform = new Platform()
            platform.scale.set(platfomScaleFactor)
            platform.position.set(1400, 200)
            this._plats.push(platform)
            this.world.addChild(platform)

            platform = new Platform()
            platform.scale.set(platfomScaleFactor)
            platform.position.set(2000, 300)
            this._plats.push(platform)
            this.world.addChild(platform)


            this.world.addChild(this.flubber, this.player)

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
        this.flubber.update(t);
        this.player.update(t)
        try {
            for (const plat of this._plats) {
                const overlap = checkCollision(this.player, plat)
                if (overlap != null) {
                    this.player.separate(overlap, plat.position)
                    // console.log("overlap", overlap)
                    this.player.speed.y = 0
                    this.player.canJump = 0;
                }
            }

            this.world.x = -this.player.x * this.worldTransform.a + finalScreenWidth / 4
            this.background.tilePosition.x = this.world.x * .5
            this.world.y = -this.player.y * this.worldTransform.d + finalScreenHeight - 150

            // console.log("this.world.x", this.world.x)
            // console.log("this.world.y", this.world.y)
            // this.background.tilePosition.y = this.world.y * .5 // with this in off, is more real...like seeing to outside in from a window in a train

        } catch (error) {
            console.log(error)
        }

    }
}
