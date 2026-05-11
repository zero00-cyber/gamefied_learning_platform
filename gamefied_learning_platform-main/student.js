// ==============================
// LOAD USER
// ==============================
let currentUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!currentUser) {
  window.location.href = "login.html";
}

// ==============================
// USER KEY (XP STORAGE PER USER)
// ==============================
let key = "student_" + currentUser.id;

// ==============================
// INIT USER DATA (ONLY ONCE)
// ==============================
function initStudentData() {

  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, JSON.stringify({
      xp: 0,
      coins: 0,
      streak: 0,
      completedCourses: 0
    }));
  }
}

// ==============================
// LOAD STUDENT DATA TO UI
// ==============================
async function loadStudentData() {

  let user = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!user) return;

  try {
    let res = await fetch("http://localhost:8080/auth/user/" + user.id);
    let data = await res.json();

    document.getElementById("studentName").innerText =
      "Hi, " + data.username + " 👋";

    document.getElementById("xp").innerText = data.xp;
    document.getElementById("coins").innerText = data.coins || 0;
    document.getElementById("streak").innerText = data.streak || 0;
    document.getElementById("completed").innerText = data.completedCourses || 0;

  } catch (err) {
    console.error("Error loading student data:", err);
  }
}

// ==============================
// LOGOUT
// ==============================
function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}

// ==============================
// OPEN COURSE → MISSIONS PAGE
// ==============================
function openCourse(course) {
  localStorage.setItem("course", course);
  window.location.href = "missions.html";
}

// ==============================
// INIT FLOW
// ==============================
initStudentData();
loadStudentData();