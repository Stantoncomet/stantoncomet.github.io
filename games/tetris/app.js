document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const scoreDisplay = document.querySelector('#score');
    const startBtn = document.querySelector('#start_button');
    const gameStatus = document.querySelector('#game_status');
    const width = 10;
    let timerId;
    let score = 0;
    const colors = [

    ]

    //Tetrominoes
    const iTetromino = [
        [width,width+1,width+2,width+3],
        [2,width+2,width*2+2,width*3+2],
        [width*2,width*2+1,width*2+2,width*2+3],
        [1,width+1,width*2+1,width*3+1]
    ];
    const jTetromino = [
        [0,width,width+1,width+2],
        [1,2,width+1,width*2+1],
        [width,width+1,width+2,width*2+2],
        [1,width+1,width*2,width*2+1]
    ];
    const lTetromino = [
        [2,width,width+1,width+2],
        [1,width+1,width*2+1,width*2+2],
        [width,width+1,width+2,width*2],
        [0,1,width+1,width*2+1]
    ];
    const oTetromino = [
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1]
    ];
    const sTetromino = [
        [1,2,width,width+1],
        [1,width+1,width+2,width*2+2],
        [width*1+1,width*1+2,width*2,width*2+1],
        [0,width,width+1,width*2+1,]
    ];
    const tTetromino = [
        [1,width,width+1,width+2],
        [1,width+1,width+2,width*2+1],
        [width,width+1,width+2,width*2+1],
        [1,width,width+1,width*2+1]
    ];
    const zTetromino = [
        [0,1,width+1,width+2],
        [2,width+1,width+2,width*2+1],
        [width,width+1,width*2+1,width*2+2],
        [1,width,width+1,width*2]
    ];
    const tempTetromino = [
        [0,1,2,3,4,5,6,7,8,9]
    ]



    const theTetrominoes = [iTetromino,jTetromino,lTetromino,oTetromino,sTetromino,tTetromino,zTetromino];

    let currentPosition = 14;
    let currentRotaion = 0;

    //random tetromino select
    let nextRandoms = [0, 0, 0];
    nextRandoms.forEach((item, index, arr) => arr[index] = Math.floor(Math.random()*theTetrominoes.length));
    let random = Math.floor(Math.random()*theTetrominoes.length);
    let current = theTetrominoes[random][currentRotaion];
    //let current = tempTetromino[0];


    //draw tetromino
    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino');
        });
    };

    //undraw tetromino
    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino');
        });
    };

    //move per <time>
    //timerId = setInterval(moveDown, 400);

    //keycodes
    function control(e) {
        if(e.keyCode === 37) {
            moveLeft();
        } else if(e.keyCode === 38) {
            rotate();
        } else if(e.keyCode === 39) {
            moveRight();
        } else if(e.keyCode === 40) {
            hardDrop();
        };
    }
    document.addEventListener('keydown', control);

    //move tetromino
    function moveDown() {
        if(!current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
            undraw();
            currentPosition += width;
            draw();
        } else {
            freeze();
        }
    };

    //freeze
    function freeze() {
        current.forEach(index => squares[currentPosition + index].classList.add('taken'))
        //new tetromino
        random = nextRandoms[0]
        
        //move next ups and create new last nex up
        nextRandoms.forEach((item, index, arr) => {
            if(index === nextRandoms.length-1) {
                arr[index] = Math.floor(Math.random()*theTetrominoes.length);
            } else {
                arr[index] = arr[index+1]
            }
        });

        current = theTetrominoes[random][currentRotaion];
        currentPosition = 4;

        draw();
        displayShapes();
        addDropScore(10);
        addLineScore();
        gameOver();
    }
    
    //move left
    function moveLeft() {
        undraw();
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0);

        if(!isAtLeftEdge) currentPosition -= 1;

        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition += 1;
        };

        draw();
    };

    //move right
    function moveRight() {
        undraw();
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width-1);

        if(!isAtRightEdge) currentPosition += 1;

        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition -= 1;
        };

        draw();
    };

    //rotate
    function rotate() {
        undraw();

        currentRotaion ++;
        if(currentRotaion === current.length) currentRotaion = 0;

        current = theTetrominoes[random][currentRotaion];

        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0);
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width-1);

        if(isAtLeftEdge && isAtRightEdge) {
            currentRotaion --;
            if(currentRotaion === -1) currentRotaion = current.length-1;
            current = theTetrominoes[random][currentRotaion];
        };
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentRotaion --;
            if(currentRotaion === -1) currentRotaion = current.length-1;
            current = theTetrominoes[random][currentRotaion];
        };

        draw();
    }

    //soft drop
    function softDrop() {
        setTimeout(moveDown, 100)
    }

    //hard drop
    function hardDrop() {
        undraw();
        while(!current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
            moveDown();
        }
        freeze();

        draw();
        
    }

    //show up next

    const displaySquares = document.querySelectorAll('.mini_grid div');
    const displayWidth = 4;
    let displayIndex = 0;
 


    //next up tetrominos
    const upNextTetrominoes = [
        [displayWidth,displayWidth+1,displayWidth+2,displayWidth+3], //iTetromino
        [0,displayWidth,displayWidth+1,displayWidth+2], //jTetromino
        [2,displayWidth,displayWidth+1,displayWidth+2], //lTetromino
        [0,1,displayWidth,displayWidth+1], //oTetromino
        [1,2,displayWidth,displayWidth+1], //sTetromino
        [1,displayWidth,displayWidth+1,displayWidth+2], //tTetromino
        [0,1,displayWidth+1,displayWidth+2] //zTetromino
    ];

    //display next up
    function displayShapes() {
        displaySquares.forEach(square => {
            square.classList.remove('tetromino');
        });
        nextRandoms.forEach((item, index) => {
            displayIndex = index*16;

            upNextTetrominoes[nextRandoms[index]].forEach(index => {
                displaySquares[displayIndex + index].classList.add('tetromino');
            })
        })


    }
    displayShapes();

    //button stuff
    startBtn.addEventListener('click', () => {
        if (timerId) {
            clearInterval(timerId);
            timerId = null;
        } else {
            draw();
            timerId = setInterval(moveDown, 400);
            //nextRandoms.forEach((item, index, arr) => arr[index] = Math.floor(Math.random()*theTetrominoes.length));
        }
    })

    //add score
    function  addLineScore() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino');
        });
        for (let i = 0; i < 199; i+=width) {
            const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9];

            if(row.every(index => squares[index].classList.contains('taken'))) {
                score +=100;
                scoreDisplay.innerHTML = score;
                row.forEach(index => {
                    squares[index].classList.remove('taken');
                    squares[index].classList.remove('tetromino');
                })
                const squaresRemoved = squares.splice(i, width);
                squares = squaresRemoved.concat(squares);
                squares.forEach(cell => grid.appendChild(cell));
            }
        }
    }

    function addDropScore(amount) {
        score +=amount;
        scoreDisplay.innerHTML = score;
    }

    //game over
    function gameOver() {
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            gameStatus.innerHTML = 'Game Over';
            clearInterval(timerId);
        }
    }




    




})