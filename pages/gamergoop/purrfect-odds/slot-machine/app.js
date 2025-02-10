let symbols = [
    "purrfect",
    "eye",
    "toilet",
    "minecraft",
    "threetwos",
    "apple"
]

let smalls = [0, 100, 400, 1_700, 11_500, 150_000]

let slot_worth = {
    "purrfect": [ 400, 1_700, 11_000, 120_000, 2_050_000, 86_969_420],
    "eye": [ 150, 450, 2_000, 6_000, 9, 300_000],
    "toilet": smalls,
    "minecraft": smalls,
    "threetwos": smalls,
    "apple": smalls
}

let slots = [ "what", "what", "what", "what", "what", "what" ];

async function spin() {
    let current_login = getCurrentLogin();
    if (!current_login) {
        inputFeedback("You must be logged in to gamble!", input="spin");
        return;
    }
    let snapshot = await fetchLatestData();
    let current_balance = snapshot[current_login].balance;
    if (current_balance < 300) {
        inputFeedback("You can't affort to play this one!", input="spin");
        return;
    }

    slots.forEach((e, i, arr) => {
        // random number 0-23
        let rand_num = Math.floor(Math.random()*25);

        if (rand_num == 0) {
            arr[i] = symbols[0];
        } else if (rand_num >= 1 && rand_num <= 2) {
            arr[i] = symbols[1];
        } else if (rand_num >= 3 && rand_num <= 7) {
            arr[i] = symbols[2];
        } else if (rand_num >= 8 && rand_num <= 13) {
            arr[i] = symbols[3];
        } else if (rand_num >= 14 && rand_num <= 19) {
            arr[i] = symbols[4];
        } else if (rand_num >= 20 && rand_num <= 25) {
            arr[i] = symbols[5];
        }
    })

    // After spin, load textures
    slots.forEach((e, i) => {
        let slot_ele = document.getElementById(`slot-${i}`);
        slot_ele.src = `assets/${e}.png`
    })



    //slots = [ "eye", "eye", "eye", "eye", "eye", "apple" ];

    let last_e = "what";
    let row_count = 0;
    let total_win = 0;

    slots.forEach((e, i) => {
        if (e == last_e) {
            row_count += 1;
            if (i == 5) { // if the last slot is the same as everything else
                total_win += slot_worth[last_e][row_count];
            }
        } else if (row_count > 0) {
            total_win += slot_worth[last_e][row_count];
            row_count = 0;
        } else {
            // if last_e != e, and there is no row count
            if (last_e != "what") {
                total_win += slot_worth[last_e][0];
            }
            
            if (i == 5) {
                total_win += slot_worth[e][0];
            }
        }

        console.log("Slot worth of "+i+": "+slot_worth[e][row_count]);
        last_e = e;
    })

    console.log("Total win: "+total_win);
    console.log("Slots: "+slots);

    let reward = document.getElementById('sstatus');
    reward.innerText = `+Ⓟ${total_win}`

    await incrementBalance(current_login, total_win-300); //-300 for the cost

}

// window.onload = () => {
//     let slot_eles = document.querySelectorAll('.slot');
//     slot_eles.forEach(e => {
//         e.src = './assets/minecraft.png';
//     })
// }
