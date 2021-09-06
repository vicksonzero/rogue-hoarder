//@ts-check

// Canvas
const a = document.querySelector("canvas");

const pauseGame = () => {
    paused = !paused;

    if (paused) {
        // console.log('pauseGame');
        screen_transition_progress = -1000;

        p.style.display = 'block';
        h.style.display = 'none';
        xn.style.display = inventory.length == inventory_size ? 'none' : 'block';
        inventory.forEach(e => e.nw = 0);
        updateInventoryList();
    } else {
        if (inventory.length > inventory_size) lost_inventory = [inventory.pop()];
        screen_transition_progress = 0;

        updateAbilityList();
        updateInventoryList();
        p.style.display = 'none';
        h.style.display = 'flex';
    }
};

/** @type HTMLDivElement */
const h = document.querySelector("#h");

/** @type HTMLDivElement */
const xn = document.querySelector("#excess-note");
/** @type HTMLDivElement */
const l = document.querySelector("#list");
/** @type HTMLDivElement */
const p = document.querySelector("#p");
p.style.display = 'none';
const c = a.getContext("2d");
c.imageSmoothingEnabled = false;
h.onclick=pauseGame;

// cache
const a_dungeon_cache = document.createElement("canvas");
const a_dungeon_cache_c = a_dungeon_cache.getContext('2d');
const a_home_cache = document.createElement("canvas");
const a_home_cache_c = a_home_cache.getContext('2d');

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
    "1000000000000000010000002000000100000000000000000000000000000000000000www2www1",
    "100000000000000001000111111000010303000000000000000000020000000000000111111111",
    "100001110000000001000000000000011111100000000000000011111100000000000000000001",
    "1000000000000000010wwwwwwww000010000000000302030000010000000000000000000000001",
    "100000000000000001111111111100010000000011111111100010000033002000000000000001",
    "101100000000000000000100000000010000000000000000000110001111111111100000000001",
    "100000000000000000000100000000010000000000000000000110000000000100000000000001",
    "100020000000w2wwww000100000000010www2w0000000000001110000000000100000000000001",
    "111111100001111111100100000000011111111000000000111111000000000100000100000001",
    "100000000000000000000100000111110000000000000000000010000000000100000000000001",
    "1000000011000000000001000000000100000000000D0000000210000000000111100000020001",
    "100000000000000000000100000000010000000001111100011110010000000111000001111001",
    "10000000330www2w00000101111000011110000000000000000010000000000111000111111001",
    "1000001111111111100001000000000111111133000000002000133w2ww0000100000100000001",
    "100000000000001110000100000000011111111111100111111111111110000100000100000001",
    "100000000000000110000100000111110000000000000000000000001000000100001100000001",
    "100010000000000010000000000000010000000000000003000000001000000100000100000001",
    "1000100000000020133wwww3320000010000000000001111110000001000000110000100000001",
    "111110000001111111111111111000010000000000000001000000001000000011111100000001",
    "100010000000000010000000000000010000020000000001000000001330000000000100D03001",
    "100011000000000010000000000000000000111111000001001110011111000000000111111001",
    "100000001000000010000000000000000000000000000001000000000001000000000000000001",
    "100000001000000000000000000203330000000000000001000000000000000000000000000001",
    "100000001020000000000000111111111110000000001111111000000000000000000000001111",
    "100011111111100000000000000000010000000000000000001000000000000000020000000001",
    "1000000010000000000w2ww0000000010000000300000000001000000001110333111100000001",
    "100000001000000000011110000000010000111111000000001001110001111111111111111001",
    "100000001000000000011110000000010000000000000000001000000001000000000100000001",
    "111100111000013300011110000000010000000000000000001000000001000000000100000001",
    "10000000100001111111111000000001wwwwww0D0wwwwww0001111001111000000000111110001",
    "100000001000000000000000000000011111111111111110000000000001000000000000000001",
    "100001001000000000000000000000000000000000000000000200000001000000000000000001",
    "100001331020000000000000011110000000000000000000011111111001000000100000011111",
    "100011111111100000000000000000000000111100000000000000000001000000000000000001",
    "100000000000000000000000000000000000000000000000000000000001000000000000000001",
    "100000000000000000000000000000011100000001111001111000000001000D00000100000001",
    "100000000000000000000000000000000000000000000000000001100001111110000000000001",
    "1111111111000000wwww2ww0000000000000000000000000000000000001000000000000010001",
    "10000000000000001111111000000ww2ww00000000000000000000000111000000000000000001",
    "100000000000000111111111000001111100000000000000000000000000000www00www0000001",
    "100000D0000011111111111133331111111110330003111113www2wwwwwwwww11133111ww2www1",
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
    "11d000000003wwwwwwwwww000000000D",
    "11111111111111111111111111111111",
];



/**
 * @typedef ICard
   @property {string} n - name
   @property {string} i - icon
   @property {number} rq - card requirements
   @property {number} [t] - card tier
   @property {number} [c] - card sell cost
 */
/**
 * @typedef IItem
   @property {string} n - name
   @property {string} i - icon
   @property {number} rq - card requirements
   @property {number} [t] - card tier
   @property {number} [nw] - 1=new? 0=old -1=removing
   @property {number} [hd] - active item?
 */


