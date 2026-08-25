const gameTimer = document.querySelector("#game-timer");
const submitAnswer = document.querySelector("#submit-answer");
const gameStatus = document.querySelector("#game-status");
let elapsedTime = 0;

const timerId = setInterval(function () {
    elapsedTime++;

    let minutes = String(Math.floor(elapsedTime / 60)).padStart(2,"0");
    let seconds = String(elapsedTime % 60).padStart(2,"0");

    gameTimer.textContent = `${minutes}:${seconds}`
}, 1000);

submitAnswer.addEventListener("click", function () {
    gameStatus.textContent = "채점 중...";
    submitAnswer.disabled = true;

    setTimeout(function () {
        if (Math.random() < 0.1) {
            gameStatus.textContent = "정답입니다!";
            clearInterval(timerId);
        }
        else {
            gameStatus.textContent = "오답입니다...";
            submitAnswer.disabled = false; 
        };       
    }, 1500);
});

const submissions = [
    {
        time: "00:31",
        result: "WA"
    },
    {
        time: "00:54",
        result: "TLE"
    },
    {
        time: "01:28",
        result: "AC"
    }
];

const submissionList = document.querySelector("#submission-list");

submissions.forEach(function (submission, index) {
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

submissionList.addEventListener("click", function (event) {
    if (event.target.classList.contains("status")) {
        console.log(event.target.textContent);
    }
    console.log(event.target);
});
