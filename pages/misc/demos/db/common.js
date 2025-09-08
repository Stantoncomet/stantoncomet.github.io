/***************************************************************************************************************/
/**
 * This common.js file contains the cool and awesome code for interfacing with a database. 
 * It should be the first script loaded on a page. 
 * v1.1
 */
/***************************************************************************************************************/

// Global vars
const DB_URL = (endpoint) => `https://stantoncomet.gleeze.com${endpoint}`;


/**
 * Check if database server is online
 * @returns true if database is online, false if something isnt working
 */
async function fetchStatus() {
    let data = await fetch(DB_URL('/api/demo/ping'))
        .then(response => response.json())
        .catch(err => {console.log(err); return false})
    if (!data) // when nginx or the nodejs server is down, data == false
        return false;
    return true;
}


/**
 * Fetches the latest data from one file
 * @param {string} data_file path or name of file to overwrite data
 * @returns File contents in JSON format
 */
async function fetchFileData(data_file) {
    let data = await fetch(DB_URL(`/api/demo/resources?df=${data_file}`))
        .then(response => response.json())
        .catch(err => {console.log(err); return 1})
    return data;
}


/**
 * Overwirtes the contents of the data file with `value`.
 * Used in conjunction withe fetchResource() to change parts of data. 
 * @param {string} data_file Path or name of file to overwrite data
 * @param {object} data JSON please :)
 * @returns 
 */
async function setFileData(data_file, data) {
    // note how endpoint is the same as fetching the resource, but it's actually a different route.
    // the fetch() function defualts to GET route, but here we are delcaring this HTTP request as POST.
    // we include the value, as it could be very large and isn't nescarily a string, in the body of the request.
    let success = await fetch(DB_URL(`/api/demo/resources?df=${data_file}`), {
        mode: "cors",
        method: "POST",
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
 * 
 * @param {string} data_file 
 * @param {CallableFunction} dataManipulationFunction One argument is passed through here, `data`, which is the contents of the JSON file in object-from
 */
async function updateFileData(data_file, dataManipulationFunction) {
    let data = await fetchFileData(data_file);
    if (data.error_code) throw "File does not exist";
    let new_data = dataManipulationFunction(data);
    if (!new_data) return; // if dMF returns nothing, do nothing
    await setFileData(data_file, new_data);
}


/**
 * OUTDATED AND IRRELEVENT UNDER THIS LINE
 * KEPT FOR FUTURE REFERENCE
 */
//=======================================================================================\\




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