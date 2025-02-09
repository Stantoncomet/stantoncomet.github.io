

async function flip() {
    let current_login = getCurrentLogin();
    if (!current_login) {
        inputFeedback("You must be logged in to gamble!", input="flip");
        return;
    }

    let selection = document.getElementById('selection');
    let bet = document.getElementById('betting-amount');
    if (!selection.value || !bet.value) {
        inputFeedback("Please select both values!", input="flip");
        return;
    }
    if (isNaN(bet.value) || (bet.value*10)%10 != 0) {
        inputFeedback("You can only bet in whole numbers!", input="flip");
        return;
    }
    let snapshot = await fetchLatestData();
    let current_balance = snapshot[current_login].balance;
    if (current_balance < Math.abs(bet.value)) {
        inputFeedback("You can't affort to flip!", input="flip");
        return;
    }

    let status = document.getElementById('fstatus');
    status.innerText = "Flipping...";

    setTimeout(flipEnd, 500);
    
    async function flipEnd() {
        let result = Math.floor(Math.random()*2);
        if (result) {
            status.innerText = "Heads";
        } else {
            status.innerText = "Tails"
        }
    
        if (result == selection.value) {
            inputFeedback(`You win $${bet.value}!`, input="flip", type="success");
            incimentBalance(current_login, Number(bet.value));
        } else {
            inputFeedback(`You lose $${bet.value}...`, input="flip", type="error");
            incimentBalance(current_login, -Number(bet.value));
        }

        let snapshot = await fetchLatestData();
        status.innerText = snapshot[current_login].balance
    }
}

