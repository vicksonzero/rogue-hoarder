//@ts-check


const pauseGame = () => {
    paused = !paused;

    if (paused) {
        // console.log('pauseGame');
        screen_transition_progress = -1000;
        console.log('trade_type', trade_type);
        $p.style.display = trade_type == '_' || trade_type == 'f' ? 'block' : 'none';
        $t.style.display = trade_type == 't' ? 'block' : 'none';
        $td.style.display = trade_type == 'd' ? 'block' : 'none';
        $h.style.display = 'none';
        $xn.style.display = inventory.length == inventory_size ? 'none' : 'block';
        inventory.forEach(e => e.nw = 0);
        updateInventoryList();
    } else {
        if (inventory.length > inventory_size) {
            const lostItem = inventory.pop();
            handleLostAbilities(lostItem);
            lost_inventory = [lostItem];
        }
        screen_transition_progress = 0;

        updateAbilityList();
        updateInventoryList();
        $p.style.display = 'none';
        $t.style.display = 'none';
        $td.style.display = 'none';

        $h.style.display = 'flex';
    }
};


// Canvas
const $a = document.querySelector("canvas");
/** @type HTMLDivElement */
const $h = document.querySelector("#h");
/** @type HTMLDivElement */
const $m = document.querySelector("#m");

/** @type HTMLDivElement */
const $xn = document.querySelector("#ex-note");
/** @type HTMLDivElement */
const $t = document.querySelector("#t");
/** @type HTMLDivElement */
const $tList = document.querySelector("#tList");
/** @type HTMLDivElement */
const $td = document.querySelector("#td");
/** @type HTMLDivElement */
const $dList = document.querySelector("#dList");
/** @type HTMLDivElement */
const $l = document.querySelector("#list");
/** @type HTMLDivElement */
const $p = document.querySelector("#p");
/** @type HTMLDivElement */
const $end = document.querySelector("#end");
const $c = $a.getContext("2d");
$p.style.display = 'none';
$t.style.display = 'none';
$td.style.display = 'none';
$end.style.display = 'none';
$c.imageSmoothingEnabled = false;
$h.onclick = pauseGame;

// cache
const a_dungeon_cache = document.createElement("canvas");
const a_dungeon_cache_c = a_dungeon_cache.getContext('2d');
const a_home_cache = document.createElement("canvas");
const a_home_cache_c = a_home_cache.getContext('2d');

// Map
const map_dungeon = [
    '111111111111111111111111111111111111111111111111111111111111111111111111111111',
    '100000000000000001000000000000000000000000000000000001000000000000000000000001',
    '10000000000000000100000000000000000000000000000000000100000000D000000000000001',
    '100000000000000001000000000020000000000000000000000001111111111100000000000001',
    '100000000000000001000000011111110011000001000000000001000000000000000000000001',
    '1000000000000000010D0000000000010000001000000010000001000000000000300000000001',
    '100000000200000D01111100000000010000000000010000000000000000000001111000000001',
    '100000011111111111000000000000010000000000000000011100000000000000000000000001',
    '1000000000000000010000002000000100000000000000000000000000000000000000www2www1',
    '100000000000000001000111111000010333000000000000000000020000000000000111111111',
    '100001110000000001000000000000011111100000000000000011111100000000000000000001',
    '1000000000000000010w2wwww2w000010000000000302030000010000000000000000000000001',
    '100000000000000001111111111100010000000011111111100010000033002000000000000001',
    '101100000000000000000100000000010000000000000000000110001111111111100000000001',
    '100000000000000000000100000000010000000000000000000110000000000100000000000001',
    '100020000000w2wwww000100000000010www2w0000000000001110000000000100000000000001',
    '111111100001111111100100000002011111111000000000111111000000000100000100000001',
    '100000000000000000000100000111110000000000000000000010000000000100000000000001',
    '1000000011000000000001000000000100000000000D0000000210000000000111100000020001',
    '100000000000000000000100000000010000000001111100011110010000000111000001111001',
    '10000000330www2w00000101111000011112000000000000000010000000000100000111111001',
    '1000001111111111100001000000000111111133000000002000133w2ww0000100000100000001',
    '100000000000001110000100000000011111111111100111111111111110000100001100000001',
    '100000000000000110000100000111110000000000000000000000001000000100011100000001',
    '100010000000000010000000000000010000000000000003000000001000000110000100000001',
    '1000100000000020133wwww3320000010000000000001111110000001000000110200100000001',
    '111110000001111111111111111000010000000000000001000000001000000011111100000001',
    '100010000000000010000000000000010000020000000001000000001330000000000100D03001',
    '100011000000000010000000000000000000111111000001001110011111000000000111111001',
    '100000001000000010000000000000000000000000000001000000000001000000000000000001',
    '100000001000000000000000000203330000000000000201000000000000000000000000000201',
    '100000001020000000000000111111111110000000001111111000000000000000000000001111',
    '100011111111100000000000000000010000000000000000001000000000000000020000000001',
    '1000000010000000000w2ww0000000010000000300000000001000000001110333111100000001',
    '100000001000000000011110000000010000111111000000001001110001111111111111111001',
    '100000001000000000011110000000010000000000000000001000000001000000000100000001',
    '111100111000013320011110000000010000000000000000001000000001000000000100000001',
    '10000000100001111111111000000001ww2www0D0ww2www0001111001111000000000111110001',
    '100000001000000000000000000000011111111111111110000000000001000000000000000001',
    '100001001000000000000000002000000000000000000000000200000001000000000000000001',
    '100001331020000000000000011110000000000000000000011111111001000000100000011111',
    '100011111111100000000000000000000000111100000000000000000001000000000000000001',
    '100000000000000000000000000000000000000000000000000000000001000000000000000001',
    '100000000000000000000000000000011100000001111001111000000001000D00000100000001',
    '100020000000000000000000000000000000000000000000000001100001111110000000000001',
    '1111111111000000wwww2ww0000000000000000000000000000000000001000000000000010001',
    '10000000000000001111111000000ww2ww00000000000000000000000111000000000000000001',
    '100000000000000111111111000001111100000000000000000000000000000www00www0000001',
    '10000000000011111111111133331111111110330003111113www2wwwwwwwww11133111ww2www1',
    '111111111111111111111111111111111111111111111111111111111111111111111111111111',
];


