var util = require("util"),
express = require('express');
app = express(),
io = require("socket.io");
Player = require("./player").Player;

var socket, players;

var PORT = 3000;



function init()  {
	players = [];
    //Set socket server to listen to a port
    socket = io.listen(8000);
   	setEventHandlers();
};

function setEventHandlers() {
	//listens for new connections to Socket.IO
    socket.sockets.on("connection", onSocketConnection);
};

//The client variable is passed to onSocketConnection and is used to identify the player that just connected to the game.
function onSocketConnection(client) {
	//Each player is identified using a unique client.id number. We'll use this later when communicating game updates to other players. 
	//For now the util.log line will output the client identification number to the terminal on connection.
    util.log("New player has connected: "+client.id);
    //The client.on event listeners are used to detect when a player has either disconnected or sent a message to the server.
    client.on("disconnect", onClientDisconnect);
    client.on("new player", onNewPlayer);
    client.on("spawn new powur", spawnNewPowur);
};

function onClientDisconnect() {
    util.log("Player has disconnected: "+this.id);

   //gets the correct id
	var removePlayer = playerById(this.id);
	console.log(removePlayer);

	if (!removePlayer) 
	{
    	util.log("Player not found: "+this.id);
    	return;
	};
	//removes the player with certain id from player array
	players.splice(players.indexOf(removePlayer), 1);
	//Inform other players that a player disconnected
	this.broadcast.emit("remove player", {id: this.id});

};

function spawnNewPowur(data) {
	console.log(data);
	socket.emit("newPowerUp", data);
}

var onNewPlayer = function(data){
    players.push(newPlayer);
};

var playerById = function(id)  {
    var i;
    for (i = 0; i < players.length; i++)
    {
        if (players[i].id == id)
        return players[i];
    };

    return false;
};
app.use(express.static('static'));

app.listen(PORT, function() {
    console.log('LISTENING....');
    init();
});

