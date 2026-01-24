/**
 * priority 1
 * loads first to initialize html stuff vars to use globally
 */

/**
 * @type {HTMLCanvasElement}
 */
let canvas = document.getElementById('screen');
let ctx = canvas.getContext('2d')
ctx.imageSmoothingEnabled = false;

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

let Particles = []
let Stuff = []
let other_players = [];

let world_offset = {
    x: 0,
    y: 0
}


let debug_mode = false;
function toggleDebug() {
    debug_mode = !debug_mode;
}