var util = require("util"),
    io = require("socket.io"),

var socket, players;

players = [];

function init() 
{
    //Set socket server to listen to a port
    socket = io.listen(8000);
   	setEventHandlers();
};

function setEventHandlers()
{
	//listens for new connections to Socket.IO
    socket.sockets.on("connection", onSocketConnection);
};

//The client variable is passed to onSocketConnection and is used to identify the player that just connected to the game.
function onSocketConnection(client) 
{
	//Each player is identified using a unique client.id number. We'll use this later when communicating game updates to other players. 
	//For now the util.log line will output the client identification number to the terminal on connection.
    util.log("New player has connected: "+client.id);
    //The client.on event listeners are used to detect when a player has either disconnected or sent a message to the server.
    client.on("disconnect", onClientDisconnect);
    client.on("new player", onNewPlayer);
};

function onClientDisconnect() 
{
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

