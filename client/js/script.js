
var GAME_HEIGHT = 1024;
var GAME_WIDTH  = 768;
var ObstacleArray = [];
var currentScore = 0;
var prevScore = -1;
var scoreText = null;
var player = null;
var highScoreListText = [];
var game = new Phaser.Game(GAME_HEIGHT,GAME_WIDTH, Phaser.CANVAS, '',{ preload: preload, create: create, update: update});

var updateTicker = 0;
var varTicker = 0;
var updateCycle = 1;
var mapLower = null;
var mapUpper = null;
var isCurveVar = 1;
var isCurveVarTarget = 1;

var isCurveSize = 0;
var isCurveSizeTarget = 0;

var lowerLevelVar = 0

function preload() {
	game.load.spritesheet('player', 'img/player.png',32,32,4);
	game.load.image('platform', 'img/platform.png');
}

function create() {

	game.time.advancedTiming= true;
	game.time.desiredFps = 60;
	game.time.desiredFpsMult = 1/60;
	game.time.events.loop(4000, randomizeNewCurve.bind(this));
	game.time.events.loop(50, increaseCurveVarUntil.bind(this));

	game.time.events.loop(2000, randomizeNewCurveSize.bind(this));
	game.time.events.loop(50, increaseCurveSizeUntil.bind(this));
/*

	game.physics.startSystem(Phaser.Physics.ARCADE);
	player = new Player(game,64,20);
	game.add.existing(player);
	//Enable mouse button
	game.input.mouse.capture = true;
    game.physics.arcade.gravity.y = 400;
	//Add a platforms group to hold all of our tiles, and create a bunch of them
	game.time.events.add(1500,createObstacle);

	scoreText = game.add.text(100, 64, "Score: "+currentScore.toString(),{font: "16px Arial Black"});
	scoreText.fill = "white";
   

    highScoreListText.push(game.add.text(100, 16, "Top Score: ",{fill:"yellow", font: "20px Arial Black", align: "left"}));
    setHighScore();*/
    /*highScoreListText.push(game.add.text(250, 32, "2. 0",{fill:"white", font: "20px Arial Black"}));
    highScoreListText.push(game.add.text(250, 48, "3. 0",{fill:"white", font: "20px Arial Black"}));
    highScoreListText.push(game.add.text(250, 64, "4. 0",{fill:"white", font: "20px Arial Black"}));
    highScoreListText.push(game.add.text(250, 80, "5. 0",{fill:"white", font: "20px Arial Black"}));*/
    mapLower = game.add.graphics(0,0);
    mapUpper = game.add.graphics(0,0);

    // set a fill and line style
   
   
    
}
function increaseCurveVarUntil(){
	if(isCurveVar < isCurveVarTarget){
		isCurveVar += 0.01
		if(isCurveVar > isCurveVarTarget){
			isCurveVar = isCurveVarTarget;
		}
	}
	else if(isCurveVar > isCurveVarTarget){
		isCurveVar -= 0.01;
		if(isCurveVar < isCurveVarTarget){
			isCurveVar = isCurveVarTarget;
		}
	}
}

function increaseCurveSizeUntil(){
	if(isCurveSize < isCurveSizeTarget){
		isCurveSize += 0.01
		if(isCurveSize > isCurveSizeTarget){
			isCurveSize = isCurveSizeTarget;
		}
	}
	else if(isCurveSize > isCurveSizeTarget){
		isCurveSize -= 0.01;
		if(isCurveSize < isCurveSizeTarget){
			isCurveSize = isCurveSizeTarget;
		}
	}
}

function randomizeNewCurve(){
	isCurveVarTarget = Math.random();
}

function randomizeNewCurveSize(){
	isCurveSizeTarget = Math.random();
}

function update() {
	updateTicker++;

	 /* upper map */
	mapUpper.clear();
    mapUpper.beginFill(0xF4A460);
	mapUpper.moveTo(0, 0);
 	for(var x = 0; x < GAME_WIDTH+300; x++){
  		mapUpper.lineTo(x,(200 + (100 * isCurveSize) + (200 * Math.sin(Math.PI * ((1-(x/40 + updateTicker))/60)))*isCurveVar));
 	}
	mapUpper.lineTo( GAME_WIDTH+300, 0);
    mapUpper.endFill();

    /* lower map */
  	mapLower.clear();
    mapLower.beginFill(0xF4A460);
	mapLower.moveTo(0, 800);
 	for(var x = 0; x < GAME_WIDTH+300; x++){
  		mapLower.lineTo(x,(550 - (100 * isCurveSize) + (200 * Math.sin(Math.PI * (((x/40 + (updateTicker+60)))/60)))*isCurveVar));
 	}
	mapLower.lineTo( GAME_WIDTH+300 , 800);
    mapLower.endFill();
	

	
}



