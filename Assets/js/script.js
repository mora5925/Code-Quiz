// Variable for all the questions and answers
var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
      },
      {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
      },
      {
        title: "Arrays in JavaScript can be used to store ____.",
        choices: [
          "numbers and strings",
          "other arrays",
          "booleans",
          "all of the above"
        ],
        answer: "all of the above"
      },
      {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parentheses"],
        answer: "quotes"
      },
      {
        title: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
        answer: "console.log"
      }
];

var timer;
var questionsIndex = 0;

// other vaiables for DOM
var headContentEl = document.getElementById("headContent");
var timerEl = document.getElementById("timer");
var startBtn = document.getElementById("start");
var questionsEl = document.getElementById("questions");
var choicesEl = document.getElementById("questionsChoices");
choicesEl.setAttribute("class", "hideContent");
var finalScoreEl = document.getElementById("final-score");
var endSession = document.getElementById("end-screen");
endSession.setAttribute("class", "hideContent");
var initialsEl = document.getElementById("nameInitials");
var submitScoreBtn = document.getElementById("submit");
var scoreSheetEl = document.getElementById("ScoreSheet");
var scoreListEl = document.getElementById("highscores");
var answerEl = document.getElementById("checkAnswer");
var clearScoreBtn = document.getElementById("clear");
var viewHighscoresEl = document.getElementById("viewHighscores");
var welcomeScreenEl = document.getElementById("welcomeScreen");

// Start quiz function
function startQuiz() {
    // Hide welcome Screen
    welcomeScreenEl.style.display = "none";
    choicesEl.removeAttribute("class", "hideContent");
    // Start Timer
    timer = 75;
    timerEl.textContent = timer;
    var timerCountDown = setInterval(function () {
      if (questionsIndex != questions.length -1){
        timer --;
      }
        timerEl.textContent = timer;
        // If time reaches 0
        if (timer <= 0) {
            clearInterval(timerCountDown);
            endQuiz();
        }
        // if (hideEl == 3){
        //   document.getElementById("checkAnswer").style.display ="none";
        // } else  {
        //   hideEl ++;
        //   document.getElementById("checkAnswer").style.display ="block";
        // }

    },1000);

    // Start the questions
    startQuestions();
};

// End Quiz function
function endQuiz () {
    questionsEl.style.display = "none";
    var endSession = document.getElementById("end-screen");
    endSession.removeAttribute("class", "hideContent");
    finalScoreEl.textContent = timer;


}

// Correct answer function
function correct() {
  answerEl.textContent = "Correct answer";
  if (questionsIndex == questions.length -1){
    setTimeout(endQuiz, 1000); 
  } else {
    setTimeout(() => {
    questionsIndex ++;
    choicesEl.textContent = "";
    answerEl.textContent = "";
    startQuestions()

    }, 1000);
    
      }
};

// Incorrect answer function
function incorrect() {
  answerEl.textContent = "Incorect answer";
  if (questionsIndex == questions.length -1){
    setTimeout(endQuiz, 1000);
  } else {
    timer -= 15;
    setTimeout(() => {
      questionsIndex ++;
    choicesEl.textContent = "";
    answerEl.textContent = "";
    startQuestions()

    }, 1000);
    
  }
};

// Questions starting function
function startQuestions() {
 
    var currentQuestion = questions[questionsIndex];
    // Adding the question title
    var titelEl = document.getElementById("questionsTitle");
    titelEl.textContent = currentQuestion.title;

    for (var i = 0; i < currentQuestion.choices.length; i++) {
      var qChoices = document.createElement("button");
      var listItem = document.createElement("li");
      if (currentQuestion.answer == currentQuestion.choices[i]) {
        qChoices.addEventListener("click", correct)
        
      } else {
        qChoices.addEventListener("click", incorrect)
      }

      qChoices.textContent = currentQuestion.choices[i];
      listItem.appendChild(qChoices);
      choicesEl.appendChild(listItem);
    }

};

// Saving the Highscores
function highScore() {
  var score = {
    id: initialsEl.value,
    scores: timer
  };
  var savedScores = JSON.parse(localStorage.getItem("savedScores")) || [];

    savedScores.push(score);
    localStorage.setItem("savedScores", JSON.stringify(savedScores));

  highScoreList();
};

// Showing the highscore List
function highScoreList() {
  headContentEl.setAttribute("class", "hideContent");
  endSession.setAttribute("class", "hideContent");
  scoreSheetEl.removeAttribute("class", "hideContent");
  choicesEl.setAttribute("class", "hideContent");
  welcomeScreenEl.style.display = "none";

createHighscoreList(fetchSavedScores());
}

// To clear the local storage
function clearHighscores() {
  localStorage.clear();
  scoreListEl.innerHTML = "";
};

function fetchSavedScores() {
  return JSON.parse(localStorage.getItem("savedScores")) || [];
}

// View Highscore link
function createHighscoreList (savedScores) {
  for (var i = 0; i < savedScores.length; i++) {
    var scoreItem = document.createElement("li");
    scoreItem.innerHTML = savedScores[i].id + " score is " + savedScores[i].scores;
    scoreListEl.appendChild(scoreItem);
  }
};

// Event Listeners
startBtn.onclick = startQuiz;
submitScoreBtn.onclick = highScore;
clearScoreBtn.onclick = clearHighscores;
viewHighscoresEl.onclick = highScoreList;