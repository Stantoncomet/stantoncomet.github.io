


async function processLogin() {
    let current_login;
    current_login = document.getElementById("login-key").value;
    document.getElementById("login-key").value = "";
    if (!current_login) {
        inputFeedback("Please enter a login key");
        return;
    }
    login(current_login)
}

async function login(login_key) {
    let snapshot = await getLatestData();
    if (!snapshot) {
        inputFeedback("An issue has occured out of your control");
        return;
    }
    let user_data = snapshot[login_key];
    if (!user_data) {
        inputFeedback("User does not exist");
        return;
    }

    localStorage.setItem("current_login", login_key);
    document.getElementById("user").innerText = user_data.name+", $"+user_data.balance;
    inputFeedback("Welcome "+user_data.name, input="login", type="success");

    console.log(user_data);
}


async function updateHighScores() {
    let snapshot = await getLatestData();

    let highs = document.getElementById("highscores").querySelectorAll('p');

    highs.forEach((h, i) => {
        let user = snapshot[Object.keys(snapshot)[i]]
        if (user == undefined) return;
        h.innerText = user.name+" ----> $"+user.balance;
    })
}

async function upMoney() {
    let snapshot = await getLatestData();
    let user_data = snapshot[current_login];
    await updateUserData(current_login, 'balance', user_data.balance+1);
    updateHighScores();
}

async function attemptAutoLogin() {
    let current_login = localStorage.getItem("current_login");
    if (current_login) {
        login(current_login);
    }
}


window.login = login; // Export login() globally

window.onload = () => {
    updateHighScores();
    attemptAutoLogin();
}