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

// attempt to register new user, old bad
async function register() {
    // get user input from html fields
    let name = document.getElementById("name").value;
    let login_key = document.getElementById("login-key").value;

    // if a field is missing, error
    if (!name || !login_key) {
        loginFeedback("All fields are required");
        return;
    }
    
    // if someone already has that loginkey, error cryptically
    let snapshot = await fetchLatestData();
    if (snapshot[login_key]) {
        loginFeedback(randItem(wild_goose_chase));
        return;
    }

    // if successful, create new user with server
    await updateUserData(login_key, 'name', name);
    await updateUserData(login_key, 'balance', 1000);

    // send user home
    inputFeedback("Thanks, "+name+". Rerouting to home...", type='success');
    setTimeout(document.location.href = "./index.html", 2000);
}

window.register = register;


// better register, using p3
async function newRegister() {
    // get user input from html fields
    let name = document.getElementById("name").value;
    let login_key = document.getElementById("login-key").value;

    // if a field is missing, error
    if (!name || !login_key) {
        loginFeedback("All fields are required");
        return;
    }

    
}