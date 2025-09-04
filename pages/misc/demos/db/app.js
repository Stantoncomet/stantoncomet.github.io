async function checkStatus() {
    // notify user we are working on their request
    document.getElementById('return-status').innerText = "pending";

    // wait for db status
    let online = await fetchDBStatus();
    let status = "offline";

    // assume offline, but if it's online, change to online
    if (online) status = "online";

    // notify user of result
    document.getElementById('return-status').innerText = status;
}


function fetchData() {
    // get the user-typed resource path to get data from
    let resource_path = document.getElementById('fetch-path').value;

    //let 

}