import { Application, Assets, Sprite, Graphics, Container, Point } from 'pixi.js';
import manifestExample from '../../static/manifests/manifest-example';

// Create a new application
const app = new Application();



async function init() {
    // Initialize the application
    await app.init({ background: '#1099bb', width: 600, height: 600 });

    // Append the application canvas to the document body
    document.body.appendChild(app.canvas);

    console.log("Init------\n canvas.width, canvas.height", app.canvas.width, app.canvas.height)
    console.log("Init------\n screen.width, screen.height", app.screen.width, app.screen.height)
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
    window.dispatchEvent(new Event('resize'))
}

async function makeLoadScreen() {
    // Get the assets from the load screen bundle.
    // If the bundle was already downloaded the promise resolves instantly!
    //We can load a single bundle, or an array
    const loadScreenAssets = await Assets.loadBundle(['load-screen', 'game-screen']);

    // Create a new Sprite from the resolved loaded texture
    const flowerTop = new Sprite(loadScreenAssets['load-screen'].flowerTop);//119*181
    const hat = new Sprite(loadScreenAssets['load-screen'].hat);//47*28

    //Data> If I want to load assets without a manifest:
    const texture1 = await Assets.load('clampy.png');
    const clampy = Sprite.from(texture1);


    clampy.anchor.set(1)
    clampy.x = app.screen.width;
    clampy.y = app.screen.height;
    clampy.scale.x = 0.5
    clampy.scale.y = 0.5
    app.stage.addChild(clampy)

    const flowerToptWithHat: Container = new Container();
    //all contanier's properties, FIRST
    //flowerToptWithHat.position.set(40, 60)

    flowerTop.anchor.set(0.5);
    flowerTop.x = app.screen.width / 2;
    flowerTop.y = app.screen.height / 2;
    //we have .rotation, .angle, .scale too, and more!
    flowerToptWithHat.addChild(flowerTop)

    const flowerTopStroke = new Graphics()
        .rect((flowerTop.x - flowerTop.width / 2), (flowerTop.y - flowerTop.height / 2), flowerTop.width, flowerTop.height)
        .stroke(0x0000ff)
    console.log("flowerTopStroke x: ", (flowerTop.x - flowerTop.width / 2))//300-119/2= 300-59.5 = 240.5
    console.log("flowerTopStroke end x: ", (flowerTop.x - flowerTop.width / 2) + flowerTop.width)//240.5+119=359.5
    console.log("flowerTop.toLocal Point: ", flowerTop.toLocal(new Point()))//-300:-300//to return to the origin of the canvas
    console.log("flowerTop.toGlobal(new Point()): ", flowerTop.toGlobal(new Point()))//300:300 to move the origin to the object
    console.log("flowerTop.parent.toGlobal(flowerTop)", flowerTop.parent.toGlobal(flowerTop))//300:300

    const aux1 = new Point(600, 600)
    // flowerTopStroke.position.copyFrom(aux);
    console.log("aux1 = new Point(600, 600)\n", aux1)

    // graphics.rect((goNext.x - goNext.width / 2), (goNext.y - goNext.height / 2), goNext.width, goNext.height);
    // graphics.fill(0x0000ff);
    flowerToptWithHat.addChild(flowerTopStroke)

    hat.anchor.set(0.5);
    // hat.scale.set(0.9, 0.9);
    hat.x = flowerTop.x;
    hat.y = flowerTop.y - (flowerTop.height / 2)
    flowerToptWithHat.addChild(hat)


    const hatStroke = new Graphics()
        .rect((hat.x - hat.width / 2), (hat.y - hat.height / 2), hat.width, hat.height)
        .stroke(0x0000ff);
    flowerToptWithHat.addChild(hatStroke)

    //-------------------About Global and Local
    // console.log(hat.toGlobal(new Point()))
    // console.log(hat.parent.toGlobal(hat.position))

    // const aux = hat.parent.toLocal(new Point(600, 600))
    // hat.position.copyFrom(aux);
    //-------------------END About Global and Local


    app.stage.addChild(flowerToptWithHat)

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