const map_home = [
    '1111111111111111111111111111111111111111111111',
    '1000000000000000000000000000000000000000000001',
    '1000000000000000000000000000000000000000000001',
    '1000000000000000n000000000000000000000000n0001',
    '100000000n001111100000000000000000000001111111',
    '10000n0111000000000000000000000000n00000000001',
    '10011111000000000000000n0000n00001111000000001',
    '1000000000000000000001111111111000000000000001',
    '11000000000000001110000000000000000000n0000001',
    '1100000000000000000000000000000000001111100001',
    '1110000000000000000000000000000000000000000000',
    '11100000000n0002n000111300wwwwwwnwww000000000D',
    '1111111111111111111111111111111111111111111111',
];
const npc_names = [
    'James',
    'John',
    'William',
    'Thomas',
    'Daniel',

    'Sarah',
    'Jessica',
    'Michelle',
    'Amanda',
    'Sharon',
];
const npc_colors = [
    '#FF7',
    '#247',
    '#19F',
    '#F67',
    '#0DA',
    '#A17',
    '#AEF',
    '#8AA',
    '#322',
    '#996',
];



/**
 * @typedef ICard
 * @property {string} n - name
 * @property {string} i - icon
 * @property {number} [rq] - card requirements
 * @property {number} [t] - card tier
 * @property {number} [c] - card sell cost
 */
/**
 * @typedef IItem
 * @property {string} n - name
 * @property {string} i - icon
 * @property {number} [rq] - card requirements
 * @property {number} [t] - card tier
 * @property {number} [nw] - 1=new? 0=old -1=removing
 * @property {number} [hd] - active item?
 * @property {number} [c] - card sell cost
 */


