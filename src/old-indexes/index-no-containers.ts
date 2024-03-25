// ------------------------------ START Previous app
// const app = new Application<HTMLCanvasElement>({
// 	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
// 	resolution: window.devicePixelRatio || 1,
// 	autoDensity: true,
// 	backgroundColor: 0x6495ed,
// 	width: 640,
// 	height: 480
// });

// const clampy: Sprite = Sprite.from("clampy.png");
// clampy.anchor.set(0.5);

// clampy.x = app.screen.width / 2;
// clampy.y = app.screen.height / 2;

// app.stage.addChild(clampy);
// ------------------------------ END Previous app

import { Application, Assets, Sprite, Graphics } from 'pixi.js';
import manifestExample from '../../static/manifests/manifest-example';

// Create a new application
const app = new Application();



async function init() {
	// Initialize the application
	await app.init({ background: '#1099bb', width: 1000, height: 1000 });

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

		const screenWidth = Math.round(app.screen.width * scale)
		const screenHeight = Math.round(app.screen.height * scale)

		app.canvas.style.width = screenWidth + "px"
		app.canvas.style.height = screenHeight + "px"
	})
	window.dispatchEvent(new Event('resize'))
}

async function makeLoadScreen() {
	// Get the assets from the load screen bundle.
	// If the bundle was already downloaded the promise resolves instantly!
	//We can load a single bundle, or an array
	const loadScreenAssets = await Assets.loadBundle(['load-screen', 'game-screen']);

	// Create a new Sprite from the resolved loaded texture
	const goNext = new Sprite(loadScreenAssets['load-screen'].flowerTop);
	const hat = new Sprite(loadScreenAssets['load-screen'].hat);

	//Data> If I want to load assets without a manifest:
	const texture1 = await Assets.load('clampy.png');
	const clampy = Sprite.from(texture1);




	clampy.anchor.set(1)
	clampy.x = app.screen.width;
	clampy.y = app.screen.height;
	clampy.scale.x = 0.5
	clampy.scale.y = 0.5
	app.stage.addChild(clampy)

	goNext.anchor.set(0.5);
	goNext.x = app.screen.width / 2;
	goNext.y = app.screen.height / 2;
	//we have .rotation, .angle, .scale too, and more!
	app.stage.addChild(goNext);

	const goNextStroke = new Graphics()
		.rect((goNext.x - goNext.width / 2), (goNext.y - goNext.height / 2), goNext.width, goNext.height)
		.stroke(0x0000ff)
	// graphics.rect((goNext.x - goNext.width / 2), (goNext.y - goNext.height / 2), goNext.width, goNext.height);
	// graphics.fill(0x0000ff);
	app.stage.addChild(goNextStroke);


	hat.anchor.set(0.5);
	// hat.scale.set(0.9, 0.9);
	hat.x = goNext.x;
	hat.y = goNext.y - (goNext.height / 2)
	app.stage.addChild(hat);

	const hatStroke = new Graphics()
		.rect((hat.x - hat.width / 2), (hat.y - hat.height / 2), hat.width, hat.height)
		.stroke(0x0000ff)
	app.stage.addChild(hatStroke)

	// let elapsed = 0.0;
	// app.ticker.add((ticker: any) => {
	// 	elapsed += ticker.deltaTime;
	// 	goNext.x = 100.0 + Math.cos(elapsed / 50.0) * 100.0;
	// });
	goNext.eventMode = 'static';
	goNext.cursor = 'pointer';


	goNext.on('pointertap', async () => {
		// app.ticker.stop();
		goNext.destroy();
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
