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
                {
                    alias: 'G1',
                    src: '../G1.png',
                },
                {
                    alias: 'G2',
                    src: '../G2.png',
                },
                {
                    alias: 'G3',
                    src: '../G3.png',
                },
                {
                    alias: 'G4',
                    src: '../G4.png',
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
        }
    ],
};
export default manifestExample;