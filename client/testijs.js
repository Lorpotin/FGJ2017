
function init() {
	
	//io.connect will connect to a Socket.IO server by using the first parameter as the server address.
	socket = io.connect("http://localhost:8000", { query: "user=GAME" });
	remotePlayers = [];


	// Start listening for events
	setEventHandlers();

	
};

var setEventHandlers = function() {

	//listen for socket events and set up the handler functions to deal with them.
	socket.on("connect", onSocketConnected);
	socket.on("disconnect", onSocketDisconnect);
	socket.on("newPowerUp", spawnNewPower);
};

function onSocketConnected() {
    console.log("GAME_PLAYER Connected to socket server");
   
};

function onSocketDisconnect() {
    console.log("GAME_PLAYER Disconnected from socket server");
};

function spawnNewPower(data) {
	console.log(data);
};


