//@ts-check

// Canvas
const a = document.querySelector("canvas");
const c = a.getContext("2d");

// Map
const map_dungeon = [
    "111111111111111111111111111111111111111111111111111111111111111111111111111111",
    "100000000000000001000000000000000000000000000000000001000000000000000000000001",
    "10000000000000000100000000000000000000000000000000000100000000D000000000000001",
    "100000000000000001000000000020000000000000000000000001111111111100000000000001",
    "100000000000000001000000011111110011000001000000000001000000000000000000000001",
    "1000000000000000010D0000000000010000001000000010000001000000000000300000000001",
    "100000000200000D01111100000000010000000000010000000000000000000001111000000001",
    "100000011111111111000000000000010000000000000000011100000000000000000000000001",
    "100000000000000001000000200000010000000000000000000000000000000000000000020001",
    "100000000000000001000111111000010303000000000000000000020000000000000111111111",
    "100001110000000001000000000000011111100000000000000011111100000000000000000001",
    "100000000000000001000000000000010000000000302030000010000000000000000000000001",
    "100000000000000001111111111100010000000011111111100010000033002000000000000001",
    "101100000000000000000100000000010000000000000000000110001111111111100000000001",
    "100000000000000000000100000000010000000000000000000110000000000100000000000001",
    "100020000000020000000100000000010000020000000000001110000000000100000000000001",
    "111111100001111111100100000000011111111000000000111111000000000100000100000001",
    "100000000000000000000100000111110000000000000000000010000000000100000000000001",
    "1000000011000000000001000000000100000000000D0000000210000000000111100000020001",
    "100000000000000000000100000000010000000001111100011110010000000111000001111001",
    "100000003300002000000101111000011110000000000000000010000000000111000111111001",
    "100000111111111110000100000000011111113300000000200013302000000100000100000001",
    "100000000000001110000100000000011111111111100111111111111110000100000100000001",
    "100000000000000110000100000111110000000000000000000000001000000100001100000001",
    "100010000000000010000000000000010000000000000003000000001000000100000100000001",
    "100010000000002010000003320000010000000000001111110000001000000110000100000001",
    "111110000001111111111111111000010000000000000001000000001000000011111100000001",
    "100010000000000010000000000000010000020000000001000000001330000000000100D03001",
    "100011000000000010000000000000000000111111000001001110011111000000000111111001",
    "100000001000000010000000000000000000000000000001000000000001000000000000000001",
    "100000001000000000000000000203330000000000000001000000000000000000000000000001",
    "100000001020000000000000111111111110000000001111111000000000000000000000001111",
    "100011111111100000000000000000010000000000000000001000000000000000020000000001",
    "100000001000000000020000000000010000000300000000001000000001110333111100000001",
    "100000001000000000011110000000010000111111000000001001110001111111111111111001",
    "100000001000000000011110000000010000000000000000001000000001000000000100000001",
    "111100111000013300011110000000010000000000000000001000000001000000000100000001",
    "100000001000011111111110000000010000000D00000000001111001111000000000111110001",
    "100000001000000000000000000000011111111111111110000000000001000000000000000001",
    "100001001000000000000000000000000000000000000000000200000001000000000000000001",
    "100001331020000000000000011110000000000000000000011111111001000000100000011111",
    "100011111111100000000000000000000000111100000000000000000001000000000000000001",
    "100000000000000000000000000000000000000000000000000000000001000000000000000001",
    "100000000000000000000000000000011100000001111001111000000001000D00000100000001",
    "100000000000000000000000000000000000000000000000000001100001111110000000000001",
    "111111111100000000000200000000000000000000000000000000000001000000000000010001",
    "100000000000000011111110000000020000000000000000000000000111000000000000000001",
    "100000000000000111111111000001111100000000000000000000000000000000000000000001",
    "100000D00000111111111111333311111111103300031111130020000000000111331110020001",
    "111111111111111111111111111111111111111111111111111111111111111111111111111111",
];


