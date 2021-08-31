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
    "100000000000000001000000011111110111000001000000000001000000000000000000000001",
    "100000000000000001000000000000010000001000000010000001000000000000000000000001",
    "100000000200000D01011100000000010000000000010000000000000000000001111000000001",
    "100000011111111111000000000000010000000000000000011100000000000000000000000001",
    "100000000000000001000000200000010000000000000000000000000000000000000000020001",
    "100000000000000001000111111000010001111000000000000000020000000000000111111111",
    "100001110000000001000000000000010000000000000000000011111100000000000000000001",
    "100000000000000001000000000000010000000000002000000010000000000000000000000001",
    "100000000000000001111111111100010000000011111111100010000000002000000000000001",
    "101100000000000000000100000000010000000000000000000110001111111111100000000001",
    "100000000000000000000100000000010000000000000000001110000000000100000000000001",
    "100020000000000000200100000000010000020000000000011110000000000100000000000001",
    "111111111000111111111100000000010001111100000001111111000000000100000100000001",
    "100000000000000000000100000111110000000000000000000010000000000100000000000001",
    "1000000000000000000001000000000110000000000D0000000210000000000100000000000001",
    "100000000000000000000100000000011110000001111000011110010000000100000000020001",
    "100000000000002000000101111000011111100000000000000010000000000111000100111001",
    "100000111111111110000100000000011111111000000000200010002000000100000100000001",
    "100000000000000010000100000000011111111111100111111111111110000100000100000001",
    "100000000000000010000100000111110000000000000000000000001000000100001100000001",
    "100010000000000010000000000000010000000000000000000000001000000100000100000001",
    "1000100000000002100D0000020000010000000000001111110000001000000110000100000001",
    "111110000001111111111111111000010000000000000001000000001000000011111111000001",
    "1000100000000000100000000000000100000200000000010000000010000000000000010D0001",
    "100011000000000010000000000000000000111111000001001110011111000000000001111001",
    "100000001000000010000000000000000000000000000001000000000001000000000000000001",
    "100000001000000000000000000200000000000000000001000000000000000000000000000001",
    "100000001020000000000000111111111110000000001111111000000000000000000000001111",
    "100011111111100000000000000000010000000000000000001000000000000000000000000001",
    "100000001000000000000000000000010000000000000000001000000001000200000100000001",
    "100000001000000000000000000000010000111111000000001001110001111111111111111111",
    "100000001000000000000000000000010000000000000000001000000001000000000100000001",
    "111100111000010020000000000000010000000000000000001000000001000000000100000001",
    "100000001000011111111000000000010000000D00000000001111001111000000000111110001",
    "100000001000000000000000000000011111111111111110000000000001000000000000000001",
    "100001001000000000000000000000000000000000000000000200000001000000000000000001",
    "100001001020000000000000000000000000000000000000011111111001000000100000001111",
    "100011111111100000000000011110000000000000000000000000000001000000000000000001",
    "100000000000000000000000000000000000000000000000000000000001000000000000000001",
    "100000000000000000000000000000000000111100000001111000000011000000000100000001",
    "100000000000000000000000000000111100000000111100000001100001000D00000000000001",
    "111111111100000000000000000000000000000000000000000000000001111110000000010001",
    "100000000000000000000000000000000000000000000000000000000111100000000000000001",
    "100000000000000000000000000000000000000000000000000000000000000000000000000001",
    "100000D00000000020000000200000000000000200000000000020000000000000000002000001",
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
    "10000001111111111100000000000001",
    "10000000000000000000000000000001",
    "10000000000000000000011111100001",
    "10000111000000000000000000000000",
    "1030000000000000000000000000000D",
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

const start_transition = (_to) => {
    transition_progress = 1000;
    transition_to = _to;
}
const changeMap = (_new_map) => {
    scene = _new_map;
    map = (scene == 'h' ? map_home : map_dungeon);
    map_w = map[0].length;  // map width in tiles
    map_h = map.length;     // map height in tiles
}

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

// World
const g = 0.015;    // gravity in tiles/frame²
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

    // Reset grounded state
    hero_grounded = 0;

    // Apply gravity to Y acceleration, Y acceleration to Y speed and Y speed to Y position
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
        hero_grounded = 1;
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
            hero_x = Math.min(map_w - 1, hero_x);

            // Get the value of the tiles at the left corners of the hero
            const tile1 = +map[Math.floor(hero_y)][Math.floor(hero_x + hero_w)];
            const tile2 = +map[Math.floor(hero_y + hero_h - .1)][Math.floor(hero_x + hero_w)];

            // If this tile is solid, put the hero on the right side of it
            if (tile1 == 1 || tile2 == 1) {
                hero_x = Math.floor(hero_x + hero_w) - hero_w;
            }
        }

        // If up key is pressed and the hero is grounded, jump
        if (input.u && hero_grounded && hero_can_jump) {
            hero_vy = -.35;
            hero_can_jump = 0;
        }

        // If up key is released, allow hero to jump again next time he's grounded
        if (!input.u) {
            hero_can_jump = 1;
        }
    }

    // Compute scroll
    const cam_x = (!unlocks.torch ? 7 : 9.5);
    const cam_y = (!unlocks.torch ? 5 : 8);
    if (hero_x > cam_x && hero_x < map_w - cam_x) scroll_x = hero_x - cam_x;
    if (hero_y > cam_y && hero_y < map_h - cam_y) scroll_y = hero_y - cam_y;

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
    // for (let x = draw_x; x < map_w && x <= draw_x + 23; x++) {
    //     for (let y = draw_y; y < map_h && y <= draw_y + 16; y++) {
    //         const tile = map[y][x];
    //         c.fillStyle = "black";
    //         c.fillText(`[${y}, ${x}]`, (x - scroll_x) * tile_w, (y - scroll_y) * tile_h)
    //     }
    // }

    // Draw hero
    c.fillStyle = "orange";
    c.fillRect((hero_x - scroll_x) * tile_w, (hero_y - scroll_y) * tile_h, hero_w * tile_w, hero_h * tile_h);


    if (transition_progress <= 0) {
        if (transition_to != scene) {
            changeMap(transition_to);
        }
    } else {
        c.fillStyle = `rgba(0,0,0,${(transition_progress / 1000).toFixed(1)})`;
        c.fillRect(0, 0, a.width, a.height);
        transition_progress -= 16;
    }

}, 16);

