// global vars
let job_data;


function formatTime(epoch, utc_hours=false) {
    let ref = new Date(epoch);
    let year = ref.getFullYear();
    let month = ref.getMonth()+1;
    let day = ref.getDate();

    let hours = utc_hours ? ref.getUTCHours() : ref.getHours();
    let minutes = ref.getMinutes();
    let seconds = ref.getSeconds();

    if (minutes < 10) minutes = `0${minutes}`;
    if (seconds < 10) seconds = `0${seconds}`;

    //return `${month} ${day}, ${year}`;
    return `${hours}:${minutes}:${seconds}`;
    // return ref.getTime()
}

async function toggleClock(job_id) {
    await fetchJobs();
    // job exists?
    //let 

    // fetch current job status
    let clocked_in = job_data[job_id].clocked_in;

    if (clocked_in) {
        // then clock out
        clockOut(job_id);
    } else {
        // else clock in
        clockIn(job_id);
    }

    // update html
    let job_status = clocked_in ? "Clock In" : "Clock Out";
    let track = document.getElementById(`job-${job_id}`);
    track.querySelector('button').innerText = job_status;

}


async function fetchJobs() {
    job_data = await fetchFileData('job_data');
    console.log(job_data);
}

function updateButtons() {
    let tracks = document.querySelectorAll('.track');
    // loop thru every job
    tracks.forEach(t => {
        // job id
        let job_id = t.id.replace('job-','');
        let job_status = job_data[job_id].clocked_in ? "Clock Out" : "Clock In";
        t.querySelector('button').innerText = job_status;
    })
}

function updateDisplays() {
    let tracks = document.querySelectorAll('.track');
    // loop thru every job
    tracks.forEach(t => {
        // job id
        let job_id = t.id.replace('job-','');
        // grab the clock in-out tags
        let ti = t.querySelector('.time-info').querySelectorAll('p');


        // IF CLOCKED IN

        console.log(`Job: ${job_id}, in? ${job_data[job_id].clocked_in}`);

        if (job_data[job_id].clocked_in) {
            // calculate elapsed time
            let elapsed_time = Date.now() - job_data[job_id].time_in;

            console.log(elapsed_time)

            // [0] is time in, [1] is time elapsed
            ti[0].innerHTML = `CI:<br>${formatTime(job_data[job_id].time_in)}`;
            ti[1].innerHTML = `Elapsed:<br>${formatTime(elapsed_time, true)}`;
        } else {
            // ELSE CLOCKED OUT, use latest log
            console.log(job_data[job_id].log.length)
            let elapsed_time = job_data[job_id].log[job_data[job_id].log.length-1].time_out - job_data[job_id].log[job_data[job_id].log.length-1].time_in;

            console.log(Date.now(), job_data[job_id].time_in)

            // [0] is time in, [1] is time elapsed
            ti[0].innerHTML = `CI:<br>${formatTime(job_data[job_id].time_in)}`;
            ti[1].innerHTML = `Elapsed:<br>${formatTime(elapsed_time, true)}`;
        }


        

    })
}

async function clockIn(job_id) {
    await updateFileData('job_data', db => {
        db[job_id].clocked_in = true;
        db[job_id].time_in = Date.now();
        return db;
    })

    await fetchJobs();
}


async function clockOut(job_id) {
    if (job_data[job_id].clocked_in == false) return;

    // update db
    await updateFileData('job_data', db => {
        db[job_id].clocked_in = false;

        let new_log = {
            time_in: db[job_id].time_in,
            time_out: Date.now()
        }

        db[job_id].log.push(new_log)
        return db;
    })

    await fetchJobs();
}


window.onload = async () => {
    // check if db is online
    let online = await fetchStatus();
    if (!online) {
        // red, offline indicator
        document.getElementById('db-status').innerText = "🔴";
        return;
    }

    // green, online indicator
    document.getElementById('db-status').innerText = "🟢";

    //load stuff

    await fetchJobs();
    updateDisplays();
    updateButtons();


    setInterval(updateDisplays, 1000);
}