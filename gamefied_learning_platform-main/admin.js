let user = JSON.parse(localStorage.getItem("loggedInUser"));

// =====================
// 🔐 SECURITY CHECK
// =====================
if(!user || user.role !== "ADMIN"){
  alert("Access Denied!");
  window.location.href = "login.html";
}

// =====================
// LOGOUT
// =====================
function logout(){
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
}

// =====================
// NAVIGATION HELPERS
// =====================
function openAddQuestion(course){
  localStorage.setItem("adminCourse", course);
  window.location.href = "addQuestion.html";
}

function openLeaderboard(course){
  localStorage.setItem("adminCourse", course);
  window.location.href = "leaderboard.html";
}