let players = [
  {name: "Bhavya", xp: 120, coins: 50, streak: 5, course: "Java"},
  {name: "Aditi", xp: 150, coins: 70, streak: 7, course: "Python"},
  {name: "Ravi", xp: 100, coins: 40, streak: 3, course: "Java"}
];

// DISPLAY
function displayLeaderboard(data){

  let tbody = document.getElementById("leaderboardBody");
  tbody.innerHTML = "";

  // sort by XP
  data.sort((a,b) => b.xp - a.xp);

  data.forEach((p, index) => {

    let rank = index + 1;

    let medal = rank === 1 ? "🥇" :
                rank === 2 ? "🥈" :
                rank === 3 ? "🥉" : rank;

    let rowClass = rank === 1 ? "gold" :
                   rank === 2 ? "silver" :
                   rank === 3 ? "bronze" : "";

    tbody.innerHTML += `
      <tr class="${rowClass}">
        <td>${medal}</td>
        <td>${p.name}</td>
        <td>${p.xp}</td>
        <td>${p.coins}</td>
        <td>${p.streak} 🔥</td>
      </tr>
    `;
  });
}

// FILTER
function filterLeaderboard(){

  let course = document.getElementById("courseFilter").value;

  let filtered = players.filter(p => {
    return course === "" || p.course === course;
  });

  displayLeaderboard(filtered);
}

// INITIAL LOAD
displayLeaderboard(players);