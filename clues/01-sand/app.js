document.addEventListener('DOMContentLoaded', () => {
    let grid = document.getElementById('grid');

    for (let i = 0; i < 64; i++) {
        grid.appendChild(document.createElement('div'));
    }
    let squares = Array.from(document.querySelectorAll('#grid div'));

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