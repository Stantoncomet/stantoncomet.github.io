document.addEventListener('DOMContentLoaded', () => {

    
let canvas = document.getElementById('gamefield');
let ctx = canvas.getContext('2d');

let width = canvas.width;
let height = canvas.height;

console.log(width, height)

let fps = 60;
setInterval(loop, 1000/fps);

p1 = [10, (height-20)/4];
p2 = [10, height-(height-20)/4];
pSize = 10;


//game logic loop
function loop() {
    logic();
    draw();
}



//draw every frame
function draw() {
    //blue bckground
    ctx.fillStyle = '#08F';
    ctx.fillRect(0,0,width,height/2);
    //black bckground
    ctx.fillStyle = '#000';
    ctx.fillRect(0,height/2,width,height);
    //divider line
    ctx.fillStyle = '#333';
    ctx.fillRect(0,height/2-10,width,10);

    //draw players
    sqaure(p1[0],p1[1],pSize,'#F80');
    sqaure(p2[0],p2[1],pSize,'#0F8');

}

//game logic
function logic() {
    
}





document.addEventListener('keydown', checkKey);

function checkKey(evt) {
    //console.log(evt);
    switch (evt.key) {
        case 'r': p1[0]++; break;

        case 'ArrowUp': p1[1]--; break;
        case 'ArrowDown': p1[1]++; break;
        case 'w': p2[1]--; break;
        case 's': p2[1]++; break;
    }
}



function sqaure(x,y,w,c) {
    ctx.fillStyle = c;
    ctx.fillRect(x-(w/2),y-(w/2),w,w);
}

})

