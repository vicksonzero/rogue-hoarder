//@ts-check

// Canvas
const a = document.querySelector("canvas");
const c = a.getContext("2d");

// Map
const map = [
    "111111111111111111111111111111111111111111111111111111111111111111111111111111",
    "100000000000000001000000000000000000000000000000000001000000000000000000000001",
    "100000000000000001000000000000000000000000000000000001000000000000000000000001",
    "100000000000000001000000000000000000000000000000000001000000000000000000000001",
    "100000000000000001000000011111110111000001000000000001000000000000000000000001",
    "100000000300000001000000000000010000001000000010000001000000000000000000000001",
    "100000000300000001011100000000010000000000010000000000000000000000000000000001",
    "100000011111111111000000000000010000000000000000011100000000000000000000000001",
    "100000000000000001000000200000010000000000000000000000000000000000000000000001",
    "100000000000000001000111111000010001111000000000000000000000000000000111111111",
    "100001110000000001000000000000010000000000000000000011111100000000000000000001",
    "100000000000000001000000000000010000000000000000000010000000000000000000000001",
    "100000000000000001111111111100010000000011111111100010000000000000000000000001",
    "101100000000000000000100000000010000000000000000000110011111111111100000000001",
    "100000000000000000000100000000010000000000000000001110000000000100000000000001",
    "100000000000000000200100000000010000000000000000011110000000000100000000000001",
    "111111111000111111111100000000010001111100000001111110000000000100000000000001",
    "100000000000000000000100000111110000000000000000000010000000000100000000000001",
    "100000000000000000000100000000011000000000000000000010000000000100000000000001",
    "100000000000000000000100000000011110000001111000011110000000000100000000000001",
    "100000000000000000000101111000011111100000000000000010000000000100000100111001",
    "100000111111111110000100000000011111111000000000000010000000000100000100000001",
    "100000000000000010000100000000011111111111100111111111111110000100000100000001",
    "100000000000000010000100000111110000000000000000000000001000000100000100000001",
    "100000000000000010000000000000010000000000000000000000001000000100000100000001",
    "100000000000000010000000000000010000000000001111110000001000000110000100000001",
    "100000000000000011111111111000010000000000000001000000001000000011111111000001",
    "100000000000000010000000000000010000000000000001000000001000000000000001000001",
    "100000000000000010000000000000000000111111000001001110011111000000000001111001",
    "100000000000000010000000000000000000000000000001000000000001000000000000000001",
    "100000001000000000000000000000000000000000000001000000000000000000000000000001",
    "100000001000000000000000111111111110000000001111111000000000000000000000001111",
    "100000001000000000000000000000010000000000000000001000000000000000000000000001",
    "100000001000000000000000000000010000000000000000001000000001000000000100000001",
    "100000001000000000000000000000010000111111000000001001110001111111111111111111",
    "100000001000000000000000000000010000000000000000001000000001000000000000000001",
    "100000001000010000000000000000010000000000000000001000000001000000000000000001",
    "100000001000011111111000000000010000000000000000001111001111000000000000000001",
    "100000001000000000000000000000010000000000000000000000000001000000000000000001",
    "100000001000000000000000000000010000000000000000000000000001000000000000000001",
    "100000001000000000000000000000011111111111111110011111110011000000000000000001",
    "100000001000000000000000011110000000000000000000000000000001000000000000000001",
    "100000000000000000000000000000000000000000000000000000000001000000000000000001",
    "100000000000000000000000000000000000111100000001111000000011000000000000000001",
    "100000000000000000000000000000111100000000111100000001100001000000000000000001",
    "100000000000000000000000000000000000000000000000000000000001111110000000000001",
    "100000000000000000000000000000000000000000000000000000000111100000000000000001",
    "100000000000000000000000000000000000000000000000000000000000000000000000000001",
    "100000000000000000000000000000000000000000000000000000000000000000000000000001",
    "111111111111111111111111111111111111111111111111111111111111111111111111111111",
];

const tile_w = 32;  // tiles width in px
const tile_h = 32;  // tiles height in px
const map_w = map[0].length;  // map width in tiles
const map_h = map.length;     // map height in tiles

