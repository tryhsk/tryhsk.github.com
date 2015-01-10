"use strict";
var express = require("express")
	, logfmt = require("logfmt")
	, fs = require('fs')
	, app = express();
var port = Number(process.env.PORT || 5000);

var index = fs.readFileSync('index.html');
app.use(express.static('/home/peter/Desktop/tryhsk.github.com'));
app.use(logfmt.requestLogger());
app.listen(port, function () {
	console.log("Listening on " + port);
});

app.get('/', function (req, res) {
	res.end(index);
});
