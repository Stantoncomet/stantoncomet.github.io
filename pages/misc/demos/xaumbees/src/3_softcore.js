/**
 * priority 4
 * like still part of the engine? but not the fun game stuff yet
 */

Stuff = [
    new Thing('tree', 50, 0, 60, 60, 'tree.png'),
    // new Thing('rock', 220,130,20,20,'rock.png'),
    // new Thing('tree2', -880,0,20,20,'tree2.png'),
    // new Thing('grape_bush', 100,10,45,45,'grape_bush.png'),
]


function drawStuff(debug=false) {
    Stuff.forEach(thing => {
        thing.draw(debug);
    })
}

// UUID for controlling player
let pid = crypto.randomUUID();
// show it
document.getElementById('uuid').innerHTML = `<u><b>${pid.slice(0,7)}</b></u>${pid.slice(8,pid.length)}`;

let Player = new ControllablePlayer(0, 0, 30, 30);