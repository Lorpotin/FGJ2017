

var messageArray = [];
var imageArray = [];
var textWarning = null;

function onNewPowerUp(data){
	var obj = game.add.text(GAME_WIDTH,16,data.nick + ": " + data.msg,{fill: "#ffffff", align: "center"});
	obj.anchor.set(1,0.5);
	messageArray.unshift(obj);
	for(var i = 0; i < messageArray.length; i++){
		game.add.tween(messageArray[i]).to( { y: messageArray[i].y + 32 }, 250, Phaser.Easing.Exponential.Out, true);
	}
	if(i === 5){
		game.add.tween(messageArray[i-1]).to( { alpha: 0 }, 250, Phaser.Easing.Linear.None, true);
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

	warning =  game.add.graphics(0,0);
	warning.beginFill( 0XFF0000, 1);
	warning.drawRect(0, 0, 1920, 1080);
	warning.alpha = 0;
	game.add.tween(warning).to( { alpha: 0.33 }, 500, Phaser.Easing.Exponential.Out, true,0,2).yoyo(true);
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
				extraScore  += 50;
			});	

		}.bind(obj))

}