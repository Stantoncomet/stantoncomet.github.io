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
let big_slots = [];



let yeah_list = [
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0]
]


function runme() {

    for (let i = 0; i < 46656; i++) {
        let k = i.toString(6); // convert to base 6
        
        let a = k.split("");
        if (k.length < 6) {
            for (let w = 0; w < 6-k.length; w++) {
                a.unshift(0);
            }
        }

        let b = [symbols[a[0]], symbols[a[1]], symbols[a[2]], symbols[a[3]], symbols[a[4]], symbols[a[5]]];


        console.log(calculateScore(b));
    }

    console.log(yeah_list)

} 




// scoring
function calculateScore(slot_array) {
    let last_e = "what";
    let row_count = 0;
    let total_win = 0;

    slot_array.forEach((e, i) => {
        if (e == last_e) {
            row_count += 1;
            if (i == 5) { // if the last slot is the same as everything else
                total_win += slot_worth[last_e][row_count];
                yeah_list[symbols.indexOf(last_e)][row_count] += 1;
            }
        } else if (row_count > 0) {
            total_win += slot_worth[last_e][row_count];
            yeah_list[symbols.indexOf(last_e)][row_count] += 1;
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

        //console.log("Slot worth of "+i+": "+slot_worth[e][row_count]);
        last_e = e;
    })
    return total_win;
}

window.runme = runme;