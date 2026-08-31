const express = require("express");
const cors = require("cors");
const players = [];

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

app.post("/api/players", function (req, res) {
    const player = req.body;

    players.push(player);

    res.json({
        message: "플레이어 데이터를 받았습니다.",
        player: player
    });
})

app.listen(3000, function() {
    console.log("Server is running on http://localhost:3000");
});