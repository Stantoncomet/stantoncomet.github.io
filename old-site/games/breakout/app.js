document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById("breakout");
    const ctx = canvas.getContext("2d");
    const height = canvas.height;
    const width = canvas.width;




    function clear() {
        
    }

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }



    class Bubble {
        constructor(x, y, r) {
            this.x = x;
            this.y = y;
            this.radius = r;

            
        }
        update() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            ctx.fillStyle = "blue";
            ctx.fill();
            ctx.closePath();
        };
        move() {
            this.x += getRandomArbitrary(-10, 10);
            this.y += getRandomArbitrary(-10, 10);
            this.update();
        };
    }

    let bluebubbles = [];

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j <5; j++) {
            bluebubbles[i] = new Bubble(i*30+30,j*30+30,10);
            bluebubbles[i].update();
        }
    }

    
    clear();

    ctx.fillStyle = "#00FFFF";
    player = new Bubble(0,0,10);
    player.update();

    function move(e) {
        if(e.keyCode==87) {
            player.y--;
            player.update();
        } else if(e.keyCode==83) {
            player.y++;
            player.update();
        } else if(e.keyCode==65) {
            player.x--;
            player.update();
        } else if(e.keyCode==68) {
            player.x++;
            player.update();
        }
    }
    document.addEventListener("keydown", move);






})