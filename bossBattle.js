let time = 30;
let score = 0;

function startTimer(){
  let t = setInterval(()=>{
    time--;
    document.getElementById("timer").innerText = time;

    if(time <= 0){
      clearInterval(t);
      alert("Boss Failed!");
      location.reload();
    }
  },1000);
}

function winBoss(){
  addXP(50);
  alert("🏆 Boss Defeated!");
}
function startBossBattle(){
  alert("🔥 Boss Battle Started!");
}
startTimer();