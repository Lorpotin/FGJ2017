
var GAME_HEIGHT = 1920;
var GAME_WIDTH  = 1080;
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

var score = 0;
var highscore = 0;
var starttime = null;
var scoreText;
var highscoreText;
var startgameText;

var messageArray = [];

function preload() {
}

function create() {
	addTimeEvents();


	socket = io.connect("https://fgj17-tatsiki.c9users.io", { query: "user=GAME" });
    mapLower = game.add.graphics(0,0);
    mapUpper = game.add.graphics(0,0);
    scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#FFF' });
    highscoreText = game.add.text(16, 48, 'Highscore: 0', { fontSize: '32px', fill: '#FFF' });
    startgameText = game.add.text(300, 500, 'Move up or down to start the game', { fontSize: '32px', fill: '#FFF' });
	player = new Player(game,512,384);
    game.add.existing(player);

    darknessMask = game.add.graphics(0,0);
    darknessMask.alpha = 0;
 	game.load.onFileComplete.add(fileComplete, this);
   
    game.input.gamepad.start();

    // To listen to buttons from a specific pad listen directly on that pad game.input.gamepad.padX, where X = pad 1-4
    pad1 = game.input.gamepad.pad1;
    socket.on("newPowerUp", onNewPowerUp);
    socket.on("image", onNewObstacle);
	game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	game.stage.disableVisibilityChange = true;
	game.time.events.loop(100, sendPlayerData.bind(this));

}



function update() {
	updateTicker+=tickerSpeed;
	updateLevel();
	updateScore();
}

function sendUpdates(){
	datajson.tickerSpeed = tickerSpeed;
	datajson.curveSize = isCurveSizeTarget;
	datajson.curveFrequency = isCurveVarTarget;
	datajson.updateTicker = updateTicker;
	socket.emit("draw map", datajson);
}

function sendPlayerData() {
	socket.emit("playerData", {
		player1: player.getPrevYCoordinates()
	});
}