/** @type {ICard[]} */
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
    { n: '', rq: 0, i: '' }, // 15
    { n: '', rq: 0, i: '' }, // 16
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
        c: 100,
    },
    {// 31
        n: 'wand', // name
        i: '✨',
        rq: 7, // requires hand
        c: 300,
    },
    {// 32
        n: 'shield', // name
        i: '🛡',
        rq: 7, // requires hand
        c: 60,
    },
    {// 33
        n: 'armor', // name
        i: '👷',
        rq: 1, // requires live
        c: 200,
    },
    {// 34
        n: 'elem armor', // name
        i: '🧢',
        rq: 1, // requires live
        c: 400,
    },
    {// 35
        n: 'potion', // name
        i: '💊',
        rq: 7, // requires hand
        c: 400,
    },
    {// 36
        n: 'flower', // name
        i: '🌹',
        rq: 7, // requires hand
        c: 5,
    },
    {// 37
        n: 'torch', // name
        i: '🔦',
        rq: 7, // requires hand
        c: 800,
    },
    {// 38
        n: 'compass', // name
        i: '🧭',
        rq: 7, // requires hand
        c: 1000,
    },
    {// 39
        n: 'map', // name
        i: '🗺️',
        rq: 7, // requires hand
        c: 2000,
    },
    {// 40
        n: 'glasses', // name
        i: '👓',
        rq: 13, // requires colors
        c: 2000,
    },
    {// 41
        n: 'treasure', // name
        i: '🎁',
        rq: 0, // requires none
        c: 100,
    },
    {// 42
        n: 'dash', // name
        i: '🏃‍♂️',
        rq: 5, // requires run
        c: 100,
    },
    {// 43
        n: 'climb', // name
        i: '🧗‍♂️',
        rq: 7, // requires jump
        c: 100,
    },
];

const tiers = [
    /* 0 = existence */[2, 1], // 3 is the health card
    /* 1 = being     */[5, 6, 7, 8, 9, 10, 11],
    /* 2 = health    */[12, 13, 14, 17, 4],
    /* 3 = skill     */[15, 16],
];
const rare = [
    /* 0 = common    */[35, 36],
    /* 1 = rare      */[30, 30, 30, 32, 32, 32, 33, 31], // [30, 32, 33],
    /* 2 = epic      */[31, 34, 37, 38, 42, 43],
    /* 3 = legendary */[39, 40],
    /* 4 = treasure  */[41],
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
   @property {string} n                        - name. identifier for the enemy's type
   @property {number} d                        - difficulty rating. is negotiated against level difficulty budget when spawning
   @property {number} hp                       - an enemy instance dies when hp is 0
   @property {number} maxHp                    - max hp, is copied from IEnemyDef.hp
   @property {number} w                        - width, will be copied to entity
   @property {number} h                        - height, will be copied to entity
   @property {number} sp                       - moving speed
   @property {string} b                        - behaviors string
   @property {'' | 'F' | 'W' | 'E'} el         - type of element (F=Fire, W=Water, E=Electric)
   @property {number} sx                       - spawn x
   @property {number} sy                       - spawn y
   @property {number} dx                       - dest x
   @property {number} dy                       - dest y
   @property {number} ai                       - next ai tick
   @property {number} tg                       - is targeting player?
 */

/**
 * @typedef IEffect
 * @property {string} c    - color
 * @property {number} hp   - duration of the effect
 * @property {number} s    - size of the effect
 */

/**
 * @typedef IMagic
 * @property {string} c    - color
 * @property {string} s    - style, m=magic, s=bee-sting
 */


/**
 * @typedef ITransform
   @property {number} x          - 
   @property {number} y          - 
   @property {number} w          - 
   @property {number} h          - 
 */
/**
 * @typedef IEntity
   @property {string} type       - 
   @property {number} x          - 
   @property {number} y          - 
   @property {number} w          - 
   @property {number} h          - 
   @property {number} fc         - facing direction. -1 means left, 1 means right
   @property {number} [gd]       - grounded
   @property {number} [inv]       - invincible until
   @property {number} [vx]       - velocity x, used for knock back or others
   @property {number} [vy]       - velocity y, used for gravity
   @property {ICard} [item]      - 
   @property {IEnemy} [enemy]    - 
   @property {IEffect} [eff]     - 
   @property {IMagic} [m]     - 
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
        d: 2, // difficulty rating
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
        sp: 0.035,
        b: 'fmp', // behaviors: fly, melee, patrol
    },
    {// 102
        n: 'Bee',
        d: 3, // difficulty rating
        hp: 3,
        w: 0.5,
        h: 0.5,
        sp: 0.035,
        b: 'fsp', // behaviors: fly, shooty, patrol
    },
    {// 103
        n: 'Skeleton',
        d: 4, // difficulty rating
        hp: 5,
        w: 0.6,
        h: 0.9,
        sp: 0.05,
        b: 'wmla', // behaviors: walk, melee, leap, armor?
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

const difficulty_curve = [
    15, 18, 20, 25, 28, 30, 34, 38, 40, 45,
    50, 55, 61, 62, 65, 70, 77, 84, 90, 98,
    110, 120, 130, 145, 155, 168, 180, 199, 220, 240,
];


// World
const g1 = 0.012;    // gravity in tiles/frame²
const g2 = 0.018;    // gravity in tiles/frame²
const tile_w = 32;  // tiles width in px
const tile_h = 32;  // tiles height in px

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
let screen_transition_progress = 1000; // ms, count till 0
let paused = false;

let map = (scene == 'h' ? map_home : map_dungeon);
let map_w = map[0].length;  // map width in tiles
let map_h = map.length;     // map height in tiles
/** @type {IEntity[]} */
let entities = [];
let frameID = 0;


// Hero
/** @type {IEntity} */
let hero = { x: 10, y: 2, w: .6, h: 1, fc: 1, type: 'hero', vx: 0, vy: 0, gd: 1, inv: 0 };
let hero_g = g1;  // Y acceleration
let hero_can_jump = 1;  // hero can jump (or jump again after Up key has been released)

let hero_can_stab = 1;  // hero can stab
let hero_is_stabbing = 0;  // hero stabbing

let hero_can_shoot = 0;  // hero can shoot magic
let hero_is_shooting = 0;  // hero is shooting magic

let hero_is_shielding = 0;  // hero blocking with shield
let hero_tier = 3; // used to unlock health cards

/** @type {Array<IItem>} */
let inventory = [3, 30, 33, 0].map(i => (cards[i]));
let lost_inventory = [];
let inventory_size = inventory.length;
let lostAbilities = [];

let score_day = 0;
let score_money = 0;

let scroll_x = 0; // X scroll in tiles
let scroll_y = 0; // X scroll in tiles

const changeMap = (_new_map) => {
    scene = _new_map;
    map = (scene == 'h' ? map_home : map_dungeon);
    map_w = map[0].length;  // map width in tiles
    map_h = map.length;     // map height in tiles
    entities = [];
    if (scene == 'd') {
        hero.x = 9;
        hero.y = 5;
    } else {
        score_day++;
        hero.x = 9;
        hero.y = 5;
    }

    const treasureCandidates = [];
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
            if (tile == 'T') {
                treasureCandidates.push({ x, y });
            }
        }
    }

    if (scene == 'd') {
        const { x, y } = doorCandidates.splice(~~(Math.random() * doorCandidates.length), 1)[0];
        hero.x = x;
        hero.y = y;
    }

    const doorCount = 3;
    const spikeCount = 10;
    const enemyCount = scene == 'h' ? 2 : 10;
    const treasureCount = 10;

    for (let i = 0; doorCandidates.length && i < doorCount; i++) {
        const { x, y } = doorCandidates.splice(~~(Math.random() * doorCandidates.length), 1)[0];
        entities.push({ type: 'D', x: x + 0.1, y: y - 0.6, w: 0.8, h: 1.6, fc: 1 });
    }
    for (let i = 0; spikeCandidates.length && i < spikeCount; i++) {
        const { x, y } = spikeCandidates.splice(~~(Math.random() * spikeCandidates.length), 1)[0];
        entities.push({ type: '3', x: x + 0.3, y: y + 0.4, w: 0.6, h: 0.6, fc: 1 });
    }
    entities = entities.concat(spawnEnemy(spawnCandidates, enemyCount));

    for (let i = 0; spawnCandidates.length && i < treasureCount; i++) {
        const { x, y } = spawnCandidates.splice(~~(Math.random() * spawnCandidates.length), 1)[0];
        const rarity = randomFrom([0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 4, 4, 4]);
        const item = cards[randomFrom(rare[rarity])];
        if (item.n == 'treasure') item.c = ~~(Math.pow(score_day, 1.5) * 100);
        entities.push({ type: 'T', x: x + 0.3, y: y + 0.4, w: 0.6, h: 0.6, fc: 1, vy: .1, item });
    }

    screen_transition_progress = 2000;
};

