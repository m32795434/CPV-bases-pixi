import { Application, Assets, Sprite, Graphics, Container, Point } from 'pixi.js';
import manifestExample from '../static/manifests/manifest-example';

// Create a new application
const app = new Application();



async function init() {
    // Initialize the application
    await app.init({ background: '#1099bb', width: 600, height: 600 });

    // Append the application canvas to the document body
    document.body.appendChild(app.canvas);

    // Manifest example
    // Assets.init must only happen once! 
    // Pack all your bundles into one manifest!
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
        console.log("resized------app.canvas.clientWidth:", app.canvas.clientWidth)
        console.log("resized------app.canvas.clientHeight", app.canvas.clientHeight)
    })
    // window.dispatchEvent(new Event('resize'))
}

async function makeLoadScreen() {
    // Get the assets from the load screen bundle.
    // If the bundle was already downloaded the promise resolves instantly!
    //We can load a single bundle, or an array
    const loadScreenAssets = await Assets.loadBundle(['load-screen', 'game-screen']);

    // Create a new Sprite from the resolved loaded texture
    const flowerTop = new Sprite(loadScreenAssets['load-screen'].flowerTop);//119*181
    const hat = new Sprite(loadScreenAssets['load-screen'].hat);//47*28
    // const texture1 = await Assets.load("./clampy.png")
    // const clampy = Sprite.from(texture1)

    const flowerToptWithHat: Container = new Container();
    //all contanier's properties, FIRST
    // flowerToptWithHat.pivot.set(flowerToptWithHat.width, flowerToptWithHat.height)
    flowerToptWithHat.position.set(50, 150)

    // flowerTop.anchor.set(0.5);
    // flowerTop.x = app.screen.width / 2;
    // flowerTop.y = app.screen.height / 2;
    //we have .rotation, .angle, .scale too, and more!
    flowerToptWithHat.addChild(flowerTop)

    const flowerTopStroke = new Graphics()
        .rect((flowerTop.x), (flowerTop.y), flowerTop.width, flowerTop.height)
        .stroke(0x0000ff)

    flowerToptWithHat.addChild(flowerTopStroke)

    // hat.anchor.set(0.5);
    // hat.scale.set(0.5, 0.5);
    //Position, from its parent
    hat.position.x = flowerTop.x - flowerTop.width / 2.5;
    hat.position.y = flowerTop.y - flowerTop.height / 3;
    flowerToptWithHat.addChild(hat)


    const hatStroke = new Graphics()
        .rect(hat.x, hat.y, hat.width, hat.height)
        .stroke(0x0000ff);
    flowerToptWithHat.addChild(hatStroke)

    //flowerToptWithHat.scale.set(0.5, 0.5)
    //BEE AWARE OF a CHILD SCALE!***
    //obj.toLocal --> distance "from" this "obj"

    console.log("hat.toGlobal(new Point(0,0)", hat.toGlobal(new Point()))//GOOD! from global orgin (0)
    console.log("flowerToptWithHat.toLocal(new Point(50,150)))", flowerToptWithHat.toLocal(new Point(50, 150)))//GOOD, Wich point is the global (50, 150), in the local.
    console.log("hat.toLocal(new Point(0, 0))?:", hat.toLocal(new Point()))//***GOOD! Distncce from where I am, to the global O.
    console.log("hat.toLocal(flowerToptWithHat): ", hat.toLocal(flowerToptWithHat))//***GOOD! How much to reach the father//
    console.log("flowerToptWithHat.toLocal(hat):", flowerToptWithHat.toLocal(hat))// USEFUL?! THIS IS THE DISTANCE FROM THE global O, to the container + de distance from the container to the obj
    console.log("hat.toGlobal(flowerToptWithHat): ", hat.toGlobal(flowerToptWithHat))//son.toGlobal(father)--> the distance from the O to the child+the distance from O to the father
    console.log("flowerToptWithHat.toGlobal(hat):", flowerToptWithHat.toGlobal(hat))// GOOD! idem hat.toGlobal(new Point(0, 0))
    console.log(`hat width: `, hat.width, "hat.height ", hat.height)

    app.stage.addChild(flowerToptWithHat)
    const contStroke = new Graphics()
        .rect(flowerToptWithHat.x, flowerToptWithHat.y, flowerToptWithHat.width, flowerToptWithHat.height)
        .stroke(0x0000ff)
    app.stage.addChild(contStroke)
    // let elapsed = 0.0;
    // app.ticker.add((ticker: any) => {
    // 	elapsed += ticker.deltaTime;
    // 	goNext.x = 100.0 + Math.cos(elapsed / 50.0) * 100.0;
    // });
    flowerTop.eventMode = 'static';
    flowerTop.cursor = 'pointer';


    flowerTop.on('pointertap', async () => {
        // app.ticker.stop();
        flowerTop.destroy();
        makeGameScreen();
    });
}

async function makeGameScreen() {
    // Wait here until you get the assets
    // If the user spends enough time in the load screen by the time they reach the game screen
    // the assets are completely loaded and the promise resolves instantly!
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
