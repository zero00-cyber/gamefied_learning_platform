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









// LOGOUT
function logout() {
  location.reload();
}



// Example progress data (later comes from backend)
let progressData = {
  "C Programming": { completed: 1, total: 3 },
  "Java": { completed: 0, total: 3 }
};

// Function to update UI
function updateProgress() {

  let c = progressData["C Programming"];
  let percent = Math.floor((c.completed / c.total) * 100);

  document.getElementById("c-progress").style.width = percent + "%";
  document.getElementById("c-text").innerText = percent + "%";

}

// Run on load
updateProgress();





// STEP 1: Initialize data (only first time)
if (!localStorage.getItem("student")) {
  let studentData = {
    name: "Bhavya",
    xp: 0,
    coins: 0,
    streak: 0,
    completedCourses: 0
  };

  localStorage.setItem("student", JSON.stringify(studentData));
}

// STEP 2: Load data and show on UI
function loadStudentData() {
  let data = JSON.parse(localStorage.getItem("student"));

  document.getElementById("studentName").innerText = "Hi, " + data.name + " 👋";
  document.getElementById("xp").innerText = data.xp;
  document.getElementById("coins").innerText = data.coins;
  document.getElementById("streak").innerText = data.streak;
  document.getElementById("completed").innerText = data.completedCourses;
}

// STEP 3: Run when page loads
loadStudentData();


function openCourse(course){
  localStorage.setItem("course", course);
  window.location.href = "missions.html";
}