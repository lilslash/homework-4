const startButtonEl = document.getElementById('start_btn')
const nextButtonEl = document.getElementById('next-btn')
const questionCon =document.getElementById('question-container')
const questionEl = document.getElementById('Question')
const answerButtonsEl = document.getElementById('answer-btns')
const TimeCount = document.querySelector('.timer .timerSec')
const TimeEl = document.querySelector('.timerSec')
const ExitEl = document.getElementById('Exit-btn')
const initialsEl = document.getElementById('initials')
const submitEl = document.getElementById('submit')



let currentQuestion, Nextquestion;
let que_count = 0;
let que_num = 1;
let counter;
let timeValue = 180;
let EndTimeVal = TimeEl.textContent

submitEl.addEventListener('click', SaveHighscore)
startButtonEl.addEventListener('click', startGame)
ExitEl.addEventListener('click' ,EndGame)
nextButtonEl.addEventListener('click',() => {
    currentQuestion++
    nextQuestion()
    
})

function startGame() {
    console.log('started')
    Nextquestion = questions.sort()
    currentQuestion = 0
    startButtonEl.classList.add('hide');
    questionCon.classList.remove('hide');
    startTimer(timeValue)
    nextQuestion()
}

function nextQuestion() {
    resetstate()
showQuestion(Nextquestion[currentQuestion])
}

function showQuestion(question) {
questionEl.innerText = question.question
question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
    button.dataset.correct = answer.correct
    } 
    button.addEventListener('click', selectAnswer)
    answerButtonsEl.appendChild(button)
});
}

function selectAnswer(e) {
const selectedButton = e.target
const correct = selectedButton.dataset.correct


StatusClass(document.body, correct)
Array.from(answerButtonsEl.children).forEach(button => {
    StatusClass(button, button.dataset.correct)
})
if (Nextquestion.length > currentQuestion + 1) {
    nextButtonEl.classList.remove('hide')
} else {
    ExitEl.classList.remove('hide')
    // ExitEl.addEventListener('click', EndGame)
}
}

function resetstate(){
    nextButtonEl.classList.add('hide')
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild)
    }

}

function StatusClass(element, correct,) {
    clearStatusClass(element)
    if(correct){
        element.classList.add('correct')
    } 
    else {
        element.classList.add('wrong');
    }
}

function clearStatusClass (element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}
const questions = [
    {
        question: 'What is a loop structure in JavaScript?',
        answers: [
            {text: 'For', correct: true},
            {text: 'Let', correct: false},
            {text: 'Else', correct: false},
            {text: 'If', correct: false}
        ]
    },
    {
        question: 'Can you add css elements in JavaScript?',
        answers: [
            {text: 'No', correct: false},
            {text: 'Yes', correct: true}
        ]
    },
    {
        question: 'The conditon statements if/else is encolsed with?',
        answers: [
            {text: 'Qoutes', correct: false},
            {text: 'Curly Bracket', correct: true},
            {text: 'Square Brackets', correct: false},
            {text: 'Parentheses', correct: false}
        ]
    },
]

function startTimer(time) {
    counter  = setInterval(timer, 1000);
    function timer(){
TimeCount.textContent = time;
time --;
if(time < 0){
    EndGame()
    clearInterval(counter);
    TimeCount.textContent = "00";


}
    }
}
 function EndGame() {
    clearInterval(counter);
     const endScreenEl = document.getElementById("end-screen");
     questionEl.classList.add('hide');
     answerButtonsEl.classList.add('hide');
endScreenEl.removeAttribute('class');
ExitEl.classList.add('hide')
const finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = TimeEl.textContent;
 }

 function SaveHighscore() {
     var initials = initialsEl.value.trim();
if (initials !== ''){
    var highscores = JSON.parse(window.localStorage.getItem('highscores')) || [];
    
    var newScore = {
        score: TimeEl.textContent,
        initials: initials
    };
    highscores.push(newScore);
    window.localStorage.setItem("highscores",JSON.stringify(highscores))


}
console.log('initials are ', newScore)
 }
 