document.addEventListener('DOMContentLoaded', () => {
    let squares = Array.from(document.querySelectorAll('.grid div'));
    let drag = false;
    const width = 50;
    const keyOffset = 10+width*3;

    let keys = [
        [0,2,4,width*2+2,width*4+2,width*6+2,width*8,width*8+2,width*8+4],
        [0,4,width*2,width*2+4,width*4,width*4+4,width*6+2,width*8+2]
    ]


    function loadKey(key, keyPos) {
        keys[key].forEach(item => {
            squares[keyPos + item].classList.add('key');
            squares[keyPos + 1 + item].classList.add('key');
            squares[keyPos + width + item].classList.add('key');
            squares[keyPos + width+1 + item].classList.add('key');
        });
    };

    squares.forEach(item => item.classList.add('unactive'));

    function activate(index) {
        squares[index].classList.add('active');
    }

    function mouse_control() {
        if(drag === true) {
            this.classList.remove('unactive')
            if(this.classList.contains('key')) {
                this.classList.add('active-key')
            } else {
                this.classList.add('active');
            }

        }
    }

    squares.forEach(item => item.addEventListener('mousemove', mouse_control));
    document.addEventListener('mousedown', () => drag = true);
    document.addEventListener('mouseup', () => drag = false);

    loadKey(1, keyOffset);
    loadKey(0, keyOffset+8);
    loadKey(0, keyOffset+16);
    loadKey(0, keyOffset+24);

    //document.addEventListener("")













})