let enable_ap = true; //abstract pieces
let enable_old_school = false; //no ghost, next, hold, etc.
let enabled_bp = true; //hell peices (8x8, bigger board recomended)

function toggleOldSchool() {
    let nxt_canvas = document.getElementById('next');
    let hld_canvas = document.getElementById('held');
    enable_old_school = !enable_old_school;
    if (enable_old_school) {
        nxt_canvas.style.visibility = 'hidden';
        hld_canvas.style.visibility = 'hidden';
    } else {
        nxt_canvas.style.visibility = 'visible';
        hld_canvas.style.visibility = 'visible';
    }
}




document.addEventListener('DOMContentLoaded', e => {
let dropSound = new Audio('drop.mp3');
//dropSound.play();


let canvas = document.getElementById('gamefield');  
let ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;

//NEXT canvas
let nxt_canvas = document.getElementById('next');
let nxt_ctx = nxt_canvas.getContext("2d");
//HELD canvas
let hld_canvas = document.getElementById('held');
let hld_ctx = hld_canvas.getContext("2d");

const u = width/20;
const bw = width/u
const bh = height/u
let board = Array(bw*bh).fill(0);

const piece_width = 8;

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
    j: [
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

var game_status = 0;

//make current piece
let usable_pieces = [p.square, p.line, p.t, p.l, p.j, p.s, p.z];
if (enable_ap)
    usable_pieces.push(ap.j, ap.c, ap.john, ap.gerald, ap.dia, ap.evo);
if (enabled_bp)
    usable_pieces.push(bp.amongus, bp.face, bp.space, bp.maze, bp.tr);
//usable_pieces = [bp.maze];
//usable_pieces = [ap.evo];
let current_piece;
let held_piece;
//current_piece = new Piece(4, 0, ap.c, 0, piece_options);
//console.log(current_piece);


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
            ctx.fillRect(i*u+1, j*u+1, u-2*1, u-2*1);
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

}

//game logic
function logic() {
    dropNCheck()

    checkClear();
    if (game_status) //if game is not over
        dropID = setTimeout(logic, 1000/droprate);

}

//game start
window.start = function () {
    if (game_status) return;
    console.log("Game Started!");
    game_status = 1;
    dropID = setTimeout(logic, 1000/droprate);
    for (let i=0; i<3; i++) {
        next_pieces.push(new Piece(0, i*piece_width, usable_pieces[Math.floor(Math.random()*usable_pieces.length)], 0, piece_options));
        next_pieces[i].ctx = nxt_ctx;
    }
    current_piece = new Piece(0, 0, usable_pieces[Math.floor(Math.random()*usable_pieces.length)], 0, piece_options);

}
//reset game board
window.resetGame = function () {
    clearTimeout(dropID);
    game_status = 0;
    board = Array(bw*bh).fill(0);
    piece_options.board.b = board;
    next_pieces = [];
    held_piece = undefined;
    start();

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
            console.log(droprate)
            break;
        }
        case ' ': {
            evt.preventDefault(); //stops spacebar from activating buttons like reset
            break;
        }
    }
})

function checkClear() {
    //line clear
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
        }
    })
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
    })
}

function nextPiece() {
    current_piece = next_pieces[0];
    current_piece.ctx = ctx;
    current_piece.x = 0;
    current_piece.y = 0;
    if (current_piece.checkOverlap())
        endGame();

    next_pieces.shift();
    next_pieces.push(new Piece(0, (next_pieces.length+1)*piece_width, usable_pieces[Math.floor(Math.random()*usable_pieces.length)], 0, piece_options));
    next_pieces[next_pieces.length-1].ctx = nxt_ctx;
    next_pieces.forEach(piece => {
        piece.y-=piece_width;
    })
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
    clearTimeout(dropID);
    game_status = 2;
    //document.getElementById('status').innerHTML = "GAME OVER";
}

})

