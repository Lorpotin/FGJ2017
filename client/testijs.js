
$(document).on("click", "#button", function() 
{
	console.log("yes");
    emitMapXY("15", "25");
});

function init() {
	
	//io.connect will connect to a Socket.IO server by using the first parameter as the server address.
	socket = io.connect("https://fgj17-tatsiki.c9users.io", { query: "user=GAME" });
	remotePlayers = [];


	// Start listening for events
	setEventHandlers();

	
};

function mockPositionData() {
	setInterval(function () {
		emitMap({
        	"topWall" : Math.floor(Math.random()*(200-0+1)+0),
        	"player1" : Math.floor(Math.random()*(400-201+1)+201),
        	"bottomWall" : Math.floor(Math.random()*(700-401+1)+401),
    	})
	}, 100);
}

var setEventHandlers = function() {

	//listen for socket events and set up the handler functions to deal with them.
	socket.on("connect", onSocketConnected);
	socket.on("disconnect", onSocketDisconnect);
	socket.on("newPowerUp", spawnNewPower);
};

function emitMap(data) {
	socket.emit("draw map", data);
}

function onSocketConnected() {
    console.log("GAME_PLAYER Connected to socket server");
   
};

function onSocketDisconnect() {
    console.log("GAME_PLAYER Disconnected from socket server");
};

function spawnNewPower(data) {
	console.log(data);
};


