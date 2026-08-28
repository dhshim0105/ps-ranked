const records = JSON.parse(localStorage.getItem("records")) || [];
const recentRecords = records.slice(-5).reverse();

const recordContainer = document.querySelector("#records-container");

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

function renderLogin(player) {
    if (player) {
        loginStatus.textContent = `${player.username} / Rating ${player.rating}`;
    }
    else {
        loginStatus.textContent = "로그인되지 않음";
    }
}


const loginUsername = document.querySelector("#login-username");
const loginPassword = document.querySelector("#login-password");
const loginForm = document.querySelector("#login-form");
const logoutButton = document.querySelector("#logout-button");
const loginStatus = document.querySelector("#login-status");

loginForm.addEventListener("submit", function () {
    event.preventDefault();

    const player = {
        username: loginUsername.value,
        rating: 1500,
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

const savedPlayer = JSON.parse(localStorage.getItem("player"));

renderLogin(savedPlayer);

console.log(savedPlayer);