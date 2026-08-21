const players = [
    {
        nickname: "mastershim",
        rating: 1750
    },
    {
        nickname: "algorithmKing",
        rating: 1900
    },
    {
        nickname: "PSGod",
        rating: 1600
    }
];

players.forEach(function (player, index) {
    console.log(`${index+1}위: ${player.nickname} / 레이팅: ${player.rating}`);
});

const match = {
    status: "PLAYING",
    playerA: {
        nickname: "mastershim",
        rating: 1750
    },
    playerB: {
        nickname: "algorithmKing",
        rating: 1900
    },
    problem: {
        title: "최단 경로",
        difficulty: "Gold",
        timeLimit: 30
    }
};

console.log(`${match.playerA.nickname} VS ${match.playerB.nickname}`);
console.log(`문제: ${match.problem.title}`);
console.log(`난이도: ${match.problem.difficulty}`);
console.log(`제한 시간: ${match.problem.timeLimit}분`);