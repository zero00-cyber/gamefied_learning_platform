// ===============================
// LOAD MISSIONS FROM STORAGE
// ===============================
let missions = JSON.parse(localStorage.getItem("missions")) || [];

// ===============================
// DISPLAY MISSIONS
// ===============================
function displayMissions(data) {

  let container = document.getElementById("questionsContainer");
  container.innerHTML = "";

  if(data.length === 0){
    container.innerHTML = "<p>No missions added yet</p>";
    return;
  }

  data.forEach(m => {
    container.innerHTML += `
      <div class="question-card">
        <h4>${m.title}</h4>

        <div class="question-meta">
          Course: ${m.course} | Difficulty: ${m.difficulty}
        </div>

        <div class="question-actions">
          <button class="edit-btn" onclick="editMission(${m.id})">Edit</button>
          <button class="delete-btn" onclick="deleteMission(${m.id})">Delete</button>
        </div>
      </div>
    `;
  });
}

// ===============================
// ADD MISSION
// ===============================
function addQuestion() {

  let title = document.getElementById("questionText").value;
  let course = document.getElementById("questionCourse").value;
  let difficulty = document.getElementById("questionDifficulty").value;

  if (!title) {
    alert("Please enter a mission name");
    return;
  }

  let missions = JSON.parse(localStorage.getItem("missions")) || [];

  let newMission = {
    id: Date.now(),
    title: title,
    course: course,
    difficulty: difficulty,
    unlocked: missions.length === 0 // first mission unlocked
  };

  missions.push(newMission);

  localStorage.setItem("missions", JSON.stringify(missions));

  displayMissions(missions);

  // clear input
  document.getElementById("questionText").value = "";
}

// ===============================
// DELETE MISSION
// ===============================
function deleteMission(id) {

  let missions = JSON.parse(localStorage.getItem("missions")) || [];

  missions = missions.filter(m => m.id !== id);

  localStorage.setItem("missions", JSON.stringify(missions));

  displayMissions(missions);
}

// ===============================
// EDIT MISSION
// ===============================
function editMission(id) {

  let missions = JSON.parse(localStorage.getItem("missions")) || [];

  let m = missions.find(m => m.id === id);

  let newTitle = prompt("Edit mission name:", m.title);

  if (newTitle) {
    m.title = newTitle;

    localStorage.setItem("missions", JSON.stringify(missions));

    displayMissions(missions);
  }
}

// ===============================
// SEARCH + FILTER
// ===============================
function applyFilters() {

  let missions = JSON.parse(localStorage.getItem("missions")) || [];

  let search = document.getElementById("searchInput").value.toLowerCase();
  let course = document.getElementById("courseFilter").value;
  let difficulty = document.getElementById("difficultyFilter").value;

  let filtered = missions.filter(m => {
    return (
      m.title.toLowerCase().includes(search) &&
      (course === "" || m.course === course) &&
      (difficulty === "" || m.difficulty === difficulty)
    );
  });

  displayMissions(filtered);
}

// ===============================
// INITIAL LOAD
// ===============================
displayMissions(missions);