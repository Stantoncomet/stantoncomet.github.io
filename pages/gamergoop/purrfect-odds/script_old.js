var current_login = "";
var login_data = {};
var udata;


onValue(players_ref, snapshot => {
    udata = snapshot.val();
})


// set(players_ref, {
//     userone: { name: "Userone", money: 0 }
// });

function upMoney() {
    if (current_login == "") {
        console.log("not logged in");
        return
    }
    let curr_player_ref = ref(db, `players/${current_login}/money`);
    let money = udata+1;
    set(curr_player_ref, money);
}

function updateHighScores() {
    onValue(players_ref, snapshot => {
        let udata = snapshot.val();
        let highs = document.getElementById("highscores").querySelectorAll('p');
        let top_logins = {};

        for (let login in udata) {
            top_logins[login] = udata[login];
        }

        console.log(top_logins);
    
        highs.forEach((h, i) => {
            let login = top_logins[Object.keys(top_logins)[i]]
            if (login == undefined) return;
            h.innerText = "$"+login.money+" - - "+login.name;
        })
    })
}


function login() {
    current_login = document.getElementById("login-key").value;
    document.getElementById("login-key").value = "";

    onValue(players_ref, snapshot => {
        login_data = snapshot.val()[current_login];
        if (!login_data) {
            console.log("user does not exist");
            return;
        }

        console.log("Welcome user, "+current_login);
        document.getElementById("user").innerText = login_data.name+", $"+login_data.money;
    })
}
window.login = login; // Export login() globally
window.upMoney = upMoney;

function save() {

}



document.addEventListener('DOMContentLoaded', e => {
    updateHighScores();
})