/**
 * priority 2
 * draw functions and key stuff and yaknow that everything else uses
 */

// Keyboard functions

var DOWN_KEYS = [];

document.addEventListener('keydown', e => {
    if (DOWN_KEYS.includes(e.key)) return;
    DOWN_KEYS.push(e.key);
})
document.addEventListener('keyup', e => {
    DOWN_KEYS = DOWN_KEYS.filter(k => k != e.key);
})

function getDownKeys() {
    return DOWN_KEYS;
}

function keyIsPressed(key) {
    if (DOWN_KEYS.includes(key)) return true;
    else return false;
}



// Drawing functions

function background(color) {
    ctx.fillStyle = color;
    ctx.fillRect(0,0,WIDTH,HEIGHT);
}

function rectangle(x,y,w,h,c='#123b04') {
    ctx.strokeStyle = c;
    ctx.strokeRect(x, y, w, h);
}

function drawImage(x,y,w,h,texture) {
    let img = new Image(w, h);
    img.src = texture;
    ctx.drawImage(img, x, y, w, h);
}
