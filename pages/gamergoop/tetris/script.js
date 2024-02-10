let enable_ap = true; //abstract pieces
let enable_old_school = false; //no ghost, next, hold, etc.
let enable_bp = false; //hell peices (8x8, bigger board recomended)

function setButtonState(button_id, state, menu_class = undefined) {
    if (menu_class) {
        for (let item of document.getElementsByClassName(menu_class)) {
            item.classList.remove('selected');
            item.classList.remove('unselected');
        }
    }
    document.getElementById(button_id).classList.remove('enabled', 'disabled');
    document.getElementById(button_id).classList.add(state);
}


document.addEventListener('DOMContentLoaded', e => {
let ost = new Audio('mewmewsong.mp3');
ost.volume = 0.3;
let ost_hell = new Audio('mewmewsong_hell.mp3');
ost_hell.volume = 0;
let drop_fx = new Audio('drop.wav');
drop_fx.volume = 0.4;
let clear_fx = new Audio('clear.wav');
clear_fx.volume = 0.4;
let clear_alt_fx = new Audio('clear_alt.wav');
clear_alt_fx.volume = 0.4;
let end_fx = new Audio('game_end.wav');
end_fx.volume = 0.6;





let canvas = document.getElementById('gamefield');  
let ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;

//piece overlay
window.piece_overlay = new Image();
window.piece_overlay.src = 'piece.png';

//NEXT canvas
let nxt_canvas = document.getElementById('next');
let nxt_ctx = nxt_canvas.getContext("2d");
//HELD canvas
let hld_canvas = document.getElementById('held');
let hld_ctx = hld_canvas.getContext("2d");

let u = width/10;
let bw = width/u
let bh = height/u
let board = Array(bw*bh).fill(0);

let piece_width = 4;

let piece_options = {
    ctx: ctx,
    u: u,
    board: {
        w: bw,
        h: bh,
        b: board
    }
}

//pieces
const p = {
    square: [
        [
            [1,1],
            [1,1]
        ],
        [
            [1,1],
            [1,1]
        ],
        [
            [1,1],
            [1,1]
        ],
        [
            [1,1],
            [1,1]
        ],
        '#ff0'
    ],
    line: [
        [
            [0,0,0,0],
            [1,1,1,1]
        ],
        [
            [0,0,1],
            [0,0,1],
            [0,0,1],
            [0,0,1],
        ],
        [
            [0,0,0,0],
            [0,0,0,0],
            [1,1,1,1]
        ],
        [
            [0,1],
            [0,1],
            [0,1],
            [0,1],
        ],
        '#0ff'
    ],
    t: [
        [
            [0,1],
            [1,1,1]
        ],
        [
            [0,1],
            [0,1,1],
            [0,1]
        ],
        [
            [0,0,0],
            [1,1,1],
            [0,1]
        ],
        [
            [0,1],
            [1,1],
            [0,1]
        ],
        '#f0f'
    ],
    j: [
        [
            [1],
            [1,1,1]
        ],
        [
            [0,1,1],
            [0,1],
            [0,1]
        ],
        [
            [0,0,0],
            [1,1,1],
            [0,0,1]
        ],
        [
            [0,1],
            [0,1],
            [1,1]
        ],
        '#00f'
    ],
    l: [
        [
            [0,0,1],
            [1,1,1]
        ],
        [
            [0,1],
            [0,1],
            [0,1,1]
        ],
        [
            [0,0,0],
            [1,1,1],
            [1,0]
        ],
        [
            [1,1],
            [0,1],
            [0,1]
        ],
        '#f70'
    ],
    s: [
        [
            [0,1,1],
            [1,1]
        ],
        [
            [0,1],
            [0,1,1],
            [0,0,1]
        ],
        [
            [0],
            [0,1,1],
            [1,1]
        ],
        [
            [1],
            [1,1],
            [0,1]
        ],
        '#0f0'
    ],
    z: [
        [
            [1,1],
            [0,1,1]
        ],
        [
            [0,0,1],
            [0,1,1],
            [0,1]
        ],
        [
            [0],
            [1,1],
            [0,1,1]
        ],
        [
            [0,1],
            [1,1],
            [1]
        ],
        '#f00'
    ],
}
//abstract pieces
const ap = {
    corner: [
        [
            [1,1],
            [1]
        ],
        [
            [1,1],
            [0,1]
        ],
        [
            [0,1],
            [1,1]
        ],
        [
            [1],
            [1,1]
        ],
        '#ff7'
    ],
    c: [
        [
            [1,1,1],
            [1,0,1]
        ],
        [
            [1,1],
            [0,1],
            [1,1]
        ],
        [
            [1,0,1],
            [1,1,1]
        ],
        [
            [1,1],
            [1],
            [1,1]
        ],
        '#77f'
    ],
    john: [
        [
            [1,1],
            [0,1,1],
            [0,0,1]
        ],
        [
            [0,0,1],
            [0,1,1],
            [1,1]
        ],
        [
            [1],
            [1,1],
            [0,1,1]
        ],
        [
            [0,1,1],
            [1,1],
            [1]
        ],
        '#330'
    ],
    gerald: [
        [
            [1,1,1],
            [1,0,1],
            [1,1,1]
        ],
        [
            [1,1,1],
            [1,0,1],
            [1,1,1]
        ],
        [
            [1,1,1],
            [1,0,1],
            [1,1,1]
        ],
        [
            [1,1,1],
            [1,0,1],
            [1,1,1]
        ],
        '#8aa'
    ],
    dia: [
        [
            [1],
            [0,1]
        ],
        [
            [0,1],
            [1]
        ],
        [
            [1],
            [0,1]
        ],
        [
            [0,1],
            [1]
        ],
        '#afa'
    ],
    evo: [
        [
            [1,1],
            [1]
        ],
        [
            [1]
        ],
        [
            [1,1,1]
        ],
        [
            [1,1,1,1],
            [1,0,1,1]
        ],
        '#fff'
    ],

    
}

const bp = {
    amongus: [
        [
            [1,1,1],
            [0,0,1],
            [1,1,1,1],
            [1,1,1,1],
            [1,0,1]
        ],
        [
            [1,0,0,0,1,0,1],
            [0,1,1,0,1,0,1],
            [0,0,0,1,1,1,1],
            [0,1,1,1,1,1],
            [0,1,0,1]
        ],        
        [
            [0,0,0,1,1,0,0,1],
            [0,1],
            [0,1,0,0,0,1,0,1],
            [0,0,0,0,0,0,1],
            [1,0,1,0,1,1,1,1],
            [0,1,0,0,1,1,1,1],
            [1,1,1,0,0,1,0,0],
            [1,0,1,0,0,1,1,1],
        ],        
        [
            [1,0,0,0,1,0,1],
            [0,1,1,0,1,0,1],
            [0,0,0,1,1,1,1],
            [0,1,1,1,1,1],
            [0,1,0,1]
        ],
        '#f00'
    ],
    face: [
        [
            [0,0,1,0,0,1,0,0],
            [0,0,1,0,0,1,0,0],
            [0,0,1,0,0,1,0,0],
            [0,0,0,0,0,0,0,0],
            [1,1,1,1,1,1,1,1],
            [1,0,0,0,0,0,0,1],
            [0,1,0,0,0,0,1,0],
            [0,0,1,1,1,1,0,0]
        ],
        [
            [0,0,1,0,0,1,0,0],
            [0,0,1,0,0,1,0,0],
            [0,0,1,0,0,1,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,1,1,1,1,0,0],
            [0,1,0,0,0,0,1,0],
            [1,0,0,0,0,0,0,1],
            [1,1,1,1,1,1,1,1]
        ],        
        [
            [0,0,1,0,0,1,0,0],
            [0,0,1,0,0,1,0,0],
            [0,0,1,0,0,1,0,0],
            [0,0,0,0,0,0,0,0],
            [1,1,1,1,1,1,1,1],
            [1,0,0,0,0,0,0,1],
            [0,1,0,0,0,0,1,0],
            [0,0,1,1,1,1,0,0]
        ],        
        [
            [0,0,1,0,0,1,0,0],
            [0,0,1,0,0,1,0,0],
            [0,0,1,0,0,1,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,1,1,1,1,0,0],
            [0,1,0,0,0,0,1,0],
            [1,0,0,0,0,0,0,1],
            [1,1,1,1,1,1,1,1]
        ],
        '#f0f'
    ],
    space: [
        [
            [1,1,0,0,1,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,1,0,0,0,1,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,1,1],
            [1,0,0,0,1,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,1,1,0,0,0,1]
        ],
        [
            [1,1,0,0,1,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,1,0,0,0,1,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,1,1],
            [1,0,0,0,1,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,1,1,0,0,0,1]
        ],
        [
            [1,1,0,0,1,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,1,0,0,0,1,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,1,1],
            [1,0,0,0,1,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,1,1,0,0,0,1]
        ],
        [
            [1,1,0,0,1,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,1,0,0,0,1,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,1,1],
            [1,0,0,0,1,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,1,1,0,0,0,1]
        ],
        '#0ff'
    ],
    maze: [
        [
            [0,1,1,1,1,1,1,1],
            [0,0,0,0,0,0,0,1],
            [1,1,1,1,1,1,0,1],
            [1,0,0,0,0,0,0,1],
            [1,1,0,1,1,1,1,1],
            [1,1,0,0,0,0,0,1],
            [1,1,1,1,1,1,0,1],
            [1,1,1,1,1,1,0,1]
        ],
        [
            [0,1,1,1,1,1,1,1],
            [0,0,0,0,0,0,0,1],
            [1,1,1,1,1,1,0,1],
            [1,0,0,0,0,0,0,1],
            [1,1,0,1,1,1,1,1],
            [1,1,0,0,0,0,0,1],
            [1,1,1,1,1,1,0,1],
            [1,1,1,1,1,1,0,1]
        ],
        [
            [0,1,1,1,1,1,1,1],
            [0,0,0,0,0,0,0,1],
            [1,1,1,1,1,1,0,1],
            [1,0,0,0,0,0,0,1],
            [1,1,0,1,1,1,1,1],
            [1,1,0,0,0,0,0,1],
            [1,1,1,1,1,1,0,1],
            [1,1,1,1,1,1,0,1]
        ],
        [
            [0,1,1,1,1,1,1,1],
            [0,0,0,0,0,0,0,1],
            [1,1,1,1,1,1,0,1],
            [1,0,0,0,0,0,0,1],
            [1,1,0,1,1,1,1,1],
            [1,1,0,0,0,0,0,1],
            [1,1,1,1,1,1,0,1],
            [1,1,1,1,1,1,0,1]
        ],
        '#48f'
    ],
    tr: [
        [
            [0,1,1,1,0,0,0,0],
            [0,1,1,1,0,0,0,0],
            [0,0,1,0,0,0,0,0],
            [1,1,1,1,1,0,0,0],
            [0,0,1,0,0,0,0,0],
            [0,0,1,1,1,1,1,1],
            [0,0,1,0,0,0,0,0],
            [0,1,0,1,0,0,0,0]
        ],
        [
            [0,1,1,1,0,0,0,0],
            [0,1,1,1,0,0,0,0],
            [0,0,1,0,0,0,0,0],
            [1,1,1,1,1,0,0,0],
            [0,0,1,0,0,0,0,0],
            [0,0,1,1,1,1,1,1],
            [0,0,1,0,0,0,0,0],
            [0,1,0,1,0,0,0,0]
        ],
        [
            [0,1,1,1,0,0,0,0],
            [0,1,1,1,0,0,0,0],
            [0,0,1,0,0,0,0,0],
            [1,1,1,1,1,0,0,0],
            [0,0,1,0,0,0,0,0],
            [0,0,1,1,1,1,1,1],
            [0,0,1,0,0,0,0,0],
            [0,1,0,1,0,0,0,0]
        ],
        [
            [0,1,1,1,0,0,0,0],
            [0,1,1,1,0,0,0,0],
            [0,0,1,0,0,0,0,0],
            [1,1,1,1,1,0,0,0],
            [0,0,1,0,0,0,0,0],
            [0,0,1,1,1,1,1,1],
            [0,0,1,0,0,0,0,0],
            [0,1,0,1,0,0,0,0]
        ],
        '#ff0'
    ]
}

let game_status = 0;
let score = 0;
let s_score = "00000";

//make current piece
let usable_pieces = {};
for (let adding in p) usable_pieces[adding] = p[adding];


if (enable_ap)
    for (let adding in ap) usable_pieces[adding] = ap[adding];
if (enable_bp)
    for (let adding in bp) usable_pieces[adding] = bp[adding];

let current_piece;
let held_piece;


//next piece setup

let next_pieces = []



//remove next + hold
if (enable_old_school) {
    nxt_canvas.style.visibility = 'hidden';
    hld_canvas.style.visibility = 'hidden';
}


//do the display thing
const fps = 60;
setInterval(draw, 1000/fps);
//do the drop thing thing
let droprate = 2; //drops per second
let dropID;


//draw every frame
function draw() {
    


    //background
    ctx.fillStyle = '#414';
    ctx.fillRect(0, 0, width, height);
    if (!enable_old_school) {
        nxt_ctx.fillStyle = '#114416';
        nxt_ctx.fillRect(0, 0, nxt_canvas.width, nxt_canvas.height);
        hld_ctx.fillStyle = '#114416';
        hld_ctx.fillRect(0, 0, hld_canvas.width, hld_canvas.height);
    }
        
    for (let i=0; i<bw; i++) {
        for (let j=0; j<bh; j++) {
            ctx.fillStyle = '#000';
            ctx.fillRect(i*u+2, j*u+2, u-4*1, u-4*1);
            if (!enable_old_school) {
                nxt_ctx.fillStyle = '#000';
                nxt_ctx.fillRect(i*u+1, j*u+1, u-2*1, u-2*1);
                hld_ctx.fillStyle = '#000';
                hld_ctx.fillRect(i*u+1, j*u+1, u-2*1, u-2*1);
            }
                
        }
    }
    if (!game_status) return;

    //ghost piece
    if (!enable_old_school) {
        ctx.globalAlpha = 0.2;
        current_piece.drawGhost();
        ctx.globalAlpha = 1.0;
    }
        

    //current piece
    current_piece.draw();

    //fallen pieces
    drawFallen();

    
    //NEXT
    if (!enable_old_school) {
        next_pieces.forEach(piece => {
            piece.draw();
        });
        if (held_piece)
            held_piece.draw();
    }

    //SCORE
    document.getElementById('score').innerText = s_score;
    if (score >= 100) document.getElementById('score').style.color = '#7ff';
    if (score >= 500) document.getElementById('score').style.color = '#ff7';
    if (score >= 1000) document.getElementById('score').style.color = '#f7f';
    if (score >= 5000) document.getElementById('score').style.color = '#77f';
    if (score >= 10000) document.getElementById('score').style.color = '#f77';

    //MUSIC
    if (ost.currentTime >= ost.duration) {
        ost.play();
        ost_hell.play();
    } //reset music after its over

}

//game logic
function logic() {
    dropNCheck()

    checkClear();
    if (game_status == 1) //if game is not over
        dropID = setTimeout(logic, 1000/droprate);

}

//game start
window.start = function () {
    if (game_status) return;
    console.log("Game Started!");
    game_status = 1;
    dropID = setTimeout(logic, 1000/droprate);
    for (let i=0; i<3; i++) {
        next_pieces.push(new Piece(0, i*piece_width, randomPiece(), 0, piece_options));
        next_pieces[i].ctx = nxt_ctx;
    }
    current_piece = new Piece(piece_width*0.75 << 0, 0, randomPiece(), 0, piece_options);
    ost.play();
    ost_hell.play();

}
//reset game board
window.resetGame = function () {
    ost.pause();
    ost.currentTime = 0;
    ost_hell.pause();
    ost_hell.currentTime = 0;
    bw = width/u;
    bh = height/u;
    clearTimeout(dropID);
    game_status = 0;
    score = 0;
    s_score = "00000";
    document.getElementById('score').style.color = '#fff';
    board = Array(bw*bh).fill(0);
    piece_options = {
        ctx: ctx,
        u: u,
        board: {
            w: bw,
            h: bh,
            b: board
        }
    }
    next_pieces = [];
    held_piece = undefined;
    start();

}
//toggles

window.toggleOldSchool = function () {
    enable_old_school = !enable_old_school;
    if (enable_old_school) {
        nxt_canvas.style.visibility = 'hidden';
        hld_canvas.style.visibility = 'hidden';
        setButtonState('OSBtn', 'enabled');
    } else {
        nxt_canvas.style.visibility = 'visible';
        hld_canvas.style.visibility = 'visible';
        setButtonState('OSBtn', 'disabled');
    }
}
window.toggleAP = function () {
    console.log(usable_pieces);
    enable_ap = !enable_ap;
    if (enable_ap) {
        setButtonState('APBtn', 'enabled');
        for (let adding in ap) usable_pieces[adding] = ap[adding];
        console.log(usable_pieces);
    } else {
        for (let adding in ap) delete usable_pieces[adding];
        setButtonState('APBtn', 'disabled');
    }
}
window.toggleHell = function () {
    enable_bp = !enable_bp;
    if (enable_bp) {
        setButtonState('HBtn', 'enabled');
        for (let adding in bp) usable_pieces[adding] = bp[adding];
        ost_hell.volume = 0.2;
    } else {
        setButtonState('HBtn', 'disabled');
        for (let adding in bp) delete usable_pieces[adding];
        ost_hell.volume = 0;
    }
}


//boards
window.normieBoard = function () {
    u = width/10;
    piece_width = 4;
    setButtonState('NBBtn', 'selected', 'one_menu');
    resetGame();
}
window.bigBoard = function () {
    u = width/20;
    piece_width = 8;
    setButtonState('BBBtn', 'selected', 'one_menu');
    resetGame();
}


//key presses
document.addEventListener('keydown', evt => {
    if (game_status != 1) return;
    switch (evt.key) {
        case 'ArrowUp': {
            current_piece.rotate(1);
            if (current_piece.checkOverlap() || current_piece.checkEdge())
                current_piece.rotate(-1);
            break;
        }
        case 'ArrowDown': {
            if (droprate == 2)
                dropNCheck()
            droprate = 30;
                
            break;
        }
        case 'ArrowLeft': {
            current_piece.move(-1);
            if (current_piece.checkOverlap() || current_piece.checkEdge())
                current_piece.move(1);
            break;
        }
        case 'ArrowRight': {
            current_piece.move(1);
            if (current_piece.checkOverlap() || current_piece.checkEdge())
                current_piece.move(-1);
            break;
        }
        case ' ': {
            current_piece.hardDrop();
            current_piece.set();
            board = current_piece.updateBoard();
            nextPiece();
            checkClear();
            //dropSound.play();
            break;
        }
        case 'c': {
            /**
             * held piece -> transition piece
             * held piece <- current piece
             * current piece <- transition piece
             */
            if (current_piece.held) return; //if you have already held a piece
            let trans_piece; //transition piece
            if (held_piece) {
                trans_piece = held_piece;
                held_piece = current_piece;
                held_piece.ctx = hld_ctx;
                held_piece.x = 0;
                held_piece.y = 0;
                held_piece.held = true;
                current_piece = trans_piece;
                current_piece.ctx = ctx;
                current_piece.x = piece_width*1.25 << 0;
            } else {
                held_piece = current_piece;
                held_piece.ctx = hld_ctx;
                held_piece.x = 0;
                held_piece.y = 0;
                held_piece.held = true;
                nextPiece();
            }

            break;
        }
    }
})

document.addEventListener('keyup', evt => {
    switch (evt.key) {
        case 'ArrowDown': {
            droprate = 2;
            break;
        }
        case ' ': {
            evt.preventDefault(); //stops spacebar from activating buttons like reset
            break;
        }
    }
})

function randomPiece() {
    let keys = Object.keys(usable_pieces);
    return usable_pieces[keys[ keys.length * Math.random() << 0]];
}

function checkClear() {
    //line clear
    let lines_cleared = 0;
    let lines = [];
    for (let i=0; i<bh; i++) {
        lines.push(board.slice(i*bw, (i+1)*bw));
    }
    board = [];
    lines.forEach((line, index) => {
        if (line.indexOf(0) > -1) {
            board = board.concat(line);
        } else {
            let empty_row = [];
            for (let i=0; i<bw; i++)
                empty_row.push(0);
            board = empty_row.concat(board);
            lines_cleared++;
        }
    })
    addScore(lines_cleared*50);
    if (lines_cleared >= 4) {
        addScore(100);
        clear_alt_fx.play();
    }
    else if (lines_cleared >= 1) clear_fx.play();

    current_piece.pushBoard(board);
    drawFallen();
}

function drawFallen() {
    board.forEach((cell, index) => {
        if (!cell) return;
        let cx = index%bw;
        let cy = Math.floor(index/bw);
        cx*=u;
        cy*=u;
        ctx.fillStyle = cell; //board shows filled pieces as their colors
        //ctx.fillStyle = '#fff';
        ctx.fillRect(cx, cy, u, u);
        ctx.drawImage(window.piece_overlay, cx, cy, u, u);
    })
}

function nextPiece() {
    drop_fx.play();
    current_piece = next_pieces[0];
    current_piece.ctx = ctx;
    current_piece.x = piece_width*1.25 << 0;
    current_piece.y = 0;
    if (current_piece.checkOverlap())
        endGame();

    next_pieces.shift();
    next_pieces.push(new Piece(0, (next_pieces.length+1)*piece_width, randomPiece(), 0, piece_options));
    next_pieces[next_pieces.length-1].ctx = nxt_ctx;
    next_pieces.forEach(piece => {
        piece.y-=piece_width;
    });

    addScore(10);
}

function dropNCheck() {
    if (current_piece.checkFuture()) {
        current_piece.set();
        board = current_piece.updateBoard();
        nextPiece();
        //dropSound.play();
    }
    current_piece.drop();
}

function endGame() {
    console.log("Game End")
    clearTimeout(dropID);
    game_status = 2;
    ost.pause();
    ost.currentTime = 0;
    end_fx.play();
    //document.getElementById('status').innerHTML = "GAME OVER";
}

function addScore(value) {
    score += value;
    s_score = "";
    let placeholders = 5 - score.toString().length;
    for (let i=0; i<placeholders; i++) s_score += "0";
    s_score += score;
}



})

