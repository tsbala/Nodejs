var app = require('express').createServer();

app.get('/', function(req, res) {
	res.send('Hello World - from Express.js');
});

app.listen(3000);