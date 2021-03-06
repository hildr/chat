var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
	console.log('a user connected');
	socket.on('disconnect', function () {
		console.log('a user disconnected');
	});
	socket.on('chat message', function (msg) {
		console.log('message: ' + msg);
		io.emit('chat message', msg);
	})
});

http.listen(process.env.PORT || 3000, function () {
	console.log('listening on http://localhost:3000');
});