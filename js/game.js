// ===== problems =====

const problems = [
    {
        id: 1,
        title: "두 수의 합",
        difficulty: "Bronze",
        tags: ["implementation"],
        description: "두 정수 A와 B가 주어질 때 A+B를 출력하세요.",
        input: "첫째 줄에 A와 B가 주어진다.",
        output: "A+B를 출력한다.",
        examples: [
            {
                input: "1 2",
                output: "3"
            },
            {
                input: "14 25",
                output: "39"
            }

        ]
    } ,

    {
        id: 2,
        title: "최댓값 찾기",
        difficulty: "Bronze",
        tags: ["implementation", "array"],
        description: "정수 배열에서 가장 큰 값을 출력하세요.",
        input: "첫째 줄에 N, 둘째 줄에 N개의 정수가 주어진다.",
        output: "가장 큰 정수를 출력한다.",
        examples: [
            {
                input: "5\n1 7 3 4 2",
                output: "7"
            }
        ]
    },

    {
        id: 3,
        title: "격자 최단 거리",
        difficulty: "Silver",
        tags: ["graph", "bfs"],
        description: "격자에서 시작점부터 도착점까지의 최단 거리를 구하세요.",
        input: "격자의 크기와 격자 정보가 주어진다.",
        output: "최단 거리를 출력한다.",
        examples: [
            {
                input: "3 3\n0 0 0\n1 1 0\n0 0 0",
                output: "4"
            }
        ]
    },

    {
        id: 4,
        title: "동전 선택",
        difficulty: "Silver",
        tags: ["greedy"],
        description: "주어진 동전을 이용해 목표 금액을 만드는 최소 동전 수를 구하세요.",
        input: "동전 정보와 목표 금액이 주어진다.",
        output: "필요한 최소 동전 수를 출력한다.",
        examples: [
            {
                input: "3 4200\n1000 500 100",
                output: "6"
            }
        ]
    },

    {
        id: 5,
        title: "트리 거리",
        difficulty: "Gold",
        tags: ["tree", "graph"],
        description: "트리에서 두 정점 사이의 거리를 구하세요.",
        input: "트리 정보와 두 정점이 주어진다.",
        output: "두 정점 사이의 거리를 출력한다.",
        examples: [
            {
                input: "예제 입력",
                output: "예제 출력"
            }
        ]
    }

];




// ===== storage =====

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

// ===== DOM =====

const gameTimer = document.querySelector("#game-timer");
const submitButton = document.querySelector("#submit-answer");
const gameStatus = document.querySelector("#game-status");
const submissionList = document.querySelector("#submission-list");

const playerName = document.querySelector("#player-name");
const playerRating = document.querySelector("#player-rating");
const opponentName = document.querySelector("#opponent-name");
const opponentRating = document.querySelector("#opponent-rating");

const problemTitle = document.querySelector("#problem-title");
const problemDifficulty = document.querySelector("#problem-difficulty");
const problemTags = document.querySelector("#problem-tags");
const problemDescription = document.querySelector("#problem-description");
const problemInput = document.querySelector("#problem-input");
const problemOutput = document.querySelector("#problem-output");
const examplesContainer = document.querySelector("#examples-container")



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

function selectRankedProblem() {

    const averageRating = (gameState.player.rating + gameState.opponent.rating) / 2;
    const difficulty = getDifficultyByRating(averageRating);
    let candidates = problems.filter(function (problem) {
        return problem.difficulty === difficulty && !gameState.player.solvedProblems.includes(problem.id) && !gameState.opponent.solvedProblems.includes(problem.id);
    });

    if (candidates.length === 0) {
        candidates = problems.filter(function (problem) {
            return problem.difficulty === difficulty;
        });
    }

    return getRandomProblem(candidates);
}

function selectNormalProblem() {

    let difficulty = savedMatch.difficulty;

    if (difficulty === "auto") {
        const averageRating = (gameState.player.rating + gameState.opponent.rating) / 2;
        difficulty = getDifficultyByRating(averageRating);
    }

    let candidates = problems.filter(function (problem) {
        return problem.difficulty === difficulty && !gameState.player.solvedProblems.includes(problem.id) && !gameState.opponent.solvedProblems.includes(problem.id);
    });

    if (candidates.length === 0) {
        candidates = problems.filter(function (problem) { return problem.difficulty === difficulty; });
    }

    return getRandomProblem(candidates);
}

function startGame() {
    gameState.status = "playing";
    gameState.message = "문제를 풀어주세요.";
    gameState.elapsedTime = 0;
    gameState.submissions = [];
    gameState.winner = null;
    if (savedMatch.mode === "ranked") { gameState.problem = selectRankedProblem(); }
    else { gameState.problem = selectNormalProblem(); }

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

    // ===== problem =====

    problemTitle.textContent = gameState.problem.title;
    problemDifficulty.textContent = gameState.problem.difficulty;
    problemDescription.textContent = gameState.problem.description;
    problemTags.textContent = "#" + gameState.problem.tags.join(" #");
    problemInput.textContent = gameState.problem.input;
    problemOutput.textContent = gameState.problem.output;
    examplesContainer.innerHTML = "";

    gameState.problem.examples.forEach(function (example, index) {
        const exampleDiv = document.createElement("div");

        exampleDiv.innerHTML =`
            <h4>예제 ${index+1}</h4>

            <p>입력</p>
            <pre>${example.input}</pre>

            <p>출력</p>
            <pre>${example.output}</pre>           
        `;

        examplesContainer.append(exampleDiv);
    })
    

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

        if (!gameState.player.solvedProblems.includes(gameState.problem.id)) {
            gameState.player.solvedProblems.push(gameState.problem.id);
        }
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

