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
let snd_strange = new Audio("strange.mp3");
snd_strange.volume = 0.5;

async function spin() {
    let current_login = getCurrentLogin();
    if (!current_login) {
        inputFeedback("You must be logged in to gamble!", input="flip");
        return;
    }
    let snapshot = await fetchLatestData();
    let current_balance = snapshot[current_login].balance;
    if (current_balance < Math.abs(150)) {
        inputFeedback("You can't afford to spin!", input="flip");
        return;
    }

    let status = document.getElementById('fstatus');
        status.innerText = "Spinning...";
        incimentBalance(current_login, Number(-150))
        snd_spin.load()
        snd_spin.play()

    setTimeout(spinEnd, 1000);
    
    function spinEnd() {
        let result = Math.floor(Math.random()*25);
        status.innerText = "Spun!";
    
        switch (true) {
            
            // Expected Outcomes
            case result == 0:
                inputFeedback(`You win! (+Ⓟ150)`, input="flip", type="success");
                incimentBalance(current_login, Number(150));
                snd_success.load()
                snd_success.play()
                break;
            case result >= 1 && result <= 2:
                inputFeedback(`You win! (+Ⓟ250)`, input="flip", type="success");
                incimentBalance(current_login, Number(250));
                snd_success.load()
                snd_success.play()
                break;
            case result >= 3 && result <= 5:
                inputFeedback(`You win! (+Ⓟ300)`, input="flip", type="success");
                incimentBalance(current_login, Number(300));
                snd_success.load()
                snd_success.play()
                break;
            case result >= 6 && result <= 7:
                inputFeedback(`You win! (+Ⓟ500)`, input="flip", type="success");
                incimentBalance(current_login, Number(500));
                snd_success.load()
                snd_success.play()
                break;
            case result == 8:
                inputFeedback(`Jackpot! (+Ⓟ2000)`, input="flip", type="success");
                incimentBalance(current_login, Number(2000));
                snd_jackpot.load()
                snd_jackpot.play()
                break;
            case result >= 9 && result <= 12:
                inputFeedback(`You lose! (-Ⓟ200)`, input="flip", type="error");
                incimentBalance(current_login, Number(-200));
                snd_fail.load()
                snd_fail.play()
                break;
            case result >= 13 && result <= 16:
                inputFeedback(`You lose! (-Ⓟ300)`, input="flip", type="error");
                incimentBalance(current_login, Number(-300));
                snd_fail.load()
                snd_fail.play()
                break;
            case result == 17:
                inputFeedback(`You lose! (-Ⓟ400)`, input="flip", type="error");
                incimentBalance(current_login, Number(-400));
                snd_fail.load()
                snd_fail.play()
                break;
            case result == 18:
                inputFeedback(`You lose! (-Ⓟ500)`, input="flip", type="error");
                incimentBalance(current_login, Number(-500));
                snd_fail.load()
                snd_fail.play()
                break;
            case result == 19:
                inputFeedback(`Devastating loss! (-Ⓟ1000)`, input="flip", type="error");
                incimentBalance(current_login, Number(-1000));
                snd_superfail.load()
                snd_superfail.play()
                break;
            default: 
                inputFeedback(`Something went wrong... (Balance Refunded.)`, input="flip", type="error");
                incimentBalance(current_login, Number(150));
            // Strange Outcomes
            case result >= 20 && result <= 21:
                inputFeedback(`Strange outcome! (Balance halved!)`, input="flip", type="error");
                setBalance(current_login, Number(Math.floor(current_balance/2)));
                snd_strange.load()
                snd_strange.play()
                break;
            case result == 22:
                inputFeedback(`Strange outcome! (Balance square-rooted!)`, input="flip", type="error");
                setBalance(current_login, Number(Math.floor(Math.sqrt(current_balance))));
                snd_strange.load()
                snd_strange.play()
                break;
            case result == 23:
                inputFeedback(`Strange outcome! (Balance × 2!)`, input="flip", type="success");
                incimentBalance(current_login, Number(current_balance));
                snd_strange.load()
                snd_strange.play()
                break;
            case result == 24:
                inputFeedback(`Strange outcome! (Balance randomized!?)`, input="flip", type="success");
                setBalance(current_login, Number((Math.floor(Math.random() * ((current_balance*1.5) - 0 + 1)) + 0)));
                snd_strange.load()
                snd_strange.play()
                break;
        }
    }
}
