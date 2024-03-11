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
        {
            name: 'gangnam',
            assets: [
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
            ]
        }
    ],
};
export default manifestExample;