// ===== session storage =====

const savedMatch = JSON.parse(sessionStorage.getItem("match"));
const savedPlayer = JSON.parse(localStorage.getItem("player"));



// ===== State / Data =====

const gameState = {
    player: savedPlayer,
    opponent: savedMatch.opponent,

    problem: null,
    elapsedTime: 0,
    submissions: [],
    status: "playing",
    message: "문제를 풀어주세요.",
    winner: null

};

/*

const gameState = {
    player: {
        nickname: "Me",
        rating: 1500
    },
    opponent: {
        nickname: "Enemy",
        rating: 1520
    },

    problem: null,
    elapsedTime: 0,
    submissions: [],
    status: "playing",
    message: "문제를 풀어주세요.",
    winner: null
};
*/


// ===== DOM =====

const gameTimer = document.querySelector("#game-timer");
const submitButton = document.querySelector("#submit-answer");
const gameStatus = document.querySelector("#game-status");
const submissionList = document.querySelector("#submission-list");

const playerName = document.querySelector("#player-name");
const playerRating = document.querySelector("#player-rating");
const opponentName = document.querySelector("#opponent-name");
const opponentRating = document.querySelector("#opponent-rating");



// ===== Variables =====

let timerId = null;



// ===== Functions =====

function startTimer() {
    timerId = setInterval(function () {
        gameState.elapsedTime++;

        gameTimer.textContent = formatTime(gameState.elapsedTime);
    }, 1000);
}

function formatTime(time) {
    const minutes = String(Math.floor(time / 60)).padStart(2,"0");
    const seconds = String(time % 60).padStart(2,"0");

    return `${minutes}:${seconds}`;
}

function startGame() {
    gameState.status = "playing";
    gameState.message = "문제를 풀어주세요.";
    gameState.elapsedTime = 0;
    gameState.submissions = [];
    gameState.winner = null;

    renderGame();
    startTimer();
}

function submitAnswer() {
    if (gameState.status === "finished") {
        gameStatus.textContent = "이미 종료된 경기입니다.";
        return;
    }

    if (gameState.status === "judging") {
        gameStatus.textContent = "이미 채점 중입니다.";
        return;
    }

    gameState.status = "judging";
    gameState.message = "채점 중...";
    
    renderGame();
    judgeSubmission();
}

function judgeSubmission() {
    setTimeout(function () {
        if (Math.random() < 0.5) {
            gameState.submissions.push({
                time: formatTime(gameState.elapsedTime),
                result: "AC"
            });

            finishGame("win");
        }
        else {
            gameState.submissions.push({
                time: formatTime(gameState.elapsedTime),
                result: "WA"
            });

            gameState.status = "playing";
            gameState.message = "오답입니다..."

            renderGame();
        }       
    }, 1500);
}

function renderGame() {

    // ===== player vs opponent info =====

    playerName.textContent = gameState.player.username;
    playerRating.textContent = gameState.player.rating;

    opponentName.textContent = gameState.opponent.username;
    opponentRating.textContent = gameState.opponent.rating;

    // ===== game message =====

    gameStatus.textContent = gameState.message;
    submitButton.disabled = gameState.status === "judging" || gameState.status === "finished";

    // ===== submission list innerHTML =====

    submissionList.innerHTML = "";

    gameState.submissions.forEach(function (submission, index) {
        const submissionDiv = document.createElement("div");
        submissionDiv.className = "submission";
        const statusResult = `status-${submission.result.toLowerCase()}`;

        submissionDiv.innerHTML = `
            <span>${index+1}차 제출</span>
            <span>${submission.time}</span>
            <span class="status ${statusResult}">${submission.result}</span>
        `;

        submissionList.append(submissionDiv);
    });
}

function finishGame(result) {
    gameState.status = "finished";
    clearInterval(timerId);

    if (result === "win") {
        gameState.winner = "player";
        gameState.player.rating += 20;
        gameState.message = "정답입니다! 승리! (+20)";
    }

    localStorage.setItem("player",JSON.stringify(gameState.player));
    saveGameRecord(result,20);
    renderGame();

    sessionStorage.removeItem("match");
}

function saveGameRecord(result, ratingChange) {
    const record = {
        opponent: gameState.opponent.username,
        result: result,
        ratingChange: ratingChange,
        elapsedTime: gameState.elapsedTime
    };

    const records = JSON.parse(localStorage.getItem("records")) || [];

    records.push(record);

    localStorage.setItem("records", JSON.stringify(records));
}


// ===== Events =====

submitButton.addEventListener("click", submitAnswer);

submissionList.addEventListener("click", function (event) {
    if (event.target.classList.contains("status")) {
        console.log(event.target.textContent);
    }
    console.log(event.target);
});



// ===== Init =====

startGame();

console.log(gameState);

