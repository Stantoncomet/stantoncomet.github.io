let current_login;


async function login() {
    current_login = document.getElementById("login-key").value;
    document.getElementById("login-key").value = "";
    if (!current_login) {
        loginFeedback("Please enter a login key");
        return;
    }

    let snapshot = await getLatestData();
    if (!snapshot) {
        loginFeedback("An issue has occured out of your control");
        return;
    }
    let user_data = snapshot[current_login];
    if (!user_data) {
        loginFeedback("User does not exist");
        return;
    }

    loginFeedback("Welcome "+user_data.name, type='success');
    document.getElementById("user").innerText = user_data.name+", $"+user_data.balance;

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



window.login = login; // Export login() globally

window.onload = () => {
    updateHighScores();
}