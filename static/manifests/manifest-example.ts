const manifestExample = {
    bundles: [
        {
            name: 'load-screen',
            assets: [
                {
                    alias: 'flowerTop',
                    src: 'https://pixijs.com/assets/flowerTop.png',
                },
                {
                    alias: 'hat',
                    src: '../hat.svg',
                },
            ],
        },
        {
            name: 'game-screen',
            assets: [
                {
                    alias: 'eggHead',
                    src: 'https://pixijs.com/assets/eggHead.png',
                },
            ],
        },
    ],
};
export default manifestExample;