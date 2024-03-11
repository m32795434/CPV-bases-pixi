import { Application, Assets, Sprite } from 'pixi.js';
import manifestExample from '../static/manifests/manifest-example';
import { Scene } from './Scene';

// Create a new application
const app = new Application();

async function init() {
    // Initialize the application
    await app.init({ background: '#1099bb', width: 600, height: 600 });

    // Append the application canvas to the document body
    document.body.appendChild(app.canvas);

    await Assets.init({ manifest: manifestExample });

    // Bundles can be loaded in the background too!
    Assets.backgroundLoadBundle(['load-screen', 'game-screen']);

    makeLoadScreen();

    window.addEventListener('resize', () => {
        const scaleX = window.innerWidth / app.screen.width;
        const scaleY = window.innerHeight / app.screen.height
        const scale = Math.min(scaleX, scaleY)

        const screenWidth = Math.round(app.canvas.width * scale)//the same..app.canvas.width, app.screen.width are the initial values
        const screenHeight = Math.round(app.screen.height * scale)

        app.canvas.style.width = screenWidth + "px"
        app.canvas.style.height = screenHeight + "px"
    })
    window.dispatchEvent(new Event('resize'))
}

async function makeLoadScreen() {

    //const texture1 = await Assets.load("./clampy.png")
    // const clampy = Sprite.from(texture1)
    const scene = new Scene();
    app.stage.addChild(scene)

    //I can't do this anymore
    // const contStroke = new Graphics()
    //     .rect(scene.x, scene.y, scene.width, scene.height)
    //     .stroke(0x0000ff)
    // app.stage.addChild(contStroke)

    // let elapsed = 0.0;
    // app.ticker.add((ticker: any) => {
    // 	elapsed += ticker.deltaTime;
    // 	goNext.x = 100.0 + Math.cos(elapsed / 50.0) * 100.0;
    // });
}

export async function makeGameScreen() {
    const loadScreenAssets = await Assets.loadBundle('game-screen');

    // Create a new Sprite from the resolved loaded texture
    const goBack = new Sprite(loadScreenAssets.eggHead);

    goBack.anchor.set(0.5);
    goBack.x = app.screen.width / 2;
    goBack.y = app.screen.height / 2;
    app.stage.addChild(goBack);

    goBack.eventMode = 'static';
    goBack.cursor = 'pointer';

    goBack.on('pointertap', async () => {
        goBack.destroy();
        // The user can go back and the files are already downloaded
        makeLoadScreen();
    });
}

init();
