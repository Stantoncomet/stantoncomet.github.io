const VALID_CHARS = "abcdefghijklmnopqrstuvwxyz";

document.addEventListener('keydown', e => {
    let lines = Array.from(document.querySelectorAll('line'));
    let current_line = document.getElementById('nowg');
    let line_index = lines.indexOf(current_line);

    let line_letters = Array.from(current_line.querySelectorAll('p'));
    let current_letter = document.getElementById('nowl');
    let letter_index = line_letters.indexOf(current_letter);


    if (VALID_CHARS.includes(e.key.toLowerCase())) {
        current_letter.innerText = e.key.toUpperCase();

        current_letter.id = '';
        line_letters[letter_index+1].id = 'nowl';
    } else if (e.key == 'Backspace') {
        current_letter.innerText = '';
        current_letter.id = '';
        line_letters[letter_index-1].id = 'nowl';
    }

    
})