/** @type {ICard[]} */
const cards = [
    {// 0
        n: '', // name
        i: '',
        // rq: 1, // requires live
    },
    {// 1
        n: 'life', // name
        i: '????',
        // rq: 1, // requires live
    },
    {// 2
        n: 'love', // name
        i: '??????',
        // rq: 1, // requires live
    },
    {// 3
        n: 'health', // name
        i: '????',
        // rq: 1, // requires live
    },
    {// 4
        n: 'mind', // name
        i: '????',
        // rq: 1, // requires live
    },
    {// 5
        n: 'run', // name
        i: '????',
        // rq: 1, // requires live
    },
    {// 6
        n: 'jump', // name
        i: '????',
        // rq: 1, // requires live
    },
    {// 7
        n: 'hands', // name
        i: '????',
        // rq: 1, // requires live
    },
    {// 8
        n: 'sight', // name
        i: '????',
        // rq: 1, // requires live
    },
    {// 9
        n: 'hear', // name
        i: '????',
        // rq: 1, // requires live
    },
    {// 10
        n: 'family', // name
        i: '????',
        // rq: 2, // requires love
    },
    {// 11
        n: 'friends', // name
        i: '??????????????????????????',
        // rq: 2, // requires love
    },
    {// 12
        n: 'kidney', // name
        i: '????',
        // rq: 1, // requires live
    },
    {// 13
        n: 'color', // name
        i: '????',
        // rq: 8, // requires sight
    },
    {// 14
        n: 'speech', // name
        i: '????',
        // rq: 9, // requires hear
    },
    { n: '', rq: 0, i: '' }, // 15
    { n: '', rq: 0, i: '' }, // 16
    {// 17
        n: 'strength', // name
        i: '????',
        // rq: 7, // requires jump
    },
    { n: '', /* rq: 0, */ i: '' }, // 18
    { n: '', /* rq: 0, */ i: '' }, // 19
    { n: '', /* rq: 0, */ i: '' }, // 20
    { n: '', /* rq: 0, */ i: '' }, // 21
    { n: '', /* rq: 0, */ i: '' }, // 22
    { n: '', /* rq: 0, */ i: '' }, // 23
    { n: '', /* rq: 0, */ i: '' }, // 24
    { n: '', /* rq: 0, */ i: '' }, // 25
    { n: '', /* rq: 0, */ i: '' }, // 26
    { n: '', /* rq: 0, */ i: '' }, // 27
    { n: '', /* rq: 0, */ i: '' }, // 28
    { n: '', /* rq: 0, */ i: '' }, // 29

    // items (30+)
    {// 30
        n: 'sword', // name
        i: '????',
        // rq: 7, // requires hand
        c: 100,
    },
    {// 31
        n: 'wand', // name
        i: '???',
        // rq: 7, // requires hand
        c: 300,
    },
    {// 32
        n: 'shield', // name
        i: '????',
        // rq: 7, // requires hand
        c: 60,
    },
    {// 33
        n: 'armor', // name
        i: '????',
        // rq: 1, // requires live
        c: 200,
    },
    {// 34
        n: 'elem helmet', // name
        i: '????',
        // rq: 1, // requires live
        c: 400,
    },
    {// 35
        n: 'potion', // name
        i: '????',
        // rq: 7, // requires hand
        c: 400,
    },
    {// 36
        n: 'flower', // name
        i: '????',
        // rq: 7, // requires hand
        c: 5,
    },
    {// 37
        n: 'torch', // name
        i: '????',
        // rq: 7, // requires hand
        c: 800,
    },
    {// 38
        n: 'compass', // name
        i: '????',
        // rq: 7, // requires hand
        c: 1000,
    },
    {// 39
        n: 'map', // name
        i: '???????',
        // rq: 7, // requires hand
        c: 2000,
    },
    {// 40
        n: 'glasses', // name
        i: '????',
        // rq: 13, // requires colors
        c: 2000,
    },
    {// 41
        n: 'treasure', // name
        i: '????',
        // rq: 0, // requires none
        c: 100,
    },
    {// 42
        n: 'sprint', // name
        i: '?????????????',
        // rq: 5, // requires run
        c: 100,
    },
    {// 43
        n: 'climb', // name
        i: '?????????????',
        // rq: 7, // requires jump
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
    /* 2 = epic      */[31, 37, 38, 42, 43], // 34
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
 * @property {string} n
 * @property {number} d
 * @property {number} hp
 * @property {number} w
 * @property {number} h
 * @property {number} sp
 * @property {string} b
 */
/**
 * @typedef IEnemy
 * @property {string} n                        - name. identifier for the enemy's type
 * @property {number} d                        - difficulty rating. is negotiated against level difficulty budget when spawning
 * @property {number} hp                       - an enemy instance dies when hp is 0
 * @property {number} maxHp                    - max hp, is copied from IEnemyDef.hp
 * @property {number} w                        - width, will be copied to entity
 * @property {number} h                        - height, will be copied to entity
 * @property {number} sp                       - moving speed
 * @property {string} b                        - behaviors string
 * @property {'' | 'F' | 'W' | 'E'} el         - type of element (F=Fire, W=Water, E=Electric)
 * @property {number} sx                       - spawn x
 * @property {number} sy                       - spawn y
 * @property {number} dx                       - dest x
 * @property {number} dy                       - dest y
 * @property {number} ai                       - next ai tick
 * @property {number} tg                       - is targeting player?
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
 * @typedef INpc
 * @property {string} t    - trade type (f=friend, m=family, t=trader, d=doctor)
 * @property {number} i    - interaction (0=idle)
 * @property {string} n    - name for display
 * @property {number} lv   - level or love
 * @property {string} c    - color of clothes
 */


/**
 * @typedef ITransform
 * @property {number} x          - 
 * @property {number} y          - 
 * @property {number} w          - 
 * @property {number} h          - 
 */
/**
 * @typedef IEntity
 * @property {string} type       - 
 * @property {number} x          - 
 * @property {number} y          - 
 * @property {number} w          - 
 * @property {number} h          - 
 * @property {number} fc         - facing direction. -1 means left, 1 means right
 * @property {number} [gd]       - grounded
 * @property {number} [inv]      - invincible until
 * @property {number} [vx]       - velocity x, used for knock back or others
 * @property {number} [vy]       - velocity y, used for gravity
 * @property {ICard} [item]      - 
 * @property {IEnemy} [enemy]    - 
 * @property {IEffect} [eff]     - 
 * @property {INpc} [npc]        - 
 * @property {IMagic} [m]        - 
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


// World
const g1 = 0.012;    // gravity in tiles/frame??
const g2 = 0.018;    // gravity in tiles/frame??
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
let can_do_sprint = false;
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

let input_move_is_down = 0;  // flag for capturing double tap left or right
let hero_can_sprint = 0;  // hero can sprint after this frame
let hero_is_sprinting = 0;  // (bool) hero sprinting, aka running at high speed

let hero_can_stab = 1;  // hero can stab after this frame
let hero_is_stabbing = 0;  // hero stabbing before this frame

let hero_can_shoot = 0;  // hero can shoot magic after this frame
let hero_is_shooting = 0;  // hero is shooting magic before this frame

let hero_is_shielding = 0;  // (bool) hero blocking with shield
let hero_tier = 3; // used to unlock health cards

/** @type {Array<IItem>} */
let inventory = [3, 0, 33, 0].map(i => (cards[i]));
let lost_inventory = [];
let inventory_size = inventory.length;
/** @type {Array<IItem>} */
let lostAbilities = [];

// _ = no one near
// s = sell (item -> coin)
// b = buy (coin -> slots)
let trade_type = 's';
let trade_heal_cost = 500; // multiply by 1.4 each time. 
// 100 * 1.4^5 = 537
// 100 * 1.4^10 = 2892

let difficulty = 15;
let difficulty_slope = 3;
let dialog_seed = 0;;

let game_is_over = false;

let score_no_damage = true;
let score_day = 0;
let score_money = 0;
let score_high_score = Number(localStorage.getItem('dicksonmd.RogueHoarder.HighScore'));
/** @type {INpc[]} */
let score_npcs = [
    {
        n: 'Trader',
        t: 't', i: 0, lv: 0.1,
        c: npc_colors.splice(~~(Math.random() * npc_colors.length), 1)[0],
    },
    {
        n: 'Witch Doctor',
        t: 'd', i: 0, lv: 0.1,
        c: '#333',
    },
];

let scroll_x = 0; // X scroll in tiles
let scroll_y = 0; // X scroll in tiles

const changeMap = (_new_map) => {
    if (score_day >= 30) {
        gameOver();
        return;
    }
    scene = _new_map;
    map = (scene == 'h' ? map_home : map_dungeon);
    map_w = map[0].length;  // map width in tiles
    map_h = map.length;     // map height in tiles
    entities = [];
    dialog_seed = ~~(Math.random() * dialogPool.length);


    if (scene == 'd') {
        hero.x = 9;
        hero.y = 5;
    } else {
        score_day++;
        if (score_no_damage) difficulty_slope += 1.5;
        difficulty += difficulty_slope;
        // make new friend
        if (score_npcs.length < 4 && (score_day == 2 || Math.random() < 0.2)) {
            // console.log('new friend');
            score_npcs.push({
                n: npc_names.splice(~~(Math.random() * npc_names.length), 1)[0],
                t: 'f', i: 0, lv: 0,
                c: npc_colors.splice(~~(Math.random() * npc_colors.length), 1)[0],
            })
        }
        //reset npc interactions
        score_npcs.forEach((npc) => {
            npc.i = 0;
            npc.lv += 0.1;
        });
        hero.x = 4;
        hero.y = 7;
    }

    const treasureCandidates = [];
    const doorCandidates = [];
    const spikeCandidates = [];
    const spawnCandidates = [];
    const npcCandidates = [];

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
            if (tile == 'n') {
                npcCandidates.push({ x, y });
            }
        }
    }

    if (scene == 'd') {
        const { x, y } = doorCandidates.splice(~~(Math.random() * doorCandidates.length), 1)[0];
        hero.x = x;
        hero.y = y;
    }

    const doorCount = 2;
    const spikeCount = 10;
    const enemyCount = 10;
    const treasureCount = 10;

    for (let i = 0; doorCandidates.length && i < doorCount; i++) {
        const { x, y } = doorCandidates.splice(~~(Math.random() * doorCandidates.length), 1)[0];
        entities.push({ type: 'D', x: x + 0.1, y: y - 0.6, w: 0.8, h: 1.6, fc: 1 });
    }
    entities.push({ type: 'D', x: 5.1, y: 48 - 0.6, w: 0.8, h: 1.6, fc: 1 });
    for (let i = 0; spikeCandidates.length && i < spikeCount; i++) {
        const { x, y } = spikeCandidates.splice(~~(Math.random() * spikeCandidates.length), 1)[0];
        entities.push({ type: '3', x: x + 0.3, y: y + 0.4, w: 0.6, h: 0.6, fc: 1 });
    }
    if (scene == 'd') entities = entities.concat(spawnEnemy(spawnCandidates, enemyCount));

    for (let i = 0; (scene == 'd' || score_day == 1) && spawnCandidates.length && i < treasureCount; i++) {
        const { x, y } = spawnCandidates.splice(~~(Math.random() * spawnCandidates.length), 1)[0];
        const rarity = randomFrom([0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 4, 4, 4]);
        const itemID = (score_day == 1 && scene == 'h') ? 30 : randomFrom(rare[rarity]);
        // console.log('itemID', rare, rarity, rare[rarity], itemID);
        const item = cards[itemID];
        if (item.n == 'treasure') item.c = ~~(Math.pow(score_day, 1.5) * 100);
        entities.push({ type: 'T', x: x + 0.3, y: y + 0.4, w: 0.6, h: 0.6, fc: 1, vy: .1, item });
    }

    if (scene == 'h' && score_day > 1) {
        score_npcs.forEach((npc) => {
            if (!npcCandidates.length) return;
            const { x, y } = npcCandidates.splice(~~(Math.random() * npcCandidates.length), 1)[0];
            entities.push({ type: 'n', x: x + 0.3, y, w: 0.6, h: 1, fc: 1, vy: .1, npc });
        });
    }

    screen_transition_progress = 2000;
};