const map_home = [
    "11111111111111111111111111111111",
    "10000000000000000000000000000001",
    "10000000000000000000000000000001",
    "10000000000000000000000000000001",
    "10000000000000000000000001111111",
    "10000000000000000000000000000001",
    "10000000000000000001110000000001",
    "10000001111111111000000000000001",
    "11000000000000000000000000000001",
    "11000000000000000000011111100001",
    "11000111000000000000000000000000",
    "11d0000000000000000000000000000D",
    "11111111111111111111111111111111",
];



const unlocks = {
    torch: false, // 720x480 vs 480x320
};
let scene = 'h'; // h=home, d=dungeon, dp=dungeon-pause
let transition_progress = 1000; // ms, count till 0
let transition_to = 'h'; // see `scene`

let map = (scene == 'h' ? map_home : map_dungeon);
let map_w = map[0].length;  // map width in tiles
let map_h = map.length;     // map height in tiles
let entities = [];
let frameID = 0;

/* #IfDev */
window['getEntities'] = () => entities;
/* #EndIfDev */


const tile_w = 32;  // tiles width in px
const tile_h = 32;  // tiles height in px

// Hero
let hero_w = .6;  // hero width in tiles 
let hero_h = 1;  // hero height in tiles
let hero_x = 10;   // X position in tiles
let hero_y = 2;   // Y position in tiles
let hero_vy = 0;  // Y speed
let hero_ay = 0;  // Y acceleration
let hero_grounded = 0; // hero is grounded
let hero_can_jump = 1;  // hero can jump (or jump again after Up key has been released)
let inventory = [];

const cards = [
    {// 0
        n: 'live', // name
        rq: 0, // requires card
    },
    {// 1
        n: 'love', // name
        rq: 0, // requires card
    },
    {// 2
        n: 'health', // name
        rq: 0, // requires card
    },
    {// 3
        n: 'mind', // name
        rq: 0, // requires card
    },
    {// 4
        n: 'walk', // name
        rq: 0, // requires card
    },
    {// 5
        n: 'jump', // name
        rq: 0, // requires card
    },
    {// 6
        n: 'hands', // name
        rq: 0, // requires card
    },
    {// 7
        n: 'sight', // name
        rq: 0, // requires card
    },
    {// 8
        n: 'hear', // name
        rq: 0, // requires card
    },
    {// 9
        n: 'family', // name
        rq: 0, // requires card
    },
    {// 10
        n: 'friends', // name
        rq: 0, // requires card
    },
    {// 11
        n: 'kidney', // name
        rq: 0, // requires card
    },
    {// 12
        n: 'color', // name
        rq: 7, // requires sight
    },
    {// 13
        n: 'speech', // name
        rq: 8, // requires hear
    },
    {// 14
        n: 'dash', // name
        rq: 4, // requires walk
    },
    {// 15
        n: 'climb', // name
        rq: 5, // requires jump
    },
    {// 16
        n: 'strength', // name
        rq: 5, // requires jump
    },
    0, // 17
    0, // 18
    0, // 19
    0, // 20
    0, // 21
    0, // 22
    0, // 23
    0, // 24
    0, // 25
    0, // 26
    0, // 27
    0, // 28
    0, // 29

    // items (30+)
    {// 30
        n: 'sword', // name
        rq: 6, // requires hand
    },
    {// 31
        n: 'wand', // name
        rq: 6, // requires hand
    },
    {// 32
        n: 'shield', // name
        rq: 6, // requires hand
    },
    {// 33
        n: 'armor', // name
        rq: 0, // requires card
    },
    {// 34
        n: 'elem armor', // name
        rq: 0, // requires card
    },
    {// 35
        n: 'potion', // name
        rq: 6, // requires hand
    },
    {// 36
        n: 'flower', // name
        rq: 6, // requires hand
    },
    {// 37
        n: 'torch', // name
        rq: 6, // requires hand
    },
    {// 38
        n: 'compass', // name
        rq: 6, // requires hand
    },
    {// 39
        n: 'map', // name
        rq: 6, // requires hand
    },
    {// 40
        n: 'glasses', // name
        rq: 12, // requires colors
    },
    {// 41
        n: 'treasure', // name
        rq: 0, // requires colors
    },
];

