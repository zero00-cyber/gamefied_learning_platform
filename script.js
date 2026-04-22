let currentQuestionIndex = 0;
let selectedAnswer = "";
let xp = 0;
let trapMode = false;

// Load questions
function getQuestions() {
  let data = JSON.parse(localStorage.getItem("quiz"));
  if (!data || data.length === 0) {
    return [
      {
        question: "What is 2+2?",
        options: ["2", "3", "4", "5"],
        answer: "Option 3",
        difficulty: "easy"
      }
    ];
  }
  return data;
}

let questions = getQuestions();

// Navigation
function showPage(page) {
  document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
  document.getElementById(page).classList.remove("hidden");
}

// Start quiz
function startQuiz() {
  questions = getQuestions();
  currentQuestionIndex = 0;
  xp = 0;
  showPage("quiz");
  loadQuestion();
}

// Load question
function loadQuestion() {
  let q = questions[currentQuestionIndex];
  document.getElementById("question").innerText = q.question;

  let optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach((opt, index) => {
    let btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = () => selectedAnswer = "Option " + (index + 1);
    optionsDiv.appendChild(btn);
  });
}

// Submit answer
function submitAnswer() {
  let q = questions[currentQuestionIndex];

  if (selectedAnswer === q.answer) {
    xp += 10;
    trapMode = false;
    document.getElementById("resultText").innerText = "🚪 Gate Opened! +10 XP";
  } else {
    trapMode = true;
    document.getElementById("resultText").innerText = "⚠️ Trap! Answer another question to escape!";
  }

  showPage("result");
}

// Next step
function nextStep() {
  currentQuestionIndex++;

  if (currentQuestionIndex >= questions.length) {
    document.getElementById("resultText").innerText = "🏁 Quiz Over! XP: " + xp;
    return;
  }

  showPage("quiz");
  loadQuestion();
}

// Add question (Admin)
function addQuestion() {
  let q = document.getElementById("q").value;
  let o1 = document.getElementById("o1").value;
  let o2 = document.getElementById("o2").value;
  let o3 = document.getElementById("o3").value;
  let o4 = document.getElementById("o4").value;
  let ans = document.getElementById("ans").value;
  let diff = document.getElementById("diff").value;

  let newQ = {
    question: q,
    options: [o1, o2, o3, o4],
    answer: ans,
    difficulty: diff
  };

  let data = JSON.parse(localStorage.getItem("quiz")) || [];
  data.push(newQ);
  localStorage.setItem("quiz", JSON.stringify(data));

  alert("Question Added!");
}