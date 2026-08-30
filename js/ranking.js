// ===== Dom =====

const rankingBody = document.querySelector("#ranking-body");

// ===== Storage =====

const savedPlayer = JSON.parse(localStorage.getItem("player"));

// ===== Values =====
// ===== Data =====

let players = [];

// ===== State =====
// ===== Events =====
// ===== Functions =====

async function loadplayers() {
    const response = await fetch("data/players.json");

    if (!response.ok) {
        throw new Error("플레이어 데이터를 불러오지 못했습니다.");
    }

    players = await response.json();
}

async function init() {
    try {
        await loadplayers();

        const rankingPlayers = [...players, savedPlayer];

        rankingPlayers.sort(function(a, b) { return b.rating-a.rating; });

        console.log(rankingPlayers);
        renderRanking(rankingPlayers);
    } catch (error) {
        console.log(error);
    }

}

// ===== Render =====

function renderRanking(players) {
    players.forEach(function (player, index) {
        

        const row = document.createElement("tr");
        row.className = "ranking-row";
        row.dataset.playerId = player.id;

        if (index < 3) { row.classList.add("top-rank"); };
        if (player.username === savedPlayer.username) {
            row.classList.add("my-rank");
        }

        row.innerHTML = `
            <td>${index+1}</td>
            <td>${player.username}</td>
            <td>${player.rating}</td>

        `;
        rankingBody.append(row);
    });    
}

// ===== Init =====

init();