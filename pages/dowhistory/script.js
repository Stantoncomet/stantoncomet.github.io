function showJDowClasses() {
    showClassButtons('jdow-classes', true);
    showClassButtons('bdow-classes', false);
    selectButton('jdow', 'prof');
    loadSheet(sheetData.jdow.wh);
    selectButton('jdow-wh', 'class');
}
function showBDowClasses() {
    showClassButtons('bdow-classes', true);
    showClassButtons('jdow-classes', false);
    selectButton('bdow', 'prof');
    loadSheet(sheetData.bdow.cwp);
    selectButton('bdow-cwp', 'class');
}

function showClassButtons(prof, visible) {
    let buttons = document.getElementById(prof);
    if (visible) {
        buttons.style.visibility = 'visible';
        buttons.style.height = 'auto';
    }
    if (!visible) {
        buttons.style.visibility = 'hidden';
        buttons.style.height = '0px';
    }
}

function selectButton(prof, type) {
    let button = document.getElementById(prof);
    document.querySelectorAll(`.${type}-btn`).forEach(btn => {
        btn.classList.remove('selected');
    })
    button.classList.add('selected');
}

document.addEventListener('DOMContentLoaded', e => {
    showJDowClasses();
    document.querySelectorAll('.class-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            let info = btn.id.split('-');
            //console.log(sheetData[info[0]][info[1]]);
            loadSheet(sheetData[info[0]][info[1]]);
            selectButton(btn.id, 'class');

        })
    })
})

