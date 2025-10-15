const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");
const finishBtn = document.getElementById("finish-btn");
const questionBox = document.getElementById("question-box");
const options = document.querySelectorAll(".option");
const message = document.getElementById("message");
const qTimerDisplay = document.getElementById("question-timer");
const totalTimerDisplay = document.getElementById("overall-timer");
const scoreDisplay = document.getElementById("score");
const progressBar = document.getElementById("progress");
const modal = document.getElementById("result-modal");
const resultTitle = document.getElementById("result-title");
const resultScore = document.getElementById("result-score");
const closeModal = document.getElementById("close-modal");

let questions = [
  { question: "What is the capital of Pakistan?", choices: ["Karachi", "Lahore", "Islamabad", "Peshawar"], answer: "Islamabad" },
  { question: "5 + 3 = ?", choices: ["5", "8", "9", "10"], answer: "8" },
  { question: "Which planet is known as the Red Planet?", choices: ["Earth", "Venus", "Mars", "Jupiter"], answer: "Mars" },
  { question: "What does IDE stand for?", choices: ["Integrated Data Environment", "Integrated Development Environment", "Internet Design Engine", "Internal Debugging Editor"], answer: "Integrated Development Environment" },
  { question: "Who invented the light bulb?", choices: ["Newton", "Einstein", "Edison", "Tesla"], answer: "Edison" },
  { question: "CSS is used for what purpose?", choices: ["Database queries", "Page styling", "Server connection", "Data storage"], answer: "Page styling" },
  { question: "Which of these is version control software?", choices: ["Git", "VS Code", "Excel", "MySQL"], answer: "Git" },
  { question: "JavaScript runs on which side?", choices: ["Server side", "Client side", "Database side", "Compiler side"], answer: "Client side" },
  { question: "What does SDLC stand for?", choices: ["Software Design Life Cycle", "System Design Life Cycle", "Software Development Life Cycle", "System Deployment Loop"], answer: "Software Development Life Cycle" },
  { question: "Which company created the Windows OS?", choices: ["Apple", "Google", "Microsoft", "IBM"], answer: "Microsoft" },
  { question: "HTML stands for?", choices: ["HyperText Makeup Language", "HyperText Markup Language", "HighText Machine Language", "Hyper Tool Markup Language"], answer: "HyperText Markup Language" },
  { question: "Python is a ___ language?", choices: ["Low-level", "Assembly", "High-level", "Machine"], answer: "High-level" },
  { question: "What is 12 * 6?", choices: ["72", "68", "60", "64"], answer: "72" },
  { question: "Who founded SpaceX?", choices: ["Elon Musk", "Jeff Bezos", "Bill Gates", "Steve Jobs"], answer: "Elon Musk" },
  { question: "What does CPU stand for?", choices: ["Central Process Unit", "Central Processing Unit", "Computer Personal Unit", "Central Print Unit"], answer: "Central Processing Unit" }
];

let score = 0;
let totalTime = 210;
let totalTimer, questionTimer;
let timeLeft = 10;
let currentIndex = 0;

startBtn.addEventListener("click", startQuiz);
resetBtn.addEventListener("click", resetQuiz);
finishBtn.addEventListener("click", endQuiz);
closeModal.addEventListener("click", () => modal.classList.add("hidden"));

function startQuiz() {
  score = 0;
  currentIndex = 0;
  totalTime = 210;
  startBtn.classList.add("hidden");
  resetBtn.classList.remove("hidden");
  finishBtn.classList.remove("hidden");
  scoreDisplay.textContent = `Score: ${score}`;
  startTotalTimer();
  showQuestion();
}

function resetQuiz() {
  clearInterval(totalTimer);
  clearInterval(questionTimer);
  startQuiz();
}

function startTotalTimer() {
  clearInterval(totalTimer);
  totalTimer = setInterval(() => {
    totalTime--;
    totalTimerDisplay.textContent = `Total Time: ${totalTime}s`;
    if (totalTime <= 0) endQuiz();
  }, 1000);
}

function showQuestion() {
  if (currentIndex >= questions.length) {
    endQuiz();
    return;
  }

  const q = questions[currentIndex];
  questionBox.textContent = q.question;
  options.forEach((opt, i) => {
    opt.textContent = q.choices[i];
    opt.onclick = () => checkAnswer(opt.textContent);
  });

  timeLeft = 10;
  qTimerDisplay.textContent = `Question Time: ${timeLeft}s`;
  progressBar.style.width = "100%";
  progressBar.style.background = "#2ecc71"; // start green
  startQuestionTimer();
}

function startQuestionTimer() {
  clearInterval(questionTimer);
  questionTimer = setInterval(() => {
    timeLeft--;
    qTimerDisplay.textContent = `Question Time: ${timeLeft}s`;
    progressBar.style.width = (timeLeft / 10) * 100 + "%";

    // Color changes
    if (timeLeft <= 3) {
      progressBar.style.background = "#e74c3c"; // red
    } else if (timeLeft <= 6) {
      progressBar.style.background = "#f1c40f"; // yellow
    } else {
      progressBar.style.background = "#2ecc71"; // green
    }

    if (timeLeft <= 0) {
      clearInterval(questionTimer);
      currentIndex++;
      showQuestion();
    }
  }, 1000);
}

function checkAnswer(selected) {
  if (selected === questions[currentIndex].answer) {
    message.textContent = "✅ Correct!";
    message.className = "correct";
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
  } else {
    message.textContent = "❌ Wrong!";
    message.className = "wrong";
  }

  clearInterval(questionTimer);
  setTimeout(() => {
    message.textContent = "";
    currentIndex++;
    showQuestion();
  }, 600);
}

function endQuiz() {
  clearInterval(totalTimer);
  clearInterval(questionTimer);
  startBtn.classList.remove("hidden");
  resetBtn.classList.add("hidden");
  finishBtn.classList.add("hidden");

  const pass = score >= 7;
  resultTitle.textContent = pass ? "🎉 Passed!" : "❌ Failed!";
  resultScore.textContent = `You scored ${score} / ${questions.length}`;
  modal.classList.remove("hidden");
}

// 🌙 Theme Toggle
const themeToggle = document.getElementById("theme-toggle");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    themeToggle.textContent = "☀️";
    localStorage.setItem("theme", "dark");
  } else {
    themeToggle.textContent = "🌙";
    localStorage.setItem("theme", "light");
  }
});
