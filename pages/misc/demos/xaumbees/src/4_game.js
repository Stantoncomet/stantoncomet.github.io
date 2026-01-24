

// const p_accel = .8;
// const p_max_vel = 8;

// let pvy = 0
// let pvx = 0;




function drawLoop() {
    background('tan')
    drawStuff(debug_mode);
    Particles.forEach(p => {
        p.draw();
    })

    Player.draw(debug_mode)

    //other players
    other_players.forEach(p => {
        p.draw();
        p.dust();
    })

    ctx.strokeRect(Player.worldPos().x, Player.worldPos().y, 10, 10);
}

function logicLoop() {
    
    // PLAYER
    if (keyIsPressed('w')) {
        Player.vel_y+=Player.accel;
        Player.dust();
    }
    if (keyIsPressed('s')) {
        Player.vel_y-=Player.accel;
        Player.dust();
    }
    if (keyIsPressed('d')) {
        Player.vel_x-=Player.accel;
        Player.texture = 'assets/player.png';
        Player.dust();
    }
    if (keyIsPressed('a')) {
        Player.vel_x+=Player.accel;
        Player.texture = 'assets/player_left.png';
        Player.dust();
    }

    // cap velocities at max_vel
    if (Player.vel_y > Player.max_vel || Player.vel_y < -Player.max_vel) Player.vel_y = Player.max_vel*Math.sign(Player.vel_y);
    if (Player.vel_x > Player.max_vel || Player.vel_x < -Player.max_vel) Player.vel_x = Player.max_vel*Math.sign(Player.vel_x);
    


    if (!DOWN_KEYS.includes('w') && !DOWN_KEYS.includes('s')) {
        // decellerate at acceleration rate
        // should actually use a PID here but oh well
        Player.vel_y -= Player.accel*Math.sign(Player.vel_y);
        // deadband to prevent jittering (tho it doesnt work sometimes /shrug)
        if (Player.vel_y < 1.6 && Player.vel_y > -1.6) Player.vel_y = 0;
    }
    if (!DOWN_KEYS.includes('d') && !DOWN_KEYS.includes('a')) {
        Player.vel_x -= Player.accel*Math.sign(Player.vel_x);
        if (Player.vel_x < 1.6 && Player.vel_x > -1.6) Player.vel_x = 0;
    }

    // move player every gameLoop tick by velocity, which is being adjusted evey tick by accleration
    Player.y+=Player.vel_y;
    Player.x+=Player.vel_x;

    

    // PARTICLES
    Particles.forEach((p, i) => {
        p.dur--;
        if (p.dur < 1)
            Particles.splice(i, 1);
    })
    //console.log(particles.length)



    //MISC

    



}


setInterval(drawLoop, 1000/60)
setInterval(logicLoop, 1000/30)