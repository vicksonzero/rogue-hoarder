//@ts-check

// Canvas
const a = document.querySelector("canvas");

/** @type HTMLDivElement */
const h = document.querySelector("#h");
/** @type HTMLDivElement */
const l = document.querySelector("#list");
/** @type HTMLDivElement */
const p = document.querySelector("#p");
p.style.display = 'none';
const c = a.getContext("2d");

// cache
const a_cache = document.createElement("canvas");
const a_cache_c = a_cache.getContext('2d');

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
    "10000000000000020001110000000001",
    "10000001111111111000000000000001",
    "11000000000000000000000000000001",
    "11000000000000000000011111100001",
    "11000111000000000000000000000000",
    "11d0000000000000000000000000000D",
    "11111111111111111111111111111111",
];


const cards = [
    {// 0
        n: '', // name
        i: '',
        rq: 1, // requires live
    },
    {// 1
        n: 'live', // name
        i: '🤍',
        rq: 1, // requires live
    },
    {// 2
        n: 'love', // name
        i: '❤',
        rq: 1, // requires live
    },
    {// 3
        n: 'health', // name
        i: '👍',
        rq: 1, // requires live
    },
    {// 4
        n: 'mind', // name
        i: '💭',
        rq: 1, // requires live
    },
    {// 5
        n: 'run', // name
        i: '🦶',
        rq: 1, // requires live
    },
    {// 6
        n: 'jump', // name
        i: '🐇',
        rq: 1, // requires live
    },
    {// 7
        n: 'hands', // name
        i: '🖐',
        rq: 1, // requires live
    },
    {// 8
        n: 'sight', // name
        i: '👀',
        rq: 1, // requires live
    },
    {// 9
        n: 'hear', // name
        i: '👂',
        rq: 1, // requires live
    },
    {// 10
        n: 'family', // name
        i: '🏠',
        rq: 2, // requires love
    },
    {// 11
        n: 'friends', // name
        i: '👨🏻‍🤝‍👨🏻',
        rq: 2, // requires love
    },
    {// 12
        n: 'kidney', // name
        i: '📱',
        rq: 1, // requires live
    },
    {// 13
        n: 'color', // name
        i: '🎨',
        rq: 8, // requires sight
    },
    {// 14
        n: 'speech', // name
        i: '👄',
        rq: 9, // requires hear
    },
    {// 15
        n: 'dash', // name
        i: '🏃‍♂️',
        rq: 5, // requires run
    },
    {// 16
        n: 'climb', // name
        i: '🧗‍♂️',
        rq: 7, // requires jump
    },
    {// 17
        n: 'strength', // name
        i: '💪',
        rq: 7, // requires jump
    },
    { n: '', rq: 0, i: '' }, // 18
    { n: '', rq: 0, i: '' }, // 19
    { n: '', rq: 0, i: '' }, // 20
    { n: '', rq: 0, i: '' }, // 21
    { n: '', rq: 0, i: '' }, // 22
    { n: '', rq: 0, i: '' }, // 23
    { n: '', rq: 0, i: '' }, // 24
    { n: '', rq: 0, i: '' }, // 25
    { n: '', rq: 0, i: '' }, // 26
    { n: '', rq: 0, i: '' }, // 27
    { n: '', rq: 0, i: '' }, // 28
    { n: '', rq: 0, i: '' }, // 29

    // items (30+)
    {// 30
        n: 'sword', // name
        i: '🗡',
        rq: 7, // requires hand
    },
    {// 31
        n: 'wand', // name
        i: '✨',
        rq: 7, // requires hand
    },
    {// 32
        n: 'shield', // name
        i: '🛡',
        rq: 7, // requires hand
    },
    {// 33
        n: 'armor', // name
        i: '👷',
        rq: 1, // requires live
    },
    {// 34
        n: 'elem armor', // name
        i: '',
        rq: 1, // requires live
    },
    {// 35
        n: 'potion', // name
        i: '💊',
        rq: 7, // requires hand
    },
    {// 36
        n: 'flower', // name
        i: '🌹',
        rq: 7, // requires hand
    },
    {// 37
        n: 'torch', // name
        i: '🔦',
        rq: 7, // requires hand
    },
    {// 38
        n: 'compass', // name
        i: '🧭',
        rq: 7, // requires hand
    },
    {// 39
        n: 'map', // name
        i: '🗺️',
        rq: 7, // requires hand
    },
    {// 40
        n: 'glasses', // name
        i: '👓',
        rq: 13, // requires colors
    },
    {// 41
        n: 'treasure', // name
        i: '🎁',
        rq: 0, // requires none
    },
];

