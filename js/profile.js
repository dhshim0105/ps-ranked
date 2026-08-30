// ===== Dom =====

const profileUsername = document.querySelector("#profile-username");
const profileTier = document.querySelector("#profile-tier");
const profileRating = document.querySelector("#profile-rating");
const profileWinRate = document.querySelector("#profile-win-rate");
const profileRecord = document.querySelector("#profile-record");
const recentMatchList = document.querySelector("#recent-match-list");

// ===== Storage =====

const savedPlayer = JSON.parse(localStorage.getItem("player"));
const records = JSON.parse(localStorage.getItem("records")) || [];

// ===== Values =====

// ===== Data =====
// ===== State =====
// ===== Events =====
// ===== Functions =====

function init() {
    renderProfile();
    renderRecentMatches();
}

// ===== Render =====

function renderProfile() {
    const wins = savedPlayer.wins;
    const losses = savedPlayer.losses;
    const totalGames = wins + losses;
    const winRate = totalGames === 0 ? 0 : Math.round(wins / totalGames * 100);

    profileUsername.textContent = savedPlayer.username;
    profileRating.textContent = savedPlayer.rating;
    profileWinRate.textContent = `${winRate}%`;
    profileRecord.textContent = `${totalGames}전 ${wins}승 ${losses}패`;
}

function renderRecentMatches() {
    recentMatchList.innerHTML = "";
    const recentRecords = records.slice(-5).reverse();

    recentRecords.forEach( function (record) {
        const arti = document.createElement("article");
        arti.className = "match-record";

        let ratingText = record.ratingChange;

        if (record.ratingChange > 0) {
            ratingText = "+" + record.ratingChange;
        }

        arti.innerHTML = `
            <span>${record.problemTitle}</span>
            <span>VS ${record.opponent}</span>
            <span class="${record.result.toUpperCase() === "WIN" ? "win" : "loss"}">${record.result.toUpperCase()}</span>
            <span>${ratingText}</span>
        `;

        recentMatchList.append(arti);
    });
}
// ===== Init =====

init();