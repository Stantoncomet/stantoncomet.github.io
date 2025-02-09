let snd_success = new Audio("success.wav");
snd_success.volume = 0.2;
let snd_fail = new Audio("fail.mp3");
snd_fail.volume = 0.2;
let snd_jackpot = new Audio("jackpot.mp3");
snd_jackpot.volume = 0.5;
let snd_superfail = new Audio("superfail.mp3");
snd_superfail.volume = 0.3;
let snd_spin = new Audio("spinning.mp3");
snd_spin.volume = 0.5;

async function spin() {
    let current_login = getCurrentLogin();
    if (!current_login) {
        inputFeedback("You must be logged in to gamble!", input="flip");
        return;
    }
    let snapshot = await fetchLatestData();
    let current_balance = snapshot[current_login].balance;
    if (current_balance < Math.abs(200)) {
        inputFeedback("You can't affort to spin!", input="flip");
        return;
    }

    let status = document.getElementById('fstatus');
    status.innerText = "Spinning...";
    incimentBalance(current_login, Number(-200))
    snd_spin.load()
    snd_spin.play()

    setTimeout(spinEnd, 1000);
    
    function spinEnd() {
        let result = Math.floor(Math.random()*20);
        status.innerText = "Spun!";
    
        if (result == 0) {
            inputFeedback(`You win! (+Ⓟ50)`, input="flip", type="success");
            incimentBalance(current_login, Number(50));
            snd_success.load()
            snd_success.play()
    }
        if (result == 1) {
            inputFeedback(`You win! (+Ⓟ50)`, input="flip", type="success");
            incimentBalance(current_login, Number(50));
            snd_success.load()
            snd_success.play()
    }
        if (result == 2) {
            inputFeedback(`You win! (+Ⓟ100)`, input="flip", type="success");
            incimentBalance(current_login, Number(100));
            snd_success.load()
            snd_success.play()
    }
        if (result == 3) {
            inputFeedback(`You win! (+Ⓟ100)`, input="flip", type="success");
            incimentBalance(current_login, Number(100));
            snd_success.load()
            snd_success.play()
    }
        if (result == 4) {
            inputFeedback(`You win! (+Ⓟ100)`, input="flip", type="success");
            incimentBalance(current_login, Number(100));
            snd_success.load()
            snd_success.play()
    }
        if (result == 5) {
            inputFeedback(`You win! (+Ⓟ200)`, input="flip", type="success");
            incimentBalance(current_login, Number(200));
            snd_success.load()
            snd_success.play()
    }
        if (result == 6) {
            inputFeedback(`You win! (+Ⓟ300)`, input="flip", type="success");
            incimentBalance(current_login, Number(300));
            snd_success.load()
            snd_success.play()
    }
        if (result == 7) {
            inputFeedback(`You win! (+Ⓟ300)`, input="flip", type="success");
            incimentBalance(current_login, Number(300));
            snd_success.load()
            snd_success.play()
    }
        if (result == 8) {
            inputFeedback(`You win! (+Ⓟ500)`, input="flip", type="success");
            incimentBalance(current_login, Number(500));
            snd_success.load()
            snd_success.play()
    }
        if (result == 9) {
            inputFeedback(`Jackpot! (+Ⓟ1000)`, input="flip", type="success");
            incimentBalance(current_login, Number(1000));
            snd_jackpot.load()
            snd_jackpot.play()
    }
        if (result == 10) {
            inputFeedback(`You lose! (-Ⓟ50)`, input="flip", type="error");
            incimentBalance(current_login, Number(-50));
            snd_fail.load()
            snd_fail.play()
    }
        if (result == 11) {
            inputFeedback(`You lose! (-Ⓟ100)`, input="flip", type="error");
            incimentBalance(current_login, Number(-100));
            snd_fail.load()
            snd_fail.play()
    }
        if (result == 12) {
            inputFeedback(`You lose! (-Ⓟ150)`, input="flip", type="error");
            incimentBalance(current_login, Number(-150));
            snd_fail.load()
            snd_fail.play()
    }
        if (result == 13) {
            inputFeedback(`You lose! (-Ⓟ200)`, input="flip", type="error");
            incimentBalance(current_login, Number(-200));
            snd_fail.load()
            snd_fail.play()
    }
        if (result == 14) {
            inputFeedback(`You lose! (-Ⓟ250)`, input="flip", type="error");
            incimentBalance(current_login, Number(-250));
            snd_fail.load()
            snd_fail.play()
    }
        if (result == 15) {
            inputFeedback(`You lose! (-Ⓟ300)`, input="flip", type="error");
            incimentBalance(current_login, Number(-300));
            snd_fail.load()
            snd_fail.play()
    }
        if (result == 16) {
            inputFeedback(`You lose! (-Ⓟ350)`, input="flip", type="error");
            incimentBalance(current_login, Number(-350));
            snd_fail.load()
            snd_fail.play()
    }
        if (result == 17) {
            inputFeedback(`You lose! (-Ⓟ400)`, input="flip", type="error");
            incimentBalance(current_login, Number(-400));
            snd_fail.load()
            snd_fail.play()
    }
        if (result == 18) {
            inputFeedback(`You lose! (-Ⓟ500)`, input="flip", type="error");
            incimentBalance(current_login, Number(-500));
            snd_fail.load()
            snd_fail.play()
    }
        if (result == 19) {
            inputFeedback(`Devastating loss! (Balance halved!)`, input="flip", type="error");
            incimentBalance(current_login, Number(Math.round(current_balance/2)));
            snd_superfail.load()
            snd_superfail.play()
    }
}
}
