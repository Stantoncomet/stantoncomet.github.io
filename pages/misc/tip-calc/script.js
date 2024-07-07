let answerBox = document.getElementById('answer');
let totalDue = document.getElementById('total');


answerBox.addEventListener('keyup', e => {
    let tip_ammount = answerBox.value;
    let total = totalDue.innerText;

    if (e.code == "Enter" && !isNaN(tip_ammount)) {
        let tip = (tip_ammount/total*100).toFixed(1);
        console.log(tip+"%");
        document.getElementById('new-total').innerText = Number(tip_ammount)+Number(total);
        //document.getElementById('percent').innerText = tip+"%";
    }
});





function checkAnswer(input) {
    let answer = document.getElementById('answer').value;

    console.log(input);
}