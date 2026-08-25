/*
const players = [ 
    {
        id: 1,
        nickname: "DFS_Master",
        rating: 1730,
        wins: 32,
        losses: 18
    },
    {
        id: 2,
        nickname: "BFS_King",
        rating: 1580,
        wins: 25,
        losses: 20
    },
    {
        id: 3,
        nickname: "DP_Genius",
        rating: 1850,
        wins: 41,
        losses: 14
    },
    {
        id: 4,
        nickname: "GreedyCat",
        rating: 1420,
        wins: 18,
        losses: 22
    },
    {
        id: 5,
        nickname: "BinarySearch",
        rating: 1620,
        wins: 28,
        losses: 17
    }    
];

const highRatingPlayers = players.filter(function (player) {
    return player.rating >= 1600;
});

console.log(highRatingPlayers);

const targetPlayer = players.find(function (player) {
    return player.nickname === "DP_Genius";
});

console.log(targetPlayer);

const has40Wins = players.some(function (player) {
    return player.wins >= 40;
});

const allLossesUnder30 = players.every(function (player) {
    return player.losses <= 30;
});

console.log(has40Wins);
console.log(allLossesUnder30);

const winRates = players.map(function (player) {
    return player.wins / (player.wins+player.losses) * 100;
});

console.log(winRates);

const playerStats = players.map(function (player) {
    return {
        nickname: player.nickname,
        winRate: player.wins / (player.wins+player.losses) * 100
    }
});

console.log(playerStats);

const sortedPlayers = [...players].sort(function (a, b) {
    return b.rating - a.rating;
});

console.log(players);
console.log(sortedPlayers);

const player = players[0];

const newplayer = {
    ...player,
    rating: 2000
};

console.log(newplayer);

const {nickname, rating, wins} = player;

console.log(nickname, rating, wins);

console.log(Object.keys(player));
console.log(Object.values(player));
console.log(Object.entries(player));

Object.entries(player).forEach(function (entry) {
    const key = entry[0];
    const value = entry[1];
    console.log(key,":",value);
});

let totalRating = 0;

players.forEach(function (player) {
    totalRating += player.rating;
});

const averageRating = totalRating / players.length;

console.log(averageRating);

const top3Players = [...players].sort(function (a,b) {
    return b.rating - a.rating;
}).slice(0,3);

console.log(top3Players);

const myrating = 1500;
const matchablePlayers = players.filter(function (player) {
    return (myrating + 100 >= player.rating) && (myrating - 100 <= player.rating);
});

console.log(matchablePlayers);
*/

const rankings = [
    { id: 1, nickname: "DFS_Master", rating: 1920 },
    { id: 2, nickname: "GraphKing", rating: 1863 },
    { id: 3, nickname: "DP_God", rating: 1812 },
    { id: 4, nickname: "BFS_King", rating: 1750 },
    { id: 5, nickname: "GreedyCat", rating: 1690 }
];


const rankingBody = document.querySelector("#ranking-body");

rankings.forEach(function (player, index) {
    

    const row = document.createElement("tr");
    row.className = "ranking-row";
    row.dataset.playerId = player.id;

    if (index < 3) { row.classList.add("top-rank"); };

    row.innerHTML = `
        <td>${index+1}</td>
        <td>${player.nickname}</td>
        <td>${player.rating}</td>

    `;
    rankingBody.append(row);
});

//const rows = document.querySelectorAll(".ranking-row");
//rows[4].remove();