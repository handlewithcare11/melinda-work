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
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
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
const levels = document.querySelector('.levels');
const main = document.querySelector('.quiz-wrapper');
const categoryBtn = document.querySelector('.cat-btn');
const quizMain = document.querySelector('.quiz-main');

$('.cat-btn').on('click', () => {
    $('.levels').show();
    $('.quiz-wrapper').hide();
});

//------Main Quiz------------------------------------------------------------------------------------
$('.levelsbtn').on('click', () => {
    $('.quiz-main').show();
    $('.levels').hide();
})

const apiURLQuestions = "http://localhost:3000/questions";
const levelBtn = document.getElementsByClassName('.levelsbtn');

// loads all questions
function loadAllQuestions() {
    fetch(apiURLQuestions)
        .then(response => { console.log(response.json()) })
        .then(json => displayQuestions(json))
        .catch(error => console.log('Error: ' + error));
}
loadAllQuestions();

const questionsContainer = document.querySelector(".quiz-content");
const questionDisplayed = document.querySelector('#question-displayed');
const choiceOne = document.querySelector('#choice1');
const choiceTwo = document.querySelector('#choice2');
const choiceThree = document.querySelector('#choice3');
const choiceFour = document.querySelector('#choice4');
const nextQuestion = document.querySelector('.next');

function displayQuestions() {
    const questions = fetch(apiURLQuestions);
    questions.then(response => {
        return response.json();
    }).then(json => {
        const questions = json.data;
        const html = questions.map(question => {
            return `
                <div class="quiz-content">
                <div class="question-title">
                    <h1>Question: </h1>
                    <p id="question-displayed">${question.question}</p>
                </div>
                <div class="question-options">
                    <div class="choices">
                        <button class="choice-btn" id="choice1">${questions.choices[0]}</button>
                        <button class="choice-btn" id="choice2">${questions.choices[1]}</button>
                        <button class="choice-btn" id="choice3">${questions.choices[2]}</button>
                        <button class="choice-btn" id="choice4">${questions.choices[3]}</button>
                    </div>
                    <button class="next">Next Question</button>
                </div>
            </div>
            `
        }).join('');
        questionsContainer.innerHTML = html;
        const choiceOne = document.querySelector('#choice1');
        const choiceTwo = document.querySelector('#choice2');
        const choiceThree = document.querySelector('#choice3');
        const choiceFour = document.querySelector('#choice4');
        const nextQuestion = document.querySelector('.next');
        nextQuestion.addEventListener('click', () => {
            if (questionIndex < length - 1) {
                questionIndex++;
                const question = questions[questionIndex];
                questionDisplayed.innerHTML = `
                    <p id="question-displayed">${question.question}</p>
                    `;
                choiceOne.innerHTML = `
                    <button class="choice-btn" id="choice1">${question.choices[0,'isCorrect']}</button>
                    `;
                choiceTwo.innerHTML = `
                    <button class="choice-btn" id="choice2">${question.choices[1]}</button>
                    `;
                choiceThree.innerHTML = `
                    <button class="choice-btn" id="choice3">${question.choices[2]}</button>
                    `;
                choiceFour.innerHTML = `
                    <button class="choice-btn" id="choice4">${question.choices[3]}</button>
                    `;
            } else {
                const endGame = document.createElement('div');
                endGame.innerHTML = `
                        <h1>All Done!</h1>
                        <p>The correct answer was: ${questions[questionIndex].correctAnswer}</p>
                        <button class="restart">Play Again</button>
                        `;
                questionsContainer.innerHTML = '';
                questionsContainer.appendChild(endGame);
                const restart = document.querySelector('.restart');
                restart.addEventListener('click', () => {
                    location.reload();
                });
          }
        });

    }

 )}

 