const tiers = [
    /* 0 = existence */[1, 2], // 3 is the health card
    /* 1 = being     */[5, 6, 7, 8, 9, 10, 11],
    /* 2 = health    */[12, 13, 14, 17, 4],
    /* 3 = skill     */[15, 16],
];
const rare = [
    /* 0 = common    */[35, 36],
    /* 1 = rare      */[30, 32, 33],
    /* 2 = epic      */[31, 34, 37, 38],
    /* 3 = legendary */[39, 40],
];

for (let i = 0; i < tiers.length; i++) {
    const tier = tiers[i];
    for (const id of tier) {
        cards[id].t = i;
    }
}

/**
 * @typedef IEnemyDef 
   @property {string} n
   @property {number} d
   @property {number} hp
   @property {number} w
   @property {number} h
   @property {number} sp
   @property {string} b
 */
/**
 * @typedef IEnemy
   @property {string} n
   @property {number} d
   @property {number} hp
   @property {number} maxHp
   @property {number} w
   @property {number} h
   @property {number} sp
   @property {string} b
   @property {number} facing // -1 means left, 1 means right
   @property {string} element // '' | 'F' | 'W' | 'E'
   @property {number} sx // spawn x
   @property {number} sy // spawn y
 */

/**
 * @typedef IEntity
   @property {string} type
   @property {number} x
   @property {number} y
   @property {number} w
   @property {number} h
   @property {number} h
 */

/** @type {IEnemyDef[]} */
const enemies = [
    // all enemies share attack dmg (=1) and attack cool down (2s)
    // all enemies can have elements. e-enemies must have elements
    // all enemies have difficulty rating for spawning
    // all enemies spawns in maxHp
    // all enemies can be knocked back, except heavy

    // behaviors
    // p = patrol
    // h = hang
    // w = walk
    // m = melee
    // a = armor? (allow hp+3)
    // f = fly
    // s = shooty
    // e = element! (diff+3)
    // v = venom (every 3 second, have a low chance to take damage)
    // y = heavy (cannot be knocked back)

    {// 100
        n: 'Rat',
        d: 1, // difficulty rating
        hp: 2,
        w: 0.6,
        h: 0.5,
        sp: 0.05,
        b: 'wmp', // behaviors: walk, melee, patrol-around-home
    },
    {// 101
        n: 'Bat',
        d: 2, // difficulty rating
        hp: 2,
        w: 0.65,
        h: 0.65,
        sp: 0.04,
        b: 'fmp', // behaviors: fly, melee, patrol
    },
    {// 102
        n: 'Bee',
        d: 3, // difficulty rating
        hp: 3,
        w: 0.5,
        h: 0.5,
        sp: 0.04,
        b: 'fsp', // behaviors: fly, shooty, patrol
    },
    {// 103
        n: 'Skeleton',
        d: 4, // difficulty rating
        hp: 5,
        w: 0.8,
        h: 0.5,
        sp: 0.05,
        b: 'wma', // behaviors: walk, melee, armor?
    },
    {// 104
        n: 'Spider',
        d: 4, // difficulty rating
        hp: 5,
        w: 0.85,
        h: 0.5,
        sp: 0.05,
        b: 'hm', // behaviors: hang, melee
    },
    {// 105
        n: 'Troll',
        d: 8, // difficulty rating
        hp: 10,
        w: 0.8,
        h: 1.5,
        sp: 0.05,
        b: 'wma', // behaviors: walk, melee, armor?
    },
    {// 106
        n: 'Minotaur',
        d: 10, // difficulty rating
        hp: 15,
        w: 0.8,
        h: 1.5,
        sp: 0.05,
        b: 'wmpa', // behaviors: walk, melee, patrol, armor?
    },
    {// 107
        n: 'Wisp', // ghost fire
        d: 3, // difficulty rating, excluding elements
        hp: 5,
        w: 0.8,
        h: 1.5,
        sp: 0.05,
        b: 'fspe', // behaviors: fly, shooty, patrol, element! (diff+3)
    },
    {// 108
        n: 'Snake',
        d: 4, // difficulty rating, excluding elements
        hp: 3,
        w: 0.8,
        h: 0.9,
        sp: 0.03,
        b: 'wspv', // behaviors: walk, shooty, patrol, venom
    },
    {// 109
        n: 'Golem',
        d: 14, // difficulty rating, excluding elements
        hp: 25,
        w: 1.2,
        h: 1.6,
        sp: 0.01,
        b: 'wmpy', // behaviors: walk, shooty, patrol, heavy
    },
];

