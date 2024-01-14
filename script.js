document.addEventListener('DOMContentLoaded', e => {
    const full_date = new Date();
    const date = {
        month: full_date.getMonth()+1,
        day: full_date.getDate(),
        year: full_date.getFullYear()
    };
    console.log(date);
    if (date.month == 12)
        document.getElementById('me-pic').src = 'images/about_i-festive.png';


    updateTime();
    setInterval(updateTime, 1000);

    
})

function updateTime() {
    //time objects
    const full_time = new Date();
    let time = {
        hours: full_time.getHours(),
        minutes: full_time.getMinutes(),
        seconds: full_time.getSeconds()
    }

    //12-hour time
    if (time.hours > 12)
        time.hours -= 12;
    //update time
    document.getElementById('abt-me').innerText = `${time.hours}:${time.minutes}:${time.seconds}`;
}