const updateInventoryList = () => {
    l.innerHTML = (inventory.slice(0, inventory_size)
        .map(({ n, i, t, nw, hd }, _i) => `<div class="card c-${t} ${hd ? 'hd' : ''}" data-c=${_i} onclick="prioritize(${_i})"><i>${i}</i>${tryQuestionMark(n)}</div>`)
        .join('') +
        '<div>←💀</div>' +
        (inventory.length <= inventory_size ? '' :
            `<div class="card c-${inventory[inventory_size].t}" data-c=${inventory_size}><i>${inventory[inventory_size].i}</i>${tryQuestionMark(inventory[inventory_size].n)}</div><div>→🗑</div>`)
    );
    h.innerHTML = inventory.map(({ i, t, nw, hd }, _i) => `<div class="card c-${t} ${nw ? 'in' : ''}  ${hd ? 'hd' : ''}" data-c=${_i}>${i}</div>`).join('');
    h.innerHTML += lost_inventory.map(({ i, t, nw }, _i) => `<div class="card c-${t} out" data-c=${_i}>${i}</div>`).join('');
    lost_inventory = [];
};

const updateAbilityList = () => {
    console.log('updateAbilityList');
    const old_tier = hero_tier;
    if (hero_tier == 3 && inventory.filter(card => card.n == 'health').length <= 0) { // if health is lost
        hero_tier = 2;
    } else if (hero_tier == 2 && inventory.filter(card => card.t == 2).length <= 1) { // if enough tier 2 is lost
        hero_tier = 1;
    } else if (hero_tier == 1 && inventory.filter(card => card.t == 1).length <= 1) { // if enough tier 1 is lost
        hero_tier = 0;
    }

    if (old_tier != hero_tier) {
        tiers[hero_tier].forEach(id => {
            inventory.unshift({ ...cards[id], nw: 1 });
        });
        inventory_size = inventory.length;
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
    can_do_shield = (inventory.some(card => card.n == 'shield'));
    can_do_torch = (inventory.some(card => card.n == 'torch'));

    update_can_do_vision();
    update_can_do_weapons();
};

const update_can_do_vision = () => {
    a.width = (can_do_torch ? 720 : 480); // 720x480 vs 480x320
    a.height = (can_do_torch ? 480 : 320);

    a.style.filter = `grayscale(${can_do_color ? 0 : 1})`;
}

const update_can_do_weapons = () => {
    /** @type {IItem} */
    let w;
    let lastWeapons = (inventory.filter(card => ['sword', 'wand'].includes(card.n)) || []);
    lastWeapons.forEach(card => {
        card.hd = 0;
    });
    w = lastWeapons.pop();
    can_do_sword = (w && w.n == 'sword');
    can_do_wand = (w && w.n == 'wand');
    if (w) w.hd = 1;

    lastWeapons = (inventory.filter(card => ['armor'].includes(card.n)) || []);
    lastWeapons.forEach(card => {
        card.hd = 0;
    });
    w = lastWeapons.pop();
    if (w) w.hd = 1;
}

const spawnEnemy = (spawnCandidates, enemyCount) => {
    /** @type {IEntity[]} */
    let result = [];
    /** @type {IEnemy} */
    let enemy;
    let score_difficulty = scene == 'h' ? 4 : difficulty_curve[score_day - 1];

    for (let i = 0; spawnCandidates.length && score_difficulty > 0; i++) {
        const { x, y } = spawnCandidates[~~(Math.random() * spawnCandidates.length)];

        // const enemyDef = enemies[randomFrom([1, 0])];
        const enemyDef = enemies[randomFrom([0, 0, 1, 1, 2])];
        const { w, h } = enemyDef;
        const sx = x + (1 - w) / 2;
        const sy = y + 1 - h - (enemyDef.b.includes('f') ? 1 : 0);
        score_difficulty -= enemyDef.d;

        const el = score_difficulty > 40 ? randomFrom(['', '', '', '', '', '', '', '', '', 'F', 'W', 'E']) : '';
        score_difficulty -= el == '' ? 0 : 3;

        enemy = {
            ...enemyDef,
            maxHp: enemyDef.hp,
            el,
            sx,
            sy,
            dx: sx,
            dy: sy,
            ai: 0,
            tg: 0,
        };

        result.push({
            type: 'E',
            x: sx,
            y: sy,
            w, h,
            fc: 1,
            vx: 0,
            vy: 0,
            gd: 1,
            inv: 0,
            enemy,
        });

    }
    console.log('spawnEnemy spawned:', result.length);
    return result;
};

const spawnEffect = (/** @type {IEntity} */ tr, c, s, fc = 1) => {
    entities.push({
        ...tr,
        type: 'F',
        fc,
        eff: { c, hp: 30, s }
    });
}

const takeDamage = () => {
    // console.log('takeDamage!');
    inventory.forEach(e => e.nw = 0);
    const lastArmorIndex = inventory.slice().reverse().findIndex(card => card.n == 'armor');

    const lostIndex = (lastArmorIndex > -1 ? inventory.length - lastArmorIndex : inventory.length) - 1;
    // console.log('lostIndex', lostIndex);

    const lostItem = inventory[lostIndex];
    if (cards.findIndex(item => item.n == lostItem.n) < 30) { // is body ability
        lostAbilities.push(lostItem);
    }
    lost_inventory = [lostItem];
    if (lostItem.n == 'armor') {
        inventory.splice(lostIndex, 1, { n: '', i: '', rq: 1 });
        spawnEffect(hero, '#AAA', 1);
    } else {
        inventory.splice(lostIndex, 1);
        spawnEffect(hero, 'red', 0.7);
    }

    inventory_size = inventory.length;
    hero.inv = frameID + 120; // 3s
    updateAbilityList();
    updateInventoryList();
};

const knockBack = (/** @type {IEntity}*/attacker, /** @type {IEntity}*/defender) => {
    const disp = displacement(defender, attacker);
    defender.vx = Math.sign(disp[0]) * 0.4;
    // console.log('knockback', defender.vx);
    defender.vy = -0.2;
    defender.gd = 0;
}

const displacement = (/** @type {ITransform}*/toEntity, /** @type {ITransform}*/fromEntity) => {
    const to_cx = toEntity.x + toEntity.w / 2;
    const to_cy = toEntity.y + toEntity.h / 2;
    const from_cx = fromEntity.x + fromEntity.w / 2;
    const from_cy = fromEntity.y + fromEntity.h / 2;
    return [(to_cx - from_cx), (to_cy - from_cy)];
}

const distance = (disp) => {
    return Math.sqrt(disp[0] * disp[0] + disp[1] * disp[1]);
}

const getStabbyBox = (hero_is_attacking) => {
    return [
        hero.x + hero.fc * (1 - Math.max(0, hero_is_attacking - frameID) / 15 * 0.7 - 0.1 * (hero.fc + 1)),
        hero.y + 0.4,
        0.8,
        0.2
    ];
}

const shootMagic = (c, s, attacker, defender) => {
    const disp = defender && displacement(defender, attacker);
    const dist = defender && distance(disp);

    const w = s == 's' ? 0.6 : 0.6;
    const h = s == 's' ? 0.1 : 0.6;
    entities.push({
        x: attacker.x + attacker.w / 2 - w / 2,
        y: attacker.y + attacker.h * 0.45 - h / 2,
        fc: 1,
        w, h,
        type: 'M', // magic
        vx: defender ? disp[0] / dist * .1 : (attacker.fc * .2),
        vy: defender ? disp[1] / dist * .1 : 0,
        m: { c, s },
    });
}

const tryMoveX = (/** @type {ITransform}*/ entity, dx, map, solidCallback) => {
    entity.x += dx;
    if (dx <= 0) {
        entity.x = Math.max(entity.x, 0);
    } else {
        entity.x = Math.min(map_w - entity.w, entity.x);
    }

    const probeX = (dx <= 0 ? entity.x : entity.x + entity.w);

    const tile1 = +map[~~(entity.y)][~~(probeX)];
    const tile2 = +map[~~(entity.y + entity.h - .1)][~~(probeX)];

    if (tile1 == 1 || tile2 == 1) {
        entity.x = (dx <= 0 ? Math.ceil(entity.x) : ~~(entity.x + entity.w) - entity.w);
        if (solidCallback) solidCallback();
    }

    return entity;
};

const tryMoveY = (/** @type {ITransform}*/ entity, dy, map, solidCallback) => {
    entity.y += dy;
    if (dy <= 0) {
        entity.y = Math.max(entity.y, 0);
    } else {
        entity.y = Math.min(map_h - entity.h, entity.y);
    }

    const probeY = (dy <= 0 ? entity.y : entity.y + entity.h);

    const tile1 = +map[~~(probeY)][~~(entity.x)];
    const tile2 = +map[~~(probeY)][~~(entity.x + entity.w - .1)];

    if (tile1 == 1 || tile2 == 1) {
        entity.y = (dy <= 0 ? Math.ceil(entity.y) : ~~(entity.y + entity.h) - entity.h);
        if (solidCallback) solidCallback();
    }

    return entity;
};

const flyToDestAtSpeed = (/** @type IEntity*/e) => {
    const { x, y } = e;
    const { dx, dy, sp } = e.enemy;
    const deltaX = dx - x;
    e.x += Math.sign(deltaX) * Math.min(Math.abs(deltaX), sp) + e.vx;
    e.vx -= (Math.sign(e.vx) * Math.min(Math.abs(e.vx), .04));

    const deltaY = dy - y;
    e.y += Math.sign(deltaY) * Math.min(Math.abs(deltaY), sp);
}

const randomFrom = (arr) => {
    return arr[~~(Math.random() * arr.length)];
};

const addItem = (item) => {
    inventory.forEach(e => e.nw = 0);
    const id = inventory.findIndex(item => item.n == '');
    if (id < 0) {
        inventory.push({ ...item, nw: 1 });
        pauseGame();
    } else {
        inventory[id] = { ...item, nw: 1 };
        updateAbilityList();
        updateInventoryList();
    }
};

const trade = (index) => {
    const item = inventory[index];
    console.log('trade', item);

}

const tryQuestionMark = (str) => (can_do_speech ? str : Array(str.length).fill('?').join(''));

const fillRectC = (/** @type {CanvasRenderingContext2D} */ c, cx, cy, w, h, fill, stroke) => {
    c.beginPath();
    c.fillStyle = fill;
    c.rect((cx - w / 2) * tile_w, (cy - h / 2) * tile_w, w * tile_w, h * tile_w);
    c.fill();
    if (stroke) { c.strokeStyle = stroke; c.stroke(); }
}

const cache_map = (cache, cache_c, _map) => {
    // -10 bytes zipped compared to nested for-loops
    cache.width = _map[0].length * tile_w;
    cache.height = _map.length * tile_h;
    _map.forEach((row, y) => row.split('').forEach((tile, x) => {
        if (tile == '1') {
            cache_c.fillStyle = "green";
            cache_c.fillRect(x * tile_w, y * tile_h, tile_w, tile_h);
        }
        if (tile == 'w' || (tile != 'w' && row[x - 1] == 'w' && row[x + 1] == 'w')) {
            cache_c.fillStyle = "#0B0";
            cache_c.fillRect(x * tile_w, y * tile_h + 6, tile_w, tile_h - 6);
        }
    }));
}

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

    // -4 bytes zipped compared to if-statements
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

    if (t[3] < 'u' && w >= 49 && w <= 57) {
        trade(w - 49);
        return;
    }

    if (!keyMap[w]) return;

    input[keyMap[w]] = +(t[3] < 'u');

    if (input.c1 && 'c1' == keyMap[w]) {
        can_do_torch = !can_do_torch;
        update_can_do_vision();
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


// main

/* #IfDev */
window['test'] = {
    get entities() { return entities },
    get cards() { return cards },
    get transition_progress() { return screen_transition_progress },
    get lostAbilities() { return lostAbilities },
    get inventory() { return inventory },

    //@ts-ignore
    get tiers() { return tiers.map(tier => tier.map(_i => ({ ...cards[_i], _i }))) },
    //@ts-ignore
    get rare() { return rare.map(tier => tier.map(_i => ({ ...cards[i], _i }))) },
    get hero_tier() { return hero_tier; },
};
/* #EndIfDev */

cache_map(a_dungeon_cache, a_dungeon_cache_c, map_dungeon);
cache_map(a_home_cache, a_home_cache_c, map_home);

changeMap('h');

updateAbilityList();
updateInventoryList();

window['prioritize'] = (i) => {
    const item = inventory.splice(i, 1)[0];
    inventory.push(item);
    updateInventoryList();
}

// Game loop (60 fps)
setInterval(() => {
    frameID++;

    // Clear
    a.width ^= 0;

    // Compute hero position:
    // The hero's bounding rectangle's corners have the following coordinates:
    //
    //           [hero.x, hero.y]      [hero.x + hero_w, hero.y]
    //                           _____
    //                          |     |
    //                          |     |
    //                          |     |
    //                          |     |
    //                          |_____|
    //
    // [hero.x, hero.y + hero_h]      [hero.x + hero_w, hero.y + hero_h]


    // Apply gravity to Y acceleration, Y acceleration to Y speed and Y speed to Y position
    hero.vy += hero_g;
    if (hero.vy > 0) hero_g = g2;
    if (hero.vy > 0.2) hero.vy = 0.2;
    hero.vx -= (Math.sign(hero.vx) * Math.min(Math.abs(hero.vx), .04));

    hero.y = tryMoveY(
        hero,
        hero.vy,
        map,
        () => {
            if (hero.vy > 0) {
                hero.gd = frameID + 5;
                hero.vy = 0;
                hero_g = g1;
            }
            // If moving up
            if (hero.vy < 0) {
                // If this tile is solid, put the hero on the bottom side of it and let it fall
                hero.vy = 0;
            }
        }
    ).y;

    if (screen_transition_progress != 0) {
        input.l = 0;
        input.r = 0;
        input.u = 0;
        input.d = 0;
    } else {
        // If left key is pressed, go left
        const mv = input.l ? -1 : input.r ? 1 : 0;
        const not_enough_strength = !can_do_armor && inventory.some(card => card.n == 'armor');
        hero.fc = mv || hero.fc;
        tryMoveX(
            hero,
            mv * ((hero_is_shielding || !can_do_run || not_enough_strength) ? .03 : .1) + hero.vx,
            map,
            () => {
                if (can_do_climb) {
                    hero.vy = -.07;
                }
            }
        );

        // If up key is pressed and the hero is grounded, jump
        if (input.u && hero.vy >= 0 && hero.gd >= frameID && hero_can_jump) {
            // console.log('jump', hero.gd, frameID);
            hero.vy = -.315;
            hero_g = g1;
            hero_can_jump = 0;
        }
        if (!input.u) {
            hero_can_jump = 1;
            if (hero.vy < 0) {
                if (hero.vy < -0.15) hero.vy = -0.15;
                hero_g = g2;
            }
        }
        // stabbing
        if (input.a && can_do_sword && !hero_is_shielding && frameID >= hero_can_stab) {
            hero_is_stabbing = frameID + 15;
            hero_can_stab = frameID + 50;
        }
        if (hero_can_stab > frameID + 20 && !input.a) {
            hero_can_stab = frameID + 20;
        }
        // shooting
        if (input.a && can_do_wand && !hero_is_shielding && frameID >= hero_can_shoot) {
            shootMagic('pink', 'm', hero);
            hero_is_shooting = frameID + 15;
            hero_can_shoot = frameID + 50;
        }
        if (hero_can_shoot > frameID + 20 && !input.a) {
            hero_can_shoot = frameID + 20;
        }

        // shielding
        if (input.d && can_do_shield && (hero_is_stabbing < frameID && hero_is_shooting < frameID)) {
            hero_is_shielding = 1;
        }
        if (!input.d && hero_is_shielding) {
            hero_is_shielding = 0;
        }

        // update entity
        // update other entities
        for (let index = 0; index < entities.length; index++) {
            const e = entities[index];
            const { type, x, y, w, h } = e;

            const s = getStabbyBox(hero_is_stabbing);

            const stabbyHasCollision = (
                hero_is_stabbing > frameID &&
                s[0] < x + w &&
                s[0] + s[2] > x &&
                s[1] < y + h &&
                s[1] + s[3] > y
            );

            if (type == 'M') { // magic
                // TODO: extract the callback for optimization
                const remove_magic = () => {
                    spawnEffect(e, e.m.c, 1);
                    entities.splice(index, 1);
                    index--;
                }
                if (x + w + e.vx > map_w) {
                    remove_magic();
                } else {
                    tryMoveX(e, e.vx, map, remove_magic);
                    tryMoveY(e, e.vy, map, remove_magic);
                }

            }
            if (type == 'E') {
                // console.log(`------------------------ ai ${index}`);
                // AI update
                const wanderDist = 1;
                const patrolDist = 3;
                const enemy = e.enemy;

                const disp = displacement(e, hero);
                const dist = distance(disp);

                enemy.tg = +(dist < 6);

                if (enemy.tg && enemy.ai - frameID > 50) enemy.ai = frameID + 50;

                if (frameID >= enemy.ai) {
                    [...enemy.b].forEach(behavior => {
                        if (behavior == 'w') {
                            if (enemy.tg) {
                                enemy.dx = hero.x + Math.sign(disp[0]) * 2;
                                enemy.dy = y;
                            } else {
                                enemy.dx = x + Math.random() * wanderDist * 2 - wanderDist;
                                enemy.dy = y;
                            }
                        }
                        if (behavior == 'f') {
                            if (enemy.tg) {
                                enemy.dx = hero.x + disp[0] / dist * 2;
                                enemy.dy = hero.y + disp[1] / dist * 2 - 0.5;
                            } else {
                                enemy.dx = x + Math.random() * wanderDist * 2 - wanderDist;
                                enemy.dy = y + Math.random() * wanderDist * 2 - wanderDist;
                            }
                        }
                        if (behavior == 'm') {
                            if (enemy.b.includes('w')) {
                                if (disp[0] < 3) {
                                    enemy.dx = hero.x;
                                    if (e.gd) {
                                        e.vy = enemy.b.includes('l') ? -.32 : -.18;
                                        e.gd = 0;
                                    }
                                }
                            } else {
                                if (dist < 4) {
                                    enemy.dx = hero.x;
                                    enemy.dy = hero.y;
                                }
                            }
                        }
                        if (behavior == 's') {
                            if (dist < 4) {
                                shootMagic('#007', 's', e, hero);
                            }
                        }
                    });

                    e.enemy.ai = frameID + (e.enemy.tg ?
                        ~~(Math.random() * 40 + 40) :
                        ~~(Math.random() * 320 + 80));
                }
            }
            if (type == 'E') {
                // actual enemy update
                const { b, dx, sp, tg } = e.enemy; // behaviors, dest x, speed, targeting player

                const shootyCollisionIndex = entities.findIndex((mm) => (
                    mm.type == 'M' &&
                    mm.m.s == 'm' &&
                    mm.x < x + w &&
                    mm.x + mm.w > x &&
                    mm.y < y + h &&
                    mm.y + mm.h > y
                ));

                if ((shootyCollisionIndex > -1 || stabbyHasCollision) && e.inv < frameID) {
                    e.enemy.hp -= 1;
                    e.inv = frameID + 40;
                    // console.log('stabby!', e.enemy.hp);
                    spawnEffect({ ...e, w: w / 2 }, '#b3e', 1, 0);
                    knockBack(hero, e);
                    if (shootyCollisionIndex > -1) {
                        entities.splice(shootyCollisionIndex, 1);
                        if (shootyCollisionIndex < index) index--;
                    }
                    if (e.enemy.hp <= 0) {
                        spawnEffect(e, '#b3e', 2, 0);
                        spawnEffect(e, '#888', 2.5);
                        entities.splice(index, 1);
                        index--;
                        continue;
                    }
                }

                if (b.includes('f')) flyToDestAtSpeed(e);

                if (b.includes('w')) {
                    // set facing depending on walk direction
                    e.fc = dx == x ? e.fc : Math.sign(dx - x);

                    // calculate x movement needed
                    const deltaX = Math.sign(dx - x) * Math.min(Math.abs(dx - x), sp) + e.vx;

                    // move according to direction and min speed between remaining and allowed speed
                    e.vx -= (Math.sign(e.vx) * Math.min(Math.abs(e.vx), .04));

                    tryMoveX(e, deltaX, map);
                    e.vy += g1;
                    e.gd = 0;
                    tryMoveY(e, e.vy, map, () => {
                        if (e.vy > 0) e.gd = 1;
                        e.vy = 0;
                    });
                }
                if (tg) e.fc = (hero.x > x ? 1 : -1);
            }
            if (type == 'F' && e.eff.hp-- < 0) { // effects
                entities.splice(index, 1);
                index--;
                continue;
            }
            if (type == '3' && stabbyHasCollision) {
                spawnEffect(e, '#A02', 3);
                spawnEffect(e, 'red', 2.2, 0);
                entities.splice(index, 1);
                index--;
                continue;
            }

            const hasCollisionWithHero = (
                hero.x < x + w &&
                hero.x + hero.w > x &&
                hero.y < y + h &&
                hero.y + hero.h > y
            );

            if (!hasCollisionWithHero) continue;

            if (type == 'D') {
                changeMap(scene == 'h' ? 'd' : 'h');
            }
            if (hero.inv < frameID) {
                if (type == '3') {
                    // console.log('spike!');

                    const can_shield =
                        (hero.fc > 0 && hero.x < x) ||
                        (hero.fc < 0 && hero.x > x)
                        ;
                    if (!hero_is_shielding || !can_shield) {
                        takeDamage();
                        entities.splice(index, 1);
                        index--;
                    }
                    knockBack(e, hero);
                }
                if (type == 'M' && e.m.s == 's') {
                    // console.log('sting!');

                    const can_shield =
                        (hero.fc > 0 && hero.x < x) ||
                        (hero.fc < 0 && hero.x > x)
                        ;
                    if (!hero_is_shielding || !can_shield) {
                        takeDamage();
                        knockBack(e, hero);
                    }
                    spawnEffect(e, e.m.c, 1);
                    entities.splice(index, 1);
                    index--;
                }
                if (type == 'E') {
                    // console.log('enemy!');
                    const { b, dx, sp, tg } = e.enemy; // behaviors, dest x, speed, targeting player
                    const can_shield =
                        (hero.fc > 0 && hero.x < x) ||
                        (hero.fc < 0 && hero.x > x)
                        ;
                    if (b.includes('m')) {
                        if (hero_is_shielding && can_shield) {
                            knockBack(hero, e);
                        } else {
                            takeDamage();
                            knockBack(e, hero);
                        }
                    }
                }
            }
            if (type == 'T') {
                const { item } = entities[index];
                addItem(item);
                entities.splice(index, 1);
                index--;
            }
        }
    }

    // Compute scroll
    const cam_ww = (can_do_torch ? 10.75 : 7);
    const cam_hh = (can_do_torch ? 7.5 : 5);
    scroll_x = Math.max(0, Math.min(hero.x - cam_ww, map_w - cam_ww - cam_ww - 1));
    scroll_y = Math.max(0, Math.min(hero.y - cam_hh, map_h - cam_hh - cam_hh));

    // Draw map
    c.drawImage(
        (scene == 'd' ? a_dungeon_cache : a_home_cache),
        scroll_x * tile_w, scroll_y * tile_h,
        a.width, a.height,
        0, 0,
        a.width, a.height
    );
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
        const { type, x, y, w, h, fc } = e;
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
        if (type == 'F') { // effects
            const cx = x + w / 2 - scroll_x;
            const cy = y + h / 2 - scroll_y;

            const ww = w * e.eff.hp / 30;
            const www = w * e.eff.s * (1 - e.eff.hp / 30);

            fillRectC(c, cx - www, cy - www * fc, ww, ww, e.eff.c, false);
            fillRectC(c, cx - www * fc, cy + www, ww, ww, e.eff.c, false);
            fillRectC(c, cx + www * fc, cy - www, ww, ww, e.eff.c, false);
            fillRectC(c, cx + www, cy + www * fc, ww, ww, e.eff.c, false);
        }
        if (type == 'M') { // magic
            c.save();
            c.translate((x + w / 2 - scroll_x) * tile_w, (y + h / 2 - scroll_y) * tile_h);
            if (e.m.s == 's') {
                c.rotate(Math.atan2(e.vy, e.vx));
            }
            c.fillStyle = e.m.c;
            c.fillRect(-w / 2 * tile_w, -h / 2 * tile_h, w * tile_w, h * tile_h);
            c.restore();
        }
        if (type == 'E') {
            // c.fillStyle = "red";
            // c.fillRect((x - scroll_x) * tile_w, (y - scroll_y) * tile_h, w * tile_w, h * tile_h);
            const { n, d, hp, sp, b, dx, dy, tg } = e.enemy;
            const cx = x + w / 2 - scroll_x;
            const cy = y + h / 2 - scroll_y;
            let flap;
            if (e.inv < frameID || ~~(frameID / 4) % 2 == 0) {
                switch (n) {
                    case 'Rat':
                        // body
                        fillRectC(c, cx, cy, w, h, "gray", false);
                        // head
                        fillRectC(c, (cx + fc * w / 2), (cy - h * 0.5), w / 4 * 3, h / 2, "gray", false);
                        // ear
                        fillRectC(c, (cx + fc * w * 0.3), (cy - h * 0.8), w / 4, h * 0.4, "gray", false);
                        // tail
                        fillRectC(c, (cx - fc * w), (cy + h * 0.35), w, h / 4, "brown", false);
                        break;
                    case 'Bat':
                        // foot
                        fillRectC(c, cx - 0.1, cy - 0.2 * h, w * 0.15, h * 0.6, "#222", false);
                        fillRectC(c, cx + 0.1, cy - 0.2 * h, w * 0.15, h * 0.6, "#222", false);
                        // body
                        fillRectC(c, cx, cy + 0.1 * h, w * 0.7, h * 0.7, "navy", false);
                        c.fillStyle = "navy";
                        flap = (Math.ceil(frameID / 10) % 2 == 0) ? 1 : 0;
                        // wings
                        c.fillRect((cx - w * 0.7 / 2 - w * 0.7) * tile_w, (cy - h * 0.8 * flap) * tile_h, (w * 0.7) * tile_w, (h * (0.4 + 0.4 * flap)) * tile_h);
                        c.fillRect((cx + w * 0.7 / 2) * tile_w, (cy - h * 0.8 * flap) * tile_h, (w * 0.7) * tile_w, (h * (0.4 + 0.4 * flap)) * tile_h);
                        // eyes
                        fillRectC(c, cx - 0.1, cy + 0.3 * h, w * 0.1, h * 0.2, "#fff", false);
                        fillRectC(c, cx + 0.1, cy + 0.3 * h, w * 0.1, h * 0.2, "#fff", false);
                        break;
                    case 'Bee':
                        // antenna
                        fillRectC(c, cx + 0.4 * w * fc, cy - 0.1 * h, w * 0.5, h * 0.1, "#222", false);
                        // sting
                        fillRectC(c, cx - w / 2 * fc, cy + 0.2, w * 0.5, h * 0.1, "#222", false);
                        // body
                        fillRectC(c, cx, cy + 0.3 * h, w, h * 0.7, "#eb3", false);
                        flap = (Math.ceil(frameID / 4) % 2 == 0) ? 1 : 0;
                        // eyes
                        fillRectC(c, cx - 0.1, cy + 0.3 * h, w * 0.1, h * 0.7, "#222", false);
                        fillRectC(c, cx + 0.1, cy + 0.3 * h, w * 0.1, h * 0.7, "#222", false);
                        // wings
                        fillRectC(c, cx, cy - (0.1 + 0.2 * flap) / 2, w * 0.5, h * (0.2 + 0.4 * flap), '#ccc');
                        break;
                }
            }
            c.fillStyle = "black";
            c.textAlign = 'center';
            c.fillText(`${tg ? '!!' : ''}`, cx * tile_w, (y - 0.2 - scroll_y - 0.3) * tile_h);
            // c.fillText(`d(${dx.toFixed(1)}, ${dy.toFixed(1)})`, cx * tile_w, (y - 0.2 - scroll_y) * tile_h);
        }
        if (type == 'T') { // treasure
            const { item } = e;
            const label = item.n == 'treasure' ? `${item.c}z?` : item.n;
            c.fillStyle = "orange";
            c.strokeStyle = "black 2px solid";
            c.fillRect((x - scroll_x) * tile_w, (y - scroll_y) * tile_h, w * tile_w, h * tile_h - 1);
            c.strokeRect((x - scroll_x) * tile_w, (y - scroll_y) * tile_h, w * tile_w, h * tile_h - 1);
            c.strokeRect((x - scroll_x) * tile_w, (y - scroll_y) * tile_h, w * tile_w, h / 3 * tile_h);
            c.fillStyle = "black";
            c.textAlign = "center";
            c.fillText(tryQuestionMark(label), (x + w / 2 - scroll_x) * tile_w, (y - 0.2 - scroll_y) * tile_h);
        }
    });

    if (hero.inv < frameID || ~~(frameID / 4) % 2 == 0) {
        // Draw hero
        c.fillStyle = "orange";
        c.fillRect((hero.x - scroll_x) * tile_w, (hero.y - scroll_y) * tile_h, hero.w * tile_w, hero.h * tile_h);
    }

    if (hero_is_shielding) {
        c.fillStyle = "brown";
        c.fillRect(
            (hero.x - scroll_x + (hero.fc + 1) / 2 * hero.w - 0.1) * tile_w,
            (hero.y - scroll_y + 0.2) * tile_h,
            0.2 * tile_w,
            0.6 * tile_h
        );
    }
    if (hero_is_shooting > frameID) {
        c.fillStyle = "brown";
        const s = getStabbyBox(frameID + 12);
        c.fillRect(
            (s[0] - scroll_x) * tile_w,
            (s[1] - scroll_y) * tile_h,
            s[2] * tile_w,
            s[3] * tile_h
        );
    }
    if (hero_is_stabbing > frameID) {
        c.fillStyle = "gray";
        const s = getStabbyBox(hero_is_stabbing);
        c.fillRect(
            (s[0] - scroll_x) * tile_w,
            (s[1] - scroll_y) * tile_h,
            s[2] * tile_w,
            s[3] * tile_h
        );
    }

    if (paused) {
        if (screen_transition_progress < -300) {
            screen_transition_progress += 16 / 2;
        }

        c.fillStyle = `rgba(0,0,0,${(1 + screen_transition_progress / 1000).toFixed(1)})`;
        c.fillRect(0, 0, a.width, a.height);

    } else if (screen_transition_progress > 0) {
        c.fillStyle = `rgba(0,0,0,${(screen_transition_progress / 1000).toFixed(1)})`;
        c.fillRect(0, 0, a.width, a.height);
        c.fillStyle = 'white';
        c.textAlign = 'center';
        c.font = `32px Arial`;
        c.fillText(scene == 'h' ? `Village` : `Dungeon`, a.width / 2, a.height / 2);
        c.font = `16px Arial`;
        c.fillText(scene == 'h' ? `Day ${score_day}` : `Night ${score_day}`, a.width / 2, a.height / 2 + 32);
        screen_transition_progress -= 16;

        if (screen_transition_progress <= 0) {
            screen_transition_progress = 0;
        }
    }

}, 16);

