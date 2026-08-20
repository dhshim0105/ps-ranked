let rating = 1470;
let wincnt = 0;
let losscnt = 0;
let tier = "Silver"

const results = [
    "WIN",
    "WIN",
    "WIN",
    "LOSS",
    "WIN",
    "WIN",
    "LOSS",
    "WIN"
];

for (let i = 0 ; i < results.length ; i++) {
    if (results[i] === "WIN") { 
        rating += 20;
        wincnt++;
    }
    if (results[i] === "LOSS") { 
        rating -= 20;
        losscnt++;
    }
    
    if (rating >= 1800) { tier = "Gold" }
    else if (rating >= 1500) { tier = "Silver" }
    else { tier = "Bronze" }

    console.log((i+1)+"경기 종료");
    console.log("레이팅:", rating);
    console.log("티어:", tier);
}

console.log("최종 레이팅:",rating);
console.log("승리:", wincnt);
console.log("패배:", losscnt);
console.log("최종 티어:",tier);