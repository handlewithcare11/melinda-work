//--dark mode--------------------------------------------------------------------------------
const body = document.querySelector("body");
const toggle = document.querySelector("#toggle");
const sunIcon = document.querySelector(".toggle .bxs-sun");
const moonIcon = document.querySelector(".toggle .bx-moon");
const login = null;

toggle.addEventListener("change", () => {

    body.classList.toggle("dark");
    sunIcon.className = sunIcon.className == "bx bxs-sun" ? "bx bx-sun" : "bx bxs-sun";
    moonIcon.className = moonIcon.className == "bx bxs-moon" ? "bx bx-moon" : "bx bxs-moon";

});

$(toggle - login).click(function () {
    $('#login').toggle();
});

//--login/register-------------------------------------------------------------------------------
const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const loginbtn = document.querySelector('.loginbtn');
const iconClose = document.querySelector('.icon-close');


registerLink.addEventListener('click', () => {
    wrapper.classList.add('active-register');
});

loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active-register');
});

loginbtn.addEventListener('click', () => {
    wrapper.classList.add('active-login');
});

iconClose.addEventListener('click', () => {
    wrapper.classList.remove('active-login');
});

$('#submit').click(function () {
    $('.wrapper').hide();
});
//---contact form/feedback----------------------------------------------------------------------------
$('.show-form').on('click', () => {
    $('#contact-wrapper').show();
});

$('.icon-close-feedback').on('click', () => {
    $('#contact-wrapper').hide();
});

$('.show-form').on('click', () => {
    $('.wrapper').hide();
});

$('.loginbtn').on('click', () => {
    $('#contact-wrapper').hide();
});

$('.loginbtn').on('click', () => {
    $('.wrapper').toggle();
});

//----Difficulty level---------------------------------------------------------------------------------
// const levels = document.querySelector('.levels');
// const main = document.querySelector('.quiz-wrapper');
// const categoryBtn = document.querySelector('.cat-btn');
// const quizMain = document.querySelector('.quiz-main');

// $('.cat-btn').on('click', () => {
//     $('.levels').show();
//     $('.quiz-wrapper').hide();
// });

// //------Main Quiz------------------------------------------------------------------------------------
// $('.levelsbtn').on('click', () => {
//     $('.quiz-main').show();
//     $('.levels').hide();
// })

// const apiURLQuestions = "http://localhost:3000/questions";
// const levelBtn = document.getElementsByClassName('.levelsbtn');

// // loads all questions
// function loadAllQuestions() {
//     fetch(apiURLQuestions)
//         .then(response => { console.log(response.json()) })
//         .then(json => displayQuestions(json))
//         .catch(error => console.log('Error: ' + error));
// }
// loadAllQuestions();

// const questionsContainer = document.querySelector(".quiz-content");
// const questionDisplayed = document.querySelector('#question-displayed');
// const choiceOne = document.querySelector('#choice1');
// const choiceTwo = document.querySelector('#choice2');
// const choiceThree = document.querySelector('#choice3');
// const choiceFour = document.querySelector('#choice4');
// const nextQuestion = document.querySelector('.next');


// function displayQuestions(){
//     questionsContainer.innerHTML = "";

// }


// ------ Main Quiz ---------------------------------------------------------------------------------
const CATEGORIES = [
    {
        textContent: "Film & TV",
        value: "film_and_tv",
    },
    {
        textContent: "Food & Drink",
        value: "food_and_drink",
    },
    {
        textContent: "General",
        value: "general_knowledge",
    },
    {
        textContent: "Geography",
        value: "geography",
    },
    {
        textContent: "History",
        value: "history",
    },
    {
        textContent: "Music",
        value: "music",
    },
    {
        textContent: "Science",
        value: "science",
    },
    {
        textContent: "Sport & Leisure",
        value: "sport_and_leisure",
    },
];
const TRIVIA_API_URL_BASE = "https://the-trivia-api.com/api/questions?";

//------------- variables for monitoring current state
let activeCategory;
let activeQuestionsNumber;
let activeDifficulty;
let allQuestions;
let currentQuestionNumber = 0;

const validation = {
    isCategoryChoosen: false,
    isDifficultyChoosen: false,
    isNumberOfQuestionsChoosen: false,
};

