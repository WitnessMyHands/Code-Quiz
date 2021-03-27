// Variables to keep track of quiz state.
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

// Variables to reference DOM (Document Object Model) elements.
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");

// SFX; sound effects for Correct and Incorrect click choices.
var sfxRight = new Audio("assets/sfx/correct.wav");
var sfxWrong = new Audio("assets/sfx/incorrect.wav");

function startQuiz() {
  // Hides start screen.
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");

  // Un-hides questions section.
  questionsEl.removeAttribute("class");

  // Starts timer.
  timerId = setInterval(clockTick, 1000);

  // Shows starting time.
  timerEl.textContent = time;

  getQuestion();
}

function getQuestion() {
  // Get current question object from array.
  var currentQuestion = questions[currentQuestionIndex];

  // Update title with current question.
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;

  // Clear old question choices.
  choicesEl.innerHTML = "";

  // Loop over choices.
  currentQuestion.choices.forEach(function(choice, i) {
    // Create new button for each choice.
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);

    // Adds number before each choice.
    choiceNode.textContent = i + 1 + ". " + choice;

    // Attach click event listener to each choice.
    choiceNode.onclick = questionClick;

    // Display on the page.
    choicesEl.appendChild(choiceNode);
  });
}

function questionClick() {
  // Check if user guessed wrong.
  if (this.value !== questions[currentQuestionIndex].answer) {
    // Penalize time; removes seconds from timer.
    time -= 10;

    if (time < 0) {
      time = 0;
    }

    // Display adjusted time on page.
    timerEl.textContent = time;

    // Plays "wrong" sound effect.
    sfxWrong.play();

    feedbackEl.textContent = "Wrong!";
  } else {
    // Plays "right" sound effect.
    sfxRight.play();

    feedbackEl.textContent = "Correct!";
  }

  // Flash right/wrong feedback on page for a second.
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 2000);

  // Move to next question.
  currentQuestionIndex++;

  // Check if we've run out of questions.
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {
  // Stops timer.
  clearInterval(timerId);

  // Show end screen.
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

  // Show final score.
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  // Hide questions section.
  questionsEl.setAttribute("class", "hide");
}

function clockTick() {
  // Update time.
  time--;
  timerEl.textContent = time;

  // Check if user ran out of time.
  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {
  // Get value of input box.
  var initials = initialsEl.value.trim();

  // Make sure value is not empty.
  if (initials !== "") {
    // Retrieve saved scores from localstorage, or if none, set to empty array.
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    // Format new score object for current user.
    var newScore = {
      score: time,
      initials: initials
    };

    // Save to localstorage.
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    // Redirect to next page.
    window.location.href = "highscores.html";
  }
}

function checkForEnter(event) {
  // "13" represents the enter key.
  if (event.key === "Enter") {
    saveHighscore();
  }
}

// User clicks button to submit initials.
submitBtn.onclick = saveHighscore;

// User clicks button to start quiz.
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;
