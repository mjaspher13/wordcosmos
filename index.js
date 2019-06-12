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

var players = [];

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

// Include Socket.io 
var io = require('socket.io').listen(server); // Check if player connected
io.on('connect', function (socket) {
           
    socket.on('connectGame', function(){
        players.push(socket.id)
        emitCount(players.length)
        console.log(socket.id)
    })
    

    socket.on('disconnect', function () {
        players.splice(players.indexOf(socket.id), 1)
        console.log("disco" )
        console.log(socket.id )
        console.log("disco" )
        console.log(players)
        emitCount(players.length)
    })
});

function emitCount(count) {
    io.emit('count', { count })
}