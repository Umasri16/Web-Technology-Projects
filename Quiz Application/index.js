let quiz_body=document.getElementById("quiz-body")
let quiz_qstn=document.getElementById("quiz-qstn")
let radio_cont=document.getElementById("radio-cont")
let header_row=document.getElementById("header-row")
let body_cont=document.getElementById("body-cont")
let result_container=document.getElementById("result-container")
let result_text=document.getElementById("result-text")
let score=document.getElementById("score")
let next_qstn=document.getElementById("next-qstn")
let body=document.body
let userNameForm = document.getElementById("user-name-form");
let userNameInput = document.getElementById("userName");
let startQuizButton = document.getElementById("start-quiz");
let quiz_user_name=document.getElementById("quiz-user-name");
let  quizTimer = document.getElementById("quiz-timer");
let timer_span=document.getElementById("timer-span");
const progressBar = document.querySelector('.progress-bar');


let minutes = 15;
let seconds = 0;
let timerInterval;

function updateTimer(){
    if (minutes === 0 && seconds === 0) {
        clearInterval(timerInterval);
        showResult();
      }
      else{
        if (seconds === 0) {
            minutes--;
            seconds = 59;
          } else {
            seconds--;
          }
    timer_span.textContent=`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      
      }
}

header_row.style.visibility="hidden"
body_cont.style.display = "none";
 startQuizButton.addEventListener('click', function(event) {
     event.preventDefault(); 

    let userName = userNameInput.value;

    header_row.style.visibility = "visible";
    body_cont.style.display = "block";


     let welcomeMessage = quiz_user_name
     welcomeMessage.textContent = "Welcome, " + userName;
     shuffleQuestions();
     displayQuestion();

    userNameForm.style.display = "none";
    timerInterval = setInterval(updateTimer, 1000);
 });
 const quizData = [
    {
        question: "What is the capital of France?",
        options: ["New York", "London", "Paris", "Dublin"],
        answer: "Paris"
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent Van Gogh", "Pablo Picasso", "Leonardo Da Vinci", "Claude Monet"],
        answer: "Leonardo Da Vinci"
    },
    {
        question: "What is the largest planet in our solar system?",
        options: ["Mars", "Earth", "Saturn", "Jupiter"],
        answer: "Jupiter"
    },
    {
        question: "How many continents are there on Earth?",
        options: ["5", "6", "7", "8"],
        answer: "7"
    },
    {
        question: "What is the chemical symbol for gold?",
        options: ["Ag", "Fe", "Au", "Hg"],
        answer: "Au"
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["Mark Twain", "William Shakespeare", "Jane Austen", "Charles Dickens"],
        answer: "William Shakespeare"
    },
    {
        question: "What is the smallest prime number?",
        options: ["1", "2", "3", "4"],
        answer: "2"
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["Lion", "Elephant", "Blue Whale", "Giraffe"],
        answer: "Blue Whale"
    },
    {
        question: "Which gas do plants absorb from the atmosphere?",
        options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Helium"],
        answer: "Carbon Dioxide"
    },
    {
        question: "What is the boiling point of water in Celsius?",
        options: ["100°C", "0°C", "50°C", "75°C"],
        answer: "100°C"
    },
    
];
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
function shuffleQuestions() {
    shuffleArray(quizData);
  }




let currentQuestionIndex =0;
let userScore=0;

function displayQuestion(){
    const currentQuestion=quizData[currentQuestionIndex]
    quiz_qstn.textContent=currentQuestion.question;
    radio_cont.innerHTML = '';
    currentQuestion.options.forEach(function(option,index){
        let id=`option${index}`;
        const inpElement=document.createElement("input");
        inpElement.setAttribute("type","radio");
        inpElement.setAttribute("name","quizOption")
        inpElement.id = id;
        radio_cont.appendChild(inpElement)
        inpElement.addEventListener("change", function() {
            checkAnswer(labelElement);
        });
        
         const labelElement=document.createElement("label")
         labelElement.classList.add("radio-style")
         labelElement.setAttribute("for",id)
         labelElement.textContent=option;
         radio_cont.appendChild(labelElement)

        const brElement=document.createElement("br")
        radio_cont.appendChild(brElement)
        
        
    })


}

function checkAnswer(labelElement) {
    const currentQuestion = quizData[currentQuestionIndex];
    if(currentQuestion.answer === labelElement.textContent){
        userScore++;
    }
    nextQuestion();
    

    }
function showResult(){
    header_row.style.display="none" 
    body_cont.style.display="none"
    result_container.style.display="block"
    body.style.background = "#8052ec";
    result_text.textContent="Quiz Completed !";
    score.textContent=`Your Score: ${userScore} out of ${quizData.length}`;
}
const totalQuestions = quizData.length;  
function updateProgressBar() {
    const progress = (currentQuestionIndex / totalQuestions) * 100;
    progressBar.style.width = `${progress}%`;
    progressBar.setAttribute('aria-valuenow', progress);
  }
  
    
function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < quizData.length) {
        displayQuestion();
    } 
    else {
        showResult();
    }
    updateProgressBar();
}
next_qstn.addEventListener('click', () => nextQuestion());
updateProgressBar();

displayQuestion()