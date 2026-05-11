// =====================
// LOAD USER + COURSE
// =====================
let user = JSON.parse(localStorage.getItem("loggedInUser"));
let userId = user.id;

let course = localStorage.getItem("course");


// =====================
// INIT
// =====================
init();

async function init() {

  if (!user || !course) {
    window.location.href = "student.html";
    return;
  }

  // 🎯 set title
  document.getElementById("courseTitle").innerText =
    "🎯 " + course + " Missions";

  // 🚫 handle unsupported courses
  if (course !== "Java" && course !== "C") {
    document.getElementById("noMissions").style.display = "block";
    return;
  }

  // 🔥 generate missions (safe)
  await fetch("http://localhost:8080/api/user-missions/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userId: userId,
      course: course
    })
  });

  loadMissions();
}


// =====================
// FETCH MISSIONS
// =====================
async function loadMissions(){

  try {
    let res = await fetch(
      `http://localhost:8080/api/user-missions?userId=${userId}&course=${course}`
    );

    let missions = await res.json();

    displayMissions(missions);

  } catch(err){
    console.error("Error loading missions:", err);
  }
}


// =====================
// DISPLAY MISSIONS
// =====================
function displayMissions(missions){

  let container = document.getElementById("missionsContainer");

  if(!missions || missions.length === 0){
    container.innerHTML = "<h2>No missions found</h2>";
    return;
  }

  container.innerHTML = "";

  missions.forEach((m, index) => {

    let status = m.unlocked ? "unlocked" : "locked";

    container.innerHTML += `
      <div class="mission-card ${status}">

        <div class="mission-left">
          <div class="mission-circle">${index+1}</div>
        </div>

        <div class="mission-right">
          <h3>Level ${m.missionId}</h3>

          <div class="mission-meta">
            <span>${m.completed ? "✅ Completed" : "🕒 Pending"}</span>
          </div>

          <button 
            onclick="startMission(${m.id}, ${m.missionId})"
            ${!m.unlocked ? "disabled" : ""}
          >
            ${m.completed ? "Completed" : "Start"}
          </button>

        </div>

      </div>
    `;
  });
}


// =====================
// START MISSION → GO TO GAME PAGE
// =====================
function startMission(userMissionId, missionId){

  localStorage.setItem("userMissionId", userMissionId);
  localStorage.setItem("missionId", missionId);

  window.location.href = "game.html";
}


// =====================
// BACK BUTTON
// =====================
function goBack(){
  window.location.href = "student.html";
}