console.log(cards, tiers, rare, enemies);


// existence
// // none

// being
let can_do_jump = true;
let can_do_run = true;
let can_do_wield = true;
let can_do_sight = true;
let can_do_hear = true;
let can_do_family = true;
let can_do_friends = true;

// health
let can_do_sort = true;
let can_do_armor = true;
let can_do_color = true;
let can_do_speech = true;

// skill
let can_do_dash = false;
let can_do_climb = false;

// items
let can_do_sword = false;
let can_do_wand = false;
let can_do_shield = false;
let can_do_torch = false; // 720x480 vs 480x320 screen


let scene = 'h'; // h=home, d=dungeon
let transition_progress = 1000; // ms, count till 0
let transition_to = 'h'; // see `scene`
let paused = false;

let map = (scene == 'h' ? map_home : map_dungeon);
let map_w = map[0].length;  // map width in tiles
let map_h = map.length;     // map height in tiles
let entities = [];
let frameID = 0;

/* #IfDev */
window['test'] = {
    get entities() { return entities },
    get cards() { return cards },
    get transition_progress() { return transition_progress },
    get lostAbilities() { return lostAbilities },
    get inventory() { return inventory },

    //@ts-ignore
    get tiers() { return tiers.map(tier => tier.map(_i => ({ ...cards[_i], _i }))) },
    //@ts-ignore
    get rare() { return rare.map(tier => tier.map(_i => ({ ...cards[i], _i }))) },
};
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
let hero_tier = 3; // used to unlock health cards
let inventory = [3, 0, 0, 0, 0].map(i => (cards[i]));
let lostAbilities = [];


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
    entities = entities.concat(spawnEnemy(spawnCandidates, enemyCount));

    const treasureCount = 10;
    for (let i = 0; spawnCandidates.length && i < treasureCount; i++) {
        const { x, y } = spawnCandidates.splice(Math.floor(Math.random() * spawnCandidates.length), 1)[0];
        entities.push({ type: 'T', x: x + 0.3, y: y + 0.4, w: 0.6, h: 0.6 });
    }

    transition_progress = 2000;

};

const pauseGame = () => {
    paused = !paused;

    if (paused) {
        console.log('pauseGame');
        transition_progress = -1000;

        p.style.display = 'block';
        h.style.display = 'none';
        updateInventoryList();
    } else {
        transition_progress = 0;

        p.style.display = 'none';
        h.style.display = 'flex';
    }
};

const updateInventoryList = () => {
    l.innerHTML = inventory.map(({ n, i, t }, _i) => `<div class="card c-${t}" data-c=${_i} onclick="prioritize(${_i})"><i>${i}</i>${n}</div>`).join('') + '<div>←💀</div>';
    h.innerHTML = inventory.map(({ i, t }, _i) => `<div class="card c-${t}" data-c=${_i}>${i}</div>`).join('');
};
updateInventoryList();

window['prioritize'] = (i) => {
    const item = inventory.splice(i, 1)[0];
    inventory.push(item);
    updateInventoryList();
}

const spawnEnemy = (spawnCandidates, enemyCount) => {
    let result = [];
    /** @type {IEnemy} */
    let enemy;

    const rf = (arr) => { // FIXME: to be removed when merging with unpushed master
        return arr[~~(Math.random() * arr.length)];
    }

    for (let i = 0; spawnCandidates.length && i < enemyCount; i++) {
        const { x, y } = spawnCandidates[Math.floor(Math.random() * spawnCandidates.length)];

        const enemyDef = enemies[rf([1, 0])];
        const { w, h } = enemyDef;
        const sx = x + (1 - w) / 2;
        const sy = y + 1 - h - (enemyDef.b.includes('f') ? 1 : 0);
        enemy = {
            ...enemyDef,
            maxHp: enemyDef.hp,
            facing: 1,
            element: '',
            sx,
            sy,
        };

        return {
            type: 'E',
            x: sx,
            y: sy,
            w, h,
            enemy,
        };
    }

    return result;
};

const takeDamage = () => {
    const lastItem = inventory[inventory.length - 1];
    if (inventory.findIndex(item => item.n == lastItem.n) < 30) { // is ability
        lostAbilities.push(lastItem);
    }
    inventory.pop();
    updateAbilityList();
    updateInventoryList();
};

