const express = require('express');
const app = express();
var path = require("path");
var bodyParser = require("body-parser");
var oneLinerJoke = require('one-liner-joke');

var EXPRESS_PORT = 23000;

// Configure bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/pg", (req, res) => {
    var random_joke = oneLinerJoke.getRandomJoke();
    var joke_text = random_joke.body;
    res.send(JSON.stringify({
        joke: joke_text
    }));
});

app.listen(EXPRESS_PORT, () => {
    console.log("Example app listening on port " + EXPRESS_PORT);
});
