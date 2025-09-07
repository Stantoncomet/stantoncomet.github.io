/***************************************************************************************************************/
/**
 * This common.js file contains the cool and awesome code for interfacing with the database. 
 * Specifically adjusted for the blog page. Base code from:
 * Demo v1.0
 */
/***************************************************************************************************************/

// Global vars
const DB_URL = (endpoint) => `https://stantoncomet.gleeze.com${endpoint}`;


/**
 * Check if database server is online
 * @returns true if database is online, false if something isnt working
 */
async function fetchStatus() {
    let data = await fetch(DB_URL('/api/blog/ping'))
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
    let data = await fetch(DB_URL(`/api/blog/resources?df=${data_file}`))
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
    let success = await fetch(DB_URL(`/api/blog/resources?df=${data_file}`), {
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
    let new_data = dataManipulationFunction(data);
    if (!new_data) return; // if dMF returns nothing, do nothing
    await setFileData(data_file, new_data);
}
