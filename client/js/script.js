
var GAME_HEIGHT = 1024;
var GAME_WIDTH  = 768;
var player = null;
var game = new Phaser.Game(GAME_HEIGHT,GAME_WIDTH, Phaser.AUTO, '',{ preload: preload, create: create, update: update});

var updateTicker = 0;


function preload() {
	game.load.image('lightmask', 'img/lightmask.png');
	game.load.image('player', 'img/player.png')
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
	player = new Player(game,32,32);
    game.add.existing(player);
    player.body.x = 512;
    player.body.y = 384;
    
}

function update() {
	updateTicker++;
	updateLevel();
	player.update();
}



