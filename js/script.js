const matchButton = document.querySelector("#match-button");
const matchStatus = document.querySelector("#match-status");

let isMatching = false;

matchButton.addEventListener("click", function () {
    if (isMatching === false) {
        matchStatus.textContent = "상대방을 찾고 있습니다...";
        matchButton.textContent = "매칭 취소";
        matchStatus.classList.add("match-status-searching");
        isMatching = true;
    } 
    else {
        matchStatus.textContent = "매칭을 시작해주세요.";
        matchButton.textContent = "랭크전 시작";
        matchStatus.classList.remove("match-status-searching");
        isMatching = false;
    }
});