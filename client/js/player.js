Player = function (game, x, y) {

    Phaser.Graphics.call(this, game, x, y);

    cursors = game.input.keyboard.createCursorKeys();

     this.prevYCoordinates = [];
    for(var i = 0; i < 50; i++){
        this.prevYCoordinates.push(100);
    }
    this.y_move = 0;
    this.prevSpotY = 0;
    this.startedGame = false;
    this.gameNumber = 0;
    this.anchor.set(0.5);
};

Player.prototype = Object.create(Phaser.Graphics.prototype);
Player.prototype.constructor = Player;

/**
 * Automatically called by World.update
 **/

Player.prototype.getYPos = function() {
    return this.prevYCoordinates[this.prevYCoordinates.length-1];
}
Player.prototype.update = function() {

    this.clear();
    this.moveTo(0, this.prevYCoordinates[0]);
    this.lineStyle(10, 0xFFD700);


    for(var y = 0; y < this.prevYCoordinates.length; y++){
        if(this.prevYCoordinates[y+5]){
            this.prevYCoordinates[y+4] = this.prevYCoordinates[y+5];
        } 
        if(this.prevYCoordinates[y+4]){
            this.prevYCoordinates[y+3] = this.prevYCoordinates[y+4];
        
        } 
        if(this.prevYCoordinates[y+3]){
            this.prevYCoordinates[y+2] = this.prevYCoordinates[y+3];
        } 
        if(this.prevYCoordinates[y+2]){
            this.prevYCoordinates[y+1] = this.prevYCoordinates[y+2];
        } 
        if(this.prevYCoordinates[y+1]){
            this.prevYCoordinates[y] = this.prevYCoordinates[y+1];
        }
        else {
            if(this.startedGame === true){
                this.prevYCoordinates[y] += this.y_move;
            } else if (this.startedGame === false && y === this.prevYCoordinates.length-1) {
                var y_pos = ( (100 * isCurveSize) + (200 * Math.sin(Math.PI * (((y/49 + (updateTicker-45)))/60)))*isCurveVar);
                this.prevYCoordinates[y] = y_pos;
            } 
        }
    }

    for(var x = 1; x < 50; x++){
        this.lineTo(x*4, this.prevYCoordinates[x]);
    }
 

    if (pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > 0.1)
    {
        //  Move down
        console.log("alas"); 
        if (this.startedGame == false) {
            startGame();
        }
        this.y_move += pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) * isInvertedVar;
        if(this.y_move < -10){
            this.y_move = -10;
        }
    }
    else if (cursors.up.isDown)
    {
        if (this.startedGame == false) {
        	startGame();
            
        }
        if(this.y_move > -10){
            this.y_move -= 1 * isInvertedVar;
        }
    }
    else if (cursors.down.isDown)
    {
        if (this.startedGame == false) {
			startGame();
        }
        if(this.y_move < 10){
            this.y_move += 1 * isInvertedVar;
        }
    }
    else if (pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.1)
    {
        //  Move up
        console.log("ylös"); 
        if (this.startedGame == false) {
            startGame();
        }
         this.y_move += pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) * isInvertedVar;
         if(this.y_move > 10){
            this.y_move = 10;
        }
    }
    var comparisionY = this.prevYCoordinates[this.prevYCoordinates.length-1] + this.y;
    if( comparisionY < upperLevelYCoord ||
        comparisionY > lowerLevelYCoord ||
        isObstacleHit(middleObstacle) === true ||
        isObstacleHit(middleObstacle2) === true){
        endGame();
        
    }
    
};

function isObstacleHit(obj) {
    if(obj){
        var playerHead = player.prevYCoordinates[player.prevYCoordinates.length-1];
        var dx = (obj.x) - (player.x)  - 200;
        var dy = (obj.y) - (playerHead + player.y);
        return Math.sqrt(dx * dx + dy * dy) < 30 ;
    } else {
        return false;
    }
    
}

function startGame() {
	player.startedGame = true;
    player.gameNumber++;
    isInvertedVar = 1;
    isDarknessTarget = 0.5;
	startgameText.setText("");
    extraScore = 0;
	starttime = Date.now();
}

function endGame() {
	for (y=0;y<player.prevYCoordinates.length;y++) {
		y_pos = ((100 * isCurveSize) + (200 * Math.sin(Math.PI * (((y/49 + (updateTicker-45)))/60)))*isCurveVar);
		player.prevYCoordinates[y] = y_pos;
	}
    if(middleObstacle){
        middleObstacle.destroy();
    }
    if(middleObstacle2){
        middleObstacle2.destroy();
    }
	player.startedGame = false;
    tickerSpeed = 0.5;
	startgameText.setText("Move up or down to start the game");
	starttime = null;
	score = 0;
    isInvertedVar = 1;
    isDarknessTarget = 0.5;
	player.y_move = 0;
    sendGameOver();
}