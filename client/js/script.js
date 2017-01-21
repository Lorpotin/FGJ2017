
var GAME_HEIGHT = 1024;
var GAME_WIDTH  = 768;
var ObstacleArray = [];
var currentScore = 0;
var prevScore = -1;
var scoreText = null;
var player = null;
var highScoreListText = [];
var game = new Phaser.Game(GAME_HEIGHT,GAME_WIDTH, Phaser.AUTO, '',{ preload: preload, create: create, update: update});

var updateTicker = 0;
var varTicker = 0;
var updateCycle = 1;
var mapLower = null;
var mapUpper = null;
var darknessMask = null;

var isCurveVar = 1;
var isCurveVarTarget = 1;

var isCurveSize = 0;
var isCurveSizeTarget = 0;

var isDarknessSize = 0;
var isDarknessTarget = 0;

var lowerLevelVar = 0

function preload() {
	game.load.image('lightmask', 'img/lightmask.png');
}

function create() {

	game.time.advancedTiming= true;
	game.time.desiredFps = 60;
	game.time.desiredFpsMult = 1/60;
	addTimeEvents();
    mapLower = game.add.graphics(0,0);
    mapUpper = game.add.graphics(0,0);
    darknessMask = game.add.graphics(0,0);
    darknessMask.alpha = 0;
   
    
}

function update() {
	updateTicker++;
	updateLevel();
}



