// ===== Imports =====
// 외부 라이브러리 및 모듈을 불러옵니다.

const express = require("express");
const cors = require("cors");


// ===== Config =====
// PORT, 환경변수 등 서버 설정값을 관리합니다.

const PORT = 3000;


// ===== Data =====
// 플레이어, 문제, 전적 등 서버에서 사용할 임시 데이터를 관리합니다.

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
        tags: ["implementation"],
        description: "두 정수 A와 B가 주어질 때 A+B를 출력하세요.",
        input: "첫째 줄에 두 정수 A와 B가 공백으로 구분되어 주어진다.",
        output: "A+B를 출력한다.",
        examples: [
            {
                input: "1 2",
                output: "3"
            },
            {
                input: "10 20",
                output: "30"
            }
        ]
    },

    {
        id: 2,
        title: "최댓값 찾기",
        difficulty: "Bronze",
        tags: ["implementation", "array"],
        description: "N개의 정수가 주어질 때 그중 가장 큰 값을 출력하세요.",
        input: "첫째 줄에 정수 N이 주어진다. 둘째 줄에 N개의 정수가 공백으로 구분되어 주어진다.",
        output: "주어진 정수 중 가장 큰 값을 출력한다.",
        examples: [
            {
                input: "5\n1 7 3 4 2",
                output: "7"
            },
            {
                input: "4\n-3 -1 -7 -2",
                output: "-1"
            }
        ]
    },

    {
        id: 3,
        title: "격자 최단 거리",
        difficulty: "Silver",
        tags: ["graph", "bfs"],
        description: "0과 1로 이루어진 격자에서 왼쪽 위 칸에서 오른쪽 아래 칸까지 이동하는 최단 거리를 구하세요. 0인 칸만 이동할 수 있으며 상하좌우로 이동할 수 있습니다.",
        input: "첫째 줄에 N과 M이 주어진다. 이후 N개의 줄에 M개의 정수로 이루어진 격자가 주어진다.",
        output: "시작점에서 도착점까지 이동하는 최소 횟수를 출력한다.",
        examples: [
            {
                input: "3 3\n0 0 0\n1 1 0\n0 0 0",
                output: "4"
            },
            {
                input: "2 3\n0 0 0\n0 0 0",
                output: "3"
            }
        ]
    },

    {
        id: 4,
        title: "동전 선택",
        difficulty: "Silver",
        tags: ["greedy"],
        description: "주어진 동전들을 이용하여 목표 금액을 만들 때 필요한 최소 동전 개수를 구하세요. 각 동전은 여러 번 사용할 수 있습니다.",
        input: "첫째 줄에 동전의 종류 수 N과 목표 금액 K가 주어진다. 둘째 줄에 N개의 동전 가치가 주어진다.",
        output: "목표 금액을 만드는 데 필요한 최소 동전 개수를 출력한다.",
        examples: [
            {
                input: "3 4200\n1000 500 100",
                output: "6"
            },
            {
                input: "4 1700\n1000 500 100 50",
                output: "4"
            }
        ]
    },

    {
        id: 5,
        title: "트리 거리",
        difficulty: "Gold",
        tags: ["tree", "graph", "dfs"],
        description: "가중치가 있는 트리와 두 정점이 주어질 때 두 정점 사이의 거리를 구하세요.",
        input: "첫째 줄에 정점의 수 N이 주어진다. 다음 N-1개의 줄에 두 정점과 간선의 가중치가 주어진다. 마지막 줄에 거리를 구할 두 정점이 주어진다.",
        output: "두 정점 사이의 거리를 출력한다.",
        examples: [
            {
                input: "5\n1 2 3\n1 3 2\n2 4 4\n2 5 1\n4 3",
                output: "9"
            },
            {
                input: "3\n1 2 5\n2 3 7\n1 3",
                output: "12"
            }
        ]
    },

    {
        id: 6,
        title: "최단 경로",
        difficulty: "Gold",
        tags: ["graph", "dijkstra", "shortest-path"],
        description: "가중치가 있는 방향 그래프에서 시작 정점부터 도착 정점까지의 최단 거리를 구하세요. 모든 간선의 가중치는 0 이상입니다.",
        input: "첫째 줄에 정점의 수 N과 간선의 수 M이 주어진다. 다음 M개의 줄에 시작 정점, 도착 정점, 가중치가 주어진다. 마지막 줄에 출발 정점 S와 도착 정점 E가 주어진다.",
        output: "S에서 E까지의 최단 거리를 출력한다.",
        examples: [
            {
                input: "5 6\n1 2 2\n1 3 5\n2 3 1\n2 4 2\n3 5 3\n4 5 1\n1 5",
                output: "5"
            },
            {
                input: "4 4\n1 2 3\n2 4 5\n1 3 2\n3 4 2\n1 4",
                output: "4"
            }
        ]
    }
];

const records = [];


// ===== App =====
// Express 서버 애플리케이션을 생성합니다.

const app = express();


// ===== Middleware =====
// 모든 요청에 공통으로 적용할 기능을 설정합니다.

app.use(cors());
app.use(express.json());


// ===== Utils =====
// 여러 API에서 공통으로 사용할 함수들을 작성합니다.


// ===== Routes =====
// 기본 페이지 및 서버 상태 확인용 요청을 처리합니다.

app.get("/", function (req, res) {
    res.send("Hello PS Ranked Backend!");
});

app.get("/api/test", function (req, res) {
    res.json({
        message: "PS Ranked server is running"
    });
});


// ===== Player Api =====
// 플레이어 조회, 추가 등 플레이어 관련 요청을 처리합니다.

app.get("/api/player", function (req, res) {
    const player = {
        username: "PSKing",
        rating: 1500
    };

    res.json(player);
});

app.get("/api/players", function (req, res) {
    res.json(players);
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


// ===== Problem Api =====
// 문제 목록 조회 및 특정 문제 조회 등 문제 관련 요청을 처리합니다.

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


// ===== Match Api =====
// 매칭 시작, 매칭 상태 확인 등 매칭 관련 요청을 처리합니다.

app.get("/api/match", function (req, res) {
    const rating = Number(req.query.rating);
    const username = req.query.username;
    if (Number.isNaN(rating) || !username ) {
        res.status(400).json({
            message: "올바른 플레이어 정보가 필요합니다."
        });
        return;
    }
    

    const candidates = players.filter(function (player) {
        return (
            player.username !== username &&
            rating - 100 <= player.rating &&
            player.rating <= rating + 100
        );
    });

    if (candidates.length === 0) {
        res.status(404).json({
            message: "매칭 가능한 상대가 없습니다."
        });
        return;
    }

    const randomIndex = Math.floor(Math.random() * candidates.length);

    const opponent = candidates[randomIndex];

    res.json(opponent);
});


// ===== Game Api =====
// 게임 시작, 제출, 승패 처리 등 게임 진행 관련 요청을 처리합니다.

app.post("/api/records", function (req, res) {
    const record = req.body;

    records.push(record);

    res.status(201).json({
        message: "전적이 저장되었습니다.",
        record: record
    });
});

app.get("/api/records", function (req, res) {
    res.json(records);
});


// ===== Record Api =====
// 플레이어 전적 저장 및 조회와 관련된 요청을 처리합니다.


// ===== Error Handling =====
// 존재하지 않는 요청이나 서버 오류를 처리합니다.


// ===== Server =====
// 지정한 포트에서 서버를 실행합니다.

app.listen(PORT, function () {
    console.log(`Server is running on http://localhost:${PORT}`);
});

