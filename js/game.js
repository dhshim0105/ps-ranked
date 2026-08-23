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

