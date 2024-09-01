let Receipt = document.getElementById('main');
let AnswerBox = document.getElementById('answer');
let TotalDue = document.getElementById('total');

let can_tip = true;


document.addEventListener('keyup', e => {
    if (!can_tip) return;

    let tip_ammount = AnswerBox.innerText;
    let total = TotalDue.innerText;

    // console.log(e.key);
    // console.log(e.key.match(/\d|\./));
    if (e.key.match(/^(\d|\.)$/)) {
        AnswerBox.innerText += e.key;
    }

    if (e.code == "Enter" && !isNaN(tip_ammount)) {
        let tip = (tip_ammount/total*100).toFixed(1);
        console.log(tip+"%");
        document.getElementById('new-total').innerText = Number(tip_ammount)+Number(total);
        //document.getElementById('percent').innerText = tip+"%";

        clearReceipt();
        can_tip = false;
    }

    if (e.code == "Backspace") {
        eraseTip();
        can_tip = false;
    }
});

AnswerBox.addEventListener('animationend', e => {
    console.log(e);
    eraseTipEnd();
    can_tip = true;
})

function clearReceipt() {
    Receipt.style.animationName = 'leave-top';
}

function eraseTip() {
    AnswerBox.style.animationName = 'erase-answer';
    AnswerBox.style.color = 'rgba(0, 0, 0, 0.0)';
}
function eraseTipEnd() {
    AnswerBox.style.color = 'rgba(0, 0, 0, 1.0)';
    AnswerBox.style.animationName = '';
    AnswerBox.innerHTML = '&nbsp;';
}


function checkAnswer(input) {
    let answer = document.getElementById('answer').value;

    console.log(input);
}