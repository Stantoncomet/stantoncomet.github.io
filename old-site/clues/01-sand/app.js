

document.addEventListener('DOMContentLoaded', () => {
    let grid = document.getElementById('grid');

    for (let i = 0; i < 64; i++) {
        grid.appendChild(document.createElement('div'));
    }
    squares = Array.from(document.querySelectorAll('#grid div'));

    squares.forEach(item => item.classList.add('unactive'));

    function toggle() {
        if (this.classList.contains('unactive')) {
            this.classList.remove('unactive');
            this.classList.add('active');
        } else {
            this.classList.remove('active');
            this.classList.add('unactive');
        }
    }

    squares.forEach(item => item.addEventListener('mouseup', toggle));





})
let squares; //what
function convert() {
    let csquares = "";
    let acsquares = [];
    squares.forEach(item => {
        if (item.classList.contains('unactive'))
            csquares += "0,";
        else
            csquares += "1,";
    })
    //csquares = csquares.slice(0, -1);
    document.getElementById('piece').innerHTML = "["+csquares.slice(0, 15)+"],";
    document.getElementById('piece').innerHTML += "<br>["+csquares.slice(16, 31)+"],";
    document.getElementById('piece').innerHTML += "<br>["+csquares.slice(32, 47)+"],";
    document.getElementById('piece').innerHTML += "<br>["+csquares.slice(48, 63)+"],";
    document.getElementById('piece').innerHTML += "<br>["+csquares.slice(64, 79)+"],";
    document.getElementById('piece').innerHTML += "<br>["+csquares.slice(80, 95)+"],";
    document.getElementById('piece').innerHTML += "<br>["+csquares.slice(96, 111)+"],";
    document.getElementById('piece').innerHTML += "<br>["+csquares.slice(112, 127)+"]";
    console.log(acsquares);
}
