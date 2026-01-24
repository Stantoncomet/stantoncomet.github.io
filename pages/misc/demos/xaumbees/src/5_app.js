const socket = new WebSocket('wss://stantoncomet.gleeze.com/ws/demo');

let online = false;



socket.onopen = e => {
    online = true;
    document.getElementById('server-status').innerText = online;
    //send join packet
    let JoinPacket = new Packet('join', {uuid: pid});
    JoinPacket.send()
}


socket.onmessage = e => {
    let data;
    try {
        data = JSON.parse(e.data);
    } catch {
        console.log('Invalid (non-JSON) packet data recived');
        return;
    }
    //console.log("Recieved data:", data.data);

    //parse the data
    switch (data.type) {
        case 'players': {
            other_players = [];
            let all_uuids = Object.keys(data.data)
            //console.log(all_uuids)

            all_uuids.forEach(id => {
                if (pid == id) return;
                //console.log(data.data[id])
                let NewOtherPlayer = new Thing(data.data[id].pos.x, data.data[id].pos.y, 30, 30, 'player.png');
                NewOtherPlayer.uuid = id;
                other_players.push(NewOtherPlayer);
            })
            break;
        }
        default: {
            console.log('Invalid packet type recived');
        }
    }
}



class Packet {
    constructor(type, data) {
        this.type = type;
        this.data = data;
    }
    send() {
        let sdata = {
            type: this.type,
            data: this.data
        }
        socket.send(JSON.stringify(sdata));
    }
}

function tick() {
    let pdata = {
        uuid: pid,
        pos: Player.worldPos()
    }
    let PlayerPacket = new Packet('player', pdata);
    PlayerPacket.send();
}

setInterval(tick, 1000/10);