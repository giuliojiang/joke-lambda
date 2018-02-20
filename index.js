const serverless = require('serverless-http');
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

var is_in_array = function(value, array) {
  return array.indexOf(value) > -1;
}

var banned_tags = ["sex", "dirty", "drug", "women", "men", "flirty"];

var joke_acceptable = function(tags) {
    for (var i = 0; i < banned_tags.length; i++) {
        var banned_tag = banned_tags[i];
        if (is_in_array(banned_tag, tags)) {
            return false;
        }
    }
    return true;
};

var get_random_joke = function() {
    while (true) {
        var random_joke = oneLinerJoke.getRandomJoke();
        var joke_text = random_joke.body;
        var joke_tags = random_joke.tags;
        console.info("["+ joke_text +"] ["+ joke_tags +"]");
        if (joke_acceptable(joke_tags)) {
            console.info("accepting");
            return joke_text;
        }
    }
};

app.post("/pg", (req, res) => {
    var joke_text = get_random_joke();
    res.send(JSON.stringify({
        joke: joke_text
    }));
});

app.listen(EXPRESS_PORT, () => {
    console.log("Example app listening on port " + EXPRESS_PORT);
});

module.exports.handler = serverless(app);
