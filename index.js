const express = require('express');
const app = express();
var path = require("path");

var EXPRESS_PORT = 23000;

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/chat/:msg", (req, res) => {
    var msg = req.params.msg;
    res.send("Got your message. Message is " + msg);
});

app.listen(EXPRESS_PORT, () => {
    console.log("Example app listening on port " + EXPRESS_PORT);
});
