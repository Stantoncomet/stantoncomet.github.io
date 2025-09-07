// global var for basic entry list data. we only load it once 
// (on page load), and don't need to fetch it again
let entry_list = {};


function addTrack(title, date, preview, eid='') {
    let TrackDiv = new DocEle('div');
    TrackDiv.addClass('track', 'cat-words');

    let TitleDiv = new DocEle('div');
    TitleDiv.addClass('title');
    let TitleA = new DocEle('a');
    TitleA.setText(title);
    TitleA.ele.setAttribute('onclick', `loadEntry('${eid}')`);

    TitleDiv.appendChild(TitleA.ele);
    TrackDiv.appendChild(TitleDiv.ele);
    //
    TrackDiv.newChild('p', date);
    TrackDiv.newChild('p', preview);

    TrackDiv.appendToId('library');

}

async function fetchLibrary() {
    entry_list = await fetchFileData('entries');

    // entries.json example:
    // {"public": { "entry_id": {"title":"blah", "epoch":"1989881290", "preview": "First few words or so"} } }

    Object.keys(entry_list.public).forEach(eid => {
        let entry = entry_list.public[eid];
        addTrack(entry.title, formatDate(entry.epoch), entry.preview, eid);
    })
}



async function loadEntry(entry_id) {
    if (entry_id == '') return;
    // hide tracks and intro
    hideEle('intro');
    hideEle('library');
    // show entry stuff
    showEle('info');
    showEle('content');

    // delete old content
    document.getElementById('content').querySelectorAll('p').forEach(p => p.remove());

    // load!

    let entry_data = entry_list.public[entry_id];
    let entry_content = await fetchFileData(`public/${entry_id}`);

    // info
    document.getElementById('info').querySelector('h1').innerText = entry_data.title;
    document.getElementById('info').querySelector('p').innerText = formatDate(entry_data.epoch);

    //content
    entry_content.paragraphs.forEach(p => {
        let ParaP = new DocEle('p');
        ParaP.setText(p);
        ParaP.appendToId('content');
    })

}

function backHome() {
    // hide tracks and intro
    hideEle('info');
    hideEle('content');
    // show entry stuff
    showEle('intro');
    showEle('library'); 
}






window.onload = async () => {
    // only try to fetch conent if db is online
    let online = await fetchStatus();
    if (online) {
        // green, online indicator
        document.getElementById('intro').style.borderColor = 'rgba(0, 255, 0, 0.1)'
        fetchLibrary();
    } else {
        // red, offline indicator
        document.getElementById('intro').style.borderColor = 'rgba(255, 0, 0, 0.1)'
        addTrack("Unable to Borrow Content", formatDate(Date.now()), "Something is offline...");
    }
}
