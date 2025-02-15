let snd_delete = new Audio("delete.wav");
snd_delete.volume = 0.5;
let snd_money = new Audio("egg.wav");
snd_money.volume = 0.5;
let snd_error = new Audio("error.wav");
snd_error.volume = 0.5;
let snd_conf = new Audio("confirm.wav");
snd_conf.volume = 0.5;

async function deletesnd() {
    snd_delete.load();
    snd_delete.play();
    console.log = toString(document.getElementById('admin-delete-password').value)
}

async function moneysnd() {
    snd_money.load();
    snd_money.play();
}

async function admin_setBalance(login_key, amount) {
    if (login_key && amount) {
        await inputFeedback("Balance updated!", input="login", type="success")
        snd_conf.load();
        snd_conf.play();
        await updateBalance(login_key, amount);
    }
    if (!login_key || !amount) {
        snd_error.load();
        snd_error.play(); 
        await inputFeedback("You must enter both fields!", input="login", type="error")
    }
}

async function admin_fixbalance(login_key) {
    if (login_key) {
        await inputFeedback("Balance reset!", input="login", type="success")
        snd_conf.load();
        snd_conf.play();
        await updateBalance(login_key, Number(1000));
    }
    if (!login_key || !modify_data) {
        snd_error.load();
        snd_error.play(); 
        await inputFeedback("You must enter a password!", input="login", type="error")
    }
}

async function updateInfo(login_key) {
    let snapshot = await fetchLatestData();
    if (!snapshot) {
        inputFeedback("An issue has occured out of your control");
        return;
    }
    let modify_data = snapshot[login_key];
    if (!modify_data) {
        inputFeedback("User does not exist");
        return;
    }
    document.getElementById("modify-user").innerText = modify_data.name+", $"+modify_data.balance;
};

setInterval(() => {
    updateInfo(document.getElementById('modify-pass').value)
}, 1000); // Runs every 1 second