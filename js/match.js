const matchButton = document.querySelector("#match-button");
const matchStatus = document.querySelector("#match-status");
const difficultySelect = document.querySelector("#difficulty-select");

matchButton.addEventListener("click", function () {
    matchStatus.textContent = "매칭 잡는 중...";
    matchButton.disabled = true;

    setTimeout(function () {
        matchStatus.textContent = "상대를 찾았습니다!";
    }, 2000);

    const selectedMode = document.querySelector("input[name='game-mode']:checked");
    const match = {
        mode: selectedMode.value,
        difficulty: difficultySelect.value,

        opponent: {
            username: "DFS_Master",
            rating: 1500,
            solvedProblems: [2, 3]
        }
    };

    sessionStorage.setItem("match",JSON.stringify(match));

    setTimeout(function () {
        window.location.href = "game.html";
    }, 3000);
});

