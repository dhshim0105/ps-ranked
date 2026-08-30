// ===== Dom =====

const loginUsername = document.querySelector("#login-username");
const loginPassword = document.querySelector("#login-password");
const loginForm = document.querySelector("#login-form");
const logoutButton = document.querySelector("#logout-button");
const loginStatus = document.querySelector("#login-status");
const recordContainer = document.querySelector("#records-container");

// ===== Storage =====

const records = JSON.parse(localStorage.getItem("records")) || [];
const redirectMessage = sessionStorage.getItem("redirectMessage");
if (redirectMessage) {
    alert(redirectMessage);
    sessionStorage.removeItem("redirectMessage");
}

// ===== Values =====
// ===== Data =====
// ===== State =====

// ===== Events =====

loginForm.addEventListener("submit", function () {
    event.preventDefault();

    const player = {
        username: loginUsername.value,
        rating: 1500,
        wins: 0,
        losses: 0,
        solvedProblems: []
    };

    localStorage.setItem("player", JSON.stringify(player));

    renderLogin(player);
});

logoutButton.addEventListener("click", function() {
    localStorage.removeItem("player");
    localStorage.removeItem("records");

    renderLogin(null);
});

// ===== Functions =====

// ===== Render =====

function renderLogin(player) {
    if (player) {
        loginStatus.textContent = `${player.username} / Rating ${player.rating}`;
    }
    else {
        loginStatus.textContent = "로그인되지 않음";
    }
}

// ===== Init =====

const recentRecords = records.slice(-5).reverse();
recentRecords.forEach( function (record) {
    const arti = document.createElement("article");
    arti.className = "match-record";

    let ratingText = record.ratingChange;

    if (record.ratingChange > 0) {
        ratingText = "+" + record.ratingChange;
    }

    arti.innerHTML = `
        <span>VS ${record.opponent}</span>
        <span class="${record.result === "win" ? "win" : "loss"}">${record.result.toUpperCase()}</span>
        <span>${ratingText}</span>
    `;

    recordContainer.append(arti);
});


const savedPlayer = JSON.parse(localStorage.getItem("player"));

renderLogin(savedPlayer);