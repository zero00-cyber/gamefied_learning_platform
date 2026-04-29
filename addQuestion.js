function saveQuestion(newQuestion) {
  let questions = JSON.parse(localStorage.getItem("questions")) || [];

  questions.push(newQuestion);

  localStorage.setItem("questions", JSON.stringify(questions));

  alert("Question Added!");
}