const tiers = [
    /* 0 = existence */[0, 1],
    /* 1 = being     */[3, 4, 5, 6, 7, 8, 9, 10],
    /* 2 = health    */[11, 12, 13, 16],
    /* 3 = skill     */[14, 15],
];
const rare = [
    /* 0 = common    */[35, 36],
    /* 1 = rare      */[30, 32, 33],
    /* 2 = epic      */[31, 34, 37, 38],
    /* 3 = legendary */[39, 40],
];

console.log(cards, tiers, rare);


const changeMap = (_new_map) => {
    scene = _new_map;
    map = (scene == 'h' ? map_home : map_dungeon);
    map_w = map[0].length;  // map width in tiles
    map_h = map.length;     // map height in tiles
    entities = [];
    if (scene == 'd') {
        hero_x = 9;
        hero_y = 5;
    } else {
        hero_x = 9;
        hero_y = 5;
    }

    const doorCandidates = [];
    const spikeCandidates = [];
    const spawnCandidates = [];
    for (let y = 0; y < map_h; y++) {
        for (let x = 0; x < map_w; x++) {
            const tile = map[y][x];
            if (tile == 'D') {
                doorCandidates.push({ x, y });
            }
            if (tile == '3') {
                spikeCandidates.push({ x, y });
            }
            if (tile == '2') {
                spawnCandidates.push({ x, y });
            }
        }
    }

    if (scene == 'd') {
        const { x, y } = doorCandidates.splice(Math.floor(Math.random() * doorCandidates.length), 1)[0];
        hero_x = x;
        hero_y = y;
    }
    const doorCount = 3;
    for (let i = 0; doorCandidates.length && i < doorCount; i++) {
        const { x, y } = doorCandidates.splice(Math.floor(Math.random() * doorCandidates.length), 1)[0];
        entities.push({ type: 'D', x: x + 0.1, y: y - 0.6, w: 0.8, h: 1.6 });
    }
    const spikeCount = 10;
    for (let i = 0; spikeCandidates.length && i < spikeCount; i++) {
        const { x, y } = spikeCandidates.splice(Math.floor(Math.random() * spikeCandidates.length), 1)[0];
        entities.push({ type: '3', x: x + 0.3, y: y + 0.4, w: 0.6, h: 0.6 });
    }
    const enemyCount = 10;
    for (let i = 0; spawnCandidates.length && i < enemyCount; i++) {
        const { x, y } = spawnCandidates.splice(Math.floor(Math.random() * spawnCandidates.length), 1)[0];
        entities.push({ type: 'E', x: x + 0.3, y: y + 0.4, w: 0.6, h: 0.6 });
    }
    const treasureCount = 10;
    for (let i = 0; spawnCandidates.length && i < treasureCount; i++) {
        const { x, y } = spawnCandidates.splice(Math.floor(Math.random() * spawnCandidates.length), 1)[0];
        entities.push({ type: 'T', x: x + 0.3, y: y + 0.4, w: 0.6, h: 0.6 });
    }

    transition_progress = 2000;

}
changeMap('h');


// World
const g1 = 0.012;    // gravity in tiles/frame²
const g2 = 0.018;    // gravity in tiles/frame²
let scroll_x = 0; // X scroll in tiles
let scroll_y = 0; // X scroll in tiles

// Inputs (see https://xem.github.io/articles/jsgamesinputs.html)
const input = {
    u: 0,
    d: 0,
    l: 0,
    r: 0,
    a: 0, /* attack */
    c1: 0, /* cheats */
    c2: 0, /* cheats */
};

const keyHandler = ({ keyCode: w, type: t }) => {
    // console.log("keyHandler", w, t);
    const keyMap = {
        87: 'u', /*W*/
        90: 'u', /*Z*/
        38: 'u', /*↑*/
        83: 'd', /*S*/
        40: 'd', /*↓*/
        65: 'l', /*A*/
        81: 'l', /*Q*/
        37: 'l', /*←*/
        68: 'r', /*D*/
        39: 'r', /*→*/
        74: 'a', /*J*/
        75: 'a', /*K*/
        48: 'c1', /*0*/
    };

    input[keyMap[w]] = +(t[3] < 'u');

    if (input.c1) {
        unlocks.torch = !unlocks.torch;
        a.width = (unlocks.torch ? 720 : 480); // 720x480 vs 480x320
        a.height = (unlocks.torch ? 480 : 320);
    }
};
window.addEventListener('keydown', keyHandler);
window.addEventListener('keyup', keyHandler);

