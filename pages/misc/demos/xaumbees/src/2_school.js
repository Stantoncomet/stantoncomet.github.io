/**
 * priority 3
 * initializes class
 * lots of rendering stuff in here
 */


/**
 * basic building block ig
 */
class Thing {
    constructor(name,x,y,w,h,texture='defualt.png') {
        this.name=name;
        this.x=x;
        this.y=y;
        this.w=w;
        this.h=h;
        this.uuid = '';
        this.texture='assets/'+texture;
    }

    getN() {
        return this.y;
    }
    getE() {
        return this.x+this.w;
    }
    getS() {
        return this.y+this.h;
    }
    getW() {
        return this.x;
    }

    getCenter() {
        return {
            x: this.x+this.w/2,
            y: this.y+this.h/2
        }
    }

    draw(debug=false) {
        drawImage(this.x+Player.x, this.y+Player.y, this.w, this.h, this.texture);
        if (debug) {
            ctx.font = "10px Arial";
            rectangle(this.x+Player.x, this.y+Player.y, this.w, this.h, '#e5ff00ff');
            ctx.strokeText(`(${this.x}, ${this.y})`,this.x+Player.x,this.y+Player.y)
        }
        if (uuid) {
            ctx.font = "10px Arial";
            ctx.strokeText(this.uuid.slice(0,8),this.x+Player.x,this.y+Player.y)
        }
    }

    dust() {
        let xo = Math.random()*10;
        let yo = Math.random()*10;
        let duration = Math.floor(Math.random()*100);

        let color = [
            parseInt(this.uuid.slice(0,2), 16),
            parseInt(this.uuid.slice(2,4), 16),
            parseInt(this.uuid.slice(4,6), 16)
        ]
        Particles.push(new Particle(this.x+this.w/2+xo, this.y+this.h/2+yo, duration, color));
    }
}


/**
 * Playertantan
 * only one of these per game probably
 */
class ControllablePlayer extends Thing {
    constructor(x, y, w, h) {
        super('controllable_player', x, y, w, h, 'player.png');

        this.vel_x = 0;
        this.vel_y = 0;
        this.accel = 0.8;
        this.max_vel = 8;

        this.dis_x = (WIDTH/2)-w/2;
        this.dis_y = (HEIGHT/2)-h/2;

        this.uuid = pid;
    }

    worldPos() {
        return {
            x: -this.x+this.dis_x,
            y: -this.y+this.dis_y
        }
    }

    draw(debug=false) {
        drawImage(this.dis_x, this.dis_y, this.w, this.h, this.texture);
        
        if (debug) {
            rectangle(this.dis_x, this.dis_y, this.w, this.h);
            ctx.strokeText(`(${this.x.toFixed(2)}, ${this.y.toFixed(2)})`,this.dis_x,this.dis_y)
            //ctx.strokeText(`(${this.worldPos().x.toFixed(2)}, ${this.worldPos().y.toFixed(2)})`,this.dis_x,this.dis_y)
        }  
    }

    whatAmITouching() {
        let thing_i_am_touching = new Thing('nothing', undefined, undefined, undefined, undefined);
        //bad becasue it checks every Thing in the world, even if its nowhere near player
        Stuff.forEach(thing => {
            // COLLISIONS
            if ( this.getE() > thing.getW() &&
                 this.getW() < thing.getE() &&
                 this.getS() > thing.getN() &&
                 this.getN() < thing.getS()
            ) {         
                thing_i_am_touching = thing;
                return;
            }
        })

        return thing_i_am_touching;
    }
}



let _Player = {
    size: 30,
    x: 0,
    y: 0,
    dis_x: (WIDTH/2)-30/2,
    dis_y: (HEIGHT/2)-30/2,
    worldPos: function() {
        return {
            x: -this.x+this.dis_x,
            y: -this.y+this.dis_y
        }
    },

    texture: 'assets/player.png',
    draw: function(debug=false) {
        drawImage(this.dis_x, this.dis_y, this.size, this.size, this.texture);
        
        if (debug) {
            rectangle(this.dis_x, this.dis_y, this.size, this.size);
            ctx.strokeText(`(${this.worldPos().x.toFixed(2)}, ${this.worldPos().y.toFixed(2)})`,this.dis_x,this.dis_y)
        }
    },

    dust: function() {
        let xo = Math.random()*10;
        let yo = Math.random()*10;
        let duration = Math.floor(Math.random()*100);

        let color = [
            parseInt(pid.slice(0,2), 16),
            parseInt(pid.slice(2,4), 16),
            parseInt(pid.slice(4,6), 16)
        ]
        particles.push(new Particle(this.worldPos().x+this.size/4+xo, this.worldPos().y+this.size-5+yo, duration, color));
    },

    isTouchingThing: function() {
        //bad becasue it checks every Thing in the world, even if its nowhere near player
        Stuff.forEach(thing => {
            // COLLISIONS
            if ( Dude.getE() > Box1.getW() &&
                Dude.getW() < Box1.getE() &&
                Dude.getS() > Box1.getN() &&
                Dude.getN() < Box1.getS()
            ) {
                Light1.color_a = "green";
                if ( Dude.getN() < Box1.getS() &&
                    Dude.getS() > Box1.getS()
                ) {
                    Light1.color_b = "orange";
                }
                if ( Dude.getW() < Box1.getE() &&
                    Dude.getE() > Box1.getE()
                ) {
                    Light1.color_b = "blue";
                }
                
                return true;
            }
        })
    }
}



// Other classes

class Particle {
    constructor(x,y,duration,c=[150,99,5]) {
        this.x = x;
        this.y = y;
        this.init_dur = duration;
        this.dur = duration;
        this.alpha = 0.5;
        this.c = c;
    }
    draw() {
        ctx.fillStyle = `rgba(${this.c[0]}, ${this.c[1]}, ${this.c[2]}, ${this.alpha*this.dur/this.init_dur})`
        ctx.beginPath();
        ctx.ellipse(this.x+Player.x, this.y+Player.y, 2, 2, Math.PI/4, 0, 2*Math.PI);
        ctx.fill();
    }
}