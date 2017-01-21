
var GAME_HEIGHT = 1024;
var GAME_WIDTH  = 768;
var player = null;
var game = new Phaser.Game(GAME_HEIGHT,GAME_WIDTH, Phaser.CANVAS, '',{ preload: preload, create: create, update: update});

var updateTicker = 0;
var pad1 = null;

function preload() {
}

function create() {
	addTimeEvents();
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
	updateTicker+=0.1;
	updateLevel();
}



