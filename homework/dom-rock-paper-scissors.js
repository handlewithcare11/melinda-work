const maxRounds = 5;
let currentRoundNumber = 0;
let previousResult = -2;


const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        let playerSelection;
        if(button.id == "rock") playerSelection = "Rock";
        if(button.id == "paper") playerSelection = "Paper";
        if(button.id == "scissors") playerSelection = "Scissors";
        
        if(currentRoundNumber < maxRounds || previousResult == 0) {
            updateRoundNumber();
            previousResult = playRound(playerSelection);
        } 
        
        if(currentRoundNumber == maxRounds && (previousResult == 1 || previousResult == -1)) {
            gameOver();
            previousResult = -3;
        }
    });
});

function playRound(playerSelection) 
{
    let computerSelection = computerPlay();
    const roundResults = document.querySelector('#roundresults');
    const playerScoreNumber = document.querySelector('#playerscorenumber');
    const computerScoreNumber = document.querySelector('#computerscorenumber');

    updateImage('player', playerSelection);
    updateImage('computer', computerSelection);


    if(playerSelection == computerSelection) 
    {
        roundResults.textContent = `It's a tie... Try again.`;
        return 0;
    }
    else if( (playerSelection == "Rock" && computerSelection == "Scissors") || 
             (playerSelection == "Paper" && computerSelection == "Rock") || 
             (playerSelection == "Scissors" && computerSelection == "Paper") ) 
    {
        roundResults.textContent = `You Win This Round! ${playerSelection} beats ${computerSelection}.`;
        playerScoreNumber.textContent = parseInt(playerScoreNumber.textContent) + 1;
        return 1;
    }
    else 
    {
        roundResults.textContent = `You Lose This Round! ${computerSelection} beats ${playerSelection}.`
        computerScoreNumber.textContent = parseInt(computerScoreNumber.textContent) + 1;
        return -1;
    }
}

function computerPlay()
{
    let numericalChoice = Math.floor(Math.random() * 3);
    let finalChoice = null;

    switch(numericalChoice)
    {
        case 0:
            finalChoice = "Rock";
            break;
        case 1:
            finalChoice = "Paper";
            break;
        case 2:
            finalChoice = "Scissors";
            break;
        default:
            break;
    }

    return finalChoice;
}

function updateImage(user, selection) {
    let ourImage;
    if(user == 'player')
        ourImage = document.querySelector('#playerchoiceimage');
    else if(user == 'computer')
        ourImage = document.querySelector('#computerchoiceimage');
    else
        return;

    if(selection == "Rock")
        ourImage.style.backgroundImage = "url(../homework/rock.jpg)";
    else if(selection == "Paper")
        ourImage.style.backgroundImage = "url(../homework/paper.jpg)";
    else if(selection == "Scissors")
        ourImage.style.backgroundImage = "url(../homework/scissors.jpg)";
}

function updateRoundNumber() {
    const roundNumber = document.querySelector('#roundnumber');
    
    if(previousResult < -1 || previousResult > 1) {
        currentRoundNumber = 1;
        roundNumber.textContent = "ROUND 1";
    }
    else if(previousResult == 0) {
        return;
    }
    else {
        currentRoundNumber++;
        roundNumber.textContent = `ROUND ${currentRoundNumber}`;
    }
}

function gameOver() {
    const playerScoreNumber = document.querySelector('#playerscorenumber');
    const computerScoreNumber = document.querySelector('#computerscorenumber');
    const roundResults = document.querySelector('#roundresults');


    let playerScore = parseInt(playerScoreNumber.textContent);
    let computerScore = parseInt(computerScoreNumber.textContent);

    if(playerScore == computerScore)
        roundResults.textContent += `\n\n GAME OVER... It's a tie!?`;
    else if(playerScore < computerScore)
        roundResults.textContent += `\n\n GAME OVER... You lost...`;
    else if(playerScore > computerScore)
        roundResults.textContent += `\n\n GAME OVER... You won!!`

}