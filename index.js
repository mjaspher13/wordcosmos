// Include Express Framework
const express = require('express')
// Create WebApp Server
const app = express()
var http = require('http').createServer(app);
const path = require('path')
const port = process.env.PORT || 3000;

const server = http.listen(port, () => {
    console.log('Server listening on port: ' + port);
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

// Include Socket.io 
var io = require('socket.io').listen(server); // Check if player connected
io.on('connect', function (socket) {

    emitCount()

    socket.on('disconnect', function (socket) {
        emitCount()
    })
});

function emitCount() {
    count = io.sockets.server.eio.clientsCount
    console.log(count);
    io.emit('count', { count })
}