const gameOver = () => {
    game_is_over = true;
    score_high_score = Math.max(score_money, score_high_score);
    const sec = frameID * 16 / 1000;
    localStorage.setItem('dicksonmd.RogueHoarder.HighScore', "" + score_high_score);
    $end.innerHTML = `<div><h1>Game Over</h1><p>You have survived ${score_day - 1} nights,<br>and gained ${score_money}pts</p><p>At the cost of ${lostAbilities.map(a => a.i).join(', ')}</p><p>Play time: ${~~(sec / 60)}:${~~(sec % 60)}<br>High score: ${score_high_score}</p><p>&lt;Refresh the webpage to restart&gt;</p></div>`;

    $end.style.display = 'flex';
}

const updateInventoryList = () => {
    // pause screen list
    $l.innerHTML = (inventory.slice(0, inventory_size)
        .map(({ n, i, t, nw, hd }, _i) => `<div class="card c-${t} ${hd ? 'hd' : ''}" data-c=${_i} onclick="prioritize(${_i})"><i>${i}</i>${n}</div>`)
        .join('') +
        '<div>???????</div>' +
        (inventory.length <= inventory_size ? '' :
            `<div class="card c-${inventory[inventory_size].t}" data-c=${inventory_size}><i>${inventory[inventory_size].i}</i>${inventory[inventory_size].n}</div><div>???????</div>`)
    );

    $tList.innerHTML = (inventory.slice(0, inventory_size)
        .map(({ n, i, t, nw, hd, c }, _i) => `<div><div class="card c-${t} ${hd ? 'hd' : ''}" data-c=${_i} onclick="trade('s',${_i})"><i>${i}</i>${n}</div><p>${c ? c + 'pts' : '--'}</p></div>`)
        .join('')
    );
    $tList.innerHTML += lost_inventory.map(({ i, t, nw }, _i) => `<div class="card c-${t} out" data-c=${_i}><i>${i}</i></div>`).join('');


    $dList.innerHTML = (inventory.slice(0, inventory_size)
        .map(({ n, i, t, nw, hd, c }, _i) => `<div><div class="card c-${t} ${hd ? 'hd' : ''}" data-c=${_i}><i>${i}</i>${n}</div></div>`)
        .join('')
    );
    document.querySelector('#hBtn span').innerHTML = trade_heal_cost + 'pts';

    // health bar
    $h.innerHTML = inventory.map(({ i, t, nw, hd }, _i) => `<div class="card c-${t} ${nw ? 'in' : ''}  ${hd ? 'hd' : ''}" data-c=${_i}><i>${i}</i></div>`).join('');
    $h.innerHTML += lost_inventory.map(({ i, t, nw }, _i) => `<div class="card c-${t} out" data-c=${_i}><i>${i}</i></div>`).join('');

    $m.innerHTML = `Score: ${score_money}`;
    // reset inventory animation
    lost_inventory = [];
};

const handleLostAbilities = (lostItem) => {
    console.log('lost item', lostItem.n, cards.findIndex(item => item.n == lostItem.n));
    if (lostItem.n != '' && cards.findIndex(item => item.n == lostItem.n) < 30) { // is body ability
        lostAbilities.push(lostItem);
    }
};

const updateAbilityList = () => {
    console.log('updateAbilityList');
    const old_tier = hero_tier;
    if (hero_tier == 3 && inventory.filter(card => card.n == 'health').length <= 0) { // if health is lost
        hero_tier = 2;
    } else if (hero_tier == 2 && inventory.filter(card => card.t == 2).length <= 1) { // if enough tier 2 is lost
        hero_tier = 1;
    } else if (hero_tier == 1 && inventory.filter(card => card.t == 1).length <= 3) { // if enough tier 1 is lost
        hero_tier = 0;
    } else if (hero_tier == 0 && inventory.every(card => card.n != 'life')) { // if life is lost
        gameOver();
        return;
    }

    if (old_tier != hero_tier) {
        tiers[hero_tier].forEach(id => {
            inventory.unshift({ ...cards[id], nw: 1 });
        });
        inventory_size = inventory.length;
    }

    const old_can_do_color = can_do_color;
    const old_can_do_torch = can_do_torch;
    const old_can_do_sight = can_do_sight;

    can_do_run = (hero_tier >= 2 || inventory.some(card => card.n == 'run'));
    // can_do_run = false;
    can_do_jump = (hero_tier >= 2 || inventory.some(card => card.n == 'jump'));
    // can_do_jump = false;
    can_do_wield = (hero_tier >= 2 || inventory.some(card => card.n == 'hands'));
    can_do_sight = (hero_tier >= 2 || inventory.some(card => card.n == 'sight'));
    can_do_hear = (hero_tier >= 2 || inventory.some(card => card.n == 'hear'));
    can_do_family = (hero_tier >= 2 || inventory.some(card => card.n == 'family'));
    can_do_friends = (hero_tier >= 2 || inventory.some(card => card.n == 'friends'));

    // health
    can_do_sort = (hero_tier >= 3 || inventory.some(card => card.n == 'mind'));
    can_do_armor = (hero_tier >= 3 || inventory.some(card => card.n == 'strength'));
    // can_do_helmet = (hero_tier >= 3 || inventory.some(card => card.n == 'strength'));
    can_do_color = (hero_tier >= 3 || inventory.some(card => card.n == 'color'));
    can_do_speech = (hero_tier >= 3 || inventory.some(card => card.n == 'speech'));

    // skill
    can_do_sprint = (inventory.some(card => card.n == 'sprint'));
    can_do_climb = (inventory.some(card => card.n == 'climb'));

    // items
    can_do_shield = (inventory.some(card => card.n == 'shield'));
    can_do_torch = (inventory.some(card => card.n == 'torch'));

    if (old_can_do_color != can_do_color ||
        old_can_do_torch != can_do_torch ||
        old_can_do_sight != can_do_sight) update_can_do_vision();
    update_can_do_weapons();
};

