
var GAME_HEIGHT = 1024;
var GAME_WIDTH  = 768;
var player = null;
var game = new Phaser.Game(GAME_HEIGHT,GAME_WIDTH, Phaser.CANVAS, '',{preload: preload, create: create, update: update});

var updateTicker = 0;
var pad1 = null;
var socket = null;
var tickerSpeed = 0.5;
var datajson = {
	tickerSpeed : 0,
	curveSize : 0,
	curveFrequency: 0,
	updateTickerState: 0
};



function preload() {
}

function create() {
	addTimeEvents();

	socket = io.connect("https://fgj17-tatsiki.c9users.io", { query: "user=GAME" });
    mapLower = game.add.graphics(0,0);
    mapUpper = game.add.graphics(0,0);
    
	player = new Player(game,512,384);
    game.add.existing(player);

    darknessMask = game.add.graphics(0,0);
    darknessMask.alpha = 0;
    game.input.gamepad.start();

    // To listen to buttons from a specific pad listen directly on that pad game.input.gamepad.padX, where X = pad 1-4
    pad1 = game.input.gamepad.pad1;
}

function update() {
	updateTicker+=tickerSpeed;
	updateLevel();
}

function sendUpdates(){
	datajson.tickerSpeed = tickerSpeed;
	datajson.curveSize = isCurveSizeTarget;
	datajson.curveFrequency = isCurveVarTarget;
	datajson.updateTicker = updateTicker;
	socket.emit("draw map", datajson);
}