const updateAbilityList = () => {
    const old_tier = hero_tier;
    if (hero_tier == 3 && !inventory.find(card => card.n == 'health')) { // if health is lost
        hero_tier = 2;
    } else if (hero_tier == 2 && inventory.filter(card => card.t == 2).length <= 1) { // if enough tier 2 is lost
        hero_tier = 1;
    } else if (hero_tier == 1 && inventory.filter(card => card.t == 1).length <= 1) { // if enough tier 1 is lost
        hero_tier = 0;
    }

    if (old_tier != hero_tier) {
        tiers[hero_tier].forEach(id => {
            inventory.unshift(cards[id]);
        });
    }


    can_do_run = (hero_tier >= 2 || inventory.some(card => card.n == 'run'));
    can_do_jump = (hero_tier >= 2 || inventory.some(card => card.n == 'jump'));
    can_do_wield = (hero_tier >= 2 || inventory.some(card => card.n == 'hands'));
    can_do_sight = (hero_tier >= 2 || inventory.some(card => card.n == 'sight'));
    can_do_hear = (hero_tier >= 2 || inventory.some(card => card.n == 'hear'));
    can_do_family = (hero_tier >= 2 || inventory.some(card => card.n == 'family'));
    can_do_friends = (hero_tier >= 2 || inventory.some(card => card.n == 'friends'));

    // health
    can_do_sort = (hero_tier >= 3 || inventory.some(card => card.n == 'mind'));
    can_do_armor = (hero_tier >= 3 || inventory.some(card => card.n == 'strength'));
    can_do_color = (hero_tier >= 3 || inventory.some(card => card.n == 'color'));
    can_do_speech = (hero_tier >= 3 || inventory.some(card => card.n == 'speech'));

    // skill
    can_do_dash = (inventory.some(card => card.n == 'dash'));
    can_do_climb = (inventory.some(card => card.n == 'climb'));

    // items
    can_do_sword = (inventory.some(card => card.n == 'sword'));
    can_do_wand = (inventory.some(card => card.n == 'wand'));
    can_do_shield = (inventory.some(card => card.n == 'shield'));
    can_do_torch = (inventory.some(card => card.n == 'torch'));

    update_can_do_torch();

};

const update_can_do_torch = () => {
    a.width = (can_do_torch ? 720 : 480); // 720x480 vs 480x320
    a.height = (can_do_torch ? 480 : 320);
}

const fillRectC = (/** @type {CanvasRenderingContext2D} */ c, cx, cy, w, h, fill, stroke) => {
    c.beginPath();
    c.fillStyle = fill;
    c.rect((cx - w / 2) * tile_w, (cy - h / 2) * tile_w, w * tile_w, h * tile_w);
    c.fill();
    if (stroke) { c.strokeStyle = stroke; c.stroke(); }
}

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

const keyHandler = (e) => {
    const w = e.keyCode, t = e.type;

    console.log("keyHandler", w, t);
    const keyMap = {
        87: 'u', /* W */
        90: 'u', /* Z */
        38: 'u', /* ↑ */
        83: 'd', /* S */
        40: 'd', /* ↓ */
        65: 'l', /* A */
        81: 'l', /* Q */
        37: 'l', /* ← */
        68: 'r', /* D */
        39: 'r', /* → */
        74: 'a', /* J */
        75: 'a', /* K */
        48: 'c1', /* 0 */
        32: 's', /* space */
        8: 'b', /* backspace */
    };

    if (!keyMap[w]) return;

    input[keyMap[w]] = +(t[3] < 'u');

    if (input.c1 && 'c1' == keyMap[w]) {
        can_do_torch = !can_do_torch;
        update_can_do_torch();
        input.c1 = 0;
    }
    if (input.s && 's' == keyMap[w]) {
        pauseGame();
        input.s = 0;
    }

    e.preventDefault();
    e.stopPropagation();
};
window.addEventListener('keydown', keyHandler);
window.addEventListener('keyup', keyHandler);


changeMap('h');

