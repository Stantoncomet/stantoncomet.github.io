let snd_delete = new Audio("delete.wav");
snd_delete.volume = 0.5;
let snd_money = new Audio("egg.wav");
snd_money.volume = 0.5;
let snd_error = new Audio("error.wav");
snd_error.volume = 0.5;

async function deletesnd() {
    snd_delete.load();
    snd_delete.play();
    console.log = toString(document.getElementById('admin-delete-password').value)
}

async function moneysnd() {
    snd_money.load();
    snd_money.play();
}

let passmin = "c0mjny82k1dj03d7"

async function deleteUserData(login_key) {
    
    let success = await fetch('https://stantoncomet.gleeze.com:5000/odds_user_data', {
        mode: "cors",
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            login_key: login_key,
        })
    })
        .then(response => response.json())
        .catch(err => console.log(err))
    return success;
}

async function admin_setBalance(login_key, amount) {
    if (login_key && amount && (document.getElementById('admin-password').value === passmin)) {
        await inputFeedback("Balance updated!", input="login", type="success")
        snd_money.load();
        snd_money.play();
        await updateUserData(login_key, "balance", amount);
    }
    if (!login_key || !amount) {
        snd_error.load();
        snd_error.play(); 
        await inputFeedback("You must enter both fields!", input="login", type="error")
    }

    if (!(document.getElementById('admin-password').value === passmin)) {
        snd_error.load();
        snd_error.play(); 
        await inputFeedback("The admin password is incorrect!", input="login", type="error")
    }
}