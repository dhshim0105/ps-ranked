// ===== Dom =====

const rankingBody = document.querySelector("#ranking-body");
const rankingStatus = document.querySelector("#ranking-status");

// ===== Storage =====

const savedPlayer = JSON.parse(localStorage.getItem("player"));

// ===== Values =====

const API_URL = "http://localhost:3000";

// ===== Data =====

let players = [];

// ===== State =====
// ===== Events =====
// ===== Functions =====

async function loadplayers() {
    const response = await fetch(`${API_URL}/api/players`);

    if (!response.ok) {
        throw new Error("플레이어 데이터를 불러오지 못했습니다.");
    }

    players = await response.json();
}

async function init() {
    rankingStatus.textContent = "랭킹을 불러오는 중...";

    try {
        await loadplayers();

        const rankingPlayers = [...players, savedPlayer];
        rankingPlayers.sort(function(a, b) { return b.rating-a.rating; });

        renderRanking(rankingPlayers);

        rankingStatus.textContent = "";
    } catch (error) {
        console.log(error);
        
        rankingStatus.textContent = "랭킹 정보를 불러오지 못했습니다.";
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