// Hero
let hero_w = .8;  // hero width in tiles 
let hero_h = 1.3;  // hero height in tiles
let hero_x = 10;   // X position in tiles
let hero_y = 2;   // Y position in tiles
let hero_vy = 0;  // Y speed
let hero_ay = 0;  // Y acceleration
let hero_grounded = 0; // hero is grounded
let hero_canjump = 1;  // hero can jump (or jump again after Up key has been released)

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
};
window.onkeydown = window.onkeyup = e => {
    input['lurdl*d*l*ur*u'[(e.which + 3) % 20]] = e.type[3] < 'u';
};

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
    const tile1 = map[Math.floor(hero_y + hero_h)][Math.floor(hero_x)];
    const tile2 = map[Math.floor(hero_y + hero_h)][Math.floor(hero_x + hero_w - .1)];

    // If this tile is solid, put the hero on top of it (he's grounded)
    if (tile1 == '1' || tile2 == '1') {
        hero_y = Math.floor(hero_y + hero_h) - hero_h;
        hero_grounded = 1;
        hero_vy = 0;
        hero_ay = 0;
    }

    // If left key is pressed, go left
    if (input.l) {
        hero_x -= .1;
        hero_x = Math.max(hero_x, 0);

        // Get the value of the tiles at the left corners of the hero
        const tile1 = map[Math.floor(hero_y)][Math.floor(hero_x)];
        const tile2 = map[Math.floor(hero_y + hero_h - .1)][Math.floor(hero_x)];

        // If this tile is solid, put the hero on the right side of it
        if (tile1 == '1' || tile2 == '1') {
            hero_x = Math.ceil(hero_x);
        }
    }

    // If right key is pressed, go right
    if (input.r) {
        hero_x += .1;
        hero_x = Math.min(map_w - 1, hero_x);

        // Get the value of the tiles at the left corners of the hero
        const tile1 = map[Math.floor(hero_y)][Math.floor(hero_x + hero_w)];
        const tile2 = map[Math.floor(hero_y + hero_h - .1)][Math.floor(hero_x + hero_w)];

        // If this tile is solid, put the hero on the right side of it
        if (tile1 == '1' || tile2 == '1') {
            hero_x = Math.floor(hero_x + hero_w) - hero_w;
        }
    }

    // If up key is pressed and the hero is grounded, jump
    if (input.u && hero_grounded && hero_canjump) {
        hero_vy = -.35;
        hero_canjump = 0;
    }

    // If up key is released, allow hero to jump again next time he's grounded
    if (!input.u) {
        hero_canjump = 1;
    }

    // If moving up
    if (hero_vy < 0) {

        // Get the value of the tiles at the top corners of the hero
        const tile1 = map[Math.floor(hero_y)][Math.floor(hero_x)];
        const tile2 = map[Math.floor(hero_y)][Math.floor(hero_x + hero_w - .1)];

        // If this tile is solid, put the hero on the bottom side of it and make him fall
        if (tile1 == '1' || tile2 == '1') {
            hero_y = Math.ceil(hero_y);
            hero_vy = 0;
        }
    }

    // Compute scroll
    if (hero_x > 7 && hero_x < map_w - 7) scroll_x = hero_x - 7;
    if (hero_y > 5 && hero_y < map_h - 5) scroll_y = hero_y - 5;

    // Draw map
    const draw_x = Math.floor(scroll_x);
    const draw_y = Math.floor(scroll_y);
    for (let x = draw_x; x < map_w && x <= draw_x + 20; x++) {
        for (let y = draw_y; y < map_h && y <= draw_y + 20; y++) {
            const tile = map[y][x];
            if (tile == '1') {
                c.fillStyle = "green";
                c.rect((x - scroll_x) * tile_w, (y - scroll_y) * tile_h, tile_w, tile_h);
                c.fill();
            }
        }
    }

    // Draw hero
    c.fillStyle = "orange";
    c.fillRect((hero_x - scroll_x) * tile_w, (hero_y - scroll_y) * tile_h, hero_w * tile_w, hero_h * tile_h);

}, 16);

