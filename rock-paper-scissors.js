const getUserChoice = (userInput) => {
  if (userInput === "rock") {
    return userInput;
  } else if (userInput === "paper") {
    return userInput;
  } else if (userInput === "scissors") {
    return userInput;
  } else {
    console.log("Not valid");
  }
};
const getComputerChoice = () => {
  const randomNumber = Math.floor(Math.random() * 3);
  if (randomNumber === 0) {
    return "rock";
  } else if (randomNumber === 1) {
    return "paper";
  } else if (randomNumber === 2) {
    return "scissors";
  }
};
const determineWinner = (userChoice, computerChoice) => {
  if (userChoice === userChoice) {
    return "The game it's a tie";
  } else if (userChoice === "rock") {
    if (computerChoice === "scissors") {
      return "The computer wins!";
    }
  } else {
    return "User wins!";
  }
  if(userChoice === "scissors"){
    if(computerChoice === "rock"){
        return "The computer wins!";
    }else{
        return "User wins!";
    }
  }
};
    const play = () => {
        const userChoice = getUserChoice("paper");
        const computerChoice = getComputerChoice("rock");
        console.log("You threw" + userChoice);
        console.log("The computer threw" + computerChoice);
        console.log(determineWinner(userChoice, computerChoice));
}
play();