// Game loop (60 fps)
setInterval(() => {
    frameID++;

    // Clear
    a.width ^= 0;

    // Compute hero position:
    // The hero's bounding rectangle's corners have the following coordinates:
    //
    //           [hero_x, hero_y]      [hero_x + hero_w, hero_y]
    //                           ______
    //                          |     |  
    //                          |     |  
    //                          |     |  
    //                          |     |  
    //                          |_____|
    //
    // [hero_x, hero_y + hero_h]      [hero_x + hero_w, hero_y + hero_h]


    // Apply gravity to Y acceleration, Y acceleration to Y speed and Y speed to Y position
    const g = hero_vy <= 0 ? g1 : g2;
    hero_vy += g;
    hero_vy += hero_ay;
    if (hero_vy > 0.25) hero_vy = 0.25;
    hero_y += hero_vy;

    // Vertical bounds
    if (hero_y < 0) {
        hero_y = 0;
        hero_vy = 0;
        hero_ay = 0;
    }
    if (hero_y > map_h - 1) {
        return;
    }

    // Get the value of the tiles at the bottom corners of the hero
    const tile1 = +map[Math.floor(hero_y + hero_h)][Math.floor(hero_x)];
    const tile2 = +map[Math.floor(hero_y + hero_h)][Math.floor(hero_x + hero_w - .1)];

    // If this tile is solid, put the hero on top of it (he's grounded)
    if (tile1 == 1 || tile2 == 1) {
        hero_y = Math.floor(hero_y + hero_h) - hero_h;
        hero_grounded = frameID + 5;
        hero_vy = 0;
        hero_ay = 0;
    }

    if (transition_progress > 0) {
        input.l = 0;
        input.r = 0;
        input.u = 0;
        input.d = 0;
    } else {

        // If moving up
        if (hero_vy < 0) {

            // Get the value of the tiles at the top corners of the hero
            const tile1 = +map[Math.floor(hero_y)][Math.floor(hero_x)];
            const tile2 = +map[Math.floor(hero_y)][Math.floor(hero_x + hero_w - .1)];

            // If this tile is solid, put the hero on the bottom side of it and make him fall
            if (tile1 == 1 || tile2 == 1) {
                hero_y = Math.ceil(hero_y);
                hero_vy = 0;
            }
        }
        // If left key is pressed, go left
        if (input.l) {
            // console.log('input.l 1', Math.floor(hero_y), Math.floor(hero_x));
            hero_x -= .1;
            hero_x = Math.max(hero_x, 0);
            // console.log('input.l 2', Math.floor(hero_y), Math.floor(hero_x), map[Math.floor(hero_y)][Math.floor(hero_x)]);
            // console.log('input.l 3', Math.floor(hero_y + hero_h - .1), Math.floor(hero_x), map[Math.floor(hero_y + hero_h - .1)][Math.floor(hero_x)]);

            // Get the value of the tiles at the left corners of the hero
            const tile1 = +map[Math.floor(hero_y)][Math.floor(hero_x)];
            const tile2 = +map[Math.floor(hero_y + hero_h - .1)][Math.floor(hero_x)];

            // If this tile is solid, put the hero on the right side of it
            if (tile1 == 1 || tile2 == 1) {
                hero_x = Math.ceil(hero_x);
                // console.log('input.l =4=', Math.floor(hero_y + hero_h - .1), Math.floor(hero_x));
            }
        }

        // If right key is pressed, go right
        if (input.r) {
            hero_x += .1;
            hero_x = Math.min(map_w - hero_w, hero_x);

            // Get the value of the tiles at the left corners of the hero
            const tile1 = +map[Math.floor(hero_y)][Math.floor(hero_x + hero_w)];
            const tile2 = +map[Math.floor(hero_y + hero_h - .1)][Math.floor(hero_x + hero_w)];

            // If this tile is solid, put the hero on the right side of it
            if (tile1 == 1 || tile2 == 1) {
                hero_x = Math.floor(hero_x + hero_w) - hero_w;
            }
        }

        // If up key is pressed and the hero is grounded, jump
        if (input.u && hero_vy >= 0 && hero_grounded >= frameID && hero_can_jump) {
            // console.log('jump', hero_grounded, frameID);
            hero_vy = -.315;
            hero_can_jump = 0;
        }
        if (!input.u) {
            hero_can_jump = 1;
        }

        // draw other entities
        for (let index = 0; index < entities.length; index++) {
            const { type, x, y, w, h } = entities[index];

            const hasCollision = (hero_x < x + w &&
                hero_x + hero_w > x &&
                hero_y < y + h &&
                hero_y + hero_h > y);

            if (!hasCollision) continue;

            if (type == 'D') {
                changeMap(scene == 'h' ? 'd' : 'h');
            } else if (type == '3') {
                console.log('spike!');
                entities.splice(index, 1);
                index--;
            }
        }
    }

    // Compute scroll
    const cam_ww = (!unlocks.torch ? 7 : 9.5);
    const cam_hh = (!unlocks.torch ? 5 : 7.5);
    scroll_x = Math.max(0, Math.min(hero_x - cam_ww, map_w - cam_ww - cam_ww - 1));
    scroll_y = Math.max(0, Math.min(hero_y - cam_hh, map_h - cam_hh - cam_hh));

    // Draw map
    const draw_x = Math.floor(scroll_x);
    const draw_y = Math.floor(scroll_y);
    for (let x = draw_x; x < map_w && x <= draw_x + 23; x++) {
        for (let y = draw_y; y < map_h && y <= draw_y + 16; y++) {
            const tile = map[y][x];
            if (tile == '1') {
                c.fillStyle = "green";
                c.rect((x - scroll_x) * tile_w, (y - scroll_y) * tile_h, tile_w, tile_h);
                c.fill();
            }
        }
    }
    // // draw coordinates
    // for (let x = draw_x; x < map_w && x <= draw_x + 23; x++) {
    //     for (let y = draw_y; y < map_h && y <= draw_y + 16; y++) {
    //         const tile = map[y][x];
    //         c.fillStyle = "black";
    //         c.fillText(`[${y}, ${x}]`, (x - scroll_x) * tile_w, (y - scroll_y) * tile_h)
    //     }
    // }
    // draw other entities
    entities.forEach(({ type, x, y, w, h }) => {
        if (type == 'D') {
            c.fillStyle = "brown";
            c.fillRect((x - scroll_x) * tile_w, (y - scroll_y) * tile_h, w * tile_w, h * tile_h);
            c.fillStyle = "black";
            c.fillRect((x - scroll_x) * tile_w + 4, (y - scroll_y) * tile_h + 6, w * tile_w - 8, h * tile_h - 8);
        }
        if (type == '3') {
            c.fillStyle = "red";
            c.fillRect((x - scroll_x) * tile_w, (y - scroll_y) * tile_h, w * tile_w, h * tile_h);
        }
    });

    // Draw hero
    c.fillStyle = "orange";
    c.fillRect((hero_x - scroll_x) * tile_w, (hero_y - scroll_y) * tile_h, hero_w * tile_w, hero_h * tile_h);


    if (transition_progress < 0) {
        transition_progress += 16;

        if (transition_progress >= 0) {
            transition_progress = 0;
        }
    } else if (transition_progress > 0) {
        c.fillStyle = `rgba(0,0,0,${(transition_progress / 1000).toFixed(1)})`;
        c.fillRect(0, 0, a.width, a.height);
        c.fillStyle = 'white';
        c.textAlign = 'center';
        c.font = `32px Arial`;
        c.fillText(scene == 'h' ? `Village` : `Dungeon`, a.width / 2, a.height / 2);
        c.font = `16px Arial`;
        c.fillText(scene == 'h' ? `Day 1` : `Night 1`, a.width / 2, a.height / 2 + 32);
        transition_progress -= 16;

        if (transition_progress <= 0) {
            transition_progress = 0;
        }
    }

}, 16);

