var util = require("util"),
express = require('express');
var app = express();
var io = require("socket.io");
var Player = require("./player").Player;
var Event = require("./event").Event;

var socket, players;
var WEB_SOCKETS, GAME_SOCKETS;

var darkEvent, xEvent, yEvent;
var eventActive;


function init()  {
	WEB_SOCKETS = [];
    GAME_SOCKETS = [];
    eventActive = false;

    //Set socket server to listen to a port
    socket = io.listen(process.env.PORT);
   	setEventHandlers();
};

function setEventHandlers() {
	//listens for new connections to Socket.IO
    socket.sockets.on("connection", onSocketConnection);
};

//The client variable is passed to onSocketConnection and is used to identify the player that just connected to the game.
function onSocketConnection(client) {
    if(client.handshake.query.user === "GAME") {
        util.log("GAME_PLAYER connected!"+client.id);
        GAME_SOCKETS.push(client.id);
    }
    else if (client.handshake.query.user === "WEB") {
        util.log("WEB_PLAYER connected!"+client.id);
        WEB_SOCKETS.push(client.id);
    }

    //The client.on event listeners are used to detect when a player has either disconnected or sent a message to the server.
    client.on("disconnect", onClientDisconnect);
    client.on("spawn new powur", spawnNewPowur);
    client.on("draw map", drawMap);
};

function onClientDisconnect(client) {

    var userType = this.handshake.query.user;
   //gets the correct id
	var removePlayer = playerById(this.id, userType);

	if (!removePlayer) 
	{
    	util.log("SOCKET not found: "+this.id);
    	return;
	};

    if(userType === "WEB") {
        spliceWebUser(removePlayer);
    }
    else if(userType === "GAME") {
        spliceGameUser(removePlayer);
    }

};

function spliceWebUser(data) {
    //removes the player with certain id from player array
    WEB_SOCKETS.splice(WEB_SOCKETS.indexOf(data), 1);
}

function spliceGameUser(data) {
    //removes the player with certain id from player array
    GAME_SOCKETS.splice(GAME_SOCKETS.indexOf(data), 1);
}

function spawnNewPowur(data) {
	console.log(data);
	socket.emit("newPowerUp", data);
}

function drawMap(data) {
    console.log(data);
    socket.emit("drawMap", data);
}

var playerById = function(id, userType)  {
    var i;
    if(userType === "WEB") {
        for (i = 0; i < WEB_SOCKETS.length; i++)
        {
            if (WEB_SOCKETS[i] === id) 
                return WEB_SOCKETS[i];

        };
    }
    else if(userType === "GAME") {
        for (i = 0; i < GAME_SOCKETS.length; i++)
        {
            if (GAME_SOCKETS[i] === id) 
                return GAME_SOCKETS[i];
        };
    }
    else
        return false;
    
    
};
app.use(express.static('static'));

//app.set('port', process.env.PORT);
//app.set('host', process.env.IP);
app.listen(3000, function() {
    console.log('LISTENING....');
    init();
});

