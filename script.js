const questions = [
  {
    question: "which is the largest animal in the world?",
    answers: [
      { text: "shark", correct: false },
      { text: "Blue whale", correct: true },
      { text: "Elephant", correct: false },
      { text: "Giraffe", correct: false },
    ],
  },
  {
    question: "what is the capital of india?",
    answers: [
      { text: "Delhi", correct: true },
      { text: "Patna", correct: false },
      { text: "Odisha", correct: false },
      { text: "Bengaluru", correct: false },
    ],
  },
  {
    question: "which is the largest desert in india?",
    answers: [
      { text: "sahara", correct: false },
      { text: "desert", correct: false },
      { text: "Thar", correct: true },
      { text: "ladakh", correct: false },
    ],
  },
  {
    question: "which is the mind of computer?",
    answers: [
      { text: "CPU", correct: true },
      { text: "GPU", correct: false },
      { text: "Desktop", correct: false },
      { text: "CHIP", correct: false },
    ],
  },
];
const questionElement = document.getElementById("question");
const answerbutton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startquiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetstate();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerbutton.appendChild(button);
    if(answer.correct){
      button.dataset.correct= answer.correct;
    }
    button.addEventListener("click",selectAnswer);
  });
}

function resetstate() {
  nextButton.style.display = "none";
  while (answerbutton.firstChild) {
    answerbutton.removeChild(answerbutton.firstChild);
  }
}
function selectAnswer(e){
  const selectedBtn =e.target;
  const isCorrect =selectedBtn.dataset.correct ==="true";
  if(isCorrect){
    selectedBtn.classList.add("correct");
    score++;
  }else{
    selectedBtn.classList.add("Incorrect");
  }
  Array.from(answerbutton.children).forEach(button=>{
    if(button.dataset.correct ==="true"){
      button.classList.add("correct");
    }
    button.disabled=true;
  });
  nextButton.style.display="block";
}

function showScore(){
  resetstate();
  questionElement.innerHTML=`You Scored ${score} out of ${questions.length}.`;
  nextButton.innerHTML="Play Again";
  nextButton.style.display ="block";
}


function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex<questions.length){
    showQuestion();
  }else{
    showScore();
  }
}

nextButton.addEventListener("click",()=>{
  if(currentQuestionIndex<questions.length){
    handleNextButton();
  }else{
    startquiz();
  }
})
startquiz();
