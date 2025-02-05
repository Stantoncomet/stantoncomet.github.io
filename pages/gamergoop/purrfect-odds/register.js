

async function register() {
    let name = document.getElementById("name").value;
    let login_key = document.getElementById("login-key").value;

    if (!name || !login_key) {
        loginFeedback("All fields are required");
        return;
    }
    
    let snapshot = getLatestData();
    if (snapshot[login_key]) {
        loginFeedback("User already exists ...ssssshh!");
        return;
    }

    await updateUserData(login_key, 'name', name);
    await updateUserData(login_key, 'balance', 1000);

    loginFeedback("Thanks, "+name+". Rerouting to home...", type='success');

    setTimeout(document.location.href = "./index.html", 2000);
}

window.register = register;