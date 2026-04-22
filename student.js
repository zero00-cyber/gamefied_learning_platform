let xp = 0;
let currentIndex = 0;
let selected = "";

// Dummy questions (later from admin/localStorage/backend)
let questions = [
  {
    question: "What is 2 + 2?",
    options: ["2", "3", "4", "5"],
    answer: "4"
  },
  {
    question: "Stack follows?",
    options: ["FIFO", "LIFO", "Random", "None"],
    answer: "LIFO"
  }
];

// LOGIN
function loginStudent() {
  let u = document.getElementById("username").value;
  let p = document.getElementById("password").value;

  if (u && p) {
    document.getElementById("loginBox").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");
  } else {
    alert("Enter credentials");
  }
}

// START QUIZ
function startQuiz() {
  document.getElementById("dashboard").classList.add("hidden");
  document.getElementById("quizBox").classList.remove("hidden");
  loadQuestion();
}

// LOAD QUESTION
function loadQuestion() {
  let q = questions[currentIndex];

  document.getElementById("question").innerText = q.question;

  let optDiv = document.getElementById("options");
  optDiv.innerHTML = "";

  q.options.forEach(opt => {
    let btn = document.createElement("button");
    btn.innerText = opt;

    btn.onclick = () => {
      selected = opt;
    };

    optDiv.appendChild(btn);
  });

  document.getElementById("gameStatus").innerText =
    "🚪 Gate " + (currentIndex + 1);
}

// SUBMIT ANSWER
function submitAnswer() {
  let q = questions[currentIndex];

  document.getElementById("quizBox").classList.add("hidden");
  document.getElementById("resultBox").classList.remove("hidden");

  if (selected === q.answer) {
    xp += 10;
    document.getElementById("resultText").innerText =
      "✅ Correct! Gate Cleared +10 XP";
  } else {
    document.getElementById("resultText").innerText =
      "⚠️ Wrong! You fell into a trap. Solve next challenge!";
  }

  document.getElementById("xp").innerText = "XP: " + xp;
}

// NEXT QUESTION
function nextQuestion() {
  currentIndex++;

  document.getElementById("resultBox").classList.add("hidden");
  document.getElementById("quizBox").classList.remove("hidden");

  if (currentIndex >= questions.length) {
    alert("🎉 Adventure Completed! XP: " + xp);
    location.reload();
  } else {
    loadQuestion();
  }
}

// LOGOUT
function logout() {
  location.reload();
}