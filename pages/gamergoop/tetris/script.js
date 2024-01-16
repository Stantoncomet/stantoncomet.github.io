let enable_ap = true; //abstract pieces
let enable_old_school = true; //no ghost, next, hold, etc.

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

function toggleAP() {
    
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

const u = width/10;
const bw = width/u
const bh = height/u
let board = Array(bw*bh).fill(0);

const piece_options = {
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


//make current piece
let usable_pieces = [p.square, p.line, p.t, p.l, p.j, p.s, p.z];
if (enable_ap)
    usable_pieces.push(ap.j, ap.c, ap.john, ap.gerald, ap.dia, ap.evo);
//usable_pieces = [ap.evo];
let current_piece = new Piece(4, 0, usable_pieces[Math.floor(Math.random()*usable_pieces.length)], 0, piece_options);
//current_piece = new Piece(4, 0, ap.c, 0, piece_options);
console.log(current_piece);


//next piece setup

let next_pieces = []
for (let i=0; i<3; i++) {
    next_pieces.push(new Piece(0, i*4+1, usable_pieces[Math.floor(Math.random()*usable_pieces.length)], 0, piece_options));
    next_pieces[i].ctx = nxt_ctx;
}


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
setInterval(logic, 1000/droprate);


//draw every frame
function draw() {
    
    //background
    ctx.fillStyle = '#414';
    ctx.fillRect(0, 0, width, height);
    nxt_ctx.fillStyle = '#414';
    if (!enable_old_school) 
        nxt_ctx.fillRect(0, 0, nxt_canvas.width, nxt_canvas.height);
    for (let i=0; i<bw; i++) {
        for (let j=0; j<bh; j++) {
            ctx.fillStyle = '#000';
            ctx.fillRect(i*u+1, j*u+1, u-2*1, u-2*1);
            nxt_ctx.fillStyle = '#000';
            if (!enable_old_school) 
                nxt_ctx.fillRect(i*u+1, j*u+1, u-2*1, u-2*1);
        }
    }
    
    //ghost piece
    if (!enable_old_school) 
        current_piece.drawGhost();

    //current piece
    current_piece.draw();

    //fallen pieces
    drawFallen();

    
    //NEXT
    if (!enable_old_school)
        next_pieces.forEach(piece => {
            piece.draw();
        })
    
   
    // let x = 6;
    // let y = 14;
    // x*=u;
    // y*=u;
    // //draw a piece
    // //ctx.fillStyle = '#0ff';
    // ctx.fillRect(x,y,u,u);

    

    
}

//game logic
function logic() {
    if (current_piece.checkFuture()) {
        current_piece.set();
        board = current_piece.updateBoard();
        nextPiece();
        //dropSound.play();
    }
    current_piece.drop();

    checkClear();

}
//key presses
document.addEventListener('keydown', evt => {
    switch (evt.key) {
        case 'ArrowUp': {
            current_piece.rotate(1);
            if (current_piece.checkOverlap() || current_piece.checkEdge())
                current_piece.rotate(-1);
            break;
        }
        case 'ArrowDown':
        case ' ': {
            current_piece.hardDrop();
            current_piece.set();
            board = current_piece.updateBoard();
            nextPiece()
            checkClear();
            //dropSound.play();
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
        case 'ArrowDown': {
            console.log("drop");
            break;
        }
        case 'c': {
            console.log("hold");
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
            board = [0,0,0,0,0,0,0,0,0,0].concat(board);
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
    current_piece.x = 4;
    current_piece.y = 0;
    next_pieces.shift();
    next_pieces.push(new Piece(0, (next_pieces.length+1)*4+1, usable_pieces[Math.floor(Math.random()*usable_pieces.length)], 0, piece_options));
    next_pieces[next_pieces.length-1].ctx = nxt_ctx;
    next_pieces.forEach(piece => {
        piece.y-=4;
    })
}

})

