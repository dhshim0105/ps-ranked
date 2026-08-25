const records = [
    {
        opponent: "DFS_Master",
        result: "WIN",
        ratingChange: 18
    },
    {
        opponent: "GraphKing",
        result: "LOSS",
        ratingChange: -15
    },
    {
        opponent: "DP_God",
        result: "WIN",
        ratingChange: 21
    }
];

const recordContainer = document.querySelector("#records-container");

records.forEach( function (record) {
    const arti = document.createElement("article");
    arti.className = "match-record";

    let ratingText = record.ratingChange;

    if (record.ratingChange > 0) {
        ratingText = "+" + record.ratingChange;
    }

    arti.innerHTML = `
        <span>VS ${record.opponent}</span>
        <span class="${record.result === "WIN" ? "win" : "loss"}">${record.result}</span>
        <span>${ratingText}</span>
    `;

    recordContainer.append(arti);
});