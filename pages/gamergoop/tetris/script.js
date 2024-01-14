document.addEventListener('DOMContentLoaded', e => {
let dropSound = new Audio('drop.mp3');
dropSound.play();


let canvas = document.getElementById('gamefield')
let ctx = canvas.getContext("2d");

const width = canvas.width;
const height = canvas.height;
console.log(width, height);

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
    ]
}


//make current piece
let usable_pieces = [p.square, p.line, p.t, p.l, p.j, p.s, p.z];
usable_pieces.push(ap.j, ap.c);
let current_piece = new Piece(4, 0, usable_pieces[Math.floor(Math.random()*usable_pieces.length)], 0, piece_options);
//current_piece = new Piece(4, 0, ap.c, 0, piece_options);
console.log(current_piece);


//do the display thing
const fps = 60;
setInterval(draw, 1000/fps);
//do the drop thing thing
let droprate = 1; //drops per second
setInterval(logic, 1000/droprate);


//draw every frame
function draw() {
    
    //background
    ctx.fillStyle = '#414';
    ctx.fillRect(0, 0, width, height);
    for (let i=0; i<bw; i++) {
        for (let j=0; j<bh; j++) {
            ctx.fillStyle = '#000';
            ctx.fillRect(i*u+1, j*u+1, u-2*1, u-2*1);
        }
    }

    //current piece
    current_piece.draw();

    //fallen pieces
    board.forEach((color, index) => {
        if (!color) return;
        let cx = index%bw;
        let cy = Math.floor(index/bw);
        cx*=u;
        cy*=u;
        ctx.fillStyle = color;
        ctx.fillRect(cx, cy, u, u);
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
        current_piece = new Piece(4, 0, usable_pieces[Math.floor(Math.random()*usable_pieces.length)], 0, piece_options);
        //dropSound.play();
    }
    current_piece.drop();
}
//key presses
document.addEventListener('keydown', evt => {
    switch (evt.key) {
        case 'ArrowUp': {
            current_piece.rotate(1);
            if (current_piece.checkOverlap())
                current_piece.rotate(-1);
            break;
        }
        case 'ArrowDown': {
            console.log("drop");
            break;
        }
        case 'ArrowLeft': {
            current_piece.move(-1);
            if (current_piece.checkOverlap())
                current_piece.move(1);
            break;
        }
        case 'ArrowRight': {
            current_piece.move(1);
            if (current_piece.checkOverlap())
                current_piece.move(-1);
            break;
        }
        case ' ': {
            current_piece.hardDrop();
            current_piece.set();
            board = current_piece.updateBoard();
            current_piece = new Piece(4, 0, usable_pieces[Math.floor(Math.random()*usable_pieces.length)], 0, piece_options);
            //dropSound.play();
            break;
        }
        case 'c': {
            console.log("hold");
            break;
        }
    }
})




})

