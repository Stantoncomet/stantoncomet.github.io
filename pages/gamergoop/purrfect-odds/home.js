


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
    let snapshot = await fetchLatestData();
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
    document.getElementById("user").innerText = user_data.name+", Ⓟ"+user_data.balance;
    inputFeedback("Welcome "+user_data.name, input="login", type="success");

    console.log(user_data);
}

async function updateHighScores() {
    let snapshot = await fetchLatestData();

    let highs = document.getElementById("highscores").querySelectorAll('p');
    let highArray = []
    highs.forEach((h, i) => {
        let user = snapshot[Object.keys(snapshot)[i]]
        if (user == undefined) return;
        highArray.push([user.name, user.balance])
    })
    highArray.sort((a, b) => b[1] - a[1]);
    highs.forEach((h, i) => {
        h.innerText = highArray[i][0]+" --- Ⓟ"+highArray[i][1];
    })
}

async function upMoneyRandom() {
    let snapshot = await fetchLatestData();
    let current_login = getCurrentLogin();
    let user_data = snapshot[current_login];
    await updateUserData(current_login, 'balance', user_data.balance+(Math.floor(Math.random() * (20 - -10 + 1)) + -10));
    updateHighScores();
}

async function attemptAutoLogin() {
    let current_login = getCurrentLogin();
    if (current_login) {
        login(current_login);
    }
}


window.login = login; // Export login() globally

window.onload = () => {
    updateHighScores();
    attemptAutoLogin();
}