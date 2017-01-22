

var messageArray = [];
var imageArray = [];
var textWarning = null;

function onNewPowerUp(data){
	warningMessage();	
	powerUpMessage(data.nick + ": " + data.msg, powerUpMessage.bind(this,"Controls Inverted!",toggleInverted.bind(this, player.gameNumber,true)),-1000);
}

function toggleInverted(num, toggleBool){
	
	if(player.startedGame && player.gameNumber === num){
		isInvertedVar = -isInvertedVar;
		if(toggleBool){
			powerUpMessage("Controls Inverted Again!",null,GAME_WIDTH+1000);	
			game.time.events.add(6000, toggleInverted.bind(this,num,false));	
		}
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
					extraScore  += 50;
				}
			},[player.gameNumber]);	
		}.bind(obj))

}