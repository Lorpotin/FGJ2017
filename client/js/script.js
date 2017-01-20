
var GAME_HEIGHT = 200;
var GAME_WIDTH  = 300;
var ObstacleArray = [];
var currentScore = 0;
var prevScore = -1;
var scoreText = null;
var player = null;
var highScoreListText = [];
var game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.CANVAS, '',{ preload: preload, create: create, update: update});

var updateTicker = 0;
var updateCycle = 1;
function preload() {
	game.load.spritesheet('player', 'img/player.png',32,32,4);
	game.load.image('platform', 'img/platform.png');
}

function create() {

game.time.advancedTiming= true;
	game.time.desiredFps = 60;
	game.time.desiredFpsMult = 1/60;
	game.time.events.loop(1000,function(){
		console.log(updateTicker, "UpdateCycle", game.time.fps, game.time.desiredFpsMult,game.updatesThisFrame);
		updateTicker = 0;
	},this);

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
    setHighScore();
    /*highScoreListText.push(game.add.text(250, 32, "2. 0",{fill:"white", font: "20px Arial Black"}));
    highScoreListText.push(game.add.text(250, 48, "3. 0",{fill:"white", font: "20px Arial Black"}));
    highScoreListText.push(game.add.text(250, 64, "4. 0",{fill:"white", font: "20px Arial Black"}));
    highScoreListText.push(game.add.text(250, 80, "5. 0",{fill:"white", font: "20px Arial Black"}));*/
    
}

function update() {
	updateTicker++;
	if(prevScore != currentScore){
		scoreText.setText("Score: "+currentScore.toString());

		prevScore = currentScore;
	}
	for(var i = 0; i < ObstacleArray.length; i++){
		bufObj = ObstacleArray[i];
		bufObj.x -= bufObj.speedVal;
		
		game.physics.arcade.collide(player,bufObj, zeroScore);
		
		if(bufObj.x < bufObj.width){
			if(bufObj.canScore){
				bufObj.canScore=false;
				currentScore++;
			}
			bufObj.destroy();
			ObstacleArray.splice(i,1);
		}
	}

}

function createObstacle(){
	sprite = game.add.sprite(GAME_WIDTH,GAME_HEIGHT-8,'platform');
	sprite.scale.set(0.25);
	sprite.speedVal = 3;
	sprite.canScore = true;
	game.physics.enable(sprite, Phaser.Physics.ARCADE);

	sprite.body.collideWorldBounds=true;
	

	ObstacleArray.push(sprite);
	game.time.events.add(1000 + (Math.random() * 1000),createObstacle);
}

function zeroScore(obj1,obj2){
	obj2.canScore=false;
	setHighScore();
	currentScore = 0;
}

function setHighScore(){
	stringArray = localStorage.getItem('highScoreList');
	if(!stringArray){
		stringArray = "[0,0,0,0,0]";
	}
	parsedArray = JSON.parse(stringArray);
	parsedArray.push(currentScore)
	parsedArray.sort(function(a, b){return b-a});
	parsedArray.splice(1,parsedArray.length-2);
	drawHighScore(parsedArray);
	localStorage.setItem('highScoreList',JSON.stringify(parsedArray));
}

function drawHighScore(highScoreList){
	highScoreListText[0].setText("Top Score: "+highScoreList[0].toString());

}


