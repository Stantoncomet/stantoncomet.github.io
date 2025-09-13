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

    let entries = [];

    // fetch entries, unordered, to an array
    Object.keys(entry_list.public).forEach(eid => {
        let entry = entry_list.public[eid];
        // add id into object
        entry.id = eid;
        entries.push(entry);
    })
    
    // sort by datetime
    let sorted_entries = entries.sort((a, b) => b.epoch - a.epoch);

    // add to document
    sorted_entries.forEach(e => {
        addTrack(e.title, formatDate(e.epoch), e.preview, e.id);
    })
}



async function loadEntry(entry_id) {
    if (entry_id == '') return;
    // hide tracks and intro
    hideEle('intro');
    hideEle('library');

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
        // makes breaks between paragraphs render
        if (p == '')
            ParaP.setText('‎');
        else
            ParaP.setText(p);
        ParaP.appendToId('content');
    })

    // show stuff after it loads
    showEle('info');
    showEle('content');
}

function backHome() {
    // hide tracks and intro
    hideEle('info');
    hideEle('content');
    hideEle('desk');
    // show entry stuff
    showEle('intro');
    showEle('library'); 
}

function showDesk() {
    // hide stuff
    hideEle('content');
    hideEle('intro');
    hideEle('library');


    // info
    document.getElementById('info').querySelector('h1').innerText = "Create or Edit";
    document.getElementById('info').querySelector('p').innerText = formatDate(Date.now());

    showEle('info')
    showEle('desk')
}



async function writeEntry(id, title, paragraphs, key) {
    // save to entries.json
    await updateFileData('entries', data => {
        let e = {
            title: title,
            epoch: Date.now(),
            preview: paragraphs[0].slice(0, 20)
        }
        data.public[id] = e;
        return data;
    }, key)
    let content = {
        paragraphs: paragraphs
    }
    // save content
    await setFileData(`public/${id}`, content, key);;

}

// async function testSave() {
//     let words = [
//         "2nd ever post, wow!",
//         "maybe one day I can write these from this website and save them!"
//     ]
//     await writeEntry('hello_world', 'Hello World!', words);
// }


async function accessAdmin() {
    let key_input = valOfId('key-input');
    if (key_input == "") return;

    let key_is_valid = await fetchKeyValidity(key_input);
    console.log(key_is_valid)
    if (!key_is_valid) return;

    showEle('panel-b');
}

async function saveNewEntry() {
    let key_input = valOfId('key-input');
    if (key_input == "") return;
    let all_text = valOfId('entry-input');

    if (!all_text.includes(';')) return;
    let eid = all_text.split(';')[0];
    let title = all_text.split(';')[1];
    let paragraphs = all_text.split(';')[2].trim().split('\n');
  
    console.log(all_text)

    await writeEntry(eid, title, paragraphs, key_input);
}



window.onload = async () => {
    // only try to fetch conent if db is online
    let online = await fetchStatus();
    if (!online) {
        // red, offline indicator
        document.getElementById('intro').style.borderColor = 'rgba(255, 0, 0, 0.1)'
        addTrack("Unable to Borrow Content", formatDate(Date.now()), "Something is offline...");
        return;
    }

    // green, online indicator
    document.getElementById('intro').style.borderColor = 'rgba(0, 255, 0, 0.1)'
    fetchLibrary();

    accessAdmin();
}
