let wild_goose_chase = [
    "Server tried to barrel roll... but it failed!",
    "Shhhhh, the server is sleeping!",
    "Server is out on lunch break!",
    "[Gone fishing] -Server",
    "Maybe try shaking things up a bit...",
    "The server does NOT approve of those credentials!",
    "Quack quack",
    "Honk honk"

]

async function register() {
    let name = document.getElementById("name").value;
    let login_key = document.getElementById("login-key").value;

    if (!name || !login_key) {
        loginFeedback("All fields are required");
        return;
    }
    
    let snapshot = await fetchLatestData();
    if (snapshot[login_key]) {
        loginFeedback(randItem(wild_goose_chase));
        return;
    }

    await updateUserData(login_key, 'name', name);
    await updateUserData(login_key, 'balance', 1000);

    inputFeedback("Thanks, "+name+". Rerouting to home...", type='success');

    setTimeout(document.location.href = "./index.html", 2000);
}

window.register = register;