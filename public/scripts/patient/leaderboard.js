async function getLeaderboard() {
    let res = await httpGet("/patientData/engagement/top");

    if (!res.ok) {
        return;
    }

    const topPatients = await res.json();
    
    var lb = document.getElementById("leaderboard");
    var ranking;
    var uname;
    var score;
    var rank;
    var label;
    var number = 1;
    for (let patient of topPatients) {
        ranking = document.createElement("div");

        ranking.setAttribute("class", "leaderboard-ranking");

        rank = document.createElement("h2");
        rank.setAttribute("style", "display: inline; margin: 5px;");
        rank.innerText = number++ + ". ";

        label = document.createElement("div");
        label.setAttribute("class", "leaderboard-label");
        uname = document.createElement("h3");
        
        uname.innerText = patient.firstName;

        score = document.createElement("h3");
        score.innerText = String(Math.round(100 * Number(patient.engagement))) + "\%";

        label.appendChild(uname);
        label.appendChild(score);
        ranking.appendChild(rank);
        ranking.appendChild(label);
        lb.appendChild(ranking);
    }
}

getLeaderboard();