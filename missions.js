let course = localStorage.getItem("course");

// You can later load from admin/localStorage
let missions = [
  {id:1, title:"Variables", difficulty:"Easy", unlocked:true, progress:0},
  {id:2, title:"Loops", difficulty:"Medium", unlocked:false, progress:0},
  {id:3, title:"Pointers", difficulty:"Hard", unlocked:false, progress:0}
];

function displayMissions(){

  let container = document.getElementById("missionsContainer");
  container.innerHTML = "";

  missions.forEach((m, index) => {

    let status = m.unlocked ? "unlocked" : "locked";

    container.innerHTML += `
      <div class="mission-card ${status}"
           onclick="${m.unlocked ? `startMission(${m.id})` : ''}">

        <div class="mission-left">
          <div class="mission-circle">${index+1}</div>
        </div>

        <div class="mission-right">
          <h3>${m.title}</h3>
          <p>${getDescription(m.title)}</p>

          <div class="mission-meta">
            <span class="badge ${m.difficulty.toLowerCase()}">${m.difficulty}</span>
            <span class="status">
              ${m.unlocked ? "✅ Unlocked" : "🔒 Locked"}
            </span>
          </div>
        </div>

      </div>
    `;
  });
}

// Small helper
function getDescription(title){
  if(title === "Variables") return "Learn variables & data types";
  if(title === "Loops") return "Understand loops & iterations";
  if(title === "Pointers") return "Memory & pointer concepts";
  return "Complete this mission";
}

function startMission(id){
  localStorage.setItem("missionId", id);
  window.location.href = "game.html"; // quiz page
}

displayMissions();



function unlockNextMission(){
  for(let i=0;i<missions.length;i++){
    if(!missions[i].unlocked){
      missions[i].unlocked = true;
      break;
    }
  }

  localStorage.setItem("missions", JSON.stringify(missions));
}