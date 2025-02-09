

async function spin() {
    let current_login = getCurrentLogin();
    if (!current_login) {
        inputFeedback("You must be logged in to gamble!", input="flip");
        return;
    }
    let snapshot = await fetchLatestData();
    let current_balance = snapshot[current_login].balance;
    if (current_balance < Math.abs(100)) {
        inputFeedback("You can't afford to spin!", input="flip");
        return;
    }

    let status = document.getElementById('fstatus');
    status.innerText = "Spinning...";
    incimentBalance(current_login, Number(-100))

    setTimeout(spinEnd, 1000);
    
    function spinEnd() {
        let result = Math.floor(Math.random()*20);
        status.innerText = "Spun!";
    
        if (result == 0) {
            inputFeedback(`You win! (+Ⓟ25)`, input="flip", type="success");
            incimentBalance(current_login, Number(25));
    }
        if (result == 1) {
            inputFeedback(`You win! (+Ⓟ25)`, input="flip", type="success");
            incimentBalance(current_login, Number(25));
    }
        if (result == 2) {
            inputFeedback(`You win! (+Ⓟ50)`, input="flip", type="success");
            incimentBalance(current_login, Number(50));
    }
        if (result == 3) {
            inputFeedback(`You win! (+Ⓟ50)`, input="flip", type="success");
            incimentBalance(current_login, Number(50));
    }
        if (result == 4) {
            inputFeedback(`You win! (+Ⓟ100)`, input="flip", type="success");
            incimentBalance(current_login, Number(100));
    }
        if (result == 5) {
            inputFeedback(`You win! (+Ⓟ200)`, input="flip", type="success");
            incimentBalance(current_login, Number(200));
    }
        if (result == 6) {
            inputFeedback(`You win! (+Ⓟ200)`, input="flip", type="success");
            incimentBalance(current_login, Number(200));
    }
        if (result == 7) {
            inputFeedback(`You win! (+Ⓟ200)`, input="flip", type="success");
            incimentBalance(current_login, Number(200));
    }
        if (result == 8) {
            inputFeedback(`You win! (+Ⓟ500)`, input="flip", type="success");
            incimentBalance(current_login, Number(500));
    }
        if (result == 9) {
            inputFeedback(`You win! (+Ⓟ1000)`, input="flip", type="success");
            incimentBalance(current_login, Number(1000));
    }
        if (result == 10) {
            inputFeedback(`You lose! (-Ⓟ50)`, input="flip", type="error");
            incimentBalance(current_login, Number(-50));
    }
        if (result == 11) {
            inputFeedback(`You lose! (-Ⓟ150)`, input="flip", type="error");
            incimentBalance(current_login, Number(-150));
    }
        if (result == 12) {
            inputFeedback(`You lose! (-Ⓟ150)`, input="flip", type="error");
            incimentBalance(current_login, Number(-150));
    }
        if (result == 13) {
            inputFeedback(`You lose! (-Ⓟ200)`, input="flip", type="error");
            incimentBalance(current_login, Number(-200));
    }
        if (result == 14) {
            inputFeedback(`You lose! (-Ⓟ200)`, input="flip", type="error");
            incimentBalance(current_login, Number(-200));
    }
        if (result == 15) {
            inputFeedback(`You lose! (-Ⓟ200)`, input="flip", type="error");
            incimentBalance(current_login, Number(-200));
    }
        if (result == 16) {
            inputFeedback(`You lose! (-Ⓟ300)`, input="flip", type="error");
            incimentBalance(current_login, Number(-300));
    }
        if (result == 17) {
            inputFeedback(`You lose! (-Ⓟ400)`, input="flip", type="error");
            incimentBalance(current_login, Number(-400));
    }
        if (result == 18) {
            inputFeedback(`You lose! (-Ⓟ500)`, input="flip", type="error");
            incimentBalance(current_login, Number(-500));
    }
        if (result == 19) {
            inputFeedback(`Devastating loss! (Balance halved!)`, input="flip", type="success");
            incimentBalance(current_login, Number(current_balance/2));
    }
}
}
