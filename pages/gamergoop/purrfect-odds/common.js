/***************************************************************************************************************/
/**
 * This common.js file is shared between subsites in purrfect odds. It should be the first script loaded on a site. 
 * This top part is for accounts and data stuff.
 */
/***************************************************************************************************************/


/**
 * Fetches the latest user data from database server
 * @returns All user data in JSON format
 */
async function fetchLatestData() {

    let data = await fetch('https://stantoncomet.gleeze.com:5000/odds_user_data')
        .then(response => response.json())
        .catch(err => {console.log(err); return 0})
    return data;
}
/**
 * Set the data of one resource of a user. Will probably just create a new resource if it doesn't exist
 * @param {String} login_key 
 * @param {String} resource 
 * @param {String | Number} value 
 * @returns Success or fail
 */
async function updateUserData(login_key, resource, value) {
    let success = await fetch('https://stantoncomet.gleeze.com:5000/odds_user_data', {
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

function getCurrentLogin() {
    return localStorage.getItem("current_login");
}

/**
 * 
 * @param {String} login_key 
 * @param {number} amount Use negative value to decrease
 */
async function incimentBalance(login_key, amount) {
    let snapshot = await fetchLatestData();
    let user_data = snapshot[login_key];
    updateUserData(login_key, "balance", user_data.balance+amount);
}

async function setBalance(login_key, amount) {
    let snapshot = await fetchLatestData();
    let user_data = snapshot[login_key];
    updateUserData(login_key, "balance", user_data.balance=amount);
}

/**
 * Blinks a feedback message under the login field
 * @param {String} message 
 * @param {String | "login"} input
 * @param {"error" | "success"} type 
 */
function inputFeedback(message, input="login", type="error") {
    let feedback = document.getElementById(`${input}-feedback`);
    feedback.innerText = message;

    // black magic that makes the animation restart when function is ran multiple times
    feedback.style.animation = "none";
    feedback.offsetHeight;
    feedback.style.animation = null;

    feedback.style.animationName = "flash-"+type;
    feedback.onanimationend = () => { feedback.style.animationName = ""; };
}


/*****************************************************************/
/**
 * Under this line is anything unrelated to accounts or user data.
 */
/*****************************************************************/

function randItem(array) {
    return array[Math.floor(Math.random()*array.length)];
}