const update_can_do_vision = () => {
    $a.width = (can_do_torch ? 720 : 480); // 720x480 vs 480x320
    $a.height = (can_do_torch ? 480 : 320);

    $a.style.filter = `grayscale(${can_do_color ? 0 : 1}) brightness(${can_do_sight ? 1 : 0.16})`;
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
    let score_difficulty = scene == 'h' ? 4 : difficulty;
    const pool = [0, 0, 0, 1, 1];
    if (score_difficulty > 30) pool.push(1, 2);

    for (let i = 0; spawnCandidates.length && score_difficulty > 0; i++) {
        const { x, y } = spawnCandidates[~~(Math.random() * spawnCandidates.length)];

        // const enemyDef = enemies[randomFrom([1, 0])];
        const enemyDef = enemies[randomFrom(pool)];
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
    console.log('spawnEnemy difficulty:', difficulty);
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
    handleLostAbilities(lostItem);
    lost_inventory = [lostItem];
    if (lostItem.n == 'armor') {
        inventory.splice(lostIndex, 1, { n: '', i: '', rq: 1 });
        spawnEffect(hero, '#AAA', 1);
    } else {
        inventory.splice(lostIndex, 1);
        spawnEffect(hero, 'red', 0.7);
        score_no_damage = false;
    }

    inventory_size = inventory.length;
    hero.inv = frameID + 120; // 3s
    updateAbilityList();
    updateInventoryList();
};


const tryHeal = (/** @type {INpc}*/ fromNPC) => {
    if (!lostAbilities.length) return 0;
    if (Math.random() > Math.min(1, fromNPC.lv) * 0.8) return 0;
    addItem(lostAbilities.splice(~~(Math.random() * lostAbilities.length), 1)[0]);
    return 1;
}

const knockBack = (/** @type {IEntity}*/attacker, /** @type {IEntity}*/defender) => {
    const disp = displacement(defender, attacker);
    defender.vx = Math.sign(disp[0]) * 0.3;
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
        hero.x + hero.fc * (1 - Math.max(0, hero_is_attacking - frameID) / 15 * 0.5 - 0.1 * (hero.fc + 1)),
        hero.y + 0.43,
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
        m: {
            c,// color
            s,// style, m=magic, s=bee-sting
        },
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
    e.vx -= (Math.sign(e.vx) * Math.min(Math.abs(e.vx), .02));

    const deltaY = dy - y;
    e.y += Math.sign(deltaY) * Math.min(Math.abs(deltaY), sp);
}

const randomFromName = (name, dialog_seed) => {
    return [...name].reduce((acc, c) => acc + c.charCodeAt(0), 0) + dialog_seed;
};

const randomFrom = (arr) => {
    return shuffleArray(arr)[0];
};

const shuffleArray = (/** @type {Array} */ arr) => {
    const result = [];
    const a = arr.slice();
    while (a.length) {
        result.push(a.splice(~~(Math.random() * a.length), 1)[0]);
    }
    return result;
}

const addItem = (/** @type {IItem} */ item) => {
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
            cache_c.fillStyle = "#831";
            cache_c.fillRect(x * tile_w, y * tile_h, tile_w, tile_h);

            if (y > 1 && _map[y - 1][x] != '1') {
                cache_c.fillStyle = "#454";
                cache_c.fillRect(x * tile_w, y * tile_h, tile_w, 8);
            }
        }
        if (tile == 'w' || (tile != 'w' && row[x - 1] == 'w' && row[x + 1] == 'w')) {
            cache_c.fillStyle = "#0B0";
            cache_c.fillRect(x * tile_w, y * tile_h + 6, tile_w, tile_h - 6);
        }
    }));
}

