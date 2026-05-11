// ==============================
// GLOBAL STATE
// ==============================
let userMissionId = localStorage.getItem("userMissionId");
let missionId = localStorage.getItem("missionId");

let questions = [];
let answers = {};


// ==============================
// INIT
// ==============================
init();

async function init(){

  if (!userMissionId || !missionId) {
    window.location.href = "missions.html";
    return;
  }

  await loadQuestions();
}


// ==============================
// LOAD QUESTIONS FROM BACKEND
// ==============================
async function loadQuestions(){

  try {
    let res = await fetch(
      `http://localhost:8080/api/questions?missionId=${missionId}`
    );

    questions = await res.json();

    displayQuestions();

  } catch(err){
    console.error("Error loading questions:", err);
  }
}


// ==============================
// DISPLAY QUESTIONS (MCQ ONLY)
// ==============================
function displayQuestions(){

  let qDiv = document.getElementById("question");
  let optDiv = document.getElementById("options");

  if (!questions || questions.length === 0) {
    qDiv.innerText = "No questions available";
    return;
  }

  optDiv.innerHTML = "";

  questions.forEach(q => {

    let block = document.createElement("div");
    block.style.marginBottom = "15px";

    block.innerHTML = `
      <p><b>${q.question}</b></p>

      <label><input type="radio" name="q${q.id}" value="${q.optionA}"> ${q.optionA}</label><br>
      <label><input type="radio" name="q${q.id}" value="${q.optionB}"> ${q.optionB}</label><br>
      <label><input type="radio" name="q${q.id}" value="${q.optionC}"> ${q.optionC}</label><br>
      <label><input type="radio" name="q${q.id}" value="${q.optionD}"> ${q.optionD}</label><br>
    `;

    optDiv.appendChild(block);
  });

  qDiv.innerText = "Answer all questions:";
}


// ==============================
// SUBMIT ANSWERS
// ==============================
async function submitAnswers(){

  // collect answers
  questions.forEach(q => {
    let selected = document.querySelector(`input[name="q${q.id}"]:checked`);
    if (selected) {
      answers[q.id] = selected.value;
    }
  });

  try {
    let res = await fetch("http://localhost:8080/api/questions/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userMissionId: userMissionId,
        answers: answers
      })
    });

    let data = await res.json();

    showResult(data);

  } catch(err){
    console.error("Error submitting answers:", err);
  }
}


// ==============================
// SHOW RESULT
// ==============================
function showResult(data){

  let box = document.getElementById("feedbackBox");

  box.classList.remove("hidden");

  box.innerText =
    `Score: ${data.score}/${data.total} (${data.percentage}%)`;

  box.style.background = data.passed ? "#58cc02" : "#ff4b4b";

  // ✅ ADD XP LOGIC
  if (data.passed) {

    let xpEarned = data.score * 10; // 10 XP per correct answer

    addXP(xpEarned);

    box.innerText += `\n+${xpEarned} XP 🎉`;

    completeMission();
  }
}


// ==============================
// COMPLETE + UNLOCK NEXT
// ==============================
async function completeMission(){

  await fetch("http://localhost:8080/api/user-missions/complete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userMissionId: userMissionId
    })
  });

  setTimeout(() => {
    alert("🎉 Mission Completed!");
    window.location.href = "missions.html";
  }, 1200);
}


// ==============================
// BACK BUTTON
// ==============================
function goBack(){
  window.location.href = "missions.html";
}

async function addXP(amount){

  let user = JSON.parse(localStorage.getItem("loggedInUser"));

  await fetch("http://localhost:8080/auth/update-xp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userId: user.id,
      xp: amount
    })
  });
}