let course = localStorage.getItem("adminCourse");

// show selected course
document.getElementById("selectedCourse").innerText =
"Course: " + course;

// =====================
// SAVE QUESTION (BACKEND)
// =====================
async function saveQuestion(){

  let questionData = {
    missionId: Number(document.getElementById("missionId").value),
    question: document.getElementById("question").value,
    optionA: document.getElementById("optA").value,
    optionB: document.getElementById("optB").value,
    optionC: document.getElementById("optC").value,
    optionD: document.getElementById("optD").value,
    correctAnswer: document.getElementById("answer").value
  };

  try {
    let res = await fetch("http://localhost:8080/api/questions/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(questionData)
    });

    let msg = await res.text();
    alert(msg);

  } catch(err){
    console.error(err);
    alert("Error adding question");
  }
}

// =====================
function goBack(){
  window.location.href = "admin.html";
}