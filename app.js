let playerScore = document.querySelector('#player');
let computerScore = document.querySelector('#comp');
let resultText = document.querySelector('#result');
let finalText = document.querySelector('#final');
let buttons = document.querySelectorAll('.game');
let reset = document.querySelector('#reset');
reset.disabled = true;
let roundNumber = 1, playerScoreNum = 0, computerScoreNum = 0;

resultText.textContent = "Make your selection";
finalText.textContent = 'Round 1 out of 10';

//Get computerSelection here
function computerPlay() {
    let obj = {
        1: 'rock',
        2: 'paper',
        3: 'scissors'
    };
    let num = Math.floor((Math.random() * 3) + 1);
    return obj[num];
};

//Play 1 round here
function playRound(playerSelection, computerSelection) {
    if (playerSelection === 'rock' && computerSelection === 'scissors' || playerSelection === 'paper' && computerSelection === 'rock' || playerSelection === 'scissors' && computerSelection === 'paper') {
        playerScoreNum++;
        roundNumber++;
        resultText.textContent = `You win! ${playerSelection} beats ${computerSelection}`;
        return resultText;
    } else if (playerSelection === 'rock' && computerSelection === 'paper' || playerSelection === 'paper' && computerSelection === 'scissors' || playerSelection === 'scissors' && computerSelection === 'rock') {
        computerScoreNum++;
        roundNumber++;
        resultText.textContent = `You lose! ${computerSelection} beats ${playerSelection}`;
        return resultText;
    } else {
        roundNumber++;
        resultText.textContent = 'It\'s a draw!';
        return resultText;
    };
};

//Get the playerSelection here
let playerSelection;

document.querySelector('#rock').onclick = function (e) {
    playerSelection = this.id;
};
document.querySelector('#paper').onclick = function (e) {
    playerSelection = this.id;
};
document.querySelector('#scissors').onclick = function (e) {
    playerSelection = this.id;
};

//Button press now activates the game
buttons.forEach((button) => {
    button.addEventListener('click', game)
});

//game gets computerSelection, compares it to playerSelection and returns the result text and updates scores. Watching for endgame.
function game() {
    let computerSelection = computerPlay();
    playRound(playerSelection, computerSelection);
    updateScores();
    if (roundNumber >= 10) {
        endGame();
    };
};

//Updating the scores in the table on top and the round number on each press
function updateScores() {
    playerScore.textContent = playerScoreNum;
    computerScore.textContent = computerScoreNum;
    finalText.textContent = `Round ${roundNumber} out of 10`;
}

//Play 10 rounds against computer, this gets the final score, prints the corresponding message and disables all game buttons, instead loading the reset button
function endGame() {
    document.querySelector('#rock').disabled = true;
    document.querySelector('#paper').disabled = true;
    document.querySelector('#scissors').disabled = true;
    reset.disabled = false;
    resultText.textContent = "It's all over!";
    if (playerScoreNum > computerScoreNum) {
        finalText.textContent = 'You have defeated the mighty machine.';
    } else if (playerScoreNum < computerScoreNum) {
        finalText.textContent = 'You have lost this battle, but the war is still to play for!';
    } else {
        finalText.textContent = 'You are evenly matched this time.';
    };
}

//when reset is clicked, runReset activates
reset.addEventListener('click', runReset);
//Scores go back to 0, rounds go back to 1 and buttons are enabled again
function runReset() {
    roundNumber = 1;
    playerScoreNum = 0;
    computerScoreNum = 0;
    resultText.textContent = "Make your selection";
    updateScores();
    document.querySelector('#rock').disabled = false;
    document.querySelector('#paper').disabled = false;
    document.querySelector('#scissors').disabled = false;
    reset.disabled = true;
}

