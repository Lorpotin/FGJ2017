
var GAME_HEIGHT = 1080;
var GAME_WIDTH  = 1920;
var player = null;
var game = new Phaser.Game(GAME_WIDTH,GAME_HEIGHT,Phaser.CANVAS, '',{preload: preload, create: create, update: update});

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
var extraScore = 0;
var starttime = null;
var scoreText;
var highscoreText;
var startgameText;

var messageArray = [];
var particleArray = [];

function preload() {
}

function create() {
	addTimeEvents();


	socket = io.connect("https://fgj17-tatsiki.c9users.io", { query: "user=GAME" });

	
	background = game.add.graphics(0,0);
	background.beginFill( 0X808080, 1);
	background.drawRect(0, 0, 1920, 1080);
		for(var i = 0; i < 10; i++){
		var obj = game.add.graphics(GAME_WIDTH + 1000 * Math.random(),1080 * Math.random());
		obj.clear();
		obj.beginFill(0xFFFFFF);
		obj.drawRect(0, 0, 40, 10);
		particleArray.push(obj);
	}
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
	addDarknessMask();
	game.time.events.loop(100, sendPlayerData.bind(this));
}



function update() {
	updateTicker+=tickerSpeed;
	updateLevel();
	updateScore();
	for(var i = 0; i < particleArray.length; i++){
		particleArray[i].x -= 100;
		if(particleArray[i].x < 0){
			particleArray[i].width = 2 + (2*Math.random());
			particleArray[i].height = 1 + (1*Math.random());
			particleArray[i].x = GAME_WIDTH + 1000 * Math.random();
			particleArray[i].y = 1080 * Math.random();
		}
	}
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


