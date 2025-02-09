
    const space = 50
    function pegGen(n) {
        for (let a = 1; a <= n; a++) {
            let amt = a + 2
            for (let b = 0; b < amt; b++) {
                let peg = Bodies.circle(render.canvas.width / 2 - space - (space / 2 * (a - 1)) + space * b , render.canvas.height / 2 - (Math.sqrt(3) * space / 4) * n + (Math.sqrt(3) * space / 2) * a, 6, { isStatic: true });
                Composite.add(engine.world, [peg])
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
    Composite = Matter.Composite;

    // create an engine
    var engine = Engine.create();

    // create a renderer
    var render = Render.create({
        element: document.getElementById('renderer'),
        engine: engine
    });

    // create two boxes and a ground
    var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

    pegGen(10)

    // add all of the bodies to the world
    Composite.add(engine.world, [ground]);

    // run the renderer
    Render.run(render);

    // create runner
    var runner = Runner.create();

    // run the engine
    Runner.run(runner, engine);


function spawn() {
    let ball = Bodies.circle(render.canvas.width/2, -100, 10);
    Composite.add(engine.world, [ball]);
}