const _did_you_know = 'You can ';
const small_talk = [
    "Long time no see!",
    "How is it going?",
    "Don't overwork yourself",
    "Good day",
    "I used to be an adventurer like you",
    "Got some'in interesting to sell?",
    "Take care of yourself to go further"
];
const do_you_know = [
    `Spending time with friends help you recover`,
    `Potions cannot no longer heal you`,
    `${_did_you_know}sell treasure to the trader to get score`,
    `${_did_you_know}visit the Witch Doctor to recover health`,
    `${_did_you_know}hold Jump to jump higher`,
    `${_did_you_know}hold the down button to use your shield`,
    `${_did_you_know}double tap forward to sprint with your shoes`
].map(a => 'Tips: ' + a);
const dialogPool = shuffleArray([...small_talk, ...small_talk, ...do_you_know]);

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

    // console.log("keyHandler", w, t);

    // -4 bytes zipped compared to if-statements
    const keyMap = {
        87: 'u', /* W */
        90: 'u', /* Z */
        38: 'u', /* ??? */
        83: 'd', /* S */
        40: 'd', /* ??? */
        65: 'l', /* A */
        81: 'l', /* Q */
        37: 'l', /* ??? */
        68: 'r', /* D */
        39: 'r', /* ??? */
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
        update_can_do_vision();
        input.c1 = 0;
    }
    if (input.s && 's' == keyMap[w]) {
        if (!game_is_over) pauseGame();
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

    get takeDameage() { return takeDamage },
    get score_npcs() { return score_npcs },
    get randomFrom() { return randomFrom },
    get shuffleArray() { return shuffleArray },
    get frameID() { return frameID },
    get hero() { return hero },
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

window['trade'] = (type, itemIndex) => {
    trade_type = type;
    const item = inventory[itemIndex];
    console.log('trade', type, item);

    if (type == 's') {
        // if (item.n == 'potion') {
        //     inventory.push({ n: '', i: '', rq: 1, nw: 1 });
        //     inventory_size = inventory.length;
        // } else 
        if (!item.c) {
            return;
        }

        const lostItem = inventory[itemIndex];
        if (cards.findIndex(item => item.n == lostItem.n) < 30) { // is body ability
            lostAbilities.push(lostItem);
        }
        lost_inventory = [lostItem];
        score_money += lostItem.c + (lostItem.n != 'treasure' ? 0 : ~~(Math.random() * lostItem.c * 0.5));
        inventory.splice(itemIndex, 1, { n: '', i: '', rq: 1 });
    }
    if (type == 'd') { // doctor
        if (score_money < trade_heal_cost) return;

        inventory.push({ n: '', i: '', rq: 1, nw: 1 });
        inventory_size = inventory.length;
        score_money -= trade_heal_cost;
        trade_heal_cost = ~~(trade_heal_cost * 1.5);
    }
    updateAbilityList();
    updateInventoryList();
}

// Game loop (60 fps)
setInterval(() => {
    if (game_is_over) return;
    frameID++;

    // Clear
    $a.width ^= 0;

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
    hero.vx -= (Math.sign(hero.vx) * Math.min(Math.abs(hero.vx), .02));

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
        const run_slow = hero_is_shielding || !can_do_run || not_enough_strength;
        if (can_do_sprint && !input_move_is_down && mv) {
            if (hero_can_sprint == 0) {
                hero_can_sprint = frameID + 30;
                // console.log('down', frameID, hero_can_sprint);
            } else if (hero_can_sprint > frameID) {
                // console.log('dbl tap !!!');
                hero_is_sprinting = 1;
                hero_can_sprint = 0;
            }
            input_move_is_down = 1;
        }
        if (hero_can_sprint > 0 && hero_can_sprint <= frameID) {
            // console.log('reset');
            hero_can_sprint = 0;
        }
        if (input_move_is_down && !mv) {
            // console.log('up', frameID);
            input_move_is_down = 0;
            hero_is_sprinting = 0;
        }
        // console.log('hero_can_sprint', input_move_is_down, hero_can_sprint, hero_is_sprinting);

        hero.fc = mv || hero.fc;
        if (!run_slow && hero_is_sprinting && hero.gd > frameID && frameID % 8 == 0) spawnEffect({
            x: hero.x + hero.w / 2,
            y: hero.y + hero.h - 0.3,
            w: 0.4,
            h: 0.4,
            fc: 1,
            type: '',
        }, '#aaa', 0.5);
        tryMoveX(
            hero,
            mv * (run_slow ? .05 : hero_is_sprinting ? .2 : .1) + hero.vx,
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
            hero.vy = can_do_jump ? -.315 : -.25;
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

        const NPCs = entities.filter(e => e.type == 'n' && e.npc.i > -1);
        const nearest_trader = NPCs
            .map(e => ({ ...e, dist: distance(displacement(e, hero)) }))
            .reduce((acc, e) => {
                return !acc || e.dist < acc.dist ? e : acc;
            }, null);
        if (nearest_trader && nearest_trader.dist < 1) {
            const { npc } = nearest_trader;
            const old_i = npc.i;
            trade_type = npc.t;
            NPCs.forEach(({ npc }) => npc.i = 0);
            npc.i = old_i == 0 ? frameID + (npc.t == 't' || npc.t == 'd' ? 0 : 300) : old_i;
        } else {
            NPCs.forEach(({ npc }) => npc.i = 0);
            trade_type = '_';
        }
        NPCs.forEach((e) => {
            const { npc } = e;
            e.fc = (hero.x > e.x ? 1 : -1);
            if (npc.t != 't' && npc.t != 'd' && npc.i > 0 && npc.i < frameID) {
                console.log('npc action', npc);

                inventory.forEach(e => e.nw = 0);
                const flowerIndex = inventory.findIndex(card => card.n == 'flower');
                console.log('flowerIndex', flowerIndex);
                if (npc.lv < 1 && flowerIndex > -1) {
                    // console.log('lostIndex', lostIndex);
                    const lostItem = inventory[flowerIndex];
                    inventory.splice(flowerIndex, 1, { n: '', i: '', rq: 1 });
                    lost_inventory = [lostItem];
                    npc.lv += 0.2;
                }
                npc.lv += 0.2;

                npc.i = tryHeal(npc) ? -2 : -1;
                updateAbilityList();
                updateInventoryList();
            }
        });

        // update entity
        // update other entities
        for (let entityIndex = 0; entityIndex < entities.length; entityIndex++) {
            const e = entities[entityIndex];
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
                    entities.splice(entityIndex, 1);
                    entityIndex--;
                }
                if (x + w + e.vx > map_w) {
                    remove_magic();
                } else {
                    tryMoveX(e, e.vx, map, remove_magic);
                    tryMoveY(e, e.vy, map, remove_magic);
                }

            }
            if (type == 'E') {
                // console.log(`------------------------ ai ${entityIndex}`);
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
                                        e.vy = enemy.b.includes('l') ? -.25 : -0.1;
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
                        if (shootyCollisionIndex < entityIndex) entityIndex--;
                    }
                    if (e.enemy.hp <= 0) {
                        inventory.forEach(e => e.nw = 0);
                        score_money += e.enemy.d * 5;
                        updateInventoryList();
                        spawnEffect(e, '#b3e', 2, 0);
                        spawnEffect(e, '#888', 2.5);
                        entities.splice(entityIndex, 1);
                        entityIndex--;
                        continue;
                    }
                }

                if (b.includes('f')) flyToDestAtSpeed(e);

                if (b.includes('w')) {
                    // set facing depending on walk direction
                    e.fc = dx == x ? e.fc : Math.sign(dx - x);

                    if (e.gd && map[~~y][~~(x + w / 2 + e.fc * w)] == '1') { e.vy = -0.18; e.gd = 0; }
                    // calculate x movement needed
                    const deltaX = Math.sign(dx - x) * Math.min(Math.abs(dx - x), sp) + e.vx;

                    // move according to direction and min speed between remaining and allowed speed
                    e.vx -= (Math.sign(e.vx) * Math.min(Math.abs(e.vx), .02));

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
                entities.splice(entityIndex, 1);
                entityIndex--;
                continue;
            }
            if (type == '3' && stabbyHasCollision) {
                spawnEffect(e, '#A02', 3);
                spawnEffect(e, 'red', 2.2, 0);
                entities.splice(entityIndex, 1);
                entityIndex--;
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
                        entities.splice(entityIndex, 1);
                        entityIndex--;
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
                    entities.splice(entityIndex, 1);
                    entityIndex--;
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
                const { item } = entities[entityIndex];
                addItem(item);
                entities.splice(entityIndex, 1);
                entityIndex--;
            }
        }
    }

    // Compute scroll
    const cam_ww = (can_do_torch ? 10.75 : 7);
    const cam_hh = (can_do_torch ? 7.5 : 5);
    scroll_x = Math.max(0, Math.min(hero.x - cam_ww, map_w - cam_ww - cam_ww - 1));
    scroll_y = Math.max(0, Math.min(hero.y - cam_hh, map_h - cam_hh - cam_hh));

    // Draw map
    $c.drawImage(
        (scene == 'd' ? a_dungeon_cache : a_home_cache),
        scroll_x * tile_w, scroll_y * tile_h,
        $a.width, $a.height,
        0, 0,
        $a.width, $a.height
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
            $c.fillStyle = "brown";
            $c.fillRect((x - scroll_x) * tile_w, (y - scroll_y) * tile_h, w * tile_w, h * tile_h);
            $c.fillStyle = "black";
            $c.fillRect((x - scroll_x) * tile_w + 4, (y - scroll_y) * tile_h + 6, w * tile_w - 8, h * tile_h - 8);
        }
        if (type == 'n') {
            const { i, n, t, lv, c } = e.npc;
            const cx = x + w / 2 - scroll_x;
            const cy = y + h / 2 - scroll_y;
            const msg = t == 't' || t == 'd' ? 'Press <Space> to trade' : tryQuestionMark(dialogPool[randomFromName(n, dialog_seed) % dialogPool.length]);
            const hasFlower = inventory.some(card => card.n == 'flower');
            $c.fillStyle = "#ffe";

            $c.fillStyle = "gold";
            $c.fillRect((x + w * 0.25 - scroll_x) * tile_w, (y - scroll_y) * tile_h, w * 0.2 * tile_w, h * tile_h);
            $c.fillRect((x + w * 0.55 - scroll_x) * tile_w, (y - scroll_y) * tile_h, w * 0.2 * tile_w, h * tile_h);
            // back arm
            fillRectC($c, cx - fc * 0.2, cy + 0.09, w * 0.3, h * 0.1, 'gold');
            // front arm
            fillRectC($c, cx + fc * 0.2, cy + 0.09, w * 0.3, h * 0.1, 'gold');

            // body
            fillRectC($c, cx, cy, w * 0.52, h * 0.65, c);
            $c.fillStyle = "gold";
            $c.fillRect((x - scroll_x) * tile_w, (y - scroll_y) * tile_h, w * tile_w, h / 2 * tile_h);
            // eyes
            fillRectC($c, cx + fc * 0.15, cy - 0.3, w * 0.07, h * 0.2, "black");
            fillRectC($c, cx + fc * 0.05, cy - 0.3, w * 0.07, h * 0.2, "black");

            $c.fillStyle = "#000";
            $c.textAlign = 'center';

            if (trade_type == '_' || i > 0) {
                $c.fillText((i > 0 ? msg : i < -1 ? tryQuestionMark('Here, take this with you.') : n), cx * tile_w, (y - 0.7 - scroll_y) * tile_h);

            }

            if (i <= 0 || lv < 1 || ~~(frameID / 30) % 2) {
                $c.fillText(t == 't' || t == 'd' ? '' : [...Array(Math.min(5, ~~(lv * 5) + (i > 0 ? ~~(frameID / 30) % 2 * (hasFlower ? 2 : 1) : 0)))].fill('??????').join('') /* + `(${i})` */, cx * tile_w, (y - 0.3 - scroll_y) * tile_h);
            }
        }
        if (type == '3') {
            $c.fillStyle = "red";
            $c.fillRect((x - scroll_x) * tile_w, (y - scroll_y) * tile_h, w * tile_w, h * tile_h);
        }
        if (type == 'F') { // effects
            const cx = x + w / 2 - scroll_x;
            const cy = y + h / 2 - scroll_y;

            const ww = w * e.eff.hp / 30;
            const www = w * e.eff.s * (1 - e.eff.hp / 30);

            fillRectC($c, cx - www, cy - www * fc, ww, ww, e.eff.c, false);
            fillRectC($c, cx - www * fc, cy + www, ww, ww, e.eff.c, false);
            fillRectC($c, cx + www * fc, cy - www, ww, ww, e.eff.c, false);
            fillRectC($c, cx + www, cy + www * fc, ww, ww, e.eff.c, false);
        }
        if (type == 'M') { // magic
            $c.save();
            $c.translate((x + w / 2 - scroll_x) * tile_w, (y + h / 2 - scroll_y) * tile_h);
            if (e.m.s == 's') {
                $c.rotate(Math.atan2(e.vy, e.vx));
            }
            $c.fillStyle = e.m.c;
            $c.fillRect(-w / 2 * tile_w, -h / 2 * tile_h, w * tile_w, h * tile_h);
            $c.restore();
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
                        fillRectC($c, cx, cy, w, h, "gray", false);
                        // head
                        fillRectC($c, (cx + fc * w / 2), (cy - h * 0.5), w / 4 * 3, h / 2, "gray", false);
                        // ear
                        fillRectC($c, (cx + fc * w * 0.3), (cy - h * 0.8), w / 4, h * 0.4, "gray", false);
                        // tail
                        fillRectC($c, (cx - fc * w), (cy + h * 0.35), w, h / 4, "brown", false);
                        break;
                    case 'Bat':
                        // foot
                        fillRectC($c, cx - 0.1, cy - 0.2 * h, w * 0.15, h * 0.6, "#222", false);
                        fillRectC($c, cx + 0.1, cy - 0.2 * h, w * 0.15, h * 0.6, "#222", false);
                        // body
                        fillRectC($c, cx, cy + 0.1 * h, w * 0.7, h * 0.7, "navy", false);
                        $c.fillStyle = "navy";
                        flap = (Math.ceil(frameID / 10) % 2 == 0) ? 1 : 0;
                        // wings
                        $c.fillRect((cx - w * 0.7 / 2 - w * 0.7) * tile_w, (cy - h * 0.8 * flap) * tile_h, (w * 0.7) * tile_w, (h * (0.4 + 0.4 * flap)) * tile_h);
                        $c.fillRect((cx + w * 0.7 / 2) * tile_w, (cy - h * 0.8 * flap) * tile_h, (w * 0.7) * tile_w, (h * (0.4 + 0.4 * flap)) * tile_h);
                        // eyes
                        fillRectC($c, cx - 0.1, cy + 0.3 * h, w * 0.1, h * 0.2, "#fff", false);
                        fillRectC($c, cx + 0.1, cy + 0.3 * h, w * 0.1, h * 0.2, "#fff", false);
                        break;
                    case 'Bee':
                        // antenna
                        fillRectC($c, cx + 0.4 * w * fc, cy - 0.1 * h, w * 0.5, h * 0.1, "#222", false);
                        // sting
                        fillRectC($c, cx - w / 2 * fc, cy + 0.2, w * 0.5, h * 0.1, "#222", false);
                        // body
                        fillRectC($c, cx, cy + 0.3 * h, w, h * 0.7, "#eb3", false);
                        flap = (Math.ceil(frameID / 4) % 2 == 0) ? 1 : 0;
                        // eyes
                        fillRectC($c, cx - 0.1, cy + 0.3 * h, w * 0.1, h * 0.7, "#222", false);
                        fillRectC($c, cx + 0.1, cy + 0.3 * h, w * 0.1, h * 0.7, "#222", false);
                        // wings
                        fillRectC($c, cx, cy - (0.1 + 0.2 * flap) / 2, w * 0.5, h * (0.2 + 0.4 * flap), '#ccc');
                        break;
                }
            }
            $c.fillStyle = "black";
            $c.textAlign = 'center';
            $c.fillText(`${tg ? '!!' : ''}`, cx * tile_w, (y - 0.2 - scroll_y - 0.3) * tile_h);
            // c.fillText(`d(${dx.toFixed(1)}, ${dy.toFixed(1)})`, cx * tile_w, (y - 0.2 - scroll_y) * tile_h);
        }
        if (type == 'T') { // treasure
            const { item } = e;
            const label = item.n == 'treasure' ? `${item.c}pts?` : item.n;
            $c.fillStyle = "orange";
            $c.strokeStyle = "black 2px solid";
            $c.fillRect((x - scroll_x) * tile_w, (y - scroll_y) * tile_h, w * tile_w, h * tile_h - 1);
            $c.strokeRect((x - scroll_x) * tile_w, (y - scroll_y) * tile_h, w * tile_w, h * tile_h - 1);
            $c.strokeRect((x - scroll_x) * tile_w, (y - scroll_y) * tile_h, w * tile_w, h / 3 * tile_h);
            $c.fillStyle = "black";
            $c.textAlign = "center";
            $c.fillText(tryQuestionMark(label), (x + w / 2 - scroll_x) * tile_w, (y - 0.2 - scroll_y) * tile_h);
        }
    });

    if (hero.inv < frameID || ~~(frameID / 4) % 2 == 0) {
        const { x, y, w, h, gd, fc } = hero;
        const cx = x + w / 2 - scroll_x;
        const cy = y + h / 2 - scroll_y;
        const isMoving = (input.l || input.r);
        const leg = ~~(frameID / 10) % 2 == 0;
        // $c.fillStyle = "red";
        // $c.fillRect((x - scroll_x) * tile_w, (y - scroll_y) * tile_h, w * tile_w, h * tile_h);

        // legs
        fillRectC($c, cx + fc * 0.095, cy + 0.25, w * 0.2, h * ((gd < frameID) ? 0.35 : (isMoving && !leg) ? 0.35 : 0.5), 'gold');
        fillRectC($c, cx - fc * 0.095, cy + 0.25, w * 0.2, h * ((gd < frameID) ? 0.5 : (isMoving && leg) ? 0.35 : 0.5), 'gold');

        // back arm
        fillRectC($c, cx - fc * 0.2, cy + 0.02, w * 0.3, h * 0.1, 'gold');
        // front arm
        if (hero_is_stabbing < frameID && hero_is_shooting < frameID && !hero_is_shielding) {
            fillRectC($c, cx + fc * 0.2, cy + 0.02, w * 0.3, h * 0.1, 'gold');
        }
        // body / armour
        fillRectC($c, cx, cy, w * 0.52, h * 0.65, inventory.some(card => card.n == 'armor') ? 'gray' : 'gold');
        // fillRectC($c, cx, cy - 0.3, w, h * 0.5, "gray");
        // head
        fillRectC($c, cx, cy - 0.3, w * 0.9, h * 0.5, "gold");
        // eyes
        fillRectC($c, cx + fc * 0.15, cy - 0.3, w * 0.07, h * 0.2, "black");
        fillRectC($c, cx + fc * 0.05, cy - 0.3, w * 0.07, h * 0.2, "black");
    }

    if (hero_is_shielding) {
        $c.fillStyle = "brown";
        $c.fillRect(
            (hero.x - scroll_x + (hero.fc + 1) / 2 * hero.w - 0.1) * tile_w,
            (hero.y - scroll_y + 0.2) * tile_h,
            0.2 * tile_w,
            0.6 * tile_h
        );
    }
    if (hero_is_shooting > frameID) {
        $c.fillStyle = "brown";
        const s = getStabbyBox(frameID + 12);
        $c.fillRect(
            (s[0] - scroll_x) * tile_w,
            (s[1] - scroll_y) * tile_h,
            s[2] * tile_w,
            s[3] * tile_h
        );
    }
    if (hero_is_stabbing > frameID) {
        $c.fillStyle = "silver";
        const s = getStabbyBox(hero_is_stabbing);
        $c.fillRect(
            (s[0] - scroll_x) * tile_w,
            (s[1] - scroll_y) * tile_h,
            s[2] * tile_w,
            s[3] * tile_h
        );
    }

    if (scene == 'h' && score_day < 2) {
        $c.textAlign = 'left';
        $c.fillStyle = "black";
        $c.fillText(`??? Your Inventory Space is also your HP.`, (3 - scroll_x) * tile_w, (4 - scroll_y) * tile_h);
        $c.fillText(`     The right most item is lost if you take damage.`, (3 - scroll_x) * tile_w, (4.5 - scroll_y) * tile_h);
        $c.fillText(`Press J or K to attack`, (17 - scroll_x) * tile_w, (10 - scroll_y) * tile_h);
        $c.fillText(`Press ??? to shield (if equipped)`, (27 - scroll_x) * tile_w, (10 - scroll_y) * tile_h);
        $c.fillText(`Go through the cave to enter dungeon ???`, (39 - scroll_x) * tile_w, (11 - scroll_y) * tile_h);
        $c.fillText(`Press <Space> to rearrange your life priorities`, (35 - scroll_x) * tile_w, (8 - scroll_y) * tile_h);
        $c.textAlign = 'center';
        $c.fillText(`By vicksonzero`, (7.5 - scroll_x) * tile_w, (8.5 - scroll_y) * tile_h);
        $c.fillText(`High Score: ${score_high_score}`, (7.5 - scroll_x) * tile_w, (9.5 - scroll_y) * tile_h);
        $c.fillText(`Press ${['WASD', 'ZQSD', '????????????'][~~(frameID / 150) % 3]} to move and jump`, (7.5 - scroll_x) * tile_w, (11 - scroll_y) * tile_h);
        $c.font = $c.font.replace(/\d+px/, "48px");
        $c.fillText(`Rogue-Hoarder`, (7.5 - scroll_x) * tile_w, (8 - scroll_y) * tile_h);
        $c.font = $c.font.replace(/\d+px/, "12px");
    }

    if (paused) {
        if (screen_transition_progress < -300) {
            screen_transition_progress += 16 / 2;
        }

        $c.fillStyle = `rgba(0,0,0,${(1 + screen_transition_progress / 1000).toFixed(1)})`;
        $c.fillRect(0, 0, $a.width, $a.height);

    } else if (screen_transition_progress > 0) {
        $c.fillStyle = `rgba(0,0,0,${(screen_transition_progress / 1000).toFixed(1)})`;
        $c.fillRect(0, 0, $a.width, $a.height);
        $c.fillStyle = 'white';
        $c.textAlign = 'center';
        $c.font = `32px Arial`;
        $c.fillText(scene == 'h' ? `Village` : `Dungeon`, $a.width / 2, $a.height / 2);
        $c.font = `16px Arial`;
        $c.fillText(scene == 'h' ? `Day ${score_day}` : `Night ${score_day}`, $a.width / 2, $a.height / 2 + 32);
        screen_transition_progress -= 16;

        if (screen_transition_progress <= 0) {
            screen_transition_progress = 0;
        }
    }

}, 16);

