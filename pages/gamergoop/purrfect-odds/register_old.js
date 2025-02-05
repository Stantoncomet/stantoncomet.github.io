import {db, players_ref} from './firebase_init.js';
import { ref, set, onValue } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js';

function register() {
    let cname = document.getElementById("name").value;
    let login_key = document.getElementById("login-key").value;

    console.log(name)
    console.log(login_key)

    if (!cname || !login_key) {
        console.log("missing input");
        return;
    }
    
    let udata;
    onValue(players_ref, snapshot => {
        udata = snapshot.val();
    })
    if (udata[login_key]) {
        console.log("user already exists");
        return;
    }

    let new_player_ref = ref(db, `players/${login_key}`);
    set(new_player_ref, {
        name: `${cname}`,
        money: 0
    })

    document.location.href = "./index.html";
}

window.register = register;