//---------------- options 
const categoryButtons = document.querySelector("#categories").children;
const categoryButtonsContainer = document.querySelector("#categories");
const questionsNumberButtons =
    document.querySelector("#questions-number").children;
const difficultyButtons = document.querySelector("#difficulties").children;

//----------------- controls buttons
const startGameButton = document.querySelector("#start-game");
const resetButton = document.querySelector("#reset");
const nextQuestionButton = document.querySelector("#next-question");
const backToMenuButton = document.querySelector("#back-to-menu");
const finishButton = document.querySelector("#finish");
const tryAgainButton = document.querySelector("#try-again");
const resultMenuButton = document.querySelector("#result-menu");

//------------------ containers
const menuContainer = document.querySelector("#menu");
const gameContainer = document.querySelector("#game");
const questionMarkersContainer = document.querySelector("#question-markers");
const answersContainer = document.querySelector("#answers");
const tint = document.querySelector("#tint");
const backdrop = document.querySelector("#backdrop");
const resultMarkersContainer = document.querySelector("#result-markers");

//-------------------- text elements
const questionTitle = document.querySelector("#question");
const errorSpan = document.querySelector("#error");
const mainTitle = document.querySelector("#main-title");
const resultValue = document.querySelector("#result");

// images
const throphyImg = document.querySelector("#throphy");
const laurelImg = document.querySelector("#laurel-leaves");

//---------- adding all category buttons to document
const setup = () => {
    for (const category of CATEGORIES) {
        const currentButton = document.createElement("button");
        currentButton.classList.add("menu-button");
        currentButton.setAttribute("value", category.value);
        currentButton.textContent = category.textContent;
        categoryButtonsContainer.appendChild(currentButton);
    }
};

setup();

//--------- category buttons event listeners setup
for (const category of categoryButtons) {
    category.addEventListener("click", () => {
        activateButton(category, "category", activeCategory, categoryButtons);
    });
}

//---------- number of questions buttons event listeners setup
for (const questionsNumber of questionsNumberButtons) {
    questionsNumber.addEventListener("click", () => {
        activateButton(
            questionsNumber,
            "number",
            activeQuestionsNumber,
            questionsNumberButtons
        );
    });
}
//---------- difficulty buttons event listeners setup
for (const difficulty of difficultyButtons) {
    difficulty.addEventListener("click", () => {
        activateButton(difficulty, "diff", activeDifficulty, difficultyButtons);
    });
}

resetButton.addEventListener("click", () => {
    resetOptions();
});

startGameButton.addEventListener("click", () => {
    startGame();
});

// highlighting active option button
const activateButton = (target, buttonType, currentValue, buttons) => {
    const targetValue = target.getAttribute("value");
    if (currentValue !== undefined && targetValue === currentValue) {
        setCurrentOption(buttonType, undefined, false);
        target.classList.remove("active");
        validationProxy.get();
        return;
    }
    target.classList.add("active");
    setCurrentOption(buttonType, targetValue, true);
    for (const button of buttons) {
        if (button.getAttribute("value") === targetValue) {
            continue;
        }
        button.classList.remove("active");
    }
    validationProxy.get();
};

const setCurrentOption = (buttonType, value, isValid) => {
    if (buttonType === "category") {
        activeCategory = value;
        validation.isCategoryChoosen = isValid;
    } else if (buttonType === "diff") {
        activeDifficulty = value;
        validation.isDifficultyChoosen = isValid;
    } else {
        activeQuestionsNumber = value;
        validation.isNumberOfQuestionsChoosen = isValid;
    }
};

// reseting all choosen options(category, number of questions, difficulty)
const resetOptions = () => {
    activeCategory = undefined;
    activeQuestionsNumber = undefined;
    activeDifficulty = undefined;
    const allActiveButtons = document.querySelectorAll(".active");
    for (const button of allActiveButtons) {
        button.classList.remove("active");
    }
    clearValidation();
    validationProxy.get();
};

// starting game(sending api request, setting first question)
const startGame = () => {
    setupGame();
};

