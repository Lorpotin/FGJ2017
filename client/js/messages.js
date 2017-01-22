

var messageArray = [];
var imageArray = [];
var textWarning = null;
var middleObstacle = null;
var middleObstacle2 = null;

function onNewPowerUp(data){
	warningMessage();
	if(data.powerup == 1){
		powerUpMessage(data.nick + ": " + data.msg, powerUpMessage.bind(this,"Controls Inverted!",toggleInverted.bind(this, player.gameNumber,true)),-1000);
	}
	else if(data.powerup == 2){
		powerUpMessage(data.nick + ": " + data.msg, powerUpMessage.bind(this,"Darkness...",toDarkness.bind(this, player.gameNumber)),-1000);
	}
	else if(data.powerup == 3){
		powerUpMessage(data.nick + ": " + data.msg, powerUpMessage.bind(this,"Godspeed",toGodSpeed.bind(this, player.gameNumber)),-1000);
	}
	else if(data.powerup == 4){
		powerUpMessage(data.nick + ": " + data.msg, powerUpMessage.bind(this,"Watch Out!",createObstacle.bind(this, player.gameNumber)),-1000);
	}
	
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '0x';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


function createObstacle(num){
	if(player.startedGame && player.gameNumber === num){
		middleObstacle = game.add.graphics(GAME_WIDTH + 40,384);
		middleObstacle.clear();
		
		middleObstacle.beginFill(getRandomColor());
		middleObstacle.drawRect(0, 0,40,40);
		middleObstacle.pivot.x = 20;
		middleObstacle.pivot.y = 20;
		middleObstacle.anchor.set(0.5);

		 middleObstacle2 = game.add.graphics(GAME_WIDTH + 40,384);
		 middleObstacle2.clear();
		
		 middleObstacle2.beginFill(getRandomColor());
		 middleObstacle2.drawRect(0, 0,40,40);
		 middleObstacle2.pivot.x = 20;
		 middleObstacle2.pivot.y = 20;
		 middleObstacle2.anchor.set(0.5);

	}
}

function toggleInverted(num, toggleBool){
	if(player.startedGame && player.gameNumber === num){
		isInvertedVar = -isInvertedVar;
		if(toggleBool){	
			game.time.events.add(6000, toggleInverted.bind(this,num,false));	
		} else {
			powerUpMessage("Controls Inverted Again!",null,GAME_WIDTH+1000);
			extraScore += 50;
		}
	}
}

function toGodSpeed(num){
	if(player.startedGame && player.gameNumber === num){
		tickerSpeed = 1;
		game.time.events.add(6000, fromGodSpeed.bind(this,num,false));	
	}
}

function fromGodSpeed(num){
	if(player.startedGame && player.gameNumber === num){
		tickerSpeed = 0.5;
	}
}

function toDarkness(num, toggleBool){
	if(player.startedGame && player.gameNumber === num){
		isDarknessTarget = 1;
		game.time.events.add(6000, fromDarkness.bind(this,num));	
	}
}

function fromDarkness(num, toggleBool){
	if(player.startedGame && player.gameNumber === num){
		powerUpMessage("Light Again!",null,GAME_WIDTH+1000);	
		isDarknessTarget = 0.5;
		extraScore += 30;
	}
}

function powerUpMessage(value,callback,target){
	var obj = game.add.text(GAME_WIDTH,GAME_HEIGHT/2,value,{font: "128px Arial", fill: "#ff0000", align: "center"});
	obj.anchor.set(0.5);
	game.add.tween(obj)
	.to({x: GAME_WIDTH/2}, 500, Phaser.Easing.Exponential.Out,true)
	.onComplete.add(function(){
		game.add.tween(this).to({x: target}, 500, Phaser.Easing.Exponential.Out,true,1000)
		.onComplete.add(function(){
			this[0].destroy();
			if(this[1]){
				this[1]();
			}
		},[this,callback]);
	},obj);
}

var imageCounter = 0;
function onNewObstacle(data){
	console.log("received");
	imageCounter++;
	game.load.image("imageINC"+imageCounter, data.image);
	game.load.start();
}

function warningMessage(){
	warning =  game.add.graphics(0,0);
	warning.beginFill( 0XFF0000, 1);
	warning.drawRect(0, 0, 1920, 1080);
	warning.alpha = 0;
	game.add.tween(warning).to( { alpha: 0.33 }, 500, Phaser.Easing.Exponential.Out, true,0,2).yoyo(true);
}

function fileComplete(progress, cacheKey, success, totalLoaded, totalFiles){

	warningMessage();	
	var obj = game.add.sprite(0, 0, "imageINC"+imageCounter)
		if(obj.height > 128){
			var scale = (128 / obj.height);
			obj.height = obj.height * scale;
			obj.width = obj.width *scale;
		}
		obj.alpha = 0.7;
		imageArray.unshift(obj);
		for(var i = 0; i < imageArray.length; i++){
			game.add.tween(imageArray[i]).to( { y: imageArray[i].y + 128 }, 500, Phaser.Easing.Exponential.Out, true);
		}
		if(i === 3){
			game.add.tween(imageArray[i-1]).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
			imageArray.splice(i-1,1);
		}
		game.time.events.add(3000,function(){
			game.add.tween(this).to( { width: 1920, height: 1080}, 2000, Phaser.Easing.Linear.None, true);
			game.add.tween(this).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true,1000).onComplete.add(function(){
				console.log(this,player.gameNumber,player.startedGame)
				if(player.startedGame && player.gameNumber === this[0]){
					extraScore  += 10;
				}
			},[player.gameNumber]);	
		}.bind(obj))

}