/***************************************************************************************************************/
/**
 * This common.js file is shared between subsites in purrfect odds. It should be the first script loaded on a page. 
 * This top part is for accounts and data stuff.
 */
/***************************************************************************************************************/

// Global vars
const DB_URL = (endpoint) => `https://stantoncomet.gleeze.com${endpoint}`;


/**
 * Check if database server is online
 * @returns true if database is online, false if something isnt working
 */
async function fetchDBStatus() {
    let data = await fetch(DB_URL('/api/demo/ping'))
        .then(response => response.json())
        .catch(err => {console.log(err); return false})
    if (!data) // when nginx or the nodejs server is down, data == false
        return false;
    return true;
}

/**
 * Fetches the latest user data from database server
 * @returns All user data in JSON format
 */
async function fetchLatestData() {
    let data = await fetch(DB_URL('/api/odds/users'))
        .then(response => response.json())
        .catch(err => {console.log(err); return 0})
    return data;
}

/**
 * Fetches the latest data of one user
 * @param {string} username 
 * @returns User data in JSON format
 */
async function fetchUserData(username) {
    let data = await fetch(DB_URL(`/api/odds/users/${username}`))
        .then(response => response.json())
        .catch(err => {console.log(err); return 0})
    return data;
}

/**
 * Requests a login from the server using credentials provided
 * @param {string} username 
 * @param {string} password 
 */
async function fetchLogin(auth) {
    let success = await fetch(DB_URL(`/api/odds/login?u=${auth.username}&p=${auth.password}`))
        .then(res => res.json())
        .catch(err => {console.log(err); return 0});
    
    return success; 
}

/**
 * OUTDATED AND IRRELEVENT UNDER THIS LINE
 * KEPT FOR FUTURE REFERENCE
 */
//=======================================================================================\\

async function updateUserResource(auth, resource_path, value) {
    
}




/**
 * Template for POST requests, use .setBody() on instance to set content to send
 */
class POSTRequest {
    constructor (_mode="cors", _headers={"Content-Type": "application/json"}, _body="{}") {
        this.mode = _mode;
        this.method = "POST";
        this.headers = _headers;
        this.body = _body;
    }

    /**
     * give me an object, i will convert it for you :>
     * @param {object} data 
     */
    setBody(data) {
        let new_body = JSON.stringify(data);
        this.body = new_body;
    }

}



async function apud(username, data) {
    let success = await fetch(DB_URL(`/api/odds/users/${username}`), {
        mode: "cors",
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            data: data
        })
    })
        .then(response => response.json())
        .catch(err => console.log(err))
    return success;
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
        .catch(err => console.log(err))
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
async function incrementBalance(login_key, amount) {
    let snapshot = await fetchLatestData();
    let user_data = snapshot[login_key];
    await updateUserData(login_key, "balance", user_data.balance+amount);
}

async function updateBalance(login_key, amount) {
    await updateUserData(login_key, "balance", amount);
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