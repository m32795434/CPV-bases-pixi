import { Application, Assets, BitmapText, Text } from 'pixi.js';
import manifestExample from '../static/manifests/manifest-example';
import { Keyboard } from './utils/Keyboard';
import { StonePaperGame } from './before-sound/models/not-in-use/StonePaperGame';


// Create a new application
export const app = new Application();
let finalScreenHeight: number, finalScreenWidth: number;
async function init() {
    // Initialize the application
    await app.init({ background: '#1099bb', width: window.innerWidth, height: window.innerHeight });

    // Append the application canvas to the document body
    document.body.appendChild(app.canvas);

    await Assets.init({ manifest: manifestExample });

    // Bundles can be loaded in the background too!
    Assets.backgroundLoadBundle(['load-screen', 'game-screen', 'ui', "rpg-sounds", "fonts"]);
    // sound.add('my-sound', './sounds/8-bit-arcade.mp3');

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
    await Assets.loadBundle('fonts');
    // await Assets.load('Reem'); // I can't make this work!Google fonts
    await Assets.load('ShortStack Regular.ttf')
    await Assets.load('Roboto-Italic.ttf')
    const version: Text = new Text({
        text: "¡V8🚀!",
        style: {
            fontFamily: "ChaChicle",
            fontSize: 40,
            fill: 0x900000
        }
    })
    version.position.set(finalScreenWidth - version.width - 5, version.height - 10)
    version.angle = -5;
    const stonePaperGame = new StonePaperGame();
    stonePaperGame.position.set(10, 10)
    app.stage.addChild(version, stonePaperGame)


    const bitmapFontText = new BitmapText({
        text: 'bitmap fonts are supported!\nWoo yay!',
        style: {
            fontFamily: 'Desyrel',
            fontSize: 55,
            align: 'left',
        },
    });

    bitmapFontText.x = 50;
    bitmapFontText.y = 200;
    // bitmapFontText.tint = 0x000000

    app.stage.addChild(bitmapFontText);
}

init();
export { finalScreenHeight, finalScreenWidth }