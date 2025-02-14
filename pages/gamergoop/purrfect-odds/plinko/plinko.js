let bet = document.getElementById('betting-amount');
    const space = 50
    function pegGen(n) {
        for (let a = 1; a <= n; a++) {
            let amt = a + 2
            for (let b = 0; b < amt; b++) {
                let peg = Bodies.circle(render.canvas.width / 2 - (space / 2 * (amt - 1)) + space * b , render.canvas.height / 2 - (Math.sqrt(3) * space / 4) * n + (Math.sqrt(3) * space / 2) * a, 6, { isStatic: true, label: 'peg'});
                Composite.add(engine.world, [peg])
            }  
            for (let i = 0; i < amt + 1; i++) {
                let bin = Bodies.rectangle(render.canvas.width / 2 - (space / 2 * (n+2)) + space * i, render.canvas.height / 2 - (Math.sqrt(3) * space / 4) * n + (Math.sqrt(3) * space / 2) * (n + 1.5), 40, 25, { isStatic: true, label: 'bin', multiplier: .0005 * (0 - (n + 2) / 2 + i)**6 - .027 * (0 - (n + 2) / 2 + i)**4 + .5 * (0 - (n + 2) / 2 + i)**2})
                Composite.add(engine.world, [bin])
            } 
            
        }     

    }

    const renderSize = .7 * window.innerWidth;
    console.log(renderSize)
    // module aliases
    var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Events = Matter.Events;
    

    // create an engine
    var engine = Engine.create();

    // create a renderer
    var render = Render.create({
        element: document.getElementById('renderer'),
        engine: engine
    });

    engine.gravity.scale = .0005
    
    MouseConstraint = Matter.MouseConstraint.create(engine)

    var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true, label: 'ground' });

    pegGen(5)

    // add all of the bodies to the world
    Composite.add(engine.world, [ground]);

    // run the renderer
    Render.run(render);

    // create runner
    var runner = Runner.create();

    // run the engine
    Runner.run(runner, engine);

async function spawn() {
    let current_login = getCurrentLogin();
    if (!current_login) {
        inputFeedback("You must be logged in to gamble!", input="flip");
        return;
    }
    if (!bet.value) {
        inputFeedback("Please choose a betting amount!", input="flip");
        return;
    }
    if (isNaN(bet.value) || (bet.value*10)%10 != 0) {
        inputFeedback("You can only bet in whole numbers!", input="flip");
        return;
    }
    let snapshot = await fetchLatestData();
    let current_balance = snapshot[current_login].balance;
    if (current_balance < Math.abs(bet.value)) {
        inputFeedback("You can't affort to bet!", input="flip");
        return;
    }

    let ball = Bodies.circle(render.canvas.width / 2 - 15 + Math.random() * 30, -100, 10, { restitution: .4, label: 'ball', friction: .05 });
    Composite.add(engine.world, [ball]);
}

function mult() {
    incimentBalance(current_login, Number(global.bet.value));
}

function bodyID(a, b) {
    Composite.remove(engine.world, a);
    console.log(b.multiplier)
}

Events.on(engine, 'collisionStart', event => {
    event.pairs.forEach(pair => {
        const { bodyA, bodyB } = pair;
        console.log(pair)
        if (!((bodyA.label == 'ball' && bodyB.label == 'peg') || (bodyA.label == 'peg' && bodyB.label == 'ball'))) {
            if (bodyA.label == 'ball') {
                bodyID(bodyA, bodyB)
            } else {
                bodyID(bodyB, bodyA)
            }
            
            mult();
        }
    });
});

Events.on(MouseConstraint, "mousedown", e => {
    console.log(engine.world)
})