a_cache.width = map_dungeon[0].length * tile_w;
a_cache.height = map_dungeon.length * tile_h;
for (let x = 0; x < map_dungeon[0].length; x++) {
    for (let y = 0; y < map_dungeon.length; y++) {
        const tile = map_dungeon[y][x];
        if (tile == '1') {
            a_cache_c.fillStyle = "green";
            a_cache_c.fillRect(x * tile_w, y * tile_h, tile_w, tile_h);
        }
    }
}

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

    if (transition_progress != 0) {
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

                if (can_do_climb) {
                    hero_vy = -.07;
                }
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

                if (can_do_climb) {
                    hero_vy = -.07;
                }
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

        // update entity
        // update other entities
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
                takeDamage();
                entities.splice(index, 1);
                index--;
            }
        }
    }

    // Compute scroll
    const cam_ww = (can_do_torch ? 10.75 : 7);
    const cam_hh = (can_do_torch ? 7.5 : 5);
    scroll_x = Math.max(0, Math.min(hero_x - cam_ww, map_w - cam_ww - cam_ww - 1));
    scroll_y = Math.max(0, Math.min(hero_y - cam_hh, map_h - cam_hh - cam_hh));

    // Draw map
    const draw_x = Math.floor(scroll_x);
    const draw_y = Math.floor(scroll_y);
    if (scene == 'd') {
        c.drawImage(a_cache,
            scroll_x * tile_w, scroll_y * tile_h,
            a.width, a.height,
            0, 0,
            a.width, a.height
        );
    } else {
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
    }
    // // draw coordinates
    // for (let x = draw_x; x < map_w && x <= draw_x + 23; x++) {
    //     for (let y = draw_y; y < map_h && y <= draw_y + 16; y++) {
    //         const tile = map[y][x];
    //         c.fillStyle = "black";
    //         c.fillText(`[${y}, ${x}]`, (x - scroll_x) * tile_w, (y - scroll_y) * tile_h)
    //     }
    // }

    // render entity
    // draw other entities
    entities.forEach((e) => {
        const { type, x, y, w, h } = e;
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
        if (type == 'E') {
            c.fillStyle = "red";
            c.fillRect((x - scroll_x) * tile_w, (y - scroll_y) * tile_h, w * tile_w, h * tile_h);
            const { n, d, hp, sp, b, facing } = e.enemy;
            const cx = x + w / 2 - scroll_x;
            const cy = y + h / 2 - scroll_y;
            switch (n) {
                case 'Rat':
                    // body
                    fillRectC(c, cx, cy, w, h, "gray", false);
                    // head
                    fillRectC(c, (cx + facing * w / 2), (cy - h * 0.5), w / 4 * 3, h / 2, "gray", false);
                    // ear
                    fillRectC(c, (cx + facing * w * 0.3), (cy - h * 0.8), w / 4, h * 0.4, "gray", false);
                    // tail
                    fillRectC(c, (cx - facing * w), (cy + h * 0.35), w, h / 4, "brown", false);
                    break;
                case 'Bat':
                    // foot
                    fillRectC(c, cx - 0.1, cy - 0.2 * h, w * 0.15, h * 0.6, "#222", false);
                    fillRectC(c, cx + 0.1, cy - 0.2 * h, w * 0.15, h * 0.6, "#222", false);
                    // body
                    fillRectC(c, cx, cy + 0.1 * h, w * 0.7, h * 0.7, "navy", false);
                    c.fillStyle = "navy";
                    const flap = (Math.ceil(frameID / 4) % 2 == 0) ? 1 : 0.3;
                    // wings
                    c.fillRect((cx - w * 0.7 / 2 - w * 0.7) * tile_w, (cy - h * 0.6 * flap) * tile_h, (w * 0.7) * tile_w, (h * 0.6 * flap) * tile_h);
                    c.fillRect((cx + w * 0.7 / 2) * tile_w, (cy - h * 0.6 * flap) * tile_h, (w * 0.7) * tile_w, (h * 0.6 * flap) * tile_h);
                    // eyes
                    fillRectC(c, cx - 0.1, cy + 0.3 * h, w * 0.1, h * 0.2, "#fff", false);
                    fillRectC(c, cx + 0.1, cy + 0.3 * h, w * 0.1, h * 0.2, "#fff", false);
                    break;
            }
        }
    });

    // Draw hero
    c.fillStyle = "orange";
    c.fillRect((hero_x - scroll_x) * tile_w, (hero_y - scroll_y) * tile_h, hero_w * tile_w, hero_h * tile_h);


    if (paused) {
        if (transition_progress < -300) {
            transition_progress += 16 / 2;
        }

        c.fillStyle = `rgba(0,0,0,${(1 + transition_progress / 1000).toFixed(1)})`;
        c.fillRect(0, 0, a.width, a.height);

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

