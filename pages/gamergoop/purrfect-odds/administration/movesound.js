document.addEventListener('DOMContentLoaded', function () {
    let snd_move = new Audio("move.wav");
    snd_move.volume = 0.5;

    async function movesnd() {
    snd_move.load();
    snd_move.play();
    }

    document.querySelectorAll("button").forEach(button => {
        button.addEventListener("mouseenter", movesnd);

});

document.querySelectorAll("input").forEach(input => {
    input.addEventListener("mouseenter", movesnd);

});
});