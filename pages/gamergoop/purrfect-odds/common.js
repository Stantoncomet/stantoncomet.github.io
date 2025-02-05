async function getLatestData() {

    let data = await fetch('https://150.230.38.229:5000/odds_user_data')
        .then(response => response.json())
        .catch(err => {console.log(err); return 0})
    return data;
}
async function updateUserData(login_key, resource, value) {
    let success = await fetch('https://150.230.38.229:5000/odds_user_data', {
        mode: "cors",
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            login_key: login_key,
            resource: resource,
            value: value
        })
    })
        .then(response => response.json())
        .catch(err => {console.log(err); return 0})
    return success;
}


function loginFeedback(message, type="error") {
    let feedback = document.getElementById('login-feedback');
    feedback.innerText = message;
    feedback.style.animationName = "flash-"+type;

    feedback.onanimationend = () => { feedback.style.animationName = ""; };
}

