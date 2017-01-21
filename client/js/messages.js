

var messageArray = [];
var imageArray = [];

function onNewPowerUp(data){
	messageArray.unshift(game.add.text(GAME_WIDTH - 200,16,data.nick + ": " + data.msg,{font: "32px Comic sans", fill: "#ffffff", align: "center"}));
	for(var i = 0; i < messageArray.length; i++){
		game.add.tween(messageArray[i]).to( { y: messageArray[i].y + 32 }, 500, Phaser.Easing.Exponential.Out, true);
	}
	if(i === 5){
		game.add.tween(messageArray[i-1]).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
		messageArray.splice(i-1,1);
	}
}

var imageCounter = 0;
function onNewObstacle(data){
	console.log("received");
	imageCounter++;
	game.load.image("imageINC"+imageCounter, data.image);
	game.load.start();
	
}

function fileComplete(progress, cacheKey, success, totalLoaded, totalFiles){
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
}