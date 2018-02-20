const express = require('express');
const app = express();
var path = require("path");
var bodyParser = require("body-parser");

var EXPRESS_PORT = 23000;

// Configure bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/chat/:msg", (req, res) => {
    var msg = req.params.msg;
    res.send("Got your message. Message is " + msg);
});

app.post("/pg", (req, res) => {
    console.info("POST: " + JSON.stringify(req.body));
    res.send(JSON.stringify({
        _t: "Test response"
    }));
});

app.listen(EXPRESS_PORT, () => {
    console.log("Example app listening on port " + EXPRESS_PORT);
});
