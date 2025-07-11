/**
 * Purrfect Account User System p2c1
 * Protocol version 2, client version 1
 * Originally from Purrfect-Odds
 * - Stantoncomet
 */


const ENDPOINT = 'https://stantoncomet.gleeze.com:5000/shot_cal';



//async function accessAccount 

/**
 * Fetches the latest user data from database server
 * @returns Specified user data in JSON format
 */
async function fetchUserData(user) {
    let data = await fetch(`${ENDPOINT}?u=${user}`)
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
    let out_data = {
        login_key: login_key,
        resource: resource,
        value: value
    }

    let success = await fetch(ENDPOINT, {
        mode: "cors",
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(out_data)
    })
        .then(response => response.json())
        .catch(err => console.log(err))
    return success;
}

/**
 * 
 * @param {String} login_key 
 * @returns {Boolean} If login was success
 */
async function login(login_key) {
    let out_data = {
        login_key: login_key
    }

    let success = await fetch(`${ENDPOINT}/login`, {
        mode: "cors",
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(out_data)
    })
        .then(response => response.json())
        .catch(err => console.log(err))

    if (success) {
        localStorage.setItem("shot_cal.current_login", login_key);
        return true;
    } else {
        return false;
    }
}

function getCurrentLogin() {
    return localStorage.getItem("shot_cal.current_login");
}