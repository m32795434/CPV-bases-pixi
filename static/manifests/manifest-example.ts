const manifestExample = {
    bundles: [
        {
            name: "fonts",
            assets: [
                {
                    alias: "kanit",
                    src: "https://fonts.googleapis.com/css2?family=Kanit:wght@400;700&display=swap"
                }, {
                    alias: "Reem",
                    src: "https://fonts.googleapis.com/css2?family=Reem+Kufi+Fun&display=swap"
                },
                {
                    alias: "desyrel",
                    src: "https://pixijs.com/assets/bitmap-font/desyrel.xml"
                },
                {
                    alias: "ChaChicle",
                    src: "https://pixijs.com/assets/webfont-loader/ChaChicle.ttf"
                }
            ]
        }, {
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
                    alias: 'diving_helmet',
                    src: '../space/diving-helmet.png',
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
            name: "rpg-sounds",
            assets: [
                {
                    alias: "doorClose_3",
                    src: "../sounds/doorClose_3.ogg"
                }
            ]
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
            name: 'platform',
            assets: [
                {
                    alias: 'platform_no_grass',
                    src: '../platform/platform_no_grass.png',
                },
            ],
        },
        {
            name: 'zombie',
            assets: [
                {
                    alias: 'character_zombie_run0',
                    src: '../zombie/character_zombie_run0.png',
                },
                {
                    alias: 'character_zombie_run1',
                    src: '../zombie/character_zombie_run1.png',
                },
                {
                    alias: 'character_zombie_run2',
                    src: '../zombie/character_zombie_run2.png',
                },
            ],
        },
        {
            name: 'ui',
            assets: [
                {
                    alias: 'background',
                    src: '../UI/purple_body_square.png',
                },
                {
                    alias: 'green_hand',
                    src: '../UI/green_hand_closed.png',
                },
                {
                    alias: 'green_hand_open',
                    src: '../UI/green_hand_open.png',
                },
                {
                    alias: 'green_hand_peace',
                    src: '../UI/green_hand_peace.png',
                },
                {
                    alias: 'hand_yellow_closed',
                    src: '../UI/hand_yellow_closed.png',
                },
                {
                    alias: 'hand_yellow_open',
                    src: '../UI/hand_yellow_open.png',
                },
                {
                    alias: 'hand_yellow_peace',
                    src: '../UI/hand_yellow_peace.png',
                },
                {
                    alias: 'red_hand_closed',
                    src: '../UI/red_hand_closed.png',
                },
                {
                    alias: 'red_hand_open',
                    src: '../UI/red_hand_open.png',
                },
                {
                    alias: 'red_hand_peace',
                    src: '../UI/red_hand_peace.png',
                },
            ],
        },
        {
            name: 'space_ship',
            assets: [
                {
                    alias: 'spaceShips_004',
                    src: '../space/spaceShips_004.png'
                },
                {
                    alias: 'spaceShips_003',
                    src: '../space/spaceShips_003.png'
                },
                {
                    alias: 'spaceShips_002',
                    src: '../space/spaceShips_002.png'
                },
                {
                    alias: 'spaceShips_007',
                    src: '../space/spaceShips_007.png'
                },
                {
                    alias: 'spaceShips_008',
                    src: '../space/spaceShips_008.png'
                },
                {
                    alias: 'spaceShips_006',
                    src: '../space/spaceShips_006.png'
                }
            ]
        }
    ],
};
export default manifestExample;