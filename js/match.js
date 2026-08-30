// ===== DOM =====

const matchButton = document.querySelector("#match-button");
const matchStatus = document.querySelector("#match-status");
const difficultySelect = document.querySelector("#difficulty-select");

matchButton.disabled = true;


// ===== Values =====


// ===== Data =====

let players = [];
let problems = [];

// ===== State =====


// ===== Storage =====

const savedPlayer = JSON.parse(localStorage.getItem("player"));
const redirectMessage = sessionStorage.getItem("redirectMessage");
if (redirectMessage) {
    alert(redirectMessage);
    sessionStorage.removeItem("redirectMessage");
}

// ===== Events =====

matchButton.addEventListener("click", function () {
    matchStatus.textContent = "매칭 잡는 중...";
    matchButton.disabled = true;

    const selectedMode = document.querySelector("input[name='game-mode']:checked");
    const selectedOpponent = getRandomPlayer();
    const selectedDifficulty = selectedMode.value === "ranked" ? "auto" : difficultySelect.value;
    let selectedProblem;

    if (!selectedOpponent) {
        matchStatus.textContent = "매칭 가능한 상대가 없습니다.";
        matchButton.disabled = false;
        return;
    }

    if (selectedMode.value === "ranked") { selectedProblem = selectRankedProblem(savedPlayer,selectedOpponent); }
    else { selectedProblem = selectNormalProblem(savedPlayer, selectedOpponent, selectedDifficulty)}

    if (!selectedProblem) {
        matchStatus.textContent = "선택 가능한 문제가 없습니다."
        matchButton.disabled = false;
        return;
    }

    const match = {
        mode: selectedMode.value,
        difficulty: difficultySelect.value,
        opponent: selectedOpponent,
        problem: selectedProblem
    };

    sessionStorage.setItem("match",JSON.stringify(match));

    setTimeout(function () {
        matchStatus.textContent = "상대를 찾았습니다!";
    }, 2000);

    setTimeout(function () {
        window.location.href = "game.html";
    }, 3000);
});


// ===== Functions =====

async function loadPlayers() {
    const response = await fetch("data/players.json");

    if (!response.ok) {
        throw new Error("플레이어 데이터를 불러오지 못했습니다.")
    }

    players = await response.json();
}

async function loadProblems() {
    const response = await fetch("data/problems.json");

    if (!response.ok) {
        throw new Error("문제 데이터를 불러오지 못했습니다.");
    }
    
    const data = await response.json();

    problems = data;
}

function findMatchCandidates() {
    return players.filter(function (player) {
        return (
            player.username !== savedPlayer.username &&
            savedPlayer.rating - 100 <= player.rating &&
            player.rating <= savedPlayer.rating + 100
        );
    });
}

function getRandomPlayer() {
    const candidates = findMatchCandidates();
    
    if (candidates.length === 0) {
        return null;
    }

    const randomIndex = Math.floor(Math.random() * candidates.length);

    return candidates[randomIndex];
}

function getDifficultyByRating(rating) {
    if (rating < 1400) { return "Bronze"; }
    if (rating < 1700) { return "Silver"; }
    return "Gold";
}

function getRandomProblem(candidates) {
    if (candidates.length === 0) { return null; }
    const randomIndex = Math.floor(Math.random() * candidates.length);
    return candidates[randomIndex];
}

function selectRankedProblem(player, opponent) {

    const averageRating = (player.rating + opponent.rating) / 2;
    const difficulty = getDifficultyByRating(averageRating);
    let candidates = problems.filter(function (problem) {
        return problem.difficulty === difficulty && !player.solvedProblems.includes(problem.id) && !opponent.solvedProblems.includes(problem.id);
    });

    if (candidates.length === 0) {
        candidates = problems.filter(function (problem) {
            return problem.difficulty === difficulty;
        });
    }

    return getRandomProblem(candidates);
}

function selectNormalProblem(player, opponent, difficulty) {

    if (difficulty === "auto") {
        const averageRating = (player.rating + opponent.rating) / 2;
        difficulty = getDifficultyByRating(averageRating);
    }

    let candidates = problems.filter(function (problem) {
        return problem.difficulty === difficulty && !player.solvedProblems.includes(problem.id) && !opponent.solvedProblems.includes(problem.id);
    });

    if (candidates.length === 0) {
        candidates = problems.filter(function (problem) { return problem.difficulty === difficulty; });
    }

    return getRandomProblem(candidates);
}

async function init() {
    if (!savedPlayer) {
        sessionStorage.setItem("redirectMessage", "로그인이 필요합니다.");
        window.location.replace("index.html");
        return;
    }

    try {
        await loadPlayers();
        await loadProblems();

        matchButton.disabled = false;
    } catch (error) {
        console.log(error);

        matchStatus.textContent = "매칭 데이터를 불러오지 못했습니다.";
    }
}


// ===== Render =====


// ===== Init =====

init();