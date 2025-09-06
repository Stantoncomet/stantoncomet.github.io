async function checkStatus() {
    // used to check response times
    let init_time = Date.now();
    // notify user we are working on their request
    document.getElementById('return-status').innerText = "pending";

    // wait for db status
    let online = await fetchStatus();
    let status = "offline";

    // assume offline, but if it's online, change to online
    if (online) status = "online";

    // response time in ms = current time - start time
    status += ` ${Date.now() - init_time}ms`;

    // notify user of result
    document.getElementById('return-status').innerText = status;
}


async function fetchData() {
    // notify user we are working on their request
    document.getElementById('return-data').innerText = "pending";

    // get the user-typed resource path to get data from
    let resource_path = document.getElementById('fetch-path').value;

    // wait for resource to fetch
    let data = await fetchResource(resource_path);

    // notify user of result
    document.getElementById('return-data').innerText = JSON.stringify(data);
    console.log(data)
}

async function updateData() {
    // notify user we are working on their request
    document.getElementById('return-success').innerText = "pending";

    // get the user-typed resource path and value to set/update
    let resource_path = document.getElementById('update-path').value;
    let value = document.getElementById('update-value').value;

    // wait for resource to update, returns success or failure
    let success = await updateResource(resource_path, value);

    // notify user of success
    document.getElementById('return-success').innerText = JSON.stringify(success);
}










async function fetchResource(resource_path) {
    // TODO add actual resource path stuff
    return await fetchFileData(resource_path);
}

async function updateResource(resource_path, value) {
    let success = await setFileData(resource_path, value);
    if (!success) return false;
    return success;
}