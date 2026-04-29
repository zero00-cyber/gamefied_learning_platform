let currentIndex = 0;
let selected = "";


let questions = [
  {
    type: "mcq",
    question: "What is 2+2?",
    options: ["2","3","4","5"],
    answer: "4"
  },
  {
    type: "drag",
    question: "Match Output",
    pairs: [
      {q:"2+2", a:"4"},
      {q:"3+1", a:"4"}
    ]
  },
  {
    type: "fill",
    question: "Fill missing code",
    code: "for(int i=0; i<__ ; i++)",
    answer: "10"
  },
  {
    type: "arrange",
    question: "Arrange Bubble Sort Steps",
    steps: [
      "Compare elements",
      "Swap if needed",
      "Repeat passes"
    ]
  }
];

// LOAD
function loadQuestion(){
  let q = questions[currentIndex];

  document.getElementById("question").innerText = q.question;

  // hide all
  document.getElementById("options").classList.add("hidden");
  document.getElementById("dragArea").classList.add("hidden");
  document.getElementById("codeArea").classList.add("hidden");
  document.getElementById("arrangeArea").classList.add("hidden");

  if(q.type === "mcq"){
    loadMCQ(q);
  }
  else if(q.type === "drag"){
    loadDrag(q);
  }
  else if(q.type === "fill"){
    loadFill(q);
  }
  else if(q.type === "arrange"){
    loadArrange(q);
  }
}


// =====================
// MCQ
// =====================
function loadMCQ(q){
  let optDiv = document.getElementById("options");
  optDiv.classList.remove("hidden");
  optDiv.innerHTML = "";

  q.options.forEach(opt=>{
    let btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = ()=> selected = opt;
    optDiv.appendChild(btn);
  });
}

// =====================
// DRAG & DROP
// =====================
function loadDrag(q){
  let area = document.getElementById("dragArea");
  area.classList.remove("hidden");
  area.innerHTML = "<p>Drag matching items (demo)</p>";

  selected = "done"; // temp
}

// =====================
// FILL CODE
// =====================
function loadFill(q){
  let area = document.getElementById("codeArea");
  area.classList.remove("hidden");

  area.innerHTML = `
    <p>${q.code}</p>
    <input id="fillInput" placeholder="Enter answer">
  `;
}

// =====================
// ARRANGE
// =====================
function loadArrange(q){
  let area = document.getElementById("arrangeArea");
  area.classList.remove("hidden");

  let shuffled = [...q.steps].sort(()=>Math.random()-0.5);

  area.innerHTML = shuffled.map(step =>
    `<div class="step">${step}</div>`
  ).join("");

  selected = "done"; // temp
}




// SUBMIT
function submitAnswer(){
  let q = questions[currentIndex];
  let isCorrect = false;

  if(q.type === "mcq"){
    isCorrect = selected === q.answer;
  }
  else if(q.type === "fill"){
    let val = document.getElementById("fillInput").value;
    isCorrect = val === q.answer;
  }
  else{
    isCorrect = true; // temporary for drag & arrange
  }

  if(isCorrect){
    addXP(10);
    increaseStreak();
    showFeedback(true);
  } else {
    loseLife();
    resetStreak();
    showFeedback(false);
  }

  updateUI();
}

function updateUI(){
  document.getElementById("lives").innerText = "❤️ " + gameState.lives;
  document.getElementById("streak").innerText = "🔥 " + gameState.streak;
}



// FEEDBACK
function showFeedback(correct){

  let box = document.getElementById("feedbackBox");

  box.classList.remove("hidden");

  if(correct){
    box.innerText = "✅ Correct! +10 XP";
    box.style.background = "#58cc02";
  } else {
    box.innerText = "❌ Wrong!";
    box.style.background = "#ff4b4b";
  }

  setTimeout(()=>{
    box.classList.add("hidden");
    nextQuestion();
  },1000);
}

// NEXT
function nextQuestion(){
  currentIndex++;

  if(currentIndex >= questions.length){
    startBossBattle();
    unlockNextMission(); // ✅ ADD THIS

    alert("🎉 Mission Complete!");
    window.location.href = "missions.html";
    return;
  }

  loadQuestion();
}

// XP ANIMATION
function showXP(amount){
  let xpEl = document.createElement("div");
  xpEl.innerText = "+" + amount + " XP";
  xpEl.className = "xp-pop";

  document.body.appendChild(xpEl);

  setTimeout(()=> xpEl.remove(),1000);
}

// INIT

loadQuestion();
updateUI();