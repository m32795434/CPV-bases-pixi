import { Application, Assets, Sprite } from 'pixi.js';
import manifestExample from '../../static/manifests/manifest-example';
import { Onboarding } from './scenes/Onboarding';
import { sound } from '@pixi/sound';
import { Keyboard } from '../utils/Keyboard';
import { Scene } from './interfaces/Scene';


// Create a new application
export const app = new Application();
export let scene: Scene;
let finalScreenHeight: number, finalScreenWidth: number;
async function init() {
    // Initialize the application
    await app.init({ background: '#1099bb', width: window.innerWidth, height: window.innerHeight });

    // Append the application canvas to the document body
    document.body.appendChild(app.canvas);

    await Assets.init({ manifest: manifestExample });

    // Bundles can be loaded in the background too!
    Assets.backgroundLoadBundle(['load-screen', 'game-screen', 'ui']);
    sound.add('my-sound', './sounds/8-bit-arcade.mp3');

    makeLoadScreen();

    // window.addEventListener('pointerup', () => {
    //     sound.play('my-sound');
    // }, { once: true })

    window.addEventListener('resize', () => {
        const scaleX = window.innerWidth / app.screen.width;
        const scaleY = window.innerHeight / app.screen.height
        const scale = Math.min(scaleX, scaleY)

        finalScreenWidth = Math.round(app.canvas.width * scale)//the same..app.canvas.width, app.screen.width are the initial values
        finalScreenHeight = Math.round(app.screen.height * scale)

        app.canvas.style.width = finalScreenWidth + "px"
        app.canvas.style.height = finalScreenHeight + "px"
    })
    window.dispatchEvent(new Event('resize'))
    Keyboard.initialize();
}

async function makeLoadScreen() {
    // const texture1 = await Assets.load("./clampy.png")
    // const clampy = Sprite.from(texture1)
    scene = new Onboarding();
    scene.label = "Onboarding"
    app.stage.addChild(scene)
}

export async function makeGameScreen() {
    // app.stage.removeChildren()
    const loadScreenAssets = await Assets.loadBundle('game-screen');

    // Create a new Sprite from the resolved loaded texture
    const goBack = new Sprite(loadScreenAssets.eggHead);
    goBack.anchor.set(0.5);
    goBack.x = app.screen.width / 2;
    goBack.y = app.screen.height / 2;
    goBack.label = "goBack"
    app.stage.addChild(goBack);

    goBack.eventMode = 'static';
    goBack.cursor = 'pointer';

    goBack.on('pointertap', async () => {
        goBack.destroy();
        // The user can go back and the files are already downloaded
        makeLoadScreen();
    });
    app.renderer.render(app.stage);
}

init();
export { finalScreenHeight, finalScreenWidth }