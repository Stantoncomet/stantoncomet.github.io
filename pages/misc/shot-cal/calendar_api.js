const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/**
 * @type {HTMLElement[]}
 */
let day_eles;

let calday;

document.addEventListener('DOMContentLoaded', e => {
    let date = doDate();
    buildCalendar();

    console.log()

    // makes days go right squares
    calday = date.day - (date.day%7 - date.weekday); // kinda makes sense
    calday += date.day%7 > date.weekday? 7: 0; // written too late and night and while half listening to the ready player one audiobook

    for (let i = 1; i <= daysInMonth(date.month, date.year); i++) {
        let d = calday-(date.day-i);
        day_eles[d].querySelector('p').innerHTML = i;
        day_eles[d].classList.remove('noexista');
    }

    day_eles[calday].querySelector('p').innerHTML = `<u>${date.day}</u>`;
    

    



})


function doDate() {
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();
    let day = today.getDate();
    let weekday = today.getDay();

    let s_month = MONTHS[month];
    let s_weekday = WEEKDAYS[weekday];

    let today_txt = s_weekday+" "+s_month+" "+day+", "+year;

    let date_ele = document.getElementById('datenow');
    date_ele.innerText = today_txt;

    console.log();
    console.log(day);

    return {year: year, month: month, day: day, weekday: weekday, s_month: s_month, s_weekday: s_weekday};
}


function buildCalendar() {
    let cal_ele = document.getElementById('map');

    for (let i = 0; i < 6; i++) {
        let week_ele = document.createElement('div');
        week_ele.classList.add('week');

        for (let i = 0; i < 7; i++) {
            let day_ele = document.createElement('div');
            day_ele.classList.add('day');
            day_ele.classList.add('noexista');
            day_ele.appendChild(document.createElement('p'));
            week_ele.appendChild(day_ele);
        }
        cal_ele.appendChild(week_ele);
    }
    
    day_eles = Array.from(document.querySelectorAll('.day'));
}

function daysInMonth(month, year) {
    return new Date(year, month+1, 0).getDate();
}


class Plan {
    constructor (calday, title="DND", desc, author) {
        this.calday = calday;
        this.title = title;
        this.desc = desc;
        this.author = author;
    }

    export() {
        let plan_ele = document.createElement('div');
        plan_ele.classList.add('plan');

        let title_ele = document.createElement('p');
        title_ele.innerText = this.title;//.slice(0, 16);
        plan_ele.appendChild(title_ele);

        day_eles[this.calday].appendChild(plan_ele);
    }
}