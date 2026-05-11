let gameState = {
  xp: 0,
  coins: 0,
  lives: 5,
  streak: 0
};

function loadGame(){
  let saved = JSON.parse(localStorage.getItem("gameState"));
  if(saved) gameState = saved;
}

function saveGame(){
  localStorage.setItem("gameState", JSON.stringify(gameState));
}

function addXP(amount){
  gameState.xp += amount;
  showXP(amount);
  saveGame();
  syncUI();
  loseLife();
  increaseStreak();
  resetStreak();
}


function loseLife(){
  gameState.lives--;
  saveGame();

  if(gameState.lives <= 0){
    alert("Game Over!");
    location.reload();
  }
}

function increaseStreak(){
  gameState.streak++;
  saveGame();
}

function resetStreak(){
  gameState.streak = 0;
  saveGame();
}

function syncUI(){
  let livesEl = document.getElementById("lives");
  let streakEl = document.getElementById("streak");

  if(livesEl) livesEl.innerText = "❤️ " + gameState.lives;
  if(streakEl) streakEl.innerText = "🔥 " + gameState.streak;
}
loadGame();