// validating options
const validateOptions = {
    get(target) {
        console.log("in", target);
        if (
            target.isCategoryChoosen &&
            target.isDifficultyChoosen &&
            target.isNumberOfQuestionsChoosen
        ) {
            startGameButton.classList.remove("start-game-inactive");
            startGameButton.classList.add("start-game");
        } else {
            startGameButton.classList.remove("start-game");
            startGameButton.classList.add("start-game-inactive");
        }
    },
};

const clearValidation = () => {
    validation.isCategoryChoosen = false;
    validation.isDifficultyChoosen = false;
    validation.isNumberOfQuestionsChoosen = false;
};

const validationProxy = new Proxy(validation, validateOptions);

// sending api request to Trivia API
const sendApiRequest = async (category, difficulty, questionsNumber) => {
    const response = await fetch(
        `${TRIVIA_API_URL_BASE}limit=${questionsNumber}&categories=${category}&difficulty=${difficulty}`,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    const data = await response.json();
    if (!response.ok) {
        throw new Error("Questions didnt fetch properly!");
    }
    console.log(data);
    return data;
};

// setting up game (hidding menu, showing game itself, setting up first question, setting up markers)
const setupGame = async () => {
    const data = await sendApiRequest(
        activeCategory,
        activeDifficulty,
        activeQuestionsNumber
    );
    questionMarkersContainer.innerHTML = "";
    allQuestions = data;
    menuContainer.classList.add("hidden");
    gameContainer.classList.remove("hidden");
    mainTitle.classList.add("hidden");
    setupQuestion(allQuestions[currentQuestionNumber]);
    setupMarkers(activeQuestionsNumber);
};

const setupMarkers = (questionsNumber) => {
    for (let i = 0; i < questionsNumber; i++) {
        const currentMarker = document.createElement("div");
        currentMarker.classList.add("marker");
        currentMarker.setAttribute("id", `marker${i}`);
        questionMarkersContainer.appendChild(currentMarker);
    }
};

// setting up question and answers to that question
const setupQuestion = (question) => {
    nextQuestionButton.classList.add("hidden");
    questionTitle.textContent = question.question;
    let answers = question.incorrectAnswers;
    const correctAnswerTargetIndex = randomizeCorrectAnswerPlace();
    answers.push(question.correctAnswer);
    changeCorrectAnswerPosition(correctAnswerTargetIndex, answers);
    setupAnswers(answers, correctAnswerTargetIndex);
};

const setupAnswers = (answers, correctAnswerIndex) => {
    answersContainer.innerHTML = "";
    for (let i = 0; i < answers.length; i++) {
        const button = document.createElement("button");
        button.setAttribute("id", `answer${i}`);
        const text = document.createElement("p");
        button.appendChild(text);
        if (i === correctAnswerIndex) {
            button.classList.add("correct");
        } else {
            button.classList.add("incorrect");
        }
        button.addEventListener("click", () => {
            answerButtonListener(button, correctAnswerIndex);
        });
        const answer = answers[i];
        text.textContent = answer;
        answersContainer.appendChild(button);
    }
};

const answerButtonListener = (button, correctAnswerIndex) => {
    for (const button of answersContainer.children) {
        button.classList.add("answer-after");
    }
    const currentMarker = document.querySelector(
        `#marker${currentQuestionNumber}`
    );
    if (button.getAttribute("id") === `answer${correctAnswerIndex}`) {
        setTimeout(() => {
            currentMarker.classList.add("correct-marker");
        }, 100);
    } else {
        setTimeout(() => {
            currentMarker.classList.add("incorrect-marker");
        }, 100);
    }
    setTimeout(() => {
        if (currentQuestionNumber + 1 === +activeQuestionsNumber) {
            finishButton.classList.remove("hidden");
        } else {
            nextQuestionButton.classList.remove("hidden");
        }
    }, 100);
};

const randomizeCorrectAnswerPlace = () => {
    return Math.floor(Math.random() * 4);
};

const changeCorrectAnswerPosition = (correctAnswerTargetIndex, answers) => {
    const tempValue = answers[correctAnswerTargetIndex];
    answers[correctAnswerTargetIndex] = answers[3];
    answers[3] = tempValue;
    return answers;
};

// game controls event listeners setup
nextQuestionButton.addEventListener("click", () => {
    currentQuestionNumber++;
    setupQuestion(allQuestions[currentQuestionNumber]);
});

backToMenuButton.addEventListener("click", () => {
    backToMenuEventListener();
});

const backToMenuEventListener = () => {
    menuContainer.classList.remove("hidden");
    gameContainer.classList.add("hidden");
    mainTitle.classList.remove("hidden");
    clearValidation();
    activeCategory = undefined;
    activeDifficulty = undefined;
    activeQuestionsNumber = undefined;
    allQuestions = [];
    currentQuestionNumber = 0;
    const allActiveButtons = document.querySelectorAll(".active");
    for (const button of allActiveButtons) {
        button.classList.remove("active");
    }
    questionMarkersContainer.innerHTML = "";
    answersContainer.innerHTML = "";
    resultMarkersContainer.innerHTML = "";
    validationProxy.get();
};

finishButton.addEventListener("click", () => {
    setResultInfo();
    showResultWindow();
});

const showResultWindow = () => {
    // tint.classList.add("tint-animation");
    backdrop.classList.add("backdrop-animation");
    throphyImg.classList.add("throphy-after");
    laurelImg.classList.add("laurel-leaves-after");
};

const setResultInfo = () => {
    const markers = questionMarkersContainer.children;
    const markerCopies = [];
    for (const marker of markers) {
        const clone = marker.cloneNode(true);
        markerCopies.push(clone);
    }
    const correctsNumber = document.querySelectorAll(".correct-marker").length;
    for (const marker of markerCopies) {
        resultMarkersContainer.appendChild(marker);
    }
    resultValue.textContent = `${correctsNumber} / ${markers.length}`;
};

tryAgainButton.addEventListener("click", () => {
    currentQuestionNumber = 0;
    finishButton.classList.add("hidden");
    resultMarkersContainer.innerHTML = "";

    setupGame();
    hideResultWindow();
});

resultMenuButton.addEventListener("click", () => {
    hideResultWindow();
    finishButton.classList.add("hidden");
    backToMenuEventListener();
});

const hideResultWindow = () => {
    // tint.classList.remove("tint-animation");
    backdrop.classList.remove("backdrop-animation");
    throphyImg.classList.remove("throphy-after");
    laurelImg.classList.remove("laurel-leaves-after");
};

//  logged in 

// function postFetchForSignUp() {
//     let emailInput = document.querySelector(".email")
//     let passwordInput = document.querySelector(".password")
//     fetch('http://localhost:3000/users', { 
//         // make a post fetch request where we want to store our users
//       method: 'POST',
//       headers: {
//         'Content-Type':'application/json',
//         'Accept':'application/json'
//       },
//       body: JSON.stringify({
//         email: emailInput.value,
//         password: passwordInput.value
//       })
//     })
//     .then(res=>res.json())
//     .then(user => {
//       localStorage.clear() 
//       // if there was a user signed in, this will                                   
//       // clear it up
//       localStorage.id = user.id  // then we can store the id we got 
//       slapUser(user)
//       logOutButton()
//     })
//   }

//   const signInButton = document.querySelector(".btn");

//   signInButton.addEventListener('click', e => {
//     signInForm()
//     let form = signDiv.querySelector('.login')
//     let emailInput = document.querySelector(".email")
//     form.addEventListener('submit', e=>{
//       e.preventDefault()
//       fetch('http://localhost:3000/users') // make a get fetch    
//       // request where users are stored
//       .then(res=>res.json()) 
//       .then(usersArray => { 
//         let user = usersArray.find(function(user){ 
//             return user.email === emailInput.value 
//             // check if there is a user with a value given
//           })
//         if (user){
//           signDiv.innerHTML = ""
//           slapUser(user)
//           localStorage.id = user.id // if there is so, we then store it
//           logOutButton()
//           writeReview()
//         }
//       })
//     })
//   })

//   function logOutButton(){
//     let logOutButton = document.createElement("button")
//     logOutButton.className = "log-out-button"
//     logOutButton.innerText = "Log Out"
//     signDiv.append(logOutButton)
//     logOutButton.addEventListener('click', e=>{
//       localStorage.clear() 
//     })
//    }

