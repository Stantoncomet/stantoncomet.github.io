const socket = new WebSocket('wss://stantoncomet.gleeze.com/ws/demo');

socket.onopen = e => {
    document.getElementById('return-status').innerText = "connected";
}

socket.onmessage = e => {
    document.getElementById('return-data').innerText = e.data;
}




function fetchData() {
    let rp = document.getElementById('fetch-path').value.trim();
    if (!rp) return;

    socket.send(rp);
}