const express = require("express");
const cors = require("cors");
const players = [
    {
        id: 1,
        username: "DFS_Master",
        rating: 1700,
        solvedProblems: [1, 3]
    },
    {
        id: 2,
        username: "DP_God",
        rating: 1820,
        solvedProblems: [1, 2, 4]
    },
    {
        id: 3,
        username: "BFS_Lover",
        rating: 1450,
        solvedProblems: [2]
    },
    {
        id: 4,
        username: "GreedyKing",
        rating: 1510,
        solvedProblems: [4]
    }
];

const problems = [
    {
        id: 1,
        title: "두 수의 합",
        difficulty: "Bronze",
        tags: ["implementation"]
    },
    {
        id: 2,
        title: "최댓값 찾기",
        difficulty: "Bronze",
        tags: ["implementation", "array"]
    },
    {
        id: 3,
        title: "격자 최단 거리",
        difficulty: "Silver",
        tags: ["graph", "bfs"]
    }
];

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", function (req, res) {
    res.send("Hello PS Ranked Backend!");
});

app.get("/api/player", function (req, res) {
    const player = {
        username: "PSKing",
        rating: 1500
    };

    res.json(player);
})

app.get("/api/players", function (req, res) {
    res.json(players);
});

app.get("/api/test", function (req, res) {
    res.json({ message: "PS Ranked server is running" });
});

app.post("/api/players", function (req, res) {
    const player = req.body;

    players.push(player);

    res.json({
        message: "플레이어 데이터를 받았습니다.",
        player: player
    });
});

app.get("/api/players/:id", function (req, res) {
    const playerId = Number(req.params.id);

    const player = players.find(function (player) {
        return player.id === playerId;
    });

    if (!player) {
        res.status(404).json({
            message: "플레이어를 찾을 수 없습니다."
        });
        return;
    }

    res.json(player);
});

app.get("/api/problems/:id", function (req, res) {
    const problemId = Number(req.params.id);

    const problem = problems.find(function (problem) {
        return problem.id === problemId;
    });

    if (!problem) {
        res.status(404).json({
            message: "문제를 찾을 수 없습니다."
        });
        return;
    }    
    res.json(problem);
});

app.get("/api/problems", function (req, res) {
    const difficulty = req.query.difficulty;

    if (difficulty) {
        const filteredProblems = problems.filter(function (problem) {
            return problem.difficulty === difficulty;
        });
        res.json(filteredProblems);
        return;
    }

    res.json(problems);
});

app.listen(3000, function() {
    console.log("Server is running on http://localhost:3000");
});