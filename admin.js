

function openLeaderboard(course) {
  localStorage.setItem("selectedCourse", course);
  window.location.href = "leaderboard.html";
}



function openAddQuestion(course) {
  localStorage.setItem("selectedCourse", course);
  window.location.href = "manageQuestions.html";
}
