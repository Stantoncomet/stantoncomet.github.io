

document.addEventListener('DOMContentLoaded', e => {
    // testing
    let plan1 = new Plan(calday, "DNDaaaaaaaaaaaaaaaddddddddd", "@ common house", "olive");
    let plan2 = new Plan(calday, "dude wtf");
    let plan3 = new Plan(calday, "dude wtf");

    plan1.export();
    plan2.export();
    plan3.export();
})





function access() {
    let login_ele = document.getElementById('login');
    login_ele.style.visibility = 'visible';
}

function close_login() {
    let login_ele = document.getElementById('login');
    login_ele.style.visibility = 'hidden';

    document.getElementById('keycode').innerText = '----';
}

function keypad(key) {
    let keycode_ele = document.getElementById('keycode');

    if (key >= 0 && key <= 9) {
        keycode_ele.innerText = keycode_ele.innerText.replace('-', String(key));
    } else {
        switch (key) {
            // Backspace
            case 900: {
                keycode_ele.innerText = keycode_ele.innerText.replace(/(\d)(?!.*\d)/gm, '-');
                break;
            }
            default: {
                break;
            }
        }
    }
}

function keycode_login() {
    let keycode_ele = document.getElementById('keycode');
    let input = keycode_ele.innerText;
    if (isNaN(input)) return;

    
    console.log(input);
}


async function attemptAutoLogin() {
    let current_login = getCurrentLogin();
    if (current_login) {
        login(current_login);
    }
}


window.onload = () => {
    attemptAutoLogin();
}